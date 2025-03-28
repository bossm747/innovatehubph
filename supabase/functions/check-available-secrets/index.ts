import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

// Helper function to check if a secret exists and is not empty
const checkSecret = (name: string): { name: string; available: boolean; service: string } => {
  const value = Deno.env.get(name);
  const service = name.split('_')[0].toLowerCase();
  return {
    name,
    available: !!value && value.length > 0,
    service,
  };
};

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    // List of secrets to check
    const secretsToCheck = [
      // OpenAI
      'OPENAI_API_KEY',
      
      // Image generation
      'REPLICATE_API_KEY',
      'GETIMG_API_KEY',
      'RUNWAY_API_KEY',
      'HUGGINGFACE_API_KEY',
      
      // Text generation
      'ANTHROPIC_API_KEY',
      'GEMINI_API_KEY',
      'MISTRAL_API_KEY',
      
      // Others
      'ELEVENLABS_API_KEY',
      'ASSEMBLYAI_API_KEY',
      'WEBPILOT_API_KEY',
      'TAVILY_API_KEY',
      'E2B_API_KEY',
      'GITHUB_API_KEY',
      'ANYTHINGLLM_API_KEY',
      'GROQ_API_KEY',
    ];

    // Check all secrets
    const secrets = secretsToCheck.map(checkSecret);

    // Group secrets by service
    const groupedSecrets = secrets.reduce((acc, secret) => {
      if (!acc[secret.service]) {
        acc[secret.service] = [];
      }
      acc[secret.service].push(secret);
      return acc;
    }, {} as Record<string, typeof secrets>);

    return new Response(
      JSON.stringify({ 
        secrets,
        groupedSecrets,
      }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  } catch (error) {
    console.error('Error checking secrets:', error);
    
    return new Response(
      JSON.stringify({ error: 'Failed to check secrets', details: error.message }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' }, status: 500 }
    );
  }
});
