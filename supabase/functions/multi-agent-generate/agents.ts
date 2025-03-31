
// Multi-agent enhancement and analysis functionality

export interface Agent {
  type: 'enhancement' | 'analysis' | 'email-generator' | 'translator';
  name: string;
  capability?: string;
  parameters?: Record<string, any>;
}

export interface AgentResult {
  text: string;
  analysis?: any;
  provider?: string;
  domain?: string;
  metadata?: Record<string, any>;
}

export async function enhanceContent(
  content: string,
  agent: Agent,
  geminiClient: any,
  domain: string = "innovatehub.ph"
): Promise<string> {
  // Use the Gemini client directly for enhancement
  try {
    const enhancementPrompt = `
    You are a specialized email enhancement AI agent named "${agent.name}".
    
    Your task is to enhance the following email content according to these guidelines:
    - Improve the structure and formatting
    - Enhance the call-to-action
    - Ensure professional tone and branding for ${domain}
    - Fix any grammatical or spelling issues
    - Maintain the original message intent
    ${agent.parameters?.style ? `- Use a ${agent.parameters.style} writing style` : ''}
    ${agent.parameters?.audience ? `- Target audience: ${agent.parameters.audience}` : ''}
    ${agent.parameters?.length ? `- Aim for ${agent.parameters.length} length` : ''}
    
    Original content:
    ${content}
    
    Provide the enhanced version only, no explanations.
    `;
    
    return await geminiClient.generate(
      enhancementPrompt,
      0.3, // Lower temperature for more conservative enhancements
      2000,
      domain
    );
  } catch (error) {
    console.error("Enhancement failed:", error);
    // If enhancement fails, return original content
    return content;
  }
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

export async function generateEmailContent(
  template: string,
  parameters: Record<string, any>,
  agent: Agent,
  geminiClient: any,
  domain: string = "innovatehub.ph"
): Promise<string> {
  try {
    // Extract the parameters for email generation
    const { 
      recipient = "valued customer", 
      subject = "Information from InnovateHub",
      purpose = "information", 
      key_points = [],
      tone = "professional"
    } = parameters;
    
    // Build the key points as bullet points if it's an array
    const keyPointsStr = Array.isArray(key_points) 
      ? key_points.map(point => `- ${point}`).join('\n')
      : key_points;

    const prompt = `
    You are an email content creation AI agent named "${agent.name}" for ${domain}.
    
    Create an email using this template: "${template}"
    
    Use these details:
    - Recipient: ${recipient}
    - Subject: ${subject}
    - Purpose: ${purpose}
    - Tone: ${tone}
    - Key points:
    ${keyPointsStr}
    
    Your response should be the complete email body only, formatted for HTML but without HTML tags.
    Use appropriate greetings, structure, and closings for a professional email.
    Do not include the subject line in your response.
    `;
    
    return await geminiClient.generate(
      prompt,
      0.7, // Slightly higher temperature for creativity
      2000,
      domain
    );
  } catch (error) {
    console.error("Email generation failed:", error);
    // If generation fails, return a simple template
    return `Dear ${parameters.recipient || "valued customer"},\n\nThank you for your interest in InnovateHub.\n\n${parameters.key_points || "We will get back to you soon."}\n\nBest regards,\nInnovateHub Team`;
  }
}

export async function translateContent(
  content: string,
  targetLanguage: string,
  agent: Agent,
  geminiClient: any
): Promise<string> {
  try {
    const translationPrompt = `
    You are a specialized translation AI agent named "${agent.name}".
    
    Translate the following email content from English to ${targetLanguage}.
    Maintain the tone, formatting, and intent of the original message.
    
    Original content:
    ${content}
    
    Provide only the translated version, no explanations.
    `;
    
    return await geminiClient.generate(
      translationPrompt,
      0.3, // Lower temperature for accurate translations
      2000,
      "translation"
    );
  } catch (error) {
    console.error("Translation failed:", error);
    // If translation fails, return original content
    return content;
  }
}
