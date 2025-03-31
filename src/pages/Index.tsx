
import React, { useEffect } from 'react';
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
import FeaturedVideoSection from '@/components/home/FeaturedVideoSection';
import PartnersSection from '@/components/home/PartnersSection';
import { Helmet } from 'react-helmet';
import { useIsMobile } from '@/hooks/use-mobile';

const Index = () => {
  const isMobile = useIsMobile();
  
  useEffect(() => {
    // Create the observer inside the component function
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('fade-in');
          // Once the animation is applied, unobserve the element
          observer.unobserve(entry.target);
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
      observer.observe(element);
    });
    
    // Clean up
    return () => {
      observer.disconnect();
    };
  }, []);

  return (
    <div className="w-full min-h-screen m-0 p-0 relative">
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
      <div className="w-full py-0">
        <Hero />
        
        {/* Why Choose Us Section */}
        <WhyChooseUsSection />
        
        {/* Featured Video Section */}
        <FeaturedVideoSection />
        
        {/* Fintech Solutions Feature Section */}
        <FintechSolutions />
        
        {/* Service Tiles Section */}
        <ServiceTiles />
        
        {/* Partners Section */}
        <PartnersSection />
        
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
        <Footer />
      </div>
    </div>
  );
};

export default Index;
