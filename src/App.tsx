
import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import AIToolsPage from '@/pages/AIToolsPage';
import ImageProcessingTool from '@/components/ImageProcessingTool';
import AdminDashboardPage from '@/pages/AdminDashboardPage';
import { AdminAuthProvider } from '@/contexts/AdminAuthContext';
import AdminPortal from '@/components/AdminPortal';
import AdminLoginForm from '@/components/AdminLoginForm';

function App() {
  return (
    <AdminAuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<AIToolsPage />} />
          <Route path="/ai-tools" element={<AIToolsPage />} />
          <Route path="/ai-tools-image" element={<ImageProcessingTool />} />
          <Route path="/admin/dashboard" element={<AdminDashboardPage />} />
          <Route path="/admin/portal" element={<AdminPortal />} />
          <Route path="/admin/login" element={<AdminLoginForm />} />
          <Route path="*" element={<AIToolsPage />} />
        </Routes>
      </BrowserRouter>
    </AdminAuthProvider>
  );
}

export default App;
