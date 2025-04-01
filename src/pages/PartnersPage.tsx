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
import { 
  ArrowLeft, 
  Building, 
  CircleDollarSign, 
  Truck, 
  Laptop, 
  Briefcase,
  ArrowRight,
  ChevronRight
} from 'lucide-react';
import HeroSection from '@/components/shared/HeroSection';
import PartnersHeroBackground from '@/components/partners/PartnersHeroBackground';
import PartnersHeroImage from '@/components/partners/PartnersHeroImage';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ScrollArea } from '@/components/ui/scroll-area';

const PartnersPage = () => {
  const [partners, setPartners] = useState<Partner[]>(partnersData);
  const [filter, setFilter] = useState<string>('all');
  
  // Get unique categories for filter buttons
  const categories = ['all', ...Array.from(new Set(partnersData.map(partner => partner.category)))];
  
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
  
  // Get icon based on category
  const getCategoryIcon = (category: string) => {
    switch (category.toLowerCase()) {
      case 'banking':
        return <CircleDollarSign className="h-5 w-5" />;
      case 'financial services':
        return <Briefcase className="h-5 w-5" />;
      case 'logistics':
        return <Truck className="h-5 w-5" />;
      case 'technology':
        return <Laptop className="h-5 w-5" />;
      default:
        return <Building className="h-5 w-5" />;
    }
  };
  
  // Group partners by category
  const partnersByCategory = partnersData.reduce((acc, partner) => {
    if (!acc[partner.category]) {
      acc[partner.category] = [];
    }
    acc[partner.category].push(partner);
    return acc;
  }, {} as Record<string, Partner[]>);
  
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
      
      {/* Hero Section */}
      <HeroSection
        title="Our Trusted Partners"
        subtitle="Strategic Collaborations"
        description="InnovateHub partners with leading financial institutions, technology providers, and service companies to deliver seamless digital solutions for our clients."
        primaryButtonText="View Partners"
        primaryButtonLink="#partners-grid"
        backgroundComponent={<PartnersHeroBackground />}
        imageComponent={<PartnersHeroImage />}
        featureItems={[
          { icon: <span className="h-5 w-5 mr-2 text-blue-300">•</span>, text: "Banking Partners" },
          { icon: <span className="h-5 w-5 mr-2 text-blue-300">•</span>, text: "Technology Solutions" }
        ]}
      />
      
      <main className="w-full py-10">
        <div className="container mx-auto px-4 md:px-8">
          <div className="mb-6">
            <Button variant="outline" size="sm" asChild className="mb-4 gap-2">
              <Link to="/" className="flex items-center">
                <ArrowLeft className="h-4 w-4" /> Back to Home
              </Link>
            </Button>
            <h2 className="text-3xl md:text-4xl font-bold mb-2" id="partners-grid">Our Partners</h2>
            <p className="text-gray-600 max-w-3xl">
              InnovateHub collaborates with leading financial institutions, technology providers, and service companies 
              to deliver exceptional solutions to our clients. Learn more about our strategic partnerships.
            </p>
          </div>
          
          {/* Tabs for different views */}
          <Tabs defaultValue="category" className="w-full mb-12 fade-up">
            <div className="flex items-center justify-between mb-6">
              <TabsList>
                <TabsTrigger value="category">By Category</TabsTrigger>
                <TabsTrigger value="all">All Partners</TabsTrigger>
              </TabsList>
            </div>
            
            <TabsContent value="category" className="space-y-8">
              {Object.keys(partnersByCategory).map((category) => (
                <div key={category} className="fade-up">
                  <div className="flex items-center gap-2 mb-4">
                    {getCategoryIcon(category)}
                    <h3 className="text-xl font-semibold">{category}</h3>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                    {partnersByCategory[category].map((partner) => (
                      <PartnerCard key={partner.id} partner={partner} />
                    ))}
                  </div>
                </div>
              ))}
            </TabsContent>
            
            <TabsContent value="all">
              <div className="mb-8 fade-up">
                <div className="flex flex-wrap items-center gap-2">
                  <ScrollArea className="w-full whitespace-nowrap">
                    <div className="flex space-x-2 pb-4">
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
                  </ScrollArea>
                </div>
              </div>
              
              {/* Partners grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-16 fade-up">
                {partners.map((partner) => (
                  <PartnerCard key={partner.id} partner={partner} />
                ))}
              </div>
            </TabsContent>
          </Tabs>
          
          {/* Partnership CTA section */}
          <Card className="bg-slate-50 my-8 fade-up border-0 shadow-sm">
            <CardContent className="p-6 md:p-8">
              <div className="flex flex-col md:flex-row items-center justify-between gap-6">
                <div>
                  <CardTitle className="text-2xl font-bold mb-2">Interested in becoming a partner?</CardTitle>
                  <CardDescription className="text-gray-600 mb-4 text-base">
                    We're always looking to expand our network of partners to better serve our clients.
                    Connect with us to explore partnership opportunities.
                  </CardDescription>
                </div>
                <Button size="lg" className="gap-2" asChild>
                  <Link to="/contact">
                    Contact Us <ChevronRight className="h-4 w-4" />
                  </Link>
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
        
        <ContactSection />
        <Footer />
      </main>
    </div>
  );
};

export default PartnersPage;
