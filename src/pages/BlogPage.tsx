
import React, { useEffect } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import ContactSection from '@/components/ContactSection';
import CircuitBackground from '@/components/CircuitBackground';
import BlogHighlight from '@/components/BlogHighlight';
import { Helmet } from 'react-helmet';
import { Button } from '@/components/ui/button';

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
      <Helmet>
        <title>Blog | InnovateHub Inc.</title>
        <meta name="description" content="Stay informed with the latest news, trends, and insights from the world of digital innovation and fintech." />
      </Helmet>
      
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
      <div className="w-full py-0">
        <section className="py-20 px-6 md:px-12 lg:px-24 bg-gradient-to-b from-blue-800 to-blue-900 text-white">
          {/* Background patterns */}
          <div className="absolute inset-0 overflow-hidden opacity-10">
            <div className="absolute -top-24 -right-24 w-96 h-96 rounded-full bg-blue-500 filter blur-3xl"></div>
            <div className="absolute top-1/2 -left-24 w-64 h-64 rounded-full bg-white filter blur-3xl"></div>
            <div className="absolute -bottom-32 right-1/4 w-80 h-80 rounded-full bg-blue-300 filter blur-3xl"></div>
            
            {/* Grid pattern */}
            <div className="absolute inset-0" style={{ 
              backgroundImage: 'radial-gradient(rgba(255, 255, 255, 0.1) 1px, transparent 1px)', 
              backgroundSize: '20px 20px' 
            }}></div>
          </div>
          
          <div className="container mx-auto relative z-10">
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
        
        {/* Recent Partner News Section */}
        <section className="py-16 px-6 md:px-12 bg-gray-50">
          <div className="container mx-auto">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-2xl md:text-3xl font-bold mb-6 text-center">Recent Partner Announcements</h2>
              
              <div className="grid md:grid-cols-2 gap-6 mb-8">
                <div className="bg-white p-6 rounded-xl shadow-md">
                  <span className="text-sm text-gray-500">March 15, 2025</span>
                  <h3 className="text-xl font-semibold mt-2 mb-3">New Partners in Batangas Region</h3>
                  <p className="text-gray-600 mb-4">
                    InnovateHub welcomes RMCL-Maricel, Majoy Bills Payment, and BTS - MaryAnn Mercado as new business partners in the Batangas region.
                  </p>
                  <Button variant="outline" size="sm">Read More</Button>
                </div>
                
                <div className="bg-white p-6 rounded-xl shadow-md">
                  <span className="text-sm text-gray-500">March 4, 2025</span>
                  <h3 className="text-xl font-semibold mt-2 mb-3">Retail Expansion with Miss G</h3>
                  <p className="text-gray-600 mb-4">
                    Miss G joins our network of retail partners, implementing our digital payment solutions to enhance customer experience.
                  </p>
                  <Button variant="outline" size="sm">Read More</Button>
                </div>
                
                <div className="bg-white p-6 rounded-xl shadow-md">
                  <span className="text-sm text-gray-500">March 1, 2025</span>
                  <h3 className="text-xl font-semibold mt-2 mb-3">TEDBatangas Partnership</h3>
                  <p className="text-gray-600 mb-4">
                    TEDBatangas joins InnovateHub's growing network of business partners, leveraging our fintech solutions for enhanced operations.
                  </p>
                  <Button variant="outline" size="sm">Read More</Button>
                </div>
                
                <div className="bg-white p-6 rounded-xl shadow-md">
                  <span className="text-sm text-gray-500">February 27, 2025</span>
                  <h3 className="text-xl font-semibold mt-2 mb-3">Business Center Collaborations</h3>
                  <p className="text-gray-600 mb-4">
                    TMSeven Business Center and MMHA Business Center implement InnovateHub's digital payment solutions for their customers.
                  </p>
                  <Button variant="outline" size="sm">Read More</Button>
                </div>
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

export default BlogPage;
