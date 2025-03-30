
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { BarChart2, PieChart, TrendingUp } from 'lucide-react';

const DataAnalysisToolsSection = () => {
  const tools = [
    {
      title: "Business Intelligence",
      description: "Transform your data into actionable insights with machine learning-powered BI tools.",
      icon: <BarChart2 className="h-8 w-8 text-innovate-600" />
    },
    {
      title: "Predictive Analytics",
      description: "Anticipate market trends and customer behaviors with our AI-driven prediction models.",
      icon: <TrendingUp className="h-8 w-8 text-innovate-600" />
    },
    {
      title: "Data Visualization",
      description: "Create dynamic visual reports that make complex data easy to understand and act upon.",
      icon: <PieChart className="h-8 w-8 text-innovate-600" />
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
              Make better business decisions with our data analysis tools powered by advanced AI algorithms.
            </p>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default DataAnalysisToolsSection;
