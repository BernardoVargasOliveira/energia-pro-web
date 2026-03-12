import { useEffect } from "react";
import { useParams, Link, Navigate } from "react-router-dom";
import { CheckCircle2, MapPin, Phone, Zap, Shield, Wrench, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

interface CityData {
  cidade: string;
  distanciaBH: string;
  contexto: string;
  aplicacoes: string[];
  descricaoSeo: string;
  vizinhas: string[];
}

const cidades: Record<string, CityData> = {
  betim: {
    cidade: "Betim",
    distanciaBH: "40 km de Belo Horizonte",
    contexto:
      "Betim é um dos maiores polos industriais de Minas Gerais, com destaque para a indústria automotiva, refinaria de petróleo e polo petroquímico. A cidade abriga grandes plantas industriais que dependem de energia ininterrupta para manter a produção.",
    aplicacoes: [
      "Indústrias automotivas e fornecedoras (Fiat, autopeças)",
      "Refinaria e polo petroquímico",
      "Condomínios industriais e parques logísticos",
      "Obras de infraestrutura e construção civil",
      "Eventos, feiras e convenções empresariais",
    ],
    descricaoSeo:
      "Aluguel de geradores em Betim MG. A PROJEMAC atende indústrias automotivas, refinaria e obras em Betim com grupos geradores de 6 a 4000 kVA. Instalação e suporte 24h inclusos.",
    vizinhas: ["contagem", "ibirite", "brumadinho"],
  },
  contagem: {
    cidade: "Contagem",
    distanciaBH: "15 km de Belo Horizonte",
    contexto:
      "Contagem é o segundo maior município industrial do estado, com centenas de indústrias nos segmentos metalúrgico, alimentício e de plásticos. A proximidade com BH torna Contagem um ponto estratégico para atendimento rápido de demandas energéticas.",
    aplicacoes: [
      "Parques industriais e galpões metalúrgicos",
      "Supermercados e centros comerciais",
      "Condomínios residenciais de grande porte",
      "Obras urbanas e construção civil",
      "Hospitais, clínicas e unidades de saúde",
    ],
    descricaoSeo:
      "Aluguel de geradores em Contagem MG. A PROJEMAC oferece locação de grupos geradores para indústrias, comércios e obras em Contagem. Atendimento 24h com instalação inclusa.",
    vizinhas: ["betim", "ibirite", "sabara"],
  },
  "santa-luzia": {
    cidade: "Santa Luzia",
    distanciaBH: "20 km de Belo Horizonte",
    contexto:
      "Santa Luzia é uma cidade em crescimento acelerado na Região Metropolitana de BH, com forte setor de mineração, logística e construção civil. A expansão de condomínios e centros de distribuição cria demanda constante por soluções de energia confiáveis.",
    aplicacoes: [
      "Empresas de mineração e beneficiamento de minérios",
      "Centros logísticos e armazéns frigorificados",
      "Condomínios residenciais e comerciais",
      "Obras de grande porte e loteamentos",
      "Feiras, eventos e espaços de lazer",
    ],
    descricaoSeo:
      "Aluguel de geradores em Santa Luzia MG. A PROJEMAC atende mineração, construção e eventos em Santa Luzia com geradores de diversas potências. Solicite orçamento.",
    vizinhas: ["vespasiano", "lagoa-santa", "sabara"],
  },
  "ribeirao-das-neves": {
    cidade: "Ribeirão das Neves",
    distanciaBH: "25 km de Belo Horizonte",
    contexto:
      "Ribeirão das Neves é um dos municípios mais populosos da Grande BH, com crescente setor comercial, de serviços e construção civil. A cidade vive um momento de expansão imobiliária que demanda soluções energéticas temporárias e de backup.",
    aplicacoes: [
      "Comércio, lojas de departamentos e shopping centers",
      "Obras de construção civil e loteamentos",
      "Condomínios residenciais em fase de obras",
      "Eventos, festas e espaços de entretenimento",
      "Pequenas e médias empresas de serviços",
    ],
    descricaoSeo:
      "Aluguel de geradores em Ribeirão das Neves MG. A PROJEMAC fornece grupos geradores para comércios, obras e condomínios em Ribeirão das Neves. Entrega e instalação rápidas.",
    vizinhas: ["contagem", "esmeraldas", "pedro-leopoldo"],
  },
  ibirite: {
    cidade: "Ibirité",
    distanciaBH: "20 km de Belo Horizonte",
    contexto:
      "Ibirité possui um polo industrial diversificado e setor logístico em expansão, com grande malha de condomínios residenciais e galpões industriais. A cidade é ponto estratégico para transportadoras e distribuidores que necessitam de energia ininterrupta.",
    aplicacoes: [
      "Indústrias e galpões industriais variados",
      "Transportadoras e centros de distribuição",
      "Condomínios e conjuntos habitacionais",
      "Comércio local e supermercados",
      "Eventos, shows e estruturas temporárias",
    ],
    descricaoSeo:
      "Aluguel de geradores em Ibirité MG. Locação de grupos geradores para indústrias, logística e condomínios em Ibirité. PROJEMAC — instalação e suporte inclusos.",
    vizinhas: ["betim", "contagem", "brumadinho"],
  },
  sabara: {
    cidade: "Sabará",
    distanciaBH: "25 km de Belo Horizonte",
    contexto:
      "Sabará é uma cidade histórica com setor minerário e siderúrgico relevante, além de crescimento no segmento de construção civil. A atividade industrial e os eventos culturais fazem de Sabará um importante destino para locação de geradores.",
    aplicacoes: [
      "Empresas siderúrgicas e mineradoras",
      "Obras de infraestrutura e urbanização",
      "Comércio e serviços no centro histórico",
      "Eventos, festas culturais e religiosas",
      "Condomínios residenciais em expansão",
    ],
    descricaoSeo:
      "Aluguel de geradores em Sabará MG. A PROJEMAC atende mineradoras, siderúrgicas e eventos culturais em Sabará com geradores de diversas potências. Solicite orçamento.",
    vizinhas: ["santa-luzia", "nova-lima", "contagem"],
  },
  "nova-lima": {
    cidade: "Nova Lima",
    distanciaBH: "20 km de Belo Horizonte",
    contexto:
      "Nova Lima é polo de mineração de ouro e referência em condomínios fechados de alto padrão, data centers e empresas de tecnologia. A demanda por energia de backup é crítica nessa cidade, especialmente para condomínios e operações de TI.",
    aplicacoes: [
      "Mineradoras e indústrias de extração de ouro",
      "Condomínios fechados de alto padrão",
      "Data centers e empresas de tecnologia",
      "Shopping centers e centros comerciais",
      "Obras e empreendimentos imobiliários premium",
    ],
    descricaoSeo:
      "Aluguel de geradores em Nova Lima MG. A PROJEMAC fornece grupos geradores para mineradoras, condomínios e data centers em Nova Lima. Atendimento 24h.",
    vizinhas: ["sabara", "brumadinho", "contagem"],
  },
  vespasiano: {
    cidade: "Vespasiano",
    distanciaBH: "25 km de Belo Horizonte",
    contexto:
      "Vespasiano é um município estratégico no eixo norte da Grande BH, com forte desenvolvimento industrial, logístico e agroindustrial. A cidade é polo de distribuição para toda a região norte da Grande BH.",
    aplicacoes: [
      "Indústrias e parques industriais em expansão",
      "Agroindústria, frigoríficos e processadoras",
      "Transportadoras e centros de distribuição",
      "Construção civil e obras de urbanização",
      "Comércio e serviços em crescimento acelerado",
    ],
    descricaoSeo:
      "Aluguel de geradores em Vespasiano MG. Locação de geradores para indústrias, agroindústria e obras em Vespasiano MG. PROJEMAC com atendimento rápido e instalação inclusa.",
    vizinhas: ["lagoa-santa", "santa-luzia", "pedro-leopoldo"],
  },
  "lagoa-santa": {
    cidade: "Lagoa Santa",
    distanciaBH: "35 km de Belo Horizonte",
    contexto:
      "Lagoa Santa é uma cidade turística e universitária próxima ao Aeroporto Internacional de Confins, com expansão imobiliária e de serviços. A vocação turística e hoteleira da cidade cria demanda por geradores para eventos, hotéis e obras.",
    aplicacoes: [
      "Eventos ao ar livre, festas e shows",
      "Hotéis, pousadas e resorts",
      "Condomínios residenciais e de veraneio",
      "Obras e empreendimentos imobiliários",
      "Serviços aeroportuários e logísticos próximos ao Confins",
    ],
    descricaoSeo:
      "Aluguel de geradores em Lagoa Santa MG. A PROJEMAC atende eventos, hotéis e obras em Lagoa Santa com geradores de diversas potências. Solicite orçamento agora.",
    vizinhas: ["vespasiano", "matozinhos", "pedro-leopoldo"],
  },
  "sete-lagoas": {
    cidade: "Sete Lagoas",
    distanciaBH: "75 km de Belo Horizonte",
    contexto:
      "Sete Lagoas é um dos maiores polos industriais e siderúrgicos do interior de Minas Gerais, referência nacional em produção de ferro-gusa e aço. As grandes plantas siderúrgicas de Sete Lagoas demandam energia ininterrupta e sistemas de backup robustos.",
    aplicacoes: [
      "Siderúrgicas e indústrias de ferro-gusa e aço",
      "Indústrias automotivas e de autopeças",
      "Obras industriais e de infraestrutura de grande porte",
      "Eventos, feiras regionais e shows",
      "Hospitais, clínicas e unidades de saúde",
    ],
    descricaoSeo:
      "Aluguel de geradores em Sete Lagoas MG. A PROJEMAC atende siderúrgicas, indústrias e eventos em Sete Lagoas com grupos geradores robustos. Atendimento 24h.",
    vizinhas: ["pedro-leopoldo", "matozinhos", "esmeraldas"],
  },
  esmeraldas: {
    cidade: "Esmeraldas",
    distanciaBH: "35 km de Belo Horizonte",
    contexto:
      "Esmeraldas é um município em crescimento na Região Metropolitana de BH, com destaque para o setor de construção civil, novos loteamentos e logística. A expansão urbana de Esmeraldas cria demanda constante por geradores em obras e novos empreendimentos.",
    aplicacoes: [
      "Construção civil e loteamentos em expansão",
      "Condomínios residenciais e comerciais",
      "Empresas de logística e transporte",
      "Comércio local em crescimento",
      "Eventos e estruturas temporárias",
    ],
    descricaoSeo:
      "Aluguel de geradores em Esmeraldas MG. Locação de grupos geradores para obras, condomínios e comércios em Esmeraldas MG. PROJEMAC — qualidade, pontualidade e suporte técnico.",
    vizinhas: ["ribeirao-das-neves", "pedro-leopoldo", "sete-lagoas"],
  },
  brumadinho: {
    cidade: "Brumadinho",
    distanciaBH: "60 km de Belo Horizonte",
    contexto:
      "Brumadinho vive um processo de reconstrução e retomada econômica, com projetos de infraestrutura, turismo e gastronomia. A cidade recebe constantes obras de recuperação ambiental e novos empreendimentos que necessitam de energia confiável.",
    aplicacoes: [
      "Projetos de infraestrutura e recuperação ambiental",
      "Empresas de mineração e construção civil",
      "Hotéis, pousadas e restaurantes",
      "Eventos, festivais culturais e turísticos",
      "Obras de urbanização e saneamento",
    ],
    descricaoSeo:
      "Aluguel de geradores em Brumadinho MG. A PROJEMAC fornece grupos geradores para obras, turismo e eventos em Brumadinho. Instalação profissional e suporte técnico.",
    vizinhas: ["betim", "ibirite", "nova-lima"],
  },
  "pedro-leopoldo": {
    cidade: "Pedro Leopoldo",
    distanciaBH: "35 km de Belo Horizonte",
    contexto:
      "Pedro Leopoldo é o maior polo cimenteiro e de mineração calcária de Minas Gerais, com importante parque industrial e crescimento no setor agropecuário. A indústria pesada da cidade exige soluções de energia de alta confiabilidade.",
    aplicacoes: [
      "Indústrias cimenteiras e de mineração calcária",
      "Agroindústria, frigoríficos e produção rural",
      "Condomínios e construção civil",
      "Eventos agropecuários e feiras rurais",
      "Comércio e serviços industriais",
    ],
    descricaoSeo:
      "Aluguel de geradores em Pedro Leopoldo MG. A PROJEMAC atende indústrias cimenteiras, agroindústria e eventos em Pedro Leopoldo. Locação com suporte técnico especializado.",
    vizinhas: ["lagoa-santa", "vespasiano", "sete-lagoas"],
  },
  matozinhos: {
    cidade: "Matozinhos",
    distanciaBH: "40 km de Belo Horizonte",
    contexto:
      "Matozinhos está estrategicamente posicionado ao lado do Aeroporto Internacional de Confins, com crescimento industrial e de serviços impulsionado pela logística aeroportuária. A cidade concentra empresas de carga aérea, indústrias e hotéis de negócios.",
    aplicacoes: [
      "Indústrias e zonas industriais próximas ao aeroporto",
      "Logística e transporte aéreo de cargas",
      "Construção civil e obras de infraestrutura",
      "Hotéis e serviços para viajantes de negócios",
      "Eventos corporativos, feiras e exposições",
    ],
    descricaoSeo:
      "Aluguel de geradores em Matozinhos MG. Locação de geradores para indústrias, logística aeroportuária e eventos em Matozinhos MG. PROJEMAC — entrega e instalação incluídas.",
    vizinhas: ["lagoa-santa", "pedro-leopoldo", "vespasiano"],
  },
};

const slugToName: Record<string, string> = Object.fromEntries(
  Object.entries(cidades).map(([slug, d]) => [slug, d.cidade])
);

const CidadePage = () => {
  const { slug } = useParams<{ slug: string }>();

  const data = slug ? cidades[slug] : undefined;

  useEffect(() => {
    if (!data) return;
    window.scrollTo(0, 0);
    document.title = `Aluguel de Geradores em ${data.cidade} | PROJEMAC`;
    const metaDesc = document.querySelector('meta[name="description"]');
    if (metaDesc) metaDesc.setAttribute("content", data.descricaoSeo);
    const canonical = document.querySelector('link[rel="canonical"]');
    if (canonical) canonical.setAttribute("href", `https://www.projemac.com.br/geradores-${slug}`);
  }, [data, slug]);

  if (!data) return <Navigate to="/404" replace />;

  const whatsappUrl = `https://wa.me/5531995266402?text=Olá,%20gostaria%20de%20solicitar%20um%20orçamento%20de%20geradores%20em%20${encodeURIComponent(data.cidade)}.`;

  return (
    <div className="min-h-screen">
      {/* JSON-LD LocalBusiness para a cidade */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "LocalBusiness",
            name: `PROJEMAC Geradores — ${data.cidade}`,
            description: data.descricaoSeo,
            url: `https://www.projemac.com.br/geradores-${slug}`,
            telephone: "+553134953004",
            email: "contato@projemac.com.br",
            address: {
              "@type": "PostalAddress",
              addressLocality: "Belo Horizonte",
              addressRegion: "MG",
              addressCountry: "BR",
            },
            areaServed: {
              "@type": "City",
              name: data.cidade,
              containedInPlace: {
                "@type": "State",
                name: "Minas Gerais",
              },
            },
            serviceType: "Locação de Grupos Geradores de Energia",
          }),
        }}
      />

      {/* Hero */}
      <section className="bg-primary py-20 md:py-28">
        <div className="container mx-auto px-4 text-center">
          <div className="flex items-center justify-center gap-2 text-accent text-sm font-semibold mb-4 uppercase tracking-widest">
            <MapPin className="w-4 h-4" />
            Região Metropolitana de BH · {data.distanciaBH}
          </div>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight">
            Aluguel de Geradores em{" "}
            <span className="text-accent">{data.cidade}</span>
          </h1>
          <p className="text-xl text-white/90 mb-10 max-w-3xl mx-auto leading-relaxed">
            A PROJEMAC atende {data.cidade} e toda a região com locação de grupos
            geradores de 6 a 4000 kVA. Instalação, manutenção e suporte técnico
            inclusos.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              asChild
              size="lg"
              className="bg-accent text-accent-foreground hover:bg-accent/90 font-bold text-lg px-8 h-14"
            >
              <Link to="/contato">Solicitar Orçamento em {data.cidade}</Link>
            </Button>
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center px-8 h-14 bg-white/10 border-2 border-white/40 text-white hover:bg-white hover:text-primary rounded-md font-bold text-lg transition-all"
            >
              <Phone className="mr-2 h-5 w-5" />
              Falar no WhatsApp
            </a>
          </div>
        </div>
      </section>

      {/* Contexto da cidade */}
      <section className="py-16 bg-background">
        <div className="container mx-auto px-4 max-w-4xl">
          <h2 className="text-3xl font-bold text-foreground mb-6">
            Locação de Geradores em {data.cidade}, MG
          </h2>
          <p className="text-muted-foreground text-lg leading-relaxed mb-6">
            {data.contexto}
          </p>
          <p className="text-muted-foreground text-lg leading-relaxed mb-6">
            A PROJEMAC atende {data.cidade} há mais de 30 anos, com entrega,
            instalação e suporte técnico especializado. Nossa frota de geradores
            cobre toda a Região Metropolitana de BH, chegando a {data.cidade}{" "}
            com agilidade e segurança.
          </p>
          <p className="text-muted-foreground text-lg leading-relaxed">
            Seja para uma emergência de energia, parada programada de manutenção
            ou um grande evento em {data.cidade}, a PROJEMAC possui o equipamento
            certo para a sua demanda — de geradores portáteis de 6 kVA a usinas
            de 4000 kVA com paralelismo.
          </p>
        </div>
      </section>

      {/* Aplicações */}
      <section className="py-16 bg-muted">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-foreground mb-4">
              Quem Usamos Geradores em {data.cidade}?
            </h2>
            <p className="text-muted-foreground mb-8">
              Atendemos todos os segmentos que precisam de energia confiável em {data.cidade}:
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-10">
              {data.aplicacoes.map((app, i) => (
                <div key={i} className="flex items-start gap-3 bg-white rounded-xl p-4 shadow-sm">
                  <CheckCircle2 className="w-5 h-5 text-secondary mt-0.5 flex-shrink-0" />
                  <span className="text-foreground font-medium">{app}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Diferenciais */}
      <section className="py-16 bg-background">
        <div className="container mx-auto px-4 max-w-5xl">
          <h2 className="text-3xl font-bold text-foreground mb-12 text-center">
            Por que Escolher a PROJEMAC em {data.cidade}?
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card className="border-0 shadow-md">
              <CardContent className="p-8 text-center">
                <div className="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center mx-auto mb-4">
                  <Zap className="w-7 h-7 text-primary" />
                </div>
                <h3 className="text-xl font-bold text-foreground mb-3">Entrega Rápida</h3>
                <p className="text-muted-foreground text-sm leading-relaxed">
                  Frota própria com logística especializada para atender {data.cidade} com
                  rapidez e segurança em qualquer horário.
                </p>
              </CardContent>
            </Card>
            <Card className="border-0 shadow-md">
              <CardContent className="p-8 text-center">
                <div className="w-14 h-14 rounded-2xl bg-secondary/10 flex items-center justify-center mx-auto mb-4">
                  <Wrench className="w-7 h-7 text-secondary" />
                </div>
                <h3 className="text-xl font-bold text-foreground mb-3">Instalação Inclusa</h3>
                <p className="text-muted-foreground text-sm leading-relaxed">
                  Equipe técnica qualificada realiza toda a instalação em {data.cidade},
                  com engenheiro eletricista responsável técnico.
                </p>
              </CardContent>
            </Card>
            <Card className="border-0 shadow-md">
              <CardContent className="p-8 text-center">
                <div className="w-14 h-14 rounded-2xl bg-accent/20 flex items-center justify-center mx-auto mb-4">
                  <Shield className="w-7 h-7 text-accent" />
                </div>
                <h3 className="text-xl font-bold text-foreground mb-3">Suporte 24h</h3>
                <p className="text-muted-foreground text-sm leading-relaxed">
                  Manutenção preventiva e suporte técnico durante todo o período
                  da locação em {data.cidade} e região.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-primary">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">
            Precisa de Geradores em {data.cidade}?
          </h2>
          <p className="text-white/85 text-lg mb-8 max-w-xl mx-auto">
            Entre em contato agora e receba um orçamento personalizado para{" "}
            {data.cidade} e região.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              asChild
              size="lg"
              className="bg-accent text-accent-foreground hover:bg-accent/90 font-bold text-lg px-8 h-14"
            >
              <Link to="/contato">Solicitar Orçamento</Link>
            </Button>
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center px-8 h-14 bg-white/10 border-2 border-white/40 text-white hover:bg-white hover:text-primary rounded-md font-bold text-lg transition-all"
            >
              <Phone className="mr-2 h-5 w-5" />
              WhatsApp
            </a>
          </div>
        </div>
      </section>

      {/* Cidades vizinhas — internal linking */}
      <section className="py-12 bg-muted">
        <div className="container mx-auto px-4 max-w-3xl text-center">
          <h3 className="text-lg font-semibold text-foreground mb-4">
            Também atendemos cidades próximas a {data.cidade}:
          </h3>
          <div className="flex flex-wrap justify-center gap-3">
            {data.vizinhas.map((v) => (
              <Link
                key={v}
                to={`/geradores-${v}`}
                className="inline-flex items-center gap-1 px-4 py-2 bg-white border border-gray-200 rounded-full text-sm font-medium text-foreground hover:border-primary hover:text-primary transition-colors shadow-sm"
              >
                <MapPin className="w-3.5 h-3.5" />
                {slugToName[v]}
              </Link>
            ))}
            <Link
              to="/"
              className="inline-flex items-center gap-1 px-4 py-2 bg-primary rounded-full text-sm font-medium text-white hover:bg-primary/90 transition-colors shadow-sm"
            >
              <ArrowRight className="w-3.5 h-3.5" />
              Belo Horizonte
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default CidadePage;
