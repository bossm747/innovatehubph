
import React from 'react';

const PartnersHeroImage = () => {
  return (
    <div className="relative hidden lg:block">
      <div className="absolute inset-0 bg-gradient-to-br from-blue-500/20 to-blue-600/20 rounded-lg blur-xl"></div>
      <div className="float-animation">
        <img 
          src="/lovable-uploads/7e63284f-e3ac-462b-80ca-e3b33a45f4ec.png" 
          alt="Financial Partners Ecosystem" 
          className="relative z-10 rounded-lg shadow-lg w-full h-auto transform transition-all duration-500 pulse-glow"
        />
      </div>
    </div>
  );
};

export default PartnersHeroImage;
