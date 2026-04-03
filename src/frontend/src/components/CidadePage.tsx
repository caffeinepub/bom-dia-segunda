import { getCidadeBySlug } from "@/data/cidades";
import {
  ArrowLeft,
  GraduationCap,
  Landmark,
  MapPin,
  TrendingUp,
  Users,
  Utensils,
} from "lucide-react";

interface CidadePageProps {
  slug: string;
}

export default function CidadePage({ slug }: CidadePageProps) {
  const cidade = getCidadeBySlug(slug);

  function handleBack() {
    window.location.hash = "";
    window.scrollTo(0, 0);
  }

  if (!cidade) {
    return (
      <div className="min-h-screen bg-white flex flex-col items-center justify-center">
        <p className="text-gray-500 mb-4">Cidade não encontrada.</p>
        <button
          type="button"
          onClick={handleBack}
          className="flex items-center gap-2 text-[#d7350d] hover:underline font-medium"
          data-ocid="cidade.back.button"
        >
          <ArrowLeft className="w-4 h-4" />
          Voltar
        </button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Header strip */}
      <div className="sticky top-0 z-40 bg-white border-b border-gray-200 shadow-sm">
        <div className="max-w-4xl mx-auto px-4 h-14 flex items-center gap-4">
          <button
            type="button"
            onClick={handleBack}
            className="flex items-center gap-2 text-gray-600 hover:text-[#d7350d] transition-colors text-sm font-medium"
            data-ocid="cidade.back.button"
          >
            <ArrowLeft className="w-4 h-4" />
            Voltar
          </button>
          <span className="text-gray-300">|</span>
          <span className="text-sm text-gray-500">
            <span className="font-semibold text-gray-800">{cidade.nome}</span>
            {" — Sul Fluminense, RJ"}
          </span>
        </div>
      </div>

      <main className="max-w-4xl mx-auto px-4 py-10">
        {/* City name + badge */}
        <div className="mb-6">
          <div className="flex flex-wrap items-start gap-3 mb-3">
            <h1 className="text-4xl font-black text-gray-900 leading-tight">
              {cidade.nome}
            </h1>
            {cidade.universitaria && (
              <span
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-sm font-bold text-white mt-1"
                style={{ background: "#d7350d" }}
                data-ocid="cidade.university.badge"
              >
                <GraduationCap className="w-4 h-4" />
                CIDADE UNIVERSITÁRIA
              </span>
            )}
          </div>
          <div className="flex items-center gap-2 text-gray-500 text-sm">
            <MapPin className="w-4 h-4 text-[#d7350d]" />
            <span>Sul Fluminense · Estado do Rio de Janeiro</span>
          </div>
        </div>

        {/* University box */}
        {cidade.universitaria && cidade.universidades && (
          <div className="mb-6 p-4 rounded-xl bg-red-50 border border-red-100">
            <h2 className="font-bold text-[#d7350d] text-sm uppercase tracking-wide mb-2 flex items-center gap-2">
              <GraduationCap className="w-4 h-4" />
              Ensino Superior em {cidade.nome}
            </h2>
            <ul className="space-y-1">
              {cidade.universidades.map((uni) => (
                <li
                  key={uni}
                  className="text-sm text-gray-700 flex items-start gap-2"
                >
                  <span className="text-[#d7350d] mt-0.5 shrink-0">•</span>
                  {uni}
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Hero image placeholder */}
        <div
          className="w-full h-72 sm:h-96 rounded-2xl mb-8 flex items-end overflow-hidden relative"
          style={{
            background:
              "linear-gradient(135deg, #1a1a2e 0%, #16213e 40%, #0f3460 70%, #d7350d 100%)",
          }}
          data-ocid="cidade.hero.card"
        >
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-center">
              <MapPin className="w-16 h-16 text-white/30 mx-auto mb-3" />
              <p className="text-white/50 text-sm max-w-xs px-4">
                {cidade.fotoDescricao}
              </p>
            </div>
          </div>
          <div className="relative z-10 w-full bg-gradient-to-t from-black/70 to-transparent p-6">
            <p className="text-white font-bold text-2xl">{cidade.nome}</p>
            <p className="text-white/70 text-sm">
              Sul Fluminense · Rio de Janeiro
            </p>
          </div>
        </div>

        {/* Description */}
        <p className="text-gray-700 leading-relaxed text-base mb-8">
          {cidade.descricao}
        </p>

        {/* Grid: Dados socioeconômicos + Turismo */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          {/* Dados Socioeconômicos */}
          <div className="rounded-2xl border border-gray-200 p-6">
            <h2 className="font-bold text-gray-900 text-lg mb-4 flex items-center gap-2">
              <TrendingUp className="w-5 h-5 text-[#d7350d]" />
              Dados Socioeconômicos
            </h2>
            <dl className="space-y-3">
              <div className="flex items-center justify-between">
                <dt className="flex items-center gap-2 text-sm text-gray-500">
                  <Users className="w-4 h-4" />
                  População
                </dt>
                <dd className="font-semibold text-gray-800 text-sm">
                  {cidade.populacao}
                </dd>
              </div>
              <div className="h-px bg-gray-100" />
              <div className="flex items-center justify-between">
                <dt className="flex items-center gap-2 text-sm text-gray-500">
                  <TrendingUp className="w-4 h-4" />
                  PIB
                </dt>
                <dd className="font-semibold text-gray-800 text-sm">
                  {cidade.pib}
                </dd>
              </div>
              <div className="h-px bg-gray-100" />
              <div className="flex items-center justify-between">
                <dt className="flex items-center gap-2 text-sm text-gray-500">
                  <span className="w-4 h-4 inline-flex items-center justify-center text-xs font-bold text-gray-400">
                    IDH
                  </span>
                  IDHM
                </dt>
                <dd className="font-semibold text-gray-800 text-sm">
                  {cidade.idhm}
                </dd>
              </div>
              <div className="h-px bg-gray-100" />
              <div className="flex items-center justify-between">
                <dt className="flex items-center gap-2 text-sm text-gray-500">
                  <MapPin className="w-4 h-4" />
                  Área
                </dt>
                <dd className="font-semibold text-gray-800 text-sm">
                  {cidade.areaKm2}
                </dd>
              </div>
            </dl>
            <div className="mt-4 pt-4 border-t border-gray-100">
              <p className="text-xs text-gray-500 font-medium uppercase tracking-wide mb-1">
                Economia
              </p>
              <p className="text-sm text-gray-700">{cidade.economia}</p>
            </div>
          </div>

          {/* Turismo e Cultura */}
          <div className="rounded-2xl border border-gray-200 p-6">
            <h2 className="font-bold text-gray-900 text-lg mb-4 flex items-center gap-2">
              <Landmark className="w-5 h-5 text-[#d7350d]" />
              Turismo &amp; Cultura
            </h2>
            <ul className="space-y-2">
              {cidade.turismo.map((item) => (
                <li
                  key={item}
                  className="flex items-start gap-2 text-sm text-gray-700"
                >
                  <span
                    className="mt-1.5 w-1.5 h-1.5 rounded-full shrink-0"
                    style={{ background: "#d7350d" }}
                  />
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Historical points */}
        {cidade.pontosHistoricos.length > 0 && (
          <div className="mb-8 p-6 rounded-2xl bg-gray-50 border border-gray-100">
            <h2 className="font-bold text-gray-900 text-lg mb-4 flex items-center gap-2">
              <Landmark className="w-5 h-5 text-[#d7350d]" />
              Pontos Históricos
            </h2>
            <ul className="space-y-2">
              {cidade.pontosHistoricos.map((item) => (
                <li
                  key={item}
                  className="flex items-start gap-2 text-sm text-gray-700"
                >
                  <span
                    className="mt-1.5 w-1.5 h-1.5 rounded-full shrink-0"
                    style={{ background: "#d7350d" }}
                  />
                  {item}
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Gastronomy */}
        <div className="mb-10 p-6 rounded-2xl bg-gray-50 border border-gray-100">
          <h2 className="font-bold text-gray-900 text-lg mb-3 flex items-center gap-2">
            <Utensils className="w-5 h-5 text-[#d7350d]" />
            Gastronomia
          </h2>
          <p className="text-sm text-gray-700 leading-relaxed">
            {cidade.gastronomia}
          </p>
        </div>

        {/* CTA */}
        <div
          className="rounded-2xl p-8 text-center"
          style={{ background: "#111" }}
        >
          <p className="text-white font-bold text-xl mb-2">
            Encontre vagas em {cidade.nome}
          </p>
          <p className="text-white/60 text-sm mb-5">
            Oportunidades de emprego disponíveis agora na sua cidade
          </p>
          <button
            type="button"
            onClick={() => {
              window.location.hash = "vagas";
              window.scrollTo(0, 0);
            }}
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full font-bold text-white transition-colors text-sm"
            style={{ background: "#d7350d" }}
            data-ocid="cidade.vagas.primary_button"
          >
            <MapPin className="w-4 h-4" />
            Ver vagas em {cidade.nome}
          </button>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-gray-200 mt-8 py-6 text-center text-xs text-gray-400">
        <span>© {new Date().getFullYear()} Bom Dia Segunda — </span>
        <button
          type="button"
          onClick={handleBack}
          className="text-[#d7350d] hover:underline bg-transparent border-0 p-0 cursor-pointer"
        >
          Voltar ao site
        </button>
      </footer>
    </div>
  );
}
