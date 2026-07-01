import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowRight, Phone, Zap, Shield, HeadphonesIcon, ChevronDown } from "lucide-react";
import { motion } from "framer-motion";
import { useRef, useState, useEffect } from "react";


const Hero = () => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [videoLoaded, setVideoLoaded] = useState(false);

  // ── Particle network canvas ──────────────────────────────────────────
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const resize = () => {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
    };
    resize();
    window.addEventListener("resize", resize, { passive: true });

    // Reduce particle count on mobile (O(n²) line pairs: 60→1770, 35→595)
    const isMobile = window.innerWidth < 768;
    const PARTICLE_COUNT = isMobile ? 35 : 60;

    type Particle = { x: number; y: number; vx: number; vy: number; r: number };
    const particles: Particle[] = Array.from({ length: PARTICLE_COUNT }, () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      vx: (Math.random() - 0.5) * 0.45,
      vy: (Math.random() - 0.5) * 0.45,
      r: Math.random() * 1.8 + 0.4,
    }));

    const MAX_DIST = 130;
    let rafId: number;

    // Pause drawing when Hero is scrolled out of view
    let heroVisible = true;
    const heroSection = canvas.closest("section");
    const heroObserver = new IntersectionObserver(
      ([entry]) => { heroVisible = entry.isIntersecting; },
      { threshold: 0 }
    );
    if (heroSection) heroObserver.observe(heroSection);

    const draw = () => {
      rafId = requestAnimationFrame(draw);
      if (!heroVisible || document.visibilityState === "hidden") return;
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      for (const p of particles) {
        p.x += p.vx;
        p.y += p.vy;
        if (p.x < 0) p.x = canvas.width;
        if (p.x > canvas.width) p.x = 0;
        if (p.y < 0) p.y = canvas.height;
        if (p.y > canvas.height) p.y = 0;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = "rgba(247, 217, 46, 0.55)"; // accent yellow
        ctx.fill();
      }

      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < MAX_DIST) {
            const alpha = (1 - dist / MAX_DIST) * 0.28;
            ctx.beginPath();
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.strokeStyle = `rgba(0, 160, 220, ${alpha})`; // secondary cyan
            ctx.lineWidth = 0.6;
            ctx.stroke();
          }
        }
      }
    };
    draw();

    return () => {
      cancelAnimationFrame(rafId);
      heroObserver.disconnect();
      window.removeEventListener("resize", resize);
    };
  }, []);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    // Don't load video on mobile — saves ~300-600 kB on initial load
    if (window.innerWidth < 768) return;

    video.preload = "auto";
    video.load();
    video.play().catch(() => {
      // Autoplay blocked — fallback bg-primary stays visible
    });
  }, []);

  return (
    <section
      data-hero
      className="relative min-h-screen flex flex-col overflow-hidden pt-14 md:pt-16 bg-primary"
      aria-label="Aluguel de Geradores em BH e Região Metropolitana — PROJEMAC"
    >
      {/* Background video */}
      <video
        ref={videoRef}
        autoPlay
        loop
        muted
        playsInline
        preload="none"
        onCanPlay={() => setVideoLoaded(true)}
        className={`absolute inset-0 w-full h-full object-cover z-0 transition-opacity duration-700 ${videoLoaded ? "opacity-100" : "opacity-0"}`}
        style={{ pointerEvents: "none" }}
      >
        <source src="/videos/hero-background.mp4" type="video/mp4" />
      </video>

      {/* Gradient overlay — legibilidade do texto + profundidade visual */}
      <div
        className="absolute inset-0 z-10 pointer-events-none"
        style={{
          background:
            "linear-gradient(to bottom, rgba(0,73,109,0.75) 0%, rgba(0,73,109,0.35) 45%, rgba(0,73,109,0.70) 100%)",
        }}
        aria-hidden="true"
      />

      {/* Particle network — floats above gradient, below content */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full pointer-events-none"
        style={{ zIndex: 15 }}
        aria-hidden="true"
      />

      <div className="container mx-auto px-4 py-20 relative z-20 flex-1 flex flex-col">
        <div className="w-full mb-8 flex-1 flex flex-col justify-center">
          <div className="flex flex-col items-center w-full">
            {/* Decorative line */}
            <motion.div
              className="w-12 h-0.5 bg-accent mb-8"
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ duration: 0.6, ease: "easeOut" }}
              aria-hidden="true"
            />

            <motion.h1
              className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-white mb-6 leading-tight text-center"
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
              className="text-base sm:text-lg md:text-xl text-white/95 mb-10 max-w-3xl leading-relaxed text-center font-bold"
              style={{ textShadow: "1px 2px 8px rgba(0,0,0,0.5)" }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.15, ease: "easeOut" }}
            >
              Atendemos indústrias, siderúrgicas, obras, eventos e comércios em todo o estado de Minas Gerais. Soluções sob medida para cada necessidade energética.
            </motion.p>

            <motion.div
              className="flex flex-col sm:flex-row gap-4 justify-center"
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

        {/* Spacer */}
        <div className="mt-8 md:mt-12" />

        {/* Metrics cards */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-16"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.45 }}
        >
          {[
            {
              bg: "bg-gradient-to-br from-primary-light to-secondary border-white/20",
              icon: <Zap className="w-7 h-7 text-accent" />,
              iconBg: "bg-accent/20 group-hover:bg-accent/30",
              title: <span className="text-accent">30+</span>,
              titleClass: "text-3xl font-extrabold leading-tight",
              subtitle: "Anos de Experiência",
              subtitleClass: "text-white/85",
              hoverShadow: "hover:shadow-elevated",
            },
            {
              bg: "bg-gradient-to-br from-accent to-accent-dark border-accent-dark/30",
              icon: <Shield className="w-7 h-7 text-primary" />,
              iconBg: "bg-primary/20 group-hover:bg-primary/30",
              title: <span className="text-primary">Qualidade</span>,
              titleClass: "text-2xl font-extrabold leading-tight",
              subtitle: "Alta Qualidade em Equipamentos",
              subtitleClass: "text-primary/85",
              hoverShadow: "hover:shadow-accent-glow",
            },
            {
              bg: "bg-gradient-to-br from-secondary to-primary border-white/20",
              icon: <HeadphonesIcon className="w-7 h-7 text-white" />,
              iconBg: "bg-white/20 group-hover:bg-white/30",
              title: <span className="text-white">Suporte Técnico</span>,
              titleClass: "text-2xl font-extrabold leading-tight",
              subtitle: "Especializado Completo",
              subtitleClass: "text-white/85",
              hoverShadow: "hover:shadow-secondary",
            },
          ].map((card, i) => (
            <div
              key={i}
              className={`${card.bg} border rounded-xl px-5 py-4 hover:-translate-y-1 ${card.hoverShadow} transition-all duration-300 group`}
            >
              <div className="flex items-center gap-4">
                <div className={`p-3 rounded-xl shrink-0 ${card.iconBg} transition-colors`}>
                  {card.icon}
                </div>
                <div className="min-w-0">
                  <div className={card.titleClass}>{card.title}</div>
                  <div className={`text-sm font-medium mt-1 leading-snug ${card.subtitleClass}`}>
                    {card.subtitle}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-20 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center gap-2 cursor-pointer"
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