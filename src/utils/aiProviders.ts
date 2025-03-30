
// AI provider types and configurations

export type AIProvider = 'gemini' | 'openai' | 'anthropic' | 'mistral';

interface ProviderConfig {
  name: string;
  description: string;
  model: string;
  capabilities: string[];
  icon: string;
  defaultPrompt?: string;
}

export interface EmailCampaign {
  id: string;
  name: string;
  subject: string;
  content: string;
  status: string;
  created_at: string;
  updated_at?: string;
  scheduled_at?: string | null;
  recipient_count?: number;
}

export interface PromoCode {
  id: string;
  code: string;
  discount: number;
  discount_type: string;
  valid_from: string;
  valid_to: string;
  active: boolean;
  times_used?: number;
  max_uses?: number;
  description?: string;
  applicable_to?: string[];
}

export interface LeadSource {
  id: string;
  name: string;
  source_type: string;
  description?: string;
  active: boolean;
}

export const getProviderConfig = (provider: AIProvider): ProviderConfig => {
  switch (provider) {
    case 'gemini':
      return {
        name: 'Google Gemini',
        description: 'Google\'s advanced large language model',
        model: 'gemini-1.5-pro',
        capabilities: ['Text generation', 'Content creation', 'Code writing', 'Image understanding'],
        icon: '🧠',
        defaultPrompt: 'Generate engaging marketing copy for a tech company specializing in digital solutions'
      };
    case 'openai':
      return {
        name: 'OpenAI GPT',
        description: 'OpenAI\'s powerful language model',
        model: 'gpt-4o-mini',
        capabilities: ['Text generation', 'Creative writing', 'Summarization', 'Translation'],
        icon: '🤖',
        defaultPrompt: 'Create persuasive marketing email content for a fintech product launch'
      };
    case 'anthropic':
      return {
        name: 'Anthropic Claude',
        description: 'Anthropic\'s helpful, harmless AI assistant',
        model: 'claude-3-haiku',
        capabilities: ['Text generation', 'Reasoning', 'Safety-focused responses'],
        icon: '🌟',
        defaultPrompt: 'Write an email follow-up sequence for new business inquiries'
      };
    case 'mistral':
      return {
        name: 'Mistral AI',
        description: 'Cutting-edge large language model',
        model: 'mistral-large-latest',
        capabilities: ['Text generation', 'Information extraction', 'Text analysis'],
        icon: '💫',
        defaultPrompt: 'Draft a welcome email for new subscribers highlighting our services'
      };
    default:
      return {
        name: 'Unknown Provider',
        description: 'AI text generation provider',
        model: 'unknown',
        capabilities: ['Text generation'],
        icon: '❓',
        defaultPrompt: 'Generate marketing content'
      };
  }
};

export const getAiProviderList = (): { id: AIProvider; name: string }[] => {
  return [
    { id: 'gemini', name: 'Google Gemini' },
    { id: 'openai', name: 'OpenAI GPT' },
    { id: 'anthropic', name: 'Anthropic Claude' },
    { id: 'mistral', name: 'Mistral AI' }
  ];
};
