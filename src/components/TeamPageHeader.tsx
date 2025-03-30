
import React from 'react';

interface TeamPageHeaderProps {
  title: string;
  description: string;
}

const TeamPageHeader = ({ title, description }: TeamPageHeaderProps) => {
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
        <div className="grid grid-cols-1 gap-4 items-center max-w-3xl mx-auto">
          <div>
            <span className="inline-block px-3 py-1 text-sm font-medium bg-blue-800/50 text-blue-200 rounded-full mb-2">
              Our People
            </span>
            <h1 className="text-2xl md:text-3xl font-bold mb-2 text-white">
              {title}
            </h1>
            <p className="text-sm md:text-base text-blue-100 mb-3">
              {description}
            </p>
            
            <div className="mt-4 flex items-center gap-4 text-blue-200">
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
        </div>
      </div>
    </section>
  );
};

export default TeamPageHeader;
