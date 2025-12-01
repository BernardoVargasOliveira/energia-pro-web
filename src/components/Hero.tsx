import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowRight, Phone, Award, Zap, Users, HeadphonesIcon } from "lucide-react";
import { motion } from "framer-motion";
import { Badge } from "@/components/ui/badge";
import heroImage from "@/assets/hero-generator-facility.jpg";

const Hero = () => {
  return (
    <section 
      className="relative min-h-screen flex items-center overflow-hidden pt-20"
      style={{
        backgroundImage: `url(${heroImage})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat'
      }}
    >
      {/* Dark overlay - reduced opacity for better image visibility */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/50 via-primary/45 to-secondary/40 z-10" />

      <div className="container mx-auto px-4 py-20 relative z-20">
        <div className="grid lg:grid-cols-2 gap-12 items-center mb-20">
          {/* Left side: Content */}
          <div>
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
              className="text-5xl md:text-6xl lg:text-7xl font-bold text-white mb-6 leading-tight"
              style={{ textShadow: '2px 4px 12px rgba(0,0,0,0.6)' }}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
            >
              Soluções Completas em
              <span className="block text-accent mt-2" style={{ textShadow: '2px 4px 12px rgba(0,0,0,0.5)' }}>Geradores de Energia</span>
            </motion.h1>
            
            <motion.p 
              className="text-xl text-white/90 mb-10 max-w-xl leading-relaxed"
              style={{ textShadow: '1px 2px 8px rgba(0,0,0,0.6)' }}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              Locação e projetos de geradores de energia para sua empresa. 
              Atendimento em todo estado de Minas Gerais com equipe técnica especializada.
            </motion.p>

            <motion.div 
              className="flex flex-col sm:flex-row gap-4"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
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

        {/* Metrics cards at bottom */}
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-3 gap-6"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <div className="bg-gradient-to-br from-primary to-secondary backdrop-blur-sm border border-white/20 rounded-lg p-6 hover:-translate-y-1 hover:shadow-xl transition-all duration-300">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-accent/20 rounded-lg">
                <Zap className="w-8 h-8 text-white" />
              </div>
              <div>
                <div className="text-4xl font-bold text-accent">30+</div>
                <div className="text-white text-sm font-medium">Anos de Experiência</div>
              </div>
            </div>
          </div>

          <div className="bg-gradient-to-br from-accent to-accent/80 backdrop-blur-sm border border-white/20 rounded-lg p-6 hover:-translate-y-1 hover:shadow-xl transition-all duration-300">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-primary/20 rounded-lg">
                <Users className="w-8 h-8 text-primary" />
              </div>
              <div>
                <div className="text-4xl font-bold text-primary">500+</div>
                <div className="text-primary text-sm font-medium">Projetos Atendidos</div>
              </div>
            </div>
          </div>

          <div className="bg-gradient-to-br from-secondary to-primary backdrop-blur-sm border border-white/20 rounded-lg p-6 hover:-translate-y-1 hover:shadow-xl transition-all duration-300">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-white/20 rounded-lg">
                <HeadphonesIcon className="w-8 h-8 text-white" />
              </div>
              <div>
                <div className="text-4xl font-bold text-white">Completo</div>
                <div className="text-white text-sm font-medium">Suporte Técnico Especializado</div>
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
