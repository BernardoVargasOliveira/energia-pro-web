import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import generatorResidencial from "@/assets/gerador-residencial.png";
import geradorMediaPotencia from "@/assets/gerador-media-potencia.png";
import geradoresParalelo from "@/assets/geradores-paralelo.png";
import torreIluminacao from "@/assets/torre-iluminacao.png";

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
    title: "Baixa Potência",
    powerRange: "6,5 kVA até 45 kVA",
    description: "Soluções compactas para residências, comércios e pequenas empresas.",
    image: generatorResidencial,
  },
  {
    id: "media-potencia",
    title: "Média Potência",
    powerRange: "100 kVA até 450 kVA",
    description: "Ideal para indústrias de médio porte, hospitais e condomínios.",
    image: geradorMediaPotencia,
  },
  {
    id: "alta-potencia",
    title: "Alta Potência",
    powerRange: "500 kVA até 4.000 kVA",
    description: "Sistemas robustos para grandes instalações industriais. (geradores ligados em paralelo)",
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

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {homeProducts.map((product, index) => (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
            >
              <Card className="group overflow-hidden border-0 shadow-card h-full flex flex-col hover:shadow-elevated hover:-translate-y-3 transition-all duration-300 rounded-2xl bg-gradient-card">
                <div className="relative h-52 overflow-hidden bg-gradient-to-br from-primary/5 via-secondary/5 to-accent/5">
                  <div className="absolute inset-0 bg-gradient-to-t from-white/50 to-transparent z-10" />
                  <img
                    src={product.image}
                    alt={product.title}
                    className="w-full h-full object-contain p-4 group-hover:scale-110 transition-transform duration-500 relative z-0"
                  />
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
            )
          )}
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
