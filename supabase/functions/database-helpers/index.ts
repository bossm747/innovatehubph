
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
    
    if (action === 'listTables') {
      // Query to get all tables in the public schema
      const { data, error } = await supabase
        .from('pg_catalog.pg_tables')
        .select('tablename')
        .eq('schemaname', 'public');
        
      if (error) throw error;
      return new Response(JSON.stringify({ data }), { 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
      });
    }
    
    if (action === 'getRecords' && tableName) {
      // Sanitize table name to prevent SQL injection
      if (!tableName.match(/^[a-zA-Z0-9_]+$/)) {
        throw new Error('Invalid table name');
      }
      
      // Execute a raw query to select data from the specified table
      const { data, error } = await supabase
        .rpc('select_from_table', { 
          table_name: tableName,
          row_limit: limit
        });
        
      if (error) throw error;
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
        .from(tableName)
        .select('*')
        .eq('id', id)
        .single();
        
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
