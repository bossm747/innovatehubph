
import React from 'react';
import { Button } from "@/components/ui/button";
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';

interface HeroSectionProps {
  title: string;
  subtitle: string;
  description?: string;
  primaryButtonText?: string;
  primaryButtonLink?: string;
  secondaryButtonText?: string;
  secondaryButtonLink?: string;
  backgroundComponent: React.ReactNode;
  imageComponent: React.ReactNode;
  featureItems?: { icon: React.ReactNode; text: string }[];
}

const HeroSection = ({
  title,
  subtitle,
  description,
  primaryButtonText,
  primaryButtonLink,
  secondaryButtonText,
  secondaryButtonLink,
  backgroundComponent,
  imageComponent,
  featureItems
}: HeroSectionProps) => {
  return (
    <section className="relative py-8 md:py-10 px-4 md:px-8 lg:px-16 overflow-hidden bg-gradient-to-b from-blue-800 to-blue-900 text-white">
      {backgroundComponent}
      
      <div className="container mx-auto relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 md:gap-6 items-center">
          <div className="max-w-xl">
            <span className="inline-block px-3 py-1 text-sm font-medium bg-white/10 text-blue-200 rounded-full mb-2 animate-fade-in" style={{animationDelay: '100ms'}}>
              {subtitle}
            </span>
            <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold mb-2 text-white animate-fade-in" style={{animationDelay: '200ms'}}>
              {title}
            </h1>
            {description && (
              <p className="text-sm md:text-base text-blue-100 mb-3 animate-fade-in" style={{animationDelay: '300ms'}}>
                {description}
              </p>
            )}
            
            {(primaryButtonText || secondaryButtonText) && (
              <div className="flex flex-wrap gap-3 animate-fade-in" style={{animationDelay: '400ms'}}>
                {primaryButtonText && primaryButtonLink && (
                  <Button className="bg-green-600 hover:bg-green-700 text-white" asChild>
                    <Link to={primaryButtonLink} className="flex items-center">
                      {primaryButtonText} <ArrowRight className="ml-2 h-4 w-4" />
                    </Link>
                  </Button>
                )}
                
                {secondaryButtonText && secondaryButtonLink && (
                  <Button variant="outline" className="border-white/20 hover:bg-white/10 text-white" asChild>
                    <Link to={secondaryButtonLink}>{secondaryButtonText}</Link>
                  </Button>
                )}
              </div>
            )}
            
            {featureItems && featureItems.length > 0 && (
              <div className="mt-4 flex items-center gap-4 text-blue-200 animate-fade-in" style={{animationDelay: '500ms'}}>
                {featureItems.map((item, index) => (
                  <div key={index} className="flex items-center">
                    {item.icon || <span className="h-5 w-5 mr-2 text-blue-300">•</span>}
                    {item.text}
                  </div>
                ))}
              </div>
            )}
          </div>
          
          {imageComponent}
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
