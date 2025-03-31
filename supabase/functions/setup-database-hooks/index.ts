
import { serve } from "https://deno.land/std@0.177.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.7.1";

const supabaseUrl = Deno.env.get("SUPABASE_URL") || "";
const supabaseServiceKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") || "";
const supabase = createClient(supabaseUrl, supabaseServiceKey);

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
    // Check if the webhook already exists
    const { data: hooks, error: hooksError } = await supabase
      .from('supabase_functions.hooks')
      .select('*')
      .eq('hook_table_id', 'public.inquiries')
      .eq('hook_function_id', 'auto-respond-inquiry');
      
    if (hooksError) {
      throw new Error(`Error checking existing hooks: ${hooksError.message}`);
    }
    
    let result;
    
    // If the webhook doesn't exist, create it
    if (!hooks || hooks.length === 0) {
      // Create the webhook
      const { data, error } = await supabase.rpc('create_webhook', {
        table_name: 'public.inquiries',
        function_name: 'auto-respond-inquiry',
        events: ['INSERT'],
        request_type: 'action'
      });
      
      if (error) {
        throw new Error(`Error creating webhook: ${error.message}`);
      }
      
      result = {
        message: "Webhook created successfully",
        webhook: data
      };
    } else {
      result = {
        message: "Webhook already exists",
        webhook: hooks[0]
      };
    }
    
    return new Response(JSON.stringify(result), {
      status: 200,
      headers: { "Content-Type": "application/json", ...corsHeaders },
    });
  } catch (error) {
    console.error("Error setting up webhooks:", error);
    
    return new Response(
      JSON.stringify({ 
        success: false, 
        error: error.message || "An unknown error occurred" 
      }),
      {
        status: 500,
        headers: { "Content-Type": "application/json", ...corsHeaders },
      }
    );
  }
});

// Helper function to create RPC function for creating webhooks
async function createWebhookRpcFunction() {
  const { error } = await supabase.rpc('exec_sql', {
    sql: `
    CREATE OR REPLACE FUNCTION public.create_webhook(
      table_name text,
      function_name text,
      events text[],
      request_type text
    ) RETURNS jsonb
    LANGUAGE plpgsql
    SECURITY DEFINER
    AS $$
    DECLARE
      hook_id uuid;
      hook_table_id text;
      hook_function_id text;
      result jsonb;
    BEGIN
      hook_table_id := table_name;
      hook_function_id := function_name;
      
      INSERT INTO supabase_functions.hooks
        (hook_table_id, hook_function_id, hook_events, hook_relation_id, hook_request_type)
      VALUES
        (hook_table_id, hook_function_id, events, NULL, request_type)
      RETURNING id INTO hook_id;
      
      SELECT jsonb_build_object(
        'id', id,
        'hook_table_id', hook_table_id,
        'hook_function_id', hook_function_id,
        'hook_events', hook_events,
        'hook_request_type', hook_request_type
      ) INTO result
      FROM supabase_functions.hooks
      WHERE id = hook_id;
      
      RETURN result;
    END;
    $$;
    `
  });
  
  if (error) {
    throw new Error(`Error creating webhook RPC function: ${error.message}`);
  }
}
