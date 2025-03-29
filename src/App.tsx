
import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import AIToolsPage from '@/pages/AIToolsPage';
import ImageProcessingTool from '@/components/ImageProcessingTool';
import AdminDashboardPage from '@/pages/AdminDashboardPage';
import AdminPortal from '@/components/AdminPortal';
import AdminContentPage from '@/pages/AdminContentPage';
import { QueryProvider } from '@/providers/QueryProvider';
import NotFound from '@/pages/NotFound';
import IndexPage from '@/pages/Index';
import AboutPage from '@/pages/AboutPage';
import ContactPage from '@/pages/ContactPage';
import ServicesPage from '@/pages/ServicesPage';
import TeamPage from '@/pages/TeamPage';
import BlogPage from '@/pages/BlogPage';
import ClientsPage from '@/pages/ClientsPage';
import PlatapayPage from '@/pages/PlatapayPage';
import AIAppsManagementPage from '@/pages/AIAppsManagementPage';
import AIImageProcessingPage from '@/pages/AIImageProcessingPage';
import DigitalCustomizationsPage from '@/pages/DigitalCustomizationsPage';
import EcommercePage from '@/pages/EcommercePage';
import AiSolutionsPage from '@/pages/AiSolutionsPage';
import GlobalExpansionPage from '@/pages/GlobalExpansionPage';

// Admin Pages
import AdminContentManagementPage from '@/pages/admin/AdminContentManagementPage';
import AdminPageSectionsPage from '@/pages/admin/AdminPageSectionsPage';
import AdminNavigationPage from '@/pages/admin/AdminNavigationPage';
import AdminDesignPage from '@/pages/admin/AdminDesignPage';

function App() {
  return (
    <QueryProvider>
      <BrowserRouter>
        <Routes>
          {/* Main Routes */}
          <Route path="/" element={<IndexPage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/services" element={<ServicesPage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/team" element={<TeamPage />} />
          <Route path="/blog" element={<BlogPage />} />
          <Route path="/clients" element={<ClientsPage />} />
          <Route path="/platapay" element={<PlatapayPage />} />
          
          {/* Services Routes */}
          <Route path="/services/digital-customizations" element={<DigitalCustomizationsPage />} />
          <Route path="/services/ecommerce" element={<EcommercePage />} />
          <Route path="/services/ai-solutions" element={<AiSolutionsPage />} />
          <Route path="/services/global-expansion" element={<GlobalExpansionPage />} />

          {/* AI Tools Routes */}
          <Route path="/ai-tools" element={<AIToolsPage />} />
          <Route path="/ai-image-processing" element={<AIImageProcessingPage />} />
          <Route path="/ai-apps-management" element={<AIAppsManagementPage />} />
          
          {/* Admin Routes */}
          <Route path="/admin/dashboard" element={<AdminDashboardPage />} />
          <Route path="/admin/portal" element={<AdminPortal />} />
          
          {/* New Admin Routes */}
          <Route path="/admin/content" element={<AdminContentManagementPage />} />
          <Route path="/admin/content/:pageId" element={<AdminPageSectionsPage />} />
          <Route path="/admin/navigation" element={<AdminNavigationPage />} />
          <Route path="/admin/design" element={<AdminDesignPage />} />
          
          {/* 404 Route */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </QueryProvider>
  );
}

export default App;
