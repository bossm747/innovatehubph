
import { useState } from 'react';
import { useToast } from "@/components/ui/use-toast"; 
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Progress } from "@/components/ui/progress";
import { FirecrawlService } from '@/utils/FirecrawlService';
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardFooter, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ImageIcon, CodeIcon, LayoutIcon, LinkIcon, PaletteIcon } from "lucide-react";

interface CrawlResult {
  success: boolean;
  status?: string;
  completed?: number;
  total?: number;
  creditsUsed?: number;
  expiresAt?: string;
  data?: any;
}

export const CrawlForm = () => {
  const { toast } = useToast();
  const [url, setUrl] = useState('https://innovatehub.ph');
  const [apiKey, setApiKey] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [crawlResult, setCrawlResult] = useState<CrawlResult | null>(null);
  const [activeTab, setActiveTab] = useState('overview');

  const handleSetApiKey = async () => {
    if (!apiKey.trim()) {
      toast({
        title: "Error",
        description: "Please enter a valid API key",
        variant: "destructive",
      });
      return;
    }

    try {
      const isValid = await FirecrawlService.testApiKey(apiKey);
      if (isValid) {
        FirecrawlService.saveApiKey(apiKey);
        toast({
          title: "Success",
          description: "API key saved successfully",
        });
      } else {
        toast({
          title: "Error",
          description: "Invalid API key",
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
        toast({
          title: "Error",
          description: "Please set your API key first",
          variant: "destructive",
        });
        setIsLoading(false);
        return;
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

  const extractImagesFromResult = () => {
    if (!crawlResult?.data?.pages) return [];
    
    const images: string[] = [];
    crawlResult.data.pages.forEach((page: any) => {
      if (page.images && Array.isArray(page.images)) {
        page.images.forEach((img: string) => {
          if (!images.includes(img)) {
            images.push(img);
          }
        });
      }
    });
    
    return images;
  };

  const extractColorsFromResult = () => {
    if (!crawlResult?.data?.pages) return [];
    
    const colors = new Set<string>();
    crawlResult.data.pages.forEach((page: any) => {
      if (page.styles) {
        // Extract color properties from CSS
        const colorRegex = /#[0-9A-Fa-f]{3,8}|rgba?\([^)]+\)|hsla?\([^)]+\)/g;
        const matches = page.styles.match(colorRegex);
        if (matches) {
          matches.forEach((color: string) => colors.add(color));
        }
      }
    });
    
    return Array.from(colors);
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
          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 items-end">
              <div className="md:col-span-3 space-y-2">
                <label htmlFor="apiKey" className="text-sm font-medium text-gray-700">
                  Firecrawl API Key
                </label>
                <Input
                  id="apiKey"
                  type="password"
                  value={apiKey}
                  onChange={(e) => setApiKey(e.target.value)}
                  placeholder="Enter your Firecrawl API key"
                  className="transition-all duration-200"
                />
              </div>
              <Button 
                onClick={handleSetApiKey}
                className="bg-innovate-600 hover:bg-innovate-700 text-white"
              >
                Save API Key
              </Button>
            </div>
          </div>
          
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <label htmlFor="url" className="text-sm font-medium text-gray-700">
                Website URL
              </label>
              <Input
                id="url"
                type="url"
                value={url}
                onChange={(e) => setUrl(e.target.value)}
                className="transition-all duration-200"
                placeholder="https://innovatehub.ph"
                required
              />
            </div>
            
            {isLoading && (
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>Crawling website...</span>
                  <span>{progress}%</span>
                </div>
                <Progress value={progress} className="w-full" />
              </div>
            )}
            
            <Button
              type="submit"
              disabled={isLoading}
              className="w-full bg-innovate-600 hover:bg-innovate-700 text-white transition-all duration-200"
            >
              {isLoading ? "Crawling..." : "Analyze Website"}
            </Button>
          </form>
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
            <Tabs value={activeTab} onValueChange={setActiveTab}>
              <TabsList className="grid grid-cols-5 mb-6">
                <TabsTrigger value="overview" className="flex items-center gap-2">
                  <LayoutIcon className="h-4 w-4" />
                  <span className="hidden sm:inline">Overview</span>
                </TabsTrigger>
                <TabsTrigger value="images" className="flex items-center gap-2">
                  <ImageIcon className="h-4 w-4" />
                  <span className="hidden sm:inline">Images</span>
                </TabsTrigger>
                <TabsTrigger value="colors" className="flex items-center gap-2">
                  <PaletteIcon className="h-4 w-4" />
                  <span className="hidden sm:inline">Colors</span>
                </TabsTrigger>
                <TabsTrigger value="links" className="flex items-center gap-2">
                  <LinkIcon className="h-4 w-4" />
                  <span className="hidden sm:inline">Structure</span>
                </TabsTrigger>
                <TabsTrigger value="code" className="flex items-center gap-2">
                  <CodeIcon className="h-4 w-4" />
                  <span className="hidden sm:inline">Code</span>
                </TabsTrigger>
              </TabsList>
              
              <TabsContent value="overview" className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <Card>
                    <CardHeader className="pb-2">
                      <CardTitle className="text-base">Pages Crawled</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-3xl font-bold text-innovate-700">
                        {crawlResult.data?.pages?.length || 0}
                      </p>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardHeader className="pb-2">
                      <CardTitle className="text-base">Images Found</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-3xl font-bold text-innovate-700">
                        {extractImagesFromResult().length}
                      </p>
                    </CardContent>
                  </Card>
                </div>
                
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-base">Pages</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-1 max-h-60 overflow-y-auto">
                      {crawlResult.data?.pages?.map((page: any, index: number) => (
                        <li key={index} className="text-sm truncate hover:text-innovate-700">
                          {page.url}
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              </TabsContent>
              
              <TabsContent value="images" className="space-y-4">
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                  {extractImagesFromResult().map((image, index) => (
                    <div key={index} className="aspect-square overflow-hidden rounded-md border bg-muted">
                      <img 
                        src={image} 
                        alt={`Image ${index}`} 
                        className="h-full w-full object-cover object-center hover:scale-110 transition-transform duration-300"
                        onError={(e) => {
                          (e.target as HTMLImageElement).src = 'public/placeholder.svg';
                        }}
                      />
                    </div>
                  ))}
                </div>
              </TabsContent>
              
              <TabsContent value="colors" className="space-y-4">
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                  {extractColorsFromResult().map((color, index) => (
                    <div key={index} className="aspect-square rounded-md border overflow-hidden">
                      <div 
                        className="h-3/4 w-full" 
                        style={{ backgroundColor: color }}
                      ></div>
                      <div className="p-2 text-xs font-mono">{color}</div>
                    </div>
                  ))}
                </div>
              </TabsContent>
              
              <TabsContent value="links" className="space-y-4">
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-base">Site Structure</CardTitle>
                  </CardHeader>
                  <CardContent className="max-h-96 overflow-y-auto">
                    <ul className="space-y-2">
                      {crawlResult.data?.pages?.map((page: any, index: number) => (
                        <li key={index}>
                          <p className="font-medium text-innovate-700">{page.url}</p>
                          {page.links && (
                            <ul className="ml-5 mt-1 space-y-1">
                              {page.links.map((link: string, linkIndex: number) => (
                                <li key={linkIndex} className="text-sm text-gray-600 truncate">
                                  {link}
                                </li>
                              ))}
                            </ul>
                          )}
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              </TabsContent>
              
              <TabsContent value="code" className="space-y-4">
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-base">HTML & CSS Samples</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="max-h-96 overflow-y-auto rounded-md bg-gray-900 p-4 text-white font-mono text-sm">
                      <pre>{crawlResult.data?.pages?.[0]?.html || "No HTML data available"}</pre>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </CardContent>
          <CardFooter className="text-sm text-gray-500">
            Data captured at {new Date().toLocaleString()}
          </CardFooter>
        </Card>
      )}
    </div>
  );
};
