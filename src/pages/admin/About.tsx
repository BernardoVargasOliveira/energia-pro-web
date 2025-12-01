import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { Loader2 } from "lucide-react";

export default function About() {
  const [content, setContent] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    loadContent();
  }, []);

  const loadContent = async () => {
    const { data, error } = await supabase
      .from("site_content")
      .select("value_text")
      .eq("key", "sobre_texto")
      .maybeSingle();

    if (error) {
      toast({
        title: "Erro ao carregar conteúdo",
        description: error.message,
        variant: "destructive",
      });
      return;
    }

    setContent(data?.value_text || "");
    setIsLoading(false);
  };

  const handleSave = async () => {
    setIsSaving(true);

    const { error } = await supabase
      .from("site_content")
      .upsert({ key: "sobre_texto", value_text: content }, { onConflict: "key" });

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
        <h2 className="text-3xl font-bold tracking-tight">Sobre a Empresa</h2>
        <p className="text-muted-foreground">Edite o texto institucional</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Texto Institucional</CardTitle>
          <CardDescription>Descrição sobre a empresa, missão, visão e valores</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="sobre_texto">Texto Sobre a Empresa</Label>
            <Textarea
              id="sobre_texto"
              value={content}
              onChange={(e) => setContent(e.target.value)}
              placeholder="Digite o texto institucional da empresa"
              rows={10}
              className="font-mono text-sm"
            />
            <p className="text-xs text-muted-foreground">
              Dica: Quebre linhas para criar parágrafos
            </p>
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
