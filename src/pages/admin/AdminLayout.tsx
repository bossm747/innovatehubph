
import React from 'react';
import { Outlet } from 'react-router-dom';
import { SidebarProvider } from '@/components/ui/sidebar';
import BackofficeNavigation from '@/components/admin/BackofficeNavigation';
import { Toaster } from 'sonner';

const AdminLayout: React.FC = () => {
  return (
    <>
      <Toaster position="top-right" />
      <BackofficeNavigation>
        <div className="p-4 md:p-6 flex-1 overflow-auto">
          <Outlet />
        </div>
      </BackofficeNavigation>
    </>
  );
};

export default AdminLayout;
