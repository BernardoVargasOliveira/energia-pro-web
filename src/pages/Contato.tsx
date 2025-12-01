import { useState, useEffect, useRef } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Phone, Mail, MapPin, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";

const formSchema = z.object({
  nome: z.string().min(3, "Nome deve ter pelo menos 3 caracteres").max(100),
  email: z.string().email("Email inválido").max(255),
  telefone: z.string().min(10, "Telefone inválido").max(20),
  empresa: z.string().max(100).optional(),
  cidade: z.string().max(100).optional(),
  estado: z.string().max(2).optional(),
  tipo_interesse: z.string().min(1, "Selecione um tipo de interesse"),
  mensagem: z.string().max(1000).optional(),
});

type FormData = z.infer<typeof formSchema>;

const Contato = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [content, setContent] = useState<Record<string, string>>({});
  const { toast } = useToast();
  const formLoadTimeRef = useRef<number>(Date.now());
  const [honeypot, setHoneypot] = useState("");

  useEffect(() => {
    formLoadTimeRef.current = Date.now();
    
    const loadContent = async () => {
      const { data } = await supabase
        .from("site_content")
        .select("*")
        .in("key", [
          'contato_header_titulo', 'contato_header_subtitulo',
          'contato_info_titulo', 'contato_telefone', 'contato_email',
          'contato_endereco', 'contato_horario',
          'contato_whatsapp_texto', 'contato_whatsapp_botao',
          'contato_form_titulo'
        ]);

      const contentMap: Record<string, string> = {};
      data?.forEach((item) => {
        contentMap[item.key] = item.value_text || "";
      });
      setContent(contentMap);
    };

    loadContent();
  }, []);

  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      nome: "", email: "", telefone: "", empresa: "",
      cidade: "", estado: "", tipo_interesse: "", mensagem: "",
    },
  });

  const onSubmit = async (data: FormData) => {
    setIsSubmitting(true);

    try {
      const response = await fetch(
        `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/submit-lead`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY}`,
          },
          body: JSON.stringify({
            ...data,
            empresa: data.empresa || null,
            cidade: data.cidade || null,
            estado: data.estado || null,
            mensagem: data.mensagem || null,
            honeypot,
            formLoadTime: formLoadTimeRef.current,
          }),
        }
      );

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.message || 'Erro ao enviar mensagem');
      }

      toast({
        title: "Mensagem enviada com sucesso!",
        description: result.message || "Em breve entraremos em contato.",
      });

      form.reset();
      setHoneypot("");
      formLoadTimeRef.current = Date.now();
      
    } catch (error) {
      toast({
        title: "Erro ao enviar mensagem",
        description: error instanceof Error ? error.message : "Tente novamente.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen">
      <section className="bg-gradient-primary py-16">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl md:text-5xl font-bold text-primary-foreground text-center mb-6">
            {content.contato_header_titulo || "Entre em Contato"}
          </h1>
          <p className="text-xl text-primary-foreground/90 text-center max-w-3xl mx-auto">
            {content.contato_header_subtitulo || "Solicite um orçamento"}
          </p>
        </div>
      </section>

      <section className="py-16 bg-background">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <div>
              <h2 className="text-3xl font-bold text-foreground mb-8">
                {content.contato_info_titulo || "Fale Conosco"}
              </h2>

              <div className="space-y-6 mb-8">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-full bg-primary flex items-center justify-center flex-shrink-0">
                    <Phone className="h-6 w-6 text-primary-foreground" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground mb-1">Telefone</h3>
                    <a href={`tel:${content.contato_telefone}`} className="text-muted-foreground hover:text-secondary transition-colors">
                      {content.contato_telefone || "(31) 3495-3004"}
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-full bg-primary flex items-center justify-center flex-shrink-0">
                    <Mail className="h-6 w-6 text-primary-foreground" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground mb-1">Email</h3>
                    <a href={`mailto:${content.contato_email}`} className="text-muted-foreground hover:text-secondary transition-colors">
                      {content.contato_email || "contato@projemac.com.br"}
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-full bg-primary flex items-center justify-center flex-shrink-0">
                    <MapPin className="h-6 w-6 text-primary-foreground" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground mb-1">Endereço</h3>
                    <p className="text-muted-foreground whitespace-pre-wrap">
                      {content.contato_endereco || "Belo Horizonte - MG"}
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-full bg-primary flex items-center justify-center flex-shrink-0">
                    <Clock className="h-6 w-6 text-primary-foreground" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground mb-1">Horário</h3>
                    <p className="text-muted-foreground">
                      {content.contato_horario || "Segunda a Sexta: 8h às 18h"}
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-muted p-6 rounded-lg">
                <h3 className="font-semibold text-foreground mb-3">WhatsApp</h3>
                <p className="text-muted-foreground mb-4">
                  {content.contato_whatsapp_texto || "Prefere conversar pelo WhatsApp?"}
                </p>
                <Button asChild className="w-full bg-secondary text-secondary-foreground hover:bg-secondary/90">
                  <a href="https://wa.me/553134953004" target="_blank" rel="noopener noreferrer">
                    {content.contato_whatsapp_botao || "Iniciar Conversa"}
                  </a>
                </Button>
              </div>
            </div>

            <div>
              <h2 className="text-3xl font-bold text-foreground mb-8">
                {content.contato_form_titulo || "Solicite um Orçamento"}
              </h2>

              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                  <div style={{ position: 'absolute', left: '-9999px', opacity: 0, pointerEvents: 'none' }} aria-hidden="true">
                    <input id="website" type="text" tabIndex={-1} value={honeypot} onChange={(e) => setHoneypot(e.target.value)} />
                  </div>

                  <FormField control={form.control} name="nome" render={({ field }) => (
                    <FormItem>
                      <FormLabel>Nome Completo *</FormLabel>
                      <FormControl><Input placeholder="Seu nome" {...field} /></FormControl>
                      <FormMessage />
                    </FormItem>
                  )} />

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <FormField control={form.control} name="email" render={({ field }) => (
                      <FormItem>
                        <FormLabel>Email *</FormLabel>
                        <FormControl><Input type="email" placeholder="seu@email.com" {...field} /></FormControl>
                        <FormMessage />
                      </FormItem>
                    )} />

                    <FormField control={form.control} name="telefone" render={({ field }) => (
                      <FormItem>
                        <FormLabel>Telefone *</FormLabel>
                        <FormControl><Input placeholder="(00) 00000-0000" {...field} /></FormControl>
                        <FormMessage />
                      </FormItem>
                    )} />
                  </div>

                  <FormField control={form.control} name="empresa" render={({ field }) => (
                    <FormItem>
                      <FormLabel>Empresa</FormLabel>
                      <FormControl><Input placeholder="Nome da empresa" {...field} /></FormControl>
                      <FormMessage />
                    </FormItem>
                  )} />

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <FormField control={form.control} name="cidade" render={({ field }) => (
                      <FormItem>
                        <FormLabel>Cidade</FormLabel>
                        <FormControl><Input placeholder="Sua cidade" {...field} /></FormControl>
                        <FormMessage />
                      </FormItem>
                    )} />

                    <FormField control={form.control} name="estado" render={({ field }) => (
                      <FormItem>
                        <FormLabel>Estado</FormLabel>
                        <FormControl><Input placeholder="UF" maxLength={2} {...field} /></FormControl>
                        <FormMessage />
                      </FormItem>
                    )} />
                  </div>

                  <FormField control={form.control} name="tipo_interesse" render={({ field }) => (
                    <FormItem>
                      <FormLabel>Tipo de Interesse *</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger><SelectValue placeholder="Selecione" /></SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="locacao">Locação de Geradores</SelectItem>
                          <SelectItem value="projeto">Projeto de Instalação</SelectItem>
                          <SelectItem value="outros">Outros</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )} />

                  <FormField control={form.control} name="mensagem" render={({ field }) => (
                    <FormItem>
                      <FormLabel>Mensagem</FormLabel>
                      <FormControl>
                        <Textarea placeholder="Conte-nos mais..." className="min-h-[120px]" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )} />

                  <Button type="submit" size="lg" className="w-full bg-accent text-accent-foreground hover:bg-accent/90 font-semibold" disabled={isSubmitting}>
                    {isSubmitting ? "Enviando..." : "Enviar Mensagem"}
                  </Button>
                </form>
              </Form>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Contato;
