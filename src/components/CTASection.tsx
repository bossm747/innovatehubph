
import React from 'react';
import { Button } from './ui/button';

interface CTASectionProps {
  title: string;
  subtitle: string;
  buttonText: string;
  buttonLink: string;
  bgColor?: string;
}

const CTASection = ({ 
  title, 
  subtitle, 
  buttonText, 
  buttonLink,
  bgColor = 'bg-blue-600' 
}: CTASectionProps) => {
  return (
    <section className={`py-16 ${bgColor} text-white`}>
      <div className="container mx-auto px-4 text-center">
        <h2 className="text-3xl font-bold mb-4 max-w-2xl mx-auto">
          {title}
        </h2>
        <p className="text-lg mb-8 max-w-2xl mx-auto opacity-90">
          {subtitle}
        </p>
        <Button 
          variant="green" 
          size="lg" 
          className="px-8 font-medium"
          asChild
        >
          <a href={buttonLink}>{buttonText}</a>
        </Button>
      </div>
    </section>
  );
};

export default CTASection;
