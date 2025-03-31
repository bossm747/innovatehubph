
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { enhanceContent, analyzeContent, generateEmailContent, translateContent, Agent } from "./agents.ts";

// Constants for API endpoints
const GEMINI_ENDPOINT = "https://generativelanguage.googleapis.com/v1";
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
  agentType?: string;
  targetLanguage?: string;
  parameters?: Record<string, any>;
  options?: {
    temperature?: number;
    maxTokens?: number;
  };
}

interface AgentResponse {
  text: string;
  provider: string;
  model: string;
  metadata?: Record<string, any>;
}

// Gemini Client Class
class GeminiClient {
  private apiKey: string;
  private modelVersion: string = "gemini-1.5-pro"; // Default model

  constructor(apiKey: string) {
    this.apiKey = apiKey;
  }

  async initialize(): Promise<void> {
    // Check for best available model version
    this.modelVersion = await this.getBestGeminiModel();
    console.log(`Using Gemini model: ${this.modelVersion}`);
  }

  async generate(
    prompt: string,
    temperature: number = 0.7,
    maxTokens: number = 1024,
    domain: string = "innovatehub.ph"
  ): Promise<string> {
    try {
      const response = await fetch(
        `${GEMINI_ENDPOINT}/models/${this.modelVersion}:generateContent?key=${this.apiKey}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            contents: [{
              parts: [{
                text: `${domain ? `[Context: ${domain}] ` : ''}${prompt}`
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
        throw new Error(`Gemini API error: ${response.status} ${errorText}`);
      }

      const data = await response.json();
      return data.candidates[0]?.content?.parts[0]?.text || "";
    } catch (error) {
      console.error("Error in GeminiClient.generate:", error);
      throw error;
    }
  }

  // Utility to check for the best available Gemini model
  private async getBestGeminiModel(): Promise<string> {
    const modelPreference = [
      "gemini-2.5-pro", 
      "gemini-2.0-pro", 
      "gemini-1.5-pro"
    ];
    
    for (const model of modelPreference) {
      try {
        const testResponse = await fetch(`${GEMINI_ENDPOINT}/models/${model}:generateContent?key=${this.apiKey}`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            contents: [{ parts: [{ text: "Test prompt" }] }],
            generationConfig: { maxOutputTokens: 1 }
          })
        });
        
        // If we get a 404, the model doesn't exist
        if (testResponse.status === 404) {
          console.log(`${model} is not available yet`);
          continue;
        }
        
        // Check for non-auth related errors (model exists but other issues)
        if (!testResponse.ok) {
          const errorData = await testResponse.json();
          if (errorData.error?.code === 401 || errorData.error?.message?.includes("API key")) {
            console.log(`${model} auth error, but model likely exists`);
            continue;
          }
        }
        
        // If we get here, the model exists and is available
        console.log(`${model} is available and will be used`);
        return model;
      } catch (error) {
        console.error(`Error checking for ${model}:`, error);
      }
    }
    
    // Default fallback
    return "gemini-1.5-pro";
  }
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
    const { 
      content, 
      agentId, 
      domain = "innovatehub.ph", 
      provider = "gemini", 
      agentType = "enhancement",
      targetLanguage,
      parameters = {},
      options = {} 
    } = requestData;
    
    console.log(`Processing request for agent type: ${agentType}`);

    // Initialize the Gemini client
    const geminiApiKey = Deno.env.get("GEMINI_API_KEY");
    if (!geminiApiKey) {
      throw new Error("GEMINI_API_KEY not found in environment");
    }
    const geminiClient = new GeminiClient(geminiApiKey);
    await geminiClient.initialize();

    // Set up the agent
    const agent: Agent = {
      type: agentType as any,
      name: agentId || `InnovateHub ${agentType} Agent`,
      parameters
    };

    let result: any;

    // Process request based on agent type
    switch (agentType) {
      case "enhancement":
        result = {
          text: await enhanceContent(content, agent, geminiClient, domain),
          provider: "gemini",
          model: geminiClient["modelVersion"]
        };
        break;
        
      case "analysis":
        const openaiApiKey = Deno.env.get("OPENAI_API_KEY");
        if (!openaiApiKey) {
          throw new Error("OPENAI_API_KEY required for analysis agent");
        }
        const analysis = await analyzeContent(content, agent, openaiApiKey);
        result = {
          text: content, // Return original content
          provider: "openai",
          model: "gpt-4o-mini",
          metadata: { analysis }
        };
        break;
        
      case "email-generator":
        const template = parameters.template || "standard";
        result = {
          text: await generateEmailContent(template, parameters, agent, geminiClient, domain),
          provider: "gemini",
          model: geminiClient["modelVersion"],
          metadata: { template, parameters }
        };
        break;
        
      case "translator":
        if (!targetLanguage) {
          throw new Error("Target language required for translator agent");
        }
        result = {
          text: await translateContent(content, targetLanguage, agent, geminiClient),
          provider: "gemini",
          model: geminiClient["modelVersion"],
          metadata: { targetLanguage }
        };
        break;
        
      default:
        // Default to enhancement if agent type isn't recognized
        console.warn(`Unknown agent type: ${agentType}, falling back to enhancement`);
        result = {
          text: await enhanceContent(content, agent, geminiClient, domain),
          provider: "gemini",
          model: geminiClient["modelVersion"]
        };
    }
    
    // Connect to email-sending functionality if needed
    if (parameters.sendEmail === true && result.text) {
      try {
        console.log("Sending email with generated content...");
        
        const emailResponse = await fetch(`${req.url.split('/multi-agent-generate')[0]}/email-marketing`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': req.headers.get('Authorization') || '',
          },
          body: JSON.stringify({
            subject: parameters.subject || "Message from InnovateHub",
            recipients: parameters.recipients || [],
            templateType: parameters.templateType || "newsletter",
            templateContent: {
              title: parameters.title || parameters.subject || "InnovateHub Update",
              intro: parameters.intro || "Thank you for your interest in our services.",
              message: result.text,
              ctaText: parameters.ctaText || "Learn More",
              ctaLink: parameters.ctaLink || "https://innovatehub.ph",
              customMessage: parameters.customMessage || ""
            },
            htmlTemplate: parameters.htmlTemplate || undefined,
            scheduledAt: parameters.scheduledAt || null
          }),
        });
        
        const emailResult = await emailResponse.json();
        console.log("Email sending result:", emailResult);
        
        // Add email sending result to the response metadata
        result.metadata = {
          ...result.metadata,
          emailSent: emailResult.success,
          emailResult
        };
      } catch (emailError) {
        console.error("Error sending email:", emailError);
        result.metadata = {
          ...result.metadata,
          emailSent: false,
          emailError: emailError.message
        };
      }
    }

    return new Response(
      JSON.stringify(result),
      {
        headers: { "Content-Type": "application/json", ...corsHeaders },
        status: 200,
      }
    );
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
