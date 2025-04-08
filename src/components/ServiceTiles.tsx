
import React from 'react';
import { Link } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { ArrowRight, Code, ShoppingBag, Globe, Bot, Smartphone } from 'lucide-react';

const ServiceTiles = () => {
  const services = [
    {
      id: 'platapay',
      title: 'PlataPay',
      description: 'Digital wallet, bills payment, remittance services, and e-loading platform for businesses and individuals.',
      icon: <Globe className="h-5 w-5 text-blue-500" />,
      badge: 'Featured',
      link: '/services/platapay',
      features: ['Digital Wallet', 'Bills Payment', 'Remittance', 'E-Loading', 'QR Payments']
    },
    {
      id: 'digital',
      title: 'Digital Customizations',
      description: 'Custom software, business model development, and strategic IT consulting for your unique needs.',
      icon: <Code className="h-5 w-5 text-indigo-500" />,
      badge: '',
      link: '/services/digital-customizations',
      features: ['Custom Software', 'Business Models', 'Strategic IT Consulting']
    },
    {
      id: 'ecommerce',
      title: 'E-Commerce Solutions',
      description: 'Complete online store development, payment integration, and order management systems.',
      icon: <ShoppingBag className="h-5 w-5 text-green-500" />,
      badge: '',
      link: '/services/ecommerce',
      features: ['Online Stores', 'Payment Integration', 'Order Management']
    },
    {
      id: 'ai',
      title: 'AI Solutions',
      description: 'Chatbots, predictive analytics, and process automation to optimize your business operations.',
      icon: <Bot className="h-5 w-5 text-purple-500" />,
      badge: 'New',
      link: '/services/ai-solutions',
      features: ['Chatbots', 'Predictive Analytics', 'Process Automation']
    },
    {
      id: 'global',
      title: 'Global Expansion',
      description: 'Dubai trade license and international fintech reach for businesses looking to expand globally.',
      icon: <Globe className="h-5 w-5 text-orange-500" />,
      badge: '',
      link: '/services/global-expansion',
      features: ['Dubai Trade License', 'International Fintech', 'Global Reach']
    },
    {
      id: 'mobile',
      title: 'Mobile App Development',
      description: 'Native and cross-platform mobile applications for iOS and Android with seamless UX.',
      icon: <Smartphone className="h-5 w-5 text-teal-500" />,
      badge: '',
      link: '/services/mobile-app-development',
      features: ['iOS & Android', 'Cross-platform', 'Seamless UX']
    }
  ];

  return (
    <section className="py-12 px-4 md:px-6 bg-gradient-to-b from-white to-gray-50 relative overflow-hidden">
      <div className="container mx-auto">
        <div className="space-y-3 text-center mb-8">
          <div className="inline-flex items-center px-3 py-1 rounded-full bg-blue-100 text-blue-700 mb-2">
            <span className="text-sm font-medium">Our Services</span>
          </div>
          <h2 className="text-2xl md:text-3xl font-bold text-gray-800">Comprehensive Digital Solutions</h2>
          <p className="text-gray-600 max-w-2xl mx-auto text-sm">
            Explore our range of specialized services designed to help your business thrive in the digital economy.
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-3 sm:gap-4 mt-6">
          {services.map((service) => (
            <Card key={service.id} className="border border-gray-100 shadow-sm hover:shadow-md transition-shadow overflow-hidden bg-white h-full flex flex-col">
              <CardHeader className="pb-2 space-y-2 p-4">
                <div className="flex justify-between items-start">
                  <div className="p-2 rounded-lg bg-gray-50">{service.icon}</div>
                  {service.badge && (
                    <Badge className={`text-xs px-2 py-0.5 ${service.badge === 'New' ? 'bg-purple-500' : 'bg-blue-500'}`}>
                      {service.badge}
                    </Badge>
                  )}
                </div>
                <CardTitle className="text-base font-semibold leading-tight">{service.title}</CardTitle>
                <CardDescription className="text-xs text-gray-600 line-clamp-2">{service.description}</CardDescription>
              </CardHeader>
              <CardContent className="py-2 px-4 flex-grow">
                <ul className="space-y-1">
                  {service.features.slice(0, 3).map((feature, index) => (
                    <li key={index} className="flex items-center text-xs">
                      <svg className="w-3 h-3 mr-1 text-green-500 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                      </svg>
                      <span className="text-gray-700">{feature}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
              <CardFooter className="pt-2 mt-auto p-4">
                <Button asChild variant="ghost" className="w-full justify-between text-xs p-0 h-8 group">
                  <Link to={service.link} className="flex items-center">
                    Learn more
                    <ArrowRight className="ml-1 h-3 w-3 transition-transform group-hover:translate-x-1" />
                  </Link>
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ServiceTiles;
