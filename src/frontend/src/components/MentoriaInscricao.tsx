import { Button } from "@/components/ui/button";
import {
  ArrowLeft,
  ArrowRight,
  Check,
  ChevronLeft,
  ChevronRight,
  Play,
  Star,
} from "lucide-react";
import { useState } from "react";

const ebooks = [
  "Algumas coisas que você precisa saber antes de enfrentar todos os desafios do mercado de trabalho",
  "Minha melhor receita de currículo",
  "Quem tem medo da entrevista?",
  "Você pode ser empregado ou gerar empregos: empreendedorismo e os seus desafios",
];

const fullBenefits = [
  "Análise personalizada do currículo e perfil no LinkedIn",
  "Mapa de carreira com metas e próximos passos claros",
  "Preparação para entrevistas com simulações reais",
  "Orientação sobre o mercado de trabalho regional",
  "Suporte por WhatsApp durante todo o processo",
  "Acesso à comunidade exclusiva de alunos",
];

const offerIncludes = [
  "2 sessões de mentoria ao vivo (1h cada)",
  "Revisão completa do seu currículo",
  "Otimização do perfil LinkedIn",
  "Simulação real de entrevista",
  "Grupo WhatsApp exclusivo por 30 dias",
  "4 E-books gratuitos",
  "Material de apoio exclusivo",
  "Acesso à comunidade de alunos",
];

const testimonials = [
  {
    name: "Fernanda Lima",
    city: "Volta Redonda",
    text: "A mentoria mudou completamente minha perspectiva. Em 30 dias consegui meu primeiro emprego! Os e-books também foram essenciais para eu entender como funciona o mercado.",
    initials: "FL",
    color: "bg-rose-500",
  },
  {
    name: "Carlos Eduardo",
    city: "Resende",
    text: "Estava perdido sem saber por onde começar. A mentoria me deu um mapa claro do que fazer. Hoje estou trabalhando em uma empresa grande e recomendo para todos!",
    initials: "CE",
    color: "bg-blue-500",
  },
  {
    name: "Juliana Souza",
    city: "Barra Mansa",
    text: "O e-book sobre entrevistas me ajudou demais. Treinei as respostas e quando chegou a hora real me senti muito mais confiante. Em 3 semanas já tinha a vaga!",
    initials: "JS",
    color: "bg-emerald-500",
  },
  {
    name: "Matheus Oliveira",
    city: "Angra dos Reis",
    text: "Nunca pensei que empreender pudesse ser uma saída para mim também. O e-book sobre empreendedorismo abriu minha cabeça. Hoje tenho meu próprio negócio!",
    initials: "MO",
    color: "bg-purple-500",
  },
];

interface MentoriaInscricaoProps {
  onBack: () => void;
  videoUrl?: string;
}

