
import { useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Loader2, Download, Check, X } from "lucide-react";
import { toast } from "sonner";
import { useAvailableSecrets } from "@/contexts/AvailableSecretsContext";

const AIResourcesGenerator = () => {
  const { secrets, isLoading: secretsLoading } = useAvailableSecrets();
  const [generationType, setGenerationType] = useState("image");
  const [prompt, setPrompt] = useState("");
  const [imageSize, setImageSize] = useState("1024x1024");
  const [generatedContent, setGeneratedContent] = useState<any>(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const [saveFilename, setSaveFilename] = useState("");
  const [selectedProvider, setSelectedProvider] = useState("");
  
  // Filter available providers based on generation type and secrets
  const getAvailableProviders = () => {
    if (generationType === "image") {
      return secrets
        .filter(s => 
          (s.name.includes("OPENAI") && s.available) || 
          (s.name.includes("REPLICATE") && s.available) ||
          (s.name.includes("GETIMG") && s.available) ||
          (s.name.includes("RUNWAY") && s.available) ||
          (s.name.includes("HUGGINGFACE") && s.available)
        )
        .map(s => ({
          id: s.name.split("_")[0].toLowerCase(),
          name: s.name.split("_")[0]
        }));
    } else if (generationType === "text") {
      return secrets
        .filter(s => 
          (s.name.includes("OPENAI") && s.available) || 
          (s.name.includes("ANTHROPIC") && s.available) || 
          (s.name.includes("GEMINI") && s.available) ||
          (s.name.includes("MISTRAL") && s.available)
        )
        .map(s => ({
          id: s.name.split("_")[0].toLowerCase(),
          name: s.name.split("_")[0]
        }));
    }
    return [];
  };

  const uniqueProviders = Array.from(
    new Set(getAvailableProviders().map(p => p.id))
  ).map(id => {
    const provider = getAvailableProviders().find(p => p.id === id);
    return provider ? { id, name: provider.name } : { id, name: id.toUpperCase() };
  });

  const handleGenerate = async () => {
    if (!prompt.trim()) {
      toast.error("Please enter a prompt");
      return;
    }
    
    if (!selectedProvider) {
      toast.error("Please select a provider");
      return;
    }

    setIsGenerating(true);
    setGeneratedContent(null);
    
    try {
      let functionName = "";
      let payload = {};
      
      if (generationType === "image") {
        functionName = "generate-image";
        payload = {
          prompt,
          provider: selectedProvider,
          size: imageSize
        };
      } else if (generationType === "text") {
        functionName = "generate-text";
        payload = {
          prompt,
          provider: selectedProvider
        };
      }
      
      const { data, error } = await supabase.functions.invoke(functionName, {
        body: payload
      });
      
      if (error) throw error;
      
      setGeneratedContent(data);
      setSaveFilename(prompt.substring(0, 20).replace(/[^a-z0-9]/gi, '_').toLowerCase());
      toast.success("Content generated successfully");
    } catch (error) {
      console.error("Error generating content:", error);
      toast.error("Failed to generate content");
    } finally {
      setIsGenerating(false);
    }
  };

  const handleSaveToStorage = async () => {
    if (!generatedContent || !saveFilename) {
      toast.error("No content to save or filename is empty");
      return;
    }
    
    try {
      let fileData;
      let filePath;
      
      if (generationType === "image") {
        // For images: fetch the image and convert to blob
        const res = await fetch(generatedContent.image);
        const blob = await res.blob();
        fileData = blob;
        filePath = `${saveFilename}.png`;
      } else {
        // For text: create a text file
        const blob = new Blob([generatedContent.text], { type: 'text/plain' });
        fileData = blob;
        filePath = `${saveFilename}.txt`;
      }
      
      const { data, error } = await supabase.storage
        .from('ai-generated')
        .upload(`${generationType}/${filePath}`, fileData, {
          upsert: true,
          contentType: generationType === "image" ? 'image/png' : 'text/plain'
        });
      
      if (error) throw error;
      
      toast.success("Content saved to storage");
      
      // Record in database
      await supabase.from('ai_generated_files').insert([{
        filename: filePath,
        type: generationType,
        prompt,
        storage_path: data.path,
        provider: selectedProvider
      }]);
      
    } catch (error) {
      console.error("Error saving to storage:", error);
      toast.error("Failed to save content");
    }
  };

  const handleDownload = () => {
    if (!generatedContent) return;
    
    if (generationType === "image") {
      const a = document.createElement('a');
      a.href = generatedContent.image;
      a.download = `${saveFilename || 'generated'}.png`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
    } else {
      const blob = new Blob([generatedContent.text], { type: 'text/plain' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `${saveFilename || 'generated'}.txt`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>AI Resource Generator</CardTitle>
        <CardDescription>
          Generate images, text, and other content using various AI providers
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs onValueChange={setGenerationType} value={generationType} className="w-full">
          <TabsList className="grid w-full grid-cols-2 mb-6">
            <TabsTrigger value="image">Generate Images</TabsTrigger>
            <TabsTrigger value="text">Generate Text</TabsTrigger>
          </TabsList>
          
          <TabsContent value="image" className="space-y-4">
            <div className="grid gap-4">
              <div className="grid gap-2">
                <label>AI Provider</label>
                {secretsLoading ? (
                  <div className="flex items-center gap-2">
                    <Loader2 className="h-4 w-4 animate-spin" /> Loading available providers...
                  </div>
                ) : uniqueProviders.length > 0 ? (
                  <Select 
                    value={selectedProvider} 
                    onValueChange={setSelectedProvider}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select a provider" />
                    </SelectTrigger>
                    <SelectContent>
                      {uniqueProviders.map(provider => (
                        <SelectItem key={provider.id} value={provider.id}>
                          {provider.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                ) : (
                  <div className="text-destructive flex items-center gap-2">
                    <X className="h-4 w-4" /> No image generation providers available
                  </div>
                )}
              </div>
              
              <div className="grid gap-2">
                <label>Image Size</label>
                <Select value={imageSize} onValueChange={setImageSize}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select image size" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="1024x1024">1024x1024</SelectItem>
                    <SelectItem value="512x512">512x512</SelectItem>
                    <SelectItem value="1792x1024">1792x1024 (landscape)</SelectItem>
                    <SelectItem value="1024x1792">1024x1792 (portrait)</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div className="grid gap-2">
                <label>Prompt</label>
                <Textarea 
                  value={prompt}
                  onChange={(e) => setPrompt(e.target.value)}
                  placeholder="Describe the image you want to generate..."
                  rows={4}
                />
              </div>
              
              <Button 
                onClick={handleGenerate}
                disabled={isGenerating || !prompt || !selectedProvider}
                className="w-full"
              >
                {isGenerating ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Generating...
                  </>
                ) : "Generate Image"}
              </Button>
            </div>
            
            {generatedContent && generatedContent.image && (
              <div className="mt-6 space-y-4">
                <div className="aspect-square w-full max-w-md mx-auto border rounded-md overflow-hidden">
                  <img 
                    src={generatedContent.image} 
                    alt="Generated" 
                    className="w-full h-full object-cover"
                  />
                </div>
                
                <div className="flex flex-col gap-4">
                  <div className="grid gap-2">
                    <label>Filename for saving</label>
                    <Input 
                      value={saveFilename}
                      onChange={(e) => setSaveFilename(e.target.value)}
                      placeholder="Enter filename (without extension)"
                    />
                  </div>
                  
                  <div className="flex gap-2">
                    <Button onClick={handleSaveToStorage} className="flex-1">
                      Save to Storage
                    </Button>
                    <Button variant="outline" onClick={handleDownload}>
                      <Download className="h-4 w-4 mr-2" /> Download
                    </Button>
                  </div>
                </div>
              </div>
            )}
          </TabsContent>
          
          <TabsContent value="text" className="space-y-4">
            <div className="grid gap-4">
              <div className="grid gap-2">
                <label>AI Provider</label>
                {secretsLoading ? (
                  <div className="flex items-center gap-2">
                    <Loader2 className="h-4 w-4 animate-spin" /> Loading available providers...
                  </div>
                ) : uniqueProviders.length > 0 ? (
                  <Select 
                    value={selectedProvider} 
                    onValueChange={setSelectedProvider}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select a provider" />
                    </SelectTrigger>
                    <SelectContent>
                      {uniqueProviders.map(provider => (
                        <SelectItem key={provider.id} value={provider.id}>
                          {provider.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                ) : (
                  <div className="text-destructive flex items-center gap-2">
                    <X className="h-4 w-4" /> No text generation providers available
                  </div>
                )}
              </div>
              
              <div className="grid gap-2">
                <label>Prompt</label>
                <Textarea 
                  value={prompt}
                  onChange={(e) => setPrompt(e.target.value)}
                  placeholder="Enter your prompt for text generation..."
                  rows={4}
                />
              </div>
              
              <Button 
                onClick={handleGenerate}
                disabled={isGenerating || !prompt || !selectedProvider}
                className="w-full"
              >
                {isGenerating ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Generating...
                  </>
                ) : "Generate Text"}
              </Button>
            </div>
            
            {generatedContent && generatedContent.text && (
              <div className="mt-6 space-y-4">
                <div className="border rounded-md p-4 whitespace-pre-wrap bg-muted/30">
                  {generatedContent.text}
                </div>
                
                <div className="flex flex-col gap-4">
                  <div className="grid gap-2">
                    <label>Filename for saving</label>
                    <Input 
                      value={saveFilename}
                      onChange={(e) => setSaveFilename(e.target.value)}
                      placeholder="Enter filename (without extension)"
                    />
                  </div>
                  
                  <div className="flex gap-2">
                    <Button onClick={handleSaveToStorage} className="flex-1">
                      Save to Storage
                    </Button>
                    <Button variant="outline" onClick={handleDownload}>
                      <Download className="h-4 w-4 mr-2" /> Download
                    </Button>
                  </div>
                </div>
              </div>
            )}
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
};

export default AIResourcesGenerator;
