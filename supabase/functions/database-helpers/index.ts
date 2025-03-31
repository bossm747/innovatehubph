
import { serve } from "https://deno.land/std@0.177.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.7.1";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, {
      status: 204,
      headers: corsHeaders,
    });
  }

  try {
    const supabaseUrl = Deno.env.get('SUPABASE_URL') || '';
    const supabaseKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') || '';
    const supabase = createClient(supabaseUrl, supabaseKey);
    
    const { action, tableName, limit = 50, filter, id } = await req.json();
    
    // Log the request for debugging
    console.log(`Database action: ${action}, table: ${tableName}`);
    
    if (action === 'listTables') {
      // Query to get all tables in the public schema
      // We need to use raw SQL here because we're querying system tables
      const { data, error } = await supabase
        .rpc('get_all_tables');
        
      if (error) {
        console.error('Error fetching tables:', error);
        throw error;
      }
      
      return new Response(JSON.stringify({ data }), { 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
      });
    }
    
    if (action === 'getRecords' && tableName) {
      // Sanitize table name to prevent SQL injection
      if (!tableName.match(/^[a-zA-Z0-9_]+$/)) {
        throw new Error('Invalid table name');
      }
      
      console.log(`Fetching records from ${tableName}`);
      
      // Use RPC to get records from the table using our database function
      const { data, error } = await supabase
        .rpc('get_table_records', { table_name: tableName });
        
      if (error) {
        console.error(`Error fetching records from ${tableName}:`, error);
        throw error;
      }
      
      console.log(`Retrieved ${data?.length || 0} records from ${tableName}`);
      
      return new Response(JSON.stringify({ data }), { 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
      });
    }

    if (action === 'getRecord' && tableName && id) {
      // Sanitize table name to prevent SQL injection
      if (!tableName.match(/^[a-zA-Z0-9_]+$/)) {
        throw new Error('Invalid table name');
      }
      
      // Get a specific record by ID
      const { data, error } = await supabase
        .rpc('get_record_by_id', { 
          table_name: tableName,
          record_id: id
        });
        
      if (error) throw error;
      return new Response(JSON.stringify({ data }), { 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
      });
    }
    
    if (action === 'getTableSchema' && tableName) {
      // Sanitize table name to prevent SQL injection
      if (!tableName.match(/^[a-zA-Z0-9_]+$/)) {
        throw new Error('Invalid table name');
      }
      
      // Get the table schema from information_schema
      const { data, error } = await supabase
        .from('information_schema.columns')
        .select('column_name, data_type, is_nullable, column_default')
        .eq('table_schema', 'public')
        .eq('table_name', tableName)
        .order('ordinal_position');
        
      if (error) throw error;
      return new Response(JSON.stringify({ data }), { 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
      });
    }
    
    return new Response(JSON.stringify({ error: 'Invalid action' }), { 
      status: 400,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
    });
  } catch (error) {
    console.error('Error processing request:', error);
    return new Response(JSON.stringify({ error: error.message }), { 
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
    });
  }
});
