import { useEffect } from "react";
import { Battery, Wrench, Zap, HardHat, Headphones } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import equipamentosLocacao from "@/assets/equipamentos-locacao.jpg";
import frotaVeiculos from "@/assets/frota-veiculos.jpg";
import { motion } from "framer-motion";
import { PageHero } from "@/components/PageHero";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const Servicos = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  const services = [
    {
      icon: <Battery className="h-12 w-12" />,
      title: "Locação de Grupos Geradores",
      description: "Disponibilizamos grupos geradores de diversas potências para locação de curta, média e longa duração. Potência de 6 a 4000 kVA com geradores ligados em paralelo.",
      benefits: [
        "Equipamentos de última geração",
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
                src={equipamentosLocacao} 
                alt="Geradores PROJEMAC prontos para locação e entrega" 
                className="w-full h-[400px] object-cover object-[center_30%]"
              />
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-primary/95 to-transparent p-6">
                <h3 className="text-primary-foreground font-bold text-2xl mb-2">Equipamentos Prontos para Locação</h3>
                <p className="text-primary-foreground/90">Frota moderna com entrega e instalação em todo o Território de Minas Gerais</p>
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

      {/* FAQ Section */}
      <section className="w-full bg-background py-16">
        <div className="max-w-4xl mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: "easeOut" }}
          >
            <h2 className="text-2xl md:text-3xl font-bold text-slate-900 text-center">
              Perguntas Frequentes
            </h2>
            <p className="mt-2 text-sm md:text-base text-slate-600 text-center">
              Respostas para as dúvidas mais comuns sobre nossos serviços
            </p>
            
            <div className="mt-10 bg-white rounded-2xl shadow-lg border border-slate-100 p-4 md:p-6 lg:p-8">
              <Accordion type="single" collapsible>
                <div className="border-b border-slate-100">
                  <AccordionItem value="item-1" className="border-0">
                    <AccordionTrigger className="w-full flex items-center justify-between py-4 text-left group hover:no-underline">
                      <span className="text-sm md:text-base font-medium text-slate-800 group-hover:text-primary transition-colors">
                        Quais são os prazos disponíveis para locação?
                      </span>
                    </AccordionTrigger>
                    <AccordionContent className="pb-4 text-xs md:text-sm text-slate-600 leading-relaxed">
                      Oferecemos locação de curta, média e longa duração, com flexibilidade total para atender suas necessidades. 
                      Os prazos podem variar desde locações diárias para eventos até contratos de meses ou anos para projetos industriais. 
                      Nossa equipe trabalha com você para definir o prazo ideal.
                    </AccordionContent>
                  </AccordionItem>
                </div>

                <div className="border-b border-slate-100">
                  <AccordionItem value="item-2" className="border-0">
                    <AccordionTrigger className="w-full flex items-center justify-between py-4 text-left group hover:no-underline">
                      <span className="text-sm md:text-base font-medium text-slate-800 group-hover:text-primary transition-colors">
                        A instalação está incluída no serviço de locação?
                      </span>
                    </AccordionTrigger>
                    <AccordionContent className="pb-4 text-xs md:text-sm text-slate-600 leading-relaxed">
                      Sim, nosso serviço inclui instalação e desinstalação completa dos equipamentos. 
                      Contamos com uma equipe técnica especializada que realiza todo o processo de mobilização e desmobilização, 
                      garantindo que o gerador esteja operacional e seguro desde o primeiro momento.
                    </AccordionContent>
                  </AccordionItem>
                </div>

                <div className="border-b border-slate-100">
                  <AccordionItem value="item-3" className="border-0">
                    <AccordionTrigger className="w-full flex items-center justify-between py-4 text-left group hover:no-underline">
                      <span className="text-sm md:text-base font-medium text-slate-800 group-hover:text-primary transition-colors">
                        Vocês oferecem manutenção durante o período de locação?
                      </span>
                    </AccordionTrigger>
                    <AccordionContent className="pb-4 text-xs md:text-sm text-slate-600 leading-relaxed">
                      Sim, a manutenção preventiva está inclusa em todos os nossos contratos de locação. 
                      Além disso, oferecemos suporte técnico especializado durante todo o período da locação, 
                      com diagnóstico remoto e atendimento presencial quando necessário em todo o Território de Minas Gerais.
                    </AccordionContent>
                  </AccordionItem>
                </div>

                <div className="border-b border-slate-100">
                  <AccordionItem value="item-4" className="border-0">
                    <AccordionTrigger className="w-full flex items-center justify-between py-4 text-left group hover:no-underline">
                      <span className="text-sm md:text-base font-medium text-slate-800 group-hover:text-primary transition-colors">
                        Qual é a potência disponível dos geradores?
                      </span>
                    </AccordionTrigger>
                    <AccordionContent className="pb-4 text-xs md:text-sm text-slate-600 leading-relaxed">
                      Disponibilizamos grupos geradores de 6 a 4000 kVA, com possibilidade de ligação em paralelo para 
                      potências ainda maiores. Nossos equipamentos são de última geração e atendem desde pequenos estabelecimentos 
                      comerciais até grandes complexos industriais.
                    </AccordionContent>
                  </AccordionItem>
                </div>

                <div className="border-b border-slate-100">
                  <AccordionItem value="item-5" className="border-0">
                    <AccordionTrigger className="w-full flex items-center justify-between py-4 text-left group hover:no-underline">
                      <span className="text-sm md:text-base font-medium text-slate-800 group-hover:text-primary transition-colors">
                        Como funciona o processo de dimensionamento do gerador?
                      </span>
                    </AccordionTrigger>
                    <AccordionContent className="pb-4 text-xs md:text-sm text-slate-600 leading-relaxed">
                      Nosso engenheiro eletricista responsável realiza uma análise completa da demanda energética do seu projeto. 
                      Fazemos um estudo de viabilidade e dimensionamento adequado para garantir que o equipamento atenda 
                      perfeitamente às suas necessidades, sem superdimensionamento ou subdimensionamento.
                    </AccordionContent>
                  </AccordionItem>
                </div>

                <div className="last:border-b-0">
                  <AccordionItem value="item-6" className="border-0">
                    <AccordionTrigger className="w-full flex items-center justify-between py-4 text-left group hover:no-underline">
                      <span className="text-sm md:text-base font-medium text-slate-800 group-hover:text-primary transition-colors">
                        Qual é a área de cobertura dos serviços?
                      </span>
                    </AccordionTrigger>
                    <AccordionContent className="pb-4 text-xs md:text-sm text-slate-600 leading-relaxed">
                      Atendemos em todo o Território de Minas Gerais com nossa frota moderna de equipamentos. 
                      Nossa sede está localizada em Belo Horizonte - MG, e contamos com logística especializada 
                      para entrega, instalação e suporte técnico em qualquer região do estado.
                    </AccordionContent>
                  </AccordionItem>
                </div>
              </Accordion>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Fleet Section */}
      <section className="py-12 bg-muted">
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
                src={frotaVeiculos} 
                alt="Frota de veículos da PROJEMAC para suporte técnico" 
                className="w-full h-[400px] object-cover"
              />
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-secondary/95 to-transparent p-6">
                <h3 className="text-white font-bold text-2xl mb-2">Frota Especializada</h3>
                <p className="text-white/90">Veículos equipados para atendimento técnico rápido e eficiente</p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-primary">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold text-primary-foreground mb-6">
            Precisa de Mais Informações?
          </h2>
          <p className="text-xl text-primary-foreground/90 mb-8 max-w-2xl mx-auto">
            Nossa equipe está pronta para apresentar a melhor solução em geração de energia
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a 
              href="/contato"
              className="inline-flex items-center justify-center px-8 py-3 bg-accent text-accent-foreground hover:bg-accent/90 rounded-md font-semibold text-lg transition-colors shadow-accent"
            >
              Solicitar Orçamento
            </a>
            <a 
              href="https://wa.me/553134953004?text=Olá,%20gostaria%20de%20solicitar%20um%20orçamento%20de%20geradores." 
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

export default Servicos;
