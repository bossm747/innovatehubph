
import { useState } from "react";
import { Helmet } from "react-helmet";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import AIFileManager from "@/components/ai-management/AIFileManager";

const AIAppsManagementPage = () => {
  return (
    <div className="min-h-screen w-full overflow-x-hidden relative">
      <Helmet>
        <title>AI Apps Management - InnovateHub</title>
        <meta name="description" content="Internal AI tools and resources management for InnovateHub projects." />
      </Helmet>
      
      <Navbar />
      
      <main className="container mx-auto px-4 py-8 pb-0 min-h-screen">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">AI Apps Management</h1>
          <p className="text-muted-foreground">
            Internal tools for managing AI resources, generated content, and project implementation.
          </p>
        </div>
        
        <Tabs defaultValue="files" className="w-full">
          <TabsList className="grid grid-cols-1 mb-8">
            <TabsTrigger value="files">File Manager</TabsTrigger>
          </TabsList>
          
          <TabsContent value="files" className="mt-4">
            <div className="p-6 bg-white rounded-lg shadow">
              <h2 className="text-xl font-semibold mb-4">AI File Management</h2>
              <p className="text-gray-600 mb-6">
                Organize and manage your AI-related files, including models, datasets, and generated outputs.
              </p>
            </div>
          </TabsContent>
        </Tabs>
      </main>
      
      <Footer />
    </div>
  );
};

export default AIAppsManagementPage;
