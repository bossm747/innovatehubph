
// InquiryService - Handles all form submissions for the inquiry forms

export interface InquiryFormData {
  service: string;
  name: string;
  email: string;
  company?: string;
  businessName?: string;
  phone: string;
  message?: string;
  requirements?: string;
  location?: string;
  businessType?: string;
  projectType?: string;
  industry?: string;
  budget?: string;
  timeline?: string;
  services?: string[];
  features?: string[];
  companySize?: string;
  position?: string;
  currentMarkets?: string;
  targetMarkets?: string;
  expansionGoals?: string;
  products?: string;
  additionalInfo?: string;
  aiType?: string;
  dataAvailable?: string;
  subscribe: boolean;
  // Added storeType as optional to maintain backward compatibility
  storeType?: string;
}

export interface SubmissionResult {
  success: boolean;
  error?: string;
  data?: any;
}

// Form submission handling function
export const submitInquiryForm = async (formData: InquiryFormData): Promise<SubmissionResult> => {
  try {
    console.log(`Submitting ${formData.service} inquiry form...`, formData);
    
    // In a real application, you would send this data to your backend
    // For now, we'll simulate a successful submission
    
    // Handle backward compatibility with storeType
    if (formData.storeType && !formData.requirements) {
      formData.requirements = formData.storeType;
    }
    
    // Simulate API call with a delay
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    // Return success response
    return {
      success: true,
      data: {
        id: `inq-${Math.random().toString(36).substring(2, 15)}`,
        timestamp: new Date().toISOString(),
        ...formData
      }
    };
  } catch (error) {
    console.error('Error submitting inquiry form:', error);
    return {
      success: false,
      error: error instanceof Error ? error.message : 'An unexpected error occurred'
    };
  }
};

// Log form submission for analytics/debugging (removes sensitive data)
export const logFormSubmission = (formType: string, data: any) => {
  // Remove sensitive information before logging
  const { email, phone, ...safeData } = data;
  console.log(`Form submission (${formType}):`, safeData);
};
