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

export default function AboutAdmin() {
  const [content, setContent] = useState<Record<string, string>>({});
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    loadContent();
  }, []);

  const loadContent = async () => {
    const keys = [
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
      .map(key => ({ key, value_text: content[key] }));

    const { error } = await supabase
      .from("site_content")
      .upsert(updates, { onConflict: "key" });

    if (error) {
      toast({ title: "Erro ao salvar", description: error.message, variant: "destructive" });
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
        <h2 className="text-3xl font-bold tracking-tight">Página Sobre</h2>
        <p className="text-muted-foreground">Edite todo o conteúdo da página Sobre a Empresa</p>
      </div>

      <Tabs defaultValue="principal" className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="principal">Texto Principal</TabsTrigger>
          <TabsTrigger value="mvv">Missão, Visão, Valores</TabsTrigger>
          <TabsTrigger value="numeros">Números</TabsTrigger>
          <TabsTrigger value="equipe">Equipe</TabsTrigger>
        </TabsList>

        <TabsContent value="principal">
          <Card>
            <CardHeader>
              <CardTitle>Conteúdo Principal</CardTitle>
              <CardDescription>Header e texto institucional da empresa</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label>Título do Header</Label>
                <Input
                  value={content.sobre_header_titulo || ""}
                  onChange={(e) => setContent({ ...content, sobre_header_titulo: e.target.value })}
                />
              </div>
              <div className="space-y-2">
                <Label>Subtítulo do Header</Label>
                <Input
                  value={content.sobre_header_subtitulo || ""}
                  onChange={(e) => setContent({ ...content, sobre_header_subtitulo: e.target.value })}
                />
              </div>
              <div className="space-y-2">
                <Label>Título da Seção História</Label>
                <Input
                  value={content.sobre_historia_titulo || ""}
                  onChange={(e) => setContent({ ...content, sobre_historia_titulo: e.target.value })}
                />
              </div>
              <div className="space-y-2">
                <Label>Texto Institucional</Label>
                <Textarea
                  value={content.sobre_texto || ""}
                  onChange={(e) => setContent({ ...content, sobre_texto: e.target.value })}
                  rows={10}
                  placeholder="Digite o texto sobre a empresa. Quebre linhas para criar parágrafos."
                />
              </div>
              <Button 
                onClick={() => handleSave(['sobre_header_titulo', 'sobre_header_subtitulo', 'sobre_historia_titulo', 'sobre_texto'])} 
                disabled={isSaving}
              >
                {isSaving && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                Salvar Texto Principal
              </Button>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="mvv">
          <Card>
            <CardHeader>
              <CardTitle>Missão, Visão e Valores</CardTitle>
              <CardDescription>Os pilares da empresa</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4 pb-4 border-b">
                <h4 className="font-semibold">Missão</h4>
                <div className="space-y-2">
                  <Label>Título</Label>
                  <Input
                    value={content.sobre_missao_titulo || ""}
                    onChange={(e) => setContent({ ...content, sobre_missao_titulo: e.target.value })}
                  />
                </div>
                <div className="space-y-2">
                  <Label>Texto</Label>
                  <Textarea
                    value={content.sobre_missao_texto || ""}
                    onChange={(e) => setContent({ ...content, sobre_missao_texto: e.target.value })}
                    rows={3}
                  />
                </div>
              </div>

              <div className="space-y-4 pb-4 border-b">
                <h4 className="font-semibold">Visão</h4>
                <div className="space-y-2">
                  <Label>Título</Label>
                  <Input
                    value={content.sobre_visao_titulo || ""}
                    onChange={(e) => setContent({ ...content, sobre_visao_titulo: e.target.value })}
                  />
                </div>
                <div className="space-y-2">
                  <Label>Texto</Label>
                  <Textarea
                    value={content.sobre_visao_texto || ""}
                    onChange={(e) => setContent({ ...content, sobre_visao_texto: e.target.value })}
                    rows={3}
                  />
                </div>
              </div>

              <div className="space-y-4">
                <h4 className="font-semibold">Valores</h4>
                <div className="space-y-2">
                  <Label>Título</Label>
                  <Input
                    value={content.sobre_valores_titulo || ""}
                    onChange={(e) => setContent({ ...content, sobre_valores_titulo: e.target.value })}
                  />
                </div>
                <div className="space-y-2">
                  <Label>Lista de Valores (um por linha com •)</Label>
                  <Textarea
                    value={content.sobre_valores_texto || ""}
                    onChange={(e) => setContent({ ...content, sobre_valores_texto: e.target.value })}
                    rows={5}
                    placeholder="• Valor 1&#10;• Valor 2&#10;• Valor 3"
                  />
                </div>
              </div>

              <Button 
                onClick={() => handleSave([
                  'sobre_missao_titulo', 'sobre_missao_texto',
                  'sobre_visao_titulo', 'sobre_visao_texto',
                  'sobre_valores_titulo', 'sobre_valores_texto'
                ])} 
                disabled={isSaving}
              >
                {isSaving && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                Salvar Missão, Visão e Valores
              </Button>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="numeros">
          <Card>
            <CardHeader>
              <CardTitle>PROJEMAC em Números</CardTitle>
              <CardDescription>Estatísticas e conquistas da empresa</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label>Título da Seção</Label>
                <Input
                  value={content.sobre_numeros_titulo || ""}
                  onChange={(e) => setContent({ ...content, sobre_numeros_titulo: e.target.value })}
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Número 1 - Valor</Label>
                  <Input
                    value={content.sobre_numero_1_valor || ""}
                    onChange={(e) => setContent({ ...content, sobre_numero_1_valor: e.target.value })}
                    placeholder="Ex: 30+"
                  />
                </div>
                <div className="space-y-2">
                  <Label>Número 1 - Label</Label>
                  <Input
                    value={content.sobre_numero_1_label || ""}
                    onChange={(e) => setContent({ ...content, sobre_numero_1_label: e.target.value })}
                    placeholder="Ex: Anos de Experiência"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Número 2 - Valor</Label>
                  <Input
                    value={content.sobre_numero_2_valor || ""}
                    onChange={(e) => setContent({ ...content, sobre_numero_2_valor: e.target.value })}
                  />
                </div>
                <div className="space-y-2">
                  <Label>Número 2 - Label</Label>
                  <Input
                    value={content.sobre_numero_2_label || ""}
                    onChange={(e) => setContent({ ...content, sobre_numero_2_label: e.target.value })}
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Número 3 - Valor</Label>
                  <Input
                    value={content.sobre_numero_3_valor || ""}
                    onChange={(e) => setContent({ ...content, sobre_numero_3_valor: e.target.value })}
                  />
                </div>
                <div className="space-y-2">
                  <Label>Número 3 - Label</Label>
                  <Input
                    value={content.sobre_numero_3_label || ""}
                    onChange={(e) => setContent({ ...content, sobre_numero_3_label: e.target.value })}
                  />
                </div>
              </div>

              <Button 
                onClick={() => handleSave([
                  'sobre_numeros_titulo',
                  'sobre_numero_1_valor', 'sobre_numero_1_label',
                  'sobre_numero_2_valor', 'sobre_numero_2_label',
                  'sobre_numero_3_valor', 'sobre_numero_3_label'
                ])} 
                disabled={isSaving}
              >
                {isSaving && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                Salvar Números
              </Button>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="equipe">
          <Card>
            <CardHeader>
              <CardTitle>Nossa Equipe</CardTitle>
              <CardDescription>Texto sobre a equipe da empresa</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label>Título</Label>
                <Input
                  value={content.sobre_equipe_titulo || ""}
                  onChange={(e) => setContent({ ...content, sobre_equipe_titulo: e.target.value })}
                />
              </div>
              <div className="space-y-2">
                <Label>Texto sobre a Equipe</Label>
                <Textarea
                  value={content.sobre_equipe_texto || ""}
                  onChange={(e) => setContent({ ...content, sobre_equipe_texto: e.target.value })}
                  rows={6}
                />
              </div>
              <Button 
                onClick={() => handleSave(['sobre_equipe_titulo', 'sobre_equipe_texto'])} 
                disabled={isSaving}
              >
                {isSaving && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                Salvar Equipe
              </Button>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
