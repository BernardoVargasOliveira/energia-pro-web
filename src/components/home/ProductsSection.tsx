import { memo } from "react";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import geradorPortatil from "@/assets/gerador-portatil.png";
import geradorMediaPotencia from "@/assets/gerador-media-potencia.png";
import geradorGrandePorte from "@/assets/gerador-grande-porte.png";
import geradoresParalelo from "@/assets/geradores-paralelo.png";
import usinaEnergiaCard from "@/assets/usina-energia-card.jpeg";
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

const homeProducts = [
  {
    id: "geradores-portateis",
    title: "Geradores Portáteis",
    powerRange: "6 a 12 kVA",
    description: "Soluções compactas para residências, comércios e pequenas empresas.",
    image: geradorPortatil,
  },
  {
    id: "geradores-medio-porte",
    title: "Geradores de Médio Porte",
    powerRange: "50 a 180 kVA",
    description: "Ideal para indústrias de médio porte, eventos e condomínios.",
    image: geradorMediaPotencia,
  },
  {
    id: "geradores-grande-porte",
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
    image: usinaEnergiaCard,
  },
  {
    id: "torres-iluminacao",
    title: "Torres de Iluminação",
    powerRange: null,
    description: "Iluminação eficiente e autônoma para obras, eventos e operações noturnas.",
    image: torreIluminacao,
  },
];

interface ProductCardProps {
  product: typeof homeProducts[0];
  index: number;
}

const ProductCard = memo(({ product, index }: ProductCardProps) => (
  <motion.div
    initial={{ opacity: 0, y: 30 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, margin: "-50px" }}
    transition={{ duration: 0.4, ease: "easeOut", delay: index * 0.08 }}
    style={{ willChange: "transform, opacity" }}
    onAnimationComplete={() => {
      const el = document.querySelector(`[data-card-index="${index}"]`) as HTMLElement | null;
      if (el) el.style.willChange = "auto";
    }}
    data-card-index={index}
    className="h-full"
  >
    <Link
      to={`/produtos/${product.id}`}
      className="group flex flex-col h-full bg-white rounded-2xl overflow-hidden shadow-card hover:shadow-elevated hover:-translate-y-2 transition-[transform,box-shadow] duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-secondary"
      aria-label={`${product.title} — Ver detalhes`}
    >
      {/* Image area — ~60% da altura do card */}
      <div className="relative h-64 sm:h-72 overflow-hidden bg-gradient-to-br from-primary/[0.04] via-slate-50 to-secondary/[0.04] shrink-0">
        {product.image ? (
          <img
            src={product.image}
            alt={product.title}
            className="w-full h-full object-contain p-8 transition-transform duration-500 ease-out group-hover:scale-105 will-change-transform"
            loading="lazy"
            width={500}
            height={500}
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-muted-foreground/40 text-sm">
            Imagem em breve
          </div>
        )}

        {/* Badge kVA */}
        {product.powerRange && (
          <div className="absolute top-4 right-4 bg-accent text-accent-foreground px-3 py-1.5 rounded-full text-xs font-bold shadow-accent z-20 tabular-nums">
            {product.powerRange}
          </div>
        )}
      </div>

      {/* Linha separadora com gradiente de marca */}
      <div
        className="h-px shrink-0 bg-gradient-to-r from-transparent via-border to-transparent"
        aria-hidden="true"
      />

      {/* Content */}
      <div className="flex flex-col flex-1 p-6">
        <h3 className="text-2xl font-bold text-foreground mb-3 leading-tight group-hover:text-primary transition-colors duration-300">
          {product.title}
        </h3>

        <p className="text-muted-foreground text-base leading-relaxed mb-6 line-clamp-3">
          {product.description}
        </p>

        {/* Link Saiba mais com seta deslizante */}
        <div className="mt-auto pt-2 border-t border-border/50">
          <span className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.15em] text-foreground/60 group-hover:text-primary transition-colors duration-300 pt-4">
            Saiba mais
            <ArrowRight className="w-4 h-4 translate-x-0 group-hover:translate-x-2 transition-transform duration-300" />
          </span>
        </div>
      </div>
    </Link>
  </motion.div>
));

const ProductsSection = (_props: ProductsSectionProps) => {
  return (
    <section className="py-20 md:py-28 bg-gradient-surface relative overflow-hidden">
      {/* Decorativos */}
      <div className="absolute top-0 left-1/4 w-64 h-64 bg-accent/5 rounded-full blur-3xl" aria-hidden="true" />
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-secondary/5 rounded-full blur-3xl" aria-hidden="true" />

      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          className="text-center mb-16 md:mb-20"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <div className="flex items-center justify-center gap-4 mb-6">
            <div className="h-px w-12 bg-accent" aria-hidden="true" />
            <span className="text-accent text-xs font-bold uppercase tracking-[0.2em]">Produtos</span>
            <div className="h-px w-12 bg-accent" aria-hidden="true" />
          </div>

          <h2 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold mb-6">
            <span className="text-foreground">Nossos </span>
            <span className="text-gradient-primary">Produtos</span>
          </h2>
          <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            Grupos geradores e soluções de iluminação para todos os tipos de aplicação
          </p>
        </motion.div>

        {/* Grid 2 colunas desktop, 1 coluna mobile */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 mb-10">
          {homeProducts.slice(0, 4).map((product, index) => (
            <ProductCard key={product.id} product={product} index={index} />
          ))}
        </div>

        {/* 5º card centralizado */}
        <div className="flex justify-center mb-12">
          <div className="w-full md:w-[calc(50%-16px)]">
            <ProductCard product={homeProducts[4]} index={4} />
          </div>
        </div>

        <motion.div
          className="text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          <Button
            asChild
            size="lg"
            className="bg-gradient-to-r from-primary to-secondary hover:from-primary-light hover:to-secondary-light text-white font-semibold shadow-primary hover:shadow-primary-lg transition-all duration-300 rounded-full hover:-translate-y-0.5"
          >
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
