
import React from 'react';
import ContactSectionInfo from './contact/ContactSectionInfo';
import ContactSectionForm from './contact/ContactSectionForm';

const ContactSection = () => {
  return (
    <section id="contact" className="py-20 px-6 md:px-12 lg:px-24 bg-gray-50">
      <div className="container mx-auto">
        <div className="text-center mb-16">
          <span className="inline-block px-3 py-1 text-sm font-medium bg-innovate-100 text-innovate-800 rounded-full mb-4">
            Contact Us
          </span>
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Ready to Collaborate? Let's Talk!</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Reach out and let's co-create your digital future. We're here to help you transform your business with innovative technology solutions.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          <ContactSectionInfo />
          <ContactSectionForm />
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
