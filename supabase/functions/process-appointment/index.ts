
import { serve } from 'https://deno.land/std@0.168.0/http/server.ts'
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.38.4'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

interface AppointmentData {
  id: string
  name: string
  email: string
  phone?: string
  company?: string
  scheduled_at: string
  duration: string
  meeting_type: 'call' | 'video'
  topic: string
  notes?: string
}

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders })
  }

  try {
    const supabaseClient = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? ''
    )

    // Parse request body
    const body = await req.json()
    const appointmentId = body.appointmentId

    // Get the appointment details
    const { data: appointment, error: fetchError } = await supabaseClient
      .from('appointments')
      .select('*')
      .eq('id', appointmentId)
      .single()

    if (fetchError) {
      throw new Error(`Error fetching appointment: ${fetchError.message}`)
    }

    const appointmentData = appointment as AppointmentData

    // Send confirmation email to customer
    await sendCustomerEmail(appointmentData)
    
    // Send notification email to staff
    await sendStaffNotificationEmail(appointmentData)
    
    // Update appointment status
    const { error: updateError } = await supabaseClient
      .from('appointments')
      .update({ status: 'confirmed', processed_at: new Date().toISOString() })
      .eq('id', appointmentId)

    if (updateError) {
      console.error('Error updating appointment status:', updateError)
    }

    return new Response(
      JSON.stringify({ success: true, message: 'Appointment processed successfully' }),
      {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 200,
      }
    )
  } catch (error) {
    console.error('Error processing appointment:', error.message)
    
    return new Response(
      JSON.stringify({ success: false, error: error.message }),
      {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 400,
      }
    )
  }
})

async function sendCustomerEmail(appointment: AppointmentData) {
  // Format date and time for display
  const dateObj = new Date(appointment.scheduled_at)
  const formattedDate = dateObj.toLocaleDateString('en-US', { 
    weekday: 'long', 
    year: 'numeric', 
    month: 'long', 
    day: 'numeric' 
  })
  const formattedTime = dateObj.toLocaleTimeString('en-US', { 
    hour: '2-digit', 
    minute: '2-digit',
    hour12: true 
  })
  
  // Build email content
  const subject = `Your ${appointment.meeting_type === 'video' ? 'Video Conference' : 'Call'} with InnovateHub is Confirmed`
  const html = `
    <html>
      <head>
        <style>
          body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
          .container { max-width: 600px; margin: 0 auto; padding: 20px; }
          .header { background-color: #0f5ca5; padding: 20px; text-align: center; color: white; }
          .content { padding: 20px; background-color: #f9f9f9; }
          .details { margin: 20px 0; }
          .details-item { padding: 5px 0; border-bottom: 1px solid #eee; }
          .footer { text-align: center; margin-top: 20px; font-size: 12px; color: #666; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1>Your Appointment is Confirmed</h1>
          </div>
          <div class="content">
            <p>Hello ${appointment.name},</p>
            <p>Thank you for scheduling a ${appointment.duration} ${appointment.meeting_type} with InnovateHub. We're looking forward to discussing "${appointment.topic}" with you.</p>
            
            <div class="details">
              <h2>Appointment Details:</h2>
              <div class="details-item"><strong>Date:</strong> ${formattedDate}</div>
              <div class="details-item"><strong>Time:</strong> ${formattedTime} (Philippine Time/GMT+8)</div>
              <div class="details-item"><strong>Duration:</strong> ${appointment.duration === '30min' ? '30 minutes' : '1 hour'}</div>
              <div class="details-item"><strong>Meeting Type:</strong> ${appointment.meeting_type === 'video' ? 'Video Conference' : 'Phone Call'}</div>
              <div class="details-item"><strong>Topic:</strong> ${appointment.topic}</div>
            </div>
            
            <p>
              <strong>${appointment.meeting_type === 'video' ? 'Meeting link' : 'Call details'} will be sent to you in a separate email before the scheduled time.</strong>
            </p>
            
            <p>If you need to reschedule or cancel this appointment, please contact us at <a href="mailto:businessdevelopment@innovatehub.ph">businessdevelopment@innovatehub.ph</a> or reply to this email.</p>
            
            <p>We look forward to speaking with you!</p>
            
            <p>Best regards,<br>The InnovateHub Team</p>
          </div>
          <div class="footer">
            <p>InnovateHub Inc. | RMCL Bldg., New Bypass Rd., Bayanan, San Pascual, Batangas | +63 917 685 1216</p>
          </div>
        </div>
      </body>
    </html>
  `

  try {
    // Use Resend to send the email
    const response = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${Deno.env.get('RESEND_API_KEY')}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        from: 'InnovateHub <appointments@innovatehub.ph>',
        to: [appointment.email],
        subject: subject,
        html: html,
        reply_to: 'businessdevelopment@innovatehub.ph'
      })
    })

    if (!response.ok) {
      const errorData = await response.json()
      throw new Error(`Failed to send customer email: ${JSON.stringify(errorData)}`)
    }

    return true
  } catch (error) {
    console.error('Error sending customer email:', error)
    throw error
  }
}

