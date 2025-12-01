import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { ServiceIcon } from "@/components/ServiceIcon";

const Setores = () => {
  const [content, setContent] = useState<Record<string, string>>({});
  const [sectors, setSectors] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    loadContent();
  }, []);

  const loadContent = async () => {
    const keys = [
      'setores_header_titulo', 'setores_header_subtitulo',
      'setores_intro_titulo', 'setores_intro_texto',
      'setores_escolher_titulo',
      'setores_escolher_1_titulo', 'setores_escolher_1_texto',
      'setores_escolher_2_titulo', 'setores_escolher_2_texto',
      'setores_escolher_3_titulo', 'setores_escolher_3_texto',
      'setores_cta_titulo', 'setores_cta_subtitulo', 'setores_cta_botao'
    ];

    const [contentData, sectorsData] = await Promise.all([
      supabase.from("site_content").select("*").in("key", keys),
      supabase.from("sectors").select("*").order("order_index")
    ]);

    const contentMap: Record<string, string> = {};
    contentData.data?.forEach((item) => {
      contentMap[item.key] = item.value_text || "";
    });
    
    setContent(contentMap);
    setSectors(sectorsData.data || []);
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
            {content.setores_header_titulo || "Setores Atendidos"}
          </h1>
          <p className="text-xl text-primary-foreground/90 text-center max-w-3xl mx-auto">
            {content.setores_header_subtitulo || "Soluções especializadas em energia para diversos segmentos"}
          </p>
        </div>
      </section>

      {/* Sectors Grid */}
      <section className="py-16 bg-background">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-foreground mb-4">
              {content.setores_intro_titulo || "Experiência em Diversos Mercados"}
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              {content.setores_intro_texto || "Entendemos as necessidades específicas de cada setor e oferecemos soluções personalizadas"}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {sectors.map((sector, index) => (
              <Card 
                key={index}
                className="border hover:shadow-lg transition-all duration-300 animate-fade-in"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <CardHeader className="text-center">
                  <ServiceIcon iconName={sector.icon} />
                  <CardTitle className="text-xl font-bold mb-2">{sector.name}</CardTitle>
                  <p className="text-muted-foreground text-sm">{sector.description}</p>
                </CardHeader>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section className="py-16 bg-muted">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center text-foreground mb-12">
            {content.setores_escolher_titulo || "Por Que Nos Escolher Para Seu Setor?"}
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            <div className="bg-card p-6 rounded-lg border">
              <h3 className="text-xl font-semibold mb-3 text-foreground">
                {content.setores_escolher_1_titulo || "Experiência Comprovada"}
              </h3>
              <p className="text-muted-foreground">
                {content.setores_escolher_1_texto || "Anos de experiência atendendo empresas de diversos portes e segmentos."}
              </p>
            </div>
            
            <div className="bg-card p-6 rounded-lg border">
              <h3 className="text-xl font-semibold mb-3 text-foreground">
                {content.setores_escolher_2_titulo || "Soluções Personalizadas"}
              </h3>
              <p className="text-muted-foreground">
                {content.setores_escolher_2_texto || "Cada setor tem necessidades únicas. Desenvolvemos projetos sob medida para seu negócio."}
              </p>
            </div>
            
            <div className="bg-card p-6 rounded-lg border">
              <h3 className="text-xl font-semibold mb-3 text-foreground">
                {content.setores_escolher_3_titulo || "Suporte Especializado"}
              </h3>
              <p className="text-muted-foreground">
                {content.setores_escolher_3_texto || "Equipe técnica com conhecimento profundo das particularidades de cada segmento."}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-primary">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold text-primary-foreground mb-6">
            {content.setores_cta_titulo || "Seu Setor Precisa de Energia Confiável?"}
          </h2>
          <p className="text-xl text-primary-foreground/90 mb-8 max-w-2xl mx-auto">
            {content.setores_cta_subtitulo || "Fale com nossos especialistas e descubra a melhor solução para seu negócio"}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a 
              href="/contato"
              className="inline-flex items-center justify-center px-8 py-3 bg-accent text-accent-foreground hover:bg-accent/90 rounded-md font-semibold text-lg transition-colors shadow-accent"
            >
              {content.setores_cta_botao || "Solicitar Orçamento"}
            </a>
            <a 
              href="https://wa.me/553134953004" 
              target="_blank" 
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center px-8 py-3 bg-transparent border-2 border-primary-foreground text-primary-foreground hover:bg-primary-foreground hover:text-primary rounded-md font-semibold text-lg transition-colors"
            >
              Falar no WhatsApp
            </a>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Setores;
