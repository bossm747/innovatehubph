// Multiple AI provider integrations

interface AIProvider {
  generate: (prompt: string, temperature: number, maxTokens: number, domain?: string) => Promise<string>;
}

// Gemini provider that uses direct API calls instead of the npm package
const gemini = (apiKey: string): AIProvider => {
  return {
    generate: async (prompt: string, temperature = 0.7, maxTokens = 1000, domain = "innovatehub.ph"): Promise<string> => {
      try {
        // Determine the best Gemini model to use
        const modelVersion = await getBestGeminiModel(apiKey);
        console.log(`Using Gemini model: ${modelVersion}`);
        
        const url = `https://generativelanguage.googleapis.com/v1/models/${modelVersion}:generateContent`;
        
        const response = await fetch(`${url}?key=${apiKey}`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
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
              temperature: temperature,
              maxOutputTokens: maxTokens,
              topP: 0.9,
              topK: 40,
            },
            safetySettings: [
              {
                category: "HARM_CATEGORY_HATE_SPEECH",
                threshold: "BLOCK_MEDIUM_AND_ABOVE"
              },
              {
                category: "HARM_CATEGORY_DANGEROUS_CONTENT",
                threshold: "BLOCK_MEDIUM_AND_ABOVE"
              },
              {
                category: "HARM_CATEGORY_SEXUALLY_EXPLICIT",
                threshold: "BLOCK_MEDIUM_AND_ABOVE"
              },
              {
                category: "HARM_CATEGORY_HARASSMENT",
                threshold: "BLOCK_MEDIUM_AND_ABOVE"
              }
            ]
          })
        });
        
        if (!response.ok) {
          const error = await response.text();
          console.error("Gemini API error:", error);
          throw new Error(`Gemini API error: ${response.status}`);
        }
        
        const data = await response.json();
        
        // Extract text from the response
        if (data.candidates && 
            data.candidates[0] && 
            data.candidates[0].content && 
            data.candidates[0].content.parts && 
            data.candidates[0].content.parts[0] && 
            data.candidates[0].content.parts[0].text) {
          return data.candidates[0].content.parts[0].text;
        }
        
        throw new Error("Unexpected Gemini API response format");
      } catch (error) {
        console.error("Gemini provider error:", error);
        return `Error generating content: ${error.message}`;
      }
    }
  };
};

// Utility to check for the best available Gemini model
async function getBestGeminiModel(apiKey: string): Promise<string> {
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
      console.log(`${model} is available and will be used`);
      return model;
    } catch (error) {
      console.error(`Error checking for ${model}:`, error);
    }
  }
  
  // Default fallback
  return "gemini-1.5-pro";
}

// OpenAI provider that uses direct API calls
const openai = (apiKey: string): AIProvider => {
  return {
    generate: async (prompt: string, temperature = 0.7, maxTokens = 1000): Promise<string> => {
      try {
        const response = await fetch("https://api.openai.com/v1/chat/completions", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${apiKey}`
          },
          body: JSON.stringify({
            model: "gpt-4o-mini",
            messages: [
              {
                role: "system",
                content: "You are a helpful AI assistant for InnovateHub, a technology company that specializes in fintech, AI solutions, and custom software development."
              },
              {
                role: "user",
                content: prompt
              }
            ],
            temperature: temperature,
            max_tokens: maxTokens
          })
        });
        
        if (!response.ok) {
          const error = await response.text();
          console.error("OpenAI API error:", error);
          throw new Error(`OpenAI API error: ${response.status}`);
        }
        
        const data = await response.json();
        return data.choices[0].message.content;
      } catch (error) {
        console.error("OpenAI provider error:", error);
        return `Error generating content: ${error.message}`;
      }
    }
  };
};

// Anthropic provider
const anthropic = (apiKey: string): AIProvider => {
  return {
    generate: async (prompt: string, temperature = 0.7, maxTokens = 1000): Promise<string> => {
      try {
        const response = await fetch("https://api.anthropic.com/v1/messages", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "x-api-key": apiKey,
            "anthropic-version": "2023-06-01"
          },
          body: JSON.stringify({
            model: "claude-3-haiku-20240307",
            max_tokens: maxTokens,
            temperature: temperature,
            messages: [
              {
                role: "user",
                content: prompt
              }
            ]
          })
        });
        
        if (!response.ok) {
          const error = await response.text();
          console.error("Anthropic API error:", error);
          throw new Error(`Anthropic API error: ${response.status}`);
        }
        
        const data = await response.json();
        return data.content[0].text;
      } catch (error) {
        console.error("Anthropic provider error:", error);
        return `Error generating content: ${error.message}`;
      }
    }
  };
};

// Mistral provider
const mistral = (apiKey: string): AIProvider => {
  return {
    generate: async (prompt: string, temperature = 0.7, maxTokens = 1000): Promise<string> => {
      try {
        const response = await fetch("https://api.mistral.ai/v1/chat/completions", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${apiKey}`
          },
          body: JSON.stringify({
            model: "mistral-large-latest",
            messages: [
              {
                role: "system",
                content: "You are a helpful AI assistant for InnovateHub, a technology company that specializes in fintech, AI solutions, and custom software development."
              },
              {
                role: "user",
                content: prompt
              }
            ],
            temperature: temperature,
            max_tokens: maxTokens
          })
        });
        
        if (!response.ok) {
          const error = await response.text();
          console.error("Mistral API error:", error);
          throw new Error(`Mistral API error: ${response.status}`);
        }
        
        const data = await response.json();
        return data.choices[0].message.content;
      } catch (error) {
        console.error("Mistral provider error:", error);
        return `Error generating content: ${error.message}`;
      }
    }
  };
};

export const providers = {
  gemini,
  openai,
  anthropic,
  mistral
};
