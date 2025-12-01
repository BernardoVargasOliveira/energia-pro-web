import { Battery, Wrench, Zap, HardHat, Headphones } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import geradoresTransporte from "@/assets/geradores-transporte.jpg";
import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";

const Servicos = () => {
  const [content, setContent] = useState<Record<string, string>>({});
  const [services, setServices] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // Ícones originais fixos do layout inicial
  const defaultIcons = [
    <Battery className="h-12 w-12" />,
    <HardHat className="h-12 w-12" />,
    <Zap className="h-12 w-12" />,
    <Headphones className="h-12 w-12" />
  ];

  useEffect(() => {
    loadContent();
  }, []);

  const loadContent = async () => {
    const keys = [
      'servicos_header_titulo', 'servicos_header_subtitulo',
      'servicos_showcase_titulo', 'servicos_showcase_subtitulo',
      'servicos_cta_titulo', 'servicos_cta_subtitulo', 'servicos_cta_botao'
    ];

    const [contentData, servicesData] = await Promise.all([
      supabase.from("site_content").select("*").in("key", keys),
      supabase.from("services").select("*").order("order_index")
    ]);

    const contentMap: Record<string, string> = {};
    contentData.data?.forEach((item) => {
      contentMap[item.key] = item.value_text || "";
    });
    
    setContent(contentMap);
    setServices(servicesData.data || []);
    setIsLoading(false);
  };

  if (isLoading) {
    return <div className="flex items-center justify-center min-h-screen">Carregando...</div>;
  }

  return (
    <div className="min-h-screen">
      {/* Header Section */}
      <section className="bg-gradient-primary py-16">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl md:text-5xl font-bold text-primary-foreground text-center mb-6">
            {content.servicos_header_titulo || "Nossos Serviços"}
          </h1>
          <p className="text-xl text-primary-foreground/90 text-center max-w-3xl mx-auto">
            {content.servicos_header_subtitulo || "Soluções completas em geração de energia para sua empresa"}
          </p>
        </div>
      </section>

      {/* Showcase Image */}
      <section className="py-12 bg-muted">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="relative rounded-lg overflow-hidden shadow-primary">
              <img 
                src={geradoresTransporte} 
                alt="Geradores PROJEMAC prontos para locação e entrega" 
                className="w-full h-[400px] object-cover"
              />
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-primary/95 to-transparent p-6">
                <h3 className="text-primary-foreground font-bold text-2xl mb-2">
                  {content.servicos_showcase_titulo || "Equipamentos Prontos para Locação"}
                </h3>
                <p className="text-primary-foreground/90">
                  {content.servicos_showcase_subtitulo || "Frota moderna com entrega e instalação em todo o Brasil"}
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-16 bg-background">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {services.map((service, index) => (
              <Card 
                key={index}
                className="border-2 hover:border-secondary transition-all duration-300 hover:shadow-primary animate-fade-in"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <CardHeader>
                  <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-gradient-primary text-primary-foreground mb-4">
                    {defaultIcons[index] || <Wrench className="h-12 w-12" />}
                  </div>
                  <CardTitle className="text-2xl">{service.title}</CardTitle>
                  <CardDescription className="text-base">{service.description}</CardDescription>
                </CardHeader>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-muted">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold text-foreground mb-6">
            {content.servicos_cta_titulo || "Precisa de Mais Informações?"}
          </h2>
          <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
            {content.servicos_cta_subtitulo || "Nossa equipe está pronta para ajudar você a encontrar a melhor solução em geração de energia"}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild size="lg" className="bg-secondary text-secondary-foreground hover:bg-secondary/90 font-semibold">
              <Link to="/contato">{content.servicos_cta_botao || "Solicitar Orçamento"}</Link>
            </Button>
            <Button asChild size="lg" variant="outline" className="font-semibold">
              <a href="https://wa.me/553134953004" target="_blank" rel="noopener noreferrer">
                Falar no WhatsApp
              </a>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Servicos;
