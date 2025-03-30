
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';
import partnersData from '@/data/partnersData';

const PartnersSection = () => {
  // Select featured partners to display on the home page
  const featuredPartners = [
    // Banking partners
    partnersData.find(partner => partner.name === "Sterling Bank of Asia"),
    partnersData.find(partner => partner.name === "Security Bank"),
    partnersData.find(partner => partner.name === "AllBank"),
    // Financial Services partners
    partnersData.find(partner => partner.name === "Cebuana Lhuillier"),
    partnersData.find(partner => partner.name === "Nationlink"),
  ].filter(Boolean); // Remove any undefined values
  
  return (
    <section className="py-16 bg-gradient-to-br from-gray-50 to-gray-100">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Our Trusted Partners</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            We collaborate with leading financial institutions and service providers across the Philippines to deliver integrated and comprehensive solutions for our clients.
          </p>
        </div>
        
        <div className="grid grid-cols-2 md:grid-cols-5 gap-6 items-center justify-center mb-10">
          {featuredPartners.map((partner) => (
            <div 
              key={partner.id} 
              className="bg-white p-6 rounded-lg shadow-md flex items-center justify-center hover:shadow-lg transition-shadow duration-300"
            >
              <img 
                src={partner.logo} 
                alt={partner.name} 
                className="max-h-16 md:max-h-20" 
              />
            </div>
          ))}
        </div>
        
        <div className="text-center">
          <Button asChild variant="outline" className="group">
            <Link to="/partners" className="inline-flex items-center">
              View All Partners
              <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
};

export default PartnersSection;
