import { Link } from "react-router-dom";
import { Phone, Mail, MapPin, Facebook, Instagram, Linkedin } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-primary text-primary-foreground">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company info */}
          <div>
            <h3 className="text-2xl font-bold text-accent mb-4">PROJEMAC</h3>
            <p className="text-sm mb-4">
              Soluções completas em energia com grupos geradores. Locação, manutenção e projetos.
            </p>
            <div className="flex gap-4">
              <a href="#" className="hover:text-accent transition-colors">
                <Facebook className="h-5 w-5" />
              </a>
              <a href="#" className="hover:text-accent transition-colors">
                <Instagram className="h-5 w-5" />
              </a>
              <a href="#" className="hover:text-accent transition-colors">
                <Linkedin className="h-5 w-5" />
              </a>
            </div>
          </div>

          {/* Quick links */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Links Rápidos</h4>
            <ul className="space-y-2 text-sm">
              <li><Link to="/empresa" className="hover:text-accent transition-colors">A Empresa</Link></li>
              <li><Link to="/servicos" className="hover:text-accent transition-colors">Serviços</Link></li>
              <li><Link to="/produtos" className="hover:text-accent transition-colors">Produtos</Link></li>
              <li><Link to="/projetos" className="hover:text-accent transition-colors">Projetos</Link></li>
              <li><Link to="/contato" className="hover:text-accent transition-colors">Contato</Link></li>
            </ul>
          </div>

          {/* Services */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Serviços</h4>
            <ul className="space-y-2 text-sm">
              <li className="hover:text-accent transition-colors cursor-pointer">Locação de Geradores</li>
              <li className="hover:text-accent transition-colors cursor-pointer">Manutenção Preventiva</li>
              <li className="hover:text-accent transition-colors cursor-pointer">Assistência Técnica</li>
              <li className="hover:text-accent transition-colors cursor-pointer">Projetos de Instalação</li>
            </ul>
          </div>

          {/* Contact info */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Contato</h4>
            <ul className="space-y-3 text-sm">
              <li className="flex items-start gap-2">
                <Phone className="h-4 w-4 mt-1 flex-shrink-0" />
                <a href="tel:+553134953004" className="hover:text-accent transition-colors">
                  (31) 3495-3004
                </a>
              </li>
              <li className="flex items-start gap-2">
                <Mail className="h-4 w-4 mt-1 flex-shrink-0" />
                <a href="mailto:contato@projemac.com.br" className="hover:text-accent transition-colors">
                  contato@projemac.com.br
                </a>
              </li>
              <li className="flex items-start gap-2">
                <MapPin className="h-4 w-4 mt-1 flex-shrink-0" />
                <span>Belo Horizonte - MG<br />Atendimento em todo Brasil</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-primary-foreground/20 mt-8 pt-8 text-center text-sm">
          <p>&copy; {new Date().getFullYear()} PROJEMAC Geradores. Todos os direitos reservados.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
