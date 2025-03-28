
import { supabase } from '@/integrations/supabase/client';

export interface Service {
  id: string;
  name: string;
  description: string;
  icon: string | null;
  slug: string;
  is_active: boolean;
  created_at: string;
}

/**
 * Fetch all active services
 */
export const fetchServices = async (): Promise<Service[]> => {
  try {
    const { data, error } = await supabase
      .from('services')
      .select('*')
      .eq('is_active', true);
      
    if (error) {
      console.error('Error fetching services:', error);
      throw error;
    }
    
    return data || [];
  } catch (error) {
    console.error('Error in fetchServices:', error);
    return [];
  }
};

/**
 * Fetch a service by its slug
 */
export const fetchServiceBySlug = async (slug: string): Promise<Service | null> => {
  try {
    const { data, error } = await supabase
      .from('services')
      .select('*')
      .eq('slug', slug)
      .eq('is_active', true)
      .single();
      
    if (error) {
      console.error('Error fetching service by slug:', error);
      throw error;
    }
    
    return data;
  } catch (error) {
    console.error('Error in fetchServiceBySlug:', error);
    return null;
  }
};
