
// Multiple AI provider integrations

interface AIProvider {
  generate: (prompt: string, temperature: number, maxTokens: number, domain?: string) => Promise<string>;
}

// Gemini provider that uses direct API calls instead of the npm package
const gemini = (apiKey: string): AIProvider => {
  return {
    generate: async (prompt: string, temperature = 0.7, maxTokens = 1000, domain = "innovatehub.ph"): Promise<string> => {
      try {
        const url = "https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-pro:generateContent";
        
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
