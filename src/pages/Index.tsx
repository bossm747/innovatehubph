
import React, { useEffect } from 'react';
import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import Features from '@/components/Features';
import AboutUs from '@/components/AboutUs';
import Services from '@/components/Services';
import PlataPay from '@/components/PlataPay';
import Testimonials from '@/components/Testimonials';
import TeamSection from '@/components/TeamSection';
import ContactSection from '@/components/ContactSection';
import Footer from '@/components/Footer';
import CircuitBackground from '@/components/CircuitBackground';
import ClientsShowcase from '@/components/ClientsShowcase';
import YoutubeVideo from '@/components/YoutubeVideo';
import BlogHighlight from '@/components/BlogHighlight';
import FacebookFeed from '@/components/FacebookFeed';
import { Facebook, MessageCircle } from 'lucide-react';

const Index = () => {
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
    
    window.addEventListener('scroll', handleScroll, { passive: true });
    
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="min-h-screen h-full w-full overflow-x-hidden relative p-0 m-0">
      <CircuitBackground 
        pattern="curvy-line" 
        className="fixed top-0 right-0" 
        size="lg" 
        opacity={0.1} 
        color="primary"
      />
      
      <CircuitBackground 
        pattern="circuit-branches" 
        className="fixed bottom-20 right-0 transform" 
        size="lg" 
        opacity={0.1} 
        color="primary"
      />
      
      <CircuitBackground 
        pattern="circuit-lines-horizontal" 
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
        pattern="blue-triangle" 
        className="fixed right-0 bottom-0" 
        size="md" 
        opacity={0.15} 
        color="primary"
      />
      
      <CircuitBackground 
        pattern="small-blue-triangle" 
        className="fixed left-1/3 top-2/3" 
        size="sm" 
        opacity={0.15} 
        color="primary"
      />
      
      <CircuitBackground 
        pattern="dotted-grid" 
        className="fixed top-1/4 right-1/4" 
        size="md" 
        opacity={0.1}
      />
      
      <div className="fixed top-4 right-4 opacity-30 hidden lg:block">
        <img 
          src="/lovable-uploads/41923896-2fb4-4137-b3b8-78bb35bbd3e5.png" 
          alt="IH Logo" 
          className="w-16 h-auto"
        />
      </div>
      
      <div className="fixed bottom-20 right-10 -z-10 opacity-30 hidden md:block">
        <img 
          src="/lovable-uploads/4d5b3eaa-0065-48e8-9976-3931a1836f81.png" 
          alt="QR Payment" 
          className="w-12 h-auto"
        />
      </div>
      
      <div className="fixed top-1/2 left-10 -z-10 opacity-30 hidden md:block">
        <img 
          src="/lovable-uploads/81342b57-5480-4e45-8f13-6d31826abff6.png" 
          alt="AI" 
          className="w-16 h-auto"
        />
      </div>
      
      <div className="fixed bottom-1/3 right-1/3 -z-10 opacity-20 hidden lg:block">
        <img 
          src="/lovable-uploads/ff53bb94-04a4-4198-896b-3a71c7adf699.png" 
          alt="E-commerce" 
          className="w-32 h-auto"
        />
      </div>
      
      <Navbar />
      <Hero />
      <Features />
      <AboutUs />
      <PlataPay />
      <YoutubeVideo />
      
      <section className="py-16 px-6 md:px-12 bg-gradient-to-r from-white to-gray-50">
        <div className="container mx-auto">
          <div className="flex flex-col md:flex-row items-center justify-between gap-8">
            <div className="md:w-1/2 fade-up">
              <span className="inline-block px-3 py-1 text-sm font-medium bg-innovate-100 text-innovate-800 rounded-full mb-4">
                Connect With Us
              </span>
              <h2 className="text-3xl md:text-4xl font-bold mb-4">Join Our Social Community</h2>
              <p className="text-gray-600 mb-6">
                Follow PlataPay on Facebook to stay updated with the latest news, promotions, and events. Join our growing community of agents and users!
              </p>
              <div className="flex flex-col sm:flex-row space-y-3 sm:space-y-0 sm:space-x-4">
                <a 
                  href="https://www.facebook.com/share/16BCXuyguU/?mibextid=wwXIfr" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                >
                  <Facebook size={20} />
                  Follow on Facebook
                </a>
                <a 
                  href="https://m.me/100090689281474" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
                >
                  <MessageCircle size={20} />
                  Message Us
                </a>
              </div>
            </div>
            <div className="md:w-1/2 fade-up flex justify-center">
              <FacebookFeed 
                pageUrl="https://www.facebook.com/share/16BCXuyguU/?mibextid=wwXIfr" 
                width={340}
                height={450}
                showTimeline={true}
                smallHeader={true}
              />
            </div>
          </div>
        </div>
      </section>
      
      <Services />
      <BlogHighlight />
      <ClientsShowcase maxItems={8} />
      <Testimonials />
      <TeamSection />
      <ContactSection />
      <Footer />
    </div>
  );
};

export default Index;
