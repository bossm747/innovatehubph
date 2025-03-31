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
    const { prompt, provider = 'gemini', temperature = 0.7, maxTokens = 1000 } = await req.json();
    
    if (!prompt) {
      return new Response(
        JSON.stringify({ error: 'Prompt is required' }),
        { headers: { ...corsHeaders, 'Content-Type': 'application/json' }, status: 400 }
      );
    }

    // Default to Gemini if provider not specified or invalid
    const validProvider = ['gemini', 'openai', 'anthropic', 'mistral'].includes(provider) 
      ? provider 
      : 'gemini';
    
    let result;
    console.log(`Generating text with ${validProvider} provider`);
    
    switch (validProvider) {
      case 'gemini':
        result = await generateWithGemini(prompt, temperature, maxTokens);
        break;
      case 'openai':
        result = await generateWithOpenAI(prompt, temperature, maxTokens);
        break;
      case 'anthropic':
        result = await generateWithAnthropic(prompt, temperature, maxTokens);
        break;
      case 'mistral':
        result = await generateWithMistral(prompt, temperature, maxTokens);
        break;
      default:
        // Fallback to Gemini
        result = await generateWithGemini(prompt, temperature, maxTokens);
    }
    
    // Create a response with the text data
    return new Response(
      JSON.stringify({ text: result, prompt, provider: validProvider }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  } catch (error) {
    console.error('Error generating text:', error);
    
    return new Response(
      JSON.stringify({ error: 'Failed to generate text', details: error.message }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' }, status: 500 }
    );
  }
});

async function generateWithGemini(
  prompt: string, 
  temperature: number = 0.7,
  maxTokens: number = 1000
): Promise<string> {
  const apiKey = Deno.env.get('GEMINI_API_KEY');
  
  if (!apiKey) {
    throw new Error('GEMINI_API_KEY is not set');
  }
  
  // Check if we can use Gemini 2.5 or fall back to 2.0 or 1.5
  let modelVersion = await getBestGeminiModel();
  console.log(`Using Gemini model: ${modelVersion}`);
  
  const response = await fetch(`https://generativelanguage.googleapis.com/v1/models/${modelVersion}:generateContent?key=${apiKey}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      contents: [
        {
          parts: [
            {
              text: prompt
            }
          ]
        }
      ],
      generationConfig: {
        temperature,
        maxOutputTokens: maxTokens,
        topP: 0.8,
        topK: 40,
      }
    })
  });
  
  if (!response.ok) {
    const errorData = await response.text();
    console.error('Gemini API error response:', errorData);
    throw new Error(`Gemini API error: ${response.status} ${errorData}`);
  }
  
  const data = await response.json();
  
  // Check if we have candidates
  if (!data.candidates || data.candidates.length === 0) {
    console.error('Gemini returned no candidates:', data);
    throw new Error('Gemini returned no text');
  }
  
  return data.candidates[0].content.parts[0].text;
}

// Utility to check for the best available Gemini model
async function getBestGeminiModel(): Promise<string> {
  const apiKey = Deno.env.get('GEMINI_API_KEY');
  if (!apiKey) return "gemini-1.5-pro";
  
  const modelPreference = [
    "gemini-2.5-pro", 
    "gemini-2.0-pro", 
    "gemini-1.5-pro"
  ];
  
  for (const model of modelPreference) {
    try {
      const testResponse = await fetch(`https://generativelanguage.googleapis.com/v1/models/${model}:generateContent?key=${apiKey}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          contents: [{ parts: [{ text: "Test prompt" }] }],
          generationConfig: { maxOutputTokens: 1 }
        })
      });
      
      // If we get a 404, the model doesn't exist
      if (testResponse.status === 404) {
        console.log(`${model} is not available yet`);
        continue;
      }
      
      // Check for non-auth related errors (model exists but other issues)
      if (!testResponse.ok) {
        const errorData = await testResponse.json();
        if (errorData.error?.code === 401 || errorData.error?.message?.includes("API key")) {
          console.log(`${model} auth error, but model likely exists`);
          continue;
        }
      }
      
      // If we get here, the model exists and is available
      console.log(`${model} is available`);
      return model;
    } catch (error) {
      console.error(`Error checking for ${model}:`, error);
    }
  }
  
  // Default fallback
  return "gemini-1.5-pro";
}

