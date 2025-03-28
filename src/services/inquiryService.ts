
import { createClient } from '@supabase/supabase-js';

// Initialize Supabase client
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || '';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || '';
const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Interface for form data
interface InquiryFormData {
  service: string;
  name: string;
  email: string;
  [key: string]: any;
}

/**
 * Submit form data to the backend
 * @param formData The form data to submit
 * @returns A promise that resolves to the response from the backend
 */
export const submitInquiryForm = async (formData: InquiryFormData) => {
  try {
    // Call the Supabase Edge Function
    const { data, error } = await supabase.functions.invoke('process-inquiry', {
      body: formData,
    });

    if (error) {
      console.error('Error submitting form:', error);
      throw new Error(error.message || 'Failed to submit form');
    }

    return { success: true, data };
  } catch (error) {
    console.error('Error in submitInquiryForm:', error);
    return { 
      success: false, 
      error: error instanceof Error ? error.message : 'An unknown error occurred' 
    };
  }
};

/**
 * Log form submission for debugging/analytics
 * @param service The service type
 * @param formData The form data submitted
 */
export const logFormSubmission = (service: string, formData: Record<string, any>) => {
  // Remove sensitive information before logging
  const { email, phone, ...safeData } = formData;
  
  console.log(`Form submission for ${service}:`, {
    ...safeData,
    email: email ? `${email.substring(0, 3)}...` : undefined,
    phone: phone ? `${phone.substring(0, 3)}...` : undefined,
    timestamp: new Date().toISOString(),
  });
};
