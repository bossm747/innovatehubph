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
import FacebookFeed from '@/components/FacebookFeed';

const PlatapayPage = () => {
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
    
    handleScroll();
    
    window.addEventListener('scroll', handleScroll);
    
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="min-h-screen w-full overflow-x-hidden relative">
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
      
      <Navbar />
      <div className="w-full pt-16">
        <PlatapayHero />
        <PlatapayServices />
        
        <section className="py-16 px-6 md:px-12 bg-gradient-to-r from-white to-gray-50">
          <div className="container mx-auto">
            <div className="text-center mb-10 fade-up">
              <span className="inline-block px-3 py-1 text-sm font-medium bg-innovate-100 text-innovate-800 rounded-full mb-4">
                Social Media
              </span>
              <h2 className="text-3xl md:text-4xl font-bold mb-4">Follow PlataPay on Facebook</h2>
              <p className="text-gray-600 max-w-2xl mx-auto">
                Stay updated with our latest news, promotions, and events through our official Facebook page.
              </p>
            </div>
            
            <div className="flex justify-center fade-up">
              <FacebookFeed 
                pageUrl="https://www.facebook.com/platapay.official" 
                width={500}
                height={600}
                showTimeline={true}
              />
            </div>
          </div>
        </section>
        
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
