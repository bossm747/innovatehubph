
import React, { useState, useRef } from 'react';
import { useToast } from '@/hooks/use-toast';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { ImageProcessingOperation, processImage } from '@/services/imageProcessingService';
import { Loader2, Upload, Download, Trash2, Wand2, Paintbrush, ImagePlus, Eraser, Save } from 'lucide-react';
import { Progress } from '@/components/ui/progress';
import { Skeleton } from '@/components/ui/skeleton';
import { Badge } from '@/components/ui/badge';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { supabase } from '@/integrations/supabase/client';

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
  const [provider, setProvider] = useState<'openai' | 'replicate' | 'huggingface' | 'getimg'>('openai');
  const [selectedModel, setSelectedModel] = useState('');
  const [selectedSize, setSelectedSize] = useState<string>('1024x1024');
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [processing, setProcessing] = useState(false);
  const [progress, setProgress] = useState(0);
  const [results, setResults] = useState<ProcessingResult[]>([]);
  const [loadingResults, setLoadingResults] = useState(false);
  const [projectId, setProjectId] = useState<string | null>(null);
  const [projects, setProjects] = useState<any[]>([]);
  const [saveToProject, setSaveToProject] = useState(false);
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
    ],
    getimg: [
      { id: 'realistic-vision-v5.1', name: 'Realistic Vision 5.1' },
      { id: 'realistic-vision-v6.0', name: 'Realistic Vision 6.0' },
      { id: 'dreamshaper-8', name: 'DreamShaper 8' },
      { id: 'icbinp', name: 'ICBIN XL' },
      { id: 'juggernaut-xl', name: 'Juggernaut XL' },
      { id: 'openjourney-v4', name: 'OpenJourney v4' },
      { id: 'sdxl-base-1.0', name: 'SDXL Base 1.0' },
      { id: 'anime-v1', name: 'Anime V1' },
      { id: 'anything-v5', name: 'Anything V5' },
      { id: 'classic-anim', name: 'Classic Animation' }
    ]
  };
  
  // Set default model when provider changes
  React.useEffect(() => {
    if (providerModels[provider] && providerModels[provider].length > 0) {
      setSelectedModel(providerModels[provider][0].id);
    }
    
    // Fetch projects on component mount
    fetchProjects();
    // Fetch previous results
    fetchGeneratedImages();
  }, [provider]);
  
  const fetchProjects = async () => {
    try {
      const { data, error } = await supabase
        .from('ai_projects')
        .select('*')
        .order('created_at', { ascending: false });
        
      if (error) throw error;
      setProjects(data || []);
    } catch (error) {
      console.error('Error fetching projects:', error);
    }
  };
  
  const fetchGeneratedImages = async () => {
    try {
      setLoadingResults(true);
      const { data, error } = await supabase
        .from('ai_generated_files')
        .select('*')
        .eq('type', 'image')
        .order('created_at', { ascending: false })
        .limit(12);
        
      if (error) throw error;
      
      if (data && data.length > 0) {
        const images = await Promise.all(data.map(async (item) => {
          // Get public URL for each image
          const { data: storageData } = await supabase.storage
            .from('ai-generated')
            .getPublicUrl(item.storage_path);
            
          return {
            imageUrl: storageData.publicUrl,
            timestamp: new Date(item.created_at),
            operation: 'generate',
            prompt: item.prompt,
            provider: item.provider,
            model: item.model,
            id: item.id
          };
        }));
        
        setResults(images);
      }
    } catch (error) {
      console.error('Error fetching generated images:', error);
      toast({
        title: "Error",
        description: "Failed to load previous generations",
        variant: "destructive",
      });
    } finally {
      setLoadingResults(false);
    }
  };
  
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setSelectedFile(e.target.files[0]);
    }
  };
  
  const getContextualPromptSuggestions = () => {
    const suggestions = [
      "A digital art image showing InnovateHub's digital transformation services",
      "A professional photo of PlataPay mobile app being used by a Filipino entrepreneur",
      "A futuristic visualization of InnovateHub's AI solutions improving business processes",
      "A realistic render of PlataPay agents helping their community with digital payments",
      "An illustration of InnovateHub's journey from Batangas to Dubai expansion"
    ];
    
    return suggestions;
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
        
        // Call the Supabase Edge Function
        const { data, error } = await supabase.functions.invoke('generate-image', {
          body: { 
            prompt, 
            provider, 
            model: selectedModel,
            size: selectedSize
          },
        });
        
        if (error) throw error;
        result = data.image;
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
        const newResult = {
          imageUrl: result,
          timestamp: new Date(),
          operation: activeTab,
          prompt: activeTab === 'generate' ? prompt : undefined,
          provider: activeTab === 'generate' ? provider : undefined,
          model: activeTab === 'generate' ? selectedModel : undefined
        };
        
        setResults(prev => [newResult, ...prev]);
        
        // Auto-save if enabled
        if (saveToProject && projectId) {
          await saveImageToProject(newResult);
        }
        
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
  
  const saveImageToProject = async (result: ProcessingResult) => {
    try {
      // Fetch the image and convert to blob
      const imageResponse = await fetch(result.imageUrl);
      const imageBlob = await imageResponse.blob();
      const filename = `${result.operation}-${Date.now()}.png`;
      const imageFile = new File([imageBlob], filename, { type: 'image/png' });
      
      // Upload the image file to storage
      const storagePath = `images/${filename}`;
      const { data: uploadData, error: uploadError } = await supabase.storage
        .from('ai-generated')
        .upload(storagePath, imageFile);
        
      if (uploadError) throw uploadError;
      
      // Insert record for uploaded file
      const { error: insertError } = await supabase
        .from('ai_generated_files')
        .insert({
          filename,
          type: 'image',
          prompt: result.prompt,
          storage_path: storagePath,
          provider: result.provider,
          model: result.model,
          project_id: projectId
        });
        
      if (insertError) throw insertError;
      
      toast({
        title: "Success",
        description: "Image saved to project successfully",
      });
    } catch (error) {
      console.error('Error saving image to project:', error);
      toast({
        title: "Error",
        description: "Failed to save image to project",
        variant: "destructive",
      });
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
  
  const handleDeleteImage = async (id: string) => {
    try {
      const { error } = await supabase
        .from('ai_generated_files')
        .delete()
        .eq('id', id);
        
      if (error) throw error;
      
      // Update UI
      setResults(prev => prev.filter(result => result.id !== id));
      
      toast({
        title: "Success",
        description: "Image deleted successfully",
      });
    } catch (error) {
      console.error('Error deleting image:', error);
      toast({
        title: "Error",
        description: "Failed to delete image",
        variant: "destructive",
      });
    }
  };
  
  const applyPromptSuggestion = (suggestion: string) => {
    setPrompt(suggestion);
  };
  
  return (
    <div className="container mx-auto py-8">
      <Card className="mb-8 shadow-md">
        <CardHeader className="bg-gradient-to-r from-gray-50 to-slate-100 rounded-t-lg border-b">
          <CardTitle className="text-xl font-bold flex items-center">
            <Wand2 className="w-5 h-5 mr-2 text-innovate-600" />
            InnovateHub AI Image Lab
          </CardTitle>
          <CardDescription>
            Create professional visuals for your PlataPay and InnovateHub projects
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
                <div>
                  <label className="block text-sm font-medium mb-1">AI Provider</label>
                  <Select value={provider} onValueChange={(value) => setProvider(value as any)}>
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Select provider" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="openai">OpenAI DALL-E</SelectItem>
                      <SelectItem value="replicate">Replicate</SelectItem>
                      <SelectItem value="huggingface">HuggingFace</SelectItem>
                      <SelectItem value="getimg">GetImg AI</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div>
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
                <div>
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
              
              <div>
                <div className="flex justify-between">
                  <label className="block text-sm font-medium mb-1">Image Prompt</label>
                  <span className="text-xs text-blue-600 hover:text-blue-800 cursor-pointer underline" 
                    onClick={() => toast({
                      title: "Prompt Tips",
                      description: "Be specific and detailed. Include style, setting, colors, and mood for best results."
                    })}>
                    Prompt Tips
                  </span>
                </div>
                
                <Textarea
                  placeholder="Describe the image you want to generate in detail..."
                  value={prompt}
                  onChange={(e) => setPrompt(e.target.value)}
                  rows={4}
                  disabled={processing}
                  className="resize-none focus:ring-2 focus:ring-innovate-500"
                />
                
                <div className="mt-2 flex flex-wrap gap-1">
                  {getContextualPromptSuggestions().map((suggestion, index) => (
                    <Badge 
                      key={index} 
                      variant="outline" 
                      className="cursor-pointer hover:bg-slate-100 transition-colors"
                      onClick={() => applyPromptSuggestion(suggestion)}
                    >
                      {suggestion.length > 30 ? suggestion.substring(0, 30) + '...' : suggestion}
                    </Badge>
                  ))}
                </div>
              </div>
              
              {provider === 'getimg' && (
                <div className="bg-blue-50 p-3 rounded-md">
                  <p className="text-sm text-blue-700">
                    <strong>GetImg AI</strong> provides high-quality realistic images perfect for InnovateHub product showcases and PlataPay marketing materials.
                  </p>
                </div>
              )}
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
                  Background removal is perfect for creating clean PlataPay product shots and InnovateHub team member portraits.
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
            
            <div className="flex flex-col sm:flex-row justify-between mt-6 gap-4">
              <div className="flex items-center gap-2">
                <input 
                  type="checkbox" 
                  id="save-to-project" 
                  checked={saveToProject}
                  onChange={(e) => setSaveToProject(e.target.checked)}
                  className="rounded border-gray-300 text-innovate-600 shadow-sm focus:border-innovate-300 focus:ring focus:ring-innovate-200 focus:ring-opacity-50"
                />
                <label htmlFor="save-to-project" className="text-sm font-medium">
                  Auto-save to project
                </label>
                
                {saveToProject && (
                  <Select value={projectId || ''} onValueChange={setProjectId}>
                    <SelectTrigger className="w-[180px]">
                      <SelectValue placeholder="Select project" />
                    </SelectTrigger>
                    <SelectContent>
                      {projects.map(project => (
                        <SelectItem key={project.id} value={project.id}>{project.name}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                )}
              </div>
              
              <div className="flex gap-2">
                <Button variant="outline" onClick={handleReset} disabled={processing}>
                  <Trash2 className="w-4 h-4 mr-2" />
                  Reset
                </Button>
                <Button 
                  onClick={handleProcess} 
                  disabled={processing || (activeTab === 'generate' && !prompt.trim()) || ((activeTab === 'enhance' || activeTab === 'background-removal') && !selectedFile)}
                  className="bg-innovate-600 hover:bg-innovate-700"
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
              </div>
            </div>
          </Tabs>
        </CardContent>
      </Card>
      
      {/* Results Gallery */}
      <Card className="shadow-md">
        <CardHeader className="bg-gradient-to-r from-gray-50 to-slate-100 rounded-t-lg border-b">
          <div className="flex justify-between items-center">
            <div>
              <CardTitle className="text-xl font-bold">Generated Images</CardTitle>
              <CardDescription>Recent AI-generated images</CardDescription>
            </div>
            <Button 
              variant="outline" 
              size="sm" 
              onClick={fetchGeneratedImages}
              disabled={loadingResults}
            >
              {loadingResults ? <Loader2 className="h-4 w-4 animate-spin" /> : "Refresh"}
            </Button>
          </div>
        </CardHeader>
        <CardContent className="p-6">
          {loadingResults ? (
            <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {[...Array(8)].map((_, i) => (
                <div key={i} className="space-y-2">
                  <Skeleton className="aspect-square rounded-md w-full" />
                  <Skeleton className="h-4 w-3/4" />
                  <Skeleton className="h-4 w-1/2" />
                </div>
              ))}
            </div>
          ) : results.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {results.map((result, index) => (
                <Card key={index} className="overflow-hidden border shadow-sm hover:shadow-md transition-shadow">
                  <div className="relative aspect-square bg-black/5 overflow-hidden">
                    <img 
                      src={result.imageUrl} 
                      alt={`Result ${index}`}
                      className="object-cover w-full h-full"
                    />
                  </div>
                  <CardContent className="p-3">
                    <div className="flex items-center justify-between mb-1">
                      <h3 className="font-medium capitalize text-sm">{result.operation}</h3>
                      {result.provider && (
                        <Badge variant="outline" className="text-xs py-0">
                          {result.provider}
                        </Badge>
                      )}
                    </div>
                    {result.prompt && (
                      <p className="text-xs text-muted-foreground line-clamp-2 mt-1">
                        {result.prompt}
                      </p>
                    )}
                    <div className="flex items-center justify-between mt-3">
                      <span className="text-xs text-muted-foreground">
                        {result.timestamp.toLocaleDateString()}
                      </span>
                      <div className="flex gap-1">
                        <Button 
                          variant="ghost" 
                          size="sm"
                          className="h-8 w-8 p-0"
                          onClick={() => handleDownload(result.imageUrl, result.operation)}
                        >
                          <Download className="h-4 w-4" />
                        </Button>
                        {result.id && (
                          <Button 
                            variant="ghost" 
                            size="sm"
                            className="h-8 w-8 p-0 text-red-500 hover:text-red-700 hover:bg-red-50"
                            onClick={() => handleDeleteImage(result.id!)}
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        )}
                        {!result.id && (
                          <Button 
                            variant="ghost" 
                            size="sm"
                            className="h-8 w-8 p-0 text-green-500 hover:text-green-700 hover:bg-green-50"
                            onClick={() => saveImageToProject(result)}
                            disabled={!projectId}
                          >
                            <Save className="h-4 w-4" />
                          </Button>
                        )}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <p className="text-muted-foreground">No images generated yet. Try creating something!</p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default ImageProcessingTool;
