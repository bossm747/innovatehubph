
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.31.0";

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
    const { prompt, provider, size = "1024x1024" } = await req.json();
    
    if (!prompt) {
      return new Response(
        JSON.stringify({ error: 'Prompt is required' }),
        { headers: { ...corsHeaders, 'Content-Type': 'application/json' }, status: 400 }
      );
    }

    if (!provider) {
      return new Response(
        JSON.stringify({ error: 'Provider is required' }),
        { headers: { ...corsHeaders, 'Content-Type': 'application/json' }, status: 400 }
      );
    }

    let result;
    
    switch (provider.toLowerCase()) {
      case 'openai':
        result = await generateWithOpenAI(prompt, size);
        break;
      case 'replicate':
        result = await generateWithReplicate(prompt);
        break;
      case 'huggingface':
        result = await generateWithHuggingFace(prompt);
        break;
      default:
        return new Response(
          JSON.stringify({ error: 'Unsupported provider' }),
          { headers: { ...corsHeaders, 'Content-Type': 'application/json' }, status: 400 }
        );
    }
    
    // Create a response with the image data
    return new Response(
      JSON.stringify({ image: result, prompt }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  } catch (error) {
    console.error('Error generating image:', error);
    
    return new Response(
      JSON.stringify({ error: 'Failed to generate image', details: error.message }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' }, status: 500 }
    );
  }
});

async function generateWithOpenAI(prompt: string, size: string): Promise<string> {
  const apiKey = Deno.env.get('OPENAI_API_KEY');
  
  if (!apiKey) {
    throw new Error('OPENAI_API_KEY is not set');
  }
  
  const response = await fetch('https://api.openai.com/v1/images/generations', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${apiKey}`
    },
    body: JSON.stringify({
      model: "dall-e-3",
      prompt,
      n: 1,
      size
    })
  });
  
  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(`OpenAI API error: ${errorData.error?.message || response.statusText}`);
  }
  
  const data = await response.json();
  return data.data[0].url;
}

async function generateWithReplicate(prompt: string): Promise<string> {
  const apiKey = Deno.env.get('REPLICATE_API_KEY');
  
  if (!apiKey) {
    throw new Error('REPLICATE_API_KEY is not set');
  }
  
  // Start the prediction
  const response = await fetch('https://api.replicate.com/v1/predictions', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Token ${apiKey}`
    },
    body: JSON.stringify({
      version: "2facb4a474a0462c15041b78b1ad70952ea46b5ec6ad29583c0b29dbd4249591",
      input: {
        prompt
      }
    })
  });
  
  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(`Replicate API error: ${errorData.detail || response.statusText}`);
  }
  
  const prediction = await response.json();
  
  // Poll until the prediction is complete
  let result;
  while (!result) {
    const statusResponse = await fetch(`https://api.replicate.com/v1/predictions/${prediction.id}`, {
      headers: {
        'Authorization': `Token ${apiKey}`
      }
    });
    
    if (!statusResponse.ok) {
      const errorData = await statusResponse.json();
      throw new Error(`Replicate API error: ${errorData.detail || statusResponse.statusText}`);
    }
    
    const status = await statusResponse.json();
    
    if (status.status === 'succeeded') {
      return status.output[0];
    } else if (status.status === 'failed') {
      throw new Error(`Replicate generation failed: ${status.error}`);
    }
    
    // Wait a bit before checking again
    await new Promise(resolve => setTimeout(resolve, 1000));
  }
  
  throw new Error('Unexpected error in Replicate generation');
}

async function generateWithHuggingFace(prompt: string): Promise<string> {
  const apiKey = Deno.env.get('HUGGINGFACE_API_KEY');
  
  if (!apiKey) {
    throw new Error('HUGGINGFACE_API_KEY is not set');
  }
  
  const response = await fetch('https://api-inference.huggingface.co/models/stabilityai/stable-diffusion-xl-base-1.0', {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${apiKey}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      inputs: prompt
    })
  });
  
  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`HuggingFace API error: ${errorText || response.statusText}`);
  }
  
  // Get image as blob and convert to base64
  const imageBlob = await response.blob();
  const buffer = await imageBlob.arrayBuffer();
  const base64 = btoa(String.fromCharCode(...new Uint8Array(buffer)));
  
  return `data:image/png;base64,${base64}`;
}
