
import React from 'react';
import { Helmet } from 'react-helmet';
import { Toaster } from 'sonner';
import BackofficeNavigation from '@/components/admin/BackofficeNavigation';
import PageSectionsManager from '@/components/admin/pages/PageSectionsManager';

const AdminPageSectionsPage = () => {
  return (
    <>
      <Helmet>
        <title>Page Sections | InnovateHub Admin</title>
        <meta name="description" content="Manage page sections" />
      </Helmet>
      
      <Toaster position="top-right" />
      
      <BackofficeNavigation>
        <PageSectionsManager />
      </BackofficeNavigation>
    </>
  );
};

export default AdminPageSectionsPage;
