
import React, { useState, useRef } from 'react';
import { toast } from 'sonner';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Upload, FileUp, AlertCircle } from 'lucide-react';

interface FileUploaderProps {
  onUploadComplete: () => void;
}

const FileUploader: React.FC<FileUploaderProps> = ({ onUploadComplete }) => {
  const [uploading, setUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    if (!event.target.files || event.target.files.length === 0) {
      return;
    }

    try {
      setUploading(true);
      setUploadProgress(0);
      
      const file = event.target.files[0];
      const fileExt = file.name.split('.').pop();
      const filePath = `${Math.random()}.${fileExt}`;

      // Simulate upload progress (Supabase doesn't provide progress events)
      const progressInterval = setInterval(() => {
        setUploadProgress(prev => {
          if (prev >= 95) {
            clearInterval(progressInterval);
            return 95;
          }
          return prev + 5;
        });
      }, 100);

      const { error } = await supabase.storage
        .from('project_files')
        .upload(filePath, file);

      clearInterval(progressInterval);
      
      if (error) {
        throw error;
      }

      setUploadProgress(100);
      toast.success('File uploaded successfully!');
      onUploadComplete();
      
      // Reset the file input
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
    } catch (error: any) {
      toast.error(`Error uploading file: ${error.message}`);
    } finally {
      setTimeout(() => {
        setUploading(false);
        setUploadProgress(0);
      }, 1000);
    }
  };

  return (
    <div className="w-full">
      <div className="flex flex-col items-center justify-center p-6 border-2 border-dashed border-gray-300 rounded-lg bg-gray-50 hover:bg-gray-100 transition cursor-pointer" onClick={() => fileInputRef.current?.click()}>
        <FileUp className="h-12 w-12 text-innovate-500 mb-4" />
        <p className="text-lg font-medium mb-1">Drag and drop or click to upload</p>
        <p className="text-gray-500 text-sm mb-4">Support for images, documents, videos, and other file types</p>
        <Button variant="primary" onClick={(e) => {
          e.stopPropagation();
          fileInputRef.current?.click();
        }}>
          <Upload className="mr-2 h-4 w-4" /> Select File
        </Button>
        <input
          type="file"
          ref={fileInputRef}
          onChange={handleFileChange}
          className="hidden"
          disabled={uploading}
        />
      </div>

      {uploading && (
        <div className="mt-4">
          <div className="flex justify-between mb-1">
            <span className="text-sm font-medium">Uploading...</span>
            <span className="text-sm">{uploadProgress}%</span>
          </div>
          <Progress value={uploadProgress} className="w-full" />
        </div>
      )}

      <div className="mt-4 bg-blue-50 border border-blue-200 rounded-md p-4 flex items-start">
        <AlertCircle className="h-5 w-5 text-blue-500 mr-3 flex-shrink-0 mt-0.5" />
        <div className="text-sm text-blue-700">
          <p className="font-medium">File upload information:</p>
          <ul className="list-disc list-inside mt-1 space-y-1">
            <li>Maximum file size: 50MB</li>
            <li>Supported file types: images, documents, videos, and more</li>
            <li>Files are securely stored and accessible only to you</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default FileUploader;
