
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useToast } from '@/hooks/use-toast';
import { generateEmailTemplate } from '@/utils/emailCampaignUtils';
import { Sparkles, RefreshCw, Copy, ExternalLink } from 'lucide-react';

const PlatapayEmailTemplate = () => {
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  const [template, setTemplate] = useState<string>('');
  const [formData, setFormData] = useState({
    subject: 'Become a PlataPay Agent and Grow Your Income',
    title: 'Join the PlataPay Financial Revolution',
    message: 'Discover how PlataPay can help you earn additional income by providing essential financial services to your community.',
    ctaText: 'Apply as Agent',
    ctaLink: 'https://platapay.ph/registration',
    recipientName: '[Recipient]',
    brandColor: '#9b87f5',
    templateType: 'promotion'
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSelectChange = (name: string, value: string) => {
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const generateTemplate = async () => {
    setLoading(true);
    try {
      const generatedHtml = await generateEmailTemplate(
        formData.templateType,
        {
          subject: formData.subject,
          title: formData.title,
          message: formData.message,
          ctaText: formData.ctaText,
          ctaLink: formData.ctaLink,
          brandName: 'PlataPay',
          brandColor: formData.brandColor,
          recipientName: formData.recipientName,
          additionalInfo: 'PlataPay is InnovateHub\'s premier digital financial solution for micropreneurs.',
          customFields: {
            platformLink: 'https://platapay.ph',
            agentBenefits: 'Commission on every transaction, increased foot traffic, and enhanced community reputation.',
            appStoreLink: 'https://play.google.com/store/apps',
          }
        }
      );
      
      setTemplate(generatedHtml);
      toast({
        title: "Template generated successfully",
        description: "Your PlataPay email template is ready to use",
      });
    } catch (error) {
      console.error('Error generating template:', error);
      toast({
        title: "Error generating template",
        description: "Please try again or contact support",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(template);
    toast({
      title: "Copied to clipboard",
      description: "The template HTML has been copied to your clipboard",
    });
  };
  
  const viewInNewTab = () => {
    const newTab = window.open();
    if (newTab) {
      newTab.document.write(template);
      newTab.document.close();
    }
  };

  return (
    <div className="space-y-8">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Sparkles className="h-5 w-5 mr-2 text-innovate-600" /> 
            PlataPay Email Template Generator
          </CardTitle>
          <CardDescription>
            Create professionally designed email templates to promote PlataPay agent opportunities
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="subject">Email Subject</Label>
                <Input 
                  id="subject" 
                  name="subject" 
                  value={formData.subject}
                  onChange={handleInputChange}
                />
              </div>
              <div>
                <Label htmlFor="templateType">Template Type</Label>
                <Select 
                  value={formData.templateType} 
                  onValueChange={(value) => handleSelectChange('templateType', value)}
                >
                  <SelectTrigger id="templateType">
                    <SelectValue placeholder="Select template type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="promotion">Promotion</SelectItem>
                    <SelectItem value="welcome">Welcome</SelectItem>
                    <SelectItem value="newsletter">Newsletter</SelectItem>
                    <SelectItem value="notification">Notification</SelectItem>
                    <SelectItem value="followup">Follow-up</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            
            <div>
              <Label htmlFor="title">Email Title</Label>
              <Input 
                id="title" 
                name="title" 
                value={formData.title}
                onChange={handleInputChange}
              />
            </div>
            
            <div>
              <Label htmlFor="message">Main Message</Label>
              <Textarea 
                id="message" 
                name="message" 
                value={formData.message}
                onChange={handleInputChange}
                rows={3}
              />
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="md:col-span-2">
                <Label htmlFor="ctaLink">CTA Link</Label>
                <Input 
                  id="ctaLink" 
                  name="ctaLink" 
                  value={formData.ctaLink}
                  onChange={handleInputChange}
                />
              </div>
              <div>
                <Label htmlFor="ctaText">CTA Text</Label>
                <Input 
                  id="ctaText" 
                  name="ctaText" 
                  value={formData.ctaText}
                  onChange={handleInputChange}
                />
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="recipientName">Recipient Name Variable</Label>
                <Input 
                  id="recipientName" 
                  name="recipientName" 
                  value={formData.recipientName}
                  onChange={handleInputChange}
                />
              </div>
              <div>
                <Label htmlFor="brandColor">Brand Color (Hex)</Label>
                <div className="flex items-center space-x-2">
                  <Input 
                    id="brandColor" 
                    name="brandColor" 
                    value={formData.brandColor}
                    onChange={handleInputChange}
                  />
                  <div 
                    className="w-10 h-10 rounded border" 
                    style={{backgroundColor: formData.brandColor}}
                  />
                </div>
              </div>
            </div>
          </div>
          
          <div className="flex justify-center mt-6">
            <Button 
              onClick={generateTemplate} 
              disabled={loading}
              className="w-full md:w-auto"
            >
              {loading ? (
                <>
                  <RefreshCw className="mr-2 h-4 w-4 animate-spin" />
                  Generating...
                </>
              ) : (
                <>
                  <Sparkles className="mr-2 h-4 w-4" />
                  Generate Template
                </>
              )}
            </Button>
          </div>
        </CardContent>
      </Card>
      
      {template && (
        <Card>
          <CardHeader>
            <CardTitle>Generated Template</CardTitle>
            <CardDescription>
              Preview your PlataPay email template below
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="border rounded-md p-4 bg-gray-50 overflow-hidden">
              <div className="h-[400px] overflow-auto">
                <iframe
                  srcDoc={template}
                  title="Email Template Preview"
                  className="w-full h-full border-0"
                  sandbox="allow-same-origin"
                />
              </div>
            </div>
          </CardContent>
          <CardFooter className="flex justify-between">
            <Button variant="outline" onClick={copyToClipboard}>
              <Copy className="mr-2 h-4 w-4" />
              Copy HTML
            </Button>
            <Button variant="outline" onClick={viewInNewTab}>
              <ExternalLink className="mr-2 h-4 w-4" />
              View Full Page
            </Button>
          </CardFooter>
        </Card>
      )}
    </div>
  );
};

export default PlatapayEmailTemplate;
