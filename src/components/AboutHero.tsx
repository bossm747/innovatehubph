
import React from 'react';
import { Button } from "@/components/ui/button";
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';

const AboutHero = () => {
  return (
    <section className="py-24 relative overflow-hidden bg-gradient-to-b from-[#1A1F2C] to-[#9F9EA1] text-white">
      {/* Background patterns */}
      <div className="absolute inset-0 overflow-hidden opacity-10">
        <div className="absolute -top-24 -right-24 w-96 h-96 rounded-full bg-innovate-500 filter blur-3xl"></div>
        <div className="absolute top-1/2 -left-24 w-64 h-64 rounded-full bg-white filter blur-3xl"></div>
        <div className="absolute -bottom-32 right-1/4 w-80 h-80 rounded-full bg-innovate-300 filter blur-3xl"></div>
        
        {/* Grid pattern */}
        <div className="absolute inset-0" style={{ 
          backgroundImage: 'radial-gradient(rgba(255, 255, 255, 0.1) 1px, transparent 1px)', 
          backgroundSize: '20px 20px' 
        }}></div>
      </div>
      
      <div className="container mx-auto px-6 md:px-12 lg:px-24 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="max-w-2xl fade-up">
            <span className="inline-block px-3 py-1 text-sm font-medium bg-white/10 text-gray-200 rounded-full mb-6">
              Who We Are
            </span>
            <h1 className="text-4xl md:text-5xl font-bold mb-6 text-white">
              Passionate Innovators in the Philippine Tech Landscape
            </h1>
            <p className="text-lg text-gray-200 mb-8">
              InnovateHub Inc. is a forward-thinking technology company dedicated to creating groundbreaking digital solutions. From our roots in Batangas to our expanding presence in Dubai, we're committed to delivering exceptional value through innovation, expertise, and dedication.
            </p>
            <div className="flex flex-wrap gap-4">
              <Button className="bg-innovate-600 hover:bg-innovate-700 text-white btn-shine" asChild>
                <Link to="/team" className="flex items-center">
                  Meet Our Team <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
              <Button variant="outline" className="border-white/20 hover:bg-white/10 text-white" asChild>
                <Link to="/services">Our Services</Link>
              </Button>
            </div>
          </div>
          
          <div className="relative hidden lg:block fade-up">
            <div className="absolute inset-0 bg-gradient-to-br from-blue-500/20 to-purple-500/20 rounded-lg blur-xl"></div>
            <img 
              src="/lovable-uploads/5c085ba8-48d9-4a1a-9bb0-97e24b646f38.png" 
              alt="InnovateHub Team" 
              className="relative z-10 rounded-lg shadow-lg object-cover w-full h-auto transform hover:scale-105 transition-all duration-500"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutHero;
