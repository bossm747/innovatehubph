
import React, { useEffect } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import ContactSection from '@/components/ContactSection';
import CircuitBackground from '@/components/CircuitBackground';
import { Helmet } from 'react-helmet';
import ClientsShowcase from '@/components/ClientsShowcase';
import HeroBackground from '@/components/hero/HeroBackground';

const ClientsPage = () => {
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

  return (
    <div className="min-h-screen w-full overflow-x-hidden relative">
      <Helmet>
        <title>Our Clients | InnovateHub Inc.</title>
        <meta name="description" content="Discover the success stories of businesses we've helped transform with our innovative technology solutions." />
      </Helmet>
      
      {/* Background patterns */}
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
        pattern="dotted-grid" 
        className="fixed top-1/3 left-1/4" 
        size="md" 
        opacity={0.1}
      />
      
      {/* Main content */}
      <Navbar />
      <div className="w-full py-0">
        <section className="relative py-12 px-6 md:px-12 lg:px-16 overflow-hidden bg-gradient-to-b from-blue-800 to-blue-900 text-white">
          <HeroBackground />
          
          <div className="container mx-auto relative z-10">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
              <div className="max-w-2xl fade-up">
                <span className="inline-block px-3 py-1 text-sm font-medium bg-white/10 text-blue-200 rounded-full mb-4 animate-fade-in" style={{animationDelay: '100ms'}}>
                  Our Clients
                </span>
                <h1 className="text-4xl md:text-5xl font-bold mb-4 text-white animate-fade-in" style={{animationDelay: '200ms'}}>
                  Partners in <span className="text-blue-300">Digital Success</span>
                </h1>
                <p className="text-lg text-blue-100 mb-6 animate-fade-in" style={{animationDelay: '300ms'}}>
                  Discover how we've helped businesses of all sizes transform their operations and achieve remarkable growth through innovative technology solutions.
                </p>
                
                <div className="mt-8 flex items-center gap-6 text-blue-200 animate-fade-in" style={{animationDelay: '500ms'}}>
                  <div className="flex items-center">
                    <span className="h-5 w-5 mr-2 text-blue-300">•</span>
                    Trusted Partnerships
                  </div>
                  <div className="flex items-center">
                    <span className="h-5 w-5 mr-2 text-blue-300">•</span>
                    Proven Results
                  </div>
                </div>
              </div>
              
              <div className="relative hidden lg:block">
                <div className="absolute inset-0 bg-gradient-to-br from-blue-500/20 to-blue-500/20 rounded-lg blur-xl"></div>
                <img 
                  src="/lovable-uploads/45881ff2-13a3-4bc4-a639-da000d90c94a.png" 
                  alt="Our Clients" 
                  className="relative z-10 rounded-lg shadow-lg object-cover w-full h-auto transform hover:scale-105 transition-all duration-500"
                />
              </div>
            </div>
          </div>
        </section>
        
        <ClientsShowcase />
        
        <ContactSection />
        <Footer />
      </div>
    </div>
  );
};

export default ClientsPage;
