
import React from 'react';

const HeroImage = () => {
  return (
    <div className="relative hidden lg:block">
      <div className="absolute inset-0 bg-gradient-to-br from-blue-500/20 to-blue-600/20 rounded-lg blur-xl"></div>
      <div>
        <img 
          src="/lovable-uploads/0c5a8c71-5b93-4f82-a79d-9c3def2e0515.png" 
          alt="Digital Innovation Ecosystem" 
          className="relative z-10 rounded-lg shadow-lg w-full h-auto transform transition-all duration-500 opacity-80"
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
