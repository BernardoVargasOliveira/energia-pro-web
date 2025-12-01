import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowRight, Phone, Award } from "lucide-react";
import heroImage from "@/assets/hero-generator-facility.jpg";
import { motion, useScroll, useTransform } from "framer-motion";
import { Badge } from "@/components/ui/badge";

const Hero = () => {
  const { scrollY } = useScroll();
  const y = useTransform(scrollY, [0, 500], [0, 150]);

  return (
    <section className="relative min-h-[90vh] flex items-center overflow-hidden bg-[#001829]">
      {/* Background image with parallax */}
      <motion.div 
        className="absolute inset-0" 
        style={{ y }}
      >
        <div className="absolute inset-0 bg-gradient-to-br from-[#001829] via-[#003456]/95 to-[#001829]/90 z-10" />
        <img 
          src={heroImage} 
          alt="Instalações PROJEMAC - Geradores de Energia" 
          className="w-full h-full object-cover opacity-30"
        />
      </motion.div>

      {/* Geometric patterns */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='100' height='100' viewBox='0 0 100 100' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M0 0h100v100H0z' fill='none'/%3E%3Cpath d='M0 0l50 50M50 0l50 50M0 50l50 50M50 50l50 50' stroke='%2300A0DC' stroke-width='0.5' fill='none'/%3E%3C/svg%3E")`,
        }} />
      </div>

      <div className="container mx-auto px-4 relative z-20">
        <div className="max-w-4xl">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <Badge className="mb-6 bg-accent/20 text-accent border-accent/30 hover:bg-accent/30 text-sm px-4 py-2">
              <Award className="w-4 h-4 mr-2" />
              Energia Confiável 24/7
            </Badge>
          </motion.div>

          <motion.h1 
            className="text-5xl md:text-7xl font-bold text-white mb-6 leading-tight"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut", delay: 0.1 }}
          >
            Soluções Completas em
            <span className="block text-accent mt-2">Geradores de Energia</span>
          </motion.h1>
          
          <motion.p 
            className="text-xl text-white/80 mb-10 max-w-2xl leading-relaxed"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut", delay: 0.2 }}
          >
            Locação e projetos de geradores de energia para sua empresa. 
            Atendimento em todo estado de Minas Gerais com equipe técnica especializada.
          </motion.p>

          <motion.div 
            className="flex flex-col sm:flex-row gap-4"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut", delay: 0.3 }}
          >
            <Button 
              asChild 
              size="lg" 
              className="bg-accent text-accent-foreground hover:bg-accent/90 font-bold text-lg px-8 h-14 shadow-accent transition-all hover:scale-105"
            >
              <Link to="/contato">
                Solicitar Orçamento
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
            
            <Button 
              asChild 
              size="lg" 
              variant="outline"
              className="bg-white/10 border-2 border-white/30 text-white hover:bg-white hover:text-primary font-bold text-lg px-8 h-14 backdrop-blur-sm transition-all hover:scale-105"
            >
              <a href="https://wa.me/553134953004" target="_blank" rel="noopener noreferrer">
                <Phone className="mr-2 h-5 w-5" />
                Falar no WhatsApp
              </a>
            </Button>
          </motion.div>
        </div>
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
