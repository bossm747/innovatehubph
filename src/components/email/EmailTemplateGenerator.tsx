
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { Loader2, Wand2, Copy, Download, Sparkles, Brain, Eye, Code, Palette } from 'lucide-react';
import { AIProvider, getProviderConfig } from '@/utils/aiProviders';

interface EmailTemplateGeneratorProps {
  onTemplateGenerated?: (template: string) => void;
}

type TemplateType = 'notification' | 'followup' | 'confirmation' | 'welcome' | 'custom';

interface TemplateContent {
  subject: string;
  title: string;
  message: string;
  ctaText: string;
  ctaLink: string;
  brandName: string;
  brandColor: string;
  logoUrl?: string;
  recipientName: string;
  additionalInfo?: string;
  customFields?: Record<string, string>;
}

const EmailTemplateGenerator: React.FC<EmailTemplateGeneratorProps> = ({ 
  onTemplateGenerated 
}) => {
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState<'editor' | 'preview' | 'code'>('editor');
  const [isGenerating, setIsGenerating] = useState(false);
  const [selectedProvider, setSelectedProvider] = useState<AIProvider>('gemini');
  const [templateType, setTemplateType] = useState<TemplateType>('welcome');
  const [generatedTemplate, setGeneratedTemplate] = useState<string>('');
  const [customFields, setCustomFields] = useState<Array<{ key: string; value: string }>>([]);
  
  const [templateContent, setTemplateContent] = useState<TemplateContent>({
    subject: '',
    title: '',
    message: '',
    ctaText: 'Learn More',
    ctaLink: 'https://innovatehub.ph',
    brandName: 'InnovateHub',
    brandColor: '#9b87f5',
    recipientName: 'Valued Customer',
    additionalInfo: '',
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setTemplateContent(prev => ({ ...prev, [name]: value }));
  };

  const addCustomField = () => {
    setCustomFields([...customFields, { key: '', value: '' }]);
  };

  const updateCustomField = (index: number, field: 'key' | 'value', value: string) => {
    const updatedFields = [...customFields];
    updatedFields[index][field] = value;
    setCustomFields(updatedFields);
  };

  const removeCustomField = (index: number) => {
    const updatedFields = [...customFields];
    updatedFields.splice(index, 1);
    setCustomFields(updatedFields);
  };

  const mapCustomFieldsToObject = (): Record<string, string> => {
    return customFields.reduce((obj, field) => {
      if (field.key && field.value) {
        obj[field.key] = field.value;
      }
      return obj;
    }, {} as Record<string, string>);
  };

  const handleGenerateTemplate = async () => {
    setIsGenerating(true);
    
    try {
      const customFieldsObj = mapCustomFieldsToObject();
      
      const { data, error } = await supabase.functions.invoke('generate-email-template', {
        body: {
          type: templateType,
          content: {
            ...templateContent,
            customFields: customFieldsObj
          },
          provider: selectedProvider
        }
      });
      
      if (error) throw error;
      
      setGeneratedTemplate(data.template);
      setActiveTab('preview');
      
      if (onTemplateGenerated) {
        onTemplateGenerated(data.template);
      }
      
      toast({
        title: "Template Generated",
        description: "Your email template has been successfully generated"
      });
    } catch (error) {
      console.error('Error generating template:', error);
      toast({
        title: "Generation Failed",
        description: "There was an error generating your template. Please try again.",
        variant: "destructive"
      });
    } finally {
      setIsGenerating(false);
    }
  };

  const handleCopyToClipboard = () => {
    navigator.clipboard.writeText(generatedTemplate);
    toast({
      title: "Copied!",
      description: "Template HTML copied to clipboard"
    });
  };

  const handleDownload = () => {
    const element = document.createElement('a');
    const file = new Blob([generatedTemplate], { type: 'text/html' });
    element.href = URL.createObjectURL(file);
    element.download = `email-template-${templateType}-${new Date().toISOString().slice(0, 10)}.html`;
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  };

  const getTemplateTypeDefaults = (type: TemplateType): Partial<TemplateContent> => {
    switch (type) {
      case 'notification':
        return {
          subject: 'Important Update from InnovateHub',
          title: 'Important Notification',
          message: 'We have an important update to share with you regarding our services.',
          ctaText: 'View Details'
        };
      case 'followup':
        return {
          subject: 'Following Up on Your Interest in InnovateHub',
          title: 'Thank You for Your Interest',
          message: 'We wanted to follow up on your recent inquiry about our services. Is there anything else we can help you with?',
          ctaText: 'Schedule a Call'
        };
      case 'confirmation':
        return {
          subject: 'Your Request Has Been Confirmed',
          title: 'Confirmation',
          message: 'Your request has been successfully processed. Thank you for choosing InnovateHub.',
          ctaText: 'View Your Request'
        };
      case 'welcome':
        return {
          subject: 'Welcome to InnovateHub',
          title: 'Welcome to InnovateHub',
          message: 'Thank you for joining InnovateHub. We\'re excited to have you on board and look forward to helping you with your digital transformation journey.',
          ctaText: 'Explore Our Services'
        };
      case 'custom':
        return {
          subject: 'Message from InnovateHub',
          title: 'Custom Message',
          message: 'This is a custom message from InnovateHub.',
          ctaText: 'Learn More'
        };
      default:
        return {};
    }
  };

  const handleTemplateTypeChange = (value: TemplateType) => {
    setTemplateType(value);
    const defaults = getTemplateTypeDefaults(value);
    setTemplateContent(prev => ({ ...prev, ...defaults }));
  };

  const templateTypeOptions = [
    { value: 'welcome', label: 'Welcome Email' },
    { value: 'confirmation', label: 'Confirmation Email' },
    { value: 'notification', label: 'Notification Email' },
    { value: 'followup', label: 'Follow-up Email' },
    { value: 'custom', label: 'Custom Email' }
  ];

  const providerOptions = [
    { value: 'gemini', label: 'Google Gemini' },
    { value: 'openai', label: 'OpenAI GPT' },
    { value: 'anthropic', label: 'Anthropic Claude' },
    { value: 'mistral', label: 'Mistral AI' }
  ];

  return (
    <Card className="shadow-sm">
      <CardHeader>
        <CardTitle className="flex items-center">
          <Wand2 className="mr-2 h-5 w-5 text-innovate-600" />
          AI Email Template Generator
          <Badge variant="outline" className="ml-2 bg-gradient-to-r from-blue-50 to-purple-50 text-purple-700 border-purple-200">
            <Sparkles className="w-3 h-3 mr-1" />
            Multi-Provider
          </Badge>
        </CardTitle>
        <CardDescription>
          Generate professional HTML email templates using AI
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs value={activeTab} onValueChange={setActiveTab as any} className="w-full">
          <TabsList className="grid grid-cols-3 mb-4">
            <TabsTrigger value="editor" className="flex items-center">
              <Palette className="w-4 h-4 mr-2" />
              Editor
            </TabsTrigger>
            <TabsTrigger value="preview" className="flex items-center" disabled={!generatedTemplate}>
              <Eye className="w-4 h-4 mr-2" />
              Preview
            </TabsTrigger>
            <TabsTrigger value="code" className="flex items-center" disabled={!generatedTemplate}>
              <Code className="w-4 h-4 mr-2" />
              HTML
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="editor" className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              <div>
                <Label htmlFor="templateType">Template Type</Label>
                <Select 
                  value={templateType} 
                  onValueChange={(value) => handleTemplateTypeChange(value as TemplateType)}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select template type" />
                  </SelectTrigger>
                  <SelectContent>
                    {templateTypeOptions.map(option => (
                      <SelectItem key={option.value} value={option.value}>
                        {option.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              
              <div>
                <Label htmlFor="aiProvider">AI Provider</Label>
                <Select 
                  value={selectedProvider} 
                  onValueChange={(value) => setSelectedProvider(value as AIProvider)}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select AI provider" />
                  </SelectTrigger>
                  <SelectContent>
                    {providerOptions.map(option => (
                      <SelectItem key={option.value} value={option.value}>
                        {option.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
            
            <div className="space-y-4">
              <div>
                <Label htmlFor="subject">Email Subject</Label>
                <Input
                  id="subject"
                  name="subject"
                  value={templateContent.subject}
                  onChange={handleInputChange}
                  placeholder="Enter email subject"
                />
              </div>
              
              <div>
                <Label htmlFor="title">Email Title</Label>
                <Input
                  id="title"
                  name="title"
                  value={templateContent.title}
                  onChange={handleInputChange}
                  placeholder="Enter title that appears in the email header"
                />
              </div>
              
              <div>
                <Label htmlFor="message">Email Message</Label>
                <Textarea
                  id="message"
                  name="message"
                  value={templateContent.message}
                  onChange={handleInputChange}
                  placeholder="Enter the main message content"
                  rows={4}
                />
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="ctaText">CTA Button Text</Label>
                  <Input
                    id="ctaText"
                    name="ctaText"
                    value={templateContent.ctaText}
                    onChange={handleInputChange}
                    placeholder="Enter call-to-action button text"
                  />
                </div>
                
                <div>
                  <Label htmlFor="ctaLink">CTA Button URL</Label>
                  <Input
                    id="ctaLink"
                    name="ctaLink"
                    value={templateContent.ctaLink}
                    onChange={handleInputChange}
                    placeholder="Enter call-to-action URL"
                  />
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="brandName">Brand Name</Label>
                  <Input
                    id="brandName"
                    name="brandName"
                    value={templateContent.brandName}
                    onChange={handleInputChange}
                    placeholder="Enter your brand name"
                  />
                </div>
                
                <div>
                  <Label htmlFor="brandColor">Brand Color</Label>
                  <div className="flex space-x-2">
                    <Input
                      id="brandColor"
                      name="brandColor"
                      value={templateContent.brandColor}
                      onChange={handleInputChange}
                      placeholder="Enter color code (e.g., #9b87f5)"
                    />
                    <input
                      type="color"
                      value={templateContent.brandColor}
                      onChange={(e) => setTemplateContent(prev => ({ ...prev, brandColor: e.target.value }))}
                      className="w-10 h-10 p-1 rounded border"
                    />
                  </div>
                </div>
              </div>
              
              <div>
                <Label htmlFor="recipientName">Default Recipient Name</Label>
                <Input
                  id="recipientName"
                  name="recipientName"
                  value={templateContent.recipientName}
                  onChange={handleInputChange}
                  placeholder="Enter default recipient name (can be overridden when sending)"
                />
              </div>
              
              <div>
                <Label htmlFor="additionalInfo">Additional Information</Label>
                <Textarea
                  id="additionalInfo"
                  name="additionalInfo"
                  value={templateContent.additionalInfo || ''}
                  onChange={handleInputChange}
                  placeholder="Enter any additional information to include"
                  rows={2}
                />
              </div>
              
              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <Label>Custom Fields</Label>
                  <Button variant="outline" size="sm" onClick={addCustomField}>
                    Add Field
                  </Button>
                </div>
                
                {customFields.map((field, index) => (
                  <div key={index} className="flex space-x-2">
                    <Input
                      placeholder="Field name"
                      value={field.key}
                      onChange={(e) => updateCustomField(index, 'key', e.target.value)}
                      className="flex-1"
                    />
                    <Input
                      placeholder="Field value"
                      value={field.value}
                      onChange={(e) => updateCustomField(index, 'value', e.target.value)}
                      className="flex-1"
                    />
                    <Button 
                      variant="ghost" 
                      size="icon" 
                      onClick={() => removeCustomField(index)}
                      className="h-10 w-10"
                    >
                      ✕
                    </Button>
                  </div>
                ))}
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="preview" className="w-full">
            {generatedTemplate ? (
              <div className="border rounded-md overflow-hidden">
                <iframe 
                  srcDoc={generatedTemplate} 
                  title="Email template preview" 
                  className="w-full h-[600px] border-0"
                />
              </div>
            ) : (
              <div className="flex items-center justify-center h-60 bg-gray-50 rounded-md">
                <p className="text-gray-500">Generate a template to preview it here</p>
              </div>
            )}
          </TabsContent>
          
          <TabsContent value="code" className="w-full">
            {generatedTemplate ? (
              <div className="relative">
                <pre className="bg-gray-50 p-4 rounded-md overflow-x-auto max-h-[600px] overflow-y-auto">
                  <code className="text-sm">{generatedTemplate}</code>
                </pre>
                <div className="absolute top-2 right-2 flex space-x-1">
                  <Button 
                    variant="outline" 
                    size="icon" 
                    onClick={handleCopyToClipboard} 
                    className="h-8 w-8 bg-white"
                  >
                    <Copy className="h-4 w-4" />
                  </Button>
                  <Button 
                    variant="outline" 
                    size="icon" 
                    onClick={handleDownload} 
                    className="h-8 w-8 bg-white"
                  >
                    <Download className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            ) : (
              <div className="flex items-center justify-center h-60 bg-gray-50 rounded-md">
                <p className="text-gray-500">Generate a template to view the HTML code</p>
              </div>
            )}
          </TabsContent>
        </Tabs>
      </CardContent>
      <CardFooter>
        <Button 
          onClick={handleGenerateTemplate} 
          disabled={isGenerating}
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
              Generate Email Template
            </>
          )}
        </Button>
      </CardFooter>
    </Card>
  );
};

export default EmailTemplateGenerator;
