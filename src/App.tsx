import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import AIToolsPage from '@/pages/AIToolsPage';
import AIImageProcessingPage from '@/pages/AIImageProcessingPage';
import AdminDashboardPage from '@/pages/AdminDashboardPage';
import UserManagement from '@/components/admin/UserManagement';
import DatabaseManagement from '@/components/admin/DatabaseManagement';
import AdminAIManagement from '@/components/admin/AdminAIManagement';
import NotFoundPage from '@/pages/NotFoundPage';
import ContactPage from '@/pages/ContactPage';
import AboutPage from '@/pages/AboutPage';
import BlogPage from '@/pages/BlogPage';
import ClientsPage from '@/pages/ClientsPage';
import ServicesPage from '@/pages/ServicesPage';
import AIAppsManagementPage from '@/pages/AIAppsManagementPage';
import AiSolutionsPage from '@/pages/AiSolutionsPage';
import DigitalCustomizationsPage from '@/pages/DigitalCustomizationsPage';
import EcommercePage from '@/pages/EcommercePage';
import FacebookPage from '@/pages/FacebookPage';
import GlobalExpansionPage from '@/pages/GlobalExpansionPage';
import InquiryPage from '@/pages/InquiryPage';
import PlatapayPage from '@/pages/PlatapayPage';
import TeamPage from '@/pages/TeamPage';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<AIToolsPage />} />
        <Route path="/ai-tools-image" element={<AIImageProcessingPage />} />
        <Route path="/admin" element={<AdminDashboardPage />}>
          <Route path="users" element={<UserManagement />} />
          <Route path="database" element={<DatabaseManagement />} />
          <Route path="ai-management" element={<AdminAIManagement />} />
        </Route>
        <Route path="/contact" element={<ContactPage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/blog" element={<BlogPage />} />
        <Route path="/clients" element={<ClientsPage />} />
        <Route path="/services" element={<ServicesPage />} />
        <Route path="/ai-apps-management" element={<AIAppsManagementPage />} />
        <Route path="/ai-solutions" element={<AiSolutionsPage />} />
        <Route path="/digital-customizations" element={<DigitalCustomizationsPage />} />
        <Route path="/ecommerce" element={<EcommercePage />} />
        <Route path="/facebook" element={<FacebookPage />} />
        <Route path="/global-expansion" element={<GlobalExpansionPage />} />
        <Route path="/inquiry" element={<InquiryPage />} />
        <Route path="/platapay" element={<PlatapayPage />} />
        <Route path="/team" element={<TeamPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
