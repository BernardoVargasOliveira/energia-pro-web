import { useEffect, useState } from "react";
import { Outlet, useNavigate, Link, useLocation } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { LogOut, Home, Building, Wrench, Package, Grid, BarChart, Mail } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { Session } from "@supabase/supabase-js";

const AdminLayout = () => {
  const [session, setSession] = useState<Session | null>(null);
  const [isAdmin, setIsAdmin] = useState(false);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const location = useLocation();
  const { toast } = useToast();

  useEffect(() => {
    // Set up auth state listener FIRST
    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
      setSession(session);
      if (!session) {
        navigate("/login");
      } else {
        checkAdmin(session.user.id);
      }
    });

    // THEN check for existing session
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      if (!session) {
        navigate("/login");
      } else {
        checkAdmin(session.user.id);
      }
    });

    return () => subscription.unsubscribe();
  }, [navigate]);

  const checkAdmin = async (userId: string) => {
    try {
      const { data, error } = await supabase.rpc('has_role', {
        _user_id: userId,
        _role: 'admin'
      });

      if (error) throw error;

      setIsAdmin(!!data);
      if (!data) {
        toast({
          title: "Acesso negado",
          description: "Você não tem permissão de administrador",
          variant: "destructive",
        });
        navigate("/");
      }
    } catch (error: any) {
      toast({
        title: "Erro ao verificar permissões",
        description: error.message,
        variant: "destructive",
      });
      navigate("/");
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = async () => {
    const { error } = await supabase.auth.signOut();
    if (error) {
      toast({
        title: "Erro ao sair",
        description: error.message,
        variant: "destructive",
      });
    } else {
      toast({
        title: "Logout realizado",
        description: "Você foi desconectado com sucesso.",
      });
      navigate("/login");
    }
  };

  if (loading || !isAdmin) {
    return null;
  }

  const menuItems = [
    { label: "Home", href: "/admin/home", icon: Home },
    { label: "Sobre", href: "/admin/sobre", icon: Building },
    { label: "Serviços", href: "/admin/servicos", icon: Wrench },
    { label: "Produtos", href: "/admin/produtos", icon: Package },
    { label: "Setores", href: "/admin/setores", icon: Grid },
    { label: "Leads", href: "/admin/leads", icon: Mail },
  ];

  return (
    <div className="min-h-screen bg-muted">
      <div className="flex">
        {/* Sidebar */}
        <aside className="w-64 bg-primary text-primary-foreground min-h-screen p-4 flex flex-col">
          <div className="mb-8">
            <h2 className="text-2xl font-bold">Admin CMS</h2>
            <p className="text-sm text-primary-foreground/70">PROJEMAC</p>
          </div>

          <nav className="flex-1 space-y-2">
            {menuItems.map((item) => (
              <Link
                key={item.href}
                to={item.href}
                className={`flex items-center gap-3 px-4 py-2 rounded-md transition-colors ${
                  location.pathname === item.href
                    ? 'bg-accent text-accent-foreground'
                    : 'hover:bg-primary-foreground/10'
                }`}
              >
                <item.icon className="h-5 w-5" />
                {item.label}
              </Link>
            ))}
          </nav>

          <div className="pt-4 border-t border-primary-foreground/20">
            <Button
              onClick={handleLogout}
              variant="outline"
              className="w-full border-primary-foreground/20 text-primary-foreground hover:bg-primary-foreground/10"
            >
              <LogOut className="mr-2 h-4 w-4" />
              Sair
            </Button>
          </div>
        </aside>

        {/* Main content */}
        <main className="flex-1 p-8">
          <div className="max-w-4xl mx-auto">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;