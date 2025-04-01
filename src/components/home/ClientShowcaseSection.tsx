
import React from 'react';
import ClientsShowcase from '@/components/ClientsShowcase';

const ClientShowcaseSection = () => {
  return (
    <section className="py-24 px-6 md:px-12 bg-white relative overflow-hidden">
      <div className="container mx-auto">
        <div className="text-center mb-16 fade-up">
          <span className="inline-block px-3 py-1 text-sm font-medium bg-innovate-100 text-innovate-800 rounded-full mb-4">
            Our Clients
          </span>
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Trusted by Forward-Thinking Organizations
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            We're proud to partner with innovative businesses that are leading the way in their industries.
          </p>
        </div>
        
        <ClientsShowcase maxItems={8} autoSlide={true} />
      </div>
    </section>
  );
};

export default ClientShowcaseSection;
