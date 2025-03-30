
import React from 'react';
import { Helmet } from 'react-helmet';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import ContentManagement from '@/components/admin/ContentManagement';
import { Toaster } from 'sonner';

const AdminContentPage = () => {
  return (
    <>
      <Helmet>
        <title>Content Management | InnovateHub</title>
        <meta name="description" content="Manage your website content with InnovateHub's content management system" />
      </Helmet>
      
      <Navbar />
      <Toaster position="top-right" />
      
      <main className="container mx-auto px-4 py-12 pb-0">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-start mb-8">
            <div>
              <h1 className="text-3xl font-bold">Website Content Management</h1>
              <p className="text-muted-foreground">Customize the content of your website pages and sections</p>
            </div>
          </div>
          
          <ContentManagement />
        </div>
      </main>
      
      <Footer />
    </>
  );
};

export default AdminContentPage;
