
import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import AIToolsPage from '@/pages/AIToolsPage';
import ImageProcessingTool from '@/components/ImageProcessingTool';
import AdminDashboardPage from '@/pages/AdminDashboardPage';
import AdminPortal from '@/components/AdminPortal';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<AIToolsPage />} />
        <Route path="/ai-tools" element={<AIToolsPage />} />
        <Route path="/ai-tools-image" element={<ImageProcessingTool />} />
        <Route path="/admin/dashboard" element={<AdminDashboardPage />} />
        <Route path="/admin/portal" element={<AdminPortal />} />
        <Route path="*" element={<AIToolsPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
