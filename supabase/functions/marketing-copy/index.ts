
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
    const apiKey = Deno.env.get('OPENAI_API_KEY');
    if (!apiKey) {
      throw new Error('OpenAI API key not found');
    }

    const { 
      prompt, 
      marketingType = "social_media", 
      tone = "professional",
      targetAudience = "general" 
    } = await req.json();
    
    if (!prompt) {
      throw new Error('No prompt provided');
    }

    // Construct a system message based on the marketing type
    let systemMessage = "You are an expert marketing copywriter specializing in ";
    
    switch(marketingType) {
      case "social_media":
        systemMessage += "creating engaging social media posts that drive engagement.";
        break;
      case "email":
        systemMessage += "crafting compelling email campaigns with high open and conversion rates.";
        break;
      case "website":
        systemMessage += "writing persuasive website copy that converts visitors to customers.";
        break;
      case "ad":
        systemMessage += "developing effective advertising copy that catches attention and drives action.";
        break;
      default:
        systemMessage += "all forms of marketing content.";
    }
    
    systemMessage += ` Your tone should be ${tone} and you're targeting ${targetAudience} audience.`;
    systemMessage += " Provide only the marketing copy without any introductions or explanations.";

    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'gpt-4o-mini',
        messages: [
          { role: 'system', content: systemMessage },
          { role: 'user', content: prompt }
        ],
        temperature: 0.7,
      }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`OpenAI API error: ${response.status} ${errorText}`);
    }

    const result = await response.json();
    return new Response(JSON.stringify({
      copy: result.choices[0].message.content,
      marketingType,
      tone,
      targetAudience
    }), {
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
