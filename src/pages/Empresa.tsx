import { useEffect } from "react";
import { Award, Target, Eye } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { motion } from "framer-motion";
import { PageHero } from "@/components/PageHero";
import empresaSede from "@/assets/empresa-sede.jpg";
// @ts-ignore
import empresaSedeSrcset from "@/assets/empresa-sede.jpg?w=640;1024;1920&format=webp&as=srcset";

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
                Sabemos que a escolha do fornecedor de energia é do cliente.
              </p>
              <p>
                Nosso compromisso é apresentar todas as alternativas técnicas disponíveis, garantindo 
                uma locação segura, assertiva e adequada a cada necessidade.
              </p>
            </div>

            {/* Company Image */}
            <div className="mt-12 rounded-2xl overflow-hidden shadow-elevated">
              <img
                src={empresaSede}
                srcSet={empresaSedeSrcset}
                sizes="(max-width: 768px) 100vw, (max-width: 1024px) 100vw, 896px"
                alt="Sede da Projemac com frota de veículos"
                className="w-full h-[400px] object-cover"
                loading="lazy"
                width={1920}
                height={1276}
              />
              <div className="bg-primary p-4">
                <p className="text-primary-foreground font-semibold text-center">Nossa Sede e Frota de Atendimento</p>
              </div>
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

    </div>
  );
};

export default Empresa;
