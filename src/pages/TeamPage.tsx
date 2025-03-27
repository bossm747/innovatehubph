
import React, { useEffect } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import TeamSection from '@/components/TeamSection';
import TeamValues from '@/components/TeamValues';
import CircuitBackground from '@/components/CircuitBackground';

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
        <section className="py-16 px-6 md:px-12 lg:px-24">
          <div className="container mx-auto">
            <div className="text-center mb-16 fade-up">
              <span className="inline-block px-3 py-1 text-sm font-medium bg-innovate-100 text-innovate-800 rounded-full mb-4">
                Our People
              </span>
              <h1 className="text-4xl md:text-5xl font-bold mb-4 hero-text-gradient">
                Meet The InnovateHub Team
              </h1>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                We're a passionate team of tech experts dedicated to transforming businesses through innovative digital solutions.
              </p>
            </div>
          </div>
        </section>
        
        <TeamValues />
        <TeamSection />
        <Footer />
      </div>
    </div>
  );
};

export default TeamPage;
