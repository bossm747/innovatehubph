
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';
import { Loader2 } from 'lucide-react';

const SeedDatabaseButton = () => {
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);

  const handleSeedDatabase = async () => {
    setIsLoading(true);
    try {
      // Add team members
      const { error: teamError } = await supabase.from('team_members').insert([
        { name: 'John Doe', position: 'CEO', bio: 'Founder with 15 years in fintech', image_url: '/team/ceo.jpg' },
        { name: 'Jane Smith', position: 'CTO', bio: 'Tech expert with background in AI', image_url: '/team/cto.jpg' },
        { name: 'Mike Johnson', position: 'COO', bio: 'Operations specialist with global experience', image_url: '/team/coo.jpg' }
      ]);

      if (teamError) throw new Error(`Error seeding team members: ${teamError.message}`);

      // Add services
      const { error: servicesError } = await supabase.from('services').insert([
        { 
          name: 'PlataPay', 
          description: 'Digital wallet and payment solution', 
          features: 'Bills Payment, Remittance, E-Loading, QR Payments', 
          icon: 'wallet'
        },
        { 
          name: 'Digital Customizations', 
          description: 'Custom software solutions', 
          features: 'Business Model Dev, Strategic IT Consulting', 
          icon: 'code'
        },
        { 
          name: 'E-Commerce Development', 
          description: 'Complete online store solutions', 
          features: 'Online Stores, Payment Integration, Order Management', 
          icon: 'shopping-cart'
        }
      ]);

      if (servicesError) throw new Error(`Error seeding services: ${servicesError.message}`);

      // Add testimonials
      const { error: testimonialsError } = await supabase.from('testimonials').insert([
        { 
          name: 'Maria Santos', 
          company: 'LocalMart Inc.', 
          content: 'PlataPay transformed our small business. Now we can accept digital payments easily!',
          avatar_url: '/testimonials/avatar1.jpg',
          rating: 5
        },
        { 
          name: 'Roberto Garcia', 
          company: 'TechSolutions PH', 
          content: 'The custom software InnovateHub developed exceeded our expectations.',
          avatar_url: '/testimonials/avatar2.jpg',
          rating: 4
        }
      ]);

      if (testimonialsError) throw new Error(`Error seeding testimonials: ${testimonialsError.message}`);

      toast({
        title: "Database Seeded Successfully",
        description: "Sample data has been added to the database.",
      });
    } catch (error) {
      console.error('Error seeding database:', error);
      toast({
        title: "Error Seeding Database",
        description: error instanceof Error ? error.message : "An unknown error occurred",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Button onClick={handleSeedDatabase} disabled={isLoading}>
      {isLoading ? (
        <>
          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
          Seeding...
        </>
      ) : (
        'Seed Database'
      )}
    </Button>
  );
};

export default SeedDatabaseButton;
