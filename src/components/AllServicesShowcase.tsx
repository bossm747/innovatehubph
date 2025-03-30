
import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { servicesData } from '@/data/servicesData';

const AllServicesShowcase = () => {
  return (
    <section className="py-20 px-6 md:px-12">
      <div className="container mx-auto">
        <div className="text-center mb-16 fade-up">
          <span className="inline-block px-3 py-1 text-sm font-medium bg-innovate-100 text-innovate-800 rounded-full mb-4">
            Our Comprehensive Solutions
          </span>
          <h2 className="text-3xl md:text-4xl font-bold mb-4">All Digital Services Under One Roof</h2>
          <p className="text-gray-600 max-w-3xl mx-auto">
            From fintech solutions to AI integration, we provide end-to-end digital transformation services to help your business thrive in the digital age.
          </p>
        </div>

        {/* Services Hub Image */}
        <div className="relative mb-16 max-w-4xl mx-auto fade-up">
          <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 to-purple-500/10 rounded-lg blur-xl"></div>
          <img 
            src="/lovable-uploads/dea0d8a1-2294-4073-9761-8113ef0bed55.png" 
            alt="InnovateHub Services Hub" 
            className="relative z-10 w-full h-auto rounded-lg shadow-xl"
          />
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {servicesData.map((service, index) => (
            <Card 
              key={service.id} 
              className="p-6 hover:shadow-lg transition-all duration-300 border-t-4 border-innovate-500 fade-up h-[360px] flex flex-col"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="flex items-center justify-center mb-6 flex-shrink-0">
                <div className="p-3 rounded-full bg-innovate-50">
                  <img 
                    src={service.imageSrc || service.icon} 
                    alt={service.title} 
                    className="h-20 w-auto transition-transform hover:scale-105 duration-300"
                  />
                </div>
              </div>
              
              <div className="flex flex-col flex-grow">
                <h3 className="text-xl font-semibold mb-3">{service.title}</h3>
                <p className="text-gray-600 mb-4">{service.description}</p>
                <div className="mt-auto">
                  <Link 
                    to={`/${service.id}`} 
                    className="text-innovate-600 hover:text-innovate-700 flex items-center font-medium"
                  >
                    Learn more <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </div>
              </div>
            </Card>
          ))}
        </div>
        
        <div className="mt-16 text-center fade-up">
          <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
            Need a custom solution or want to learn more about a specific service?
          </p>
          <Button asChild size="lg">
            <Link to="/contact">Contact Our Team</Link>
          </Button>
        </div>
      </div>
    </section>
  );
};

export default AllServicesShowcase;
