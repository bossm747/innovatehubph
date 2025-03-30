
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { MessageSquare, FileText, BookOpen } from 'lucide-react';

const NLPToolsSection = () => {
  const tools = [
    {
      title: "Text Generation",
      description: "Generate human-like text for various applications including content creation, chatbots, and more.",
      icon: <MessageSquare className="h-8 w-8 text-innovate-600" />
    },
    {
      title: "Document Analysis",
      description: "Extract key information, summarize content, and analyze sentiment from documents and text.",
      icon: <FileText className="h-8 w-8 text-innovate-600" />
    },
    {
      title: "Research Assistant",
      description: "AI-powered research tool that finds, summarizes, and organizes information from multiple sources.",
      icon: <BookOpen className="h-8 w-8 text-innovate-600" />
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
              Leverage the power of natural language processing to streamline your workflows.
            </p>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default NLPToolsSection;
