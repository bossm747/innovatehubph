import { serve } from "https://deno.land/std@0.177.0/http/server.ts";
import { SmtpClient } from "https://deno.land/x/smtp@v0.7.0/mod.ts";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

interface FormData {
  service: string;
  name: string;
  email: string;
  phone?: string;
  company?: string;
  message?: string;
  budget?: string;
  timeline?: string;
  requirements?: string;
  inquiryId?: string;
  [key: string]: any;
}

const getEmailTemplate = (data: FormData): string => {
  const commonHeader = `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>New Inquiry from ${data.name}</title>
      <style>
        body { 
          font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; 
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
        .header img { 
          max-width: 150px; 
          height: auto; 
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
        h1 { 
          color: #1a1f2c; 
          margin-top: 0; 
        }
        .highlight {
          color: #9b87f5;
          font-weight: bold;
        }
        .detail-card {
          background-color: #f8f9fa;
          border-left: 4px solid #9b87f5;
          padding: 15px;
          margin: 15px 0;
          border-radius: 4px;
        }
        .btn {
          display: inline-block;
          background-color: #9b87f5;
          color: white;
          text-decoration: none;
          padding: 10px 20px;
          border-radius: 4px;
          margin-top: 15px;
        }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="header">
          <h1>InnovateHub <span class="highlight">Inquiry</span></h1>
        </div>
        <div class="content">
  `;

  const commonFooter = `
        </div>
        <div class="footer">
          <p>InnovateHub Inc. | RMCL Bldg., New Bypass Rd., Bayanan, San Pascual, Batangas</p>
          <p>This is an automated message. Please do not reply directly to this email.</p>
        </div>
      </div>
    </body>
    </html>
  `;

  let serviceContent = '';
  
  switch(data.service) {
    case 'platapay':
      serviceContent = `
        <h2>New PlataPay Inquiry</h2>
        <p>You have received a new inquiry about PlataPay services from ${data.name}.</p>
        <div class="detail-card">
          <p><strong>Name:</strong> ${data.name}</p>
          <p><strong>Email:</strong> ${data.email}</p>
          <p><strong>Phone:</strong> ${data.phone || 'Not provided'}</p>
          <p><strong>Business Type:</strong> ${data.businessType || 'Not specified'}</p>
          <p><strong>Location:</strong> ${data.location || 'Not provided'}</p>
          <p><strong>Interested Services:</strong> ${Array.isArray(data.services) ? data.services.join(', ') : (data.services || 'Not specified')}</p>
          <p><strong>Message:</strong> ${data.message || 'No message provided'}</p>
        </div>
        <p>Please follow up with this potential agent/merchant as soon as possible.</p>
      `;
      break;
    
    case 'digital':
      serviceContent = `
        <h2>New Digital Customization Inquiry</h2>
        <p>You have received a new inquiry about custom software development from ${data.name}.</p>
        <div class="detail-card">
          <p><strong>Name:</strong> ${data.name}</p>
          <p><strong>Email:</strong> ${data.email}</p>
          <p><strong>Company:</strong> ${data.company || 'Not provided'}</p>
          <p><strong>Phone:</strong> ${data.phone || 'Not provided'}</p>
          <p><strong>Project Type:</strong> ${data.projectType || 'Not specified'}</p>
          <p><strong>Budget Range:</strong> ${data.budget || 'Not specified'}</p>
          <p><strong>Timeline:</strong> ${data.timeline || 'Not specified'}</p>
          <p><strong>Requirements:</strong> ${data.requirements || 'Not provided'}</p>
        </div>
      `;
      break;

    case 'ecommerce':
      serviceContent = `
        <h2>New E-Commerce Inquiry</h2>
        <p>You have received a new inquiry about e-commerce development from ${data.name}.</p>
        <div class="detail-card">
          <p><strong>Name:</strong> ${data.name}</p>
          <p><strong>Email:</strong> ${data.email}</p>
          <p><strong>Business Name:</strong> ${data.businessName || 'Not provided'}</p>
          <p><strong>Phone:</strong> ${data.phone || 'Not provided'}</p>
          <p><strong>Store Type:</strong> ${data.storeType || 'Not specified'}</p>
          <p><strong>Products:</strong> ${data.products || 'Not described'}</p>
          <p><strong>Features Requested:</strong> ${Array.isArray(data.features) ? data.features.join(', ') : (data.features || 'None specified')}</p>
          <p><strong>Budget Range:</strong> ${data.budget || 'Not specified'}</p>
          <p><strong>Additional Info:</strong> ${data.additionalInfo || 'None provided'}</p>
        </div>
      `;
      break;

    case 'ai':
      serviceContent = `
        <h2>New AI Solutions Inquiry</h2>
        <p>You have received a new inquiry about AI and automation solutions from ${data.name}.</p>
        <div class="detail-card">
          <p><strong>Name:</strong> ${data.name}</p>
          <p><strong>Email:</strong> ${data.email}</p>
          <p><strong>Company:</strong> ${data.company || 'Not provided'}</p>
          <p><strong>Phone:</strong> ${data.phone || 'Not provided'}</p>
          <p><strong>Industry:</strong> ${data.industry || 'Not specified'}</p>
          <p><strong>AI Solution Type:</strong> ${data.aiType || 'Not specified'}</p>
          <p><strong>Data Availability:</strong> ${data.dataAvailable || 'Not specified'}</p>
          <p><strong>Budget Range:</strong> ${data.budget || 'Not specified'}</p>
          <p><strong>Requirements:</strong> ${data.requirements || 'Not provided'}</p>
        </div>
      `;
      break;

    case 'global':
      serviceContent = `
        <h2>New Global Expansion Inquiry</h2>
        <p>You have received a new inquiry about international business expansion from ${data.name}.</p>
        <div class="detail-card">
          <p><strong>Name:</strong> ${data.name}</p>
          <p><strong>Email:</strong> ${data.email}</p>
          <p><strong>Company:</strong> ${data.company || 'Not provided'}</p>
          <p><strong>Position:</strong> ${data.position || 'Not provided'}</p>
          <p><strong>Phone:</strong> ${data.phone || 'Not provided'}</p>
          <p><strong>Industry:</strong> ${data.industry || 'Not specified'}</p>
          <p><strong>Company Size:</strong> ${data.companySize || 'Not specified'}</p>
          <p><strong>Current Markets:</strong> ${data.currentMarkets || 'Not specified'}</p>
          <p><strong>Target Markets:</strong> ${data.targetMarkets || 'Not specified'}</p>
          <p><strong>Timeline:</strong> ${data.timeline || 'Not specified'}</p>
          <p><strong>Expansion Goals:</strong> ${data.expansionGoals || 'Not provided'}</p>
        </div>
      `;
      break;

    case 'general':
    default:
      serviceContent = `
        <h2>New General Inquiry</h2>
        <p>You have received a new general inquiry from ${data.name}.</p>
        <div class="detail-card">
          <p><strong>Name:</strong> ${data.name}</p>
          <p><strong>Email:</strong> ${data.email}</p>
          <p><strong>Company:</strong> ${data.company || 'Not provided'}</p>
          <p><strong>Phone:</strong> ${data.phone || 'Not provided'}</p>
          <p><strong>Message:</strong> ${data.message || 'No message provided'}</p>
        </div>
      `;
      break;
  }

  return commonHeader + serviceContent + commonFooter;
};

