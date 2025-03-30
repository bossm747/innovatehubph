
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/hooks/use-toast';
import { useQuery } from '@tanstack/react-query';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { UploadCloud, Search, UserPlus, Users, Tag, Download, Filter, Trash2, Send, AlertCircle, CheckCircle, X } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';

interface Recipient {
  id: string;
  name: string;
  email: string;
  company?: string;
  tags?: string[];
  subscribed: boolean;
  created_at: string;
  last_email_sent?: string;
}

const RecipientsList: React.FC = () => {
  const { toast } = useToast();
  const [isImportDialogOpen, setIsImportDialogOpen] = useState(false);
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [csvContent, setCsvContent] = useState('');
  const [selectedRecipients, setSelectedRecipients] = useState<string[]>([]);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [filterTag, setFilterTag] = useState<string | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const [newRecipient, setNewRecipient] = useState({
    name: '',
    email: '',
    company: '',
    tags: '',
  });

  // Fetch recipients from Supabase
  const { data: recipients, isLoading, error, refetch } = useQuery({
    queryKey: ['marketing-recipients', filterTag],
    queryFn: async () => {
      let query = supabase
        .from('marketing_recipients')
        .select('*')
        .order('created_at', { ascending: false });
        
      if (filterTag) {
        query = query.contains('tags', [filterTag]);
      }
      
      const { data, error } = await query;
      
      if (error) throw error;
      return data as Recipient[];
    }
  });

  // Get unique tags from all recipients
  const allTags = React.useMemo(() => {
    if (!recipients) return [];
    
    const tagsSet = new Set<string>();
    recipients.forEach(recipient => {
      if (recipient.tags) {
        recipient.tags.forEach(tag => tagsSet.add(tag));
      }
    });
    
    return Array.from(tagsSet);
  }, [recipients]);

  // Filter recipients based on search term
  const filteredRecipients = React.useMemo(() => {
    if (!recipients) return [];
    
    return recipients.filter(recipient => {
      const searchLower = searchTerm.toLowerCase();
      return (
        recipient.name.toLowerCase().includes(searchLower) ||
        recipient.email.toLowerCase().includes(searchLower) ||
        (recipient.company && recipient.company.toLowerCase().includes(searchLower))
      );
    });
  }, [recipients, searchTerm]);

  const handleImportCSV = async () => {
    try {
      setIsUploading(true);
      
      if (selectedFile) {
        const reader = new FileReader();
        
        reader.onload = async (e) => {
          const csvContent = e.target?.result as string;
          
          const { error } = await supabase.functions.invoke('import-recipients', {
            body: { csvContent }
          });
          
          if (error) throw error;
          
          toast({
            title: "Recipients imported",
            description: "Your recipients have been imported successfully.",
            variant: "default",
          });
          
          refetch();
          setIsImportDialogOpen(false);
          setSelectedFile(null);
        };
        
        reader.readAsText(selectedFile);
      } else if (csvContent) {
        const { error } = await supabase.functions.invoke('import-recipients', {
          body: { csvContent }
        });
        
        if (error) throw error;
        
        toast({
          title: "Recipients imported",
          description: "Your recipients have been imported successfully.",
          variant: "default",
        });
        
        refetch();
        setIsImportDialogOpen(false);
        setCsvContent('');
      } else {
        throw new Error('No file or CSV content provided');
      }
    } catch (error) {
      console.error('Error importing recipients:', error);
      toast({
        title: "Import failed",
        description: "There was an error importing your recipients. Please check your CSV format and try again.",
        variant: "destructive",
      });
    } finally {
      setIsUploading(false);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setSelectedFile(e.target.files[0]);
    }
  };

  const handleAddRecipient = async () => {
    try {
      // Basic validation
      if (!newRecipient.name || !newRecipient.email) {
        toast({
          title: "Invalid input",
          description: "Name and email are required fields",
          variant: "destructive",
        });
        return;
      }
      
      // Email format validation
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(newRecipient.email)) {
        toast({
          title: "Invalid email",
          description: "Please enter a valid email address",
          variant: "destructive",
        });
        return;
      }
      
      const recipientData = {
        name: newRecipient.name,
        email: newRecipient.email.toLowerCase(),
        company: newRecipient.company || null,
        tags: newRecipient.tags ? newRecipient.tags.split(',').map(tag => tag.trim()) : null,
        subscribed: true
      };
      
      const { error } = await supabase
        .from('marketing_recipients')
        .insert([recipientData]);
      
      if (error) throw error;
      
      toast({
        title: "Recipient added",
        description: "New recipient has been added successfully.",
        variant: "default",
      });
      
      refetch();
      setIsAddDialogOpen(false);
      setNewRecipient({
        name: '',
        email: '',
        company: '',
        tags: '',
      });
    } catch (error) {
      console.error('Error adding recipient:', error);
      toast({
        title: "Failed to add recipient",
        description: "There was an error adding the recipient. Please try again.",
        variant: "destructive",
      });
    }
  };

  const toggleRecipientSelection = (id: string) => {
    if (selectedRecipients.includes(id)) {
      setSelectedRecipients(selectedRecipients.filter(rid => rid !== id));
    } else {
      setSelectedRecipients([...selectedRecipients, id]);
    }
  };

  const toggleAllRecipients = () => {
    if (selectedRecipients.length === filteredRecipients.length) {
      setSelectedRecipients([]);
    } else {
      setSelectedRecipients(filteredRecipients.map(r => r.id));
    }
  };

  const handleDeleteSelected = async () => {
    try {
      if (selectedRecipients.length === 0) return;
      
      const { error } = await supabase
        .from('marketing_recipients')
        .delete()
        .in('id', selectedRecipients);
      
      if (error) throw error;
      
      toast({
        title: "Recipients deleted",
        description: `${selectedRecipients.length} recipients have been deleted successfully.`,
        variant: "default",
      });
      
      refetch();
      setSelectedRecipients([]);
    } catch (error) {
      console.error('Error deleting recipients:', error);
      toast({
        title: "Deletion failed",
        description: "There was an error deleting the selected recipients. Please try again.",
        variant: "destructive",
      });
    }
  };

  const exportRecipients = () => {
    try {
      const exportData = filteredRecipients.map(r => ({
        name: r.name,
        email: r.email,
        company: r.company || '',
        tags: r.tags ? r.tags.join(', ') : '',
        subscribed: r.subscribed ? 'Yes' : 'No',
        created_at: new Date(r.created_at).toLocaleDateString()
      }));
      
      const headers = ['name', 'email', 'company', 'tags', 'subscribed', 'created_at'];
      
      let csv = headers.join(',') + '\n';
      
      exportData.forEach(row => {
        const values = headers.map(header => {
          const value = row[header as keyof typeof row];
          const stringValue = String(value);
          return stringValue.includes(',') ? `"${stringValue}"` : stringValue;
        });
        csv += values.join(',') + '\n';
      });
      
      const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.setAttribute('href', url);
      link.setAttribute('download', `innovatehub-recipients-${new Date().toISOString().split('T')[0]}.csv`);
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      
      toast({
        title: "Export complete",
        description: `${exportData.length} recipients exported to CSV.`,
        variant: "default",
      });
    } catch (error) {
      console.error('Error exporting recipients:', error);
      toast({
        title: "Export failed",
        description: "There was an error exporting your recipients. Please try again.",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="space-y-4">
      <Card>
        <CardHeader className="pb-3">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <CardTitle>Recipient Management</CardTitle>
            <div className="flex flex-wrap gap-2">
              <Button 
                variant="outline" 
                size="sm" 
                onClick={() => setIsImportDialogOpen(true)}
              >
                <UploadCloud className="w-4 h-4 mr-2" />
                Import
              </Button>
              <Button 
                variant="outline" 
                size="sm" 
                onClick={exportRecipients}
                disabled={!recipients || recipients.length === 0}
              >
                <Download className="w-4 h-4 mr-2" />
                Export
              </Button>
              <Button 
                size="sm" 
                onClick={() => setIsAddDialogOpen(true)}
              >
                <UserPlus className="w-4 h-4 mr-2" />
                Add Recipient
              </Button>
            </div>
          </div>
        </CardHeader>
        
        <CardContent>
          <div className="space-y-4">
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="relative flex-1">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search recipients..."
                  className="pl-8"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              
              <div className="flex gap-2">
                <div className="relative">
                  <Filter className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                  <select
                    className="h-9 w-[180px] pl-8 rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
                    value={filterTag || ''}
                    onChange={(e) => setFilterTag(e.target.value || null)}
                  >
                    <option value="">All Tags</option>
                    {allTags.map(tag => (
                      <option key={tag} value={tag}>{tag}</option>
                    ))}
                  </select>
                </div>
                
                {selectedRecipients.length > 0 && (
                  <Button 
                    variant="outline" 
                    size="sm" 
                    onClick={handleDeleteSelected}
                    className="text-red-600 hover:text-red-700 border-red-200 hover:border-red-300"
                  >
                    <Trash2 className="w-4 h-4 mr-2" />
                    Delete Selected
                  </Button>
                )}
              </div>
            </div>
            
            {isLoading ? (
              <div className="flex justify-center py-8">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900"></div>
              </div>
            ) : error ? (
              <div className="text-center py-8 text-red-600">
                <AlertCircle className="h-8 w-8 mx-auto mb-2" />
                <p>Error loading recipients. Please try again.</p>
              </div>
            ) : filteredRecipients.length === 0 ? (
              <div className="text-center py-8">
                <Users className="h-8 w-8 mx-auto mb-2 text-gray-400" />
                <p className="text-muted-foreground">No recipients found</p>
                <p className="text-sm text-muted-foreground mt-1">
                  {searchTerm || filterTag ? 'Try changing your search or filter' : 'Start by adding recipients or importing a list'}
                </p>
                
                <div className="flex gap-2 justify-center mt-4">
                  <Button 
                    variant="outline" 
                    onClick={() => setIsImportDialogOpen(true)}
                  >
                    <UploadCloud className="w-4 h-4 mr-2" />
                    Import Recipients
                  </Button>
                  <Button 
                    onClick={() => setIsAddDialogOpen(true)}
                  >
                    <UserPlus className="w-4 h-4 mr-2" />
                    Add Recipient
                  </Button>
                </div>
              </div>
            ) : (
              <>
                <div className="border rounded-md">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead className="w-12">
                          <Checkbox 
                            checked={selectedRecipients.length === filteredRecipients.length && filteredRecipients.length > 0}
                            onCheckedChange={toggleAllRecipients}
                          />
                        </TableHead>
                        <TableHead>Name</TableHead>
                        <TableHead>Email</TableHead>
                        <TableHead className="hidden md:table-cell">Company</TableHead>
                        <TableHead className="hidden md:table-cell">Tags</TableHead>
                        <TableHead className="hidden md:table-cell">Status</TableHead>
                        <TableHead className="hidden md:table-cell w-32">Added</TableHead>
                        <TableHead className="w-12"></TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {filteredRecipients.map((recipient) => (
                        <TableRow key={recipient.id}>
                          <TableCell>
                            <Checkbox 
                              checked={selectedRecipients.includes(recipient.id)}
                              onCheckedChange={() => toggleRecipientSelection(recipient.id)}
                            />
                          </TableCell>
                          <TableCell className="font-medium">{recipient.name}</TableCell>
                          <TableCell>{recipient.email}</TableCell>
                          <TableCell className="hidden md:table-cell">{recipient.company || '-'}</TableCell>
                          <TableCell className="hidden md:table-cell">
                            {recipient.tags && recipient.tags.length > 0 ? (
                              <div className="flex flex-wrap gap-1">
                                {recipient.tags.slice(0, 2).map((tag, i) => (
                                  <Badge key={i} variant="outline" className="text-xs">{tag}</Badge>
                                ))}
                                {recipient.tags.length > 2 && (
                                  <Badge variant="outline" className="text-xs">+{recipient.tags.length - 2}</Badge>
                                )}
                              </div>
                            ) : '-'}
                          </TableCell>
                          <TableCell className="hidden md:table-cell">
                            {recipient.subscribed ? (
                              <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
                                Subscribed
                              </Badge>
                            ) : (
                              <Badge variant="outline" className="bg-red-50 text-red-700 border-red-200">
                                Unsubscribed
                              </Badge>
                            )}
                          </TableCell>
                          <TableCell className="hidden md:table-cell text-xs text-muted-foreground">
                            {new Date(recipient.created_at).toLocaleDateString()}
                          </TableCell>
                          <TableCell>
                            <Button 
                              variant="ghost" 
                              size="sm" 
                              className="p-0 h-8 w-8 text-red-500"
                              onClick={() => toggleRecipientSelection(recipient.id)}
                            >
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
                <div className="flex justify-between items-center text-sm text-muted-foreground pt-2">
                  <div>{filteredRecipients.length} recipient{filteredRecipients.length !== 1 ? 's' : ''} found</div>
                  {selectedRecipients.length > 0 && (
                    <div>{selectedRecipients.length} selected</div>
                  )}
                </div>
              </>
            )}
          </div>
        </CardContent>
      </Card>
      
      {/* Import Recipients Dialog */}
      <Dialog open={isImportDialogOpen} onOpenChange={setIsImportDialogOpen}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>Import Recipients</DialogTitle>
            <DialogDescription>
              Upload a CSV file or paste CSV content to import recipients.
            </DialogDescription>
          </DialogHeader>
          
          <div className="space-y-4 py-3">
            <div className="grid grid-cols-1 gap-4">
              <div>
                <Label htmlFor="file-upload">Upload CSV File</Label>
                <div className="mt-1 flex items-center gap-4">
                  <Input
                    id="file-upload"
                    type="file"
                    accept=".csv"
                    onChange={handleFileChange}
                    className="file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-primary file:text-primary-foreground hover:file:bg-primary/90"
                  />
                </div>
                {selectedFile && (
                  <p className="text-xs mt-1 text-muted-foreground">
                    Selected: {selectedFile.name}
                  </p>
                )}
              </div>
              
              <div className="text-center text-muted-foreground my-2">OR</div>
              
              <div>
                <Label htmlFor="csv-content">Paste CSV Content</Label>
                <Textarea
                  id="csv-content"
                  placeholder="name,email,company,tags"
                  value={csvContent}
                  onChange={(e) => setCsvContent(e.target.value)}
                  className="mt-1 resize-none"
                  rows={6}
                />
              </div>
              
              <div className="bg-blue-50 p-3 rounded-md text-sm text-blue-700 border border-blue-100">
                <p className="font-medium">CSV Format Requirements:</p>
                <p className="mt-1">Your CSV file should have headers and include at least 'name' and 'email' columns. Optional columns are 'company' and 'tags'.</p>
                <p className="mt-1">Example: <code>name,email,company,tags</code></p>
              </div>
            </div>
          </div>
          
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsImportDialogOpen(false)}>
              Cancel
            </Button>
            <Button 
              onClick={handleImportCSV}
              disabled={isUploading || (!selectedFile && !csvContent)}
            >
              {isUploading ? (
                <>
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                  Importing...
                </>
              ) : 'Import Recipients'}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      
      {/* Add Recipient Dialog */}
      <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>Add New Recipient</DialogTitle>
            <DialogDescription>
              Enter recipient details below.
            </DialogDescription>
          </DialogHeader>
          
          <div className="space-y-4 py-3">
            <div>
              <Label htmlFor="name">Name *</Label>
              <Input
                id="name"
                placeholder="John Doe"
                value={newRecipient.name}
                onChange={(e) => setNewRecipient({...newRecipient, name: e.target.value})}
                className="mt-1"
              />
            </div>
            
            <div>
              <Label htmlFor="email">Email *</Label>
              <Input
                id="email"
                type="email"
                placeholder="john.doe@example.com"
                value={newRecipient.email}
                onChange={(e) => setNewRecipient({...newRecipient, email: e.target.value})}
                className="mt-1"
              />
            </div>
            
            <div>
              <Label htmlFor="company">Company</Label>
              <Input
                id="company"
                placeholder="Acme Inc."
                value={newRecipient.company}
                onChange={(e) => setNewRecipient({...newRecipient, company: e.target.value})}
                className="mt-1"
              />
            </div>
            
            <div>
              <Label htmlFor="tags">Tags (comma separated)</Label>
              <Input
                id="tags"
                placeholder="client, vip, prospect"
                value={newRecipient.tags}
                onChange={(e) => setNewRecipient({...newRecipient, tags: e.target.value})}
                className="mt-1"
              />
              <p className="text-xs mt-1 text-muted-foreground">
                Separate multiple tags with commas
              </p>
            </div>
          </div>
          
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsAddDialogOpen(false)}>
              Cancel
            </Button>
            <Button 
              onClick={handleAddRecipient}
              disabled={!newRecipient.name || !newRecipient.email}
            >
              Add Recipient
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default RecipientsList;
