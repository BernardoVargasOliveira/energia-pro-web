import { useEffect } from "react";
import { useParams, Link, Navigate } from "react-router-dom";
import { Phone, CheckCircle2, Zap, Gauge, Factory, Lightbulb, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import gerador180kva from "@/assets/gerador-180kva.jpg";
import gerador500kva from "@/assets/gerador-500kva.png";
import geradoresPortateis from "@/assets/geradores-portateis.png";
import geradoresParalelo from "@/assets/geradores-paralelo.png";
import torreIluminacaoHero from "@/assets/torre-iluminacao-hero.png";

interface EspecificacaoItem {
  label: string;
  valor: string;
}

interface ProdutoData {
  nome: string;
  badge: string;
  potencia: string | null;
  descricaoCurta: string;
  descricaoLonga: string;
  imagem: string;
  imagemAlt: string;
  imagemClass?: string;
  aplicacoes: string[];
  especificacoes: EspecificacaoItem[];
  caracteristicas: string[];
  descricaoSeo: string;
  outros: string[];
}

const produtos: Record<string, ProdutoData> = {
  "geradores-portateis": {
    nome: "Geradores Portáteis",
    badge: "6 a 12 kVA",
    potencia: "6 a 12 kVA",
    descricaoCurta: "Soluções compactas e práticas para aplicações leves, eventos e uso temporário.",
    descricaoLonga:
      "Os geradores portáteis da PROJEMAC são ideais para situações que exigem mobilidade e praticidade. Com potência entre 6 e 12 kVA, são perfeitos para residências, pequenos comércios, eventos de pequeno porte e obras leves. De fácil operação e transporte, garantem energia confiável onde você precisar, com baixo consumo de combustível e manutenção simplificada. Nossa equipe realiza a entrega, instalação e orientação de uso em qualquer ponto de Belo Horizonte e região metropolitana.",
    imagem: geradoresPortateis,
    imagemAlt: "Gerador portátil para locação em Belo Horizonte",
    aplicacoes: [
      "Residências em emergência",
      "Pequenos comércios",
      "Obras leves e reformas",
      "Eventos de pequeno porte",
      "Feiras e quiosques",
      "Uso emergencial",
    ],
    especificacoes: [
      { label: "Potência", valor: "6 a 12 kVA" },
      { label: "Tensão", valor: "127/220V monofásico" },
      { label: "Frequência", valor: "60 Hz" },
      { label: "Combustível", valor: "Diesel" },
      { label: "Operação", valor: "Contínua / Standby" },
      { label: "Partida", valor: "Manual ou elétrica" },
    ],
    caracteristicas: [
      "Compactos e fáceis de transportar",
      "Baixo consumo de combustível",
      "Operação simples e prática",
      "Ideal para uso temporário",
      "Partida manual ou elétrica",
      "Baixo nível de ruído",
    ],
    descricaoSeo:
      "Locação de geradores portáteis de 6 a 12 kVA em Belo Horizonte e MG. PROJEMAC oferece geradores compactos para residências, eventos e obras com entrega e instalação inclusos.",
    outros: ["geradores-medio-porte", "geradores-grande-porte", "usina-energia", "torres-iluminacao"],
  },

  "geradores-medio-porte": {
    nome: "Geradores de Médio Porte",
    badge: "50 a 180 kVA",
    potencia: "50 a 180 kVA",
    descricaoCurta: "Equipamentos robustos para operações comerciais e industriais de médio porte.",
    descricaoLonga:
      "Os geradores de médio porte da PROJEMAC entregam alta confiabilidade para operações que exigem energia estável e contínua. Com potências entre 50 e 180 kVA, são amplamente utilizados em indústrias de médio porte, condomínios, clínicas, supermercados e canteiros de obras. Equipados com painel de controle digital e sistema de refrigeração eficiente, garantem desempenho superior mesmo em operações prolongadas. Instalação e comissionamento realizados por engenheiro eletricista com ART.",
    imagem: gerador180kva,
    imagemAlt: "Gerador de médio porte 180 kVA aberto mostrando motor diesel - Projemac",
    aplicacoes: [
      "Indústrias de médio porte",
      "Condomínios residenciais e comerciais",
      "Supermercados",
      "Clínicas de pequeno e médio porte",
      "Obras e canteiros industriais",
      "Centros de distribuição",
    ],
    especificacoes: [
      { label: "Potência", valor: "50 a 180 kVA" },
      { label: "Tensão", valor: "220/380V trifásico" },
      { label: "Frequência", valor: "60 Hz" },
      { label: "Combustível", valor: "Diesel" },
      { label: "Operação", valor: "Contínua / Standby" },
      { label: "Painel", valor: "Controle digital" },
    ],
    caracteristicas: [
      "Alta confiabilidade operacional",
      "Sistema de refrigeração eficiente",
      "Painel de controle digital",
      "Baixa emissão de ruído",
      "Operação contínua ou standby",
      "Monitoramento de parâmetros em tempo real",
    ],
    descricaoSeo:
      "Locação de geradores de médio porte de 50 a 180 kVA em BH e MG. PROJEMAC atende indústrias, condomínios e hospitais com grupos geradores confiáveis. Suporte técnico 24h.",
    outros: ["geradores-portateis", "geradores-grande-porte", "usina-energia", "torres-iluminacao"],
  },

  "geradores-grande-porte": {
    nome: "Geradores de Grande Porte",
    badge: "220 a 500 kVA",
    potencia: "220 a 500 kVA",
    descricaoCurta: "Soluções de alta performance para aplicações críticas e grandes operações industriais.",
    descricaoLonga:
      "Os geradores de grande porte da PROJEMAC são projetados para as operações mais exigentes. Com potências entre 220 e 500 kVA, atendem grandes indústrias, hospitais de grande porte, shopping centers, data centers e centros logísticos. Preparados para operação contínua 24/7, esses equipamentos oferecem monitoramento avançado, possibilidade de paralelismo e baixo consumo específico de combustível, garantindo máxima eficiência energética e mínimo tempo de parada.",
    imagem: gerador500kva,
    imagemAlt: "Gerador de grande porte 500 kVA com carenagem aberta - Projemac",
    aplicacoes: [
      "Grandes indústrias",
      "Shows, feiras, exposições, eventos em geral",
      "Shopping centers",
      "Centros logísticos",
      "Data centers",
      "Obras de infraestrutura",
    ],
    especificacoes: [
      { label: "Potência", valor: "220 a 500 kVA" },
      { label: "Tensão", valor: "220/380V trifásico" },
      { label: "Frequência", valor: "60 Hz" },
      { label: "Combustível", valor: "Diesel / Gás natural" },
      { label: "Operação", valor: "Contínua 24/7" },
      { label: "Recursos", valor: "Paralelismo disponível" },
    ],
    caracteristicas: [
      "Alto desempenho e robustez",
      "Preparados para operação contínua",
      "Possibilidade de paralelismo",
      "Monitoramento e controle avançado",
      "Baixo consumo específico de combustível",
      "Tanque ampliado disponível",
    ],
    descricaoSeo:
      "Locação de geradores de grande porte de 220 a 500 kVA em MG. PROJEMAC fornece grupos geradores para indústrias, hospitais e data centers. Instalação profissional e suporte 24h.",
    outros: ["geradores-portateis", "geradores-medio-porte", "usina-energia", "torres-iluminacao"],
  },

  "usina-energia": {
    nome: "Usinas de Energia",
    badge: "500 a 5.000 kVA",
    potencia: "500 a 5.000 kVA",
    descricaoCurta: "Sistemas de alta capacidade com geradores em paralelo para demandas críticas de grande escala.",
    descricaoLonga:
      "As usinas de energia da PROJEMAC são a solução definitiva para demandas de altíssima potência. Com sistemas entre 500 e 5.000 kVA, são formadas por múltiplos geradores operando em paralelo com controle automatizado, entregando máxima disponibilidade e redundância. Ideais para siderúrgicas, mineração, grandes obras de infraestrutura e complexos industriais que não podem ter interrupção no fornecimento de energia. Cada projeto é dimensionado sob medida pela nossa equipe de engenharia.",
    imagem: geradoresParalelo,
    imagemAlt: "Gerador de alta potência para siderúrgicas em Minas Gerais",
    aplicacoes: [
      "Siderúrgicas e mineração",
      "Usinas industriais",
      "Grandes obras de infraestrutura",
      "Complexos industriais",
      "Operações críticas de grande escala",
      "Eventos de grande porte",
    ],
    especificacoes: [
      { label: "Potência", valor: "500 a 5.000 kVA" },
      { label: "Tensão", valor: "220/380V / tensões especiais" },
      { label: "Frequência", valor: "60 Hz" },
      { label: "Combustível", valor: "Diesel / Dual Fuel" },
      { label: "Operação", valor: "Contínua 24/7" },
      { label: "Configuração", valor: "Paralelo com automação" },
    ],
    caracteristicas: [
      "Geradores ligados em paralelo",
      "Alta disponibilidade e redundância",
      "Controle e supervisão automatizados",
      "Operação contínua 24/7",
      "Máxima eficiência energética",
      "QTA (Quadro de Transferência Automática)",
    ],
    descricaoSeo:
      "Locação de usinas de energia de 500 a 5.000 kVA em MG. PROJEMAC atende siderúrgicas, mineração e grandes indústrias com sistemas de geradores em paralelo. Projetos sob medida.",
    outros: ["geradores-portateis", "geradores-medio-porte", "geradores-grande-porte", "torres-iluminacao"],
  },

  "torres-iluminacao": {
    nome: "Torres de Iluminação",
    badge: "Iluminação",
    potencia: null,
    descricaoCurta: "Iluminação eficiente e autônoma para obras, eventos e operações noturnas em campo aberto.",
    descricaoLonga:
      "As torres de iluminação da PROJEMAC são a solução ideal para operações que exigem iluminação potente em áreas externas sem infraestrutura elétrica. Autônomas, de fácil transporte e com alta potência luminosa, são amplamente utilizadas em obras, eventos, mineração, pátios logísticos e operações noturnas. Operação simples, baixo consumo e confiabilidade garantem produtividade mesmo nos ambientes mais desafiadores do interior de Minas Gerais.",
    imagem: torreIluminacaoHero,
    imagemAlt: "Torre de iluminação para obras e eventos em Minas Gerais",
    imagemClass: "absolute inset-0 w-full h-full object-cover object-center",
    aplicacoes: [
      "Obras e construção civil",
      "Eventos e shows",
      "Mineração",
      "Pátios logísticos",
      "Operações noturnas",
      "Áreas externas sem infraestrutura",
    ],
    especificacoes: [
      { label: "Tipo", valor: "Autônoma com gerador" },
      { label: "Iluminação", valor: "Alta potência luminosa" },
      { label: "Combustível", valor: "Diesel" },
      { label: "Mobilidade", valor: "Reboque ou caminhão" },
      { label: "Operação", valor: "Autônoma em campo" },
      { label: "Instalação", valor: "Rápida, sem infraestrutura" },
    ],
    caracteristicas: [
      "Alta potência luminosa",
      "Baixo consumo de combustível",
      "Fácil transporte e montagem",
      "Operação autônoma em campo",
      "Ideal para áreas externas",
      "Sem necessidade de infraestrutura elétrica",
    ],
    descricaoSeo:
      "Locação de torres de iluminação para obras, eventos e mineração em BH e MG. PROJEMAC fornece torres autônomas de alta potência com entrega e suporte técnico inclusos.",
    outros: ["geradores-portateis", "geradores-medio-porte", "geradores-grande-porte", "usina-energia"],
  },
};

const nomes: Record<string, string> = Object.fromEntries(
  Object.entries(produtos).map(([slug, d]) => [slug, d.nome])
);

const icones: Record<string, React.ReactNode> = {
  "geradores-portateis": <Zap className="w-5 h-5" />,
  "geradores-medio-porte": <Gauge className="w-5 h-5" />,
  "geradores-grande-porte": <Factory className="w-5 h-5" />,
  "usina-energia": <Factory className="w-5 h-5" />,
  "torres-iluminacao": <Lightbulb className="w-5 h-5" />,
};

const ProdutoPage = () => {
  const { slug } = useParams<{ slug: string }>();
  const data = slug ? produtos[slug] : undefined;

  useEffect(() => {
    if (!data) return;
    window.scrollTo(0, 0);
    document.title = `${data.nome} — Locação em BH e MG | PROJEMAC`;
    const metaDesc = document.querySelector('meta[name="description"]');
    if (metaDesc) metaDesc.setAttribute("content", data.descricaoSeo);
    const canonical = document.querySelector('link[rel="canonical"]');
    if (canonical) canonical.setAttribute("href", `https://www.projemac.com.br/produtos/${slug}`);
  }, [data, slug]);

  if (!data) return <Navigate to="/produtos" replace />;

  const whatsappUrl = "https://wa.me/5531995266402?text=Ol%C3%A1!%20Vim%20pelo%20site%20da%20Projemac%20e%20gostaria%20de%20solicitar%20um%20or%C3%A7amento.";

  return (
    <div className="min-h-screen">
      {/* JSON-LD Product schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Product",
            name: data.nome,
            description: data.descricaoSeo,
            brand: { "@type": "Brand", name: "PROJEMAC" },
            url: `https://www.projemac.com.br/produtos/${slug}`,
            offers: {
              "@type": "Offer",
              availability: "https://schema.org/InStock",
              priceCurrency: "BRL",
              seller: {
                "@type": "Organization",
                name: "PROJEMAC Geradores",
                telephone: "+553134953004",
                email: "comercial@projemac.com.br",
              },
            },
          }),
        }}
      />

      {/* ── Hero ───────────────────────────────────────────── */}
      <section className="relative h-[300px] md:h-[500px] overflow-hidden">
        <img
          src={data.imagem}
          alt={data.imagemAlt}
          className={data.imagemClass ?? "absolute inset-0 w-full h-full object-cover object-center"}
          loading="eager"
          width={1200}
          height={500}
        />
        {/* gradient overlay */}
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(to top, rgba(0,13,26,0.92) 0%, rgba(0,13,26,0.55) 50%, rgba(0,13,26,0.30) 100%)",
          }}
          aria-hidden="true"
        />

        <div className="relative z-10 h-full flex flex-col justify-end pb-8 md:pb-14 container mx-auto px-4">
          {data.potencia && (
            <span className="inline-block bg-accent text-accent-foreground text-xs font-bold px-4 py-1.5 rounded-full mb-3 w-fit">
              {data.potencia}
            </span>
          )}
          <h1 className="text-3xl md:text-5xl lg:text-6xl font-bold text-white mb-3 leading-tight">
            {data.nome}
          </h1>
          <p className="text-sm md:text-xl text-white/90 max-w-2xl mb-6 leading-relaxed">
            {data.descricaoCurta}
          </p>
          <div className="flex flex-col sm:flex-row gap-3">
            <Button
              asChild
              size="lg"
              className="bg-accent text-accent-foreground hover:bg-accent/90 font-bold px-8 h-12 rounded-full"
            >
              <Link to="/contato">Solicitar Orçamento</Link>
            </Button>
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center px-8 h-12 bg-white/10 border-2 border-white/40 text-white hover:bg-white hover:text-primary rounded-full font-bold text-base transition-all duration-300"
            >
              <Phone className="mr-2 h-5 w-5" />
              Falar no WhatsApp
            </a>
          </div>
        </div>
      </section>

      {/* ── Especificações Técnicas ────────────────────────── */}
      <section className="py-16 bg-background">
        <div className="container mx-auto px-4 max-w-5xl">
          <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-10">
            Especificações Técnicas
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {data.especificacoes.map((spec, i) => (
              <div
                key={i}
                className="bg-muted rounded-xl p-5 border border-border/50"
              >
                <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground mb-1">
                  {spec.label}
                </p>
                <p className="text-base font-bold text-foreground">{spec.valor}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Ideal Para ────────────────────────────────────── */}
      <section className="py-16 bg-muted">
        <div className="container mx-auto px-4 max-w-5xl">
          <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-4">
            Ideal para:
          </h2>
          <p className="text-muted-foreground mb-8">
            Atendemos todos os segmentos que precisam de energia confiável:
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {data.aplicacoes.map((app, i) => (
              <div key={i} className="flex items-center gap-3 bg-white rounded-xl p-4 shadow-sm">
                <CheckCircle2 className="w-5 h-5 text-secondary flex-shrink-0" />
                <span className="text-foreground font-medium">{app}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Características ───────────────────────────────── */}
      <section className="py-16 bg-background">
        <div className="container mx-auto px-4 max-w-5xl">
          <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-10">
            Características Principais
          </h2>
          <p className="text-muted-foreground text-lg leading-relaxed mb-8">
            {data.descricaoLonga}
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {data.caracteristicas.map((feat, i) => (
              <div key={i} className="flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-accent mt-0.5 flex-shrink-0" />
                <span className="text-foreground font-medium">{feat}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ───────────────────────────────────────────── */}
      <section className="py-16 bg-primary">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">
            Precisa de {data.nome}?
          </h2>
          <p className="text-white/85 text-lg mb-8 max-w-xl mx-auto">
            Entre em contato agora e receba um orçamento personalizado para a sua demanda.
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

      {/* ── Outros Produtos ───────────────────────────────── */}
      <section className="py-12 bg-muted">
        <div className="container mx-auto px-4 max-w-4xl">
          <h3 className="text-lg font-semibold text-foreground mb-6 text-center">
            Conheça também nossos outros produtos:
          </h3>
          <div className="flex flex-wrap justify-center gap-3">
            {data.outros.map((s) => (
              <Link
                key={s}
                to={`/produtos/${s}`}
                className="inline-flex items-center gap-2 px-4 py-2.5 bg-white border border-gray-200 rounded-full text-sm font-medium text-foreground hover:border-primary hover:text-primary transition-colors shadow-sm"
              >
                {icones[s]}
                {nomes[s]}
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default ProdutoPage;