const getConfirmationEmailTemplate = (data: FormData): string => {
  const serviceNames: Record<string, string> = {
    'platapay': 'PlataPay Services',
    'digital': 'Digital Customizations',
    'ecommerce': 'E-Commerce Development',
    'ai': 'AI Solutions',
    'global': 'Global Expansion',
    'general': 'General Inquiry'
  };

  const serviceName = serviceNames[data.service] || 'Inquiry';

  return `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>We've Received Your Inquiry</title>
      <style>
        body { 
          font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; 
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
        h1, h2 { 
          color: #1a1f2c; 
        }
        .highlight {
          color: #9b87f5;
          font-weight: bold;
        }
        .contact-info {
          background-color: #f8f9fa;
          padding: 15px;
          margin: 15px 0;
          border-radius: 4px;
          text-align: center;
        }
        .social-links {
          text-align: center;
          margin: 20px 0;
        }
        .social-links a {
          display: inline-block;
          margin: 0 10px;
          color: #9b87f5;
          text-decoration: none;
        }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="header">
          <h1>Thank You for Your <span class="highlight">Inquiry</span></h1>
        </div>
        <div class="content">
          <p>Dear ${data.name},</p>
          <p>Thank you for your interest in our <strong>${serviceName}</strong>. We have received your inquiry and appreciate you taking the time to reach out to us.</p>
          <p>Our team will review your request and get back to you within 24-48 business hours.</p>
          
          <h2>What Happens Next?</h2>
          <p>One of our specialists will contact you to discuss your requirements in more detail and provide you with the information you need.</p>
          
          <div class="contact-info">
            <p>If you have any urgent questions, please contact us at:</p>
            <p><strong>Phone:</strong> +63 917 685 1216</p>
            <p><strong>Email:</strong> businessdevelopment@innovatehub.ph</p>
          </div>
          
          <div class="social-links">
            <p>Connect with us:</p>
            <a href="https://www.facebook.com/InnovateHubPH">Facebook</a> | 
            <a href="https://www.linkedin.com/company/innovatehub-ph">LinkedIn</a>
          </div>
        </div>
        <div class="footer">
          <p>InnovateHub Inc. | RMCL Bldg., New Bypass Rd., Bayanan, San Pascual, Batangas</p>
          <p>This is an automated message. Please do not reply directly to this email.</p>
        </div>
      </div>
    </body>
    </html>
  `;
};

