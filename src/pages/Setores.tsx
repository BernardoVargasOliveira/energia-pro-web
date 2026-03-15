import { useEffect } from "react";
import { Factory, Store, Hospital, PartyPopper, Building2, Server } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { motion } from "framer-motion";
import { PageHero } from "@/components/PageHero";

const Setores = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  
  const sectors = [
    {
      icon: <Factory className="h-12 w-12" />,
      title: "Indústria",
      description: "Soluções robustas para processos industriais que não podem parar. Garantimos energia confiável para manter sua produção funcionando.",
      needs: [
        "Alta potência e confiabilidade",
        "Operação contínua",
        "Backup imediato em caso de falhas",
        "Sistemas redundantes"
      ]
    },
    {
      icon: <Store className="h-12 w-12" />,
      title: "Comércio",
      description: "Mantenha seu estabelecimento comercial sempre operacional. Evite perdas de vendas e preserve a experiência do cliente.",
      needs: [
        "Proteção de equipamentos sensíveis",
        "Continuidade das operações",
        "Segurança para sistemas de pagamento",
        "Preservação de mercadorias refrigeradas"
      ]
    },
    {
      icon: <Hospital className="h-12 w-12" />,
      title: "Clínicas",
      description: "Energia ininterrupta. Fornecemos sistemas com altíssima confiabilidade para o setor de saúde.",
      needs: [
        "Zero tempo de interrupção",
        "Sistemas com redundância",
        "Manutenção preventiva rigorosa",
        "Certificações e normas específicas"
      ]
    },
    {
      icon: <PartyPopper className="h-12 w-12" />,
      title: "Eventos",
      description: "Geradores para eventos de todos os portes. Shows, festas, feiras e convenções com energia confiável e silenciosa.",
      needs: [
        "Mobilidade e fácil instalação",
        "Baixa emissão de ruído",
        "Autonomia adequada ao evento",
        "Suporte técnico no local"
      ]
    },
    {
      icon: <Building2 className="h-12 w-12" />,
      title: "Condomínios",
      description: "Garanta conforto e segurança para os moradores. Sistemas de backup para áreas comuns e equipamentos essenciais.",
      needs: [
        "Acionamento automático",
        "Operação silenciosa",
        "Manutenção programada"
      ]
    },
    {
      icon: <Server className="h-12 w-12" />,
      title: "Data Centers",
      description: "Proteção máxima para infraestrutura crítica de TI. Soluções especializadas para ambientes que exigem altíssima disponibilidade.",
      needs: [
        "Redundância N+1 ou 2N",
        "Monitoramento em tempo real",
        "Manutenção preventiva especializada",
        "Certificações internacionais"
      ]
    },
  ];

  return (
    <div className="min-h-screen">
      <PageHero 
        title="Setores Atendidos"
        subtitle="Soluções especializadas em energia para diversos segmentos"
      />

      {/* Sectors Grid */}
      <section className="py-16 bg-background mt-8 md:mt-10">
        <div className="container mx-auto px-4">
          <motion.div 
            className="text-center mb-12"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: "easeOut" }}
          >
            <h2 className="text-3xl font-bold text-foreground mb-4">
              Experiência em Diversos Mercados
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Entendemos as necessidades específicas de cada setor e oferecemos soluções personalizadas
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {sectors.map((sector, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, ease: "easeOut", delay: index * 0.1 }}
              >
                <Card className="bg-gradient-card border-0 shadow-card h-full group hover:shadow-elevated hover:-translate-y-2 transition-all duration-300 rounded-2xl overflow-hidden">
                <CardHeader className="relative pt-8">
                  <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-primary via-secondary to-accent" aria-hidden="true" />
                  <div className="inline-flex items-center justify-center w-20 h-20 rounded-2xl bg-gradient-to-br from-primary to-secondary text-primary-foreground mb-4 group-hover:scale-110 group-hover:shadow-secondary transition-all duration-300">
                    {sector.icon}
                  </div>
                  <CardTitle className="text-2xl mb-3 group-hover:text-secondary transition-colors duration-300">{sector.title}</CardTitle>
                  <p className="text-muted-foreground leading-relaxed">{sector.description}</p>
                </CardHeader>
                <CardContent>
                  <h4 className="font-semibold mb-3 text-foreground">Necessidades principais:</h4>
                  <ul className="space-y-2">
                    {sector.needs.map((need, idx) => (
                      <li key={idx} className="flex items-start gap-2 text-muted-foreground">
                        <div className="w-5 h-5 rounded-full bg-gradient-to-br from-secondary to-primary flex items-center justify-center shrink-0 mt-0.5">
                          <span className="text-white text-[10px] font-bold">✓</span>
                        </div>
                        <span>{need}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section className="py-16 bg-muted">
        <div className="container mx-auto px-4">
          <motion.h2 
            className="text-3xl font-bold text-center text-foreground mb-12"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: "easeOut" }}
          >
            Por Que Nos Escolher Para Seu Setor?
          </motion.h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl mx-auto">
            <motion.div 
              className="bg-gradient-card p-6 rounded-2xl shadow-card transition-all duration-300 hover:shadow-elevated hover:-translate-y-1"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, ease: "easeOut", delay: 0.1 }}
            >
              <h3 className="text-xl font-semibold mb-3 text-foreground">Experiência Comprovada</h3>
              <p className="text-muted-foreground">
                30 anos de experiência atendendo empresas de diversos portes e segmentos.
              </p>
            </motion.div>
            
            <motion.div 
              className="bg-gradient-card p-6 rounded-2xl shadow-card transition-all duration-300 hover:shadow-elevated hover:-translate-y-1"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, ease: "easeOut", delay: 0.2 }}
            >
              <h3 className="text-xl font-semibold mb-3 text-foreground">Soluções Personalizadas</h3>
              <p className="text-muted-foreground">
                Cada setor tem necessidades únicas. Desenvolvemos projetos sob medida para seu negócio.
              </p>
            </motion.div>
            
            <motion.div 
              className="bg-gradient-card p-6 rounded-2xl shadow-card transition-all duration-300 hover:shadow-elevated hover:-translate-y-1"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, ease: "easeOut", delay: 0.3 }}
            >
              <h3 className="text-xl font-semibold mb-3 text-foreground">Suporte Especializado</h3>
              <p className="text-muted-foreground">
                Equipe técnica especializada, com acompanhamento de Responsável Técnico e Engenheiro eletricista.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-primary">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold text-primary-foreground mb-6">
            Seu Setor Precisa de Energia Confiável?
          </h2>
          <p className="text-xl text-primary-foreground/90 mb-8 max-w-2xl mx-auto">
            Fale com nossos especialistas e descubra a melhor solução para seu negócio
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="/contato"
              className="inline-flex items-center justify-center px-8 py-3 min-h-[44px] bg-accent text-accent-foreground hover:bg-accent/90 rounded-full font-semibold text-lg transition-all duration-300 shadow-accent hover:shadow-accent-glow hover:-translate-y-0.5"
            >
              Solicitar Orçamento
            </a>
            <a
              href="https://wa.me/5531995266402?text=Ol%C3%A1!%20Vim%20pelo%20site%20da%20Projemac%20e%20gostaria%20de%20solicitar%20um%20or%C3%A7amento."
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center px-8 py-3 min-h-[44px] bg-transparent border-2 border-primary-foreground text-primary-foreground hover:bg-primary-foreground hover:text-primary rounded-full font-semibold text-lg transition-all duration-300 hover:-translate-y-0.5"
            >
              Falar no WhatsApp
            </a>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Setores;
