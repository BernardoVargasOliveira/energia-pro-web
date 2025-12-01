import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Loader2 } from "lucide-react";

export default function HomeAdmin() {
  const [content, setContent] = useState<Record<string, string>>({});
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    loadContent();
  }, []);

  const loadContent = async () => {
    const keys = [
      'home_hero_title', 'home_hero_subtitle',
      'home_diferenciais_titulo', 'home_diferenciais_subtitulo',
      'home_diferencial_1_titulo', 'home_diferencial_1_texto',
      'home_diferencial_2_titulo', 'home_diferencial_2_texto',
      'home_diferencial_3_titulo', 'home_diferencial_3_texto',
      'home_servicos_titulo', 'home_setores_titulo',
      'home_cta_titulo', 'home_cta_subtitulo', 'home_cta_botao'
    ];

    const { data } = await supabase
      .from("site_content")
      .select("*")
      .in("key", keys);

    const contentMap: Record<string, string> = {};
    data?.forEach((item) => {
      contentMap[item.key] = item.value_text || "";
    });
    setContent(contentMap);
    setIsLoading(false);
  };

  const handleSave = async (keys: string[]) => {
    setIsSaving(true);

    const updates = keys
      .filter(key => content[key] !== undefined)
      .map(key => ({
        key,
        value_text: content[key],
      }));

    const { error } = await supabase
      .from("site_content")
      .upsert(updates, { onConflict: "key" });

    if (error) {
      toast({
        title: "Erro ao salvar",
        description: error.message,
        variant: "destructive",
      });
    } else {
      toast({ title: "Conteúdo salvo com sucesso!" });
    }

    setIsSaving(false);
  };

  if (isLoading) {
    return <div className="flex items-center justify-center p-8">Carregando...</div>;
  }

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold tracking-tight">Página Home</h2>
        <p className="text-muted-foreground">Edite todo o conteúdo da página inicial</p>
      </div>

      <Tabs defaultValue="hero" className="w-full">
        <TabsList className="grid w-full grid-cols-5">
          <TabsTrigger value="hero">Hero</TabsTrigger>
          <TabsTrigger value="diferenciais">Diferenciais</TabsTrigger>
          <TabsTrigger value="titulos">Títulos de Seções</TabsTrigger>
          <TabsTrigger value="cta">CTA Final</TabsTrigger>
        </TabsList>

        <TabsContent value="hero">
          <Card>
            <CardHeader>
              <CardTitle>Hero (Banner Principal)</CardTitle>
              <CardDescription>
                Primeiro conteúdo que os visitantes veem ao acessar o site
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="home_hero_title">Título Principal</Label>
                <Input
                  id="home_hero_title"
                  value={content.home_hero_title || ""}
                  onChange={(e) => setContent({ ...content, home_hero_title: e.target.value })}
                  placeholder="Digite o título principal do hero"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="home_hero_subtitle">Subtítulo</Label>
                <Textarea
                  id="home_hero_subtitle"
                  value={content.home_hero_subtitle || ""}
                  onChange={(e) => setContent({ ...content, home_hero_subtitle: e.target.value })}
                  placeholder="Digite o subtítulo do hero"
                  rows={3}
                />
              </div>
              <Button onClick={() => handleSave(['home_hero_title', 'home_hero_subtitle'])} disabled={isSaving}>
                {isSaving && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                Salvar Hero
              </Button>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="diferenciais">
          <Card>
            <CardHeader>
              <CardTitle>Seção de Diferenciais</CardTitle>
              <CardDescription>
                3 blocos mostrando "Por que escolher a PROJEMAC"
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4 pb-4 border-b">
                <div className="space-y-2">
                  <Label htmlFor="home_diferenciais_titulo">Título da Seção</Label>
                  <Input
                    id="home_diferenciais_titulo"
                    value={content.home_diferenciais_titulo || ""}
                    onChange={(e) => setContent({ ...content, home_diferenciais_titulo: e.target.value })}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="home_diferenciais_subtitulo">Subtítulo da Seção</Label>
                  <Input
                    id="home_diferenciais_subtitulo"
                    value={content.home_diferenciais_subtitulo || ""}
                    onChange={(e) => setContent({ ...content, home_diferenciais_subtitulo: e.target.value })}
                  />
                </div>
              </div>

              <div className="space-y-4">
                <h4 className="font-semibold">Diferencial 1</h4>
                <div className="space-y-2">
                  <Label>Título</Label>
                  <Input
                    value={content.home_diferencial_1_titulo || ""}
                    onChange={(e) => setContent({ ...content, home_diferencial_1_titulo: e.target.value })}
                  />
                </div>
                <div className="space-y-2">
                  <Label>Texto</Label>
                  <Textarea
                    value={content.home_diferencial_1_texto || ""}
                    onChange={(e) => setContent({ ...content, home_diferencial_1_texto: e.target.value })}
                    rows={2}
                  />
                </div>
              </div>

              <div className="space-y-4">
                <h4 className="font-semibold">Diferencial 2</h4>
                <div className="space-y-2">
                  <Label>Título</Label>
                  <Input
                    value={content.home_diferencial_2_titulo || ""}
                    onChange={(e) => setContent({ ...content, home_diferencial_2_titulo: e.target.value })}
                  />
                </div>
                <div className="space-y-2">
                  <Label>Texto</Label>
                  <Textarea
                    value={content.home_diferencial_2_texto || ""}
                    onChange={(e) => setContent({ ...content, home_diferencial_2_texto: e.target.value })}
                    rows={2}
                  />
                </div>
              </div>

              <div className="space-y-4">
                <h4 className="font-semibold">Diferencial 3</h4>
                <div className="space-y-2">
                  <Label>Título</Label>
                  <Input
                    value={content.home_diferencial_3_titulo || ""}
                    onChange={(e) => setContent({ ...content, home_diferencial_3_titulo: e.target.value })}
                  />
                </div>
                <div className="space-y-2">
                  <Label>Texto</Label>
                  <Textarea
                    value={content.home_diferencial_3_texto || ""}
                    onChange={(e) => setContent({ ...content, home_diferencial_3_texto: e.target.value })}
                    rows={2}
                  />
                </div>
              </div>

              <Button 
                onClick={() => handleSave([
                  'home_diferenciais_titulo', 'home_diferenciais_subtitulo',
                  'home_diferencial_1_titulo', 'home_diferencial_1_texto',
                  'home_diferencial_2_titulo', 'home_diferencial_2_texto',
                  'home_diferencial_3_titulo', 'home_diferencial_3_texto'
                ])} 
                disabled={isSaving}
              >
                {isSaving && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                Salvar Diferenciais
              </Button>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="titulos">
          <Card>
            <CardHeader>
              <CardTitle>Títulos de Seções</CardTitle>
              <CardDescription>
                Títulos que aparecem acima das seções de Serviços e Setores
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="home_servicos_titulo">Título da Seção "Serviços"</Label>
                <Input
                  id="home_servicos_titulo"
                  value={content.home_servicos_titulo || ""}
                  onChange={(e) => setContent({ ...content, home_servicos_titulo: e.target.value })}
                  placeholder="Ex: Nossos Serviços"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="home_setores_titulo">Título da Seção "Setores"</Label>
                <Input
                  id="home_setores_titulo"
                  value={content.home_setores_titulo || ""}
                  onChange={(e) => setContent({ ...content, home_setores_titulo: e.target.value })}
                  placeholder="Ex: Setores Atendidos"
                />
              </div>
              <Button 
                onClick={() => handleSave(['home_servicos_titulo', 'home_setores_titulo'])} 
                disabled={isSaving}
              >
                {isSaving && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                Salvar Títulos
              </Button>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="cta">
          <Card>
            <CardHeader>
              <CardTitle>Call-to-Action Final</CardTitle>
              <CardDescription>
                Seção de conversão no final da página
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="home_cta_titulo">Título do CTA</Label>
                <Input
                  id="home_cta_titulo"
                  value={content.home_cta_titulo || ""}
                  onChange={(e) => setContent({ ...content, home_cta_titulo: e.target.value })}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="home_cta_subtitulo">Subtítulo do CTA</Label>
                <Textarea
                  id="home_cta_subtitulo"
                  value={content.home_cta_subtitulo || ""}
                  onChange={(e) => setContent({ ...content, home_cta_subtitulo: e.target.value })}
                  rows={2}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="home_cta_botao">Texto do Botão</Label>
                <Input
                  id="home_cta_botao"
                  value={content.home_cta_botao || ""}
                  onChange={(e) => setContent({ ...content, home_cta_botao: e.target.value })}
                />
              </div>
              <Button 
                onClick={() => handleSave(['home_cta_titulo', 'home_cta_subtitulo', 'home_cta_botao'])} 
                disabled={isSaving}
              >
                {isSaving && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                Salvar CTA
              </Button>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
