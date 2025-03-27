
import { useState, useEffect } from 'react';
import { useToast } from "@/hooks/use-toast";
import { FirecrawlService } from '@/utils/FirecrawlService';
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardFooter, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import { APIKeyInput } from './website-analyzer/APIKeyInput';
import { URLForm } from './website-analyzer/URLForm';
import { ResultsTabs } from './website-analyzer/ResultsTabs';
import { extractImagesFromResult, extractColorsFromResult } from './website-analyzer/dataUtils';

interface CrawlFormProps {
  initialApiKey?: string;
}

interface CrawlResult {
  success: boolean;
  status?: string;
  completed?: number;
  total?: number;
  creditsUsed?: number;
  expiresAt?: string;
  data?: any;
}

export const CrawlForm = ({ initialApiKey }: CrawlFormProps) => {
  const { toast } = useToast();
  const [url, setUrl] = useState('https://innovatehub.ph');
  const [apiKey, setApiKey] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [crawlResult, setCrawlResult] = useState<CrawlResult | null>(null);
  const [activeTab, setActiveTab] = useState('overview');

  useEffect(() => {
    const savedKey = FirecrawlService.getApiKey();
    if (initialApiKey) {
      setApiKey(initialApiKey);
      if (!savedKey) {
        handleSetApiKey(initialApiKey);
      }
    } else if (savedKey) {
      setApiKey(savedKey);
    }
  }, [initialApiKey]);

  const handleSetApiKey = async (keyToSet: string = apiKey) => {
    if (!keyToSet.trim()) {
      toast({
        title: "Error",
        description: "Please enter a valid API key",
        variant: "destructive",
      });
      return;
    }

    try {
      const isValid = await FirecrawlService.testApiKey(keyToSet);
      if (isValid) {
        FirecrawlService.saveApiKey(keyToSet);
        toast({
          title: "Success",
          description: "API key saved successfully",
        });
      } else {
        toast({
          title: "Error",
          description: "Invalid API key or API service is unavailable",
          variant: "destructive",
        });
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to validate API key",
        variant: "destructive",
      });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setProgress(10);
    setCrawlResult(null);
    
    try {
      const savedApiKey = FirecrawlService.getApiKey();
      if (!savedApiKey) {
        await handleSetApiKey();
        if (!FirecrawlService.getApiKey()) {
          setIsLoading(false);
          return;
        }
      }

      console.log('Starting crawl for URL:', url);
      setProgress(30);
      
      const result = await FirecrawlService.crawlWebsite(url);
      setProgress(90);
      
      if (result.success) {
        toast({
          title: "Success",
          description: "Website crawled successfully",
        });
        setCrawlResult({
          success: true,
          data: result.data
        });
      } else {
        toast({
          title: "Error",
          description: result.error || "Failed to crawl website",
          variant: "destructive",
        });
      }
    } catch (error) {
      console.error('Error crawling website:', error);
      toast({
        title: "Error",
        description: "Failed to crawl website",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
      setProgress(100);
    }
  };

  return (
    <div className="w-full max-w-4xl mx-auto p-6 space-y-8">
      <Card>
        <CardHeader>
          <CardTitle className="text-innovate-700">InnovateHub Website Analyzer</CardTitle>
          <CardDescription>
            Crawl the innovatehub.ph website to analyze its design, structure, and graphics
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <APIKeyInput apiKey={apiKey} setApiKey={setApiKey} />
          
          <URLForm 
            url={url}
            setUrl={setUrl}
            isLoading={isLoading}
            progress={progress}
            onSubmit={handleSubmit}
          />
        </CardContent>
      </Card>

      {crawlResult && crawlResult.success && (
        <Card>
          <CardHeader>
            <CardTitle className="text-innovate-700">Analysis Results</CardTitle>
            <CardDescription>
              Details gathered from crawling {url}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ResultsTabs 
              crawlResult={crawlResult} 
              activeTab={activeTab}
              setActiveTab={setActiveTab}
              extractImagesFromResult={() => extractImagesFromResult(crawlResult)}
              extractColorsFromResult={() => extractColorsFromResult(crawlResult)}
            />
          </CardContent>
          <CardFooter className="text-sm text-gray-500">
            Data captured at {new Date().toLocaleString()}
          </CardFooter>
        </Card>
      )}
    </div>
  );
};
