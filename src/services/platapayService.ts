
import { supabase } from '@/integrations/supabase/client';

export interface PlatapayAgent {
  id: string;
  agent_name: string;
  location: string;
  address: string;
  contact_number: string;
  services: string[];
  is_featured: boolean;
  latitude: number;
  longitude: number;
  created_at: string;
}

// Mock PlataPay agents data
const mockAgents: PlatapayAgent[] = [
  {
    id: '1',
    agent_name: 'Central Market Agent',
    location: 'Batangas City',
    address: 'Stall 24, Central Market, Batangas City',
    contact_number: '+63 917 123 4567',
    services: ['Bills Payment', 'E-Loading', 'Money Transfer'],
    is_featured: true,
    latitude: 13.756331,
    longitude: 121.058265,
    created_at: new Date().toISOString()
  },
  {
    id: '2',
    agent_name: 'SM Batangas Kiosk',
    location: 'Batangas City',
    address: 'Ground Floor, SM City Batangas, Pallocan West',
    contact_number: '+63 928 765 4321',
    services: ['Bills Payment', 'E-Loading', 'Money Transfer', 'QR Payments'],
    is_featured: true,
    latitude: 13.776671,
    longitude: 121.044894,
    created_at: new Date().toISOString()
  }
];

/**
 * Fetch all PlataPay agents
 */
export const fetchPlatapayAgents = async (): Promise<PlatapayAgent[]> => {
  try {
    console.log('Fetching all PlataPay agents (mock data)');
    return mockAgents;
  } catch (error) {
    console.error('Error in fetchPlatapayAgents:', error);
    return [];
  }
};

/**
 * Fetch featured PlataPay agents
 */
export const fetchFeaturedPlatapayAgents = async (): Promise<PlatapayAgent[]> => {
  try {
    console.log('Fetching featured PlataPay agents (mock data)');
    return mockAgents.filter(agent => agent.is_featured);
  } catch (error) {
    console.error('Error in fetchFeaturedPlatapayAgents:', error);
    return [];
  }
};

/**
 * Fetch PlataPay agent by ID
 */
export const fetchPlatapayAgentById = async (id: string): Promise<PlatapayAgent | null> => {
  try {
    console.log(`Fetching PlataPay agent by ID: ${id} (mock data)`);
    return mockAgents.find(agent => agent.id === id) || null;
  } catch (error) {
    console.error('Error in fetchPlatapayAgentById:', error);
    return null;
  }
};
