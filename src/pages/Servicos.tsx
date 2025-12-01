import { Battery, Wrench, Zap, HardHat, Headphones } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import geradoresTransporte from "@/assets/geradores-transporte.jpg";

const Servicos = () => {
  const services = [
    {
      icon: <Battery className="h-12 w-12" />,
      title: "Locação de Grupos Geradores",
      description: "Disponibilizamos grupos geradores de diversas potências para locação de curta, média e longa duração. Potência de 6 a 4000 kVA com geradores ligados em paralelo.",
      benefits: [
        "Equipamentos de última geração",
        "Flexibilidade de prazos",
        "Manutenção inclusa",
        "Instalação e desinstalação",
        "Suporte técnico 24h"
      ]
    },
    {
      icon: <Wrench className="h-12 w-12" />,
      title: "Manutenção Preventiva e Corretiva",
      description: "Realizamos manutenção completa em grupos geradores de todas as marcas e modelos.",
      benefits: [
        "Equipe técnica especializada",
        "Peças originais",
        "Diagnóstico preciso",
        "Relatórios detalhados",
        "Planos de manutenção customizados"
      ]
    },
    {
      icon: <HardHat className="h-12 w-12" />,
      title: "Serviços de Instalação",
      description: "Instalação completa de sistemas de geração de energia com técnicos especializados.",
      benefits: [
        "Projeto executivo detalhado",
        "Instalação elétrica e mecânica",
        "Testes",
        "Documentação técnica completa",
        "Certificação de segurança"
      ]
    },
    {
      icon: <Zap className="h-12 w-12" />,
      title: "Projetos de Sistemas de Geração de Energia",
      description: "Desenvolvimento de projetos completos de geração de energia adaptados às necessidades específicas de cada cliente.",
      benefits: [
        "Análise de demanda energética",
        "Dimensionamento adequado",
        "Estudo de viabilidade",
        "Projeto elétrico"
      ]
    },
    {
      icon: <Headphones className="h-12 w-12" />,
      title: "Assistência Técnica e Suporte",
      description: "Suporte técnico durante todo período da locação.",
      benefits: [
        "Atendimento emergencial",
        "Técnicos especializados",
        "Estoque de peças sobressalentes",
        "Diagnóstico remoto",
        "Cobertura nacional"
      ]
    },
  ];

  return (
    <div className="min-h-screen">
      {/* Header Section */}
      <section className="bg-gradient-primary py-16">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl md:text-5xl font-bold text-primary-foreground text-center mb-6">
            Nossos Serviços
          </h1>
          <p className="text-xl text-primary-foreground/90 text-center max-w-3xl mx-auto">
            Soluções completas em geração de energia para sua empresa
          </p>
        </div>
      </section>

      {/* Showcase Image */}
      <section className="py-12 bg-muted">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="relative rounded-lg overflow-hidden shadow-primary">
              <img 
                src={geradoresTransporte} 
                alt="Geradores PROJEMAC prontos para locação e entrega" 
                className="w-full h-[400px] object-cover"
              />
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-primary/95 to-transparent p-6">
                <h3 className="text-primary-foreground font-bold text-2xl mb-2">Equipamentos Prontos para Locação</h3>
                <p className="text-primary-foreground/90">Frota moderna com entrega e instalação em todo o Brasil</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-16 bg-background">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {services.map((service, index) => (
              <Card 
                key={index}
                className="border-2 hover:border-secondary transition-all duration-300 hover:shadow-primary animate-fade-in"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <CardHeader>
                  <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-gradient-primary text-primary-foreground mb-4">
                    {service.icon}
                  </div>
                  <CardTitle className="text-2xl">{service.title}</CardTitle>
                  <CardDescription className="text-base">{service.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <h4 className="font-semibold mb-3 text-foreground">Principais benefícios:</h4>
                  <ul className="space-y-2">
                    {service.benefits.map((benefit, idx) => (
                      <li key={idx} className="flex items-start gap-2 text-muted-foreground">
                        <span className="text-secondary mt-1">✓</span>
                        <span>{benefit}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-muted">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold text-foreground mb-6">
            Precisa de Mais Informações?
          </h2>
          <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
            Nossa equipe está pronta para ajudar você a encontrar a melhor solução em geração de energia
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild size="lg" className="bg-secondary text-secondary-foreground hover:bg-secondary/90 font-semibold">
              <Link to="/contato">Solicitar Orçamento</Link>
            </Button>
            <Button asChild size="lg" variant="outline" className="font-semibold">
              <a href="https://wa.me/553134953004" target="_blank" rel="noopener noreferrer">
                Falar no WhatsApp
              </a>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Servicos;
