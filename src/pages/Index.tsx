
import React, { useEffect } from 'react';
import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import Features from '@/components/Features';
import AboutUs from '@/components/AboutUs';
import Services from '@/components/Services';
import TeamSection from '@/components/TeamSection';
import ContactSection from '@/components/ContactSection';
import Footer from '@/components/Footer';

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
    <div className="min-h-screen overflow-x-hidden">
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
