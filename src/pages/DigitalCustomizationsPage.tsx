
import React, { useEffect } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import ContactSection from '@/components/ContactSection';
import CircuitBackground from '@/components/CircuitBackground';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { ArrowRight, Code, Cpu, Database, GitBranch, GitMerge, GitPullRequest, Layers, Settings, Terminal } from 'lucide-react';
import { toast } from 'sonner';

const DigitalCustomizationsPage = () => {
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

  const customSolutions = [
    {
      title: "Custom Software Development",
      description: "Tailored software solutions designed to meet the unique needs of your business, from concept to deployment.",
      icon: <Code className="h-10 w-10" />,
      benefits: [
        "Perfectly aligned with your business processes",
        "Scalable as your business grows",
        "Exclusive to your organization",
        "Enhanced competitive advantage"
      ]
    },
    {
      title: "Business Model Development",
      description: "Strategic development and implementation of innovative business models to transform your operations.",
      icon: <Layers className="h-10 w-10" />,
      benefits: [
        "Revenue stream diversification",
        "Market disruption strategies",
        "Cost optimization frameworks",
        "Long-term growth planning"
      ]
    },
    {
      title: "Strategic IT Consulting",
      description: "Expert guidance on leveraging technology to solve business challenges and achieve strategic objectives.",
      icon: <Settings className="h-10 w-10" />,
      benefits: [
        "Technology roadmapping",
        "Digital transformation strategy",
        "IT infrastructure assessment",
        "Security and compliance planning"
      ]
    },
    {
      title: "Digital Transformation",
      description: "Comprehensive services to help organizations evolve their business practices through digital technology.",
      icon: <GitBranch className="h-10 w-10" />,
      benefits: [
        "Process automation",
        "Legacy system modernization",
        "Data-driven decision making",
        "Enhanced customer experiences"
      ]
    },
    {
      title: "System Integration",
      description: "Seamless connection of disparate systems and data sources to create a unified technology ecosystem.",
      icon: <GitMerge className="h-10 w-10" />,
      benefits: [
        "Streamlined workflows",
        "Eliminated data silos",
        "Improved operational efficiency",
        "Enhanced data visibility"
      ]
    },
    {
      title: "Database Solutions",
      description: "Design, development and optimization of database systems to effectively manage your business data.",
      icon: <Database className="h-10 w-10" />,
      benefits: [
        "Optimized data storage",
        "Improved data retrieval speed",
        "Data security enhancements",
        "Scalable architecture"
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
                <span className="inline-block px-4 py-1.5 text-sm font-medium bg-innovate-100 text-innovate-800 rounded-full mb-6 animate-fade-in shadow-sm">
                  Digital Customizations
                </span>
                <h1 className="text-5xl md:text-6xl font-bold mb-6 hero-text-gradient animate-fade-in" style={{ animationDelay: '100ms' }}>
                  Tailored Digital Solutions
                </h1>
                <p className="text-xl md:text-2xl font-light text-gray-600 mb-10 animate-fade-in" style={{ animationDelay: '200ms' }}>
                  Custom software, business model development, and strategic IT consulting for your organization's unique needs.
                </p>
                
                <div className="flex flex-wrap gap-4 animate-fade-in" style={{ animationDelay: '300ms' }}>
                  <Button 
                    size="lg" 
                    className="bg-innovate-600 hover:bg-innovate-700 text-white btn-shine shadow-md hover:shadow-lg"
                    onClick={() => {
                      toast.success("Request sent", {
                        description: "We'll get back to you shortly to discuss your digital customization needs."
                      });
                    }}
                  >
                    Request a Consultation
                  </Button>
                  <Button 
                    size="lg" 
                    variant="outline"
                    className="border-innovate-200 text-innovate-700 hover:bg-innovate-50"
                    onClick={() => {
                      document.getElementById('solutions')?.scrollIntoView({ behavior: 'smooth' });
                    }}
                  >
                    Explore Solutions
                  </Button>
                </div>
              </div>
              
              <div className="relative mx-auto max-w-md lg:max-w-full">
                <div className="absolute inset-0 bg-gradient-to-r from-purple-300/20 to-indigo-400/20 rounded-xl blur-2xl transform scale-110"></div>
                <div className="relative z-10">
                  <img 
                    src="/lovable-uploads/450bb043-23a9-4c77-9e82-8f9a75db1746.png" 
                    alt="Digital Customizations Illustration" 
                    className="w-full h-auto transform hover:scale-105 transition-transform duration-700"
                  />
                </div>
              </div>
            </div>
          </div>
        </section>
        
        {/* Main Solutions Section */}
        <section id="solutions" className="py-20 px-6 md:px-12">
          <div className="container mx-auto">
            <div className="text-center mb-16 fade-up">
              <span className="inline-block px-3 py-1 text-sm font-medium bg-purple-100 text-purple-800 rounded-full mb-4">
                Our Solutions
              </span>
              <h2 className="text-3xl md:text-4xl font-bold mb-6">Comprehensive Digital Customization Services</h2>
              <p className="text-gray-600 max-w-3xl mx-auto">
                We develop tailored digital solutions that align perfectly with your business needs, 
                creating custom software that helps you operate more efficiently and effectively.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {customSolutions.map((solution, index) => (
                <Card 
                  key={index} 
                  className="p-8 hover:shadow-lg transition-all duration-300 border border-gray-200 hover:border-purple-200 fade-up"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <div className="text-purple-600 mb-4 w-16 h-16 rounded-xl flex items-center justify-center bg-purple-100">
                    {solution.icon}
                  </div>
                  <h3 className="text-xl font-semibold mb-3">{solution.title}</h3>
                  <p className="text-gray-600 mb-6">{solution.description}</p>
                  
                  <div className="mb-6">
                    <h4 className="text-sm font-semibold text-gray-700 mb-3">Key Benefits:</h4>
                    <ul className="space-y-2">
                      {solution.benefits.map((benefit, idx) => (
                        <li key={idx} className="flex items-start">
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-purple-600 mt-0.5" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                          </svg>
                          <span className="ml-2 text-gray-700">{benefit}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  
                  <Button 
                    variant="link" 
                    className="text-purple-600 hover:text-purple-800 p-0 h-auto flex items-center"
                    onClick={() => {
                      toast.success(`Learn more about ${solution.title}`, {
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
        
        {/* Our Process Section */}
        <section className="py-20 px-6 md:px-12 bg-gray-50">
          <div className="container mx-auto">
            <div className="text-center mb-16 fade-up">
              <span className="inline-block px-3 py-1 text-sm font-medium bg-innovate-100 text-innovate-800 rounded-full mb-4">
                Our Process
              </span>
              <h2 className="text-3xl md:text-4xl font-bold mb-6">How We Develop Your Custom Solution</h2>
              <p className="text-gray-600 max-w-3xl mx-auto">
                Our systematic approach ensures we deliver high-quality custom digital solutions 
                that perfectly match your business requirements.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {[
                {
                  step: "01",
                  title: "Discovery & Analysis",
                  description: "We start by understanding your business needs, challenges, and objectives through in-depth consultation.",
                  icon: <GitPullRequest className="h-8 w-8" />
                },
                {
                  step: "02",
                  title: "Solution Design",
                  description: "Our team creates a detailed blueprint for your custom solution, including architecture and user experience.",
                  icon: <Layers className="h-8 w-8" />
                },
                {
                  step: "03",
                  title: "Development",
                  description: "We build your solution using modern technologies and following industry best practices.",
                  icon: <Terminal className="h-8 w-8" />
                },
                {
                  step: "04",
                  title: "Testing & Deployment",
                  description: "Rigorous testing ensures your solution works flawlessly before we help you implement it in your environment.",
                  icon: <Cpu className="h-8 w-8" />
                }
              ].map((phase, index) => (
                <div 
                  key={index} 
                  className="relative p-6 bg-white rounded-xl shadow-sm border border-gray-100 fade-up"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <div className="absolute -top-4 -left-4 w-10 h-10 rounded-full bg-purple-600 text-white flex items-center justify-center font-bold text-sm">
                    {phase.step}
                  </div>
                  <div className="mt-4 mb-4 p-4 bg-purple-50 rounded-lg inline-block text-purple-600">
                    {phase.icon}
                  </div>
                  <h3 className="text-xl font-semibold mb-3">{phase.title}</h3>
                  <p className="text-gray-600">{phase.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
        
        {/* CTA Section */}
        <section className="py-24 px-6 md:px-12 bg-gradient-to-r from-purple-900 to-indigo-800 text-white">
          <div className="container mx-auto">
            <div className="max-w-4xl mx-auto text-center fade-up">
              <span className="inline-block px-4 py-1.5 text-sm font-medium bg-white/20 text-white rounded-full mb-6">
                Get Started
              </span>
              <h2 className="text-3xl md:text-4xl font-bold mb-6">Ready to Transform Your Business?</h2>
              <p className="text-xl opacity-90 mb-10 max-w-2xl mx-auto">
                Let's discuss how our digital customization services can help your business overcome challenges and achieve growth.
              </p>
              
              <div className="flex flex-wrap justify-center gap-4">
                <Button 
                  size="lg" 
                  className="bg-white text-purple-900 hover:bg-gray-100 btn-shine"
                  onClick={() => {
                    toast.success("Contact form opened", {
                      description: "Fill out the form below to get in touch with our team."
                    });
                  }}
                >
                  Schedule a Consultation
                </Button>
                <Button 
                  size="lg" 
                  variant="outline" 
                  className="border-white text-white hover:bg-white/10"
                  onClick={() => {
                    toast.success("Portfolio request sent", {
                      description: "We'll send you our digital customization portfolio shortly."
                    });
                  }}
                >
                  View Our Portfolio
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

export default DigitalCustomizationsPage;
