
import React from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { 
  ArrowUpRight, 
  Users, 
  Database, 
  Brain, 
  Code, 
  Mail, 
  CreditCard, 
  FileText, 
  Palette, 
  Menu as MenuIcon,
  Settings
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const AdminDashboard: React.FC = () => {
  const navigate = useNavigate();
  
  const adminTools = [
    {
      title: 'Content Management',
      icon: <FileText className="h-8 w-8 text-blue-500" />,
      description: 'Manage website content without coding',
      action: () => navigate('/admin/content'),
      color: 'border-blue-100',
    },
    {
      title: 'Navigation',
      icon: <MenuIcon className="h-8 w-8 text-green-500" />,
      description: 'Control website menu structure',
      action: () => navigate('/admin/navigation'),
      color: 'border-green-100',
    },
    {
      title: 'Design Settings',
      icon: <Palette className="h-8 w-8 text-purple-500" />,
      description: 'Customize appearance and themes',
      action: () => navigate('/admin/design'),
      color: 'border-purple-100',
    },
    {
      title: 'Database Management',
      icon: <Database className="h-8 w-8 text-yellow-500" />,
      description: 'Access and manage database records',
      action: () => navigate('/admin/database'),
      color: 'border-yellow-100',
    },
    {
      title: 'User Management',
      icon: <Users className="h-8 w-8 text-indigo-500" />,
      description: 'Manage user accounts and permissions',
      action: () => navigate('/admin/users'),
      color: 'border-indigo-100',
    },
    {
      title: 'Email Marketing',
      icon: <Mail className="h-8 w-8 text-orange-500" />,
      description: 'Create and manage email campaigns',
      action: () => navigate('/admin/email'),
      color: 'border-orange-100',
    },
    {
      title: 'AI Tools',
      icon: <Code className="h-8 w-8 text-pink-500" />,
      description: 'Access AI tools to boost productivity',
      action: () => navigate('/admin/ai-tools'),
      color: 'border-pink-100',
    },
    {
      title: 'AI Management',
      icon: <Brain className="h-8 w-8 text-emerald-500" />,
      description: 'Manage AI resources and capabilities',
      action: () => navigate('/admin/ai-management'),
      color: 'border-emerald-100',
    },
    {
      title: 'Payments',
      icon: <CreditCard className="h-8 w-8 text-red-500" />,
      description: 'Monitor and manage payment transactions',
      action: () => navigate('/admin/payments'),
      color: 'border-red-100',
    },
    {
      title: 'Settings',
      icon: <Settings className="h-8 w-8 text-gray-500" />,
      description: 'Configure system-wide settings',
      action: () => navigate('/admin/settings'),
      color: 'border-gray-100',
    },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold">InnovateHub Admin Dashboard</h2>
        <p className="text-muted-foreground">
          Welcome to the InnovateHub admin dashboard. Manage your website content and business operations.
        </p>
      </div>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
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
                <span>Access</span>
                <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default AdminDashboard;
