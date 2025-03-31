
import { supabase } from '@/integrations/supabase/client';

// Define a specific type for table records
export type BasicValue = string | number | boolean | null;
export type TableRecord = {
  [key: string]: BasicValue | BasicValue[] | { [key: string]: BasicValue } | unknown;
  id: string;
};

export type PgTable = {
  tablename: string;
};

export const DatabaseService = {
  async fetchTables(): Promise<string[]> {
    try {
      const { data, error } = await supabase.functions.invoke('database-helpers', {
        body: { action: 'listTables' }
      });

      if (error) throw error;

      if (data?.data && Array.isArray(data.data)) {
        // Extract table names and sort alphabetically
        return data.data
          .map((table: PgTable) => table.tablename)
          .filter(Boolean)
          .sort();
      }
      
      return [];
    } catch (error) {
      console.error('Error fetching tables:', error);
      throw error;
    }
  },
  
  async fetchRecords(tableName: string, limit: number = 50): Promise<TableRecord[]> {
    try {
      const { data, error } = await supabase.functions.invoke('database-helpers', {
        body: { 
          action: 'getRecords',
          tableName,
          limit
        }
      });
        
      if (error) throw error;

      if (data?.data && Array.isArray(data.data)) {
        return data.data as TableRecord[];
      }
      
      return [];
    } catch (error) {
      console.error(`Error fetching records from ${tableName}:`, error);
      throw error;
    }
  }
};
