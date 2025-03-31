
import { supabase } from '@/integrations/supabase/client';

// Interface for form data
export interface InquiryFormData {
  service: string;
  name: string;
  email: string;
  phone?: string;
  company?: string;
  message?: string;
  businessType?: string;
  location?: string;
  services?: string[];
  subscribe?: boolean;
  [key: string]: any;
}

/**
 * Submit form data to the database and trigger the email notification
 * @param formData The form data to submit
 * @returns A promise that resolves to the response from the submission
 */
export const submitInquiryForm = async (formData: InquiryFormData) => {
  try {
    console.log('Submitting inquiry form data:', formData);
    
    // First, insert the inquiry into the database
    const { data: inquiryData, error: inquiryError } = await supabase
      .from('inquiries')
      .insert({
        service: formData.service,
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        company: formData.company,
        message: formData.message,
        business_type: formData.businessType,
        location: formData.location,
        services: Array.isArray(formData.services) ? formData.services : undefined,
        subscribe: formData.subscribe,
        status: "new",  // Set initial status to "new"
        processed: false, // Mark as not processed initially
        
        // Specific form fields
        project_type: formData.projectType,
        requirements: formData.requirements,
        business_name: formData.businessName,
        store_type: formData.storeType,
        products: formData.products,
        features: Array.isArray(formData.features) ? formData.features : undefined,
        additional_info: formData.additionalInfo,
        industry: formData.industry,
        ai_type: formData.aiType,
        data_available: formData.dataAvailable,
        position: formData.position,
        company_size: formData.companySize,
        current_markets: formData.currentMarkets,
        target_markets: formData.targetMarkets,
        expansion_goals: formData.expansionGoals,
        budget: formData.budget,
        timeline: formData.timeline,
        
        // Store all other fields in meta
        meta: Object.keys(formData)
          .filter(key => !['service', 'name', 'email', 'phone', 'company', 'message', 
                           'businessType', 'location', 'services', 'subscribe', 
                           'projectType', 'requirements', 'businessName', 'storeType', 
                           'products', 'features', 'additionalInfo', 'industry', 
                           'aiType', 'dataAvailable', 'position', 'companySize', 
                           'currentMarkets', 'targetMarkets', 'expansionGoals', 
                           'budget', 'timeline'].includes(key))
          .reduce((obj, key) => ({ ...obj, [key]: formData[key] }), {})
      })
      .select('id')
      .single();

    if (inquiryError) {
      console.error('Error inserting into inquiries table:', inquiryError);
      throw new Error(inquiryError.message || 'Failed to submit inquiry');
    }
    
    // Add to subscribers table if they opted in
    if (formData.subscribe) {
      const { error: subscriberError } = await supabase
        .from('subscribers')
        .upsert({
          email: formData.email,
          name: formData.name,
          source: formData.service,
          active: true
        }, {
          onConflict: 'email'
        });
        
      if (subscriberError) {
        console.error('Error adding to subscribers:', subscriberError);
        // Don't throw error, as the main submission was successful
      }
    }
    
    // Log the form submission
    logFormSubmission(formData.service, formData);
    
    // The auto-respond-inquiry webhook will handle sending the personalized email automatically
    
    return { 
      success: true, 
      data: inquiryData,
      message: "Your inquiry has been submitted successfully. You'll receive a personalized email shortly."
    };
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

/**
 * Get inquiry by ID
 * @param id The inquiry ID
 * @returns The inquiry data
 */
export const getInquiryById = async (id: string) => {
  try {
    const { data, error } = await supabase
      .from('inquiries')
      .select('*')
      .eq('id', id)
      .single();
      
    if (error) throw error;
    
    return { success: true, data };
  } catch (error) {
    console.error('Error fetching inquiry:', error);
    return { 
      success: false, 
      error: error instanceof Error ? error.message : 'An unknown error occurred' 
    };
  }
};

/**
 * Update inquiry status
 * @param id The inquiry ID
 * @param status The new status
 * @returns Success or error response
 */
export const updateInquiryStatus = async (id: string, status: string) => {
  try {
    const { data, error } = await supabase
      .from('inquiries')
      .update({ status })
      .eq('id', id);
      
    if (error) throw error;
    
    return { success: true, data };
  } catch (error) {
    console.error('Error updating inquiry status:', error);
    return { 
      success: false, 
      error: error instanceof Error ? error.message : 'An unknown error occurred' 
    };
  }
};
