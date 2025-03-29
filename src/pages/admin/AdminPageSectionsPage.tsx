
import React from 'react';
import { Helmet } from 'react-helmet';
import { Toaster } from 'sonner';
import { useParams } from 'react-router-dom';
import BackofficeNavigation from '@/components/admin/BackofficeNavigation';
import PageSectionsManager from '@/components/admin/pages/PageSectionsManager';

const AdminPageSectionsPage = () => {
  const { pageId } = useParams<{ pageId: string }>();
  
  if (!pageId) {
    return <div>Error: No page ID provided</div>;
  }
  
  return (
    <>
      <Helmet>
        <title>Page Sections | InnovateHub Admin</title>
        <meta name="description" content="Manage page sections" />
      </Helmet>
      
      <Toaster position="top-right" />
      
      <BackofficeNavigation>
        <PageSectionsManager pageId={pageId} />
      </BackofficeNavigation>
    </>
  );
};

export default AdminPageSectionsPage;
