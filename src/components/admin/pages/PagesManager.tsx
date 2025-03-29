
import React, { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { 
  fetchPages, 
  createPage, 
  updatePage, 
  deletePage 
} from '@/services/contentManagementService';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
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
import { Checkbox } from '@/components/ui/checkbox';
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from '@/components/ui/table';
import { Edit, Trash2, Plus, File, Settings, ExternalLink } from 'lucide-react';
import { Link } from 'react-router-dom';

interface Page {
  id: string;
  title: string;
  slug: string;
  meta_description: string | null;
  is_published: boolean;
  created_at: string;
  updated_at: string;
}

const PagesManager = () => {
  const queryClient = useQueryClient();
  const [formOpen, setFormOpen] = useState(false);
  const [editingPage, setEditingPage] = useState<Page | null>(null);
  const [form, setForm] = useState({
    title: '',
    slug: '',
    meta_description: '',
    is_published: true
  });

  const { data: pages = [], isLoading } = useQuery({
    queryKey: ['pages'],
    queryFn: fetchPages
  });

  const createMutation = useMutation({
    mutationFn: createPage,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['pages'] });
      toast.success('Page created successfully');
      resetForm();
    },
    onError: (error: any) => {
      toast.error(`Error creating page: ${error.message}`);
    }
  });

  const updateMutation = useMutation({
    mutationFn: ({ id, updates }: { id: string; updates: any }) => 
      updatePage(id, updates),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['pages'] });
      toast.success('Page updated successfully');
      resetForm();
    },
    onError: (error: any) => {
      toast.error(`Error updating page: ${error.message}`);
    }
  });

  const deleteMutation = useMutation({
    mutationFn: deletePage,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['pages'] });
      toast.success('Page deleted successfully');
    },
    onError: (error: any) => {
      toast.error(`Error deleting page: ${error.message}`);
    }
  });

  const resetForm = () => {
    setForm({
      title: '',
      slug: '',
      meta_description: '',
      is_published: true
    });
    setEditingPage(null);
    setFormOpen(false);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (editingPage) {
      updateMutation.mutate({
        id: editingPage.id,
        updates: form
      });
    } else {
      createMutation.mutate(form);
    }
  };

  const handleEdit = (page: Page) => {
    setEditingPage(page);
    setForm({
      title: page.title,
      slug: page.slug,
      meta_description: page.meta_description || '',
      is_published: page.is_published
    });
    setFormOpen(true);
  };

  const handleDelete = (id: string) => {
    if (window.confirm('Are you sure you want to delete this page? This will also delete all sections on this page.')) {
      deleteMutation.mutate(id);
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    }).format(date);
  };

  const generateSlug = (title: string) => {
    return title
      .toLowerCase()
      .replace(/[^\w\s-]/g, '')
      .replace(/\s+/g, '-');
  };

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <div>
          <CardTitle>Pages Management</CardTitle>
          <CardDescription>Create and manage your website pages</CardDescription>
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
              <Plus className="h-4 w-4 mr-2" /> Add Page
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>{editingPage ? 'Edit Page' : 'Add New Page'}</DialogTitle>
              <DialogDescription>
                {editingPage 
                  ? 'Update the details for this page.' 
                  : 'Create a new page for your website.'}
              </DialogDescription>
            </DialogHeader>
            <form onSubmit={handleSubmit}>
              <div className="grid gap-4 py-4">
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="title" className="text-right">
                    Title
                  </Label>
                  <Input
                    id="title"
                    value={form.title}
                    onChange={(e) => {
                      const newTitle = e.target.value;
                      setForm({ 
                        ...form, 
                        title: newTitle,
                        // Only auto-update slug if we're creating a new page and slug hasn't been manually edited
                        slug: !editingPage ? generateSlug(newTitle) : form.slug
                      });
                    }}
                    className="col-span-3"
                    required
                  />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="slug" className="text-right">
                    Slug
                  </Label>
                  <Input
                    id="slug"
                    value={form.slug}
                    onChange={(e) => setForm({ ...form, slug: e.target.value })}
                    className="col-span-3"
                    required
                  />
                </div>
                <div className="grid grid-cols-4 items-start gap-4">
                  <Label htmlFor="meta_description" className="text-right pt-2">
                    Meta Description
                  </Label>
                  <Textarea
                    id="meta_description"
                    value={form.meta_description}
                    onChange={(e) => setForm({ ...form, meta_description: e.target.value })}
                    className="col-span-3"
                    rows={3}
                  />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="is_published" className="text-right">
                    Published
                  </Label>
                  <div className="col-span-3 flex items-center">
                    <Checkbox
                      id="is_published"
                      checked={form.is_published}
                      onCheckedChange={(checked) => 
                        setForm({ ...form, is_published: checked as boolean })
                      }
                    />
                    <Label htmlFor="is_published" className="ml-2">
                      Make this page visible on the website
                    </Label>
                  </div>
                </div>
              </div>
              <DialogFooter>
                <Button 
                  type="button" 
                  variant="outline" 
                  onClick={resetForm}
                >
                  Cancel
                </Button>
                <Button type="submit">
                  {editingPage ? 'Update' : 'Create'} Page
                </Button>
              </DialogFooter>
            </form>
          </DialogContent>
        </Dialog>
      </CardHeader>
      <CardContent>
        {isLoading ? (
          <div className="flex justify-center py-8">Loading pages...</div>
        ) : pages.length === 0 ? (
          <div className="text-center py-8 text-muted-foreground">
            No pages found. Click "Add Page" to create your first page.
          </div>
        ) : (
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Title</TableHead>
                <TableHead>Slug</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Last Updated</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {pages.map((page) => (
                <TableRow key={page.id}>
                  <TableCell className="font-medium flex items-center">
                    <File className="h-4 w-4 mr-2 text-muted-foreground" />
                    {page.title}
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center">
                      /{page.slug}
                      <a 
                        href={`/${page.slug}`} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="ml-2 text-muted-foreground hover:text-foreground"
                      >
                        <ExternalLink className="h-4 w-4" />
                      </a>
                    </div>
                  </TableCell>
                  <TableCell>
                    <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${
                      page.is_published 
                        ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300' 
                        : 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300'
                    }`}>
                      {page.is_published ? 'Published' : 'Draft'}
                    </span>
                  </TableCell>
                  <TableCell>{formatDate(page.updated_at)}</TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end gap-2">
                      <Button 
                        variant="ghost" 
                        size="icon"
                        asChild
                      >
                        <Link to={`/admin/content/${page.id}`}>
                          <Settings className="h-4 w-4" />
                        </Link>
                      </Button>
                      <Button 
                        variant="ghost" 
                        size="icon"
                        onClick={() => handleEdit(page)}
                      >
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button 
                        variant="ghost" 
                        size="icon"
                        onClick={() => handleDelete(page.id)}
                      >
                        <Trash2 className="h-4 w-4 text-destructive" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        )}
      </CardContent>
    </Card>
  );
};

export default PagesManager;
