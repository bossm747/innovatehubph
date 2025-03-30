
import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Input } from '@/components/ui/input';
import { Slider } from '@/components/ui/slider';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { AIProvider, getAiProviderList, getProviderConfig } from '@/utils/aiProviders';
import { toast } from 'sonner';
import { supabase } from '@/integrations/supabase/client';
import { Sparkles, Copy, Save, RotateCcw, Wand, Bot, Plus } from 'lucide-react';
import { Label } from '@/components/ui/label';

const contentTypes = [
  { id: 'email', label: 'Email Copy' },
  { id: 'social', label: 'Social Media' },
  { id: 'web', label: 'Website Copy' },
  { id: 'ad', label: 'Ad Copy' },
  { id: 'product', label: 'Product Description' }
];

type ProviderType = AIProvider | 'multi-agent';

interface MarketingCopyGeneratorProps {
  onCopyGenerated: (content: string) => void;
}

const MarketingCopyGenerator: React.FC<MarketingCopyGeneratorProps> = ({ onCopyGenerated }) => {
  const [contentType, setContentType] = useState('email');
  const [provider, setProvider] = useState<ProviderType>('gemini');
  const [prompt, setPrompt] = useState('');
  const [generatedContent, setGeneratedContent] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [temperature, setTemperature] = useState(0.7);
  const [copyHistory, setCopyHistory] = useState<string[]>([]);
  const [tone, setTone] = useState('professional');
  const [targetAudience, setTargetAudience] = useState('');
  const [savedPrompts, setSavedPrompts] = useState<string[]>([]);
  
  useEffect(() => {
    // Set initial prompt based on content type
    if (provider !== 'multi-agent') {
      const defaultPrompt = getProviderConfig(provider as AIProvider).defaultPrompt || '';
      setPrompt(defaultPrompt);
    } else {
      setPrompt('Generate optimized marketing content using multiple AI models for comparison');
    }
    
    // Load saved prompts
    const loadSavedPrompts = async () => {
      try {
        // We'll use the ai_agents table to store prompts for now
        const { data, error } = await supabase
          .from('ai_agents')
          .select('prompt_template')
          .eq('type', 'email')
          .order('created_at', { ascending: false })
          .limit(10);
          
        if (error) throw error;
        
        if (data) {
          const uniquePrompts = [...new Set(data.map(item => item.prompt_template))];
          setSavedPrompts(uniquePrompts);
        }
      } catch (error) {
        console.error('Error loading saved prompts:', error);
      }
    };
    
    loadSavedPrompts();
  }, [provider, contentType]);
  
  const generateContent = async () => {
    if (!prompt.trim()) {
      toast.error("Please enter a prompt");
      return;
    }
    
    setIsLoading(true);
    setGeneratedContent('');
    
    try {
      // Construct our enhanced prompt with additional context
      const enhancedPrompt = `
        Generate ${contentType} content with a ${tone} tone
        ${targetAudience ? `targeted at ${targetAudience}` : ''}
        
        ${prompt}
        
        Focus on InnovateHub's services including digital payment solutions, 
        AI integration, e-commerce development, and global expansion services.
      `;
      
      if (provider === 'multi-agent') {
        // For multi-agent, we would call multiple providers and combine results
        // This is a simplified version for now
        const providers: AIProvider[] = ['openai', 'gemini', 'anthropic'];
        let combinedResults = '';
        
        for (const p of providers) {
          const result = await simulateAiResponse(enhancedPrompt, p, temperature);
          combinedResults += `\n\n--- ${getProviderConfig(p).name} RESPONSE ---\n${result}`;
        }
        
        setGeneratedContent(combinedResults);
      } else {
        const result = await simulateAiResponse(enhancedPrompt, provider as AIProvider, temperature);
        setGeneratedContent(result);
      }
      
      // Add to history
      setCopyHistory(prev => [generatedContent, ...prev].slice(0, 5));
      
      // Save prompt to ai_agents table
      await supabase.from('ai_agents').insert({
        name: `Marketing ${contentType}`,
        type: contentType,
        prompt_template: prompt,
        provider: provider === 'multi-agent' ? 'gemini' : provider,
        model: 'marketing-agent',
        temperature: temperature,
        max_tokens: 1000,
        is_active: true,
        description: `Generated ${contentType} content with ${tone} tone for ${targetAudience || 'general audience'}`
      });
      
    } catch (error) {
      console.error('Error generating content:', error);
      toast.error('Failed to generate content. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };
  
  const simulateAiResponse = async (prompt: string, provider: AIProvider, temperature: number): Promise<string> => {
    // In a real implementation, this would call your AI provider's API
    // For now, we'll simulate a response
    
    // Adding a realistic delay
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    // Sample responses based on content type
    const responses: {[key: string]: string} = {
      email: `Subject: Transform Your Business with InnovateHub's Digital Solutions

Dear [Client],

In today's rapidly evolving digital landscape, staying ahead requires innovative solutions tailored to your business needs.

At InnovateHub, we specialize in creating seamless digital experiences through our flagship PlataPay payment solution, custom e-commerce development, and AI integration services. Our clients have reported an average of 35% increase in operational efficiency after implementing our solutions.

Would you be interested in discussing how we can help transform your business operations? I'm available for a quick 15-minute call this week to explore potential synergies.

Looking forward to connecting,

[Your Name]
Business Development Manager
InnovateHub Inc.
+63 917 685 1216`,
      social: `🚀 Transform your business with InnovateHub's digital payment solutions! 

Our PlataPay platform has helped businesses like yours increase revenue by up to 30% while reducing transaction costs.

✅ Secure payments
✅ Lower fees
✅ Real-time analytics
✅ Seamless integration

Join the digital revolution! Click the link in bio to book a free consultation. #DigitalTransformation #Fintech #InnovateHub`,
      web: `# Transform Your Business with Digital Innovation

## Custom Solutions for Modern Businesses

At InnovateHub, we create tailored digital solutions that drive growth and efficiency. Our flagship PlataPay platform empowers businesses with secure, low-cost payment processing while our AI integration services help you leverage the power of artificial intelligence.

### Our Success Stories

"Implementing InnovateHub's PlataPay solution increased our transaction volume by 45% and reduced processing costs by 30%" - Maria Santos, CEO of GrowthRetail

### Ready to Transform Your Business?

Contact our team today to schedule a free consultation and discover how InnovateHub can help you achieve your digital transformation goals.`,
      ad: `TRANSFORM YOUR BUSINESS WITH INNOVATEHUB

Reduce costs, increase efficiency, and boost revenue with our digital payment solutions.

Our clients see an average 35% increase in digital transactions after implementing PlataPay.

Limited time offer: Free integration support for new clients!

SCHEDULE A DEMO TODAY`,
      product: `# PlataPay: Secure Digital Payment Solution

PlataPay is a comprehensive digital payment platform designed specifically for businesses in the Philippines and expanding to Dubai. With its intuitive interface and robust security features, PlataPay allows businesses to accept payments, process transactions, and manage finances all in one place.

## Key Features:
- Secure payment processing with end-to-end encryption
- Lower transaction fees compared to traditional payment gateways
- Real-time analytics and reporting
- Multi-currency support
- QR code payments
- E-loading and bills payment capabilities
- Seamless API integration

PlataPay is trusted by over 500 businesses across various industries, from small retailers to large enterprises. Join the digital payment revolution with InnovateHub's PlataPay.`
    };
    
    return responses[contentType] || 'Generated content will appear here.';
  };
  
  const copyToClipboard = () => {
    navigator.clipboard.writeText(generatedContent);
    toast.success('Content copied to clipboard');
    if (onCopyGenerated) {
      onCopyGenerated(generatedContent);
    }
  };
  
  const saveAsTemplate = async () => {
    try {
      // Save to the marketing_campaigns table as a template
      await supabase.from('marketing_campaigns').insert({
        name: `${contentType.charAt(0).toUpperCase() + contentType.slice(1)} Template`,
        content: generatedContent,
        subject: `${contentType.charAt(0).toUpperCase() + contentType.slice(1)} Template`,
        status: 'draft'
      });
      
      toast.success('Saved as template');
    } catch (error) {
      console.error('Error saving template:', error);
      toast.error('Failed to save template');
    }
  };
  
  return (
    <div className="space-y-4">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Sparkles className="mr-2 h-5 w-5 text-primary" />
            Marketing Copy Generator
          </CardTitle>
          <CardDescription>
            Generate engaging marketing content powered by AI
          </CardDescription>
        </CardHeader>
        
        <CardContent>
          <Tabs defaultValue="generate" className="space-y-4">
            <TabsList className="grid grid-cols-2">
              <TabsTrigger value="generate">Generate Content</TabsTrigger>
              <TabsTrigger value="history">Copy History</TabsTrigger>
            </TabsList>
            
            <TabsContent value="generate" className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <Label htmlFor="contentType">Content Type</Label>
                  <Select
                    value={contentType}
                    onValueChange={setContentType}
                  >
                    <SelectTrigger id="contentType">
                      <SelectValue placeholder="Select content type" />
                    </SelectTrigger>
                    <SelectContent>
                      {contentTypes.map(type => (
                        <SelectItem key={type.id} value={type.id}>
                          {type.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                
                <div>
                  <Label htmlFor="provider">AI Provider</Label>
                  <Select
                    value={provider}
                    onValueChange={(value) => setProvider(value as ProviderType)}
                  >
                    <SelectTrigger id="provider">
                      <SelectValue placeholder="Select AI provider" />
                    </SelectTrigger>
                    <SelectContent>
                      {getAiProviderList().map(provider => (
                        <SelectItem key={provider.id} value={provider.id}>
                          {provider.name}
                        </SelectItem>
                      ))}
                      <SelectItem value="multi-agent">Multi-Agent (All Providers)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div>
                  <Label htmlFor="tone">Tone</Label>
                  <Select
                    value={tone}
                    onValueChange={setTone}
                  >
                    <SelectTrigger id="tone">
                      <SelectValue placeholder="Select tone" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="professional">Professional</SelectItem>
                      <SelectItem value="friendly">Friendly</SelectItem>
                      <SelectItem value="persuasive">Persuasive</SelectItem>
                      <SelectItem value="informative">Informative</SelectItem>
                      <SelectItem value="enthusiastic">Enthusiastic</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              
              <div>
                <Label htmlFor="targetAudience">Target Audience</Label>
                <Input
                  id="targetAudience"
                  placeholder="e.g., Small business owners in the Philippines"
                  value={targetAudience}
                  onChange={(e) => setTargetAudience(e.target.value)}
                />
              </div>
              
              <div className="space-y-2">
                <div className="flex justify-between">
                  <Label htmlFor="prompt">Prompt</Label>
                  <div className="text-sm text-muted-foreground">
                    {savedPrompts.length > 0 && (
                      <Select onValueChange={(value) => setPrompt(value)}>
                        <SelectTrigger className="h-7 w-36">
                          <SelectValue placeholder="Saved prompts" />
                        </SelectTrigger>
                        <SelectContent>
                          {savedPrompts.map((savedPrompt, index) => (
                            <SelectItem key={index} value={savedPrompt}>
                              {savedPrompt.substring(0, 30)}...
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    )}
                  </div>
                </div>
                <Textarea
                  id="prompt"
                  placeholder="Describe the content you want to generate"
                  value={prompt}
                  onChange={(e) => setPrompt(e.target.value)}
                  className="min-h-[100px] resize-y"
                />
              </div>
              
              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <Label htmlFor="temperature">Temperature: {temperature.toFixed(1)}</Label>
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={() => setTemperature(0.7)}
                  >
                    <RotateCcw className="h-3 w-3 mr-1" />
                    Reset
                  </Button>
                </div>
                <Slider
                  id="temperature"
                  min={0}
                  max={1}
                  step={0.1}
                  value={[temperature]}
                  onValueChange={(value) => setTemperature(value[0])}
                />
                <div className="flex justify-between text-xs text-muted-foreground">
                  <span>More Focused</span>
                  <span>More Creative</span>
                </div>
              </div>
              
              <Button 
                onClick={generateContent} 
                className="w-full"
                disabled={isLoading}
              >
                {isLoading ? (
                  <>Generating...</>
                ) : (
                  <>
                    <Wand className="h-4 w-4 mr-2" />
                    Generate Content
                  </>
                )}
              </Button>
              
              <div className="space-y-2">
                <Label htmlFor="generated-content">Generated Content</Label>
                <div className="relative">
                  <Textarea
                    id="generated-content"
                    value={generatedContent}
                    onChange={(e) => setGeneratedContent(e.target.value)}
                    className="min-h-[300px] resize-y font-mono"
                    placeholder="Generated content will appear here"
                  />
                  {generatedContent && (
                    <div className="absolute top-2 right-2 space-x-2">
                      <Button
                        size="sm"
                        variant="ghost"
                        onClick={copyToClipboard}
                        title="Copy to clipboard"
                      >
                        <Copy className="h-4 w-4" />
                      </Button>
                      <Button
                        size="sm"
                        variant="ghost"
                        onClick={saveAsTemplate}
                        title="Save as template"
                      >
                        <Save className="h-4 w-4" />
                      </Button>
                    </div>
                  )}
                </div>
              </div>
            </TabsContent>
            
            <TabsContent value="history">
              <div className="space-y-4">
                {copyHistory.length > 0 ? (
                  copyHistory.map((content, index) => (
                    <Card key={index}>
                      <CardContent className="pt-4">
                        <div className="text-sm overflow-hidden text-ellipsis whitespace-nowrap mb-2">
                          {content ? content.substring(0, 100) + '...' : 'Empty content'}
                        </div>
                        <div className="flex justify-between items-center">
                          <Badge variant="outline">
                            {new Date().toLocaleDateString()}
                          </Badge>
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => {
                              setGeneratedContent(content);
                              document.querySelector('[value="generate"]')?.dispatchEvent(
                                new MouseEvent('click', { bubbles: true })
                              );
                            }}
                          >
                            <RotateCcw className="h-3 w-3 mr-2" />
                            Restore
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  ))
                ) : (
                  <div className="text-center py-8 text-muted-foreground">
                    <Bot className="h-10 w-10 mx-auto mb-2 opacity-50" />
                    <p>No content history yet</p>
                    <p className="text-sm">Generated content will appear here</p>
                  </div>
                )}
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
        
        <CardFooter className="flex justify-between">
          <Button variant="outline" onClick={() => setGeneratedContent('')}>
            Clear
          </Button>
          <Button
            variant="outline"
            onClick={() => {
              const newCopyHistory = [generatedContent, ...copyHistory].slice(0, 5);
              setCopyHistory(newCopyHistory);
              toast.success('Added to history');
            }}
            disabled={!generatedContent}
          >
            <Plus className="h-4 w-4 mr-2" />
            Add to History
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
};

export default MarketingCopyGenerator;
