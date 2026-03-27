import { Button } from "@/components/ui/button";
import { ArrowRight, Check, Star } from "lucide-react";

const benefits = [
  "Análise personalizada do seu currículo e perfil no LinkedIn",
  "Mapa de carreira com metas e próximos passos claros",
  "Preparação para entrevistas com simulações reais",
  "Orientação sobre o mercado de trabalho regional",
  "Suporte por WhatsApp durante todo o processo",
  "Acesso à comunidade exclusiva de alunos",
];

export default function Mentoria() {
  return (
    <section id="mentoria" className="py-16 px-4 bg-background">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-foreground mb-2">
            Mentoria para Primeiro Emprego
          </h2>
          <p className="text-muted-foreground">
            Orientação especializada para quem está entrando no mercado
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
          {/* Benefits */}
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

            <div className="mt-8 bg-amber-50 border border-amber-200 rounded-xl p-4">
              <div className="flex items-center gap-2 mb-2">
                {[1, 2, 3, 4, 5].map((s) => (
                  <Star
                    key={s}
                    className="w-4 h-4 text-yellow-400 fill-yellow-400"
                  />
                ))}
                <span className="text-sm font-semibold">4.9/5 estrelas</span>
              </div>
              <p className="text-sm text-muted-foreground italic">
                "A mentoria mudou completamente minha perspectiva. Em 30 dias
                consegui meu primeiro emprego em Volta Redonda!"
              </p>
              <p className="text-xs text-muted-foreground mt-1">
                — Fernanda Lima, Volta Redonda
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
                  "2 sessões de mentoria (1h cada)",
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
              >
                Quero me Inscrever <ArrowRight className="w-4 h-4 ml-2" />
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
