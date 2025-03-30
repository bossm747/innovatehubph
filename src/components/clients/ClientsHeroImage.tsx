
import React from 'react';

const ClientsHeroImage = () => {
  return (
    <div className="relative hidden lg:block">
      <div className="absolute inset-0 bg-gradient-to-br from-purple-500/20 to-indigo-600/20 rounded-lg blur-xl"></div>
      <div className="float-animation">
        <img 
          src="/lovable-uploads/0fd8af37-268c-44ee-b884-e6226e22b674.png" 
          alt="Clients Partnerships" 
          className="relative z-10 rounded-lg shadow-lg object-cover w-full h-auto transform transition-all duration-500"
        />
        
        {/* Decorative elements */}
        <div className="absolute -top-6 -right-6 w-16 h-16 bg-gradient-to-br from-purple-400 to-purple-600 rounded-full flex items-center justify-center shadow-lg animate-pulse-slow">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"></path>
            <circle cx="9" cy="7" r="4"></circle>
            <path d="M22 21v-2a4 4 0 0 0-3-3.87"></path>
            <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
          </svg>
        </div>
      </div>
    </div>
  );
};

export default ClientsHeroImage;
