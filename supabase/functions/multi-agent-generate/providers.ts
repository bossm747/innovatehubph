
// AI Provider interfaces and utility functions

// Available API clients
export interface AIClient {
  generate: (prompt: string, temperature: number, maxTokens: number, domain: string) => Promise<string>;
}

export class GeminiClient implements AIClient {
  private client: any;

  constructor(apiKey: string) {
    // We'll import the GoogleGenerativeAI in the index.ts file to avoid duplicate imports
    this.client = null; // Will be initialized in index.ts
  }

  setClient(client: any) {
    this.client = client;
  }

  async generate(prompt: string, temperature: number, maxTokens: number, domain: string): Promise<string> {
    try {
      // Check if we can use Gemini 2.5 or fall back to Gemini Pro
      const modelName = "gemini-1.5-pro"; // Default to the latest model
      
      // Get the specified model
      const model = this.client.getGenerativeModel({ model: modelName });
      
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
    } catch (error) {
      console.error("Error generating with Gemini:", error);
      throw error;
    }
  }
}

export class OpenAIClient implements AIClient {
  private apiKey: string;

  constructor(apiKey: string) {
    this.apiKey = apiKey;
  }

  async generate(prompt: string, temperature: number, maxTokens: number, domain: string): Promise<string> {
    if (!this.apiKey) {
      throw new Error('OPENAI_API_KEY is not set');
    }
    
    // Add domain context to the prompt
    const enhancedPrompt = `${prompt}\n\nThis email will be sent from an @${domain} email address.`;
    
    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${this.apiKey}`
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
}

export class AnthropicClient implements AIClient {
  private apiKey: string;

  constructor(apiKey: string) {
    this.apiKey = apiKey;
  }

  async generate(prompt: string, temperature: number, maxTokens: number, domain: string): Promise<string> {
    if (!this.apiKey) {
      throw new Error('ANTHROPIC_API_KEY is not set');
    }
    
    // Add domain context to the prompt
    const enhancedPrompt = `${prompt}\n\nThis email will be sent from an @${domain} email address.`;
    
    const response = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': this.apiKey,
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
}

export class MistralClient implements AIClient {
  private apiKey: string;

  constructor(apiKey: string) {
    this.apiKey = apiKey;
  }

  async generate(prompt: string, temperature: number, maxTokens: number, domain: string): Promise<string> {
    if (!this.apiKey) {
      throw new Error('MISTRAL_API_KEY is not set');
    }
    
    // Add domain context to the prompt
    const enhancedPrompt = `${prompt}\n\nThis email will be sent from an @${domain} email address.`;
    
    const response = await fetch('https://api.mistral.ai/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${this.apiKey}`
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
}
