
import { supabase } from '@/integrations/supabase/client';

export interface TeamMember {
  id: string;
  full_name: string;
  position: string;
  department: string | null;
  bio: string | null;
  photo_url: string | null;
  linkedin_url: string | null;
  email: string | null;
  order_index: number;
  is_active: boolean;
  created_at: string;
}

// Mock team members data
const mockTeamMembers: TeamMember[] = [
  {
    id: '1',
    full_name: 'Juan Dela Cruz',
    position: 'CEO & Founder',
    department: 'Leadership',
    bio: 'Juan founded InnovateHub with a vision to transform the digital landscape in the Philippines.',
    photo_url: '/lovable-uploads/13165526-621e-41b9-9e68-4ef94cb85f92.png',
    linkedin_url: null,
    email: null,
    order_index: 1,
    is_active: true,
    created_at: new Date().toISOString()
  },
  {
    id: '2',
    full_name: 'Maria Santos',
    position: 'Chief Technology Officer',
    department: 'Leadership',
    bio: 'Maria oversees all technological aspects at InnovateHub.',
    photo_url: '/lovable-uploads/0831c807-9c51-4945-b543-6aa09dd81d02.png',
    linkedin_url: null,
    email: null,
    order_index: 2,
    is_active: true,
    created_at: new Date().toISOString()
  }
];

/**
 * Fetch all active team members
 */
export const fetchTeamMembers = async (): Promise<TeamMember[]> => {
  try {
    console.log('Fetching all team members (mock data)');
    return mockTeamMembers.filter(member => member.is_active);
  } catch (error) {
    console.error('Error in fetchTeamMembers:', error);
    return [];
  }
};

/**
 * Fetch a specific team member by ID
 */
export const fetchTeamMemberById = async (id: string): Promise<TeamMember | null> => {
  try {
    console.log(`Fetching team member by ID: ${id} (mock data)`);
    return mockTeamMembers.find(member => member.id === id) || null;
  } catch (error) {
    console.error('Error in fetchTeamMemberById:', error);
    return null;
  }
};

/**
 * Fetch team members by department
 */
export const fetchTeamMembersByDepartment = async (department: string): Promise<TeamMember[]> => {
  try {
    console.log(`Fetching team members by department: ${department} (mock data)`);
    return mockTeamMembers.filter(
      member => member.department === department && member.is_active
    );
  } catch (error) {
    console.error('Error in fetchTeamMembersByDepartment:', error);
    return [];
  }
};
