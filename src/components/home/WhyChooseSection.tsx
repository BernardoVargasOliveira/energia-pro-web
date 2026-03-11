import { motion } from "framer-motion";
import { CheckCircle2, Award, Users, HeadphonesIcon } from "lucide-react";
import { Card } from "@/components/ui/card";
import galpaoGeradoresNovo from "@/assets/galpao-geradores-novo.jpg";

const WhyChooseSection = () => {
  const differentials = [
    "Equipamentos de última geração das melhores marcas",
    "Equipe técnica altamente qualificada e certificada",
    "Cobertura em todo estado de Minas Gerais",
    "Manutenção preventiva e corretiva inclusa",
    "Suporte técnico especializado",
    "Soluções personalizadas para cada cliente",
  ];

  const metrics = [
    {
      icon: <Award className="w-8 h-8" />,
      value: "5000+",
      label: "Projetos Concluídos",
      gradient: "from-accent to-accent-dark",
      textColor: "text-accent"
    },
    {
      icon: <Users className="w-8 h-8" />,
      value: "30+",
      label: "Anos no Mercado",
      gradient: "from-secondary to-primary",
      textColor: "text-secondary"
    },
    {
      icon: <HeadphonesIcon className="w-8 h-8" />,
      value: "100%",
      label: "Suporte Especializado",
      gradient: "from-primary to-secondary",
      textColor: "text-primary"
    },
  ];

  return (
    <section className="py-28 bg-gradient-to-b from-secondary/5 via-primary/5 to-background relative overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-accent to-transparent" />
      <div className="absolute -top-40 -right-40 w-80 h-80 bg-accent/10 rounded-full blur-3xl" />
      <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-secondary/10 rounded-full blur-3xl" />
      
      <div className="container mx-auto px-4 relative z-10">
        {/* Premium White Box */}
        <div className="bg-gradient-card rounded-3xl shadow-elevated border-0 p-10 md:p-16 relative overflow-hidden">
          {/* Top accent bar */}
          <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-primary via-secondary to-accent" />
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left side - Text content */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-5xl md:text-6xl lg:text-7xl font-extrabold mb-8">
              <span className="text-foreground">Por que escolher a </span>
              <span className="text-gradient-primary">PROJEMAC</span>
              
            </h2>
            
            <p className="text-xl text-muted-foreground mb-10 leading-relaxed max-w-2xl">
              Somos referência em soluções de energia com 30 anos de experiência no mercado. 
              Nossa expertise garante a melhor solução para sua necessidade energética, 
              com equipamentos modernos e atendimento de excelência.
            </p>

            <div className="space-y-4">
              {differentials.map((item, index) => (
                <motion.div
                  key={index}
                  className="flex items-start gap-3 group"
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  <div className="w-6 h-6 rounded-full bg-gradient-to-br from-secondary to-primary flex items-center justify-center flex-shrink-0 mt-0.5">
                    <CheckCircle2 className="w-4 h-4 text-white" />
                  </div>
                  <span className="text-foreground font-semibold text-base group-hover:text-secondary transition-colors">{item}</span>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Right side - Metrics cards */}
          <motion.div
            className="grid grid-cols-1 sm:grid-cols-2 gap-6"
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            {metrics.map((metric, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.1 * index }}
                className={index === 2 ? "sm:col-span-2" : ""}
              >
                <Card className="p-8 text-center shadow-card hover:shadow-card-hover hover:-translate-y-2 transition-all duration-300 border-0 h-full bg-gradient-card rounded-2xl group overflow-hidden relative">
                  <div className={`absolute inset-0 bg-gradient-to-br ${metric.gradient} opacity-0 group-hover:opacity-5 transition-opacity duration-300`} />
                  <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${metric.gradient} flex items-center justify-center mx-auto mb-4 text-white group-hover:scale-110 transition-transform duration-300`}>
                    {metric.icon}
                  </div>
                  <div className={`text-5xl font-bold ${metric.textColor} mb-2`}>
                    {metric.value}
                  </div>
                  <div className="text-foreground font-semibold">
                    {metric.label}
                  </div>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </div>

        {/* Warehouse Image */}
        <motion.div 
          className="mt-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          <div className="relative rounded-2xl overflow-hidden shadow-elevated">
            <img
              src={galpaoGeradoresNovo}
              alt="Galpão da PROJEMAC com geradores e caminhões"
              className="w-full h-[350px] object-cover"
              loading="lazy"
            />
            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-primary/95 to-transparent p-6">
              <h3 className="text-primary-foreground font-bold text-xl mb-1">Nosso Galpão de Geradores</h3>
              <p className="text-primary-foreground/90 text-sm">Equipamentos prontos para atender sua demanda energética</p>
            </div>
          </div>
        </motion.div>
        </div>
      </div>
    </section>
  );
};

export default WhyChooseSection;