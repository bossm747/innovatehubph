
import React from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowUpRight, Users, Server, Code, Brain, GitBranch, Mail, CreditCard } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const AdminOverview = () => {
  const navigate = useNavigate();
  
  const adminTools = [
    {
      title: 'User Management',
      icon: <Users className="h-8 w-8 text-purple-500" />,
      description: 'Manage user accounts, permissions, and roles',
      action: () => navigate('/admin/users'),
      color: 'border-purple-100',
    },
    {
      title: 'Database Management',
      icon: <Server className="h-8 w-8 text-blue-500" />,
      description: 'Access and manage database records and settings',
      action: () => navigate('/admin/database'),
      color: 'border-blue-100',
    },
    {
      title: 'AI Management',
      icon: <Brain className="h-8 w-8 text-green-500" />,
      description: 'Manage AI resources, projects, and generated content',
      action: () => navigate('/admin/ai-management'),
      color: 'border-green-100',
    },
    {
      title: 'AI Tools',
      icon: <Code className="h-8 w-8 text-pink-500" />,
      description: 'Access powerful AI tools to boost productivity',
      action: () => navigate('/admin/ai-tools'),
      color: 'border-pink-100',
    },
    {
      title: 'Email Campaigns',
      icon: <Mail className="h-8 w-8 text-orange-500" />,
      description: 'Create and manage marketing email campaigns',
      action: () => navigate('/admin/email'),
      color: 'border-orange-100',
    },
    {
      title: 'Payment Processing',
      icon: <CreditCard className="h-8 w-8 text-indigo-500" />,
      description: 'Monitor and manage payment transactions',
      action: () => navigate('/admin/payments'),
      color: 'border-indigo-100',
    },
  ];

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Admin Dashboard</h2>
      </div>
      
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
    </div>
  );
};

export default AdminOverview;
