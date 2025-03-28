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
    const { prompt, provider = 'openai', model, size = "1024x1024" } = await req.json();
    
    if (!prompt) {
      return new Response(
        JSON.stringify({ error: 'Prompt is required' }),
        { headers: { ...corsHeaders, 'Content-Type': 'application/json' }, status: 400 }
      );
    }

    let result;
    
    switch (provider.toLowerCase()) {
      case 'openai':
        result = await generateWithOpenAI(prompt, model || 'dall-e-3', size);
        break;
      case 'replicate':
        result = await generateWithReplicate(prompt, model || 'stability-ai/sdxl');
        break;
      case 'huggingface':
        result = await generateWithHuggingFace(prompt, model || 'stabilityai/stable-diffusion-xl-base-1.0');
        break;
      case 'getimg':
        result = await generateWithGetImg(prompt, model || 'realistic-vision-v5.1');
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

async function generateWithOpenAI(prompt: string, model: string, size: string): Promise<string> {
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
      model,
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

async function generateWithReplicate(prompt: string, model: string): Promise<string> {
  const apiKey = Deno.env.get('REPLICATE_API_KEY');
  
  if (!apiKey) {
    throw new Error('REPLICATE_API_KEY is not set');
  }
  
  const modelVersions: Record<string, string> = {
    'stability-ai/sdxl': '2facb4a474a0462c15041b78b1ad70952ea46b5ec6ad29583c0b29dbd4249591',
    'stability-ai/stable-diffusion': 'db21e45d3f7023abc2a46ee38a23973f6dce16bb082a930b0c49861f96d1e5bf',
    'tstramer/midjourney-diffusion': '436b051ebd8f68d23e83d22de5e198e0995357afef113768c20f0b6fcef23c8b',
    'black-forest-labs/flux-schnell': '09fc93d3142c48ad44ba83b0b7a6bc0c4b968bdfaa27c2c43e0dca7f4e3f56c9',
  };
  
  const version = modelVersions[model] || modelVersions['stability-ai/sdxl'];
  
  const response = await fetch('https://api.replicate.com/v1/predictions', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Token ${apiKey}`
    },
    body: JSON.stringify({
      version,
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
    
    await new Promise(resolve => setTimeout(resolve, 1000));
  }
  
  throw new Error('Unexpected error in Replicate generation');
}

async function generateWithHuggingFace(prompt: string, model: string): Promise<string> {
  const apiKey = Deno.env.get('HUGGINGFACE_API_KEY');
  
  if (!apiKey) {
    throw new Error('HUGGINGFACE_API_KEY is not set');
  }
  
  const response = await fetch(`https://api-inference.huggingface.co/models/${model}`, {
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
  
  const imageBlob = await response.blob();
  const buffer = await imageBlob.arrayBuffer();
  const base64 = btoa(String.fromCharCode(...new Uint8Array(buffer)));
  
  return `data:image/png;base64,${base64}`;
}

async function generateWithGetImg(prompt: string, model: string): Promise<string> {
  const apiKey = Deno.env.get('GETIMG_API_KEY');
  
  if (!apiKey) {
    throw new Error('GETIMG_API_KEY is not set');
  }
  
  const response = await fetch('https://api.getimg.ai/v1/stable-diffusion/text-to-image', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${apiKey}`
    },
    body: JSON.stringify({
      prompt,
      model_name: model,
      width: 1024,
      height: 1024,
      num_images: 1,
      guidance_scale: 7.5,
      steps: 30
    })
  });
  
  if (!response.ok) {
    const errorText = await response.text();
    try {
      const errorData = JSON.parse(errorText);
      throw new Error(`GetImg API error: ${errorData.error || response.statusText}`);
    } catch {
      throw new Error(`GetImg API error: ${errorText || response.statusText}`);
    }
  }
  
  const data = await response.json();
  return data.image_resource?.url || data.output?.image_url;
}
