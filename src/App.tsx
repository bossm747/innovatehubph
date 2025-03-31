
import React from 'react';
import { Routes, Route } from 'react-router-dom';
import './App.css';
import HomePage from './pages/Index';
import AboutPage from './pages/AboutPage';
import ServicesPage from './pages/ServicesPage';
import ContactPage from './pages/ContactPage';
import InquiryPage from './pages/InquiryPage';
import NotFound from './pages/NotFound';
import AllServicesPage from './pages/AllServicesPage';
import AIAppsManagementPage from './pages/AIAppsManagementPage';
import AIImageProcessingPage from './pages/AIImageProcessingPage';
import AIToolsPage from './pages/AIToolsPage';
import ClientsPage from './pages/ClientsPage';
import AdminContentPage from './pages/AdminContentPage';

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
      <Route path="/inquiry" element={<InquiryPage />} />
      <Route path="/ai-tools" element={<AIToolsPage />} />
      <Route path="/ai-image-processing" element={<AIImageProcessingPage />} />
      <Route path="/ai-apps-management" element={<AIAppsManagementPage />} />
      <Route path="/clients" element={<ClientsPage />} />
      <Route path="/team" element={<AboutPage />} /> {/* Currently reusing AboutPage for team */}
      
      {/* Admin Routes */}
      <Route 
        path="/admin/content" 
        element={
          <ProtectedRoute>
            <AdminContentPage />
          </ProtectedRoute>
        } 
      />
      
      {/* 404 Route */}
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

export default App;
