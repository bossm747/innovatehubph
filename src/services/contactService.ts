
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';

export interface ContactSubmission {
  name: string;
  email: string;
  company?: string;
  phone?: string;
  message: string;
  subject?: string;
  source?: string;
  created_at?: string;
}

/**
 * Submits a contact form message to the database
 */
export const submitContactForm = async (submission: ContactSubmission): Promise<boolean> => {
  try {
    // Use the inquiries table which exists in the Supabase schema instead of contact_submissions
    const { error } = await supabase
      .from('inquiries')
      .insert({
        name: submission.name,
        email: submission.email,
        company: submission.company,
        phone: submission.phone,
        message: submission.message,
        service: 'general', // Required field in inquiries table
        type: 'contact',
        created_at: new Date().toISOString(),
        status: 'new'
      });
    
    if (error) {
      console.error('Contact form submission error:', error);
      toast.error('Failed to submit your message. Please try again later.');
      return false;
    }
    
    toast.success('Thank you for your message! We will get back to you soon.');
    return true;
  } catch (error) {
    console.error('Contact service error:', error);
    toast.error('An unexpected error occurred. Please try again.');
    return false;
  }
};

/**
 * Retrieves all contact submissions (for admin use)
 */
export const getContactSubmissions = async (): Promise<ContactSubmission[]> => {
  try {
    const { data, error } = await supabase
      .from('inquiries')
      .select('*')
      .eq('type', 'contact')
      .order('created_at', { ascending: false });
    
    if (error) {
      console.error('Error fetching contact submissions:', error);
      return [];
    }
    
    return (data || []).map(item => ({
      name: item.name,
      email: item.email,
      company: item.company,
      phone: item.phone,
      message: item.message,
      created_at: item.created_at,
      source: item.source || undefined
    })) as ContactSubmission[];
  } catch (error) {
    console.error('Contact service error:', error);
    return [];
  }
};
