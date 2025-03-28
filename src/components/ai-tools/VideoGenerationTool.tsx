
import React, { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Progress } from '@/components/ui/progress';
import { useToast } from '@/hooks/use-toast';
import { Video, Loader2, Download, Redo } from 'lucide-react';

const POLL_INTERVAL = 2000; // 2 seconds

const VideoGenerationTool = () => {
  const { toast } = useToast();
  const [prompt, setPrompt] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [generationId, setGenerationId] = useState<string | null>(null);
  const [videoUrl, setVideoUrl] = useState<string | null>(null);
  const [progress, setProgress] = useState<number>(0);
  const [generationStatus, setGenerationStatus] = useState<string | null>(null);
  
  useEffect(() => {
    let interval: number | null = null;
    
    if (generationId && isGenerating) {
      interval = window.setInterval(checkGenerationStatus, POLL_INTERVAL);
    }
    
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [generationId, isGenerating]);
  
  const checkGenerationStatus = async () => {
    try {
      const { data, error } = await supabase.functions.invoke('generate-video', {
        body: { generationId },
      });
      
      if (error) throw error;
      
      const status = data.status;
      setGenerationStatus(status);
      
      // Update progress based on status
      if (status === 'starting') {
        setProgress(10);
      } else if (status === 'processing') {
        setProgress(50);
      } else if (status === 'succeeded') {
        setProgress(100);
        setIsGenerating(false);
        setVideoUrl(data.output?.video);
        toast({
          title: 'Video Generated',
          description: 'Your AI video has been created successfully!',
        });
      } else if (status === 'failed') {
        setIsGenerating(false);
        throw new Error('Video generation failed');
      }
    } catch (error) {
      console.error('Error checking generation status:', error);
      setIsGenerating(false);
      toast({
        title: 'Generation Failed',
        description: error.message || 'An error occurred during video generation.',
        variant: 'destructive',
      });
    }
  };
  
  const handleGenerate = async () => {
    if (!prompt.trim()) {
      toast({
        title: 'Input Required',
        description: 'Please enter a prompt to generate a video.',
        variant: 'destructive',
      });
      return;
    }
    
    setIsGenerating(true);
    setProgress(0);
    setVideoUrl(null);
    setGenerationStatus('starting');
    
    try {
      const { data, error } = await supabase.functions.invoke('generate-video', {
        body: { prompt },
      });
      
      if (error) throw error;
      
      if (data.id) {
        setGenerationId(data.id);
        setProgress(5);
        toast({
          title: 'Generation Started',
          description: 'Your video is being generated. This may take a few minutes.',
        });
      } else {
        throw new Error('Failed to start video generation');
      }
    } catch (error) {
      console.error('Error generating video:', error);
      setIsGenerating(false);
      toast({
        title: 'Generation Failed',
        description: error.message || 'An error occurred while starting video generation.',
        variant: 'destructive',
      });
    }
  };
  
  const handleDownload = () => {
    if (videoUrl) {
      const link = document.createElement('a');
      link.href = videoUrl;
      link.download = `ai-video-${Date.now()}.mp4`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  };
  
  const resetGeneration = () => {
    setVideoUrl(null);
    setGenerationId(null);
    setProgress(0);
    setGenerationStatus(null);
  };
  
  const getStatusText = () => {
    switch (generationStatus) {
      case 'starting':
        return 'Initializing generation...';
      case 'processing':
        return 'Creating your video...';
      case 'succeeded':
        return 'Video generated successfully!';
      case 'failed':
        return 'Generation failed.';
      default:
        return 'Preparing to generate...';
    }
  };
  
  return (
    <div className="container py-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Video className="mr-2 h-5 w-5 text-blue-500" />
            AI Video Generator
          </CardTitle>
          <CardDescription>
            Create short videos using text prompts
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-2">
            <label className="text-sm font-medium">
              Describe what you want in the video
            </label>
            <Textarea
              placeholder="E.g., A camera flying through a foggy forest at sunrise with sun rays shining through the trees..."
              rows={5}
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              className="resize-none"
              disabled={isGenerating}
            />
            <p className="text-xs text-gray-500">
              Be detailed and descriptive for best results. Videos are limited to a few seconds.
            </p>
          </div>
          
          {(isGenerating || videoUrl) && (
            <div className="bg-slate-50 p-4 rounded-lg">
              {isGenerating && (
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">{getStatusText()}</span>
                    <span className="text-sm">{progress}%</span>
                  </div>
                  <Progress value={progress} />
                  <p className="text-xs text-center text-gray-500">
                    This may take a few minutes depending on complexity
                  </p>
                </div>
              )}
              
              {videoUrl && (
                <div className="space-y-4">
                  <div className="flex justify-center bg-black rounded-md overflow-hidden">
                    <video
                      src={videoUrl}
                      controls
                      className="max-w-full"
                      style={{ maxHeight: '400px' }}
                      autoPlay
                      loop
                    />
                  </div>
                  <div className="flex justify-between">
                    <Button 
                      variant="outline" 
                      onClick={resetGeneration}
                    >
                      <Redo className="mr-2 h-4 w-4" />
                      Generate Another
                    </Button>
                    <Button onClick={handleDownload}>
                      <Download className="mr-2 h-4 w-4" />
                      Download Video
                    </Button>
                  </div>
                </div>
              )}
            </div>
          )}
        </CardContent>
        <CardFooter>
          {!videoUrl && (
            <Button 
              onClick={handleGenerate} 
              disabled={isGenerating || !prompt.trim()} 
              className="w-full"
            >
              {isGenerating && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              {isGenerating ? 'Generating Video...' : 'Generate Video'}
            </Button>
          )}
        </CardFooter>
      </Card>
    </div>
  );
};

export default VideoGenerationTool;
