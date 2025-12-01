import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { CheckCircle } from "lucide-react";
import geradorEvento from "@/assets/gerador-evento.jpg";

const Projetos = () => {
  const projects = [
    {
      title: "Indústria Farmacêutica - MG",
      sector: "Indústria",
      challenge: "Necessidade de energia ininterrupta para processos críticos de fabricação de medicamentos que não podem sofrer qualquer tipo de interrupção.",
      solution: "Instalação de sistema com 2 geradores de 500 kVA em paralelismo com redundância N+1, QTA e monitoramento remoto 24h.",
      result: "Zero tempo de parada em 3 anos de operação, com economia de 40% em custos de energia de backup."
    },
    {
      title: "Shopping Center - SP",
      sector: "Comércio",
      challenge: "Grande demanda energética e necessidade de backup para mais de 200 lojas, praça de alimentação e sistemas de segurança.",
      solution: "Sistema com 3 geradores de 800 kVA em configuração 2N, com transição imperceptível e operação silenciosa.",
      result: "100% de disponibilidade durante eventos de falta de energia, mantendo todas as operações comerciais funcionando."
    },
    {
      title: "Hospital Regional - RJ",
      sector: "Saúde",
      challenge: "Fornecimento de energia para UTI, centro cirúrgico e equipamentos médicos críticos com zero tolerância a falhas.",
      solution: "Instalação de geradores de 1000 kVA com sistema UPS integrado, manutenção preventiva semanal e equipe de plantão 24h.",
      result: "Certificação de conformidade com normas hospitalares e zero incidentes relacionados à energia em 5 anos."
    },
    {
      title: "Festival de Música - Vários Estados",
      sector: "Eventos",
      challenge: "Fornecer energia para palcos, som, iluminação e infraestrutura de um festival itinerante com 3 dias de duração.",
      solution: "Locação de 8 geradores silenciosos de 250 kVA distribuídos estrategicamente, com equipe técnica no local.",
      result: "Evento realizado sem nenhuma interrupção de energia, com feedback positivo de produtores e artistas."
    },
    {
      title: "Condomínio Residencial de Alto Padrão - DF",
      sector: "Residencial",
      challenge: "Garantir conforto e segurança para 400 apartamentos, com áreas comuns incluindo academia, piscina e salão de festas.",
      solution: "Sistema de geração com 2 geradores de 350 kVA, acionamento automático e operação ultra-silenciosa.",
      result: "Valorização de 15% do imóvel devido à infraestrutura energética e satisfação total dos condôminos."
    },
    {
      title: "Data Center Tier III - MG",
      sector: "Tecnologia",
      challenge: "Infraestrutura crítica para hospedagem de servidores de grandes empresas, exigindo disponibilidade de 99.982%.",
      solution: "Implementação de sistema 2N com 4 geradores de 1500 kVA, monitoramento em tempo real e manutenção preditiva.",
      result: "Certificação Tier III mantida, com uptime de 99.99% e SLA cumprido em todos os contratos de clientes."
    },
  ];

  return (
    <div className="min-h-screen">
      {/* Header Section */}
      <section className="bg-gradient-primary py-16">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl md:text-5xl font-bold text-primary-foreground text-center mb-6">
            Projetos Realizados
          </h1>
          <p className="text-xl text-primary-foreground/90 text-center max-w-3xl mx-auto">
            Conheça alguns dos nossos cases de sucesso
          </p>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-12 bg-background">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 max-w-4xl mx-auto">
            <div className="text-center">
              <div className="text-4xl font-bold text-secondary mb-2">1000+</div>
              <p className="text-muted-foreground">Projetos Executados</p>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-secondary mb-2">500+</div>
              <p className="text-muted-foreground">Clientes Satisfeitos</p>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-secondary mb-2">99.9%</div>
              <p className="text-muted-foreground">Taxa de Sucesso</p>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-secondary mb-2">24/7</div>
              <p className="text-muted-foreground">Suporte Disponível</p>
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
                Manutenção preventiva e suporte técnico 24/7 para garantir performance
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
          <a 
            href="/contato"
            className="inline-flex items-center justify-center px-8 py-3 bg-accent text-accent-foreground hover:bg-accent/90 rounded-md font-semibold text-lg transition-colors shadow-accent"
          >
            Iniciar Meu Projeto
          </a>
        </div>
      </section>
    </div>
  );
};

export default Projetos;
