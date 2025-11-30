import { useState } from "react";
import { Link } from "react-router-dom";
import { Menu, X, Phone } from "lucide-react";
import { Button } from "@/components/ui/button";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const menuItems = [
    { label: "Home", href: "/" },
    { label: "A Empresa", href: "/empresa" },
    { label: "Serviços", href: "/servicos" },
    { label: "Produtos", href: "/produtos" },
    { label: "Setores", href: "/setores" },
    { label: "Projetos", href: "/projetos" },
    { label: "Contato", href: "/contato" },
  ];

  return (
    <header className="sticky top-0 z-50 w-full bg-primary shadow-lg">
      {/* Top bar with contact info */}
      <div className="bg-secondary">
        <div className="container mx-auto px-4 py-2">
          <div className="flex items-center justify-end gap-6 text-sm text-primary-foreground">
            <a href="tel:+553134953004" className="flex items-center gap-2 hover:text-accent transition-colors">
              <Phone className="h-4 w-4" />
              <span className="font-semibold">(31) 3495-3004</span>
            </a>
            <a href="https://wa.me/553134953004" target="_blank" rel="noopener noreferrer" className="hover:text-accent transition-colors font-semibold">
              WhatsApp
            </a>
          </div>
        </div>
      </div>

      {/* Main navigation */}
      <div className="container mx-auto px-4">
        <nav className="flex items-center justify-between py-4">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2">
            <div className="text-2xl font-bold">
              <span className="text-accent">PROJEMAC</span>
              <span className="text-primary-foreground text-sm block">GERADORES</span>
            </div>
          </Link>

          {/* Desktop menu */}
          <ul className="hidden lg:flex items-center gap-8">
            {menuItems.map((item) => (
              <li key={item.label}>
                <Link
                  to={item.href}
                  className="text-primary-foreground hover:text-accent transition-colors font-medium"
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>

          {/* CTA Button */}
          <div className="hidden lg:block">
            <Button asChild variant="default" className="bg-accent text-accent-foreground hover:bg-accent/90 font-semibold">
              <Link to="/contato">Solicitar Orçamento</Link>
            </Button>
          </div>

          {/* Mobile menu button */}
          <button
            className="lg:hidden text-primary-foreground"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Toggle menu"
          >
            {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </nav>

        {/* Mobile menu */}
        {isMenuOpen && (
          <div className="lg:hidden pb-4">
            <ul className="flex flex-col gap-4">
              {menuItems.map((item) => (
                <li key={item.label}>
                  <Link
                    to={item.href}
                    className="block text-primary-foreground hover:text-accent transition-colors font-medium"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
              <li>
                <Button asChild variant="default" className="w-full bg-accent text-accent-foreground hover:bg-accent/90 font-semibold">
                  <Link to="/contato" onClick={() => setIsMenuOpen(false)}>
                    Solicitar Orçamento
                  </Link>
                </Button>
              </li>
            </ul>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
