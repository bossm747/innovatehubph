
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
      2000  // Increased max tokens to accommodate longer content
    );
  } catch (error) {
    console.error("Error in enhanceContent:", error);
    return content; // Return original content on error
  }
}

export async function analyzeContent(
  content: string,
  agent: Agent,
  openAIApiKey: string
): Promise<any> {
  try {
    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${openAIApiKey}`
      },
      body: JSON.stringify({
        model: "gpt-4o-mini",
        messages: [
          {
            role: "system",
            content: `You are an analytical AI agent named "${agent.name}" that analyzes email content to provide feedback.`
          },
          {
            role: "user",
            content: `Analyze this email content and provide structured feedback on tone, clarity, effectiveness, and suggested improvements:
            
            ${content}`
          }
        ],
        temperature: 0.3
      })
    });
    
    if (!response.ok) {
      throw new Error(`OpenAI API error: ${response.status}`);
    }
    
    const data = await response.json();
    return data.choices[0].message.content;
  } catch (error) {
    console.error("Error in analyzeContent:", error);
    return { error: error.message };
  }
}

export async function generateEmailContent(
  template: string,
  parameters: Record<string, any>,
  agent: Agent,
  geminiClient: any,
  domain: string = "innovatehub.ph"
): Promise<string> {
  try {
    let promptTemplate = "";
    const keyPoints = Array.isArray(parameters.key_points) 
      ? parameters.key_points.filter(Boolean).join("\n- ")
      : "";
    
    // Handle inquiry data if present
    let inquiryContext = "";
    if (parameters.inquiry_data) {
      const inquiry = parameters.inquiry_data;
      inquiryContext = `
      INQUIRY DETAILS:
      - Service: ${inquiry.service}
      - Name: ${inquiry.name}
      - Email: ${inquiry.email}
      - Company: ${inquiry.company || "Not provided"}
      - Message: ${inquiry.message || "Not provided"}
      ${inquiry.business_type ? `- Business Type: ${inquiry.business_type}` : ""}
      ${inquiry.location ? `- Location: ${inquiry.location}` : ""}
      ${inquiry.requirements ? `- Requirements: ${inquiry.requirements}` : ""}
      ${inquiry.project_type ? `- Project Type: ${inquiry.project_type}` : ""}
      ${inquiry.industry ? `- Industry: ${inquiry.industry}` : ""}
      ${inquiry.budget ? `- Budget: ${inquiry.budget}` : ""}
      ${inquiry.timeline ? `- Timeline: ${inquiry.timeline}` : ""}
      `;
    }
    
    switch (template) {
      case "welcome":
        promptTemplate = `
        You are a professional email writer for ${domain}, a technology company specializing in fintech, AI solutions, and custom software development.
        
        Write a personalized welcome email to a potential client who has just submitted an inquiry.
        
        ${inquiryContext ? `Use these specific details about their inquiry:\n${inquiryContext}` : ""}
        
        Include these key points:
        - ${keyPoints}
        
        The email must:
        - Be warm, engaging, and professional
        - Show appreciation for their interest
        - Briefly describe next steps in the process
        - Include a subtle call to action
        - Be concise but informative (200-300 words)
        - Use a ${parameters.tone || "professional"} tone
        - End with a friendly closing
        
        Write ONLY the email body content, not the subject line or greeting/closing. Make it personalized and conversational as if written by a human.
        `;
        break;
        
      case "service":
        promptTemplate = `
        You are a professional email writer for ${domain}, a technology company specializing in fintech, AI solutions, and custom software development.
        
        Write a personalized service-focused email to a potential client who has inquired about "${parameters.inquiry_data?.service || "our services"}".
        
        ${inquiryContext ? `Use these specific details about their inquiry:\n${inquiryContext}` : ""}
        
        Include these key points:
        - ${keyPoints}
        
        The email must:
        - Briefly explain our ${parameters.inquiry_data?.service || "services"} and how they can benefit the client
        - Highlight 2-3 key advantages of working with InnovateHub
        - Show understanding of their specific needs based on their inquiry
        - Include a clear call to action (schedule a meeting, reply with more details, etc.)
        - Be concise but informative (250-350 words)
        - Use a ${parameters.tone || "professional"} tone
        
        Write ONLY the email body content, not the subject line or greeting/closing. Make it personalized and conversational as if written by a human.
        `;
        break;
        
      case "followup":
        promptTemplate = `
        You are a professional email writer for ${domain}, a technology company specializing in fintech, AI solutions, and custom software development.
        
        Write a personalized follow-up email to a potential client who submitted an inquiry a few days ago but hasn't responded to our initial email.
        
        ${inquiryContext ? `Use these specific details about their inquiry:\n${inquiryContext}` : ""}
        
        Include these key points:
        - ${keyPoints}
        
        The email must:
        - Be friendly and not pushy
        - Reference their original inquiry
        - Offer additional value or information
        - Ask if they have any questions
        - Include a subtle call to action
        - Be short and concise (150-200 words)
        - Use a ${parameters.tone || "friendly"} tone
        
        Write ONLY the email body content, not the subject line or greeting/closing. Make it personalized and conversational as if written by a human.
        `;
        break;
        
      default:
        promptTemplate = `
        You are a professional email writer for ${domain}, a technology company specializing in fintech, AI solutions, and custom software development.
        
        Write a personalized email about the following topic: ${parameters.purpose || "general information"}.
        
        ${inquiryContext ? `Use these specific details about the recipient:\n${inquiryContext}` : ""}
        
        Include these key points:
        - ${keyPoints}
        
        The email must:
        - Be professional and engaging
        - Have a clear purpose and message
        - Include a call to action if appropriate
        - Be concise but informative
        - Use a ${parameters.tone || "professional"} tone
        
        Write ONLY the email body content, not the subject line or greeting/closing. Make it personalized and conversational as if written by a human.
        `;
    }
    
    return await geminiClient.generate(
      promptTemplate,
      0.7, // Slightly higher temperature for more creative content
      3000  // Increased max tokens to accommodate detailed emails
    );
  } catch (error) {
    console.error("Error in generateEmailContent:", error);
    return `Thank you for your interest in InnovateHub's services. We've received your inquiry and will review it promptly. A member of our team will be in touch with you soon to discuss your needs further. If you have any immediate questions, please don't hesitate to reply to this email or call us at +63 917 685 1216.`;
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
    
    Your task is to translate the following content from English to ${targetLanguage}.
    Maintain the tone, style, and formatting of the original text while ensuring it sounds natural in ${targetLanguage}.
    
    Original content:
    ${content}
    
    Provide the translated version only, no explanations.
    `;
    
    return await geminiClient.generate(
      translationPrompt,
      0.3, // Lower temperature for more accurate translations
      2000  // Increased max tokens to accommodate longer content
    );
  } catch (error) {
    console.error("Error in translateContent:", error);
    return content; // Return original content on error
  }
}
