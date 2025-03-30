
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

// Constants for API endpoints
const GEMINI_ENDPOINT = "https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-pro:generateContent";
const OPENAI_ENDPOINT = "https://api.openai.com/v1/chat/completions";
const ANTHROPIC_ENDPOINT = "https://api.anthropic.com/v1/messages";
const MISTRAL_ENDPOINT = "https://api.mistral.ai/v1/chat/completions";

// CORS headers
const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
};

// Types
interface RequestBody {
  content: string;
  agentId?: string | null;
  domain?: string;
  provider?: string;
  options?: {
    temperature?: number;
    maxTokens?: number;
  };
}

interface AgentResponse {
  text: string;
  provider: string;
  model: string;
}

// Serve the endpoint
serve(async (req: Request) => {
  // Handle CORS preflight requests
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    // Parse request body
    const requestData: RequestBody = await req.json();
    const { content, agentId, domain = "innovatehub.ph", provider = "gemini", options = {} } = requestData;
    
    console.log(`Processing request for content: ${content.substring(0, 50)}...`);

    // Build the email context with domain information
    const emailContext = domain ? `You are writing for the domain ${domain}. ` : "";
    
    // Try with the primary provider (Gemini by default)
    const primaryResult = await generateWithProvider(
      provider,
      `${emailContext}${content}`,
      options
    );
    
    if (primaryResult) {
      return new Response(
        JSON.stringify(primaryResult),
        {
          headers: { "Content-Type": "application/json", ...corsHeaders },
          status: 200,
        }
      );
    }
    
    // If primary fails, try OpenAI as fallback
    console.log("Primary provider failed, trying OpenAI as fallback...");
    const openaiResult = await generateWithProvider(
      "openai",
      `${emailContext}${content}`,
      options
    );
    
    if (openaiResult) {
      return new Response(
        JSON.stringify(openaiResult),
        {
          headers: { "Content-Type": "application/json", ...corsHeaders },
          status: 200,
        }
      );
    }
    
    // If OpenAI fails, try Anthropic as second fallback
    console.log("OpenAI fallback failed, trying Anthropic as fallback...");
    const anthropicResult = await generateWithProvider(
      "anthropic",
      `${emailContext}${content}`,
      options
    );
    
    if (anthropicResult) {
      return new Response(
        JSON.stringify(anthropicResult),
        {
          headers: { "Content-Type": "application/json", ...corsHeaders },
          status: 200,
        }
      );
    }
    
    // If all fail, return an error
    throw new Error("All providers failed to generate content");

  } catch (error) {
    console.error("Error in multi-agent-generate:", error);
    return new Response(
      JSON.stringify({ error: error.message || "An error occurred during content generation" }),
      {
        headers: { "Content-Type": "application/json", ...corsHeaders },
        status: 500,
      }
    );
  }
});

async function generateWithProvider(
  provider: string,
  content: string,
  options: { temperature?: number; maxTokens?: number }
): Promise<AgentResponse | null> {
  try {
    const { temperature = 0.7, maxTokens = 1024 } = options;
    
    switch (provider.toLowerCase()) {
      case "gemini":
        return await generateWithGemini(content, temperature, maxTokens);
      case "openai":
        return await generateWithOpenAI(content, temperature, maxTokens);
      case "anthropic":
        return await generateWithAnthropic(content, temperature, maxTokens);
      case "mistral":
        return await generateWithMistral(content, temperature, maxTokens);
      default:
        console.warn(`Unknown provider: ${provider}, falling back to Gemini`);
        return await generateWithGemini(content, temperature, maxTokens);
    }
  } catch (error) {
    console.error(`Error generating with ${provider}:`, error);
    return null;
  }
}

async function generateWithGemini(
  content: string,
  temperature: number,
  maxTokens: number
): Promise<AgentResponse | null> {
  try {
    const geminiApiKey = Deno.env.get("GEMINI_API_KEY");
    if (!geminiApiKey) {
      console.error("GEMINI_API_KEY not found in environment");
      return null;
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
              text: content
            }]
          }],
          generationConfig: {
            temperature,
            maxOutputTokens: maxTokens,
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
    const generatedText = data.candidates[0]?.content?.parts[0]?.text || "";

    return {
      text: generatedText,
      provider: "gemini",
      model: "gemini-1.5-pro"
    };
  } catch (error) {
    console.error("Error in generateWithGemini:", error);
    return null;
  }
}

async function generateWithOpenAI(
  content: string,
  temperature: number,
  maxTokens: number
): Promise<AgentResponse | null> {
  try {
    const openaiApiKey = Deno.env.get("OPENAI_API_KEY");
    if (!openaiApiKey) {
      console.error("OPENAI_API_KEY not found in environment");
      return null;
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
            content: "You are a professional marketing content creator. Provide clear, engaging content for email marketing campaigns."
          },
          {
            role: "user",
            content
          }
        ],
        temperature,
        max_tokens: maxTokens,
      }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error(`OpenAI API error: ${response.status} ${errorText}`);
      return null;
    }

    const data = await response.json();
    const generatedText = data.choices[0]?.message?.content || "";

    return {
      text: generatedText,
      provider: "openai",
      model: "gpt-4o-mini"
    };
  } catch (error) {
    console.error("Error in generateWithOpenAI:", error);
    return null;
  }
}

async function generateWithAnthropic(
  content: string,
  temperature: number,
  maxTokens: number
): Promise<AgentResponse | null> {
  try {
    const anthropicApiKey = Deno.env.get("ANTHROPIC_API_KEY");
    if (!anthropicApiKey) {
      console.error("ANTHROPIC_API_KEY not found in environment");
      return null;
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
            content
          }
        ],
        temperature,
        max_tokens: maxTokens,
      }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error(`Anthropic API error: ${response.status} ${errorText}`);
      return null;
    }

    const data = await response.json();
    const generatedText = data.content[0]?.text || "";

    return {
      text: generatedText,
      provider: "anthropic",
      model: "claude-3-haiku-20240307"
    };
  } catch (error) {
    console.error("Error in generateWithAnthropic:", error);
    return null;
  }
}

async function generateWithMistral(
  content: string,
  temperature: number,
  maxTokens: number
): Promise<AgentResponse | null> {
  try {
    const mistralApiKey = Deno.env.get("MISTRAL_API_KEY");
    if (!mistralApiKey) {
      console.error("MISTRAL_API_KEY not found in environment");
      return null;
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
            content: "You are a professional marketing content creator for InnovateHub. Provide clear, engaging content for email marketing campaigns."
          },
          {
            role: "user",
            content
          }
        ],
        temperature,
        max_tokens: maxTokens,
      }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error(`Mistral API error: ${response.status} ${errorText}`);
      return null;
    }

    const data = await response.json();
    const generatedText = data.choices[0]?.message?.content || "";

    return {
      text: generatedText,
      provider: "mistral",
      model: "mistral-large-latest"
    };
  } catch (error) {
    console.error("Error in generateWithMistral:", error);
    return null;
  }
}
