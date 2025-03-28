
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

/**
 * Fetch all active team members
 */
export const fetchTeamMembers = async (): Promise<TeamMember[]> => {
  try {
    const { data, error } = await supabase
      .from('team_members')
      .select('*')
      .order('order_index', { ascending: true })
      .eq('is_active', true);
      
    if (error) {
      console.error('Error fetching team members:', error);
      throw error;
    }
    
    return data || [];
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
    const { data, error } = await supabase
      .from('team_members')
      .select('*')
      .eq('id', id)
      .single();
      
    if (error) {
      console.error('Error fetching team member:', error);
      throw error;
    }
    
    return data;
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
    const { data, error } = await supabase
      .from('team_members')
      .select('*')
      .eq('department', department)
      .eq('is_active', true)
      .order('order_index', { ascending: true });
      
    if (error) {
      console.error('Error fetching team members by department:', error);
      throw error;
    }
    
    return data || [];
  } catch (error) {
    console.error('Error in fetchTeamMembersByDepartment:', error);
    return [];
  }
};
