
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
  const [activeService, setActiveService] = useState("web-development");

  const services = [
    {
      id: "web-development",
      title: "Web Development",
      description: "Custom web development services tailored to your business needs, using the latest technologies.",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
        </svg>
      ),
      image: "public/lovable-uploads/45881ff2-13a3-4bc4-a639-da000d90c94a.png",
      detailTitle: "Enterprise-Grade Web Solutions",
      detailDesc: "Our web development team creates intuitive, responsive websites and web applications that drive business growth and enhance user experience."
    },
    {
      id: "mobile-development",
      title: "Mobile App Development",
      description: "Native and cross-platform mobile application development for iOS and Android devices.",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" />
        </svg>
      ),
      image: "public/lovable-uploads/3113cd1e-8a6f-4c4b-b8a8-c7e24d9aa394.png",
      detailTitle: "Mobile Solutions for the Modern Business",
      detailDesc: "We develop feature-rich, user-friendly mobile applications that provide seamless experiences across all devices and platforms."
    },
    {
      id: "cloud-services",
      title: "Cloud Services",
      description: "Enterprise cloud solutions, migration services, and cloud infrastructure management.",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 15a4 4 0 004 4h9a5 5 0 10-.1-9.999 5.002 5.002 0 10-9.78 2.096A4.001 4.001 0 003 15z" />
        </svg>
      ),
      image: "public/lovable-uploads/a2eb57ca-42be-4d9e-9770-cd7f0b98796c.png",
      detailTitle: "Secure & Scalable Cloud Infrastructure",
      detailDesc: "Our cloud experts help you migrate, optimize, and manage your applications in the cloud, ensuring security, performance, and cost-effectiveness."
    },
    {
      id: "ai-solutions",
      title: "AI & Data Analytics",
      description: "Cutting-edge AI solutions and data analytics services to drive intelligent decision-making.",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
        </svg>
      ),
      image: "public/lovable-uploads/2992c718-ef43-4ea4-8209-8ac48cc7cc87.png",
      detailTitle: "AI-Powered Business Intelligence",
      detailDesc: "Leverage the power of artificial intelligence and machine learning to extract valuable insights from your data and automate complex business processes."
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
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Comprehensive Technology Solutions</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            We offer a wide range of technology services to help your business thrive in the digital age.
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
                    <span className="ml-2 text-gray-700">Agile methodology for faster delivery</span>
                  </li>
                </ul>
                
                <div className="flex flex-wrap gap-4">
                  <Button className="bg-innovate-600 hover:bg-innovate-700 text-white btn-shine">
                    Request a Quote
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
