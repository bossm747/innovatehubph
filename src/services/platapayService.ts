
import { supabase } from '@/integrations/supabase/client';

export interface PlatapayAgent {
  id: string;
  agent_name: string;
  location: string;
  address: string | null;
  contact_number: string | null;
  email: string | null;
  services: string[] | null;
  is_featured: boolean;
  latitude: number | null;
  longitude: number | null;
  created_at: string;
}

/**
 * Fetch all PlataPay agents
 */
export const fetchAllAgents = async (): Promise<PlatapayAgent[]> => {
  try {
    const { data, error } = await supabase
      .from('platapay_agents')
      .select('*');
      
    if (error) {
      console.error('Error fetching PlataPay agents:', error);
      throw error;
    }
    
    return data || [];
  } catch (error) {
    console.error('Error in fetchAllAgents:', error);
    return [];
  }
};

/**
 * Fetch featured PlataPay agents
 */
export const fetchFeaturedAgents = async (): Promise<PlatapayAgent[]> => {
  try {
    const { data, error } = await supabase
      .from('platapay_agents')
      .select('*')
      .eq('is_featured', true);
      
    if (error) {
      console.error('Error fetching featured PlataPay agents:', error);
      throw error;
    }
    
    return data || [];
  } catch (error) {
    console.error('Error in fetchFeaturedAgents:', error);
    return [];
  }
};

/**
 * Fetch agents by location
 */
export const fetchAgentsByLocation = async (location: string): Promise<PlatapayAgent[]> => {
  try {
    const { data, error } = await supabase
      .from('platapay_agents')
      .select('*')
      .ilike('location', `%${location}%`);
      
    if (error) {
      console.error('Error fetching agents by location:', error);
      throw error;
    }
    
    return data || [];
  } catch (error) {
    console.error('Error in fetchAgentsByLocation:', error);
    return [];
  }
};
