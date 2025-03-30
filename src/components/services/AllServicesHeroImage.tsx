
import React from 'react';

const AllServicesHeroImage = () => {
  return (
    <div className="relative hidden lg:block">
      <div className="absolute inset-0 bg-gradient-to-br from-blue-500/20 to-purple-500/20 rounded-lg blur-xl"></div>
      <div className="float-animation">
        <img 
          src="/lovable-uploads/dea0d8a1-2294-4073-9761-8113ef0bed55.png" 
          alt="InnovateHub Services Suite" 
          className="relative z-10 rounded-lg shadow-lg w-full h-auto transform transition-all duration-500 hover:scale-105"
        />
      </div>
    </div>
  );
};

export default AllServicesHeroImage;
