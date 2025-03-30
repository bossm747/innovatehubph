
import React from 'react';
import HeroBackground from './hero/HeroBackground';

interface TeamPageHeaderProps {
  title: string;
  description: string;
}

const TeamPageHeader = ({ title, description }: TeamPageHeaderProps) => {
  return (
    <section className="relative py-12 px-6 md:px-8 lg:px-16 overflow-hidden bg-gradient-to-b from-blue-800 to-blue-900 text-white">
      <HeroBackground />
      
      <div className="container mx-auto relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-center">
          <div className="max-w-2xl">
            <span className="inline-block px-3 py-1 text-sm font-medium bg-white/10 text-blue-200 rounded-full mb-3 animate-fade-in" style={{animationDelay: '100ms'}}>
              Our People
            </span>
            <h1 className="text-3xl md:text-4xl font-bold mb-3 text-white animate-fade-in" style={{animationDelay: '200ms'}}>
              {title}
            </h1>
            <p className="text-base md:text-lg text-blue-100 mb-4 animate-fade-in" style={{animationDelay: '300ms'}}>
              {description}
            </p>
            
            <div className="mt-6 flex items-center gap-4 text-blue-200 animate-fade-in" style={{animationDelay: '400ms'}}>
              <div className="flex items-center">
                <span className="h-5 w-5 mr-2 text-blue-300">•</span>
                Passionate Leaders
              </div>
              <div className="flex items-center">
                <span className="h-5 w-5 mr-2 text-blue-300">•</span>
                Innovative Thinkers
              </div>
            </div>
          </div>
          
          <div className="relative hidden lg:block">
            <div className="absolute inset-0 bg-gradient-to-br from-blue-500/20 to-blue-500/20 rounded-lg blur-xl"></div>
            <img 
              src="/lovable-uploads/5c085ba8-48d9-4a1a-9bb0-97e24b646f38.png" 
              alt="Our Team" 
              className="relative z-10 rounded-lg shadow-lg object-cover w-full h-auto transform hover:scale-105 transition-all duration-500"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default TeamPageHeader;
