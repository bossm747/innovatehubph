
// Add LeadSource interface if not already defined
export interface LeadSource {
  id: string;
  name: string;
  source_type: 'website' | 'social' | 'email' | 'event' | 'partner' | 'other';
  description?: string;
  active: boolean;
  created_at: string;
  updated_at?: string;
}

// Add EmailCampaign interface if not already defined
export interface EmailCampaign {
  id: string;
  name: string;
  subject: string;
  content: string;
  template?: string;
  status: 'draft' | 'scheduled' | 'sent' | 'failed';
  scheduledAt?: string;
  scheduled_at?: string;
  recipientCount?: number;
  recipient_count?: number;
  segment_ids?: string[];
  created_at: string;
  updated_at?: string;
}

// Add PromoCode interface
export interface PromoCode {
  id: string;
  code: string;
  discount_percent?: number;
  discount_amount?: number;
  valid_until: string;
  max_uses?: number;
  current_uses: number;
  active: boolean;
  description?: string;
  created_at: string;
  updated_at?: string;
}

// Add AIProvider type and 'multi-agent' option
export type AIProvider = 'gemini' | 'openai' | 'anthropic' | 'mistral' | 'multi-agent';

// Add ProviderConfig interface with additional fields for model and defaultPrompt
export interface ProviderConfig {
  name: string;
  description: string;
  icon: string;
  color: string;
  apiKeyName: string;
  model?: string;
  defaultPrompt?: string;
}

// Add provider configuration function
export const getProviderConfig = (provider: AIProvider): ProviderConfig => {
  switch (provider) {
    case 'gemini':
      return {
        name: 'Google Gemini',
        description: 'Powerful multimodal AI model from Google',
        icon: 'brain',
        color: 'text-blue-600',
        apiKeyName: 'GEMINI_API_KEY',
        model: 'gemini-1.5-pro',
        defaultPrompt: 'Generate marketing content for a digital payment solution'
      };
    case 'openai':
      return {
        name: 'OpenAI GPT',
        description: 'Advanced language model from OpenAI',
        icon: 'sparkles',
        color: 'text-green-600',
        apiKeyName: 'OPENAI_API_KEY',
        model: 'gpt-4o',
        defaultPrompt: 'Write persuasive marketing copy for a fintech product'
      };
    case 'anthropic':
      return {
        name: 'Anthropic Claude',
        description: 'Human-centered AI assistant from Anthropic',
        icon: 'message-square',
        color: 'text-purple-600',
        apiKeyName: 'ANTHROPIC_API_KEY',
        model: 'claude-3-opus',
        defaultPrompt: 'Create email content for a financial services company'
      };
    case 'mistral':
      return {
        name: 'Mistral AI',
        description: 'European AI language model',
        icon: 'zap',
        color: 'text-orange-600',
        apiKeyName: 'MISTRAL_API_KEY',
        model: 'mistral-large',
        defaultPrompt: 'Draft persuasive content for a digital payment platform'
      };
    case 'multi-agent':
      return {
        name: 'Multi-Agent System',
        description: 'Collaborative AI system using multiple models',
        icon: 'network',
        color: 'text-indigo-600',
        apiKeyName: 'MULTI_AGENT_CONFIG',
        model: 'ensemble',
        defaultPrompt: 'Collaborate on creating optimized marketing content for PlataPay'
      };
    default:
      return {
        name: 'Unknown Provider',
        description: 'Configuration not available',
        icon: 'help-circle',
        color: 'text-gray-600',
        apiKeyName: 'UNKNOWN_API_KEY'
      };
  }
};
