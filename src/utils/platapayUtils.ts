
import { supabase } from '@/integrations/supabase/client';

/**
 * Track a PlataPay specific lead with additional information
 * @param leadData Data about the lead
 * @returns Result of the operation
 */
export const trackPlatapayLead = async (leadData: {
  name: string;
  email: string;
  phone?: string;
  company?: string;
  location?: string;
  agentType?: 'individual' | 'enterprise' | 'franchise';
  source?: string;
  message?: string;
  subscribe?: boolean;
}) => {
  try {
    // Find the PlataPay lead source
    let { data: sourceData } = await supabase
      .from('lead_sources')
      .select('id')
      .eq('name', 'PlataPay')
      .eq('active', true)
      .single();
    
    // If PlataPay source doesn't exist, create it
    if (!sourceData) {
      const { data: newSource, error: sourceError } = await supabase
        .from('lead_sources')
        .insert({
          name: 'PlataPay',
          source_type: 'website',
          description: 'Leads specifically interested in PlataPay services',
          active: true
        })
        .select('id')
        .single();
      
      if (sourceError) throw sourceError;
      sourceData = newSource;
    }
    
    // Insert into marketing_recipients
    await supabase
      .from('marketing_recipients')
      .insert({
        name: leadData.name,
        email: leadData.email,
        company: leadData.company,
        tags: ['platapay', leadData.agentType || 'interested'],
        subscribed: leadData.subscribe || true,
        source_id: sourceData.id
      });
    
    // Insert into inquiries with PlataPay specific data
    const { data: inquiry, error: inquiryError } = await supabase
      .from('inquiries')
      .insert({
        name: leadData.name,
        email: leadData.email,
        phone: leadData.phone,
        company: leadData.company,
        location: leadData.location,
        service: 'platapay',
        message: leadData.message,
        business_type: leadData.agentType,
        subscribe: leadData.subscribe || true,
        meta: {
          platform: 'platapay',
          interest_type: leadData.agentType || 'general',
          source: leadData.source || 'website'
        }
      })
      .select('id')
      .single();
    
    if (inquiryError) throw inquiryError;
    
    // Attempt to generate personalized welcome message via edge function
    try {
      await supabase.functions.invoke('marketing-copy', {
        body: {
          prompt: `Generate a personalized welcome email for a new potential PlataPay ${leadData.agentType || 'agent'} named ${leadData.name} from ${leadData.company || 'their company'} who is interested in our digital payment platform.`,
          marketingType: "email",
          tone: "professional",
          targetAudience: "potential agents"
        }
      });
    } catch (aiError) {
      console.error('AI generation error:', aiError);
      // Non-blocking - continue even if AI fails
    }
    
    return { success: true, inquiryId: inquiry.id };
  } catch (error) {
    console.error('Error tracking PlataPay lead:', error);
    return { success: false, error };
  }
};

/**
 * Get PlataPay agent statistics for dashboard
 */
export const getPlatapayStats = async () => {
  try {
    const { data, error } = await supabase
      .from('inquiries')
      .select('count')
      .eq('service', 'platapay');
    
    if (error) throw error;
    
    return {
      totalLeads: data?.[0]?.count || 0,
      // You could extend this with more detailed stats in the future
    };
  } catch (error) {
    console.error('Error getting PlataPay stats:', error);
    return { totalLeads: 0 };
  }
};
