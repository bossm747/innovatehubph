
import React, { useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useToast } from '@/hooks/use-toast';
import { Code, Loader2, Copy, Download } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

const languages = [
  { value: 'javascript', label: 'JavaScript' },
  { value: 'typescript', label: 'TypeScript' },
  { value: 'python', label: 'Python' },
  { value: 'java', label: 'Java' },
  { value: 'csharp', label: 'C#' },
  { value: 'php', label: 'PHP' },
  { value: 'ruby', label: 'Ruby' },
  { value: 'go', label: 'Go' },
  { value: 'swift', label: 'Swift' },
  { value: 'kotlin', label: 'Kotlin' },
  { value: 'rust', label: 'Rust' },
  { value: 'sql', label: 'SQL' },
];

const CodeAssistantTool = () => {
  const { toast } = useToast();
  const [prompt, setPrompt] = useState('');
  const [context, setContext] = useState('');
  const [loading, setLoading] = useState(false);
  const [language, setLanguage] = useState('javascript');
  const [generatedCode, setGeneratedCode] = useState('');
  const [selectedTab, setSelectedTab] = useState('input');

  const handleGenerate = async () => {
    if (!prompt.trim()) {
      toast({
        title: 'Input Required',
        description: 'Please provide a description of the code you need.',
        variant: 'destructive',
      });
      return;
    }

    setLoading(true);
    try {
      const { data, error } = await supabase.functions.invoke('code-assistant', {
        body: {
          prompt,
          language,
          context: context.trim(),
        },
      });
      
      if (error) throw error;
      
      setGeneratedCode(data.code);
      setSelectedTab('output');
      toast({
        title: 'Code Generated',
        description: 'Your code was generated successfully!',
      });
    } catch (error) {
      console.error('Error generating code:', error);
      toast({
        title: 'Generation Failed',
        description: error.message || 'An error occurred while generating the code.',
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  };

  const handleCopyToClipboard = () => {
    navigator.clipboard.writeText(generatedCode);
    toast({
      title: 'Copied!',
      description: 'Code copied to clipboard.',
    });
  };

  const handleDownload = () => {
    const element = document.createElement('a');
    const file = new Blob([generatedCode], { type: 'text/plain' });
    element.href = URL.createObjectURL(file);
    
    // Determine file extension based on language
    let extension = '.txt';
    switch (language) {
      case 'javascript': extension = '.js'; break;
      case 'typescript': extension = '.ts'; break;
      case 'python': extension = '.py'; break;
      case 'java': extension = '.java'; break;
      case 'csharp': extension = '.cs'; break;
      case 'php': extension = '.php'; break;
      case 'ruby': extension = '.rb'; break;
      case 'go': extension = '.go'; break;
      case 'swift': extension = '.swift'; break;
      case 'kotlin': extension = '.kt'; break;
      case 'rust': extension = '.rs'; break;
      case 'sql': extension = '.sql'; break;
    }
    
    element.download = `generated-code-${new Date().toISOString().slice(0, 10)}${extension}`;
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  };

  return (
    <div className="container py-6">
      <Tabs value={selectedTab} onValueChange={setSelectedTab} className="w-full">
        <TabsList className="grid w-[200px] grid-cols-2 mx-auto mb-6">
          <TabsTrigger value="input">Input</TabsTrigger>
          <TabsTrigger value="output" disabled={!generatedCode}>Output</TabsTrigger>
        </TabsList>
        
        <TabsContent value="input">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Code className="mr-2 h-5 w-5 text-blue-500" />
                Code Assistant
              </CardTitle>
              <CardDescription>
                Generate code in various programming languages using AI
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <label className="text-sm font-medium mb-1 block">Programming Language</label>
                <Select value={language} onValueChange={setLanguage}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select language" />
                  </SelectTrigger>
                  <SelectContent>
                    {languages.map(lang => (
                      <SelectItem key={lang.value} value={lang.value}>
                        {lang.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              
              <div>
                <label className="text-sm font-medium mb-1 block">
                  What code would you like to generate?
                </label>
                <Textarea
                  placeholder="Describe the functionality you need in detail..."
                  rows={6}
                  value={prompt}
                  onChange={(e) => setPrompt(e.target.value)}
                  className="resize-none"
                />
              </div>
              
              <div>
                <label className="text-sm font-medium mb-1 block">
                  Context (Optional)
                </label>
                <Textarea
                  placeholder="Provide any relevant context, existing code, or specific requirements..."
                  rows={6}
                  value={context}
                  onChange={(e) => setContext(e.target.value)}
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
                {loading ? 'Generating...' : 'Generate Code'}
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>
        
        <TabsContent value="output">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Code className="mr-2 h-5 w-5 text-green-500" />
                Generated Code
              </CardTitle>
              <CardDescription>
                Your AI-generated code is ready to use
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="bg-slate-900 text-slate-50 p-4 rounded-md min-h-[300px] whitespace-pre-wrap overflow-auto font-mono text-sm">
                {generatedCode}
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

export default CodeAssistantTool;
