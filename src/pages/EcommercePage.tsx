
import React, { useEffect } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import ContactSection from '@/components/ContactSection';
import CircuitBackground from '@/components/CircuitBackground';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { ArrowRight, CreditCard, Layers, BarChart3, Package, ShoppingBag, ShoppingCart, Store, Truck, Users } from 'lucide-react';
import { toast } from 'sonner';

const EcommercePage = () => {
  // Add scroll reveal effect
  useEffect(() => {
    const handleScroll = () => {
      const fadeElements = document.querySelectorAll('.fade-up');
      
      fadeElements.forEach(element => {
        const elementPosition = element.getBoundingClientRect().top;
        const screenHeight = window.innerHeight;
        
        if (elementPosition < screenHeight * 0.9) {
          element.classList.add('fade-in');
        }
      });
    };
    
    // Initial check
    handleScroll();
    
    // Add scroll event listener
    window.addEventListener('scroll', handleScroll);
    
    // Clean up listener
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const ecommerceServices = [
    {
      title: "Online Store Development",
      description: "Custom e-commerce websites built on powerful platforms, designed to showcase your products and maximize conversions.",
      icon: <Store className="h-10 w-10" />,
      features: [
        "Responsive mobile-friendly design",
        "Customized product catalogs",
        "SEO optimization",
        "User experience focused"
      ]
    },
    {
      title: "Payment Integration",
      description: "Seamless integration with popular payment gateways to provide secure and convenient checkout experiences.",
      icon: <CreditCard className="h-10 w-10" />,
      features: [
        "Multiple payment options",
        "Secure transaction processing",
        "International payment support",
        "Subscription billing capabilities"
      ]
    },
    {
      title: "Order Management",
      description: "Robust order processing systems that streamline fulfillment and keep your customers informed.",
      icon: <Package className="h-10 w-10" />,
      features: [
        "Automated order processing",
        "Inventory synchronization",
        "Order status tracking",
        "Return management system"
      ]
    },
    {
      title: "Inventory Control",
      description: "Advanced inventory management solutions to optimize stock levels and prevent overselling.",
      icon: <Layers className="h-10 w-10" />,
      features: [
        "Real-time inventory tracking",
        "Low stock alerts",
        "Multi-location inventory",
        "Supplier management"
      ]
    },
    {
      title: "Marketing Automation",
      description: "Integrated marketing tools to help you attract customers and boost sales through targeted campaigns.",
      icon: <Users className="h-10 w-10" />,
      features: [
        "Email marketing integration",
        "Abandoned cart recovery",
        "Personalized recommendations",
        "Loyalty programs"
      ]
    },
    {
      title: "Analytics & Reporting",
      description: "Comprehensive analytics to track performance and make data-driven decisions for your e-commerce business.",
      icon: <BarChart3 className="h-10 w-10" />,
      features: [
        "Sales and revenue tracking",
        "Customer behavior analysis",
        "Product performance metrics",
        "Customizable dashboards"
      ]
    }
  ];

  return (
    <div className="min-h-screen w-full overflow-x-hidden relative bg-gradient-to-b from-gray-50 to-white">
      {/* Background patterns */}
      <CircuitBackground 
        pattern="curvy-line" 
        className="fixed top-0 right-0" 
        size="lg" 
        opacity={0.1} 
        color="primary"
      />
      
      <CircuitBackground 
        pattern="dotted-grid" 
        className="fixed top-1/4 right-1/4" 
        size="md" 
        opacity={0.1}
      />
      
      {/* Main content */}
      <Navbar />
      
      <main className="w-full pt-16">
        {/* Hero Section */}
        <section className="relative py-28 px-6 md:px-12 lg:px-24 overflow-hidden">
          <div className="container mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div className="max-w-4xl mx-auto lg:mx-0 relative z-10">
                <span className="inline-block px-4 py-1.5 text-sm font-medium bg-emerald-100 text-emerald-800 rounded-full mb-6 animate-fade-in shadow-sm">
                  E-Commerce Development
                </span>
                <h1 className="text-5xl md:text-6xl font-bold mb-6 hero-text-gradient animate-fade-in" style={{ animationDelay: '100ms' }}>
                  Complete Online Store Solutions
                </h1>
                <p className="text-xl md:text-2xl font-light text-gray-600 mb-10 animate-fade-in" style={{ animationDelay: '200ms' }}>
                  Turn your products and services into a thriving online business with our end-to-end e-commerce solutions.
                </p>
                
                <div className="flex flex-wrap gap-4 animate-fade-in" style={{ animationDelay: '300ms' }}>
                  <Button 
                    size="lg" 
                    className="bg-emerald-600 hover:bg-emerald-700 text-white btn-shine shadow-md hover:shadow-lg"
                    onClick={() => {
                      toast.success("Request sent", {
                        description: "We'll get back to you shortly to discuss your e-commerce project."
                      });
                    }}
                  >
                    Start Your Online Store
                  </Button>
                  <Button 
                    size="lg" 
                    variant="outline"
                    className="border-emerald-200 text-emerald-700 hover:bg-emerald-50"
                    onClick={() => {
                      document.getElementById('services')?.scrollIntoView({ behavior: 'smooth' });
                    }}
                  >
                    Explore Services
                  </Button>
                </div>
              </div>
              
              <div className="relative mx-auto max-w-md lg:max-w-full">
                <div className="absolute inset-0 bg-gradient-to-r from-emerald-300/20 to-teal-400/20 rounded-xl blur-2xl transform scale-110"></div>
                <div className="relative z-10">
                  <img 
                    src="/lovable-uploads/3b14d46c-6679-4438-823c-ee06dcdf794c.png" 
                    alt="E-commerce Development Illustration" 
                    className="w-full h-auto transform hover:scale-105 transition-transform duration-700"
                  />
                </div>
              </div>
            </div>
          </div>
        </section>
        
        {/* Services Section */}
        <section id="services" className="py-20 px-6 md:px-12">
          <div className="container mx-auto">
            <div className="text-center mb-16 fade-up">
              <span className="inline-block px-3 py-1 text-sm font-medium bg-emerald-100 text-emerald-800 rounded-full mb-4">
                Our Services
              </span>
              <h2 className="text-3xl md:text-4xl font-bold mb-6">Comprehensive E-Commerce Solutions</h2>
              <p className="text-gray-600 max-w-3xl mx-auto">
                From store setup to management and growth, we provide all the services you need to succeed in the digital marketplace.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {ecommerceServices.map((service, index) => (
                <Card 
                  key={index} 
                  className="p-8 hover:shadow-lg transition-all duration-300 border border-gray-200 hover:border-emerald-200 fade-up"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <div className="text-emerald-600 mb-4 w-16 h-16 rounded-xl flex items-center justify-center bg-emerald-100">
                    {service.icon}
                  </div>
                  <h3 className="text-xl font-semibold mb-3">{service.title}</h3>
                  <p className="text-gray-600 mb-6">{service.description}</p>
                  
                  <div className="mb-6">
                    <h4 className="text-sm font-semibold text-gray-700 mb-3">Key Features:</h4>
                    <ul className="space-y-2">
                      {service.features.map((feature, idx) => (
                        <li key={idx} className="flex items-start">
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-emerald-600 mt-0.5" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                          </svg>
                          <span className="ml-2 text-gray-700">{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  
                  <Button 
                    variant="link" 
                    className="text-emerald-600 hover:text-emerald-800 p-0 h-auto flex items-center"
                    onClick={() => {
                      toast.success(`Learn more about ${service.title}`, {
                        description: "We'll share detailed information about this service."
                      });
                    }}
                  >
                    Learn More
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </Card>
              ))}
            </div>
          </div>
        </section>
        
        {/* E-Commerce Journey Section */}
        <section className="py-20 px-6 md:px-12 bg-gray-50">
          <div className="container mx-auto">
            <div className="text-center mb-16 fade-up">
              <span className="inline-block px-3 py-1 text-sm font-medium bg-emerald-100 text-emerald-800 rounded-full mb-4">
                Your E-Commerce Journey
              </span>
              <h2 className="text-3xl md:text-4xl font-bold mb-6">From Concept to Thriving Online Business</h2>
              <p className="text-gray-600 max-w-3xl mx-auto">
                We guide you through every step of establishing and growing your online store.
              </p>
            </div>
            
            <div className="relative">
              {/* Connecting line */}
              <div className="absolute left-1/2 top-0 bottom-0 w-1 bg-emerald-200 hidden md:block transform -translate-x-1/2"></div>
              
              <div className="space-y-12 relative">
                {[
                  {
                    step: "01",
                    title: "Strategy & Planning",
                    description: "We begin by understanding your business goals, target audience, and products to create a tailored e-commerce strategy.",
                    icon: <ShoppingBag className="h-8 w-8" />
                  },
                  {
                    step: "02",
                    title: "Design & Development",
                    description: "Our team designs and builds your online store with a focus on user experience, brand identity, and conversion optimization.",
                    icon: <Store className="h-8 w-8" />
                  },
                  {
                    step: "03",
                    title: "Integration & Testing",
                    description: "We integrate payment gateways, shipping methods, and other necessary tools, then thoroughly test everything before launch.",
                    icon: <ShoppingCart className="h-8 w-8" />
                  },
                  {
                    step: "04",
                    title: "Launch & Growth",
                    description: "After a successful launch, we help you implement marketing strategies to drive traffic and increase sales.",
                    icon: <Truck className="h-8 w-8" />
                  }
                ].map((phase, index) => (
                  <div 
                    key={index} 
                    className={`relative flex flex-col md:flex-row ${index % 2 !== 0 ? 'md:flex-row-reverse' : ''} items-center fade-up`}
                    style={{ animationDelay: `${index * 100}ms` }}
                  >
                    {/* Circle marker on the timeline */}
                    <div className="absolute left-1/2 w-8 h-8 bg-emerald-500 rounded-full hidden md:flex items-center justify-center text-white font-bold transform -translate-x-1/2">
                      {phase.step}
                    </div>
                    
                    <div className={`md:w-1/2 p-6 ${index % 2 === 0 ? 'md:pr-16 md:text-right' : 'md:pl-16'}`}>
                      <div className={`p-6 bg-white rounded-xl shadow-sm border border-emerald-100 ${index % 2 === 0 ? 'ml-auto' : 'mr-auto'} max-w-lg`}>
                        <div className="md:hidden mb-4 p-4 bg-emerald-500 text-white rounded-full inline-flex items-center justify-center font-bold w-8 h-8">
                          {phase.step}
                        </div>
                        <div className="mb-4 p-4 bg-emerald-50 rounded-lg inline-block text-emerald-600">
                          {phase.icon}
                        </div>
                        <h3 className="text-xl font-semibold mb-3">{phase.title}</h3>
                        <p className="text-gray-600">{phase.description}</p>
                      </div>
                    </div>
                    
                    <div className="hidden md:block md:w-1/2"></div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>
        
        {/* CTA Section */}
        <section className="py-24 px-6 md:px-12 bg-gradient-to-r from-emerald-900 to-teal-800 text-white">
          <div className="container mx-auto">
            <div className="max-w-4xl mx-auto text-center fade-up">
              <span className="inline-block px-4 py-1.5 text-sm font-medium bg-white/20 text-white rounded-full mb-6">
                Start Selling Online
              </span>
              <h2 className="text-3xl md:text-4xl font-bold mb-6">Ready to Launch Your E-Commerce Store?</h2>
              <p className="text-xl opacity-90 mb-10 max-w-2xl mx-auto">
                Let's build a powerful online store that showcases your products and converts visitors into customers.
              </p>
              
              <div className="flex flex-wrap justify-center gap-4">
                <Button 
                  size="lg" 
                  className="bg-white text-emerald-900 hover:bg-gray-100 btn-shine"
                  onClick={() => {
                    toast.success("Contact form opened", {
                      description: "Fill out the form below to get in touch with our team."
                    });
                  }}
                >
                  Get a Free Consultation
                </Button>
                <Button 
                  size="lg" 
                  variant="outline" 
                  className="border-white text-white hover:bg-white/10"
                  onClick={() => {
                    toast.success("Case studies request sent", {
                      description: "We'll send you our e-commerce case studies shortly."
                    });
                  }}
                >
                  View Case Studies
                </Button>
              </div>
            </div>
          </div>
        </section>
        
        <ContactSection />
        <Footer />
      </main>
    </div>
  );
};

export default EcommercePage;
