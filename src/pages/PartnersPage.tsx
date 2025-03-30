
import React, { useState, useEffect } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import ContactSection from '@/components/ContactSection';
import CircuitBackground from '@/components/CircuitBackground';
import { Helmet } from 'react-helmet';
import PartnerCard, { Partner } from '@/components/partners/PartnerCard';
import partnersData from '@/data/partnersData';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';

const PartnersPage = () => {
  const [partners, setPartners] = useState<Partner[]>(partnersData);
  const [filter, setFilter] = useState<string>('all');
  
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
  
  // Filter partners by category
  const filterPartners = (category: string) => {
    setFilter(category);
    if (category === 'all') {
      setPartners(partnersData);
    } else {
      setPartners(partnersData.filter(partner => partner.category === category));
    }
  };
  
  // Get unique categories for filter buttons
  const categories = ['all', ...Array.from(new Set(partnersData.map(partner => partner.category)))];
  
  return (
    <div className="min-h-screen w-full overflow-x-hidden relative">
      <Helmet>
        <title>Our Partners | InnovateHub Inc.</title>
        <meta name="description" content="Explore our strategic partnerships with leading financial institutions, technology providers, and service companies across the Philippines." />
      </Helmet>
      
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
        pattern="dotted-grid" 
        className="fixed top-1/3 left-1/4" 
        size="md" 
        opacity={0.1}
      />
      
      {/* Main content */}
      <Navbar />
      <div className="w-full py-10">
        <div className="container mx-auto px-4 md:px-8">
          <div className="mb-6">
            <Button variant="outline" size="sm" asChild className="mb-4">
              <Link to="/" className="flex items-center">
                <ArrowLeft className="mr-2 h-4 w-4" /> Back to Home
              </Link>
            </Button>
            <h1 className="text-3xl md:text-4xl font-bold mb-2">Our Partners</h1>
            <p className="text-gray-600 max-w-3xl">
              InnovateHub collaborates with leading financial institutions, technology providers, and service companies 
              to deliver exceptional solutions to our clients. Learn more about our strategic partnerships.
            </p>
          </div>
          
          {/* Category filters */}
          <div className="mb-8 fade-up">
            <div className="flex flex-wrap items-center gap-2">
              {categories.map((category, index) => (
                <Button 
                  key={index}
                  variant={filter === category ? "default" : "outline"}
                  size="sm"
                  onClick={() => filterPartners(category)}
                  className="capitalize"
                >
                  {category === 'all' ? 'All Categories' : category}
                </Button>
              ))}
            </div>
          </div>
          
          {/* Partners grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16 fade-up">
            {partners.map((partner) => (
              <div key={partner.id} className="h-full">
                <PartnerCard partner={partner} expanded={true} />
              </div>
            ))}
          </div>
          
          {/* Partnership CTA section */}
          <div className="bg-slate-50 rounded-lg p-6 md:p-8 my-8 fade-up">
            <div className="flex flex-col md:flex-row items-center justify-between gap-6">
              <div>
                <h2 className="text-2xl font-bold mb-2">Interested in becoming a partner?</h2>
                <p className="text-gray-600 mb-4">
                  We're always looking to expand our network of partners to better serve our clients.
                  Connect with us to explore partnership opportunities.
                </p>
              </div>
              <Button size="lg" asChild>
                <Link to="/contact">Contact Us</Link>
              </Button>
            </div>
          </div>
        </div>
        
        <ContactSection />
        <Footer />
      </div>
    </div>
  );
};

export default PartnersPage;
