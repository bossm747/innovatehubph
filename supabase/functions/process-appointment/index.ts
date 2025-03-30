
import { serve } from "https://deno.land/std@0.177.0/http/server.ts";
import { SmtpClient } from "https://deno.land/x/smtp@v0.7.0/mod.ts";
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.7.1';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

// Create a Supabase client
const supabaseUrl = Deno.env.get('SUPABASE_URL') || '';
const supabaseKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') || '';
const supabase = createClient(supabaseUrl, supabaseKey);

// Function to generate the confirmation email template
const getConfirmationEmailTemplate = (appointment: any): string => {
  const formatDate = (dateString: string): string => {
    const date = new Date(dateString);
    const options: Intl.DateTimeFormatOptions = { 
      weekday: 'long', 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric', 
      hour: 'numeric', 
      minute: 'numeric',
      hour12: true
    };
    return date.toLocaleDateString('en-US', options);
  };

  return `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Appointment Confirmation</title>
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
        .appointment-details {
          background-color: #f8f9fa;
          padding: 15px;
          margin: 15px 0;
          border-radius: 4px;
        }
        .button {
          display: inline-block;
          background-color: #9b87f5;
          color: white !important;
          text-decoration: none;
          padding: 10px 20px;
          border-radius: 4px;
          margin-top: 15px;
        }
        .contact-info {
          margin-top: 20px;
          text-align: center;
        }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="header">
          <h1>Your <span class="highlight">Appointment</span> is Confirmed</h1>
        </div>
        <div class="content">
          <p>Dear ${appointment.name},</p>
          <p>Thank you for scheduling a meeting with InnovateHub. We're looking forward to discussing your project.</p>
          
          <div class="appointment-details">
            <h2>Appointment Details:</h2>
            <p><strong>Date & Time:</strong> ${formatDate(appointment.scheduled_at)}</p>
            <p><strong>Duration:</strong> ${appointment.duration} minutes</p>
            <p><strong>Meeting Type:</strong> ${appointment.meeting_type === 'call' ? 'Phone Call' : 'Video Conference'}</p>
            <p><strong>Topic:</strong> ${appointment.topic}</p>
            ${appointment.notes ? `<p><strong>Additional Notes:</strong> ${appointment.notes}</p>` : ''}
          </div>
          
          <p>If you need to reschedule or cancel this appointment, please contact us as soon as possible.</p>
          
          <div style="text-align: center; margin-top: 20px;">
            <a href="https://innovatehub.ph/contact" class="button">Contact Us</a>
          </div>
          
          <div class="contact-info">
            <p>If you have any questions, please reach out to us:</p>
            <p>Email: businessdevelopment@innovatehub.ph</p>
            <p>Phone: +63 917 685 1216</p>
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

// Function to generate the notification email template for staff
const getNotificationEmailTemplate = (appointment: any): string => {
  const formatDate = (dateString: string): string => {
    const date = new Date(dateString);
    const options: Intl.DateTimeFormatOptions = { 
      weekday: 'long', 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric', 
      hour: 'numeric', 
      minute: 'numeric',
      hour12: true
    };
    return date.toLocaleDateString('en-US', options);
  };

  return `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>New Appointment Notification</title>
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
        .appointment-details {
          background-color: #f8f9fa;
          padding: 15px;
          margin: 15px 0;
          border-radius: 4px;
        }
        .customer-info {
          background-color: #f0f5ff;
          padding: 15px;
          margin: 15px 0;
          border-radius: 4px;
        }
        .button {
          display: inline-block;
          background-color: #9b87f5;
          color: white !important;
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
          <h1>New <span class="highlight">Appointment</span> Scheduled</h1>
        </div>
        <div class="content">
          <p>A new appointment has been scheduled with InnovateHub.</p>
          
          <div class="customer-info">
            <h2>Customer Information:</h2>
            <p><strong>Name:</strong> ${appointment.name}</p>
            <p><strong>Email:</strong> ${appointment.email}</p>
            <p><strong>Phone:</strong> ${appointment.phone || 'Not provided'}</p>
            <p><strong>Company:</strong> ${appointment.company || 'Not provided'}</p>
          </div>
          
          <div class="appointment-details">
            <h2>Appointment Details:</h2>
            <p><strong>Date & Time:</strong> ${formatDate(appointment.scheduled_at)}</p>
            <p><strong>Duration:</strong> ${appointment.duration} minutes</p>
            <p><strong>Meeting Type:</strong> ${appointment.meeting_type === 'call' ? 'Phone Call' : 'Video Conference'}</p>
            <p><strong>Topic:</strong> ${appointment.topic}</p>
            ${appointment.notes ? `<p><strong>Additional Notes:</strong> ${appointment.notes}</p>` : ''}
          </div>
          
          <div style="text-align: center; margin-top: 20px;">
            <a href="https://app.innovatehub.ph/admin/appointments" class="button">Manage Appointments</a>
          </div>
          
        </div>
        <div class="footer">
          <p>InnovateHub Inc. | RMCL Bldg., New Bypass Rd., Bayanan, San Pascual, Batangas</p>
          <p>This is an automated message from the InnovateHub appointment system.</p>
        </div>
      </div>
    </body>
    </html>
  `;
};

const sendEmails = async (appointment: any) => {
  try {
    const client = new SmtpClient();

    // Connect to SMTP server using environment variables
    await client.connectTLS({
      hostname: Deno.env.get("SMTP_HOST") || "smtp.hostinger.com",
      port: parseInt(Deno.env.get("SMTP_PORT") || "465"),
      username: Deno.env.get("SMTP_USERNAME") || "appointments@innovatehub.ph",
      password: Deno.env.get("SMTP_PASSWORD") || "",
    });

    // Send confirmation email to customer
    await client.send({
      from: Deno.env.get("SMTP_USERNAME") || "appointments@innovatehub.ph",
      to: appointment.email,
      subject: "Your InnovateHub Appointment Confirmation",
      html: getConfirmationEmailTemplate(appointment),
    });

    // Send notification email to staff
    await client.send({
      from: Deno.env.get("SMTP_USERNAME") || "appointments@innovatehub.ph",
      to: "businessdevelopment@innovatehub.ph",
      subject: `New Appointment: ${appointment.topic} with ${appointment.name}`,
      html: getNotificationEmailTemplate(appointment),
    });

    await client.close();
    
    return true;
  } catch (error) {
    console.error("Error sending emails:", error);
    return false;
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

  try {
    const { appointmentId } = await req.json();
    
    if (!appointmentId) {
      throw new Error('Appointment ID is required');
    }

    // Get appointment details from the database
    const { data: appointment, error } = await supabase
      .from('appointments')
      .select('*')
      .eq('id', appointmentId)
      .single();

    if (error) {
      throw error;
    }

    if (!appointment) {
      throw new Error('Appointment not found');
    }

    // Send confirmation and notification emails
    const emailsSent = await sendEmails(appointment);

    // Update the appointment as processed
    if (emailsSent) {
      await supabase
        .from('appointments')
        .update({ 
          status: 'confirmed',
          processed_at: new Date().toISOString(),
          notified_at: new Date().toISOString() 
        })
        .eq('id', appointmentId);
    }

    return new Response(JSON.stringify({ 
      success: true, 
      message: 'Appointment processed successfully',
      emailsSent
    }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error('Error processing appointment:', error);
    
    return new Response(JSON.stringify({ 
      success: false, 
      error: error.message 
    }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});
