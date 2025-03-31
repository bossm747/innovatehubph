
import { serve } from "https://deno.land/std@0.177.0/http/server.ts";
import { SmtpClient } from "https://deno.land/x/smtp@v0.7.0/mod.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.7.1";

const supabaseUrl = Deno.env.get("SUPABASE_URL") || "";
const supabaseServiceKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") || "";
const supabase = createClient(supabaseUrl, supabaseServiceKey);

// CORS headers for browser requests
const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

interface WebhookPayload {
  type: string;
  table: string;
  record: any;
  schema: string;
  old_record: any | null;
}

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, {
      status: 204,
      headers: corsHeaders,
    });
  }
  
  try {
    // Parse the webhook payload
    const payload: WebhookPayload = await req.json();
    console.log("Received webhook payload:", payload);
    
    // Check if this is a new inquiry
    if (payload.type === "INSERT" && payload.table === "inquiries" && payload.schema === "public") {
      const inquiryData = payload.record;
      
      // Skip if already processed
      if (inquiryData.processed) {
        return new Response(JSON.stringify({ success: true, message: "Inquiry already processed" }), {
          headers: { "Content-Type": "application/json", ...corsHeaders },
        });
      }
      
      console.log("Processing new inquiry:", inquiryData.id);
      
      // 1. Generate personalized email content using AI
      const personalized_content = await generatePersonalizedContent(inquiryData);
      
      // 2. Create HTML email using the template generator
      const html_email = await generateEmailHtml(inquiryData, personalized_content);
      
      // 3. Send the email
      const sendResult = await sendPersonalizedEmail(inquiryData, html_email);
      
      // 4. Update the inquiry as processed
      if (sendResult.success) {
        await supabase
          .from("inquiries")
          .update({ processed: true, status: "responded" })
          .eq("id", inquiryData.id);
          
        // 5. Log the email in email_logs
        await supabase
          .from("email_logs")
          .insert({
            email_type: "auto_response",
            recipient: inquiryData.email,
            subject: `Thank you for your ${inquiryData.service} inquiry - InnovateHub`,
            successful: true,
            inquiry_id: inquiryData.id,
            metadata: { 
              personalized: true,
              template: "auto_response",
              service: inquiryData.service
            }
          });
      }
      
      return new Response(
        JSON.stringify({ 
          success: true, 
          message: "Auto-response email sent successfully",
          emailSent: sendResult.success
        }),
        {
          headers: { "Content-Type": "application/json", ...corsHeaders },
        }
      );
    }
    
    // Not an inquiry insertion, just return success
    return new Response(
      JSON.stringify({ success: true, message: "Event received but not processed" }),
      {
        headers: { "Content-Type": "application/json", ...corsHeaders },
      }
    );
    
  } catch (error) {
    console.error("Error processing webhook:", error);
    
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

// Generate personalized content based on inquiry data
async function generatePersonalizedContent(inquiryData: any): Promise<string> {
  try {
    console.log("Generating personalized content for inquiry:", inquiryData.id);
    
    // Use multi-agent-generate function to create personalized content
    const { data, error } = await supabase.functions.invoke("multi-agent-generate", {
      body: {
        content: JSON.stringify(inquiryData),
        agentType: "email-generator",
        parameters: {
          template: inquiryData.service === "platapay" ? "service" : "welcome",
          purpose: "confirmation",
          tone: "professional",
          key_points: [
            `Inquiry about ${inquiryData.service}`,
            `Customer name: ${inquiryData.name}`,
            `Company: ${inquiryData.company || "N/A"}`,
            inquiryData.message ? `Message: ${inquiryData.message}` : null,
            `Service-specific details available in inquiry data`,
            "Thank them for reaching out",
            "Briefly explain next steps",
            "Invite them to schedule a call"
          ].filter(Boolean),
          subject: `Thank you for your ${inquiryData.service} inquiry - InnovateHub`,
          inquiry_data: inquiryData
        }
      },
    });

    if (error) throw error;
    
    console.log("Content generated successfully");
    return data.text;
  } catch (error) {
    console.error("Error generating personalized content:", error);
    
    // Fallback content if AI generation fails
    return `Dear ${inquiryData.name},\n\nThank you for your inquiry about our ${inquiryData.service} services. We've received your message and will get back to you shortly.\n\nThe InnovateHub Team`;
  }
}

// Generate HTML email using template generator
async function generateEmailHtml(inquiryData: any, content: string): Promise<string> {
  try {
    console.log("Generating HTML email template");
    
    // Define template type based on service
    const templateType = inquiryData.service === "platapay" ? "service" : "welcome";
    
    // Use generate-email-template function to create HTML email
    const { data, error } = await supabase.functions.invoke("generate-email-template", {
      body: {
        type: templateType,
        content: {
          subject: `Thank you for your ${inquiryData.service} inquiry - InnovateHub`,
          title: `Thank You for Your Interest in Our ${inquiryData.service} Services`,
          message: content,
          ctaText: "Schedule a Call",
          ctaLink: "https://innovatehub.ph/contact",
          brandName: "InnovateHub",
          brandColor: "#9b87f5",
          recipientName: inquiryData.name,
          additionalInfo: "We typically respond to inquiries within 24 hours.",
          customFields: {
            service: inquiryData.service,
            inquiryDate: new Date().toLocaleDateString()
          }
        },
        provider: "gemini"
      },
    });

    if (error) throw error;
    
    console.log("HTML template generated successfully");
    return data.template;
  } catch (error) {
    console.error("Error generating HTML email:", error);
    
    // Fallback basic HTML template
    return `<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Thank You for Your Inquiry</title>
</head>
<body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333; margin: 0; padding: 0; background-color: #f9f9f9;">
  <table width="100%" cellpadding="0" cellspacing="0" style="max-width: 600px; margin: 0 auto; background-color: #ffffff; border-radius: 8px; overflow: hidden; box-shadow: 0 2px 10px rgba(0,0,0,0.05);">
    <tr>
      <td style="padding: 20px; text-align: center; background-color: #9b87f5; color: white;">
        <h1>InnovateHub</h1>
      </td>
    </tr>
    <tr>
      <td style="padding: 20px;">
        <p>Hello ${inquiryData.name},</p>
        <p>${content}</p>
        <p style="text-align: center; margin: 30px 0;">
          <a href="https://innovatehub.ph/contact" style="display: inline-block; padding: 12px 24px; background-color: #9b87f5; color: white; text-decoration: none; border-radius: 4px; font-weight: bold;">Schedule a Call</a>
        </p>
      </td>
    </tr>
    <tr>
      <td style="padding: 20px; text-align: center; color: #666; font-size: 14px; border-top: 1px solid #f0f0f0;">
        <p>InnovateHub | RMCL Bldg., New Bypass Rd., Bayanan, San Pascual, Batangas</p>
        <p>If you no longer wish to receive these emails, you can <a href="#" style="color: #9b87f5;">unsubscribe</a>.</p>
      </td>
    </tr>
  </table>
</body>
</html>`;
  }
}

// Send personalized email using SMTP
async function sendPersonalizedEmail(inquiryData: any, htmlContent: string): Promise<{ success: boolean; message: string }> {
  try {
    console.log("Sending personalized email to:", inquiryData.email);
    
    const client = new SmtpClient();
    
    // Connect to SMTP server using environment variables
    await client.connectTLS({
      hostname: "smtp.hostinger.com", 
      port: 465,
      username: Deno.env.get("SMTP_USERNAME") || "",
      password: Deno.env.get("SMTP_PASSWORD") || "",
    });

    // Send the email
    await client.send({
      from: Deno.env.get("SMTP_USERNAME") || "info@innovatehub.ph",
      to: inquiryData.email,
      subject: `Thank you for your ${inquiryData.service} inquiry - InnovateHub`,
      html: htmlContent,
    });

    await client.close();
    
    console.log("Email sent successfully");
    return { 
      success: true, 
      message: `Email sent successfully to ${inquiryData.email}` 
    };
  } catch (error) {
    console.error("Error sending email:", error);
    return { 
      success: false, 
      message: `Failed to send email: ${error.message}` 
    };
  }
}
