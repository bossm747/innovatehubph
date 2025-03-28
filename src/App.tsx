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
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
