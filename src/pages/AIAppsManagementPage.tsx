
import { useState, useEffect } from "react";
import { Helmet } from "react-helmet";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import AIProjectsList from "@/components/ai-management/AIProjectsList";
import AIResourcesGenerator from "@/components/ai-management/AIResourcesGenerator";
import AIFileManager from "@/components/ai-management/AIFileManager";
import { AvailableSecretsProvider } from "@/contexts/AvailableSecretsContext";

const AIAppsManagementPage = () => {
  return (
    <div className="min-h-screen w-full overflow-x-hidden relative">
      <Helmet>
        <title>AI Apps Management - InnovateHub</title>
        <meta name="description" content="Internal AI tools and resources management for InnovateHub projects." />
      </Helmet>
      
      <Navbar />
      
      <main className="container mx-auto px-4 py-8 min-h-screen">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">AI Apps Management</h1>
          <p className="text-muted-foreground">
            Internal tools for managing AI resources, generated content, and project implementation.
          </p>
        </div>
        
        <AvailableSecretsProvider>
          <Tabs defaultValue="projects" className="w-full">
            <TabsList className="grid grid-cols-3 mb-8">
              <TabsTrigger value="projects">Projects</TabsTrigger>
              <TabsTrigger value="generate">Generate Resources</TabsTrigger>
              <TabsTrigger value="files">File Manager</TabsTrigger>
            </TabsList>
            
            <TabsContent value="projects" className="mt-4">
              <AIProjectsList />
            </TabsContent>
            
            <TabsContent value="generate" className="mt-4">
              <AIResourcesGenerator />
            </TabsContent>
            
            <TabsContent value="files" className="mt-4">
              <AIFileManager />
            </TabsContent>
          </Tabs>
        </AvailableSecretsProvider>
      </main>
      
      <Footer />
    </div>
  );
};

export default AIAppsManagementPage;
