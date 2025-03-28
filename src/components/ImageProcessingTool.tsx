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

interface ProcessingResult {
  imageUrl: string;
  timestamp: Date;
  operation: ImageProcessingOperation;
  prompt?: string;
}

const ImageProcessingTool: React.FC = () => {
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState<ImageProcessingOperation>('generate');
  const [prompt, setPrompt] = useState('');
  const [provider, setProvider] = useState<'openai' | 'replicate' | 'huggingface'>('openai');
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [processing, setProcessing] = useState(false);
  const [progress, setProgress] = useState(0);
  const [results, setResults] = useState<ProcessingResult[]>([]);
  const fileInputRef = useRef<HTMLInputElement>(null);
  
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
          provider
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
            prompt: activeTab === 'generate' ? prompt : undefined
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
      <Card className="mb-8">
        <CardHeader>
          <CardTitle>AI Image Processing</CardTitle>
          <CardDescription>
            Generate new images or process existing ones using AI
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs value={activeTab} onValueChange={(value) => setActiveTab(value as ImageProcessingOperation)}>
            <TabsList className="grid grid-cols-3 mb-8">
              <TabsTrigger value="generate" disabled={processing}>
                <ImagePlus className="w-4 h-4 mr-2" />
                Generate
              </TabsTrigger>
              <TabsTrigger value="enhance" disabled={processing}>
                <Wand2 className="w-4 h-4 mr-2" />
                Enhance
              </TabsTrigger>
              <TabsTrigger value="background-removal" disabled={processing}>
                <Eraser className="w-4 h-4 mr-2" />
                Remove Background
              </TabsTrigger>
            </TabsList>
            
            <TabsContent value="generate" className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-1">Provider</label>
                <Select value={provider} onValueChange={(value) => setProvider(value as any)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select provider" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="openai">OpenAI DALL-E</SelectItem>
                    <SelectItem value="replicate">Replicate</SelectItem>
                    <SelectItem value="huggingface">HuggingFace</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div>
                <label className="block text-sm font-medium mb-1">Image Prompt</label>
                <Textarea
                  placeholder="Describe the image you want to generate..."
                  value={prompt}
                  onChange={(e) => setPrompt(e.target.value)}
                  rows={4}
                  disabled={processing}
                />
              </div>
            </TabsContent>
            
            <TabsContent value="enhance" className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-1">Upload Image</label>
                <div className="flex items-center gap-2">
                  <Input
                    ref={fileInputRef}
                    type="file"
                    onChange={handleFileChange}
                    accept="image/*"
                    disabled={processing}
                  />
                  <Button variant="outline" onClick={() => fileInputRef.current?.click()}>
                    <Upload className="w-4 h-4 mr-2" />
                    Browse
                  </Button>
                </div>
              </div>
              
              {selectedFile && (
                <div className="mt-4">
                  <p className="text-sm mb-2">Selected file: {selectedFile.name}</p>
                  <div className="relative aspect-video max-h-[300px] overflow-hidden rounded-md border">
                    <img
                      src={URL.createObjectURL(selectedFile)}
                      alt="Preview"
                      className="object-contain w-full h-full"
                    />
                  </div>
                </div>
              )}
            </TabsContent>
            
            <TabsContent value="background-removal" className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-1">Upload Image</label>
                <div className="flex items-center gap-2">
                  <Input
                    ref={fileInputRef}
                    type="file"
                    onChange={handleFileChange}
                    accept="image/*"
                    disabled={processing}
                  />
                  <Button variant="outline" onClick={() => fileInputRef.current?.click()}>
                    <Upload className="w-4 h-4 mr-2" />
                    Browse
                  </Button>
                </div>
              </div>
              
              {selectedFile && (
                <div className="mt-4">
                  <p className="text-sm mb-2">Selected file: {selectedFile.name}</p>
                  <div className="relative aspect-video max-h-[300px] overflow-hidden rounded-md border">
                    <img
                      src={URL.createObjectURL(selectedFile)}
                      alt="Preview"
                      className="object-contain w-full h-full"
                    />
                  </div>
                </div>
              )}
              
              <p className="text-sm text-muted-foreground">
                Background removal processes the image in your browser using machine learning.
              </p>
            </TabsContent>
            
            {processing && (
              <div className="mt-4">
                <Progress value={progress} className="h-2" />
                <p className="text-sm text-center mt-2">Processing... Please wait</p>
              </div>
            )}
          </Tabs>
        </CardContent>
        <CardFooter className="flex justify-between">
          <Button variant="outline" onClick={handleReset} disabled={processing}>
            <Trash2 className="w-4 h-4 mr-2" />
            Reset
          </Button>
          <Button onClick={handleProcess} disabled={processing}>
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
        <Card>
          <CardHeader>
            <CardTitle>Results</CardTitle>
            <CardDescription>
              Your processed images will appear here
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {results.map((result, index) => (
                <Card key={index} className="overflow-hidden">
                  <div className="relative aspect-video overflow-hidden">
                    <img 
                      src={result.imageUrl} 
                      alt={`Result ${index}`}
                      className="object-cover w-full h-full"
                    />
                  </div>
                  <CardContent className="p-4">
                    <p className="font-medium">{result.operation}</p>
                    {result.prompt && (
                      <p className="text-sm text-muted-foreground line-clamp-2 mt-1">
                        {result.prompt}
                      </p>
                    )}
                    <p className="text-xs text-muted-foreground mt-2">
                      {result.timestamp.toLocaleString()}
                    </p>
                  </CardContent>
                  <CardFooter className="p-2 border-t">
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      className="ml-auto"
                      onClick={() => handleDownload(result.imageUrl, result.operation)}
                    >
                      <Download className="w-4 h-4 mr-2" />
                      Download
                    </Button>
                  </CardFooter>
                </Card>
              ))}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default ImageProcessingTool;
