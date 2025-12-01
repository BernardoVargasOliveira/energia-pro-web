import { Link } from "react-router-dom";
import { Battery, Zap, Users, Award, MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import Hero from "@/components/Hero";

const Home = () => {
  const services = [
    {
      icon: <Battery className="h-12 w-12" />,
      title: "Locação de Geradores",
      description: "Grupos geradores de diversas potências para locação de curta e longa duração."
    },
    {
      icon: <Zap className="h-12 w-12" />,
      title: "Projetos e Instalações",
      description: "Desenvolvimento de projetos e instalação completa de sistemas de energia."
    },
  ];

  const differentials = [
    {
      icon: <Users className="h-10 w-10" />,
      title: "Equipe Especializada",
      description: "Profissionais qualificados e experientes em sistemas de energia."
    },
    {
      icon: <MapPin className="h-10 w-10" />,
      title: "Cobertura Regional",
      description: "Atendimento em todo estado de Minas Gerais."
    },
    {
      icon: <Award className="h-10 w-10" />,
      title: "Equipamentos Modernos",
      description: "Geradores de última geração das melhores marcas."
    },
  ];

  const sectors = [
    { name: "Indústria", icon: "🏭" },
    { name: "Comércio", icon: "🏪" },
    { name: "Hospitais", icon: "🏥" },
    { name: "Eventos", icon: "🎪" },
    { name: "Condomínios", icon: "🏢" },
    { name: "Data Centers", icon: "💻" },
  ];

  return (
    <>
      <Hero />

      {/* Services Section */}
      <section className="py-16 bg-background">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-center text-foreground mb-12">
            Nossos Serviços
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {services.map((service, index) => (
              <Card 
                key={index} 
                className="border-2 hover:border-secondary transition-all duration-300 hover:shadow-primary animate-fade-in"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <CardContent className="p-6 text-center">
                  <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-gradient-primary text-primary-foreground mb-4">
                    {service.icon}
                  </div>
                  <h3 className="text-xl font-semibold mb-3 text-foreground">
                    {service.title}
                  </h3>
                  <p className="text-muted-foreground">
                    {service.description}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="text-center mt-12">
            <Button asChild size="lg" className="bg-secondary text-secondary-foreground hover:bg-secondary/90 font-semibold">
              <Link to="/servicos">Ver Todos os Serviços</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Differentials Section */}
      <section className="py-16 bg-muted">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-center text-foreground mb-4">
            Por Que Escolher a PROJEMAC?
          </h2>
          <p className="text-center text-muted-foreground mb-12 max-w-2xl mx-auto">
            Somos referência em soluções de energia com anos de experiência no mercado
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {differentials.map((item, index) => (
              <div 
                key={index}
                className="bg-card p-6 rounded-lg shadow-lg hover:shadow-primary transition-all duration-300 animate-fade-in"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="text-secondary mb-4">
                  {item.icon}
                </div>
                <h3 className="text-lg font-semibold mb-2 text-card-foreground">
                  {item.title}
                </h3>
                <p className="text-muted-foreground text-sm">
                  {item.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Sectors Section */}
      <section className="py-16 bg-background">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-center text-foreground mb-12">
            Setores Atendidos
          </h2>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {sectors.map((sector, index) => (
              <Card 
                key={index}
                className="hover:border-secondary transition-all duration-300 cursor-pointer animate-fade-in"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <CardContent className="p-6 text-center">
                  <div className="text-4xl mb-3">{sector.icon}</div>
                  <h3 className="font-semibold text-foreground">{sector.name}</h3>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="text-center mt-12">
            <Button asChild size="lg" variant="outline" className="font-semibold">
              <Link to="/setores">Ver Todos os Setores</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-primary">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-primary-foreground mb-6">
            Precisa de uma Solução em Energia?
          </h2>
          <p className="text-xl text-primary-foreground/90 mb-8 max-w-2xl mx-auto">
            Entre em contato conosco e receba um orçamento personalizado para sua necessidade
          </p>
          <Button asChild size="lg" className="bg-accent text-accent-foreground hover:bg-accent/90 font-semibold text-lg shadow-accent">
            <Link to="/contato">Solicitar Orçamento Agora</Link>
          </Button>
        </div>
      </section>
    </>
  );
};

export default Home;
