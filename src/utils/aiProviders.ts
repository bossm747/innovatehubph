
// Types and utilities for AI providers

export type AIProvider = 'gemini' | 'openai' | 'anthropic' | 'mistral' | 'multi-agent';

interface ProviderConfig {
  name: string;
  model: string;
  defaultPrompt: string;
}

export const AI_PROVIDERS: Record<AIProvider, ProviderConfig> = {
  gemini: {
    name: 'Google Gemini',
    model: 'gemini-1.5-pro',
    defaultPrompt: 'You are a professional email marketing expert for InnovateHub. Create engaging content for: {input}'
  },
  openai: {
    name: 'OpenAI GPT',
    model: 'gpt-4o-mini',
    defaultPrompt: 'You are a professional email marketing expert for InnovateHub. Create engaging content for: {input}'
  },
  anthropic: {
    name: 'Anthropic Claude',
    model: 'claude-3-haiku-20240307',
    defaultPrompt: 'You are a professional email marketing expert for InnovateHub. Create engaging content for: {input}'
  },
  mistral: {
    name: 'Mistral AI',
    model: 'mistral-large-latest',
    defaultPrompt: 'You are a professional email marketing expert for InnovateHub. Create engaging content for: {input}'
  },
  'multi-agent': {
    name: 'Multi-Agent System',
    model: 'collaborative',
    defaultPrompt: 'You are a collaborative system of AI agents working together to create the best possible marketing content for: {input}'
  }
};

export const getProviderConfig = (provider: AIProvider): ProviderConfig => {
  return AI_PROVIDERS[provider] || AI_PROVIDERS.gemini;
};

export interface EmailCampaign {
  id: string;
  name: string;
  subject: string;
  content: string;
  template?: string;
  status: 'draft' | 'scheduled' | 'sent' | 'failed';
  scheduledAt?: string;
  recipientCount?: number;
  created_at: string;
  updated_at?: string;
}
