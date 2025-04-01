
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

// Team members data with updated structure
const mockTeamMembers: TeamMember[] = [
  // Leadership
  {
    id: '1',
    full_name: 'Marc Roland Agbay',
    position: 'Chairman of the Board',
    department: 'Leadership',
    bio: 'Marc Roland Agbay provides strategic direction and vision for InnovateHub Inc.',
    photo_url: '/lovable-uploads/13165526-621e-41b9-9e68-4ef94cb85f92.png',
    linkedin_url: null,
    email: null,
    order_index: 1,
    is_active: true,
    created_at: new Date().toISOString()
  },
  {
    id: '2',
    full_name: 'Lyn Plata Agbay',
    position: 'Chief Executive Officer',
    department: 'Leadership',
    bio: 'Lyn Plata Agbay leads InnovateHub Inc. with innovation and excellence in digital transformation.',
    photo_url: '/lovable-uploads/0831c807-9c51-4945-b543-6aa09dd81d02.png',
    linkedin_url: null,
    email: 'lyn@innovatehub.ph',
    order_index: 2,
    is_active: true,
    created_at: new Date().toISOString()
  },
  // Board of Directors
  {
    id: '3',
    full_name: 'Zarah Ian Caparro',
    position: 'Board of Directors',
    department: 'Leadership',
    bio: 'Zarah Ian Caparro brings expertise to the board while also serving as Project Manager.',
    photo_url: null,
    linkedin_url: null,
    email: null,
    order_index: 3,
    is_active: true,
    created_at: new Date().toISOString()
  },
  {
    id: '4',
    full_name: 'Aileen Rabano',
    position: 'Board of Directors',
    department: 'Leadership',
    bio: 'Aileen Rabano contributes strategic insights as a member of the Board of Directors.',
    photo_url: null,
    linkedin_url: null,
    email: null,
    order_index: 4,
    is_active: true,
    created_at: new Date().toISOString()
  },
  // Operations & Corporate Relations
  {
    id: '5',
    full_name: 'Venus Pagunsan',
    position: 'Operation & Corporate Relations Manager',
    department: 'Operations & Corporate Relations',
    bio: 'Venus leads the Operations & Corporate Relations department, ensuring smooth business operations.',
    photo_url: null,
    linkedin_url: null,
    email: null,
    order_index: 5,
    is_active: true,
    created_at: new Date().toISOString()
  },
  {
    id: '6',
    full_name: 'Prince Cano',
    position: 'Marketing Associate',
    department: 'Operations & Corporate Relations',
    bio: 'Prince supports marketing initiatives and corporate communications.',
    photo_url: null,
    linkedin_url: null,
    email: null,
    order_index: 6,
    is_active: true,
    created_at: new Date().toISOString()
  },
  {
    id: '7',
    full_name: 'Rico Payoyo',
    position: 'Sales Officer',
    department: 'Operations & Corporate Relations',
    bio: 'Rico manages sales strategies and client relationships.',
    photo_url: null,
    linkedin_url: null,
    email: null,
    order_index: 7,
    is_active: true,
    created_at: new Date().toISOString()
  },
  {
    id: '8',
    full_name: 'Gladys Marco',
    position: 'Marketing Officer',
    department: 'Operations & Corporate Relations',
    bio: 'Gladys oversees marketing campaigns and brand development.',
    photo_url: null,
    linkedin_url: null,
    email: null,
    order_index: 8,
    is_active: true,
    created_at: new Date().toISOString()
  },
  // Administration & Finance
  {
    id: '9',
    full_name: 'Maryann Mercado',
    position: 'Admin & Finance Manager',
    department: 'Administration & Finance',
    bio: 'Maryann manages administrative functions and financial operations.',
    photo_url: null,
    linkedin_url: null,
    email: null,
    order_index: 9,
    is_active: true,
    created_at: new Date().toISOString()
  },
  {
    id: '10',
    full_name: 'Jonalyn Plata',
    position: 'Finance & Support',
    department: 'Administration & Finance',
    bio: 'Jonalyn provides financial analysis and administrative support.',
    photo_url: null,
    linkedin_url: null,
    email: null,
    order_index: 10,
    is_active: true,
    created_at: new Date().toISOString()
  },
  {
    id: '11',
    full_name: 'GreenPoint Acct Firm',
    position: 'HR & Internal Audit',
    department: 'Administration & Finance',
    bio: 'GreenPoint handles human resources management and internal auditing processes.',
    photo_url: null,
    linkedin_url: null,
    email: null,
    order_index: 11,
    is_active: true,
    created_at: new Date().toISOString()
  },
  // Project Management
  {
    id: '12',
    full_name: 'Zarah Caparro',
    position: 'Project Manager',
    department: 'Project Management',
    bio: 'Zarah oversees project execution and client deliverables.',
    photo_url: null,
    linkedin_url: null,
    email: null,
    order_index: 12,
    is_active: true,
    created_at: new Date().toISOString()
  },
  {
    id: '13',
    full_name: 'Aron',
    position: 'UI Designer & Support',
    department: 'Project Management',
    bio: 'Aron creates engaging user interfaces and provides design support.',
    photo_url: null,
    linkedin_url: null,
    email: null,
    order_index: 13,
    is_active: true,
    created_at: new Date().toISOString()
  },
  {
    id: '14',
    full_name: 'John Gerald Catague',
    position: 'Back End, Security & Support',
    department: 'Project Management',
    bio: 'John Gerald manages backend development and security protocols.',
    photo_url: null,
    linkedin_url: null,
    email: null,
    order_index: 14,
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
