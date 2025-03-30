
import React, { useState } from 'react';
import { toast } from 'sonner';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from '@/components/ui/table';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from '@/components/ui/dialog';
import { FileIcon, FilePdf, FileText, FileImage, FileVideo, FileArchive, File, Trash2, Download, Eye } from 'lucide-react';
import { formatDistance } from 'date-fns';

interface FileListProps {
  files: any[];
  isLoading: boolean;
  onFileDeleted: () => void;
}

const FileList: React.FC<FileListProps> = ({ files, isLoading, onFileDeleted }) => {
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [fileToDelete, setFileToDelete] = useState<string | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [previewDialogOpen, setPreviewDialogOpen] = useState(false);

  const confirmDelete = (fileName: string) => {
    setFileToDelete(fileName);
    setDeleteDialogOpen(true);
  };

  const handleDelete = async () => {
    if (!fileToDelete) return;

    try {
      const { error } = await supabase
        .storage
        .from('project_files')
        .remove([fileToDelete]);

      if (error) {
        throw error;
      }

      toast.success('File deleted successfully!');
      onFileDeleted();
    } catch (error: any) {
      toast.error(`Error deleting file: ${error.message}`);
    } finally {
      setDeleteDialogOpen(false);
      setFileToDelete(null);
    }
  };

  const handleDownload = async (fileName: string) => {
    try {
      const { data, error } = await supabase
        .storage
        .from('project_files')
        .download(fileName);

      if (error) {
        throw error;
      }

      // Create a download link
      const url = URL.createObjectURL(data);
      const a = document.createElement('a');
      a.href = url;
      a.download = fileName;
      document.body.appendChild(a);
      a.click();
      URL.revokeObjectURL(url);
      document.body.removeChild(a);
    } catch (error: any) {
      toast.error(`Error downloading file: ${error.message}`);
    }
  };

  const handlePreview = async (fileName: string) => {
    try {
      const { data } = supabase
        .storage
        .from('project_files')
        .getPublicUrl(fileName);

      setPreviewUrl(data.publicUrl);
      setPreviewDialogOpen(true);
    } catch (error: any) {
      toast.error(`Error previewing file: ${error.message}`);
    }
  };

  const getFileIcon = (fileName: string) => {
    const extension = fileName.split('.').pop()?.toLowerCase();
    
    switch (extension) {
      case 'pdf':
        return <FilePdf className="h-5 w-5 text-red-500" />;
      case 'doc':
      case 'docx':
      case 'txt':
        return <FileText className="h-5 w-5 text-blue-500" />;
      case 'jpg':
      case 'jpeg':
      case 'png':
      case 'gif':
      case 'svg':
        return <FileImage className="h-5 w-5 text-green-500" />;
      case 'mp4':
      case 'mov':
      case 'avi':
      case 'mkv':
      case 'webm':
        return <FileVideo className="h-5 w-5 text-purple-500" />;
      case 'zip':
      case 'rar':
      case '7z':
        return <FileArchive className="h-5 w-5 text-amber-500" />;
      default:
        return <FileIcon className="h-5 w-5 text-gray-500" />;
    }
  };

  const canPreview = (fileName: string) => {
    const extension = fileName.split('.').pop()?.toLowerCase();
    const previewableExtensions = ['jpg', 'jpeg', 'png', 'gif', 'svg', 'mp4', 'webm', 'pdf'];
    return previewableExtensions.includes(extension || '');
  };

  return (
    <div>
      {isLoading ? (
        <div className="flex justify-center py-8">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-innovate-600"></div>
        </div>
      ) : files.length === 0 ? (
        <div className="text-center py-8">
          <File className="h-16 w-16 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900">No files uploaded</h3>
          <p className="mt-1 text-sm text-gray-500">Upload files to see them listed here.</p>
        </div>
      ) : (
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Type</TableHead>
                <TableHead>Name</TableHead>
                <TableHead>Size</TableHead>
                <TableHead>Created</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {files.map((file) => (
                <TableRow key={file.name}>
                  <TableCell className="w-10">{getFileIcon(file.name)}</TableCell>
                  <TableCell className="font-medium truncate max-w-[200px]">
                    {file.name}
                  </TableCell>
                  <TableCell>{formatFileSize(file.metadata?.size || 0)}</TableCell>
                  <TableCell>
                    {file.created_at 
                      ? formatDistance(new Date(file.created_at), new Date(), { addSuffix: true }) 
                      : 'Unknown'}
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end gap-2">
                      {canPreview(file.name) && (
                        <Button 
                          variant="outline" 
                          size="sm" 
                          onClick={() => handlePreview(file.name)}
                          title="Preview"
                        >
                          <Eye className="h-4 w-4" />
                        </Button>
                      )}
                      <Button 
                        variant="outline" 
                        size="sm" 
                        onClick={() => handleDownload(file.name)}
                        title="Download"
                      >
                        <Download className="h-4 w-4" />
                      </Button>
                      <Button 
                        variant="outline" 
                        size="sm" 
                        onClick={() => confirmDelete(file.name)}
                        className="text-red-500 hover:text-red-700 border-red-200 hover:border-red-300"
                        title="Delete"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      )}

      {/* Delete confirmation dialog */}
      <Dialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Confirm Deletion</DialogTitle>
            <DialogDescription>
              Are you sure you want to delete the file "{fileToDelete}"? This action cannot be undone.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={() => setDeleteDialogOpen(false)}>
              Cancel
            </Button>
            <Button variant="destructive" onClick={handleDelete}>
              Delete
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      
      {/* Preview dialog */}
      <Dialog open={previewDialogOpen} onOpenChange={setPreviewDialogOpen}>
        <DialogContent className="max-w-4xl">
          <DialogHeader>
            <DialogTitle>File Preview</DialogTitle>
          </DialogHeader>
          <div className="mt-4 max-h-[70vh] overflow-auto">
            {previewUrl && (
              isImageFile(previewUrl) ? (
                <img src={previewUrl} alt="Preview" className="max-w-full h-auto" />
              ) : isVideoFile(previewUrl) ? (
                <video src={previewUrl} controls className="max-w-full h-auto">
                  Your browser does not support the video tag.
                </video>
              ) : isPdfFile(previewUrl) ? (
                <iframe 
                  src={`${previewUrl}#view=FitH`} 
                  className="w-full h-[60vh]" 
                  title="PDF Preview"
                />
              ) : (
                <div className="text-center py-8">
                  <FileIcon className="h-16 w-16 text-gray-400 mx-auto mb-4" />
                  <p className="text-gray-500">Preview not available. Please download the file to view it.</p>
                </div>
              )
            )}
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

// Helper functions
function formatFileSize(bytes: number): string {
  if (bytes === 0) return '0 Bytes';
  
  const k = 1024;
  const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
}

function isImageFile(url: string): boolean {
  return /\.(jpg|jpeg|png|gif|svg)$/i.test(url);
}

function isVideoFile(url: string): boolean {
  return /\.(mp4|webm|ogg|mov|avi)$/i.test(url);
}

function isPdfFile(url: string): boolean {
  return /\.pdf$/i.test(url);
}

export default FileList;
