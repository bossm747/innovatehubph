
import React from 'react';

const FintechHeroImage = () => {
  return (
    <div className="relative hidden lg:block">
      <div className="absolute inset-0 bg-gradient-to-br from-blue-500/20 to-blue-600/20 rounded-lg blur-xl"></div>
      <div className="float-animation">
        <img 
          src="/lovable-uploads/60fc5fce-299b-4f14-b006-947a5cd409ba.png" 
          alt="Fintech Solutions" 
          className="relative z-10 rounded-lg shadow-lg w-full h-auto transform transition-all duration-500 pulse-glow"
        />
        
        {/* Decorative elements */}
        <div className="absolute -bottom-8 -right-8 w-20 mobile-device opacity-90">
          <img 
            src="/lovable-uploads/91381d0d-4da4-4d24-bb11-5970f5e2d23e.png" 
            alt="Fintech Icon" 
            className="w-full h-auto"
          />
        </div>
      </div>
    </div>
  );
};

export default FintechHeroImage;
