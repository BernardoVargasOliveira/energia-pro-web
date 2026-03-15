import { Link } from "react-router-dom";
import { useState, useEffect, useRef, lazy, Suspense } from "react";
import {
  Battery,
  Zap,
  MapPin,
  BatteryCharging,
  Wrench,
  HardHat,
  Headphones,
  Phone,
  Mail,
  Factory,
  Store,
  CalendarDays,
  Building,
  Flame,
  BatteryWarning,
  Settings,
  ArrowRight,
  Quote,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import Hero from "@/components/Hero";
import ProductsSection from "@/components/home/ProductsSection";
import WhyChooseSection from "@/components/home/WhyChooseSection";
import { motion, AnimatePresence } from "framer-motion";

// Lazy-load Three.js section (keeps initial bundle lean)
const ThreeGeneratorSection = lazy(() => import("@/components/ThreeGeneratorSection"));

/* ─────────────────────────────────────────────
   CountUpStat — número conta ao entrar na tela
   Vanilla Intersection Observer + rAF (sem libs)
───────────────────────────────────────────── */
interface CountUpStatProps {
  value: number;
  suffix: string;
  label: string;
  duration?: number;
}

const CountUpStat = ({ value, suffix, label, duration = 2000 }: CountUpStatProps) => {
  const [count, setCount] = useState(0);
  const [started, setStarted] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !started) setStarted(true);
      },
      { threshold: 0.5 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [started]);

  useEffect(() => {
    if (!started) return;
    const startTime = Date.now();
    const step = () => {
      const elapsed = Date.now() - startTime;
      const progress = Math.min(elapsed / duration, 1);
      // easeOutCubic
      const eased = 1 - Math.pow(1 - progress, 3);
      setCount(Math.floor(eased * value));
      if (progress < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }, [started, value, duration]);

  return (
    <div ref={ref} className="text-center px-4">
      <div className="text-5xl md:text-6xl lg:text-7xl font-bold text-white tabular-nums">
        {count}
        <span className="text-accent">{suffix}</span>
      </div>
      <div className="text-white/65 font-medium uppercase tracking-widest text-xs md:text-sm mt-3">
        {label}
      </div>
    </div>
  );
};

/* ─── Testimonials data ──────────────────────────────────────────────────── */
const testimonials = [
  {
    quote:
      "A PROJEMAC garantiu energia contínua durante toda a nossa parada programada. Atendimento impecável e equipamentos de alta qualidade — exatamente o que precisávamos.",
    name: "Diretor de Operações",
    company: "Indústria Siderúrgica • Betim / MG",
    initials: "DO",
  },
  {
    quote:
      "Alugamos geradores para um grande evento e o suporte técnico foi excepcional. Os equipamentos chegaram no prazo e funcionaram perfeitamente do início ao fim.",
    name: "Coordenador de Eventos",
    company: "Produtora de Eventos • Belo Horizonte / MG",
    initials: "CE",
  },
  {
    quote:
      "Em anos de parceria, a PROJEMAC nunca nos deixou sem energia. Profissionalismo e confiabilidade que fazem toda a diferença para a nossa operação.",
    name: "Gerente de Facilities",
    company: "Rede de Saúde • Contagem / MG",
    initials: "GF",
  },
];

/* ─────────────────────────────────────────── */

const Home = () => {
  const [services, setServices] = useState<any[]>([]);
  const [products, setProducts] = useState<any[]>([]);
  const [sectors, setSectors] = useState<any[]>([]);
  const [content, setContent] = useState<Record<string, string>>({});
  const [testimonialIdx, setTestimonialIdx] = useState(0);

  useEffect(() => {
    loadData();
  }, []);

  // Testimonials auto-rotation
  useEffect(() => {
    const timer = setInterval(() => {
      setTestimonialIdx((prev) => (prev + 1) % testimonials.length);
    }, 6000);
    return () => clearInterval(timer);
  }, []);

  const loadData = async () => {
    const { supabase } = await import("@/integrations/supabase/client");

    const { data: servicesData } = await supabase
      .from("services")
      .select("*")
      .order("order_index")
      .limit(4);
    if (servicesData) setServices(servicesData);

    const { data: productsData } = await supabase
      .from("products")
      .select("*")
      .order("order_index")
      .limit(3);
    if (productsData) setProducts(productsData);

    const { data: sectorsData } = await supabase
      .from("sectors")
      .select("*")
      .order("order_index")
      .limit(6);
    if (sectorsData) setSectors(sectorsData);

    const { data: contentData } = await supabase
      .from("site_content")
      .select("key, value_text")
      .in("key", [
        "home_services_title",
        "home_differentials_title",
        "home_differentials_subtitle",
        "home_sectors_title",
        "home_cta_title",
        "home_cta_subtitle",
      ]);

    if (contentData) {
      const contentMap: Record<string, string> = {};
      contentData.forEach((item) => {
        contentMap[item.key] = item.value_text || "";
      });
      setContent(contentMap);
    }
  };

  const getIconComponent = (iconName: string | null) => {
    switch (iconName) {
      case "Battery": return <Battery className="h-8 w-8" />;
      case "BatteryCharging": return <BatteryCharging className="h-8 w-8" />;
      case "Zap": return <Zap className="h-8 w-8" />;
      case "Wrench": return <Wrench className="h-8 w-8" />;
      case "HardHat": return <HardHat className="h-8 w-8" />;
      case "Headphones": return <Headphones className="h-8 w-8" />;
      default: return <Battery className="h-8 w-8" />;
    }
  };

  const getSectorIconComponent = (sectorName: string) => {
    const iconMap: Record<string, JSX.Element> = {
      "Indústria": <Factory className="h-10 w-10" />,
      "Comércio": <Store className="h-10 w-10" />,
      "Eventos": <CalendarDays className="h-10 w-10" />,
      "Condomínios": <Building className="h-10 w-10" />,
      "Siderúrgicas": <Flame className="h-10 w-10" />,
      "Parada de Energia": <BatteryWarning className="h-10 w-10" />,
      "Outros": <Settings className="h-10 w-10" />,
    };
    return iconMap[sectorName] || <Factory className="h-10 w-10" />;
  };

  return (
    <>
      <Hero />

      {/* ── INTRO STATEMENT ─────────────────────────────────────────── */}
      <section className="py-24 md:py-36 bg-primary relative overflow-hidden">
        {/* Gradient de profundidade */}
        <div className="absolute inset-0 bg-gradient-to-br from-primary-dark via-primary to-secondary/20 pointer-events-none" />

        {/* Grid decorativo sutil */}
        <div
          className="absolute inset-0 opacity-[0.04] pointer-events-none"
          style={{
            backgroundImage:
              "linear-gradient(rgba(255,255,255,0.6) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.6) 1px, transparent 1px)",
            backgroundSize: "60px 60px",
          }}
          aria-hidden="true"
        />

        {/* Brilho central */}
        <div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[400px] rounded-full blur-3xl pointer-events-none"
          style={{ background: "radial-gradient(ellipse, rgba(0,160,220,0.15) 0%, transparent 70%)" }}
          aria-hidden="true"
        />

        <div className="container mx-auto px-4 relative z-10">
          <motion.div
            className="max-w-5xl mx-auto text-center"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            {/* Linha decorativa */}
            <div className="w-12 h-0.5 bg-accent mx-auto mb-10" aria-hidden="true" />

            <p className="text-3xl md:text-5xl lg:text-6xl font-bold text-white leading-tight mb-8">
              Somos referência em soluções de energia com{" "}
              <span className="text-accent">30 anos de experiência</span>{" "}
              no mercado.
            </p>

            <p className="text-xl md:text-2xl text-white/65 leading-relaxed max-w-3xl mx-auto">
              Nossa expertise garante a melhor solução para sua necessidade energética,
              com equipamentos modernos e atendimento de excelência.
            </p>

            <div className="w-12 h-0.5 bg-accent mx-auto mt-10" aria-hidden="true" />
          </motion.div>
        </div>
      </section>

      {/* ── STATS BAR ──────────────────────────────────────────────────── */}
      <section className="py-16 md:py-20 bg-primary-dark relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-primary-dark via-primary to-primary-dark pointer-events-none" />

        {/* Linha de destaque no topo */}
        <div className="absolute top-0 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-accent to-transparent" aria-hidden="true" />
        <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-accent to-transparent" aria-hidden="true" />

        <div className="container mx-auto px-4 relative z-10">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 md:gap-12 divide-x divide-white/10">
            <CountUpStat value={30} suffix="+" label="Anos no Mercado" />
            <CountUpStat value={5000} suffix="+" label="Projetos Realizados" />
            <CountUpStat value={600} suffix="+" label="Municípios Atendidos em MG" />
            <CountUpStat value={100} suffix="%" label="Satisfação Garantida" />
          </div>
        </div>
      </section>

      {/* ── 3D GENERATOR SECTION ─────────────────────────────────────── */}
      <Suspense fallback={
        <div className="h-screen bg-[#000d1a] flex items-center justify-center">
          <div className="w-8 h-8 border-2 border-accent border-t-transparent rounded-full animate-spin" />
        </div>
      }>
        <ThreeGeneratorSection />
      </Suspense>

      {/* ── PRODUCTS SECTION ─────────────────────────────────────────── */}
      <ProductsSection products={products} />

      {/* ── SERVICES SECTION ─────────────────────────────────────────── */}
      <section className="py-28 bg-gradient-surface relative overflow-hidden">

        <div className="container mx-auto px-4 relative z-10">
          <motion.div
            className="text-center mb-20"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            {/* Linha decorativa de seção */}
            <div className="flex items-center justify-center gap-4 mb-6">
              <div className="h-px w-12 bg-accent" aria-hidden="true" />
              <span className="text-accent text-xs font-bold uppercase tracking-[0.2em]">Serviços</span>
              <div className="h-px w-12 bg-accent" aria-hidden="true" />
            </div>

            <h2 className="text-5xl md:text-6xl lg:text-7xl font-bold text-foreground mb-6">
              {content["home_services_title"] || "Nossos Serviços"}
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
              Serviços completos de locação, instalação e manutenção de geradores
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {services.map((service, index) => (
              <motion.div
                key={service.id}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, ease: "easeOut", delay: index * 0.1 }}
              >
                <Card className="bg-gradient-card border-0 shadow-card h-full group hover:shadow-elevated hover:-translate-y-3 transition-[transform,box-shadow] duration-300 rounded-2xl overflow-hidden">
                  <CardContent className="p-8 text-center relative">
                    <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-primary via-secondary to-accent" />
                    <div className="inline-flex items-center justify-center w-20 h-20 rounded-2xl bg-gradient-to-br from-primary to-secondary text-white mb-6 group-hover:scale-110 group-hover:shadow-secondary transition-[transform,box-shadow] duration-300">
                      {getIconComponent(service.icon)}
                    </div>
                    <h3 className="text-2xl font-bold mb-3 text-primary group-hover:text-secondary transition-colors">
                      {service.title}
                    </h3>
                    <p className="text-base text-muted-foreground leading-relaxed">
                      {service.description}
                    </p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>

          <div className="text-center mt-12">
            <Button
              asChild
              size="lg"
              className="bg-gradient-to-r from-primary to-secondary hover:from-primary-light hover:to-secondary-light text-white font-semibold shadow-primary hover:shadow-primary-lg transition-all duration-300 rounded-full"
            >
              <Link to="/servicos">
                Ver Todos os Serviços
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* ── WHY CHOOSE ───────────────────────────────────────────────── */}
      <WhyChooseSection />

      {/* ── TESTIMONIALS ─────────────────────────────────────────────── */}
      <section className="py-28 bg-[#060d14] relative overflow-hidden">
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-accent/40 to-transparent" aria-hidden="true" />
        <div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] rounded-full blur-3xl pointer-events-none"
          style={{ background: "radial-gradient(ellipse, rgba(0,160,220,0.06) 0%, transparent 70%)" }}
          aria-hidden="true"
        />

        <div className="container mx-auto px-4 relative z-10 max-w-4xl">
          <div className="text-center mb-16">
            <div className="flex items-center justify-center gap-4 mb-6">
              <div className="h-px w-12 bg-accent" aria-hidden="true" />
              <span className="text-accent text-xs font-bold uppercase tracking-[0.2em]">Depoimentos</span>
              <div className="h-px w-12 bg-accent" aria-hidden="true" />
            </div>
            <h2 className="text-5xl md:text-6xl font-bold text-white">
              O que nossos <span className="text-accent">clientes dizem</span>
            </h2>
          </div>

          <div className="relative">
            <AnimatePresence mode="wait">
              <motion.div
                key={testimonialIdx}
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -24 }}
                transition={{ duration: 0.5, ease: "easeOut" }}
                className="text-center"
              >
                <Quote className="w-12 h-12 text-accent/30 mx-auto mb-8" aria-hidden="true" />
                <p className="text-xl md:text-2xl lg:text-3xl text-white/85 font-medium leading-relaxed mb-10 max-w-3xl mx-auto">
                  "{testimonials[testimonialIdx].quote}"
                </p>
                <div className="flex flex-col items-center gap-3">
                  <div className="w-14 h-14 rounded-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center text-white font-bold text-lg shadow-primary">
                    {testimonials[testimonialIdx].initials}
                  </div>
                  <div>
                    <p className="text-white font-semibold">{testimonials[testimonialIdx].name}</p>
                    <p className="text-white/45 text-sm">{testimonials[testimonialIdx].company}</p>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>

            <div className="flex items-center justify-center gap-6 mt-12">
              <button
                onClick={() => setTestimonialIdx((prev) => (prev - 1 + testimonials.length) % testimonials.length)}
                className="w-10 h-10 rounded-full border border-white/20 flex items-center justify-center text-white/50 hover:text-white hover:border-white/50 transition-colors"
                aria-label="Depoimento anterior"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>

              <div className="flex gap-2">
                {testimonials.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => setTestimonialIdx(i)}
                    className={`h-2 rounded-full transition-all duration-300 ${
                      i === testimonialIdx ? "bg-accent w-6" : "bg-white/25 hover:bg-white/50 w-2"
                    }`}
                    aria-label={`Ir para depoimento ${i + 1}`}
                  />
                ))}
              </div>

              <button
                onClick={() => setTestimonialIdx((prev) => (prev + 1) % testimonials.length)}
                className="w-10 h-10 rounded-full border border-white/20 flex items-center justify-center text-white/50 hover:text-white hover:border-white/50 transition-colors"
                aria-label="Próximo depoimento"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* ── SECTORS SECTION ──────────────────────────────────────────── */}
      <section className="py-28 bg-gradient-to-br from-primary via-primary-dark to-secondary relative overflow-hidden">
        <div className="absolute top-20 left-10 w-32 h-32 border-2 border-white/10 rounded-full" aria-hidden="true" />
        <div className="absolute bottom-20 right-10 w-48 h-48 border-2 border-accent/20 rounded-full" aria-hidden="true" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-secondary/10 rounded-full blur-3xl" aria-hidden="true" />

        <div className="container mx-auto px-4 relative z-10">
          <motion.div
            className="text-center mb-20"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            {/* Linha decorativa */}
            <div className="flex items-center justify-center gap-4 mb-6">
              <div className="h-px w-12 bg-accent" aria-hidden="true" />
              <span className="text-accent text-xs font-bold uppercase tracking-[0.2em]">Segmentos</span>
              <div className="h-px w-12 bg-accent" aria-hidden="true" />
            </div>

            <h2 className="text-5xl md:text-6xl lg:text-7xl font-bold text-white mb-6">
              {content["home_sectors_title"] || "Setores Atendidos"}
            </h2>
            <p className="text-xl text-white/80 max-w-3xl mx-auto leading-relaxed">
              Soluções especializadas para diversos segmentos do mercado
            </p>
          </motion.div>

          <div className="flex flex-wrap justify-center gap-6">
            {sectors.map((sector, index) => (
              <motion.div
                key={sector.id}
                className="w-[calc(50%-12px)] md:w-[calc(33.333%-16px)] lg:w-[180px]"
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.08 }}
              >
                <Card className="bg-white/10 backdrop-blur-sm border border-white/20 cursor-pointer h-full group hover:bg-white hover:border-accent shadow-lg hover:shadow-elevated hover:-translate-y-2 transition-[transform,box-shadow,background-color,border-color] duration-300 rounded-2xl">
                  <CardContent className="p-8 text-center flex flex-col items-center justify-center min-h-[180px]">
                    <div className="w-16 h-16 rounded-2xl bg-accent flex items-center justify-center mb-4 text-primary group-hover:scale-110 group-hover:shadow-accent transition-all duration-300">
                      {getSectorIconComponent(sector.name)}
                    </div>
                    <h3 className="font-bold text-sm text-white group-hover:text-primary transition-colors">
                      {sector.name}
                    </h3>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>

          <div className="text-center mt-12">
            <Button
              asChild
              size="lg"
              className="bg-accent text-accent-foreground hover:bg-accent/90 font-semibold shadow-accent hover:shadow-accent-glow transition-all duration-300 rounded-full"
            >
              <Link to="/setores">
                Ver Todos os Setores
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* ── CTA SECTION ──────────────────────────────────────────────── */}
      <section className="py-28 md:py-36 bg-gradient-surface relative overflow-hidden">
        <div className="absolute top-0 left-0 right-0 h-0.5 bg-gradient-to-r from-primary via-secondary to-accent" aria-hidden="true" />
        <div className="absolute top-20 right-0 w-96 h-96 bg-accent/5 rounded-full blur-3xl" aria-hidden="true" />
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-secondary/5 rounded-full blur-3xl" aria-hidden="true" />

        <div className="container mx-auto px-4 relative z-10">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            {/* Linha decorativa */}
            <div className="flex items-center justify-center gap-4 mb-8">
              <div className="h-px w-12 bg-accent" aria-hidden="true" />
              <span className="text-accent text-xs font-bold uppercase tracking-[0.2em]">Contato</span>
              <div className="h-px w-12 bg-accent" aria-hidden="true" />
            </div>

            <h2 className="text-5xl md:text-6xl lg:text-7xl font-bold mb-8">
              <span className="text-foreground">Pronto para </span>
              <span className="text-gradient-primary">garantir energia</span>
              <span className="text-foreground"> para o seu negócio?</span>
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
              {content["home_cta_subtitle"] ||
                "Entre em contato conosco e receba um orçamento personalizado para sua necessidade"}
            </p>
          </motion.div>

          {/* Contact Cards */}
          <motion.div
            className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12 max-w-5xl mx-auto"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            {/* Telefone */}
            <div className="bg-gradient-card border-0 shadow-card rounded-2xl p-8 hover:shadow-elevated hover:-translate-y-2 transition-[transform,box-shadow] duration-300 group">
              <div className="flex flex-col items-center text-center">
                <div className="w-16 h-16 bg-gradient-to-br from-primary to-secondary rounded-2xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                  <Phone className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-bold text-foreground mb-2">Telefone</h3>
                <a
                  href="tel:+553134953004"
                  className="text-secondary hover:text-accent font-semibold transition-colors"
                >
                  (31) 3495-3004
                </a>
              </div>
            </div>

            {/* E-mail */}
            <div className="bg-gradient-card border-0 shadow-card rounded-2xl p-8 hover:shadow-elevated hover:-translate-y-2 transition-[transform,box-shadow] duration-300 group">
              <div className="flex flex-col items-center text-center">
                <div className="w-16 h-16 bg-gradient-to-br from-secondary to-primary rounded-2xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                  <Mail className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-bold text-foreground mb-2">E-mail</h3>
                <a
                  href="mailto:contato@projemac.com.br"
                  className="text-secondary hover:text-accent font-semibold transition-colors break-all"
                >
                  contato@projemac.com.br
                </a>
              </div>
            </div>

            {/* Localização */}
            <div className="bg-gradient-card border-0 shadow-card rounded-2xl p-8 hover:shadow-elevated hover:-translate-y-2 transition-[transform,box-shadow] duration-300 group">
              <div className="flex flex-col items-center text-center">
                <div className="w-16 h-16 bg-accent rounded-2xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                  <MapPin className="w-8 h-8 text-primary" />
                </div>
                <h3 className="text-xl font-bold text-foreground mb-2">Localização</h3>
                <p className="text-secondary font-semibold">Belo Horizonte - MG</p>
              </div>
            </div>
          </motion.div>

          {/* CTA Buttons */}
          <motion.div
            className="text-center"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                asChild
                size="lg"
                className="bg-accent text-accent-foreground hover:bg-accent/90 hover:shadow-accent-glow font-bold text-lg px-10 h-16 shadow-accent hover:-translate-y-1 transition-all duration-300 rounded-full"
              >
                <Link to="/contato">Solicitar Orçamento Agora</Link>
              </Button>
              <a
                href="https://wa.me/5531995266402?text=Ol%C3%A1!%20Vim%20pelo%20site%20da%20Projemac%20e%20gostaria%20de%20solicitar%20um%20or%C3%A7amento."
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center px-10 h-16 bg-gradient-to-r from-primary to-secondary text-white hover:from-primary-light hover:to-secondary-light rounded-full font-bold text-lg transition-all duration-300 shadow-primary hover:shadow-primary-lg hover:-translate-y-1"
              >
                Falar no WhatsApp
              </a>
            </div>
          </motion.div>
        </div>
      </section>
    </>
  );
};

export default Home;