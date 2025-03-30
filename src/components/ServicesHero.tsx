
import React from 'react';
import { ArrowDown } from 'lucide-react';
import HeroSection from './shared/HeroSection';
import ServicesHeroBackground from './services/ServicesHeroBackground';
import ServicesHeroImage from './services/ServicesHeroImage';

interface ServicesHeroProps {
  title: string;
  subtitle: string;
  description?: string;
  imagePath?: string;
  imageComponent?: React.ReactNode;
  backgroundComponent?: React.ReactNode;
  primaryButtonText?: string;
  primaryButtonLink?: string;
  featureItems?: { icon: React.ReactNode; text: string }[];
}

const ServicesHero = ({ 
  title, 
  subtitle,
  description, 
  imagePath, 
  imageComponent, 
  backgroundComponent,
  primaryButtonText,
  primaryButtonLink,
  featureItems
}: ServicesHeroProps) => {
  return (
    <HeroSection
      title={title || "What We Do"}
      subtitle={subtitle || "Our Comprehensive Services"}
      description={description || "Smart Solutions for the Digital Economy"}
      primaryButtonText={primaryButtonText || "Explore Services"}
      primaryButtonLink={primaryButtonLink || "#service-tiles"}
      backgroundComponent={backgroundComponent || <ServicesHeroBackground />}
      imageComponent={imageComponent || <ServicesHeroImage imagePath={imagePath || "/lovable-uploads/532edcfe-0bf3-4962-8ca3-b1e5d0576301.png"} />}
      featureItems={featureItems || [
        { icon: <span className="h-5 w-5 mr-2 text-blue-300">•</span>, text: "Custom Solutions" },
        { icon: <span className="h-5 w-5 mr-2 text-blue-300">•</span>, text: "Expert Support" }
      ]}
    />
  );
};

export default ServicesHero;
