import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Empresa from "./pages/Empresa";
import Servicos from "./pages/Servicos";
import Produtos from "./pages/Produtos";
import Setores from "./pages/Setores";
import Projetos from "./pages/Projetos";
import Contato from "./pages/Contato";
import Login from "./pages/Login";
import Dashboard from "./pages/admin/Dashboard";
import HomeAdmin from "./pages/admin/HomeAdmin";
import AboutAdmin from "./pages/admin/AboutAdmin";
import ServicesAdmin from "./pages/admin/ServicesAdmin";
import SectorsAdmin from "./pages/admin/SectorsAdmin";
import Banners from "./pages/admin/Banners";
import Leads from "./pages/admin/Leads";
import ContactAdmin from "./pages/admin/ContactAdmin";
import NotFound from "./pages/NotFound";
import Header from "./components/Header";
import Footer from "./components/Footer";
import { AdminLayout } from "./components/AdminLayout";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          {/* Rotas públicas */}
          <Route
            path="/*"
            element={
              <div className="flex flex-col min-h-screen">
                <Header />
                <main className="flex-grow">
                  <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/empresa" element={<Empresa />} />
                    <Route path="/servicos" element={<Servicos />} />
                    <Route path="/produtos" element={<Produtos />} />
                    <Route path="/setores" element={<Setores />} />
                    <Route path="/projetos" element={<Projetos />} />
                    <Route path="/contato" element={<Contato />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="*" element={<NotFound />} />
                  </Routes>
                </main>
                <Footer />
              </div>
            }
          />

          {/* Rotas administrativas */}
          <Route
            path="/admin/*"
            element={
              <AdminLayout>
                <Routes>
                  <Route path="/" element={<Dashboard />} />
                  <Route path="/home" element={<HomeAdmin />} />
                  <Route path="/about" element={<AboutAdmin />} />
                  <Route path="/services" element={<ServicesAdmin />} />
                  <Route path="/sectors" element={<SectorsAdmin />} />
                  <Route path="/contact" element={<ContactAdmin />} />
                  <Route path="/banners" element={<Banners />} />
                  <Route path="/leads" element={<Leads />} />
                </Routes>
              </AdminLayout>
            }
          />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
