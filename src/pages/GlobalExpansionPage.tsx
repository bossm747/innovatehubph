
import React, { useEffect } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import ContactSection from '@/components/ContactSection';
import CircuitBackground from '@/components/CircuitBackground';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { ArrowRight, Building, Compass, FileText, Globe, BarChart3, Scale, Briefcase, MapPin, Landmark } from 'lucide-react';
import { toast } from 'sonner';

const GlobalExpansionPage = () => {
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

  const globalServices = [
    {
      title: "Dubai Trade License",
      description: "Comprehensive assistance to obtain your business license in Dubai, one of the world's most strategic business hubs.",
      icon: <FileText className="h-10 w-10" />,
      features: [
        "Mainland and free zone options",
        "Complete documentation support",
        "Legal compliance guidance",
        "Bank account setup assistance"
      ]
    },
    {
      title: "International Fintech Reach",
      description: "Strategic guidance to expand your fintech operations into international markets with regulatory compliance.",
      icon: <Landmark className="h-10 w-10" />,
      features: [
        "Regulatory compliance strategy",
        "Cross-border payment solutions",
        "International banking relationships",
        "Fintech infrastructure setup"
      ]
    },
    {
      title: "Global Market Analysis",
      description: "In-depth research and analysis to identify optimal markets for your business expansion based on various factors.",
      icon: <BarChart3 className="h-10 w-10" />,
      features: [
        "Market size and potential assessment",
        "Competitive landscape analysis",
        "Consumer behavior research",
        "Growth opportunity identification"
      ]
    },
    {
      title: "Legal Compliance",
      description: "Expert guidance on navigating the complex legal requirements across different international jurisdictions.",
      icon: <Scale className="h-10 w-10" />,
      features: [
        "Business entity formation",
        "Intellectual property protection",
        "Contract drafting and review",
        "Compliance with local regulations"
      ]
    },
    {
      title: "Cross-border Transactions",
      description: "Efficient solutions for managing international payments, currency exchange, and financial operations.",
      icon: <Briefcase className="h-10 w-10" />,
      features: [
        "Multi-currency payment processing",
        "International tax planning",
        "Secure transaction protocols",
        "Financial risk management"
      ]
    },
    {
      title: "International Office Setup",
      description: "End-to-end support for establishing your physical presence in new global markets with minimal friction.",
      icon: <Building className="h-10 w-10" />,
      features: [
        "Office location selection",
        "Infrastructure setup",
        "Local staff recruitment",
        "Operational guidance"
      ]
    }
  ];

  return (
    <div className="min-h-screen w-full overflow-x-hidden relative bg-gradient-to-b from-gray-50 to-white">
      {/* Background patterns */}
      <CircuitBackground 
        pattern="curvy-line" 
        className="fixed top-0 right-0" 
        size="lg" 
        opacity={0.1} 
        color="primary"
      />
      
      <CircuitBackground 
        pattern="dotted-grid" 
        className="fixed top-1/4 right-1/4" 
        size="md" 
        opacity={0.1}
      />
      
      {/* Main content */}
      <Navbar />
      
      <main className="w-full pt-16">
        {/* Hero Section */}
        <section className="relative py-28 px-6 md:px-12 lg:px-24 overflow-hidden">
          <div className="container mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div className="max-w-4xl mx-auto lg:mx-0 relative z-10">
                <span className="inline-block px-4 py-1.5 text-sm font-medium bg-blue-100 text-blue-800 rounded-full mb-6 animate-fade-in shadow-sm">
                  Global Expansion
                </span>
                <h1 className="text-5xl md:text-6xl font-bold mb-6 hero-text-gradient animate-fade-in" style={{ animationDelay: '100ms' }}>
                  Extend Your Business to International Markets
                </h1>
                <p className="text-xl md:text-2xl font-light text-gray-600 mb-10 animate-fade-in" style={{ animationDelay: '200ms' }}>
                  Strategic guidance and comprehensive support to help your business successfully expand into global markets.
                </p>
                
                <div className="flex flex-wrap gap-4 animate-fade-in" style={{ animationDelay: '300ms' }}>
                  <Button 
                    size="lg" 
                    className="bg-blue-600 hover:bg-blue-700 text-white btn-shine shadow-md hover:shadow-lg"
                    onClick={() => {
                      toast.success("Request sent", {
                        description: "We'll get back to you shortly to discuss your global expansion plans."
                      });
                    }}
                  >
                    Start Your Global Journey
                  </Button>
                  <Button 
                    size="lg" 
                    variant="outline"
                    className="border-blue-200 text-blue-700 hover:bg-blue-50"
                    onClick={() => {
                      document.getElementById('services')?.scrollIntoView({ behavior: 'smooth' });
                    }}
                  >
                    Explore Services
                  </Button>
                </div>
              </div>
              
              <div className="relative mx-auto max-w-md lg:max-w-full">
                <div className="absolute inset-0 bg-gradient-to-r from-blue-300/20 to-cyan-400/20 rounded-xl blur-2xl transform scale-110"></div>
                <div className="relative z-10">
                  <img 
                    src="/lovable-uploads/239901fa-6133-4fd7-8a25-6130c3d2a60e.png" 
                    alt="Global Expansion Illustration" 
                    className="w-full h-auto transform hover:scale-105 transition-transform duration-700"
                  />
                </div>
              </div>
            </div>
          </div>
        </section>
        
        {/* Services Section */}
        <section id="services" className="py-20 px-6 md:px-12">
          <div className="container mx-auto">
            <div className="text-center mb-16 fade-up">
              <span className="inline-block px-3 py-1 text-sm font-medium bg-blue-100 text-blue-800 rounded-full mb-4">
                Our Global Services
              </span>
              <h2 className="text-3xl md:text-4xl font-bold mb-6">Comprehensive Global Expansion Solutions</h2>
              <p className="text-gray-600 max-w-3xl mx-auto">
                From market entry strategy to operational setup, we provide end-to-end support for businesses 
                looking to expand their footprint globally.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {globalServices.map((service, index) => (
                <Card 
                  key={index} 
                  className="p-8 hover:shadow-lg transition-all duration-300 border border-gray-200 hover:border-blue-200 fade-up"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <div className="text-blue-600 mb-4 w-16 h-16 rounded-xl flex items-center justify-center bg-blue-100">
                    {service.icon}
                  </div>
                  <h3 className="text-xl font-semibold mb-3">{service.title}</h3>
                  <p className="text-gray-600 mb-6">{service.description}</p>
                  
                  <div className="mb-6">
                    <h4 className="text-sm font-semibold text-gray-700 mb-3">What We Offer:</h4>
                    <ul className="space-y-2">
                      {service.features.map((feature, idx) => (
                        <li key={idx} className="flex items-start">
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-blue-600 mt-0.5" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                          </svg>
                          <span className="ml-2 text-gray-700">{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  
                  <Button 
                    variant="link" 
                    className="text-blue-600 hover:text-blue-800 p-0 h-auto flex items-center"
                    onClick={() => {
                      toast.success(`Learn more about ${service.title}`, {
                        description: "We'll share detailed information about this service."
                      });
                    }}
                  >
                    Learn More
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </Card>
              ))}
            </div>
          </div>
        </section>
        
        {/* Global Markets Section */}
        <section className="py-20 px-6 md:px-12 bg-gray-50">
          <div className="container mx-auto">
            <div className="text-center mb-16 fade-up">
              <span className="inline-block px-3 py-1 text-sm font-medium bg-blue-100 text-blue-800 rounded-full mb-4">
                Strategic Markets
              </span>
              <h2 className="text-3xl md:text-4xl font-bold mb-6">Key Global Markets We Support</h2>
              <p className="text-gray-600 max-w-3xl mx-auto">
                We provide specialized expertise in these high-potential markets for business expansion.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[
                {
                  region: "United Arab Emirates",
                  description: "A strategic hub for businesses looking to access markets in the Middle East, Africa, and South Asia.",
                  icon: <MapPin className="h-8 w-8" />,
                  advantages: ["Tax advantages", "Strategic location", "World-class infrastructure", "Business-friendly regulations"]
                },
                {
                  region: "Southeast Asia",
                  description: "Fast-growing economies with young populations and increasing digital adoption.",
                  icon: <MapPin className="h-8 w-8" />,
                  advantages: ["Large consumer markets", "Tech-savvy population", "Growing middle class", "Digital economy growth"]
                },
                {
                  region: "European Union",
                  description: "Access to one of the world's largest unified markets with strong regulatory frameworks.",
                  icon: <MapPin className="h-8 w-8" />,
                  advantages: ["Single market access", "Established legal systems", "Skilled workforce", "Innovation hubs"]
                }
              ].map((market, index) => (
                <Card 
                  key={index} 
                  className="p-8 hover:shadow-lg transition-all duration-300 border-t-4 border-t-blue-500 fade-up"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <div className="text-blue-600 mb-4">
                    {market.icon}
                  </div>
                  <h3 className="text-xl font-semibold mb-3">{market.region}</h3>
                  <p className="text-gray-600 mb-6">{market.description}</p>
                  
                  <div>
                    <h4 className="text-sm font-semibold text-gray-700 mb-3">Key Advantages:</h4>
                    <ul className="space-y-2">
                      {market.advantages.map((advantage, idx) => (
                        <li key={idx} className="flex items-center">
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-blue-500 mr-2" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                          </svg>
                          <span>{advantage}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        </section>
        
        {/* Why Choose Us Section */}
        <section className="py-20 px-6 md:px-12">
          <div className="container mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div className="relative mx-auto max-w-md lg:max-w-full order-2 lg:order-1">
                <div className="relative">
                  <div className="absolute -top-6 -left-6 w-48 h-48 bg-blue-100 rounded-full opacity-50"></div>
                  <div className="absolute -bottom-6 -right-6 w-48 h-48 bg-cyan-100 rounded-full opacity-50"></div>
                  <img 
                    src="/lovable-uploads/e1c7d349-0eed-4a0e-8fc0-68bdd099b7a4.png" 
                    alt="Global Team" 
                    className="relative z-10 rounded-xl"
                  />
                </div>
              </div>
              
              <div className="order-1 lg:order-2 fade-up">
                <span className="inline-block px-3 py-1 text-sm font-medium bg-blue-100 text-blue-800 rounded-full mb-4">
                  Why Choose Us
                </span>
                <h2 className="text-3xl md:text-4xl font-bold mb-6">Your Trusted Partner for Global Expansion</h2>
                <p className="text-gray-600 mb-8">
                  With our extensive international experience and local expertise, we guide businesses 
                  through the complexities of global expansion, ensuring a smooth and successful journey.
                </p>
                
                <div className="space-y-6">
                  {[
                    {
                      title: "Local Expertise",
                      description: "Our team includes experts with deep knowledge of local markets, regulations, and business practices.",
                      icon: <Compass className="h-6 w-6" />
                    },
                    {
                      title: "Proven Track Record",
                      description: "We've successfully helped numerous businesses establish and grow their presence in international markets.",
                      icon: <BarChart3 className="h-6 w-6" />
                    },
                    {
                      title: "End-to-End Support",
                      description: "From strategy development to operational implementation, we provide comprehensive support at every step.",
                      icon: <Globe className="h-6 w-6" />
                    }
                  ].map((point, index) => (
                    <div key={index} className="flex">
                      <div className="flex-shrink-0 mr-4 p-2 bg-blue-100 rounded-lg text-blue-600">
                        {point.icon}
                      </div>
                      <div>
                        <h3 className="text-lg font-semibold mb-2">{point.title}</h3>
                        <p className="text-gray-600">{point.description}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>
        
        {/* CTA Section */}
        <section className="py-24 px-6 md:px-12 bg-gradient-to-r from-blue-900 to-cyan-800 text-white">
          <div className="container mx-auto">
            <div className="max-w-4xl mx-auto text-center fade-up">
              <span className="inline-block px-4 py-1.5 text-sm font-medium bg-white/20 text-white rounded-full mb-6">
                Take the Next Step
              </span>
              <h2 className="text-3xl md:text-4xl font-bold mb-6">Ready to Expand Your Business Globally?</h2>
              <p className="text-xl opacity-90 mb-10 max-w-2xl mx-auto">
                Let's discuss your global expansion goals and develop a tailored strategy to help your business succeed in international markets.
              </p>
              
              <div className="flex flex-wrap justify-center gap-4">
                <Button 
                  size="lg" 
                  className="bg-white text-blue-900 hover:bg-gray-100 btn-shine"
                  onClick={() => {
                    toast.success("Contact form opened", {
                      description: "Fill out the form below to get in touch with our global expansion experts."
                    });
                  }}
                >
                  Schedule a Strategy Session
                </Button>
                <Button 
                  size="lg" 
                  variant="outline" 
                  className="border-white text-white hover:bg-white/10"
                  onClick={() => {
                    toast.success("Market guide request sent", {
                      description: "We'll send you our global market entry guides shortly."
                    });
                  }}
                >
                  Download Market Entry Guide
                </Button>
              </div>
            </div>
          </div>
        </section>
        
        <ContactSection />
        <Footer />
      </main>
    </div>
  );
};

export default GlobalExpansionPage;
