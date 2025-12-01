import { Battery, Wrench, Zap, HardHat, Headphones } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import geradoresTransporte from "@/assets/geradores-transporte.jpg";
import { motion } from "framer-motion";
import { PageHero } from "@/components/PageHero";

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
        "Mobilização e desmobilização dos geradores locados",
        "Equipe técnica especializada",
        "Engenheiro eletricista responsável técnico dos equipamentos"
      ]
    },
    {
      icon: <HardHat className="h-12 w-12" />,
      title: "Serviços de Instalação",
      description: "Instalação completa de sistemas de geração de energia com técnicos especializados.",
      benefits: [
        "Projeto executivo detalhado",
        "Instalação elétrica e mecânica",
        "Testes"
      ]
    },
    {
      icon: <Zap className="h-12 w-12" />,
      title: "Projetos de Sistemas de Geração de Energia",
      description: "Execução de projetos completos de geração de energia adaptados às necessidades específicas de cada cliente.",
      benefits: [
        "Análise de demanda energética",
        "Dimensionamento adequado",
        "Estudo de viabilidade",
        "Execução de projeto elétrico"
      ]
    },
    {
      icon: <Headphones className="h-12 w-12" />,
      title: "Assistência Técnica e Suporte",
      description: "Suporte técnico durante todo período da locação.",
      benefits: [
        "Técnicos especializados",
        "Diagnóstico remoto",
        "Cobertura em todo estado de Minas Gerais"
      ]
    },
  ];

  return (
    <div className="min-h-screen">
      <PageHero 
        title="Nossos Serviços"
        subtitle="Soluções completas em geração de energia para sua empresa"
      />

      {/* Showcase Image */}
      <section className="py-12 bg-muted mt-8 md:mt-10">
        <div className="container mx-auto px-4">
          <motion.div 
            className="max-w-4xl mx-auto"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: "easeOut" }}
          >
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
          </motion.div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-16 bg-background mt-8 md:mt-10">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {services.map((service, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, ease: "easeOut", delay: index * 0.1 }}
              >
                <Card className="border-2 hover:border-secondary h-full">
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
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-muted">
        <div className="container mx-auto px-4 text-center">
          <motion.h2 
            className="text-3xl font-bold text-foreground mb-6"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: "easeOut" }}
          >
            Precisa de Mais Informações?
          </motion.h2>
          <motion.p 
            className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: "easeOut", delay: 0.1 }}
          >
            Nossa equipe está pronta para ajudar você a encontrar a melhor solução em geração de energia
          </motion.p>
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
