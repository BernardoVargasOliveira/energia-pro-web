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

interface Service {
  id: string;
  title: string;
  description: string | null;
  icon: string | null;
  order_index: number;
}

export default function ServicesAdmin() {
  const [content, setContent] = useState<Record<string, string>>({});
  const [services, setServices] = useState<Service[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [editingService, setEditingService] = useState<Service | null>(null);
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
      .in("key", ['servicos_header_titulo', 'servicos_header_subtitulo', 'servicos_showcase_titulo', 'servicos_showcase_subtitulo', 'servicos_cta_titulo', 'servicos_cta_subtitulo']);

    const contentMap: Record<string, string> = {};
    contentData?.forEach((item) => {
      contentMap[item.key] = item.value_text || "";
    });
    setContent(contentMap);

    // Load services
    const { data: servicesData } = await supabase
      .from("services")
      .select("*")
      .order("order_index");

    setServices(servicesData || []);
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

  const handleSaveService = async (formData: Partial<Service>) => {
    setIsSaving(true);

    if (editingService) {
      const { error } = await supabase
        .from("services")
        .update(formData)
        .eq("id", editingService.id);

      if (error) {
        toast({ title: "Erro ao atualizar", description: error.message, variant: "destructive" });
      } else {
        toast({ title: "Serviço atualizado!" });
        loadData();
        setIsDialogOpen(false);
        setEditingService(null);
      }
    } else {
      if (!formData.title) {
        toast({ title: "Campo obrigatório", description: "O título é obrigatório", variant: "destructive" });
        setIsSaving(false);
        return;
      }

      const { error } = await supabase
        .from("services")
        .insert([{
          title: formData.title,
          description: formData.description,
          icon: formData.icon,
          order_index: services.length
        }]);

      if (error) {
        toast({ title: "Erro ao criar", description: error.message, variant: "destructive" });
      } else {
        toast({ title: "Serviço criado!" });
        loadData();
        setIsDialogOpen(false);
      }
    }

    setIsSaving(false);
  };

  const handleDelete = async (id: string) => {
    const { error } = await supabase.from("services").delete().eq("id", id);
    if (error) {
      toast({ title: "Erro ao excluir", description: error.message, variant: "destructive" });
    } else {
      toast({ title: "Serviço excluído!" });
      loadData();
    }
  };

  if (isLoading) {
    return <div className="flex items-center justify-center p-8">Carregando...</div>;
  }

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold tracking-tight">Página Serviços</h2>
        <p className="text-muted-foreground">Gerencie os serviços e textos da página</p>
      </div>

      <Tabs defaultValue="textos" className="w-full">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="textos">Textos da Página</TabsTrigger>
          <TabsTrigger value="lista">Lista de Serviços</TabsTrigger>
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
                    value={content.servicos_header_titulo || ""}
                    onChange={(e) => setContent({ ...content, servicos_header_titulo: e.target.value })}
                  />
                </div>
                <div className="space-y-2">
                  <Label>Subtítulo</Label>
                  <Input
                    value={content.servicos_header_subtitulo || ""}
                    onChange={(e) => setContent({ ...content, servicos_header_subtitulo: e.target.value })}
                  />
                </div>
                <Button onClick={() => handleSaveContent(['servicos_header_titulo', 'servicos_header_subtitulo'])} disabled={isSaving}>
                  {isSaving && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                  Salvar Header
                </Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Showcase (Imagem Destaque)</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label>Título sobre a Imagem</Label>
                  <Input
                    value={content.servicos_showcase_titulo || ""}
                    onChange={(e) => setContent({ ...content, servicos_showcase_titulo: e.target.value })}
                  />
                </div>
                <div className="space-y-2">
                  <Label>Subtítulo sobre a Imagem</Label>
                  <Input
                    value={content.servicos_showcase_subtitulo || ""}
                    onChange={(e) => setContent({ ...content, servicos_showcase_subtitulo: e.target.value })}
                  />
                </div>
                <Button onClick={() => handleSaveContent(['servicos_showcase_titulo', 'servicos_showcase_subtitulo'])} disabled={isSaving}>
                  {isSaving && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                  Salvar Showcase
                </Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Call-to-Action</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label>Título do CTA</Label>
                  <Input
                    value={content.servicos_cta_titulo || ""}
                    onChange={(e) => setContent({ ...content, servicos_cta_titulo: e.target.value })}
                  />
                </div>
                <div className="space-y-2">
                  <Label>Subtítulo do CTA</Label>
                  <Textarea
                    value={content.servicos_cta_subtitulo || ""}
                    onChange={(e) => setContent({ ...content, servicos_cta_subtitulo: e.target.value })}
                    rows={2}
                  />
                </div>
                <Button onClick={() => handleSaveContent(['servicos_cta_titulo', 'servicos_cta_subtitulo'])} disabled={isSaving}>
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
                  <CardTitle>Gerenciar Serviços</CardTitle>
                  <CardDescription>CRUD completo dos serviços oferecidos</CardDescription>
                </div>
                <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                  <DialogTrigger asChild>
                    <Button onClick={() => setEditingService(null)}>
                      <Plus className="mr-2 h-4 w-4" />
                      Novo Serviço
                    </Button>
                  </DialogTrigger>
                  <ServiceDialog
                    service={editingService}
                    onSave={handleSaveService}
                    isSaving={isSaving}
                  />
                </Dialog>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {services.map((service) => (
                  <div key={service.id} className="flex items-start justify-between p-4 border rounded-lg">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        {service.icon && <span className="text-2xl">{service.icon}</span>}
                        <h4 className="font-semibold">{service.title}</h4>
                      </div>
                      <p className="text-sm text-muted-foreground">{service.description}</p>
                    </div>
                    <div className="flex gap-2">
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => {
                          setEditingService(service);
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
                            <AlertDialogAction onClick={() => handleDelete(service.id)}>
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

function ServiceDialog({
  service,
  onSave,
  isSaving,
}: {
  service: Service | null;
  onSave: (data: Partial<Service>) => void;
  isSaving: boolean;
}) {
  const [formData, setFormData] = useState<Partial<Service>>({
    title: service?.title || "",
    description: service?.description || "",
    icon: service?.icon || "",
  });

  return (
    <DialogContent>
      <DialogHeader>
        <DialogTitle>{service ? "Editar Serviço" : "Novo Serviço"}</DialogTitle>
        <DialogDescription>Preencha os dados do serviço</DialogDescription>
      </DialogHeader>
      <div className="space-y-4">
        <div className="space-y-2">
          <Label>Título</Label>
          <Input
            value={formData.title}
            onChange={(e) => setFormData({ ...formData, title: e.target.value })}
            placeholder="Ex: Locação de Geradores"
          />
        </div>
        <div className="space-y-2">
          <Label>Descrição</Label>
          <Textarea
            value={formData.description || ""}
            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
            placeholder="Descreva o serviço"
            rows={3}
          />
        </div>
        <div className="space-y-2">
          <Label>Ícone (emoji)</Label>
          <Input
            value={formData.icon || ""}
            onChange={(e) => setFormData({ ...formData, icon: e.target.value })}
            placeholder="Ex: ⚡"
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
