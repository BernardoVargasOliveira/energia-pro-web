import { Link, useLocation } from "react-router-dom";
import { ChevronRight } from "lucide-react";

const ROUTE_NAMES: Record<string, string> = {
  empresa: "A Empresa",
  servicos: "Serviços",
  produtos: "Produtos",
  setores: "Setores Atendidos",
  projetos: "Projetos",
  contato: "Contato",
};

/**
 * Breadcrumb visual + microdata schema.org para páginas internas.
 * Renderiza apenas em rotas com profundidade >= 1 (não na home).
 */
const Breadcrumb = () => {
  const { pathname } = useLocation();
  const segments = pathname.split("/").filter(Boolean);

  if (segments.length === 0) return null;

  return (
    <nav aria-label="Trilha de navegação" className="mb-4">
      <ol
        className="flex flex-wrap items-center justify-center gap-1 text-sm text-white/70"
        itemScope
        itemType="https://schema.org/BreadcrumbList"
      >
        <li
          itemProp="itemListElement"
          itemScope
          itemType="https://schema.org/ListItem"
        >
          <Link
            to="/"
            itemProp="item"
            className="hover:text-white transition-colors"
          >
            <span itemProp="name">Home</span>
          </Link>
          <meta itemProp="position" content="1" />
        </li>

        {segments.map((seg, idx) => (
          <li
            key={seg}
            className="flex items-center gap-1"
            itemProp="itemListElement"
            itemScope
            itemType="https://schema.org/ListItem"
          >
            <ChevronRight className="h-3 w-3 text-white/40" aria-hidden="true" />
            <span itemProp="name" className="text-white/90 font-medium">
              {ROUTE_NAMES[seg] ?? seg}
            </span>
            <meta itemProp="position" content={String(idx + 2)} />
          </li>
        ))}
      </ol>
    </nav>
  );
};

export default Breadcrumb;
