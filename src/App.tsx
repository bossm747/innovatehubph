
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, useLocation, useNavigationType } from "react-router-dom";
import { useEffect, useState } from "react";
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
import LoadingIndicator from "./components/LoadingIndicator";

const queryClient = new QueryClient();

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

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
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
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
