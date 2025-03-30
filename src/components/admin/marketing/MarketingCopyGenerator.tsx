
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from '@/components/ui/select';
import { AIProvider, getProviderConfig } from '@/utils/aiProviders';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';
import { Loader2, Wand2, Copy, CheckCheck, Brain, Sparkles, RefreshCw } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

interface MarketingCopyGeneratorProps {
  onCopyGenerated: (content: string) => void;
  type?: 'newsletter' | 'promotion' | 'announcement' | 'update';
}

const MarketingCopyGenerator: React.FC<MarketingCopyGeneratorProps> = ({
  onCopyGenerated,
  type = 'newsletter'
}) => {
  const { toast } = useToast();
  const [prompt, setPrompt] = useState(() => {
    const basePrompt = getProviderConfig('gemini').defaultPrompt;
    return `${basePrompt} The email should be a ${type}.`;
  });
  const [selectedProvider, setSelectedProvider] = useState<AIProvider>('multi-agent');
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedContent, setGeneratedContent] = useState('');
  const [copied, setCopied] = useState(false);
  const [analysisData, setAnalysisData] = useState<any>(null);
  const [activeTab, setActiveTab] = useState('content');
  const [useAgents, setUseAgents] = useState<string[]>(['enhancement', 'analysis']);

  const handleProviderChange = (value: AIProvider) => {
    setSelectedProvider(value);
    const basePrompt = getProviderConfig(value).defaultPrompt;
    setPrompt(`${basePrompt} The email should be a ${type}.`);
  };

  const handleRegenerate = async () => {
    setActiveTab('content');
    await generateContent();
  };

  const generateContent = async () => {
    try {
      setIsGenerating(true);
      setAnalysisData(null);
      
      // If using multi-agent system, call our specialized function
      if (selectedProvider === 'multi-agent') {
        const agents = useAgents.map(agentType => {
          if (agentType === 'enhancement') {
            return {
              name: "Content Enhancer",
              type: "enhancement",
              capability: "Improves email structure and clarity"
            };
          } else if (agentType === 'analysis') {
            return {
              name: "Content Analyzer",
              type: "analysis",
              capability: "Provides feedback on content quality"
            };
          }
          return null;
        }).filter(Boolean);
        
        const { data, error } = await supabase.functions.invoke('multi-agent-generate', {
          body: { 
            prompt, 
            agents,
            temperature: 0.7,
            maxTokens: 1500,
            domain: "innovatehub.ph"
          }
        });
        
        if (error) throw error;
        
        setGeneratedContent(data.text);
        if (data.analysis) {
          setAnalysisData(data.analysis);
        }
      } else {
        // Fall back to the standard generate-text function for single providers
        const { data, error } = await supabase.functions.invoke('generate-text', {
          body: { 
            prompt, 
            provider: selectedProvider,
            temperature: 0.7,
            maxTokens: 1000
          }
        });
        
        if (error) throw error;
        setGeneratedContent(data.text);
      }
      
      toast({
        title: "Content generated",
        description: "Your marketing copy has been generated successfully"
      });
    } catch (error) {
      console.error('Error generating content:', error);
      toast({
        title: "Generation failed",
        description: "There was an error generating your content. Please try again.",
        variant: "destructive"
      });
    } finally {
      setIsGenerating(false);
    }
  };

  const copyToClipboard = () => {
    if (!generatedContent) return;
    
    navigator.clipboard.writeText(generatedContent);
    setCopied(true);
    onCopyGenerated(generatedContent);
    
    toast({
      title: "Copied to clipboard",
      description: "The generated content has been copied to clipboard"
    });
    
    setTimeout(() => setCopied(false), 2000);
  };

  const getAnalysisColor = (score: number) => {
    if (score >= 8) return "text-green-600";
    if (score >= 6) return "text-yellow-600";
    return "text-red-600";
  };

  return (
    <Card className="shadow-sm">
      <CardHeader>
        <CardTitle className="flex items-center">
          <Wand2 className="mr-2 h-5 w-5 text-innovate-600" />
          AI Marketing Copy Generator
          {selectedProvider === 'multi-agent' && (
            <Badge variant="outline" className="ml-2 bg-gradient-to-r from-blue-50 to-purple-50 text-purple-700 border-purple-200">
              <Sparkles className="w-3 h-3 mr-1" />
              Multi-Agent
            </Badge>
          )}
        </CardTitle>
        <CardDescription>
          Create professional marketing copy for your email campaigns using intelligent AI
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <label className="text-sm font-medium">AI Provider</label>
          <Select value={selectedProvider} onValueChange={value => handleProviderChange(value as AIProvider)}>
            <SelectTrigger>
              <SelectValue placeholder="Select AI Provider" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="multi-agent" className="font-medium">
                <div className="flex items-center">
                  <Brain className="w-4 h-4 mr-2 text-purple-500" />
                  AI Agent Collaboration (Recommended)
                </div>
              </SelectItem>
              <SelectItem value="gemini">Google Gemini Pro 2.5</SelectItem>
              <SelectItem value="openai">OpenAI GPT-4o Mini</SelectItem>
              <SelectItem value="anthropic">Anthropic Claude 3</SelectItem>
              <SelectItem value="mistral">Mistral Large</SelectItem>
            </SelectContent>
          </Select>
        </div>
        
        {selectedProvider === 'multi-agent' && (
          <div className="space-y-2 bg-blue-50 p-3 rounded-md">
            <label className="text-sm font-medium text-blue-800">Agent Configuration</label>
            <div className="flex flex-wrap gap-2">
              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="enhance-agent"
                  checked={useAgents.includes('enhancement')}
                  onChange={(e) => {
                    if (e.target.checked) {
                      setUseAgents([...useAgents, 'enhancement']);
                    } else {
                      setUseAgents(useAgents.filter(a => a !== 'enhancement'));
                    }
                  }}
                  className="mr-2 rounded border-blue-300 text-blue-600"
                />
                <label htmlFor="enhance-agent" className="text-sm text-blue-800">Content Enhancement Agent</label>
              </div>
              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="analysis-agent"
                  checked={useAgents.includes('analysis')}
                  onChange={(e) => {
                    if (e.target.checked) {
                      setUseAgents([...useAgents, 'analysis']);
                    } else {
                      setUseAgents(useAgents.filter(a => a !== 'analysis'));
                    }
                  }}
                  className="mr-2 rounded border-blue-300 text-blue-600"
                />
                <label htmlFor="analysis-agent" className="text-sm text-blue-800">Content Analysis Agent</label>
              </div>
            </div>
          </div>
        )}
        
        <div className="space-y-2">
          <label className="text-sm font-medium">Prompt</label>
          <Textarea 
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            rows={4}
            placeholder="Describe what you want the AI to generate..."
            className="resize-none"
          />
        </div>
        
        <Button 
          onClick={generateContent} 
          disabled={isGenerating || !prompt.trim()}
          className="w-full"
        >
          {isGenerating ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Generating...
            </>
          ) : (
            <>
              <Sparkles className="mr-2 h-4 w-4" />
              Generate Marketing Copy
            </>
          )}
        </Button>
        
        {generatedContent && (
          <div className="space-y-2 pt-4">
            <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
              <div className="flex justify-between items-center">
                <TabsList>
                  <TabsTrigger value="content" className="flex items-center">
                    <Wand2 className="w-4 h-4 mr-2" />
                    Generated Content
                  </TabsTrigger>
                  {analysisData && (
                    <TabsTrigger value="analysis" className="flex items-center">
                      <Brain className="w-4 h-4 mr-2" />
                      AI Analysis
                    </TabsTrigger>
                  )}
                </TabsList>
                
                <div className="flex gap-2">
                  <Button 
                    size="sm" 
                    variant="outline" 
                    onClick={handleRegenerate}
                    className="h-8"
                  >
                    <RefreshCw className="h-4 w-4 mr-1" />
                    Regenerate
                  </Button>
                  <Button 
                    size="sm" 
                    variant="outline" 
                    onClick={copyToClipboard}
                    className="h-8"
                  >
                    {copied ? (
                      <CheckCheck className="h-4 w-4 text-green-500" />
                    ) : (
                      <Copy className="h-4 w-4" />
                    )}
                    <span className="ml-1">{copied ? 'Copied' : 'Copy'}</span>
                  </Button>
                </div>
              </div>
              
              <TabsContent value="content" className="mt-4">
                <div className="bg-gray-50 p-4 rounded-md text-sm max-h-[300px] overflow-y-auto">
                  <div className="whitespace-pre-wrap">
                    {generatedContent}
                  </div>
                </div>
              </TabsContent>
              
              {analysisData && (
                <TabsContent value="analysis" className="mt-4">
                  <div className="bg-gray-50 p-4 rounded-md text-sm">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                      <div className="border rounded-md p-3 bg-white">
                        <h4 className="font-medium mb-1">Readability</h4>
                        <div className={`text-xl font-bold ${getAnalysisColor(analysisData.readability.score)}`}>
                          {analysisData.readability.score}/10
                        </div>
                        <p className="text-xs mt-1 text-gray-600">{analysisData.readability.feedback}</p>
                      </div>
                      <div className="border rounded-md p-3 bg-white">
                        <h4 className="font-medium mb-1">Engagement</h4>
                        <div className={`text-xl font-bold ${getAnalysisColor(analysisData.engagement.score)}`}>
                          {analysisData.engagement.score}/10
                        </div>
                        <p className="text-xs mt-1 text-gray-600">{analysisData.engagement.feedback}</p>
                      </div>
                      <div className="border rounded-md p-3 bg-white">
                        <h4 className="font-medium mb-1">Call to Action</h4>
                        <div className={`text-xl font-bold ${getAnalysisColor(analysisData.callToAction.score)}`}>
                          {analysisData.callToAction.score}/10
                        </div>
                        <p className="text-xs mt-1 text-gray-600">{analysisData.callToAction.feedback}</p>
                      </div>
                    </div>
                    <div className="border rounded-md p-3 bg-white">
                      <h4 className="font-medium mb-2">Improvement Suggestions</h4>
                      <ul className="list-disc pl-5 space-y-1 text-sm">
                        {analysisData.suggestions.map((suggestion: string, index: number) => (
                          <li key={index}>{suggestion}</li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </TabsContent>
              )}
            </Tabs>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default MarketingCopyGenerator;
