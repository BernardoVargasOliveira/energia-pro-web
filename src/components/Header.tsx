import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import logoImage from "@/assets/logo-projemac-new.png";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY >= 80);
    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    setIsMenuOpen(false);
  }, [location]);

  /* Nav is "solid" when scrolled OR when mobile menu is open */
  const solidBg = isScrolled || isMenuOpen;

  const menuItems = [
    { label: "Home",      href: "/" },
    { label: "A Empresa", href: "/empresa" },
    { label: "Serviços",  href: "/servicos" },
    { label: "Produtos",  href: "/produtos" },
    { label: "Setores",   href: "/setores" },
    { label: "Projetos",  href: "/projetos" },
    { label: "Contato",   href: "/contato" },
  ];

  return (
    <header
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-400 ease-in-out bg-primary/90 backdrop-blur-md ${
        solidBg ? "shadow-primary" : ""
      }`}
    >

      <div className="container mx-auto px-4 relative z-10">
        <nav
          className={`flex items-center justify-between transition-all duration-500 ease-in-out ${
            isScrolled ? "h-20 md:h-24" : "h-28 md:h-32"
          }`}
        >
          {/* Logo */}
          <Link
            to="/"
            className="flex items-center flex-shrink-0"
            aria-label="PROJEMAC — Página inicial"
          >
            <img
              src={logoImage}
              alt="PROJEMAC Geradores de Energia"
              className={`w-auto transition-all duration-500 ease-in-out ${
                isScrolled ? "h-[13rem] md:h-[15rem]" : "h-[17rem] md:h-[19.5rem]"
              }`}
              style={{ filter: "drop-shadow(0 0 10px rgba(255,255,255,0.28))" }}
              loading="eager"
              fetchPriority="high"
              width={1024}
              height={1024}
            />
          </Link>

          {/* Desktop menu */}
          <ul className="hidden lg:flex items-center gap-8" role="menubar">
            {menuItems.map((item) => (
              <li key={item.label} role="none">
                <Link
                  to={item.href}
                  role="menuitem"
                  className={`relative text-white font-semibold text-base xl:text-lg py-1 group transition-colors ${
                    location.pathname === item.href ? "text-accent" : "hover:text-accent"
                  }`}
                  style={{ textShadow: "0 1px 6px rgba(0,0,0,0.6)" }}
                >
                  {item.label}
                  <span
                    className={`absolute -bottom-0.5 left-0 w-full h-0.5 bg-accent transition-transform duration-300 ease-in-out origin-left ${
                      location.pathname === item.href ? "scale-x-100" : "scale-x-0 group-hover:scale-x-100"
                    }`}
                  />
                </Link>
              </li>
            ))}
          </ul>

          {/* CTA Button */}
          <div className="hidden lg:flex items-center">
            <Button
              asChild
              className="relative overflow-hidden bg-accent text-accent-foreground hover:bg-accent/90 font-bold text-base xl:text-lg px-7 py-2.5 rounded-full transition-all duration-300 hover:-translate-y-0.5 hover:shadow-accent-glow border-0"
            >
              <Link to="/contato">Solicitar Orçamento</Link>
            </Button>
          </div>

          {/* Mobile menu button */}
          <button
            className="lg:hidden text-white p-2 rounded-lg hover:bg-white/15 transition-colors"
            style={{ textShadow: "0 1px 6px rgba(0,0,0,0.6)" }}
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label={isMenuOpen ? "Fechar menu" : "Abrir menu"}
            aria-expanded={isMenuOpen}
          >
            {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </nav>

        {/* Mobile menu dropdown */}
        <div
          className={`lg:hidden overflow-hidden transition-all duration-300 ease-in-out ${
            isMenuOpen ? "max-h-[32rem] pb-6" : "max-h-0"
          }`}
        >
          <ul className="flex flex-col pt-2 border-t border-white/15">
            {menuItems.map((item) => (
              <li key={item.label}>
                <Link
                  to={item.href}
                  className={`block text-white font-medium py-3 px-1 border-b border-white/10 transition-colors ${
                    location.pathname === item.href ? "text-accent" : "hover:text-accent"
                  }`}
                  onClick={() => setIsMenuOpen(false)}
                >
                  {item.label}
                </Link>
              </li>
            ))}
            <li className="pt-4">
              <Button
                asChild
                className="w-full bg-accent text-accent-foreground hover:bg-accent/90 font-bold rounded-full"
              >
                <Link to="/contato" onClick={() => setIsMenuOpen(false)}>
                  Solicitar Orçamento
                </Link>
              </Button>
            </li>
          </ul>
        </div>
      </div>
    </header>
  );
};

export default Header;
