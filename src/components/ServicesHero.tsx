
import React from 'react';
import { ArrowDown } from 'lucide-react';
import HeroSection from './shared/HeroSection';
import ServicesHeroBackground from './services/ServicesHeroBackground';
import ServicesHeroImage from './services/ServicesHeroImage';

interface ServicesHeroProps {
  title: string;
  subtitle: string;
  imagePath: string;
}

const ServicesHero = ({ title, subtitle, imagePath }: ServicesHeroProps) => {
  return (
    <HeroSection
      title={title || "What We Do"}
      subtitle="Our Comprehensive Services"
      description={subtitle || "Smart Solutions for the Digital Economy"}
      primaryButtonText="Explore Services"
      primaryButtonLink="#service-tiles"
      backgroundComponent={<ServicesHeroBackground />}
      imageComponent={<ServicesHeroImage imagePath={imagePath} />}
      featureItems={[
        { icon: <span className="h-5 w-5 mr-2 text-blue-300">•</span>, text: "Custom Solutions" },
        { icon: <span className="h-5 w-5 mr-2 text-blue-300">•</span>, text: "Expert Support" }
      ]}
    />
  );
};

export default ServicesHero;
