
import React from 'react';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  FileText, Code, Volume2, Mic, Video, Globe, Search, 
  Paintbrush, ImagePlus, Wand2, Eraser, GanttChart
} from 'lucide-react';

interface AIToolsHeaderProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

const AIToolsHeader: React.FC<AIToolsHeaderProps> = ({ activeTab, setActiveTab }) => {
  const tools = [
    { id: 'marketing', label: 'Marketing', icon: FileText },
    { id: 'code', label: 'Code', icon: Code },
    { id: 'speech', label: 'Text to Speech', icon: Volume2 },
    { id: 'transcription', label: 'Voice to Text', icon: Mic },
    { id: 'video', label: 'Video', icon: Video },
    { id: 'translate', label: 'Translate', icon: Globe },
    { id: 'research', label: 'Research', icon: Search },
    { id: 'image', label: 'Image', icon: Paintbrush },
  ];

  return (
    <div className="py-8 bg-gradient-to-r from-innovate-100 to-innovate-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-8">
          <h1 className="text-3xl md:text-4xl font-display font-bold text-innovate-800 mb-2">
            AI-Powered Tools
          </h1>
          <p className="text-lg text-innovate-600 max-w-2xl mx-auto">
            Enhance your productivity with our suite of AI-powered tools designed for your business needs
          </p>
        </div>
        
        <Tabs defaultValue={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-8 bg-white/50 backdrop-blur-sm rounded-xl p-1 mb-2">
            {tools.map((tool) => {
              const Icon = tool.icon;
              return (
                <TabsTrigger 
                  key={tool.id} 
                  value={tool.id}
                  className="flex items-center justify-center gap-1.5 px-3 py-2 data-[state=active]:bg-innovate-600 data-[state=active]:text-white"
                >
                  <Icon className="h-4 w-4" />
                  <span className="hidden sm:inline">{tool.label}</span>
                </TabsTrigger>
              );
            })}
          </TabsList>
        </Tabs>
        
        {activeTab === 'image' && (
          <div className="flex justify-center gap-4 mt-6">
            <button 
              className={`flex items-center px-4 py-2 rounded-full text-sm font-medium ${activeTab === 'image' ? 'bg-innovate-600 text-white' : 'bg-white/60 text-innovate-700'}`}
              onClick={() => window.location.href = '/ai-tools-image'}
            >
              <ImagePlus className="mr-2 h-4 w-4" />
              Generate Images
            </button>
            <button 
              className={`flex items-center px-4 py-2 rounded-full text-sm font-medium ${activeTab === 'image' ? 'bg-innovate-600 text-white' : 'bg-white/60 text-innovate-700'}`}
              onClick={() => window.location.href = '/ai-tools-enhance'}
            >
              <Wand2 className="mr-2 h-4 w-4" />
              Enhance Images
            </button>
            <button 
              className={`flex items-center px-4 py-2 rounded-full text-sm font-medium ${activeTab === 'image' ? 'bg-innovate-600 text-white' : 'bg-white/60 text-innovate-700'}`}
              onClick={() => window.location.href = '/ai-tools-remove-bg'}
            >
              <Eraser className="mr-2 h-4 w-4" />
              Remove Background
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default AIToolsHeader;
