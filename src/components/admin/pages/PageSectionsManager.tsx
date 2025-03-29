
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { 
  fetchPageById, 
  fetchPageSections, 
  createPageSection, 
  updatePageSection, 
  deletePageSection 
} from '@/services/contentManagementService';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
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
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Edit, Trash2, Plus, ArrowLeft, Move, MoveUp, MoveDown } from 'lucide-react';

interface PageSection {
  id: string;
  page_id: string;
  section_name: string;
  section_type: string;
  position: number;
  content: any;
  created_at: string;
  updated_at: string;
}

interface Page {
  id: string;
  title: string;
  slug: string;
}

const sectionTypes = [
  { value: 'hero', label: 'Hero' },
  { value: 'content', label: 'Content' },
  { value: 'features', label: 'Features' },
  { value: 'testimonials', label: 'Testimonials' },
  { value: 'team', label: 'Team' },
  { value: 'cta', label: 'Call to Action' },
  { value: 'contact', label: 'Contact' },
  { value: 'gallery', label: 'Gallery' },
  { value: 'pricing', label: 'Pricing' },
  { value: 'faq', label: 'FAQ' }
];

const PageSectionsManager = () => {
  const { pageId } = useParams<{ pageId: string }>();
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const [formOpen, setFormOpen] = useState(false);
  const [editingSection, setEditingSection] = useState<PageSection | null>(null);
  const [form, setForm] = useState({
    section_name: '',
    section_type: '',
  });

  const { data: page, isLoading: pageLoading } = useQuery({
    queryKey: ['page', pageId],
    queryFn: () => fetchPageById(pageId as string),
    enabled: !!pageId,
  });

  const { 
    data: sections = [], 
    isLoading: sectionsLoading 
  } = useQuery({
    queryKey: ['page_sections', pageId],
    queryFn: () => fetchPageSections(pageId as string),
    enabled: !!pageId,
  });

  const createMutation = useMutation({
    mutationFn: createPageSection,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['page_sections', pageId] });
      toast.success('Section created successfully');
      resetForm();
    },
    onError: (error: any) => {
      toast.error(`Error creating section: ${error.message}`);
    }
  });

  const updateMutation = useMutation({
    mutationFn: ({ id, updates }: { id: string; updates: any }) => 
      updatePageSection(id, updates),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['page_sections', pageId] });
      toast.success('Section updated successfully');
      resetForm();
    },
    onError: (error: any) => {
      toast.error(`Error updating section: ${error.message}`);
    }
  });

  const deleteMutation = useMutation({
    mutationFn: deletePageSection,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['page_sections', pageId] });
      toast.success('Section deleted successfully');
    },
    onError: (error: any) => {
      toast.error(`Error deleting section: ${error.message}`);
    }
  });

  const resetForm = () => {
    setForm({
      section_name: '',
      section_type: '',
    });
    setEditingSection(null);
    setFormOpen(false);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (editingSection) {
      updateMutation.mutate({
        id: editingSection.id,
        updates: form
      });
    } else {
      // For new sections, get the next position number
      const position = sections.length;
      createMutation.mutate({
        ...form, 
        page_id: pageId,
        position,
        content: {} // Initialize with empty content
      });
    }
  };

  const handleEdit = (section: PageSection) => {
    setEditingSection(section);
    setForm({
      section_name: section.section_name,
      section_type: section.section_type,
    });
    setFormOpen(true);
  };

  const handleDelete = (id: string) => {
    if (window.confirm('Are you sure you want to delete this section?')) {
      deleteMutation.mutate(id);
    }
  };

  const handleMoveUp = (index: number) => {
    if (index <= 0) return;
    
    const sectionToMove = sections[index];
    const sectionAbove = sections[index - 1];
    
    updateMutation.mutate({
      id: sectionToMove.id,
      updates: { position: sectionToMove.position - 1 }
    });
    
    updateMutation.mutate({
      id: sectionAbove.id,
      updates: { position: sectionAbove.position + 1 }
    });
  };

  const handleMoveDown = (index: number) => {
    if (index >= sections.length - 1) return;
    
    const sectionToMove = sections[index];
    const sectionBelow = sections[index + 1];
    
    updateMutation.mutate({
      id: sectionToMove.id,
      updates: { position: sectionToMove.position + 1 }
    });
    
    updateMutation.mutate({
      id: sectionBelow.id,
      updates: { position: sectionBelow.position - 1 }
    });
  };

  const navigateToSectionEditor = (sectionId: string) => {
    // Navigate to content editor for this section
    // This would be implemented in a separate component
    navigate(`/admin/content/${pageId}/section/${sectionId}`);
  };

  const isLoading = pageLoading || sectionsLoading;

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <div>
          <div className="flex items-center mb-2">
            <Button 
              variant="ghost" 
              size="sm" 
              onClick={() => navigate('/admin/content')}
              className="mr-2"
            >
              <ArrowLeft className="h-4 w-4" />
            </Button>
            <CardTitle>
              {pageLoading ? 'Loading...' : `Sections for: ${page?.title}`}
            </CardTitle>
          </div>
          <CardDescription>
            Manage the sections displayed on this page
          </CardDescription>
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
              <Plus className="h-4 w-4 mr-2" /> Add Section
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>{editingSection ? 'Edit Section' : 'Add New Section'}</DialogTitle>
              <DialogDescription>
                {editingSection 
                  ? 'Update the details for this section.' 
                  : 'Create a new section for this page.'}
              </DialogDescription>
            </DialogHeader>
            <form onSubmit={handleSubmit}>
              <div className="grid gap-4 py-4">
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="section_name" className="text-right">
                    Section Name
                  </Label>
                  <Input
                    id="section_name"
                    value={form.section_name}
                    onChange={(e) => setForm({ ...form, section_name: e.target.value })}
                    className="col-span-3"
                    required
                  />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="section_type" className="text-right">
                    Section Type
                  </Label>
                  <Select 
                    value={form.section_type} 
                    onValueChange={(value) => setForm({ ...form, section_type: value })}
                  >
                    <SelectTrigger className="col-span-3">
                      <SelectValue placeholder="Select a section type" />
                    </SelectTrigger>
                    <SelectContent>
                      {sectionTypes.map((type) => (
                        <SelectItem key={type.value} value={type.value}>
                          {type.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
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
                  {editingSection ? 'Update' : 'Create'} Section
                </Button>
              </DialogFooter>
            </form>
          </DialogContent>
        </Dialog>
      </CardHeader>
      <CardContent>
        {isLoading ? (
          <div className="flex justify-center py-8">Loading sections...</div>
        ) : sections.length === 0 ? (
          <div className="text-center py-8 text-muted-foreground">
            No sections found. Click "Add Section" to create your first section for this page.
          </div>
        ) : (
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Position</TableHead>
                <TableHead>Name</TableHead>
                <TableHead>Type</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {sections.map((section, index) => (
                <TableRow key={section.id}>
                  <TableCell className="flex items-center gap-2">
                    <span className="font-mono text-sm">{section.position + 1}</span>
                    <div className="flex flex-col">
                      <Button 
                        variant="ghost" 
                        size="icon" 
                        onClick={() => handleMoveUp(index)}
                        disabled={index === 0}
                        className="h-5 w-5"
                      >
                        <MoveUp className="h-3 w-3" />
                      </Button>
                      <Button 
                        variant="ghost" 
                        size="icon" 
                        onClick={() => handleMoveDown(index)}
                        disabled={index === sections.length - 1}
                        className="h-5 w-5"
                      >
                        <MoveDown className="h-3 w-3" />
                      </Button>
                    </div>
                  </TableCell>
                  <TableCell className="font-medium">{section.section_name}</TableCell>
                  <TableCell>
                    <span className="inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300">
                      {section.section_type}
                    </span>
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end gap-2">
                      <Button 
                        variant="ghost" 
                        size="icon"
                        onClick={() => navigateToSectionEditor(section.id)}
                      >
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button 
                        variant="ghost" 
                        size="icon"
                        onClick={() => handleEdit(section)}
                      >
                        <Move className="h-4 w-4" />
                      </Button>
                      <Button 
                        variant="ghost" 
                        size="icon"
                        onClick={() => handleDelete(section.id)}
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

export default PageSectionsManager;
