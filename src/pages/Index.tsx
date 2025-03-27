
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
        pattern="circuit-simple" 
        className="fixed top-0 right-0" 
        size="lg" 
        opacity={0.05} 
        color="primary"
      />
      <CircuitBackground 
        pattern="circuit-simple" 
        className="fixed bottom-0 left-0" 
        size="lg" 
        opacity={0.05} 
        color="primary"
        rotate={180}
      />
      
      {/* New circuit patterns */}
      <CircuitBackground 
        pattern="angle-right" 
        className="fixed top-1/3 right-0" 
        size="lg" 
        opacity={0.1} 
        color="primary"
      />
      <CircuitBackground 
        pattern="angle-left" 
        className="fixed bottom-1/3 left-0" 
        size="lg" 
        opacity={0.1} 
        color="primary"
      />
      <CircuitBackground 
        pattern="gradient-circle" 
        className="fixed top-20 left-20" 
        size="xl" 
        opacity={0.2} 
      />
      <CircuitBackground 
        pattern="gradient-circle" 
        className="fixed bottom-20 right-20" 
        size="xl" 
        opacity={0.2} 
        flipX={true}
        flipY={true}
      />
      
      {/* Blue tech icons */}
      <div className="fixed top-40 right-10 -z-10 opacity-30 hidden md:block">
        <img 
          src="public/lovable-uploads/1b2458e2-2999-4791-b568-4c34cfd90824.png" 
          alt="" 
          className="w-10 h-auto"
        />
      </div>
      <div className="fixed bottom-40 left-10 -z-10 opacity-30 hidden md:block">
        <img 
          src="public/lovable-uploads/e0d195e2-9fce-4899-9cb5-2842af7d93fb.png" 
          alt="" 
          className="w-10 h-auto"
        />
      </div>
      <div className="fixed top-1/2 left-10 -z-10 opacity-30 hidden md:block">
        <img 
          src="public/lovable-uploads/d5154064-a4e9-4584-936e-fbe00d0d935e.png" 
          alt="" 
          className="w-10 h-auto"
        />
      </div>
      
      {/* Switch toggle elements */}
      <div className="fixed top-20 left-4 -z-10 opacity-30 hidden md:block">
        <img 
          src="public/lovable-uploads/72bb2298-25ec-40dc-842a-896786d952c3.png" 
          alt="" 
          className="w-10 h-auto"
        />
      </div>
      <div className="fixed bottom-20 right-4 -z-10 opacity-30 hidden md:block">
        <img 
          src="public/lovable-uploads/72bb2298-25ec-40dc-842a-896786d952c3.png" 
          alt="" 
          className="w-10 h-auto"
        />
      </div>
      
      {/* Dark triangle */}
      <div className="fixed -bottom-20 -right-20 -z-10 opacity-70 hidden lg:block">
        <img 
          src="public/lovable-uploads/686c3f44-693f-43c9-a6b4-7d52ba6b6eba.png" 
          alt="" 
          className="w-96 h-auto"
        />
      </div>
      
      {/* Circuit board background */}
      <div className="fixed inset-0 -z-20 flex justify-center items-center opacity-5 pointer-events-none">
        <img 
          src="public/lovable-uploads/4efa4d52-e062-4876-bb34-db38b208d925.png" 
          alt="" 
          className="w-full max-w-5xl h-auto"
        />
      </div>
      
      {/* Gradient triangle decoration */}
      <div className="fixed -top-20 -left-20 -z-20 opacity-50 hidden lg:block">
        <img 
          src="public/lovable-uploads/6d28e722-42ae-4e08-a330-f810f8694f61.png" 
          alt="" 
          className="w-96 h-auto"
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
