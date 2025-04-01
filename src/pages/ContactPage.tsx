
import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import ContactForm from '@/components/ContactForm';
import ContactInfo from '@/components/contact/ContactInfo';
import CircuitBackground from '@/components/CircuitBackground';
import { Button } from '@/components/ui/button';
import { Helmet } from 'react-helmet';
import HeroBackground from '@/components/hero/HeroBackground';
import { useScrollToTop } from '@/hooks/useScrollToTop';
import { ArrowRight } from 'lucide-react';
import ClientShowcaseSection from '@/components/home/ClientShowcaseSection';

const ContactPage = () => {
  // Scroll to top on page load
  useScrollToTop();
  
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
        <title>Contact Us | InnovateHub Inc.</title>
        <meta name="description" content="Reach out and let's co-create your digital future. We're here to help transform your business with innovative technology solutions." />
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
        pattern="circuit-branches" 
        className="fixed top-1/3 left-1/4" 
        size="md" 
        opacity={0.1}
      />
      
      {/* Main content */}
      <Navbar />
      <div className="w-full py-0">
        <section className="relative py-12 md:py-20 px-6 md:px-12 lg:px-16 overflow-hidden bg-gradient-to-b from-blue-800 to-blue-900 text-white">
          <HeroBackground />
          
          <div className="container mx-auto relative z-10">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
              <div className="max-w-2xl fade-up">
                <span className="inline-block px-3 py-1 text-sm font-medium bg-white/10 text-blue-200 rounded-full mb-4 animate-fade-in" style={{animationDelay: '100ms'}}>
                  Get In Touch
                </span>
                <h1 className="text-4xl md:text-5xl font-bold mb-4 text-white animate-fade-in" style={{animationDelay: '200ms'}}>
                  Ready to Collaborate? <span className="text-blue-300">Let's Talk!</span>
                </h1>
                <p className="text-lg text-blue-100 mb-6 animate-fade-in" style={{animationDelay: '300ms'}}>
                  Reach out and let's co-create your digital future. We're here to help transform your business with innovative technology solutions.
                </p>
                
                <div className="flex flex-col sm:flex-row gap-4">
                  <Button asChild className="bg-blue-600 hover:bg-blue-700 text-white btn-shine animate-fade-in" style={{animationDelay: '400ms'}}>
                    <Link to="/inquiry">Service-Specific Inquiries</Link>
                  </Button>
                  
                  <Button asChild variant="outline" className="bg-transparent border-white/20 text-white hover:bg-white/10 animate-fade-in" style={{animationDelay: '500ms'}}>
                    <a href="tel:+639176851216" className="flex items-center gap-2">
                      Call Us Directly <ArrowRight className="h-4 w-4" />
                    </a>
                  </Button>
                </div>
                
                <div className="mt-8 flex items-center gap-6 text-blue-200 animate-fade-in" style={{animationDelay: '600ms'}}>
                  <div className="flex items-center">
                    <span className="h-5 w-5 mr-2 text-blue-300">•</span>
                    Quick Response
                  </div>
                  <div className="flex items-center">
                    <span className="h-5 w-5 mr-2 text-blue-300">•</span>
                    Expert Consultation
                  </div>
                </div>
              </div>
              
              <div className="relative hidden lg:block">
                <div className="absolute inset-0 bg-gradient-to-br from-blue-500/20 to-blue-500/20 rounded-lg blur-xl"></div>
                <img 
                  src="/lovable-uploads/50c0b0cb-18bb-408d-a179-75d6900152c8.png" 
                  alt="Contact Us - Connected Digital Devices" 
                  className="relative z-10 rounded-lg shadow-lg object-cover w-full h-auto transform hover:scale-105 transition-all duration-500"
                />
              </div>
            </div>
          </div>
        </section>
        
        <section className="py-16 px-6 md:px-12 lg:px-24 bg-gray-50">
          <div className="container mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
              <ContactInfo />
              <ContactForm />
            </div>
          </div>
        </section>
        
        <ClientShowcaseSection />
        
        <Footer />
      </div>
    </div>
  );
};

export default ContactPage;
