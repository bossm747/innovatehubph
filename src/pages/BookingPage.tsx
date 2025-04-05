
import React from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Helmet } from 'react-helmet';
import { useScrollToTop } from '@/hooks/useScrollToTop';
import CircuitBackground from '@/components/CircuitBackground';
import GoogleCalendarBooking from '@/components/booking/GoogleCalendarBooking';
import { Phone, Mail, MapPin, Clock } from 'lucide-react';
import BookingButton from '@/components/booking/BookingButton';

const BookingPage = () => {
  // Scroll to top on page load
  useScrollToTop();

  return (
    <div className="min-h-screen w-full overflow-x-hidden relative bg-gradient-to-b from-gray-50 to-white">
      <Helmet>
        <title>Schedule a Meeting | InnovateHub Inc.</title>
        <meta name="description" content="Book a meeting, demo, or consultation with InnovateHub. Choose from available slots on our calendar." />
      </Helmet>
      
      {/* Background patterns */}
      <CircuitBackground pattern="curvy-line" className="fixed top-0 right-0" size="lg" opacity={0.1} color="primary" />
      <CircuitBackground pattern="dotted-grid" className="fixed top-1/4 right-1/4" size="md" opacity={0.1} />
      
      {/* Main content */}
      <Navbar />
      <main className="w-full py-12 px-4">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-10">
            <h1 className="text-4xl font-bold text-innovate-600">Schedule a Meeting</h1>
            <p className="mt-3 text-xl text-gray-600">Book a consultation, demo, or business meeting with our team</p>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              <GoogleCalendarBooking />
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-md border border-gray-200 h-fit">
              <h3 className="text-xl font-bold text-innovate-600 mb-4">Contact Information</h3>
              
              <div className="space-y-4 mb-6">
                <div className="flex items-start">
                  <Phone className="h-5 w-5 text-innovate-500 mr-3 mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="font-medium">Phone</p>
                    <p className="text-gray-600">+63 917 685 1216</p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <Mail className="h-5 w-5 text-innovate-500 mr-3 mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="font-medium">Email</p>
                    <p className="text-gray-600 break-words">businessdevelopment@innovatehub.ph</p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <MapPin className="h-5 w-5 text-innovate-500 mr-3 mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="font-medium">Office Location</p>
                    <p className="text-gray-600">RMCL Bldg., New Bypass Rd., Bayanan, San Pascual, Batangas</p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <Clock className="h-5 w-5 text-innovate-500 mr-3 mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="font-medium">Business Hours</p>
                    <p className="text-gray-600">Monday - Friday: 9:00 AM - 5:00 PM PHT</p>
                  </div>
                </div>
              </div>
              
              <hr className="my-5 border-gray-200" />
              
              <h4 className="font-medium mb-3">Prefer a custom booking?</h4>
              <BookingButton 
                variant="default"
                className="w-full"
                buttonText="Use Booking Form"
              />
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default BookingPage;
