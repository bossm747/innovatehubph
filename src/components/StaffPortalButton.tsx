
import React from 'react';
import { Button } from '@/components/ui/button';
import { LockKeyhole } from 'lucide-react';
import { Link } from 'react-router-dom';

const StaffPortalButton = ({ className = "" }) => {
  return (
    <Button 
      variant="outline" 
      className={`bg-white/90 hover:bg-white text-blue-700 border-blue-200 font-medium shadow-sm hover:shadow-md transition-all ${className}`}
      size="lg"
      asChild
    >
      <Link to="/admin/dashboard" className="flex items-center gap-2">
        <LockKeyhole className="h-4 w-4" />
        Staff Portal
      </Link>
    </Button>
  );
};

export default StaffPortalButton;
