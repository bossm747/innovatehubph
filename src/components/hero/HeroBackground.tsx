
import React from 'react';

const HeroBackground = () => {
  return (
    <>
      {/* Circuit pattern overlay */}
      <div className="circuit-bg"></div>
      
      {/* Background patterns */}
      <div className="absolute inset-0 overflow-hidden opacity-10">
        <div className="absolute -top-24 -right-24 w-96 h-96 rounded-full bg-blue-500 filter blur-3xl"></div>
        <div className="absolute top-1/2 -left-24 w-64 h-64 rounded-full bg-white filter blur-3xl"></div>
        <div className="absolute -bottom-32 right-1/4 w-80 h-80 rounded-full bg-blue-300 filter blur-3xl"></div>
        
        {/* Grid pattern */}
        <div className="absolute inset-0" style={{ 
          backgroundImage: 'radial-gradient(rgba(255, 255, 255, 0.1) 1px, transparent 1px)', 
          backgroundSize: '20px 20px' 
        }}></div>
        
        {/* Security icon */}
        <div className="absolute top-32 right-32 w-16 h-16 opacity-30">
          <img 
            src="/lovable-uploads/9943e545-fc96-401b-98c2-3cb582ebab57.png" 
            alt="Security" 
            className="w-full h-full object-contain" 
          />
        </div>
      </div>
    </>
  );
};

export default HeroBackground;
