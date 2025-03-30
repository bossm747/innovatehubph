
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';

export interface AgentRegistration {
  first_name: string;
  last_name: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  province: string;
  postal_code?: string;
  business_name?: string;
  business_type?: string;
  id_type?: string;
  referral_code?: string;
  has_existing_business: boolean;
  created_at?: string;
  status?: 'pending' | 'approved' | 'rejected';
}

/**
 * Submits an agent registration application
 */
export const registerAgent = async (registration: AgentRegistration): Promise<boolean> => {
  try {
    // Check if email or phone already exists
    const { data: existingAgent } = await supabase
      .from('agent_registrations')
      .select('email, phone')
      .or(`email.eq.${registration.email},phone.eq.${registration.phone}`)
      .single();
    
    if (existingAgent) {
      if (existingAgent.email === registration.email) {
        toast.error('An application with this email already exists.');
      } else {
        toast.error('An application with this phone number already exists.');
      }
      return false;
    }
    
    const { error } = await supabase
      .from('agent_registrations')
      .insert([{
        ...registration,
        created_at: new Date().toISOString(),
        status: 'pending',
      }]);
    
    if (error) {
      console.error('Agent registration error:', error);
      toast.error('Failed to submit your application. Please try again later.');
      return false;
    }
    
    toast.success('Your agent application has been submitted successfully! We will contact you soon.');
    return true;
  } catch (error) {
    console.error('Agent service error:', error);
    toast.error('An unexpected error occurred. Please try again.');
    return false;
  }
};

/**
 * Retrieves all agent registrations (for admin use)
 */
export const getAgentRegistrations = async (): Promise<AgentRegistration[]> => {
  try {
    const { data, error } = await supabase
      .from('agent_registrations')
      .select('*')
      .order('created_at', { ascending: false });
    
    if (error) {
      console.error('Error fetching agent registrations:', error);
      return [];
    }
    
    return data || [];
  } catch (error) {
    console.error('Agent service error:', error);
    return [];
  }
};

/**
 * Updates the status of an agent registration
 */
export const updateAgentStatus = async (
  id: string, 
  status: 'pending' | 'approved' | 'rejected'
): Promise<boolean> => {
  try {
    const { error } = await supabase
      .from('agent_registrations')
      .update({ status })
      .eq('id', id);
    
    if (error) {
      console.error('Error updating agent status:', error);
      return false;
    }
    
    return true;
  } catch (error) {
    console.error('Agent service error:', error);
    return false;
  }
};
