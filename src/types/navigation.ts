
export interface NavigationItem {
  id: string;
  label: string;
  url: string;
  parent_id: string | null;
  position: number;
  is_dropdown: boolean;
}
