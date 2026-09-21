import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowRight, Phone, ChevronDown } from "lucide-react";
import { motion } from "framer-motion";
import { useState, useEffect } from "react";

const HERO_VIDEO = "/videos/hero-home-rotativo.mp4";
const HERO_POSTER = "/videos/hero-home-rotativo-poster.jpg";

/**
 * Decide se o hero mostra o vídeo ou só o poster.
 * Poster estático quando o visitante pede menos movimento ou está abaixo de 768px.
 */
const useStaticHero = () => {
  const query = () =>
    typeof window !== "undefined" &&
    (window.matchMedia("(prefers-reduced-motion: reduce)").matches ||
      window.matchMedia("(max-width: 767px)").matches);

  const [isStatic, setIsStatic] = useState<boolean>(query);

  useEffect(() => {
    const motionMq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const widthMq = window.matchMedia("(max-width: 767px)");
    const update = () => setIsStatic(motionMq.matches || widthMq.matches);
    update();
    motionMq.addEventListener("change", update);
    widthMq.addEventListener("change", update);
    return () => {
      motionMq.removeEventListener("change", update);
      widthMq.removeEventListener("change", update);
    };
  }, []);

  return isStatic;
};

const Hero = () => {
  const staticHero = useStaticHero();

  return (
    <section
      data-hero
      className="relative min-h-[85vh] lg:min-h-[90vh] flex flex-col overflow-hidden pt-14 md:pt-16 bg-primary"
      aria-label="Aluguel de Geradores em BH e Região Metropolitana — PROJEMAC"
    >
      {/* Background media — vídeo rotativo da operação (4 cenas) ou poster estático */}
      {staticHero ? (
        <img
          src={HERO_POSTER}
          alt=""
          aria-hidden="true"
          className="absolute inset-0 w-full h-full object-cover z-0"
          style={{ pointerEvents: "none" }}
          decoding="async"
          fetchPriority="high"
        />
      ) : (
        <video
          autoPlay
          loop
          muted
          playsInline
          preload="metadata"
          poster={HERO_POSTER}
          className="absolute inset-0 w-full h-full object-cover z-0"
          style={{ pointerEvents: "none" }}
          aria-hidden="true"
        >
          <source src={HERO_VIDEO} type="video/mp4" />
        </video>
      )}

      {/* Máscara mobile (<768px): texto centralizado sobre o poster inteiro, tinta vertical leve em Tinta-Azul */}
      <div
        className="absolute inset-0 z-10 pointer-events-none md:hidden"
        style={{
          background:
            "linear-gradient(to bottom, rgba(0,56,77,0.82) 0%, rgba(0,56,77,0.66) 55%, rgba(0,56,77,0.82) 100%)",
        }}
        aria-hidden="true"
      />

      {/* Máscara desktop (≥768px): Tinta-Azul opaca na esquerda, transparente a partir de 60% — vídeo limpo à direita */}
      <div
        className="absolute inset-0 z-10 pointer-events-none hidden md:block"
        style={{
          background:
            "linear-gradient(to right, rgba(0,56,77,0.85) 0%, rgba(0,56,77,0.82) 30%, rgba(0,56,77,0.05) 60%, rgba(0,56,77,0.05) 100%)",
        }}
        aria-hidden="true"
      />

      {/* Transição para a seção seguinte: transparente → escuro só no rodapé do hero */}
      <div
        className="absolute inset-x-0 bottom-0 h-32 md:h-40 z-10 pointer-events-none"
        style={{
          background: "linear-gradient(to bottom, rgba(0,56,77,0) 0%, rgba(0,56,77,0.9) 100%)",
        }}
        aria-hidden="true"
      />

      <div className="container mx-auto px-4 py-20 relative z-20 flex-1 flex flex-col justify-center">
        <div className="w-full md:max-w-[55%] flex flex-col items-center md:items-start text-center md:text-left">
          {/* Decorative line */}
          <motion.div
            className="w-12 h-0.5 bg-accent mb-8 origin-center md:origin-left"
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            aria-hidden="true"
          />

          <motion.h1
            className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-white mb-6 leading-tight"
            style={{ textShadow: "2px 4px 12px rgba(0,0,0,0.5)" }}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: "easeOut" }}
          >
            Locação de Geradores de Energia
            <span className="block text-accent mt-4 text-xl sm:text-2xl md:text-3xl lg:text-4xl drop-shadow-lg font-medium">
              Indústrias, Comércio, Serviços e Eventos
            </span>
          </motion.h1>

          <motion.p
            className="text-base sm:text-lg md:text-xl text-white/95 mb-10 max-w-3xl leading-relaxed font-bold"
            style={{ textShadow: "1px 2px 8px rgba(0,0,0,0.5)" }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.15, ease: "easeOut" }}
          >
            Atendemos indústrias, siderúrgicas, obras, eventos e comércios em todo o estado de Minas Gerais. Soluções sob medida para cada necessidade energética.
          </motion.p>

          <motion.div
            className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.3, ease: "easeOut" }}
          >
            <Button
              asChild
              size="lg"
              className="bg-accent text-accent-foreground hover:bg-accent/90 hover:shadow-accent-glow font-bold text-base sm:text-lg px-6 sm:px-8 h-12 sm:h-14 min-h-[44px] shadow-accent transition-all duration-300 hover:-translate-y-1 rounded-full"
            >
              <Link to="/contato">
                Solicitar Orçamento
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>

            <Button
              asChild
              size="lg"
              className="bg-white/10 border-2 border-white/40 text-white hover:bg-white hover:text-primary font-bold text-base sm:text-lg px-6 sm:px-8 h-12 sm:h-14 min-h-[44px] transition-all duration-300 hover:-translate-y-1 rounded-full"
            >
              <a href="https://wa.me/5531995266402?text=Ol%C3%A1!%20Vim%20pelo%20site%20da%20Projemac%20e%20gostaria%20de%20solicitar%20um%20or%C3%A7amento." target="_blank" rel="noopener noreferrer">
                <Phone className="mr-2 h-5 w-5" />
                Falar no WhatsApp
              </a>
            </Button>
          </motion.div>
        </div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center gap-2 cursor-pointer"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2, duration: 0.6 }}
        aria-hidden="true"
      >
        <span className="text-white/50 text-xs font-medium tracking-[0.2em] uppercase">Scroll</span>
        <ChevronDown className="w-5 h-5 text-white/50 animate-bounce" />
      </motion.div>

    </section>
  );
};

export default Hero;
