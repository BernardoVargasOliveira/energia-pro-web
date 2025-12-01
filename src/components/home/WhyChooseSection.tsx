import { motion } from "framer-motion";
import { CheckCircle2, Award, Users, Clock } from "lucide-react";
import { Card } from "@/components/ui/card";

const WhyChooseSection = () => {
  const differentials = [
    "Equipamentos de última geração das melhores marcas",
    "Equipe técnica altamente qualificada e certificada",
    "Cobertura em todo estado de Minas Gerais",
    "Manutenção preventiva e corretiva inclusa",
    "Suporte técnico especializado 24/7",
    "Soluções personalizadas para cada cliente",
  ];

  const metrics = [
    {
      icon: <Award className="w-8 h-8" />,
      value: "500+",
      label: "Projetos Concluídos",
      color: "text-accent"
    },
    {
      icon: <Users className="w-8 h-8" />,
      value: "15+",
      label: "Anos no Mercado",
      color: "text-secondary"
    },
    {
      icon: <Clock className="w-8 h-8" />,
      value: "24/7",
      label: "Suporte Técnico",
      color: "text-primary"
    },
  ];

  return (
    <section className="py-20 bg-gradient-to-br from-muted to-background">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left side - Text content */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
              Por que escolher a <span className="text-primary">PROJEMAC</span>?
            </h2>
            
            <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
              Somos referência em soluções de energia com anos de experiência no mercado. 
              Nossa expertise garante a melhor solução para sua necessidade energética, 
              com equipamentos modernos e atendimento de excelência.
            </p>

            <div className="space-y-4">
              {differentials.map((item, index) => (
                <motion.div
                  key={index}
                  className="flex items-start gap-3"
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  <CheckCircle2 className="w-6 h-6 text-secondary flex-shrink-0 mt-0.5" />
                  <span className="text-foreground font-medium">{item}</span>
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
                <Card className="p-8 text-center hover:shadow-primary transition-all duration-300 border-2 h-full">
                  <div className={`${metric.color} mb-4 flex justify-center`}>
                    {metric.icon}
                  </div>
                  <div className={`text-5xl font-bold ${metric.color} mb-2`}>
                    {metric.value}
                  </div>
                  <div className="text-muted-foreground font-semibold">
                    {metric.label}
                  </div>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default WhyChooseSection;
