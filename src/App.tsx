
import { Routes, Route, Navigate } from 'react-router-dom';
import HomePage from './pages/HomePage';
import AboutPage from './pages/AboutPage';
import ServicesPage from './pages/ServicesPage';
import ContactPage from './pages/ContactPage';
import PlatapayPage from './pages/PlatapayPage';
import AdminLayout from './pages/admin/AdminLayout';
import AdminDashboard from './pages/admin/AdminDashboard';
import AdminContentPage from './pages/admin/AdminContentPage';
import AdminNavigationPage from './pages/admin/AdminNavigationPage';
import AdminDesignPage from './pages/admin/AdminDesignPage';
import AdminDatabasePage from './pages/admin/AdminDatabasePage';
import AdminUsersPage from './pages/admin/AdminUsersPage';
import AdminSettingsPage from './pages/admin/AdminSettingsPage';
import AdminEmailPage from './pages/admin/AdminEmailPage';
import AdminAIToolsPage from './pages/admin/AdminAIToolsPage';
import AdminAIManagementPage from './pages/admin/AdminAIManagementPage';
import AdminPaymentsPage from './pages/admin/AdminPaymentsPage';
import NotFoundPage from './pages/NotFoundPage';

function App() {
  return (
    <Routes>
      {/* Public routes */}
      <Route path="/" element={<HomePage />} />
      <Route path="/about" element={<AboutPage />} />
      <Route path="/services" element={<ServicesPage />} />
      <Route path="/platapay" element={<PlatapayPage />} />
      <Route path="/contact" element={<ContactPage />} />
      
      {/* Admin routes */}
      <Route path="/admin" element={<AdminLayout />}>
        <Route index element={<Navigate to="/admin/dashboard" replace />} />
        <Route path="dashboard" element={<AdminDashboard />} />
        <Route path="content" element={<AdminContentPage />} />
        <Route path="navigation" element={<AdminNavigationPage />} />
        <Route path="design" element={<AdminDesignPage />} />
        <Route path="database" element={<AdminDatabasePage />} />
        <Route path="users" element={<AdminUsersPage />} />
        <Route path="settings" element={<AdminSettingsPage />} />
        <Route path="email" element={<AdminEmailPage />} />
        <Route path="ai-tools" element={<AdminAIToolsPage />} />
        <Route path="ai-management" element={<AdminAIManagementPage />} />
        <Route path="payments" element={<AdminPaymentsPage />} />
      </Route>
      
      {/* 404 route */}
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
}

export default App;
