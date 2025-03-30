
// AI provider types and configurations

export type AIProvider = 'gemini' | 'openai' | 'anthropic' | 'mistral';

interface ProviderConfig {
  name: string;
  description: string;
  model: string;
  capabilities: string[];
  icon: string;
}

export const getProviderConfig = (provider: AIProvider): ProviderConfig => {
  switch (provider) {
    case 'gemini':
      return {
        name: 'Google Gemini',
        description: 'Google\'s advanced large language model',
        model: 'gemini-1.5-pro',
        capabilities: ['Text generation', 'Content creation', 'Code writing', 'Image understanding'],
        icon: '🧠'
      };
    case 'openai':
      return {
        name: 'OpenAI GPT',
        description: 'OpenAI\'s powerful language model',
        model: 'gpt-4o-mini',
        capabilities: ['Text generation', 'Creative writing', 'Summarization', 'Translation'],
        icon: '🤖'
      };
    case 'anthropic':
      return {
        name: 'Anthropic Claude',
        description: 'Anthropic\'s helpful, harmless AI assistant',
        model: 'claude-3-haiku',
        capabilities: ['Text generation', 'Reasoning', 'Safety-focused responses'],
        icon: '🌟'
      };
    case 'mistral':
      return {
        name: 'Mistral AI',
        description: 'Cutting-edge large language model',
        model: 'mistral-large-latest',
        capabilities: ['Text generation', 'Information extraction', 'Text analysis'],
        icon: '💫'
      };
    default:
      return {
        name: 'Unknown Provider',
        description: 'AI text generation provider',
        model: 'unknown',
        capabilities: ['Text generation'],
        icon: '❓'
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
