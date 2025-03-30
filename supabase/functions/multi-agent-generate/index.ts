
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { GoogleGenerativeAI } from "https://esm.sh/@google/generative-ai@1.0.0";
import { 
  GeminiClient, 
  OpenAIClient, 
  AnthropicClient, 
  MistralClient, 
  AIClient 
} from "./providers.ts";
import { 
  enhanceContent, 
  analyzeContent, 
  Agent, 
  AgentResult 
} from "./agents.ts";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

// Set up provider API keys
const GEMINI_API_KEY = Deno.env.get('GEMINI_API_KEY');
const OPENAI_API_KEY = Deno.env.get('OPENAI_API_KEY');
const ANTHROPIC_API_KEY = Deno.env.get('ANTHROPIC_API_KEY');
const MISTRAL_API_KEY = Deno.env.get('MISTRAL_API_KEY');

// Initialize AI provider clients
const geminiClient = new GeminiClient(GEMINI_API_KEY || "");
const openAIClient = new OpenAIClient(OPENAI_API_KEY || "");
const anthropicClient = new AnthropicClient(ANTHROPIC_API_KEY || "");
const mistralClient = new MistralClient(MISTRAL_API_KEY || "");

// Set up Google API client
if (GEMINI_API_KEY) {
  const googleAI = new GoogleGenerativeAI(GEMINI_API_KEY);
  geminiClient.setClient(googleAI);
}

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { 
      prompt, 
      agentId, 
      agents = [],
      temperature = 0.7, 
      maxTokens = 1000,
      domain = "innovatehub.ph" 
    } = await req.json();
    
    if (!prompt) {
      return new Response(
        JSON.stringify({ error: 'Prompt is required' }),
        { headers: { ...corsHeaders, 'Content-Type': 'application/json' }, status: 400 }
      );
    }

    // Generate initial content with primary agent
    let result = await generateWithPrimaryAgent(prompt, temperature, maxTokens, domain);
    console.log("Generated content with primary agent");
    
    // Process with additional agents if specified
    const agentResult = await processWithAgents(result, agents, domain);
    
    // Create a response with the text data and any analysis
    return new Response(
      JSON.stringify(agentResult),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  } catch (error) {
    console.error('Error in multi-agent generation:', error);
    
    return new Response(
      JSON.stringify({ error: 'Failed to generate content', details: error.message }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' }, status: 500 }
    );
  }
});

async function generateWithPrimaryAgent(
  prompt: string, 
  temperature: number = 0.7,
  maxTokens: number = 1000,
  domain: string = "innovatehub.ph"
): Promise<string> {
  // Try each provider in order of preference until one succeeds
  const providers: AIClient[] = [
    geminiClient,
    openAIClient,
    anthropicClient,
    mistralClient
  ];
  
  // Try each provider in sequence until one works
  for (const provider of providers) {
    try {
      return await provider.generate(prompt, temperature, maxTokens, domain);
    } catch (error) {
      console.error(`Provider generation failed, trying next provider:`, error);
      // Continue to next provider
    }
  }
  
  // If all providers fail, throw an error
  throw new Error("All AI providers failed. Please check API keys and try again.");
}

async function processWithAgents(
  content: string, 
  agents: Agent[],
  domain: string = "innovatehub.ph"
): Promise<AgentResult> {
  let result = content;
  let analysis = null;
  
  // Skip if no agents specified
  if (!agents || agents.length === 0) {
    return { text: result };
  }
  
  // Process each agent in sequence
  for (const agent of agents) {
    if (agent.type === 'enhancement') {
      // Only initialize Google client if needed for enhancement
      if (GEMINI_API_KEY) {
        const googleAI = new GoogleGenerativeAI(GEMINI_API_KEY);
        result = await enhanceContent(result, agent, googleAI, domain);
        console.log(`Enhanced content with ${agent.name} agent`);
      }
    } else if (agent.type === 'analysis') {
      analysis = await analyzeContent(result, agent, OPENAI_API_KEY || "");
      console.log(`Analyzed content with ${agent.name} agent`);
    }
  }
  
  return { 
    text: result, 
    analysis: analysis,
    provider: "multi-agent", 
    domain 
  };
}
