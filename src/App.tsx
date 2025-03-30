
import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { Toaster } from '@/components/ui/sonner';
import Index from '@/pages/Index';
import AboutUsPage from '@/pages/AboutUsPage';
import ContactUsPage from '@/pages/ContactUsPage';
import PlatapayDetailsPage from '@/pages/PlatapayDetailsPage';
import PlatapayAgentPage from '@/pages/PlatapayAgentPage';
import NotFound from '@/pages/NotFound';
import PrivacyPolicyPage from '@/pages/PrivacyPolicyPage';

const App = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<Index />} />
        <Route path="/about-us" element={<AboutUsPage />} />
        <Route path="/contact-us" element={<ContactUsPage />} />
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
