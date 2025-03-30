
import React, { useState } from 'react';
import { useToast } from '@/hooks/use-toast';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { supabase } from '@/integrations/supabase/client';
import { Loader2, Copy, Sparkles, Brain, ArrowDown } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

interface PromoResponse {
  title: string;
  body: string;
  cta: string;
  shortVersion?: string;
  provider: string;
  recommendedTags?: string[];
}

const PromoCreator = () => {
  const { toast } = useToast();
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedContent, setGeneratedContent] = useState<PromoResponse | null>(null);
  const [selectedTab, setSelectedTab] = useState('email');
  
  const [formData, setFormData] = useState({
    promoCode: '',
    audience: 'potential-clients',
    service: 'platapay',
    theme: '',
    urgency: 'medium' as 'low' | 'medium' | 'high'
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSelectChange = (name: string, value: string) => {
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const generatePromoContent = async () => {
    setIsGenerating(true);
    
    try {
      const { data, error } = await supabase.functions.invoke('generate-promo', {
        body: {
          promoCode: formData.promoCode,
          audience: formData.audience,
          service: formData.service,
          channelType: selectedTab,
          theme: formData.theme,
          urgency: formData.urgency
        }
      });

      if (error) throw error;
      
      setGeneratedContent(data);
      
      toast({
        title: 'Promotional content generated',
        description: `Generated using ${data.provider}`
      });
    } catch (error) {
      console.error('Error generating promo content:', error);
      toast({
        title: 'Error generating content',
        description: 'Please try again later',
        variant: 'destructive'
      });
    } finally {
      setIsGenerating(false);
    }
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    toast({
      title: 'Copied to clipboard',
      description: 'The content has been copied to your clipboard'
    });
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center">
          <Sparkles className="w-5 h-5 mr-2 text-indigo-500" />
          AI Promotional Content Generator
        </CardTitle>
        <CardDescription>
          Generate compelling promotional content for your marketing campaigns
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <div className="space-y-4">
              <div>
                <Label htmlFor="promoCode">Promotion Code (Optional)</Label>
                <Input
                  id="promoCode"
                  name="promoCode"
                  placeholder="e.g. SUMMER20"
                  value={formData.promoCode}
                  onChange={handleInputChange}
                />
              </div>
              
              <div>
                <Label htmlFor="service">Service</Label>
                <Select value={formData.service} onValueChange={value => handleSelectChange('service', value)}>
                  <SelectTrigger id="service">
                    <SelectValue placeholder="Select service" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="platapay">PlataPay</SelectItem>
                    <SelectItem value="digital">Digital Customizations</SelectItem>
                    <SelectItem value="ecommerce">E-Commerce Solutions</SelectItem>
                    <SelectItem value="ai">AI Solutions</SelectItem>
                    <SelectItem value="global">Global Expansion</SelectItem>
                    <SelectItem value="general">All Services</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div>
                <Label htmlFor="audience">Target Audience</Label>
                <Select value={formData.audience} onValueChange={value => handleSelectChange('audience', value)}>
                  <SelectTrigger id="audience">
                    <SelectValue placeholder="Select audience" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="potential-clients">Potential Clients</SelectItem>
                    <SelectItem value="existing-clients">Existing Clients</SelectItem>
                    <SelectItem value="platapay-agents">PlataPay Agents</SelectItem>
                    <SelectItem value="partners">Business Partners</SelectItem>
                    <SelectItem value="investors">Investors</SelectItem>
                    <SelectItem value="general">General Audience</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div>
                <Label htmlFor="theme">Theme/Occasion (Optional)</Label>
                <Input
                  id="theme"
                  name="theme"
                  placeholder="e.g. New Year, Product Launch, etc."
                  value={formData.theme}
                  onChange={handleInputChange}
                />
              </div>
              
              <div>
                <Label htmlFor="urgency">Urgency Level</Label>
                <Select value={formData.urgency} onValueChange={value => handleSelectChange('urgency', value as 'low' | 'medium' | 'high')}>
                  <SelectTrigger id="urgency">
                    <SelectValue placeholder="Select urgency level" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="low">Low (Informational)</SelectItem>
                    <SelectItem value="medium">Medium (Encouraging)</SelectItem>
                    <SelectItem value="high">High (Limited-time Offer)</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div>
                <Label>Channel Type</Label>
                <Tabs value={selectedTab} onValueChange={setSelectedTab} className="mt-2">
                  <TabsList className="grid grid-cols-4 w-full">
                    <TabsTrigger value="email">Email</TabsTrigger>
                    <TabsTrigger value="social">Social</TabsTrigger>
                    <TabsTrigger value="web">Web</TabsTrigger>
                    <TabsTrigger value="sms">SMS</TabsTrigger>
                  </TabsList>
                </Tabs>
              </div>
              
              <Button 
                onClick={generatePromoContent} 
                className="w-full"
                disabled={isGenerating}
              >
                {isGenerating ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Generating...
                  </>
                ) : (
                  <>
                    <Brain className="mr-2 h-4 w-4" />
                    Generate Content
                  </>
                )}
              </Button>
            </div>
          </div>
          
          <div>
            {generatedContent ? (
              <div className="space-y-4">
                <div>
                  <Label className="flex justify-between">
                    <span>Title/Subject</span>
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      className="h-6 px-2"
                      onClick={() => copyToClipboard(generatedContent.title)}
                    >
                      <Copy className="h-3 w-3 mr-1" />
                      Copy
                    </Button>
                  </Label>
                  <div className="p-3 border rounded-md bg-muted/50 mt-1">
                    {generatedContent.title}
                  </div>
                </div>
                
                <div>
                  <Label className="flex justify-between">
                    <span>Body Content</span>
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      className="h-6 px-2"
                      onClick={() => copyToClipboard(generatedContent.body)}
                    >
                      <Copy className="h-3 w-3 mr-1" />
                      Copy
                    </Button>
                  </Label>
                  <div className="p-3 border rounded-md bg-muted/50 mt-1 whitespace-pre-line min-h-[150px] max-h-[250px] overflow-y-auto">
                    {generatedContent.body}
                  </div>
                </div>
                
                <div>
                  <Label className="flex justify-between">
                    <span>Call-to-Action</span>
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      className="h-6 px-2"
                      onClick={() => copyToClipboard(generatedContent.cta)}
                    >
                      <Copy className="h-3 w-3 mr-1" />
                      Copy
                    </Button>
                  </Label>
                  <div className="p-3 border rounded-md bg-muted/50 mt-1">
                    {generatedContent.cta}
                  </div>
                </div>
                
                {generatedContent.shortVersion && (
                  <div>
                    <Label className="flex justify-between">
                      <span>Short Version (Social/SMS)</span>
                      <Button 
                        variant="ghost" 
                        size="sm" 
                        className="h-6 px-2"
                        onClick={() => copyToClipboard(generatedContent.shortVersion || '')}
                      >
                        <Copy className="h-3 w-3 mr-1" />
                        Copy
                      </Button>
                    </Label>
                    <div className="p-3 border rounded-md bg-muted/50 mt-1">
                      {generatedContent.shortVersion}
                    </div>
                  </div>
                )}
                
                {generatedContent.recommendedTags && generatedContent.recommendedTags.length > 0 && (
                  <div>
                    <Label>Recommended Tags</Label>
                    <div className="flex flex-wrap gap-2 mt-1">
                      {generatedContent.recommendedTags.map((tag, index) => (
                        <div key={index} className="px-2 py-1 bg-blue-100 text-blue-800 rounded text-xs">
                          {tag}
                        </div>
                      ))}
                    </div>
                  </div>
                )}
                
                <div className="text-xs text-muted-foreground pt-2 flex items-center">
                  <Brain className="w-3 h-3 mr-1" />
                  Generated using {generatedContent.provider.charAt(0).toUpperCase() + generatedContent.provider.slice(1)}
                </div>
                
                <Button 
                  variant="outline" 
                  className="w-full"
                  onClick={() => setGeneratedContent(null)}
                >
                  <ArrowDown className="mr-2 h-4 w-4" />
                  Generate Another
                </Button>
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center h-full">
                <div className="text-center p-6 border border-dashed rounded-lg bg-muted/30">
                  <Sparkles className="h-12 w-12 text-muted-foreground mx-auto mb-3" />
                  <h3 className="text-lg font-medium">AI Content Generator</h3>
                  <p className="text-muted-foreground mt-2">
                    Fill out the form and click "Generate Content" to create compelling promotional material
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default PromoCreator;
