import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowRight, CheckCircle2 } from "lucide-react";
import { Link } from "react-router-dom";
import generatorResidencial from "@/assets/gerador-residencial.png";
import generatorIndustrial from "@/assets/gerador-industrial.png";
import generatorAltaPotencia from "@/assets/gerador-alta-potencia.png";

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

const ProductsSection = ({ products }: ProductsSectionProps) => {
  // Map para imagens padrão baseadas na categoria
  const defaultImages: Record<string, string> = {
    "até 100": generatorResidencial,
    "100 a 300": generatorIndustrial,
    "300 a 500": generatorAltaPotencia,
    "acima de 500": generatorAltaPotencia,
  };

  const getProductImage = (product: Product, index: number) => {
    if (product.image_url) return product.image_url;
    
    // Detecta a categoria pelas keywords
    const category = product.category.toLowerCase();
    
    // Residencial/Comercial (até 100 kVA)
    if (category.includes("residencial") || category.includes("comercial") || 
        category.includes("até 100") || category.includes("ate 100") ||
        category.includes("6") || category.includes("20")) {
      return generatorResidencial;
    }
    
    // Industrial (100 a 500 kVA)
    if (category.includes("industrial") || 
        (category.includes("100") && category.includes("500")) ||
        category.includes("200") || category.includes("300")) {
      return generatorIndustrial;
    }
    
    // Alta Potência (500 a 4000 kVA)
    if (category.includes("alta") || category.includes("potência") || category.includes("potencia") ||
        category.includes("500") || category.includes("1000") || category.includes("2000") ||
        category.includes("acima")) {
      return generatorAltaPotencia;
    }
    
    // Fallback baseado no índice para garantir variedade
    const images = [generatorResidencial, generatorIndustrial, generatorAltaPotencia];
    return images[index % 3];
  };

  // Pega até 3 produtos para exibir
  const displayProducts = products.slice(0, 3);

  return (
    <section className="py-28 bg-background">
      <div className="container mx-auto px-4">
        <motion.div
          className="text-center mb-20"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-5xl md:text-6xl lg:text-7xl font-bold text-foreground mb-6">
            Nossos Produtos
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            Grupos geradores de 20 kVA a 2500+ kVA para todos os tipos de aplicação
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {displayProducts.map((product, index) => (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
            >
              <Card className="group overflow-hidden border-2 shadow-md h-full flex flex-col hover:border-accent hover:shadow-lg hover:-translate-y-2 transition-all duration-300 rounded-xl">
                <div className="relative h-64 overflow-hidden bg-gradient-to-br from-primary/5 to-secondary/5">
                  <img
                    src={getProductImage(product, index)}
                    alt={`Gerador Projemac ${product.category.toLowerCase().includes('residencial') || product.category.toLowerCase().includes('até 100') || product.category.toLowerCase().includes('ate 100') ? 'para uso residencial e comercial' : product.category.toLowerCase().includes('industrial') || (product.category.toLowerCase().includes('100') && product.category.toLowerCase().includes('500')) ? 'para uso industrial' : 'de alta potência'}`}
                    className="w-full h-full object-contain p-6 group-hover:scale-110 transition-transform duration-500"
                  />
                  {product.power_range && (
                    <div className="absolute top-4 right-4 bg-accent text-accent-foreground px-3 py-1 rounded-full text-sm font-semibold">
                      {product.power_range}
                    </div>
                  )}
                </div>
                
                <CardContent className="p-6 flex-1 flex flex-col">
                  <h3 className="text-2xl font-bold text-primary mb-4 group-hover:text-accent transition-colors">
                    {product.category}
                  </h3>
                  
                  {product.applications && product.applications.length > 0 && (
                    <div className="space-y-2 mb-6 flex-1">
                      {product.applications.slice(0, 4).map((app, idx) => (
                        <div key={idx} className="flex items-start gap-2">
                          <CheckCircle2 className="w-5 h-5 text-accent flex-shrink-0 mt-0.5" />
                          <span className="text-muted-foreground text-sm">{app}</span>
                        </div>
                      ))}
                    </div>
                  )}

                  <Link 
                    to="/produtos" 
                    className="inline-flex items-center text-primary hover:text-secondary font-semibold transition-colors group/link"
                  >
                    Saiba Mais
                    <ArrowRight className="ml-2 w-4 h-4 group-hover/link:translate-x-1 transition-transform" />
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
          <Button asChild size="lg" variant="outline" className="font-semibold">
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
