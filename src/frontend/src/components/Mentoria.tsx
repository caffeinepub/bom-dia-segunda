import { Button } from "@/components/ui/button";
import {
  ArrowRight,
  Check,
  ChevronLeft,
  ChevronRight,
  Star,
} from "lucide-react";
import { useState } from "react";

const benefits = [
  "Análise personalizada do seu currículo e perfil no LinkedIn",
  "Mapa de carreira com metas e próximos passos claros",
  "Preparação para entrevistas com simulações reais",
  "Orientação sobre o mercado de trabalho regional",
  "Suporte por WhatsApp durante todo o processo",
  "Acesso à comunidade exclusiva de alunos",
];

const testimonials = [
  {
    name: "Fernanda Lima",
    city: "Volta Redonda",
    initials: "FL",
    color: "bg-blue-400",
    quote:
      "A mentoria mudou completamente minha perspectiva. Em 30 dias consegui meu primeiro emprego em Volta Redonda!",
  },
  {
    name: "Carlos Mendes",
    city: "Resende",
    initials: "CM",
    color: "bg-green-500",
    quote:
      "O suporte foi incrível. As simulações de entrevista me deram muita confiança para enfrentar os processos seletivos.",
  },
  {
    name: "Ana Paula Santos",
    city: "Barra Mansa",
    initials: "AS",
    color: "bg-purple-500",
    quote:
      "Meu currículo estava fraco e o LinkedIn nem atualizado. Depois da mentoria, recebi 3 propostas em 2 semanas!",
  },
  {
    name: "Rafael Oliveira",
    city: "Três Rios",
    initials: "RO",
    color: "bg-orange-500",
    quote:
      "Indicaria para qualquer pessoa que está tentando entrar no mercado. O mentor conhece muito bem a realidade regional.",
  },
  {
    name: "Juliana Costa",
    city: "Vassouras",
    initials: "JC",
    color: "bg-pink-500",
    quote:
      "Consegui meu primeiro estágio logo após a mentoria. As dicas de LinkedIn fizeram toda a diferença no processo.",
  },
  {
    name: "Lucas Ferreira",
    city: "Angra dos Reis",
    initials: "LF",
    color: "bg-teal-500",
    quote:
      "Excelente custo-benefício. O material de apoio e o grupo de WhatsApp foram fundamentais para minha evolução.",
  },
];

interface MentoriaProps {
  onInscricao?: () => void;
}

