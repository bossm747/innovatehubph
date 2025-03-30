
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Users, Mail, Calendar, BarChart4 } from 'lucide-react';

interface DashboardStatsProps {
  stats: {
    inquiries: number;
    subscribers: number;
    appointments: number;
    campaigns: number;
  };
  isLoading: boolean;
}

export const DashboardStats: React.FC<DashboardStatsProps> = ({ stats, isLoading }) => {
  const statItems = [
    {
      title: 'Inquiries',
      value: stats.inquiries,
      icon: <Mail className="h-8 w-8 text-blue-500" />,
      color: 'border-blue-100 hover:border-blue-300',
      description: 'Total customer inquiries'
    },
    {
      title: 'Subscribers',
      value: stats.subscribers, 
      icon: <Users className="h-8 w-8 text-green-500" />,
      color: 'border-green-100 hover:border-green-300',
      description: 'Newsletter subscribers'
    },
    {
      title: 'Appointments',
      value: stats.appointments,
      icon: <Calendar className="h-8 w-8 text-purple-500" />,
      color: 'border-purple-100 hover:border-purple-300',
      description: 'Scheduled meetings'
    },
    {
      title: 'Campaigns',
      value: stats.campaigns,
      icon: <BarChart4 className="h-8 w-8 text-orange-500" />,
      color: 'border-orange-100 hover:border-orange-300',
      description: 'Marketing campaigns'
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
      {statItems.map((item, index) => (
        <Card 
          key={index} 
          className={`overflow-hidden transition-all hover:shadow-md border-l-4 ${item.color}`}
        >
          <CardHeader className="pb-2">
            <div className="flex justify-between items-start">
              {item.icon}
            </div>
          </CardHeader>
          <CardContent>
            <h3 className="text-lg font-medium text-muted-foreground">{item.title}</h3>
            {isLoading ? (
              <div className="h-8 w-16 bg-gray-200 animate-pulse rounded mt-1"></div>
            ) : (
              <div>
                <p className="text-3xl font-bold">{item.value}</p>
                <p className="text-xs text-muted-foreground mt-1">{item.description}</p>
              </div>
            )}
          </CardContent>
        </Card>
      ))}
    </div>
  );
};
