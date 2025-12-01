import { Award, Target, Eye, Users } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { motion } from "framer-motion";

const Empresa = () => {
  return (
    <div className="min-h-screen">
      {/* Header Section */}
      <section className="bg-gradient-primary py-12 md:py-16">
        <div className="container mx-auto px-4">
          <motion.h1 
            className="text-4xl md:text-5xl font-bold tracking-tight text-white text-center mb-6"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
          >
            A Empresa
          </motion.h1>
          <motion.p 
            className="text-base md:text-lg text-primary-foreground/80 text-center max-w-3xl mx-auto"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut", delay: 0.1 }}
          >
            Especialistas em soluções de energia com grupos geradores
          </motion.p>
        </div>
      </section>

      {/* About Section */}
      <section className="py-16 bg-background">
        <div className="container mx-auto px-4">
          <motion.div 
            className="max-w-4xl mx-auto"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: "easeOut" }}
          >
            <h2 className="text-3xl font-bold text-foreground mb-6">Nossa História</h2>
            <div className="space-y-4 text-muted-foreground text-lg">
              <p>
                A PROJEMAC é uma empresa especializada em soluções completas para geração de energia elétrica, 
                atuando no mercado brasileiro com foco em excelência e comprometimento com nossos clientes.
              </p>
              <p>
                Com anos de experiência no setor, oferecemos serviços de locação e 
                instalação de grupos geradores para diversos segmentos do mercado, sempre priorizando 
                a qualidade e a confiabilidade de nossos equipamentos e serviços.
              </p>
              <p>
                Nossa equipe é formada por profissionais altamente qualificados e treinados, prontos para 
                atender às necessidades específicas de cada cliente, desde pequenas instalações até 
                grandes projetos industriais.
              </p>
              <p>
                Trabalhamos com as melhores marcas do mercado e mantemos um rigoroso controle de qualidade 
                em todos os nossos processos, garantindo assim a satisfação total de nossos clientes.
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Mission, Vision, Values */}
      <section className="py-16 bg-muted">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, ease: "easeOut", delay: 0.1 }}
            >
              <Card className="border-t-4 border-t-primary h-full">
              <CardContent className="p-8">
                <div className="flex items-center justify-center w-16 h-16 rounded-full bg-primary text-primary-foreground mb-4 mx-auto">
                  <Target className="h-8 w-8" />
                </div>
                <h3 className="text-2xl font-bold text-foreground mb-4 text-center">Missão</h3>
                <p className="text-muted-foreground">
                  Fornecer soluções confiáveis e eficientes em geração de energia, superando as 
                  expectativas de nossos clientes através de tecnologia de ponta e atendimento personalizado.
                </p>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, ease: "easeOut", delay: 0.2 }}
            >
              <Card className="border-t-4 border-t-secondary h-full">
              <CardContent className="p-8">
                <div className="flex items-center justify-center w-16 h-16 rounded-full bg-secondary text-secondary-foreground mb-4 mx-auto">
                  <Eye className="h-8 w-8" />
                </div>
                <h3 className="text-2xl font-bold text-foreground mb-4 text-center">Visão</h3>
                <p className="text-muted-foreground">
                  Ser referência nacional em soluções de energia, reconhecida pela qualidade dos 
                  serviços, inovação tecnológica e compromisso com a sustentabilidade.
                </p>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, ease: "easeOut", delay: 0.3 }}
            >
              <Card className="border-t-4 border-t-accent h-full">
              <CardContent className="p-8">
                <div className="flex items-center justify-center w-16 h-16 rounded-full bg-accent text-accent-foreground mb-4 mx-auto">
                  <Award className="h-8 w-8" />
                </div>
                <h3 className="text-2xl font-bold text-foreground mb-4 text-center">Valores</h3>
                <ul className="text-muted-foreground space-y-2">
                  <li>• Compromisso com a qualidade</li>
                  <li>• Ética e transparência</li>
                  <li>• Inovação constante</li>
                  <li>• Foco no cliente</li>
                  <li>• Responsabilidade social</li>
                </ul>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Numbers Section */}
      <section className="py-16 bg-background">
        <div className="container mx-auto px-4">
          <motion.h2 
            className="text-3xl font-bold text-center text-foreground mb-12"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: "easeOut" }}
          >
            PROJEMAC em Números
          </motion.h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <motion.div 
              className="text-center"
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, ease: "easeOut", delay: 0.1 }}
            >
              <div className="text-5xl font-bold text-secondary mb-2">30+</div>
              <p className="text-muted-foreground font-medium">Anos de Experiência</p>
            </motion.div>
            <motion.div 
              className="text-center"
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, ease: "easeOut", delay: 0.2 }}
            >
              <div className="text-5xl font-bold text-secondary mb-2">500+</div>
              <p className="text-muted-foreground font-medium">Clientes Atendidos</p>
            </motion.div>
            <motion.div 
              className="text-center"
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, ease: "easeOut", delay: 0.3 }}
            >
              <div className="text-5xl font-bold text-secondary mb-2">1000+</div>
              <p className="text-muted-foreground font-medium">Projetos Executados</p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-16 bg-muted">
        <div className="container mx-auto px-4">
          <motion.div 
            className="max-w-4xl mx-auto text-center"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: "easeOut" }}
          >
            <Users className="h-16 w-16 text-primary mx-auto mb-6" />
            <h2 className="text-3xl font-bold text-foreground mb-6">Nossa Equipe</h2>
            <p className="text-lg text-muted-foreground">
              Contamos com uma equipe multidisciplinar de engenheiros, técnicos e especialistas 
              em energia, todos comprometidos em oferecer as melhores soluções para nossos clientes. 
              Nossa equipe passa por treinamentos constantes para estar sempre atualizada com as 
              mais recentes tecnologias e melhores práticas do setor.
            </p>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default Empresa;
