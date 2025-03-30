
import React, { useEffect } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import PlatapayHero from '@/components/PlatapayHero';
import PlatapayServices from '@/components/PlatapayServices';
import PlatapayComparisonTable from '@/components/PlatapayComparisonTable';
import PlatapayTestimonials from '@/components/PlatapayTestimonials';
import PlatapayPartners from '@/components/PlatapayPartners';
import PlatapayAgentInfo from '@/components/PlatapayAgentInfo';
import PlatapayAgentMap from '@/components/PlatapayAgentMap';
import ContactSection from '@/components/ContactSection';
import CircuitBackground from '@/components/CircuitBackground';
import { Helmet } from 'react-helmet';

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
      <Helmet>
        <title>PlataPay | InnovateHub Inc.</title>
        <meta name="description" content="PlataPay – Empowering Micropreneurs Through Digital Finance. A secure and income-generating platform for communities." />
      </Helmet>
      
      {/* Background patterns */}
      <CircuitBackground 
        pattern="tech-circle" 
        className="fixed top-20 right-20" 
        size="lg" 
        opacity={0.1} 
        color="accent"
      />
      
      <CircuitBackground 
        pattern="blue-wave" 
        className="fixed -bottom-40 -left-40" 
        size="xl" 
        opacity={0.2} 
        color="accent"
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
        <PlatapayHero />
        <PlatapayServices />
        <PlatapayAgentInfo />
        <PlatapayTestimonials />
        <PlatapayComparisonTable />
        <PlatapayPartners />
        <PlatapayAgentMap />
        <ContactSection 
          title="Become a PlataPay Agent Today"
          subtitle="Join our growing network of financial service providers"
          buttonText="Apply as Agent"
          buttonLink="https://platapay.ph/registration"
        />
        <Footer />
      </div>
    </div>
  );
};

export default PlatapayPage;
