import React, { useState } from "react";
import { useAvailableSecrets } from "@/contexts/AvailableSecretsContext";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { AlertCircle, CheckCircle, Image, FileText, Loader2 } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

type AvailableProvider = {
  id: string;
  name: string;
  secretName: string;
  type: 'text' | 'image';
  model?: string;
};

const AIResourcesGenerator = () => {
  const { availableSecrets, loading: secretsLoading } = useAvailableSecrets();
  const { toast } = useToast();
  
  const [textPrompt, setTextPrompt] = useState("");
  const [imagePrompt, setImagePrompt] = useState("");
  const [selectedTextProvider, setSelectedTextProvider] = useState("");
  const [selectedImageProvider, setSelectedImageProvider] = useState("");
  const [selectedImageSize, setSelectedImageSize] = useState("1024x1024");
  const [selectedProject, setSelectedProject] = useState("");
  const [fileName, setFileName] = useState("");
  const [generatingText, setGeneratingText] = useState(false);
  const [generatingImage, setGeneratingImage] = useState(false);
  const [generatedContent, setGeneratedContent] = useState<{ text?: string; image?: string }>({});
  const [projects, setProjects] = useState<any[]>([]);
  const [loadingProjects, setLoadingProjects] = useState(false);

  const textProviders: AvailableProvider[] = [
    { id: 'openai', name: 'OpenAI (GPT-4o Mini)', secretName: 'OPENAI_API_KEY', type: 'text' },
    { id: 'anthropic', name: 'Anthropic (Claude 3 Opus)', secretName: 'ANTHROPIC_API_KEY', type: 'text' },
    { id: 'gemini', name: 'Google Gemini Pro', secretName: 'GEMINI_API_KEY', type: 'text' },
    { id: 'mistral', name: 'Mistral Large', secretName: 'MISTRAL_API_KEY', type: 'text' },
  ];

  const imageProviders: AvailableProvider[] = [
    { id: 'openai', name: 'OpenAI (DALL·E 3)', secretName: 'OPENAI_API_KEY', type: 'image' },
    { id: 'replicate', name: 'Replicate (SDXL)', secretName: 'REPLICATE_API_KEY', type: 'image' },
    { id: 'huggingface', name: 'HuggingFace (SDXL)', secretName: 'HUGGINGFACE_API_KEY', type: 'image' },
  ];

  const availableTextProviders = textProviders.filter(provider => availableSecrets[provider.secretName]);
  const availableImageProviders = imageProviders.filter(provider => availableSecrets[provider.secretName]);

  React.useEffect(() => {
    fetchProjects();
  }, []);

  const fetchProjects = async () => {
    try {
      setLoadingProjects(true);
      const { data, error } = await supabase
        .from('ai_projects')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      
      setProjects(data || []);
    } catch (error) {
      console.error('Error fetching projects:', error);
      toast({
        title: "Error",
        description: "Failed to load projects",
        variant: "destructive",
      });
    } finally {
      setLoadingProjects(false);
    }
  };

  const generateText = async () => {
    if (!textPrompt) {
      toast({
        title: "Error",
        description: "Please enter a text prompt",
        variant: "destructive",
      });
      return;
    }

    if (!selectedTextProvider) {
      toast({
        title: "Error",
        description: "Please select a text provider",
        variant: "destructive",
      });
      return;
    }

    try {
      setGeneratingText(true);
      const { data, error } = await supabase.functions.invoke('generate-text', {
        body: { prompt: textPrompt, provider: selectedTextProvider },
      });

      if (error) throw error;
      
      setGeneratedContent(prev => ({ ...prev, text: data.text }));
      toast({
        title: "Success",
        description: "Text generated successfully",
      });
    } catch (error) {
      console.error('Error generating text:', error);
      toast({
        title: "Error",
        description: "Failed to generate text",
        variant: "destructive",
      });
    } finally {
      setGeneratingText(false);
    }
  };

  const generateImage = async () => {
    if (!imagePrompt) {
      toast({
        title: "Error",
        description: "Please enter an image prompt",
        variant: "destructive",
      });
      return;
    }

    if (!selectedImageProvider) {
      toast({
        title: "Error",
        description: "Please select an image provider",
        variant: "destructive",
      });
      return;
    }

    try {
      setGeneratingImage(true);
      const { data, error } = await supabase.functions.invoke('generate-image', {
        body: { 
          prompt: imagePrompt, 
          provider: selectedImageProvider,
          size: selectedImageSize
        },
      });

      if (error) throw error;
      
      setGeneratedContent(prev => ({ ...prev, image: data.image }));
      toast({
        title: "Success",
        description: "Image generated successfully",
      });
    } catch (error) {
      console.error('Error generating image:', error);
      toast({
        title: "Error",
        description: "Failed to generate image",
        variant: "destructive",
      });
    } finally {
      setGeneratingImage(false);
    }
  };

  const saveGeneratedContent = async () => {
    if (!fileName) {
      toast({
        title: "Error",
        description: "Please enter a file name",
        variant: "destructive",
      });
      return;
    }

    try {
      let files = [];
      
      if (generatedContent.text) {
        const textBlob = new Blob([generatedContent.text], { type: 'text/plain' });
        const textFile = new File([textBlob], `${fileName}.txt`, { type: 'text/plain' });
        
        const textStoragePath = `text/${fileName}-${Date.now()}.txt`;
        const { data: textData, error: textError } = await supabase.storage
          .from('ai-generated')
          .upload(textStoragePath, textFile);
          
        if (textError) throw textError;
        
        files.push({
          filename: `${fileName}.txt`,
          type: 'text',
          prompt: textPrompt,
          storage_path: textStoragePath,
          provider: selectedTextProvider,
          project_id: selectedProject || null
        });
      }
      
      if (generatedContent.image) {
        const imageResponse = await fetch(generatedContent.image);
        const imageBlob = await imageResponse.blob();
        const imageFile = new File([imageBlob], `${fileName}.png`, { type: 'image/png' });
        
        const imageStoragePath = `images/${fileName}-${Date.now()}.png`;
        const { data: imageData, error: imageError } = await supabase.storage
          .from('ai-generated')
          .upload(imageStoragePath, imageFile);
          
        if (imageError) throw imageError;
        
        files.push({
          filename: `${fileName}.png`,
          type: 'image',
          prompt: imagePrompt,
          storage_path: imageStoragePath,
          provider: selectedImageProvider,
          project_id: selectedProject || null
        });
      }
      
      if (files.length > 0) {
        const { error: insertError } = await supabase
          .from('ai_generated_files')
          .insert(files);
          
        if (insertError) throw insertError;
        
        toast({
          title: "Success",
          description: `${files.length} file(s) saved successfully`,
        });
        
        setFileName("");
        setGeneratedContent({});
        setTextPrompt("");
        setImagePrompt("");
      }
    } catch (error) {
      console.error('Error saving content:', error);
      toast({
        title: "Error",
        description: "Failed to save generated content",
        variant: "destructive",
      });
    }
  };

  if (secretsLoading) {
    return (
      <div className="flex justify-center items-center h-40">
        <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
        <span className="ml-2 text-muted-foreground">Loading available AI providers...</span>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold">Generate AI Resources</h2>
          <p className="text-muted-foreground">
            Create text and images using various AI providers
          </p>
        </div>
        
        <Select value={selectedProject} onValueChange={setSelectedProject}>
          <SelectTrigger className="w-[250px]">
            <SelectValue placeholder="Select project (optional)" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="no-project">No project</SelectItem>
            {projects.map(project => (
              <SelectItem key={project.id} value={project.id}>{project.name}</SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <Tabs defaultValue="text" className="w-full">
        <TabsList className="grid grid-cols-2 mb-6">
          <TabsTrigger value="text" className="flex items-center">
            <FileText className="h-4 w-4 mr-2" />
            Text Generation
          </TabsTrigger>
          <TabsTrigger value="image" className="flex items-center">
            <Image className="h-4 w-4 mr-2" />
            Image Generation
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="text">
          <Card>
            <CardHeader>
              <CardTitle>Text Generation</CardTitle>
              <CardDescription>Create text using AI language models</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {availableTextProviders.length === 0 ? (
                <Alert variant="destructive">
                  <AlertCircle className="h-4 w-4" />
                  <AlertTitle>No text providers available</AlertTitle>
                  <AlertDescription>
                    No API keys for text generation providers have been configured. 
                    Please add API keys in Supabase Edge Function secrets.
                  </AlertDescription>
                </Alert>
              ) : (
                <>
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Select Provider</label>
                    <Select value={selectedTextProvider} onValueChange={setSelectedTextProvider}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select a text provider" />
                      </SelectTrigger>
                      <SelectContent>
                        {availableTextProviders.map(provider => (
                          <SelectItem key={provider.id} value={provider.id}>
                            {provider.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-medium">Prompt</label>
                    <Textarea 
                      placeholder="Enter your text generation prompt here..." 
                      value={textPrompt}
                      onChange={(e) => setTextPrompt(e.target.value)}
                      rows={4}
                    />
                  </div>

                  <Button 
                    onClick={generateText} 
                    disabled={generatingText || !textPrompt || !selectedTextProvider}
                    className="w-full"
                  >
                    {generatingText && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                    {generatingText ? "Generating..." : "Generate Text"}
                  </Button>

                  {generatedContent.text && (
                    <div className="mt-4 space-y-2">
                      <div className="flex justify-between items-center">
                        <h4 className="font-medium">Generated Text</h4>
                        <Badge variant="outline" className="px-2 py-0">
                          {textProviders.find(p => p.id === selectedTextProvider)?.name || selectedTextProvider}
                        </Badge>
                      </div>
                      <div className="bg-muted p-4 rounded-md text-sm whitespace-pre-wrap h-[200px] overflow-y-auto">
                        {generatedContent.text}
                      </div>
                    </div>
                  )}
                </>
              )}
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="image">
          <Card>
            <CardHeader>
              <CardTitle>Image Generation</CardTitle>
              <CardDescription>Generate images using AI image models</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {availableImageProviders.length === 0 ? (
                <Alert variant="destructive">
                  <AlertCircle className="h-4 w-4" />
                  <AlertTitle>No image providers available</AlertTitle>
                  <AlertDescription>
                    No API keys for image generation providers have been configured. 
                    Please add API keys in Supabase Edge Function secrets.
                  </AlertDescription>
                </Alert>
              ) : (
                <>
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Select Provider</label>
                    <Select value={selectedImageProvider} onValueChange={setSelectedImageProvider}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select an image provider" />
                      </SelectTrigger>
                      <SelectContent>
                        {availableImageProviders.map(provider => (
                          <SelectItem key={provider.id} value={provider.id}>
                            {provider.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  
                  {selectedImageProvider === 'openai' && (
                    <div className="space-y-2">
                      <label className="text-sm font-medium">Size</label>
                      <Select value={selectedImageSize} onValueChange={setSelectedImageSize}>
                        <SelectTrigger>
                          <SelectValue placeholder="Select image size" />
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
                    <label className="text-sm font-medium">Prompt</label>
                    <Textarea 
                      placeholder="Describe the image you want to generate..." 
                      value={imagePrompt}
                      onChange={(e) => setImagePrompt(e.target.value)}
                      rows={4}
                    />
                  </div>

                  <Button 
                    onClick={generateImage} 
                    disabled={generatingImage || !imagePrompt || !selectedImageProvider}
                    className="w-full"
                  >
                    {generatingImage && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                    {generatingImage ? "Generating Image..." : "Generate Image"}
                  </Button>

                  {generatedContent.image && (
                    <div className="mt-4 space-y-2">
                      <div className="flex justify-between items-center">
                        <h4 className="font-medium">Generated Image</h4>
                        <Badge variant="outline" className="px-2 py-0">
                          {imageProviders.find(p => p.id === selectedImageProvider)?.name || selectedImageProvider}
                        </Badge>
                      </div>
                      <div className="p-4 rounded-md border bg-muted flex justify-center">
                        <img 
                          src={generatedContent.image} 
                          alt="Generated AI image" 
                          className="max-h-[400px] max-w-full object-contain rounded"
                        />
                      </div>
                    </div>
                  )}
                </>
              )}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {(generatedContent.text || generatedContent.image) && (
        <Card className="bg-accent/20">
          <CardHeader>
            <CardTitle>Save Generated Content</CardTitle>
            <CardDescription>
              Save your generated content to the project repository
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <label className="text-sm font-medium">File Name</label>
              <Input 
                placeholder="Enter a name for your file"
                value={fileName}
                onChange={(e) => setFileName(e.target.value)}
              />
            </div>
          </CardContent>
          <CardFooter>
            <Button 
              onClick={saveGeneratedContent} 
              disabled={!fileName}
              className="w-full"
            >
              Save Generated Content
            </Button>
          </CardFooter>
        </Card>
      )}
    </div>
  );
};

export default AIResourcesGenerator;
