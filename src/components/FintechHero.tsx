
import React from 'react';
import HeroSection from './shared/HeroSection';
import FintechHeroBackground from './fintech/FintechHeroBackground';
import FintechHeroImage from './fintech/FintechHeroImage';
import { CreditCard, ShieldCheck, Wallet } from 'lucide-react';

const FintechHero = () => {
  return (
    <HeroSection
      title="Secure Digital Payment Solutions"
      subtitle="PlataPay Fintech"
      description="Empowering businesses and individuals with secure, innovative, and user-friendly payment solutions for the digital economy."
      primaryButtonText="Explore Solutions"
      primaryButtonLink="#fintech-services"
      secondaryButtonText="Become an Agent"
      secondaryButtonLink="/contact?service=platapay"
      backgroundComponent={<FintechHeroBackground />}
      imageComponent={<FintechHeroImage />}
      featureItems={[
        { icon: <ShieldCheck className="h-4 w-4 mr-2 text-blue-300" />, text: "Bank-Level Security" },
        { icon: <Wallet className="h-4 w-4 mr-2 text-blue-300" />, text: "Digital Wallet" },
        { icon: <CreditCard className="h-4 w-4 mr-2 text-blue-300" />, text: "Multiple Payment Options" }
      ]}
    />
  );
};

export default FintechHero;
