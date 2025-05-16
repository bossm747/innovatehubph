
import React, { useEffect } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import './App.css';
import HomePage from './pages/Index';
import AboutPage from './pages/AboutPage';
import ServicesPage from './pages/ServicesPage';
import ContactPage from './pages/ContactPage';
import NotFound from './pages/NotFound';
import AllServicesPage from './pages/AllServicesPage';
import ClientsPage from './pages/ClientsPage';
import AiSolutionsPage from './pages/AiSolutionsPage';
import BlogPage from './pages/BlogPage';
import DigitalCustomizationsPage from './pages/DigitalCustomizationsPage';
import EcommercePage from './pages/EcommercePage';
import FintechSolutionsPage from './pages/FintechSolutionsPage';
import GlobalExpansionPage from './pages/GlobalExpansionPage';
import MobileAppDevelopmentPage from './pages/MobileAppDevelopmentPage';
import PartnersPage from './pages/PartnersPage';
import BookingPage from './pages/BookingPage';

function ScrollToTop() {
  const { pathname } = useLocation();
  
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  
  return null;
}

function App() {
  return (
    <>
      <ScrollToTop />
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<HomePage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/services" element={<ServicesPage />} />
        <Route path="/all-services" element={<AllServicesPage />} />
        <Route path="/contact" element={<ContactPage />} />
        <Route path="/booking" element={<BookingPage />} />
        
        {/* Service Detail Pages */}
        <Route path="/digital-customizations" element={<DigitalCustomizationsPage />} />
        <Route path="/ecommerce" element={<EcommercePage />} />
        <Route path="/ai-solutions" element={<AiSolutionsPage />} />
        <Route path="/fintech-solutions" element={<FintechSolutionsPage />} />
        <Route path="/global-expansion" element={<GlobalExpansionPage />} />
        <Route path="/mobile-app-development" element={<MobileAppDevelopmentPage />} />
        
        {/* Company Pages */}
        <Route path="/clients" element={<ClientsPage />} />
        <Route path="/partners" element={<PartnersPage />} />
        <Route path="/blog" element={<BlogPage />} />
        
        {/* 404 Route */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  );
}

export default App;
