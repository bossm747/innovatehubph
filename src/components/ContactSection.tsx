
import React from 'react';
import ContactSectionInfo from './contact/ContactSectionInfo';
import ContactSectionForm from './contact/ContactSectionForm';
import BookingButton from './booking/BookingButton';

const ContactSection = () => {
  return (
    <section id="contact" className="py-20 px-6 md:px-12 lg:px-24 bg-gray-50">
      <div className="container mx-auto">
        <div className="text-center mb-16">
          <span className="inline-block px-3 py-1 text-sm font-medium bg-innovate-100 text-innovate-800 rounded-full mb-4">
            Contact Us
          </span>
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Ready to Collaborate? Let's Talk!</h2>
          <p className="text-gray-600 max-w-2xl mx-auto mb-6">
            Reach out and let's co-create your digital future. We're here to help you transform your business with innovative technology solutions.
          </p>
          <BookingButton 
            variant="secondary"
            className="mx-auto mt-4"
            label="Schedule a Consultation Call"
            topic="General Consultation"
            type="call"
          />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          <div className="relative hidden lg:block lg:col-span-1">
            <div className="absolute inset-0 bg-gradient-to-br from-blue-500/20 to-blue-600/20 rounded-lg blur-xl"></div>
            <img 
              src="/lovable-uploads/50c0b0cb-18bb-408d-a179-75d6900152c8.png" 
              alt="Contact Us - Connected Digital Devices" 
              className="relative z-10 rounded-lg shadow-lg w-full h-auto transform hover:scale-105 transition-all duration-500"
            />
          </div>
          
          <div className="lg:col-span-1">
            <ContactSectionForm />
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
