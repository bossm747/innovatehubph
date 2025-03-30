
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { MessageSquare, BookOpen, Mic } from 'lucide-react';

const NLPToolsSection = () => {
  const tools = [
    {
      title: "Conversational AI",
      description: "Build intelligent chatbots and virtual assistants that understand natural language.",
      icon: <MessageSquare className="h-8 w-8 text-innovate-600" />
    },
    {
      title: "Text Analysis",
      description: "Extract insights from documents, social media, and customer feedback with sentiment analysis.",
      icon: <BookOpen className="h-8 w-8 text-innovate-600" />
    },
    {
      title: "Speech Recognition",
      description: "Convert spoken language into text for transcription and voice-enabled applications.",
      icon: <Mic className="h-8 w-8 text-innovate-600" />
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
              Harness the power of language processing to enhance customer engagement and automate communication tasks.
            </p>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default NLPToolsSection;
