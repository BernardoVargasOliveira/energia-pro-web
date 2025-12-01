import { Link } from "react-router-dom";

interface FinalCTAProps {
  title?: string;
  subtitle?: string;
}

const FinalCTA = ({ 
  title = "Precisa de Energia Confiável?",
  subtitle = "Fale com nossos especialistas e descubra a melhor solução para seu negócio"
}: FinalCTAProps) => {
  return (
    <section className="py-16 bg-gradient-primary">
      <div className="container mx-auto px-4 text-center">
        <h2 className="text-3xl font-bold text-primary-foreground mb-6">
          {title}
        </h2>
        <p className="text-xl text-primary-foreground/90 mb-8 max-w-2xl mx-auto">
          {subtitle}
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link 
            to="/contato"
            className="inline-flex items-center justify-center px-8 py-3 bg-accent text-accent-foreground hover:bg-accent/90 rounded-md font-semibold text-lg transition-colors shadow-accent"
          >
            Solicitar Orçamento
          </Link>
          <a 
            href="https://wa.me/553134953004?text=Olá,%20gostaria%20de%20solicitar%20um%20orçamento%20de%20geradores." 
            target="_blank" 
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center px-8 py-3 bg-transparent border-2 border-primary-foreground text-primary-foreground hover:bg-primary-foreground hover:text-primary rounded-md font-semibold text-lg transition-colors"
          >
            Falar no WhatsApp
          </a>
        </div>
      </div>
    </section>
  );
};

export default FinalCTA;
