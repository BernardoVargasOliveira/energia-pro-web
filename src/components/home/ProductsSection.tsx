import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowRight, CheckCircle2 } from "lucide-react";
import { Link } from "react-router-dom";
import generator100 from "@/assets/generator-100kva.jpg";
import generator300 from "@/assets/generator-300kva.jpg";
import generator1000 from "@/assets/generator-1000kva.jpg";

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
    "até 100": generator100,
    "100 a 300": generator300,
    "300 a 500": generator1000,
    "acima de 500": generator1000,
  };

  const getProductImage = (product: Product) => {
    if (product.image_url) return product.image_url;
    
    // Detecta a categoria pelas keywords
    const category = product.category.toLowerCase();
    if (category.includes("até 100") || category.includes("ate 100")) return generator100;
    if (category.includes("100") && category.includes("300")) return generator300;
    if (category.includes("300") || category.includes("500") || category.includes("acima")) return generator1000;
    
    return generator100; // fallback
  };

  // Pega até 3 produtos para exibir
  const displayProducts = products.slice(0, 3);

  return (
    <section className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-5xl md:text-6xl font-bold text-foreground mb-4">
            Nossos Produtos
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
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
              <Card className="group overflow-hidden border-2 h-full flex flex-col hover:border-accent hover:shadow-lg hover:-translate-y-1 transition-all duration-200">
                <div className="relative h-64 overflow-hidden bg-gradient-to-br from-primary/5 to-secondary/5">
                  <img
                    src={getProductImage(product)}
                    alt={product.name}
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
