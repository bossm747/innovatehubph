
import React, { useEffect } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import ContactForm from '@/components/ContactForm';
import ContactInfo from '@/components/ContactInfo';
import CircuitBackground from '@/components/CircuitBackground';

const ContactPage = () => {
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
      <div className="w-full pt-16">
        <section className="py-16 px-6 md:px-12 lg:px-24">
          <div className="container mx-auto">
            <div className="text-center mb-16 fade-up">
              <span className="inline-block px-3 py-1 text-sm font-medium bg-innovate-100 text-innovate-800 rounded-full mb-4">
                Get In Touch
              </span>
              <h1 className="text-4xl md:text-5xl font-bold mb-4 hero-text-gradient">
                Ready to Collaborate? Let's Talk!
              </h1>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                Reach out and let's co-create your digital future. We're here to help transform your business with innovative technology solutions.
              </p>
            </div>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
              <ContactInfo />
              <ContactForm />
            </div>
          </div>
        </section>
        <Footer />
      </div>
    </div>
  );
};

export default ContactPage;
