
import React, { useState, useRef } from 'react';
import { toast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Upload, FileUp, AlertCircle, FileAudio, FileVideo } from 'lucide-react';

interface FileUploaderProps {
  onUploadComplete: () => void;
}

const FileUploader: React.FC<FileUploaderProps> = ({ onUploadComplete }) => {
  const [uploading, setUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Set maximum file size to 500MB
  const MAX_FILE_SIZE = 524288000; // 500MB in bytes
  const MAX_FILE_SIZE_DISPLAY = '500MB';

  const handleFileChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    if (!event.target.files || event.target.files.length === 0) {
      return;
    }

    try {
      setUploading(true);
      setUploadProgress(0);
      
      const file = event.target.files[0];
      
      // Check file size before trying to upload
      if (file.size > MAX_FILE_SIZE) {
        throw new Error(`File size exceeds the maximum allowed limit (${MAX_FILE_SIZE_DISPLAY}).`);
      }
      
      const fileExt = file.name.split('.').pop();
      const fileName = `${Math.random().toString(36).substring(2, 15)}_${new Date().getTime()}.${fileExt}`;
      
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

      // Make sure the bucket exists before uploading
      const { data: bucketExists } = await supabase
        .storage
        .getBucket('project_files');
        
      // Create bucket if it doesn't exist
      if (!bucketExists) {
        // This will only happen once during development
        console.log('Creating project_files bucket');
        
        // Create the bucket first
        await supabase
          .storage
          .createBucket('project_files', {
            public: true,
            fileSizeLimit: MAX_FILE_SIZE, // Updated to 500MB in bytes
          });
      }

      // Now upload the file
      const { error } = await supabase.storage
        .from('project_files')
        .upload(fileName, file);

      clearInterval(progressInterval);
      
      if (error) {
        // Check for specific RLS policy-related errors
        if (error.message?.includes('Policy') || error.message?.includes('security')) {
          console.error('RLS policy error:', error);
          throw new Error('Permission denied. Storage security policies need to be configured.');
        }
        throw error;
      }

      setUploadProgress(100);
      
      // Show a specific message for audio/video files
      const fileType = getFileType(fileName);
      if (fileType === 'audio') {
        toast.success('Audio file uploaded successfully! You can now play it from the file list.');
      } else if (fileType === 'video') {
        toast.success('Video file uploaded successfully! You can now play it from the file list.');
      } else {
        toast.success('File uploaded successfully!');
      }
      
      onUploadComplete();
      
      // Reset the file input
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
    } catch (error: any) {
      console.error('Error uploading file:', error.message);
      
      // More descriptive error message based on common issues
      if (error.message?.includes('bucket') || error.message?.includes('not found')) {
        toast.error('Storage bucket not found. Please contact your administrator.');
      } else if (error.message?.includes('permission') || error.message?.includes('access') || error.message?.includes('policy')) {
        toast.error('Permission denied. You may not have access to upload files. Contact your administrator.');
      } else if (error.message?.includes('size')) {
        toast.error(`File size exceeds the maximum allowed limit (${MAX_FILE_SIZE_DISPLAY}).`);
      } else {
        toast.error(`Error uploading file: ${error.message}`);
      }
    } finally {
      setTimeout(() => {
        setUploading(false);
        setUploadProgress(0);
      }, 1000);
    }
  };

  // Detect file type based on extension
  const getFileType = (fileName: string): string => {
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

  return (
    <div className="w-full">
      <div className="flex flex-col items-center justify-center p-6 border-2 border-dashed border-gray-300 rounded-lg bg-gray-50 hover:bg-gray-100 transition cursor-pointer" onClick={() => fileInputRef.current?.click()}>
        <FileUp className="h-12 w-12 text-innovate-500 mb-4" />
        <p className="text-lg font-medium mb-1">Drag and drop or click to upload</p>
        <p className="text-gray-500 text-sm mb-4">Support for images, documents, videos, and audio files</p>
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
            <li>Maximum file size: {MAX_FILE_SIZE_DISPLAY}</li>
            <li>
              Supported media files: 
              <div className="flex flex-wrap gap-2 mt-1 ml-3">
                <span className="flex items-center text-xs py-1 px-2 bg-blue-100 rounded">
                  <FileAudio className="h-3 w-3 mr-1" /> MP3, WAV, OGG, FLAC
                </span>
                <span className="flex items-center text-xs py-1 px-2 bg-purple-100 rounded">
                  <FileVideo className="h-3 w-3 mr-1" /> MP4, WEBM, MOV, AVI
                </span>
              </div>
            </li>
            <li>Images, documents, and other file types are also supported</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default FileUploader;
