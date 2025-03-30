
import React, { useState, useEffect } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { useScrollToTop } from './hooks/useScrollToTop';

// Import page components
import Index from '@/pages/Index';
import AboutPage from '@/pages/AboutPage';
import AboutUsPage from '@/pages/AboutUsPage';
import ServicesPage from '@/pages/ServicesPage';
import AllServicesPage from '@/pages/AllServicesPage';
import TeamPage from '@/pages/TeamPage';
import ContactPage from '@/pages/ContactPage';
import ContactUsPage from '@/pages/ContactUsPage';
import BlogPage from '@/pages/BlogPage';
import ClientsPage from '@/pages/ClientsPage';
import FacebookPage from '@/pages/FacebookPage';
import InquiryPage from '@/pages/InquiryPage';
import FintechSolutionsPage from '@/pages/FintechSolutionsPage';
import DigitalCustomizationsPage from '@/pages/DigitalCustomizationsPage';
import EcommercePage from '@/pages/EcommercePage';
import AiSolutionsPage from '@/pages/AiSolutionsPage';
import GlobalExpansionPage from '@/pages/GlobalExpansionPage';
import MobileAppDevelopmentPage from '@/pages/MobileAppDevelopmentPage';
import AdminDashboardPage from '@/pages/AdminDashboardPage';
import AdminContentPage from '@/pages/AdminContentPage';
import NotFound from '@/pages/NotFound';
import AIToolsPage from '@/pages/AIToolsPage';
import AIImageProcessingPage from '@/pages/AIImageProcessingPage';
import AIAppsManagementPage from '@/pages/AIAppsManagementPage';
import FileUploadPage from '@/pages/FileUploadPage';
import PartnersPage from '@/pages/PartnersPage';
import AdminPortal from '@/components/AdminPortal';
import PlatapayDetailsPage from '@/pages/PlatapayDetailsPage';
import PrivacyPolicyPage from '@/pages/PrivacyPolicyPage';
import EmailTemplatesPage from '@/components/email/EmailTemplatesPage';

// Create a query client
const queryClient = new QueryClient();

// Create a wrapper for the QueryClientProvider
const QueryProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <QueryClientProvider client={queryClient}>
    {children}
  </QueryClientProvider>
);

function App() {
  const location = useLocation();
  const [isHomePage, setIsHomePage] = useState(location.pathname === '/');
  
  // Use the scroll to top hook
  useScrollToTop();

  useEffect(() => {
    setIsHomePage(location.pathname === '/');
  }, [location]);

  return (
    <QueryProvider>
      <Routes>
        <Route path="/" element={<Index />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/about-us" element={<AboutUsPage />} />
        <Route path="/services" element={<ServicesPage />} />
        <Route path="/all-services" element={<AllServicesPage />} />
        <Route path="/team" element={<TeamPage />} />
        <Route path="/contact" element={<ContactPage />} />
        <Route path="/contact-us" element={<ContactUsPage />} />
        <Route path="/blog" element={<BlogPage />} />
        <Route path="/clients" element={<ClientsPage />} />
        <Route path="/partners" element={<PartnersPage />} />
        <Route path="/facebook" element={<FacebookPage />} />
        <Route path="/inquiry" element={<InquiryPage />} />
        <Route path="/fileupload" element={<FileUploadPage />} />
        <Route path="/platapay" element={<PlatapayDetailsPage />} />
        <Route path="/privacy-policy" element={<PrivacyPolicyPage />} />
        <Route path="/email-templates" element={<EmailTemplatesPage />} />
        
        {/* Service Pages */}
        <Route path="/fintech-solutions" element={<FintechSolutionsPage />} />
        <Route path="/digital-customizations" element={<DigitalCustomizationsPage />} />
        <Route path="/ecommerce" element={<EcommercePage />} />
        <Route path="/ai-solutions" element={<AiSolutionsPage />} />
        <Route path="/mobile-app-development" element={<MobileAppDevelopmentPage />} />
        <Route path="/global-expansion" element={<GlobalExpansionPage />} />
        
        {/* Admin Routes */}
        <Route path="/admin" element={<AdminDashboardPage />} />
        <Route path="/admin/content" element={<AdminContentPage />} />
        <Route path="/admin/portal" element={<AdminPortal />} />
        
        {/* AI Tools */}
        <Route path="/ai-tools" element={<AIToolsPage />} />
        <Route path="/ai-image-processing" element={<AIImageProcessingPage />} />
        <Route path="/ai-apps-management" element={<AIAppsManagementPage />} />
        
        {/* 404 Page */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </QueryProvider>
  );
}

export default App;