export default function MentoriaInscricao({
  onBack,
  videoUrl = "",
}: MentoriaInscricaoProps) {
  const [current, setCurrent] = useState(0);

  const prev = () =>
    setCurrent((c) => (c - 1 + testimonials.length) % testimonials.length);
  const next = () => setCurrent((c) => (c + 1) % testimonials.length);

  const t = testimonials[current];

  return (
    <div className="min-h-screen bg-background">
      {/* Top bar */}
      <div className="sticky top-0 z-50 bg-white border-b border-border shadow-sm">
        <div className="max-w-5xl mx-auto px-4 py-3 flex items-center gap-3">
          <button
            type="button"
            onClick={onBack}
            className="flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors"
            data-ocid="mentoria_inscricao.link"
          >
            <ArrowLeft className="w-4 h-4" />
            Voltar
          </button>
          <span className="text-muted-foreground">|</span>
          <span className="text-sm font-bold tracking-wide text-foreground">
            MENTORIA PRIMEIRO EMPREGO
          </span>
        </div>
      </div>

      {/* Hero heading */}
      <div className="bg-[#1a1a1a] text-white py-14 px-4 text-center">
        <p className="text-sm uppercase tracking-widest text-[#d7350d] font-semibold mb-3">
          Programa Exclusivo
        </p>
        <h1 className="text-3xl md:text-5xl font-extrabold leading-tight mb-4">
          MENTORIA PRIMEIRO EMPREGO
        </h1>
        <p className="text-white/70 text-lg max-w-xl mx-auto">
          Tudo o que você precisa para conquistar sua primeira vaga com
          confiança e estratégia.
        </p>
      </div>

      {/* Video section */}
      <div className="bg-[#111] py-12 px-4">
        <div className="max-w-3xl mx-auto">
          <div className="relative w-full aspect-video rounded-2xl overflow-hidden bg-[#0a0a0a] border border-white/10 shadow-2xl">
            {videoUrl ? (
              <iframe
                src={videoUrl}
                title="Vídeo da Mentoria"
                className="w-full h-full"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            ) : (
              <div className="flex flex-col items-center justify-center w-full h-full gap-4 text-white/60">
                <div className="w-20 h-20 rounded-full bg-[#d7350d]/20 border-2 border-[#d7350d]/50 flex items-center justify-center">
                  <Play className="w-9 h-9 text-[#d7350d] fill-[#d7350d] ml-1" />
                </div>
                <p className="text-center text-sm px-8 leading-relaxed max-w-sm">
                  Assista e descubra como a mentoria pode transformar sua
                  carreira
                </p>
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-4 py-16 space-y-20">
        {/* O QUE VOCÊ RECEBE */}
        <section data-ocid="mentoria_inscricao.section">
          <h2 className="text-2xl md:text-3xl font-extrabold text-center mb-10 tracking-tight">
            O QUE VOCÊ RECEBE
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-10">
            {fullBenefits.map((b) => (
              <div
                key={b}
                className="flex gap-3 items-start p-4 bg-card rounded-xl border border-border"
              >
                <div className="w-6 h-6 rounded-full bg-green-100 flex items-center justify-center shrink-0 mt-0.5">
                  <Check className="w-3.5 h-3.5 text-green-600" />
                </div>
                <span className="text-sm leading-relaxed">{b}</span>
              </div>
            ))}
          </div>

          {/* Ebooks */}
          <div className="bg-amber-50 border border-amber-200 rounded-2xl p-6">
            <h3 className="text-lg font-bold mb-4 text-[#1a1a1a]">
              📚 4 E-Books Gratuitos Inclusos
            </h3>
            <div className="space-y-3">
              {ebooks.map((eb, i) => (
                <div key={eb} className="flex gap-3 items-start">
                  <span className="w-7 h-7 rounded-full bg-[#d7350d] text-white text-xs font-bold flex items-center justify-center shrink-0 mt-0.5">
                    {i + 1}
                  </span>
                  <span className="text-sm text-[#1a1a1a] leading-relaxed">
                    {eb}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Purchase Offer Card */}
        <section
          className="flex justify-center"
          data-ocid="mentoria_inscricao.card"
        >
          <div className="w-full max-w-md bg-card rounded-2xl border-2 border-primary shadow-2xl overflow-hidden">
            {/* Header */}
            <div className="bg-[#d7350d] px-6 pt-6 pb-5 text-white text-center">
              <span className="inline-block bg-white/20 text-white text-xs font-bold uppercase tracking-widest px-3 py-1 rounded-full mb-3">
                OFERTA ESPECIAL
              </span>
              <h3 className="text-xl font-extrabold leading-snug mb-3">
                Pacote Completo
                <br />
                MENTORIA PRIMEIRO EMPREGO
              </h3>
              <div className="text-5xl font-black mb-1">R$ 197</div>
              <div className="text-white/80 text-sm">
                ou 3x de R$ 69,00 sem juros
              </div>
            </div>

            {/* Includes */}
            <div className="p-6">
              <p className="text-xs uppercase tracking-widest text-muted-foreground font-semibold mb-4">
                Tudo incluso:
              </p>
              <ul className="space-y-3 mb-7">
                {offerIncludes.map((item) => (
                  <li key={item} className="flex gap-2 text-sm">
                    <Check className="w-4 h-4 text-[#d7350d] shrink-0 mt-0.5" />
                    {item}
                  </li>
                ))}
              </ul>

              <Button
                className="w-full bg-[#d7350d] hover:bg-[#c02e0a] text-white font-bold py-6 text-base uppercase tracking-wide shadow-lg"
                data-ocid="mentoria_inscricao.primary_button"
              >
                GARANTIR MINHA VAGA AGORA
                <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
              <p className="text-xs text-muted-foreground text-center mt-3">
                ✓ Garantia de 7 dias ou reembolso total
              </p>
            </div>
          </div>
        </section>

        {/* Testimonials Carousel */}
        <section data-ocid="mentoria_inscricao.panel">
          <h2 className="text-2xl font-extrabold text-center mb-8 tracking-tight">
            HISTÓRIA DE SUCESSO
          </h2>

          <div className="relative max-w-2xl mx-auto">
            <div className="bg-amber-50 border border-amber-200 rounded-2xl p-8">
              {/* Stars */}
              <div className="flex justify-center gap-1 mb-5">
                {[1, 2, 3, 4, 5].map((s) => (
                  <Star
                    key={s}
                    className="w-5 h-5 text-yellow-400 fill-yellow-400"
                  />
                ))}
              </div>

              {/* Photo + text */}
              <div className="flex flex-col items-center gap-4">
                <div
                  className={`w-20 h-20 rounded-full ${t.color} flex items-center justify-center text-white text-2xl font-extrabold shadow-md shrink-0`}
                >
                  {t.initials}
                </div>
                <p className="text-base italic text-[#1a1a1a] leading-relaxed text-center">
                  "{t.text}"
                </p>
                <p className="text-sm font-bold text-[#1a1a1a]">
                  {t.name}{" "}
                  <span className="font-normal text-muted-foreground">
                    — {t.city}
                  </span>
                </p>
              </div>
            </div>

            {/* Navigation */}
            <div className="flex items-center justify-center gap-4 mt-5">
              <button
                type="button"
                onClick={prev}
                className="w-9 h-9 rounded-full border border-border bg-white hover:bg-muted flex items-center justify-center transition-colors"
                aria-label="Depoimento anterior"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>

              <div className="flex gap-2">
                {testimonials.map((t2, i) => (
                  <button
                    key={t2.name}
                    type="button"
                    onClick={() => setCurrent(i)}
                    className={`w-2.5 h-2.5 rounded-full transition-colors ${
                      i === current ? "bg-[#d7350d]" : "bg-border"
                    }`}
                    aria-label={`Ir para depoimento ${i + 1}`}
                  />
                ))}
              </div>

              <button
                type="button"
                onClick={next}
                className="w-9 h-9 rounded-full border border-border bg-white hover:bg-muted flex items-center justify-center transition-colors"
                aria-label="Próximo depoimento"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </section>
      </div>

      {/* Footer */}
      <footer className="border-t border-border py-6 text-center">
        <p className="text-xs text-muted-foreground">
          © {new Date().getFullYear()}. Construído com{" "}
          <span className="text-[#d7350d]">♥</span> usando{" "}
          <a
            href={`https://caffeine.ai?utm_source=caffeine-footer&utm_medium=referral&utm_content=${encodeURIComponent(window.location.hostname)}`}
            target="_blank"
            rel="noopener noreferrer"
            className="underline hover:text-foreground transition-colors"
          >
            caffeine.ai
          </a>
        </p>
      </footer>
    </div>
  );
}
