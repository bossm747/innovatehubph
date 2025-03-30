
import React, { useState } from 'react';
import { Helmet } from 'react-helmet';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import AIToolsHeader, { AIToolTab } from '@/components/ai-tools/AIToolsHeader';
import NLPToolsSection from '@/components/ai-tools/NLPToolsSection';
import ImageToolsSection from '@/components/ai-tools/ImageToolsSection';
import DataAnalysisToolsSection from '@/components/ai-tools/DataAnalysisToolsSection';

const AIToolsPage = () => {
  const [activeTab, setActiveTab] = useState<AIToolTab>('nlp');

  return (
    <div className="min-h-screen w-full overflow-x-hidden">
      <Helmet>
        <title>AI Tools | InnovateHub</title>
        <meta 
          name="description" 
          content="Explore InnovateHub's suite of AI tools for natural language processing, image generation, and data analysis."
        />
      </Helmet>
      
      <Navbar />
      
      <main className="w-full py-0">
        <AIToolsHeader activeTab={activeTab} setActiveTab={setActiveTab} />
        
        <div className="container mx-auto px-4 py-12">
          {activeTab === 'nlp' && (
            <div>
              <h2 className="text-2xl font-bold mb-6">Natural Language Processing Tools</h2>
              <p className="text-lg text-muted-foreground mb-8">
                Our NLP tools help businesses understand and interact with text and speech data more effectively.
              </p>
              <NLPToolsSection />
            </div>
          )}
          
          {activeTab === 'image' && (
            <div>
              <h2 className="text-2xl font-bold mb-6">Image Processing Tools</h2>
              <p className="text-lg text-muted-foreground mb-8">
                Transform your visual content with our AI-powered image generation and enhancement tools.
              </p>
              <ImageToolsSection />
            </div>
          )}
          
          {activeTab === 'data' && (
            <div>
              <h2 className="text-2xl font-bold mb-6">Data Analysis Tools</h2>
              <p className="text-lg text-muted-foreground mb-8">
                Turn raw data into valuable insights with our advanced analytics and visualization tools.
              </p>
              <DataAnalysisToolsSection />
            </div>
          )}
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default AIToolsPage;
