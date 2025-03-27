
import React, { useEffect } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import ContactSection from '@/components/ContactSection';
import CircuitBackground from '@/components/CircuitBackground';

const BlogPage = () => {
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
      
      {/* Main content */}
      <Navbar />
      <div className="w-full pt-24 pb-16">
        <div className="container mx-auto px-6 md:px-12">
          <div className="max-w-3xl mx-auto text-center mb-16">
            <span className="inline-block px-3 py-1 text-sm font-medium bg-innovate-100 text-innovate-800 rounded-full mb-6">
              InnovateHub Blog
            </span>
            <h1 className="text-4xl md:text-5xl font-bold mb-6 hero-text-gradient">
              News & Insights
            </h1>
            <p className="text-xl text-gray-600">
              Stay updated with the latest from InnovateHub and our partners
            </p>
          </div>
          
          <div className="max-w-4xl mx-auto">
            <div className="relative rounded-xl overflow-hidden shadow-xl bg-white mb-12 fade-up">
              <div className="grid md:grid-cols-5 gap-6 p-6">
                <div className="md:col-span-2">
                  <div className="relative rounded-lg overflow-hidden h-full min-h-[240px] bg-gray-100">
                    <img 
                      src="/lovable-uploads/f0b7b62c-13ce-4b9c-bb0b-49b6bbd3e183.png"
                      alt="AllBank and InnovateHub Partnership" 
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent"></div>
                    <div className="absolute bottom-3 left-3 bg-innovate-600 text-white text-xs px-2 py-1 rounded">
                      February 28, 2025
                    </div>
                  </div>
                </div>
                
                <div className="md:col-span-3 flex flex-col justify-between">
                  <div>
                    <span className="inline-block px-2 py-1 text-xs font-medium bg-innovate-100/50 text-innovate-800 rounded mb-3">
                      Partnership
                    </span>
                    <h3 className="text-xl md:text-2xl font-bold mb-3 text-gray-900">
                      AllBank joins forces with InnovateHub Inc. to roll out QR payment solutions
                    </h3>
                    <p className="text-gray-600 mb-4">
                      AllBank (A Thrift Bank), Inc. has partnered with InnovateHub Inc. to introduce innovative QR payment solutions to the market. This collaboration aims to enhance digital payment experiences for customers and merchants alike, leveraging InnovateHub's expertise in financial technology.
                    </p>
                    <p className="text-gray-600 mb-4">
                      The partnership will focus on deploying PlataPay, InnovateHub's flagship QR payment platform, to AllBank's network of merchants and customers, facilitating faster, more secure transactions.
                    </p>
                  </div>
                  
                  <div className="flex items-center justify-between mt-4">
                    <span className="text-sm text-gray-500">Source: Manila Times</span>
                    <a 
                      href="https://www.manilatimes.net/2025/02/28/business/top-business/allbank-joins-forces-with-innovatehubinc-to-roll-out-qr-payment-solutions/2064552" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="text-innovate-600 hover:text-innovate-800 text-sm font-medium flex items-center"
                    >
                      Read Full Article
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                      </svg>
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <ContactSection />
      <Footer />
    </div>
  );
};

export default BlogPage;
