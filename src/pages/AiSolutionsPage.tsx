
import React, { useEffect } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import ContactSection from '@/components/ContactSection';
import CircuitBackground from '@/components/CircuitBackground';
import { Bot, ArrowRight, Check } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Toaster } from 'sonner';
import { toast } from 'sonner';

const AiSolutionsPage = () => {
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
        <section className="relative py-28 px-6 md:px-12 lg:px-24 bg-gradient-to-r from-amber-500/10 to-orange-700/10 overflow-hidden">
          <div className="container mx-auto">
            <div className="max-w-4xl mx-auto text-center relative z-10">
              <span className="inline-block px-4 py-1.5 text-sm font-medium bg-amber-100 text-amber-800 rounded-full mb-6 animate-fade-in shadow-sm">
                AI-Powered Solutions
              </span>
              <h1 className="text-5xl md:text-6xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-amber-500 to-orange-700 animate-fade-in" style={{ animationDelay: '100ms' }}>
                AI Solutions
              </h1>
              <p className="text-xl md:text-2xl font-light text-gray-600 mb-10 animate-fade-in" style={{ animationDelay: '200ms' }}>
                Intelligent Automation for Business Growth
              </p>
              
              <div className="flex justify-center gap-4 animate-fade-in" style={{ animationDelay: '300ms' }}>
                <Button 
                  size="lg" 
                  className="bg-amber-600 hover:bg-amber-700 text-white shadow-lg hover:shadow-xl transition-all duration-300"
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
                  className="border-amber-200 text-amber-700 hover:bg-amber-50 shadow-sm"
                  onClick={() => {
                    toast.success("Demo request sent", {
                      description: "We'll contact you shortly with more information."
                    });
                  }}
                >
                  Request a Demo
                </Button>
              </div>
            </div>
          </div>
          
          {/* Background decorative elements */}
          <div className="absolute top-20 left-20 w-64 h-64 bg-amber-300/20 rounded-full blur-3xl"></div>
          <div className="absolute bottom-20 right-20 w-80 h-80 bg-orange-400/20 rounded-full blur-3xl"></div>
          
          {/* Hero image */}
          <div className="mt-20 relative max-w-6xl mx-auto overflow-visible">
            <div className="absolute inset-0 -z-10 bg-gradient-to-r from-amber-300/20 to-orange-500/20 rounded-xl blur-2xl transform scale-110"></div>
            <div className="overflow-hidden rounded-xl shadow-2xl relative border border-white/20 transition-all duration-500 hover:shadow-amber-500/20">
              <img 
                src="/lovable-uploads/2992c718-ef43-4ea4-8209-8ac48cc7cc87.png" 
                alt="AI Solutions" 
                className="w-full h-auto relative z-10 transform transition-transform duration-700 hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-amber-900/30 to-transparent z-20"></div>
            </div>
          </div>
        </section>
        
        {/* Features Section */}
        <section className="py-20 px-6 md:px-12 bg-white">
          <div className="container mx-auto">
            <div className="text-center mb-16 fade-up">
              <span className="inline-block px-3 py-1 text-sm font-medium bg-amber-100 text-amber-800 rounded-full mb-4">
                AI Capabilities
              </span>
              <h2 className="text-3xl md:text-4xl font-bold mb-6">Our AI-Powered Solutions</h2>
              <p className="text-gray-600 max-w-3xl mx-auto">
                We leverage the power of artificial intelligence to enhance business operations, improve decision-making, and create innovative customer experiences.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
              {[
                {
                  icon: <Bot className="h-10 w-10" />,
                  title: "Chatbots & Virtual Assistants",
                  description: "Intelligent conversational agents that provide 24/7 customer support and streamline internal processes."
                },
                {
                  icon: <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                  </svg>,
                  title: "Predictive Analytics",
                  description: "Data-driven insights that forecast trends, customer behavior, and business outcomes."
                },
                {
                  icon: <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                  </svg>,
                  title: "Process Automation",
                  description: "Smart automation solutions that eliminate repetitive tasks and optimize workflow efficiency."
                },
                {
                  icon: <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                  </svg>,
                  title: "Machine Learning Models",
                  description: "Custom algorithms that learn from your data to solve specific business challenges."
                },
                {
                  icon: <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-3l-4 4z" />
                  </svg>,
                  title: "Natural Language Processing",
                  description: "Technology that understands and generates human language for content analysis and creation."
                },
                {
                  icon: <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                  </svg>,
                  title: "Computer Vision",
                  description: "Visual recognition systems for image analysis, object detection, and quality control."
                }
              ].map((feature, index) => (
                <div 
                  key={index} 
                  className="bg-white p-8 rounded-xl shadow-soft border border-gray-100 hover:shadow-md transition-all duration-300 fade-up"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <div className="w-16 h-16 rounded-xl flex items-center justify-center mb-6 text-white bg-gradient-to-r from-amber-500 to-orange-700 shadow-md">
                    {feature.icon}
                  </div>
                  <h3 className="text-xl font-semibold mb-3">{feature.title}</h3>
                  <p className="text-gray-600">{feature.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
        
        {/* Use Cases Section */}
        <section className="py-20 px-6 md:px-12 bg-gray-50">
          <div className="container mx-auto">
            <div className="text-center mb-16 fade-up">
              <span className="inline-block px-3 py-1 text-sm font-medium bg-amber-100 text-amber-800 rounded-full mb-4">
                Industry Applications
              </span>
              <h2 className="text-3xl md:text-4xl font-bold mb-6">AI Solutions for Every Industry</h2>
              <p className="text-gray-600 max-w-3xl mx-auto">
                Discover how our AI solutions can transform various industries and business functions.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
              {[
                {
                  industry: "Financial Services",
                  description: "Fraud detection, risk assessment, algorithmic trading, and personalized financial advice.",
                  image: "/lovable-uploads/c482324a-e57b-4e5c-a15a-137cf7868b9a.png"
                },
                {
                  industry: "Healthcare",
                  description: "Diagnostic assistance, patient monitoring, treatment recommendations, and medical research.",
                  image: "/lovable-uploads/706dbe13-1f9f-4249-893e-f7d9022624f2.png"
                },
                {
                  industry: "Retail",
                  description: "Inventory forecasting, personalized recommendations, pricing optimization, and customer segmentation.",
                  image: "/lovable-uploads/3113cd1e-8a6f-4c4b-b8a8-c7e24d9aa394.png"
                },
                {
                  industry: "Manufacturing",
                  description: "Predictive maintenance, quality control, supply chain optimization, and production planning.",
                  image: "/lovable-uploads/c6d34d14-93e3-4090-8fe9-051cd0488981.png"
                },
                {
                  industry: "Customer Service",
                  description: "Intelligent chatbots, sentiment analysis, customer journey optimization, and support automation.",
                  image: "/lovable-uploads/2992c718-ef43-4ea4-8209-8ac48cc7cc87.png"
                },
                {
                  industry: "Marketing",
                  description: "Campaign optimization, content generation, customer targeting, and performance prediction.",
                  image: "/lovable-uploads/a2eb57ca-42be-4d9e-9770-cd7f0b98796c.png"
                }
              ].map((useCase, index) => (
                <div 
                  key={index} 
                  className="rounded-xl overflow-hidden shadow-soft hover:shadow-md transition-all duration-300 bg-white fade-up"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <div className="h-48 overflow-hidden">
                    <img 
                      src={useCase.image} 
                      alt={useCase.industry} 
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="p-6">
                    <h3 className="text-xl font-semibold mb-3">{useCase.industry}</h3>
                    <p className="text-gray-600 mb-4">{useCase.description}</p>
                    <Button 
                      variant="link" 
                      className="text-amber-600 hover:text-amber-800 p-0 h-auto flex items-center"
                      onClick={() => {
                        toast.info(`${useCase.industry} AI Solutions`, {
                          description: "Contact us for more information about our specialized AI solutions for this industry."
                        });
                      }}
                    >
                      Learn More
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
        
        {/* How It Works Section */}
        <section className="py-20 px-6 md:px-12 bg-white">
          <div className="container mx-auto">
            <div className="text-center mb-16 fade-up">
              <span className="inline-block px-3 py-1 text-sm font-medium bg-amber-100 text-amber-800 rounded-full mb-4">
                Our Approach
              </span>
              <h2 className="text-3xl md:text-4xl font-bold mb-6">How We Implement AI Solutions</h2>
              <p className="text-gray-600 max-w-3xl mx-auto">
                Our structured methodology ensures successful AI integration that delivers real business value.
              </p>
            </div>
            
            <div className="relative max-w-5xl mx-auto">
              <div className="absolute top-0 bottom-0 left-1/2 w-1 bg-amber-200 -translate-x-1/2 hidden md:block"></div>
              
              {[
                {
                  title: "Assessment & Discovery",
                  description: "We analyze your business needs, data availability, and potential use cases to identify the most valuable AI applications."
                },
                {
                  title: "Solution Design",
                  description: "Our experts design a tailored AI solution that addresses your specific challenges and aligns with your business goals."
                },
                {
                  title: "Data Preparation",
                  description: "We collect, clean, and structure your data to ensure it's ready for AI model training and implementation."
                },
                {
                  title: "Development & Training",
                  description: "Our team develops and trains AI models using advanced algorithms and techniques to achieve optimal performance."
                },
                {
                  title: "Integration & Deployment",
                  description: "We seamlessly integrate the AI solution into your existing systems and workflows for operational efficiency."
                },
                {
                  title: "Monitoring & Optimization",
                  description: "Continuous monitoring and refinement ensure your AI solution evolves with your business and maintains peak performance."
                }
              ].map((step, index) => (
                <div 
                  key={index} 
                  className={`flex items-center mb-12 fade-up ${index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'}`}
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <div className={`hidden md:block w-1/2 ${index % 2 === 0 ? 'pr-12 text-right' : 'pl-12'}`}>
                    <h3 className="text-xl font-semibold mb-2">{step.title}</h3>
                    <p className="text-gray-600">{step.description}</p>
                  </div>
                  
                  <div className="relative flex-shrink-0 z-10">
                    <div className="w-16 h-16 rounded-full bg-gradient-to-r from-amber-500 to-orange-700 flex items-center justify-center text-white font-bold text-xl">
                      {index + 1}
                    </div>
                    <div className="absolute inset-0 rounded-full bg-amber-500 blur-md opacity-30 transform scale-110"></div>
                  </div>
                  
                  <div className={`md:hidden w-full pl-6 ${index % 2 === 0 ? 'pr-0' : 'pl-6'}`}>
                    <h3 className="text-xl font-semibold mb-2">{step.title}</h3>
                    <p className="text-gray-600">{step.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
        
        {/* Benefits Section */}
        <section className="py-20 px-6 md:px-12 bg-gray-50">
          <div className="container mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div className="fade-up">
                <span className="inline-block px-3 py-1 text-sm font-medium bg-amber-100 text-amber-800 rounded-full mb-4">
                  Advantages
                </span>
                <h2 className="text-3xl md:text-4xl font-bold mb-6">Benefits of AI Integration</h2>
                <p className="text-gray-600 mb-8">
                  Implementing AI solutions can transform your business operations and create competitive advantages that drive growth.
                </p>
                
                <div className="space-y-6">
                  {[
                    {
                      title: "Increased Efficiency",
                      description: "Automate routine tasks and streamline complex processes to save time and resources."
                    },
                    {
                      title: "Enhanced Decision-Making",
                      description: "Gain data-driven insights that support better strategic and operational decisions."
                    },
                    {
                      title: "Improved Customer Experience",
                      description: "Deliver personalized interactions and faster service to increase customer satisfaction."
                    },
                    {
                      title: "Cost Reduction",
                      description: "Optimize operations and reduce errors to lower operational costs significantly."
                    },
                    {
                      title: "Innovation Acceleration",
                      description: "Discover new opportunities and develop innovative products or services."
                    }
                  ].map((benefit, index) => (
                    <div 
                      key={index} 
                      className="flex items-start"
                      style={{ animationDelay: `${index * 100}ms` }}
                    >
                      <div className="flex-shrink-0 mr-4">
                        <div className="w-8 h-8 rounded-full bg-amber-100 flex items-center justify-center text-amber-600">
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
              
              <div className="relative fade-up">
                <div className="absolute inset-0 -z-10 bg-gradient-to-r from-amber-300/20 to-orange-500/20 rounded-xl blur-2xl transform scale-110"></div>
                <div className="overflow-hidden rounded-xl shadow-xl relative border border-white/20">
                  <img 
                    src="/lovable-uploads/81342b57-5480-4e45-8f13-6d31826abff6.png" 
                    alt="AI Benefits" 
                    className="w-full h-auto relative z-10"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-amber-900/30 to-transparent z-20"></div>
                </div>
                
                <div className="absolute -bottom-10 -right-10 w-32 h-32 rounded-full bg-amber-500/10 backdrop-blur-xl border border-amber-200/30 flex items-center justify-center">
                  <div className="text-center">
                    <span className="block text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-amber-500 to-orange-700">30%</span>
                    <span className="text-sm text-amber-800">average ROI</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        
        {/* CTA Section */}
        <section className="py-20 px-6 md:px-12 bg-gradient-to-r from-amber-500 to-orange-700 text-white">
          <div className="container mx-auto max-w-4xl text-center fade-up">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">Ready to Harness the Power of AI?</h2>
            <p className="text-white/80 text-lg mb-10 max-w-3xl mx-auto">
              Let's explore how our AI solutions can transform your business operations and drive growth.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button 
                size="lg" 
                className="bg-white text-amber-700 hover:bg-gray-100 shadow-lg hover:shadow-xl transition-all duration-300"
                onClick={() => {
                  document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
                }}
              >
                Start Your AI Journey
              </Button>
              <Button 
                variant="outline" 
                size="lg" 
                className="border-white/30 text-white hover:bg-white/10"
                onClick={() => {
                  toast.success("Demo request sent", {
                    description: "We'll contact you shortly with more information."
                  });
                }}
              >
                Request an AI Consultation
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

export default AiSolutionsPage;
