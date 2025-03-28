
import React from 'react';
import { Helmet } from 'react-helmet';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import TeamPageHeader from '@/components/TeamPageHeader';
import TeamSectionWithData from '@/components/TeamSectionWithData';
import TeamValues from '@/components/TeamValues';
import ContactSection from '@/components/ContactSection';

const TeamPage = () => {
  return (
    <>
      <Helmet>
        <title>Our Team | InnovateHub</title>
        <meta name="description" content="Meet the dedicated team behind InnovateHub, working to bring innovative solutions to the Philippine tech landscape." />
      </Helmet>
      
      <Navbar />
      
      <main>
        <TeamPageHeader 
          title="Our Team" 
          description="Meet the dedicated professionals behind InnovateHub's success"
        />
        <TeamSectionWithData />
        <TeamValues />
        <ContactSection />
      </main>
      
      <Footer />
    </>
  );
};

export default TeamPage;
