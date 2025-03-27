
import React, { useEffect } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import ContactSection from '@/components/ContactSection';
import CircuitBackground from '@/components/CircuitBackground';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { ArrowRight, Bot, Brain, ChartBar, Cog, LineChart, MessageSquare, Cpu, Database, Workflow } from 'lucide-react';
import { toast } from 'sonner';

const AiSolutionsPage = () => {
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

  const aiSolutions = [
    {
      title: "Intelligent Chatbots",
      description: "Custom AI chatbots that engage customers, answer questions, and provide personalized assistance 24/7.",
      icon: <MessageSquare className="h-10 w-10" />,
      applications: [
        "Customer service automation",
        "Lead qualification",
        "Internal employee support",
        "Multi-channel deployment"
      ]
    },
    {
      title: "Predictive Analytics",
      description: "Advanced data analysis that forecasts trends, customer behavior, and business outcomes to inform strategic decisions.",
      icon: <LineChart className="h-10 w-10" />,
      applications: [
        "Sales forecasting",
        "Inventory optimization",
        "Customer churn prediction",
        "Market trend analysis"
      ]
    },
    {
      title: "Process Automation",
      description: "AI-powered solutions that streamline workflows, eliminate repetitive tasks, and improve operational efficiency.",
      icon: <Workflow className="h-10 w-10" />,
      applications: [
        "Document processing",
        "Approval workflows",
        "Data entry automation",
        "Quality control processes"
      ]
    },
    {
      title: "Machine Learning Models",
      description: "Custom ML models that learn from your data to make predictions, identify patterns, and generate valuable insights.",
      icon: <Brain className="h-10 w-10" />,
      applications: [
        "Image and voice recognition",
        "Recommendation engines",
        "Fraud detection systems",
        "Natural language processing"
      ]
    },
    {
      title: "Data Processing",
      description: "Comprehensive solutions for collecting, cleaning, and transforming large datasets to extract actionable insights.",
      icon: <Database className="h-10 w-10" />,
      applications: [
        "Big data integration",
        "Real-time data processing",
        "Sentiment analysis",
        "Data visualization"
      ]
    },
    {
      title: "AI Integration",
      description: "Seamless incorporation of AI capabilities into your existing systems and applications to enhance functionality.",
      icon: <Cog className="h-10 w-10" />,
      applications: [
        "Legacy system enhancement",
        "API-based AI services",
        "Third-party AI platform integration",
        "Custom middleware development"
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
                <span className="inline-block px-4 py-1.5 text-sm font-medium bg-amber-100 text-amber-800 rounded-full mb-6 animate-fade-in shadow-sm">
                  AI Solutions
                </span>
                <h1 className="text-5xl md:text-6xl font-bold mb-6 hero-text-gradient animate-fade-in" style={{ animationDelay: '100ms' }}>
                  Intelligent Automation for Business Growth
                </h1>
                <p className="text-xl md:text-2xl font-light text-gray-600 mb-10 animate-fade-in" style={{ animationDelay: '200ms' }}>
                  Leverage the power of artificial intelligence to optimize operations, enhance customer experiences, and drive innovation.
                </p>
                
                <div className="flex flex-wrap gap-4 animate-fade-in" style={{ animationDelay: '300ms' }}>
                  <Button 
                    size="lg" 
                    className="bg-amber-600 hover:bg-amber-700 text-white btn-shine shadow-md hover:shadow-lg"
                    onClick={() => {
                      toast.success("Request sent", {
                        description: "We'll get back to you shortly to discuss your AI solution needs."
                      });
                    }}
                  >
                    Explore AI Solutions
                  </Button>
                  <Button 
                    size="lg" 
                    variant="outline"
                    className="border-amber-200 text-amber-700 hover:bg-amber-50"
                    onClick={() => {
                      document.getElementById('ai-solutions')?.scrollIntoView({ behavior: 'smooth' });
                    }}
                  >
                    View Solutions
                  </Button>
                </div>
              </div>
              
              <div className="relative mx-auto max-w-md lg:max-w-full">
                <div className="absolute inset-0 bg-gradient-to-r from-amber-300/20 to-orange-400/20 rounded-xl blur-2xl transform scale-110"></div>
                <div className="relative z-10">
                  <img 
                    src="/lovable-uploads/67bb969b-4b34-4a3e-af05-aa8eb09b6cd9.png" 
                    alt="AI Solutions Illustration" 
                    className="w-full h-auto transform hover:scale-105 transition-transform duration-700"
                  />
                </div>
              </div>
            </div>
          </div>
        </section>
        
        {/* AI Solutions Section */}
        <section id="ai-solutions" className="py-20 px-6 md:px-12">
          <div className="container mx-auto">
            <div className="text-center mb-16 fade-up">
              <span className="inline-block px-3 py-1 text-sm font-medium bg-amber-100 text-amber-800 rounded-full mb-4">
                Our AI Solutions
              </span>
              <h2 className="text-3xl md:text-4xl font-bold mb-6">Intelligent Solutions for Modern Businesses</h2>
              <p className="text-gray-600 max-w-3xl mx-auto">
                We develop custom AI solutions that solve real business problems, automate processes, 
                and provide valuable insights from your data.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {aiSolutions.map((solution, index) => (
                <Card 
                  key={index} 
                  className="p-8 hover:shadow-lg transition-all duration-300 border border-gray-200 hover:border-amber-200 fade-up"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <div className="text-amber-600 mb-4 w-16 h-16 rounded-xl flex items-center justify-center bg-amber-100">
                    {solution.icon}
                  </div>
                  <h3 className="text-xl font-semibold mb-3">{solution.title}</h3>
                  <p className="text-gray-600 mb-6">{solution.description}</p>
                  
                  <div className="mb-6">
                    <h4 className="text-sm font-semibold text-gray-700 mb-3">Key Applications:</h4>
                    <ul className="space-y-2">
                      {solution.applications.map((application, idx) => (
                        <li key={idx} className="flex items-start">
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-amber-600 mt-0.5" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                          </svg>
                          <span className="ml-2 text-gray-700">{application}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  
                  <Button 
                    variant="link" 
                    className="text-amber-600 hover:text-amber-800 p-0 h-auto flex items-center"
                    onClick={() => {
                      toast.success(`Learn more about ${solution.title}`, {
                        description: "We'll share detailed information about this AI solution."
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
        
        {/* Benefits Section */}
        <section className="py-20 px-6 md:px-12 bg-gray-50">
          <div className="container mx-auto">
            <div className="text-center mb-16 fade-up">
              <span className="inline-block px-3 py-1 text-sm font-medium bg-amber-100 text-amber-800 rounded-full mb-4">
                Benefits of AI
              </span>
              <h2 className="text-3xl md:text-4xl font-bold mb-6">Why Implement AI Solutions?</h2>
              <p className="text-gray-600 max-w-3xl mx-auto">
                Discover how artificial intelligence can transform your business operations and drive growth.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {[
                {
                  title: "Increased Efficiency",
                  description: "Automate repetitive tasks and streamline workflows to save time and reduce operational costs.",
                  icon: <Cpu className="h-8 w-8" />
                },
                {
                  title: "Enhanced Decision Making",
                  description: "Gain valuable insights from data analysis to make more informed strategic decisions.",
                  icon: <ChartBar className="h-8 w-8" />
                },
                {
                  title: "Improved Customer Experience",
                  description: "Deliver personalized interactions and faster service through AI-powered solutions.",
                  icon: <Bot className="h-8 w-8" />
                },
                {
                  title: "Competitive Advantage",
                  description: "Stay ahead in your industry by leveraging cutting-edge AI technology and innovation.",
                  icon: <Brain className="h-8 w-8" />
                }
              ].map((benefit, index) => (
                <Card 
                  key={index} 
                  className="relative overflow-hidden p-8 border-amber-100 fade-up"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <div className="absolute top-0 left-0 w-2 h-full bg-amber-500"></div>
                  <div className="mb-4 p-4 bg-amber-50 rounded-lg inline-block text-amber-600">
                    {benefit.icon}
                  </div>
                  <h3 className="text-xl font-semibold mb-3">{benefit.title}</h3>
                  <p className="text-gray-600">{benefit.description}</p>
                </Card>
              ))}
            </div>
          </div>
        </section>
        
        {/* Implementation Process */}
        <section className="py-20 px-6 md:px-12">
          <div className="container mx-auto">
            <div className="text-center mb-16 fade-up">
              <span className="inline-block px-3 py-1 text-sm font-medium bg-amber-100 text-amber-800 rounded-full mb-4">
                Our Approach
              </span>
              <h2 className="text-3xl md:text-4xl font-bold mb-6">AI Implementation Process</h2>
              <p className="text-gray-600 max-w-3xl mx-auto">
                Our structured methodology ensures successful integration of AI solutions into your business operations.
              </p>
            </div>
            
            <div className="relative max-w-5xl mx-auto">
              {/* Process steps */}
              <div className="space-y-12 md:space-y-0 md:grid md:grid-cols-2 md:gap-x-12 md:gap-y-16">
                {[
                  {
                    step: "01",
                    title: "Discovery & Assessment",
                    description: "We identify your business challenges and opportunities where AI can add significant value.",
                    image: "/lovable-uploads/b189db24-13c0-4965-9b0b-fda631b71561.png"
                  },
                  {
                    step: "02",
                    title: "Solution Design",
                    description: "Our team designs a custom AI solution architecture tailored to your specific requirements.",
                    image: "/lovable-uploads/e1c7d349-0eed-4a0e-8fc0-68bdd099b7a4.png"
                  },
                  {
                    step: "03",
                    title: "Development & Training",
                    description: "We develop and train the AI models using your data to ensure accurate and relevant outputs.",
                    image: "/lovable-uploads/4932b3ce-bb16-4eda-a885-5a67f01c4346.png"
                  },
                  {
                    step: "04",
                    title: "Integration & Deployment",
                    description: "We seamlessly integrate the AI solution with your existing systems and deploy it into your environment.",
                    image: "/lovable-uploads/e57441a1-afb4-4ef6-9528-d2b5677d9842.png"
                  }
                ].map((process, index) => (
                  <div 
                    key={index} 
                    className="relative border border-amber-100 rounded-xl p-6 bg-white shadow-sm fade-up"
                    style={{ animationDelay: `${index * 100}ms` }}
                  >
                    <div className="absolute -top-4 -left-4 w-10 h-10 rounded-full bg-amber-600 text-white flex items-center justify-center font-bold text-sm">
                      {process.step}
                    </div>
                    <div className="mb-6 h-40 flex items-center justify-center">
                      <img src={process.image} alt={process.title} className="h-32 w-auto" />
                    </div>
                    <h3 className="text-xl font-semibold mb-3">{process.title}</h3>
                    <p className="text-gray-600">{process.description}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>
        
        {/* CTA Section */}
        <section className="py-24 px-6 md:px-12 bg-gradient-to-r from-amber-900 to-orange-800 text-white">
          <div className="container mx-auto">
            <div className="max-w-4xl mx-auto text-center fade-up">
              <span className="inline-block px-4 py-1.5 text-sm font-medium bg-white/20 text-white rounded-full mb-6">
                Start Your AI Journey
              </span>
              <h2 className="text-3xl md:text-4xl font-bold mb-6">Ready to Transform Your Business with AI?</h2>
              <p className="text-xl opacity-90 mb-10 max-w-2xl mx-auto">
                Let's discuss how our AI solutions can help you automate processes, gain insights, and stay ahead of the competition.
              </p>
              
              <div className="flex flex-wrap justify-center gap-4">
                <Button 
                  size="lg" 
                  className="bg-white text-amber-900 hover:bg-gray-100 btn-shine"
                  onClick={() => {
                    toast.success("Contact form opened", {
                      description: "Fill out the form below to get in touch with our AI specialists."
                    });
                  }}
                >
                  Schedule a Demo
                </Button>
                <Button 
                  size="lg" 
                  variant="outline" 
                  className="border-white text-white hover:bg-white/10"
                  onClick={() => {
                    toast.success("Case studies request sent", {
                      description: "We'll send you our AI solution case studies shortly."
                    });
                  }}
                >
                  View AI Case Studies
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

export default AiSolutionsPage;
