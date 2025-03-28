
import React, { useState, useRef } from 'react';
import { useToast } from '@/hooks/use-toast';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { ImageProcessingOperation, processImage } from '@/services/imageProcessingService';
import { Loader2, Upload, Download, Trash2, Wand2, Paintbrush, ImagePlus, Eraser } from 'lucide-react';
import { Progress } from '@/components/ui/progress';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';

interface ProcessingResult {
  imageUrl: string;
  timestamp: Date;
  operation: ImageProcessingOperation;
  prompt?: string;
  provider?: string;
  model?: string;
}

const ImageProcessingTool: React.FC = () => {
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState<ImageProcessingOperation>('generate');
  const [prompt, setPrompt] = useState('');
  const [provider, setProvider] = useState<'openai' | 'replicate' | 'huggingface'>('openai');
  const [selectedModel, setSelectedModel] = useState('');
  const [selectedSize, setSelectedSize] = useState<string>('1024x1024');
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [processing, setProcessing] = useState(false);
  const [progress, setProgress] = useState(0);
  const [results, setResults] = useState<ProcessingResult[]>([]);
  const fileInputRef = useRef<HTMLInputElement>(null);
  
  const providerModels = {
    openai: [
      { id: 'dall-e-3', name: 'DALL-E 3' }
    ],
    replicate: [
      { id: 'stability-ai/sdxl', name: 'Stability AI SDXL' },
      { id: 'stability-ai/stable-diffusion', name: 'Stable Diffusion 2.1' },
      { id: 'tstramer/midjourney-diffusion', name: 'Midjourney Style' },
      { id: 'black-forest-labs/flux-schnell', name: 'FLUX Schnell (Fast)' }
    ],
    huggingface: [
      { id: 'stabilityai/stable-diffusion-xl-base-1.0', name: 'Stable Diffusion XL' },
      { id: 'runwayml/stable-diffusion-v1-5', name: 'Stable Diffusion 1.5' },
      { id: 'prompthero/openjourney', name: 'OpenJourney' },
      { id: 'black-forest-labs/FLUX.1-schnell', name: 'FLUX.1 Schnell' }
    ]
  };
  
  // Set default model when provider changes
  React.useEffect(() => {
    if (providerModels[provider] && providerModels[provider].length > 0) {
      setSelectedModel(providerModels[provider][0].id);
    }
  }, [provider]);
  
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setSelectedFile(e.target.files[0]);
    }
  };
  
  const handleProcess = async () => {
    try {
      setProcessing(true);
      setProgress(10);
      
      let result: string = '';
      
      if (activeTab === 'generate') {
        if (!prompt.trim()) {
          toast({
            title: "Error",
            description: "Please enter a prompt for image generation",
            variant: "destructive",
          });
          setProcessing(false);
          return;
        }
        
        setProgress(30);
        result = await processImage({
          operation: 'generate',
          prompt,
          provider,
          model: selectedModel,
          size: selectedSize
        });
      } else if (activeTab === 'enhance' || activeTab === 'background-removal') {
        if (!selectedFile) {
          toast({
            title: "Error",
            description: "Please select an image file",
            variant: "destructive",
          });
          setProcessing(false);
          return;
        }
        
        setProgress(50);
        result = await processImage({
          operation: activeTab,
          image: selectedFile,
          provider
        });
      }
      
      setProgress(100);
      
      if (result) {
        setResults(prev => [
          {
            imageUrl: result,
            timestamp: new Date(),
            operation: activeTab,
            prompt: activeTab === 'generate' ? prompt : undefined,
            provider: activeTab === 'generate' ? provider : undefined,
            model: activeTab === 'generate' ? selectedModel : undefined
          },
          ...prev
        ]);
        
        toast({
          title: "Success",
          description: `Image ${activeTab === 'generate' ? 'generated' : 'processed'} successfully`,
        });
      }
    } catch (error) {
      console.error(`Error processing image:`, error);
      toast({
        title: "Error",
        description: error instanceof Error ? error.message : "Failed to process image",
        variant: "destructive",
      });
    } finally {
      setProcessing(false);
    }
  };
  
  const handleReset = () => {
    setSelectedFile(null);
    setPrompt('');
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };
  
  const handleDownload = (imageUrl: string, operation: string) => {
    const link = document.createElement('a');
    link.href = imageUrl;
    link.download = `${operation}-${new Date().getTime()}.png`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };
  
  return (
    <div className="container mx-auto py-8">
      <Card className="mb-8 border-none shadow-md">
        <CardHeader className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-t-lg">
          <CardTitle className="text-xl font-bold flex items-center">
            <Wand2 className="w-5 h-5 mr-2 text-blue-500" />
            AI Image Processing
          </CardTitle>
          <CardDescription>
            Generate new images or process existing ones using advanced AI models
          </CardDescription>
        </CardHeader>
        <CardContent className="pt-6">
          <Tabs value={activeTab} onValueChange={(value) => setActiveTab(value as ImageProcessingOperation)}>
            <TabsList className="grid grid-cols-3 mb-8 w-full">
              <TabsTrigger value="generate" disabled={processing} className="px-4 py-2.5">
                <ImagePlus className="w-4 h-4 mr-2" />
                Generate
              </TabsTrigger>
              <TabsTrigger value="enhance" disabled={processing} className="px-4 py-2.5">
                <Wand2 className="w-4 h-4 mr-2" />
                Enhance
              </TabsTrigger>
              <TabsTrigger value="background-removal" disabled={processing} className="px-4 py-2.5">
                <Eraser className="w-4 h-4 mr-2" />
                Remove Background
              </TabsTrigger>
            </TabsList>
            
            <TabsContent value="generate" className="space-y-6 pt-2">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="block text-sm font-medium mb-1">AI Provider</label>
                  <Select value={provider} onValueChange={(value) => setProvider(value as any)}>
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Select provider" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="openai">OpenAI DALL-E</SelectItem>
                      <SelectItem value="replicate">Replicate</SelectItem>
                      <SelectItem value="huggingface">HuggingFace</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="space-y-2">
                  <label className="block text-sm font-medium mb-1">AI Model</label>
                  <Select 
                    value={selectedModel} 
                    onValueChange={setSelectedModel}
                    disabled={!providerModels[provider] || providerModels[provider].length === 0}
                  >
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Select model" />
                    </SelectTrigger>
                    <SelectContent>
                      {providerModels[provider]?.map(model => (
                        <SelectItem key={model.id} value={model.id}>
                          {model.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
              
              {provider === 'openai' && (
                <div className="space-y-2">
                  <label className="block text-sm font-medium mb-1">Image Size</label>
                  <Select value={selectedSize} onValueChange={setSelectedSize}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select size" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="1024x1024">1024x1024 (Square)</SelectItem>
                      <SelectItem value="1792x1024">1792x1024 (Landscape)</SelectItem>
                      <SelectItem value="1024x1792">1024x1792 (Portrait)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              )}
              
              <div className="space-y-2">
                <label className="block text-sm font-medium mb-1">Image Prompt</label>
                <Textarea
                  placeholder="Describe the image you want to generate in detail..."
                  value={prompt}
                  onChange={(e) => setPrompt(e.target.value)}
                  rows={4}
                  disabled={processing}
                  className="resize-none focus:ring-2 focus:ring-blue-500"
                />
                <p className="text-xs text-muted-foreground">
                  Be specific and detailed for best results. Include style, setting, colors, and mood.
                </p>
              </div>
            </TabsContent>
            
            <TabsContent value="enhance" className="space-y-4 pt-2">
              <div className="space-y-2">
                <label className="block text-sm font-medium mb-1">Upload Image to Enhance</label>
                <div className="flex items-center gap-2">
                  <Input
                    ref={fileInputRef}
                    type="file"
                    onChange={handleFileChange}
                    accept="image/*"
                    disabled={processing}
                    className="file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
                  />
                  <Button variant="outline" onClick={() => fileInputRef.current?.click()}>
                    <Upload className="w-4 h-4 mr-2" />
                    Browse
                  </Button>
                </div>
              </div>
              
              {selectedFile && (
                <div className="mt-4">
                  <p className="text-sm mb-2 font-medium">Selected file: {selectedFile.name}</p>
                  <div className="relative aspect-video max-h-[300px] overflow-hidden rounded-md border bg-black/5">
                    <img
                      src={URL.createObjectURL(selectedFile)}
                      alt="Preview"
                      className="object-contain w-full h-full"
                    />
                  </div>
                </div>
              )}
            </TabsContent>
            
            <TabsContent value="background-removal" className="space-y-4 pt-2">
              <div className="space-y-2">
                <label className="block text-sm font-medium mb-1">Upload Image for Background Removal</label>
                <div className="flex items-center gap-2">
                  <Input
                    ref={fileInputRef}
                    type="file"
                    onChange={handleFileChange}
                    accept="image/*"
                    disabled={processing}
                    className="file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
                  />
                  <Button variant="outline" onClick={() => fileInputRef.current?.click()}>
                    <Upload className="w-4 h-4 mr-2" />
                    Browse
                  </Button>
                </div>
              </div>
              
              {selectedFile && (
                <div className="mt-4">
                  <p className="text-sm mb-2 font-medium">Selected file: {selectedFile.name}</p>
                  <div className="relative aspect-video max-h-[300px] overflow-hidden rounded-md border bg-black/5">
                    <img
                      src={URL.createObjectURL(selectedFile)}
                      alt="Preview"
                      className="object-contain w-full h-full"
                    />
                  </div>
                </div>
              )}
              
              <div className="bg-blue-50 p-3 rounded-md">
                <p className="text-sm text-blue-700">
                  Background removal processes the image in your browser using machine learning.
                  The result will have a transparent background.
                </p>
              </div>
            </TabsContent>
            
            {processing && (
              <div className="mt-6 px-1">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium">
                    {activeTab === 'generate' ? 'Generating image...' : 'Processing image...'}
                  </span>
                  <span className="text-sm">{progress}%</span>
                </div>
                <Progress value={progress} className="h-2" />
                <p className="text-xs text-center mt-2 text-muted-foreground">
                  This may take a few moments depending on complexity
                </p>
              </div>
            )}
          </Tabs>
        </CardContent>
        <CardFooter className="flex justify-between border-t bg-gray-50 rounded-b-lg px-6 py-4">
          <Button variant="outline" onClick={handleReset} disabled={processing}>
            <Trash2 className="w-4 h-4 mr-2" />
            Reset
          </Button>
          <Button 
            onClick={handleProcess} 
            disabled={processing || (activeTab === 'generate' && !prompt.trim()) || ((activeTab === 'enhance' || activeTab === 'background-removal') && !selectedFile)}
            className="bg-blue-600 hover:bg-blue-700"
          >
            {processing ? (
              <>
                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                Processing...
              </>
            ) : (
              <>
                <Paintbrush className="w-4 h-4 mr-2" />
                {activeTab === 'generate' ? 'Generate' : 'Process'} Image
              </>
            )}
          </Button>
        </CardFooter>
      </Card>
      
      {results.length > 0 && (
        <Card className="border-none shadow-md">
          <CardHeader className="bg-gradient-to-r from-indigo-50 to-purple-50 rounded-t-lg">
            <CardTitle className="text-xl font-bold">Results</CardTitle>
            <CardDescription>
              Your processed images will appear here
            </CardDescription>
          </CardHeader>
          <CardContent className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-6">
            {results.map((result, index) => (
              <Card key={index} className="overflow-hidden border shadow-sm hover:shadow-md transition-shadow">
                <div className="relative aspect-square bg-black/5 overflow-hidden">
                  <img 
                    src={result.imageUrl} 
                    alt={`Result ${index}`}
                    className="object-cover w-full h-full"
                  />
                </div>
                <CardContent className="p-4">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="font-medium capitalize">{result.operation}</h3>
                    {result.provider && (
                      <span className="text-xs bg-blue-100 text-blue-800 py-1 px-2 rounded">
                        {result.provider}
                      </span>
                    )}
                  </div>
                  {result.prompt && (
                    <p className="text-sm text-muted-foreground line-clamp-2 mt-1">
                      {result.prompt}
                    </p>
                  )}
                  {result.model && (
                    <p className="text-xs text-muted-foreground mt-1">
                      Model: {result.model}
                    </p>
                  )}
                  <p className="text-xs text-muted-foreground mt-2">
                    {result.timestamp.toLocaleString()}
                  </p>
                </CardContent>
                <div className="p-3 border-t">
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    className="w-full"
                    onClick={() => handleDownload(result.imageUrl, result.operation)}
                  >
                    <Download className="w-4 h-4 mr-2" />
                    Download
                  </Button>
                </div>
              </Card>
            ))}
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default ImageProcessingTool;
