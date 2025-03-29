
import React from 'react';
import { Helmet } from 'react-helmet';
import { Toaster } from 'sonner';
import BackofficeNavigation from '@/components/admin/BackofficeNavigation';
import PagesManager from '@/components/admin/pages/PagesManager';

const AdminContentManagementPage = () => {
  return (
    <>
      <Helmet>
        <title>Content Management | InnovateHub Admin</title>
        <meta name="description" content="Manage website content" />
      </Helmet>
      
      <Toaster position="top-right" />
      
      <BackofficeNavigation>
        <PagesManager />
      </BackofficeNavigation>
    </>
  );
};

export default AdminContentManagementPage;
