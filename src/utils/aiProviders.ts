
export type AIProvider = 'gemini' | 'openai' | 'anthropic' | 'mistral' | 'multi-agent';

export const AI_PROVIDERS: Record<AIProvider, { name: string, model: string, defaultPrompt: string }> = {
  gemini: {
    name: 'Google Gemini Pro 2.5',
    model: 'gemini-1.5-pro',
    defaultPrompt: 'Generate engaging email marketing content for a tech company called InnovateHub that provides digital solutions including PlataPay, a digital payment system. The content should be professional, informative, and include a clear call to action.'
  },
  openai: {
    name: 'OpenAI GPT-4o',
    model: 'gpt-4o-mini',
    defaultPrompt: 'Create compelling email marketing copy for InnovateHub, a tech company specializing in digital solutions including PlataPay. The tone should be professional yet approachable, highlighting innovation and customer benefits.'
  },
  anthropic: {
    name: 'Anthropic Claude 3',
    model: 'claude-3-opus-20240229',
    defaultPrompt: 'Write an email marketing message for InnovateHub, a technology company that offers digital solutions including PlataPay, a payment platform. The email should be concise, engaging, and include appropriate subject lines and CTAs.'
  },
  mistral: {
    name: 'Mistral Large',
    model: 'mistral-large-latest',
    defaultPrompt: 'Draft an email marketing campaign for InnovateHub, a technology innovation company with products like PlataPay. The content should be business-focused, highlight key benefits, and encourage the reader to take action.'
  },
  'multi-agent': {
    name: 'AI Agent Collaboration',
    model: 'multi-agent',
    defaultPrompt: 'Create a professional email marketing message for InnovateHub, highlighting our digital solutions including PlataPay. Make it engaging, with clear value propositions and a compelling call to action. Use professional language appropriate for business clients.'
  }
};

export const getProviderConfig = (provider: AIProvider) => {
  return AI_PROVIDERS[provider] || AI_PROVIDERS.gemini;
};

export interface AIGenerationOptions {
  provider: AIProvider;
  prompt: string;
  temperature?: number;
  maxTokens?: number;
}

export interface EmailTemplate {
  id: string;
  name: string;
  subject: string;
  content: string;
  type: 'newsletter' | 'promotion' | 'announcement' | 'update';
}

export interface EmailCampaign {
  id: string;
  name: string;
  subject: string;
  content: string;
  template?: string;
  scheduledAt?: Date;
  recipientCount?: number;
  status: 'draft' | 'scheduled' | 'sent' | 'failed';
}
