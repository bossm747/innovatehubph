
import React, { useEffect } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import ContactSection from '@/components/ContactSection';
import { Toaster } from 'sonner';
import CircuitBackground from '@/components/CircuitBackground';
import { Helmet } from 'react-helmet';
import { servicesData } from '@/data/servicesData';
import ServiceDetail from '@/components/services/ServiceDetail';

const MobileAppDevelopmentPage = () => {
  const serviceData = servicesData.find(service => service.id === 'mobile-app-development');
  
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
    <div className="min-h-screen w-full overflow-x-hidden relative bg-gradient-to-b from-gray-50 to-white">
      <Helmet>
        <title>Web & Mobile Apps | InnovateHub Inc.</title>
        <meta name="description" content="Custom web and native mobile applications that deliver exceptional user experiences across all devices." />
      </Helmet>
      
      <Toaster position="top-right" />
      
      {/* Background patterns */}
      <CircuitBackground pattern="curvy-line" className="fixed top-0 right-0" size="lg" opacity={0.1} color="primary" />
      <CircuitBackground pattern="dotted-grid" className="fixed bottom-0 left-0" size="xl" opacity={0.05} />
      
      <Navbar />
      <main className="w-full py-24 px-6 md:px-12">
        <div className="container mx-auto">
          <div className="text-center mb-16 fade-up">
            <span className="inline-block px-3 py-1 text-sm font-medium bg-innovate-100 text-innovate-800 rounded-full mb-4">
              Our Services
            </span>
            <h1 className="text-4xl md:text-5xl font-bold mb-6">Web & Mobile App Development</h1>
            <p className="text-gray-600 max-w-3xl mx-auto">
              Custom web and native mobile applications that deliver exceptional user experiences across all devices.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10 mb-16">
            {serviceData && (
              <ServiceDetail 
                id="mobile-app-development"
                title="Web & Mobile Apps"
                detailTitle="Create Stunning Cross-Platform Applications"
                detailDesc="Our team builds responsive web applications and native mobile apps that provide seamless experiences across all devices and platforms."
                image="/lovable-uploads/91e21d7a-53f9-41d7-bd62-4a1f5dbe1d12.png"
              />
            )}
            
            <div className="space-y-8 fade-up" style={{ animationDelay: '0.2s' }}>
              <div className="bg-white p-8 rounded-xl shadow-soft">
                <h3 className="text-xl font-semibold mb-4">Our App Development Process</h3>
                <ol className="space-y-3">
                  <li className="flex items-start">
                    <span className="flex-shrink-0 w-6 h-6 rounded-full bg-innovate-100 flex items-center justify-center mr-3 mt-0.5 text-innovate-600 font-semibold">
                      1
                    </span>
                    <span className="text-gray-700">Discovery & Strategy</span>
                  </li>
                  <li className="flex items-start">
                    <span className="flex-shrink-0 w-6 h-6 rounded-full bg-innovate-100 flex items-center justify-center mr-3 mt-0.5 text-innovate-600 font-semibold">
                      2
                    </span>
                    <span className="text-gray-700">UI/UX Design</span>
                  </li>
                  <li className="flex items-start">
                    <span className="flex-shrink-0 w-6 h-6 rounded-full bg-innovate-100 flex items-center justify-center mr-3 mt-0.5 text-innovate-600 font-semibold">
                      3
                    </span>
                    <span className="text-gray-700">Development & Integration</span>
                  </li>
                  <li className="flex items-start">
                    <span className="flex-shrink-0 w-6 h-6 rounded-full bg-innovate-100 flex items-center justify-center mr-3 mt-0.5 text-innovate-600 font-semibold">
                      4
                    </span>
                    <span className="text-gray-700">Testing & Quality Assurance</span>
                  </li>
                  <li className="flex items-start">
                    <span className="flex-shrink-0 w-6 h-6 rounded-full bg-innovate-100 flex items-center justify-center mr-3 mt-0.5 text-innovate-600 font-semibold">
                      5
                    </span>
                    <span className="text-gray-700">Deployment & Maintenance</span>
                  </li>
                </ol>
              </div>
              
              <div className="bg-white p-8 rounded-xl shadow-soft">
                <h3 className="text-xl font-semibold mb-4">Technologies We Use</h3>
                <div className="grid grid-cols-2 gap-4">
                  <div className="flex items-center">
                    <span className="flex-shrink-0 w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center mr-3">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-blue-600" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M12.316 3.051a1 1 0 01.633 1.265l-4 12a1 1 0 11-1.898-.632l4-12a1 1 0 011.265-.633zM5.707 6.293a1 1 0 010 1.414L3.414 10l2.293 2.293a1 1 0 11-1.414 1.414l-3-3a1 1 0 010-1.414l3-3a1 1 0 011.414 0zm8.586 0a1 1 0 011.414 0l3 3a1 1 0 010 1.414l-3 3a1 1 0 11-1.414-1.414L16.586 10l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
                      </svg>
                    </span>
                    <span>React & React Native</span>
                  </div>
                  <div className="flex items-center">
                    <span className="flex-shrink-0 w-8 h-8 rounded-full bg-green-100 flex items-center justify-center mr-3">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-green-600" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M12.316 3.051a1 1 0 01.633 1.265l-4 12a1 1 0 11-1.898-.632l4-12a1 1 0 011.265-.633zM5.707 6.293a1 1 0 010 1.414L3.414 10l2.293 2.293a1 1 0 11-1.414 1.414l-3-3a1 1 0 010-1.414l3-3a1 1 0 011.414 0zm8.586 0a1 1 0 011.414 0l3 3a1 1 0 010 1.414l-3 3a1 1 0 11-1.414-1.414L16.586 10l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
                      </svg>
                    </span>
                    <span>Flutter</span>
                  </div>
                  <div className="flex items-center">
                    <span className="flex-shrink-0 w-8 h-8 rounded-full bg-purple-100 flex items-center justify-center mr-3">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-purple-600" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M12.316 3.051a1 1 0 01.633 1.265l-4 12a1 1 0 11-1.898-.632l4-12a1 1 0 011.265-.633zM5.707 6.293a1 1 0 010 1.414L3.414 10l2.293 2.293a1 1 0 11-1.414 1.414l-3-3a1 1 0 010-1.414l3-3a1 1 0 011.414 0zm8.586 0a1 1 0 011.414 0l3 3a1 1 0 010 1.414l-3 3a1 1 0 11-1.414-1.414L16.586 10l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
                      </svg>
                    </span>
                    <span>Angular</span>
                  </div>
                  <div className="flex items-center">
                    <span className="flex-shrink-0 w-8 h-8 rounded-full bg-yellow-100 flex items-center justify-center mr-3">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-yellow-600" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M12.316 3.051a1 1 0 01.633 1.265l-4 12a1 1 0 11-1.898-.632l4-12a1 1 0 011.265-.633zM5.707 6.293a1 1 0 010 1.414L3.414 10l2.293 2.293a1 1 0 11-1.414 1.414l-3-3a1 1 0 010-1.414l3-3a1 1 0 011.414 0zm8.586 0a1 1 0 011.414 0l3 3a1 1 0 010 1.414l-3 3a1 1 0 11-1.414-1.414L16.586 10l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
                      </svg>
                    </span>
                    <span>iOS & Swift</span>
                  </div>
                  <div className="flex items-center">
                    <span className="flex-shrink-0 w-8 h-8 rounded-full bg-green-100 flex items-center justify-center mr-3">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-green-600" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M12.316 3.051a1 1 0 01.633 1.265l-4 12a1 1 0 11-1.898-.632l4-12a1 1 0 011.265-.633zM5.707 6.293a1 1 0 010 1.414L3.414 10l2.293 2.293a1 1 0 11-1.414 1.414l-3-3a1 1 0 010-1.414l3-3a1 1 0 011.414 0zm8.586 0a1 1 0 011.414 0l3 3a1 1 0 010 1.414l-3 3a1 1 0 11-1.414-1.414L16.586 10l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
                      </svg>
                    </span>
                    <span>Android & Kotlin</span>
                  </div>
                  <div className="flex items-center">
                    <span className="flex-shrink-0 w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center mr-3">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-blue-600" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M12.316 3.051a1 1 0 01.633 1.265l-4 12a1 1 0 11-1.898-.632l4-12a1 1 0 011.265-.633zM5.707 6.293a1 1 0 010 1.414L3.414 10l2.293 2.293a1 1 0 11-1.414 1.414l-3-3a1 1 0 010-1.414l3-3a1 1 0 011.414 0zm8.586 0a1 1 0 011.414 0l3 3a1 1 0 010 1.414l-3 3a1 1 0 11-1.414-1.414L16.586 10l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
                      </svg>
                    </span>
                    <span>Node.js & Express</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        <ContactSection />
        <Footer />
      </main>
    </div>
  );
};

export default MobileAppDevelopmentPage;
