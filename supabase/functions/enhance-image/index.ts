
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
    const { image } = await req.json();
    
    if (!image) {
      return new Response(
        JSON.stringify({ error: 'Image is required' }),
        { headers: { ...corsHeaders, 'Content-Type': 'application/json' }, status: 400 }
      );
    }

    // Call the Replicate API to enhance the image
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
        version: "42fed1c4974146d4d2414e2be2c5277c7fcf05fcc3a73abf41610695738c1d7b",
        input: {
          image,
          scale: 2,
          face_enhance: true,
          version: "v1.4"
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
        return new Response(
          JSON.stringify({ image: status.output }),
          { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
        );
      } else if (status.status === 'failed') {
        throw new Error(`Image enhancement failed: ${status.error}`);
      }
      
      // Wait a bit before checking again
      await new Promise(resolve => setTimeout(resolve, 1000));
    }
    
    throw new Error('Unexpected error in image enhancement');
  } catch (error) {
    console.error('Error enhancing image:', error);
    
    return new Response(
      JSON.stringify({ error: 'Failed to enhance image', details: error.message }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' }, status: 500 }
    );
  }
});
