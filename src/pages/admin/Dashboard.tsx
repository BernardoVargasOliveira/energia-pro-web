import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Mail, Briefcase, Building2, Image } from "lucide-react";

export default function Dashboard() {
  const [stats, setStats] = useState({
    leads: 0,
    services: 0,
    sectors: 0,
    banners: 0,
  });

  useEffect(() => {
    const loadStats = async () => {
      const [leadsRes, servicesRes, sectorsRes, bannersRes] = await Promise.all([
        supabase.from("leads").select("*", { count: "exact", head: true }),
        supabase.from("services").select("*", { count: "exact", head: true }),
        supabase.from("sectors").select("*", { count: "exact", head: true }),
        supabase.from("banners").select("*", { count: "exact", head: true }),
      ]);

      setStats({
        leads: leadsRes.count || 0,
        services: servicesRes.count || 0,
        sectors: sectorsRes.count || 0,
        banners: bannersRes.count || 0,
      });
    };

    loadStats();
  }, []);

  const cards = [
    { title: "Total de Leads", value: stats.leads, icon: Mail, color: "text-blue-600" },
    { title: "Serviços", value: stats.services, icon: Briefcase, color: "text-green-600" },
    { title: "Setores", value: stats.sectors, icon: Building2, color: "text-purple-600" },
    { title: "Banners", value: stats.banners, icon: Image, color: "text-orange-600" },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold tracking-tight">Dashboard</h2>
        <p className="text-muted-foreground">Visão geral do seu site</p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {cards.map((card) => (
          <Card key={card.title}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">{card.title}</CardTitle>
              <card.icon className={`h-4 w-4 ${card.color}`} />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{card.value}</div>
            </CardContent>
          </Card>
        ))}
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Bem-vindo ao Painel Administrativo</CardTitle>
        </CardHeader>
        <CardContent className="space-y-2">
          <p className="text-muted-foreground">
            Aqui você pode gerenciar todo o conteúdo do seu site:
          </p>
          <ul className="list-disc list-inside space-y-1 text-muted-foreground">
            <li>Editar textos e títulos da página inicial</li>
            <li>Gerenciar serviços oferecidos</li>
            <li>Administrar setores atendidos</li>
            <li>Trocar banners e imagens</li>
            <li>Visualizar leads recebidos</li>
          </ul>
        </CardContent>
      </Card>
    </div>
  );
}
