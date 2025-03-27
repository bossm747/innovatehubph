
import React from 'react';
import { Button } from '@/components/ui/button';
import { Users, ArrowRight } from 'lucide-react';

const TeamPageHeader = () => {
  return (
    <section className="relative py-24 overflow-hidden bg-gradient-to-b from-innovate-800 to-innovate-950 text-white">
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
              <Users className="h-5 w-5" />
            </div>
            <div className="text-lg font-medium text-innovate-200">Our People</div>
          </div>
          
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
            The Team Behind<br />
            <span className="text-innovate-300">InnovateHub's Success</span>
          </h1>
          
          <p className="text-lg md:text-xl text-innovate-100 mb-8 max-w-2xl">
            From tech innovators to finance experts, our diverse team brings together the talents needed to revolutionize digital finance in the Philippines and beyond.
          </p>
          
          <div className="flex flex-wrap gap-4">
            <Button size="lg" className="bg-white text-innovate-900 hover:bg-innovate-100">
              Meet the Team <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
            <Button size="lg" variant="outline" className="border-white/40 hover:bg-white/10">
              Join Our Team
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TeamPageHeader;
