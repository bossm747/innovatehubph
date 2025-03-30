
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { GoogleGenerativeAI } from "https://esm.sh/@google/generative-ai@1.0.0";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.23.0";
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

// Initialize Supabase client
const supabaseUrl = Deno.env.get('SUPABASE_URL') || '';
const supabaseServiceKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') || '';
const supabase = createClient(supabaseUrl, supabaseServiceKey);

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

// Interface for agent configurations from database
interface DbAgent {
  id: string;
  name: string;
  description: string;
  provider: string;
  model: string;
  temperature: number;
  max_tokens: number;
  prompt_template: string;
  is_active: boolean;
  type: string;
  capabilities: string[];
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

    // If specific agentId is provided, use that agent from the database
    if (agentId) {
      const { data: dbAgent, error } = await supabase
        .from('ai_agents')
        .select('*')
        .eq('id', agentId)
        .eq('is_active', true)
        .single();
      
      if (error || !dbAgent) {
        return new Response(
          JSON.stringify({ error: 'Agent not found or inactive' }),
          { headers: { ...corsHeaders, 'Content-Type': 'application/json' }, status: 404 }
        );
      }
      
      // Generate content with the specified agent
      const result = await generateWithAgent(prompt, dbAgent, domain);
      return new Response(
        JSON.stringify({ text: result, provider: dbAgent.provider, agent: dbAgent.name }),
        { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
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

async function generateWithAgent(
  prompt: string,
  dbAgent: DbAgent,
  domain: string
): Promise<string> {
  try {
    // Format the prompt using the agent's template
    const formattedPrompt = dbAgent.prompt_template.replace('{input}', prompt);
    
    // Select the appropriate client based on the provider
    let client: AIClient;
    switch (dbAgent.provider) {
      case 'gemini':
        client = geminiClient;
        break;
      case 'openai':
        client = openAIClient;
        break;
      case 'anthropic':
        client = anthropicClient;
        break;
      case 'mistral':
        client = mistralClient;
        break;
      default:
        client = geminiClient; // Default to Gemini
    }
    
    // Generate content using the specified client
    const result = await client.generate(
      formattedPrompt, 
      dbAgent.temperature, 
      dbAgent.max_tokens,
      domain
    );
    
    return result;
  } catch (error) {
    console.error(`Error generating with agent ${dbAgent.name}:`, error);
    throw error;
  }
}

async function generateWithPrimaryAgent(
  prompt: string, 
  temperature: number = 0.7,
  maxTokens: number = 1000,
  domain: string = "innovatehub.ph"
): Promise<string> {
  try {
    // First try to get an active email generation agent from the database
    const { data: dbAgents, error } = await supabase
      .from('ai_agents')
      .select('*')
      .eq('type', 'email')
      .eq('is_active', true)
      .order('created_at', { ascending: false });
    
    if (!error && dbAgents && dbAgents.length > 0) {
      // Use the most recently created active email agent
      return await generateWithAgent(prompt, dbAgents[0], domain);
    }
    
    // If no agents in the database or there was an error, fall back to the provider sequence
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
      } catch (providerError) {
        console.error(`Provider generation failed, trying next provider:`, providerError);
        // Continue to next provider
      }
    }
    
    // If all providers fail, throw an error
    throw new Error("All AI providers failed. Please check API keys and try again.");
  } catch (error) {
    console.error("Error in generateWithPrimaryAgent:", error);
    throw error;
  }
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
    try {
      // Try to find matching agent configuration in database
      const { data: dbAgents, error } = await supabase
        .from('ai_agents')
        .select('*')
        .eq('type', agent.type === 'enhancement' ? 'content' : 'analysis')
        .eq('is_active', true)
        .limit(1);
      
      if (!error && dbAgents && dbAgents.length > 0) {
        const dbAgent = dbAgents[0];
        
        if (agent.type === 'enhancement') {
          // Use the agent from database for enhancement
          const formattedPrompt = dbAgent.prompt_template.replace('{input}', result);
          
          // Select appropriate client based on provider
          let client: AIClient;
          switch (dbAgent.provider) {
            case 'gemini':
              if (!GEMINI_API_KEY) continue;
              client = geminiClient;
              break;
            case 'openai':
              if (!OPENAI_API_KEY) continue;
              client = openAIClient;
              break;
            case 'anthropic':
              if (!ANTHROPIC_API_KEY) continue;
              client = anthropicClient;
              break;
            case 'mistral':
              if (!MISTRAL_API_KEY) continue;
              client = mistralClient;
              break;
            default:
              if (!GEMINI_API_KEY) continue;
              client = geminiClient;
          }
          
          result = await client.generate(
            formattedPrompt, 
            dbAgent.temperature, 
            dbAgent.max_tokens,
            domain
          );
          console.log(`Enhanced content with ${dbAgent.name} agent`);
        } else if (agent.type === 'analysis') {
          // Use OpenAI for analysis with agent from database
          if (OPENAI_API_KEY) {
            const formattedPrompt = dbAgent.prompt_template.replace('{input}', result);
            analysis = await analyzeContent(result, agent, OPENAI_API_KEY || "");
            console.log(`Analyzed content with ${dbAgent.name} agent`);
          }
        }
      } else {
        // Fall back to default implementations if no matching agents in database
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
    } catch (agentError) {
      console.error(`Error processing with agent ${agent.name}:`, agentError);
      // Continue with next agent on error
    }
  }
  
  return { 
    text: result, 
    analysis: analysis,
    provider: "multi-agent", 
    domain 
  };
}
