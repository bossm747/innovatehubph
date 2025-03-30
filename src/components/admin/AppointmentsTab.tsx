
import React, { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { toast } from 'sonner';
import { format } from 'date-fns';
import { supabase } from '@/integrations/supabase/client';
import { CalendarIcon, Clock, Phone, Video, Mail, Building, User } from 'lucide-react';

interface Appointment {
  id: string;
  name: string;
  email: string;
  phone: string | null;
  company: string | null;
  scheduled_at: string;
  duration: string;
  meeting_type: 'call' | 'video';
  topic: string;
  notes: string | null;
  status: 'pending' | 'confirmed' | 'cancelled' | 'completed';
  created_at: string;
}

const AppointmentsTab = () => {
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [statusFilter, setStatusFilter] = useState<string>('all');

  useEffect(() => {
    fetchAppointments();
  }, []);

  const fetchAppointments = async () => {
    setIsLoading(true);
    try {
      let query = supabase
        .from('appointments')
        .select('*')
        .order('scheduled_at', { ascending: true });

      if (statusFilter !== 'all') {
        query = query.eq('status', statusFilter);
      }

      const { data, error } = await query;

      if (error) {
        throw error;
      }

      setAppointments(data as Appointment[]);
    } catch (error) {
      console.error('Error fetching appointments:', error);
      toast.error('Failed to load appointments');
    } finally {
      setIsLoading(false);
    }
  };

  const updateAppointmentStatus = async (id: string, newStatus: string) => {
    try {
      const { error } = await supabase
        .from('appointments')
        .update({ status: newStatus })
        .eq('id', id);

      if (error) {
        throw error;
      }

      // Update local state
      setAppointments(prev => 
        prev.map(app => app.id === id ? { ...app, status: newStatus as any } : app)
      );

      toast.success(`Appointment ${newStatus}`);
    } catch (error) {
      console.error('Error updating appointment:', error);
      toast.error('Failed to update appointment');
    }
  };

  const handleFilterChange = (value: string) => {
    setStatusFilter(value);
    fetchAppointments();
  };

  // Helper function to format date
  const formatDate = (dateString: string) => {
    return format(new Date(dateString), 'MMM d, yyyy - h:mm a');
  };

  // Get status color
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      case 'confirmed': return 'bg-green-100 text-green-800';
      case 'cancelled': return 'bg-red-100 text-red-800';
      case 'completed': return 'bg-blue-100 text-blue-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <h2 className="text-2xl font-bold">Appointment Management</h2>
        
        <div className="flex items-center gap-3">
          <Select value={statusFilter} onValueChange={handleFilterChange}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Filter by status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Appointments</SelectItem>
              <SelectItem value="pending">Pending</SelectItem>
              <SelectItem value="confirmed">Confirmed</SelectItem>
              <SelectItem value="cancelled">Cancelled</SelectItem>
              <SelectItem value="completed">Completed</SelectItem>
            </SelectContent>
          </Select>
          
          <Button variant="outline" onClick={() => fetchAppointments()}>
            Refresh
          </Button>
        </div>
      </div>
      
      {isLoading ? (
        <div className="text-center py-10">
          <div className="animate-spin w-6 h-6 border-2 border-innovate-600 border-t-transparent rounded-full mx-auto mb-2"></div>
          <p>Loading appointments...</p>
        </div>
      ) : appointments.length === 0 ? (
        <div className="text-center py-10 bg-gray-50 rounded-lg">
          <CalendarIcon className="w-10 h-10 mx-auto mb-2 text-gray-400" />
          <h3 className="text-lg font-medium text-gray-900">No appointments found</h3>
          <p className="mt-1 text-sm text-gray-500">
            {statusFilter !== 'all' 
              ? `There are no appointments with status: ${statusFilter}` 
              : 'No appointments have been scheduled yet'}
          </p>
        </div>
      ) : (
        <div className="space-y-4">
          {appointments.map((appointment) => (
            <div key={appointment.id} className="bg-white p-5 rounded-lg border shadow-sm">
              <div className="flex justify-between items-start">
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <h3 className="text-lg font-semibold">{appointment.topic}</h3>
                    <span className={`text-xs px-2 py-1 rounded-full ${getStatusColor(appointment.status)}`}>
                      {appointment.status.charAt(0).toUpperCase() + appointment.status.slice(1)}
                    </span>
                  </div>
                  
                  <div className="flex items-center gap-4 text-sm text-gray-500 mb-3">
                    <div className="flex items-center">
                      <CalendarIcon className="w-4 h-4 mr-1" />
                      {formatDate(appointment.scheduled_at)}
                    </div>
                    <div className="flex items-center">
                      <Clock className="w-4 h-4 mr-1" />
                      {appointment.duration === '30min' ? '30 minutes' : '1 hour'}
                    </div>
                    <div className="flex items-center">
                      {appointment.meeting_type === 'video' ? (
                        <Video className="w-4 h-4 mr-1 text-green-600" />
                      ) : (
                        <Phone className="w-4 h-4 mr-1 text-blue-600" />
                      )}
                      {appointment.meeting_type === 'video' ? 'Video Conference' : 'Phone Call'}
                    </div>
                  </div>
                </div>
                
                <div className="flex gap-2">
                  {appointment.status === 'pending' && (
                    <>
                      <Button 
                        size="sm" 
                        variant="outline" 
                        className="border-green-500 text-green-600 hover:bg-green-50"
                        onClick={() => updateAppointmentStatus(appointment.id, 'confirmed')}
                      >
                        Confirm
                      </Button>
                      <Button 
                        size="sm" 
                        variant="outline" 
                        className="border-red-500 text-red-600 hover:bg-red-50"
                        onClick={() => updateAppointmentStatus(appointment.id, 'cancelled')}
                      >
                        Cancel
                      </Button>
                    </>
                  )}
                  
                  {appointment.status === 'confirmed' && (
                    <Button 
                      size="sm" 
                      variant="outline" 
                      className="border-blue-500 text-blue-600 hover:bg-blue-50"
                      onClick={() => updateAppointmentStatus(appointment.id, 'completed')}
                    >
                      Mark Completed
                    </Button>
                  )}
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4 text-sm">
                <div className="space-y-2">
                  <div className="flex items-center">
                    <User className="w-4 h-4 mr-2 text-gray-500" />
                    <span className="font-medium">{appointment.name}</span>
                  </div>
                  
                  <div className="flex items-center">
                    <Mail className="w-4 h-4 mr-2 text-gray-500" />
                    <a href={`mailto:${appointment.email}`} className="text-blue-600 hover:underline">
                      {appointment.email}
                    </a>
                  </div>
                  
                  {appointment.phone && (
                    <div className="flex items-center">
                      <Phone className="w-4 h-4 mr-2 text-gray-500" />
                      <a href={`tel:${appointment.phone}`} className="text-blue-600 hover:underline">
                        {appointment.phone}
                      </a>
                    </div>
                  )}
                  
                  {appointment.company && (
                    <div className="flex items-center">
                      <Building className="w-4 h-4 mr-2 text-gray-500" />
                      <span>{appointment.company}</span>
                    </div>
                  )}
                </div>
                
                {appointment.notes && (
                  <div className="bg-gray-50 p-3 rounded border">
                    <p className="text-xs uppercase font-medium text-gray-500 mb-1">Notes</p>
                    <p className="text-gray-700">{appointment.notes}</p>
                  </div>
                )}
              </div>
              
              <div className="text-xs text-gray-500 mt-4">
                Booked on {format(new Date(appointment.created_at), 'MMM d, yyyy')}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default AppointmentsTab;
