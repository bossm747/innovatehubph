
import React from 'react';
import { Helmet } from 'react-helmet';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import AIToolsHeader from '@/components/ai-tools/AIToolsHeader';
import TextToSpeechTool from '@/components/ai-tools/TextToSpeechTool';
import VoiceToTextTool from '@/components/ai-tools/VoiceToTextTool';
import TranslationTool from '@/components/ai-tools/TranslationTool';
import MarketingCopyTool from '@/components/ai-tools/MarketingCopyTool';
import CodeAssistantTool from '@/components/ai-tools/CodeAssistantTool';
import VideoGenerationTool from '@/components/ai-tools/VideoGenerationTool';
import WebResearchTool from '@/components/ai-tools/WebResearchTool';

const AIToolsPage = () => {
  return (
    <div className="min-h-screen w-full overflow-x-hidden relative">
      <Helmet>
        <title>AI Tools - InnovateHub</title>
        <meta name="description" content="Access a suite of AI-powered tools designed to enhance your productivity and creativity." />
      </Helmet>
      
      <Navbar />
      
      <div className="w-full py-0">
        <AIToolsHeader />
        
        <main className="container mx-auto px-4 py-12">
          <Tabs defaultValue="text-to-speech" className="w-full">
            <TabsList className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 mb-8">
              <TabsTrigger value="text-to-speech">Text to Speech</TabsTrigger>
              <TabsTrigger value="voice-to-text">Voice to Text</TabsTrigger>
              <TabsTrigger value="translation">Translation</TabsTrigger>
              <TabsTrigger value="marketing-copy">Marketing Copy</TabsTrigger>
              <TabsTrigger value="code-assistant">Code Assistant</TabsTrigger>
              <TabsTrigger value="video-generation">Video Generation</TabsTrigger>
              <TabsTrigger value="web-research">Web Research</TabsTrigger>
            </TabsList>
            
            <TabsContent value="text-to-speech">
              <TextToSpeechTool />
            </TabsContent>
            
            <TabsContent value="voice-to-text">
              <VoiceToTextTool />
            </TabsContent>
            
            <TabsContent value="translation">
              <TranslationTool />
            </TabsContent>
            
            <TabsContent value="marketing-copy">
              <MarketingCopyTool />
            </TabsContent>
            
            <TabsContent value="code-assistant">
              <CodeAssistantTool />
            </TabsContent>
            
            <TabsContent value="video-generation">
              <VideoGenerationTool />
            </TabsContent>
            
            <TabsContent value="web-research">
              <WebResearchTool />
            </TabsContent>
          </Tabs>
        </main>
        
        <Footer />
      </div>
    </div>
  );
};

export default AIToolsPage;
