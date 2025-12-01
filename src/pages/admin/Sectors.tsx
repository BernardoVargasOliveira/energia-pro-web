import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
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

interface Sector {
  id: string;
  name: string;
  description: string | null;
  icon: string | null;
  order_index: number;
}

export default function Sectors() {
  const [sectors, setSectors] = useState<Sector[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [editingSector, setEditingSector] = useState<Sector | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    loadSectors();
  }, []);

  const loadSectors = async () => {
    const { data, error } = await supabase
      .from("sectors")
      .select("*")
      .order("order_index");

    if (error) {
      toast({
        title: "Erro ao carregar setores",
        description: error.message,
        variant: "destructive",
      });
      return;
    }

    setSectors(data || []);
    setIsLoading(false);
  };

  const handleSave = async (formData: Partial<Sector>) => {
    setIsSaving(true);

    if (editingSector) {
      const { error } = await supabase
        .from("sectors")
        .update(formData)
        .eq("id", editingSector.id);

      if (error) {
        toast({
          title: "Erro ao atualizar",
          description: error.message,
          variant: "destructive",
        });
      } else {
        toast({ title: "Setor atualizado com sucesso!" });
        loadSectors();
        setIsDialogOpen(false);
        setEditingSector(null);
      }
    } else {
      if (!formData.name) {
        toast({
          title: "Campo obrigatório",
          description: "O nome é obrigatório",
          variant: "destructive",
        });
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
        toast({
          title: "Erro ao criar",
          description: error.message,
          variant: "destructive",
        });
      } else {
        toast({ title: "Setor criado com sucesso!" });
        loadSectors();
        setIsDialogOpen(false);
      }
    }

    setIsSaving(false);
  };

  const handleDelete = async (id: string) => {
    const { error } = await supabase
      .from("sectors")
      .delete()
      .eq("id", id);

    if (error) {
      toast({
        title: "Erro ao excluir",
        description: error.message,
        variant: "destructive",
      });
    } else {
      toast({ title: "Setor excluído com sucesso!" });
      loadSectors();
    }
  };

  if (isLoading) {
    return <div className="flex items-center justify-center p-8">Carregando...</div>;
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Setores Atendidos</h2>
          <p className="text-muted-foreground">Gerencie os setores que sua empresa atende</p>
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
            onSave={handleSave}
            isSaving={isSaving}
          />
        </Dialog>
      </div>

      <div className="grid gap-4">
        {sectors.map((sector) => (
          <Card key={sector.id}>
            <CardHeader>
              <div className="flex items-start justify-between">
                <div>
                  <CardTitle className="flex items-center gap-2">
                    {sector.icon && <span className="text-2xl">{sector.icon}</span>}
                    {sector.name}
                  </CardTitle>
                  <CardDescription>{sector.description}</CardDescription>
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
                          Tem certeza que deseja excluir este setor? Esta ação não pode ser desfeita.
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
            </CardHeader>
          </Card>
        ))}
      </div>
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
        <DialogDescription>
          Preencha os dados do setor
        </DialogDescription>
      </DialogHeader>
      <div className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="name">Nome</Label>
          <Input
            id="name"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            placeholder="Ex: Construção Civil"
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="description">Descrição</Label>
          <Textarea
            id="description"
            value={formData.description || ""}
            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
            placeholder="Descreva o setor"
            rows={3}
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="icon">Ícone (emoji)</Label>
          <Input
            id="icon"
            value={formData.icon || ""}
            onChange={(e) => setFormData({ ...formData, icon: e.target.value })}
            placeholder="Ex: 🏗️ ou 🏥"
            maxLength={2}
          />
          <p className="text-xs text-muted-foreground">
            Use um emoji para representar o setor
          </p>
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
