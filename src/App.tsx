import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { AnimatePresence } from "framer-motion";

import { useCartSync } from "@/hooks/useCartSync";
import { useScrollToTop } from "@/hooks/useScrollToTop";
import { PageTransition } from "@/components/layout/PageTransition";
import Index from "./pages/Index";
import ProductsPage from "./pages/ProductsPage";
import HoodiesPage from "./pages/HoodiesPage";
import TShirtsPage from "./pages/TShirtsPage";
import CategoryPage from "./pages/CategoryPage";
import ProductDetailPage from "./pages/ProductDetailPage";
import AboutPage from "./pages/AboutPage";
import ContactPage from "./pages/ContactPage";
import FAQPage from "./pages/FAQPage";
import PrivacyPage from "./pages/PrivacyPage";
import TermsPage from "./pages/TermsPage";
import ShippingPage from "./pages/ShippingPage";
import SizeGuidePage from "./pages/SizeGuidePage";
import LookbookPage from "./pages/LookbookPage";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

function AppRoutes() {
  useScrollToTop();
  const location = useLocation();
  
  return (
    <AnimatePresence mode="wait">
      <PageTransition key={location.pathname}>
        <Routes location={location}>
          <Route path="/" element={<Index />} />
          <Route path="/products" element={<ProductsPage />} />
          <Route path="/products/hoodies" element={<HoodiesPage />} />
          <Route path="/products/tshirts" element={<TShirtsPage />} />
          <Route path="/products/feminine/hoodies" element={<CategoryPage gender="feminine" productType="hoodies" />} />
          <Route path="/products/feminine/tshirts" element={<CategoryPage gender="feminine" productType="tshirts" />} />
          <Route path="/products/masculine/hoodies" element={<CategoryPage gender="masculine" productType="hoodies" />} />
          <Route path="/products/masculine/tshirts" element={<CategoryPage gender="masculine" productType="tshirts" />} />
          <Route path="/product/:handle" element={<ProductDetailPage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/faq" element={<FAQPage />} />
          <Route path="/privacy" element={<PrivacyPage />} />
          <Route path="/terms" element={<TermsPage />} />
          <Route path="/shipping" element={<ShippingPage />} />
          <Route path="/size-guide" element={<SizeGuidePage />} />
          <Route path="/lookbook" element={<LookbookPage />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </PageTransition>
    </AnimatePresence>
  );
}

function AppContent() {
  useCartSync();
  
  return (
    <BrowserRouter>
      <AppRoutes />
    </BrowserRouter>
  );
}

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <div className="dark">
        <AppContent />
      </div>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
