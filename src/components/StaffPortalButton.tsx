
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { LockKeyhole } from 'lucide-react';

const StaffPortalButton = () => {
  return (
    <Button variant="outline" size="sm" asChild>
      <Link to="/admin/login" className="flex items-center">
        <LockKeyhole className="w-4 h-4 mr-2" />
        Staff Portal
      </Link>
    </Button>
  );
};

export default StaffPortalButton;
