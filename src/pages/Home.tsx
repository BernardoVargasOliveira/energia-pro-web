import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { Battery, Zap, Users, Award, MapPin, BatteryCharging, Wrench, HardHat, Headphones, Phone, Mail, Factory, Store, CalendarDays, Building, Flame, BatteryWarning, Settings } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import Hero from "@/components/Hero";
import ProductsSection from "@/components/home/ProductsSection";
import WhyChooseSection from "@/components/home/WhyChooseSection";
import { supabase } from "@/integrations/supabase/client";
import { motion } from "framer-motion";

const Home = () => {
  const [services, setServices] = useState<any[]>([]);
  const [products, setProducts] = useState<any[]>([]);
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
      .limit(4);
    
    if (servicesData) setServices(servicesData);

    // Load products
    const { data: productsData } = await supabase
      .from('products')
      .select('*')
      .order('order_index')
      .limit(3);
    
    if (productsData) setProducts(productsData);

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
      case 'Battery': return <Battery className="h-8 w-8" />;
      case 'BatteryCharging': return <BatteryCharging className="h-8 w-8" />;
      case 'Zap': return <Zap className="h-8 w-8" />;
      case 'Wrench': return <Wrench className="h-8 w-8" />;
      case 'HardHat': return <HardHat className="h-8 w-8" />;
      case 'Headphones': return <Headphones className="h-8 w-8" />;
      default: return <Battery className="h-8 w-8" />;
    }
  };

  const getSectorIconComponent = (sectorName: string) => {
    const iconMap: Record<string, JSX.Element> = {
      "Indústria": <Factory className="h-10 w-10" />,
      "Comércio": <Store className="h-10 w-10" />,
      "Eventos": <CalendarDays className="h-10 w-10" />,
      "Condomínios": <Building className="h-10 w-10" />,
      "Siderúrgicas": <Flame className="h-10 w-10" />,
      "Parada de Energia": <BatteryWarning className="h-10 w-10" />,
      "Outros": <Settings className="h-10 w-10" />,
    };
    
    return iconMap[sectorName] || <Factory className="h-10 w-10" />;
  };

  return (
    <>
      <Hero />

      {/* Products Section */}
      <ProductsSection products={products} />

      {/* Services Section */}
      <section className="py-28 bg-gradient-to-b from-secondary/5 via-primary/5 to-transparent relative overflow-hidden">
        {/* Decorative background elements */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-accent/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-secondary/10 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2" />
        
        <div className="container mx-auto px-4 relative z-10">
          <motion.div
            className="text-center mb-20"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-5xl md:text-6xl lg:text-7xl font-bold text-foreground mb-6">
              {content['home_services_title'] || 'Nossos Serviços'}
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
              Serviços completos de locação, instalação e manutenção de geradores
            </p>
          </motion.div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {services.map((service, index) => (
              <motion.div
                key={service.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, ease: "easeOut", delay: index * 0.1 }}
              >
                <Card className="bg-gradient-card border-0 shadow-card h-full group hover:shadow-card-hover hover:-translate-y-2 transition-all duration-300 rounded-2xl overflow-hidden">
                  <CardContent className="p-8 text-center relative">
                    <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-primary via-secondary to-accent" />
                    <div className="inline-flex items-center justify-center w-20 h-20 rounded-2xl bg-gradient-to-br from-primary to-secondary text-white mb-6 group-hover:scale-110 group-hover:shadow-secondary transition-all duration-300">
                      {getIconComponent(service.icon)}
                    </div>
                    <h3 className="text-2xl font-bold mb-3 text-primary group-hover:text-secondary transition-colors">
                      {service.title}
                    </h3>
                    <p className="text-base text-muted-foreground leading-relaxed">
                      {service.description}
                    </p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>

          <div className="text-center mt-12">
            <Button asChild size="lg" className="bg-gradient-to-r from-primary to-secondary hover:from-primary-light hover:to-secondary-light text-white font-semibold shadow-primary hover:shadow-primary-lg transition-all duration-300">
              <Link to="/servicos">Ver Todos os Serviços</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Why Choose Section */}
      <WhyChooseSection />


      {/* Sectors Section */}
      <section className="py-28 bg-gradient-to-br from-primary via-primary-dark to-secondary relative overflow-hidden">
        {/* Decorative elements */}
        <div className="absolute top-20 left-10 w-32 h-32 border-2 border-white/10 rounded-full" />
        <div className="absolute bottom-20 right-10 w-48 h-48 border-2 border-accent/20 rounded-full" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-secondary/10 rounded-full blur-3xl" />
        
        <div className="container mx-auto px-4 relative z-10">
          <motion.div
            className="text-center mb-20"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-5xl md:text-6xl lg:text-7xl font-bold text-white mb-6">
              {content['home_sectors_title'] || 'Setores Atendidos'}
            </h2>
            <p className="text-xl text-white/80 max-w-3xl mx-auto leading-relaxed">
              Soluções especializadas para diversos segmentos do mercado
            </p>
          </motion.div>

          <div className="flex flex-wrap justify-center gap-6">
            {sectors.map((sector, index) => (
              <motion.div
                key={sector.id}
                className="w-[calc(50%-12px)] md:w-[calc(33.333%-16px)] lg:w-[180px]"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.05 }}
              >
                <Card className="bg-white/10 backdrop-blur-sm border border-white/20 cursor-pointer h-full group hover:bg-white hover:border-accent shadow-lg hover:shadow-elevated hover:-translate-y-2 transition-all duration-300 rounded-2xl">
                  <CardContent className="p-8 text-center flex flex-col items-center justify-center min-h-[180px]">
                    <div className="w-16 h-16 rounded-2xl bg-accent flex items-center justify-center mb-4 text-primary group-hover:scale-110 group-hover:shadow-accent transition-all duration-300">
                      {getSectorIconComponent(sector.name)}
                    </div>
                    <h3 className="font-bold text-sm text-white group-hover:text-primary transition-colors">{sector.name}</h3>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>

          <div className="text-center mt-12">
            <Button asChild size="lg" className="bg-accent text-accent-foreground hover:bg-accent-light font-semibold shadow-accent hover:shadow-accent-glow transition-all duration-300">
              <Link to="/setores">Ver Todos os Setores</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-28 bg-gradient-surface relative overflow-hidden">
        {/* Premium decorative elements */}
        <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-primary via-secondary to-accent" />
        <div className="absolute top-20 right-0 w-96 h-96 bg-accent/5 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-secondary/5 rounded-full blur-3xl" />
        
        <div className="container mx-auto px-4 relative z-10">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-5xl md:text-6xl lg:text-7xl font-bold mb-8">
              <span className="text-foreground">Pronto para </span>
              <span className="text-gradient-primary">garantir energia</span>
              <span className="text-foreground"> para o seu negócio?</span>
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
              {content['home_cta_subtitle'] || 'Entre em contato conosco e receba um orçamento personalizado para sua necessidade'}
            </p>
          </motion.div>

          {/* Contact Cards */}
          <motion.div 
            className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12 max-w-5xl mx-auto"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            {/* Telefone Card */}
            <div className="bg-gradient-card border-0 shadow-card rounded-2xl p-8 hover:shadow-card-hover hover:-translate-y-2 transition-all duration-300 group">
              <div className="flex flex-col items-center text-center">
                <div className="w-16 h-16 bg-gradient-to-br from-primary to-secondary rounded-2xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                  <Phone className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-bold text-foreground mb-2">Telefone</h3>
                <a 
                  href="tel:+553134953004" 
                  className="text-secondary hover:text-accent font-semibold transition-colors"
                >
                  (31) 3495-3004
                </a>
              </div>
            </div>

            {/* E-mail Card */}
            <div className="bg-gradient-card border-0 shadow-card rounded-2xl p-8 hover:shadow-card-hover hover:-translate-y-2 transition-all duration-300 group">
              <div className="flex flex-col items-center text-center">
                <div className="w-16 h-16 bg-gradient-to-br from-secondary to-primary rounded-2xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                  <Mail className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-bold text-foreground mb-2">E-mail</h3>
                <a 
                  href="mailto:contato@projemac.com.br" 
                  className="text-secondary hover:text-accent font-semibold transition-colors break-all"
                >
                  contato@projemac.com.br
                </a>
              </div>
            </div>

            {/* Localização Card */}
            <div className="bg-gradient-card border-0 shadow-card rounded-2xl p-8 hover:shadow-card-hover hover:-translate-y-2 transition-all duration-300 group">
              <div className="flex flex-col items-center text-center">
                <div className="w-16 h-16 bg-accent rounded-2xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                  <MapPin className="w-8 h-8 text-primary" />
                </div>
                <h3 className="text-xl font-bold text-foreground mb-2">Localização</h3>
                <p className="text-secondary font-semibold">
                  Belo Horizonte - MG
                </p>
              </div>
            </div>
          </motion.div>

          {/* CTA Buttons */}
          <motion.div
            className="text-center"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild size="lg" className="bg-accent text-accent-foreground hover:bg-accent-light hover:shadow-accent-glow font-bold text-lg px-10 h-16 shadow-accent hover:-translate-y-1 transition-all duration-300">
                <Link to="/contato">Solicitar Orçamento Agora</Link>
              </Button>
              <a 
                href="https://wa.me/553134953004?text=Olá,%20gostaria%20de%20solicitar%20um%20orçamento%20de%20geradores." 
                target="_blank" 
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center px-10 h-16 bg-gradient-to-r from-primary to-secondary text-white hover:from-primary-light hover:to-secondary-light rounded-md font-bold text-lg transition-all duration-300 shadow-primary hover:shadow-primary-lg hover:-translate-y-1"
              >
                Falar no WhatsApp
              </a>
            </div>
          </motion.div>
        </div>
      </section>
    </>
  );
};

export default Home;
