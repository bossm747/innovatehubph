
import { supabase } from '@/integrations/supabase/client';

export interface FintechAgent {
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

// Mock Fintech agents data
const mockAgents: FintechAgent[] = [
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
 * Fetch all Fintech agents
 */
export const fetchFintechAgents = async (): Promise<FintechAgent[]> => {
  try {
    console.log('Fetching all Fintech agents (mock data)');
    return mockAgents;
  } catch (error) {
    console.error('Error in fetchFintechAgents:', error);
    return [];
  }
};

/**
 * Fetch featured Fintech agents
 */
export const fetchFeaturedFintechAgents = async (): Promise<FintechAgent[]> => {
  try {
    console.log('Fetching featured Fintech agents (mock data)');
    return mockAgents.filter(agent => agent.is_featured);
  } catch (error) {
    console.error('Error in fetchFeaturedFintechAgents:', error);
    return [];
  }
};

/**
 * Fetch Fintech agent by ID
 */
export const fetchFintechAgentById = async (id: string): Promise<FintechAgent | null> => {
  try {
    console.log(`Fetching Fintech agent by ID: ${id} (mock data)`);
    return mockAgents.find(agent => agent.id === id) || null;
  } catch (error) {
    console.error('Error in fetchFintechAgentById:', error);
    return null;
  }
};
