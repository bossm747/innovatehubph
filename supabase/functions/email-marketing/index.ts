
import { serve } from 'https://deno.land/std@0.177.0/http/server.ts';
import { SmtpClient } from "https://deno.land/x/smtp@v0.7.0/mod.ts";

// CORS headers for browser requests
const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

// Email template types
type TemplateType = 'welcome' | 'newsletter' | 'promotion' | 'follow_up' | 'service_announcement';

interface EmailRecipient {
  email: string;
  name?: string;
  company?: string;
  metadata?: Record<string, any>;
}

interface EmailCampaign {
  templateType: TemplateType;
  subject: string;
  recipients: EmailRecipient[];
  templateData?: Record<string, any>;
  senderName?: string;
  senderEmail?: string;
  replyTo?: string;
  trackingParams?: Record<string, string>;
  scheduledFor?: string; // ISO date string
}

// Get email template based on type and data
const getEmailTemplate = (templateType: TemplateType, data: Record<string, any> = {}): string => {
  // Base styles
  const styles = `
    body { 
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; 
      line-height: 1.6; 
      color: #333; 
      margin: 0; 
      padding: 0; 
      background-color: #f9f9f9; 
    }
    .container { 
      max-width: 600px; 
      margin: 0 auto; 
      padding: 20px; 
      background-color: #ffffff; 
      border-radius: 8px;
      box-shadow: 0 2px 10px rgba(0,0,0,0.05);
    }
    .header { 
      text-align: center; 
      padding: 20px 0; 
      border-bottom: 1px solid #f0f0f0; 
    }
    .content { 
      padding: 20px 0; 
    }
    .footer { 
      text-align: center; 
      padding: 20px 0; 
      color: #666; 
      font-size: 14px; 
      border-top: 1px solid #f0f0f0; 
    }
    .button {
      display: inline-block;
      background-color: #9b87f5;
      color: white;
      text-decoration: none;
      padding: 10px 20px;
      border-radius: 4px;
      margin-top: 15px;
      font-weight: 500;
    }
    .highlight {
      color: #9b87f5;
      font-weight: bold;
    }
    .logo {
      max-width: 150px;
      margin: 0 auto;
      display: block;
    }
    .info-card {
      background-color: #f8f9fa;
      border-left: 4px solid #9b87f5;
      padding: 15px;
      margin: 15px 0;
      border-radius: 4px;
    }
    .social-links {
      text-align: center;
      margin: 20px 0;
    }
    .social-link {
      display: inline-block;
      margin: 0 10px;
      color: #9b87f5;
      text-decoration: none;
    }
  `;

  // Common header and footer
  const header = `
    <div class="header">
      <img src="https://innovatehub.ph/logo.svg" alt="InnovateHub" class="logo" />
    </div>
  `;

  const footer = `
    <div class="footer">
      <div class="social-links">
        <a href="https://www.facebook.com/InnovateHubPH" class="social-link">Facebook</a> | 
        <a href="https://www.linkedin.com/company/innovatehub-ph" class="social-link">LinkedIn</a>
      </div>
      <p>InnovateHub Inc. | RMCL Bldg., New Bypass Rd., Bayanan, San Pascual, Batangas</p>
      <p>To unsubscribe, <a href="{{unsubscribe_link}}">click here</a></p>
    </div>
  `;

  // Template-specific content
  let content = '';
  
  switch(templateType) {
    case 'welcome':
      content = `
        <div class="content">
          <h1>Welcome to <span class="highlight">InnovateHub</span></h1>
          <p>Hello ${data.name || 'there'},</p>
          <p>Thank you for joining the InnovateHub community! We're excited to have you on board.</p>
          <p>At InnovateHub, we provide innovative solutions for:</p>
          <ul>
            <li>Digital Customizations</li>
            <li>Fintech Solutions through PlataPay</li>
            <li>E-Commerce Development</li>
            <li>AI Solutions</li>
            <li>Global Expansion</li>
          </ul>
          <p>We look forward to helping you achieve your digital transformation goals.</p>
          <p><a href="${data.ctaLink || 'https://innovatehub.ph/services'}" class="button">Explore Our Services</a></p>
        </div>
      `;
      break;
    
    case 'newsletter':
      content = `
        <div class="content">
          <h1>${data.title || 'InnovateHub Newsletter'}</h1>
          <p>Hello ${data.name || 'there'},</p>
          <p>${data.intro || 'Here are the latest updates from InnovateHub:'}</p>
          ${data.articles ? data.articles.map((article: any) => `
            <div class="info-card">
              <h3>${article.title}</h3>
              <p>${article.excerpt}</p>
              <a href="${article.link}" class="button">Read More</a>
            </div>
          `).join('') : ''}
          <p>Stay tuned for more updates and innovations!</p>
        </div>
      `;
      break;
    
    case 'promotion':
      content = `
        <div class="content">
          <h1>${data.title || 'Special Offer'}</h1>
          <p>Hello ${data.name || 'there'},</p>
          <p>${data.intro || 'We have an exciting offer just for you!'}</p>
          <div class="info-card">
            <h2>${data.offerTitle || 'Limited Time Offer'}</h2>
            <p>${data.offerDescription || 'Take advantage of our special promotion.'}</p>
            ${data.discountCode ? `<p>Use code: <strong>${data.discountCode}</strong></p>` : ''}
            <p>Valid until: ${data.validUntil || 'Limited time only'}</p>
          </div>
          <p><a href="${data.ctaLink || 'https://innovatehub.ph/contact'}" class="button">Claim Offer</a></p>
        </div>
      `;
      break;
    
    case 'follow_up':
      content = `
        <div class="content">
          <h1>Following Up on Your Interest</h1>
          <p>Hello ${data.name || 'there'},</p>
          <p>Thank you for your interest in ${data.service || 'our services'}. We wanted to follow up and see if you had any questions.</p>
          <p>${data.customMessage || 'Our team is ready to assist you with any inquiries you might have.'}</p>
          <div class="info-card">
            <h3>Quick Benefits</h3>
            <ul>
              ${data.benefits ? data.benefits.map((benefit: string) => `<li>${benefit}</li>`).join('') : `
                <li>Customized solutions tailored to your needs</li>
                <li>Expert team with years of experience</li>
                <li>Ongoing support and maintenance</li>
              `}
            </ul>
          </div>
          <p><a href="${data.calendlyLink || 'https://innovatehub.ph/contact'}" class="button">Schedule a Call</a></p>
        </div>
      `;
      break;
    
    case 'service_announcement':
      content = `
        <div class="content">
          <h1>${data.title || 'New Service Announcement'}</h1>
          <p>Hello ${data.name || 'there'},</p>
          <p>We're excited to announce ${data.serviceName || 'a new service'} at InnovateHub!</p>
          <div class="info-card">
            <h3>${data.serviceName || 'New Service'}</h3>
            <p>${data.serviceDescription || 'A new innovative solution to help your business grow.'}</p>
            ${data.features ? `
              <h4>Key Features:</h4>
              <ul>
                ${data.features.map((feature: string) => `<li>${feature}</li>`).join('')}
              </ul>
            ` : ''}
          </div>
          <p><a href="${data.learnMoreLink || 'https://innovatehub.ph/services'}" class="button">Learn More</a></p>
        </div>
      `;
      break;
    
    default:
      content = `
        <div class="content">
          <h1>${data.title || 'Message from InnovateHub'}</h1>
          <p>Hello ${data.name || 'there'},</p>
          <p>${data.message || 'Thank you for your interest in InnovateHub. We appreciate your engagement with us.'}</p>
          ${data.ctaLink ? `<p><a href="${data.ctaLink}" class="button">${data.ctaText || 'Learn More'}</a></p>` : ''}
        </div>
      `;
  }

  // Final combined HTML with tracking pixel if provided
  return `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>${data.title || 'InnovateHub'}</title>
      <style>${styles}</style>
    </head>
    <body>
      <div class="container">
        ${header}
        ${content}
        ${footer}
      </div>
      ${data.trackingPixel ? `<img src="${data.trackingPixel}" width="1" height="1" alt="" />` : ''}
    </body>
    </html>
  `;
};

