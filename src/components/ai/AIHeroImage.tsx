
import React from 'react';

const AIHeroImage = () => {
  return (
    <div className="relative hidden lg:block">
      <div className="absolute inset-0 bg-gradient-to-br from-blue-500/20 to-blue-600/20 rounded-lg blur-xl"></div>
      <div className="float-animation">
        <img 
          src="/lovable-uploads/0e8e799a-be25-4a8d-b183-2ae70ccc0107.png" 
          alt="AI Solutions" 
          className="relative z-10 rounded-lg shadow-lg w-full h-auto transform transition-all duration-500 pulse-glow"
        />
        
        {/* Decorative elements */}
        <div className="absolute -bottom-8 -right-8 w-20 mobile-device opacity-90">
          <img 
            src="/lovable-uploads/4d5b3eaa-0065-48e8-9976-3931a1836f81.png" 
            alt="AI Icon" 
            className="w-full h-auto"
          />
        </div>
      </div>
    </div>
  );
};

export default AIHeroImage;
