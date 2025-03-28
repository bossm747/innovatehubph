
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Users, Database, FileText, LayoutDashboard } from 'lucide-react';

const AdminOverview = () => {
  // Mock data for overview stats
  const stats = [
    {
      title: "Staff Users",
      value: 12,
      icon: <Users className="h-5 w-5 text-blue-600" />,
      description: "Total staff accounts"
    },
    {
      title: "Client Inquiries",
      value: 48,
      icon: <FileText className="h-5 w-5 text-green-600" />,
      description: "Total client inquiries"
    },
    {
      title: "AI Projects",
      value: 7,
      icon: <LayoutDashboard className="h-5 w-5 text-purple-600" />,
      description: "Active AI projects"
    },
    {
      title: "Subscribers",
      value: 189,
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
            <div className="space-y-4">
              <div className="flex items-start gap-4">
                <div className="bg-blue-100 p-2 rounded-full">
                  <Users className="h-4 w-4 text-blue-600" />
                </div>
                <div>
                  <p className="text-sm font-medium">New staff member added</p>
                  <p className="text-xs text-gray-500">2 hours ago</p>
                </div>
              </div>
              
              <div className="flex items-start gap-4">
                <div className="bg-green-100 p-2 rounded-full">
                  <FileText className="h-4 w-4 text-green-600" />
                </div>
                <div>
                  <p className="text-sm font-medium">Client inquiry processed</p>
                  <p className="text-xs text-gray-500">5 hours ago</p>
                </div>
              </div>
              
              <div className="flex items-start gap-4">
                <div className="bg-purple-100 p-2 rounded-full">
                  <LayoutDashboard className="h-4 w-4 text-purple-600" />
                </div>
                <div>
                  <p className="text-sm font-medium">New AI project created</p>
                  <p className="text-xs text-gray-500">Yesterday</p>
                </div>
              </div>
            </div>
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
