
import React, { useState } from 'react';
import { toast } from '@/hooks/use-toast';
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
import { 
  FileIcon, 
  FileText, 
  FileImage, 
  FileVideo, 
  FileArchive, 
  File, 
  Trash2, 
  Download, 
  Eye, 
  FileAudio, 
  Play, 
  Music 
} from 'lucide-react';
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
  const [previewType, setPreviewType] = useState<'image' | 'video' | 'audio' | 'pdf' | 'other'>('other');
  const [previewTitle, setPreviewTitle] = useState('');

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

      const fileType = getFileType(fileName);
      setPreviewType(fileType);
      setPreviewTitle(fileName);
      setPreviewUrl(data.publicUrl);
      setPreviewDialogOpen(true);
    } catch (error: any) {
      toast.error(`Error previewing file: ${error.message}`);
    }
  };

  const getFileType = (fileName: string): 'image' | 'video' | 'audio' | 'pdf' | 'other' => {
    const extension = fileName.split('.').pop()?.toLowerCase();
    
    if (['jpg', 'jpeg', 'png', 'gif', 'svg', 'webp'].includes(extension || '')) {
      return 'image';
    } else if (['mp4', 'webm', 'mov', 'avi', 'mkv'].includes(extension || '')) {
      return 'video';
    } else if (['mp3', 'wav', 'ogg', 'flac', 'm4a'].includes(extension || '')) {
      return 'audio';
    } else if (extension === 'pdf') {
      return 'pdf';
    } else {
      return 'other';
    }
  };

  const getFileIcon = (fileName: string) => {
    const fileType = getFileType(fileName);
    
    switch (fileType) {
      case 'pdf':
        return <FileText className="h-5 w-5 text-red-500" />;
      case 'image':
        return <FileImage className="h-5 w-5 text-green-500" />;
      case 'video':
        return <FileVideo className="h-5 w-5 text-purple-500" />;
      case 'audio':
        return <FileAudio className="h-5 w-5 text-blue-500" />;
      default:
        const extension = fileName.split('.').pop()?.toLowerCase();
        if (['doc', 'docx', 'txt'].includes(extension || '')) {
          return <FileText className="h-5 w-5 text-blue-500" />;
        } else if (['zip', 'rar', '7z'].includes(extension || '')) {
          return <FileArchive className="h-5 w-5 text-amber-500" />;
        } else {
          return <FileIcon className="h-5 w-5 text-gray-500" />;
        }
    }
  };

  const canPreview = (fileName: string): boolean => {
    const fileType = getFileType(fileName);
    return ['image', 'video', 'audio', 'pdf'].includes(fileType);
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
                          {getFileType(file.name) === 'audio' ? 
                            <Music className="h-4 w-4" /> : 
                            getFileType(file.name) === 'video' ? 
                              <Play className="h-4 w-4" /> : 
                              <Eye className="h-4 w-4" />
                          }
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
            <DialogTitle>File Preview: {previewTitle}</DialogTitle>
          </DialogHeader>
          <div className="mt-4 max-h-[70vh] overflow-auto">
            {previewUrl && (
              previewType === 'image' ? (
                <img src={previewUrl} alt="Preview" className="max-w-full h-auto mx-auto" />
              ) : previewType === 'video' ? (
                <div className="aspect-video">
                  <video src={previewUrl} controls className="w-full h-auto rounded-md" controlsList="nodownload">
                    Your browser does not support the video tag.
                  </video>
                </div>
              ) : previewType === 'audio' ? (
                <div className="bg-gray-100 p-6 rounded-lg flex flex-col items-center">
                  <Music className="h-16 w-16 text-innovate-600 mb-4" />
                  <p className="text-gray-700 mb-4 text-center font-medium">{previewTitle}</p>
                  <audio controls className="w-full max-w-md" controlsList="nodownload">
                    <source src={previewUrl} />
                    Your browser does not support the audio element.
                  </audio>
                </div>
              ) : previewType === 'pdf' ? (
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

export default FileList;
