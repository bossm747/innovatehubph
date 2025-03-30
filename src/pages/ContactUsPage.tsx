
import React from 'react';
import { Helmet } from 'react-helmet';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import ContactSection from '@/components/ContactSection';
import ContactInfo from '@/components/ContactInfo';
import { MapPin, Phone, Mail, Clock } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';

const ContactUsPage = () => {
  const contactInfoItems = [
    {
      icon: <MapPin className="h-8 w-8 text-blue-600" />,
      title: "Our Location",
      details: [
        "RMCL Bldg., New Bypass Rd.,",
        "Bayanan, San Pascual, Batangas"
      ]
    },
    {
      icon: <Phone className="h-8 w-8 text-blue-600" />,
      title: "Contact Numbers",
      details: [
        "+63 917 685 1216"
      ]
    },
    {
      icon: <Mail className="h-8 w-8 text-blue-600" />,
      title: "Email Us",
      details: [
        "businessdevelopment@innovatehub.ph",
        "info@innovatehub.ph"
      ]
    },
    {
      icon: <Clock className="h-8 w-8 text-blue-600" />,
      title: "Business Hours",
      details: [
        "Monday - Friday: 9:00 AM - 6:00 PM",
        "Saturday: 9:00 AM - 12:00 PM"
      ]
    }
  ];

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
                      {contactInfoItems.map((item, index) => (
                        <ContactInfo 
                          key={index}
                          icon={item.icon}
                          title={item.title}
                          details={item.details}
                        />
                      ))}
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
