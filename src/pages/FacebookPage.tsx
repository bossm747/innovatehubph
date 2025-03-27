
import React, { useEffect } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import CircuitBackground from '@/components/CircuitBackground';
import { Button } from '@/components/ui/button';
import { Facebook, MessageCircle, Share2, Bell, Users, ChevronRight, Mailbox } from 'lucide-react';
import FacebookFeed from '@/components/FacebookFeed';

const FacebookPage = () => {
  // Constants for Facebook links
  const FACEBOOK_PAGE_URL = "https://www.facebook.com/share/16BCXuyguU/?mibextid=wwXIfr";
  const FACEBOOK_MESSENGER_URL = "https://www.facebook.com/platapayinc";
  
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
        pattern="blue-wave" 
        className="fixed top-20 right-20" 
        size="lg" 
        opacity={0.1} 
        color="primary"
      />
      
      <CircuitBackground 
        pattern="circuit-branches" 
        className="fixed -bottom-40 -left-40" 
        size="xl" 
        opacity={0.2} 
        color="primary"
      />
      
      <Navbar />
      
      <main className="pt-20 pb-16">
        {/* Hero Section */}
        <section className="py-16 px-6 md:px-12 bg-gradient-to-r from-blue-50 to-white">
          <div className="container mx-auto max-w-6xl">
            <div className="flex flex-col md:flex-row items-center gap-10">
              <div className="md:w-1/2 fade-up">
                <span className="inline-block px-3 py-1 text-sm font-medium bg-innovate-100 text-innovate-800 rounded-full mb-4">
                  Connect With Us
                </span>
                <h1 className="text-4xl md:text-5xl font-bold mb-6 hero-text-gradient">
                  Join the PlataPay Community
                </h1>
                <p className="text-gray-600 mb-8 text-lg">
                  Stay connected with PlataPay on Facebook for the latest updates, promotions, events, and engage with our growing community of agents and users across the Philippines.
                </p>
                <div className="flex flex-col sm:flex-row space-y-3 sm:space-y-0 sm:space-x-4">
                  <Button 
                    size="lg" 
                    className="flex gap-2 bg-blue-600 hover:bg-blue-700 transition-colors"
                    onClick={() => window.open(FACEBOOK_PAGE_URL, '_blank')}
                  >
                    <Facebook size={20} />
                    Follow on Facebook
                  </Button>
                  <Button 
                    size="lg" 
                    variant="outline"
                    className="flex gap-2 border-blue-500 text-blue-600 hover:bg-blue-50"
                    onClick={() => window.open(FACEBOOK_MESSENGER_URL, '_blank')}
                  >
                    <MessageCircle size={20} />
                    Message Us
                  </Button>
                </div>
              </div>
              <div className="md:w-1/2 fade-up flex justify-center">
                <img 
                  src="/lovable-uploads/508dbb7c-7812-431c-9af3-eb4874902930.png" 
                  alt="PlataPay Facebook Community" 
                  className="rounded-xl shadow-xl max-w-full h-auto"
                />
              </div>
            </div>
          </div>
        </section>
        
        {/* Facebook Feed Section */}
        <section className="py-16 px-6 md:px-12 bg-white">
          <div className="container mx-auto max-w-6xl">
            <div className="text-center mb-12 fade-up">
              <span className="inline-block px-3 py-1 text-sm font-medium bg-innovate-100 text-innovate-800 rounded-full mb-4">
                Live Feed
              </span>
              <h2 className="text-3xl md:text-4xl font-bold mb-4">Our Facebook Timeline</h2>
              <p className="text-gray-600 max-w-2xl mx-auto">
                Check out our latest posts, announcements, and community interactions directly from our Facebook page.
              </p>
            </div>
            
            <div className="flex justify-center fade-up">
              <div className="bg-white shadow-xl rounded-xl p-6 max-w-2xl w-full">
                <FacebookFeed 
                  pageUrl={FACEBOOK_PAGE_URL}
                  width={540}
                  height={700}
                  showTimeline={true}
                  smallHeader={false}
                  hideCover={false}
                />
              </div>
            </div>
          </div>
        </section>
        
        {/* Features Section */}
        <section className="py-16 px-6 md:px-12 bg-gradient-to-r from-white to-blue-50">
          <div className="container mx-auto max-w-6xl">
            <div className="text-center mb-12 fade-up">
              <span className="inline-block px-3 py-1 text-sm font-medium bg-innovate-100 text-innovate-800 rounded-full mb-4">
                Connect & Engage
              </span>
              <h2 className="text-3xl md:text-4xl font-bold mb-4">Why Follow Us on Facebook?</h2>
              <p className="text-gray-600 max-w-2xl mx-auto">
                Discover the benefits of being part of our social media community.
              </p>
            </div>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 fade-up">
              <div className="bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition-shadow">
                <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mb-4">
                  <Bell className="text-blue-600" size={24} />
                </div>
                <h3 className="text-xl font-semibold mb-2">Latest Updates</h3>
                <p className="text-gray-600">
                  Be the first to know about new features, services, and promotions offered by PlataPay.
                </p>
              </div>
              
              <div className="bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition-shadow">
                <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mb-4">
                  <Users className="text-blue-600" size={24} />
                </div>
                <h3 className="text-xl font-semibold mb-2">Community Support</h3>
                <p className="text-gray-600">
                  Get answers to your questions and connect with other PlataPay agents and users.
                </p>
              </div>
              
              <div className="bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition-shadow">
                <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mb-4">
                  <Share2 className="text-blue-600" size={24} />
                </div>
                <h3 className="text-xl font-semibold mb-2">Success Stories</h3>
                <p className="text-gray-600">
                  Read about how other agents are growing their businesses with PlataPay.
                </p>
              </div>
              
              <div className="bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition-shadow">
                <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mb-4">
                  <Mailbox className="text-blue-600" size={24} />
                </div>
                <h3 className="text-xl font-semibold mb-2">Direct Communication</h3>
                <p className="text-gray-600">
                  Message us directly through Facebook for quick and convenient support.
                </p>
              </div>
              
              <div className="bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition-shadow">
                <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mb-4">
                  <ChevronRight className="text-blue-600" size={24} />
                </div>
                <h3 className="text-xl font-semibold mb-2">Events & Webinars</h3>
                <p className="text-gray-600">
                  Learn about upcoming virtual and in-person events hosted by PlataPay.
                </p>
              </div>
              
              <div className="bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition-shadow">
                <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mb-4">
                  <Facebook className="text-blue-600" size={24} />
                </div>
                <h3 className="text-xl font-semibold mb-2">Exclusive Content</h3>
                <p className="text-gray-600">
                  Access Facebook-only content, guides, and resources for PlataPay agents.
                </p>
              </div>
            </div>
            
            <div className="mt-12 text-center fade-up">
              <Button 
                size="lg" 
                className="bg-blue-600 hover:bg-blue-700 transition-colors"
                onClick={() => window.open(FACEBOOK_PAGE_URL, '_blank')}
              >
                Join our Facebook Community
                <ChevronRight size={16} />
              </Button>
            </div>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

export default FacebookPage;
