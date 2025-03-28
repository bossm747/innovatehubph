
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { LockKeyhole } from 'lucide-react';

const AdminPortalButton = () => {
  return (
    <Button variant="outline" size="sm" asChild>
      <Link to="/admin/portal" className="flex items-center">
        <LockKeyhole className="w-4 h-4 mr-2" />
        Admin Portal
      </Link>
    </Button>
  );
};

export default AdminPortalButton;
