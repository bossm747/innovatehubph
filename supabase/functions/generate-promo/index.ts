
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

// CORS headers for browser requests
const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
};

// Types
interface RequestBody {
  promoCode?: string;
  audience?: string;
  service?: string;
  channelType?: "email" | "social" | "web" | "sms";
  theme?: string;
  urgency?: "low" | "medium" | "high";
}

interface PromoResponse {
  title: string;
  body: string;
  cta: string;
  shortVersion?: string;
  provider: string;
  recommendedTags?: string[];
}

serve(async (req: Request) => {
  // Handle CORS preflight requests
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    // Parse request body
    const requestData: RequestBody = await req.json();
    const { 
      promoCode = "", 
      audience = "general", 
      service = "general", 
      channelType = "email",
      theme = "",
      urgency = "medium"
    } = requestData;
    
    console.log(`Generating promo content for: ${promoCode} targeting ${audience} for ${service} service`);

    // Build the prompt for the AI
    const prompt = `
      Generate compelling promotional content for InnovateHub's ${service} service.
      
      Details:
      - Promotion Code: ${promoCode}
      - Target Audience: ${audience}
      - Channel Type: ${channelType}
      - Theme/Occasion: ${theme}
      - Urgency Level: ${urgency}
      
      The response should include:
      1. Attention-grabbing title/subject line
      2. Persuasive body copy that highlights benefits and creates urgency
      3. Clear call-to-action
      4. For social/SMS channels, include a shorter version
      5. Suggested hashtags or tags for social media (if applicable)
      
      Keep the content focused on how InnovateHub's services solve problems and create value.
    `;

    // Try to generate with Gemini (primary)
    let result: PromoResponse | null = await generateWithGemini(prompt);
    
    // If Gemini fails, try with OpenAI
    if (!result) {
      console.log("Falling back to OpenAI...");
      result = await generateWithOpenAI(prompt);
    }
    
    // If OpenAI fails, try with Anthropic
    if (!result) {
      console.log("Falling back to Anthropic...");
      result = await generateWithAnthropic(prompt);
    }
    
    // If all fails, return an error
    if (!result) {
      throw new Error("All providers failed to generate promotional content");
    }

    return new Response(
      JSON.stringify(result),
      {
        headers: { "Content-Type": "application/json", ...corsHeaders },
        status: 200,
      }
    );

  } catch (error) {
    console.error("Error in generate-promo:", error);
    return new Response(
      JSON.stringify({ error: error.message || "An error occurred during promo content generation" }),
      {
        headers: { "Content-Type": "application/json", ...corsHeaders },
        status: 500,
      }
    );
  }
});

