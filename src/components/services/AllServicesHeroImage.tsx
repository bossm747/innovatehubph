
import React from 'react';

const AllServicesHeroImage = () => {
  return (
    <div className="relative hidden lg:block">
      <div className="absolute inset-0 bg-gradient-to-br from-blue-500/20 to-purple-500/20 rounded-lg blur-xl"></div>
      <div className="relative z-10">
        <div className="relative">
          <img 
            src="/lovable-uploads/dea0d8a1-2294-4073-9761-8113ef0bed55.png" 
            alt="InnovateHub Services Suite" 
            className="rounded-lg shadow-lg w-full h-auto transform transition-all duration-500 hover:scale-105"
          />
          <div className="absolute -top-4 -right-4 bg-white p-2 rounded-lg shadow-lg rotate-3 animate-pulse">
            <img 
              src="/lovable-uploads/97f0f4de-a8d2-4527-8374-3152c6e866c4.png" 
              alt="PlataPay Icon" 
              className="h-10 w-10 object-contain" 
            />
          </div>
          <div className="absolute -bottom-4 -left-4 bg-white p-2 rounded-lg shadow-lg -rotate-3 animate-pulse" style={{ animationDelay: '1s' }}>
            <img 
              src="/lovable-uploads/d7a51504-2997-48f7-9e8a-32738ecc513d.png" 
              alt="AI Solutions Icon" 
              className="h-10 w-10 object-contain" 
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default AllServicesHeroImage;
