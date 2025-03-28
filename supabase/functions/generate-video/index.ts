
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
    const apiKey = Deno.env.get('RUNWAY_API_KEY');
    if (!apiKey) {
      throw new Error('Runway API key not found');
    }

    const { prompt, generationId } = await req.json();
    
    // If checking an existing generation
    if (generationId) {
      const response = await fetch(`https://api.runwayml.com/v1/generations/${generationId}`, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${apiKey}`,
          'Content-Type': 'application/json',
        },
      });
      
      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`Runway API error: ${response.status} ${errorText}`);
      }
      
      const result = await response.json();
      return new Response(JSON.stringify(result), {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }
    
    // If starting a new generation
    if (!prompt) {
      throw new Error('No prompt provided');
    }

    const response = await fetch('https://api.runwayml.com/v1/generations', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'gen-2',
        input: {
          prompt,
        },
      }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`Runway API error: ${response.status} ${errorText}`);
    }

    const result = await response.json();
    return new Response(JSON.stringify(result), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error('Error:', error);
    
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});
