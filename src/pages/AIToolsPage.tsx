
// Fix for error: Type '{}' is missing the following properties from type 'AIToolsHeaderProps': activeTab, setActiveTab
import React, { useState } from 'react';
import { Helmet } from 'react-helmet';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import AIToolsHeader from '@/components/AIToolsHeader';
import NLPToolsSection from '@/components/ai-tools/NLPToolsSection';
import ImageToolsSection from '@/components/ai-tools/ImageToolsSection';
import DataAnalysisToolsSection from '@/components/ai-tools/DataAnalysisToolsSection';

// Define the tab types
type AIToolTab = 'nlp' | 'image' | 'data';

const AIToolsPage = () => {
  // Add state for active tab
  const [activeTab, setActiveTab] = useState<AIToolTab>('nlp');

  return (
    <div className="min-h-screen w-full overflow-x-hidden relative">
      <Helmet>
        <title>AI Tools | InnovateHub</title>
        <meta name="description" content="Explore InnovateHub's suite of AI tools for business automation, customer service, and data analysis." />
      </Helmet>
      
      <Navbar />
      
      <main className="w-full py-0">
        <AIToolsHeader activeTab={activeTab} setActiveTab={setActiveTab} />
        
        <div className="container mx-auto px-4 py-12">
          <Tabs value={activeTab} onValueChange={(value) => setActiveTab(value as AIToolTab)}>
            <TabsContent value="nlp" className="mt-6">
              <NLPToolsSection />
            </TabsContent>
            
            <TabsContent value="image" className="mt-6">
              <ImageToolsSection />
            </TabsContent>
            
            <TabsContent value="data" className="mt-6">
              <DataAnalysisToolsSection />
            </TabsContent>
          </Tabs>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default AIToolsPage;
