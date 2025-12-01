import { Award, Target, Eye, Users } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";

const Empresa = () => {
  const [content, setContent] = useState<Record<string, string>>({});

  useEffect(() => {
    const loadContent = async () => {
      const { data } = await supabase
        .from("site_content")
        .select("*")
        .in("key", [
          'sobre_header_titulo', 'sobre_header_subtitulo',
          'sobre_historia_titulo', 'sobre_texto',
          'sobre_missao_titulo', 'sobre_missao_texto',
          'sobre_visao_titulo', 'sobre_visao_texto',
          'sobre_valores_titulo', 'sobre_valores_texto',
          'sobre_numeros_titulo',
          'sobre_numero_1_valor', 'sobre_numero_1_label',
          'sobre_numero_2_valor', 'sobre_numero_2_label',
          'sobre_numero_3_valor', 'sobre_numero_3_label',
          'sobre_equipe_titulo', 'sobre_equipe_texto'
        ]);

      const contentMap: Record<string, string> = {};
      data?.forEach((item) => {
        contentMap[item.key] = item.value_text || "";
      });
      setContent(contentMap);
    };

    loadContent();
  }, []);

  return (
    <div className="min-h-screen">
      <section className="bg-gradient-primary py-16">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl md:text-5xl font-bold text-primary-foreground text-center mb-6">
            {content.sobre_header_titulo || "A Empresa"}
          </h1>
          <p className="text-xl text-primary-foreground/90 text-center max-w-3xl mx-auto">
            {content.sobre_header_subtitulo || "Especialistas em soluções de energia"}
          </p>
        </div>
      </section>

      <section className="py-16 bg-background">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-foreground mb-6">
              {content.sobre_historia_titulo || "Nossa História"}
            </h2>
            <div className="space-y-4 text-muted-foreground text-lg whitespace-pre-wrap">
              {content.sobre_texto || "A PROJEMAC é especializada em soluções de energia..."}
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 bg-muted">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card className="border-t-4 border-t-primary">
              <CardContent className="p-8">
                <div className="flex items-center justify-center w-16 h-16 rounded-full bg-primary text-primary-foreground mb-4 mx-auto">
                  <Target className="h-8 w-8" />
                </div>
                <h3 className="text-2xl font-bold text-foreground mb-4 text-center">
                  {content.sobre_missao_titulo || "Missão"}
                </h3>
                <p className="text-muted-foreground whitespace-pre-wrap">
                  {content.sobre_missao_texto || "Fornecer soluções confiáveis..."}
                </p>
              </CardContent>
            </Card>

            <Card className="border-t-4 border-t-secondary">
              <CardContent className="p-8">
                <div className="flex items-center justify-center w-16 h-16 rounded-full bg-secondary text-secondary-foreground mb-4 mx-auto">
                  <Eye className="h-8 w-8" />
                </div>
                <h3 className="text-2xl font-bold text-foreground mb-4 text-center">
                  {content.sobre_visao_titulo || "Visão"}
                </h3>
                <p className="text-muted-foreground whitespace-pre-wrap">
                  {content.sobre_visao_texto || "Ser referência nacional..."}
                </p>
              </CardContent>
            </Card>

            <Card className="border-t-4 border-t-accent">
              <CardContent className="p-8">
                <div className="flex items-center justify-center w-16 h-16 rounded-full bg-accent text-accent-foreground mb-4 mx-auto">
                  <Award className="h-8 w-8" />
                </div>
                <h3 className="text-2xl font-bold text-foreground mb-4 text-center">
                  {content.sobre_valores_titulo || "Valores"}
                </h3>
                <div className="text-muted-foreground space-y-2 whitespace-pre-wrap">
                  {content.sobre_valores_texto || "• Compromisso\n• Ética\n• Inovação"}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      <section className="py-16 bg-background">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center text-foreground mb-12">
            {content.sobre_numeros_titulo || "PROJEMAC em Números"}
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="text-5xl font-bold text-secondary mb-2">
                {content.sobre_numero_1_valor || "30+"}
              </div>
              <p className="text-muted-foreground font-medium">
                {content.sobre_numero_1_label || "Anos de Experiência"}
              </p>
            </div>
            <div className="text-center">
              <div className="text-5xl font-bold text-secondary mb-2">
                {content.sobre_numero_2_valor || "500+"}
              </div>
              <p className="text-muted-foreground font-medium">
                {content.sobre_numero_2_label || "Clientes Atendidos"}
              </p>
            </div>
            <div className="text-center">
              <div className="text-5xl font-bold text-secondary mb-2">
                {content.sobre_numero_3_valor || "1000+"}
              </div>
              <p className="text-muted-foreground font-medium">
                {content.sobre_numero_3_label || "Projetos Executados"}
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 bg-muted">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <Users className="h-16 w-16 text-primary mx-auto mb-6" />
            <h2 className="text-3xl font-bold text-foreground mb-6">
              {content.sobre_equipe_titulo || "Nossa Equipe"}
            </h2>
            <p className="text-lg text-muted-foreground whitespace-pre-wrap">
              {content.sobre_equipe_texto || "Equipe multidisciplinar especializada..."}
            </p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Empresa;
