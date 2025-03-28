
import React from 'react';
import { Helmet } from 'react-helmet';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import ServicesHero from '@/components/ServicesHero';
import AiSolutionsForm from '@/components/forms/AiSolutionsForm';
import { useNavigate } from 'react-router-dom';

const AiSolutionsPage = () => {
  const navigate = useNavigate();
  
  return (
    <>
      <Helmet>
        <title>AI Solutions - InnovateHub</title>
        <meta name="description" content="Intelligent automation and solutions through artificial intelligence - InnovateHub" />
      </Helmet>
      
      <Navbar />
      
      <main className="min-h-screen">
        <ServicesHero 
          title="AI Solutions" 
          subtitle="Intelligent automation and solutions through artificial intelligence"
          imagePath="/lovable-uploads/239901fa-6133-4fd7-8a25-6130c3d2a60e.png"
        />
        
        <div className="container mx-auto px-4 py-16">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-16">
            <div>
              <h2 className="text-2xl md:text-3xl font-bold mb-4">Transform Your Business with AI</h2>
              <p className="text-gray-700 mb-6">
                InnovateHub's AI solutions help businesses leverage the power of artificial intelligence to automate processes, gain insights, and create new possibilities.
              </p>
              <p className="text-gray-700 mb-6">
                Our custom AI solutions are designed to address specific business challenges while being accessible and practical for organizations of all sizes.
              </p>
              <div className="bg-blue-50 p-4 rounded-lg">
                <h3 className="font-semibold text-blue-800 mb-2">Our AI Services Include</h3>
                <ul className="list-disc pl-5 text-gray-700 space-y-1">
                  <li>Chatbot development</li>
                  <li>Predictive analytics</li>
                  <li>Process automation</li>
                  <li>Content generation</li>
                  <li>Computer vision solutions</li>
                  <li>Natural language processing</li>
                </ul>
              </div>
            </div>
            
            <div>
              <h3 className="text-xl font-bold mb-4">Explore AI Solutions</h3>
              <AiSolutionsForm navigate={navigate} />
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-bold mb-3">Intelligent Chatbots</h3>
              <p className="text-gray-700">
                Customer service and support bots that learn from interactions to provide better responses over time.
              </p>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-bold mb-3">Business Intelligence</h3>
              <p className="text-gray-700">
                AI-powered analytics that transform your data into actionable insights and predictions.
              </p>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-bold mb-3">Workflow Automation</h3>
              <p className="text-gray-700">
                Intelligent systems that streamline operations by automating repetitive tasks.
              </p>
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </>
  );
};

export default AiSolutionsPage;