async function sendStaffNotificationEmail(appointment: AppointmentData) {
  // Format date and time for display
  const dateObj = new Date(appointment.scheduled_at)
  const formattedDate = dateObj.toLocaleDateString('en-US', { 
    weekday: 'long', 
    year: 'numeric', 
    month: 'long', 
    day: 'numeric' 
  })
  const formattedTime = dateObj.toLocaleTimeString('en-US', { 
    hour: '2-digit', 
    minute: '2-digit',
    hour12: true 
  })
  
  // Build email content for staff
  const subject = `New Appointment: ${appointment.topic} (${formattedDate})`
  const html = `
    <html>
      <head>
        <style>
          body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
          .container { max-width: 600px; margin: 0 auto; padding: 20px; }
          .header { background-color: #0f5ca5; padding: 20px; text-align: center; color: white; }
          .content { padding: 20px; background-color: #f9f9f9; }
          .details { margin: 20px 0; }
          .details-item { padding: 5px 0; border-bottom: 1px solid #eee; }
          .notes { background-color: #f0f0f0; padding: 15px; border-left: 4px solid #0f5ca5; margin: 15px 0; }
          .footer { text-align: center; margin-top: 20px; font-size: 12px; color: #666; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1>New Appointment Scheduled</h1>
          </div>
          <div class="content">
            <p>A new appointment has been scheduled through the website.</p>
            
            <div class="details">
              <h2>Appointment Details:</h2>
              <div class="details-item"><strong>Client:</strong> ${appointment.name}</div>
              <div class="details-item"><strong>Email:</strong> ${appointment.email}</div>
              ${appointment.phone ? `<div class="details-item"><strong>Phone:</strong> ${appointment.phone}</div>` : ''}
              ${appointment.company ? `<div class="details-item"><strong>Company:</strong> ${appointment.company}</div>` : ''}
              <div class="details-item"><strong>Date:</strong> ${formattedDate}</div>
              <div class="details-item"><strong>Time:</strong> ${formattedTime} (Philippine Time/GMT+8)</div>
              <div class="details-item"><strong>Duration:</strong> ${appointment.duration === '30min' ? '30 minutes' : '1 hour'}</div>
              <div class="details-item"><strong>Meeting Type:</strong> ${appointment.meeting_type === 'video' ? 'Video Conference' : 'Phone Call'}</div>
              <div class="details-item"><strong>Topic:</strong> ${appointment.topic}</div>
            </div>
            
            ${appointment.notes ? `
            <div class="notes">
              <h3>Additional Notes:</h3>
              <p>${appointment.notes}</p>
            </div>
            ` : ''}
            
            <p>Please prepare for this meeting and send the client the necessary meeting details.</p>
            
            <p>You can view and manage all appointments in the admin dashboard.</p>
          </div>
          <div class="footer">
            <p>This is an automated notification from the InnovateHub website booking system.</p>
          </div>
        </div>
      </body>
    </html>
  `

  try {
    // Use Resend to send the email
    const response = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${Deno.env.get('RESEND_API_KEY')}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        from: 'InnovateHub Bookings <appointments@innovatehub.ph>',
        to: ['businessdevelopment@innovatehub.ph'],
        subject: subject,
        html: html,
        reply_to: appointment.email
      })
    })

    if (!response.ok) {
      const errorData = await response.json()
      throw new Error(`Failed to send staff notification email: ${JSON.stringify(errorData)}`)
    }

    return true
  } catch (error) {
    console.error('Error sending staff notification email:', error)
    throw error
  }
}
