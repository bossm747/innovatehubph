
import React from 'react';
import { Button } from "@/components/ui/button";
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';

const AboutHero = () => {
  return (
    <section className="relative py-6 md:py-8 px-4 md:px-6 lg:px-8 overflow-hidden bg-gradient-to-br from-blue-900 to-gray-900 text-white shadow-md">
      {/* Subtle gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-blue-900/90 via-blue-800/80 to-gray-900/90 z-0"></div>
      
      {/* Minimal pattern overlay with reduced height */}
      <div className="absolute inset-0 opacity-5 z-0" style={{ 
        backgroundImage: 'radial-gradient(rgba(255, 255, 255, 0.8) 1px, transparent 1px)', 
        backgroundSize: '20px 20px',
        height: '100%',
        maxHeight: '200px',
        overflow: 'hidden'
      }}></div>
      
      <div className="container mx-auto relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 md:gap-6 items-center">
          <div className="max-w-xl">
            <span className="inline-block px-3 py-1 text-sm font-medium bg-blue-800/50 text-blue-200 rounded-full mb-2">
              Who We Are
            </span>
            <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold mb-2 text-white">
              Passionate Innovators in the <span className="text-blue-300">Philippine Tech Landscape</span>
            </h1>
            <p className="text-sm md:text-base text-gray-200 mb-3">
              InnovateHub Inc. is a forward-thinking technology company dedicated to creating groundbreaking digital solutions. From our roots in Batangas to our expanding presence in Dubai, we're committed to delivering exceptional value through innovation, expertise, and dedication.
            </p>
            <div className="flex flex-wrap gap-3">
              <Button className="bg-green-600 hover:bg-green-700 text-white" asChild>
                <Link to="/team" className="flex items-center">
                  Meet Our Team <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
              <Button variant="outline" className="border-white/20 hover:bg-white/10 text-white" asChild>
                <Link to="/services">Our Services</Link>
              </Button>
            </div>
            
            <div className="mt-4 flex items-center gap-4 text-blue-200">
              <div className="flex items-center">
                <span className="h-5 w-5 mr-2 text-blue-300">•</span>
                Innovation-Driven
              </div>
              <div className="flex items-center">
                <span className="h-5 w-5 mr-2 text-blue-300">•</span>
                Customer-Focused
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutHero;
