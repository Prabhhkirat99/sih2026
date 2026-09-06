import "@/App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ThemeProvider } from "next-themes";
import { StoreProvider } from "@/lib/store";
import { Toaster } from "@/components/ui/sonner";
import { Header } from "@/components/Header";
import Home from "@/pages/Home";
import Explore from "@/pages/Explore";
import Submit from "@/pages/Submit";
import ChallengeDetail from "@/pages/ChallengeDetail";
import Dashboard from "@/pages/Dashboard";
import Impact from "@/pages/Impact";
import Solvers from "@/pages/Solvers";
import Workspace from "@/pages/Workspace";

function App() {
  return (
    <ThemeProvider attribute="class" defaultTheme="light" enableSystem={false}>
      <StoreProvider>
        <BrowserRouter>
          <div className="min-h-screen bg-[#F8FAFC]">
            <Header />
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/explore" element={<Explore />} />
              <Route path="/submit" element={<Submit />} />
              <Route path="/challenge/:id" element={<ChallengeDetail />} />
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/impact" element={<Impact />} />
              <Route path="/solvers" element={<Solvers />} />
              <Route path="/workspace" element={<Workspace />} />
            </Routes>
          </div>
          <Toaster position="top-right" richColors />
        </BrowserRouter>
      </StoreProvider>
    </ThemeProvider>
  );
}

export default App;
