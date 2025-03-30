
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.39.0";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    // Get the environment variables
    const supabaseUrl = Deno.env.get('SUPABASE_URL')!;
    const supabaseServiceKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!;
    
    // Initialize the Supabase client with the service role key
    const supabase = createClient(supabaseUrl, supabaseServiceKey);
    
    // Parse the request body
    const { csvContent } = await req.json();
    
    if (!csvContent) {
      return new Response(
        JSON.stringify({ error: 'CSV content is required' }),
        { headers: { ...corsHeaders, 'Content-Type': 'application/json' }, status: 400 }
      );
    }
    
    // Process the CSV content
    const recipients = parseCSV(csvContent);
    console.log(`Parsed ${recipients.length} recipients from CSV`);
    
    if (recipients.length === 0) {
      return new Response(
        JSON.stringify({ error: 'No valid recipients found in CSV' }),
        { headers: { ...corsHeaders, 'Content-Type': 'application/json' }, status: 400 }
      );
    }
    
    // Insert the recipients into the database
    const { data, error } = await supabase
      .from('marketing_recipients')
      .upsert(
        recipients.map(recipient => ({
          name: recipient.name,
          email: recipient.email.toLowerCase(),
          company: recipient.company || null,
          tags: recipient.tags ? recipient.tags.split(',').map(tag => tag.trim()) : null,
          subscribed: true
        })),
        { onConflict: 'email' }
      );
    
    if (error) {
      console.error('Error inserting recipients:', error);
      throw error;
    }
    
    return new Response(
      JSON.stringify({ 
        success: true, 
        message: `Successfully imported ${recipients.length} recipients` 
      }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  } catch (error) {
    console.error('Error processing CSV:', error);
    
    return new Response(
      JSON.stringify({ error: 'Failed to import recipients', details: error.message }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' }, status: 500 }
    );
  }
});

function parseCSV(csvContent: string) {
  const lines = csvContent.split('\n');
  
  // Find the header line and determine column indices
  let headers = lines[0].split(',').map(header => header.trim().toLowerCase());
  
  // Required fields
  const nameIndex = headers.findIndex(h => h === 'name' || h === 'full name' || h === 'fullname');
  const emailIndex = headers.findIndex(h => h === 'email' || h === 'email address');
  
  // Optional fields
  const companyIndex = headers.findIndex(h => h === 'company' || h === 'organization');
  const tagsIndex = headers.findIndex(h => h === 'tags' || h === 'categories');
  
  if (nameIndex === -1 || emailIndex === -1) {
    throw new Error('CSV file must contain at least "name" and "email" columns');
  }
  
  const recipients = [];
  
  // Start from index 1 to skip header
  for (let i = 1; i < lines.length; i++) {
    const line = lines[i].trim();
    if (!line) continue;
    
    // Handle quoted values properly
    const values = parseCSVLine(line);
    
    const email = values[emailIndex]?.trim();
    // Basic email validation
    if (!email || !email.includes('@')) continue;
    
    recipients.push({
      name: values[nameIndex]?.trim() || '',
      email: email,
      company: companyIndex !== -1 ? values[companyIndex]?.trim() || null : null,
      tags: tagsIndex !== -1 ? values[tagsIndex]?.trim() || null : null
    });
  }
  
  return recipients;
}

function parseCSVLine(line: string): string[] {
  const result: string[] = [];
  let current = '';
  let inQuotes = false;
  
  for (let i = 0; i < line.length; i++) {
    const char = line[i];
    
    if (char === '"') {
      // Toggle quotes state
      inQuotes = !inQuotes;
    } else if (char === ',' && !inQuotes) {
      // End of field, not inside quotes
      result.push(current);
      current = '';
    } else {
      current += char;
    }
  }
  
  // Add the last field
  result.push(current);
  
  return result;
}
