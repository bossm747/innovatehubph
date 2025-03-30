
import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet';
import { toast } from 'sonner';

import { supabase } from '@/integrations/supabase/client';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import CircuitBackground from '@/components/CircuitBackground';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Toaster } from 'sonner';
import { Upload, FileType, CheckCircle, AlertCircle, Trash2, FileIcon } from 'lucide-react';
import FileUploader from '@/components/fileupload/FileUploader';
import FileList from '@/components/fileupload/FileList';

const FileUploadPage = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [files, setFiles] = useState<any[]>([]);
  const [hasBucket, setHasBucket] = useState(false);
  
  // Development mode notice
  const isDevelopment = true;

  useEffect(() => {
    // Check if bucket exists and fetch files on component mount
    checkBucketAndFetchFiles();
  }, []);

  const checkBucketAndFetchFiles = async () => {
    try {
      setIsLoading(true);
      
      // Check if the bucket exists
      const { data: bucketData, error: bucketError } = await supabase
        .storage
        .getBucket('project_files');
        
      if (bucketError && !bucketError.message.includes('not found')) {
        throw bucketError;
      }
      
      if (!bucketData) {
        // Create the bucket if it doesn't exist (first time setup)
        console.log('Creating project_files bucket');
        await supabase
          .storage
          .createBucket('project_files', {
            public: true,
            fileSizeLimit: 52428800, // 50MB in bytes
          });
          
        toast.success('File storage initialized successfully');
        setHasBucket(true);
      } else {
        setHasBucket(true);
      }
      
      // Now fetch files
      await fetchFiles();
    } catch (error: any) {
      console.error('Error initializing storage:', error);
      toast.error(`Error initializing file storage: ${error.message}`);
    } finally {
      setIsLoading(false);
    }
  };

  const fetchFiles = async () => {
    try {
      setIsLoading(true);
      const { data, error } = await supabase
        .storage
        .from('project_files')
        .list();

      if (error) {
        throw error;
      }
      
      if (data) {
        setFiles(data);
      }
    } catch (error: any) {
      console.error('Error fetching files:', error);
      toast.error(`Error fetching files: ${error.message}`);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen w-full overflow-x-hidden relative bg-gradient-to-b from-gray-50 to-white">
      <Helmet>
        <title>File Upload | InnovateHub Inc.</title>
        <meta name="description" content="Upload and manage your project files." />
      </Helmet>
      
      <Toaster position="top-right" />
      
      {/* Background patterns */}
      <CircuitBackground pattern="curvy-line" className="fixed top-0 right-0" size="lg" opacity={0.1} color="primary" />
      <CircuitBackground pattern="blue-curve" className="fixed -bottom-40 -left-40" size="xl" opacity={0.2} color="primary" />
      <CircuitBackground pattern="dotted-grid" className="fixed top-1/4 right-1/4" size="md" opacity={0.1} />
      
      {/* Main content */}
      <Navbar />
      <main className="container mx-auto px-4 py-12 md:px-6 lg:px-8">
        <div className="max-w-5xl mx-auto">
          <div className="mb-10 text-center">
            <h1 className="text-3xl md:text-4xl font-bold mb-4">Project File Management</h1>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Upload and manage files for your projects. We support various file types including images, documents, and videos.
            </p>
          </div>

          {isDevelopment && (
            <Card className="p-4 mb-8 bg-amber-50 border-amber-200">
              <div className="flex items-start space-x-3">
                <AlertCircle className="h-5 w-5 text-amber-500 mt-0.5 flex-shrink-0" />
                <p className="text-amber-700 text-sm">
                  <span className="font-medium">Development Mode:</span> Authentication is currently bypassed for development purposes. In production, this page would require authentication.
                </p>
              </div>
            </Card>
          )}

          <Card className="p-8 mb-8 shadow-md">
            <h2 className="text-xl font-semibold mb-6">Upload Files</h2>
            <FileUploader onUploadComplete={fetchFiles} />
          </Card>

          <Card className="p-8 shadow-md">
            <h2 className="text-xl font-semibold mb-6">Your Files</h2>
            <FileList 
              files={files} 
              isLoading={isLoading} 
              onFileDeleted={fetchFiles} 
            />
          </Card>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default FileUploadPage;
