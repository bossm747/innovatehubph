
import { supabase } from '@/integrations/supabase/client';

export interface Testimonial {
  id: string;
  client_name: string;
  client_position: string | null;
  client_company: string | null;
  client_avatar: string | null;
  content: string;
  rating: number | null;
  service_id: string | null;
  is_featured: boolean;
  created_at: string;
}

/**
 * Fetch all testimonials
 */
export const fetchTestimonials = async (): Promise<Testimonial[]> => {
  try {
    const { data, error } = await supabase
      .from('testimonials')
      .select('*');
      
    if (error) {
      console.error('Error fetching testimonials:', error);
      throw error;
    }
    
    return data || [];
  } catch (error) {
    console.error('Error in fetchTestimonials:', error);
    return [];
  }
};

/**
 * Fetch featured testimonials
 */
export const fetchFeaturedTestimonials = async (): Promise<Testimonial[]> => {
  try {
    const { data, error } = await supabase
      .from('testimonials')
      .select('*')
      .eq('is_featured', true);
      
    if (error) {
      console.error('Error fetching featured testimonials:', error);
      throw error;
    }
    
    return data || [];
  } catch (error) {
    console.error('Error in fetchFeaturedTestimonials:', error);
    return [];
  }
};

/**
 * Fetch testimonials for a specific service
 */
export const fetchTestimonialsByService = async (serviceId: string): Promise<Testimonial[]> => {
  try {
    const { data, error } = await supabase
      .from('testimonials')
      .select('*')
      .eq('service_id', serviceId);
      
    if (error) {
      console.error('Error fetching testimonials by service:', error);
      throw error;
    }
    
    return data || [];
  } catch (error) {
    console.error('Error in fetchTestimonialsByService:', error);
    return [];
  }
};
