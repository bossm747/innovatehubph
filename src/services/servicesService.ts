
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

// Mock services data
const mockServices: Service[] = [
  {
    id: '1',
    name: 'Digital Customizations',
    description: 'Custom software solutions tailored to your business needs',
    icon: null,
    slug: 'digital-customizations',
    is_active: true,
    created_at: new Date().toISOString()
  },
  {
    id: '2',
    name: 'E-Commerce Development',
    description: 'Build and scale your online retail platform',
    icon: null,
    slug: 'ecommerce',
    is_active: true,
    created_at: new Date().toISOString()
  },
  {
    id: '3',
    name: 'AI Solutions',
    description: 'Leverage artificial intelligence to drive innovation',
    icon: null,
    slug: 'ai-solutions',
    is_active: true,
    created_at: new Date().toISOString()
  }
];

/**
 * Fetch all active services
 */
export const fetchServices = async (): Promise<Service[]> => {
  try {
    // Return mock data instead of querying Supabase
    console.log('Fetching all services (mock data)');
    return mockServices.filter(service => service.is_active);
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
    // Return filtered mock data by slug
    console.log(`Fetching service by slug: ${slug} (mock data)`);
    return mockServices.find(service => service.slug === slug && service.is_active) || null;
  } catch (error) {
    console.error('Error in fetchServiceBySlug:', error);
    return null;
  }
};
