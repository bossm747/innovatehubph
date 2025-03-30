
import React, { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { BarChart3, Users, Send, Settings, Brain, Sparkles, Gift, Target, MessageSquare, FileType, CreditCard, AlertCircle } from 'lucide-react';
import RecipientsList from './marketing/RecipientsList';
import CampaignManager from './marketing/CampaignManager';
import MarketingCopyGenerator from './marketing/MarketingCopyGenerator';
import AIAgentsManager from './marketing/AIAgentsManager';
import EmailTranslationTool from './marketing/EmailTranslationTool';
import LeadsManagement from './marketing/LeadsManagement';
import PromotionsManager from './marketing/PromotionsManager';
import PromoCreator from './marketing/PromoCreator';
import EmailTemplateGenerator from '../email/EmailTemplateGenerator';
import EmailTemplatesPage from '../email/EmailTemplatesPage';
import PlatapayEmailTemplate from '../email/PlatapayEmailTemplate';
import TestingDashboard from './marketing/TestingDashboard';

const EmailMarketingTab: React.FC = () => {
  const [activeTab, setActiveTab] = useState('campaigns');
  const [generatedContent, setGeneratedContent] = useState("");

  const getTabContent = () => {
    switch (activeTab) {
      case 'campaigns':
        return <CampaignManager />;
      case 'recipients':
        return <RecipientsList />;
      case 'leads':
        return <LeadsManagement />;
      case 'promotions':
        return <PromotionsManager />;
      case 'promo-creator':
        return <PromoCreator />;
      case 'templates':
        return <EmailTemplatesPage />;
      case 'platapay':
        return <PlatapayEmailTemplate />;
      case 'ai-tools':
        return <AIMarketingTools onCopyGenerated={setGeneratedContent} />;
      case 'analytics':
        return <MarketingAnalytics />;
      case 'agents':
        return <AIAgentsManager />;
      case 'testing':
        return <TestingDashboard />;
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
        <TabsList className="grid grid-cols-11 w-full">
          <TabsTrigger value="campaigns" className="flex items-center">
            <Send className="w-4 h-4 mr-2" />
            Campaigns
          </TabsTrigger>
          <TabsTrigger value="leads" className="flex items-center">
            <Target className="w-4 h-4 mr-2" />
            Leads
          </TabsTrigger>
          <TabsTrigger value="recipients" className="flex items-center">
            <Users className="w-4 h-4 mr-2" />
            Recipients
          </TabsTrigger>
          <TabsTrigger value="promotions" className="flex items-center">
            <Gift className="w-4 h-4 mr-2" />
            Promos
          </TabsTrigger>
          <TabsTrigger value="promo-creator" className="flex items-center">
            <MessageSquare className="w-4 h-4 mr-2" />
            Content
          </TabsTrigger>
          <TabsTrigger value="templates" className="flex items-center">
            <FileType className="w-4 h-4 mr-2" />
            Templates
          </TabsTrigger>
          <TabsTrigger value="platapay" className="flex items-center">
            <CreditCard className="w-4 h-4 mr-2" />
            PlataPay
          </TabsTrigger>
          <TabsTrigger value="ai-tools" className="flex items-center">
            <Sparkles className="w-4 h-4 mr-2" />
            AI Tools
          </TabsTrigger>
          <TabsTrigger value="agents" className="flex items-center">
            <Brain className="w-4 h-4 mr-2" />
            AI Agents
          </TabsTrigger>
          <TabsTrigger value="analytics" className="flex items-center">
            <BarChart3 className="w-4 h-4 mr-2" />
            Analytics
          </TabsTrigger>
          <TabsTrigger value="testing" className="flex items-center">
            <AlertCircle className="w-4 h-4 mr-2" />
            Testing
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
const AIMarketingTools: React.FC<{ onCopyGenerated: (content: string) => void }> = ({ onCopyGenerated }) => {
  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row gap-6">
        <div className="md:w-1/2">
          <MarketingCopyGenerator 
            onCopyGenerated={onCopyGenerated} 
          />
        </div>
        
        <div className="md:w-1/2">
          <EmailTranslationTool />
        </div>
      </div>
      
      <div className="mt-8 mb-4">
        <h3 className="text-lg font-medium mb-4">Email Template Generator</h3>
        <EmailTemplateGenerator />
      </div>
      
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Sparkles className="mr-2 h-5 w-5 text-innovate-600" />
            AI-Powered Email Marketing System
          </CardTitle>
          <CardDescription>
            InnovateHub's intelligent marketing assistant uses multiple AI providers for optimal results
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium flex items-center">
                  <Brain className="w-4 h-4 mr-2 text-blue-600" />
                  Multi-Provider System
                </CardTitle>
              </CardHeader>
              <CardContent className="text-sm">
                <p>Our system uses Google Gemini 1.5 as the primary AI, with automatic fallback to OpenAI, Anthropic, and Mistral for optimal results.</p>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium flex items-center">
                  <Sparkles className="w-4 h-4 mr-2 text-purple-600" />
                  Agent Collaboration
                </CardTitle>
              </CardHeader>
              <CardContent className="text-sm">
                <p>Multiple specialized AI agents work together for content creation, translation, personalization and analysis to create high-performing campaigns.</p>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium flex items-center">
                  <Settings className="w-4 h-4 mr-2 text-green-600" />
                  Custom Domain Integration
                </CardTitle>
              </CardHeader>
              <CardContent className="text-sm">
                <p>The system integrates with your @innovatehub.ph domain to ensure deliverability and maintain brand consistency across all communications.</p>
              </CardContent>
            </Card>
          </div>
          
          <div className="bg-blue-50 p-4 rounded-md">
            <h4 className="text-blue-800 font-medium mb-2">How the AI System Works</h4>
            <ul className="list-disc pl-5 space-y-1 text-sm text-blue-700">
              <li>Email content is generated using Google Gemini 1.5 model for optimal efficiency</li>
              <li>Multiple specialized AI agents collaborate on different aspects of your campaigns</li>
              <li>Content is automatically optimized for engagement and deliverability</li>
              <li>The system learns from previous campaign performance to improve over time</li>
              <li>Built-in translation capabilities to reach international audiences</li>
              <li>Analytics data is processed to provide actionable insights</li>
            </ul>
          </div>
        </CardContent>
      </Card>
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