const sendEmail = async (data: FormData): Promise<{ success: boolean, message: string }> => {
  try {
    console.log('Attempting to send email notifications for inquiry');
    
    const client = new SmtpClient();

    // Connect to Hostinger SMTP server
    await client.connectTLS({
      hostname: Deno.env.get("SMTP_HOST") || "smtp.hostinger.com",
      port: parseInt(Deno.env.get("SMTP_PORT") || "465"),
      username: Deno.env.get("SMTP_USERNAME") || "inquiries@innovatehub.ph",
      password: Deno.env.get("SMTP_PASSWORD") || "",
    });

    console.log('Connected to SMTP server successfully');

    // Send notification email to business
    console.log('Sending notification email to business');
    const notificationEmail = await client.send({
      from: Deno.env.get("SMTP_USERNAME") || "inquiries@innovatehub.ph",
      to: "businessdevelopment@innovatehub.ph",
      subject: `New ${data.service.charAt(0).toUpperCase() + data.service.slice(1)} Inquiry from ${data.name}`,
      html: getEmailTemplate(data),
    });

    console.log('Business notification email sent');

    // Send confirmation email to customer
    console.log('Sending confirmation email to customer:', data.email);
    const confirmationEmail = await client.send({
      from: Deno.env.get("SMTP_USERNAME") || "inquiries@innovatehub.ph",
      to: data.email,
      subject: "Thank You for Your Inquiry - InnovateHub Inc.",
      html: getConfirmationEmailTemplate(data),
    });

    console.log('Customer confirmation email sent');

    await client.close();
    
    return { 
      success: true, 
      message: "Emails sent successfully" 
    };
  } catch (error) {
    console.error("Error sending email:", error);
    console.error("SMTP settings:", {
      host: Deno.env.get("SMTP_HOST") || "smtp.hostinger.com",
      port: Deno.env.get("SMTP_PORT") || "465",
      username: Deno.env.get("SMTP_USERNAME") || "inquiries@innovatehub.ph",
      passwordProvided: Boolean(Deno.env.get("SMTP_PASSWORD"))
    });
    return { 
      success: false, 
      message: `Failed to send email: ${error.message}` 
    };
  }
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
    const formData: FormData = await req.json();
    console.log('Received inquiry data for processing:', {
      service: formData.service,
      name: formData.name,
      email: formData.email ? `${formData.email.substring(0, 3)}...` : undefined,
      inquiryId: formData.inquiryId
    });
    
    // Validate required fields
    if (!formData.service || !formData.name || !formData.email) {
      return new Response(JSON.stringify({ error: 'Missing required fields' }), {
        status: 400,
        headers: {
          'Content-Type': 'application/json',
          ...corsHeaders,
        },
      });
    }

    // Process the form and send emails
    console.log('Starting email sending process');
    const result = await sendEmail(formData);

    if (!result.success) {
      console.error('Failed to send emails:', result.message);
      return new Response(JSON.stringify({ error: result.message }), {
        status: 500,
        headers: {
          'Content-Type': 'application/json',
          ...corsHeaders,
        },
      });
    }

    // Return success response
    console.log('Email process completed successfully');
    return new Response(JSON.stringify({ 
      success: true, 
      message: 'Emails sent successfully', 
      inquiryId: formData.inquiryId
    }), {
      status: 200,
      headers: {
        'Content-Type': 'application/json',
        ...corsHeaders,
      },
    });
  } catch (error) {
    console.error("Error processing form submission:", error);
    return new Response(JSON.stringify({ 
      error: 'Failed to process form submission',
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
