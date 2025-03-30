
import React, { useEffect } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import ContactSection from '@/components/ContactSection';
import CircuitBackground from '@/components/CircuitBackground';
import AboutHero from '@/components/AboutHero';
import CompanyOverview from '@/components/CompanyOverview';
import TeamSection from '@/components/TeamSection';
import { Helmet } from 'react-helmet';

const AboutPage = () => {
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
        <title>About Us | InnovateHub Inc.</title>
        <meta name="description" content="Learn about InnovateHub - Passionate Innovators in the Philippine Tech Landscape" />
      </Helmet>
      
      {/* Background patterns */}
      <CircuitBackground pattern="curvy-line" className="fixed top-0 right-0" size="lg" opacity={0.1} color="primary" />
      
      <CircuitBackground pattern="blue-curve" className="fixed -bottom-40 -left-40" size="xl" opacity={0.2} color="primary" />
      
      <CircuitBackground pattern="dotted-grid" className="fixed top-1/4 right-1/4" size="md" opacity={0.1} />
      
      {/* Main content */}
      <Navbar />
      <div className="w-full py-0">
        <AboutHero />
        <CompanyOverview />
        <TeamSection />
        <ContactSection />
        <Footer />
      </div>
    </div>
  );
};

export default AboutPage;
