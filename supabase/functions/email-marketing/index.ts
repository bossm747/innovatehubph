
import { serve } from "https://deno.land/std@0.177.0/http/server.ts";
import { SmtpClient } from "https://deno.land/x/smtp@v0.7.0/mod.ts";

// CORS headers for browser requests
const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

interface EmailRequest {
  subject: string;
  recipients: string[];
  templateType: 'newsletter' | 'promotion' | 'welcome' | 'service';
  templateContent: any;
  scheduledAt?: string | null;
}

// Get HTML template based on template type and content
const getHtmlTemplate = (templateType: string, content: any): string => {
  // Common header and footer for all email templates
  const commonHeader = `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>${content.title || 'InnovateHub'}</title>
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
        .btn {
          display: inline-block;
          background-color: #9b87f5;
          color: white;
          text-decoration: none;
          padding: 10px 20px;
          border-radius: 4px;
          margin-top: 15px;
        }
        .feature-box {
          background-color: #f8f9fa;
          border-left: 4px solid #9b87f5;
          padding: 15px;
          margin: 15px 0;
        }
        .social-links {
          margin-top: 20px;
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
          <h1>InnovateHub <span class="highlight">Updates</span></h1>
        </div>
        <div class="content">
  `;

  const commonFooter = `
        </div>
        <div class="footer">
          <p>InnovateHub Inc. | RMCL Bldg., New Bypass Rd., Bayanan, San Pascual, Batangas</p>
          <div class="social-links">
            <a href="https://www.facebook.com/InnovateHubPH">Facebook</a> | 
            <a href="https://www.linkedin.com/company/innovatehub-ph">LinkedIn</a>
          </div>
          <p>If you no longer wish to receive these emails, you can <a href="#">unsubscribe</a>.</p>
        </div>
      </div>
    </body>
    </html>
  `;

  // Generate template content based on type
  let templateContent = '';
  switch (templateType) {
    case 'newsletter':
      templateContent = `
        <h2>${content.title}</h2>
        <p>${content.intro}</p>
        <div class="feature-box">
          ${content.message}
        </div>
        <p>
          <a href="${content.ctaLink}" class="btn">${content.ctaText}</a>
        </p>
      `;
      break;
    case 'promotion':
      templateContent = `
        <h2>${content.title}</h2>
        <p>${content.intro}</p>
        <div class="feature-box">
          <h3>${content.offerTitle}</h3>
          <p>${content.offerDescription}</p>
        </div>
        <p>${content.message}</p>
        <p>
          <a href="${content.ctaLink}" class="btn">${content.ctaText}</a>
        </p>
      `;
      break;
    case 'welcome':
      templateContent = `
        <h2>${content.title}</h2>
        <p>${content.intro}</p>
        <p>Thank you for your interest in our ${content.service}.</p>
        <p>${content.customMessage}</p>
        <div class="feature-box">
          ${content.message}
        </div>
        <p>
          <a href="${content.ctaLink}" class="btn">${content.ctaText}</a>
        </p>
        <p>Want to discuss your project directly? <a href="${content.calendlyLink}">Schedule a meeting</a> with our team.</p>
      `;
      break;
    case 'service':
      templateContent = `
        <h2>${content.title}</h2>
        <p>${content.intro}</p>
        <div class="feature-box">
          <h3>${content.serviceName}</h3>
          <p>${content.serviceDescription}</p>
        </div>
        <p>${content.message}</p>
        <p>
          <a href="${content.ctaLink}" class="btn">${content.ctaText}</a>
        </p>
        <p>Want to learn more about our services? <a href="${content.learnMoreLink}">Visit our case studies</a>.</p>
      `;
      break;
    default:
      templateContent = `
        <h2>InnovateHub Update</h2>
        <p>Thank you for subscribing to our updates.</p>
        <p>We'll keep you informed about our latest offerings and news.</p>
      `;
  }

  return commonHeader + templateContent + commonFooter;
};

// Send email using SMTP
const sendEmail = async (
  recipients: string[],
  subject: string,
  htmlContent: string
): Promise<{ success: boolean; message: string }> => {
  try {
    const client = new SmtpClient();

    // Connect to SMTP server using environment variables
    await client.connectTLS({
      hostname: Deno.env.get("SMTP_HOST") || "smtp.hostinger.com",
      port: parseInt(Deno.env.get("SMTP_PORT") || "465"),
      username: Deno.env.get("SMTP_USERNAME") || "marketing@innovatehub.ph",
      password: Deno.env.get("SMTP_PASSWORD") || "",
    });

    // Send email to each recipient (could be optimized with BCC for privacy)
    for (const recipient of recipients) {
      await client.send({
        from: Deno.env.get("SMTP_USERNAME") || "marketing@innovatehub.ph",
        to: recipient,
        subject: subject,
        html: htmlContent,
      });
    }

    await client.close();
    
    return { 
      success: true, 
      message: `Email sent successfully to ${recipients.length} recipients` 
    };
  } catch (error) {
    console.error("Error sending email:", error);
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
    const emailRequest: EmailRequest = await req.json();
    
    // Validate required fields
    if (!emailRequest.subject || !emailRequest.recipients || !emailRequest.templateType || !emailRequest.templateContent) {
      return new Response(JSON.stringify({ error: 'Missing required fields' }), {
        status: 400,
        headers: {
          'Content-Type': 'application/json',
          ...corsHeaders,
        },
      });
    }

    // If email is scheduled for later, store it in database
    if (emailRequest.scheduledAt) {
      // TODO: Store scheduled email in database and set up a cron job
      // For now, just return success with a message
      return new Response(JSON.stringify({ 
        success: true, 
        message: `Email scheduled for ${emailRequest.scheduledAt}`, 
        scheduledAt: emailRequest.scheduledAt,
        recipients: emailRequest.recipients.length
      }), {
        status: 200,
        headers: {
          'Content-Type': 'application/json',
          ...corsHeaders,
        },
      });
    }

    // Generate HTML content from template
    const htmlContent = getHtmlTemplate(emailRequest.templateType, emailRequest.templateContent);

    // Send the email
    const result = await sendEmail(
      emailRequest.recipients,
      emailRequest.subject,
      htmlContent
    );

    if (!result.success) {
      return new Response(JSON.stringify({ error: result.message }), {
        status: 500,
        headers: {
          'Content-Type': 'application/json',
          ...corsHeaders,
        },
      });
    }

    // Return success response
    return new Response(JSON.stringify({ 
      success: true, 
      message: result.message, 
      recipients: emailRequest.recipients.length
    }), {
      status: 200,
      headers: {
        'Content-Type': 'application/json',
        ...corsHeaders,
      },
    });
  } catch (error) {
    console.error("Error processing email request:", error);
    return new Response(JSON.stringify({ 
      error: 'Failed to process email request',
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
