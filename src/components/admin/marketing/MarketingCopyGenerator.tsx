
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from '@/components/ui/select';
import { AIProvider, getProviderConfig } from '@/utils/aiProviders';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';
import { Loader2, Wand2, Copy, CheckCheck } from 'lucide-react';

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
  const [selectedProvider, setSelectedProvider] = useState<AIProvider>('gemini');
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedContent, setGeneratedContent] = useState('');
  const [copied, setCopied] = useState(false);

  const handleProviderChange = (value: AIProvider) => {
    setSelectedProvider(value);
    const basePrompt = getProviderConfig(value).defaultPrompt;
    setPrompt(`${basePrompt} The email should be a ${type}.`);
  };

  const generateContent = async () => {
    try {
      setIsGenerating(true);
      
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

  return (
    <Card className="shadow-sm">
      <CardHeader>
        <CardTitle className="flex items-center">
          <Wand2 className="mr-2 h-5 w-5 text-innovate-600" />
          AI Marketing Copy Generator
        </CardTitle>
        <CardDescription>
          Use AI to generate professional marketing copy for your email campaigns
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
              <SelectItem value="gemini">Google Gemini Pro (Recommended)</SelectItem>
              <SelectItem value="openai">OpenAI GPT-4o Mini</SelectItem>
              <SelectItem value="anthropic">Anthropic Claude 3</SelectItem>
              <SelectItem value="mistral">Mistral Large</SelectItem>
            </SelectContent>
          </Select>
        </div>
        
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
            'Generate Marketing Copy'
          )}
        </Button>
        
        {generatedContent && (
          <div className="space-y-2 pt-4">
            <div className="flex items-center justify-between">
              <label className="text-sm font-medium">Generated Content</label>
              <Button 
                size="sm" 
                variant="ghost" 
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
            <div className="bg-gray-50 p-4 rounded-md text-sm max-h-[300px] overflow-y-auto">
              <div className="whitespace-pre-wrap">
                {generatedContent}
              </div>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default MarketingCopyGenerator;
