
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';

const sampleTeamMembers = [
  {
    full_name: 'Juan Dela Cruz',
    position: 'CEO & Founder',
    department: 'Leadership',
    bio: 'Juan founded InnovateHub with a vision to transform the digital landscape in the Philippines. With over 15 years of experience in tech and finance, he leads the company toward innovative solutions.',
    photo_url: '/lovable-uploads/13165526-621e-41b9-9e68-4ef94cb85f92.png',
    order_index: 1,
    is_active: true
  },
  {
    full_name: 'Maria Santos',
    position: 'Chief Technology Officer',
    department: 'Leadership',
    bio: 'Maria oversees all technological aspects at InnovateHub. Her expertise in fintech and AI has been instrumental in developing PlataPay and other innovative products.',
    photo_url: '/lovable-uploads/0831c807-9c51-4945-b543-6aa09dd81d02.png',
    order_index: 2,
    is_active: true
  },
  {
    full_name: 'Carlos Reyes',
    position: 'Head of Business Development',
    department: 'Business',
    bio: 'Carlos leads our expansion initiatives both in the Philippines and internationally. He has successfully established our presence in Dubai and continues to explore new markets.',
    photo_url: '/lovable-uploads/2b076737-e1c1-4f95-90c1-ed7befc22280.png',
    order_index: 3,
    is_active: true
  },
  {
    full_name: 'Sofia Lim',
    position: 'Lead Software Engineer',
    department: 'Engineering',
    bio: 'Sofia is the technical mind behind our digital wallet solutions. She specializes in secure payment systems and has led the development of PlataPay's core infrastructure.',
    photo_url: '/lovable-uploads/3af8c992-673b-4c57-b00d-163f51c11758.png',
    order_index: 4,
    is_active: true
  },
  {
    full_name: 'Miguel Cruz',
    position: 'UI/UX Designer',
    department: 'Design',
    bio: 'Miguel creates intuitive and engaging user experiences for all our digital products. His design philosophy centers around simplicity and accessibility for all users.',
    photo_url: '/lovable-uploads/5f09f5a6-e6df-47ae-83c4-34a9569a40c5.png',
    order_index: 5,
    is_active: true
  },
  {
    full_name: 'Isabella Garcia',
    position: 'Marketing Director',
    department: 'Marketing',
    bio: 'Isabella develops and implements our marketing strategies, focusing on digital channels and community engagement to grow the PlataPay user base.',
    photo_url: '/lovable-uploads/e0d195e2-9fce-4899-9cb5-2842af7d93fb.png',
    order_index: 6,
    is_active: true
  }
];

const sampleTestimonials = [
  {
    client_name: 'Roberto Tan',
    client_position: 'Small Business Owner',
    client_company: 'Roberto\'s Sari-Sari Store',
    content: 'PlataPay has transformed how I manage my store. I can now accept digital payments easily and my customers love the convenience. My business has grown by 30% since I became an agent!',
    rating: 5,
    is_featured: true
  },
  {
    client_name: 'Teresa Gomez',
    client_position: 'Entrepreneur',
    client_company: 'Teresa\'s Bakery',
    content: 'The e-commerce solution built by InnovateHub has allowed me to sell my baked goods online. Their team was professional and delivered exactly what I needed.',
    rating: 5,
    is_featured: true
  },
  {
    client_name: 'Marco Santos',
    client_position: 'IT Manager',
    client_company: 'ABC Corporation',
    content: 'The custom software developed by InnovateHub has streamlined our operations and reduced processing time by 50%. Their team was responsive and delivered on time.',
    rating: 4,
    is_featured: true
  }
];

const samplePlatapayAgents = [
  {
    agent_name: 'Central Market Agent',
    location: 'Batangas City',
    address: 'Stall 24, Central Market, Batangas City',
    contact_number: '+63 917 123 4567',
    services: ['Bills Payment', 'E-Loading', 'Money Transfer'],
    is_featured: true,
    latitude: 13.756331,
    longitude: 121.058265
  },
  {
    agent_name: 'SM Batangas Kiosk',
    location: 'Batangas City',
    address: 'Ground Floor, SM City Batangas, Pallocan West',
    contact_number: '+63 928 765 4321',
    services: ['Bills Payment', 'E-Loading', 'Money Transfer', 'QR Payments'],
    is_featured: true,
    latitude: 13.776671,
    longitude: 121.044894
  },
  {
    agent_name: 'San Pascual PlataPay Center',
    location: 'San Pascual',
    address: 'RMCL Bldg., New Bypass Rd., Bayanan, San Pascual, Batangas',
    contact_number: '+63 917 685 1216',
    services: ['Bills Payment', 'E-Loading', 'Money Transfer', 'QR Payments', 'Agent Registration'],
    is_featured: true,
    latitude: 13.798356,
    longitude: 121.018692
  }
];

const SeedDatabaseButton = () => {
  const [isLoading, setIsLoading] = useState(false);

  const seedDatabase = async () => {
    setIsLoading(true);
    try {
      // Seed team members
      const { error: teamError } = await supabase
        .from('team_members')
        .upsert(sampleTeamMembers, { onConflict: 'full_name' });
      
      if (teamError) {
        throw new Error(`Error seeding team members: ${teamError.message}`);
      }
      
      // Seed testimonials
      const { error: testimonialsError } = await supabase
        .from('testimonials')
        .upsert(sampleTestimonials, { onConflict: 'client_name' });
        
      if (testimonialsError) {
        throw new Error(`Error seeding testimonials: ${testimonialsError.message}`);
      }
      
      // Seed PlataPay agents
      const { error: agentsError } = await supabase
        .from('platapay_agents')
        .upsert(samplePlatapayAgents, { onConflict: 'agent_name' });
        
      if (agentsError) {
        throw new Error(`Error seeding PlataPay agents: ${agentsError.message}`);
      }
      
      toast.success('Database seeded successfully!');
    } catch (error) {
      console.error('Error seeding database:', error);
      toast.error(error instanceof Error ? error.message : 'Failed to seed database');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Button 
      onClick={seedDatabase} 
      disabled={isLoading}
      variant="default"
      className="w-full"
    >
      {isLoading ? 'Seeding Database...' : 'Seed Database with Sample Data'}
    </Button>
  );
};

export default SeedDatabaseButton;
