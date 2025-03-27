
import React, { useEffect, useState } from 'react';
import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import Features from '@/components/Features';
import AboutUs from '@/components/AboutUs';
import Services from '@/components/Services';
import PlataPay from '@/components/PlataPay';
import Testimonials from '@/components/Testimonials';
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
    <div className="min-h-screen w-full overflow-x-hidden relative">
      {/* Main background patterns inspired by InnovateHub.ph */}
      <CircuitBackground 
        pattern="curvy-line" 
        className="fixed top-0 right-0" 
        size="lg" 
        opacity={0.1} 
        color="primary"
      />
      
      <CircuitBackground 
        pattern="circuit-branches" 
        className="fixed bottom-20 right-0 transform" 
        size="lg" 
        opacity={0.1} 
        color="primary"
      />
      
      <CircuitBackground 
        pattern="circuit-lines-horizontal" 
        className="fixed top-1/3 left-0" 
        size="md" 
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
        pattern="blue-triangle" 
        className="fixed right-0 bottom-0" 
        size="md" 
        opacity={0.15} 
        color="primary"
      />
      
      <CircuitBackground 
        pattern="small-blue-triangle" 
        className="fixed left-1/3 top-2/3" 
        size="sm" 
        opacity={0.15} 
        color="primary"
      />
      
      <CircuitBackground 
        pattern="dotted-grid" 
        className="fixed top-1/4 right-1/4" 
        size="md" 
        opacity={0.1}
      />
      
      {/* Digital elements - Payment, AI, E-commerce icons */}
      <div className="fixed top-4 right-4 opacity-30 hidden lg:block">
        <img 
          src="public/lovable-uploads/41923896-2fb4-4137-b3b8-78bb35bbd3e5.png" 
          alt="IH Logo" 
          className="w-16 h-auto"
        />
      </div>
      
      {/* QR code icon - representing digital payments */}
      <div className="fixed bottom-20 right-10 -z-10 opacity-30 hidden md:block">
        <img 
          src="public/lovable-uploads/4d5b3eaa-0065-48e8-9976-3931a1836f81.png" 
          alt="QR Payment" 
          className="w-12 h-auto"
        />
      </div>
      
      {/* AI icon */}
      <div className="fixed top-1/2 left-10 -z-10 opacity-30 hidden md:block">
        <img 
          src="public/lovable-uploads/81342b57-5480-4e45-8f13-6d31826abff6.png" 
          alt="AI" 
          className="w-16 h-auto"
        />
      </div>
      
      {/* E-commerce icon */}
      <div className="fixed bottom-1/3 right-1/3 -z-10 opacity-20 hidden lg:block">
        <img 
          src="public/lovable-uploads/ff53bb94-04a4-4198-896b-3a71c7adf699.png" 
          alt="E-commerce" 
          className="w-32 h-auto"
        />
      </div>
      
      {/* Main content with full width sections */}
      <Navbar />
      <div className="w-full">
        <Hero />
        <Features />
        <AboutUs />
        <PlataPay />
        <Services />
        <Testimonials />
        <TeamSection />
        <ContactSection />
        <Footer />
      </div>
    </div>
  );
};

export default Index;
