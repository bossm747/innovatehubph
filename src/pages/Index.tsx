
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
      {/* Large background circuit patterns */}
      <CircuitBackground 
        pattern="right" 
        className="fixed top-0 right-0" 
        size="lg" 
        opacity={0.05} 
      />
      <CircuitBackground 
        pattern="left" 
        className="fixed bottom-0 left-0" 
        size="lg" 
        opacity={0.05} 
      />
      
      {/* Circuit paths at different positions */}
      <CircuitBackground 
        pattern="circuit-blue" 
        className="fixed top-1/4 left-0" 
        size="md" 
        opacity={0.2} 
      />
      <CircuitBackground 
        pattern="lines" 
        className="fixed bottom-1/4 right-0" 
        size="sm" 
        opacity={0.3} 
      />
      
      {/* Switch toggle elements - decorative */}
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
      
      {/* Corner backgrounds */}
      <CircuitBackground 
        pattern="corner-dots" 
        className="fixed top-0 right-0" 
        size="md" 
        opacity={0.15} 
      />
      <CircuitBackground 
        pattern="corner-dots" 
        className="fixed bottom-0 left-0" 
        size="md" 
        opacity={0.15}
        flipX={true}
        flipY={true}
      />
      
      {/* Wave patterns for aesthetics */}
      <div className="fixed top-0 left-0 -z-20 opacity-10">
        <img 
          src="public/lovable-uploads/d51f3d08-0518-4808-af9d-83ddda86ee94.png" 
          alt="" 
          className="w-64 h-auto"
        />
      </div>
      <div className="fixed bottom-0 right-0 -z-20 opacity-10">
        <img 
          src="public/lovable-uploads/b94823e3-a419-4cb5-9ef6-8e2bafbac686.png" 
          alt="" 
          className="w-64 h-auto"
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
