
import React, { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import EmailTemplateGenerator from './EmailTemplateGenerator';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { Eye, Download, Trash2, Plus, Mail } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface SavedTemplate {
  id: string;
  name: string;
  type: string;
  html: string;
  created_at: string;
}

const EmailTemplatesPage: React.FC = () => {
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState('create');
  const [savedTemplates, setSavedTemplates] = useState<SavedTemplate[]>([]);
  const [selectedTemplate, setSelectedTemplate] = useState<SavedTemplate | null>(null);
  const [isPreviewOpen, setIsPreviewOpen] = useState(false);
  
  useEffect(() => {
    fetchSavedTemplates();
  }, []);
  
  const fetchSavedTemplates = async () => {
    try {
      // This would normally fetch from your database
      // For demo purposes, we'll use local storage
      const savedItems = localStorage.getItem('innovateHubEmailTemplates');
      if (savedItems) {
        setSavedTemplates(JSON.parse(savedItems));
      }
    } catch (error) {
      console.error('Error fetching templates:', error);
    }
  };
  
  const handleTemplateGenerated = (template: string) => {
    // This would save to your database in a real implementation
    const newTemplate: SavedTemplate = {
      id: Date.now().toString(),
      name: `Template ${savedTemplates.length + 1}`,
      type: 'custom',
      html: template,
      created_at: new Date().toISOString()
    };
    
    const updatedTemplates = [...savedTemplates, newTemplate];
    setSavedTemplates(updatedTemplates);
    
    // For demo purposes, save to local storage
    localStorage.setItem('innovateHubEmailTemplates', JSON.stringify(updatedTemplates));
    
    toast({
      title: "Template Saved",
      description: "Your email template has been saved to your collection"
    });
  };
  
  const handleViewTemplate = (template: SavedTemplate) => {
    setSelectedTemplate(template);
    setIsPreviewOpen(true);
  };
  
  const handleDownloadTemplate = (template: SavedTemplate) => {
    const element = document.createElement('a');
    const file = new Blob([template.html], { type: 'text/html' });
    element.href = URL.createObjectURL(file);
    element.download = `email-template-${template.id}.html`;
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  };
  
  const handleDeleteTemplate = (id: string) => {
    const updatedTemplates = savedTemplates.filter(template => template.id !== id);
    setSavedTemplates(updatedTemplates);
    
    // For demo purposes, update local storage
    localStorage.setItem('innovateHubEmailTemplates', JSON.stringify(updatedTemplates));
    
    toast({
      title: "Template Deleted",
      description: "The selected template has been deleted"
    });
  };
  
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  return (
    <div className="container py-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold">Email Templates</h1>
          <p className="text-muted-foreground">Create and manage your email templates</p>
        </div>
      </div>
      
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-[400px] grid-cols-2 mb-6">
          <TabsTrigger value="create" className="flex items-center">
            <Plus className="w-4 h-4 mr-2" />
            Create Template
          </TabsTrigger>
          <TabsTrigger value="saved" className="flex items-center">
            <Mail className="w-4 h-4 mr-2" />
            Saved Templates ({savedTemplates.length})
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="create" className="space-y-4">
          <EmailTemplateGenerator onTemplateGenerated={handleTemplateGenerated} />
        </TabsContent>
        
        <TabsContent value="saved" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Your Templates</CardTitle>
              <CardDescription>
                All your saved email templates
              </CardDescription>
            </CardHeader>
            <CardContent>
              {savedTemplates.length > 0 ? (
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Name</TableHead>
                      <TableHead>Type</TableHead>
                      <TableHead>Created</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {savedTemplates.map((template) => (
                      <TableRow key={template.id}>
                        <TableCell className="font-medium">{template.name}</TableCell>
                        <TableCell className="capitalize">{template.type}</TableCell>
                        <TableCell>{formatDate(template.created_at)}</TableCell>
                        <TableCell className="text-right">
                          <div className="flex justify-end space-x-2">
                            <Button
                              variant="ghost"
                              size="icon"
                              onClick={() => handleViewTemplate(template)}
                            >
                              <Eye className="h-4 w-4" />
                            </Button>
                            <Button
                              variant="ghost"
                              size="icon"
                              onClick={() => handleDownloadTemplate(template)}
                            >
                              <Download className="h-4 w-4" />
                            </Button>
                            <Button
                              variant="ghost"
                              size="icon"
                              onClick={() => handleDeleteTemplate(template.id)}
                            >
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              ) : (
                <div className="text-center p-6">
                  <p className="text-muted-foreground">You haven't created any templates yet.</p>
                  <Button
                    variant="outline"
                    className="mt-4"
                    onClick={() => setActiveTab('create')}
                  >
                    <Plus className="mr-2 h-4 w-4" />
                    Create Your First Template
                  </Button>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
      
      {isPreviewOpen && selectedTemplate && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg w-full max-w-4xl max-h-[90vh] flex flex-col">
            <div className="p-4 border-b flex justify-between items-center">
              <h3 className="font-semibold">{selectedTemplate.name}</h3>
              <Button variant="ghost" size="icon" onClick={() => setIsPreviewOpen(false)}>
                ✕
              </Button>
            </div>
            <div className="flex-1 overflow-auto p-4">
              <iframe
                srcDoc={selectedTemplate.html}
                title="Email template preview"
                className="w-full h-full border-0"
              />
            </div>
            <div className="p-4 border-t flex justify-end space-x-2">
              <Button 
                variant="outline" 
                onClick={() => handleDownloadTemplate(selectedTemplate)}
              >
                <Download className="mr-2 h-4 w-4" />
                Download
              </Button>
              <Button onClick={() => setIsPreviewOpen(false)}>
                Close
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default EmailTemplatesPage;
