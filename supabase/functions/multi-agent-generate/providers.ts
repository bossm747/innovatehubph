
// AI provider client interfaces and implementations

export interface AIClient {
  generate(prompt: string, temperature: number, maxTokens: number, domain?: string): Promise<string>;
}

export class GeminiClient implements AIClient {
  private apiKey: string;
  private client: any;

  constructor(apiKey: string) {
    this.apiKey = apiKey;
    this.client = null;
  }

  setClient(client: any) {
    this.client = client;
  }

  async generate(prompt: string, temperature: number, maxTokens: number, domain: string = "innovatehub.ph"): Promise<string> {
    try {
      if (!this.apiKey) {
        throw new Error("Gemini API key not configured");
      }

      // Since we can't use the Google AI SDK directly in Deno yet, we'll make a direct API call
      const response = await fetch(`https://generativelanguage.googleapis.com/v1/models/gemini-pro:generateContent?key=${this.apiKey}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          contents: [{
            parts: [{
              text: `You are a professional email marketing assistant for ${domain}. 
              Create content for the following request: ${prompt}
              Make sure the content is engaging, professional, and represents the brand well.`
            }]
          }],
          generationConfig: {
            temperature: temperature,
            maxOutputTokens: maxTokens,
          },
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(`Gemini API error: ${errorData.error?.message || 'Unknown error'}`);
      }

      const data = await response.json();
      return data.candidates[0]?.content?.parts[0]?.text || "No content generated";
    } catch (error) {
      console.error("Gemini generation error:", error);
      throw error;
    }
  }
}

export class OpenAIClient implements AIClient {
  private apiKey: string;

  constructor(apiKey: string) {
    this.apiKey = apiKey;
  }

  async generate(prompt: string, temperature: number, maxTokens: number, domain: string = "innovatehub.ph"): Promise<string> {
    try {
      if (!this.apiKey) {
        throw new Error("OpenAI API key not configured");
      }

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
              content: `You are a professional email marketing assistant for ${domain}. Your task is to create high-quality, engaging content.`
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
        const errorData = await response.json();
        throw new Error(`OpenAI API error: ${errorData.error?.message || 'Unknown error'}`);
      }

      const data = await response.json();
      return data.choices[0]?.message?.content || "No content generated";
    } catch (error) {
      console.error("OpenAI generation error:", error);
      throw error;
    }
  }
}

export class AnthropicClient implements AIClient {
  private apiKey: string;

  constructor(apiKey: string) {
    this.apiKey = apiKey;
  }

  async generate(prompt: string, temperature: number, maxTokens: number, domain: string = "innovatehub.ph"): Promise<string> {
    try {
      if (!this.apiKey) {
        throw new Error("Anthropic API key not configured");
      }

      const response = await fetch('https://api.anthropic.com/v1/messages', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-api-key': this.apiKey,
          'anthropic-version': '2023-06-01'
        },
        body: JSON.stringify({
          model: "claude-3-haiku-20240307",
          max_tokens: maxTokens,
          temperature: temperature,
          system: `You are a professional email marketing assistant for ${domain}. Your task is to create high-quality, engaging content.`,
          messages: [
            {
              role: "user",
              content: prompt
            }
          ]
        })
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(`Anthropic API error: ${errorData.error?.message || 'Unknown error'}`);
      }

      const data = await response.json();
      return data.content[0]?.text || "No content generated";
    } catch (error) {
      console.error("Anthropic generation error:", error);
      throw error;
    }
  }
}

export class MistralClient implements AIClient {
  private apiKey: string;

  constructor(apiKey: string) {
    this.apiKey = apiKey;
  }

  async generate(prompt: string, temperature: number, maxTokens: number, domain: string = "innovatehub.ph"): Promise<string> {
    try {
      if (!this.apiKey) {
        throw new Error("Mistral API key not configured");
      }

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
              role: "system",
              content: `You are a professional email marketing assistant for ${domain}. Your task is to create high-quality, engaging content.`
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
        const errorData = await response.json();
        throw new Error(`Mistral API error: ${errorData.error?.message || 'Unknown error'}`);
      }

      const data = await response.json();
      return data.choices[0]?.message?.content || "No content generated";
    } catch (error) {
      console.error("Mistral generation error:", error);
      throw error;
    }
  }
}
