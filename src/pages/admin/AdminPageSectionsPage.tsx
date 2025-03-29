
import React from 'react';
import { useParams } from 'react-router-dom';
import BackofficeNavigation from '@/components/admin/BackofficeNavigation';
import PageSectionsManager from '@/components/admin/pages/PageSectionsManager';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

const AdminPageSectionsPage = () => {
  const { pageId } = useParams<{ pageId: string }>();
  
  if (!pageId) {
    return (
      <BackofficeNavigation>
        <Card>
          <CardHeader>
            <CardTitle>Page Sections</CardTitle>
            <CardDescription>No page selected</CardDescription>
          </CardHeader>
          <CardContent>
            <p>Please select a page to manage its sections.</p>
          </CardContent>
        </Card>
      </BackofficeNavigation>
    );
  }
  
  return (
    <BackofficeNavigation>
      <PageSectionsManager pageId={pageId} />
    </BackofficeNavigation>
  );
};

export default AdminPageSectionsPage;
