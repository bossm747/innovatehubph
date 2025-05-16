
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
import BookingPage from './pages/BookingPage';

function App() {
  return (
    <Routes>
      {/* Public Routes */}
      <Route path="/" element={<HomePage />} />
      <Route path="/about" element={<AboutPage />} />
      <Route path="/services" element={<ServicesPage />} />
      <Route path="/all-services" element={<AllServicesPage />} />
      <Route path="/contact" element={<ContactPage />} />
      <Route path="/booking" element={<BookingPage />} />
      
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
      <Route path="/partners" element={<PartnersPage />} />
      <Route path="/blog" element={<BlogPage />} />
      <Route path="/facebook" element={<FacebookPage />} />
      
      {/* Utility Pages */}
      <Route path="/file-upload" element={<FileUploadPage />} />
      
      {/* 404 Route */}
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

export default App;
