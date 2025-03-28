
import React from 'react';
import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';

const TeamPreviewSection = () => {
  return (
    <section className="py-24 px-6 md:px-12 bg-gradient-to-r from-gray-50 to-gray-100 relative overflow-hidden">
      <div className="container mx-auto">
        <div className="text-center mb-16 fade-up">
          <span className="inline-block px-3 py-1 text-sm font-medium bg-innovate-100 text-innovate-800 rounded-full mb-4">
            Our Team
          </span>
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Meet the Innovators
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Our diverse team brings together the talents needed to revolutionize digital finance and technology in the Philippines and beyond.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          {[1, 2, 3, 4].map((index) => (
            <div 
              key={index} 
              className="bg-white rounded-xl overflow-hidden shadow-soft hover:shadow-medium transition-all duration-300 fade-up card-3d"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <div className="h-64 overflow-hidden">
                <img 
                  src={`/lovable-uploads/5c085ba8-48d9-4a1a-9bb0-97e24b646f38.png`} 
                  alt={`Team Member ${index}`} 
                  className="w-full h-full object-cover transition-transform hover:scale-110 duration-500"
                />
              </div>
              <div className="p-6">
                <h3 className="text-xl font-semibold mb-1">Team Member {index}</h3>
                <p className="text-innovate-600 mb-4">Leadership Position</p>
                <p className="text-gray-600 text-sm">Experienced professional with expertise in digital innovation and business growth.</p>
              </div>
            </div>
          ))}
        </div>
        
        <div className="text-center fade-up">
          <Button 
            variant="purple"
            size="lg"
            width="fixed"
            className="btn-shine group"
            asChild
          >
            <Link to="/team" className="flex items-center justify-center">
              View Full Team <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
};

export default TeamPreviewSection;
