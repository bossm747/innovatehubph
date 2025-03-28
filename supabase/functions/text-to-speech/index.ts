
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
    const apiKey = Deno.env.get('ELEVENLABS_API_KEY');
    if (!apiKey) {
      throw new Error('ElevenLabs API key not found');
    }

    const { text, voiceId = 'EXAVITQu4vr4xnSDxMaL', model = 'eleven_multilingual_v2' } = await req.json();
    
    if (!text) {
      throw new Error('No text provided');
    }

    const response = await fetch(`https://api.elevenlabs.io/v1/text-to-speech/${voiceId}`, {
      method: 'POST',
      headers: {
        'Accept': 'audio/mpeg',
        'xi-api-key': apiKey,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        text,
        model_id: model,
        voice_settings: {
          stability: 0.5,
          similarity_boost: 0.75,
        },
      }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`ElevenLabs API error: ${response.status} ${errorText}`);
    }

    // Get audio as ArrayBuffer
    const audioBuffer = await response.arrayBuffer();
    
    // Convert to base64 for easier handling in the frontend
    const base64Audio = btoa(
      new Uint8Array(audioBuffer)
        .reduce((data, byte) => data + String.fromCharCode(byte), '')
    );

    return new Response(
      JSON.stringify({ 
        audio: `data:audio/mpeg;base64,${base64Audio}`,
      }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  } catch (error) {
    console.error('Error:', error);
    
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});
