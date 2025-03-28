
import React from 'react';
import { Button } from "@/components/ui/button";
import { Link } from 'react-router-dom';
import { Users, History, Award } from 'lucide-react';

const AboutHero = () => {
  return (
    <section className="relative py-24 overflow-hidden bg-gradient-to-b from-[#1A1F2C] to-[#9F9EA1] text-white">
      {/* Background patterns */}
      <div className="absolute inset-0 overflow-hidden opacity-10">
        <div className="absolute -top-24 -right-24 w-96 h-96 rounded-full bg-innovate-500 filter blur-3xl"></div>
        <div className="absolute top-1/2 -left-24 w-64 h-64 rounded-full bg-white filter blur-3xl"></div>
        <div className="absolute -bottom-32 right-1/4 w-80 h-80 rounded-full bg-innovate-300 filter blur-3xl"></div>
        
        {/* Grid pattern */}
        <div className="absolute inset-0" style={{ 
          backgroundImage: 'radial-gradient(rgba(255, 255, 255, 0.1) 1px, transparent 1px)', 
          backgroundSize: '20px 20px' 
        }}></div>
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="max-w-3xl">
          <div className="flex items-center space-x-2 mb-4">
            <div className="p-2 rounded-full bg-white/10">
              <History className="h-5 w-5" />
            </div>
            <div className="text-lg font-medium text-gray-200">About Us</div>
          </div>
          
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
            Who We Are
          </h1>
          
          <h2 className="text-xl md:text-2xl text-innovate-200 mb-6">
            Passionate Innovators in the Philippine Tech Landscape
          </h2>
          
          <p className="text-lg md:text-xl text-gray-200 mb-8 max-w-2xl">
            From our humble beginnings in Batangas to our expansion into Dubai, 
            we've been relentlessly pursuing innovation in fintech, e-commerce, and digital solutions.
          </p>
          
          <div className="flex flex-wrap gap-4">
            <Button 
              size="lg" 
              className="bg-innovate-600 hover:bg-innovate-700 text-white transition-colors btn-shine"
              asChild
            >
              <Link to="#company-overview">
                Our Growth Story
              </Link>
            </Button>
            
            <Button 
              variant="outline" 
              size="lg" 
              className="border-white text-white hover:bg-white/10"
              asChild
            >
              <Link to="#team-section" className="flex items-center">
                <Users className="mr-2 h-5 w-5" />
                Meet Our Team
              </Link>
            </Button>
          </div>
          
          {/* Achievement badges */}
          <div className="flex flex-wrap mt-12 gap-6">
            <div className="flex items-center space-x-2">
              <div className="p-2 rounded-full bg-white/10">
                <Award className="h-5 w-5 text-innovate-300" />
              </div>
              <span className="text-sm text-gray-200">Est. 2020 in Batangas</span>
            </div>
            
            <div className="flex items-center space-x-2">
              <div className="p-2 rounded-full bg-white/10">
                <Users className="h-5 w-5 text-innovate-300" />
              </div>
              <span className="text-sm text-gray-200">35+ Expert Team Members</span>
            </div>
            
            <div className="flex items-center space-x-2">
              <div className="p-2 rounded-full bg-white/10">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-innovate-300" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M4.083 9h1.946c.089-1.546.383-2.97.837-4.118A6.004 6.004 0 004.083 9zM10 2a8 8 0 100 16 8 8 0 000-16zm0 2c-.076 0-.232.032-.465.262-.238.234-.497.623-.737 1.182-.389.907-.673 2.142-.766 3.556h3.936c-.093-1.414-.377-2.649-.766-3.556-.24-.56-.5-.948-.737-1.182C10.232 4.032 10.076 4 10 4zm3.971 5c-.089-1.546-.383-2.97-.837-4.118A6.004 6.004 0 0115.917 9h-1.946zm-2.003 2H8.032c.093 1.414.377 2.649.766 3.556.24.56.5.948.737 1.182.233.23.389.262.465.262.076 0 .232-.032.465-.262.238-.234.498-.623.737-1.182.389-.907.673-2.142.766-3.556zm1.166 4.118c.454-1.147.748-2.572.837-4.118h1.946a6.004 6.004 0 01-2.783 4.118zm-6.268 0C6.412 13.97 6.118 12.546 6.03 11H4.083a6.004 6.004 0 002.783 4.118z" clipRule="evenodd" />
                </svg>
              </div>
              <span className="text-sm text-gray-200">Global Operations</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutHero;
