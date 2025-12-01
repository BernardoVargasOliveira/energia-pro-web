import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
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

interface Banner {
  id: string;
  section: string;
  title: string | null;
  subtitle: string | null;
  image_url: string;
  order_index: number;
}

export default function Banners() {
  const [banners, setBanners] = useState<Banner[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [editingBanner, setEditingBanner] = useState<Banner | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    loadBanners();
  }, []);

  const loadBanners = async () => {
    const { data, error } = await supabase
      .from("banners")
      .select("*")
      .order("section")
      .order("order_index");

    if (error) {
      toast({
        title: "Erro ao carregar banners",
        description: error.message,
        variant: "destructive",
      });
      return;
    }

    setBanners(data || []);
    setIsLoading(false);
  };

  const handleSave = async (formData: Partial<Banner>) => {
    setIsSaving(true);

    if (editingBanner) {
      const { error } = await supabase
        .from("banners")
        .update(formData)
        .eq("id", editingBanner.id);

      if (error) {
        toast({
          title: "Erro ao atualizar",
          description: error.message,
          variant: "destructive",
        });
      } else {
        toast({ title: "Banner atualizado com sucesso!" });
        loadBanners();
        setIsDialogOpen(false);
        setEditingBanner(null);
      }
    } else {
      if (!formData.section || !formData.image_url) {
        toast({
          title: "Campos obrigatórios",
          description: "Seção e URL da imagem são obrigatórios",
          variant: "destructive",
        });
        setIsSaving(false);
        return;
      }

      const { error } = await supabase
        .from("banners")
        .insert([{
          section: formData.section,
          title: formData.title,
          subtitle: formData.subtitle,
          image_url: formData.image_url,
          order_index: 0
        }]);

      if (error) {
        toast({
          title: "Erro ao criar",
          description: error.message,
          variant: "destructive",
        });
      } else {
        toast({ title: "Banner criado com sucesso!" });
        loadBanners();
        setIsDialogOpen(false);
      }
    }

    setIsSaving(false);
  };

  const handleDelete = async (id: string) => {
    const { error } = await supabase
      .from("banners")
      .delete()
      .eq("id", id);

    if (error) {
      toast({
        title: "Erro ao excluir",
        description: error.message,
        variant: "destructive",
      });
    } else {
      toast({ title: "Banner excluído com sucesso!" });
      loadBanners();
    }
  };

  if (isLoading) {
    return <div className="flex items-center justify-center p-8">Carregando...</div>;
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Banners e Imagens</h2>
          <p className="text-muted-foreground">Gerencie os banners e imagens do site</p>
        </div>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button onClick={() => setEditingBanner(null)}>
              <Plus className="mr-2 h-4 w-4" />
              Novo Banner
            </Button>
          </DialogTrigger>
          <BannerDialog
            banner={editingBanner}
            onSave={handleSave}
            isSaving={isSaving}
          />
        </Dialog>
      </div>

      <div className="grid gap-4">
        {banners.map((banner) => (
          <Card key={banner.id}>
            <CardHeader>
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <CardTitle className="flex items-center gap-2">
                    <span className="text-sm bg-muted px-2 py-1 rounded">{banner.section}</span>
                    {banner.title}
                  </CardTitle>
                  <CardDescription>{banner.subtitle}</CardDescription>
                </div>
                <div className="flex gap-2">
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => {
                      setEditingBanner(banner);
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
                          Tem certeza que deseja excluir este banner? Esta ação não pode ser desfeita.
                        </AlertDialogDescription>
                      </AlertDialogHeader>
                      <AlertDialogFooter>
                        <AlertDialogCancel>Cancelar</AlertDialogCancel>
                        <AlertDialogAction onClick={() => handleDelete(banner.id)}>
                          Excluir
                        </AlertDialogAction>
                      </AlertDialogFooter>
                    </AlertDialogContent>
                  </AlertDialog>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <img 
                src={banner.image_url} 
                alt={banner.title || "Banner"} 
                className="w-full max-h-48 object-cover rounded-md"
                onError={(e) => {
                  e.currentTarget.src = "https://via.placeholder.com/800x400?text=Imagem+não+encontrada";
                }}
              />
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}

function BannerDialog({
  banner,
  onSave,
  isSaving,
}: {
  banner: Banner | null;
  onSave: (data: Partial<Banner>) => void;
  isSaving: boolean;
}) {
  const [formData, setFormData] = useState<Partial<Banner>>({
    section: banner?.section || "",
    title: banner?.title || "",
    subtitle: banner?.subtitle || "",
    image_url: banner?.image_url || "",
  });

  return (
    <DialogContent className="max-w-2xl">
      <DialogHeader>
        <DialogTitle>{banner ? "Editar Banner" : "Novo Banner"}</DialogTitle>
        <DialogDescription>
          Preencha os dados do banner
        </DialogDescription>
      </DialogHeader>
      <div className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="section">Seção</Label>
          <Input
            id="section"
            value={formData.section}
            onChange={(e) => setFormData({ ...formData, section: e.target.value })}
            placeholder="Ex: home_hero, sobre_banner"
          />
          <p className="text-xs text-muted-foreground">
            Use identificadores como: home_hero, sobre_banner, etc.
          </p>
        </div>
        <div className="space-y-2">
          <Label htmlFor="image_url">URL da Imagem</Label>
          <Input
            id="image_url"
            value={formData.image_url}
            onChange={(e) => setFormData({ ...formData, image_url: e.target.value })}
            placeholder="https://exemplo.com/imagem.jpg"
          />
          <p className="text-xs text-muted-foreground">
            Cole a URL completa da imagem
          </p>
        </div>
        <div className="space-y-2">
          <Label htmlFor="title">Título (opcional)</Label>
          <Input
            id="title"
            value={formData.title || ""}
            onChange={(e) => setFormData({ ...formData, title: e.target.value })}
            placeholder="Título do banner"
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="subtitle">Subtítulo (opcional)</Label>
          <Input
            id="subtitle"
            value={formData.subtitle || ""}
            onChange={(e) => setFormData({ ...formData, subtitle: e.target.value })}
            placeholder="Subtítulo do banner"
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
