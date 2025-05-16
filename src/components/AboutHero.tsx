
import React from 'react';
import { Button } from "@/components/ui/button";
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import AboutHeroImage from './about/AboutHeroImage';
import AboutHeroBackground from './about/AboutHeroBackground';

const AboutHero = () => {
  return (
    <section className="relative py-8 md:py-10 px-4 md:px-8 lg:px-16 overflow-hidden bg-gradient-to-b from-blue-800 to-blue-900 text-white">
      <AboutHeroBackground />
      
      <div className="container mx-auto relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 md:gap-6 items-center">
          <div className="max-w-xl">
            <span className="inline-block px-3 py-1 text-sm font-medium bg-white/10 text-blue-200 rounded-full mb-2 animate-fade-in" style={{animationDelay: '100ms'}}>
              Who We Are
            </span>
            <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold mb-2 text-white animate-fade-in" style={{animationDelay: '200ms'}}>
              Passionate Innovators in the <span className="text-blue-300">Philippine Tech Landscape</span>
            </h1>
            <p className="text-sm md:text-base text-blue-100 mb-3 animate-fade-in" style={{animationDelay: '300ms'}}>
              InnovateHub Inc. is a forward-thinking technology company dedicated to creating groundbreaking digital solutions. From our roots in Batangas to our expanding presence in Dubai, we're committed to delivering exceptional value through innovation, expertise, and dedication.
            </p>
            <div className="flex flex-wrap gap-3 animate-fade-in" style={{animationDelay: '400ms'}}>
              <Button className="bg-green-600 hover:bg-green-700 text-white" asChild>
                <Link to="/services" className="flex items-center">
                  Our Services <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
              <Button variant="outline" className="border-white/20 hover:bg-white/10 text-white" asChild>
                <Link to="/contact">Contact Us</Link>
              </Button>
            </div>
            
            <div className="mt-4 flex items-center gap-4 text-blue-200 animate-fade-in" style={{animationDelay: '500ms'}}>
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
          
          <AboutHeroImage />
        </div>
      </div>
    </section>
  );
};

export default AboutHero;
