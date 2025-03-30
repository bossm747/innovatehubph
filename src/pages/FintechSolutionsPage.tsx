
import React, { useEffect } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import FintechHero from '@/components/FintechHero';
import FintechServicesShowcase from '@/components/FintechServicesShowcase';
import PlatapayAgentMap from '@/components/PlatapayAgentMap';
import ContactSection from '@/components/ContactSection';
import { Toaster } from 'sonner';
import FintechComparisonTable from '@/components/FintechComparisonTable';
import PlatapayPartners from '@/components/PlatapayPartners';
import PlatapayTestimonials from '@/components/PlatapayTestimonials';
import CircuitBackground from '@/components/CircuitBackground';
import { Helmet } from 'react-helmet';

const FintechSolutionsPage = () => {
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
    <div className="min-h-screen w-full overflow-x-hidden relative bg-white">
      <Helmet>
        <title>Fintech Solutions | InnovateHub Inc.</title>
        <meta name="description" content="Explore Fintech Solutions - Digital wallet and payment solutions that empower communities and create income opportunities for agents." />
      </Helmet>
      
      <Toaster position="top-right" />
      
      {/* Background patterns */}
      <CircuitBackground pattern="curvy-line" className="fixed top-0 right-0" size="lg" opacity={0.07} color="primary" />
      <CircuitBackground pattern="dots" className="fixed bottom-0 left-0" size="xl" opacity={0.05} />
      
      <Navbar />
      <main className="w-full py-0">
        <FintechHero />
        <div id="fintech-services">
          <FintechServicesShowcase />
        </div>
        <FintechComparisonTable />
        <PlatapayAgentMap />
        <PlatapayPartners />
        <PlatapayTestimonials />
        <ContactSection />
        <Footer />
      </main>
    </div>
  );
};

export default FintechSolutionsPage;
