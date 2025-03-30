
import React from 'react';
import { Helmet } from 'react-helmet';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import ServicesHero from '@/components/ServicesHero';
import DigitalCustomizationsForm from '@/components/forms/DigitalCustomizationsForm';
import { useNavigate } from 'react-router-dom';
import DigitalCustomizationsHeroImage from '@/components/digital/DigitalCustomizationsHeroImage';
import DigitalCustomizationsHeroBackground from '@/components/digital/DigitalCustomizationsHeroBackground';

const DigitalCustomizationsPage = () => {
  const navigate = useNavigate();
  
  return (
    <>
      <Helmet>
        <title>Digital Customizations - InnovateHub</title>
        <meta name="description" content="Bespoke digital solutions tailored to your business needs - InnovateHub" />
      </Helmet>
      
      <Navbar />
      
      <main className="min-h-screen">
        <ServicesHero 
          title="Digital Customizations" 
          subtitle="Crafting bespoke digital solutions for unique business needs"
          imageComponent={<DigitalCustomizationsHeroImage />}
          backgroundComponent={<DigitalCustomizationsHeroBackground />}
        />
        
        <div className="container mx-auto px-4 py-16">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-16">
            <div>
              <h2 className="text-2xl md:text-3xl font-bold mb-4">Tailored Solutions for Modern Businesses</h2>
              <p className="text-gray-700 mb-6">
                At InnovateHub, we understand that every business has unique digital needs. Our team of expert developers creates
                custom software solutions that perfectly align with your business objectives and workflows.
              </p>
              <p className="text-gray-700 mb-6">
                From enterprise applications to specialized tools, we deliver scalable and secure solutions
                built with cutting-edge technologies.
              </p>
              <div className="bg-blue-50 p-4 rounded-lg">
                <h3 className="font-semibold text-blue-800 mb-2">Our Digital Customization Approach</h3>
                <ul className="list-disc pl-5 text-gray-700 space-y-1">
                  <li>Thorough requirements analysis</li>
                  <li>Collaborative design process</li>
                  <li>Agile development methodology</li>
                  <li>Comprehensive testing and quality assurance</li>
                  <li>Ongoing support and maintenance</li>
                </ul>
              </div>
            </div>
            
            <div>
              <h3 className="text-xl font-bold mb-4">Request a Digital Customization</h3>
              <DigitalCustomizationsForm navigate={navigate} />
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-bold mb-3">Custom Software Development</h3>
              <p className="text-gray-700">
                Bespoke applications designed to address specific business challenges and optimize operations.
              </p>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-bold mb-3">API Development</h3>
              <p className="text-gray-700">
                Secure and scalable APIs to connect your systems and enable seamless data exchange.
              </p>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-bold mb-3">Legacy System Modernization</h3>
              <p className="text-gray-700">
                Transform outdated systems into modern, efficient digital solutions while preserving valuable business logic.
              </p>
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </>
  );
};

export default DigitalCustomizationsPage;
