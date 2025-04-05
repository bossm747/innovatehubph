
import React from 'react';

const GoogleCalendarBooking = () => {
  return (
    <div className="w-full rounded-lg overflow-hidden shadow-lg border border-gray-200">
      <div className="p-4 bg-white border-b border-gray-200">
        <h3 className="font-semibold text-lg text-innovate-600">Schedule an Appointment</h3>
        <p className="text-sm text-gray-600">Choose a convenient time from our calendar</p>
      </div>
      <div className="relative w-full h-[600px]">
        <iframe 
          src="https://calendar.google.com/calendar/appointments/schedules/AcZssZ3MZ6eK-jzyXXZV0hOb7x-0izGbymIXt9T6VadOX3r0El_rQ22F8g0M3TN_rW1cld0G3PpyUNSn?gv=true" 
          style={{ border: 0 }} 
          width="100%" 
          height="600" 
          frameBorder="0"
          title="Google Calendar Appointment Scheduling"
          className="absolute inset-0"
        ></iframe>
      </div>
    </div>
  );
};

export default GoogleCalendarBooking;
