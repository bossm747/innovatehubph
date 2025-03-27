
import React, { useEffect } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import TeamSection from '@/components/TeamSection';
import TeamValues from '@/components/TeamValues';
import CircuitBackground from '@/components/CircuitBackground';
import TeamPageHeader from '@/components/TeamPageHeader';
import { Helmet } from 'react-helmet';

const TeamPage = () => {
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
    <div className="min-h-screen h-full w-full overflow-x-hidden relative">
      <Helmet>
        <title>Our Team | InnovateHub Inc.</title>
        <meta name="description" content="Meet the talented team behind InnovateHub's success. Our experienced professionals work together to deliver exceptional fintech and digital solutions." />
      </Helmet>
      
      {/* Background patterns */}
      <CircuitBackground 
        pattern="circuit-branches" 
        className="fixed top-20 right-20" 
        size="lg" 
        opacity={0.1} 
        color="primary"
      />
      
      <CircuitBackground 
        pattern="curvy-line" 
        className="fixed -bottom-40 -left-40" 
        size="xl" 
        opacity={0.2} 
        color="primary"
      />
      
      <CircuitBackground 
        pattern="dotted-grid" 
        className="fixed top-1/3 left-10" 
        size="md" 
        opacity={0.1}
      />
      
      {/* Main content */}
      <Navbar />
      <div className="w-full pt-16">
        <TeamPageHeader />
        <TeamValues />
        <TeamSection />
        <Footer />
      </div>
    </div>
  );
};

export default TeamPage;
