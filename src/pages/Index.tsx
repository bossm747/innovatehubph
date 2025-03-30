
import React, { useEffect, useRef } from 'react';
import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import FintechSolutions from '@/components/FintechSolutions';
import Testimonials from '@/components/Testimonials';
import ContactSection from '@/components/ContactSection';
import Footer from '@/components/Footer';
import CircuitBackground from '@/components/CircuitBackground';
import ServiceTiles from '@/components/ServiceTiles';
import YoutubeVideo from '@/components/YoutubeVideo';
import WhyChooseUsSection from '@/components/home/WhyChooseUsSection';
import TeamPreviewSection from '@/components/home/TeamPreviewSection';
import CTASection from '@/components/home/CTASection';
import ClientShowcaseSection from '@/components/home/ClientShowcaseSection';
import { Helmet } from 'react-helmet';
import { useIsMobile } from '@/hooks/use-mobile';

const Index = () => {
  // Use a ref to prevent unnecessary re-calculations
  const observerRef = useRef<IntersectionObserver | null>(null);
  const isMobile = useIsMobile();
  
  useEffect(() => {
    // Use Intersection Observer API for better performance
    observerRef.current = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('fade-in');
          // Once the animation is applied, unobserve the element
          observerRef.current?.unobserve(entry.target);
        }
      });
    }, {
      root: null, // Use the viewport
      rootMargin: '0px',
      threshold: 0.1 // Trigger when 10% of the element is visible
    });
    
    // Get all elements with the fade-up class
    const fadeElements = document.querySelectorAll('.fade-up');
    
    // Observe each element
    fadeElements.forEach(element => {
      observerRef.current?.observe(element);
    });
    
    // Clean up
    return () => {
      if (observerRef.current) {
        observerRef.current.disconnect();
      }
    };
  }, []);

  return (
    <div className={`overflow-x-hidden w-[100vw] max-w-[100vw] min-h-screen m-0 p-0 relative ${isMobile ? 'pb-0' : ''}`}>
      <Helmet>
        <title>InnovateHub Inc. | Digital Innovation Solutions</title>
        <meta name="description" content="Empowering the Future with Digital Innovation - Customized fintech, AI, and e-commerce solutions for a connected world." />
      </Helmet>
      
      {/* Background decorations */}
      <CircuitBackground 
        pattern="circuit-branches" 
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
        pattern="dotted-grid" 
        className="fixed top-1/4 right-1/4" 
        size="md" 
        opacity={0.1}
      />
      
      <Navbar />
      <div className={`w-full py-0 ${isMobile ? 'pb-0' : ''}`}>
        <Hero />
        
        {/* Why Choose Us Section */}
        <WhyChooseUsSection />
        
        {/* Fintech Solutions Feature Section */}
        <FintechSolutions />
        
        {/* Service Tiles Section */}
        <ServiceTiles />
        
        {/* Client Showcase */}
        <ClientShowcaseSection />
        
        {/* Testimonials Section */}
        <Testimonials />
        
        {/* Team Preview Section */}
        <TeamPreviewSection />
        
        {/* CTA Section */}
        <CTASection />
        
        {/* Video Section */}
        <YoutubeVideo />
        
        <ContactSection />
        <Footer className={isMobile ? "pb-0 mb-0" : ""} />
      </div>
    </div>
  );
};

export default Index;
