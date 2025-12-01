import { Link } from "react-router-dom";
import { Battery, Zap, Users, Award, MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
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
  icon: string | null;
}

const Home = () => {
  const [services, setServices] = useState<Service[]>([]);
  const [sectors, setSectors] = useState<Sector[]>([]);
  const [servicesTitle, setServicesTitle] = useState("Nossos Serviços");
  const [sectorsTitle, setSectorsTitle] = useState("Setores Atendidos");

  useEffect(() => {
    const loadData = async () => {
      // Load services
      const { data: servicesData } = await supabase
        .from("services")
        .select("*")
        .order("order_index")
        .limit(4);
      
      if (servicesData) setServices(servicesData);

      // Load sectors
      const { data: sectorsData } = await supabase
        .from("sectors")
        .select("*")
        .order("order_index")
        .limit(6);
      
      if (sectorsData) setSectors(sectorsData);

      // Load section titles
      const { data: contentData } = await supabase
        .from("site_content")
        .select("key, value_text")
        .in("key", ["home_servicos_titulo", "home_setores_titulo"]);

      if (contentData) {
        contentData.forEach((item) => {
          if (item.key === "home_servicos_titulo" && item.value_text) {
            setServicesTitle(item.value_text);
          }
          if (item.key === "home_setores_titulo" && item.value_text) {
            setSectorsTitle(item.value_text);
          }
        });
      }
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
            Nossos Serviços
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {services.map((service, index) => (
              <Card 
                key={index} 
                className="border-2 hover:border-secondary transition-all duration-300 hover:shadow-primary animate-fade-in"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <CardContent className="p-6 text-center">
                  <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-gradient-primary text-primary-foreground mb-4">
                    {service.icon}
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
            Por Que Escolher a PROJEMAC?
          </h2>
          <p className="text-center text-muted-foreground mb-12 max-w-2xl mx-auto">
            Somos referência em soluções de energia com anos de experiência no mercado
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-card p-6 rounded-lg shadow-lg hover:shadow-primary transition-all duration-300">
              <div className="text-secondary mb-4">
                <Users className="h-10 w-10" />
              </div>
              <h3 className="text-lg font-semibold mb-2 text-card-foreground">
                Equipe Especializada
              </h3>
              <p className="text-muted-foreground text-sm">
                Profissionais qualificados e experientes em sistemas de energia.
              </p>
            </div>
            <div className="bg-card p-6 rounded-lg shadow-lg hover:shadow-primary transition-all duration-300">
              <div className="text-secondary mb-4">
                <MapPin className="h-10 w-10" />
              </div>
              <h3 className="text-lg font-semibold mb-2 text-card-foreground">
                Cobertura Regional
              </h3>
              <p className="text-muted-foreground text-sm">
                Atendimento em todo estado de Minas Gerais.
              </p>
            </div>
            <div className="bg-card p-6 rounded-lg shadow-lg hover:shadow-primary transition-all duration-300">
              <div className="text-secondary mb-4">
                <Award className="h-10 w-10" />
              </div>
              <h3 className="text-lg font-semibold mb-2 text-card-foreground">
                Equipamentos Modernos
              </h3>
              <p className="text-muted-foreground text-sm">
                Geradores de última geração das melhores marcas.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Sectors Section */}
      <section className="py-16 bg-background">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-center text-foreground mb-12">
            Setores Atendidos
          </h2>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {sectors.map((sector, index) => (
              <Card 
                key={index}
                className="hover:border-secondary transition-all duration-300 cursor-pointer animate-fade-in"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <CardContent className="p-6 text-center">
                  <div className="text-4xl mb-3">{sector.icon}</div>
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
            Precisa de uma Solução em Energia?
          </h2>
          <p className="text-xl text-primary-foreground/90 mb-8 max-w-2xl mx-auto">
            Entre em contato conosco e receba um orçamento personalizado para sua necessidade
          </p>
          <Button asChild size="lg" className="bg-accent text-accent-foreground hover:bg-accent/90 font-semibold text-lg shadow-accent">
            <Link to="/contato">Solicitar Orçamento Agora</Link>
          </Button>
        </div>
      </section>
    </>
  );
};

export default Home;
