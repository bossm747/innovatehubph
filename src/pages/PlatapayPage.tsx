
import React, { useEffect } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import ContactSection from '@/components/ContactSection';
import CircuitBackground from '@/components/CircuitBackground';
import PlatapayHero from '@/components/PlatapayHero';
import PlatapayServices from '@/components/PlatapayServices';
import PlatapayTestimonials from '@/components/PlatapayTestimonials';
import PlatapayAgentInfo from '@/components/PlatapayAgentInfo';
import PlatapayPartners from '@/components/PlatapayPartners';
import ClientsShowcase from '@/components/ClientsShowcase';

const PlatapayPage = () => {
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
        <PlatapayHero />
        <PlatapayServices />
        <PlatapayPartners />
        <ClientsShowcase 
          title="PlataPay Agent Success Stories" 
          subtitle="Join these successful PlataPay agents who are transforming their businesses and communities"
          showFilters={false}
          maxItems={6}
        />
        <PlatapayTestimonials />
        <PlatapayAgentInfo />
        <ContactSection />
        <Footer />
      </div>
    </div>
  );
};

export default PlatapayPage;
