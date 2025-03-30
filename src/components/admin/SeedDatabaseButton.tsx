
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';
import { AlertCircle, Database } from 'lucide-react';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

interface SeedDatabaseButtonProps {
  refreshStats?: () => void;
}

const SeedDatabaseButton: React.FC<SeedDatabaseButtonProps> = ({ refreshStats }) => {
  const [isLoading, setIsLoading] = useState(false);
  
  const seedDatabaseWithSampleData = async () => {
    setIsLoading(true);
    try {
      // Sample inquiries
      const inquiries = [
        {
          name: 'John Doe',
          email: 'john.doe@example.com',
          phone: '+6391234567890',
          company: 'ABC Corp',
          service: 'Fintech Solutions',
          message: 'We are interested in implementing digital payment solutions for our business.'
        },
        {
          name: 'Maria Santos',
          email: 'maria@example.com',
          phone: '+6391987654321',
          company: 'Santos Enterprises',
          service: 'E-commerce',
          message: 'Looking to set up an online store for our retail business.'
        },
        {
          name: 'Ahmed Khan',
          email: 'ahmed@example.com',
          phone: '+6391555778899',
          company: 'Global Tech',
          service: 'AI Solutions',
          message: 'Interested in AI chatbots for customer service.'
        }
      ];
      
      // Sample subscribers
      const subscribers = [
        { name: 'Jane Smith', email: 'jane.smith@example.com', source: 'website' },
        { name: 'Robert Johnson', email: 'robert@example.com', source: 'newsletter' },
        { name: 'Sarah Lee', email: 'sarah@example.com', source: 'website' },
        { name: 'Michael Brown', email: 'michael@example.com', source: 'referral' },
        { name: 'Lisa Chen', email: 'lisa@example.com', source: 'website' }
      ];
      
      // Sample appointments
      const appointments = [
        {
          name: 'David Wilson',
          email: 'david@example.com',
          phone: '+6391234567891',
          company: 'Wilson Traders',
          meeting_type: 'Consultation',
          topic: 'Digital Customizations',
          scheduled_at: new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString(),
          duration: '30min'
        },
        {
          name: 'Elena Garcia',
          email: 'elena@example.com',
          phone: '+6391234567892',
          company: 'Garcia Foods',
          meeting_type: 'Demo',
          topic: 'PlataPay Integration',
          scheduled_at: new Date(Date.now() + 48 * 60 * 60 * 1000).toISOString(),
          duration: '45min'
        }
      ];
      
      // Sample campaigns
      const campaigns = [
        {
          name: 'Summer Promotion',
          subject: 'Special Summer Offers from InnovateHub',
          content: 'Check out our special summer promotion for digital services!',
          status: 'draft'
        },
        {
          name: 'New Service Announcement',
          subject: 'Introducing Our New AI Solutions',
          content: 'We are excited to announce our new AI solutions for businesses of all sizes!',
          status: 'draft'
        }
      ];
      
      // Insert sample data into tables
      const { error: inquiriesError } = await supabase.from('inquiries').insert(inquiries);
      const { error: subscribersError } = await supabase.from('subscribers').insert(subscribers);
      const { error: appointmentsError } = await supabase.from('appointments').insert(appointments);
      const { error: campaignsError } = await supabase.from('marketing_campaigns').insert(campaigns);
      
      if (inquiriesError || subscribersError || appointmentsError || campaignsError) {
        throw new Error('Error seeding database');
      }
      
      toast.success('Database seeded with sample data successfully!');
      
      // Refresh stats if provided
      if (refreshStats) {
        refreshStats();
      }
      
    } catch (error) {
      console.error('Error seeding database:', error);
      toast.error('Failed to seed database with sample data');
    } finally {
      setIsLoading(false);
    }
  };
  
  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button 
          className="w-full flex items-center justify-center bg-green-600 hover:bg-green-700" 
          disabled={isLoading}
        >
          <Database className="mr-2 h-4 w-4" />
          {isLoading ? 'Seeding...' : 'Seed Database with Sample Data'}
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle className="flex items-center">
            <AlertCircle className="h-5 w-5 mr-2 text-yellow-500" />
            Seed Database
          </AlertDialogTitle>
          <AlertDialogDescription>
            This will add sample data to your database including inquiries, subscribers, appointments, and marketing campaigns. Are you sure you want to proceed?
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction onClick={seedDatabaseWithSampleData}>
            Yes, Seed Database
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default SeedDatabaseButton;
