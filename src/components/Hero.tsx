import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowRight, Phone, Zap, Shield, HeadphonesIcon } from "lucide-react";
import { motion } from "framer-motion";
import { useRef, useState, useEffect } from "react";


const Hero = () => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [videoLoaded, setVideoLoaded] = useState(false);

  useEffect(() => {
    const video = videoRef.current;
    if (video) {
      video.play().catch(() => {
        // Autoplay blocked — fallback image stays visible
      });
    }
  }, []);

  return (
    <section 
      className="relative min-h-screen flex flex-col overflow-hidden pt-14 md:pt-16 bg-primary"
    >
      {/* Background video */}
      <video
        ref={videoRef}
        autoPlay
        loop
        muted
        playsInline
        preload="auto"
        onCanPlay={() => setVideoLoaded(true)}
        className={`absolute inset-0 w-full h-full object-cover z-0 transition-opacity duration-700 ${videoLoaded ? 'opacity-100' : 'opacity-0'}`}
        style={{ pointerEvents: 'none' }}
      >
        <source src="/videos/hero-background.mp4" type="video/mp4" />
      </video>

      {/* No overlay — clean video */}

        <div className="container mx-auto px-4 py-20 relative z-20 flex-1 flex flex-col">
          <div className="w-full mb-8 flex-1 flex flex-col justify-center">
          <div className="flex flex-col items-center w-full">
            <motion.h1 
              className="text-5xl md:text-6xl lg:text-7xl font-bold text-white mb-6 leading-tight text-center"
              style={{ textShadow: '2px 4px 12px rgba(0,0,0,0.5)' }}
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.1, ease: "easeOut" }}
            >
              Locação de Geradores de Energia
              <span className="block text-accent mt-4 text-2xl md:text-3xl lg:text-4xl drop-shadow-lg font-medium">Indústrias, Comércio, Serviços e Eventos</span>
            </motion.h1>
            
            <motion.p 
              className="text-xl text-white/95 mb-10 max-w-3xl leading-relaxed text-center font-bold"
              style={{ textShadow: '1px 2px 8px rgba(0,0,0,0.5)' }}
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.2, ease: "easeOut" }}
            >
              LOCAÇÃO MENSAL, Siderurgicas e Industrias, Obras, Paradas programadas para manutenção de rede, teste de energia, backup, horário de pico e outros.
            </motion.p>

            <motion.div 
              className="flex flex-col sm:flex-row gap-4 justify-center"
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.3, ease: "easeOut" }}
            >
              <Button 
                asChild 
                size="lg" 
                className="bg-accent text-accent-foreground hover:bg-accent-light hover:shadow-accent-glow font-bold text-lg px-8 h-14 shadow-accent transition-all hover:scale-105 hover:-translate-y-1"
              >
                <Link to="/contato">
                  Solicitar Orçamento
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
              
              <Button 
                asChild 
                size="lg" 
                className="bg-white/10 border-2 border-white/40 text-white hover:bg-white hover:text-primary font-bold text-lg px-8 h-14 transition-all hover:scale-105 hover:-translate-y-1"
              >
                <a href="https://wa.me/5531995266402" target="_blank" rel="noopener noreferrer">
                  <Phone className="mr-2 h-5 w-5" />
                  Falar no WhatsApp
                </a>
              </Button>
            </motion.div>
          </div>
        </div>

        {/* Spacer between CTA buttons and metrics cards */}
        <div className="mt-8 md:mt-12" />

        {/* Metrics cards at bottom */}
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-16"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
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
                  <div className={`text-sm font-medium mt-1 leading-snug ${card.subtitleClass}`}>{card.subtitle}</div>
                </div>
              </div>
            </div>
          ))}
        </motion.div>
      </div>

      {/* Wave separator */}
      <div className="absolute bottom-0 left-0 right-0 z-10">
        <svg viewBox="0 0 1440 80" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full">
          <path d="M0 80L60 73.3C120 66.7 240 53.3 360 46.7C480 40 600 40 720 43.3C840 46.7 960 53.3 1080 56.7C1200 60 1320 60 1380 60L1440 60V80H1380C1320 80 1200 80 1080 80C960 80 840 80 720 80C600 80 480 80 360 80C240 80 120 80 60 80H0V80Z" fill="white"/>
        </svg>
      </div>
    </section>
  );
};

export default Hero;