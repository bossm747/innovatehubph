
import React from 'react';
import { Routes, Route } from 'react-router-dom';
import './App.css';
import HomePage from './pages/Index';
import AboutPage from './pages/AboutPage';
import ServicesPage from './pages/ServicesPage';
import ContactPage from './pages/ContactPage';
import NotFound from './pages/NotFound';
import AllServicesPage from './pages/AllServicesPage';
import AIAppsManagementPage from './pages/AIAppsManagementPage';
import AIImageProcessingPage from './pages/AIImageProcessingPage';
import AIToolsPage from './pages/AIToolsPage';
import ClientsPage from './pages/ClientsPage';
import AdminContentPage from './pages/AdminContentPage';
import AdminDashboardPage from './pages/AdminDashboardPage';
import AdminNavigationPage from './pages/admin/AdminNavigationPage';
import AiSolutionsPage from './pages/AiSolutionsPage';
import BlogPage from './pages/BlogPage';
import DigitalCustomizationsPage from './pages/DigitalCustomizationsPage';
import EcommercePage from './pages/EcommercePage';
import FacebookPage from './pages/FacebookPage';
import FileUploadPage from './pages/FileUploadPage';
import FintechSolutionsPage from './pages/FintechSolutionsPage';
import GlobalExpansionPage from './pages/GlobalExpansionPage';
import MobileAppDevelopmentPage from './pages/MobileAppDevelopmentPage';
import PartnersPage from './pages/PartnersPage';
import TeamPage from './pages/TeamPage';
import AdminLoginPage from './pages/AdminLoginPage';

// Protected route component
import ProtectedRoute from './components/ProtectedRoute';

function App() {
  return (
    <Routes>
      {/* Public Routes */}
      <Route path="/" element={<HomePage />} />
      <Route path="/about" element={<AboutPage />} />
      <Route path="/services" element={<ServicesPage />} />
      <Route path="/all-services" element={<AllServicesPage />} />
      <Route path="/contact" element={<ContactPage />} />
      
      {/* AI Tools & Resources */}
      <Route path="/ai-tools" element={<AIToolsPage />} />
      <Route path="/ai-image-processing" element={<AIImageProcessingPage />} />
      <Route path="/ai-apps-management" element={<AIAppsManagementPage />} />
      <Route path="/ai-solutions" element={<AiSolutionsPage />} />
      
      {/* Service Detail Pages */}
      <Route path="/digital-customizations" element={<DigitalCustomizationsPage />} />
      <Route path="/ecommerce" element={<EcommercePage />} />
      <Route path="/fintech-solutions" element={<FintechSolutionsPage />} />
      <Route path="/global-expansion" element={<GlobalExpansionPage />} />
      <Route path="/mobile-app-development" element={<MobileAppDevelopmentPage />} />
      
      {/* Company Pages */}
      <Route path="/clients" element={<ClientsPage />} />
      <Route path="/team" element={<TeamPage />} />
      <Route path="/partners" element={<PartnersPage />} />
      <Route path="/blog" element={<BlogPage />} />
      <Route path="/facebook" element={<FacebookPage />} />
      
      {/* Utility Pages */}
      <Route path="/file-upload" element={<FileUploadPage />} />
      
      {/* Admin Login */}
      <Route path="/admin/login" element={<AdminLoginPage />} />
      
      {/* Admin Routes */}
      <Route 
        path="/admin/content" 
        element={
          <ProtectedRoute>
            <AdminContentPage />
          </ProtectedRoute>
        } 
      />
      <Route 
        path="/admin/dashboard" 
        element={
          <ProtectedRoute>
            <AdminDashboardPage />
          </ProtectedRoute>
        } 
      />
      <Route
        path="/admin/navigation"
        element={
          <ProtectedRoute>
            <AdminNavigationPage />
          </ProtectedRoute>
        }
      />
      
      {/* 404 Route */}
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

export default App;
