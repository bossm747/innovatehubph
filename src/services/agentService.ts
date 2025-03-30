
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
    // Check if email or phone already exists - using inquiries table with type=agent
    const { data: existingAgent } = await supabase
      .from('inquiries')
      .select('email, phone')
      .eq('type', 'agent')
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
      .from('inquiries')
      .insert([{
        ...registration,
        type: 'agent',
        created_at: new Date().toISOString(),
        status: 'pending',
        message: JSON.stringify({
          business_info: {
            business_name: registration.business_name,
            business_type: registration.business_type,
            has_existing_business: registration.has_existing_business
          },
          location: {
            address: registration.address,
            city: registration.city,
            province: registration.province,
            postal_code: registration.postal_code
          },
          referral: registration.referral_code,
          id_type: registration.id_type
        })
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
      .from('inquiries')
      .select('*')
      .eq('type', 'agent')
      .order('created_at', { ascending: false });
    
    if (error) {
      console.error('Error fetching agent registrations:', error);
      return [];
    }
    
    // Parse the message field to extract business info
    return (data || []).map(item => {
      const messageObj = item.message ? JSON.parse(item.message) : {};
      return {
        first_name: item.first_name || '',
        last_name: item.last_name || '',
        email: item.email || '',
        phone: item.phone || '',
        address: messageObj.location?.address || '',
        city: messageObj.location?.city || '',
        province: messageObj.location?.province || '',
        postal_code: messageObj.location?.postal_code || '',
        business_name: messageObj.business_info?.business_name || '',
        business_type: messageObj.business_info?.business_type || '',
        id_type: messageObj.id_type || '',
        referral_code: messageObj.referral || '',
        has_existing_business: messageObj.business_info?.has_existing_business || false,
        created_at: item.created_at,
        status: item.status
      } as AgentRegistration;
    });
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
      .from('inquiries')
      .update({ status })
      .eq('id', id)
      .eq('type', 'agent');
    
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
