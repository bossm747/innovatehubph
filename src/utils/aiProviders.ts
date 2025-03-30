
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

// Add AIProvider type
export type AIProvider = 'gemini' | 'openai' | 'anthropic' | 'mistral';

// Add ProviderConfig interface
export interface ProviderConfig {
  name: string;
  description: string;
  icon: string;
  color: string;
  apiKeyName: string;
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
        apiKeyName: 'GEMINI_API_KEY'
      };
    case 'openai':
      return {
        name: 'OpenAI GPT',
        description: 'Advanced language model from OpenAI',
        icon: 'sparkles',
        color: 'text-green-600',
        apiKeyName: 'OPENAI_API_KEY'
      };
    case 'anthropic':
      return {
        name: 'Anthropic Claude',
        description: 'Human-centered AI assistant from Anthropic',
        icon: 'message-square',
        color: 'text-purple-600',
        apiKeyName: 'ANTHROPIC_API_KEY'
      };
    case 'mistral':
      return {
        name: 'Mistral AI',
        description: 'European AI language model',
        icon: 'zap',
        color: 'text-orange-600',
        apiKeyName: 'MISTRAL_API_KEY'
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
