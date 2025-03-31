
import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Toaster } from 'sonner';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';
import { DashboardStats } from '@/components/admin/DashboardStats';
import LynAgbayInquiries from '@/components/admin/LynAgbayInquiries';
import DashboardHeader from '@/components/admin/dashboard/DashboardHeader';
import QuickActions from '@/components/admin/dashboard/QuickActions';
import DashboardOverview from '@/components/admin/dashboard/DashboardOverview';
import DashboardTabs from '@/components/admin/dashboard/DashboardTabs';

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
          <DashboardHeader isLoading={isLoading} refreshData={fetchDashboardStats} />
          
          <DashboardStats stats={stats} isLoading={isLoading} />
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <QuickActions refreshStats={fetchDashboardStats} />
            <DashboardOverview />
          </div>
          
          {/* Add Lyn Agbay Inquiries Component */}
          <div className="mb-8">
            <LynAgbayInquiries />
          </div>
          
          <DashboardTabs />
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default AdminDashboardPage;
