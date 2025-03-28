
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, useLocation, useNavigationType } from "react-router-dom";
import { useEffect, useState } from "react";

// Pages
import Index from "./pages/Index";
import AboutPage from "./pages/AboutPage";
import ServicesPage from "./pages/ServicesPage";
import PlatapayPage from "./pages/PlatapayPage";
import ContactPage from "./pages/ContactPage";
import TeamPage from "./pages/TeamPage";
import ClientsPage from "./pages/ClientsPage";
import BlogPage from "./pages/BlogPage";
import FacebookPage from "./pages/FacebookPage";
import NotFound from "./pages/NotFound";
import DigitalCustomizationsPage from "./pages/DigitalCustomizationsPage";
import EcommercePage from "./pages/EcommercePage";
import AiSolutionsPage from "./pages/AiSolutionsPage";
import GlobalExpansionPage from "./pages/GlobalExpansionPage";
import InquiryPage from "./pages/InquiryPage";
import AIAppsManagementPage from "./pages/AIAppsManagementPage";
import AdminDashboardPage from "./pages/AdminDashboardPage";
import AIToolsPage from "./pages/AIToolsPage";
import LoadingIndicator from "./components/LoadingIndicator";
import StaffPortal from "./components/StaffPortal";
import { StaffAuthProvider } from "./contexts/StaffAuthContext";
import { AvailableSecretsProvider } from "./contexts/AvailableSecretsContext";

// ScrollToTop component to handle scrolling to top on navigation
const ScrollToTop = () => {
  const { pathname } = useLocation();
  const navigationType = useNavigationType();
  const [isLoading, setIsLoading] = useState(false);
  
  useEffect(() => {
    // Scroll to top when pathname changes
    window.scrollTo(0, 0);
  }, [pathname]);
  
  useEffect(() => {
    // Only trigger loading for PUSH navigation (clicking links)
    if (navigationType === 'PUSH') {
      setIsLoading(true);
      const timer = setTimeout(() => {
        setIsLoading(false);
      }, 800); // Adjust timing as needed
      
      return () => clearTimeout(timer);
    }
  }, [pathname, navigationType]);
  
  return <LoadingIndicator isLoading={isLoading} />;
};

// Create a new QueryClient instance inside the component
const App = () => {
  // Create QueryClient instance inside the component
  const queryClient = new QueryClient();
  
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <TooltipProvider>
          <StaffAuthProvider>
            <AvailableSecretsProvider>
              <Toaster />
              <Sonner />
              <ScrollToTop />
              <Routes>
                <Route path="/" element={<Index />} />
                <Route path="/about" element={<AboutPage />} />
                <Route path="/services" element={<ServicesPage />} />
                <Route path="/platapay" element={<PlatapayPage />} />
                <Route path="/team" element={<TeamPage />} />
                <Route path="/contact" element={<ContactPage />} />
                <Route path="/clients" element={<ClientsPage />} />
                <Route path="/blog" element={<BlogPage />} />
                <Route path="/facebook" element={<FacebookPage />} />
                <Route path="/digital-customizations" element={<DigitalCustomizationsPage />} />
                <Route path="/ecommerce" element={<EcommercePage />} />
                <Route path="/ai-solutions" element={<AiSolutionsPage />} />
                <Route path="/global-expansion" element={<GlobalExpansionPage />} />
                <Route path="/inquiry" element={<InquiryPage />} />
                <Route path="/inquire" element={<InquiryPage />} />
                <Route path="/services/ai-solutions" element={<AiSolutionsPage />} />
                <Route path="/services/digital-customizations" element={<DigitalCustomizationsPage />} />
                <Route path="/services/ecommerce" element={<EcommercePage />} />
                <Route path="/services/global-expansion" element={<GlobalExpansionPage />} />
                <Route path="/admin/ai-tools" element={<AIToolsPage />} />
                <Route path="/admin/ai-management" element={<AIAppsManagementPage />} />
                <Route path="/admin/dashboard" element={<AdminDashboardPage />} />
                <Route path="/staff-portal" element={<StaffPortal />} />
                <Route path="/team/portal" element={<StaffPortal />} />
                {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
                <Route path="*" element={<NotFound />} />
              </Routes>
            </AvailableSecretsProvider>
          </StaffAuthProvider>
        </TooltipProvider>
      </BrowserRouter>
    </QueryClientProvider>
  );
};

export default App;
