import { useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import gerador500kva from "@/assets/gerador-500kva.jpg";
import logisticaEntrega from "@/assets/logistica-entrega.jpeg";
import { motion } from "framer-motion";
import { PageHero } from "@/components/PageHero";
import { Zap, Lightbulb, Gauge, Sun, CheckCircle2 } from "lucide-react";

const Produtos = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  
  const products = [
    {
      category: "Geradores Portáteis",
      power: "6 a 12 kVA",
      description: "Soluções compactas e práticas para aplicações leves e uso temporário.",
      applications: ["Residências", "Pequenos comércios", "Obras leves", "Eventos de pequeno porte", "Uso emergencial"],
      features: [
        "Compactos e fáceis de transportar",
        "Baixo consumo de combustível",
        "Operação simples e prática",
        "Ideal para uso temporário",
        "Partida manual ou elétrica"
      ],
      badge: "Baixa potência",
      icon: Zap
    },
    {
      category: "Geradores de Porte Médio",
      power: "50 a 180 kVA",
      description: "Equipamentos robustos para operações comerciais e industriais de médio porte.",
      applications: ["Indústrias de médio porte", "Condomínios residenciais e comerciais", "Supermercados", "Hospitais de pequeno e médio porte", "Obras e canteiros industriais"],
      features: [
        "Alta confiabilidade operacional",
        "Sistema de refrigeração eficiente",
        "Painel de controle digital",
        "Baixa emissão de ruído",
        "Operação contínua ou standby"
      ],
      badge: "Médio porte",
      icon: Gauge
    },
    {
      category: "Geradores de Grande Porte",
      power: "220 a 500 kVA",
      description: "Soluções de alta performance para aplicações críticas e grandes operações.",
      applications: ["Grandes indústrias", "Hospitais de grande porte", "Shopping centers", "Centros logísticos", "Data centers"],
      features: [
        "Alto desempenho e robustez",
        "Preparados para operação contínua",
        "Possibilidade de paralelismo",
        "Monitoramento e controle avançado",
        "Baixo consumo específico de combustível"
      ],
      badge: "Grande porte",
      icon: Sun
    },
    {
      category: "Usinas de Energia",
      power: "Acima de 500 kVA",
      description: "Sistemas de alta capacidade com geradores operando em paralelo.",
      applications: ["Usinas industriais", "Mineração", "Grandes obras de infraestrutura", "Complexos industriais", "Operações críticas de grande escala"],
      features: [
        "Geradores ligados em paralelo",
        "Alta disponibilidade e redundância",
        "Controle e supervisão automatizados",
        "Operação contínua 24/7",
        "Máxima eficiência energética"
      ],
      badge: "Alta potência",
      icon: Sun
    },
  ];

  const torresIluminacao = {
    category: "Torres de Iluminação",
    description: "Iluminação eficiente e autônoma para operações noturnas.",
    applications: ["Obras", "Eventos", "Mineração", "Pátios logísticos", "Operações noturnas"],
    features: [
      "Alta potência luminosa",
      "Baixo consumo",
      "Fácil transporte",
      "Operação autônoma",
      "Ideal para áreas externas"
    ],
    icon: Lightbulb
  };


  return (
    <div className="min-h-screen">
      <PageHero 
        title="Produtos"
        subtitle="Grupos geradores de energia de 6 kVA a 4000+ kVA e torres de iluminação. Soluções completas em geração de energia e iluminação, com equipamentos robustos para aplicações portáteis, industriais e grandes operações."
      />

      {/* Showcase Images */}
      <section className="py-12 bg-muted mt-8 md:mt-10">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            <div className="relative rounded-lg overflow-hidden shadow-primary">
              <img
                src={gerador500kva}
                alt="Gerador PROJEMAC de 500 kVA"
                className="w-full h-[300px] object-cover"
                loading="lazy"
              />
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-primary/90 to-transparent p-4">
                <p className="text-primary-foreground font-semibold">Gerador de 500 kVA</p>
              </div>
            </div>
            <div className="relative rounded-lg overflow-hidden shadow-primary">
              <img
                src={logisticaEntrega}
                alt="Geradores PROJEMAC em transporte"
                className="w-full h-[300px] object-cover"
                loading="lazy"
              />
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-primary/90 to-transparent p-4">
                <p className="text-primary-foreground font-semibold">Logística e Entrega</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Products Grid */}
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
              Encontre a Solução Ideal para Sua Necessidade
            </h2>
            <p className="text-muted-foreground max-w-3xl mx-auto">
              Trabalhamos com as melhores marcas do mercado e oferecemos soluções completas para todos os portes de empresas.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
            {products.map((product, index) => {
              const IconComponent = product.icon;
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, ease: "easeOut", delay: index * 0.1 }}
                >
                  <Card className="border-2 hover:border-secondary h-full transition-all duration-300 hover:shadow-lg">
                  <CardHeader>
                    <div className="flex items-start justify-between mb-2">
                      <div className="flex items-center gap-3">
                        <div className="bg-primary/10 p-2 rounded-lg">
                          <IconComponent className="w-6 h-6 text-primary" />
                        </div>
                        <CardTitle className="text-2xl">{product.category}</CardTitle>
                      </div>
                      <Badge variant="secondary" className="bg-accent text-accent-foreground">
                        {product.badge}
                      </Badge>
                    </div>
                    <CardDescription className="text-lg font-semibold text-secondary">
                      Faixa de potência: {product.power}
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <h4 className="font-semibold mb-2 text-foreground">Aplicações típicas:</h4>
                      <ul className="space-y-1">
                        {product.applications.map((app, idx) => (
                          <li key={idx} className="flex items-center gap-2 text-muted-foreground">
                            <span className="text-secondary">•</span>
                            {app}
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div>
                      <h4 className="font-semibold mb-2 text-foreground">Características principais:</h4>
                      <ul className="space-y-1">
                        {product.features.map((feature, idx) => (
                          <li key={idx} className="flex items-start gap-2 text-muted-foreground">
                            <CheckCircle2 className="w-4 h-4 text-secondary mt-0.5 flex-shrink-0" />
                            <span>{feature}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </CardContent>
                </Card>
                </motion.div>
              );
            })}
          </div>

          {/* Torres de Iluminação Section */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="mb-16"
          >
            <Card className="border-2 border-accent hover:border-secondary transition-all duration-300 hover:shadow-lg bg-gradient-to-br from-accent/5 to-transparent">
              <CardHeader>
                <div className="flex items-start justify-between mb-2">
                  <div className="flex items-center gap-3">
                    <div className="bg-accent/20 p-3 rounded-lg">
                      <Lightbulb className="w-8 h-8 text-accent" />
                    </div>
                    <div>
                      <CardTitle className="text-3xl text-primary">{torresIluminacao.category}</CardTitle>
                      <CardDescription className="text-base mt-2">
                        {torresIluminacao.description}
                      </CardDescription>
                    </div>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div>
                    <h4 className="font-semibold mb-3 text-foreground flex items-center gap-2">
                      <Zap className="w-5 h-5 text-secondary" />
                      Aplicações:
                    </h4>
                    <ul className="space-y-2">
                      {torresIluminacao.applications.map((app, idx) => (
                        <li key={idx} className="flex items-center gap-2 text-muted-foreground">
                          <span className="w-2 h-2 bg-accent rounded-full" />
                          {app}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-semibold mb-3 text-foreground flex items-center gap-2">
                      <CheckCircle2 className="w-5 h-5 text-secondary" />
                      Características principais:
                    </h4>
                    <ul className="space-y-2">
                      {torresIluminacao.features.map((feature, idx) => (
                        <li key={idx} className="flex items-start gap-2 text-muted-foreground">
                          <CheckCircle2 className="w-4 h-4 text-accent mt-0.5 flex-shrink-0" />
                          <span>{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
                <div className="mt-6 pt-6 border-t">
                  <Button asChild className="bg-accent hover:bg-accent/90 text-accent-foreground">
                    <Link to="/contato">
                      Solicitar Orçamento
                    </Link>
                  </Button>
                </div>
              </CardContent>
            </Card>
          </motion.div>

        </div>
      </section>

      {/* Technical Info Section */}
      <section className="py-16 bg-muted">
        <div className="container mx-auto px-4">
          <motion.h2 
            className="text-3xl font-bold text-center text-foreground mb-12"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: "easeOut" }}
          >
            Informações Técnicas
          </motion.h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, ease: "easeOut", delay: 0.1 }}
            >
              <Card>
              <CardHeader>
                <CardTitle>Combustível</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-muted-foreground">
                  <li>• Diesel</li>
                  <li>• Gás natural</li>
                  <li>• Biocombustível</li>
                  <li>• Dual fuel (diesel/gás)</li>
                </ul>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, ease: "easeOut", delay: 0.2 }}
            >
              <Card>
              <CardHeader>
                <CardTitle>Tensões Disponíveis</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-muted-foreground">
                  <li>• 127/220V monofásico</li>
                  <li>• 220/380V trifásico</li>
                  <li>• 127/220/380V</li>
                  <li>• Tensões especiais sob consulta</li>
                </ul>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, ease: "easeOut", delay: 0.3 }}
            >
              <Card>
              <CardHeader>
                <CardTitle>Recursos Adicionais</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-muted-foreground">
                  <li>• QTA (Quadro de Transferência Automática)</li>
                  <li>• Sistema de paralelismo</li>
                  <li>• Monitoramento remoto</li>
                  <li>• Tanques de combustível ampliados</li>
                </ul>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-primary">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold text-primary-foreground mb-6">
            Não Sabe Qual Solução Escolher?
          </h2>
          <p className="text-xl text-primary-foreground/90 mb-8 max-w-2xl mx-auto">
            Nossa equipe técnica pode ajudar você a dimensionar o equipamento ideal para sua necessidade
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a 
              href="/contato"
              className="inline-flex items-center justify-center px-8 py-3 bg-accent text-accent-foreground hover:bg-accent/90 rounded-md font-semibold text-lg transition-colors shadow-accent"
            >
              Solicitar Orçamento
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

export default Produtos;
