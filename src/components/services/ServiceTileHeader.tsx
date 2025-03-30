
import React from 'react';

interface ServiceTileHeaderProps {
  title: string;
  subtitle: string;
}

const ServiceTileHeader = ({ title, subtitle }: ServiceTileHeaderProps) => {
  return (
    <div className="mb-16 text-center fade-up">
      <span className="inline-block px-3 py-1 text-sm font-medium bg-innovate-100 text-innovate-800 rounded-full mb-4">
        {title}
      </span>
      <h2 className="text-3xl md:text-4xl font-bold mb-6">{subtitle}</h2>
      <p className="text-gray-600 max-w-3xl mx-auto">
        From digital payments to AI-powered solutions, we provide a comprehensive range of services 
        to help businesses thrive in the digital economy.
      </p>
    </div>
  );
};

export default ServiceTileHeader;
