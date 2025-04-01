
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
import { ArrowRight, Building2, MessageCircle, Phone } from 'lucide-react';
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
      
      {/* Background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <CircuitBackground 
          pattern="tech-circle" 
          className="absolute top-20 right-20" 
          size="lg" 
          opacity={0.1} 
          color="primary"
        />
        
        <CircuitBackground 
          pattern="blue-wave" 
          className="absolute -bottom-40 -left-40" 
          size="xl" 
          opacity={0.2} 
          color="primary"
        />
        
        <CircuitBackground 
          pattern="circuit-branches" 
          className="absolute top-1/3 left-1/4" 
          size="md" 
          opacity={0.1}
        />
      </div>
      
      {/* Main content */}
      <Navbar />
      <div className="w-full">
        {/* Hero Section */}
        <section className="relative py-20 md:py-24 lg:py-28 px-6 md:px-12 lg:px-16 overflow-hidden bg-gradient-to-b from-blue-900 to-indigo-900 text-white">
          <HeroBackground />
          
          <div className="container mx-auto relative z-10">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
              <div className="max-w-2xl">
                <div className="inline-flex items-center px-3 py-1 rounded-full bg-blue-800/50 border border-blue-700 mb-6 animate-fade-in" style={{animationDelay: '100ms'}}>
                  <span className="w-2 h-2 rounded-full bg-blue-400 mr-2"></span>
                  <span className="text-sm font-medium text-blue-300">We'd love to hear from you</span>
                </div>
                
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 animate-fade-in" style={{animationDelay: '200ms'}}>
                  Let's Start a <span className="text-blue-300">Conversation</span>
                </h1>
                
                <p className="text-lg text-blue-100 mb-8 max-w-xl animate-fade-in" style={{animationDelay: '300ms'}}>
                  Have a project in mind or questions about our services? Our team is ready to discuss how we can help transform your business with innovative technology solutions.
                </p>
                
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
                  <div className="flex items-center p-3 bg-white/10 rounded-lg backdrop-blur-sm border border-white/20 animate-fade-in" style={{animationDelay: '400ms'}}>
                    <div className="w-10 h-10 rounded-full bg-blue-600/30 flex items-center justify-center mr-3">
                      <MessageCircle className="w-5 h-5 text-blue-300" />
                    </div>
                    <div>
                      <h3 className="text-sm font-medium text-white">Chat With Us</h3>
                      <p className="text-xs text-blue-200">Quick Response</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center p-3 bg-white/10 rounded-lg backdrop-blur-sm border border-white/20 animate-fade-in" style={{animationDelay: '500ms'}}>
                    <div className="w-10 h-10 rounded-full bg-blue-600/30 flex items-center justify-center mr-3">
                      <Phone className="w-5 h-5 text-blue-300" />
                    </div>
                    <div>
                      <h3 className="text-sm font-medium text-white">Call Us</h3>
                      <p className="text-xs text-blue-200">Direct Support</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center p-3 bg-white/10 rounded-lg backdrop-blur-sm border border-white/20 animate-fade-in" style={{animationDelay: '600ms'}}>
                    <div className="w-10 h-10 rounded-full bg-blue-600/30 flex items-center justify-center mr-3">
                      <Building2 className="w-5 h-5 text-blue-300" />
                    </div>
                    <div>
                      <h3 className="text-sm font-medium text-white">Visit Us</h3>
                      <p className="text-xs text-blue-200">Meet in Person</p>
                    </div>
                  </div>
                </div>
                
                <div className="flex flex-col sm:flex-row gap-4">
                  <Button asChild className="bg-blue-600 hover:bg-blue-700 text-white btn-shine animate-fade-in" style={{animationDelay: '700ms'}}>
                    <a href="tel:+639176851216" className="flex items-center gap-2">
                      <Phone className="h-4 w-4" />
                      Call Us Directly
                    </a>
                  </Button>
                  
                  <Button asChild variant="outline" className="bg-transparent border-white/20 text-white hover:bg-white/10 animate-fade-in" style={{animationDelay: '800ms'}}>
                    <a href="mailto:businessdevelopment@innovatehub.ph" className="flex items-center gap-2">
                      <MessageCircle className="h-4 w-4" />
                      Send Email
                    </a>
                  </Button>
                </div>
              </div>
              
              <div className="relative hidden lg:block">
                <div className="absolute inset-0 bg-gradient-to-br from-blue-500/20 to-purple-500/20 rounded-lg blur-xl"></div>
                <img 
                  src="/lovable-uploads/50c0b0cb-18bb-408d-a179-75d6900152c8.png" 
                  alt="Contact Us - Connected Digital Devices" 
                  className="relative z-10 rounded-lg shadow-lg object-cover w-full h-auto transform hover:scale-105 transition-all duration-500"
                />
              </div>
            </div>
          </div>
        </section>
        
        {/* Contact Form and Info Section */}
        <section className="py-20 px-6 md:px-12 lg:px-24 bg-gradient-to-b from-gray-50 to-white">
          <div className="container mx-auto">
            <div className="text-center mb-16 fade-up">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">Get in Touch</h2>
              <p className="text-gray-600 max-w-2xl mx-auto">
                Reach out to us using the form below, and our team will respond to your inquiry as soon as possible.
              </p>
            </div>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
              <ContactForm />
              <ContactInfo />
            </div>
          </div>
        </section>
        
        {/* Map Section */}
        <section className="py-16 px-6 md:px-12 lg:px-24 bg-white">
          <div className="container mx-auto">
            <div className="bg-white rounded-xl shadow-soft overflow-hidden h-80 md:h-96 fade-up">
              <iframe 
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3870.321193931947!2d120.9157831!3d14.0634344!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x33bd78505318f7d7%3A0x6e5322e2b627e2dc!2sInnovate%20Hub!5e0!3m2!1sen!2sph!4v1700000000000!5m2!1sen!2sph" 
                width="100%" 
                height="100%" 
                style={{ border: 0 }} 
                allowFullScreen 
                loading="lazy" 
                referrerPolicy="no-referrer-when-downgrade"
                title="InnovateHub Location"
                className="w-full h-full"
              ></iframe>
            </div>
          </div>
        </section>
        
        {/* Clients Section */}
        <ClientShowcaseSection />
        
        <Footer />
      </div>
    </div>
  );
};

export default ContactPage;
