
import React from 'react';
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { toast } from 'sonner';
import { Service } from '@/data/servicesData';

interface ServiceCardProps {
  service: Service;
  index: number;
}

const ServiceCard = ({ service, index }: ServiceCardProps) => {
  const handleDemo = (serviceName: string) => {
    toast.success(`Demo request sent for ${serviceName}`, {
      description: "We'll contact you shortly with more information."
    });
  };

  const getGradientColor = (index: number) => {
    const colors = [
      "bg-gradient-to-br from-innovate-500 to-innovate-700", // Fintech
      "bg-gradient-to-br from-purple-500 to-indigo-700",     // Digital Customizations
      "bg-gradient-to-br from-emerald-500 to-teal-700",      // E-Commerce
      "bg-gradient-to-br from-amber-500 to-orange-700",      // AI Solutions
      "bg-gradient-to-br from-pink-500 to-rose-700",         // Web & Mobile
      "bg-gradient-to-br from-blue-500 to-cyan-700"          // Global Expansion
    ];
    return colors[index % colors.length];
  };

  return (
    <div 
      className={`relative overflow-hidden transition-all duration-300 hover:shadow-xl border-0 bg-white backdrop-blur-sm fade-up rounded-lg border shadow-sm ${
        index === 0 ? 'ring-2 ring-innovate-500 ring-offset-2' : ''
      }`}
      style={{ 
        animationDelay: `${index * 100}ms`,
        boxShadow: '0 10px 40px -15px rgba(0, 0, 0, 0.1)'
      }}
    >
      <div className={`absolute top-0 left-0 w-2 h-full ${getGradientColor(index).split(' ')[0]}`}></div>
      <div className="p-8 relative z-10 flex flex-col h-full">
        {index === 0 && service.id === "fintech-solutions" ? (
          <div className="flex items-center mb-4">
            <div className="relative mr-4">
              <img 
                src="/lovable-uploads/9b23899d-8537-4e7c-996b-5fdc791cbde2.png" 
                alt={`${service.title} Logo`} 
                className="h-14 w-14 relative z-10 transform transition-all duration-300 hover:scale-110"
                style={{ filter: 'drop-shadow(0 0 8px rgba(255, 255, 255, 0.4))' }}
              />
            </div>
            <h3 className="text-2xl font-semibold">{service.title}</h3>
          </div>
        ) : (
          <h3 className="text-xl font-semibold mb-3">{service.title}</h3>
        )}
        
        <p className="text-gray-600 mb-6">{service.description}</p>
        
        <div className="mb-6 flex justify-center">
          <img 
            src={service.icon} 
            alt={`${service.title} Illustration`} 
            className="h-32 w-auto object-contain transition-transform hover:scale-105 duration-300"
          />
        </div>
        
        <ul className="mb-8 space-y-4 flex-grow">
          {service.features.map((feature, i) => (
            <li key={i} className="space-y-1">
              <div className="flex items-start">
                <span className="flex-shrink-0 w-5 h-5 rounded-full bg-innovate-100 flex items-center justify-center mr-2 mt-0.5">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 text-innovate-600" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                </span>
                <span className="text-gray-800 font-medium">{feature.title}</span>
              </div>
              {feature.description && (
                <p className="text-gray-600 text-sm ml-7">
                  {feature.description}
                </p>
              )}
            </li>
          ))}
        </ul>
        
        <div className="mt-auto pt-4 border-t border-gray-100 space-y-3">
          <Button 
            className={`w-full group ${
              index === 0 
                ? 'bg-innovate-600 hover:bg-innovate-700' 
                : 'bg-gray-800 hover:bg-gray-900'
            } text-white transition-colors`}
          >
            <Link to={`/${service.slug}`} className="w-full h-full flex items-center justify-center">
              {service.ctaText}
              <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Link>
          </Button>
          
          <Button 
            variant="outline" 
            className="w-full border-gray-200 hover:bg-gray-50 text-gray-700"
            onClick={() => handleDemo(service.title)}
          >
            Request a Demo
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ServiceCard;
