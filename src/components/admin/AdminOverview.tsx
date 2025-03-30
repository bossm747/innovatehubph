
import React, { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Mail, RefreshCw, ArrowRight, Clock, CheckCircle, AlertCircle, Users } from 'lucide-react';
import { format, parseISO } from 'date-fns';

const AdminOverview = () => {
  const [recentInquiries, setRecentInquiries] = useState<any[]>([]);
  const [recentAppointments, setRecentAppointments] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const fetchRecentData = async () => {
    setIsLoading(true);
    try {
      // Fetch recent inquiries
      const { data: inquiriesData, error: inquiriesError } = await supabase
        .from('inquiries')
        .select('*')
        .order('created_at', { ascending: false })
        .limit(5);

      if (inquiriesError) throw inquiriesError;
      setRecentInquiries(inquiriesData || []);

      // Fetch recent appointments
      const { data: appointmentsData, error: appointmentsError } = await supabase
        .from('appointments')
        .select('*')
        .order('created_at', { ascending: false })
        .limit(5);

      if (appointmentsError) throw appointmentsError;
      setRecentAppointments(appointmentsData || []);

    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchRecentData();
  }, []);

  const formatDate = (dateString: string) => {
    try {
      return format(parseISO(dateString), 'MMM dd, yyyy');
    } catch (e) {
      return 'Invalid date';
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Admin Overview</h2>
        <Button variant="outline" size="sm" onClick={fetchRecentData} disabled={isLoading}>
          <RefreshCw className={`h-4 w-4 mr-2 ${isLoading ? 'animate-spin' : ''}`} />
          Refresh
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle className="flex items-center">
              <Mail className="h-5 w-5 mr-2 text-blue-600" />
              Recent Inquiries
            </CardTitle>
            <CardDescription>The latest customer inquiries received</CardDescription>
          </CardHeader>
          <CardContent>
            {isLoading ? (
              <div className="space-y-4">
                {[...Array(3)].map((_, i) => (
                  <div key={i} className="flex flex-col space-y-2">
                    <div className="h-5 bg-gray-200 rounded w-1/3 animate-pulse"></div>
                    <div className="h-4 bg-gray-200 rounded w-full animate-pulse"></div>
                  </div>
                ))}
              </div>
            ) : recentInquiries.length === 0 ? (
              <div className="text-center text-muted-foreground py-8">
                No inquiries found
              </div>
            ) : (
              <div className="space-y-4">
                {recentInquiries.map((inquiry) => (
                  <div key={inquiry.id} className="border-b pb-4 last:border-0 last:pb-0">
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="font-medium">{inquiry.name}</h3>
                        <p className="text-sm text-muted-foreground">{inquiry.email}</p>
                      </div>
                      <div className="flex items-center">
                        <Badge variant={inquiry.processed ? "outline" : "default"}>
                          {inquiry.processed ? "Processed" : "New"}
                        </Badge>
                        <span className="text-xs text-muted-foreground ml-2">
                          {formatDate(inquiry.created_at)}
                        </span>
                      </div>
                    </div>
                    <p className="text-sm mt-2 line-clamp-2">
                      {inquiry.message || inquiry.requirements || 'No message provided'}
                    </p>
                    <div className="mt-2 flex justify-between items-center">
                      <Badge variant="secondary">
                        {inquiry.service || 'General Inquiry'}
                      </Badge>
                      <Button variant="ghost" size="sm" className="h-7">
                        <span className="text-xs">View Details</span>
                        <ArrowRight className="h-3 w-3 ml-1" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Clock className="h-5 w-5 mr-2 text-purple-600" />
              Upcoming Appointments
            </CardTitle>
            <CardDescription>Your scheduled meetings</CardDescription>
          </CardHeader>
          <CardContent>
            {isLoading ? (
              <div className="space-y-4">
                {[...Array(3)].map((_, i) => (
                  <div key={i} className="h-16 bg-gray-200 rounded animate-pulse"></div>
                ))}
              </div>
            ) : recentAppointments.length === 0 ? (
              <div className="text-center text-muted-foreground py-8">
                No upcoming appointments
              </div>
            ) : (
              <div className="space-y-3">
                {recentAppointments.map((appointment) => (
                  <div key={appointment.id} className="border rounded-md p-3">
                    <div className="flex justify-between">
                      <h4 className="font-medium">{appointment.name}</h4>
                      <Badge variant={
                        appointment.status === 'pending' ? 'outline' : 
                        appointment.status === 'confirmed' ? 'default' : 
                        'secondary'
                      }>
                        {appointment.status}
                      </Badge>
                    </div>
                    <p className="text-sm text-muted-foreground">{appointment.topic}</p>
                    <div className="flex justify-between items-center mt-2">
                      <span className="text-xs font-medium">
                        {appointment.scheduled_at && formatDate(appointment.scheduled_at)}
                      </span>
                      <span className="text-xs bg-gray-100 rounded px-2 py-1">
                        {appointment.duration}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <CheckCircle className="h-5 w-5 mr-2 text-green-600" />
              Quick Tasks
            </CardTitle>
            <CardDescription>Actions that need your attention</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <Button variant="outline" className="w-full justify-start">
                <Mail className="h-4 w-4 mr-2" />
                Create New Email Campaign
              </Button>
              <Button variant="outline" className="w-full justify-start">
                <Users className="h-4 w-4 mr-2" />
                Manage User Permissions
              </Button>
              <Button variant="outline" className="w-full justify-start">
                <AlertCircle className="h-4 w-4 mr-2" />
                Review Unprocessed Inquiries
              </Button>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>System Status</CardTitle>
            <CardDescription>Current system performance</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-sm">Database</span>
                <Badge variant="outline" className="bg-green-50 text-green-700">Operational</Badge>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm">Email Service</span>
                <Badge variant="outline" className="bg-green-50 text-green-700">Operational</Badge>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm">Storage</span>
                <Badge variant="outline" className="bg-green-50 text-green-700">Operational</Badge>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm">Authentication</span>
                <Badge variant="outline" className="bg-green-50 text-green-700">Operational</Badge>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default AdminOverview;