// Process image URLs to make them absolute
const processContentImages = (html: string, baseUrl: string = 'https://innovatehub.ph'): string => {
  return html.replace(/src="\/([^"]*)"/g, (match, relativePath) => {
    return `src="${baseUrl}/${relativePath}"`;
  });
};

// Configure and send email
const sendEmail = async (
  recipientEmail: string,
  recipientName: string | undefined,
  subject: string,
  htmlContent: string,
  senderName: string = 'InnovateHub',
  senderEmail: string = 'marketing@innovatehub.ph',
  replyTo: string = 'businessdevelopment@innovatehub.ph'
): Promise<{ success: boolean, message: string }> => {
  try {
    const client = new SmtpClient();

    // Connect to Hostinger SMTP server
    await client.connectTLS({
      hostname: Deno.env.get("SMTP_HOST") || "smtp.hostinger.com",
      port: parseInt(Deno.env.get("SMTP_PORT") || "465"),
      username: Deno.env.get("SMTP_USERNAME") || "marketing@innovatehub.ph",
      password: Deno.env.get("SMTP_PASSWORD") || "",
    });

    // Format recipient with name if provided
    const toEmail = recipientName 
      ? `"${recipientName}" <${recipientEmail}>`
      : recipientEmail;

    // Send email
    const result = await client.send({
      from: `"${senderName}" <${senderEmail}>`,
      to: toEmail,
      subject: subject,
      html: processContentImages(htmlContent),
      replyTo: replyTo,
    });

    await client.close();
    
    return { 
      success: true, 
      message: "Email sent successfully" 
    };
  } catch (error) {
    console.error("Error sending email:", error);
    return { 
      success: false, 
      message: `Failed to send email: ${error.message}` 
    };
  }
};

