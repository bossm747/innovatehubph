
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import CircuitBackground from '@/components/CircuitBackground';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import PlatapayForm from '@/components/forms/PlatapayForm';
import DigitalCustomizationsForm from '@/components/forms/DigitalCustomizationsForm';
import EcommerceForm from '@/components/forms/EcommerceForm';
import AiSolutionsForm from '@/components/forms/AiSolutionsForm';
import GlobalExpansionForm from '@/components/forms/GlobalExpansionForm';
import GeneralInquiryForm from '@/components/forms/GeneralInquiryForm';

const serviceIcons = {
  platapay: "/lovable-uploads/9b23899d-8537-4e7c-996b-5fdc791cbde2.png",
  digital: "/lovable-uploads/184545ab-3005-4f2b-8b3d-ef576aff4877.png",
  ecommerce: "/lovable-uploads/1ba10581-63f4-48e7-b872-fc97ae9f9f79.png",
  ai: "/lovable-uploads/520fec44-f8fe-4fcf-b3fb-dc9156169e22.png",
  global: "/lovable-uploads/ed1ffe66-3b7c-4957-aa5f-53948529fdee.png",
  general: "/lovable-uploads/41923896-2fb4-4137-b3b8-78bb35bbd3e5.png"
};

const InquiryPage = () => {
  const navigate = useNavigate();
  const [activeService, setActiveService] = useState('general');
  
  const services = [
    { id: 'platapay', name: 'PlataPay', description: 'Digital Wallet & Payment Solutions' },
    { id: 'digital', name: 'Digital Customizations', description: 'Tailored Software Solutions' },
    { id: 'ecommerce', name: 'E-Commerce', description: 'Online Store Development' },
    { id: 'ai', name: 'AI Solutions', description: 'Intelligent Automation' },
    { id: 'global', name: 'Global Expansion', description: 'International Market Entry' },
    { id: 'general', name: 'General Inquiry', description: 'Other Services' },
  ];

  return (
    <div className="min-h-screen w-full overflow-x-hidden">
      <Helmet>
        <title>Let's Build Together | InnovateHub Inc.</title>
        <meta name="description" content="Ready to collaborate? Tell us about your project and let's co-create your digital future." />
      </Helmet>
      
      <CircuitBackground 
        pattern="tech-circle" 
        className="fixed top-20 right-20" 
        size="lg" 
        opacity={0.1} 
        color="primary"
      />
      
      <CircuitBackground 
        pattern="blue-wave" 
        className="fixed -bottom-40 -left-40" 
        size="xl" 
        opacity={0.2} 
        color="primary"
      />
      
      <CircuitBackground 
        pattern="circuit-branches" 
        className="fixed top-1/3 left-1/4" 
        size="md" 
        opacity={0.1}
      />
      
      <Navbar />
      
      <section className="py-24 px-6 md:px-12 bg-gradient-to-r from-white to-gray-50">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-12 fade-up">
            <span className="inline-block px-3 py-1 text-sm font-medium bg-innovate-100 text-innovate-800 rounded-full mb-6">
              Project Inquiry
            </span>
            <h1 className="text-4xl md:text-5xl font-bold mb-6 hero-text-gradient">
              Let's Build Together
            </h1>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Select the service you're interested in and fill out the appropriate form. 
              Our team will get back to you with a tailored solution for your needs.
            </p>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            <div className="lg:col-span-4 fade-up">
              <Card className="bg-white p-6 shadow-lg">
                <h2 className="text-xl font-bold mb-4">Our Services</h2>
                <p className="text-gray-600 mb-6">
                  Choose the service you're interested in to get started with a specialized inquiry form.
                </p>
                
                <div className="space-y-3">
                  {services.map((service) => (
                    <Button 
                      key={service.id}
                      variant={activeService === service.id ? "default" : "outline"}
                      className={`w-full justify-start text-left h-auto py-3 px-4 ${
                        activeService === service.id 
                          ? 'bg-innovate-600 hover:bg-innovate-700 text-white' 
                          : 'hover:bg-innovate-50'
                      }`}
                      onClick={() => setActiveService(service.id)}
                    >
                      <div className="flex items-center">
                        <div className="w-10 h-10 rounded-full bg-white/90 p-1 flex items-center justify-center mr-3 flex-shrink-0 shadow-sm">
                          <img 
                            src={serviceIcons[service.id]} 
                            alt={service.name} 
                            className="w-7 h-7 object-contain" 
                          />
                        </div>
                        <div>
                          <p className="font-medium">{service.name}</p>
                          <p className={`text-xs ${activeService === service.id ? 'text-white/80' : 'text-gray-500'}`}>
                            {service.description}
                          </p>
                        </div>
                      </div>
                    </Button>
                  ))}
                </div>

                <div className="mt-8 p-4 bg-innovate-50 rounded-lg">
                  <h3 className="font-medium mb-2">Why Choose InnovateHub?</h3>
                  <ul className="space-y-2 text-sm">
                    <li className="flex items-start">
                      <div className="w-5 h-5 rounded-full bg-innovate-100 flex items-center justify-center mt-0.5 flex-shrink-0">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 text-innovate-700" viewBox="0 0 20 20" fill="currentColor">
                          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                      </div>
                      <p className="ml-2 text-gray-600">
                        <span className="font-medium text-gray-800">Expertise</span> across fintech, e-commerce & AI
                      </p>
                    </li>
                    <li className="flex items-start">
                      <div className="w-5 h-5 rounded-full bg-innovate-100 flex items-center justify-center mt-0.5 flex-shrink-0">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 text-innovate-700" viewBox="0 0 20 20" fill="currentColor">
                          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                      </div>
                      <p className="ml-2 text-gray-600">
                        <span className="font-medium text-gray-800">Client-focused</span> approach to projects
                      </p>
                    </li>
                    <li className="flex items-start">
                      <div className="w-5 h-5 rounded-full bg-innovate-100 flex items-center justify-center mt-0.5 flex-shrink-0">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 text-innovate-700" viewBox="0 0 20 20" fill="currentColor">
                          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                      </div>
                      <p className="ml-2 text-gray-600">
                        <span className="font-medium text-gray-800">Global reach</span> from Batangas to Dubai
                      </p>
                    </li>
                  </ul>
                </div>
              </Card>
            </div>
            
            <div className="lg:col-span-8 fade-up">
              <Card className="bg-white p-6 shadow-lg">
                <div className="flex items-center mb-6">
                  <img 
                    src={serviceIcons[activeService]} 
                    alt={services.find(s => s.id === activeService)?.name} 
                    className="w-12 h-12 object-contain mr-4"
                  />
                  <div>
                    <h2 className="text-2xl font-bold">
                      {services.find(s => s.id === activeService)?.name} Inquiry
                    </h2>
                    <p className="text-gray-600">
                      {services.find(s => s.id === activeService)?.description}
                    </p>
                  </div>
                </div>
                
                <div className="form-container">
                  {activeService === 'platapay' && <PlatapayForm navigate={navigate} />}
                  {activeService === 'digital' && <DigitalCustomizationsForm navigate={navigate} />}
                  {activeService === 'ecommerce' && <EcommerceForm navigate={navigate} />}
                  {activeService === 'ai' && <AiSolutionsForm navigate={navigate} />}
                  {activeService === 'global' && <GlobalExpansionForm navigate={navigate} />}
                  {activeService === 'general' && <GeneralInquiryForm navigate={navigate} />}
                </div>
              </Card>
            </div>
          </div>
        </div>
      </section>
      
      <Footer />
    </div>
  );
};

export default InquiryPage;
