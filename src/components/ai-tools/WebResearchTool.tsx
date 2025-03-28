
import React, { useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useToast } from '@/hooks/use-toast';
import { Search, Loader2, ExternalLink, Copy, Download } from 'lucide-react';
import { Badge } from "@/components/ui/badge";

type SearchResult = {
  title: string;
  url: string;
  content: string;
  score: number;
};

const WebResearchTool = () => {
  const { toast } = useToast();
  const [query, setQuery] = useState('');
  const [searchDepth, setSearchDepth] = useState('basic');
  const [isSearching, setIsSearching] = useState(false);
  const [answer, setAnswer] = useState('');
  const [results, setResults] = useState<SearchResult[]>([]);
  
  const handleSearch = async () => {
    if (!query.trim()) {
      toast({
        title: 'Input Required',
        description: 'Please enter a search query.',
        variant: 'destructive',
      });
      return;
    }
    
    setIsSearching(true);
    setAnswer('');
    setResults([]);
    
    try {
      const { data, error } = await supabase.functions.invoke('web-research', {
        body: {
          query,
          searchDepth,
        },
      });
      
      if (error) throw error;
      
      if (data.answer) {
        setAnswer(data.answer);
      }
      
      if (data.results) {
        setResults(data.results);
      }
      
      toast({
        title: 'Research Complete',
        description: 'Your web research results are ready.',
      });
    } catch (error) {
      console.error('Error performing research:', error);
      toast({
        title: 'Research Failed',
        description: error.message || 'An error occurred during web research.',
        variant: 'destructive',
      });
    } finally {
      setIsSearching(false);
    }
  };
  
  const handleCopyAnswer = () => {
    navigator.clipboard.writeText(answer);
    toast({
      title: 'Copied!',
      description: 'Answer copied to clipboard.',
    });
  };
  
  const handleDownloadResults = () => {
    // Create a formatted string with the results
    let content = `Web Research Results for: "${query}"\n\n`;
    
    if (answer) {
      content += `AI-Generated Answer:\n${answer}\n\n`;
    }
    
    content += `Sources:\n`;
    results.forEach((result, index) => {
      content += `\n[${index + 1}] ${result.title}\n`;
      content += `URL: ${result.url}\n`;
      content += `Excerpt: ${result.content}\n`;
    });
    
    const element = document.createElement('a');
    const file = new Blob([content], { type: 'text/plain' });
    element.href = URL.createObjectURL(file);
    element.download = `research-${query.slice(0, 20).replace(/\s+/g, '-')}-${new Date().toISOString().slice(0, 10)}.txt`;
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  };
  
  return (
    <div className="container py-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Search className="mr-2 h-5 w-5 text-blue-500" />
            Web Research Tool
          </CardTitle>
          <CardDescription>
            Research topics across the web and get summarized results with sources
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-grow">
              <Input
                placeholder="Enter your research query..."
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                className="w-full"
              />
            </div>
            
            <div className="w-full md:w-[200px]">
              <Select value={searchDepth} onValueChange={setSearchDepth}>
                <SelectTrigger>
                  <SelectValue placeholder="Search depth" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="basic">Basic Search</SelectItem>
                  <SelectItem value="advanced">Detailed Search</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <Button 
              onClick={handleSearch} 
              disabled={isSearching || !query.trim()}
              className="w-full md:w-auto"
            >
              {isSearching && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              {isSearching ? 'Researching...' : 'Research'}
            </Button>
          </div>
          
          {isSearching && (
            <div className="flex justify-center items-center py-10">
              <div className="text-center">
                <Loader2 className="h-10 w-10 mb-4 animate-spin mx-auto text-blue-500" />
                <h3 className="text-lg font-medium mb-1">Researching the web...</h3>
                <p className="text-sm text-gray-500">This may take up to a minute for detailed searches.</p>
              </div>
            </div>
          )}
          
          {answer && (
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <h3 className="font-medium text-lg">Summary</h3>
                <Button 
                  variant="ghost" 
                  size="sm" 
                  onClick={handleCopyAnswer}
                  className="h-8 px-2"
                >
                  <Copy className="h-3 w-3 mr-1" />
                  Copy
                </Button>
              </div>
              <div className="bg-slate-50 p-4 rounded-md">
                <p className="whitespace-pre-line">{answer}</p>
              </div>
            </div>
          )}
          
          {results.length > 0 && (
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <h3 className="font-medium text-lg">
                  Sources
                  <Badge variant="outline" className="ml-2">
                    {results.length}
                  </Badge>
                </h3>
                <Button 
                  variant="outline" 
                  size="sm" 
                  onClick={handleDownloadResults}
                  className="h-8"
                >
                  <Download className="h-3 w-3 mr-1" />
                  Download All Results
                </Button>
              </div>
              
              <div className="space-y-4">
                {results.map((result, index) => (
                  <div key={index} className="border rounded-md p-4">
                    <div className="flex justify-between items-start mb-2">
                      <h4 className="font-medium text-blue-600 hover:underline line-clamp-1">
                        <a href={result.url} target="_blank" rel="noopener noreferrer">
                          {result.title}
                        </a>
                      </h4>
                      <a 
                        href={result.url} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="text-gray-500 hover:text-gray-700"
                      >
                        <ExternalLink className="h-4 w-4" />
                      </a>
                    </div>
                    <p className="text-sm text-gray-500 mb-2 truncate">{result.url}</p>
                    <p className="text-sm line-clamp-3">{result.content}</p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default WebResearchTool;
