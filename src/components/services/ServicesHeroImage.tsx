
import React from 'react';

interface ServicesHeroImageProps {
  imagePath: string;
}

const ServicesHeroImage = ({ imagePath }: ServicesHeroImageProps) => {
  return (
    <div className="relative hidden lg:block">
      <div className="absolute inset-0 bg-gradient-to-br from-blue-500/20 to-blue-500/20 rounded-lg blur-xl"></div>
      <img 
        src={imagePath || "/lovable-uploads/d51f3d08-0518-4808-af9d-83ddda86ee94.png"} 
        alt="Services" 
        className="relative z-10 rounded-lg shadow-lg object-cover w-full h-auto transform hover:scale-105 transition-all duration-500"
      />
    </div>
  );
};

export default ServicesHeroImage;
