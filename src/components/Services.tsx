
import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { cn } from '@/lib/utils';

interface ServiceCardProps {
  title: string;
  description: string;
  icon: React.ReactNode;
  isActive?: boolean;
  onClick?: () => void;
  className?: string;
}

const ServiceCard = ({ title, description, icon, isActive, onClick, className }: ServiceCardProps) => (
  <Card 
    className={cn(
      "relative border rounded-xl cursor-pointer transition-all duration-300 overflow-hidden",
      isActive 
        ? "border-innovate-500 shadow-md bg-white" 
        : "border-gray-200 hover:border-innovate-300 bg-white/60",
      className
    )}
    onClick={onClick}
  >
    {isActive && (
      <div className="absolute top-0 left-0 w-1 h-full bg-innovate-500"></div>
    )}
    <CardContent className="p-6">
      <div className="flex flex-col space-y-4">
        <div className={cn(
          "w-12 h-12 rounded-full flex items-center justify-center",
          isActive ? "bg-innovate-100 text-innovate-700" : "bg-gray-100 text-gray-600"
        )}>
          {icon}
        </div>
        <h3 className="text-xl font-semibold">{title}</h3>
        <p className="text-gray-600">{description}</p>
        {isActive && (
          <Button 
            variant="link" 
            className="text-innovate-600 hover:text-innovate-800 p-0 h-auto flex items-center"
          >
            Learn More
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-1" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
            </svg>
          </Button>
        )}
      </div>
    </CardContent>
  </Card>
);

const Services = () => {
  const [activeService, setActiveService] = useState("platapay");

  const services = [
    {
      id: "platapay",
      title: "PlataPay",
      description: "Digital wallet, bills payment, remittance, e-loading, and QR payments for micropreneurs.",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2z" />
        </svg>
      ),
      image: "public/lovable-uploads/45881ff2-13a3-4bc4-a639-da000d90c94a.png",
      detailTitle: "PlataPay – Digital Finance for All",
      detailDesc: "A secure and income-generating platform for communities, enabling digital wallet services, bills payment, remittance, e-loading, and QR payments."
    },
    {
      id: "digital-customizations",
      title: "Digital Customizations",
      description: "Custom software, business model development, and strategic IT consulting services.",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
        </svg>
      ),
      image: "public/lovable-uploads/a2eb57ca-42be-4d9e-9770-cd7f0b98796c.png",
      detailTitle: "Tailored Digital Solutions",
      detailDesc: "We develop custom software, business models, and provide strategic IT consulting to help your business thrive in the digital landscape."
    },
    {
      id: "ecommerce",
      title: "E-Commerce Development",
      description: "Online stores, payment integration, and order management systems for modern businesses.",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
        </svg>
      ),
      image: "public/lovable-uploads/3113cd1e-8a6f-4c4b-b8a8-c7e24d9aa394.png",
      detailTitle: "Complete E-Commerce Solutions",
      detailDesc: "From online store development to payment integration and order management, we build comprehensive e-commerce solutions to help your business sell online."
    },
    {
      id: "ai-solutions",
      title: "AI Solutions",
      description: "Chatbots, predictive analytics, and process automation to enhance your business operations.",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2zM9 9h6v6H9V9z" />
        </svg>
      ),
      image: "public/lovable-uploads/2992c718-ef43-4ea4-8209-8ac48cc7cc87.png",
      detailTitle: "AI-Powered Business Solutions",
      detailDesc: "Leverage the power of artificial intelligence with our chatbots, predictive analytics, and process automation solutions to enhance your business operations."
    },
    {
      id: "global-expansion",
      title: "Global Expansion",
      description: "Dubai trade license and international fintech reach for businesses looking to expand globally.",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      ),
      image: "public/lovable-uploads/a2eb57ca-42be-4d9e-9770-cd7f0b98796c.png",
      detailTitle: "International Business Expansion",
      detailDesc: "Facilitate your company's global growth with our Dubai trade license services and international fintech solutions, helping you expand your business beyond borders."
    }
  ];

  const activeServiceData = services.find(service => service.id === activeService);

  return (
    <section id="services" className="py-20 px-6 md:px-12 lg:px-24 bg-gray-50">
      <div className="container mx-auto">
        <div className="text-center mb-16">
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
            <div className="bg-white rounded-xl shadow-soft overflow-hidden opacity-0 animate-fade-in" style={{ animationDelay: '300ms' }}>
              <div className="relative h-60 md:h-80 overflow-hidden">
                <img 
                  src={activeServiceData?.image} 
                  alt={activeServiceData?.title} 
                  className="w-full h-full object-cover object-center"
                />
                <div className="absolute inset-0 bg-innovate-900/20"></div>
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-center p-6">
                    <h3 className="text-2xl md:text-3xl font-bold text-white mb-2 drop-shadow-md">
                      {activeServiceData?.title}
                    </h3>
                    <div className="w-20 h-1 bg-innovate-500 mx-auto"></div>
                  </div>
                </div>
              </div>
              
              <div className="p-6 md:p-8">
                <h4 className="text-xl font-semibold mb-4">{activeServiceData?.detailTitle}</h4>
                <p className="text-gray-600 mb-6">{activeServiceData?.detailDesc}</p>
                
                <ul className="space-y-3 mb-6">
                  <li className="flex items-start">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-innovate-600 mt-0.5" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    <span className="ml-2 text-gray-700">Expert team with specialized skills</span>
                  </li>
                  <li className="flex items-start">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-innovate-600 mt-0.5" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    <span className="ml-2 text-gray-700">Tailored solutions for your business needs</span>
                  </li>
                  <li className="flex items-start">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-innovate-600 mt-0.5" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    <span className="ml-2 text-gray-700">Ongoing support and maintenance</span>
                  </li>
                  <li className="flex items-start">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-innovate-600 mt-0.5" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    <span className="ml-2 text-gray-700">Fast delivery and implementation</span>
                  </li>
                </ul>
                
                <div className="flex flex-wrap gap-4">
                  <Button className="bg-innovate-600 hover:bg-innovate-700 text-white btn-shine">
                    Request a Demo
                  </Button>
                  <Button variant="outline" className="border-innovate-200 text-innovate-700 hover:bg-innovate-50">
                    Learn More
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Services;
