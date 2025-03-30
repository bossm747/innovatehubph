
import React from 'react';

const DigitalCustomizationsHeroBackground: React.FC = () => {
  return (
    <>
      {/* Abstract shapes */}
      <div className="absolute top-20 left-10 w-32 h-32 bg-purple-400/10 rounded-full filter blur-xl"></div>
      <div className="absolute bottom-20 right-10 w-24 h-24 bg-indigo-500/10 rounded-full filter blur-xl"></div>
      
      {/* Code pattern */}
      <div className="absolute inset-0 overflow-hidden opacity-5">
        <div className="absolute -right-10 top-10 text-4xl font-mono text-white whitespace-nowrap">
          {`{ code: () => <Components />, data: [], style: {} }`}
        </div>
        <div className="absolute left-10 bottom-20 text-3xl font-mono text-white whitespace-nowrap">
          {`function customApp() { return <Digital />; }`}
        </div>
      </div>
      
      {/* Gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-purple-900/60 via-indigo-800/60 to-blue-900/60"></div>
    </>
  );
};

export default DigitalCustomizationsHeroBackground;