async function generateWithGemini(content: string): Promise<PromoResponse | null> {
  try {
    const geminiApiKey = Deno.env.get("GEMINI_API_KEY");
    if (!geminiApiKey) {
      console.error("GEMINI_API_KEY not found in environment");
      return null;
    }
    
    const endpoint = "https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-pro:generateContent";

    const response = await fetch(
      `${endpoint}?key=${geminiApiKey}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          contents: [{
            parts: [{
              text: content
            }]
          }],
          generationConfig: {
            temperature: 0.7,
            maxOutputTokens: 1024,
          },
        }),
      }
    );

    if (!response.ok) {
      const errorText = await response.text();
      console.error(`Gemini API error: ${response.status} ${errorText}`);
      return null;
    }

    const data = await response.json();
    const responseText = data.candidates[0]?.content?.parts[0]?.text || "";
    
    // Parse the response text into structured data
    try {
      const lines = responseText.split('\n').filter(line => line.trim());
      
      // Extract key components
      const title = lines.find(line => line.includes("Title:") || line.includes("Subject:"))?.split(":")[1]?.trim() || "";
      
      // Get the body - everything between title and CTA
      const startIndex = lines.findIndex(line => line.includes("Title:") || line.includes("Subject:")) + 1;
      const endIndex = lines.findIndex(line => line.includes("Call-to-Action:") || line.includes("CTA:"));
      const body = lines.slice(startIndex, endIndex > startIndex ? endIndex : undefined)
        .join('\n').trim();
      
      // Get the CTA
      const cta = lines.find(line => line.includes("Call-to-Action:") || line.includes("CTA:"))?.split(":")[1]?.trim() || "";
      
      // Get short version for social/SMS
      const shortLine = lines.find(line => 
        line.includes("Short Version:") || 
        line.includes("Shorter Version:") ||
        line.includes("SMS Version:") ||
        line.includes("Social Media Version:")
      );
      const shortVersion = shortLine?.split(":").slice(1).join(":").trim();
      
      // Get tags
      const tagsLine = lines.find(line => 
        line.includes("Tags:") || 
        line.includes("Hashtags:") ||
        line.includes("Suggested Tags:")
      );
      const tagsText = tagsLine?.split(":").slice(1).join(":").trim();
      const recommendedTags = tagsText ? 
        tagsText.split(/[\s,]+/).filter(tag => tag.trim()) : 
        undefined;

      return {
        title,
        body,
        cta,
        shortVersion,
        provider: "gemini",
        recommendedTags
      };
    } catch (parseError) {
      console.error("Error parsing Gemini response:", parseError);
      // Fallback to less structured approach
      return {
        title: responseText.substring(0, responseText.indexOf('\n')),
        body: responseText,
        cta: "Contact us today!",
        provider: "gemini"
      };
    }
  } catch (error) {
    console.error("Error in generateWithGemini:", error);
    return null;
  }
}

async function generateWithOpenAI(content: string): Promise<PromoResponse | null> {
  try {
    const openaiApiKey = Deno.env.get("OPENAI_API_KEY");
    if (!openaiApiKey) {
      console.error("OPENAI_API_KEY not found in environment");
      return null;
    }

    const response = await fetch("https://api.openai.com/v1/chat/completions", {
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
            content: "You are a professional marketing copywriter who specializes in creating compelling promotional content."
          },
          {
            role: "user",
            content
          }
        ],
        temperature: 0.7,
        max_tokens: 1024,
        response_format: { type: "text" }
      }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error(`OpenAI API error: ${response.status} ${errorText}`);
      return null;
    }

    const data = await response.json();
    const responseText = data.choices[0]?.message?.content || "";
    
    // Parse output similar to Gemini function
    try {
      const lines = responseText.split('\n').filter(line => line.trim());
      
      const title = lines.find(line => line.includes("Title:") || line.includes("Subject:"))?.split(":")[1]?.trim() || "";
      
      const startIndex = lines.findIndex(line => line.includes("Title:") || line.includes("Subject:")) + 1;
      const endIndex = lines.findIndex(line => line.includes("Call-to-Action:") || line.includes("CTA:"));
      const body = lines.slice(startIndex, endIndex > startIndex ? endIndex : undefined)
        .join('\n').trim();
      
      const cta = lines.find(line => line.includes("Call-to-Action:") || line.includes("CTA:"))?.split(":")[1]?.trim() || "";
      
      const shortLine = lines.find(line => 
        line.includes("Short Version:") || 
        line.includes("Shorter Version:") ||
        line.includes("SMS Version:") ||
        line.includes("Social Media Version:")
      );
      const shortVersion = shortLine?.split(":").slice(1).join(":").trim();
      
      const tagsLine = lines.find(line => 
        line.includes("Tags:") || 
        line.includes("Hashtags:") ||
        line.includes("Suggested Tags:")
      );
      const tagsText = tagsLine?.split(":").slice(1).join(":").trim();
      const recommendedTags = tagsText ? 
        tagsText.split(/[\s,]+/).filter(tag => tag.trim()) : 
        undefined;

      return {
        title,
        body,
        cta,
        shortVersion,
        provider: "openai",
        recommendedTags
      };
    } catch (parseError) {
      console.error("Error parsing OpenAI response:", parseError);
      return {
        title: responseText.substring(0, responseText.indexOf('\n')),
        body: responseText,
        cta: "Contact us today!",
        provider: "openai"
      };
    }
  } catch (error) {
    console.error("Error in generateWithOpenAI:", error);
    return null;
  }
}

async function generateWithAnthropic(content: string): Promise<PromoResponse | null> {
  try {
    const anthropicApiKey = Deno.env.get("ANTHROPIC_API_KEY");
    if (!anthropicApiKey) {
      console.error("ANTHROPIC_API_KEY not found in environment");
      return null;
    }

    const response = await fetch("https://api.anthropic.com/v1/messages", {
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
            content
          }
        ],
        temperature: 0.7,
        max_tokens: 1024,
      }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error(`Anthropic API error: ${response.status} ${errorText}`);
      return null;
    }

    const data = await response.json();
    const responseText = data.content[0]?.text || "";
    
    // Parse output similar to the other functions
    try {
      const lines = responseText.split('\n').filter(line => line.trim());
      
      const title = lines.find(line => line.includes("Title:") || line.includes("Subject:"))?.split(":")[1]?.trim() || "";
      
      const startIndex = lines.findIndex(line => line.includes("Title:") || line.includes("Subject:")) + 1;
      const endIndex = lines.findIndex(line => line.includes("Call-to-Action:") || line.includes("CTA:"));
      const body = lines.slice(startIndex, endIndex > startIndex ? endIndex : undefined)
        .join('\n').trim();
      
      const cta = lines.find(line => line.includes("Call-to-Action:") || line.includes("CTA:"))?.split(":")[1]?.trim() || "";
      
      const shortLine = lines.find(line => 
        line.includes("Short Version:") || 
        line.includes("Shorter Version:") ||
        line.includes("SMS Version:") ||
        line.includes("Social Media Version:")
      );
      const shortVersion = shortLine?.split(":").slice(1).join(":").trim();
      
      const tagsLine = lines.find(line => 
        line.includes("Tags:") || 
        line.includes("Hashtags:") ||
        line.includes("Suggested Tags:")
      );
      const tagsText = tagsLine?.split(":").slice(1).join(":").trim();
      const recommendedTags = tagsText ? 
        tagsText.split(/[\s,]+/).filter(tag => tag.trim()) : 
        undefined;

      return {
        title,
        body,
        cta,
        shortVersion,
        provider: "anthropic",
        recommendedTags
      };
    } catch (parseError) {
      console.error("Error parsing Anthropic response:", parseError);
      return {
        title: responseText.substring(0, responseText.indexOf('\n')),
        body: responseText,
        cta: "Contact us today!",
        provider: "anthropic"
      };
    }
  } catch (error) {
    console.error("Error in generateWithAnthropic:", error);
    return null;
  }
}
