import React, { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import AIEmailGenerator from '@/components/email/AIEmailGenerator';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';
import { supabase } from '@/integrations/supabase/client';
import { 
  Sparkles, 
  Brain, 
  Languages, 
  CheckCircle2, 
  Loader2,
  Bot
} from 'lucide-react';

const AgentsEmailManager = () => {
  const [activeTab, setActiveTab] = useState('generate');
  const [isTranslating, setIsTranslating] = useState(false);
  const [isEnhancing, setIsEnhancing] = useState(false);
  const [emailContent, setEmailContent] = useState('');
  const [enhancedContent, setEnhancedContent] = useState('');
  const [translatedContent, setTranslatedContent] = useState('');
  const [translationLanguage, setTranslationLanguage] = useState('Spanish');

  const handleEmailGenerated = (content: string) => {
    setEmailContent(content);
  };

  const enhanceEmail = async () => {
    if (!emailContent) {
      toast.error('Please generate an email first');
      return;
    }

    setIsEnhancing(true);
    try {
      const { data, error } = await supabase.functions.invoke('multi-agent-generate', {
        body: {
          content: emailContent,
          agentType: 'enhancement',
          parameters: {
            style: 'persuasive',
            audience: 'business professionals'
          }
        },
      });

      if (error) throw error;

      setEnhancedContent(data.text);
      toast.success('Email enhanced successfully!');
      
      setActiveTab('enhanced');
    } catch (error) {
      console.error('Error enhancing email:', error);
      toast.error('Failed to enhance email: ' + (error.message || 'Unknown error'));
    } finally {
      setIsEnhancing(false);
    }
  };

  const translateEmail = async () => {
    if (!emailContent && !enhancedContent) {
      toast.error('Please generate or enhance an email first');
      return;
    }

    const contentToTranslate = enhancedContent || emailContent;

    setIsTranslating(true);
    try {
      const { data, error } = await supabase.functions.invoke('multi-agent-generate', {
        body: {
          content: contentToTranslate,
          agentType: 'translator',
          targetLanguage: translationLanguage
        },
      });

      if (error) throw error;

      setTranslatedContent(data.text);
      toast.success(`Email translated to ${translationLanguage} successfully!`);
      
      setActiveTab('translated');
    } catch (error) {
      console.error('Error translating email:', error);
      toast.error('Failed to translate email: ' + (error.message || 'Unknown error'));
    } finally {
      setIsTranslating(false);
    }
  };

  const languageOptions = [
    { value: 'Spanish', label: 'Spanish' },
    { value: 'French', label: 'French' },
    { value: 'German', label: 'German' },
    { value: 'Italian', label: 'Italian' },
    { value: 'Portuguese', label: 'Portuguese' },
    { value: 'Chinese', label: 'Chinese' },
    { value: 'Japanese', label: 'Japanese' },
    { value: 'Korean', label: 'Korean' },
    { value: 'Arabic', label: 'Arabic' },
    { value: 'Russian', label: 'Russian' }
  ];

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-xl font-bold flex items-center">
            <Brain className="mr-2 h-5 w-5 text-innovate-600" />
            AI Agents Email Manager
          </h2>
          <p className="text-sm text-muted-foreground">
            Let AI agents handle your email content generation, enhancement and translation
          </p>
        </div>
        <Badge variant="outline" className="px-3 py-1">
          <Sparkles className="w-3.5 h-3.5 mr-1 text-innovate-600" />
          AI-Powered
        </Badge>
      </div>

      <Tabs defaultValue={activeTab} value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid grid-cols-3 mb-4">
          <TabsTrigger value="generate">
            <Sparkles className="mr-2 h-4 w-4" />
            Generate
          </TabsTrigger>
          <TabsTrigger value="enhanced" disabled={!emailContent}>
            <Brain className="mr-2 h-4 w-4" />
            Enhanced
          </TabsTrigger>
          <TabsTrigger value="translated" disabled={!emailContent && !enhancedContent}>
            <Languages className="mr-2 h-4 w-4" />
            Translated
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="generate">
          <AIEmailGenerator onEmailGenerated={handleEmailGenerated} />
        </TabsContent>
        
        <TabsContent value="enhanced">
          {enhancedContent ? (
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Brain className="mr-2 h-5 w-5 text-innovate-600" />
                  Enhanced Email
                </CardTitle>
                <CardDescription>
                  AI-enhanced version with improved messaging and persuasiveness
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="bg-slate-50 p-4 rounded-md whitespace-pre-line">
                  {enhancedContent}
                </div>
              </CardContent>
            </Card>
          ) : (
            <Card>
              <CardHeader>
                <CardTitle>Enhance Your Email</CardTitle>
                <CardDescription>
                  Use our AI enhancement agent to improve your email's effectiveness
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="mb-4">The enhancement agent will:</p>
                <ul className="list-disc pl-5 space-y-1 mb-6">
                  <li>Improve the structure and readability</li>
                  <li>Enhance call-to-action elements</li>
                  <li>Ensure professional tone and branding</li>
                  <li>Fix grammatical or spelling issues</li>
                  <li>Optimize for engagement and conversion</li>
                </ul>
                
                <Button 
                  onClick={enhanceEmail} 
                  disabled={isEnhancing || !emailContent}
                  className="w-full"
                >
                  {isEnhancing ? (
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  ) : (
                    <Brain className="mr-2 h-4 w-4" />
                  )}
                  {isEnhancing ? 'Enhancing Email...' : 'Enhance Email with AI'}
                </Button>
              </CardContent>
            </Card>
          )}
        </TabsContent>
        
        <TabsContent value="translated">
          {translatedContent ? (
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Languages className="mr-2 h-5 w-5 text-innovate-600" />
                  Translated Email ({translationLanguage})
                </CardTitle>
                <CardDescription>
                  AI-translated version maintaining the original tone and intent
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="bg-slate-50 p-4 rounded-md whitespace-pre-line">
                  {translatedContent}
                </div>
              </CardContent>
            </Card>
          ) : (
            <Card>
              <CardHeader>
                <CardTitle>Translate Your Email</CardTitle>
                <CardDescription>
                  Use our AI translation agent to make your email accessible in multiple languages
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium mb-1">Target Language</label>
                    <select 
                      className="w-full border-gray-300 rounded-md shadow-sm px-3 py-2 text-sm"
                      value={translationLanguage}
                      onChange={(e) => setTranslationLanguage(e.target.value)}
                    >
                      {languageOptions.map(option => (
                        <option key={option.value} value={option.value}>
                          {option.label}
                        </option>
                      ))}
                    </select>
                  </div>
                  
                  <Button 
                    onClick={translateEmail} 
                    disabled={isTranslating || (!emailContent && !enhancedContent)}
                    className="w-full"
                  >
                    {isTranslating ? (
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    ) : (
                      <Languages className="mr-2 h-4 w-4" />
                    )}
                    {isTranslating ? 'Translating Email...' : `Translate to ${translationLanguage}`}
                  </Button>
                </div>
              </CardContent>
            </Card>
          )}
        </TabsContent>
      </Tabs>
      
      <Card className="mt-6">
        <CardHeader className="pb-2">
          <CardTitle className="text-sm font-medium">How AI Agents Work with Email</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
            <div className="flex flex-col items-center text-center p-3 bg-slate-50 rounded-md">
              <Sparkles className="h-8 w-8 text-blue-500 mb-2" />
              <h3 className="font-medium">Generation Agent</h3>
              <p className="text-muted-foreground text-xs mt-1">
                Creates email content based on your purpose, key points, and preferred tone
              </p>
            </div>
            
            <div className="flex flex-col items-center text-center p-3 bg-slate-50 rounded-md">
              <Brain className="h-8 w-8 text-purple-500 mb-2" />
              <h3 className="font-medium">Enhancement Agent</h3>
              <p className="text-muted-foreground text-xs mt-1">
                Improves structure, readability, and persuasiveness of your generated emails
              </p>
            </div>
            
            <div className="flex flex-col items-center text-center p-3 bg-slate-50 rounded-md">
              <Languages className="h-8 w-8 text-green-500 mb-2" />
              <h3 className="font-medium">Translation Agent</h3>
              <p className="text-muted-foreground text-xs mt-1">
                Translates your emails to multiple languages while preserving tone and intent
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default AgentsEmailManager;
