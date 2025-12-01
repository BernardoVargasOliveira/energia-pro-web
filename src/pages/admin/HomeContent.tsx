import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { Loader2 } from "lucide-react";

interface ContentItem {
  key: string;
  value_text: string | null;
}

export default function HomeContent() {
  const [content, setContent] = useState<Record<string, string>>({});
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    loadContent();
  }, []);

  const loadContent = async () => {
    const { data, error } = await supabase
      .from("site_content")
      .select("*")
      .in("key", [
        "home_hero_title",
        "home_hero_subtitle",
        "home_servicos_titulo",
        "home_setores_titulo",
      ]);

    if (error) {
      toast({
        title: "Erro ao carregar conteúdo",
        description: error.message,
        variant: "destructive",
      });
      return;
    }

    const contentMap: Record<string, string> = {};
    data?.forEach((item: ContentItem) => {
      contentMap[item.key] = item.value_text || "";
    });
    setContent(contentMap);
    setIsLoading(false);
  };

  const handleSave = async () => {
    setIsSaving(true);

    const updates = Object.entries(content).map(([key, value]) => ({
      key,
      value_text: value,
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
      toast({
        title: "Conteúdo salvo!",
        description: "As alterações foram salvas com sucesso.",
      });
    }

    setIsSaving(false);
  };

  if (isLoading) {
    return <div className="flex items-center justify-center p-8">Carregando...</div>;
  }

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold tracking-tight">Conteúdo da Home</h2>
        <p className="text-muted-foreground">Edite os textos da página inicial</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Seção Hero (Banner Principal)</CardTitle>
          <CardDescription>Título e subtítulo do banner principal</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="home_hero_title">Título Principal</Label>
            <Input
              id="home_hero_title"
              value={content.home_hero_title || ""}
              onChange={(e) => setContent({ ...content, home_hero_title: e.target.value })}
              placeholder="Digite o título principal"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="home_hero_subtitle">Subtítulo</Label>
            <Textarea
              id="home_hero_subtitle"
              value={content.home_hero_subtitle || ""}
              onChange={(e) => setContent({ ...content, home_hero_subtitle: e.target.value })}
              placeholder="Digite o subtítulo"
              rows={3}
            />
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Títulos de Seções</CardTitle>
          <CardDescription>Títulos das seções de serviços e setores</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="home_servicos_titulo">Título da Seção de Serviços</Label>
            <Input
              id="home_servicos_titulo"
              value={content.home_servicos_titulo || ""}
              onChange={(e) => setContent({ ...content, home_servicos_titulo: e.target.value })}
              placeholder="Ex: Nossos Serviços"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="home_setores_titulo">Título da Seção de Setores</Label>
            <Input
              id="home_setores_titulo"
              value={content.home_setores_titulo || ""}
              onChange={(e) => setContent({ ...content, home_setores_titulo: e.target.value })}
              placeholder="Ex: Setores Atendidos"
            />
          </div>
        </CardContent>
      </Card>

      <div className="flex justify-end">
        <Button onClick={handleSave} disabled={isSaving}>
          {isSaving && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
          Salvar Alterações
        </Button>
      </div>
    </div>
  );
}
