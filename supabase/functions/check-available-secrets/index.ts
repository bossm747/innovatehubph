
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    // These are the secret keys we want to check
    const secretsToCheck = [
      'OPENAI_API_KEY',
      'ANTHROPIC_API_KEY', 
      'GEMINI_API_KEY',
      'MISTRAL_API_KEY',
      'REPLICATE_API_KEY',
      'HUGGINGFACE_API_KEY',
      'ELEVENLABS_API_KEY',
      'ASSEMBLYAI_API_KEY',
      'WEBPILOT_API_KEY',
      'TAVILY_API_KEY',
      'RUNWAY_API_KEY',
      'E2B_API_KEY',
      'GITHUB_API_KEY',
      'GROQ_API_KEY',
      'ANYTHINGLLM_API_KEY',
      'VECTORSHIFT_API_KEY'
    ];
    
    // Check which secrets are available
    const availableSecrets = {};
    
    for (const secretName of secretsToCheck) {
      try {
        const secretValue = Deno.env.get(secretName);
        availableSecrets[secretName] = !!secretValue;
      } catch (error) {
        console.error(`Error checking secret ${secretName}:`, error);
        availableSecrets[secretName] = false;
      }
    }
    
    // Return the list of available secrets
    return new Response(
      JSON.stringify({ 
        availableSecrets,
        timestamp: new Date().toISOString()
      }),
      { headers: { 
        ...corsHeaders, 
        'Content-Type': 'application/json' 
      }}
    );
  } catch (error) {
    console.error('Error in check-available-secrets function:', error);
    
    return new Response(
      JSON.stringify({ 
        error: 'Failed to check available secrets', 
        details: error.message 
      }),
      { 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' }, 
        status: 500 
      }
    );
  }
});
