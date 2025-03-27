
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
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

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
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
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
