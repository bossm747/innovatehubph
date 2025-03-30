
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { BarChart, PieChart, LineChart } from 'lucide-react';

const DataAnalysisToolsSection = () => {
  const tools = [
    {
      title: "Predictive Analytics",
      description: "Forecast trends and make data-driven predictions using historical data and AI algorithms.",
      icon: <LineChart className="h-8 w-8 text-innovate-600" />
    },
    {
      title: "Data Visualization",
      description: "Transform complex data into intuitive charts and graphs for better decision making.",
      icon: <BarChart className="h-8 w-8 text-innovate-600" />
    },
    {
      title: "Market Segmentation",
      description: "Identify customer segments and understand market dynamics with AI-powered clustering.",
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
              Extract actionable insights from your data with our advanced analysis tools.
            </p>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default DataAnalysisToolsSection;
