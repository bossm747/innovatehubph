
import React, { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import CampaignManager from '@/components/admin/marketing/CampaignManager';
import RecipientsList from '@/components/admin/marketing/RecipientsList';
import EmailTranslationTool from '@/components/admin/marketing/EmailTranslationTool';
import MarketingCopyGenerator from '@/components/admin/marketing/MarketingCopyGenerator';

const AdminEmailPage: React.FC = () => {
  const [generatedContent, setGeneratedContent] = useState('');
  
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold">Email Marketing</h2>
        <p className="text-muted-foreground">
          Manage email campaigns, templates, and recipients
        </p>
      </div>
      
      <Tabs defaultValue="campaigns" className="w-full">
        <TabsList className="grid grid-cols-2 md:grid-cols-4 w-full mb-4">
          <TabsTrigger value="campaigns">Campaigns</TabsTrigger>
          <TabsTrigger value="recipients">Recipients</TabsTrigger>
          <TabsTrigger value="templates">Templates</TabsTrigger>
          <TabsTrigger value="tools">AI Tools</TabsTrigger>
        </TabsList>
        
        <TabsContent value="campaigns" className="space-y-4">
          <CampaignManager />
        </TabsContent>
        
        <TabsContent value="recipients" className="space-y-4">
          <RecipientsList />
        </TabsContent>
        
        <TabsContent value="templates" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Email Templates</CardTitle>
              <CardDescription>
                Manage reusable email templates
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-center py-8 text-muted-foreground">
                Email template management will be available here soon.
              </p>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="tools" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <MarketingCopyGenerator 
              onCopyGenerated={setGeneratedContent} 
            />
            <EmailTranslationTool />
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default AdminEmailPage;
