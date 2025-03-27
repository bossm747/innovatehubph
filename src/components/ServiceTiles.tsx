
import React from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Link } from 'react-router-dom';

interface ServiceTile {
  id: number;
  title: string;
  description: string;
  icon: React.ReactNode;
  features: string[];
  color: string;
  ctaText: string;
  ctaLink: string;
  highlight?: boolean;
  isInternalLink?: boolean;
}

const ServiceTiles = () => {
  const services: ServiceTile[] = [
    {
      id: 1,
      title: "PlataPay",
      description: "Digital Wallet and Financial Services Platform",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
        </svg>
      ),
      features: [
        "Digital Wallet",
        "Bills Payment",
        "Remittance",
        "E-Loading",
        "QR Payments"
      ],
      color: "bg-gradient-to-br from-innovate-500 to-innovate-700",
      ctaText: "Learn More about PlataPay",
      ctaLink: "/platapay",
      highlight: true,
      isInternalLink: true
    },
    {
      id: 2,
      title: "Digital Customizations",
      description: "Tailored Digital Solutions for Your Business",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
        </svg>
      ),
      features: [
        "Custom Software",
        "Business Model Development",
        "Strategic IT Consulting",
        "Digital Transformation",
        "System Integration"
      ],
      color: "bg-gradient-to-br from-purple-500 to-indigo-700",
      ctaText: "Request Consultation",
      ctaLink: "#contact"
    },
    {
      id: 3,
      title: "E-Commerce Development",
      description: "Complete Online Store Solutions",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
        </svg>
      ),
      features: [
        "Online Stores",
        "Payment Integration",
        "Order Management",
        "Inventory Control",
        "Marketing Automation"
      ],
      color: "bg-gradient-to-br from-emerald-500 to-teal-700",
      ctaText: "Explore E-Commerce Solutions",
      ctaLink: "#contact"
    },
    {
      id: 4,
      title: "AI Solutions",
      description: "Intelligent Automation for Business Growth",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
        </svg>
      ),
      features: [
        "Chatbots",
        "Predictive Analytics",
        "Process Automation",
        "Machine Learning Models",
        "Data Processing"
      ],
      color: "bg-gradient-to-br from-amber-500 to-orange-700",
      ctaText: "Discover AI Solutions",
      ctaLink: "#contact"
    },
    {
      id: 5,
      title: "Global Expansion",
      description: "Extend Your Business to International Markets",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      ),
      features: [
        "Dubai Trade License",
        "International Fintech Reach",
        "Global Market Analysis",
        "Legal Compliance",
        "Cross-border Transactions"
      ],
      color: "bg-gradient-to-br from-blue-500 to-cyan-700",
      ctaText: "Expand Globally",
      ctaLink: "#contact"
    }
  ];

  return (
    <section id="service-tiles" className="py-20 px-6 md:px-12">
      <div className="container mx-auto">
        <div className="mb-16 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">Our Complete Service Suite</h2>
          <p className="text-gray-600 max-w-3xl mx-auto">
            From digital payments to AI-powered solutions, we provide a comprehensive range of services 
            to help businesses thrive in the digital economy.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service) => (
            <Card 
              key={service.id} 
              className={`relative overflow-hidden transition-all duration-300 hover:shadow-xl ${
                service.highlight ? 'ring-2 ring-innovate-500 ring-offset-2' : ''
              }`}
            >
              <div className={`absolute top-0 left-0 w-2 h-full ${service.color.split(' ')[0]}`}></div>
              <div className="p-8">
                <div className={`w-16 h-16 rounded-lg flex items-center justify-center mb-6 text-white ${service.color}`}>
                  {service.icon}
                </div>
                
                <h3 className="text-xl font-semibold mb-3">{service.title}</h3>
                <p className="text-gray-600 mb-6">{service.description}</p>
                
                <ul className="mb-8 space-y-2">
                  {service.features.map((feature, index) => (
                    <li key={index} className="flex items-start">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-innovate-500 mr-2 mt-0.5" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                      </svg>
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
                
                <Button 
                  className={`w-full ${
                    service.highlight 
                      ? 'bg-innovate-600 hover:bg-innovate-700' 
                      : 'bg-gray-800 hover:bg-gray-900'
                  } text-white transition-colors`}
                >
                  {service.isInternalLink ? (
                    <Link to={service.ctaLink} className="w-full h-full flex items-center justify-center">
                      {service.ctaText}
                    </Link>
                  ) : (
                    <a href={service.ctaLink} className="w-full h-full flex items-center justify-center">
                      {service.ctaText}
                    </a>
                  )}
                </Button>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ServiceTiles;
