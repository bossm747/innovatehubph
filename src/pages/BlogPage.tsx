
import React, { useEffect } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import ContactSection from '@/components/ContactSection';
import CircuitBackground from '@/components/CircuitBackground';
import BlogHighlight from '@/components/BlogHighlight';

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
        pattern="dotted-grid" 
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
      
      {/* Main content */}
      <Navbar />
      <div className="w-full pt-16">
        <section className="py-20 px-6 md:px-12 lg:px-24 bg-gradient-to-b from-[#1A1F2C] to-[#9F9EA1] text-white">
          <div className="container mx-auto">
            <div className="text-center mb-16 fade-up">
              <span className="inline-block px-3 py-1 text-sm font-medium bg-white/10 text-gray-200 rounded-full mb-4">
                Our Blog
              </span>
              <h1 className="text-4xl md:text-5xl font-bold mb-4 text-white">
                Industry News & Updates
              </h1>
              <p className="text-gray-200 max-w-3xl mx-auto">
                Stay informed with the latest news, trends, and insights from the world of digital innovation and fintech.
              </p>
            </div>
          </div>
        </section>
        
        <BlogHighlight />
        
        <ContactSection />
        <Footer />
      </div>
    </div>
  );
};

export default BlogPage;
