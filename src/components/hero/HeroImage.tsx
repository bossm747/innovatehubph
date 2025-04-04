
import React from 'react';

const HeroImage = () => {
  return (
    <div className="relative hidden lg:block">
      <div className="absolute inset-0 bg-gradient-to-br from-blue-500/20 to-blue-600/20 rounded-lg blur-xl"></div>
      <div className="float-animation">
        <img 
          src="/lovable-uploads/1154db4a-0362-4ece-8f9b-7f54b902e3fe.png" 
          alt="Digital Banking Ecosystem" 
          className="relative z-10 rounded-lg shadow-lg w-full h-auto transform transition-all duration-500 pulse-glow"
        />
        
        {/* Banking-themed decorative elements */}
        <div className="absolute -bottom-8 -right-8 w-20 mobile-device opacity-90">
          <img 
            src="/lovable-uploads/9943e545-fc96-401b-98c2-3cb582ebab57.png" 
            alt="Security Icon" 
            className="w-full h-auto"
          />
        </div>
      </div>
    </div>
  );
};

export default HeroImage;
