import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Loader2 } from "lucide-react";

export default function ContactAdmin() {
  const [content, setContent] = useState<Record<string, string>>({});
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    loadContent();
  }, []);

  const loadContent = async () => {
    const keys = [
      'contato_header_titulo', 'contato_header_subtitulo',
      'contato_info_titulo', 'contato_telefone', 'contato_email',
      'contato_endereco', 'contato_horario',
      'contato_whatsapp_texto', 'contato_whatsapp_botao',
      'contato_form_titulo'
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
        <h2 className="text-3xl font-bold tracking-tight">Página Contato</h2>
        <p className="text-muted-foreground">Edite os textos e informações de contato</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Header da Página</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label>Título</Label>
            <Input
              value={content.contato_header_titulo || ""}
              onChange={(e) => setContent({ ...content, contato_header_titulo: e.target.value })}
            />
          </div>
          <div className="space-y-2">
            <Label>Subtítulo</Label>
            <Input
              value={content.contato_header_subtitulo || ""}
              onChange={(e) => setContent({ ...content, contato_header_subtitulo: e.target.value })}
            />
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Informações de Contato</CardTitle>
          <CardDescription>Dados exibidos na lateral esquerda</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label>Título da Seção</Label>
            <Input
              value={content.contato_info_titulo || ""}
              onChange={(e) => setContent({ ...content, contato_info_titulo: e.target.value })}
            />
          </div>
          <div className="space-y-2">
            <Label>Telefone</Label>
            <Input
              value={content.contato_telefone || ""}
              onChange={(e) => setContent({ ...content, contato_telefone: e.target.value })}
              placeholder="(00) 0000-0000"
            />
          </div>
          <div className="space-y-2">
            <Label>Email</Label>
            <Input
              value={content.contato_email || ""}
              onChange={(e) => setContent({ ...content, contato_email: e.target.value })}
              placeholder="contato@empresa.com"
            />
          </div>
          <div className="space-y-2">
            <Label>Endereço</Label>
            <Textarea
              value={content.contato_endereco || ""}
              onChange={(e) => setContent({ ...content, contato_endereco: e.target.value })}
              rows={2}
              placeholder="Cidade - Estado&#10;Atendimento..."
            />
          </div>
          <div className="space-y-2">
            <Label>Horário de Atendimento</Label>
            <Input
              value={content.contato_horario || ""}
              onChange={(e) => setContent({ ...content, contato_horario: e.target.value })}
            />
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>WhatsApp</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label>Texto do Card WhatsApp</Label>
            <Textarea
              value={content.contato_whatsapp_texto || ""}
              onChange={(e) => setContent({ ...content, contato_whatsapp_texto: e.target.value })}
              rows={2}
            />
          </div>
          <div className="space-y-2">
            <Label>Texto do Botão WhatsApp</Label>
            <Input
              value={content.contato_whatsapp_botao || ""}
              onChange={(e) => setContent({ ...content, contato_whatsapp_botao: e.target.value })}
            />
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Formulário</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label>Título do Formulário</Label>
            <Input
              value={content.contato_form_titulo || ""}
              onChange={(e) => setContent({ ...content, contato_form_titulo: e.target.value })}
            />
          </div>
        </CardContent>
      </Card>

      <div className="flex justify-end">
        <Button onClick={handleSave} disabled={isSaving} size="lg">
          {isSaving && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
          Salvar Todas as Alterações
        </Button>
      </div>
    </div>
  );
}
