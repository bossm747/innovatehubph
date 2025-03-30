
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
    const { error } = await supabase
      .from('contact_submissions')
      .insert([{
        ...submission,
        created_at: new Date().toISOString(),
      }]);
    
    if (error) {
      console.error('Contact form submission error:', error);
      toast.error('Failed to submit your message. Please try again later.');
      return false;
    }
    
    // Send email notification (this would typically be handled by a backend function)
    // For now, we'll just simulate a successful submission
    
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
      .from('contact_submissions')
      .select('*')
      .order('created_at', { ascending: false });
    
    if (error) {
      console.error('Error fetching contact submissions:', error);
      return [];
    }
    
    return data || [];
  } catch (error) {
    console.error('Contact service error:', error);
    return [];
  }
};
