
import React, { useEffect } from 'react';
import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import Features from '@/components/Features';
import AboutUs from '@/components/AboutUs';
import Services from '@/components/Services';
import TeamSection from '@/components/TeamSection';
import ContactSection from '@/components/ContactSection';
import Footer from '@/components/Footer';
import CircuitBackground from '@/components/CircuitBackground';

const Index = () => {
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
    <div className="min-h-screen overflow-x-hidden relative">
      {/* Circuit background elements */}
      <div className="fixed top-0 right-0 w-1/3 h-screen -z-20 opacity-5">
        <img 
          src="public/lovable-uploads/c482324a-e57b-4e5c-a15a-137cf7868b9a.png" 
          alt="" 
          className="h-full object-cover object-left"
        />
      </div>
      <div className="fixed bottom-0 left-0 w-1/3 h-screen -z-20 opacity-5">
        <img 
          src="public/lovable-uploads/a4c52ef6-debc-4a07-959f-f5fdc741231e.png" 
          alt="" 
          className="h-full object-cover object-right"
        />
      </div>
      
      {/* Switch toggle elements */}
      <div className="fixed top-20 left-4 -z-10 opacity-30 hidden md:block">
        <img 
          src="public/lovable-uploads/aaef245b-56e2-437c-81d7-d753e215eb60.png" 
          alt="" 
          className="w-10 h-auto"
        />
      </div>
      <div className="fixed bottom-20 right-4 -z-10 opacity-30 hidden md:block">
        <img 
          src="public/lovable-uploads/aaef245b-56e2-437c-81d7-d753e215eb60.png" 
          alt="" 
          className="w-10 h-auto"
        />
      </div>
      <div className="fixed top-1/2 right-6 -z-10 opacity-30 hidden md:block">
        <img 
          src="public/lovable-uploads/aaf2257f-9aa4-42cc-b206-e4cacde97301.png" 
          alt="" 
          className="w-10 h-auto"
        />
      </div>
      <div className="fixed top-1/3 left-6 -z-10 opacity-30 hidden md:block">
        <img 
          src="public/lovable-uploads/b71bb214-0fa4-498f-af3b-d77895ad12c8.png" 
          alt="" 
          className="w-10 h-auto"
        />
      </div>
      
      {/* Main content */}
      <Navbar />
      <Hero />
      <Features />
      <AboutUs />
      <Services />
      <TeamSection />
      <ContactSection />
      <Footer />
    </div>
  );
};

export default Index;
