
import React from 'react';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  Cpu,
  Globe,
  Code,
  FileText,
  Video,
  Mic,
  Volume2,
  Search,
  ArrowLeft,
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';

type AIToolsHeaderProps = {
  activeTab: string;
  setActiveTab: (tab: string) => void;
};

const AIToolsHeader = ({ activeTab, setActiveTab }: AIToolsHeaderProps) => {
  const navigate = useNavigate();

  const tools = [
    { id: 'marketing', icon: <FileText className="h-4 w-4" />, label: 'Marketing Copy' },
    { id: 'code', icon: <Code className="h-4 w-4" />, label: 'Code Assistant' },
    { id: 'speech', icon: <Volume2 className="h-4 w-4" />, label: 'Text-to-Speech' },
    { id: 'transcription', icon: <Mic className="h-4 w-4" />, label: 'Voice-to-Text' },
    { id: 'video', icon: <Video className="h-4 w-4" />, label: 'Video Generation' },
    { id: 'translate', icon: <Globe className="h-4 w-4" />, label: 'Translation' },
    { id: 'research', icon: <Search className="h-4 w-4" />, label: 'Web Research' },
  ];

  return (
    <div className="bg-slate-50 border-b">
      <div className="container py-4">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <Button 
              variant="ghost" 
              size="sm" 
              className="rounded-full" 
              onClick={() => navigate('/admin/dashboard')}
            >
              <ArrowLeft className="h-4 w-4 mr-1" />
              Back to Dashboard
            </Button>
            <h1 className="text-xl font-bold flex items-center">
              <Cpu className="mr-2 h-5 w-5 text-purple-500" />
              AI Development Tools
            </h1>
          </div>
        </div>
        
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid grid-cols-7 h-auto p-1">
            {tools.map(tool => (
              <TabsTrigger
                key={tool.id}
                value={tool.id}
                className="py-2 data-[state=active]:bg-white flex flex-col gap-1 items-center px-1 h-auto"
              >
                {tool.icon}
                <span className="text-xs font-medium">{tool.label}</span>
              </TabsTrigger>
            ))}
          </TabsList>
        </Tabs>
      </div>
    </div>
  );
};

export default AIToolsHeader;
