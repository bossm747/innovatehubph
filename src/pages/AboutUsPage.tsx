
import React from 'react';
import { Helmet } from 'react-helmet';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import AboutHero from '@/components/AboutHero';
import CompanyOverview from '@/components/CompanyOverview';
import TeamSectionWithData from '@/components/TeamSectionWithData';
import TeamValues from '@/components/TeamValues';
import CTASection from '@/components/home/CTASection';

const AboutUsPage = () => {
  return (
    <>
      <Helmet>
        <title>About InnovateHub Inc. | Our Story & Mission</title>
        <meta 
          name="description" 
          content="Learn about InnovateHub Inc., our journey from Batangas to Dubai, our passionate team, and our mission to empower businesses through digital innovation."
        />
      </Helmet>
      
      <Navbar />
      
      <main>
        <AboutHero />
        
        <CompanyOverview />
        
        <TeamValues />
        
        <TeamSectionWithData />
        
        <CTASection />
      </main>
      
      <Footer />
    </>
  );
};

export default AboutUsPage;
