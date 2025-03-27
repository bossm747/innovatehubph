
import React from 'react';

const YoutubeVideo = () => {
  return (
    <section className="py-20 px-6 md:px-12 lg:px-24 bg-gradient-to-r from-innovate-900/5 to-innovate-600/5 relative overflow-hidden">
      <div className="container mx-auto">
        <div className="max-w-3xl mx-auto text-center mb-12">
          <span className="inline-block px-3 py-1 text-sm font-medium bg-innovate-100 text-innovate-800 rounded-full mb-6">
            Featured Video
          </span>
          <h2 className="text-3xl md:text-4xl font-bold mb-6 hero-text-gradient">
            See InnovateHub in Action
          </h2>
          <p className="text-lg text-gray-600">
            Discover how our solutions are transforming the digital landscape.
          </p>
        </div>
        
        <div className="relative max-w-4xl mx-auto fade-up">
          <div className="absolute inset-0 -z-10 bg-gradient-to-r from-innovate-300/10 to-innovate-500/10 rounded-xl blur-xl transform scale-105"></div>
          <div className="aspect-w-16 aspect-h-9 rounded-xl overflow-hidden shadow-xl relative">
            <iframe 
              className="w-full h-full absolute inset-0"
              src="https://www.youtube.com/embed/TIWK4KP9D5Q?si=_epwLFQGIV7vkocY&autoplay=1&mute=1" 
              title="InnovateHub Video"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
              allowFullScreen
            ></iframe>
          </div>
          
          {/* Decorative elements */}
          <div className="absolute -bottom-4 -right-4 w-20 h-20 bg-blue-100 rounded-lg -z-10"></div>
          <div className="absolute -top-4 -left-4 w-16 h-16 bg-innovate-100 rounded-lg -z-10"></div>
        </div>
      </div>
    </section>
  );
};

export default YoutubeVideo;
