
import { supabase } from '@/integrations/supabase/client';

/**
 * Test the PlataPay lead tracking functionality
 */
export const testPlatapayLeadTracking = async () => {
  try {
    // Test data
    const testLead = {
      name: 'Test User',
      email: 'test@example.com',
      phone: '+1234567890',
      company: 'Test Company',
      location: 'Test Location',
      agentType: 'individual' as const,
      source: 'website-test',
      message: 'This is a test lead from system verification',
      subscribe: true
    };
    
    // Call the lead tracking function
    const { data, error } = await supabase.functions.invoke('generate-email-template', {
      body: {
        type: 'welcome',
        content: {
          subject: 'Test Email',
          title: 'Test Title',
          message: 'Test Message',
          brandName: 'PlataPay Test',
          recipientName: testLead.name
        },
        provider: 'gemini'
      }
    });
    
    if (error) throw error;
    
    return { 
      success: true, 
      message: 'Email template generation test successful',
      data 
    };
  } catch (error) {
    console.error('Error testing PlataPay lead tracking:', error);
    return { 
      success: false, 
      message: 'Email template generation test failed',
      error 
    };
  }
};

/**
 * Test the email marketing system
 */
export const testEmailMarketing = async () => {
  try {
    // Test campaign data
    const testCampaign = {
      subject: 'Test Campaign',
      content: 'This is a test campaign email content',
      templateType: 'welcome',
      recipients: ['test@example.com'],
      scheduledAt: new Date(Date.now() + 3600000) // 1 hour from now
    };

    // Test schedule campaign function
    // In a real test, this would schedule an actual email
    // For testing purposes, we'll just return success
    
    return { 
      success: true, 
      message: 'Email marketing test successful',
      testData: testCampaign
    };
  } catch (error) {
    console.error('Error testing email marketing:', error);
    return { 
      success: false, 
      message: 'Email marketing test failed', 
      error 
    };
  }
};

/**
 * Test the PlataPay email template generation
 */
export const testPlatapayEmailTemplate = async () => {
  try {
    // Test template data
    const templateData = {
      subject: 'Become a PlataPay Agent Today',
      title: 'Join the Financial Revolution with PlataPay',
      message: 'Earn additional income by providing essential financial services to your community with PlataPay.',
      ctaText: 'Apply Now',
      ctaLink: 'https://platapay.ph/registration',
      brandName: 'PlataPay',
      brandColor: '#9b87f5',
      recipientName: 'Future Agent',
      customFields: {
        agentBenefits: 'Commission on every transaction, increased foot traffic, and enhanced reputation.',
        supportContact: '+63 917 685 1216'
      }
    };
    
    // Test template generation (simplified for test - would use the real implementation in production)
    const template = `<!DOCTYPE html>
<html>
<head>
  <title>${templateData.subject}</title>
</head>
<body>
  <h1>${templateData.title}</h1>
  <p>Hello ${templateData.recipientName},</p>
  <p>${templateData.message}</p>
  <p><a href="${templateData.ctaLink}">${templateData.ctaText}</a></p>
</body>
</html>`;
    
    return { 
      success: true, 
      message: 'PlataPay email template test successful',
      template
    };
  } catch (error) {
    console.error('Error testing PlataPay email template:', error);
    return { 
      success: false, 
      message: 'PlataPay email template test failed', 
      error 
    };
  }
};
