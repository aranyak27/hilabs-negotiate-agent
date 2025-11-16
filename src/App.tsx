import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import UploadContract from "./pages/UploadContract";
import ClauseIntelligence from "./pages/ClauseIntelligence";
import Compliance from "./pages/Compliance";
import Benchmark from "./pages/Benchmark";
import Simulator from "./pages/Simulator";
import CoPilot from "./pages/CoPilot";
import Redlining from "./pages/Redlining";
import Approvals from "./pages/Approvals";
import Summary from "./pages/Summary";
import Repository from "./pages/Repository";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/upload" element={<UploadContract />} />
          <Route path="/repository" element={<Repository />} />
          <Route path="/clauses" element={<ClauseIntelligence />} />
          <Route path="/compliance" element={<Compliance />} />
          <Route path="/benchmark" element={<Benchmark />} />
          <Route path="/simulator" element={<Simulator />} />
          <Route path="/copilot" element={<CoPilot />} />
          <Route path="/redlining" element={<Redlining />} />
          <Route path="/approvals" element={<Approvals />} />
          <Route path="/summary" element={<Summary />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