async function generateWithOpenAI(
  prompt: string, 
  temperature: number = 0.7,
  maxTokens: number = 1000
): Promise<string> {
  const apiKey = Deno.env.get('OPENAI_API_KEY');
  
  if (!apiKey) {
    throw new Error('OPENAI_API_KEY is not set');
  }
  
  const response = await fetch('https://api.openai.com/v1/chat/completions', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${apiKey}`
    },
    body: JSON.stringify({
      model: "gpt-4o-mini",
      messages: [
        {
          role: "system",
          content: "You are a helpful, creative AI assistant that generates high-quality content."
        },
        {
          role: "user",
          content: prompt
        }
      ],
      temperature,
      max_tokens: maxTokens
    })
  });
  
  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(`OpenAI API error: ${errorData.error?.message || response.statusText}`);
  }
  
  const data = await response.json();
  return data.choices[0].message.content;
}

async function generateWithAnthropic(
  prompt: string, 
  temperature: number = 0.7,
  maxTokens: number = 1000
): Promise<string> {
  const apiKey = Deno.env.get('ANTHROPIC_API_KEY');
  
  if (!apiKey) {
    throw new Error('ANTHROPIC_API_KEY is not set');
  }
  
  const response = await fetch('https://api.anthropic.com/v1/messages', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'x-api-key': apiKey,
      'anthropic-version': '2023-06-01'
    },
    body: JSON.stringify({
      model: "claude-3-opus-20240229",
      messages: [
        {
          role: "user",
          content: prompt
        }
      ],
      temperature,
      max_tokens: maxTokens
    })
  });
  
  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(`Anthropic API error: ${errorData.error?.message || response.statusText}`);
  }
  
  const data = await response.json();
  return data.content[0].text;
}

async function generateWithMistral(
  prompt: string, 
  temperature: number = 0.7,
  maxTokens: number = 1000
): Promise<string> {
  const apiKey = Deno.env.get('MISTRAL_API_KEY');
  
  if (!apiKey) {
    throw new Error('MISTRAL_API_KEY is not set');
  }
  
  const response = await fetch('https://api.mistral.ai/v1/chat/completions', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${apiKey}`
    },
    body: JSON.stringify({
      model: "mistral-large-latest",
      messages: [
        {
          role: "user",
          content: prompt
        }
      ],
      temperature,
      max_tokens: maxTokens
    })
  });
  
  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(`Mistral API error: ${errorData.error?.message || response.statusText}`);
  }
  
  const data = await response.json();
  return data.choices[0].message.content;
}

// Utility to check if Gemini 2.5 is available by making a test call
async function isGemini25Available(): Promise<boolean> {
  try {
    const apiKey = Deno.env.get('GEMINI_API_KEY');
    if (!apiKey) return false;
    
    const testResponse = await fetch(`https://generativelanguage.googleapis.com/v1/models/gemini-2.5-pro:generateContent?key=${apiKey}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        contents: [{ parts: [{ text: "Hello" }] }],
        generationConfig: { maxOutputTokens: 1 }
      })
    });
    
    // If status is 404, the model doesn't exist
    if (testResponse.status === 404) {
      console.log("Gemini 2.5 is not available yet");
      return false;
    }
    
    // Other error status, but the model exists
    if (!testResponse.ok) {
      // Check if error is because the API key is valid but something else
      const errorData = await testResponse.json();
      if (errorData.error?.code === 400 || errorData.error?.code === 401) {
        console.log("Gemini 2.5 check error, but model exists:", errorData.error);
        return false;
      }
      // If we get here, the model likely exists
      return true;
    }
    
    // Success response means the model exists
    return true;
  } catch (error) {
    console.error("Error checking for Gemini 2.5:", error);
    return false;
  }
}
