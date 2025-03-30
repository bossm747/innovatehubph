
import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { Toaster } from 'sonner';
import Index from '@/pages/Index';
import AboutUsPage from '@/pages/AboutUsPage';
import ContactUsPage from '@/pages/ContactUsPage';
import PlatapayDetailsPage from '@/pages/PlatapayDetailsPage';
import PlatapayAgentPage from '@/pages/PlatapayAgentPage';
import ServicesPage from '@/pages/ServicesPage';
import AllServicesPage from '@/pages/AllServicesPage';
import ClientsPage from '@/pages/ClientsPage';
import NotFound from '@/pages/NotFound';
import PrivacyPolicyPage from '@/pages/PrivacyPolicyPage';

const App = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<Index />} />
        <Route path="/about-us" element={<AboutUsPage />} />
        <Route path="/contact-us" element={<ContactUsPage />} />
        <Route path="/services" element={<ServicesPage />} />
        <Route path="/all-services" element={<AllServicesPage />} />
        <Route path="/clients" element={<ClientsPage />} />
        <Route path="/platapay" element={<PlatapayDetailsPage />} />
        <Route path="/platapay-agent" element={<PlatapayAgentPage />} />
        <Route path="/privacy-policy" element={<PrivacyPolicyPage />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
      <Toaster position="top-right" />
    </>
  );
};

export default App;
