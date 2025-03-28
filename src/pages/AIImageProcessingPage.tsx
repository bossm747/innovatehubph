
import React from 'react';
import { Helmet } from 'react-helmet';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import ImageProcessingTool from '@/components/ImageProcessingTool';
import { CrawlForm } from '@/components/CrawlForm';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

const AIImageProcessingPage = () => {
  return (
    <>
      <Helmet>
        <title>AI Image Processing and Web Scraping - InnovateHub</title>
        <meta name="description" content="AI-powered image processing and web scraping tools for InnovateHub projects" />
      </Helmet>
      
      <Navbar />
      
      <main className="container mx-auto px-4 py-8 min-h-screen">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">AI Image & Data Tools</h1>
          <p className="text-muted-foreground">
            Process images with AI and extract data from websites
          </p>
        </div>
        
        <Tabs defaultValue="image-processing" className="w-full">
          <TabsList className="grid grid-cols-2 mb-8">
            <TabsTrigger value="image-processing">Image Processing</TabsTrigger>
            <TabsTrigger value="web-scraping">Web Scraping</TabsTrigger>
          </TabsList>
          
          <TabsContent value="image-processing">
            <ImageProcessingTool />
          </TabsContent>
          
          <TabsContent value="web-scraping">
            <CrawlForm />
          </TabsContent>
        </Tabs>
      </main>
      
      <Footer />
    </>
  );
};

export default AIImageProcessingPage;
