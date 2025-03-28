
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
    const apiKey = Deno.env.get('ANTHROPIC_API_KEY');
    if (!apiKey) {
      throw new Error('Anthropic API key not found');
    }

    const { prompt, language = "javascript", context = "" } = await req.json();
    
    if (!prompt) {
      throw new Error('No prompt provided');
    }

    // Construct a system message for code generation
    let systemMessage = "You are an expert software developer specializing in creating clean, efficient, and well-documented code. ";
    systemMessage += `Your task is to generate ${language} code based on the user's requirements. `;
    systemMessage += "Provide the code with appropriate comments and explanations. ";
    systemMessage += "Focus on best practices, readability, and maintainability.";

    // Include context if provided
    let userMessage = prompt;
    if (context) {
      userMessage = `Here is some context about the existing codebase:\n\n${context}\n\nNow, please ${prompt}`;
    }

    const response = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: {
        'x-api-key': apiKey,
        'anthropic-version': '2023-06-01',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'claude-3-sonnet-20240229',
        max_tokens: 4000,
        system: systemMessage,
        messages: [
          { role: 'user', content: userMessage }
        ],
      }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`Anthropic API error: ${response.status} ${errorText}`);
    }

    const result = await response.json();
    return new Response(JSON.stringify({
      code: result.content[0].text,
      language,
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
