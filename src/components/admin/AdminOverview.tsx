
import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Users, Database, FileText, LayoutDashboard } from 'lucide-react';

const AdminOverview = () => {
  const { data: userCount, isLoading: loadingUsers } = useQuery({
    queryKey: ['admin-user-count'],
    queryFn: async () => {
      const { count, error } = await supabase
        .from('staff_profiles')
        .select('*', { count: 'exact', head: true });
      
      if (error) throw error;
      return count || 0;
    }
  });

  const { data: inquiryCount, isLoading: loadingInquiries } = useQuery({
    queryKey: ['admin-inquiry-count'],
    queryFn: async () => {
      const { count, error } = await supabase
        .from('inquiries')
        .select('*', { count: 'exact', head: true });
      
      if (error) throw error;
      return count || 0;
    }
  });

  const { data: projectCount, isLoading: loadingProjects } = useQuery({
    queryKey: ['admin-project-count'],
    queryFn: async () => {
      const { count, error } = await supabase
        .from('ai_projects')
        .select('*', { count: 'exact', head: true });
      
      if (error) throw error;
      return count || 0;
    }
  });

  const { data: subscriberCount, isLoading: loadingSubscribers } = useQuery({
    queryKey: ['admin-subscriber-count'],
    queryFn: async () => {
      const { count, error } = await supabase
        .from('subscribers')
        .select('*', { count: 'exact', head: true });
      
      if (error) throw error;
      return count || 0;
    }
  });

  const stats = [
    {
      title: "Staff Users",
      value: loadingUsers ? "Loading..." : userCount,
      icon: <Users className="h-5 w-5 text-blue-600" />,
      description: "Total staff accounts"
    },
    {
      title: "Client Inquiries",
      value: loadingInquiries ? "Loading..." : inquiryCount,
      icon: <FileText className="h-5 w-5 text-green-600" />,
      description: "Total client inquiries"
    },
    {
      title: "AI Projects",
      value: loadingProjects ? "Loading..." : projectCount,
      icon: <LayoutDashboard className="h-5 w-5 text-purple-600" />,
      description: "Active AI projects"
    },
    {
      title: "Subscribers",
      value: loadingSubscribers ? "Loading..." : subscriberCount,
      icon: <Database className="h-5 w-5 text-orange-600" />,
      description: "Newsletter subscribers"
    }
  ];

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat, index) => (
          <Card key={index}>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">{stat.title}</CardTitle>
              {stat.icon}
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stat.value}</div>
              <p className="text-xs text-muted-foreground">{stat.description}</p>
            </CardContent>
          </Card>
        ))}
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Recent Activities</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-gray-500">
              Recent system activities will be displayed here in a future update.
            </p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>System Status</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <span className="text-sm">Database</span>
                <span className="text-xs px-2 py-1 rounded-full bg-green-100 text-green-800">Online</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm">Authentication</span>
                <span className="text-xs px-2 py-1 rounded-full bg-green-100 text-green-800">Online</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm">Storage</span>
                <span className="text-xs px-2 py-1 rounded-full bg-green-100 text-green-800">Online</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm">Edge Functions</span>
                <span className="text-xs px-2 py-1 rounded-full bg-green-100 text-green-800">Online</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default AdminOverview;
