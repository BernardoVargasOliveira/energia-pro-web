import { Link } from "react-router-dom";
import { Users, Award, MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import Hero from "@/components/Hero";

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

  return (
    <>
      <Hero />

      {/* Services Section */}
      <section className="py-16 bg-background">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-center text-foreground mb-12">
            {content.home_servicos_titulo || "Nossos Serviços"}
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {services.map((service, index) => (
              <Card 
                key={service.id} 
                className="border-2 hover:border-secondary transition-all duration-300 hover:shadow-primary animate-fade-in"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <CardContent className="p-6 text-center">
                  <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-gradient-primary text-primary-foreground mb-4 text-5xl">
                    {service.icon || "⚡"}
                  </div>
                  <h3 className="text-xl font-semibold mb-3 text-foreground">
                    {service.title}
                  </h3>
                  <p className="text-muted-foreground">
                    {service.description}
                  </p>
                </CardContent>
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

      {/* Differentials Section */}
      <section className="py-16 bg-muted">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-center text-foreground mb-4">
            {content.home_diferenciais_titulo || "Por Que Escolher a PROJEMAC?"}
          </h2>
          <p className="text-center text-muted-foreground mb-12 max-w-2xl mx-auto">
            {content.home_diferenciais_subtitulo || "Somos referência em soluções de energia"}
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-card p-6 rounded-lg shadow-lg hover:shadow-primary transition-all duration-300">
              <div className="text-secondary mb-4">
                <Users className="h-10 w-10" />
              </div>
              <h3 className="text-lg font-semibold mb-2 text-card-foreground">
                {content.home_diferencial_1_titulo || "Equipe Especializada"}
              </h3>
              <p className="text-muted-foreground text-sm">
                {content.home_diferencial_1_texto || "Profissionais qualificados"}
              </p>
            </div>
            <div className="bg-card p-6 rounded-lg shadow-lg hover:shadow-primary transition-all duration-300">
              <div className="text-secondary mb-4">
                <MapPin className="h-10 w-10" />
              </div>
              <h3 className="text-lg font-semibold mb-2 text-card-foreground">
                {content.home_diferencial_2_titulo || "Cobertura Regional"}
              </h3>
              <p className="text-muted-foreground text-sm">
                {content.home_diferencial_2_texto || "Atendimento em todo estado"}
              </p>
            </div>
            <div className="bg-card p-6 rounded-lg shadow-lg hover:shadow-primary transition-all duration-300">
              <div className="text-secondary mb-4">
                <Award className="h-10 w-10" />
              </div>
              <h3 className="text-lg font-semibold mb-2 text-card-foreground">
                {content.home_diferencial_3_titulo || "Equipamentos Modernos"}
              </h3>
              <p className="text-muted-foreground text-sm">
                {content.home_diferencial_3_texto || "Geradores de última geração"}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Sectors Section */}
      <section className="py-16 bg-background">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-center text-foreground mb-12">
            {content.home_setores_titulo || "Setores Atendidos"}
          </h2>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {sectors.map((sector, index) => (
              <Card 
                key={sector.id}
                className="hover:border-secondary transition-all duration-300 cursor-pointer animate-fade-in"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <CardContent className="p-6 text-center">
                  <div className="text-4xl mb-3">{sector.icon || "🏢"}</div>
                  <h3 className="font-semibold text-foreground">{sector.name}</h3>
                </CardContent>
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
