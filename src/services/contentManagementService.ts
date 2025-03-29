
import { supabase } from "@/integrations/supabase/client";

// Navigation items
export const fetchNavigationItems = async () => {
  const { data, error } = await supabase
    .from('navigation_items')
    .select('*')
    .order('position');
  
  if (error) throw error;
  return data || [];
};

export const createNavigationItem = async (navigationItem: any) => {
  const { data, error } = await supabase
    .from('navigation_items')
    .insert(navigationItem)
    .select()
    .single();
  
  if (error) throw error;
  return data;
};

export const updateNavigationItem = async (id: string, updates: any) => {
  const { data, error } = await supabase
    .from('navigation_items')
    .update({ ...updates, updated_at: new Date().toISOString() })
    .eq('id', id)
    .select()
    .single();
  
  if (error) throw error;
  return data;
};

export const deleteNavigationItem = async (id: string) => {
  const { error } = await supabase
    .from('navigation_items')
    .delete()
    .eq('id', id);
  
  if (error) throw error;
  return true;
};

// Pages
export const fetchPages = async () => {
  const { data, error } = await supabase
    .from('pages')
    .select('*')
    .order('title');
  
  if (error) throw error;
  return data || [];
};

export const fetchPageById = async (id: string) => {
  const { data, error } = await supabase
    .from('pages')
    .select('*')
    .eq('id', id)
    .single();
  
  if (error) throw error;
  return data;
};

export const createPage = async (page: any) => {
  const { data, error } = await supabase
    .from('pages')
    .insert(page)
    .select()
    .single();
  
  if (error) throw error;
  return data;
};

export const updatePage = async (id: string, updates: any) => {
  const { data, error } = await supabase
    .from('pages')
    .update({ ...updates, updated_at: new Date().toISOString() })
    .eq('id', id)
    .select()
    .single();
  
  if (error) throw error;
  return data;
};

export const deletePage = async (id: string) => {
  const { error } = await supabase
    .from('pages')
    .delete()
    .eq('id', id);
  
  if (error) throw error;
  return true;
};

// Page Sections
export const fetchPageSections = async (pageId: string) => {
  const { data, error } = await supabase
    .from('page_sections')
    .select('*')
    .eq('page_id', pageId)
    .order('position');
  
  if (error) throw error;
  return data || [];
};

export const createPageSection = async (section: any) => {
  const { data, error } = await supabase
    .from('page_sections')
    .insert(section)
    .select()
    .single();
  
  if (error) throw error;
  return data;
};

export const updatePageSection = async (id: string, updates: any) => {
  const { data, error } = await supabase
    .from('page_sections')
    .update({ ...updates, updated_at: new Date().toISOString() })
    .eq('id', id)
    .select()
    .single();
  
  if (error) throw error;
  return data;
};

export const deletePageSection = async (id: string) => {
  const { error } = await supabase
    .from('page_sections')
    .delete()
    .eq('id', id);
  
  if (error) throw error;
  return true;
};

// Site Settings
export const fetchSiteSettings = async (settingId: string) => {
  const { data, error } = await supabase
    .from('site_settings')
    .select('*')
    .eq('id', settingId)
    .single();
  
  if (error && error.code !== 'PGRST116') throw error;
  return data;
};

export const updateSiteSettings = async (id: string, settings: any) => {
  // Fixed: Convert Date object to ISO string
  const { data, error } = await supabase
    .from('site_settings')
    .upsert({ 
      id, 
      settings, 
      updated_at: new Date().toISOString() 
    })
    .select()
    .single();
  
  if (error) throw error;
  return data;
};
