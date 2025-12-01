import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Loader2, Plus, Pencil, Trash2 } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

interface Sector {
  id: string;
  name: string;
  description: string | null;
  icon: string | null;
  order_index: number;
}

export default function SectorsAdmin() {
  const [content, setContent] = useState<Record<string, string>>({});
  const [sectors, setSectors] = useState<Sector[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [editingSector, setEditingSector] = useState<Sector | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    // Load content
    const { data: contentData } = await supabase
      .from("site_content")
      .select("*")
      .in("key", [
        'setores_header_titulo', 'setores_header_subtitulo',
        'setores_intro_titulo', 'setores_intro_subtitulo',
        'setores_escolher_titulo',
        'setores_escolher_1_titulo', 'setores_escolher_1_texto',
        'setores_escolher_2_titulo', 'setores_escolher_2_texto',
        'setores_escolher_3_titulo', 'setores_escolher_3_texto',
        'setores_cta_titulo', 'setores_cta_subtitulo'
      ]);

    const contentMap: Record<string, string> = {};
    contentData?.forEach((item) => {
      contentMap[item.key] = item.value_text || "";
    });
    setContent(contentMap);

    // Load sectors
    const { data: sectorsData } = await supabase
      .from("sectors")
      .select("*")
      .order("order_index");

    setSectors(sectorsData || []);
    setIsLoading(false);
  };

  const handleSaveContent = async (keys: string[]) => {
    setIsSaving(true);
    const updates = keys.map(key => ({ key, value_text: content[key] }));
    const { error } = await supabase.from("site_content").upsert(updates, { onConflict: "key" });
    
    if (error) {
      toast({ title: "Erro ao salvar", description: error.message, variant: "destructive" });
    } else {
      toast({ title: "Conteúdo salvo!" });
    }
    setIsSaving(false);
  };

  const handleSaveSector = async (formData: Partial<Sector>) => {
    setIsSaving(true);

    if (editingSector) {
      const { error } = await supabase
        .from("sectors")
        .update(formData)
        .eq("id", editingSector.id);

      if (error) {
        toast({ title: "Erro ao atualizar", description: error.message, variant: "destructive" });
      } else {
        toast({ title: "Setor atualizado!" });
        loadData();
        setIsDialogOpen(false);
        setEditingSector(null);
      }
    } else {
      if (!formData.name) {
        toast({ title: "Campo obrigatório", description: "O nome é obrigatório", variant: "destructive" });
        setIsSaving(false);
        return;
      }

      const { error } = await supabase
        .from("sectors")
        .insert([{
          name: formData.name,
          description: formData.description,
          icon: formData.icon,
          order_index: sectors.length
        }]);

      if (error) {
        toast({ title: "Erro ao criar", description: error.message, variant: "destructive" });
      } else {
        toast({ title: "Setor criado!" });
        loadData();
        setIsDialogOpen(false);
      }
    }

    setIsSaving(false);
  };

  const handleDelete = async (id: string) => {
    const { error } = await supabase.from("sectors").delete().eq("id", id);
    if (error) {
      toast({ title: "Erro ao excluir", description: error.message, variant: "destructive" });
    } else {
      toast({ title: "Setor excluído!" });
      loadData();
    }
  };

  if (isLoading) {
    return <div className="flex items-center justify-center p-8">Carregando...</div>;
  }

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold tracking-tight">Página Setores</h2>
        <p className="text-muted-foreground">Gerencie os setores e textos da página</p>
      </div>

      <Tabs defaultValue="textos" className="w-full">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="textos">Textos da Página</TabsTrigger>
          <TabsTrigger value="lista">Lista de Setores</TabsTrigger>
        </TabsList>

        <TabsContent value="textos">
          <div className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Header da Página</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label>Título</Label>
                  <Input
                    value={content.setores_header_titulo || ""}
                    onChange={(e) => setContent({ ...content, setores_header_titulo: e.target.value })}
                  />
                </div>
                <div className="space-y-2">
                  <Label>Subtítulo</Label>
                  <Input
                    value={content.setores_header_subtitulo || ""}
                    onChange={(e) => setContent({ ...content, setores_header_subtitulo: e.target.value })}
                  />
                </div>
                <Button onClick={() => handleSaveContent(['setores_header_titulo', 'setores_header_subtitulo'])} disabled={isSaving}>
                  {isSaving && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                  Salvar Header
                </Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Introdução</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label>Título</Label>
                  <Input
                    value={content.setores_intro_titulo || ""}
                    onChange={(e) => setContent({ ...content, setores_intro_titulo: e.target.value })}
                  />
                </div>
                <div className="space-y-2">
                  <Label>Subtítulo</Label>
                  <Textarea
                    value={content.setores_intro_subtitulo || ""}
                    onChange={(e) => setContent({ ...content, setores_intro_subtitulo: e.target.value })}
                    rows={2}
                  />
                </div>
                <Button onClick={() => handleSaveContent(['setores_intro_titulo', 'setores_intro_subtitulo'])} disabled={isSaving}>
                  {isSaving && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                  Salvar Introdução
                </Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Por Que Nos Escolher</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label>Título da Seção</Label>
                  <Input
                    value={content.setores_escolher_titulo || ""}
                    onChange={(e) => setContent({ ...content, setores_escolher_titulo: e.target.value })}
                  />
                </div>

                <div className="grid grid-cols-2 gap-4 pt-4">
                  <div className="space-y-2">
                    <Label>Card 1 - Título</Label>
                    <Input
                      value={content.setores_escolher_1_titulo || ""}
                      onChange={(e) => setContent({ ...content, setores_escolher_1_titulo: e.target.value })}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Card 1 - Texto</Label>
                    <Textarea
                      value={content.setores_escolher_1_texto || ""}
                      onChange={(e) => setContent({ ...content, setores_escolher_1_texto: e.target.value })}
                      rows={2}
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>Card 2 - Título</Label>
                    <Input
                      value={content.setores_escolher_2_titulo || ""}
                      onChange={(e) => setContent({ ...content, setores_escolher_2_titulo: e.target.value })}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Card 2 - Texto</Label>
                    <Textarea
                      value={content.setores_escolher_2_texto || ""}
                      onChange={(e) => setContent({ ...content, setores_escolher_2_texto: e.target.value })}
                      rows={2}
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>Card 3 - Título</Label>
                    <Input
                      value={content.setores_escolher_3_titulo || ""}
                      onChange={(e) => setContent({ ...content, setores_escolher_3_titulo: e.target.value })}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Card 3 - Texto</Label>
                    <Textarea
                      value={content.setores_escolher_3_texto || ""}
                      onChange={(e) => setContent({ ...content, setores_escolher_3_texto: e.target.value })}
                      rows={2}
                    />
                  </div>
                </div>

                <Button onClick={() => handleSaveContent([
                  'setores_escolher_titulo',
                  'setores_escolher_1_titulo', 'setores_escolher_1_texto',
                  'setores_escolher_2_titulo', 'setores_escolher_2_texto',
                  'setores_escolher_3_titulo', 'setores_escolher_3_texto'
                ])} disabled={isSaving}>
                  {isSaving && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                  Salvar "Por Que Escolher"
                </Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>CTA Final</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label>Título</Label>
                  <Input
                    value={content.setores_cta_titulo || ""}
                    onChange={(e) => setContent({ ...content, setores_cta_titulo: e.target.value })}
                  />
                </div>
                <div className="space-y-2">
                  <Label>Subtítulo</Label>
                  <Textarea
                    value={content.setores_cta_subtitulo || ""}
                    onChange={(e) => setContent({ ...content, setores_cta_subtitulo: e.target.value })}
                    rows={2}
                  />
                </div>
                <Button onClick={() => handleSaveContent(['setores_cta_titulo', 'setores_cta_subtitulo'])} disabled={isSaving}>
                  {isSaving && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                  Salvar CTA
                </Button>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="lista">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>Gerenciar Setores</CardTitle>
                  <CardDescription>CRUD completo dos setores atendidos</CardDescription>
                </div>
                <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                  <DialogTrigger asChild>
                    <Button onClick={() => setEditingSector(null)}>
                      <Plus className="mr-2 h-4 w-4" />
                      Novo Setor
                    </Button>
                  </DialogTrigger>
                  <SectorDialog
                    sector={editingSector}
                    onSave={handleSaveSector}
                    isSaving={isSaving}
                  />
                </Dialog>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {sectors.map((sector) => (
                  <div key={sector.id} className="flex items-start justify-between p-4 border rounded-lg">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        {sector.icon && <span className="text-2xl">{sector.icon}</span>}
                        <h4 className="font-semibold">{sector.name}</h4>
                      </div>
                      <p className="text-sm text-muted-foreground">{sector.description}</p>
                    </div>
                    <div className="flex gap-2">
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => {
                          setEditingSector(sector);
                          setIsDialogOpen(true);
                        }}
                      >
                        <Pencil className="h-4 w-4" />
                      </Button>
                      <AlertDialog>
                        <AlertDialogTrigger asChild>
                          <Button variant="ghost" size="icon">
                            <Trash2 className="h-4 w-4 text-destructive" />
                          </Button>
                        </AlertDialogTrigger>
                        <AlertDialogContent>
                          <AlertDialogHeader>
                            <AlertDialogTitle>Confirmar exclusão</AlertDialogTitle>
                            <AlertDialogDescription>
                              Tem certeza? Esta ação não pode ser desfeita.
                            </AlertDialogDescription>
                          </AlertDialogHeader>
                          <AlertDialogFooter>
                            <AlertDialogCancel>Cancelar</AlertDialogCancel>
                            <AlertDialogAction onClick={() => handleDelete(sector.id)}>
                              Excluir
                            </AlertDialogAction>
                          </AlertDialogFooter>
                        </AlertDialogContent>
                      </AlertDialog>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}

function SectorDialog({
  sector,
  onSave,
  isSaving,
}: {
  sector: Sector | null;
  onSave: (data: Partial<Sector>) => void;
  isSaving: boolean;
}) {
  const [formData, setFormData] = useState<Partial<Sector>>({
    name: sector?.name || "",
    description: sector?.description || "",
    icon: sector?.icon || "",
  });

  return (
    <DialogContent>
      <DialogHeader>
        <DialogTitle>{sector ? "Editar Setor" : "Novo Setor"}</DialogTitle>
        <DialogDescription>Preencha os dados do setor</DialogDescription>
      </DialogHeader>
      <div className="space-y-4">
        <div className="space-y-2">
          <Label>Nome</Label>
          <Input
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            placeholder="Ex: Construção Civil"
          />
        </div>
        <div className="space-y-2">
          <Label>Descrição</Label>
          <Textarea
            value={formData.description || ""}
            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
            placeholder="Descreva o setor"
            rows={3}
          />
        </div>
        <div className="space-y-2">
          <Label>Ícone (emoji)</Label>
          <Input
            value={formData.icon || ""}
            onChange={(e) => setFormData({ ...formData, icon: e.target.value })}
            placeholder="Ex: 🏗️"
            maxLength={2}
          />
        </div>
      </div>
      <DialogFooter>
        <Button onClick={() => onSave(formData)} disabled={isSaving}>
          {isSaving && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
          Salvar
        </Button>
      </DialogFooter>
    </DialogContent>
  );
}
