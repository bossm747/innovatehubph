
import React, { useState } from 'react';
import { Helmet } from 'react-helmet';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import AdminProfileCard from '@/components/admin/AdminProfileCard';
import AdminProfileTabs from '@/components/admin/AdminProfileTabs';
import { Toaster } from 'sonner';

// Mock user data since we've removed authentication
const mockUser = {
  id: '1',
  email: 'admin@innovatehub.ph',
};

const AdminPortal = () => {
  const [profileData, setProfileData] = useState({
    full_name: 'Admin User',
    position: 'Administrator',
    department: 'Management',
    avatar_url: ''
  });

  return (
    <>
      <Helmet>
        <title>Admin Portal - InnovateHub</title>
        <meta name="description" content="InnovateHub admin portal for team members" />
      </Helmet>
      
      <Navbar />
      <Toaster />
      
      <main className="container mx-auto px-4 py-6 md:py-12">
        <div className="max-w-5xl mx-auto">
          <h1 className="text-2xl md:text-3xl font-bold mb-2">Admin Portal</h1>
          <p className="text-muted-foreground mb-6 md:mb-8">Welcome to the InnovateHub admin portal</p>
          
          <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
            <div className="md:col-span-1">
              <AdminProfileCard 
                user={mockUser} 
                profileData={profileData} 
              />
            </div>
            
            <div className="md:col-span-2">
              <AdminProfileTabs 
                profileData={profileData} 
                setProfileData={setProfileData} 
              />
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </>
  );
};

export default AdminPortal;
