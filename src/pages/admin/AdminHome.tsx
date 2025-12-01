import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { Loader2 } from "lucide-react";

const AdminHome = () => {
  const [content, setContent] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const { toast } = useToast();

  const fields = [
    { key: 'hero_title', label: 'Título Hero', type: 'input' },
    { key: 'hero_subtitle', label: 'Subtítulo Hero', type: 'textarea' },
    { key: 'home_services_title', label: 'Título Serviços', type: 'input' },
    { key: 'home_differentials_title', label: 'Título Diferenciais', type: 'input' },
    { key: 'home_differentials_subtitle', label: 'Subtítulo Diferenciais', type: 'input' },
    { key: 'home_sectors_title', label: 'Título Setores', type: 'input' },
    { key: 'home_cta_title', label: 'Título CTA', type: 'input' },
    { key: 'home_cta_subtitle', label: 'Subtítulo CTA', type: 'textarea' },
  ];

  useEffect(() => {
    loadContent();
  }, []);

  const loadContent = async () => {
    try {
      const { data, error } = await supabase
        .from('site_content')
        .select('key, value_text')
        .in('key', fields.map(f => f.key));

      if (error) throw error;

      const contentMap: Record<string, string> = {};
      data?.forEach(item => {
        contentMap[item.key] = item.value_text || '';
      });
      setContent(contentMap);
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
    setSaving(true);
    try {
      const updates = fields.map(field => ({
        key: field.key,
        value_text: content[field.key] || '',
      }));

      for (const update of updates) {
        const { error } = await supabase
          .from('site_content')
          .upsert(update, { onConflict: 'key' });
        
        if (error) throw error;
      }

      toast({
        title: "Salvo com sucesso!",
        description: "Conteúdo da Home atualizado.",
      });
    } catch (error: any) {
      toast({
        title: "Erro ao salvar",
        description: error.message,
        variant: "destructive",
      });
    } finally {
      setSaving(false);
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
    <Card>
      <CardHeader>
        <CardTitle>Conteúdo da Home</CardTitle>
        <CardDescription>Edite os textos da página inicial</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {fields.map(field => (
          <div key={field.key} className="space-y-2">
            <label className="text-sm font-medium">{field.label}</label>
            {field.type === 'textarea' ? (
              <Textarea
                value={content[field.key] || ''}
                onChange={(e) => setContent({ ...content, [field.key]: e.target.value })}
                rows={3}
              />
            ) : (
              <Input
                value={content[field.key] || ''}
                onChange={(e) => setContent({ ...content, [field.key]: e.target.value })}
              />
            )}
          </div>
        ))}
        <Button onClick={handleSave} disabled={saving} className="w-full">
          {saving ? <><Loader2 className="mr-2 h-4 w-4 animate-spin" /> Salvando...</> : "Salvar Alterações"}
        </Button>
      </CardContent>
    </Card>
  );
};

export default AdminHome;