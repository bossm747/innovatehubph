
import React from 'react';

const AboutHeroImage = () => {
  return (
    <div className="relative hidden lg:block">
      <div className="absolute inset-0 bg-gradient-to-br from-blue-500/20 to-blue-600/20 rounded-lg blur-xl"></div>
      <div className="float-animation">
        <img 
          src="/lovable-uploads/e5cded83-8d62-4437-ad5d-69b26fd5828e.png" 
          alt="InnovateHub Team" 
          className="relative z-10 rounded-lg shadow-lg w-full h-auto transform transition-all duration-500 pulse-glow"
        />
        
        {/* Decorative elements */}
        <div className="absolute -bottom-8 -right-8 w-20 mobile-device opacity-90">
          <img 
            src="/lovable-uploads/9943e545-fc96-401b-98c2-3cb582ebab57.png" 
            alt="Innovation Icon" 
            className="w-full h-auto"
          />
        </div>
      </div>
    </div>
  );
};

export default AboutHeroImage;
