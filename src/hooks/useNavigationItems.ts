
import { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { 
  fetchNavigationItems, 
  createNavigationItem, 
  updateNavigationItem, 
  deleteNavigationItem 
} from '@/services/contentManagementService';
import { NavigationItem } from '@/types/navigation';
import { toast } from 'sonner';

export const useNavigationItems = () => {
  const queryClient = useQueryClient();
  const [formOpen, setFormOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<NavigationItem | null>(null);
  const [form, setForm] = useState({
    label: '',
    url: '',
    parent_id: null as string | null,
    is_dropdown: false
  });

  const { data: navigationItems = [], isLoading } = useQuery({
    queryKey: ['navigationItems'],
    queryFn: fetchNavigationItems
  });

  const createMutation = useMutation({
    mutationFn: createNavigationItem,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['navigationItems'] });
      toast.success('Navigation item created successfully');
      resetForm();
    },
    onError: (error: any) => {
      toast.error(`Error creating navigation item: ${error.message}`);
    }
  });

  const updateMutation = useMutation({
    mutationFn: ({ id, updates }: { id: string; updates: any }) => 
      updateNavigationItem(id, updates),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['navigationItems'] });
      toast.success('Navigation item updated successfully');
      resetForm();
    },
    onError: (error: any) => {
      toast.error(`Error updating navigation item: ${error.message}`);
    }
  });

  const deleteMutation = useMutation({
    mutationFn: deleteNavigationItem,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['navigationItems'] });
      toast.success('Navigation item deleted successfully');
    },
    onError: (error: any) => {
      toast.error(`Error deleting navigation item: ${error.message}`);
    }
  });

  const resetForm = () => {
    setForm({
      label: '',
      url: '',
      parent_id: null,
      is_dropdown: false
    });
    setEditingItem(null);
    setFormOpen(false);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (editingItem) {
      updateMutation.mutate({
        id: editingItem.id,
        updates: form
      });
    } else {
      // For new items, get the next position number
      const position = navigationItems.length;
      createMutation.mutate({
        ...form, 
        position
      });
    }
  };

  const handleEdit = (item: NavigationItem) => {
    setEditingItem(item);
    setForm({
      label: item.label,
      url: item.url,
      parent_id: item.parent_id,
      is_dropdown: item.is_dropdown
    });
    setFormOpen(true);
  };

  const handleDelete = (id: string) => {
    if (window.confirm('Are you sure you want to delete this navigation item?')) {
      deleteMutation.mutate(id);
    }
  };

  const topLevelItems = navigationItems.filter(item => !item.parent_id);

  return {
    navigationItems,
    isLoading,
    formOpen,
    setFormOpen,
    editingItem,
    form,
    setForm,
    handleSubmit,
    handleEdit,
    handleDelete,
    resetForm,
    topLevelItems
  };
};
