
// Import the mock data since we don't have actual table access
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

// Mock agents data
const mockAgents: PlatapayAgent[] = [
  {
    id: '1',
    agent_name: 'Central Market Agent',
    location: 'Batangas City',
    address: 'Stall 24, Central Market, Batangas City',
    contact_number: '+63 917 123 4567',
    email: null,
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
    email: null,
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
export const fetchAllAgents = async (): Promise<PlatapayAgent[]> => {
  try {
    // Return mock data instead of querying Supabase
    console.log('Fetching all PlataPay agents (mock data)');
    return mockAgents;
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
    // Return filtered mock data
    console.log('Fetching featured PlataPay agents (mock data)');
    return mockAgents.filter(agent => agent.is_featured);
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
    // Return filtered mock data by location
    console.log(`Fetching agents by location: ${location} (mock data)`);
    return mockAgents.filter(agent => 
      agent.location.toLowerCase().includes(location.toLowerCase())
    );
  } catch (error) {
    console.error('Error in fetchAgentsByLocation:', error);
    return [];
  }
};
