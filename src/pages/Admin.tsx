import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";

interface Lead {
  id: string;
  nome: string;
  email: string;
  telefone: string;
  empresa: string | null;
  cidade: string | null;
  estado: string | null;
  tipo_interesse: string;
  mensagem: string | null;
  origem: string | null;
  created_at: string;
}

const Admin = () => {
  const [leads, setLeads] = useState<Lead[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const { toast } = useToast();

  const loadLeads = async () => {
    try {
      const { data, error } = await supabase
        .from("leads")
        .select("*")
        .order("created_at", { ascending: false });

      if (error) throw error;

      setLeads(data || []);
    } catch (error) {
      console.error("Error loading leads:", error);
      toast({
        title: "Erro ao carregar leads",
        description: "Por favor, tente novamente.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadLeads();
  }, []);

  const getTipoInteresseLabel = (tipo: string) => {
    const labels: Record<string, string> = {
      locacao: "Locação",
      compra: "Compra",
      manutencao: "Manutenção",
      projeto: "Projeto",
      outros: "Outros",
    };
    return labels[tipo] || tipo;
  };

  return (
    <div className="min-h-screen bg-background py-12">
      <div className="container mx-auto px-4">
        <Card>
          <CardHeader>
            <CardTitle className="text-3xl font-bold">Painel Administrativo - Leads</CardTitle>
            <p className="text-muted-foreground">
              Total de leads recebidos: <span className="font-semibold text-secondary">{leads.length}</span>
            </p>
          </CardHeader>
          <CardContent>
            {isLoading ? (
              <p className="text-center py-8 text-muted-foreground">Carregando leads...</p>
            ) : leads.length === 0 ? (
              <p className="text-center py-8 text-muted-foreground">Nenhum lead recebido ainda.</p>
            ) : (
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Data</TableHead>
                      <TableHead>Nome</TableHead>
                      <TableHead>Email</TableHead>
                      <TableHead>Telefone</TableHead>
                      <TableHead>Empresa</TableHead>
                      <TableHead>Cidade/UF</TableHead>
                      <TableHead>Interesse</TableHead>
                      <TableHead>Mensagem</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {leads.map((lead) => (
                      <TableRow key={lead.id}>
                        <TableCell className="whitespace-nowrap">
                          {format(new Date(lead.created_at), "dd/MM/yyyy HH:mm", { locale: ptBR })}
                        </TableCell>
                        <TableCell className="font-medium">{lead.nome}</TableCell>
                        <TableCell>{lead.email}</TableCell>
                        <TableCell>{lead.telefone}</TableCell>
                        <TableCell>{lead.empresa || "-"}</TableCell>
                        <TableCell>
                          {lead.cidade && lead.estado
                            ? `${lead.cidade}/${lead.estado}`
                            : lead.cidade || lead.estado || "-"}
                        </TableCell>
                        <TableCell>
                          <Badge variant="secondary">{getTipoInteresseLabel(lead.tipo_interesse)}</Badge>
                        </TableCell>
                        <TableCell className="max-w-xs truncate">
                          {lead.mensagem || "-"}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Admin;
