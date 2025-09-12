import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ThemeProvider } from "@/contexts/ThemeContext";
import Index from "./pages/Index";
import CropDisease from "./pages/CropDisease";
import MarketAnalysis from "./pages/MarketAnalysis";
import GovernmentSchemes from "./pages/GovernmentSchemes";
import About from "./pages/About";
import Profile from "./pages/Profile";
import DiseaseDatabase from "./pages/DiseaseDatabase";
import ContactUs from "./pages/ContactUs";
import AdminMessages from "./pages/AdminMessages";
import NotFound from "./pages/NotFound";
// Government Scheme Pages
import PMKisan from "./pages/schemes/PMKisan";
import PMFBY from "./pages/schemes/PMFBY";
import KisanCreditCard from "./pages/schemes/KisanCreditCard";
import SoilHealthCard from "./pages/schemes/SoilHealthCard";
import PMKSY from "./pages/schemes/PMKSY";
import eNAM from "./pages/schemes/eNAM";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <ThemeProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Index/>} />
            <Route path="/crop-disease" element={<CropDisease />} />
            <Route path="/market-analysis" element={<MarketAnalysis />} />
            <Route path="/government-schemes" element={<GovernmentSchemes />} />
          <Route path="/about" element={<About />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/disease-database" element={<DiseaseDatabase />} />
          <Route path="/contact" element={<ContactUs />} />
          <Route path="/admin/messages" element={<AdminMessages />} />
          {/* Government Scheme Pages */}
          <Route path="/schemes/pm-kisan" element={<PMKisan />} />
          <Route path="/schemes/pmfby" element={<PMFBY />} />
          <Route path="/schemes/kisan-credit-card" element={<KisanCreditCard />} />
          <Route path="/schemes/soil-health-card" element={<SoilHealthCard />} />
          <Route path="/schemes/pmksy" element={<PMKSY />} />
          <Route path="/schemes/e-nam" element={<eNAM />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </ThemeProvider>
  </QueryClientProvider>
);

export default App;
