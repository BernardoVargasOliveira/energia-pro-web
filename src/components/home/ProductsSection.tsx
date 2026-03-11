import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import geradorPortatil from "@/assets/gerador-portatil.png";
import geradorMediaPotencia from "@/assets/gerador-media-potencia.png";
import geradorGrandePorte from "@/assets/gerador-grande-porte.png";
import geradoresParalelo from "@/assets/geradores-paralelo.png";
import torreIluminacao from "@/assets/torre-iluminacao-nobg.png";

interface Product {
  id: string;
  name: string;
  category: string;
  power_range: string | null;
  applications: string[] | null;
  features: string[] | null;
  image_url: string | null;
}

interface ProductsSectionProps {
  products: Product[];
}

// Cards fixos para exibição na home
const homeProducts = [
  {
    id: "baixa-potencia",
    title: "Geradores Portáteis",
    powerRange: "6 a 12 kVA",
    description: "Soluções compactas para residências, comércios e pequenas empresas.",
    image: geradorPortatil,
  },
  {
    id: "media-potencia",
    title: "Geradores de Médio Porte",
    powerRange: "50 a 180 kVA",
    description: "Ideal para indústrias de médio porte, hospitais e condomínios.",
    image: geradorMediaPotencia,
  },
  {
    id: "grande-porte",
    title: "Geradores de Grande Porte",
    powerRange: "220 a 500 kVA",
    description: "Sistemas robustos para grandes instalações industriais.",
    image: geradorGrandePorte,
  },
  {
    id: "usina-energia",
    title: "Usina de Energia",
    powerRange: "500 a 5.000 kVA",
    description: "Sistemas de alta capacidade com geradores ligados em paralelo.",
    image: geradoresParalelo,
  },
  {
    id: "torres-iluminacao",
    title: "Torres de Iluminação",
    powerRange: null,
    description: "Iluminação eficiente e autônoma para obras, eventos e operações noturnas.",
    image: torreIluminacao,
  },
];

const ProductsSection = ({ products }: ProductsSectionProps) => {
  return (
    <section className="py-28 bg-gradient-surface relative overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute top-0 left-1/4 w-64 h-64 bg-accent/5 rounded-full blur-3xl" />
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-secondary/5 rounded-full blur-3xl" />
      
      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          className="text-center mb-20"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-5xl md:text-6xl lg:text-7xl font-bold mb-6">
            <span className="text-foreground">Nossos </span>
            <span className="text-gradient-primary">Produtos</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            Grupos geradores e soluções de iluminação para todos os tipos de aplicação
          </p>
        </motion.div>

        {/* Primeira linha - 3 cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-6">
          {homeProducts.slice(0, 3).map((product, index) => (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
            >
              <Card className="group overflow-hidden border-0 shadow-card h-full flex flex-col hover:shadow-elevated hover:-translate-y-3 transition-all duration-300 rounded-2xl bg-gradient-card">
                <div className="relative h-52 overflow-hidden bg-muted/30">
                  <div className="absolute inset-0 bg-primary/0 group-hover:bg-primary/10 transition-all duration-300 z-10" />
                  {product.image ? (
                    <img
                      src={product.image}
                      alt={product.title}
                      className="w-full h-full object-contain p-4 group-hover:scale-105 transition-transform duration-300 ease-in-out"
                      loading="lazy"
                      width={500}
                      height={500}
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center">
                      <div className="text-muted-foreground/40 text-sm text-center px-4">
                        Imagem em breve
                      </div>
                    </div>
                  )}
                  {product.powerRange && (
                    <div className="absolute top-3 right-3 bg-accent text-accent-foreground px-3 py-1 rounded-full text-xs font-bold shadow-accent z-20">
                      {product.powerRange}
                    </div>
                  )}
                </div>
                  
                <CardContent className="p-5 flex-1 flex flex-col relative">
                  <div className="absolute top-0 left-0 right-0 h-1 bg-accent" />
                  
                  <h3 className="text-xl font-bold text-primary mb-2 group-hover:text-secondary transition-colors">
                    {product.title}
                  </h3>
                  
                  <p className="text-muted-foreground text-sm mb-4 flex-1">
                    {product.description}
                  </p>

                  <Link 
                    to="/produtos" 
                    className="inline-flex items-center text-secondary hover:text-accent font-bold transition-colors group/link text-sm"
                  >
                    Saiba Mais
                    <ArrowRight className="ml-2 w-4 h-4 group-hover/link:translate-x-2 transition-transform" />
                  </Link>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Segunda linha - 2 cards centralizados */}
        <div className="flex justify-center gap-6 mb-12">
          {homeProducts.slice(3, 5).map((product, index) => (
            <motion.div
              key={product.id}
              className="w-full md:w-[calc(50%-12px)] lg:w-[calc(33.333%-16px)]"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: (index + 3) * 0.1 }}
            >
              <Card className="group overflow-hidden border-0 shadow-card h-full flex flex-col hover:shadow-elevated hover:-translate-y-3 transition-all duration-300 rounded-2xl bg-gradient-card">
                <div className="relative h-52 overflow-hidden bg-muted/30">
                  <div className="absolute inset-0 bg-primary/0 group-hover:bg-primary/10 transition-all duration-300 z-10" />
                  {product.image ? (
                    <img
                      src={product.image}
                      alt={product.title}
                      className="w-full h-full object-contain p-4 group-hover:scale-105 transition-transform duration-300 ease-in-out"
                      loading="lazy"
                      width={500}
                      height={500}
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center">
                      <div className="text-muted-foreground/40 text-sm text-center px-4">
                        Imagem em breve
                      </div>
                    </div>
                  )}
                  {product.powerRange && (
                    <div className="absolute top-3 right-3 bg-accent text-accent-foreground px-3 py-1 rounded-full text-xs font-bold shadow-accent z-20">
                      {product.powerRange}
                    </div>
                  )}
                </div>
                  
                <CardContent className="p-5 flex-1 flex flex-col relative">
                  <div className="absolute top-0 left-0 right-0 h-1 bg-accent" />
                  
                  <h3 className="text-xl font-bold text-primary mb-2 group-hover:text-secondary transition-colors">
                    {product.title}
                  </h3>
                  
                  <p className="text-muted-foreground text-sm mb-4 flex-1">
                    {product.description}
                  </p>

                  <Link 
                    to="/produtos" 
                    className="inline-flex items-center text-secondary hover:text-accent font-bold transition-colors group/link text-sm"
                  >
                    Saiba Mais
                    <ArrowRight className="ml-2 w-4 h-4 group-hover/link:translate-x-2 transition-transform" />
                  </Link>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        <motion.div
          className="text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          <Button asChild size="lg" className="bg-gradient-to-r from-primary to-secondary hover:from-primary-light hover:to-secondary-light text-white font-semibold shadow-primary hover:shadow-primary-lg transition-all duration-300">
            <Link to="/produtos">
              Ver Todos os Produtos
              <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
          </Button>
        </motion.div>
      </div>
    </section>
  );
};

export default ProductsSection;
