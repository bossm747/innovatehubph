
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { ImageIcon, Paintbrush, ImagePlus } from 'lucide-react';

const ImageToolsSection = () => {
  const tools = [
    {
      title: "Image Generation",
      description: "Create original images from text descriptions for marketing, design, and content creation.",
      icon: <ImagePlus className="h-8 w-8 text-innovate-600" />
    },
    {
      title: "Image Enhancement",
      description: "Improve image quality, resize, remove backgrounds, and apply artistic filters.",
      icon: <Paintbrush className="h-8 w-8 text-innovate-600" />
    },
    {
      title: "Visual Content Analysis",
      description: "Extract information, detect objects, and analyze visual content in images.",
      icon: <ImageIcon className="h-8 w-8 text-innovate-600" />
    }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {tools.map((tool, index) => (
        <Card key={index} className="h-full">
          <CardHeader>
            <div className="mb-4">{tool.icon}</div>
            <CardTitle>{tool.title}</CardTitle>
            <CardDescription>{tool.description}</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">
              Transform your visual content with our AI-powered image processing tools.
            </p>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default ImageToolsSection;
