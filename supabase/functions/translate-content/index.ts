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
    // First try to use Gemini, fall back to OpenAI
    let apiKey = Deno.env.get('GEMINI_API_KEY');
    let useGemini = true;
    
    if (!apiKey) {
      apiKey = Deno.env.get('OPENAI_API_KEY');
      useGemini = false;
      
      if (!apiKey) {
        throw new Error('No translation API key found. Please set GEMINI_API_KEY or OPENAI_API_KEY.');
      }
    }

    const { text, targetLanguage, preserveFormatting = true } = await req.json();
    
    if (!text || !targetLanguage) {
      throw new Error('Missing required parameters: text and targetLanguage');
    }

    // Construct the prompt for translation
    let prompt = `Translate the following text to ${targetLanguage}:\n\n${text}\n\n`;
    
    if (preserveFormatting) {
      prompt += "Important: Preserve all formatting, line breaks, bullet points, and paragraph structure.";
    }

    let translatedText;
    if (useGemini) {
      translatedText = await translateWithGemini(apiKey, prompt);
    } else {
      translatedText = await translateWithOpenAI(apiKey, prompt);
    }

    return new Response(JSON.stringify({
      originalText: text,
      translatedText,
      targetLanguage,
      provider: useGemini ? 'gemini' : 'openai'
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

async function translateWithGemini(apiKey: string, prompt: string): Promise<string> {
  // Check if Gemini 2.5 is available, use it if it is
  const modelVersion = await isGemini25Available(apiKey) ? "gemini-2.5-pro" : "gemini-pro";
  console.log(`Using Gemini model for translation: ${modelVersion}`);
  
  const response = await fetch(`https://generativelanguage.googleapis.com/v1/models/${modelVersion}:generateContent?key=${apiKey}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
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
        temperature: 0.2,
        topP: 0.8,
        topK: 40,
      }
    }),
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`Gemini API error: ${response.status} ${errorText}`);
  }

  const result = await response.json();
  return result.candidates[0].content.parts[0].text;
}

async function translateWithOpenAI(apiKey: string, prompt: string): Promise<string> {
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
          content: "You are a professional translator. Translate the text exactly as provided, maintaining formatting and style."
        },
        {
          role: "user",
          content: prompt
        }
      ],
      temperature: 0.3,
      max_tokens: 2048
    })
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(`OpenAI API error: ${errorData.error?.message || response.statusText}`);
  }
  
  const data = await response.json();
  return data.choices[0].message.content;
}

// Utility to check if Gemini 2.5 is available by making a test call
async function isGemini25Available(apiKey: string): Promise<boolean> {
  try {
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
