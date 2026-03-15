import { Link } from "react-router-dom";
import { Phone, Mail, MapPin } from "lucide-react";
import logoImage from "@/assets/logo-projemac-new.png";

const Footer = () => {
  const cities = [
    { label: "Betim", slug: "betim" },
    { label: "Contagem", slug: "contagem" },
    { label: "Ribeirão das Neves", slug: "ribeirao-das-neves" },
    { label: "Santa Luzia", slug: "santa-luzia" },
    { label: "Ibirité", slug: "ibirite" },
    { label: "Sabará", slug: "sabara" },
    { label: "Nova Lima", slug: "nova-lima" },
    { label: "Vespasiano", slug: "vespasiano" },
    { label: "Pedro Leopoldo", slug: "pedro-leopoldo" },
    { label: "Lagoa Santa", slug: "lagoa-santa" },
    { label: "Matozinhos", slug: "matozinhos" },
    { label: "Esmeraldas", slug: "esmeraldas" },
    { label: "Brumadinho", slug: "brumadinho" },
    { label: "Sete Lagoas", slug: "sete-lagoas" },
  ];

  return (
    <footer
      className="relative overflow-hidden text-white"
      style={{ backgroundColor: "#070d14" }}
    >
      {/* Top accent line */}
      <div
        className="absolute top-0 left-0 right-0 h-px pointer-events-none"
        style={{ background: "linear-gradient(90deg, transparent, hsl(51 93% 57% / 0.6) 50%, transparent)" }}
        aria-hidden="true"
      />

      {/* Decorative radial glow */}
      <div
        className="absolute top-0 right-0 w-[500px] h-[500px] rounded-full blur-3xl opacity-[0.06] pointer-events-none"
        style={{ background: "radial-gradient(circle, hsl(196 100% 43%) 0%, transparent 70%)" }}
        aria-hidden="true"
      />
      <div
        className="absolute bottom-0 left-0 w-[400px] h-[400px] rounded-full blur-3xl opacity-[0.04] pointer-events-none"
        style={{ background: "radial-gradient(circle, hsl(200 100% 21%) 0%, transparent 70%)" }}
        aria-hidden="true"
      />

      <div className="container mx-auto px-4 pt-20 pb-10 relative z-10">
        {/* Main grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">

          {/* Brand */}
          <div className="lg:col-span-1">
            <img
              src={logoImage}
              alt="PROJEMAC Geradores de Energia"
              className="h-32 w-auto mb-6"
              loading="lazy"
              width={1024}
              height={1024}
            />
            <p className="text-sm text-white/50 leading-relaxed mb-6">
              Soluções completas em energia com grupos geradores. Locação e projetos.
            </p>
            <a
              href="tel:+553134953004"
              className="inline-flex items-center gap-2 text-sm font-semibold text-accent hover:text-accent/80 transition-colors"
            >
              <Phone className="h-4 w-4" />
              (31) 3495-3004
            </a>
          </div>

          {/* Quick links */}
          <div>
            <h4 className="text-[11px] font-bold uppercase tracking-[0.2em] text-white/35 mb-6">
              Links Rápidos
            </h4>
            <ul className="space-y-3 text-sm">
              {[
                { label: "A Empresa", href: "/empresa" },
                { label: "Serviços", href: "/servicos" },
                { label: "Produtos", href: "/produtos" },
                { label: "Projetos", href: "/projetos" },
                { label: "Contato", href: "/contato" },
              ].map(({ label, href }) => (
                <li key={href}>
                  <Link
                    to={href}
                    className="text-white/45 hover:text-white transition-colors duration-200 flex items-center gap-3 group"
                  >
                    <span
                      className="w-0 h-px bg-accent group-hover:w-4 transition-all duration-300 inline-block"
                      aria-hidden="true"
                    />
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h4 className="text-[11px] font-bold uppercase tracking-[0.2em] text-white/35 mb-6">
              Serviços
            </h4>
            <ul className="space-y-3 text-sm">
              {["Locação de Geradores", "Assistência Técnica", "Projetos de Instalação"].map((item) => (
                <li
                  key={item}
                  className="text-white/45 flex items-center gap-3 group"
                >
                  <span
                    className="w-1.5 h-1.5 rounded-full bg-accent/50 group-hover:bg-accent transition-colors shrink-0"
                    aria-hidden="true"
                  />
                  {item}
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-[11px] font-bold uppercase tracking-[0.2em] text-white/35 mb-6">
              Contato
            </h4>
            <ul className="space-y-5 text-sm">
              <li className="flex items-start gap-3">
                <div className="w-9 h-9 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center shrink-0">
                  <Phone className="h-4 w-4 text-accent" />
                </div>
                <div>
                  <p className="text-white/30 text-[11px] mb-0.5">Telefone</p>
                  <a
                    href="tel:+553134953004"
                    className="text-white/75 hover:text-accent transition-colors font-medium"
                  >
                    (31) 3495-3004
                  </a>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <div className="w-9 h-9 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center shrink-0">
                  <Mail className="h-4 w-4 text-accent" />
                </div>
                <div>
                  <p className="text-white/30 text-[11px] mb-0.5">E-mail</p>
                  <a
                    href="mailto:contato@projemac.com.br"
                    className="text-white/75 hover:text-accent transition-colors font-medium break-all"
                  >
                    contato@projemac.com.br
                  </a>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <div className="w-9 h-9 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center shrink-0">
                  <MapPin className="h-4 w-4 text-accent" />
                </div>
                <div>
                  <p className="text-white/30 text-[11px] mb-0.5">Localização</p>
                  <span className="text-white/75 font-medium">Belo Horizonte - MG</span>
                </div>
              </li>
            </ul>
          </div>
        </div>

        {/* SEO city links */}
        <div
          className="border-t pt-8 mb-8"
          style={{ borderColor: "rgba(255,255,255,0.06)" }}
        >
          <p className="text-[10px] font-semibold text-white/25 uppercase tracking-widest text-center mb-4">
            Aluguel de Geradores em
          </p>
          <div className="flex flex-wrap justify-center gap-x-3 gap-y-1.5 max-w-3xl mx-auto mb-6">
            {cities.map(({ label, slug }) => (
              <Link
                key={slug}
                to={`/geradores/${slug}`}
                className="text-xs text-white/25 hover:text-white/55 transition-colors"
              >
                {label}
              </Link>
            ))}
            <span className="text-xs text-white/15">
              · e toda a Região Metropolitana de BH / MG
            </span>
          </div>
        </div>

        {/* Copyright */}
        <p
          className="text-center text-xs"
          style={{ color: "rgba(255,255,255,0.2)" }}
        >
          &copy; {new Date().getFullYear()} PROJEMAC Geradores. Todos os direitos reservados.
        </p>
      </div>
    </footer>
  );
};

export default Footer;