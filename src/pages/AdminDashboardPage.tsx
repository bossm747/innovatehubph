import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import AdminOverview from '@/components/admin/AdminOverview';
import UserManagement from '@/components/admin/UserManagement';
import DatabaseManagement from '@/components/admin/DatabaseManagement';
import EmailLogViewer from '@/components/admin/EmailLogViewer';
import SeedDatabaseButton from '@/components/admin/SeedDatabaseButton';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { supabase } from '@/integrations/supabase/client';
import { toast, Toaster } from 'sonner';
import { DashboardStats } from '@/components/admin/DashboardStats';
import CampaignManager from '@/components/admin/marketing/CampaignManager';
import { RefreshCw, Mail, BarChart, Database as DatabaseIcon, Users } from 'lucide-react';
import { Button } from '@/components/ui/button';

const AdminDashboardPage = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [stats, setStats] = useState({
    inquiries: 0,
    subscribers: 0,
    appointments: 0,
    campaigns: 0
  });
  
  const fetchDashboardStats = async () => {
    setIsLoading(true);
    try {
      // Fetch inquiries count
      const { count: inquiriesCount, error: inquiriesError } = await supabase
        .from('inquiries')
        .select('*', { count: 'exact', head: true });
        
      // Fetch subscribers count
      const { count: subscribersCount, error: subscribersError } = await supabase
        .from('subscribers')
        .select('*', { count: 'exact', head: true });
        
      // Fetch appointments count
      const { count: appointmentsCount, error: appointmentsError } = await supabase
        .from('appointments')
        .select('*', { count: 'exact', head: true });
        
      // Fetch campaigns count
      const { count: campaignsCount, error: campaignsError } = await supabase
        .from('marketing_campaigns')
        .select('*', { count: 'exact', head: true });
      
      if (inquiriesError || subscribersError || appointmentsError || campaignsError) {
        throw new Error('Error fetching dashboard statistics');
      }
      
      setStats({
        inquiries: inquiriesCount || 0,
        subscribers: subscribersCount || 0,
        appointments: appointmentsCount || 0,
        campaigns: campaignsCount || 0
      });
      
    } catch (error) {
      console.error('Error fetching dashboard stats:', error);
      toast.error('Failed to load dashboard statistics');
    } finally {
      setIsLoading(false);
    }
  };
  
  useEffect(() => {
    fetchDashboardStats();
  }, []);

  return (
    <div className="min-h-screen w-full overflow-x-hidden relative">
      <Helmet>
        <title>Admin Dashboard | InnovateHub</title>
        <meta name="description" content="InnovateHub administrative dashboard for admin members" />
      </Helmet>
      
      <Navbar />
      <Toaster />
      
      <main className="container mx-auto px-4 py-8">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-start mb-8">
            <div>
              <h1 className="text-3xl font-bold">Admin Dashboard</h1>
              <p className="text-muted-foreground">Manage your website content and operations</p>
            </div>
            
            <Button 
              variant="outline" 
              size="sm"
              onClick={fetchDashboardStats}
              disabled={isLoading}
              className="mt-2 md:mt-0"
            >
              <RefreshCw className={`h-4 w-4 mr-2 ${isLoading ? 'animate-spin' : ''}`} />
              Refresh Data
            </Button>
          </div>
          
          <DashboardStats stats={stats} isLoading={isLoading} />
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle>Quick Actions</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <SeedDatabaseButton refreshStats={fetchDashboardStats} />
                </div>
              </CardContent>
            </Card>
            
            <Card className="md:col-span-2">
              <CardHeader className="pb-2">
                <CardTitle>Dashboard Overview</CardTitle>
              </CardHeader>
              <CardContent>
                <p>Welcome to the InnovateHub admin dashboard. From here, you can manage your website content, users, database entries, and monitor email communications. Use the tabs below to navigate through different management sections.</p>
              </CardContent>
            </Card>
          </div>
          
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
          </Tabs>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default AdminDashboardPage;
