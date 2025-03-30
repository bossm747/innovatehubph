
import React from 'react';
import HeroSection from './shared/HeroSection';
import FintechHeroBackground from './fintech/FintechHeroBackground';
import FintechHeroImage from './fintech/FintechHeroImage';
import { CreditCard, ShieldCheck } from 'lucide-react';

const FintechHero = () => {
  return (
    <HeroSection
      title="PlataPay – Digital Finance Solutions"
      subtitle="Fintech Solutions"
      description="Empowering micropreneurs and communities through secure and income-generating digital financial services."
      primaryButtonText="Explore PlataPay"
      primaryButtonLink="#fintech-services"
      secondaryButtonText="Become an Agent"
      secondaryButtonLink="/contact"
      backgroundComponent={<FintechHeroBackground />}
      imageComponent={<FintechHeroImage />}
      featureItems={[
        { icon: <ShieldCheck className="h-4 w-4 mr-2 text-blue-300" />, text: "Secure Transactions" },
        { icon: <CreditCard className="h-4 w-4 mr-2 text-blue-300" />, text: "Multiple Payment Options" }
      ]}
    />
  );
};

export default FintechHero;
