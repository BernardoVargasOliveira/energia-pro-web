import { lazy, Suspense } from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";
import GoogleAnalytics from "./components/GoogleAnalytics";

const Home = lazy(() => import("./pages/Home"));
const Empresa = lazy(() => import("./pages/Empresa"));
const Servicos = lazy(() => import("./pages/Servicos"));
const Produtos = lazy(() => import("./pages/Produtos"));
const Setores = lazy(() => import("./pages/Setores"));
const Projetos = lazy(() => import("./pages/Projetos"));
const Contato = lazy(() => import("./pages/Contato"));
const Login = lazy(() => import("./pages/Login"));
const NotFound = lazy(() => import("./pages/NotFound"));
const AdminLayout = lazy(() => import("./pages/admin/AdminLayout"));
const AdminHome = lazy(() => import("./pages/admin/AdminHome"));
const AdminSobre = lazy(() => import("./pages/admin/AdminSobre"));
const AdminServicos = lazy(() => import("./pages/admin/AdminServicos"));
const AdminSetores = lazy(() => import("./pages/admin/AdminSetores"));
const AdminProdutos = lazy(() => import("./pages/admin/AdminProdutos"));
const AdminLeads = lazy(() => import("./pages/admin/AdminLeads"));

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <GoogleAnalytics />
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <div className="flex flex-col min-h-screen">
          <Header />
          <main className="flex-grow">
            <Suspense fallback={<div className="min-h-screen" />}>
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/empresa" element={<Empresa />} />
                <Route path="/servicos" element={<Servicos />} />
                <Route path="/produtos" element={<Produtos />} />
                <Route path="/setores" element={<Setores />} />
                <Route path="/projetos" element={<Projetos />} />
                <Route path="/contato" element={<Contato />} />
                <Route path="/login" element={<Login />} />
                <Route path="/admin" element={<AdminLayout />}>
                  <Route index element={<AdminHome />} />
                  <Route path="home" element={<AdminHome />} />
                  <Route path="sobre" element={<AdminSobre />} />
                  <Route path="servicos" element={<AdminServicos />} />
                  <Route path="setores" element={<AdminSetores />} />
                  <Route path="produtos" element={<AdminProdutos />} />
                  <Route path="leads" element={<AdminLeads />} />
                </Route>
                {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
                <Route path="*" element={<NotFound />} />
              </Routes>
            </Suspense>
          </main>
          <Footer />
        </div>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
