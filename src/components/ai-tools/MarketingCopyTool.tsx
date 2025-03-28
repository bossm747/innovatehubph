
import React, { useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useToast } from '@/hooks/use-toast';
import { FileText, Loader2, Copy, Download } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

const marketingTypes = [
  { value: 'social_media', label: 'Social Media Posts' },
  { value: 'email', label: 'Email Campaign' },
  { value: 'website', label: 'Website Copy' },
  { value: 'ad', label: 'Advertisement' },
];

const tones = [
  { value: 'professional', label: 'Professional' },
  { value: 'casual', label: 'Casual' },
  { value: 'enthusiastic', label: 'Enthusiastic' },
  { value: 'authoritative', label: 'Authoritative' },
  { value: 'friendly', label: 'Friendly' },
];

const audiences = [
  { value: 'general', label: 'General' },
  { value: 'tech_savvy', label: 'Tech-savvy Professionals' },
  { value: 'small_business', label: 'Small Business Owners' },
  { value: 'enterprise', label: 'Enterprise Customers' },
  { value: 'developers', label: 'Developers' },
];

const MarketingCopyTool = () => {
  const { toast } = useToast();
  const [prompt, setPrompt] = useState('');
  const [loading, setLoading] = useState(false);
  const [marketingType, setMarketingType] = useState('social_media');
  const [tone, setTone] = useState('professional');
  const [targetAudience, setTargetAudience] = useState('general');
  const [generatedCopy, setGeneratedCopy] = useState('');
  const [selectedTab, setSelectedTab] = useState('input');

  const handleGenerate = async () => {
    if (!prompt.trim()) {
      toast({
        title: 'Input Required',
        description: 'Please provide a prompt for your marketing copy.',
        variant: 'destructive',
      });
      return;
    }

    setLoading(true);
    try {
      const { data, error } = await supabase.functions.invoke('marketing-copy', {
        body: {
          prompt,
          marketingType,
          tone,
          targetAudience,
        },
      });
      
      if (error) throw error;
      
      setGeneratedCopy(data.copy);
      setSelectedTab('output');
      toast({
        title: 'Copy Generated',
        description: 'Your marketing copy was generated successfully!',
      });
    } catch (error) {
      console.error('Error generating copy:', error);
      toast({
        title: 'Generation Failed',
        description: error.message || 'An error occurred while generating the marketing copy.',
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  };

  const handleCopyToClipboard = () => {
    navigator.clipboard.writeText(generatedCopy);
    toast({
      title: 'Copied!',
      description: 'Marketing copy copied to clipboard.',
    });
  };

  const handleDownload = () => {
    const element = document.createElement('a');
    const file = new Blob([generatedCopy], { type: 'text/plain' });
    element.href = URL.createObjectURL(file);
    element.download = `marketing-copy-${new Date().toISOString().slice(0, 10)}.txt`;
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  };

  return (
    <div className="container py-6">
      <Tabs value={selectedTab} onValueChange={setSelectedTab} className="w-full">
        <TabsList className="grid w-[200px] grid-cols-2 mx-auto mb-6">
          <TabsTrigger value="input">Input</TabsTrigger>
          <TabsTrigger value="output" disabled={!generatedCopy}>Output</TabsTrigger>
        </TabsList>
        
        <TabsContent value="input">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <FileText className="mr-2 h-5 w-5 text-blue-500" />
                Marketing Copy Generator
              </CardTitle>
              <CardDescription>
                Generate professional marketing content for various channels using AI
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className="text-sm font-medium mb-1 block">Content Type</label>
                  <Select value={marketingType} onValueChange={setMarketingType}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select content type" />
                    </SelectTrigger>
                    <SelectContent>
                      {marketingTypes.map(type => (
                        <SelectItem key={type.value} value={type.value}>
                          {type.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                
                <div>
                  <label className="text-sm font-medium mb-1 block">Tone</label>
                  <Select value={tone} onValueChange={setTone}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select tone" />
                    </SelectTrigger>
                    <SelectContent>
                      {tones.map(t => (
                        <SelectItem key={t.value} value={t.value}>
                          {t.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                
                <div>
                  <label className="text-sm font-medium mb-1 block">Target Audience</label>
                  <Select value={targetAudience} onValueChange={setTargetAudience}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select audience" />
                    </SelectTrigger>
                    <SelectContent>
                      {audiences.map(audience => (
                        <SelectItem key={audience.value} value={audience.value}>
                          {audience.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
              
              <div>
                <label className="text-sm font-medium mb-1 block">
                  What would you like to promote?
                </label>
                <Textarea
                  placeholder="Describe your product, service, or promotion in detail..."
                  rows={10}
                  value={prompt}
                  onChange={(e) => setPrompt(e.target.value)}
                  className="resize-none"
                />
              </div>
            </CardContent>
            <CardFooter>
              <Button 
                onClick={handleGenerate} 
                disabled={loading || !prompt.trim()} 
                className="w-full"
              >
                {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                {loading ? 'Generating...' : 'Generate Marketing Copy'}
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>
        
        <TabsContent value="output">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <FileText className="mr-2 h-5 w-5 text-green-500" />
                Generated Marketing Copy
              </CardTitle>
              <CardDescription>
                Your AI-generated content is ready to use
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="bg-slate-50 p-4 rounded-md min-h-[300px] whitespace-pre-wrap">
                {generatedCopy}
              </div>
            </CardContent>
            <CardFooter className="flex justify-between">
              <Button 
                variant="outline" 
                onClick={() => setSelectedTab('input')}
              >
                Back to Input
              </Button>
              <div className="flex gap-2">
                <Button 
                  variant="secondary" 
                  onClick={handleCopyToClipboard}
                >
                  <Copy className="mr-2 h-4 w-4" />
                  Copy to Clipboard
                </Button>
                <Button 
                  variant="secondary" 
                  onClick={handleDownload}
                >
                  <Download className="mr-2 h-4 w-4" />
                  Download
                </Button>
              </div>
            </CardFooter>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default MarketingCopyTool;
