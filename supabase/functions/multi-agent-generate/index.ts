
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { enhanceContent, analyzeContent, generateEmailContent, translateContent, Agent } from "./agents.ts";

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

  constructor(apiKey: string) {
    this.apiKey = apiKey;
  }

  async generate(
    prompt: string,
    temperature: number = 0.7,
    maxTokens: number = 1024,
    domain: string = "innovatehub.ph"
  ): Promise<string> {
    try {
      const response = await fetch(
        `${GEMINI_ENDPOINT}?key=${this.apiKey}`,
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
          model: "gemini-1.5-pro"
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
          model: "gemini-1.5-pro",
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
          model: "gemini-1.5-pro",
          metadata: { targetLanguage }
        };
        break;
        
      default:
        // Default to enhancement if agent type isn't recognized
        console.warn(`Unknown agent type: ${agentType}, falling back to enhancement`);
        result = {
          text: await enhanceContent(content, agent, geminiClient, domain),
          provider: "gemini",
          model: "gemini-1.5-pro"
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
