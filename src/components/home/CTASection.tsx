import React from 'react';
import { Phone, CheckCircle, LockKeyhole } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';

const CTASection = () => {
  return (
    <section className="py-24 px-6 md:px-12 bg-blue-900 text-white relative overflow-hidden">
      <div className="absolute inset-0 overflow-hidden opacity-10">
        <div className="absolute -top-24 -right-24 w-96 h-96 rounded-full bg-blue-500 filter blur-3xl"></div>
        <div className="absolute top-1/2 -left-24 w-64 h-64 rounded-full bg-white filter blur-3xl"></div>
        <div className="absolute -bottom-32 right-1/4 w-80 h-80 rounded-full bg-blue-300 filter blur-3xl"></div>
        
        {/* Removed Security illustration */}
        
        {/* Grid pattern */}
        <div className="absolute inset-0" style={{ 
          backgroundImage: 'radial-gradient(rgba(255, 255, 255, 0.1) 1px, transparent 1px)', 
          backgroundSize: '20px 20px' 
        }}></div>
      </div>
      
      <div className="container mx-auto relative z-10">
        <div className="max-w-3xl mx-auto text-center fade-up">
          <div className="mb-8 flex justify-center">
            <div className="w-16 h-16 rounded-full bg-blue-800 flex items-center justify-center pulse-glow">
              <LockKeyhole className="h-8 w-8 text-white" />
            </div>
          </div>
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Ready to Transform Your Business with Digital Innovation?
          </h2>
          <p className="text-xl text-blue-200 mb-8">
            Let's collaborate to build customized solutions that drive growth, enhance efficiency, 
            and position your business for success in the digital economy.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Button 
              size="xl" 
              variant="green"
              width="fixed"
              className="btn-shine"
              asChild
            >
              <Link to="/contact" className="flex items-center justify-center">
                <Phone className="mr-2 h-5 w-5" />
                Get In Touch
              </Link>
            </Button>
            <Button 
              size="xl" 
              variant="outline" 
              width="fixed"
              className="border-white/30 text-white hover:bg-white/10"
              asChild
            >
              <Link to="/services" className="flex items-center justify-center">
                <CheckCircle className="mr-2 h-5 w-5" />
                Explore Services
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CTASection;
