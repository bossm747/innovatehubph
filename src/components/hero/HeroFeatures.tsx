
import React from 'react';
import { Shield, Zap } from 'lucide-react';

const HeroFeatures = () => {
  return (
    <div className="mt-4 flex items-center gap-4 text-blue-200 animate-fade-in" style={{animationDelay: '600ms'}}>
      <div className="flex items-center">
        <Shield className="h-4 w-4 mr-2 text-blue-300" />
        Secure Solutions
      </div>
      <div className="flex items-center">
        <Zap className="h-4 w-4 mr-2 text-blue-300" />
        Fast Implementation
      </div>
    </div>
  );
};

export default HeroFeatures;
