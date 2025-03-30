
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowUpRight, Users, Server, Code, Brain, GitBranch, Mail, CreditCard } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';

const AdminOverview = () => {
  const navigate = useNavigate();
  const [recentInquiries, setRecentInquiries] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  
  useEffect(() => {
    const fetchRecentActivity = async () => {
      try {
        // Fetch recent inquiries
        const { data, error } = await supabase
          .from('inquiries')
          .select('*')
          .order('created_at', { ascending: false })
          .limit(5);
          
        if (error) throw error;
        setRecentInquiries(data || []);
      } catch (error) {
        console.error('Error fetching recent activity:', error);
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchRecentActivity();
  }, []);
  
  const adminTools = [
    {
      title: 'User Management',
      icon: <Users className="h-8 w-8 text-purple-500" />,
      description: 'Manage user accounts, permissions, and roles',
      action: () => navigate('/admin/users'),
      color: 'border-purple-100',
    },
    {
      title: 'Content Management',
      icon: <Server className="h-8 w-8 text-blue-500" />,
      description: 'Manage website pages, sections, and content',
      action: () => navigate('/admin/content-management'),
      color: 'border-blue-100',
    },
    {
      title: 'AI Management',
      icon: <Brain className="h-8 w-8 text-green-500" />,
      description: 'Manage AI resources, projects, and generated content',
      action: () => navigate('/ai-tools'),
      color: 'border-green-100',
    },
    {
      title: 'Navigation',
      icon: <GitBranch className="h-8 w-8 text-pink-500" />,
      description: 'Configure website navigation structure',
      action: () => navigate('/admin/navigation'),
      color: 'border-pink-100',
    },
    {
      title: 'Email Campaigns',
      icon: <Mail className="h-8 w-8 text-orange-500" />,
      description: 'Create and manage marketing email campaigns',
      action: () => toast.info('Email campaign management is coming soon'),
      color: 'border-orange-100',
    },
    {
      title: 'Design Settings',
      icon: <CreditCard className="h-8 w-8 text-indigo-500" />,
      description: 'Configure website colors, fonts, and styles',
      action: () => navigate('/admin/design'),
      color: 'border-indigo-100',
    },
  ];

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {adminTools.map((tool, index) => (
          <Card key={index} className={`overflow-hidden transition-all hover:shadow-md border-l-4 ${tool.color}`}>
            <CardHeader className="pb-2">
              <div className="flex justify-between items-start">
                {tool.icon}
              </div>
              <CardTitle className="mt-3">{tool.title}</CardTitle>
              <CardDescription>{tool.description}</CardDescription>
            </CardHeader>
            <CardFooter className="pt-2">
              <Button 
                variant="ghost" 
                onClick={tool.action}
                className="w-full justify-between group"
              >
                <span>Access Tool</span>
                <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
      
      <Card>
        <CardHeader>
          <CardTitle>Recent Inquiries</CardTitle>
          <CardDescription>Latest inquiries from your website</CardDescription>
        </CardHeader>
        <CardContent>
          {isLoading ? (
            <div className="space-y-2">
              {[1, 2, 3].map((item) => (
                <div key={item} className="h-16 bg-gray-100 animate-pulse rounded"></div>
              ))}
            </div>
          ) : recentInquiries.length > 0 ? (
            <div className="space-y-2">
              {recentInquiries.map((inquiry) => (
                <div key={inquiry.id} className="p-3 border rounded-md hover:bg-gray-50">
                  <div className="flex justify-between">
                    <h4 className="font-medium">{inquiry.name}</h4>
                    <span className="text-sm text-muted-foreground">
                      {new Date(inquiry.created_at).toLocaleDateString()}
                    </span>
                  </div>
                  <div className="flex justify-between items-center mt-1">
                    <p className="text-sm text-muted-foreground">{inquiry.email}</p>
                    <span className="text-xs bg-blue-100 text-blue-800 px-2 py-0.5 rounded-full">
                      {inquiry.service || "General"}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-center text-muted-foreground py-4">No recent inquiries found</p>
          )}
        </CardContent>
        <CardFooter>
          <Button 
            variant="outline" 
            onClick={() => navigate('/admin/database')}
            className="w-full"
          >
            View All Inquiries
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
};

export default AdminOverview;
