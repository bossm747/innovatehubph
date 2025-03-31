
import React from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import AdminOverview from '@/components/admin/AdminOverview';
import UserManagement from '@/components/admin/UserManagement';
import DatabaseManagement from '@/components/admin/DatabaseManagement';
import EmailLogViewer from '@/components/admin/EmailLogViewer';
import LynAgbayInquiries from '@/components/admin/LynAgbayInquiries';
import CampaignManager from '@/components/admin/marketing/CampaignManager';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { BarChart, Mail, Database as DatabaseIcon, Users, Search } from 'lucide-react';

const DashboardTabs: React.FC = () => {
  return (
    <Tabs defaultValue="overview" className="space-y-4">
      <TabsList className="flex flex-wrap">
        <TabsTrigger value="overview">
          <BarChart className="h-4 w-4 mr-2" />
          Overview
        </TabsTrigger>
        <TabsTrigger value="users">
          <Users className="h-4 w-4 mr-2" />
          Users
        </TabsTrigger>
        <TabsTrigger value="database">
          <DatabaseIcon className="h-4 w-4 mr-2" />
          Database
        </TabsTrigger>
        <TabsTrigger value="email-logs">
          <Mail className="h-4 w-4 mr-2" />
          Email Logs
        </TabsTrigger>
        <TabsTrigger value="email-marketing">
          <Mail className="h-4 w-4 mr-2" />
          Email Marketing
        </TabsTrigger>
        <TabsTrigger value="search-inquiries">
          <Search className="h-4 w-4 mr-2" />
          Search Inquiries
        </TabsTrigger>
      </TabsList>
      
      <TabsContent value="overview">
        <AdminOverview />
      </TabsContent>
      
      <TabsContent value="users">
        <UserManagement />
      </TabsContent>
      
      <TabsContent value="database">
        <DatabaseManagement />
      </TabsContent>
      
      <TabsContent value="email-logs">
        <EmailLogViewer />
      </TabsContent>
      
      <TabsContent value="email-marketing">
        <CampaignManager />
      </TabsContent>
      
      <TabsContent value="search-inquiries">
        <Card>
          <CardHeader>
            <CardTitle>Search Inquiries</CardTitle>
          </CardHeader>
          <CardContent>
            <LynAgbayInquiries />
          </CardContent>
        </Card>
      </TabsContent>
    </Tabs>
  );
};

export default DashboardTabs;
