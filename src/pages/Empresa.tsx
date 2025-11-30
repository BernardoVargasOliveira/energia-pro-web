import { Award, Target, Eye, Users } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

const Empresa = () => {
  return (
    <div className="min-h-screen">
      {/* Header Section */}
      <section className="bg-gradient-primary py-16">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl md:text-5xl font-bold text-primary-foreground text-center mb-6">
            A Empresa
          </h1>
          <p className="text-xl text-primary-foreground/90 text-center max-w-3xl mx-auto">
            Especialistas em soluções de energia com grupos geradores
          </p>
        </div>
      </section>

      {/* About Section */}
      <section className="py-16 bg-background">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-foreground mb-6">Nossa História</h2>
            <div className="space-y-4 text-muted-foreground text-lg">
              <p>
                A PROJEMAC é uma empresa especializada em soluções completas para geração de energia elétrica, 
                atuando no mercado brasileiro com foco em excelência e comprometimento com nossos clientes.
              </p>
              <p>
                Com anos de experiência no setor, oferecemos serviços de locação, venda, manutenção e 
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
          </div>
        </div>
      </section>

      {/* Mission, Vision, Values */}
      <section className="py-16 bg-muted">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card className="border-t-4 border-t-primary">
              <CardContent className="p-8 text-center">
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary text-primary-foreground mb-4">
                  <Target className="h-8 w-8" />
                </div>
                <h3 className="text-2xl font-bold text-foreground mb-4">Missão</h3>
                <p className="text-muted-foreground">
                  Fornecer soluções confiáveis e eficientes em geração de energia, superando as 
                  expectativas de nossos clientes através de tecnologia de ponta e atendimento personalizado.
                </p>
              </CardContent>
            </Card>

            <Card className="border-t-4 border-t-secondary">
              <CardContent className="p-8 text-center">
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-secondary text-secondary-foreground mb-4">
                  <Eye className="h-8 w-8" />
                </div>
                <h3 className="text-2xl font-bold text-foreground mb-4">Visão</h3>
                <p className="text-muted-foreground">
                  Ser referência nacional em soluções de energia, reconhecida pela qualidade dos 
                  serviços, inovação tecnológica e compromisso com a sustentabilidade.
                </p>
              </CardContent>
            </Card>

            <Card className="border-t-4 border-t-accent">
              <CardContent className="p-8 text-center">
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-accent text-accent-foreground mb-4">
                  <Award className="h-8 w-8" />
                </div>
                <h3 className="text-2xl font-bold text-foreground mb-4">Valores</h3>
                <ul className="text-muted-foreground space-y-2">
                  <li>• Compromisso com a qualidade</li>
                  <li>• Ética e transparência</li>
                  <li>• Inovação constante</li>
                  <li>• Foco no cliente</li>
                  <li>• Responsabilidade social</li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Numbers Section */}
      <section className="py-16 bg-background">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center text-foreground mb-12">
            PROJEMAC em Números
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="text-5xl font-bold text-secondary mb-2">15+</div>
              <p className="text-muted-foreground font-medium">Anos de Experiência</p>
            </div>
            <div className="text-center">
              <div className="text-5xl font-bold text-secondary mb-2">500+</div>
              <p className="text-muted-foreground font-medium">Clientes Atendidos</p>
            </div>
            <div className="text-center">
              <div className="text-5xl font-bold text-secondary mb-2">1000+</div>
              <p className="text-muted-foreground font-medium">Projetos Executados</p>
            </div>
            <div className="text-center">
              <div className="text-5xl font-bold text-secondary mb-2">24/7</div>
              <p className="text-muted-foreground font-medium">Suporte Técnico</p>
            </div>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-16 bg-muted">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <Users className="h-16 w-16 text-primary mx-auto mb-6" />
            <h2 className="text-3xl font-bold text-foreground mb-6">Nossa Equipe</h2>
            <p className="text-lg text-muted-foreground">
              Contamos com uma equipe multidisciplinar de engenheiros, técnicos e especialistas 
              em energia, todos comprometidos em oferecer as melhores soluções para nossos clientes. 
              Nossa equipe passa por treinamentos constantes para estar sempre atualizada com as 
              mais recentes tecnologias e melhores práticas do setor.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Empresa;
