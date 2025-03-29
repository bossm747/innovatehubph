
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';
import PageContentEditor from './content/PageContentEditor';
import { initialContentData } from '@/data/contentManagementData';
import { Globe, Home, Info, Monitor, CreditCard } from 'lucide-react';

const ContentManagement = () => {
  const [contentData, setContentData] = useState(initialContentData);
  const [activeTab, setActiveTab] = useState('home');

  const saveContent = (updatedContent: typeof contentData) => {
    setContentData(updatedContent);
    toast.success('Content updated successfully!');
  };

  const getPageIcon = (pageName: string) => {
    switch (pageName.toLowerCase()) {
      case 'home':
        return <Home className="h-4 w-4 mr-2" />;
      case 'about':
        return <Info className="h-4 w-4 mr-2" />;
      case 'services':
        return <Monitor className="h-4 w-4 mr-2" />;
      case 'platapay':
        return <CreditCard className="h-4 w-4 mr-2" />;
      default:
        return <Globe className="h-4 w-4 mr-2" />;
    }
  };

  // Get unique page names for tabs
  const pageNames = Array.from(new Set(contentData.map(item => item.pageName.toLowerCase())));

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Website Content Management</CardTitle>
          <CardDescription>
            Edit the content of your website pages and sections
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="grid grid-cols-4 mb-6">
              {pageNames.map(pageName => (
                <TabsTrigger key={pageName} value={pageName} className="flex items-center">
                  {getPageIcon(pageName)}
                  {pageName.charAt(0).toUpperCase() + pageName.slice(1)}
                </TabsTrigger>
              ))}
            </TabsList>

            {pageNames.map(pageName => (
              <TabsContent key={pageName} value={pageName}>
                <PageContentEditor 
                  pageContent={contentData.filter(item => item.pageName.toLowerCase() === pageName)}
                  allContent={contentData}
                  onSave={saveContent}
                />
              </TabsContent>
            ))}
          </Tabs>
        </CardContent>
      </Card>
      
      <div className="flex justify-end">
        <Button 
          onClick={() => {
            // Here we could save to database or generate JSON config
            toast.success('All changes saved successfully!');
          }}
          className="bg-innovate-600 hover:bg-innovate-700"
        >
          Save All Changes
        </Button>
      </div>
    </div>
  );
};

export default ContentManagement;
