
import React from 'react';

interface ServicesHeroImageProps {
  imagePath: string;
}

const ServicesHeroImage = ({ imagePath }: ServicesHeroImageProps) => {
  return (
    <div className="relative hidden lg:block">
      <div className="absolute inset-0 bg-gradient-to-br from-blue-500/20 to-blue-500/20 rounded-lg blur-xl"></div>
      <img 
        src={imagePath || "/lovable-uploads/532edcfe-0bf3-4962-8ca3-b1e5d0576301.png"} 
        alt="Services" 
        className="relative z-10 rounded-lg shadow-lg object-cover w-full h-auto transform hover:scale-105 transition-all duration-500"
      />
    </div>
  );
};

export default ServicesHeroImage;
