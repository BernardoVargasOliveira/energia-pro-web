import { useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import gerador500kva from "@/assets/gerador-500kva.jpg";
import logisticaEntrega from "@/assets/logistica-entrega.jpeg";
// @ts-ignore
import gerador500kvaSrcset from "@/assets/gerador-500kva.jpg?w=640;800&format=webp&as=srcset";
// @ts-ignore
import logisticaEntregaSrcset from "@/assets/logistica-entrega.jpeg?w=640;1024;1600&format=webp&as=srcset";
import { motion } from "framer-motion";
import { PageHero } from "@/components/PageHero";
import { Zap, Lightbulb, Gauge, Sun, CheckCircle2, ArrowRight } from "lucide-react";

const Produtos = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  
  const products = [
    {
      category: "Geradores Portáteis",
      power: "6 a 12 kVA",
      description: "Soluções compactas e práticas para aplicações leves e uso temporário.",
      applications: ["Residências", "Pequenos comércios", "Obras leves", "Uso emergencial"],
      features: [
        "Compactos e fáceis de transportar",
        "Baixo consumo de combustível",
        "Operação simples e prática",
        "Ideal para uso temporário",
        "Partida manual ou elétrica"
      ],
      badge: "Baixa potência",
      icon: Zap,
      slug: "geradores-portateis"
    },
    {
      category: "Geradores de Porte Médio",
      power: "50 a 180 kVA",
      description: "Equipamentos robustos para operações comerciais e industriais de médio porte.",
      applications: ["Indústrias de médio porte", "Condomínios residenciais e comerciais", "Supermercados", "Shows, Feiras, Exposições, Eventos em geral", "Obras e canteiros industriais"],
      features: [
        "Alta confiabilidade operacional",
        "Sistema de refrigeração eficiente",
        "Painel de controle digital",
        "Baixa emissão de ruído",
        "Operação contínua ou standby"
      ],
      badge: "Médio porte",
      icon: Gauge,
      slug: "geradores-medio-porte"
    },
    {
      category: "Geradores de Grande Porte",
      power: "220 a 500 kVA",
      description: "Soluções de alta performance para aplicações críticas e grandes operações.",
      applications: ["Grandes indústrias", "Shows, Feiras, Exposições, Eventos em geral", "Shopping centers", "Centros logísticos", "Data centers"],
      features: [
        "Alto desempenho e robustez",
        "Preparados para operação contínua",
        "Possibilidade de paralelismo",
        "Monitoramento e controle avançado",
        "Baixo consumo específico de combustível"
      ],
      badge: "Grande porte",
      icon: Sun,
      slug: "geradores-grande-porte"
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
      icon: Sun,
      slug: "usina-energia"
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
                srcSet={gerador500kvaSrcset}
                sizes="(max-width: 768px) 100vw, 50vw"
                alt="Gerador PROJEMAC de 500 kVA"
                className="w-full h-[300px] object-cover"
                loading="lazy"
                width={800}
                height={445}
              />
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-primary/90 to-transparent p-4">
                <p className="text-primary-foreground font-semibold">Gerador de 500 kVA</p>
              </div>
            </div>
            <div className="relative rounded-lg overflow-hidden shadow-primary">
              <img
                src={logisticaEntrega}
                srcSet={logisticaEntregaSrcset}
                sizes="(max-width: 768px) 100vw, 50vw"
                alt="Geradores PROJEMAC em transporte"
                className="w-full h-[300px] object-cover"
                loading="lazy"
                width={1600}
                height={1204}
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
                  <Link to={`/produtos/${product.slug}`} className="block h-full focus:outline-none focus-visible:ring-2 focus-visible:ring-secondary rounded-2xl">
                  <Card className="bg-gradient-card border-0 shadow-card h-full group hover:shadow-elevated hover:-translate-y-2 transition-all duration-300 rounded-2xl overflow-hidden cursor-pointer">
                  <CardHeader className="relative pt-8">
                    <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-primary via-secondary to-accent" aria-hidden="true" />
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex items-center gap-3">
                        <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary to-secondary flex items-center justify-center text-white group-hover:scale-110 transition-transform duration-300">
                          <IconComponent className="w-6 h-6" />
                        </div>
                        <CardTitle className="text-2xl group-hover:text-secondary transition-colors duration-300">{product.category}</CardTitle>
                      </div>
                      <Badge variant="secondary" className="bg-accent text-accent-foreground font-bold rounded-full shrink-0">
                        {product.badge}
                      </Badge>
                    </div>
                    <CardDescription className="text-base font-semibold text-secondary">
                      Faixa de potência: {product.power}
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <h4 className="font-semibold mb-2 text-foreground">Aplicações típicas:</h4>
                      <ul className="space-y-1">
                        {product.applications.map((app, idx) => (
                          <li key={idx} className="flex items-center gap-2 text-muted-foreground">
                            <span className="w-1.5 h-1.5 rounded-full bg-secondary shrink-0" />
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
                    <div className="pt-2 border-t border-border/50">
                      <span className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.15em] text-foreground/60 group-hover:text-secondary transition-colors duration-300 pt-2">
                        Saiba mais
                        <ArrowRight className="w-4 h-4 translate-x-0 group-hover:translate-x-2 transition-transform duration-300" />
                      </span>
                    </div>
                  </CardContent>
                </Card>
                  </Link>
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
            <Link to="/produtos/torres-iluminacao" className="block focus:outline-none focus-visible:ring-2 focus-visible:ring-secondary rounded-2xl">
            <Card className="bg-gradient-card border-0 shadow-card hover:shadow-elevated hover:-translate-y-1 transition-all duration-300 rounded-2xl overflow-hidden group cursor-pointer">
              <CardHeader className="relative pt-8">
                <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-accent via-primary to-secondary" aria-hidden="true" />
                <div className="flex items-start gap-4 mb-2">
                  <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-accent to-accent-dark flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform duration-300">
                    <Lightbulb className="w-8 h-8 text-primary" />
                  </div>
                  <div>
                    <CardTitle className="text-3xl text-primary group-hover:text-secondary transition-colors duration-300">{torresIluminacao.category}</CardTitle>
                    <CardDescription className="text-base mt-2 leading-relaxed">
                      {torresIluminacao.description}
                    </CardDescription>
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
                <div className="mt-6 pt-6 border-t flex items-center justify-between">
                  <Button asChild className="bg-accent hover:bg-accent/90 text-accent-foreground rounded-full font-semibold transition-all duration-300 hover:shadow-accent-glow hover:-translate-y-0.5 min-h-[44px]">
                    <Link to="/contato" onClick={(e) => e.stopPropagation()}>
                      Solicitar Orçamento
                    </Link>
                  </Button>
                  <span className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.15em] text-foreground/60 group-hover:text-secondary transition-colors duration-300">
                    Saiba mais
                    <ArrowRight className="w-4 h-4 translate-x-0 group-hover:translate-x-2 transition-transform duration-300" />
                  </span>
                </div>
              </CardContent>
            </Card>
            </Link>
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
              <Card className="bg-gradient-card border-0 shadow-card hover:shadow-elevated hover:-translate-y-1 transition-all duration-300 rounded-2xl overflow-hidden">
              <CardHeader className="relative pt-7">
                <div className="absolute top-0 left-0 right-0 h-0.5 bg-gradient-to-r from-primary to-secondary" aria-hidden="true" />
                <CardTitle>Combustível</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-muted-foreground">
                  <li className="flex items-center gap-2"><span className="w-1.5 h-1.5 rounded-full bg-secondary shrink-0" />Diesel</li>
                  <li className="flex items-center gap-2"><span className="w-1.5 h-1.5 rounded-full bg-secondary shrink-0" />Gasolina</li>
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
              <Card className="bg-gradient-card border-0 shadow-card hover:shadow-elevated hover:-translate-y-1 transition-all duration-300 rounded-2xl overflow-hidden">
              <CardHeader className="relative pt-7">
                <div className="absolute top-0 left-0 right-0 h-0.5 bg-gradient-to-r from-secondary to-accent" aria-hidden="true" />
                <CardTitle>Tensões Disponíveis</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-muted-foreground">
                  <li className="flex items-center gap-2"><span className="w-1.5 h-1.5 rounded-full bg-secondary shrink-0" />110/220V monofásico</li>
                  <li className="flex items-center gap-2"><span className="w-1.5 h-1.5 rounded-full bg-secondary shrink-0" />220/380V/440v trifásico</li>
                  <li className="flex items-center gap-2"><span className="w-1.5 h-1.5 rounded-full bg-secondary shrink-0" />220/380V/440v</li>
                  <li className="flex items-center gap-2"><span className="w-1.5 h-1.5 rounded-full bg-secondary shrink-0" />Tensões especiais sob consulta</li>
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
              <Card className="bg-gradient-card border-0 shadow-card hover:shadow-elevated hover:-translate-y-1 transition-all duration-300 rounded-2xl overflow-hidden">
              <CardHeader className="relative pt-7">
                <div className="absolute top-0 left-0 right-0 h-0.5 bg-gradient-to-r from-accent to-primary" aria-hidden="true" />
                <CardTitle>Recursos Adicionais</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-muted-foreground">
                  <li className="flex items-center gap-2"><span className="w-1.5 h-1.5 rounded-full bg-accent shrink-0" />QTA (Quadro de Transferência Automática)</li>
                  <li className="flex items-center gap-2"><span className="w-1.5 h-1.5 rounded-full bg-accent shrink-0" />Sistema de paralelismo</li>
                  <li className="flex items-center gap-2"><span className="w-1.5 h-1.5 rounded-full bg-accent shrink-0" />Monitoramento remoto</li>
                  <li className="flex items-center gap-2"><span className="w-1.5 h-1.5 rounded-full bg-accent shrink-0" />Tanques de combustível com bacias de contenção</li>
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

export default Produtos;
