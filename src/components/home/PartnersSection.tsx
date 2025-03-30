
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';

const PartnersSection = () => {
  const partners = [
    {
      id: 1,
      name: "GCash",
      logo: "/lovable-uploads/239901fa-6133-4fd7-8a25-6130c3d2a60e.png",
    },
    {
      id: 2,
      name: "PayMaya",
      logo: "/lovable-uploads/435e4809-830b-47f7-a2e1-c1667877fbc7.png",
    },
    {
      id: 3,
      name: "Angkas",
      logo: "/lovable-uploads/7e0be886-0190-497f-9eba-eeafd77af074.png",
    },
    {
      id: 4,
      name: "Foodpanda",
      logo: "/lovable-uploads/f0b7b62c-13ce-4b9c-bb0b-49b6bbd3e183.png",
    },
    {
      id: 5,
      name: "Sterling Bank of Asia",
      logo: "/lovable-uploads/cc05597c-5b00-4c9f-a930-65c3693db624.png",
    }
  ];
  
  return (
    <section className="py-16 bg-gradient-to-br from-gray-50 to-gray-100">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Our Trusted Partners</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            We collaborate with leading companies across different industries to provide integrated and comprehensive solutions for our clients.
          </p>
        </div>
        
        <div className="grid grid-cols-2 md:grid-cols-5 gap-6 items-center justify-center mb-10">
          {partners.map((partner) => (
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
