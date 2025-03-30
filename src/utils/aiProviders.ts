
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
