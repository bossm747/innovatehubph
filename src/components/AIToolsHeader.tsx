
import React from 'react';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';

// Define the tab types
export type AIToolTab = 'nlp' | 'image' | 'data';

export interface AIToolsHeaderProps {
  activeTab: AIToolTab;
  setActiveTab: (tab: AIToolTab) => void;
}

const AIToolsHeader = ({ activeTab, setActiveTab }: AIToolsHeaderProps) => {
  return (
    <div className="bg-innovate-800 text-white py-12">
      <div className="container mx-auto px-4">
        <h1 className="text-3xl md:text-4xl font-bold mb-4">AI Tools Suite</h1>
        <p className="text-lg mb-8 max-w-2xl">
          InnovateHub's suite of AI-powered tools to enhance your business operations.
        </p>
        
        <Tabs value={activeTab} onValueChange={(value) => setActiveTab(value as AIToolTab)} className="w-full">
          <TabsList className="bg-white/10 w-full md:w-auto justify-start overflow-x-auto">
            <TabsTrigger value="nlp" className="text-white data-[state=active]:bg-white data-[state=active]:text-innovate-800">
              NLP Tools
            </TabsTrigger>
            <TabsTrigger value="image" className="text-white data-[state=active]:bg-white data-[state=active]:text-innovate-800">
              Image Tools
            </TabsTrigger>
            <TabsTrigger value="data" className="text-white data-[state=active]:bg-white data-[state=active]:text-innovate-800">
              Data Analysis
            </TabsTrigger>
          </TabsList>
        </Tabs>
      </div>
    </div>
  );
};

export default AIToolsHeader;
