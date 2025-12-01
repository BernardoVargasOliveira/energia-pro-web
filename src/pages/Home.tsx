import { Link } from "react-router-dom";
import { CheckCircle2, TrendingUp, Shield } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import Hero from "@/components/Hero";
import { DynamicIcon } from "@/components/DynamicIcon";

interface Service {
  id: string;
  title: string;
  description: string | null;
  icon: string | null;
}

interface Sector {
  id: string;
  name: string;
  description: string | null;
  icon: string | null;
}

const Home = () => {
  const [services, setServices] = useState<Service[]>([]);
  const [sectors, setSectors] = useState<Sector[]>([]);
  const [content, setContent] = useState<Record<string, string>>({});

  useEffect(() => {
    const loadData = async () => {
      const [servicesRes, sectorsRes, contentRes] = await Promise.all([
        supabase.from("services").select("*").order("order_index").limit(4),
        supabase.from("sectors").select("*").order("order_index").limit(6),
        supabase.from("site_content").select("*").in("key", [
          'home_servicos_titulo', 'home_setores_titulo',
          'home_diferenciais_titulo', 'home_diferenciais_subtitulo',
          'home_diferencial_1_titulo', 'home_diferencial_1_texto',
          'home_diferencial_2_titulo', 'home_diferencial_2_texto',
          'home_diferencial_3_titulo', 'home_diferencial_3_texto',
          'home_cta_titulo', 'home_cta_subtitulo', 'home_cta_botao'
        ])
      ]);

      if (servicesRes.data) setServices(servicesRes.data);
      if (sectorsRes.data) setSectors(sectorsRes.data);

      const contentMap: Record<string, string> = {};
      contentRes.data?.forEach((item) => {
        contentMap[item.key] = item.value_text || "";
      });
      setContent(contentMap);
    };

    loadData();
  }, []);

  const diferenciais = [
    {
      icon: <CheckCircle2 className="h-8 w-8 text-primary" />,
      title: content.home_diferencial_1_titulo || "Equipe Especializada",
      description: content.home_diferencial_1_texto || "Profissionais qualificados"
    },
    {
      icon: <TrendingUp className="h-8 w-8 text-primary" />,
      title: content.home_diferencial_2_titulo || "Cobertura Regional",
      description: content.home_diferencial_2_texto || "Atendimento em todo estado"
    },
    {
      icon: <Shield className="h-8 w-8 text-primary" />,
      title: content.home_diferencial_3_titulo || "Equipamentos Modernos",
      description: content.home_diferencial_3_texto || "Geradores de última geração"
    }
  ];

  return (
    <>
      <Hero />

      {/* Differentials Section */}
      <section className="py-16 bg-muted">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-center text-foreground mb-4">
            {content.home_diferenciais_titulo || "Por Que Escolher a PROJEMAC?"}
          </h2>
          <p className="text-center text-muted-foreground mb-12 max-w-2xl mx-auto">
            {content.home_diferenciais_subtitulo || "Somos referência em soluções de energia"}
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {diferenciais.map((item, index) => (
              <div
                key={index}
                className="bg-card p-8 rounded-xl border-2 border-border hover:border-primary transition-all duration-300 animate-fade-in hover:shadow-lg"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="flex flex-col items-center text-center gap-4 mb-4">
                  <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center">
                    {item.icon}
                  </div>
                  <h3 className="text-xl font-bold text-foreground">{item.title}</h3>
                </div>
                <p className="text-muted-foreground text-center">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-16 bg-background">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-center text-foreground mb-12">
            {content.home_servicos_titulo || "Nossos Serviços"}
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {services.map((service, index) => (
              <Card
                key={service.id}
                className="border-2 hover:border-primary hover:shadow-lg transition-all duration-300 animate-fade-in"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <CardHeader className="text-center">
                  <div className="mx-auto mb-4 w-14 h-14 rounded-full bg-primary/10 flex items-center justify-center">
                    <DynamicIcon name={service.icon} className="h-7 w-7 text-primary" fallback="Zap" />
                  </div>
                  <CardTitle className="text-lg font-bold">{service.title}</CardTitle>
                </CardHeader>
                {service.description && (
                  <CardContent>
                    <CardDescription className="text-center text-sm">{service.description}</CardDescription>
                  </CardContent>
                )}
              </Card>
            ))}
          </div>

          <div className="text-center mt-12">
            <Button asChild size="lg" className="bg-secondary text-secondary-foreground hover:bg-secondary/90 font-semibold">
              <Link to="/servicos">Ver Todos os Serviços</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Sectors Section */}
      <section className="py-16 bg-muted">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-center text-foreground mb-12">
            {content.home_setores_titulo || "Setores Atendidos"}
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {sectors.map((sector, index) => (
              <Card
                key={sector.id}
                className="border-2 hover:border-primary hover:shadow-lg transition-all duration-300 animate-fade-in"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <CardHeader className="text-center">
                  <div className="mx-auto mb-4 w-14 h-14 rounded-full bg-primary/10 flex items-center justify-center">
                    <DynamicIcon name={sector.icon} className="h-7 w-7 text-primary" fallback="Factory" />
                  </div>
                  <CardTitle className="text-lg font-bold">{sector.name}</CardTitle>
                </CardHeader>
                {sector.description && (
                  <CardContent>
                    <CardDescription className="text-center text-sm">{sector.description}</CardDescription>
                  </CardContent>
                )}
              </Card>
            ))}
          </div>

          <div className="text-center mt-12">
            <Button asChild size="lg" variant="outline" className="font-semibold">
              <Link to="/setores">Ver Todos os Setores</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-primary">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-primary-foreground mb-6">
            {content.home_cta_titulo || "Precisa de uma Solução em Energia?"}
          </h2>
          <p className="text-xl text-primary-foreground/90 mb-8 max-w-2xl mx-auto">
            {content.home_cta_subtitulo || "Entre em contato conosco"}
          </p>
          <Button asChild size="lg" className="bg-accent text-accent-foreground hover:bg-accent/90 font-semibold text-lg shadow-accent">
            <Link to="/contato">{content.home_cta_botao || "Solicitar Orçamento Agora"}</Link>
          </Button>
        </div>
      </section>
    </>
  );
};

export default Home;
