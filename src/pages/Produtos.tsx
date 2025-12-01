import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import gerador500kva from "@/assets/gerador-500kva.jpg";
import geradoresTransporte from "@/assets/geradores-transporte.jpg";

const Produtos = () => {
  const products = [
    {
      category: "Geradores até 100 kVA",
      power: "20 kVA a 100 kVA",
      applications: ["Residências", "Pequenos comércios", "Consultórios", "Eventos pequenos"],
      features: [
        "Compactos e silenciosos",
        "Fácil transporte",
        "Baixo consumo",
        "Operação automatizada",
        "Partida elétrica"
      ],
      badge: "Ideal para pequeno porte"
    },
    {
      category: "Geradores de 100 a 300 kVA",
      power: "100 kVA a 300 kVA",
      applications: ["Indústrias de médio porte", "Supermercados", "Condomínios", "Hotéis"],
      features: [
        "Alta confiabilidade",
        "Sistema de refrigeração eficiente",
        "Painel de controle digital",
        "Baixa emissão de ruído",
        "Autonomia estendida"
      ],
      badge: "Médio porte"
    },
    {
      category: "Geradores de 300 a 500 kVA",
      power: "300 kVA a 500 kVA",
      applications: ["Grandes indústrias", "Hospitais", "Shopping centers", "Data centers"],
      features: [
        "Alta performance",
        "Paralelismo disponível",
        "Monitoramento remoto",
        "Baixo consumo de combustível",
        "Manutenção facilitada"
      ],
      badge: "Grande porte"
    },
    {
      category: "Geradores acima de 500 kVA",
      power: "500 kVA a 2500+ kVA",
      applications: ["Grandes complexos industriais", "Mineração", "Usinas", "Megaprojetos"],
      features: [
        "Potência sob demanda",
        "Operação contínua",
        "Sistemas redundantes",
        "Controle supervisório",
        "Máxima eficiência energética"
      ],
      badge: "Alta potência"
    },
  ];

  const brands = [
    "Cummins",
    "Perkins",
    "MWM",
    "Scania",
    "Volvo",
    "FG Wilson",
    "Stemac",
    "GESAN"
  ];

  return (
    <div className="min-h-screen">
      {/* Header Section */}
      <section className="bg-gradient-primary py-16">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl md:text-5xl font-bold text-primary-foreground text-center mb-6">
            Produtos
          </h1>
          <p className="text-xl text-primary-foreground/90 text-center max-w-3xl mx-auto">
            Grupos geradores de energia de 20 kVA a 2500+ kVA
          </p>
        </div>
      </section>

      {/* Showcase Images */}
      <section className="py-12 bg-muted">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            <div className="relative rounded-lg overflow-hidden shadow-primary">
              <img 
                src={gerador500kva} 
                alt="Gerador PROJEMAC de 500 kVA" 
                className="w-full h-[300px] object-cover"
              />
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-primary/90 to-transparent p-4">
                <p className="text-primary-foreground font-semibold">Gerador de 500 kVA</p>
              </div>
            </div>
            <div className="relative rounded-lg overflow-hidden shadow-primary">
              <img 
                src={geradoresTransporte} 
                alt="Geradores PROJEMAC em transporte" 
                className="w-full h-[300px] object-cover"
              />
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-primary/90 to-transparent p-4">
                <p className="text-primary-foreground font-semibold">Logística e Entrega</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Products Grid */}
      <section className="py-16 bg-background">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-foreground mb-4">
              Encontre o Gerador Ideal para Sua Necessidade
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Trabalhamos com as melhores marcas do mercado e oferecemos soluções para todos os portes de empresas
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
            {products.map((product, index) => (
              <Card 
                key={index}
                className="border hover:border-secondary transition-all duration-300 bg-card/80 backdrop-blur-sm animate-fade-in"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <CardHeader>
                  <div className="flex items-start justify-between mb-3">
                    <CardTitle className="text-2xl leading-tight">{product.category}</CardTitle>
                    <Badge variant="secondary" className="bg-accent text-accent-foreground shadow-sm">
                      {product.badge}
                    </Badge>
                  </div>
                  <CardDescription className="text-lg font-semibold text-secondary">
                    Faixa de potência: {product.power}
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-5">
                  <div>
                    <h4 className="font-semibold mb-3 text-foreground text-base">Aplicações típicas:</h4>
                    <ul className="space-y-2">
                      {product.applications.map((app, idx) => (
                        <li key={idx} className="flex items-center gap-2 text-muted-foreground text-[15px] leading-relaxed">
                          <span className="text-secondary">•</span>
                          {app}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-semibold mb-3 text-foreground text-base">Características principais:</h4>
                    <ul className="space-y-2">
                      {product.features.map((feature, idx) => (
                        <li key={idx} className="flex items-start gap-2 text-muted-foreground text-[15px] leading-relaxed">
                          <span className="text-secondary mt-1">✓</span>
                          <span>{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Brands Section */}
          <div className="bg-muted rounded-xl p-10 border border-border/50">
            <h3 className="text-3xl font-bold text-center text-foreground mb-10 leading-tight">
              Trabalhamos com as Melhores Marcas
            </h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-5">
              {brands.map((brand, index) => (
                <div 
                  key={index}
                  className="bg-card p-5 rounded-xl text-center font-semibold text-foreground shadow-md hover:shadow-lg hover:border-secondary border border-transparent transition-all duration-300 animate-fade-in"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  {brand}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Technical Info Section */}
      <section className="py-16 bg-muted">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center text-foreground mb-12">
            Informações Técnicas
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
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
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-background">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold text-foreground mb-6">
            Não Sabe Qual Gerador Escolher?
          </h2>
          <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
            Nossa equipe técnica pode ajudar você a dimensionar o equipamento ideal para sua necessidade
          </p>
          <Button asChild size="lg" className="bg-secondary text-secondary-foreground hover:bg-secondary/90 font-semibold">
            <Link to="/contato">Falar com um Especialista</Link>
          </Button>
        </div>
      </section>
    </div>
  );
};

export default Produtos;
