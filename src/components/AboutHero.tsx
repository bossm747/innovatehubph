
import React from 'react';

const AboutHero = () => {
  return (
    <section className="relative py-24 px-6 md:px-12 lg:px-24 bg-gradient-to-r from-innovate-900/10 to-innovate-600/10">
      <div className="container mx-auto">
        <div className="max-w-3xl mx-auto text-center">
          <span className="inline-block px-3 py-1 text-sm font-medium bg-innovate-100 text-innovate-800 rounded-full mb-6">
            About InnovateHub
          </span>
          <h1 className="text-4xl md:text-5xl font-bold mb-6 hero-text-gradient">
            Who We Are
          </h1>
          <p className="text-xl md:text-2xl font-light text-gray-600 mb-10">
            Passionate Innovators in the Philippine Tech Landscape
          </p>
          
          <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-6">
            {/* Stats - Updated with more realistic startup numbers */}
            <div className="text-center">
              <p className="text-4xl font-bold text-innovate-700">3+</p>
              <p className="text-gray-600">Years Experience</p>
            </div>
            <div className="text-center">
              <p className="text-4xl font-bold text-innovate-700">50+</p>
              <p className="text-gray-600">Happy Clients</p>
            </div>
            <div className="text-center">
              <p className="text-4xl font-bold text-innovate-700">15+</p>
              <p className="text-gray-600">Team Members</p>
            </div>
            <div className="text-center">
              <p className="text-4xl font-bold text-innovate-700">92%</p>
              <p className="text-gray-600">Success Rate</p>
            </div>
          </div>
        </div>
      </div>
      
      {/* Hero image */}
      <div className="mt-16 relative max-w-6xl mx-auto overflow-hidden rounded-xl shadow-medium">
        <img 
          src="public/lovable-uploads/682f90d9-02d8-49f0-b70f-855d715c4166.png" 
          alt="InnovateHub Team" 
          className="w-full h-auto"
        />
        <div className="absolute inset-0 bg-innovate-900/10"></div>
      </div>
    </section>
  );
};

export default AboutHero;
