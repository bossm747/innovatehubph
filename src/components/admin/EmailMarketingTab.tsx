
import React, { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { BarChart3, Users, Send, Settings, Brain, Sparkles } from 'lucide-react';
import RecipientsList from './marketing/RecipientsList';
import CampaignManager from './marketing/CampaignManager';
import MarketingCopyGenerator from './marketing/MarketingCopyGenerator';

const EmailMarketingTab: React.FC = () => {
  const [activeTab, setActiveTab] = useState('campaigns');

  const getTabContent = () => {
    switch (activeTab) {
      case 'campaigns':
        return <CampaignManager />;
      case 'recipients':
        return <RecipientsList />;
      case 'ai-tools':
        return <AIMarketingTools />;
      case 'analytics':
        return <MarketingAnalytics />;
      default:
        return <CampaignManager />;
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold">Email Marketing</h2>
          <p className="text-muted-foreground">
            Manage your email marketing campaigns and recipients
          </p>
        </div>
        <Badge variant="outline" className="px-3 py-1">
          <Brain className="w-3.5 h-3.5 mr-1 text-green-600" />
          AI-Powered
        </Badge>
      </div>
      
      <Tabs
        defaultValue={activeTab}
        value={activeTab}
        onValueChange={setActiveTab}
        className="space-y-4"
      >
        <TabsList className="grid grid-cols-4 w-full">
          <TabsTrigger value="campaigns" className="flex items-center">
            <Send className="w-4 h-4 mr-2" />
            Campaigns
          </TabsTrigger>
          <TabsTrigger value="recipients" className="flex items-center">
            <Users className="w-4 h-4 mr-2" />
            Recipients
          </TabsTrigger>
          <TabsTrigger value="ai-tools" className="flex items-center">
            <Brain className="w-4 h-4 mr-2" />
            AI Tools
          </TabsTrigger>
          <TabsTrigger value="analytics" className="flex items-center">
            <BarChart3 className="w-4 h-4 mr-2" />
            Analytics
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value={activeTab} className="space-y-4">
          {getTabContent()}
        </TabsContent>
      </Tabs>
    </div>
  );
};

// AI Marketing Tools Tab Content
const AIMarketingTools: React.FC = () => {
  const [generatedContent, setGeneratedContent] = useState("");
  
  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row gap-6">
        <div className="md:w-1/2">
          <MarketingCopyGenerator 
            onCopyGenerated={setGeneratedContent} 
          />
        </div>
        
        <div className="md:w-1/2">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Sparkles className="mr-2 h-5 w-5 text-innovate-600" />
                Email Marketing Tips
              </CardTitle>
              <CardDescription>AI-powered tips to improve your email marketing</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-3">
                <h4 className="font-medium">Best Practices</h4>
                <ul className="list-disc pl-5 space-y-1 text-sm">
                  <li>Personalize your emails with recipient names and relevant content</li>
                  <li>Use clear and compelling subject lines (30-50 characters)</li>
                  <li>Include a single, clear call-to-action button</li>
                  <li>Optimize for mobile devices (over 60% of emails are read on mobile)</li>
                  <li>Keep emails concise with scannable content (paragraphs of 1-3 sentences)</li>
                  <li>Test different send times to find what works for your audience</li>
                  <li>Segment your recipients for more targeted messaging</li>
                </ul>
              </div>
              
              <div className="space-y-3">
                <h4 className="font-medium">AI Writing Tips</h4>
                <ul className="list-disc pl-5 space-y-1 text-sm">
                  <li>Be specific in your AI prompts about tone, context, and objective</li>
                  <li>Include brand context about InnovateHub and PlataPay for consistent messaging</li>
                  <li>Request specific formats like bullet points or short paragraphs</li>
                  <li>Use AI for A/B testing different approaches</li>
                  <li>Always review and edit AI-generated content for brand voice</li>
                </ul>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

// Analytics Tab Content
const MarketingAnalytics: React.FC = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Email Marketing Analytics</CardTitle>
        <CardDescription>Performance metrics for your email campaigns</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">Open Rate</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">32.8%</div>
              <p className="text-xs text-muted-foreground">+2.1% from last month</p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">Click Rate</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">4.3%</div>
              <p className="text-xs text-muted-foreground">+0.8% from last month</p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">Subscriber Growth</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">+18</div>
              <p className="text-xs text-muted-foreground">This month</p>
            </CardContent>
          </Card>
        </div>
        
        <div className="mt-6 text-center py-12 border rounded-md">
          <p className="text-muted-foreground">Detailed analytics will appear here after campaigns are sent.</p>
          <Button variant="outline" className="mt-4">
            View Full Report
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default EmailMarketingTab;
