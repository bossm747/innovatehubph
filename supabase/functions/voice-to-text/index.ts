
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
    const apiKey = Deno.env.get('ASSEMBLYAI_API_KEY');
    if (!apiKey) {
      throw new Error('AssemblyAI API key not found');
    }

    // Get the audio file from the request
    const formData = await req.formData();
    const audioFile = formData.get('audio');
    
    if (!audioFile || !(audioFile instanceof File)) {
      throw new Error('No audio file provided');
    }

    // Upload the audio file to AssemblyAI
    const uploadResponse = await fetch('https://api.assemblyai.com/v2/upload', {
      method: 'POST',
      headers: {
        'Authorization': apiKey,
      },
      body: await audioFile.arrayBuffer(),
    });

    if (!uploadResponse.ok) {
      throw new Error(`Failed to upload file: ${uploadResponse.statusText}`);
    }

    const { upload_url } = await uploadResponse.json();

    // Start the transcription job
    const transcriptionResponse = await fetch('https://api.assemblyai.com/v2/transcript', {
      method: 'POST',
      headers: {
        'Authorization': apiKey,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        audio_url: upload_url,
      }),
    });

    if (!transcriptionResponse.ok) {
      throw new Error(`Failed to start transcription: ${transcriptionResponse.statusText}`);
    }

    const { id: transcriptId } = await transcriptionResponse.json();
    
    // Poll for the transcription result
    let transcript = null;
    let status = 'processing';
    
    while (status !== 'completed' && status !== 'error') {
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      const checkResponse = await fetch(`https://api.assemblyai.com/v2/transcript/${transcriptId}`, {
        headers: {
          'Authorization': apiKey,
        },
      });
      
      if (!checkResponse.ok) {
        throw new Error(`Failed to check transcription status: ${checkResponse.statusText}`);
      }
      
      const result = await checkResponse.json();
      status = result.status;
      
      if (status === 'completed') {
        transcript = result;
      } else if (status === 'error') {
        throw new Error(`Transcription error: ${result.error}`);
      }
    }

    return new Response(JSON.stringify(transcript), {
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
