
import React from 'react';
import { Helmet } from 'react-helmet';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import ServicesHero from '@/components/ServicesHero';
import GlobalExpansionForm from '@/components/forms/GlobalExpansionForm';
import { useNavigate } from 'react-router-dom';

const GlobalExpansionPage = () => {
  const navigate = useNavigate();
  
  return (
    <>
      <Helmet>
        <title>Global Expansion Services - InnovateHub</title>
        <meta name="description" content="Strategies for businesses venturing into international markets - InnovateHub" />
      </Helmet>
      
      <Navbar />
      
      <main className="min-h-screen">
        <ServicesHero 
          title="Global Expansion" 
          subtitle="Strategies for businesses venturing into new markets"
          imagePath="/lovable-uploads/91e21d7a-53f9-41d7-bd62-4a1f5dbe1d12.png"
        />
        
        <div className="container mx-auto px-4 py-16">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-16">
            <div>
              <h2 className="text-2xl md:text-3xl font-bold mb-4">Extend Your Reach to Global Markets</h2>
              <p className="text-gray-700 mb-6">
                InnovateHub helps businesses expand their operations internationally with comprehensive global expansion services tailored to your industry and target markets.
              </p>
              <p className="text-gray-700 mb-6">
                Our team brings expertise in international business regulations, market entry strategies, and cross-cultural business practices to ensure a smooth expansion process.
              </p>
              <div className="bg-blue-50 p-4 rounded-lg">
                <h3 className="font-semibold text-blue-800 mb-2">Our Global Expansion Services Include</h3>
                <ul className="list-disc pl-5 text-gray-700 space-y-1">
                  <li>Market research and entry strategy</li>
                  <li>Legal and regulatory compliance assistance</li>
                  <li>Dubai trade license acquisition</li>
                  <li>International business networking</li>
                  <li>Cross-cultural business training</li>
                  <li>Global digital marketing strategies</li>
                </ul>
              </div>
            </div>
            
            <div>
              <h3 className="text-xl font-bold mb-4">Explore Global Opportunities</h3>
              <GlobalExpansionForm navigate={navigate} />
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-bold mb-3">Dubai Market Entry</h3>
              <p className="text-gray-700">
                Specialized services for businesses looking to establish a presence in the dynamic Dubai market.
              </p>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-bold mb-3">International Fintech Solutions</h3>
              <p className="text-gray-700">
                Financial technology solutions adapted for cross-border transactions and international markets.
              </p>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-bold mb-3">Global Business Consulting</h3>
              <p className="text-gray-700">
                Strategic guidance to navigate the complexities of international business expansion.
              </p>
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </>
  );
};

export default GlobalExpansionPage;
