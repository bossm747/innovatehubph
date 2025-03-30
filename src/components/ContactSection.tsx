
import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { MailIcon, PhoneIcon, MapPinIcon } from 'lucide-react';
import BookingButton from '@/components/booking/BookingButton';

const ContactSection: React.FC = () => {
  return (
    <section className="py-16 px-4 bg-white">
      <div className="container mx-auto max-w-6xl">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Get in Touch</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Have questions or ready to start your next project? Reach out to our team for expert guidance and support.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <Card className="border-0 shadow-md">
            <CardContent className="pt-6 text-center">
              <div className="inline-flex items-center justify-center h-12 w-12 rounded-full bg-innovate-50 text-innovate-600 mb-4">
                <PhoneIcon className="h-6 w-6" />
              </div>
              <h3 className="text-lg font-semibold mb-2">Call Us</h3>
              <p className="text-gray-500 mb-4">Speak directly with our team</p>
              <a href="tel:+639176851216" className="text-innovate-600 font-medium hover:underline">+63 917 685 1216</a>
              <div className="mt-4">
                <BookingButton 
                  variant="secondary" 
                  className="w-full"
                  buttonText="Schedule a Call"
                  topic="Phone Consultation"
                  meetingType="call"
                />
              </div>
            </CardContent>
          </Card>
          
          <Card className="border-0 shadow-md">
            <CardContent className="pt-6 text-center">
              <div className="inline-flex items-center justify-center h-12 w-12 rounded-full bg-innovate-50 text-innovate-600 mb-4">
                <MailIcon className="h-6 w-6" />
              </div>
              <h3 className="text-lg font-semibold mb-2">Email Us</h3>
              <p className="text-gray-500 mb-4">Send us your inquiries</p>
              <a href="mailto:businessdevelopment@innovatehub.ph" className="text-innovate-600 font-medium hover:underline">
                businessdevelopment@innovatehub.ph
              </a>
              <div className="mt-4">
                <Button variant="outline" className="w-full" asChild>
                  <a href="mailto:businessdevelopment@innovatehub.ph">
                    Send Email
                  </a>
                </Button>
              </div>
            </CardContent>
          </Card>
          
          <Card className="border-0 shadow-md">
            <CardContent className="pt-6 text-center">
              <div className="inline-flex items-center justify-center h-12 w-12 rounded-full bg-innovate-50 text-innovate-600 mb-4">
                <MapPinIcon className="h-6 w-6" />
              </div>
              <h3 className="text-lg font-semibold mb-2">Visit Us</h3>
              <p className="text-gray-500 mb-4">Come to our office</p>
              <address className="not-italic text-innovate-600 font-medium">
                RMCL Bldg., New Bypass Rd., <br />
                Bayanan, San Pascual, Batangas
              </address>
              <div className="mt-4">
                <Button variant="outline" className="w-full" asChild>
                  <a href="https://maps.google.com/?q=RMCL+Bldg.+New+Bypass+Rd.+Bayanan+San+Pascual+Batangas" target="_blank" rel="noopener noreferrer">
                    Get Directions
                  </a>
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
