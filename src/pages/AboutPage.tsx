
import React, { useEffect } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import ContactSection from '@/components/ContactSection';
import CircuitBackground from '@/components/CircuitBackground';
import AboutHero from '@/components/AboutHero';
import CompanyOverview from '@/components/CompanyOverview';
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
      
      {/* Background patterns - simplified and reduced */}
      <CircuitBackground pattern="dotted-grid" className="fixed top-1/3 right-1/4" size="sm" opacity={0.05} />
      
      {/* Main content */}
      <Navbar />
      <main className="w-full py-0">
        <AboutHero />
        <CompanyOverview />
        <ContactSection />
      </main>
      <Footer />
    </div>
  );
};

export default AboutPage;
