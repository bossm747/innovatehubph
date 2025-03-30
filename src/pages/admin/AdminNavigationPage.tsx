
import React from 'react';
import { Helmet } from 'react-helmet';
import { Toaster } from 'sonner';
import BackofficeNavigation from '@/components/admin/BackofficeNavigation';
import NavigationManager from '@/components/admin/navigation/NavigationManager';

const AdminNavigationPage = () => {
  return (
    <>
      <Helmet>
        <title>Navigation Management | InnovateHub Admin</title>
        <meta name="description" content="Manage website navigation" />
      </Helmet>
      
      <Toaster position="top-right" />
      
      <BackofficeNavigation>
        <NavigationManager />
      </BackofficeNavigation>
    </>
  );
};

export default AdminNavigationPage;
