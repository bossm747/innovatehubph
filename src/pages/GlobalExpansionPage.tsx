
import React, { useEffect } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import ContactSection from '@/components/ContactSection';
import CircuitBackground from '@/components/CircuitBackground';
import { Globe, ArrowRight, Check } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Toaster } from 'sonner';
import { toast } from 'sonner';

const GlobalExpansionPage = () => {
  // Scroll reveal effect
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
      <Toaster position="top-right" />
      
      {/* Background patterns */}
      <CircuitBackground 
        pattern="curvy-line" 
        className="fixed top-0 right-0" 
        size="lg" 
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
        pattern="dotted-grid" 
        className="fixed top-1/4 right-1/4" 
        size="md" 
        opacity={0.1}
      />
      
      {/* Main content */}
      <Navbar />
      <main className="w-full pt-16">
        {/* Hero Section */}
        <section className="relative py-28 px-6 md:px-12 lg:px-24 bg-gradient-to-r from-blue-500/10 to-cyan-700/10 overflow-hidden">
          <div className="container mx-auto">
            <div className="max-w-4xl mx-auto text-center relative z-10">
              <span className="inline-block px-4 py-1.5 text-sm font-medium bg-blue-100 text-blue-800 rounded-full mb-6 animate-fade-in shadow-sm">
                International Growth
              </span>
              <h1 className="text-5xl md:text-6xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-cyan-700 animate-fade-in" style={{ animationDelay: '100ms' }}>
                Global Expansion
              </h1>
              <p className="text-xl md:text-2xl font-light text-gray-600 mb-10 animate-fade-in" style={{ animationDelay: '200ms' }}>
                Extend Your Business to International Markets
              </p>
              
              <div className="flex justify-center gap-4 animate-fade-in" style={{ animationDelay: '300ms' }}>
                <Button 
                  size="lg" 
                  className="bg-blue-600 hover:bg-blue-700 text-white shadow-lg hover:shadow-xl transition-all duration-300"
                  onClick={() => {
                    document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
                  }}
                >
                  Get Started
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
                <Button 
                  variant="outline" 
                  size="lg" 
                  className="border-blue-200 text-blue-700 hover:bg-blue-50 shadow-sm"
                  onClick={() => {
                    toast.success("Consultation request sent", {
                      description: "We'll contact you shortly with more information about global expansion."
                    });
                  }}
                >
                  Request a Consultation
                </Button>
              </div>
            </div>
          </div>
          
          {/* Background decorative elements */}
          <div className="absolute top-20 left-20 w-64 h-64 bg-blue-300/20 rounded-full blur-3xl"></div>
          <div className="absolute bottom-20 right-20 w-80 h-80 bg-cyan-400/20 rounded-full blur-3xl"></div>
          
          {/* Hero image */}
          <div className="mt-20 relative max-w-6xl mx-auto overflow-visible">
            <div className="absolute inset-0 -z-10 bg-gradient-to-r from-blue-300/20 to-cyan-500/20 rounded-xl blur-2xl transform scale-110"></div>
            <div className="overflow-hidden rounded-xl shadow-2xl relative border border-white/20 transition-all duration-500 hover:shadow-blue-500/20">
              <img 
                src="/lovable-uploads/a2eb57ca-42be-4d9e-9770-cd7f0b98796c.png" 
                alt="Global Expansion" 
                className="w-full h-auto relative z-10 transform transition-transform duration-700 hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-blue-900/30 to-transparent z-20"></div>
            </div>
          </div>
        </section>
        
        {/* Services Section */}
        <section className="py-20 px-6 md:px-12 bg-white">
          <div className="container mx-auto">
            <div className="text-center mb-16 fade-up">
              <span className="inline-block px-3 py-1 text-sm font-medium bg-blue-100 text-blue-800 rounded-full mb-4">
                Our Offerings
              </span>
              <h2 className="text-3xl md:text-4xl font-bold mb-6">Global Expansion Services</h2>
              <p className="text-gray-600 max-w-3xl mx-auto">
                We provide comprehensive support to help your business expand into international markets successfully.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
              {[
                {
                  icon: <Globe className="h-10 w-10" />,
                  title: "Dubai Trade License",
                  description: "Complete assistance with obtaining trade licenses and setting up your business in Dubai."
                },
                {
                  icon: <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                  </svg>,
                  title: "International Fintech Reach",
                  description: "Expand your fintech solutions globally with our specialized knowledge and networks."
                },
                {
                  icon: <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                  </svg>,
                  title: "Global Market Analysis",
                  description: "Data-driven insights to identify opportunities and navigate challenges in new markets."
                },
                {
                  icon: <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 6l3 1m0 0l-3 9a5.002 5.002 0 006.001 0M6 7l3 9M6 7l6-2m6 2l3-1m-3 1l-3 9a5.002 5.002 0 006.001 0M18 7l3 9m-3-9l-6-2m0-2v2m0 16V5m0 16H9m3 0h3" />
                  </svg>,
                  title: "Legal Compliance",
                  description: "Expert guidance on international regulations, taxes, and compliance requirements."
                },
                {
                  icon: <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" />
                  </svg>,
                  title: "Cross-border Transactions",
                  description: "Secure and efficient payment solutions for international business operations."
                },
                {
                  icon: <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                  </svg>,
                  title: "International Recruitment",
                  description: "Access to global talent and assistance with building international teams."
                }
              ].map((service, index) => (
                <div 
                  key={index} 
                  className="bg-white p-8 rounded-xl shadow-soft border border-gray-100 hover:shadow-md transition-all duration-300 fade-up"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <div className="w-16 h-16 rounded-xl flex items-center justify-center mb-6 text-white bg-gradient-to-r from-blue-500 to-cyan-700 shadow-md">
                    {service.icon}
                  </div>
                  <h3 className="text-xl font-semibold mb-3">{service.title}</h3>
                  <p className="text-gray-600">{service.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
        
        {/* Dubai Focus Section */}
        <section className="py-20 px-6 md:px-12 bg-gray-50">
          <div className="container mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div className="fade-up">
                <span className="inline-block px-3 py-1 text-sm font-medium bg-blue-100 text-blue-800 rounded-full mb-4">
                  Dubai Expansion
                </span>
                <h2 className="text-3xl md:text-4xl font-bold mb-6">Why Expand to Dubai?</h2>
                <p className="text-gray-600 mb-8">
                  Dubai offers a strategic hub for businesses looking to expand into the Middle East, Africa, and beyond, with numerous advantages.
                </p>
                
                <div className="space-y-6">
                  {[
                    {
                      title: "Strategic Location",
                      description: "Dubai serves as a bridge between East and West, providing access to markets across Asia, Europe, Africa, and the Middle East."
                    },
                    {
                      title: "Business-Friendly Environment",
                      description: "Enjoy tax benefits, easy company formation processes, and minimal bureaucratic barriers."
                    },
                    {
                      title: "Advanced Infrastructure",
                      description: "World-class facilities, transportation networks, and technological infrastructure support business operations."
                    },
                    {
                      title: "Fintech Innovation Hub",
                      description: "Dubai is rapidly becoming a leading center for fintech development and innovation."
                    },
                    {
                      title: "Multicultural Workforce",
                      description: "Access to diverse, skilled talent from around the world to support your business growth."
                    }
                  ].map((benefit, index) => (
                    <div 
                      key={index} 
                      className="flex items-start"
                      style={{ animationDelay: `${index * 100}ms` }}
                    >
                      <div className="flex-shrink-0 mr-4">
                        <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center text-blue-600">
                          <Check className="h-5 w-5" />
                        </div>
                      </div>
                      <div>
                        <h3 className="text-lg font-semibold mb-1">{benefit.title}</h3>
                        <p className="text-gray-600">{benefit.description}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              
              <div className="relative fade-up order-first lg:order-last">
                <div className="absolute inset-0 -z-10 bg-gradient-to-r from-blue-300/20 to-cyan-500/20 rounded-xl blur-2xl transform scale-110"></div>
                <div className="overflow-hidden rounded-xl shadow-xl relative border border-white/20">
                  <img 
                    src="/lovable-uploads/769542b9-804c-45db-a9db-c4002dd84e1f.png" 
                    alt="Dubai Skyline" 
                    className="w-full h-auto relative z-10"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-blue-900/30 to-transparent z-20"></div>
                </div>
              </div>
            </div>
          </div>
        </section>
        
        {/* Process Section */}
        <section className="py-20 px-6 md:px-12 bg-white">
          <div className="container mx-auto">
            <div className="text-center mb-16 fade-up">
              <span className="inline-block px-3 py-1 text-sm font-medium bg-blue-100 text-blue-800 rounded-full mb-4">
                Our Process
              </span>
              <h2 className="text-3xl md:text-4xl font-bold mb-6">How We Support Your Global Expansion</h2>
              <p className="text-gray-600 max-w-3xl mx-auto">
                Our structured approach ensures a smooth and successful international expansion journey.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                {
                  phase: "Phase 1",
                  title: "Strategy & Planning",
                  items: [
                    "Market opportunity assessment",
                    "Competitive landscape analysis",
                    "Financial planning and forecasting",
                    "Risk assessment and mitigation strategies",
                    "Entry strategy development"
                  ]
                },
                {
                  phase: "Phase 2",
                  title: "Implementation",
                  items: [
                    "Legal entity establishment",
                    "Regulatory compliance setup",
                    "Banking and financial infrastructure",
                    "Office space and logistics",
                    "Team recruitment and onboarding"
                  ]
                },
                {
                  phase: "Phase 3",
                  title: "Growth & Optimization",
                  items: [
                    "Local market penetration strategies",
                    "Partnership and distribution networks",
                    "Ongoing compliance management",
                    "Performance monitoring and optimization",
                    "Further expansion planning"
                  ]
                }
              ].map((phase, index) => (
                <div 
                  key={index} 
                  className="bg-blue-50 rounded-xl overflow-hidden fade-up"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <div className="bg-gradient-to-r from-blue-500 to-cyan-700 p-4 text-white">
                    <span className="text-sm font-medium text-blue-100">{phase.phase}</span>
                    <h3 className="text-xl font-bold">{phase.title}</h3>
                  </div>
                  <div className="p-6">
                    <ul className="space-y-3">
                      {phase.items.map((item, i) => (
                        <li key={i} className="flex items-start">
                          <div className="flex-shrink-0 mr-3">
                            <div className="w-5 h-5 rounded-full bg-blue-100 flex items-center justify-center text-blue-600">
                              <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3" viewBox="0 0 20 20" fill="currentColor">
                                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                              </svg>
                            </div>
                          </div>
                          <span className="text-gray-700">{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
        
        {/* Success Stories Section */}
        <section className="py-20 px-6 md:px-12 bg-gray-50">
          <div className="container mx-auto">
            <div className="text-center mb-16 fade-up">
              <span className="inline-block px-3 py-1 text-sm font-medium bg-blue-100 text-blue-800 rounded-full mb-4">
                Case Studies
              </span>
              <h2 className="text-3xl md:text-4xl font-bold mb-6">Global Expansion Success Stories</h2>
              <p className="text-gray-600 max-w-3xl mx-auto">
                Learn how we've helped businesses like yours successfully expand to international markets.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
              {[
                {
                  title: "Philippine Fintech Startup's Dubai Launch",
                  description: "Helped a fintech company from the Philippines establish operations in Dubai, securing necessary licenses and building local partnerships.",
                  image: "/lovable-uploads/45881ff2-13a3-4bc4-a639-da000d90c94a.png",
                  results: [
                    "30% revenue growth in first year",
                    "Successfully secured Series A funding",
                    "Established partnerships with 3 major banks"
                  ]
                },
                {
                  title: "E-Commerce Platform's Middle East Expansion",
                  description: "Supported an e-commerce platform in entering the Middle Eastern market through Dubai, adapting their business model to local preferences.",
                  image: "/lovable-uploads/3113cd1e-8a6f-4c4b-b8a8-c7e24d9aa394.png",
                  results: [
                    "50,000+ new customers in first 6 months",
                    "Successfully localized payment systems",
                    "Optimized logistics for regional delivery"
                  ]
                }
              ].map((case_study, index) => (
                <div 
                  key={index} 
                  className="bg-white rounded-xl overflow-hidden shadow-md hover:shadow-lg transition-all duration-300 fade-up"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <div className="relative h-60">
                    <img 
                      src={case_study.image} 
                      alt={case_study.title} 
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                    <h3 className="absolute bottom-0 left-0 text-white text-xl font-semibold p-6">{case_study.title}</h3>
                  </div>
                  <div className="p-6">
                    <p className="text-gray-600 mb-4">{case_study.description}</p>
                    
                    <h4 className="text-lg font-semibold mb-3">Results:</h4>
                    <ul className="space-y-2 mb-6">
                      {case_study.results.map((result, i) => (
                        <li key={i} className="flex items-start">
                          <div className="flex-shrink-0 mr-3">
                            <div className="w-5 h-5 rounded-full bg-blue-100 flex items-center justify-center text-blue-600">
                              <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3" viewBox="0 0 20 20" fill="currentColor">
                                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                              </svg>
                            </div>
                          </div>
                          <span className="text-gray-700">{result}</span>
                        </li>
                      ))}
                    </ul>
                    
                    <Button 
                      variant="link" 
                      className="text-blue-600 hover:text-blue-800 p-0 h-auto flex items-center"
                      onClick={() => {
                        toast.info("Case study details", {
                          description: "Full case study coming soon. Contact us for more information."
                        });
                      }}
                    >
                      Read Full Case Study
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
        
        {/* CTA Section */}
        <section className="py-20 px-6 md:px-12 bg-gradient-to-r from-blue-500 to-cyan-700 text-white">
          <div className="container mx-auto max-w-4xl text-center fade-up">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">Ready to Take Your Business Global?</h2>
            <p className="text-white/80 text-lg mb-10 max-w-3xl mx-auto">
              Let's explore how our global expansion services can help your business reach new international markets successfully.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button 
                size="lg" 
                className="bg-white text-blue-700 hover:bg-gray-100 shadow-lg hover:shadow-xl transition-all duration-300"
                onClick={() => {
                  document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
                }}
              >
                Start Your Global Journey
              </Button>
              <Button 
                variant="outline" 
                size="lg" 
                className="border-white/30 text-white hover:bg-white/10"
                onClick={() => {
                  toast.success("Consultation request sent", {
                    description: "We'll contact you shortly to discuss your global expansion plans."
                  });
                }}
              >
                Schedule a Strategy Session
              </Button>
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
