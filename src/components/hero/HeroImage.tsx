
import React from 'react';

const HeroImage = () => {
  return (
    <div className="relative hidden lg:block">
      <div className="absolute inset-0 bg-gradient-to-br from-blue-500/20 to-blue-600/20 rounded-lg blur-xl"></div>
      <div>
        <img 
          src="/lovable-uploads/85b1b149-7643-4595-a973-1519f7762ba6.png" 
          alt="Digital Innovation Ecosystem" 
          className="relative z-10 rounded-lg shadow-lg w-full h-auto transform transition-all duration-500 opacity-90"
        />
        
        {/* Holographic decorative element */}
        <div className="absolute -bottom-4 -right-4 w-16 opacity-90 animate-float">
          <div className="w-full h-full bg-gradient-to-r from-blue-400 to-purple-500 rounded-full blur-sm"></div>
        </div>
      </div>
    </div>
  );
};

export default HeroImage;
