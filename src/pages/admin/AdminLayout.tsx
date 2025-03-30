
import React from 'react';
import { Outlet } from 'react-router-dom';
import { SidebarProvider } from '@/components/ui/sidebar';
import BackofficeNavigation from '@/components/admin/BackofficeNavigation';

const AdminLayout: React.FC = () => {
  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full">
        <BackofficeNavigation>
          <div className="p-4 md:p-6 flex-1 overflow-auto">
            <Outlet />
          </div>
        </BackofficeNavigation>
      </div>
    </SidebarProvider>
  );
};

export default AdminLayout;
