
import React, { useEffect, useRef } from 'react';
import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import Features from '@/components/Features';
import Services from '@/components/Services';
import PlataPay from '@/components/PlataPay';
import Testimonials from '@/components/Testimonials';
import TeamSection from '@/components/TeamSection';
import ContactSection from '@/components/ContactSection';
import Footer from '@/components/Footer';
import CircuitBackground from '@/components/CircuitBackground';
import ClientsShowcase from '@/components/ClientsShowcase';
import ServiceTiles from '@/components/ServiceTiles';
import { Button } from '@/components/ui/button';
import { ArrowRight, Award, Shield, Zap, Globe } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet';

const Index = () => {
  // Use a ref to prevent unnecessary re-calculations
  const observerRef = useRef<IntersectionObserver | null>(null);
  
  useEffect(() => {
    // Use Intersection Observer API for better performance
    observerRef.current = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('fade-in');
          // Once the animation is applied, unobserve the element
          observerRef.current?.unobserve(entry.target);
        }
      });
    }, {
      root: null, // Use the viewport
      rootMargin: '0px',
      threshold: 0.1 // Trigger when 10% of the element is visible
    });
    
    // Get all elements with the fade-up class
    const fadeElements = document.querySelectorAll('.fade-up');
    
    // Observe each element
    fadeElements.forEach(element => {
      observerRef.current?.observe(element);
    });
    
    // Clean up
    return () => {
      if (observerRef.current) {
        observerRef.current.disconnect();
      }
    };
  }, []);

  return (
    <div className="overflow-x-hidden w-[100vw] max-w-[100vw] min-h-screen m-0 p-0 relative">
      <Helmet>
        <title>InnovateHub Inc. | Digital Innovation Solutions</title>
        <meta name="description" content="Empowering the Future with Digital Innovation - Customized fintech, AI, and e-commerce solutions for a connected world." />
      </Helmet>
      
      {/* Background decorations */}
      <CircuitBackground 
        pattern="circuit-branches" 
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
        pattern="dotted-grid" 
        className="fixed top-1/4 right-1/4" 
        size="md" 
        opacity={0.1}
      />
      
      <Navbar />
      <Hero />
      
      {/* Why Choose Us Section */}
      <section className="py-24 px-6 md:px-12 bg-white relative overflow-hidden">
        <div className="container mx-auto">
          <div className="text-center mb-16 fade-up">
            <span className="inline-block px-3 py-1 text-sm font-medium bg-innovate-100 text-innovate-800 rounded-full mb-4">
              Why Choose InnovateHub
            </span>
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Innovation at Every Step
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              From our roots in Batangas to our expanding presence in Dubai, we're committed to 
              delivering exceptional value through innovation, expertise, and dedication.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                icon: <Zap className="h-8 w-8 text-innovate-600" />,
                title: "Speed",
                description: "Quick implementation and turnaround times for all our digital solutions."
              },
              {
                icon: <Shield className="h-8 w-8 text-innovate-600" />,
                title: "Security",
                description: "Enterprise-grade security across all our platforms and applications."
              },
              {
                icon: <Award className="h-8 w-8 text-innovate-600" />,
                title: "Innovation",
                description: "Cutting-edge technology and forward-thinking approaches to digital challenges."
              },
              {
                icon: <Globe className="h-8 w-8 text-innovate-600" />,
                title: "Global Reach",
                description: "Helping businesses extend their reach from the Philippines to Dubai and beyond."
              }
            ].map((feature, index) => (
              <div 
                key={index} 
                className="bg-white p-8 rounded-xl shadow-soft hover:shadow-medium transition-all duration-300 border border-gray-100 fade-up"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="w-16 h-16 rounded-full bg-innovate-50 flex items-center justify-center mb-6">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-semibold mb-3">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
      
      {/* PlataPay Feature Section - Our Flagship Product */}
      <section className="py-24 px-6 md:px-12 bg-gradient-to-r from-gray-50 to-gray-100 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-full h-full overflow-hidden opacity-5">
          <img 
            src="/lovable-uploads/4d5b3eaa-0065-48e8-9976-3931a1836f81.png" 
            alt="PlataPay Background" 
            className="w-full h-full object-cover"
          />
        </div>
        
        <div className="container mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div className="order-2 lg:order-1 fade-up">
              <span className="inline-block px-3 py-1 text-sm font-medium bg-innovate-100 text-innovate-800 rounded-full mb-4">
                Our Flagship Product
              </span>
              <h2 className="text-3xl md:text-4xl font-bold mb-6">
                PlataPay – Empowering Micropreneurs
              </h2>
              <p className="text-gray-600 mb-6">
                A secure and income-generating platform for communities, enabling digital wallet services, bills payment, remittance, e-loading, and QR payments.
              </p>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
                <div className="flex items-start">
                  <div className="w-10 h-10 rounded-full bg-innovate-100 flex items-center justify-center mr-3 flex-shrink-0">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-innovate-600" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-semibold mb-1">Digital Wallet</h3>
                    <p className="text-sm text-gray-600">Secure storage and transfer of funds</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <div className="w-10 h-10 rounded-full bg-innovate-100 flex items-center justify-center mr-3 flex-shrink-0">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-innovate-600" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-semibold mb-1">Bills Payment</h3>
                    <p className="text-sm text-gray-600">Convenient payment for utilities and services</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <div className="w-10 h-10 rounded-full bg-innovate-100 flex items-center justify-center mr-3 flex-shrink-0">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-innovate-600" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-semibold mb-1">Remittance</h3>
                    <p className="text-sm text-gray-600">Fast and affordable money transfers</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <div className="w-10 h-10 rounded-full bg-innovate-100 flex items-center justify-center mr-3 flex-shrink-0">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-innovate-600" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-semibold mb-1">QR Payments</h3>
                    <p className="text-sm text-gray-600">Seamless transactions through QR codes</p>
                  </div>
                </div>
              </div>
              
              <Button 
                className="bg-innovate-600 hover:bg-innovate-700 text-white btn-shine shadow-md hover:shadow-lg"
                asChild
              >
                <Link to="/platapay" className="flex items-center">
                  Learn More about PlataPay <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </div>
            
            <div className="order-1 lg:order-2 fade-up">
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-r from-innovate-500/20 to-innovate-600/20 rounded-xl blur-2xl transform scale-110"></div>
                <img 
                  src="/lovable-uploads/9b23899d-8537-4e7c-996b-5fdc791cbde2.png" 
                  alt="PlataPay App" 
                  className="w-full h-auto relative z-10 rounded-xl shadow-xl transform hover:scale-105 transition-all duration-500"
                />
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Service Tiles Section */}
      <ServiceTiles />
      
      {/* Client Showcase */}
      <section className="py-24 px-6 md:px-12 bg-white relative overflow-hidden">
        <div className="container mx-auto">
          <div className="text-center mb-16 fade-up">
            <span className="inline-block px-3 py-1 text-sm font-medium bg-innovate-100 text-innovate-800 rounded-full mb-4">
              Our Clients
            </span>
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Trusted by Forward-Thinking Organizations
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              We're proud to partner with innovative businesses that are leading the way in their industries.
            </p>
          </div>
          
          <ClientsShowcase maxItems={8} />
        </div>
      </section>
      
      {/* Testimonials Section */}
      <Testimonials />
      
      {/* Team Preview Section */}
      <section className="py-24 px-6 md:px-12 bg-gradient-to-r from-gray-50 to-gray-100 relative overflow-hidden">
        <div className="container mx-auto">
          <div className="text-center mb-16 fade-up">
            <span className="inline-block px-3 py-1 text-sm font-medium bg-innovate-100 text-innovate-800 rounded-full mb-4">
              Our Team
            </span>
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Meet the Innovators
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Our diverse team brings together the talents needed to revolutionize digital finance and technology in the Philippines and beyond.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
            {[1, 2, 3, 4].map((index) => (
              <div 
                key={index} 
                className="bg-white rounded-xl overflow-hidden shadow-soft hover:shadow-medium transition-all duration-300 fade-up"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="h-64 overflow-hidden">
                  <img 
                    src={`/lovable-uploads/5c085ba8-48d9-4a1a-9bb0-97e24b646f38.png`} 
                    alt={`Team Member ${index}`} 
                    className="w-full h-full object-cover transition-transform hover:scale-110 duration-500"
                  />
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-semibold mb-1">Team Member {index}</h3>
                  <p className="text-innovate-600 mb-4">Leadership Position</p>
                  <p className="text-gray-600 text-sm">Experienced professional with expertise in digital innovation and business growth.</p>
                </div>
              </div>
            ))}
          </div>
          
          <div className="text-center fade-up">
            <Button 
              className="bg-innovate-600 hover:bg-innovate-700 text-white btn-shine shadow-md hover:shadow-lg"
              asChild
            >
              <Link to="/team" className="flex items-center">
                View Full Team <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
        </div>
      </section>
      
      {/* CTA Section */}
      <section className="py-24 px-6 md:px-12 bg-blue-900 text-white relative overflow-hidden">
        <div className="absolute inset-0 overflow-hidden opacity-10">
          <div className="absolute -top-24 -right-24 w-96 h-96 rounded-full bg-blue-500 filter blur-3xl"></div>
          <div className="absolute top-1/2 -left-24 w-64 h-64 rounded-full bg-white filter blur-3xl"></div>
          <div className="absolute -bottom-32 right-1/4 w-80 h-80 rounded-full bg-blue-300 filter blur-3xl"></div>
          
          {/* Grid pattern */}
          <div className="absolute inset-0" style={{ 
            backgroundImage: 'radial-gradient(rgba(255, 255, 255, 0.1) 1px, transparent 1px)', 
            backgroundSize: '20px 20px' 
          }}></div>
        </div>
        
        <div className="container mx-auto relative z-10">
          <div className="max-w-3xl mx-auto text-center fade-up">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Ready to Transform Your Business with Digital Innovation?
            </h2>
            <p className="text-xl text-blue-200 mb-8">
              Let's collaborate to build customized solutions that drive growth, enhance efficiency, 
              and position your business for success in the digital economy.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Button 
                size="lg" 
                className="bg-white text-blue-900 hover:bg-blue-50 btn-shine"
                asChild
              >
                <Link to="/contact">
                  Get In Touch
                </Link>
              </Button>
              <Button 
                size="lg" 
                variant="outline" 
                className="border-white/30 text-white hover:bg-white/10"
                asChild
              >
                <Link to="/services">
                  Explore Services
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
      
      <ContactSection />
      <Footer />
    </div>
  );
};

export default Index;
