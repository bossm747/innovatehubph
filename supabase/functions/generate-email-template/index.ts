
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

// Constants for API endpoints
const GEMINI_ENDPOINT = "https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-pro:generateContent";
const OPENAI_ENDPOINT = "https://api.openai.com/v1/chat/completions";
const ANTHROPIC_ENDPOINT = "https://api.anthropic.com/v1/messages";
const MISTRAL_ENDPOINT = "https://api.mistral.ai/v1/chat/completions";

interface TemplateRequest {
  type: 'notification' | 'followup' | 'confirmation' | 'welcome' | 'custom';
  content: {
    subject?: string;
    title?: string;
    message?: string;
    ctaText?: string;
    ctaLink?: string;
    brandName?: string;
    brandColor?: string;
    logoUrl?: string;
    recipientName?: string;
    additionalInfo?: string;
    customFields?: Record<string, string>;
  };
  provider?: string;
}

serve(async (req: Request) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const requestData: TemplateRequest = await req.json();
    const { type, content, provider = "gemini" } = requestData;
    
    console.log(`Generating email template for type: ${type}`);

    // Build the responsive HTML email template with the provided content
    let emailTemplate = await generateTemplate(type, content, provider);

    return new Response(
      JSON.stringify({ template: emailTemplate }),
      {
        headers: { "Content-Type": "application/json", ...corsHeaders },
        status: 200,
      }
    );
  } catch (error) {
    console.error("Error in generate-email-template:", error);
    return new Response(
      JSON.stringify({ error: error.message || "An error occurred during template generation" }),
      {
        headers: { "Content-Type": "application/json", ...corsHeaders },
        status: 500,
      }
    );
  }
});

async function generateTemplate(
  type: string,
  content: TemplateRequest['content'],
  provider: string
): Promise<string> {
  // Set default values
  const {
    title = "Message from InnovateHub",
    message = "Thank you for your interest in our services.",
    ctaText = "Learn More",
    ctaLink = "https://innovatehub.ph",
    brandName = "InnovateHub",
    brandColor = "#9b87f5",
    logoUrl = "",
    recipientName = "Valued Customer",
    additionalInfo = "",
    customFields = {},
    subject = "Message from InnovateHub"
  } = content;
  
  // Prepare the prompt based on the template type
  let prompt = `Generate a responsive HTML email template for a ${type} email with these specifications:
  - Email type: ${type}
  - Brand: ${brandName}
  - Primary color: ${brandColor}
  - Recipient name: ${recipientName}
  - Email title: ${title}
  - Message: ${message}
  - Call to action text: ${ctaText}
  - Call to action link: ${ctaLink}
  - Additional information: ${additionalInfo}
  `;

  if (Object.keys(customFields).length > 0) {
    prompt += "\nCustom fields to include:\n";
    for (const [key, value] of Object.entries(customFields)) {
      prompt += `- ${key}: ${value}\n`;
    }
  }

  prompt += `
  Create a responsive, modern HTML email template that follows these guidelines:
  1. Use tables for layout (for email client compatibility)
  2. Include inline CSS (important for email clients)
  3. Use a clean, professional design with the brand color as accent
  4. Make sure the template is mobile-responsive
  5. Include a header with the brand name
  6. Include the message in the body
  7. Include a prominent call-to-action button
  8. Include a footer with company information and unsubscribe link
  9. Make sure all links are properly formatted with "http://" or "https://"
  10. Use ${brandColor} as the primary color for buttons and accents
  
  Return ONLY the HTML code with no explanations. The HTML should be complete and ready to use.
  `;

  try {
    // Try with the specified provider
    switch(provider.toLowerCase()) {
      case "gemini":
        return await generateWithGemini(prompt);
      case "openai":
        return await generateWithOpenAI(prompt);
      case "anthropic":
        return await generateWithAnthropic(prompt);
      case "mistral":
        return await generateWithMistral(prompt);
      default:
        // Default to Gemini
        return await generateWithGemini(prompt);
    }
  } catch (error) {
    console.error(`Error generating with ${provider}:`, error);
    
    // Fallback chain if the primary provider fails
    try {
      console.log("Primary provider failed, trying OpenAI as fallback...");
      return await generateWithOpenAI(prompt);
    } catch (fallbackError) {
      console.error("OpenAI fallback failed, trying Anthropic as fallback...");
      try {
        return await generateWithAnthropic(prompt);
      } catch (secondFallbackError) {
        console.error("Anthropic fallback failed, trying Mistral as final fallback...");
        try {
          return await generateWithMistral(prompt);
        } catch (finalFallbackError) {
          // If all fails, return a basic template
          return getBasicTemplate(type, content);
        }
      }
    }
  }
}

