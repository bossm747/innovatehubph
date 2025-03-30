
import React from 'react';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';

export type AIToolTab = 'nlp' | 'image' | 'data';

interface AIToolsHeaderProps {
  activeTab: AIToolTab;
  setActiveTab: (tab: AIToolTab) => void;
}

const AIToolsHeader = ({ activeTab, setActiveTab }: AIToolsHeaderProps) => {
  return (
    <div className="bg-gradient-to-r from-blue-600 to-indigo-700 py-16 text-white">
      <div className="container mx-auto px-4 text-center">
        <h1 className="text-4xl font-bold mb-4">AI Tools & Solutions</h1>
        <p className="text-xl max-w-3xl mx-auto opacity-90 mb-8">
          Leverage our powerful AI tools to transform your business operations, enhance customer experiences, and drive innovation.
        </p>
        
        <Tabs value={activeTab} onValueChange={(value) => setActiveTab(value as AIToolTab)} className="max-w-md mx-auto">
          <TabsList className="grid grid-cols-3 w-full bg-white/10">
            <TabsTrigger 
              value="nlp" 
              className="text-white data-[state=active]:bg-white/20"
            >
              Language AI
            </TabsTrigger>
            <TabsTrigger 
              value="image" 
              className="text-white data-[state=active]:bg-white/20"
            >
              Image AI
            </TabsTrigger>
            <TabsTrigger 
              value="data" 
              className="text-white data-[state=active]:bg-white/20"
            >
              Data Analysis
            </TabsTrigger>
          </TabsList>
        </Tabs>
      </div>
    </div>
  );
};

export default AIToolsHeader;
