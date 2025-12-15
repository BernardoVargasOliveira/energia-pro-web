import { useEffect } from "react";
import { Award, Target, Eye, Users } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { motion } from "framer-motion";
import { PageHero } from "@/components/PageHero";

const Empresa = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  
  return (
    <div className="min-h-screen">
      <PageHero 
        title="A Empresa"
        subtitle="Especialistas em soluções de energia com grupos geradores"
      />

      {/* About Section */}
      <section className="py-16 bg-background mt-8 md:mt-10">
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
                A PROJEMAC é especializada em soluções completas para geração de energia elétrica, 
                atuando no mercado brasileiro com foco em excelência, segurança e confiabilidade.
              </p>
              <p>
                Atuamos com locação e instalação de grupos geradores para diversos segmentos, 
                atendendo desde operações pontuais até projetos industriais de grande porte.
              </p>
              <p>
                Contamos com uma equipe técnica altamente qualificada, preparada para analisar cada 
                cenário e entregar a solução correta, no local certo e no tempo certo.
              </p>
              <p>
                Trabalhamos com as melhores marcas do mercado e seguimos rigorosos padrões de qualidade, 
                assegurando desempenho, durabilidade e total satisfação dos nossos clientes.
              </p>
            </div>

            <h3 className="text-2xl font-bold text-foreground mt-10 mb-4">Nosso Compromisso</h3>
            <div className="space-y-4 text-muted-foreground text-lg">
              <p>
                Na Projemac, respeitamos a escolha do cliente ao nos confiar sua operação energética. 
                Nosso dever é apresentar todas as opções técnicas disponíveis, garantindo uma locação 
                assertiva, segura e adequada a cada necessidade.
              </p>
              <p>
                Esse compromisso orienta cada projeto, atendimento e decisão da nossa equipe.
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
          
          <div className="grid gap-6 md:grid-cols-3 max-w-5xl mx-auto mt-10">
            <motion.div 
              className="bg-white rounded-2xl border border-primary/10 shadow-md px-8 py-8 flex flex-col items-center text-center transition-all duration-200 ease-out hover:-translate-y-1 hover:shadow-lg hover:border-primary/40 hover:bg-primary/5"
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, ease: "easeOut", delay: 0.1 }}
            >
              <div className="text-4xl md:text-5xl font-bold text-primary mb-2">30+</div>
              <p className="text-sm md:text-base text-slate-600">Anos de Experiência</p>
            </motion.div>
            <motion.div 
              className="bg-white rounded-2xl border border-primary/10 shadow-md px-8 py-8 flex flex-col items-center text-center transition-all duration-200 ease-out hover:-translate-y-1 hover:shadow-lg hover:border-primary/40 hover:bg-primary/5"
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, ease: "easeOut", delay: 0.2 }}
            >
              <div className="text-4xl md:text-5xl font-bold text-primary mb-2">500+</div>
              <p className="text-sm md:text-base text-slate-600">Clientes Atendidos</p>
            </motion.div>
            <motion.div 
              className="bg-white rounded-2xl border border-primary/10 shadow-md px-8 py-8 flex flex-col items-center text-center transition-all duration-200 ease-out hover:-translate-y-1 hover:shadow-lg hover:border-primary/40 hover:bg-primary/5"
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, ease: "easeOut", delay: 0.3 }}
            >
              <div className="text-4xl md:text-5xl font-bold text-primary mb-2">1000+</div>
              <p className="text-sm md:text-base text-slate-600">Projetos Executados</p>
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
