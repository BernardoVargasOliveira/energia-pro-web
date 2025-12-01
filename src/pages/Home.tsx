import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { Battery, Zap, Users, Award, MapPin, BatteryCharging, Wrench, HardHat, Headphones, Phone, Mail } from "lucide-react";
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

  return (
    <>
      <Hero />

      {/* Products Section */}
      <ProductsSection products={products} />

      {/* Services Section */}
      <section className="py-20 bg-muted">
        <div className="container mx-auto px-4">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
              {content['home_services_title'] || 'Nossos Serviços'}
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
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
                <Card className="border-2 h-full group hover:border-primary transition-all duration-300">
                  <CardContent className="p-6 text-center">
                    <div className="inline-flex items-center justify-center w-16 h-16 rounded-xl bg-gradient-primary text-primary-foreground mb-4 group-hover:scale-110 transition-transform">
                      {getIconComponent(service.icon)}
                    </div>
                    <h3 className="text-lg font-bold mb-2 text-foreground group-hover:text-primary transition-colors">
                      {service.title}
                    </h3>
                    <p className="text-sm text-muted-foreground">
                      {service.description}
                    </p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>

          <div className="text-center mt-12">
            <Button asChild size="lg" variant="outline" className="font-semibold">
              <Link to="/servicos">Ver Todos os Serviços</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Why Choose Section */}
      <WhyChooseSection />


      {/* Sectors Section */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
              {content['home_sectors_title'] || 'Setores Atendidos'}
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Soluções especializadas para diversos segmentos do mercado
            </p>
          </motion.div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
            {sectors.map((sector, index) => (
              <motion.div
                key={sector.id}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.05 }}
              >
                <Card className="hover:border-primary cursor-pointer h-full group transition-all duration-300">
                  <CardContent className="p-6 text-center">
                    <div className="text-5xl mb-3 group-hover:scale-110 transition-transform">{sector.icon}</div>
                    <h3 className="font-bold text-sm text-foreground group-hover:text-primary transition-colors">{sector.name}</h3>
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
      <section className="py-20 bg-gradient-to-b from-secondary/90 to-primary relative overflow-hidden">
        <div className="container mx-auto px-4 relative z-10">
          <motion.div
            className="text-center mb-12"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
              {content['home_cta_title'] || 'Pronto para garantir energia para o seu negócio?'}
            </h2>
            <p className="text-xl text-white/90 max-w-3xl mx-auto">
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
            <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl p-6 hover:bg-white/15 hover:scale-105 hover:shadow-2xl transition-all duration-300">
              <div className="flex flex-col items-center text-center">
                <div className="w-16 h-16 bg-accent/20 rounded-full flex items-center justify-center mb-4">
                  <Phone className="w-8 h-8 text-accent" />
                </div>
                <h3 className="text-xl font-bold text-white mb-2">Telefone</h3>
                <a 
                  href="tel:+553134953004" 
                  className="text-white/90 hover:text-accent transition-colors"
                >
                  (31) 3495-3004
                </a>
              </div>
            </div>

            {/* E-mail Card */}
            <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl p-6 hover:bg-white/15 hover:scale-105 hover:shadow-2xl transition-all duration-300">
              <div className="flex flex-col items-center text-center">
                <div className="w-16 h-16 bg-accent/20 rounded-full flex items-center justify-center mb-4">
                  <Mail className="w-8 h-8 text-accent" />
                </div>
                <h3 className="text-xl font-bold text-white mb-2">E-mail</h3>
                <a 
                  href="mailto:contato@projemac.com.br" 
                  className="text-white/90 hover:text-accent transition-colors break-all"
                >
                  contato@projemac.com.br
                </a>
              </div>
            </div>

            {/* Localização Card */}
            <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl p-6 hover:bg-white/15 hover:scale-105 hover:shadow-2xl transition-all duration-300">
              <div className="flex flex-col items-center text-center">
                <div className="w-16 h-16 bg-accent/20 rounded-full flex items-center justify-center mb-4">
                  <MapPin className="w-8 h-8 text-accent" />
                </div>
                <h3 className="text-xl font-bold text-white mb-2">Localização</h3>
                <p className="text-white/90">
                  Belo Horizonte - MG<br />
                  Atendimento em todo Brasil
                </p>
              </div>
            </div>
          </motion.div>

          {/* CTA Button */}
          <motion.div
            className="text-center"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <Button asChild size="lg" className="bg-accent text-accent-foreground hover:bg-accent/90 font-bold text-lg px-8 h-14 shadow-accent transition-all hover:scale-105">
              <Link to="/contato">Solicitar Orçamento Agora</Link>
            </Button>
          </motion.div>
        </div>
      </section>
    </>
  );
};

export default Home;
