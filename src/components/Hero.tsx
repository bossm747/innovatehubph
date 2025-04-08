
import React from 'react';
import HeroTypingText from './hero/HeroTypingText';
import HeroButtons from './hero/HeroButtons';
import HeroFeatures from './hero/HeroFeatures';
import HeroImage from './hero/HeroImage';
import HeroBackground from './hero/HeroBackground';

const Hero = () => {
  const typingTexts = ["Digital Banking", "Fintech Solutions", "Payment Gateways", "E-commerce Integration"];
  
  return (
    <section className="relative py-8 md:py-10 px-4 md:px-8 lg:px-16 overflow-hidden bg-gradient-to-b from-blue-800 to-blue-900 text-white">
      <HeroBackground />
      
      <div className="container mx-auto relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 md:gap-6 items-center">
          <div className="max-w-xl text-left">
            <span className="inline-block px-3 py-1 text-sm font-medium bg-white/10 text-blue-200 rounded-full mb-2 animate-fade-in" style={{animationDelay: '100ms'}}>
              Empowering Business with <span className="security-dot">Financial Technology</span>
            </span>
            <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold mb-2 text-white animate-fade-in" style={{animationDelay: '200ms'}}>
              Seamless Banking Solutions for a <span className="text-blue-300">Connected World</span>
            </h1>
            <div className="text-sm md:text-base text-blue-100 mb-1 animate-fade-in" style={{animationDelay: '300ms'}}>
              InnovateHub delivers cutting-edge <HeroTypingText texts={typingTexts} className="text-blue-300 font-semibold" /> designed to transform your financial experience.
            </div>
            <p className="text-sm md:text-base text-blue-100 mb-3 animate-fade-in" style={{animationDelay: '400ms'}}>
              Partner with leading banks and payment providers to create a seamless digital ecosystem.
            </p>
            
            <HeroButtons />
            <HeroFeatures />
          </div>
          
          <HeroImage />
        </div>
      </div>
    </section>
  );
};

export default Hero;
