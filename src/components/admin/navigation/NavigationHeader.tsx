
import React from 'react';
import { Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { 
  DialogTrigger,
  DialogHeader,
  DialogTitle,
  DialogDescription
} from '@/components/ui/dialog';
import { NavigationItem } from '@/types/navigation';

interface NavigationHeaderProps {
  onOpenForm: () => void;
  editingItem: NavigationItem | null;
}

const NavigationHeader = ({ onOpenForm, editingItem }: NavigationHeaderProps) => {
  return (
    <>
      <DialogTrigger asChild>
        <Button 
          onClick={onOpenForm}
          className="flex items-center"
        >
          <Plus className="h-4 w-4 mr-2" /> Add Item
        </Button>
      </DialogTrigger>
      <DialogHeader>
        <DialogTitle>{editingItem ? 'Edit Navigation Item' : 'Add Navigation Item'}</DialogTitle>
        <DialogDescription>
          {editingItem 
            ? 'Update the details for this navigation link.' 
            : 'Add a new link to your site navigation.'}
        </DialogDescription>
      </DialogHeader>
    </>
  );
};

export default NavigationHeader;
