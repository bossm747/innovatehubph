
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { LockKeyhole } from 'lucide-react';
import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle,
  DialogTrigger
} from '@/components/ui/dialog';
import StaffLoginForm from './StaffLoginForm';

const StaffPortalButton = () => {
  const [isOpen, setIsOpen] = useState(false);
  
  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button 
          variant="outline" 
          className="border-gray-200 hover:bg-gray-100/50 text-gray-700"
          size="sm"
        >
          <LockKeyhole className="h-4 w-4 mr-2" />
          Staff Portal
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>InnovateHub Staff Portal</DialogTitle>
        </DialogHeader>
        <StaffLoginForm onSuccess={() => setIsOpen(false)} />
      </DialogContent>
    </Dialog>
  );
};

export default StaffPortalButton;
