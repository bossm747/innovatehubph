
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import AdminAIManagement from '@/components/admin/AdminAIManagement';

const AdminAIManagementPage: React.FC = () => {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold">AI Management</h2>
        <p className="text-muted-foreground">
          Manage AI resources, models, and capabilities
        </p>
      </div>
      
      <div className="grid grid-cols-1 gap-6">
        <AdminAIManagement />
      </div>
    </div>
  );
};

export default AdminAIManagementPage;
