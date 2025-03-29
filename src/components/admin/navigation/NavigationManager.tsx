
import React, { useState, useEffect } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { 
  fetchNavigationItems, 
  createNavigationItem, 
  updateNavigationItem, 
  deleteNavigationItem 
} from '@/services/contentManagementService';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { toast } from 'sonner';
import { 
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from '@/components/ui/table';
import { Edit, Trash2, Plus, Menu, ExternalLink } from 'lucide-react';

interface NavigationItem {
  id: string;
  label: string;
  url: string;
  parent_id: string | null;
  position: number;
  is_dropdown: boolean;
}

const NavigationManager = () => {
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
  const childItems = navigationItems.filter(item => item.parent_id);

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <div>
          <CardTitle>Navigation Management</CardTitle>
          <CardDescription>Manage your website navigation structure</CardDescription>
        </div>
        <Dialog open={formOpen} onOpenChange={setFormOpen}>
          <DialogTrigger asChild>
            <Button 
              onClick={() => {
                resetForm();
                setFormOpen(true);
              }}
              className="flex items-center"
            >
              <Plus className="h-4 w-4 mr-2" /> Add Item
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>{editingItem ? 'Edit Navigation Item' : 'Add Navigation Item'}</DialogTitle>
              <DialogDescription>
                {editingItem 
                  ? 'Update the details for this navigation link.' 
                  : 'Add a new link to your site navigation.'}
              </DialogDescription>
            </DialogHeader>
            <form onSubmit={handleSubmit}>
              <div className="grid gap-4 py-4">
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="label" className="text-right">
                    Label
                  </Label>
                  <Input
                    id="label"
                    value={form.label}
                    onChange={(e) => setForm({ ...form, label: e.target.value })}
                    className="col-span-3"
                    required
                  />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="url" className="text-right">
                    URL
                  </Label>
                  <Input
                    id="url"
                    value={form.url}
                    onChange={(e) => setForm({ ...form, url: e.target.value })}
                    className="col-span-3"
                    required
                  />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="parent" className="text-right">
                    Parent
                  </Label>
                  <select
                    id="parent"
                    value={form.parent_id || ''}
                    onChange={(e) => setForm({ ...form, parent_id: e.target.value || null })}
                    className="col-span-3 flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                  >
                    <option value="">None (Top Level)</option>
                    {topLevelItems.map((item) => (
                      <option 
                        key={item.id} 
                        value={item.id}
                        disabled={editingItem?.id === item.id}
                      >
                        {item.label}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="is_dropdown" className="text-right">
                    Is Dropdown
                  </Label>
                  <div className="col-span-3 flex items-center">
                    <Checkbox
                      id="is_dropdown"
                      checked={form.is_dropdown}
                      onCheckedChange={(checked) => 
                        setForm({ ...form, is_dropdown: checked as boolean })
                      }
                    />
                    <Label htmlFor="is_dropdown" className="ml-2">
                      This item has a dropdown menu
                    </Label>
                  </div>
                </div>
              </div>
              <DialogFooter>
                <Button 
                  type="button" 
                  variant="outline" 
                  onClick={() => {
                    resetForm();
                    setFormOpen(false);
                  }}
                >
                  Cancel
                </Button>
                <Button type="submit">
                  {editingItem ? 'Update' : 'Add'} Item
                </Button>
              </DialogFooter>
            </form>
          </DialogContent>
        </Dialog>
      </CardHeader>
      <CardContent>
        {isLoading ? (
          <div className="flex justify-center py-8">Loading navigation items...</div>
        ) : navigationItems.length === 0 ? (
          <div className="text-center py-8 text-muted-foreground">
            No navigation items found. Click "Add Item" to create your first navigation link.
          </div>
        ) : (
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-12"></TableHead>
                <TableHead>Label</TableHead>
                <TableHead>URL</TableHead>
                <TableHead>Type</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {topLevelItems.map((item) => (
                <React.Fragment key={item.id}>
                  <TableRow>
                    <TableCell>
                      <Menu className="h-4 w-4" />
                    </TableCell>
                    <TableCell className="font-medium">{item.label}</TableCell>
                    <TableCell>
                      <div className="flex items-center">
                        {item.url}
                        <a 
                          href={item.url.startsWith('/') ? item.url : `/${item.url}`} 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="ml-2 text-muted-foreground hover:text-foreground"
                        >
                          <ExternalLink className="h-4 w-4" />
                        </a>
                      </div>
                    </TableCell>
                    <TableCell>
                      {item.is_dropdown ? 'Dropdown' : 'Link'}
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="flex justify-end gap-2">
                        <Button 
                          variant="ghost" 
                          size="icon"
                          onClick={() => handleEdit(item)}
                        >
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button 
                          variant="ghost" 
                          size="icon"
                          onClick={() => handleDelete(item.id)}
                        >
                          <Trash2 className="h-4 w-4 text-destructive" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                  {/* Show children of this item */}
                  {childItems
                    .filter(child => child.parent_id === item.id)
                    .map(child => (
                      <TableRow key={child.id}>
                        <TableCell className="pl-8">
                          <div className="w-4 h-0 border-t border-dashed border-gray-300"></div>
                        </TableCell>
                        <TableCell className="font-medium">{child.label}</TableCell>
                        <TableCell>
                          <div className="flex items-center">
                            {child.url}
                            <a 
                              href={child.url.startsWith('/') ? child.url : `/${child.url}`} 
                              target="_blank" 
                              rel="noopener noreferrer"
                              className="ml-2 text-muted-foreground hover:text-foreground"
                            >
                              <ExternalLink className="h-4 w-4" />
                            </a>
                          </div>
                        </TableCell>
                        <TableCell>
                          {child.is_dropdown ? 'Dropdown' : 'Link'}
                        </TableCell>
                        <TableCell className="text-right">
                          <div className="flex justify-end gap-2">
                            <Button 
                              variant="ghost" 
                              size="icon"
                              onClick={() => handleEdit(child)}
                            >
                              <Edit className="h-4 w-4" />
                            </Button>
                            <Button 
                              variant="ghost" 
                              size="icon"
                              onClick={() => handleDelete(child.id)}
                            >
                              <Trash2 className="h-4 w-4 text-destructive" />
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                </React.Fragment>
              ))}
            </TableBody>
          </Table>
        )}
      </CardContent>
    </Card>
  );
};

export default NavigationManager;
