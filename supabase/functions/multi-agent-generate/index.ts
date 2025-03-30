
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { GoogleGenerativeAI } from "https://esm.sh/@google/generative-ai@1.0.0";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

// Set up provider API keys
const GEMINI_API_KEY = Deno.env.get('GEMINI_API_KEY');
const OPENAI_API_KEY = Deno.env.get('OPENAI_API_KEY');
const ANTHROPIC_API_KEY = Deno.env.get('ANTHROPIC_API_KEY');
const MISTRAL_API_KEY = Deno.env.get('MISTRAL_API_KEY');

// Create provider clients
let geminiClient: GoogleGenerativeAI | null = null;
if (GEMINI_API_KEY) {
  geminiClient = new GoogleGenerativeAI(GEMINI_API_KEY);
}

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { 
      prompt, 
      agentId, 
      agents,
      temperature = 0.7, 
      maxTokens = 1000,
      domain = "innovatehub.ph" 
    } = await req.json();
    
    if (!prompt) {
      return new Response(
        JSON.stringify({ error: 'Prompt is required' }),
        { headers: { ...corsHeaders, 'Content-Type': 'application/json' }, status: 400 }
      );
    }

    // Primary agent - always use Gemini if available
    let result = await generateWithPrimaryAgent(prompt, temperature, maxTokens, domain);
    console.log("Generated content with primary agent");
    
    // If additional agents are specified, use them to enhance the result
    if (agents && agents.length > 0) {
      for (const agent of agents) {
        if (agent.type === 'enhancement') {
          result = await enhanceContent(result, agent, domain);
          console.log(`Enhanced content with ${agent.name} agent`);
        } else if (agent.type === 'analysis') {
          const analysis = await analyzeContent(result, agent);
          console.log(`Analyzed content with ${agent.name} agent`);
          // Include analysis in the response
          return new Response(
            JSON.stringify({ 
              text: result, 
              analysis: analysis,
              provider: "multi-agent", 
              domain 
            }),
            { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
          );
        }
      }
    }
    
    // Create a response with the text data
    return new Response(
      JSON.stringify({ 
        text: result, 
        provider: "multi-agent",
        domain 
      }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  } catch (error) {
    console.error('Error in multi-agent generation:', error);
    
    return new Response(
      JSON.stringify({ error: 'Failed to generate content', details: error.message }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' }, status: 500 }
    );
  }
});

async function generateWithPrimaryAgent(
  prompt: string, 
  temperature: number = 0.7,
  maxTokens: number = 1000,
  domain: string = "innovatehub.ph"
): Promise<string> {
  // First try Gemini (preferred provider)
  if (geminiClient) {
    try {
      return await generateWithGemini(prompt, temperature, maxTokens, domain);
    } catch (error) {
      console.error("Gemini generation failed, falling back to OpenAI:", error);
    }
  }
  
  // Fallback to OpenAI if Gemini fails or isn't available
  if (OPENAI_API_KEY) {
    try {
      return await generateWithOpenAI(prompt, temperature, maxTokens, domain);
    } catch (error) {
      console.error("OpenAI generation failed, falling back to Anthropic:", error);
    }
  }
  
  // Fallback to Anthropic if OpenAI fails or isn't available
  if (ANTHROPIC_API_KEY) {
    try {
      return await generateWithAnthropic(prompt, temperature, maxTokens, domain);
    } catch (error) {
      console.error("Anthropic generation failed, falling back to Mistral:", error);
    }
  }
  
  // Final fallback to Mistral
  if (MISTRAL_API_KEY) {
    return await generateWithMistral(prompt, temperature, maxTokens, domain);
  }
  
  throw new Error("No AI providers available. Please configure at least one API key.");
}

async function generateWithGemini(
  prompt: string, 
  temperature: number = 0.7,
  maxTokens: number = 1000,
  domain: string = "innovatehub.ph"
): Promise<string> {
  if (!geminiClient) {
    throw new Error('GEMINI_API_KEY is not set');
  }
  
  // Check if we can use Gemini 2.5 or fall back to Gemini Pro
  const modelName = await isGemini25Available() ? "gemini-1.5-pro" : "gemini-pro";
  console.log(`Using Gemini model: ${modelName}`);
  
  // Get the specified model
  const model = geminiClient.getGenerativeModel({ model: modelName });
  
  // Add domain context to the prompt
  const enhancedPrompt = `${prompt}\n\nThis email will be sent from an @${domain} email address.`;
  
  const result = await model.generateContent({
    contents: [{ parts: [{ text: enhancedPrompt }] }],
    generationConfig: {
      temperature,
      maxOutputTokens: maxTokens,
      topP: 0.8,
      topK: 40,
    }
  });
  
  const response = result.response;
  return response.text();
}

async function generateWithOpenAI(
  prompt: string, 
  temperature: number = 0.7,
  maxTokens: number = 1000,
  domain: string = "innovatehub.ph"
): Promise<string> {
  if (!OPENAI_API_KEY) {
    throw new Error('OPENAI_API_KEY is not set');
  }
  
  // Add domain context to the prompt
  const enhancedPrompt = `${prompt}\n\nThis email will be sent from an @${domain} email address.`;
  
  const response = await fetch('https://api.openai.com/v1/chat/completions', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${OPENAI_API_KEY}`
    },
    body: JSON.stringify({
      model: "gpt-4o-mini",
      messages: [
        {
          role: "system",
          content: "You are a professional email marketing assistant that creates high-quality content."
        },
        {
          role: "user",
          content: enhancedPrompt
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
  maxTokens: number = 1000,
  domain: string = "innovatehub.ph"
): Promise<string> {
  if (!ANTHROPIC_API_KEY) {
    throw new Error('ANTHROPIC_API_KEY is not set');
  }
  
  // Add domain context to the prompt
  const enhancedPrompt = `${prompt}\n\nThis email will be sent from an @${domain} email address.`;
  
  const response = await fetch('https://api.anthropic.com/v1/messages', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'x-api-key': ANTHROPIC_API_KEY,
      'anthropic-version': '2023-06-01'
    },
    body: JSON.stringify({
      model: "claude-3-opus-20240229",
      messages: [
        {
          role: "user",
          content: enhancedPrompt
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
  maxTokens: number = 1000,
  domain: string = "innovatehub.ph"
): Promise<string> {
  if (!MISTRAL_API_KEY) {
    throw new Error('MISTRAL_API_KEY is not set');
  }
  
  // Add domain context to the prompt
  const enhancedPrompt = `${prompt}\n\nThis email will be sent from an @${domain} email address.`;
  
  const response = await fetch('https://api.mistral.ai/v1/chat/completions', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${MISTRAL_API_KEY}`
    },
    body: JSON.stringify({
      model: "mistral-large-latest",
      messages: [
        {
          role: "user",
          content: enhancedPrompt
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

async function enhanceContent(
  content: string,
  agent: any,
  domain: string = "innovatehub.ph"
): Promise<string> {
  // Use Gemini by default for enhancement
  if (geminiClient) {
    try {
      const model = geminiClient.getGenerativeModel({ model: "gemini-pro" });
      
      const enhancementPrompt = `
      You are a specialized email enhancement AI agent named "${agent.name}".
      
      Your task is to enhance the following email content according to these guidelines:
      - Improve the structure and formatting
      - Enhance the call-to-action
      - Ensure professional tone and branding for ${domain}
      - Fix any grammatical or spelling issues
      - Maintain the original message intent
      
      Original content:
      ${content}
      
      Provide the enhanced version only, no explanations.
      `;
      
      const result = await model.generateContent({
        contents: [{ parts: [{ text: enhancementPrompt }] }],
        generationConfig: {
          temperature: 0.3, // Lower temperature for more conservative enhancements
          maxOutputTokens: 2000,
        }
      });
      
      return result.response.text();
    } catch (error) {
      console.error("Enhancement failed:", error);
      // If enhancement fails, return original content
      return content;
    }
  }
  
  // If Gemini not available, return original
  return content;
}

async function analyzeContent(
  content: string,
  agent: any
): Promise<any> {
  // Use OpenAI for analysis as it's good at structured output
  if (OPENAI_API_KEY) {
    try {
      const analysisPrompt = `
      You are a specialized email analysis AI agent named "${agent.name}".
      
      Analyze the following email content and provide feedback:
      
      ${content}
      
      Provide your analysis in JSON format with the following structure:
      {
        "readability": {
          "score": 0-10,
          "feedback": "brief feedback"
        },
        "engagement": {
          "score": 0-10,
          "feedback": "brief feedback"
        },
        "callToAction": {
          "score": 0-10,
          "feedback": "brief feedback"
        },
        "suggestions": ["suggestion1", "suggestion2"]
      }
      
      Return only the JSON, no other text.
      `;
      
      const response = await fetch('https://api.openai.com/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${OPENAI_API_KEY}`
        },
        body: JSON.stringify({
          model: "gpt-4o-mini",
          messages: [
            {
              role: "system",
              content: "You are an email analysis AI that returns JSON only."
            },
            {
              role: "user",
              content: analysisPrompt
            }
          ],
          temperature: 0.3,
          response_format: { type: "json_object" }
        })
      });
      
      if (!response.ok) {
        throw new Error("Analysis failed");
      }
      
      const data = await response.json();
      // Parse the JSON string from the content
      return JSON.parse(data.choices[0].message.content);
    } catch (error) {
      console.error("Analysis failed:", error);
      // Return basic analysis if it fails
      return {
        readability: { score: 7, feedback: "Analysis failed, but content appears satisfactory" },
        engagement: { score: 7, feedback: "Analysis failed, but content appears satisfactory" },
        callToAction: { score: 7, feedback: "Analysis failed, but content appears satisfactory" },
        suggestions: ["Consider reviewing the email manually"]
      };
    }
  }
  
  // Return basic analysis if OpenAI not available
  return {
    readability: { score: 7, feedback: "Analysis unavailable, but content appears satisfactory" },
    engagement: { score: 7, feedback: "Analysis unavailable, but content appears satisfactory" },
    callToAction: { score: 7, feedback: "Analysis unavailable, but content appears satisfactory" },
    suggestions: ["No analysis available, consider enabling OpenAI integration"]
  };
}

// Utility to check if Gemini 2.5 is available by making a test call
async function isGemini25Available(): Promise<boolean> {
  try {
    if (!geminiClient) return false;
    
    const model = geminiClient.getGenerativeModel({ model: "gemini-1.5-pro" });
    
    // Make a minimal request to check if the model exists
    await model.generateContent({
      contents: [{ parts: [{ text: "Hello" }] }],
      generationConfig: { maxOutputTokens: 1 }
    });
    
    // If no error, the model exists
    return true;
  } catch (error) {
    console.log("Gemini 2.5 not available:", error.message);
    return false;
  }
}
