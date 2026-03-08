import { useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { CheckCircle } from "lucide-react";
import geradorEvento from "@/assets/gerador-evento.jpg";
import { motion } from "framer-motion";
import { PageHero } from "@/components/PageHero";

const Projetos = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  
  const projects = [
    {
      title: "Festival de Música",
      sector: "Eventos",
      challenge: "Fornecer energia para palcos, som, iluminação e infraestrutura de um festival itinerante com 3 dias de duração.",
      solution: "Locação de 8 geradores silenciosos de 250 kVA distribuídos estrategicamente, com equipe técnica no local.",
      result: "Evento realizado sem nenhuma interrupção de energia, com feedback positivo de produtores e artistas."
    },
    {
      title: "Shopping Center",
      sector: "Comércio",
      challenge: "Grande demanda energética e necessidade de backup para mais de 200 lojas, praça de alimentação e sistemas de segurança.",
      solution: "Sistema com 3 geradores de 800 kVA em configuração 2N, com transição imperceptível e operação silenciosa.",
      result: "100% de disponibilidade durante eventos de falta de energia, mantendo todas as operações comerciais funcionando."
    },
    {
      title: "Indústria Alimentícia",
      sector: "Indústria",
      challenge: "Necessidade de energia ininterrupta para processos críticos de produção e refrigeração que não podem sofrer qualquer tipo de interrupção.",
      solution: "Instalação de sistema com 2 geradores de 500 kVA em paralelismo com redundância N+1 e QTA.",
      result: "Zero tempo de parada em 3 anos de operação, com economia de 40% em custos de energia de backup."
    },
    {
      title: "Data Center Tier III",
      sector: "Tecnologia",
      challenge: "Infraestrutura crítica para hospedagem de servidores de grandes empresas, exigindo disponibilidade de 99.982%.",
      solution: "Implementação de sistema 2N com 4 geradores de 1500 kVA, monitoramento em tempo real e manutenção preditiva.",
      result: "Certificação Tier III mantida, com uptime de 99.99% e SLA cumprido em todos os contratos de clientes."
    },
  ];

  return (
    <div className="min-h-screen">
      <PageHero 
        title="Projetos Realizados"
        subtitle="Conheça alguns dos nossos cases de sucesso"
      />

      {/* Stats Section */}
      <section className="py-16 bg-background mt-8 md:mt-10">
        <div className="max-w-6xl mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-10">
            <div className="bg-white rounded-xl border border-gray-200 shadow-md p-6 md:p-8 text-center transition-all duration-300 ease-out hover:scale-[1.03] hover:shadow-xl hover:-translate-y-1">
              <div className="text-primary text-4xl md:text-5xl font-bold">5000+</div>
              <p className="text-gray-600 text-sm md:text-base mt-2">Projetos Executados</p>
            </div>
            <div className="bg-white rounded-xl border border-gray-200 shadow-md p-6 md:p-8 text-center transition-all duration-300 ease-out hover:scale-[1.03] hover:shadow-xl hover:-translate-y-1">
              <div className="text-primary text-4xl md:text-5xl font-bold">500+</div>
              <p className="text-gray-600 text-sm md:text-base mt-2">Clientes Satisfeitos</p>
            </div>
            <div className="bg-white rounded-xl border border-gray-200 shadow-md p-6 md:p-8 text-center transition-all duration-300 ease-out hover:scale-[1.03] hover:shadow-xl hover:-translate-y-1">
              <div className="text-primary text-4xl md:text-5xl font-bold">99.9%</div>
              <p className="text-gray-600 text-sm md:text-base mt-2">Taxa de Sucesso</p>
            </div>
          </div>
        </div>
      </section>

      {/* Showcase Image */}
      <section className="py-12 bg-background">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="relative rounded-lg overflow-hidden shadow-primary">
              <img 
                src={geradorEvento} 
                alt="Gerador PROJEMAC em evento esportivo" 
                className="w-full h-[400px] object-cover"
              />
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-primary/95 to-transparent p-6">
                <h3 className="text-primary-foreground font-bold text-2xl mb-2">Energia para Grandes Eventos</h3>
                <p className="text-primary-foreground/90">Soluções confiáveis para eventos esportivos, shows e festivais</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Projects Grid */}
      <section className="py-16 bg-muted">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-foreground mb-4">
              Cases de Sucesso
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Cada projeto é único e recebe toda nossa atenção e expertise para entregar resultados excepcionais
            </p>
          </div>

          <div className="space-y-8">
            {projects.map((project, index) => (
              <Card 
                key={index}
                className="border-2 hover:border-secondary transition-all duration-300 hover:shadow-primary animate-fade-in"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <CardHeader>
                  <div className="flex items-start justify-between flex-wrap gap-4 mb-2">
                    <CardTitle className="text-2xl">{project.title}</CardTitle>
                    <Badge variant="secondary" className="bg-accent text-accent-foreground">
                      {project.sector}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <h4 className="font-semibold mb-2 text-foreground flex items-center gap-2">
                      <span className="text-destructive">●</span>
                      Desafio:
                    </h4>
                    <p className="text-muted-foreground pl-6">
                      {project.challenge}
                    </p>
                  </div>
                  
                  <div>
                    <h4 className="font-semibold mb-2 text-foreground flex items-center gap-2">
                      <span className="text-accent">●</span>
                      Solução Implementada:
                    </h4>
                    <p className="text-muted-foreground pl-6">
                      {project.solution}
                    </p>
                  </div>
                  
                  <div>
                    <h4 className="font-semibold mb-2 text-foreground flex items-center gap-2">
                      <CheckCircle className="h-5 w-5 text-secondary" />
                      Resultado:
                    </h4>
                    <p className="text-muted-foreground pl-6">
                      {project.result}
                    </p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section className="py-16 bg-background">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center text-foreground mb-12">
            Nosso Processo de Trabalho
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
            <div className="text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary text-primary-foreground text-2xl font-bold mb-4">
                1
              </div>
              <h3 className="text-lg font-semibold mb-2 text-foreground">Análise de Necessidades</h3>
              <p className="text-muted-foreground text-sm">
                Levantamento detalhado das demandas energéticas e requisitos específicos
              </p>
            </div>

            <div className="text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-secondary text-secondary-foreground text-2xl font-bold mb-4">
                2
              </div>
              <h3 className="text-lg font-semibold mb-2 text-foreground">Projeto Customizado</h3>
              <p className="text-muted-foreground text-sm">
                Desenvolvimento de solução sob medida com dimensionamento preciso
              </p>
            </div>

            <div className="text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-accent text-accent-foreground text-2xl font-bold mb-4">
                3
              </div>
              <h3 className="text-lg font-semibold mb-2 text-foreground">Implementação</h3>
              <p className="text-muted-foreground text-sm">
                Instalação profissional com testes rigorosos e comissionamento
              </p>
            </div>

            <div className="text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary text-primary-foreground text-2xl font-bold mb-4">
                4
              </div>
              <h3 className="text-lg font-semibold mb-2 text-foreground">Suporte Contínuo</h3>
              <p className="text-muted-foreground text-sm">
                Manutenção preventiva e suporte técnico para garantir performance
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-primary">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold text-primary-foreground mb-6">
            Quer Ser Nosso Próximo Case de Sucesso?
          </h2>
          <p className="text-xl text-primary-foreground/90 mb-8 max-w-2xl mx-auto">
            Vamos conversar sobre seu projeto e desenvolver a melhor solução para você
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a 
              href="/contato"
              className="inline-flex items-center justify-center px-8 py-3 bg-accent text-accent-foreground hover:bg-accent/90 rounded-md font-semibold text-lg transition-colors shadow-accent"
            >
              Iniciar Meu Projeto
            </a>
            <a 
              href="https://wa.me/5531995266402?text=Olá,%20gostaria%20de%20solicitar%20um%20orçamento%20de%20geradores." 
              target="_blank" 
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center px-8 py-3 bg-transparent border-2 border-primary-foreground text-primary-foreground hover:bg-primary-foreground hover:text-primary rounded-md font-semibold text-lg transition-colors"
            >
              Falar no WhatsApp
            </a>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Projetos;
