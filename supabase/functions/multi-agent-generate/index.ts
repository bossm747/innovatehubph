
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.23.0";
import { providers } from "./providers.ts";
import { Agent, AgentResult, analyzeContent, enhanceContent } from "./agents.ts";

// CORS headers for browser access
const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { content, domain, agentId } = await req.json();
    
    if (!content) {
      return new Response(
        JSON.stringify({ error: "Content is required" }),
        { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    // Create Supabase client
    const supabaseUrl = Deno.env.get("SUPABASE_URL") ?? "";
    const supabaseKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") ?? "";
    const supabase = createClient(supabaseUrl, supabaseKey);
    
    // Fetch agent configuration if agentId is provided
    let agent: Agent;
    
    if (agentId) {
      const { data: agentData, error: agentError } = await supabase
        .from('ai_agents')
        .select('*')
        .eq('id', agentId)
        .single();
        
      if (agentError || !agentData) {
        console.error("Error fetching agent config:", agentError);
        return new Response(
          JSON.stringify({ error: "Agent not found" }),
          { status: 404, headers: { ...corsHeaders, "Content-Type": "application/json" } }
        );
      }
      
      agent = {
        type: agentData.type === 'analysis' ? 'analysis' : 'enhancement',
        name: agentData.name,
        capability: agentData.capabilities?.[0]
      };
    } else {
      // Default agent if no ID provided
      agent = {
        type: 'enhancement',
        name: 'InnovateHub Marketing Assistant',
        capability: 'email_marketing'
      };
    }
    
    // Process content based on agent type
    let result: AgentResult;
    
    if (agent.type === 'analysis') {
      const openAIKey = Deno.env.get("OPENAI_API_KEY") ?? "";
      const analysis = await analyzeContent(content, agent, openAIKey);
      result = {
        text: content,
        analysis,
        provider: "OpenAI",
        domain
      };
    } else {
      // Get primary AI provider (Gemini)
      const geminiApiKey = Deno.env.get("GEMINI_API_KEY") ?? "";
      
      if (!geminiApiKey) {
        return new Response(
          JSON.stringify({ error: "Gemini API key not configured" }),
          { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
        );
      }
      
      // Create Gemini client using the provider module
      const geminiClient = providers.gemini(geminiApiKey);
      
      // Enhance content with the configured agent
      const enhancedText = await enhanceContent(content, agent, geminiClient, domain);
      
      result = {
        text: enhancedText,
        provider: "Google Gemini",
        domain
      };
    }
    
    return new Response(
      JSON.stringify(result),
      { headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  } catch (error) {
    console.error("Error:", error.message);
    return new Response(
      JSON.stringify({ error: error.message }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }
});
