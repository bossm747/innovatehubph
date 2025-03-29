
import { useState } from 'react';
import ServiceCard from './services/ServiceCard';
import ServiceDetail from './services/ServiceDetail';
import { getServicesData } from '@/data/servicesData';

const Services = () => {
  const [activeService, setActiveService] = useState("platapay");
  const services = getServicesData();
  const activeServiceData = services.find(service => service.id === activeService);

  return (
    <section id="services" className="py-20 px-6 md:px-12 lg:px-24 bg-gray-50">
      <div className="container mx-auto">
        <div className="text-center mb-16 fade-up">
          <span className="inline-block px-3 py-1 text-sm font-medium bg-innovate-100 text-innovate-800 rounded-full mb-4">
            Our Services
          </span>
          <h2 className="text-3xl md:text-4xl font-bold mb-4">What We Do</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Smart Solutions for the Digital Economy - We offer a wide range of technology services to help your business thrive.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          <div className="lg:col-span-5 space-y-4">
            {services.map((service) => (
              <ServiceCard
                key={service.id}
                title={service.title}
                description={service.description}
                icon={service.icon}
                isActive={activeService === service.id}
                onClick={() => setActiveService(service.id)}
              />
            ))}
          </div>
          
          <div className="lg:col-span-7">
            {activeServiceData && (
              <ServiceDetail 
                id={activeServiceData.id}
                title={activeServiceData.title}
                detailTitle={activeServiceData.detailTitle}
                detailDesc={activeServiceData.detailDesc}
                image={activeServiceData.image}
              />
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Services;
