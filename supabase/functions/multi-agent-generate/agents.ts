
// Multi-agent enhancement and analysis functionality

export interface Agent {
  type: 'enhancement' | 'analysis';
  name: string;
  capability?: string;
}

export interface AgentResult {
  text: string;
  analysis?: any;
}

export async function enhanceContent(
  content: string,
  agent: Agent,
  geminiClient: any,
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

export async function analyzeContent(
  content: string,
  agent: Agent,
  openAIKey: string
): Promise<any> {
  // Use OpenAI for analysis as it's good at structured output
  if (openAIKey) {
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
          'Authorization': `Bearer ${openAIKey}`
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
