
import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Skeleton } from "@/components/ui/skeleton";
import { Label } from "@/components/ui/label";
import { Download, Trash2, ExternalLink, Upload, FileText, Image, Search } from "lucide-react";
import { toast } from "sonner";

interface FileEntry {
  id: string;
  filename: string;
  type: string;
  storage_path: string;
  created_at: string;
  prompt?: string;
  public_url?: string;
  provider?: string;
  project_id?: string;
}

const AIFileManager = () => {
  const [files, setFiles] = useState<FileEntry[]>([]);
  const [filteredFiles, setFilteredFiles] = useState<FileEntry[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [activeTab, setActiveTab] = useState("all");
  const [isUploadDialogOpen, setIsUploadDialogOpen] = useState(false);
  const [uploadFile, setUploadFile] = useState<File | null>(null);
  const [uploadType, setUploadType] = useState("image");
  const [fileDetails, setFileDetails] = useState<FileEntry | null>(null);
  const [isFileDetailsOpen, setIsFileDetailsOpen] = useState(false);
  
  const fetchFiles = async () => {
    setLoading(true);
    try {
      const { data, error } = await supabase
        .from("ai_generated_files")
        .select("*")
        .order("created_at", { ascending: false });
      
      if (error) throw error;
      
      setFiles(data || []);
      setFilteredFiles(data || []);
    } catch (error) {
      console.error("Error fetching files:", error);
      toast.error("Failed to load files");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchFiles();
  }, []);

  useEffect(() => {
    // Filter files based on search query and active tab
    let filtered = files;
    
    if (searchQuery) {
      filtered = filtered.filter(file => 
        file.filename.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (file.prompt && file.prompt.toLowerCase().includes(searchQuery.toLowerCase()))
      );
    }
    
    if (activeTab !== "all") {
      filtered = filtered.filter(file => file.type === activeTab);
    }
    
    setFilteredFiles(filtered);
  }, [searchQuery, activeTab, files]);

  const handleDelete = async (id: string, path: string) => {
    if (!confirm("Are you sure you want to delete this file?")) return;
    
    try {
      // Delete file from storage
      const { error: storageError } = await supabase.storage
        .from("ai-generated")
        .remove([path]);
      
      if (storageError) throw storageError;
      
      // Delete record from database
      const { error: dbError } = await supabase
        .from("ai_generated_files")
        .delete()
        .eq("id", id);
      
      if (dbError) throw dbError;
      
      toast.success("File deleted successfully");
      fetchFiles();
    } catch (error) {
      console.error("Error deleting file:", error);
      toast.error("Failed to delete file");
    }
  };

  const handleDownload = async (path: string, filename: string) => {
    try {
      const { data, error } = await supabase.storage
        .from("ai-generated")
        .download(path);
        
      if (error) throw error;
      
      const url = URL.createObjectURL(data);
      const a = document.createElement("a");
      a.href = url;
      a.download = filename;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
    } catch (error) {
      console.error("Error downloading file:", error);
      toast.error("Failed to download file");
    }
  };

  const handleUpload = async () => {
    if (!uploadFile) {
      toast.error("Please select a file to upload");
      return;
    }
    
    try {
      const filePath = `${uploadType}/${uploadFile.name}`;
      
      // Upload to storage
      const { data: storageData, error: storageError } = await supabase.storage
        .from("ai-generated")
        .upload(filePath, uploadFile, {
          upsert: true,
          contentType: uploadFile.type
        });
        
      if (storageError) throw storageError;
      
      // Add record to database
      const { error: dbError } = await supabase
        .from("ai_generated_files")
        .insert([{
          filename: uploadFile.name,
          type: uploadType,
          storage_path: storageData.path
        }]);
        
      if (dbError) throw dbError;
      
      toast.success("File uploaded successfully");
      setIsUploadDialogOpen(false);
      setUploadFile(null);
      fetchFiles();
    } catch (error) {
      console.error("Error uploading file:", error);
      toast.error("Failed to upload file");
    }
  };

  const handleViewDetails = async (file: FileEntry) => {
    setFileDetails(file);
    setIsFileDetailsOpen(true);
    
    // Get the public URL if it doesn't exist
    if (!file.public_url) {
      try {
        const { data, error } = await supabase.storage
          .from("ai-generated")
          .getPublicUrl(file.storage_path);
          
        if (error) throw error;
        
        setFileDetails({
          ...file,
          public_url: data.publicUrl
        });
      } catch (error) {
        console.error("Error getting public URL:", error);
      }
    }
  };

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <div>
          <CardTitle>AI Generated Files</CardTitle>
          <CardDescription>
            Manage your AI-generated content and uploads
          </CardDescription>
        </div>
        <Button onClick={() => setIsUploadDialogOpen(true)} className="flex items-center gap-1">
          <Upload className="h-4 w-4" /> Upload File
        </Button>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col gap-4">
          <div className="flex items-center gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search files by name or prompt..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-8"
              />
            </div>
            
            <Tabs 
              defaultValue="all" 
              value={activeTab} 
              onValueChange={setActiveTab}
              className="w-auto"
            >
              <TabsList>
                <TabsTrigger value="all">All</TabsTrigger>
                <TabsTrigger value="image">Images</TabsTrigger>
                <TabsTrigger value="text">Text</TabsTrigger>
              </TabsList>
            </Tabs>
          </div>
          
          {loading ? (
            <div className="space-y-2">
              {[1, 2, 3].map((i) => (
                <div key={i} className="flex flex-col gap-2">
                  <Skeleton className="h-10 w-full" />
                </div>
              ))}
            </div>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Type</TableHead>
                  <TableHead>Filename</TableHead>
                  <TableHead>Provider</TableHead>
                  <TableHead>Created</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredFiles.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={5} className="text-center py-8 text-muted-foreground">
                      {searchQuery 
                        ? "No files match your search query" 
                        : "No files found. Generate or upload files to get started."}
                    </TableCell>
                  </TableRow>
                ) : (
                  filteredFiles.map((file) => (
                    <TableRow key={file.id}>
                      <TableCell>
                        {file.type === "image" ? (
                          <div className="inline-flex items-center gap-1">
                            <Image className="h-4 w-4" /> Image
                          </div>
                        ) : (
                          <div className="inline-flex items-center gap-1">
                            <FileText className="h-4 w-4" /> Text
                          </div>
                        )}
                      </TableCell>
                      <TableCell 
                        className="font-medium cursor-pointer hover:underline"
                        onClick={() => handleViewDetails(file)}
                      >
                        {file.filename}
                      </TableCell>
                      <TableCell>{file.provider || "-"}</TableCell>
                      <TableCell>{new Date(file.created_at).toLocaleDateString()}</TableCell>
                      <TableCell className="text-right">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleDownload(file.storage_path, file.filename)}
                        >
                          <Download className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleDelete(file.id, file.storage_path)}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          )}
        </div>
      </CardContent>
      
      {/* Upload Dialog */}
      <Dialog open={isUploadDialogOpen} onOpenChange={setIsUploadDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Upload File</DialogTitle>
            <DialogDescription>
              Upload a file to your AI-generated content storage
            </DialogDescription>
          </DialogHeader>
          
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label>File Type</Label>
              <Tabs value={uploadType} onValueChange={setUploadType}>
                <TabsList className="grid w-full grid-cols-2">
                  <TabsTrigger value="image">Image</TabsTrigger>
                  <TabsTrigger value="text">Text</TabsTrigger>
                </TabsList>
              </Tabs>
            </div>
            
            <div className="grid gap-2">
              <Label>Select File</Label>
              <Input 
                type="file" 
                accept={uploadType === "image" ? "image/*" : "text/*,.txt,.md"}
                onChange={(e) => {
                  if (e.target.files && e.target.files[0]) {
                    setUploadFile(e.target.files[0]);
                  }
                }}
              />
            </div>
          </div>
          
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsUploadDialogOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleUpload} disabled={!uploadFile}>
              Upload
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      
      {/* File Details Dialog */}
      <Dialog open={isFileDetailsOpen} onOpenChange={setIsFileDetailsOpen}>
        <DialogContent className="max-w-3xl">
          <DialogHeader>
            <DialogTitle>File Details</DialogTitle>
          </DialogHeader>
          
          {fileDetails && (
            <div className="grid gap-6">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <h3 className="text-sm font-medium text-muted-foreground mb-1">Filename</h3>
                  <p>{fileDetails.filename}</p>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-muted-foreground mb-1">Type</h3>
                  <p className="capitalize">{fileDetails.type}</p>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-muted-foreground mb-1">Created</h3>
                  <p>{new Date(fileDetails.created_at).toLocaleString()}</p>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-muted-foreground mb-1">Provider</h3>
                  <p>{fileDetails.provider || "Unknown"}</p>
                </div>
              </div>
              
              {fileDetails.prompt && (
                <div>
                  <h3 className="text-sm font-medium text-muted-foreground mb-1">Prompt</h3>
                  <p className="bg-muted/30 p-2 rounded">{fileDetails.prompt}</p>
                </div>
              )}
              
              {fileDetails.type === "image" && fileDetails.public_url && (
                <div className="border rounded-md overflow-hidden aspect-auto max-h-96 flex items-center justify-center">
                  <img 
                    src={fileDetails.public_url} 
                    alt={fileDetails.filename}
                    className="max-w-full max-h-full object-contain"
                  />
                </div>
              )}
              
              <div className="flex gap-2 justify-end">
                {fileDetails.public_url && (
                  <Button 
                    variant="outline" 
                    onClick={() => window.open(fileDetails.public_url, "_blank")}
                  >
                    <ExternalLink className="h-4 w-4 mr-2" /> Open in New Tab
                  </Button>
                )}
                <Button
                  onClick={() => handleDownload(fileDetails.storage_path, fileDetails.filename)}
                >
                  <Download className="h-4 w-4 mr-2" /> Download
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </Card>
  );
};

export default AIFileManager;
