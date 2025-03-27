
import React, { useEffect } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import ContactSection from '@/components/ContactSection';
import CircuitBackground from '@/components/CircuitBackground';
import { Cpu, ArrowRight, Check } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Toaster } from 'sonner';
import { toast } from 'sonner';

const DigitalCustomizationsPage = () => {
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
        <section className="relative py-28 px-6 md:px-12 lg:px-24 bg-gradient-to-r from-purple-500/10 to-indigo-700/10 overflow-hidden">
          <div className="container mx-auto">
            <div className="max-w-4xl mx-auto text-center relative z-10">
              <span className="inline-block px-4 py-1.5 text-sm font-medium bg-purple-100 text-purple-800 rounded-full mb-6 animate-fade-in shadow-sm">
                Digital Solutions
              </span>
              <h1 className="text-5xl md:text-6xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-purple-500 to-indigo-700 animate-fade-in" style={{ animationDelay: '100ms' }}>
                Digital Customizations
              </h1>
              <p className="text-xl md:text-2xl font-light text-gray-600 mb-10 animate-fade-in" style={{ animationDelay: '200ms' }}>
                Tailored Digital Solutions for Your Business
              </p>
              
              <div className="flex justify-center gap-4 animate-fade-in" style={{ animationDelay: '300ms' }}>
                <Button 
                  size="lg" 
                  className="bg-purple-600 hover:bg-purple-700 text-white shadow-lg hover:shadow-xl transition-all duration-300"
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
                  className="border-purple-200 text-purple-700 hover:bg-purple-50 shadow-sm"
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
          <div className="absolute top-20 left-20 w-64 h-64 bg-purple-300/20 rounded-full blur-3xl"></div>
          <div className="absolute bottom-20 right-20 w-80 h-80 bg-indigo-400/20 rounded-full blur-3xl"></div>
          
          {/* Hero image */}
          <div className="mt-20 relative max-w-6xl mx-auto overflow-visible">
            <div className="absolute inset-0 -z-10 bg-gradient-to-r from-purple-300/20 to-indigo-500/20 rounded-xl blur-2xl transform scale-110"></div>
            <div className="overflow-hidden rounded-xl shadow-2xl relative border border-white/20 transition-all duration-500 hover:shadow-purple-500/20">
              <img 
                src="/lovable-uploads/a2eb57ca-42be-4d9e-9770-cd7f0b98796c.png" 
                alt="Digital Customizations" 
                className="w-full h-auto relative z-10 transform transition-transform duration-700 hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-purple-900/30 to-transparent z-20"></div>
            </div>
          </div>
        </section>
        
        {/* Features Section */}
        <section className="py-20 px-6 md:px-12 bg-white">
          <div className="container mx-auto">
            <div className="text-center mb-16 fade-up">
              <span className="inline-block px-3 py-1 text-sm font-medium bg-purple-100 text-purple-800 rounded-full mb-4">
                Our Approach
              </span>
              <h2 className="text-3xl md:text-4xl font-bold mb-6">Customized Digital Solutions</h2>
              <p className="text-gray-600 max-w-3xl mx-auto">
                Our digital customization services are designed to help your business thrive in the 
                digital landscape with tailored solutions that meet your specific needs.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
              {[
                {
                  icon: <Cpu className="h-10 w-10" />,
                  title: "Custom Software",
                  description: "Bespoke software solutions designed specifically for your business needs and processes."
                },
                {
                  icon: <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                  </svg>,
                  title: "Business Model Development",
                  description: "Strategic planning and implementation of digital business models for sustainable growth."
                },
                {
                  icon: <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 3.055A9.001 9.001 0 1020.945 13H11V3.055z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.488 9H15V3.512A9.025 9.025 0 0120.488 9z" />
                  </svg>,
                  title: "Strategic IT Consulting",
                  description: "Expert advice on technology selection, implementation, and management."
                },
                {
                  icon: <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                  </svg>,
                  title: "Digital Transformation",
                  description: "End-to-end transformation of your business operations using digital technologies."
                },
                {
                  icon: <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>,
                  title: "System Integration",
                  description: "Seamless integration of different software systems to ensure smooth operation."
                },
                {
                  icon: <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                  </svg>,
                  title: "Security Solutions",
                  description: "Implementation of robust security measures to protect your digital assets."
                }
              ].map((feature, index) => (
                <div 
                  key={index} 
                  className="bg-white p-8 rounded-xl shadow-soft border border-gray-100 hover:shadow-md transition-all duration-300 fade-up"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <div className="w-16 h-16 rounded-xl flex items-center justify-center mb-6 text-white bg-gradient-to-r from-purple-500 to-indigo-700 shadow-md">
                    {feature.icon}
                  </div>
                  <h3 className="text-xl font-semibold mb-3">{feature.title}</h3>
                  <p className="text-gray-600">{feature.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
        
        {/* Case Studies Section */}
        <section className="py-20 px-6 md:px-12 bg-gray-50">
          <div className="container mx-auto">
            <div className="text-center mb-16 fade-up">
              <span className="inline-block px-3 py-1 text-sm font-medium bg-purple-100 text-purple-800 rounded-full mb-4">
                Success Stories
              </span>
              <h2 className="text-3xl md:text-4xl font-bold mb-6">Our Digital Transformation Case Studies</h2>
              <p className="text-gray-600 max-w-3xl mx-auto">
                See how our digital customization solutions have helped businesses across different industries.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
              {[
                {
                  title: "Financial Services App Modernization",
                  description: "Helped a financial institution modernize their legacy systems, resulting in 30% faster transaction processing and improved customer satisfaction.",
                  image: "/lovable-uploads/c482324a-e57b-4e5c-a15a-137cf7868b9a.png"
                },
                {
                  title: "Healthcare Provider Digital Transformation",
                  description: "Implemented a custom patient management system that reduced administrative workload by 45% and improved patient care coordination.",
                  image: "/lovable-uploads/706dbe13-1f9f-4249-893e-f7d9022624f2.png"
                }
              ].map((caseStudy, index) => (
                <div 
                  key={index} 
                  className="bg-white rounded-xl overflow-hidden shadow-md hover:shadow-lg transition-all duration-300 fade-up"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <div className="relative h-60">
                    <img 
                      src={caseStudy.image} 
                      alt={caseStudy.title} 
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                    <h3 className="absolute bottom-0 left-0 text-white text-xl font-semibold p-6">{caseStudy.title}</h3>
                  </div>
                  <div className="p-6">
                    <p className="text-gray-600 mb-4">{caseStudy.description}</p>
                    <Button 
                      variant="link" 
                      className="text-purple-600 hover:text-purple-800 p-0 h-auto flex items-center"
                      onClick={() => {
                        toast.info("Case study details", {
                          description: "Full case study coming soon. Contact us for more information."
                        });
                      }}
                    >
                      Read Full Case Study
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
        
        {/* Process Section */}
        <section className="py-20 px-6 md:px-12 bg-white">
          <div className="container mx-auto">
            <div className="text-center mb-16 fade-up">
              <span className="inline-block px-3 py-1 text-sm font-medium bg-purple-100 text-purple-800 rounded-full mb-4">
                Our Process
              </span>
              <h2 className="text-3xl md:text-4xl font-bold mb-6">How We Work</h2>
              <p className="text-gray-600 max-w-3xl mx-auto">
                Our structured approach ensures we deliver digital customization solutions that perfectly match your business needs.
              </p>
            </div>
            
            <div className="relative max-w-4xl mx-auto">
              {/* Line connecting steps */}
              <div className="absolute left-[38px] top-0 bottom-0 w-1 bg-gradient-to-b from-purple-500 to-indigo-700 ml-px hidden md:block"></div>
              
              {[
                {
                  title: "Discovery & Analysis",
                  description: "We start by understanding your business, challenges, and objectives through in-depth consultation."
                },
                {
                  title: "Solution Design",
                  description: "Our experts design a customized digital solution tailored to your specific requirements."
                },
                {
                  title: "Development & Integration",
                  description: "We develop the solution and integrate it seamlessly with your existing systems."
                },
                {
                  title: "Testing & Quality Assurance",
                  description: "Rigorous testing ensures the solution is robust, secure, and performs optimally."
                },
                {
                  title: "Deployment & Training",
                  description: "We deploy the solution and provide comprehensive training to your team."
                },
                {
                  title: "Ongoing Support & Optimization",
                  description: "Our relationship continues with ongoing support and continuous optimization."
                }
              ].map((step, index) => (
                <div 
                  key={index} 
                  className="flex items-start mb-10 fade-up"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <div className="flex-shrink-0 relative">
                    <div className="w-20 h-20 rounded-full bg-gradient-to-r from-purple-500 to-indigo-700 flex items-center justify-center text-white font-bold text-xl z-10 relative">
                      {index + 1}
                    </div>
                    <div className="absolute inset-0 rounded-full bg-purple-500 blur-md opacity-30 transform scale-110"></div>
                  </div>
                  <div className="ml-6 pt-2">
                    <h3 className="text-xl font-semibold mb-2">{step.title}</h3>
                    <p className="text-gray-600">{step.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
        
        {/* CTA Section */}
        <section className="py-20 px-6 md:px-12 bg-gradient-to-r from-purple-500 to-indigo-700 text-white">
          <div className="container mx-auto max-w-4xl text-center fade-up">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">Ready to Transform Your Business?</h2>
            <p className="text-white/80 text-lg mb-10 max-w-3xl mx-auto">
              Let's create customized digital solutions that drive growth, efficiency, and innovation for your business.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button 
                size="lg" 
                className="bg-white text-purple-700 hover:bg-gray-100 shadow-lg hover:shadow-xl transition-all duration-300"
                onClick={() => {
                  document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
                }}
              >
                Get Started Now
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
                Request a Custom Demo
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

export default DigitalCustomizationsPage;
