
import React, { useState } from 'react';
import { Helmet } from 'react-helmet';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import AIToolsHeader from '@/components/ai-tools/AIToolsHeader';
import MarketingCopyTool from '@/components/ai-tools/MarketingCopyTool';
import CodeAssistantTool from '@/components/ai-tools/CodeAssistantTool';
import TextToSpeechTool from '@/components/ai-tools/TextToSpeechTool';
import VoiceToTextTool from '@/components/ai-tools/VoiceToTextTool';
import VideoGenerationTool from '@/components/ai-tools/VideoGenerationTool';
import TranslationTool from '@/components/ai-tools/TranslationTool';
import WebResearchTool from '@/components/ai-tools/WebResearchTool';

const AIToolsPage = () => {
  const [activeTab, setActiveTab] = useState('marketing');

  return (
    <>
      <Helmet>
        <title>AI Development Tools - InnovateHub</title>
        <meta name="description" content="AI-powered tools to boost productivity and creativity at InnovateHub" />
      </Helmet>
      
      <Navbar />
      <main>
        <AIToolsHeader activeTab={activeTab} setActiveTab={setActiveTab} />
        
        {activeTab === 'marketing' && <MarketingCopyTool />}
        {activeTab === 'code' && <CodeAssistantTool />}
        {activeTab === 'speech' && <TextToSpeechTool />}
        {activeTab === 'transcription' && <VoiceToTextTool />}
        {activeTab === 'video' && <VideoGenerationTool />}
        {activeTab === 'translate' && <TranslationTool />}
        {activeTab === 'research' && <WebResearchTool />}
      </main>
      <Footer />
    </>
  );
};

export default AIToolsPage;
