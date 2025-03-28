
import React from 'react';
import { Helmet } from 'react-helmet';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import ServicesHero from '@/components/ServicesHero';
import EcommerceForm from '@/components/forms/EcommerceForm';
import { useNavigate } from 'react-router-dom';

const EcommercePage = () => {
  const navigate = useNavigate();
  
  return (
    <>
      <Helmet>
        <title>E-commerce Solutions - InnovateHub</title>
        <meta name="description" content="Building and scaling online retail experiences - InnovateHub" />
      </Helmet>
      
      <Navbar />
      
      <main className="min-h-screen">
        <ServicesHero 
          title="E-commerce Solutions" 
          subtitle="Building and scaling online retail experiences"
          imagePath="/lovable-uploads/5c085ba8-48d9-4a1a-9bb0-97e24b646f38.png"
        />
        
        <div className="container mx-auto px-4 py-16">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-16">
            <div>
              <h2 className="text-2xl md:text-3xl font-bold mb-4">Transform Your Business with Our E-commerce Solutions</h2>
              <p className="text-gray-700 mb-6">
                InnovateHub helps businesses establish and grow their online presence with robust e-commerce solutions that drive sales and enhance customer experience.
              </p>
              <p className="text-gray-700 mb-6">
                Our e-commerce platforms are built with scalability, security, and user experience in mind, ensuring your online store can grow with your business.
              </p>
              <div className="bg-blue-50 p-4 rounded-lg">
                <h3 className="font-semibold text-blue-800 mb-2">Key Features of Our E-commerce Solutions</h3>
                <ul className="list-disc pl-5 text-gray-700 space-y-1">
                  <li>Mobile-responsive designs</li>
                  <li>Secure payment processing</li>
                  <li>Inventory management systems</li>
                  <li>Customer account portals</li>
                  <li>Marketing and SEO optimization</li>
                  <li>Analytics and reporting tools</li>
                </ul>
              </div>
            </div>
            
            <div>
              <h3 className="text-xl font-bold mb-4">Get Started with E-commerce</h3>
              <EcommerceForm navigate={navigate} />
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-bold mb-3">Online Store Development</h3>
              <p className="text-gray-700">
                Custom-built online stores designed to reflect your brand and optimize the customer shopping experience.
              </p>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-bold mb-3">Order Management</h3>
              <p className="text-gray-700">
                Streamlined order processing systems that handle everything from checkout to fulfillment.
              </p>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-bold mb-3">Payment Integration</h3>
              <p className="text-gray-700">
                Secure integration with multiple payment gateways, including PlataPay and major credit cards.
              </p>
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </>
  );
};

export default EcommercePage;
