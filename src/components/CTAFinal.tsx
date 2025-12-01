import { Link } from "react-router-dom";

export function CTAFinal() {
  return (
    <section className="w-full py-20 bg-background">
      <div className="max-w-3xl mx-auto text-center px-4">
        <div className="bg-white border border-slate-200 shadow-xl rounded-3xl p-10">
          <h2 className="text-3xl font-bold text-slate-900">
            Vamos criar a melhor solução de energia para você
          </h2>

          <p className="mt-3 text-slate-600">
            Nossa equipe técnica está pronta para entender sua necessidade e montar
            um projeto sob medida para sua empresa.
          </p>

          <Link to="/contato">
            <button
              className="
                mt-8 px-10 py-4 rounded-xl bg-primary text-white font-semibold text-lg
                shadow-lg hover:bg-primary/90 hover:shadow-xl transition-all
              "
            >
              Solicitar Orçamento
            </button>
          </Link>
        </div>
      </div>
    </section>
  );
}
