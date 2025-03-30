
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Loader2, Languages, Copy, Check, ArrowLeftRight } from 'lucide-react';

interface TranslationHistoryItem {
  originalText: string;
  translatedText: string;
  targetLanguage: string;
  timestamp: string;
}

const EmailTranslationTool: React.FC = () => {
  const { toast } = useToast();
  const [originalText, setOriginalText] = useState('');
  const [translatedText, setTranslatedText] = useState('');
  const [targetLanguage, setTargetLanguage] = useState('Spanish');
  const [isTranslating, setIsTranslating] = useState(false);
  const [copied, setCopied] = useState(false);
  const [activeTab, setActiveTab] = useState('translator');
  const [translationHistory, setTranslationHistory] = useState<TranslationHistoryItem[]>([]);
  const [preserveFormatting, setPreserveFormatting] = useState(true);

  const languages = [
    'Spanish', 'French', 'German', 'Italian', 'Portuguese', 'Dutch', 'Polish', 
    'Russian', 'Japanese', 'Chinese', 'Korean', 'Arabic', 'Hindi', 'Tagalog',
    'Vietnamese', 'Thai', 'Indonesian', 'Malay', 'Turkish'
  ];

  const translate = async () => {
    if (!originalText.trim()) {
      toast({
        title: "Empty content",
        description: "Please enter text to translate",
        variant: "destructive",
      });
      return;
    }

    try {
      setIsTranslating(true);

      const { data, error } = await supabase.functions.invoke('translate-content', {
        body: {
          text: originalText,
          targetLanguage,
          preserveFormatting
        }
      });

      if (error) throw error;

      setTranslatedText(data.translatedText);
      
      // Add to history
      const historyItem = {
        originalText,
        translatedText: data.translatedText,
        targetLanguage,
        timestamp: new Date().toISOString()
      };
      
      setTranslationHistory(prev => [historyItem, ...prev.slice(0, 9)]);
      
      toast({
        title: "Translation complete",
        description: `Successfully translated to ${targetLanguage}`,
      });
    } catch (error) {
      console.error('Translation error:', error);
      toast({
        title: "Translation failed",
        description: "There was an error translating your content. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsTranslating(false);
    }
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(translatedText);
    setCopied(true);
    
    toast({
      title: "Copied to clipboard",
      description: "Translated text has been copied to clipboard"
    });
    
    setTimeout(() => setCopied(false), 2000);
  };

  const swapTexts = () => {
    setOriginalText(translatedText);
    setTranslatedText(originalText);
  };

  const loadHistoryItem = (item: TranslationHistoryItem) => {
    setOriginalText(item.originalText);
    setTranslatedText(item.translatedText);
    setTargetLanguage(item.targetLanguage);
    setActiveTab('translator');
  };

  return (
    <Card className="shadow-sm">
      <CardHeader>
        <CardTitle className="flex items-center">
          <Languages className="mr-2 h-5 w-5 text-innovate-600" />
          Email Translation Tool
        </CardTitle>
        <CardDescription>
          Translate your email marketing content into multiple languages
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue={activeTab} value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="mb-4">
            <TabsTrigger value="translator">Translator</TabsTrigger>
            <TabsTrigger value="history">Translation History</TabsTrigger>
          </TabsList>
          
          <TabsContent value="translator" className="space-y-4">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1">
                <div className="flex justify-between mb-2">
                  <label className="text-sm font-medium">Original Text</label>
                  <div className="flex items-center">
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      className="h-6 px-2 text-xs"
                      onClick={swapTexts}
                      disabled={!translatedText || isTranslating}
                    >
                      <ArrowLeftRight className="h-3 w-3 mr-1" />
                      Swap
                    </Button>
                  </div>
                </div>
                <Textarea
                  value={originalText}
                  onChange={(e) => setOriginalText(e.target.value)}
                  className="min-h-[200px] resize-none"
                  placeholder="Enter your email content to translate..."
                  disabled={isTranslating}
                />
              </div>
              
              <div className="flex-1">
                <div className="flex justify-between mb-2">
                  <label className="text-sm font-medium">Translated Text</label>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="h-6 px-2 text-xs"
                    onClick={copyToClipboard}
                    disabled={!translatedText || isTranslating}
                  >
                    {copied ? (
                      <>
                        <Check className="h-3 w-3 mr-1" />
                        Copied
                      </>
                    ) : (
                      <>
                        <Copy className="h-3 w-3 mr-1" />
                        Copy
                      </>
                    )}
                  </Button>
                </div>
                <Textarea
                  value={translatedText}
                  readOnly
                  className="min-h-[200px] resize-none bg-gray-50"
                  placeholder="Translation will appear here..."
                />
              </div>
            </div>
            
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="w-full sm:w-auto">
                <label className="text-sm font-medium mb-1 block">Target Language</label>
                <Select value={targetLanguage} onValueChange={setTargetLanguage}>
                  <SelectTrigger className="w-full sm:w-[200px]">
                    <SelectValue placeholder="Select language" />
                  </SelectTrigger>
                  <SelectContent>
                    {languages.map(lang => (
                      <SelectItem key={lang} value={lang}>{lang}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              
              <div className="flex items-center space-x-2 mt-4 sm:mt-0">
                <input
                  id="preserve-formatting"
                  type="checkbox"
                  checked={preserveFormatting}
                  onChange={(e) => setPreserveFormatting(e.target.checked)}
                  className="rounded border-gray-300 text-innovate-600 shadow-sm focus:border-innovate-300 focus:ring focus:ring-innovate-200 focus:ring-opacity-50"
                />
                <label htmlFor="preserve-formatting" className="text-sm">
                  Preserve formatting
                </label>
              </div>
              
              <Button 
                onClick={translate} 
                disabled={isTranslating || !originalText.trim()}
                className="w-full sm:w-auto mt-2 sm:mt-0"
              >
                {isTranslating ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Translating...
                  </>
                ) : (
                  'Translate'
                )}
              </Button>
            </div>
          </TabsContent>
          
          <TabsContent value="history">
            {translationHistory.length === 0 ? (
              <div className="text-center py-8 text-muted-foreground">
                <Languages className="mx-auto h-8 w-8 mb-2 text-gray-400" />
                <p>No translation history yet</p>
                <p className="text-sm">Your recent translations will appear here</p>
              </div>
            ) : (
              <div className="space-y-4">
                {translationHistory.map((item, index) => (
                  <Card key={index} className="overflow-hidden">
                    <CardHeader className="py-3">
                      <div className="flex justify-between items-center">
                        <CardTitle className="text-base">
                          Translated to {item.targetLanguage}
                        </CardTitle>
                        <span className="text-xs text-muted-foreground">
                          {new Date(item.timestamp).toLocaleString()}
                        </span>
                      </div>
                    </CardHeader>
                    <CardContent className="py-0">
                      <div className="text-sm line-clamp-2 text-muted-foreground">
                        {item.originalText}
                      </div>
                      <div className="text-sm line-clamp-2 mt-2 font-medium">
                        {item.translatedText}
                      </div>
                    </CardContent>
                    <CardFooter className="py-3">
                      <Button 
                        variant="outline" 
                        size="sm" 
                        onClick={() => loadHistoryItem(item)}
                      >
                        Use Again
                      </Button>
                    </CardFooter>
                  </Card>
                ))}
              </div>
            )}
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
};

export default EmailTranslationTool;
