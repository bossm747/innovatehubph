
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';

export interface BookingData {
  name: string;
  email: string;
  phone?: string;
  company?: string;
  date: Date;
  time: string;
  duration: string;
  type: 'call' | 'video';
  topic: string;
  notes?: string;
}

export const submitBooking = async (bookingData: BookingData) => {
  try {
    console.log('Submitting booking:', bookingData);
    
    // Format the date and time for storage
    const dateTimeString = `${bookingData.date.toISOString().split('T')[0]}T${bookingData.time}:00`;
    const dateTime = new Date(dateTimeString);
    
    // Store in Supabase
    const { data, error } = await supabase
      .from('appointments')
      .insert({
        name: bookingData.name,
        email: bookingData.email,
        phone: bookingData.phone,
        company: bookingData.company,
        scheduled_at: dateTime.toISOString(),
        duration: bookingData.duration,
        meeting_type: bookingData.type,
        topic: bookingData.topic,
        notes: bookingData.notes,
        status: 'pending'
      })
      .select('id')
      .single();

    if (error) {
      console.error('Error submitting booking:', error);
      throw new Error(error.message || 'Failed to submit booking request');
    }
    
    // Trigger the process-appointment Edge Function
    const { error: processingError } = await supabase.functions.invoke('process-appointment', {
      body: { appointmentId: data.id },
    });

    if (processingError) {
      console.error('Error processing appointment:', processingError);
      // The booking was saved, so we don't throw an error here
      // Just log it for investigation
    }
    
    return { 
      success: true, 
      data,
      message: 'Booking request submitted successfully'
    };
  } catch (error) {
    console.error('Error in submitBooking:', error);
    return { 
      success: false, 
      error: error instanceof Error ? error.message : 'An unknown error occurred' 
    };
  }
};

export const getAvailableTimeSlots = (date: Date, duration: string = '30min') => {
  // In a real app, this would query the database for available slots
  // Here's a simple implementation that returns time slots between 9 AM and 5 PM
  const businessHours = {
    start: 9, // 9 AM
    end: 17,  // 5 PM
  };
  
  const bookedSlots = [
    // Mock some booked slots
    '10:00', '14:30'
  ];
  
  const slots = [];
  const durationMinutes = duration === '30min' ? 30 : 60;
  
  // Generate time slots at 30-minute or 1-hour intervals
  for (let hour = businessHours.start; hour < businessHours.end; hour++) {
    for (let minute = 0; minute < 60; minute += durationMinutes) {
      const timeString = `${hour.toString().padStart(2, '0')}:${minute.toString().padStart(2, '0')}`;
      
      // Skip if the slot is booked
      if (!bookedSlots.includes(timeString)) {
        slots.push(timeString);
      }
    }
  }
  
  return slots;
};