// Send a batch of emails (campaign)
const sendCampaign = async (campaign: EmailCampaign): Promise<{ success: boolean, results: any[] }> => {
  const results = [];
  const { 
    templateType, 
    subject, 
    recipients,
    templateData = {}, 
    senderName = 'InnovateHub',
    senderEmail = 'marketing@innovatehub.ph',
    replyTo = 'businessdevelopment@innovatehub.ph',
    trackingParams = {}
  } = campaign;
  
  // Process each recipient
  for (const recipient of recipients) {
    // Merge template data with recipient-specific data
    const personalizedData = {
      ...templateData,
      name: recipient.name,
      email: recipient.email,
      company: recipient.company,
      ...recipient.metadata,
      // Add tracking parameters if needed
      trackingPixel: trackingParams.pixelUrl 
        ? `${trackingParams.pixelUrl}?recipient=${encodeURIComponent(recipient.email)}&campaign=${encodeURIComponent(templateType)}`
        : undefined,
      unsubscribe_link: `https://innovatehub.ph/unsubscribe?email=${encodeURIComponent(recipient.email)}&campaign=${encodeURIComponent(templateType)}`
    };
    
    // Generate personalized email content
    const emailContent = getEmailTemplate(templateType, personalizedData);
    
    // Send the email
    try {
      const result = await sendEmail(
        recipient.email,
        recipient.name,
        subject,
        emailContent,
        senderName,
        senderEmail,
        replyTo
      );
      
      results.push({
        email: recipient.email,
        success: result.success,
        message: result.message
      });
    } catch (error) {
      results.push({
        email: recipient.email,
        success: false,
        message: error.message
      });
    }
  }
  
  return {
    success: results.some(r => r.success),
    results
  };
};

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, {
      status: 204,
      headers: corsHeaders,
    });
  }
  
  // Only allow POST requests
  if (req.method !== 'POST') {
    return new Response(JSON.stringify({ error: 'Method not allowed' }), {
      status: 405,
      headers: {
        'Content-Type': 'application/json',
        ...corsHeaders,
      },
    });
  }

  try {
    // Parse the request body
    const campaignData: EmailCampaign = await req.json();
    
    // Validate required fields
    if (!campaignData.templateType || !campaignData.subject || !campaignData.recipients || campaignData.recipients.length === 0) {
      return new Response(JSON.stringify({ error: 'Missing required fields' }), {
        status: 400,
        headers: {
          'Content-Type': 'application/json',
          ...corsHeaders,
        },
      });
    }

    // Check if this is a scheduled campaign for the future
    const now = new Date();
    if (campaignData.scheduledFor) {
      const scheduledTime = new Date(campaignData.scheduledFor);
      
      if (scheduledTime > now) {
        // In a real production environment, you would store this in a database to be processed later
        console.log(`Campaign scheduled for ${scheduledTime}`);
        return new Response(JSON.stringify({ 
          success: true, 
          message: 'Campaign scheduled',
          scheduledFor: scheduledTime.toISOString()
        }), {
          status: 200,
          headers: {
            'Content-Type': 'application/json',
            ...corsHeaders,
          },
        });
      }
    }

    // Process the campaign immediately
    const result = await sendCampaign(campaignData);

    // Return response
    return new Response(JSON.stringify({ 
      success: result.success, 
      results: result.results,
      sent: result.results.filter(r => r.success).length,
      failed: result.results.filter(r => !r.success).length,
    }), {
      status: 200,
      headers: {
        'Content-Type': 'application/json',
        ...corsHeaders,
      },
    });
  } catch (error) {
    console.error("Error processing campaign:", error);
    return new Response(JSON.stringify({ 
      error: 'Failed to process campaign',
      details: error.message 
    }), {
      status: 500,
      headers: {
        'Content-Type': 'application/json',
        ...corsHeaders,
      },
    });
  }
});