export default function Mentoria({ onInscricao }: MentoriaProps) {
  const [currentIndex, setCurrentIndex] = useState(0);

  const prev = () =>
    setCurrentIndex((i) => (i - 1 + testimonials.length) % testimonials.length);
  const next = () => setCurrentIndex((i) => (i + 1) % testimonials.length);

  const current = testimonials[currentIndex];

  return (
    <section
      id="mentoria"
      className="py-16 px-4 bg-gradient-to-br from-red-50 via-white to-rose-50 border-t-4 border-red-600 border-b border-red-100"
    >
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-foreground mb-2">
            MENTORIA PRIMEIRO EMPREGO
          </h2>
          <p className="text-muted-foreground">
            Orientação especializada para quem está entrando no mercado
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
          {/* Benefits + Testimonial Carousel */}
          <div>
            <h3 className="text-xl font-bold mb-6">O que você vai receber:</h3>
            <ul className="space-y-4">
              {benefits.map((benefit) => (
                <li key={benefit} className="flex gap-3">
                  <div className="w-6 h-6 rounded-full bg-green-100 flex items-center justify-center shrink-0 mt-0.5">
                    <Check className="w-3.5 h-3.5 text-green-600" />
                  </div>
                  <span className="text-sm text-muted-foreground leading-relaxed">
                    {benefit}
                  </span>
                </li>
              ))}
            </ul>

            {/* Testimonial Carousel */}
            <div className="mt-8">
              <div className="bg-gray-50 border border-gray-200 rounded-xl p-5 relative">
                {/* Photo + Stars row */}
                <div className="flex items-center gap-3 mb-3">
                  <div
                    className={`w-12 h-12 rounded-full ${current.color} flex items-center justify-center shrink-0 text-white font-bold text-sm`}
                  >
                    {current.initials}
                  </div>
                  <div>
                    <p className="font-semibold text-sm text-foreground">
                      {current.name}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      {current.city}
                    </p>
                    <div className="flex gap-0.5 mt-0.5">
                      {[1, 2, 3, 4, 5].map((s) => (
                        <Star
                          key={s}
                          className="w-3.5 h-3.5 text-yellow-400 fill-yellow-400"
                        />
                      ))}
                    </div>
                  </div>
                </div>

                <p className="text-sm text-muted-foreground italic leading-relaxed">
                  &ldquo;{current.quote}&rdquo;
                </p>

                {/* Navigation buttons */}
                <div className="flex items-center justify-between mt-4">
                  <button
                    type="button"
                    onClick={prev}
                    className="w-8 h-8 rounded-full bg-gray-200 hover:bg-gray-300 flex items-center justify-center transition-colors"
                    aria-label="Anterior"
                    data-ocid="mentoria.testimonial.pagination_prev"
                  >
                    <ChevronLeft className="w-4 h-4 text-gray-600" />
                  </button>

                  {/* Dots */}
                  <div className="flex gap-1.5">
                    {testimonials.map((t, position) => (
                      <button
                        key={t.name}
                        type="button"
                        onClick={() => setCurrentIndex(position)}
                        className={`w-2 h-2 rounded-full transition-colors ${
                          position === currentIndex
                            ? "bg-primary"
                            : "bg-gray-300"
                        }`}
                        aria-label={`Depoimento de ${t.name}`}
                      />
                    ))}
                  </div>

                  <button
                    type="button"
                    onClick={next}
                    className="w-8 h-8 rounded-full bg-gray-200 hover:bg-gray-300 flex items-center justify-center transition-colors"
                    aria-label="Próximo"
                    data-ocid="mentoria.testimonial.pagination_next"
                  >
                    <ChevronRight className="w-4 h-4 text-gray-600" />
                  </button>
                </div>
              </div>

              <p className="text-xs text-muted-foreground text-center mt-2">
                {currentIndex + 1} de {testimonials.length} depoimentos • Média
                4.9/5 ⭐
              </p>
            </div>
          </div>

          {/* Pricing Card */}
          <div className="bg-card rounded-2xl border-2 border-primary shadow-card overflow-hidden">
            <div className="bg-primary p-6 text-white text-center">
              <div className="text-xs font-semibold uppercase tracking-widest mb-2 text-white/80">
                Pacote Completo
              </div>
              <div className="text-4xl font-extrabold mb-1">R$ 197</div>
              <div className="text-white/80 text-sm">
                ou 3x de R$ 69,00 sem juros
              </div>
            </div>
            <div className="p-6">
              <ul className="space-y-3 mb-6">
                {[
                  "2 sessões de mentoria (45 min cada)",
                  "Revisão completa de currículo",
                  "Otimização do LinkedIn",
                  "Material de apoio exclusivo",
                  "Grupo WhatsApp por 30 dias",
                ].map((item) => (
                  <li key={item} className="flex gap-2 text-sm">
                    <Check className="w-4 h-4 text-primary shrink-0 mt-0.5" />
                    {item}
                  </li>
                ))}
              </ul>
              <Button
                className="w-full bg-primary hover:bg-primary/90 text-white font-semibold py-5"
                data-ocid="mentoria.primary_button"
                onClick={onInscricao}
              >
                QUERO ME INSCREVER <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
              <p className="text-xs text-muted-foreground text-center mt-3">
                ✓ Garantia de 7 dias ou reembolso total
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
