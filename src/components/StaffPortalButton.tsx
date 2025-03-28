
import React from 'react';
import { Button } from '@/components/ui/button';
import { LockKeyhole } from 'lucide-react';
import { Link } from 'react-router-dom';

const StaffPortalButton = ({ className = "" }) => {
  return (
    <Button 
      variant="outline" 
      className={`bg-white hover:bg-gray-100/90 text-innovate-700 border-innovate-200 w-40 h-12 font-medium ${className}`}
      size="lg"
      asChild
    >
      <Link to="/admin/dashboard">
        <LockKeyhole className="h-4 w-4 mr-2" />
        Staff Portal
      </Link>
    </Button>
  );
};

export default StaffPortalButton;
