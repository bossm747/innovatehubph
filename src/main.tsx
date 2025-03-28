
import React from 'react';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { Toaster } from '@/components/ui/toaster';

import App from '@/App';
import './index.css';

// Pages
import Index from '@/pages/Index';
import AboutPage from '@/pages/AboutPage';
import ServicesPage from '@/pages/ServicesPage';
import TeamPage from '@/pages/TeamPage';
import ClientsPage from '@/pages/ClientsPage';
import ContactPage from '@/pages/ContactPage';
import NotFound from '@/pages/NotFound';
import BlogPage from '@/pages/BlogPage';
import FacebookPage from '@/pages/FacebookPage';
import InquiryPage from '@/pages/InquiryPage';
import PlatapayPage from '@/pages/PlatapayPage';
import AiSolutionsPage from '@/pages/AiSolutionsPage';
import DigitalCustomizationsPage from '@/pages/DigitalCustomizationsPage';
import EcommercePage from '@/pages/EcommercePage';
import GlobalExpansionPage from '@/pages/GlobalExpansionPage';
import AdminDashboardPage from '@/pages/AdminDashboardPage';
import AIAppsManagementPage from '@/pages/AIAppsManagementPage';
import StaffPortal from '@/components/StaffPortal';
import AIToolsPage from '@/pages/AIToolsPage';  // Add this import

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    errorElement: <NotFound />,
    children: [
      { index: true, element: <Index /> },
      { path: 'about', element: <AboutPage /> },
      { path: 'services', element: <ServicesPage /> },
      { path: 'team', element: <TeamPage /> },
      { path: 'clients', element: <ClientsPage /> },
      { path: 'contact', element: <ContactPage /> },
      { path: 'blog', element: <BlogPage /> },
      { path: 'facebook', element: <FacebookPage /> },
      { path: 'inquire', element: <InquiryPage /> },
      { path: 'platapay', element: <PlatapayPage /> },
      { path: 'services/ai-solutions', element: <AiSolutionsPage /> },
      { path: 'services/digital-customizations', element: <DigitalCustomizationsPage /> },
      { path: 'services/ecommerce', element: <EcommercePage /> },
      { path: 'services/global-expansion', element: <GlobalExpansionPage /> },
      { path: 'admin/dashboard', element: <AdminDashboardPage /> },
      { path: 'admin/ai-tools', element: <AIToolsPage /> },  // Add this route
      { path: 'admin/ai-management', element: <AIAppsManagementPage /> },
      { path: 'staff-portal', element: <StaffPortal /> },
    ]
  }
]);

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <RouterProvider router={router} />
    <Toaster />
  </React.StrictMode>,
);
