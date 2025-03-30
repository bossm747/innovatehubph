
import React from 'react';
import HeroSection from './shared/HeroSection';
import EcommerceHeroBackground from './ecommerce/EcommerceHeroBackground';
import EcommerceHeroImage from './ecommerce/EcommerceHeroImage';
import { ShoppingCart, Globe } from 'lucide-react';

const EcommerceHero = () => {
  return (
    <HeroSection
      title="E-commerce Solutions"
      subtitle="Online Retail Excellence"
      description="Building and scaling online retail experiences with robust, user-friendly platforms"
      primaryButtonText="Explore Solutions"
      primaryButtonLink="#ecommerce-services"
      secondaryButtonText="Get a Quote"
      secondaryButtonLink="/contact"
      backgroundComponent={<EcommerceHeroBackground />}
      imageComponent={<EcommerceHeroImage />}
      featureItems={[
        { icon: <ShoppingCart className="h-4 w-4 mr-2 text-blue-300" />, text: "Custom Storefronts" },
        { icon: <Globe className="h-4 w-4 mr-2 text-blue-300" />, text: "Global Reach" }
      ]}
    />
  );
};

export default EcommerceHero;
