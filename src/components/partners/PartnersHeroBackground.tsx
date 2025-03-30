
import React from 'react';

const PartnersHeroBackground: React.FC = () => {
  return (
    <>
      {/* Abstract shapes */}
      <div className="absolute top-20 left-10 w-32 h-32 bg-blue-500/10 rounded-full filter blur-xl"></div>
      <div className="absolute bottom-20 right-10 w-24 h-24 bg-green-600/10 rounded-full filter blur-xl"></div>
      
      {/* Pattern */}
      <div className="absolute inset-0 overflow-hidden opacity-5">
        <div className="absolute -right-10 top-10 text-4xl font-mono text-white whitespace-nowrap">
          {`{ partners: [], collaborate: true, innovation: 100% }`}
        </div>
        <div className="absolute left-10 bottom-20 text-3xl font-mono text-white whitespace-nowrap">
          {`function buildPartnership() { return <Success />; }`}
        </div>
      </div>
      
      {/* Gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-900/60 via-indigo-800/60 to-purple-900/60"></div>
    </>
  );
};

export default PartnersHeroBackground;
