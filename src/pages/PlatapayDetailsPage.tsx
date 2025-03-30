import React from 'react';
import { Helmet } from 'react-helmet';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent } from '@/components/ui/card';
import { CheckCircle, ArrowRight, Smartphone, CreditCard, DollarSign, Zap, Users } from 'lucide-react';
import PlatapayAgentInfo from '@/components/PlatapayAgentInfo';
import PlatapayTestimonials from '@/components/PlatapayTestimonials';
import PlatapayAgentMap from '@/components/PlatapayAgentMap';
import PlatapayPartners from '@/components/PlatapayPartners';
import PlatapayFAQ from '@/components/PlatapayFAQ';
import NewsletterSubscription from '@/components/NewsletterSubscription';

const PlatapayDetailsPage = () => {
  const navigate = useNavigate();
  
  const handleInquiryClick = () => {
    navigate('/inquiry?service=platapay');
  };
  
  const services = [
    {
      icon: <Smartphone className="h-10 w-10 text-blue-500" />,
      title: "E-Loading",
      description: "Offer electronic load for all major telecommunications networks."
    },
    {
      icon: <CreditCard className="h-10 w-10 text-blue-500" />,
      title: "Bills Payment",
      description: "Process utility bills, government fees, and other payment services."
    },
    {
      icon: <DollarSign className="h-10 w-10 text-blue-500" />,
      title: "Remittance",
      description: "Send and receive money locally and internationally at competitive rates."
    },
    {
      icon: <Zap className="h-10 w-10 text-blue-500" />,
      title: "QR Payments",
      description: "Enable quick, cashless transactions through QR code scanning."
    },
    {
      icon: <Users className="h-10 w-10 text-blue-500" />,
      title: "Agent Network",
      description: "Join our growing network of financial service providers."
    }
  ];
  
  const steps = [
    {
      number: "01",
      title: "Submit an Application",
      description: "Fill out our agent application form with your personal and business details."
    },
    {
      number: "02",
      title: "Document Verification",
      description: "Provide necessary identification and business documents for verification."
    },
    {
      number: "03",
      title: "Training Session",
      description: "Attend a comprehensive training on the PlataPay system and services."
    },
    {
      number: "04",
      title: "Receive Your Credentials",
      description: "Get your agent ID and access to the PlataPay agent portal."
    },
    {
      number: "05",
      title: "Start Earning",
      description: "Begin offering digital financial services and earning commissions."
    }
  ];

  return (
    <>
      <Helmet>
        <title>PlataPay | Digital Financial Services | InnovateHub Inc.</title>
        <meta 
          name="description" 
          content="PlataPay offers digital wallet, bills payment, remittance, e-loading, and QR payment services. Join our agent network and start earning today."
        />
      </Helmet>
      
      <Navbar />
      
      <main>
        <section className="relative py-20 overflow-hidden bg-gradient-to-br from-blue-900 to-blue-700 text-white">
          <div className="absolute inset-0 bg-grid-white/10"></div>
          <div className="container mx-auto px-4 relative z-10">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
              <div>
                <h1 className="text-4xl md:text-5xl font-bold leading-tight mb-6">
                  PlataPay – Empowering Micropreneurs Through Digital Finance
                </h1>
                <p className="text-xl text-blue-100 mb-8">
                  A secure and income-generating platform for communities - bringing financial services closer to every Filipino.
                </p>
                <div className="flex flex-wrap gap-4">
                  <Button 
                    size="lg" 
                    className="bg-white text-blue-700 hover:bg-blue-50"
                    onClick={handleInquiryClick}
                  >
                    Apply as Agent
                  </Button>
                  <Button 
                    variant="outline" 
                    size="lg" 
                    className="border-white text-white hover:bg-white/10"
                    onClick={() => window.open('https://platapay.ph', '_blank')}
                  >
                    Visit PlataPay Site
                  </Button>
                </div>
              </div>
              <div className="hidden md:block">
                <img 
                  src="/lovable-uploads/532edcfe-0bf3-4962-8ca3-b1e5d0576301.png" 
                  alt="PlataPay Digital Services" 
                  className="rounded-lg shadow-2xl"
                />
              </div>
            </div>
          </div>
        </section>
        
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <h2 className="text-3xl font-bold mb-4">Complete Digital Financial Services</h2>
              <p className="text-gray-600 max-w-2xl mx-auto">
                PlataPay offers a comprehensive suite of digital financial services that allows agents to serve their communities and generate income.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {services.map((service, index) => (
                <Card key={index} className="border-0 shadow-lg hover:shadow-xl transition-all duration-300">
                  <CardContent className="pt-6">
                    <div className="rounded-full bg-blue-50 p-4 w-16 h-16 flex items-center justify-center mb-6">
                      {service.icon}
                    </div>
                    <h3 className="text-xl font-semibold mb-3">{service.title}</h3>
                    <p className="text-gray-600">{service.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>
        
        <PlatapayAgentInfo />
        
        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <h2 className="text-3xl font-bold mb-4">How to Become a PlataPay Agent</h2>
              <p className="text-gray-600 max-w-2xl mx-auto">
                Join our growing network of digital financial service providers in just a few simple steps.
              </p>
            </div>
            
            <div className="max-w-4xl mx-auto">
              {steps.map((step, index) => (
                <div key={index} className="flex mb-8 last:mb-0">
                  <div className="mr-6">
                    <div className="flex items-center justify-center w-12 h-12 rounded-full bg-blue-600 text-white font-bold">
                      {step.number}
                    </div>
                    {index < steps.length - 1 && (
                      <div className="h-full w-0.5 bg-blue-200 mx-auto mt-2"></div>
                    )}
                  </div>
                  <div className="flex-1 pt-1.5">
                    <h3 className="text-xl font-semibold mb-2">{step.title}</h3>
                    <p className="text-gray-600">{step.description}</p>
                  </div>
                </div>
              ))}
            </div>
            
            <div className="text-center mt-12">
              <Button 
                size="lg" 
                className="bg-blue-600 hover:bg-blue-700"
                onClick={handleInquiryClick}
              >
                Apply Now <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </div>
          </div>
        </section>
        
        <PlatapayTestimonials />
        
        <PlatapayFAQ />
        
        <PlatapayAgentMap />
        
        <PlatapayPartners />
        
        <section className="bg-gray-50 py-16">
          <div className="container mx-auto px-4">
            <div className="max-w-xl mx-auto">
              <NewsletterSubscription />
            </div>
          </div>
        </section>
        
        <section className="bg-blue-800 text-white py-16">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl font-bold mb-6">Ready to Start Your Digital Finance Business?</h2>
            <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
              Join the PlataPay network today and start offering essential financial services in your community while earning additional income.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Button 
                size="lg" 
                className="bg-white text-blue-700 hover:bg-blue-50"
                onClick={handleInquiryClick}
              >
                Apply as Agent <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
              <Button 
                variant="outline" 
                size="lg" 
                className="border-white text-white hover:bg-white/10"
                onClick={() => navigate('/contact-us')}
              >
                Contact for Support
              </Button>
            </div>
          </div>
        </section>
      </main>
      
      <Footer />
    </>
  );
};

export default PlatapayDetailsPage;
