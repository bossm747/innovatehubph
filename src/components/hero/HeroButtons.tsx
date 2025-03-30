
import React from 'react';
import { Button } from "@/components/ui/button";
import { Link } from 'react-router-dom';
import { ArrowRight, CreditCard, Users, Phone } from 'lucide-react';

const HeroButtons = () => {
  return (
    <div className="flex flex-wrap gap-2 animate-fade-in" style={{animationDelay: '500ms'}}>
      <Button 
        size="sm" 
        variant="green"
        asChild
        className="group"
      >
        <Link to="/fintech-solutions" className="flex items-center justify-center">
          <CreditCard className="mr-2 h-4 w-4" />
          Fintech Solutions <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
        </Link>
      </Button>
      <Button 
        size="sm" 
        variant="primary"
        asChild
        className="group"
      >
        <Link to="/partners" className="flex items-center justify-center">
          <Users className="mr-2 h-4 w-4" />
          Our Partners
        </Link>
      </Button>
      <Button 
        size="sm" 
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
