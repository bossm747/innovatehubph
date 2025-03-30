
import React from 'react';
import { Button } from "@/components/ui/button";
import { Link } from 'react-router-dom';
import { ArrowRight, Phone } from 'lucide-react';

const HeroButtons = () => {
  return (
    <div className="flex flex-wrap gap-3 animate-fade-in" style={{animationDelay: '500ms'}}>
      <Button 
        size="default" 
        variant="green"
        asChild
        className="group"
      >
        <Link to="/services" className="flex items-center justify-center">
          Explore Our Services <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
        </Link>
      </Button>
      <Button 
        size="default" 
        variant="purple"
        asChild
        className="group text-white"
      >
        <Link to="/contact" className="flex items-center justify-center">
          <Phone className="mr-2 h-4 w-4" />
          Contact Us
        </Link>
      </Button>
    </div>
  );
};

export default HeroButtons;
