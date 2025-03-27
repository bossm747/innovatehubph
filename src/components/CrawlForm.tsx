
import { useState, useEffect } from 'react';
import { useToast } from "@/hooks/use-toast";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { APIKeyInput } from './website-analyzer/APIKeyInput';
import { URLForm } from './website-analyzer/URLForm';
import { ResultsTabs } from './website-analyzer/ResultsTabs';
import { extractImagesFromHtml, extractColorsFromCss, extractLinksFromHtml } from './website-analyzer/dataUtils';

interface CrawlFormProps {
  initialApiKey?: string;
}

interface WebsiteData {
  url: string;
  html: string;
  css: string;
  timestamp: string;
}

export const CrawlForm = ({ initialApiKey }: CrawlFormProps) => {
  const { toast } = useToast();
  const [url, setUrl] = useState('https://example.com');
  const [apiKey, setApiKey] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [activeTab, setActiveTab] = useState('overview');
  
  // Website data state
  const [websiteData, setWebsiteData] = useState<WebsiteData | null>(null);
  
  // Derived data
  const [images, setImages] = useState<string[]>([]);
  const [colors, setColors] = useState<string[]>([]);
  const [pages, setPages] = useState<any[]>([]);

  useEffect(() => {
    // Load API key from local storage
    const savedKey = localStorage.getItem('api_key');
    if (initialApiKey) {
      setApiKey(initialApiKey);
      if (!savedKey) {
        localStorage.setItem('api_key', initialApiKey);
      }
    } else if (savedKey) {
      setApiKey(savedKey);
    }
    
    // Load previously stored website data if exists
    const storedData = localStorage.getItem('website_data');
    if (storedData) {
      try {
        const parsedData = JSON.parse(storedData) as WebsiteData;
        setWebsiteData(parsedData);
        processWebsiteData(parsedData);
      } catch (error) {
        console.error('Error parsing stored website data:', error);
      }
    }
  }, [initialApiKey]);
  
  const processWebsiteData = (data: WebsiteData) => {
    // Extract images from HTML
    const extractedImages = extractImagesFromHtml(data.html);
    setImages(extractedImages);
    
    // Extract colors from CSS
    const extractedColors = extractColorsFromCss(data.css);
    setColors(extractedColors);
    
    // Extract links from HTML
    const links = extractLinksFromHtml(data.html);
    
    // Create a mock page structure
    setPages([{
      url: data.url,
      links: links
    }]);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setProgress(10);
    
    // Check if we already have this URL cached
    const storedData = localStorage.getItem('website_data');
    if (storedData) {
      try {
        const parsedData = JSON.parse(storedData) as WebsiteData;
        if (parsedData.url === url) {
          setWebsiteData(parsedData);
          processWebsiteData(parsedData);
          setIsLoading(false);
          setProgress(100);
          toast({
            title: "Success",
            description: "Using cached website data",
          });
          return;
        }
      } catch (error) {
        console.error('Error parsing stored website data:', error);
      }
    }
    
    try {
      setProgress(30);
      
      // Mock fetch website data (in a real app, this would be an API call)
      const mockHtml = `
        <html>
          <head><title>Example Page</title></head>
          <body>
            <h1>Example Website</h1>
            <p>This is a sample website content.</p>
            <img src="https://example.com/image1.jpg" alt="Example image 1">
            <img src="https://example.com/image2.jpg" alt="Example image 2">
            <a href="https://example.com/page1">Page 1</a>
            <a href="https://example.com/page2">Page 2</a>
          </body>
        </html>
      `;
      
      const mockCss = `
        body {
          font-family: Arial, sans-serif;
          color: #333333;
          background-color: #f5f5f5;
        }
        h1 {
          color: #0066cc;
        }
        .button {
          background-color: #00aa55;
          color: rgba(255, 255, 255, 0.9);
        }
      `;
      
      // Simulate network delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      setProgress(70);
      
      // Create website data object
      const data: WebsiteData = {
        url,
        html: mockHtml,
        css: mockCss,
        timestamp: new Date().toISOString()
      };
      
      // Save to local storage
      localStorage.setItem('website_data', JSON.stringify(data));
      
      setWebsiteData(data);
      processWebsiteData(data);
      
      setProgress(100);
      toast({
        title: "Success",
        description: "Website analyzed successfully",
      });
    } catch (error) {
      console.error('Error analyzing website:', error);
      toast({
        title: "Error",
        description: "Failed to analyze website",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="w-full max-w-4xl mx-auto p-6 space-y-8">
      <Card>
        <CardHeader>
          <CardTitle className="text-innovate-700">InnovateHub Website Analyzer</CardTitle>
          <CardDescription>
            Analyze website design, structure, and graphics
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

      {websiteData && (
        <Card>
          <CardHeader>
            <CardTitle className="text-innovate-700">Analysis Results</CardTitle>
            <CardDescription>
              Details gathered from analyzing {websiteData.url}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ResultsTabs 
              activeTab={activeTab}
              setActiveTab={setActiveTab}
              htmlContent={websiteData.html}
              cssContent={websiteData.css}
              images={images}
              colors={colors}
              pages={pages}
            />
          </CardContent>
          <CardFooter className="text-sm text-gray-500">
            Data captured at {new Date(websiteData.timestamp).toLocaleString()}
          </CardFooter>
        </Card>
      )}
    </div>
  );
};
