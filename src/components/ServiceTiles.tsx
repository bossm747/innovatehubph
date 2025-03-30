
import React from 'react';
import ServiceCard from '@/components/services/ServiceCard';
import ServiceTileHeader from '@/components/services/ServiceTileHeader';
import ServiceTileCTA from '@/components/services/ServiceTileCTA';
import { servicesData } from '@/data/servicesData';

const ServiceTiles = () => {
  return (
    <section id="service-tiles" className="py-24 px-6 md:px-12">
      <div className="container mx-auto">
        <ServiceTileHeader 
          title="Our Solutions" 
          subtitle="Our Complete Service Suite" 
        />
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {servicesData.map((service, index) => (
            <ServiceCard 
              key={service.id} 
              service={service}
              index={index}
            />
          ))}
        </div>
        
        <ServiceTileCTA />
      </div>
    </section>
  );
};

export default ServiceTiles;
