
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
        <AboutHero 
          title="Who We Are" 
          subtitle="Passionate Innovators in the Philippine Tech Landscape"
          description="We're more than a tech company - we're enablers of digital transformation, helping businesses adapt to an evolving digital economy."
        />
        
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
