
import React from 'react';

const GlobalExpansionHeroImage = () => {
  return (
    <div className="relative hidden lg:block">
      <div className="absolute inset-0 bg-gradient-to-br from-purple-500/20 to-blue-600/20 rounded-lg blur-xl"></div>
      <div className="float-animation">
        <img 
          src="/lovable-uploads/1ba7f461-c269-4d31-bfeb-da6041c21421.png" 
          alt="Global Expansion Services" 
          className="relative z-10 rounded-lg shadow-lg w-full h-auto transform transition-all duration-500"
        />
        
        {/* Decorative elements */}
        <div className="absolute -top-6 -right-6 w-16 h-16 bg-gradient-to-br from-blue-400 to-blue-600 rounded-full flex items-center justify-center shadow-lg animate-pulse-slow">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="12" cy="12" r="10"></circle>
            <line x1="2" y1="12" x2="22" y2="12"></line>
            <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"></path>
          </svg>
        </div>
      </div>
    </div>
  );
};

export default GlobalExpansionHeroImage;
