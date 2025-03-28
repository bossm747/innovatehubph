
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

// Mock testimonials data
const mockTestimonials: Testimonial[] = [
  {
    id: '1',
    client_name: 'Roberto Tan',
    client_position: 'Small Business Owner',
    client_company: 'Roberto\'s Sari-Sari Store',
    client_avatar: null,
    content: 'PlataPay has transformed how I manage my store. I can now accept digital payments easily.',
    rating: 5,
    service_id: null,
    is_featured: true,
    created_at: new Date().toISOString()
  },
  {
    id: '2',
    client_name: 'Teresa Gomez',
    client_position: 'Entrepreneur',
    client_company: 'Teresa\'s Bakery',
    client_avatar: null,
    content: 'The e-commerce solution built by InnovateHub has allowed me to sell my baked goods online.',
    rating: 5,
    service_id: '2',
    is_featured: true,
    created_at: new Date().toISOString()
  }
];

/**
 * Fetch all testimonials
 */
export const fetchTestimonials = async (): Promise<Testimonial[]> => {
  try {
    console.log('Fetching all testimonials (mock data)');
    return mockTestimonials;
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
    console.log('Fetching featured testimonials (mock data)');
    return mockTestimonials.filter(testimonial => testimonial.is_featured);
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
    console.log(`Fetching testimonials by service ID: ${serviceId} (mock data)`);
    return mockTestimonials.filter(testimonial => testimonial.service_id === serviceId);
  } catch (error) {
    console.error('Error in fetchTestimonialsByService:', error);
    return [];
  }
};
