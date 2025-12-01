import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { Battery, Zap, Users, Award, MapPin, BatteryCharging, Wrench, HardHat, Headphones } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import Hero from "@/components/Hero";
import { supabase } from "@/integrations/supabase/client";
import { motion } from "framer-motion";

const Home = () => {
  const [services, setServices] = useState<any[]>([]);
  const [sectors, setSectors] = useState<any[]>([]);
  const [content, setContent] = useState<Record<string, string>>({});

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    // Load services
    const { data: servicesData } = await supabase
      .from('services')
      .select('*')
      .order('order_index')
      .limit(2);
    
    if (servicesData) setServices(servicesData);

    // Load sectors
    const { data: sectorsData } = await supabase
      .from('sectors')
      .select('*')
      .order('order_index')
      .limit(6);
    
    if (sectorsData) setSectors(sectorsData);

    // Load content
    const { data: contentData } = await supabase
      .from('site_content')
      .select('key, value_text')
      .in('key', ['home_services_title', 'home_differentials_title', 'home_differentials_subtitle', 'home_sectors_title', 'home_cta_title', 'home_cta_subtitle']);

    if (contentData) {
      const contentMap: Record<string, string> = {};
      contentData.forEach(item => {
        contentMap[item.key] = item.value_text || '';
      });
      setContent(contentMap);
    }
  };

  const getIconComponent = (iconName: string | null) => {
    switch(iconName) {
      case 'Battery': return <Battery className="h-12 w-12" />;
      case 'BatteryCharging': return <BatteryCharging className="h-12 w-12" />;
      case 'Zap': return <Zap className="h-12 w-12" />;
      case 'Wrench': return <Wrench className="h-12 w-12" />;
      case 'HardHat': return <HardHat className="h-12 w-12" />;
      case 'Headphones': return <Headphones className="h-12 w-12" />;
      default: return <Battery className="h-12 w-12" />;
    }
  };

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

  return (
    <>
      <Hero />

      {/* Services Section */}
      <section className="py-16 bg-background">
        <div className="container mx-auto px-4">
          <motion.h2 
            className="text-3xl md:text-4xl font-bold text-center text-foreground mb-12"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            {content['home_services_title'] || 'Nossos Serviços'}
          </motion.h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {services.map((service, index) => (
              <motion.div
                key={service.id}
                initial={{ opacity: 0, scale: 0.97 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <Card className="border-2 hover:border-secondary transition-all duration-300 hover:shadow-primary h-full">
                <CardContent className="p-6 text-center">
                  <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-gradient-primary text-primary-foreground mb-4">
                    {getIconComponent(service.icon)}
                  </div>
                  <h3 className="text-xl font-semibold mb-3 text-foreground">
                    {service.title}
                  </h3>
                  <p className="text-muted-foreground">
                    {service.description}
                  </p>
                </CardContent>
              </Card>
              </motion.div>
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
          <motion.h2 
            className="text-3xl md:text-4xl font-bold text-center text-foreground mb-4"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            {content['home_differentials_title'] || 'Por Que Escolher a PROJEMAC?'}
          </motion.h2>
          <p className="text-center text-muted-foreground mb-12 max-w-2xl mx-auto">
            {content['home_differentials_subtitle'] || 'Somos referência em soluções de energia com anos de experiência no mercado'}
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {differentials.map((item, index) => (
              <motion.div 
                key={index}
                className="bg-card p-6 rounded-lg shadow-lg hover:shadow-primary transition-all duration-300"
                initial={{ opacity: 0, scale: 0.97 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
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
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Sectors Section */}
      <section className="py-16 bg-background">
        <div className="container mx-auto px-4">
          <motion.h2 
            className="text-3xl md:text-4xl font-bold text-center text-foreground mb-12"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            {content['home_sectors_title'] || 'Setores Atendidos'}
          </motion.h2>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {sectors.map((sector, index) => (
              <motion.div
                key={sector.id}
                initial={{ opacity: 0, scale: 0.97 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <Card className="hover:border-secondary transition-all duration-300 cursor-pointer h-full">
                <CardContent className="p-6 text-center">
                  <div className="text-4xl mb-3">{sector.icon}</div>
                  <h3 className="font-semibold text-foreground">{sector.name}</h3>
                </CardContent>
              </Card>
              </motion.div>
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
            {content['home_cta_title'] || 'Precisa de uma Solução em Energia?'}
          </h2>
          <p className="text-xl text-primary-foreground/90 mb-8 max-w-2xl mx-auto">
            {content['home_cta_subtitle'] || 'Entre em contato conosco e receba um orçamento personalizado para sua necessidade'}
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