async function generateWithGemini(prompt: string): Promise<string> {
  const geminiApiKey = Deno.env.get("GEMINI_API_KEY");
  if (!geminiApiKey) {
    throw new Error("GEMINI_API_KEY not found in environment");
  }

  const response = await fetch(
    `${GEMINI_ENDPOINT}?key=${geminiApiKey}`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        contents: [{
          parts: [{
            text: prompt
          }]
        }],
        generationConfig: {
          temperature: 0.3,
          maxOutputTokens: 8000,
        },
      }),
    }
  );

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`Gemini API error: ${response.status} ${errorText}`);
  }

  const data = await response.json();
  return data.candidates[0]?.content?.parts[0]?.text || "";
}

async function generateWithOpenAI(prompt: string): Promise<string> {
  const openaiApiKey = Deno.env.get("OPENAI_API_KEY");
  if (!openaiApiKey) {
    throw new Error("OPENAI_API_KEY not found in environment");
  }

  const response = await fetch(OPENAI_ENDPOINT, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${openaiApiKey}`,
    },
    body: JSON.stringify({
      model: "gpt-4o-mini",
      messages: [
        {
          role: "system",
          content: "You are a professional email template designer. Generate only HTML code for responsive email templates with no explanations."
        },
        {
          role: "user",
          content: prompt
        }
      ],
      temperature: 0.3,
      max_tokens: 4000,
    }),
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`OpenAI API error: ${response.status} ${errorText}`);
  }

  const data = await response.json();
  return data.choices[0]?.message?.content || "";
}

async function generateWithAnthropic(prompt: string): Promise<string> {
  const anthropicApiKey = Deno.env.get("ANTHROPIC_API_KEY");
  if (!anthropicApiKey) {
    throw new Error("ANTHROPIC_API_KEY not found in environment");
  }

  const response = await fetch(ANTHROPIC_ENDPOINT, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "x-api-key": anthropicApiKey,
      "anthropic-version": "2023-06-01"
    },
    body: JSON.stringify({
      model: "claude-3-haiku-20240307",
      messages: [
        {
          role: "user",
          content: prompt
        }
      ],
      temperature: 0.3,
      max_tokens: 4000,
    }),
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`Anthropic API error: ${response.status} ${errorText}`);
  }

  const data = await response.json();
  return data.content[0]?.text || "";
}

async function generateWithMistral(prompt: string): Promise<string> {
  const mistralApiKey = Deno.env.get("MISTRAL_API_KEY");
  if (!mistralApiKey) {
    throw new Error("MISTRAL_API_KEY not found in environment");
  }

  const response = await fetch(MISTRAL_ENDPOINT, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${mistralApiKey}`,
    },
    body: JSON.stringify({
      model: "mistral-large-latest",
      messages: [
        {
          role: "system",
          content: "You are a professional email template designer. Generate only HTML code for responsive email templates with no explanations."
        },
        {
          role: "user",
          content: prompt
        }
      ],
      temperature: 0.3,
      max_tokens: 4000,
    }),
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`Mistral API error: ${response.status} ${errorText}`);
  }

  const data = await response.json();
  return data.choices[0]?.message?.content || "";
}

function getBasicTemplate(type: string, content: TemplateRequest['content']): string {
  const {
    title = "Message from InnovateHub",
    message = "Thank you for your interest in our services.",
    ctaText = "Learn More",
    ctaLink = "https://innovatehub.ph",
    brandName = "InnovateHub",
    brandColor = "#9b87f5",
    recipientName = "Valued Customer",
  } = content;
  
  return `<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${title}</title>
</head>
<body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333; margin: 0; padding: 0; background-color: #f9f9f9;">
  <table width="100%" cellpadding="0" cellspacing="0" style="max-width: 600px; margin: 0 auto; background-color: #ffffff; border-radius: 8px; overflow: hidden; box-shadow: 0 2px 10px rgba(0,0,0,0.05);">
    <tr>
      <td style="padding: 20px; text-align: center; background-color: ${brandColor}; color: white;">
        <h1>${brandName}</h1>
      </td>
    </tr>
    <tr>
      <td style="padding: 20px;">
        <p>Hello ${recipientName},</p>
        <p>${message}</p>
        <p style="text-align: center; margin: 30px 0;">
          <a href="${ctaLink}" style="display: inline-block; padding: 12px 24px; background-color: ${brandColor}; color: white; text-decoration: none; border-radius: 4px; font-weight: bold;">${ctaText}</a>
        </p>
      </td>
    </tr>
    <tr>
      <td style="padding: 20px; text-align: center; color: #666; font-size: 14px; border-top: 1px solid #f0f0f0;">
        <p>${brandName} | RMCL Bldg., New Bypass Rd., Bayanan, San Pascual, Batangas</p>
        <p>If you no longer wish to receive these emails, you can <a href="#" style="color: ${brandColor};">unsubscribe</a>.</p>
      </td>
    </tr>
  </table>
</body>
</html>`;
}
