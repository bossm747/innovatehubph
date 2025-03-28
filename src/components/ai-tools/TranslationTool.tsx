
import React, { useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';
import { useToast } from '@/hooks/use-toast';
import { Globe, Loader2, Copy, ArrowLeftRight } from 'lucide-react';

// Add more languages as needed
const languages = [
  { code: 'ar', name: 'Arabic' },
  { code: 'zh', name: 'Chinese (Simplified)' },
  { code: 'en', name: 'English' },
  { code: 'fr', name: 'French' },
  { code: 'de', name: 'German' },
  { code: 'hi', name: 'Hindi' },
  { code: 'id', name: 'Indonesian' },
  { code: 'it', name: 'Italian' },
  { code: 'ja', name: 'Japanese' },
  { code: 'ko', name: 'Korean' },
  { code: 'pt', name: 'Portuguese' },
  { code: 'ru', name: 'Russian' },
  { code: 'es', name: 'Spanish' },
  { code: 'tl', name: 'Tagalog (Filipino)' },
  { code: 'th', name: 'Thai' },
  { code: 'tr', name: 'Turkish' },
  { code: 'uk', name: 'Ukrainian' },
  { code: 'vi', name: 'Vietnamese' },
];

const TranslationTool = () => {
  const { toast } = useToast();
  const [sourceText, setSourceText] = useState('');
  const [targetLanguage, setTargetLanguage] = useState('es');
  const [preserveFormatting, setPreserveFormatting] = useState(true);
  const [translatedText, setTranslatedText] = useState('');
  const [isTranslating, setIsTranslating] = useState(false);
  
  const handleTranslate = async () => {
    if (!sourceText.trim()) {
      toast({
        title: 'Input Required',
        description: 'Please enter text to translate.',
        variant: 'destructive',
      });
      return;
    }
    
    setIsTranslating(true);
    
    try {
      const { data, error } = await supabase.functions.invoke('translate-content', {
        body: {
          text: sourceText,
          targetLanguage: languages.find(l => l.code === targetLanguage)?.name || targetLanguage,
          preserveFormatting,
        },
      });
      
      if (error) throw error;
      
      setTranslatedText(data.translatedText);
      toast({
        title: 'Translation Complete',
        description: 'Your text has been translated successfully.',
      });
    } catch (error) {
      console.error('Error translating text:', error);
      toast({
        title: 'Translation Failed',
        description: error.message || 'An error occurred during translation.',
        variant: 'destructive',
      });
    } finally {
      setIsTranslating(false);
    }
  };
  
  const handleCopyToClipboard = () => {
    navigator.clipboard.writeText(translatedText);
    toast({
      title: 'Copied!',
      description: 'Translated text copied to clipboard.',
    });
  };
  
  return (
    <div className="container py-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Globe className="mr-2 h-5 w-5 text-blue-500" />
            Translation Tool
          </CardTitle>
          <CardDescription>
            Translate text to different languages while preserving formatting
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <label className="text-sm font-medium">Source Text</label>
                <div className="flex items-center space-x-2">
                  <span className="text-xs text-gray-500">
                    {sourceText.length} characters
                  </span>
                </div>
              </div>
              <Textarea
                placeholder="Enter text to translate..."
                rows={8}
                value={sourceText}
                onChange={(e) => setSourceText(e.target.value)}
                className="resize-none min-h-[200px]"
              />
            </div>
            
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <label className="text-sm font-medium">Translated Text</label>
                {translatedText && (
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    onClick={handleCopyToClipboard}
                    className="h-7 px-2"
                  >
                    <Copy className="h-3 w-3 mr-1" />
                    Copy
                  </Button>
                )}
              </div>
              <Textarea
                placeholder="Translation will appear here..."
                rows={8}
                value={translatedText}
                readOnly
                className="resize-none bg-slate-50 min-h-[200px]"
              />
            </div>
          </div>
          
          <div className="flex flex-col md:flex-row justify-between gap-4">
            <div className="w-full md:w-1/3">
              <label className="text-sm font-medium mb-1 block">Target Language</label>
              <Select value={targetLanguage} onValueChange={setTargetLanguage}>
                <SelectTrigger>
                  <SelectValue placeholder="Select language" />
                </SelectTrigger>
                <SelectContent>
                  {languages.map(language => (
                    <SelectItem key={language.code} value={language.code}>
                      {language.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            
            <div className="flex items-center space-x-2">
              <Switch
                id="preserve-formatting"
                checked={preserveFormatting}
                onCheckedChange={setPreserveFormatting}
              />
              <label htmlFor="preserve-formatting" className="text-sm cursor-pointer">
                Preserve formatting (paragraphs, lists, etc.)
              </label>
            </div>
          </div>
        </CardContent>
        <CardFooter>
          <Button 
            onClick={handleTranslate} 
            disabled={isTranslating || !sourceText.trim()} 
            className="w-full"
          >
            {isTranslating && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            {isTranslating ? 'Translating...' : 'Translate Text'}
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
};

export default TranslationTool;
