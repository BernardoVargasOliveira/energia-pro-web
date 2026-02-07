import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowRight, Phone, Award, Zap, Shield, HeadphonesIcon } from "lucide-react";
import { motion } from "framer-motion";
import { Badge } from "@/components/ui/badge";
import heroImage from "@/assets/hero-stadium-generators.jpg";

const Hero = () => {
  return (
    <section 
      className="relative min-h-screen flex flex-col overflow-hidden pt-14 md:pt-16"
      style={{
        backgroundImage: `url(${heroImage})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat'
      }}
    >
      {/* Premium gradient overlay with reduced opacity for better image visibility */}
      <div className="absolute inset-0 bg-gradient-to-r from-primary/55 via-primary/35 to-primary/10 z-10" />
      <div className="absolute inset-0 bg-gradient-to-t from-primary/30 to-transparent z-10" />

        <div className="container mx-auto px-4 py-20 relative z-20 flex-1 flex flex-col">
          <div className="w-full mb-8 flex-1 flex flex-col justify-center">
          <div className="flex flex-col items-center w-full">
            <motion.div
              className="self-start"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <Badge className="mb-6 bg-accent text-accent-foreground border-0 hover:bg-accent-light text-sm px-5 py-2.5 shadow-accent font-bold">
                <Award className="w-4 h-4 mr-2" />
                Energia Confiável
              </Badge>
            </motion.div>

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
              className="text-xl text-white/95 mb-10 max-w-3xl leading-relaxed text-center"
              style={{ textShadow: '1px 2px 8px rgba(0,0,0,0.5)' }}
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.2, ease: "easeOut" }}
            >
              Locação e projetos de geradores de energia para sua empresa. 
              Atendimento em todo estado de Minas Gerais com equipe técnica especializada.
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
                className="bg-white/10 backdrop-blur-sm border-2 border-white/40 text-white hover:bg-white hover:text-primary font-bold text-lg px-8 h-14 transition-all hover:scale-105 hover:-translate-y-1"
              >
                <a href="https://wa.me/553134953004" target="_blank" rel="noopener noreferrer">
                  <Phone className="mr-2 h-5 w-5" />
                  Falar no WhatsApp
                </a>
              </Button>
            </motion.div>
          </div>
        </div>

        {/* Metrics cards at bottom */}
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-16"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <div className="bg-gradient-to-br from-primary-light to-secondary backdrop-blur-sm border border-white/20 rounded-xl p-5 hover:-translate-y-1 hover:shadow-elevated transition-all duration-300 group">
            <div className="flex items-center justify-center gap-4">
              <div className="p-2.5 bg-accent/20 rounded-lg group-hover:bg-accent/30 transition-colors">
                <Zap className="w-6 h-6 text-accent" />
              </div>
              <div>
                <div className="text-3xl font-bold text-accent">30+</div>
                <div className="text-white/90 text-sm font-medium">Anos de Experiência</div>
              </div>
            </div>
          </div>

          <div className="bg-gradient-to-br from-accent to-accent-dark border border-accent-dark/30 rounded-xl p-5 hover:-translate-y-1 hover:shadow-accent-glow transition-all duration-300 group">
            <div className="flex items-center justify-center gap-4">
              <div className="p-2.5 bg-primary/20 rounded-lg group-hover:bg-primary/30 transition-colors">
                <Shield className="w-6 h-6 text-primary" />
              </div>
              <div>
                <div className="text-2xl font-bold text-primary">Qualidade</div>
                <div className="text-primary/90 text-sm font-medium">Alta Qualidade em Equipamentos</div>
              </div>
            </div>
          </div>

          <div className="bg-gradient-to-br from-secondary to-primary backdrop-blur-sm border border-white/20 rounded-xl p-5 hover:-translate-y-1 hover:shadow-secondary transition-all duration-300 group">
            <div className="flex items-center justify-center gap-4">
              <div className="p-2.5 bg-white/20 rounded-lg group-hover:bg-white/30 transition-colors">
                <HeadphonesIcon className="w-6 h-6 text-white" />
              </div>
              <div>
                <div className="text-xl font-bold text-white">Suporte Técnico</div>
                <div className="text-white/90 text-sm font-medium">Suporte Técnico Especializado Completo</div>
              </div>
            </div>
          </div>
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