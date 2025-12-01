import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { Loader2, Plus, Trash2, Pencil } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

type Sector = {
  id: string;
  name: string;
  description: string | null;
  icon: string | null;
  order_index: number | null;
};

const AdminSetores = () => {
  const [sectors, setSectors] = useState<Sector[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingSector, setEditingSector] = useState<Sector | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    loadSectors();
  }, []);

  const loadSectors = async () => {
    try {
      const { data, error } = await supabase
        .from('sectors')
        .select('*')
        .order('order_index');

      if (error) throw error;
      setSectors(data || []);
    } catch (error: any) {
      toast({
        title: "Erro ao carregar",
        description: error.message,
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async () => {
    if (!editingSector) return;

    try {
      if (editingSector.id) {
        const { error } = await supabase
          .from('sectors')
          .update({
            name: editingSector.name,
            description: editingSector.description,
            icon: editingSector.icon,
            order_index: editingSector.order_index,
          })
          .eq('id', editingSector.id);

        if (error) throw error;
      } else {
        const { error } = await supabase
          .from('sectors')
          .insert({
            name: editingSector.name,
            description: editingSector.description,
            icon: editingSector.icon,
            order_index: editingSector.order_index || 0,
          });

        if (error) throw error;
      }

      toast({
        title: "Salvo com sucesso!",
        description: "Setor atualizado.",
      });

      setIsDialogOpen(false);
      setEditingSector(null);
      loadSectors();
    } catch (error: any) {
      toast({
        title: "Erro ao salvar",
        description: error.message,
        variant: "destructive",
      });
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Tem certeza que deseja excluir este setor?")) return;

    try {
      const { error } = await supabase
        .from('sectors')
        .delete()
        .eq('id', id);

      if (error) throw error;

      toast({
        title: "Excluído com sucesso!",
        description: "Setor removido.",
      });

      loadSectors();
    } catch (error: any) {
      toast({
        title: "Erro ao excluir",
        description: error.message,
        variant: "destructive",
      });
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center p-8">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold">Gerenciar Setores</h2>
          <p className="text-muted-foreground">CRUD completo de setores atendidos</p>
        </div>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button onClick={() => {
              setEditingSector({ id: '', name: '', description: '', icon: '', order_index: 0 });
              setIsDialogOpen(true);
            }}>
              <Plus className="mr-2 h-4 w-4" />
              Novo Setor
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>{editingSector?.id ? 'Editar Setor' : 'Novo Setor'}</DialogTitle>
              <DialogDescription>
                Preencha os dados do setor
              </DialogDescription>
            </DialogHeader>
            {editingSector && (
              <div className="space-y-4">
                <div>
                  <label className="text-sm font-medium">Nome</label>
                  <Input
                    value={editingSector.name}
                    onChange={(e) => setEditingSector({ ...editingSector, name: e.target.value })}
                  />
                </div>
                <div>
                  <label className="text-sm font-medium">Descrição</label>
                  <Textarea
                    value={editingSector.description || ''}
                    onChange={(e) => setEditingSector({ ...editingSector, description: e.target.value })}
                    rows={2}
                  />
                </div>
                <div>
                  <label className="text-sm font-medium">Emoji/Ícone</label>
                  <Input
                    value={editingSector.icon || ''}
                    onChange={(e) => setEditingSector({ ...editingSector, icon: e.target.value })}
                    placeholder="Ex: 🏭, 🏪, 🏥"
                  />
                </div>
                <div>
                  <label className="text-sm font-medium">Ordem</label>
                  <Input
                    type="number"
                    value={editingSector.order_index || 0}
                    onChange={(e) => setEditingSector({ ...editingSector, order_index: parseInt(e.target.value) })}
                  />
                </div>
                <Button onClick={handleSave} className="w-full">
                  Salvar
                </Button>
              </div>
            )}
          </DialogContent>
        </Dialog>
      </div>

      <div className="grid gap-4">
        {sectors.map((sector) => (
          <Card key={sector.id}>
            <CardHeader>
              <div className="flex items-start justify-between">
                <div>
                  <CardTitle className="flex items-center gap-2">
                    <span className="text-2xl">{sector.icon}</span>
                    {sector.name}
                  </CardTitle>
                  <CardDescription>{sector.description}</CardDescription>
                </div>
                <div className="flex gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => {
                      setEditingSector(sector);
                      setIsDialogOpen(true);
                    }}
                  >
                    <Pencil className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="destructive"
                    size="sm"
                    onClick={() => handleDelete(sector.id)}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </CardHeader>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default AdminSetores;