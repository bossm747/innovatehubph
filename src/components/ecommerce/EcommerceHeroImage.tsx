
import React from 'react';

const EcommerceHeroImage = () => {
  return (
    <div className="relative hidden lg:block">
      <div className="absolute inset-0 bg-gradient-to-br from-blue-500/20 to-blue-600/20 rounded-lg blur-xl"></div>
      <div className="float-animation">
        <img 
          src="/lovable-uploads/5c085ba8-48d9-4a1a-9bb0-97e24b646f38.png" 
          alt="E-commerce Solutions" 
          className="relative z-10 rounded-lg shadow-lg w-full h-auto transform transition-all duration-500 pulse-glow"
        />
        
        {/* Decorative elements */}
        <div className="absolute -bottom-8 -right-8 w-20 mobile-device opacity-90">
          <img 
            src="/lovable-uploads/2992c718-ef43-4ea4-8209-8ac48cc7cc87.png" 
            alt="E-commerce Icon" 
            className="w-full h-auto"
          />
        </div>
      </div>
    </div>
  );
};

export default EcommerceHeroImage;
