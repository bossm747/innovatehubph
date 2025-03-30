
import React from 'react';
import { Helmet } from 'react-helmet';
import { Toaster } from 'sonner';
import BackofficeNavigation from '@/components/admin/BackofficeNavigation';
import SiteSettingsManager from '@/components/admin/settings/SiteSettingsManager';

const AdminDesignPage = () => {
  return (
    <>
      <Helmet>
        <title>Design Settings | InnovateHub Admin</title>
        <meta name="description" content="Manage website design and appearance" />
      </Helmet>
      
      <Toaster position="top-right" />
      
      <BackofficeNavigation>
        <SiteSettingsManager />
      </BackofficeNavigation>
    </>
  );
};

export default AdminDesignPage;
