
import React from 'react';
import { Card, CardContent } from "@/components/ui/card";

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
          
          <div className="mt-16 grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* AI-enhanced cards */}
            <div className="relative fade-up">
              <Card className="glass-card shadow-medium border-0 overflow-hidden animate-float">
                <CardContent className="p-6">
                  <div className="flex items-center gap-4 mb-4">
                    <div className="flex items-center justify-center w-12 h-12 rounded-full bg-innovate-100">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-innovate-700" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2z" />
                      </svg>
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold">Innovation Journey</h3>
                      <p className="text-sm text-gray-500">From Vision to Reality</p>
                    </div>
                  </div>
                  
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-sm">Digital Products</span>
                      <span className="text-sm font-medium">12+ Solutions</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-1.5">
                      <div className="bg-gradient-to-r from-innovate-400 to-innovate-600 h-1.5 rounded-full" style={{ width: '80%' }}></div>
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <span className="text-sm">Client Success Rate</span>
                      <span className="text-sm font-medium">92%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-1.5">
                      <div className="bg-gradient-to-r from-innovate-400 to-innovate-600 h-1.5 rounded-full" style={{ width: '92%' }}></div>
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <span className="text-sm">Expansion Progress</span>
                      <span className="text-sm font-medium">Batangas to Dubai</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-1.5">
                      <div className="bg-gradient-to-r from-innovate-400 to-innovate-600 h-1.5 rounded-full" style={{ width: '75%' }}></div>
                    </div>
                  </div>
                </CardContent>
              </Card>
              {/* Decorative elements */}
              <div className="absolute -bottom-3 -right-3 w-20 h-20 bg-blue-100 rounded-lg -z-10"></div>
            </div>
            
            <div className="relative fade-up" style={{ animationDelay: '0.2s' }}>
              <Card className="glass-card shadow-medium border-0 overflow-hidden animate-float" style={{ animationDelay: '0.3s' }}>
                <CardContent className="p-6">
                  <div className="flex items-center gap-4 mb-4">
                    <div className="flex items-center justify-center w-12 h-12 rounded-full bg-innovate-100">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-innovate-700" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                      </svg>
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold">Our Growth</h3>
                      <p className="text-sm text-gray-500">Building Together</p>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <div className="text-center p-3 bg-white/50 rounded-lg">
                      <p className="text-3xl font-bold text-innovate-700">3+</p>
                      <p className="text-sm text-gray-600">Years Experience</p>
                    </div>
                    
                    <div className="text-center p-3 bg-white/50 rounded-lg">
                      <p className="text-3xl font-bold text-innovate-700">50+</p>
                      <p className="text-sm text-gray-600">Happy Clients</p>
                    </div>
                    
                    <div className="text-center p-3 bg-white/50 rounded-lg">
                      <p className="text-3xl font-bold text-innovate-700">15+</p>
                      <p className="text-sm text-gray-600">Team Members</p>
                    </div>
                    
                    <div className="text-center p-3 bg-white/50 rounded-lg">
                      <p className="text-3xl font-bold text-innovate-700">2</p>
                      <p className="text-sm text-gray-600">Global Offices</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
              {/* Decorative elements */}
              <div className="absolute -top-3 -left-3 w-16 h-16 bg-innovate-100 rounded-lg -z-10"></div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Hero image */}
      <div className="mt-16 relative max-w-6xl mx-auto overflow-hidden rounded-xl shadow-medium">
        <img 
          src="/lovable-uploads/682f90d9-02d8-49f0-b70f-855d715c4166.png" 
          alt="InnovateHub Team" 
          className="w-full h-auto"
        />
        <div className="absolute inset-0 bg-innovate-900/10"></div>
      </div>
    </section>
  );
};

export default AboutHero;
