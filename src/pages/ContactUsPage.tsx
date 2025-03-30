
import React from 'react';
import { Helmet } from 'react-helmet';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import ContactSection from '@/components/ContactSection';
import { MapPin, Phone, Mail, Clock } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';

const ContactUsPage = () => {
  return (
    <>
      <Helmet>
        <title>Contact InnovateHub Inc. | Get in Touch</title>
        <meta 
          name="description" 
          content="Reach out to InnovateHub Inc. for collaboration, questions, or support. We're here to help with your digital transformation journey."
        />
      </Helmet>
      
      <Navbar />
      
      <main>
        <section className="bg-gray-50 py-12 md:py-20">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h1 className="text-3xl md:text-4xl font-bold mb-4">Ready to Collaborate? Let's Talk!</h1>
              <p className="text-gray-600 max-w-2xl mx-auto">
                Reach out and let's co-create your digital future. Our team is ready to answer your questions
                and discuss how we can help your business thrive.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
              <div>
                <ContactSection />
              </div>
              
              <div>
                <Card className="border-0 shadow-lg">
                  <CardContent className="p-6">
                    <h2 className="text-xl font-semibold mb-6">Contact Information</h2>
                    <div className="space-y-6">
                      <div className="flex items-start">
                        <MapPin className="h-8 w-8 text-blue-600 mr-4 flex-shrink-0" />
                        <div>
                          <h3 className="font-medium">Our Location</h3>
                          <p className="text-gray-600 mt-1">RMCL Bldg., New Bypass Rd.,</p>
                          <p className="text-gray-600">Bayanan, San Pascual, Batangas</p>
                        </div>
                      </div>
                      
                      <div className="flex items-start">
                        <Phone className="h-8 w-8 text-blue-600 mr-4 flex-shrink-0" />
                        <div>
                          <h3 className="font-medium">Contact Numbers</h3>
                          <p className="text-gray-600 mt-1">+63 917 685 1216</p>
                        </div>
                      </div>
                      
                      <div className="flex items-start">
                        <Mail className="h-8 w-8 text-blue-600 mr-4 flex-shrink-0" />
                        <div>
                          <h3 className="font-medium">Email Us</h3>
                          <p className="text-gray-600 mt-1">businessdevelopment@innovatehub.ph</p>
                          <p className="text-gray-600">info@innovatehub.ph</p>
                        </div>
                      </div>
                      
                      <div className="flex items-start">
                        <Clock className="h-8 w-8 text-blue-600 mr-4 flex-shrink-0" />
                        <div>
                          <h3 className="font-medium">Business Hours</h3>
                          <p className="text-gray-600 mt-1">Monday - Friday: 9:00 AM - 6:00 PM</p>
                          <p className="text-gray-600">Saturday: 9:00 AM - 12:00 PM</p>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
                
                <div className="mt-8 rounded-xl overflow-hidden h-80 shadow-lg">
                  <iframe 
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3870.5231453618697!2d121.0533!3d14.0644!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x33bd6f2630856b25%3A0x64eb0080e1a76957!2sRMCL%20Bldg.%2C%20New%20Bypass%20Rd.%2C%20Bayanan%2C%20San%20Pascual%2C%20Batangas!5e0!3m2!1sen!2sph!4v1630000000000!5m2!1sen!2sph" 
                    width="100%" 
                    height="100%" 
                    style={{ border: 0 }} 
                    allowFullScreen 
                    loading="lazy"
                    title="InnovateHub Inc. Location"
                  ></iframe>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
      
      <Footer />
    </>
  );
};

export default ContactUsPage;
