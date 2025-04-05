
import React from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Helmet } from 'react-helmet';
import { useScrollToTop } from '@/hooks/useScrollToTop';
import CircuitBackground from '@/components/CircuitBackground';
import GoogleCalendarBooking from '@/components/booking/GoogleCalendarBooking';
import { Phone, Mail, MapPin, Clock, ExternalLink } from 'lucide-react';
import BookingButton from '@/components/booking/BookingButton';
import { Button } from '@/components/ui/button';

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
            
            <div className="bg-gradient-to-br from-white to-gray-50 p-7 rounded-xl shadow-lg border border-gray-100 h-fit relative overflow-hidden transform transition-all duration-300 hover:shadow-xl">
              {/* Decorative accent */}
              <div className="absolute -top-10 -right-10 w-40 h-40 bg-innovate-100 rounded-full opacity-30 blur-2xl"></div>
              <div className="absolute -bottom-16 -left-16 w-40 h-40 bg-blue-50 rounded-full opacity-30 blur-3xl"></div>
              
              {/* Content */}
              <div className="relative z-10">
                <h3 className="text-xl font-bold text-innovate-600 mb-5 border-b border-gray-200 pb-3">Contact Information</h3>
                
                <div className="space-y-6 mb-6">
                  <div className="flex items-start group">
                    <div className="w-10 h-10 rounded-full bg-innovate-50 flex items-center justify-center mr-4 transition-all duration-300 group-hover:bg-innovate-100">
                      <Phone className="h-5 w-5 text-innovate-600" />
                    </div>
                    <div>
                      <p className="font-medium text-gray-700">Phone</p>
                      <a href="tel:+639176851216" className="text-innovate-600 hover:text-innovate-800 transition-colors">
                        +63 917 685 1216
                      </a>
                    </div>
                  </div>
                  
                  <div className="flex items-start group">
                    <div className="w-10 h-10 rounded-full bg-innovate-50 flex items-center justify-center mr-4 transition-all duration-300 group-hover:bg-innovate-100">
                      <Mail className="h-5 w-5 text-innovate-600" />
                    </div>
                    <div>
                      <p className="font-medium text-gray-700">Email</p>
                      <a href="mailto:businessdevelopment@innovatehub.ph" className="text-innovate-600 hover:text-innovate-800 transition-colors break-words">
                        businessdevelopment@innovatehub.ph
                      </a>
                    </div>
                  </div>
                  
                  <div className="flex items-start group">
                    <div className="w-10 h-10 rounded-full bg-innovate-50 flex items-center justify-center mr-4 transition-all duration-300 group-hover:bg-innovate-100">
                      <MapPin className="h-5 w-5 text-innovate-600" />
                    </div>
                    <div>
                      <p className="font-medium text-gray-700">Office Location</p>
                      <p className="text-gray-600">RMCL Bldg., New Bypass Rd., Bayanan, San Pascual, Batangas</p>
                      <Button 
                        variant="link" 
                        className="p-0 h-auto text-innovate-600 hover:text-innovate-800 mt-1 flex items-center"
                        asChild
                      >
                        <a href="https://maps.google.com/?q=RMCL+Bldg.+New+Bypass+Rd.+Bayanan+San+Pascual+Batangas" target="_blank" rel="noopener noreferrer">
                          Get directions <ExternalLink className="ml-1 h-3 w-3" />
                        </a>
                      </Button>
                    </div>
                  </div>
                  
                  <div className="flex items-start group">
                    <div className="w-10 h-10 rounded-full bg-innovate-50 flex items-center justify-center mr-4 transition-all duration-300 group-hover:bg-innovate-100">
                      <Clock className="h-5 w-5 text-innovate-600" />
                    </div>
                    <div>
                      <p className="font-medium text-gray-700">Business Hours</p>
                      <p className="text-gray-600">Monday - Friday: 9:00 AM - 5:00 PM PHT</p>
                    </div>
                  </div>
                </div>
                
                <div className="bg-innovate-50 rounded-lg p-4 mt-6">
                  <h4 className="font-medium mb-2 text-innovate-800">Prefer a custom booking?</h4>
                  <p className="text-sm text-gray-600 mb-3">Use our booking form for special requirements or inquiries</p>
                  <BookingButton 
                    variant="default"
                    className="w-full"
                    buttonText="Use Booking Form"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default BookingPage;
