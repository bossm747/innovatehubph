
import React from 'react';
import { Outlet } from 'react-router-dom';

const AdminLayout: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="flex">
        {/* Admin sidebar placeholder */}
        <div className="hidden md:block w-64 bg-white border-r border-gray-200 min-h-screen">
          <div className="p-4">
            <h2 className="text-lg font-semibold">InnovateHub Admin</h2>
          </div>
          <nav className="mt-5">
            {/* Sidebar navigation would go here */}
          </nav>
        </div>
        
        {/* Main content area */}
        <div className="flex-1 p-8">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default AdminLayout;
