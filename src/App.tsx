import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import CropDisease from "./pages/CropDisease";
import MarketAnalysis from "./pages/MarketAnalysis";
import GovernmentSchemes from "./pages/GovernmentSchemes";
import About from "./pages/About";
import Profile from "./pages/Profile";
import DiseaseDatabase from "./pages/DiseaseDatabase";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/crop-disease" element={<CropDisease />} />
          <Route path="/market-analysis" element={<MarketAnalysis />} />
          <Route path="/government-schemes" element={<GovernmentSchemes />} />
          <Route path="/about" element={<About />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/disease-database" element={<DiseaseDatabase />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
