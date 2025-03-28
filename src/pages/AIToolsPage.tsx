
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
import ImageProcessingTool from '@/components/ImageProcessingTool';

const AIToolsPage = () => {
  const [activeTab, setActiveTab] = useState('marketing');

  return (
    <>
      <Helmet>
        <title>AI Development Tools - InnovateHub</title>
        <meta name="description" content="AI-powered tools to boost productivity and creativity at InnovateHub" />
      </Helmet>
      
      <Navbar />
      <main className="min-h-screen bg-slate-50">
        <AIToolsHeader activeTab={activeTab} setActiveTab={setActiveTab} />
        
        <div className="container mx-auto px-4 py-10">
          {activeTab === 'marketing' && <MarketingCopyTool />}
          {activeTab === 'code' && <CodeAssistantTool />}
          {activeTab === 'speech' && <TextToSpeechTool />}
          {activeTab === 'transcription' && <VoiceToTextTool />}
          {activeTab === 'video' && <VideoGenerationTool />}
          {activeTab === 'translate' && <TranslationTool />}
          {activeTab === 'research' && <WebResearchTool />}
          {activeTab === 'image' && <ImageProcessingTool />}

          {/* Information section below tools */}
          <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            <div className="bg-white p-6 rounded-xl shadow-soft">
              <div className="w-12 h-12 bg-innovate-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-innovate-700 text-xl font-bold">1</span>
              </div>
              <h3 className="text-lg font-bold text-gray-800 mb-2">High Performance</h3>
              <p className="text-gray-600">Our AI tools are built for speed and accuracy, delivering results in seconds.</p>
            </div>
            
            <div className="bg-white p-6 rounded-xl shadow-soft">
              <div className="w-12 h-12 bg-innovate-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-innovate-700 text-xl font-bold">2</span>
              </div>
              <h3 className="text-lg font-bold text-gray-800 mb-2">Versatile Applications</h3>
              <p className="text-gray-600">From content creation to data analysis, our tools cover a wide range of business needs.</p>
            </div>
            
            <div className="bg-white p-6 rounded-xl shadow-soft">
              <div className="w-12 h-12 bg-innovate-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-innovate-700 text-xl font-bold">3</span>
              </div>
              <h3 className="text-lg font-bold text-gray-800 mb-2">Seamless Integration</h3>
              <p className="text-gray-600">Easily integrate these AI tools with your existing workflows and systems.</p>
            </div>
          </div>
          
          {/* FAQ Section */}
          <div className="mt-20 bg-white rounded-xl shadow-soft p-8">
            <h2 className="text-2xl font-bold text-center mb-8 text-innovate-800">Frequently Asked Questions</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h3 className="text-lg font-semibold mb-2 text-gray-800">Are these tools available in the free plan?</h3>
                <p className="text-gray-600">Yes, all tools have basic functionality in the free plan with extended features in premium plans.</p>
              </div>
              <div>
                <h3 className="text-lg font-semibold mb-2 text-gray-800">How accurate are the AI results?</h3>
                <p className="text-gray-600">Our AI models are trained on vast datasets and constantly improved, providing high accuracy for most use cases.</p>
              </div>
              <div>
                <h3 className="text-lg font-semibold mb-2 text-gray-800">Can I export the results?</h3>
                <p className="text-gray-600">Yes, most tools include download and export options for using the results in other applications.</p>
              </div>
              <div>
                <h3 className="text-lg font-semibold mb-2 text-gray-800">Is my data secure?</h3>
                <p className="text-gray-600">We take data security seriously. Your data is encrypted and never shared with third parties.</p>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
};

export default AIToolsPage;
