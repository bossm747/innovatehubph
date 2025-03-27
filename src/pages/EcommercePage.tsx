
import React, { useEffect } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import ContactSection from '@/components/ContactSection';
import CircuitBackground from '@/components/CircuitBackground';
import { ShoppingBag, ArrowRight, Check } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Toaster } from 'sonner';
import { toast } from 'sonner';

const EcommercePage = () => {
  // Scroll reveal effect
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

  return (
    <div className="min-h-screen w-full overflow-x-hidden relative bg-gradient-to-b from-gray-50 to-white">
      <Toaster position="top-right" />
      
      {/* Background patterns */}
      <CircuitBackground 
        pattern="curvy-line" 
        className="fixed top-0 right-0" 
        size="lg" 
        opacity={0.1} 
        color="primary"
      />
      
      <CircuitBackground 
        pattern="blue-curve" 
        className="fixed -bottom-40 -left-40" 
        size="xl" 
        opacity={0.2} 
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
        <section className="relative py-28 px-6 md:px-12 lg:px-24 bg-gradient-to-r from-emerald-500/10 to-teal-700/10 overflow-hidden">
          <div className="container mx-auto">
            <div className="max-w-4xl mx-auto text-center relative z-10">
              <span className="inline-block px-4 py-1.5 text-sm font-medium bg-emerald-100 text-emerald-800 rounded-full mb-6 animate-fade-in shadow-sm">
                E-Commerce Solutions
              </span>
              <h1 className="text-5xl md:text-6xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-emerald-500 to-teal-700 animate-fade-in" style={{ animationDelay: '100ms' }}>
                E-Commerce Development
              </h1>
              <p className="text-xl md:text-2xl font-light text-gray-600 mb-10 animate-fade-in" style={{ animationDelay: '200ms' }}>
                Complete Online Store Solutions for Modern Businesses
              </p>
              
              <div className="flex justify-center gap-4 animate-fade-in" style={{ animationDelay: '300ms' }}>
                <Button 
                  size="lg" 
                  className="bg-emerald-600 hover:bg-emerald-700 text-white shadow-lg hover:shadow-xl transition-all duration-300"
                  onClick={() => {
                    document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
                  }}
                >
                  Get Started
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
                <Button 
                  variant="outline" 
                  size="lg" 
                  className="border-emerald-200 text-emerald-700 hover:bg-emerald-50 shadow-sm"
                  onClick={() => {
                    toast.success("Demo request sent", {
                      description: "We'll contact you shortly with more information."
                    });
                  }}
                >
                  Request a Demo
                </Button>
              </div>
            </div>
          </div>
          
          {/* Background decorative elements */}
          <div className="absolute top-20 left-20 w-64 h-64 bg-emerald-300/20 rounded-full blur-3xl"></div>
          <div className="absolute bottom-20 right-20 w-80 h-80 bg-teal-400/20 rounded-full blur-3xl"></div>
          
          {/* Hero image */}
          <div className="mt-20 relative max-w-6xl mx-auto overflow-visible">
            <div className="absolute inset-0 -z-10 bg-gradient-to-r from-emerald-300/20 to-teal-500/20 rounded-xl blur-2xl transform scale-110"></div>
            <div className="overflow-hidden rounded-xl shadow-2xl relative border border-white/20 transition-all duration-500 hover:shadow-emerald-500/20">
              <img 
                src="/lovable-uploads/3113cd1e-8a6f-4c4b-b8a8-c7e24d9aa394.png" 
                alt="E-Commerce Development" 
                className="w-full h-auto relative z-10 transform transition-transform duration-700 hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-emerald-900/30 to-transparent z-20"></div>
            </div>
          </div>
        </section>
        
        {/* Features Section */}
        <section className="py-20 px-6 md:px-12 bg-white">
          <div className="container mx-auto">
            <div className="text-center mb-16 fade-up">
              <span className="inline-block px-3 py-1 text-sm font-medium bg-emerald-100 text-emerald-800 rounded-full mb-4">
                Our Offerings
              </span>
              <h2 className="text-3xl md:text-4xl font-bold mb-6">Complete E-Commerce Solutions</h2>
              <p className="text-gray-600 max-w-3xl mx-auto">
                We provide end-to-end e-commerce solutions to help your business sell online effectively and efficiently.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
              {[
                {
                  icon: <ShoppingBag className="h-10 w-10" />,
                  title: "Online Stores",
                  description: "Custom-designed online stores that reflect your brand identity and offer seamless shopping experiences."
                },
                {
                  icon: <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2z" />
                  </svg>,
                  title: "Payment Integration",
                  description: "Secure and diverse payment options integration to provide convenience to your customers."
                },
                {
                  icon: <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 8v8m-4-5v5m-4-2v2m-2 4h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>,
                  title: "Order Management",
                  description: "Efficient systems to manage orders, track fulfillment, and handle customer requests."
                },
                {
                  icon: <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4" />
                  </svg>,
                  title: "Inventory Control",
                  description: "Automated inventory management to keep track of stock levels and prevent overselling."
                },
                {
                  icon: <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5.882V19.24a1.76 1.76 0 01-3.417.592l-2.147-6.15M18 13a3 3 0 100-6M5.436 13.683A4.001 4.001 0 017 6h1.832c4.1 0 7.625-1.234 9.168-3v14c-1.543-1.766-5.067-3-9.168-3H7a3.988 3.988 0 01-1.564-.317z" />
                  </svg>,
                  title: "Marketing Automation",
                  description: "Built-in marketing tools to promote your products and increase sales through various channels."
                },
                {
                  icon: <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 17v-2m3 2v-4m3 4v-6m2 10H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>,
                  title: "Analytics & Reporting",
                  description: "Comprehensive analytics to track performance and make data-driven business decisions."
                }
              ].map((feature, index) => (
                <div 
                  key={index} 
                  className="bg-white p-8 rounded-xl shadow-soft border border-gray-100 hover:shadow-md transition-all duration-300 fade-up"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <div className="w-16 h-16 rounded-xl flex items-center justify-center mb-6 text-white bg-gradient-to-r from-emerald-500 to-teal-700 shadow-md">
                    {feature.icon}
                  </div>
                  <h3 className="text-xl font-semibold mb-3">{feature.title}</h3>
                  <p className="text-gray-600">{feature.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
        
        {/* Platforms Section */}
        <section className="py-20 px-6 md:px-12 bg-gray-50">
          <div className="container mx-auto">
            <div className="text-center mb-16 fade-up">
              <span className="inline-block px-3 py-1 text-sm font-medium bg-emerald-100 text-emerald-800 rounded-full mb-4">
                E-Commerce Platforms
              </span>
              <h2 className="text-3xl md:text-4xl font-bold mb-6">Platforms We Work With</h2>
              <p className="text-gray-600 max-w-3xl mx-auto">
                We have expertise in developing e-commerce solutions on various platforms to suit your specific requirements.
              </p>
            </div>
            
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
              {[
                {
                  name: "Shopify",
                  logo: "https://www.vectorlogo.zone/logos/shopify/shopify-ar21.svg",
                  bgColor: "bg-green-50"
                },
                {
                  name: "WooCommerce",
                  logo: "https://www.vectorlogo.zone/logos/woocommerce/woocommerce-ar21.svg",
                  bgColor: "bg-purple-50"
                },
                {
                  name: "Magento",
                  logo: "https://www.vectorlogo.zone/logos/magento/magento-ar21.svg",
                  bgColor: "bg-orange-50"
                },
                {
                  name: "BigCommerce",
                  logo: "https://www.vectorlogo.zone/logos/bigcommerce/bigcommerce-ar21.svg",
                  bgColor: "bg-blue-50"
                },
                {
                  name: "PrestaShop",
                  logo: "https://www.vectorlogo.zone/logos/prestashop/prestashop-ar21.svg",
                  bgColor: "bg-indigo-50"
                },
                {
                  name: "Custom Solutions",
                  icon: <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 text-emerald-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
                  </svg>,
                  bgColor: "bg-teal-50"
                }
              ].map((platform, index) => (
                <div 
                  key={index} 
                  className={`${platform.bgColor} p-6 rounded-xl flex items-center justify-center h-32 border border-gray-100 hover:shadow-md transition-all duration-300 fade-up`}
                  style={{ animationDelay: `${index * 50}ms` }}
                >
                  {platform.logo ? (
                    <img src={platform.logo} alt={platform.name} className="h-12 max-w-full object-contain" />
                  ) : platform.icon}
                </div>
              ))}
            </div>
          </div>
        </section>
        
        {/* Process Section */}
        <section className="py-20 px-6 md:px-12 bg-white">
          <div className="container mx-auto">
            <div className="text-center mb-16 fade-up">
              <span className="inline-block px-3 py-1 text-sm font-medium bg-emerald-100 text-emerald-800 rounded-full mb-4">
                Development Process
              </span>
              <h2 className="text-3xl md:text-4xl font-bold mb-6">Our E-Commerce Development Approach</h2>
              <p className="text-gray-600 max-w-3xl mx-auto">
                We follow a structured approach to create effective e-commerce solutions tailored to your business needs.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                {
                  number: "01",
                  title: "Discovery",
                  description: "Understanding your business model, target audience, and specific e-commerce requirements."
                },
                {
                  number: "02",
                  title: "Design",
                  description: "Creating user-friendly interfaces and seamless shopping experiences that convert visitors into customers."
                },
                {
                  number: "03",
                  title: "Development",
                  description: "Building robust e-commerce platforms with secure payment gateways and efficient management systems."
                },
                {
                  number: "04",
                  title: "Launch & Support",
                  description: "Deploying your online store and providing ongoing maintenance and optimization services."
                }
              ].map((step, index) => (
                <div 
                  key={index} 
                  className="relative p-8 rounded-xl border border-gray-100 bg-white shadow-soft hover:shadow-md transition-all duration-300 fade-up"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <span className="absolute -top-5 -left-5 w-12 h-12 rounded-full bg-gradient-to-r from-emerald-500 to-teal-700 flex items-center justify-center text-white font-bold text-sm">
                    {step.number}
                  </span>
                  <h3 className="text-xl font-semibold mb-3 mt-3">{step.title}</h3>
                  <p className="text-gray-600">{step.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
        
        {/* Benefits Section */}
        <section className="py-20 px-6 md:px-12 bg-gray-50">
          <div className="container mx-auto">
            <div className="text-center mb-16 fade-up">
              <span className="inline-block px-3 py-1 text-sm font-medium bg-emerald-100 text-emerald-800 rounded-full mb-4">
                Benefits
              </span>
              <h2 className="text-3xl md:text-4xl font-bold mb-6">Why Choose Our E-Commerce Solutions</h2>
              <p className="text-gray-600 max-w-3xl mx-auto">
                Our e-commerce development services offer numerous advantages that help your business thrive in the online marketplace.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {[
                {
                  title: "Increased Sales",
                  description: "Expand your market reach and generate more revenue through effective online sales channels."
                },
                {
                  title: "Enhanced Customer Experience",
                  description: "Provide seamless shopping experiences that keep customers coming back to your store."
                },
                {
                  title: "Mobile Optimization",
                  description: "Reach customers on any device with responsive designs optimized for mobile shopping."
                },
                {
                  title: "Scalability",
                  description: "Easily scale your online store as your business grows without major overhauls."
                },
                {
                  title: "Data-Driven Insights",
                  description: "Gain valuable insights into customer behavior and preferences to optimize your strategy."
                },
                {
                  title: "24/7 Sales Channel",
                  description: "Your online store operates round the clock, generating sales even when you're not working."
                }
              ].map((benefit, index) => (
                <div 
                  key={index} 
                  className="flex items-start fade-up"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <div className="flex-shrink-0 mr-4">
                    <div className="w-8 h-8 rounded-full bg-emerald-100 flex items-center justify-center text-emerald-600">
                      <Check className="h-5 w-5" />
                    </div>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold mb-2">{benefit.title}</h3>
                    <p className="text-gray-600">{benefit.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
        
        {/* CTA Section */}
        <section className="py-20 px-6 md:px-12 bg-gradient-to-r from-emerald-500 to-teal-700 text-white">
          <div className="container mx-auto max-w-4xl text-center fade-up">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">Ready to Build Your Online Store?</h2>
            <p className="text-white/80 text-lg mb-10 max-w-3xl mx-auto">
              Let's create an e-commerce solution that helps your business reach more customers and boost sales.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button 
                size="lg" 
                className="bg-white text-emerald-700 hover:bg-gray-100 shadow-lg hover:shadow-xl transition-all duration-300"
                onClick={() => {
                  document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
                }}
              >
                Start Your E-Commerce Journey
              </Button>
              <Button 
                variant="outline" 
                size="lg" 
                className="border-white/30 text-white hover:bg-white/10"
                onClick={() => {
                  toast.success("Demo request sent", {
                    description: "We'll contact you shortly with more information."
                  });
                }}
              >
                Schedule a Consultation
              </Button>
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
