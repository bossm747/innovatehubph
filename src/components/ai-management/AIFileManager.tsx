
import React, { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Loader2, FileText, Image, Download, Trash2, Eye, Search, X } from "lucide-react";

interface FileEntry {
  id: string;
  filename: string;
  type: string;
  storage_path: string;
  prompt?: string;
  provider?: string;
  project_id?: string;
  created_at: string;
}

interface Project {
  id: string;
  name: string;
}

const AIFileManager = () => {
  const { toast } = useToast();
  const [files, setFiles] = useState<FileEntry[]>([]);
  const [filteredFiles, setFilteredFiles] = useState<FileEntry[]>([]);
  const [loading, setLoading] = useState(true);
  const [projects, setProjects] = useState<Project[]>([]);
  const [selectedFileType, setSelectedFileType] = useState<string>("all");
  const [selectedProject, setSelectedProject] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [previewFile, setPreviewFile] = useState<FileEntry | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string>("");
  const [previewOpen, setPreviewOpen] = useState(false);
  
  // Load data on component mount
  useEffect(() => {
    loadFiles();
    loadProjects();
  }, []);
  
  // Filter files when filter criteria change
  useEffect(() => {
    filterFiles();
  }, [files, selectedFileType, selectedProject, searchQuery]);
  
  const loadFiles = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('ai_generated_files')
        .select('*')
        .order('created_at', { ascending: false });
      
      if (error) throw error;
      
      setFiles(data || []);
    } catch (error) {
      console.error('Error loading files:', error);
      toast({
        title: "Error",
        description: "Failed to load files",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };
  
  const loadProjects = async () => {
    try {
      const { data, error } = await supabase
        .from('ai_projects')
        .select('id, name');
      
      if (error) throw error;
      
      setProjects(data || []);
    } catch (error) {
      console.error('Error loading projects:', error);
    }
  };
  
  const filterFiles = () => {
    let result = [...files];
    
    // Apply file type filter
    if (selectedFileType !== "all") {
      result = result.filter(file => file.type === selectedFileType);
    }
    
    // Apply project filter
    if (selectedProject !== "all") {
      result = result.filter(file => file.project_id === selectedProject);
    }
    
    // Apply search query filter
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      result = result.filter(file => 
        file.filename.toLowerCase().includes(query) || 
        (file.prompt && file.prompt.toLowerCase().includes(query))
      );
    }
    
    setFilteredFiles(result);
  };
  
  const getProjectName = (projectId: string) => {
    const project = projects.find(p => p.id === projectId);
    return project ? project.name : 'Unknown Project';
  };
  
  const handleDelete = async (file: FileEntry) => {
    try {
      // Delete from storage first
      const { error: storageError } = await supabase.storage
        .from('ai-generated')
        .remove([file.storage_path]);
        
      if (storageError) throw storageError;
      
      // Then delete metadata from database
      const { error: dbError } = await supabase
        .from('ai_generated_files')
        .delete()
        .eq('id', file.id);
        
      if (dbError) throw dbError;
      
      toast({
        title: "Success",
        description: "File deleted successfully",
      });
      
      // Refresh files list
      setFiles(files.filter(f => f.id !== file.id));
    } catch (error) {
      console.error('Error deleting file:', error);
      toast({
        title: "Error",
        description: "Failed to delete file",
        variant: "destructive",
      });
    }
  };
  
  const handlePreview = async (file: FileEntry) => {
    try {
      setPreviewFile(file);
      setPreviewOpen(true);
      
      const { data, error } = await supabase.storage
        .from('ai-generated')
        .createSignedUrl(file.storage_path, 60); // 60 seconds expiry
      
      if (error) throw error;
      
      setPreviewUrl(data.signedUrl);
    } catch (error) {
      console.error('Error generating preview URL:', error);
      toast({
        title: "Error",
        description: "Failed to generate preview",
        variant: "destructive",
      });
    }
  };
  
  const handleDownload = async (file: FileEntry) => {
    try {
      const { data, error } = await supabase.storage
        .from('ai-generated')
        .createSignedUrl(file.storage_path, 60);
      
      if (error) throw error;
      
      // Create a temporary link and click it to trigger download
      const link = document.createElement('a');
      link.href = data.signedUrl;
      link.download = file.filename;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } catch (error) {
      console.error('Error downloading file:', error);
      toast({
        title: "Error",
        description: "Failed to download file",
        variant: "destructive",
      });
    }
  };
  
  const clearFilters = () => {
    setSelectedFileType("all");
    setSelectedProject("all");
    setSearchQuery("");
  };
  
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>AI Generated Files</CardTitle>
          <CardDescription>
            Manage files generated by the AI tools
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col md:flex-row gap-4 mb-6">
            <div className="flex-grow">
              <div className="relative">
                <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search by filename or prompt..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-8"
                />
                {searchQuery && (
                  <button 
                    onClick={() => setSearchQuery("")}
                    className="absolute right-2 top-2.5"
                  >
                    <X className="h-4 w-4 text-muted-foreground hover:text-foreground" />
                  </button>
                )}
              </div>
            </div>
            
            <div className="grid grid-cols-2 gap-4 md:flex">
              <Select value={selectedFileType} onValueChange={setSelectedFileType}>
                <SelectTrigger className="w-[140px]">
                  <SelectValue placeholder="File Type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Types</SelectItem>
                  <SelectItem value="image">Images</SelectItem>
                  <SelectItem value="text">Text</SelectItem>
                </SelectContent>
              </Select>
              
              <Select value={selectedProject} onValueChange={setSelectedProject}>
                <SelectTrigger className="w-[160px]">
                  <SelectValue placeholder="Project" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Projects</SelectItem>
                  <SelectItem value="">No Project</SelectItem>
                  {projects.map(project => (
                    <SelectItem key={project.id} value={project.id}>
                      {project.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              
              <Button 
                variant="outline" 
                onClick={clearFilters}
                size="icon"
                className="w-10"
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
          </div>
          
          {loading ? (
            <div className="flex justify-center items-center h-40">
              <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
              <span className="ml-2 text-muted-foreground">Loading files...</span>
            </div>
          ) : filteredFiles.length === 0 ? (
            <div className="text-center py-16 text-muted-foreground">
              <div className="mb-4">
                {files.length === 0 ? 
                  "No files have been generated yet." : 
                  "No files match your filter criteria."}
              </div>
              {files.length > 0 && (
                <Button variant="outline" onClick={clearFilters}>
                  Clear Filters
                </Button>
              )}
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {filteredFiles.map(file => (
                <Card key={file.id} className="overflow-hidden flex flex-col">
                  <div className="p-4 bg-muted/50 flex items-center justify-between">
                    <div className="flex items-center">
                      {file.type === 'image' ? (
                        <Image className="h-5 w-5 mr-2 text-blue-500" />
                      ) : (
                        <FileText className="h-5 w-5 mr-2 text-emerald-500" />
                      )}
                      <span className="font-medium truncate" title={file.filename}>
                        {file.filename}
                      </span>
                    </div>
                    <Badge variant="outline">
                      {file.type}
                    </Badge>
                  </div>
                  
                  <CardContent className="p-4 flex-grow">
                    {file.prompt && (
                      <div className="mb-2">
                        <div className="text-xs text-muted-foreground mb-1">Prompt:</div>
                        <div className="text-sm line-clamp-3" title={file.prompt}>
                          {file.prompt}
                        </div>
                      </div>
                    )}
                    
                    <div className="text-xs text-muted-foreground mt-3 space-y-1">
                      {file.provider && (
                        <div><span className="font-semibold">Provider:</span> {file.provider}</div>
                      )}
                      {file.project_id && (
                        <div><span className="font-semibold">Project:</span> {getProjectName(file.project_id)}</div>
                      )}
                      <div><span className="font-semibold">Created:</span> {new Date(file.created_at).toLocaleString()}</div>
                    </div>
                  </CardContent>
                  
                  <div className="p-3 border-t flex justify-between">
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      onClick={() => handlePreview(file)}
                      className="px-2"
                    >
                      <Eye className="h-4 w-4 mr-1" />
                      Preview
                    </Button>
                    
                    <div className="flex gap-1">
                      <Button 
                        variant="ghost" 
                        size="icon" 
                        onClick={() => handleDownload(file)}
                      >
                        <Download className="h-4 w-4" />
                      </Button>
                      <Button 
                        variant="ghost" 
                        size="icon"
                        onClick={() => handleDelete(file)}
                        className="text-destructive"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
      
      {/* File Preview Dialog */}
      <Dialog open={previewOpen} onOpenChange={setPreviewOpen}>
        <DialogContent className="max-w-3xl">
          <DialogHeader>
            <DialogTitle>{previewFile?.filename}</DialogTitle>
            <DialogDescription>
              {previewFile?.type === 'image' ? 'Image Preview' : 'Text Content'}
            </DialogDescription>
          </DialogHeader>
          
          <div className="my-4">
            {previewFile?.type === 'image' ? (
              <div className="flex justify-center bg-muted rounded-md p-4">
                {previewUrl ? (
                  <img 
                    src={previewUrl} 
                    alt={previewFile.filename} 
                    className="max-h-[500px] object-contain rounded" 
                  />
                ) : (
                  <Loader2 className="h-8 w-8 animate-spin" />
                )}
              </div>
            ) : (
              <div className="bg-muted p-4 rounded-md max-h-[500px] overflow-y-auto whitespace-pre-wrap">
                {previewUrl ? (
                  <iframe 
                    src={previewUrl} 
                    title={previewFile?.filename}
                    className="w-full h-[400px] border-0"
                  />
                ) : (
                  <Loader2 className="h-8 w-8 animate-spin" />
                )}
              </div>
            )}
          </div>
          
          {previewFile?.prompt && (
            <div className="mb-4">
              <h4 className="text-sm font-medium mb-1">Prompt:</h4>
              <p className="text-sm text-muted-foreground">{previewFile.prompt}</p>
            </div>
          )}
          
          <DialogFooter>
            <Button 
              variant="outline" 
              onClick={() => setPreviewOpen(false)}
            >
              Close
            </Button>
            <Button
              onClick={() => previewFile && handleDownload(previewFile)}
            >
              <Download className="h-4 w-4 mr-2" />
              Download
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default AIFileManager;
