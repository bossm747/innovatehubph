import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import HomePage from './pages/HomePage';
import AboutPage from './pages/AboutPage';
import ServicesPage from './pages/ServicesPage';
import PlatapayPage from './pages/PlatapayPage';
import ContactPage from './pages/ContactPage';
import BlogPage from './pages/BlogPage';
import BlogPostPage from './pages/BlogPostPage';
import InquiryPage from './pages/InquiryPage';
import NotFoundPage from './pages/NotFoundPage';
import PrivacyPolicyPage from './pages/PrivacyPolicyPage';
import TermsOfServicePage from './pages/TermsOfServicePage';
import CareersPage from './pages/CareersPage';
import JobPostingPage from './pages/JobPostingPage';
import DashboardPage from './pages/dashboard/DashboardPage';
import DashboardLoginPage from './pages/dashboard/DashboardLoginPage';
import DashboardAnalyticsPage from './pages/dashboard/DashboardAnalyticsPage';
import DashboardCustomersPage from './pages/dashboard/DashboardCustomersPage';
import DashboardMarketingPage from './pages/dashboard/DashboardMarketingPage';
import DashboardSettingsPage from './pages/dashboard/DashboardSettingsPage';
import ProtectedRoute from './components/ProtectedRoute';

function App() {
  return (
    <Router>
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<HomePage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/services" element={<ServicesPage />} />
        <Route path="/platapay" element={<PlatapayPage />} />
        <Route path="/contact" element={<ContactPage />} />
        <Route path="/blog" element={<BlogPage />} />
        <Route path="/blog/:slug" element={<BlogPostPage />} />
        <Route path="/inquiry" element={<InquiryPage />} />
        <Route path="/privacy-policy" element={<PrivacyPolicyPage />} />
        <Route path="/terms-of-service" element={<TermsOfServicePage />} />
        <Route path="/careers" element={<CareersPage />} />
        <Route path="/careers/:id" element={<JobPostingPage />} />
        
        {/* Dashboard Routes */}
        <Route path="/dashboard/login" element={<DashboardLoginPage />} />
        <Route path="/dashboard" element={
          <ProtectedRoute>
            <DashboardPage />
          </ProtectedRoute>
        } />
        <Route path="/dashboard/analytics" element={
          <ProtectedRoute>
            <DashboardAnalyticsPage />
          </ProtectedRoute>
        } />
        <Route path="/dashboard/customers" element={
          <ProtectedRoute>
            <DashboardCustomersPage />
          </ProtectedRoute>
        } />
        <Route path="/dashboard/marketing" element={
          <ProtectedRoute>
            <DashboardMarketingPage />
          </ProtectedRoute>
        } />
        <Route path="/dashboard/settings" element={
          <ProtectedRoute>
            <DashboardSettingsPage />
          </ProtectedRoute>
        } />
        
        {/* 404 Route */}
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </Router>
  );
}

export default App;
