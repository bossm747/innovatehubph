
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
  status: 'draft' | 'scheduled' | 'sent' | 'failed' | string; // Added string to accommodate database values
  scheduledAt?: string;
  scheduled_at?: string; // Added to match DB column
  recipientCount?: number;
  recipient_count?: number; // Added to match DB column
  segment_ids?: string[];
  created_at: string;
  updated_at?: string;
}

// Marketing system types
export interface MarketingRecipient {
  id: string;
  name: string;
  email: string;
  company?: string;
  tags?: string[];
  subscribed: boolean;
  source_id?: string;
  created_at: string;
  updated_at?: string;
}

export interface MarketingSegment {
  id: string;
  name: string;
  description?: string;
  criteria: {
    tags?: string[];
    activity?: 'active' | 'inactive' | 'all';
    dateJoined?: 'last7days' | 'last30days' | 'last90days' | 'allTime';
    custom?: Record<string, any>;
  };
  recipientCount?: number;
  recipient_count?: number; // Added to match DB column
  created_at?: string;
  updated_at?: string;
}

export interface PromoCode {
  id: string;
  code: string;
  discount: number;
  discountType: 'percentage' | 'fixed';
  discount_type?: string; // Added for DB mapping
  validFrom: string;
  valid_from?: string; // Added for DB mapping
  validTo: string;
  valid_to?: string; // Added for DB mapping
  maxUses?: number;
  max_uses?: number; // Added for DB mapping
  timesUsed: number;
  times_used?: number; // Added for DB mapping
  active: boolean;
  description?: string;
  applicable_to?: string[];
  applicableTo?: string[];
  created_at?: string;
  updated_at?: string;
}

export interface LeadSource {
  id: string;
  name: string;
  source_type: 'website' | 'email' | 'social' | 'ad' | 'event' | 'referral' | 'other' | string; // Added string to be more flexible
  description?: string;
  active: boolean;
  created_at?: string;
  updated_at?: string;
}

export interface CampaignSend {
  id: string;
  campaign_id: string;
  recipient_id: string;
  sent_at: string;
  opened_at?: string;
  clicked_at?: string;
  links_clicked?: Record<string, any>[];
  status: 'queued' | 'sent' | 'delivered' | 'opened' | 'clicked' | 'bounced' | 'failed' | 'unsubscribed' | string; // Added string to be more flexible
  error_message?: string;
}
