
import React from 'react';
import { Outlet } from 'react-router-dom';
import BackofficeNavigation from '@/components/admin/BackofficeNavigation';

const AdminLayout: React.FC = () => {
  return (
    <BackofficeNavigation>
      <Outlet />
    </BackofficeNavigation>
  );
};

export default AdminLayout;
