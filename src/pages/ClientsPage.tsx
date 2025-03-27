
import React, { useEffect } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import ContactSection from '@/components/ContactSection';
import CircuitBackground from '@/components/CircuitBackground';
import ClientsShowcase from '@/components/ClientsShowcase';

const ClientsPage = () => {
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
        pattern="curvy-line" 
        className="fixed top-20 right-20" 
        size="lg" 
        opacity={0.1} 
        color="primary"
      />
      
      <CircuitBackground 
        pattern="circuit-branches" 
        className="fixed bottom-40 left-20" 
        size="lg" 
        opacity={0.1} 
        color="primary"
      />
      
      {/* Main content */}
      <Navbar />
      <div className="w-full pt-16">
        <section className="py-20 px-6 md:px-12 lg:px-24 bg-white">
          <div className="container mx-auto">
            <div className="text-center mb-16 fade-up">
              <span className="inline-block px-3 py-1 text-sm font-medium bg-innovate-100 text-innovate-800 rounded-full mb-4">
                Our Portfolio
              </span>
              <h1 className="text-4xl md:text-5xl font-bold mb-4">Our Valued Clients</h1>
              <p className="text-gray-600 max-w-3xl mx-auto">
                We're proud to partner with businesses across various industries. 
                From small local stores to established enterprises, we help our clients achieve 
                digital transformation and growth.
              </p>
            </div>
          </div>
        </section>
        
        <ClientsShowcase 
          showAll={true}
          className="pt-0"
        />
        
        <section className="py-16 px-6 md:px-12 lg:px-24 bg-white">
          <div className="container mx-auto">
            <div className="bg-innovate-50 rounded-xl p-8 md:p-12 max-w-4xl mx-auto fade-up">
              <h2 className="text-2xl md:text-3xl font-bold mb-4 text-center">Become Our Next Success Story</h2>
              <p className="text-center text-gray-600 mb-6">
                Join the growing list of businesses thriving with InnovateHub's digital solutions.
              </p>
              <div className="flex justify-center">
                <a 
                  href="/contact" 
                  className="px-6 py-3 bg-innovate-600 text-white rounded-md hover:bg-innovate-700 transition-colors inline-flex items-center"
                >
                  Contact Us Today
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-2" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
                  </svg>
                </a>
              </div>
            </div>
          </div>
        </section>
        
        <ContactSection />
        <Footer />
      </div>
    </div>
  );
};

export default ClientsPage;
