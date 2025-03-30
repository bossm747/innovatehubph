
import React from 'react';
import HeroSection from './shared/HeroSection';
import AIHeroBackground from './ai/AIHeroBackground';
import AIHeroImage from './ai/AIHeroImage';
import { Brain, Zap } from 'lucide-react';

const AIHero = () => {
  return (
    <HeroSection
      title="AI Solutions"
      subtitle="Intelligent Technology"
      description="Leverage artificial intelligence to automate processes, gain insights, and create new possibilities for your business"
      primaryButtonText="Explore AI Services"
      primaryButtonLink="#ai-services"
      secondaryButtonText="Schedule a Demo"
      secondaryButtonLink="/contact"
      backgroundComponent={<AIHeroBackground />}
      imageComponent={<AIHeroImage />}
      featureItems={[
        { icon: <Brain className="h-4 w-4 mr-2 text-blue-300" />, text: "Smart Automation" },
        { icon: <Zap className="h-4 w-4 mr-2 text-blue-300" />, text: "Rapid Deployment" }
      ]}
    />
  );
};

export default AIHero;
