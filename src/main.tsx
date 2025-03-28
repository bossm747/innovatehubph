
import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import App from '@/App';
import Index from '@/pages/Index';
import AboutPage from '@/pages/AboutPage';
import ServicesPage from '@/pages/ServicesPage';
import TeamPage from '@/pages/TeamPage';
import ContactPage from '@/pages/ContactPage';
import PlatapayPage from '@/pages/PlatapayPage';
import BlogPage from '@/pages/BlogPage';
import NotFound from '@/pages/NotFound';
import InquiryPage from '@/pages/InquiryPage';
import ClientsPage from '@/pages/ClientsPage';
import DigitalCustomizationsPage from '@/pages/DigitalCustomizationsPage';
import EcommercePage from '@/pages/EcommercePage';
import AiSolutionsPage from '@/pages/AiSolutionsPage';
import GlobalExpansionPage from '@/pages/GlobalExpansionPage';
import FacebookPage from '@/pages/FacebookPage';
import AdminDashboardPage from '@/pages/AdminDashboardPage';
import AIToolsPage from '@/pages/AIToolsPage';
import AIAppsManagementPage from '@/pages/AIAppsManagementPage';
import AIImageProcessingPage from '@/pages/AIImageProcessingPage';

import './index.css';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <Router>
      <Routes>
        <Route path="/" element={<App />}>
          <Route index element={<Index />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/services" element={<ServicesPage />} />
          <Route path="/team" element={<TeamPage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/platapay" element={<PlatapayPage />} />
          <Route path="/blog" element={<BlogPage />} />
          <Route path="/inquiry/:service?" element={<InquiryPage />} />
          <Route path="/clients" element={<ClientsPage />} />
          <Route path="/services/digital-customizations" element={<DigitalCustomizationsPage />} />
          <Route path="/services/ecommerce" element={<EcommercePage />} />
          <Route path="/services/ai-solutions" element={<AiSolutionsPage />} />
          <Route path="/services/global-expansion" element={<GlobalExpansionPage />} />
          <Route path="/facebook" element={<FacebookPage />} />
          <Route path="/admin" element={<AdminDashboardPage />} />
          <Route path="/ai-tools" element={<AIToolsPage />} />
          <Route path="/ai-apps-management" element={<AIAppsManagementPage />} />
          <Route path="/ai-image-processing" element={<AIImageProcessingPage />} />
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </Router>
  </React.StrictMode>,
);
