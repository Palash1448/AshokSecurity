import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./contexts/AuthContext";
import Index from "./pages/Index";
import RequiredGuardsPage from "./pages/RequiredGuardsPage";
import JobOpeningsPage from "./pages/JobOpeningsPage";
import AdminPage from "./pages/AdminPage";
import NotFound from "./pages/NotFound";
import Watermark from "./components/Watermark";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Watermark />
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/required-guards" element={<RequiredGuardsPage />} />
            <Route path="/job-openings" element={<JobOpeningsPage />} />
            <Route path="/admin" element={<AdminPage />} />
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </AuthProvider>
  </QueryClientProvider>
);

export default App;
