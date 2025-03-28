
import React from 'react';
import { Shield, Zap } from 'lucide-react';

const HeroFeatures = () => {
  return (
    <div className="mt-8 flex items-center gap-6 text-blue-200 animate-fade-in" style={{animationDelay: '600ms'}}>
      <div className="flex items-center">
        <Shield className="h-5 w-5 mr-2 text-blue-300" />
        <span>Secure Solutions</span>
      </div>
      <div className="flex items-center">
        <Zap className="h-5 w-5 mr-2 text-blue-300" />
        <span>Fast Implementation</span>
      </div>
    </div>
  );
};

export default HeroFeatures;
