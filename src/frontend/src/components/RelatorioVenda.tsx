import { Button } from "@/components/ui/button";
import {
  BarChart3,
  BookOpen,
  CheckCircle2,
  ChevronRight,
  FileText,
  Gift,
  Linkedin,
  Radar,
  ShieldCheck,
  Star,
  TrendingUp,
  Trophy,
  Users,
  Zap,
} from "lucide-react";

interface RelatorioVendaProps {
  overallScore: number;
  candidateName: string;
  onBuy: () => void;
  onBack: () => void;
}

export default function RelatorioVenda({
  overallScore,
  candidateName,
  onBuy,
  onBack,
}: RelatorioVendaProps) {
  const classification =
    overallScore >= 90
      ? "Excelente"
      : overallScore >= 70
        ? "Bom"
        : overallScore >= 50
          ? "Regular"
          : "Necessita melhorias";

  const _classColor =
    overallScore >= 90
      ? "text-green-600"
      : overallScore >= 70
        ? "text-blue-600"
        : overallScore >= 50
          ? "text-amber-600"
          : "text-red-600";

  const reportPages = [
    {
      num: 1,
      title: "Resumo Executivo",
      icon: Trophy,
      color: "bg-amber-50 text-amber-600 border-amber-200",
      items: [
        "Visão geral da análise completa",
        "Pontuação geral e classificação profissional",
        "Resumo dos pontos fortes",
        "Principais melhorias recomendadas",
        "Gráfico geral de avaliação",
      ],
    },
    {
      num: 2,
      title: "Estrutura e Comunicação",
      icon: FileText,
      color: "bg-blue-50 text-blue-600 border-blue-200",
      items: [
        "Análise da estrutura do currículo",
        "Avaliação da qualidade da escrita em português",
        "Erros gramaticais encontrados com exemplos",
        "Sugestões de melhoria com exemplos práticos",
        "Gráfico radar de qualidade",
      ],
    },
    {
      num: 3,
      title: "Experiência e Resultados",
      icon: TrendingUp,
      color: "bg-green-50 text-green-600 border-green-200",
      items: [
        "Avaliação da trajetória profissional",
        "Análise de evolução de carreira",
        "Avaliação de resultados apresentados",
        "Comparação com padrões de mercado",
        "Gráfico de competitividade profissional",
      ],
    },
    {
      num: 4,
      title: "Orientações de Melhoria",
      icon: Zap,
      color: "bg-purple-50 text-purple-600 border-purple-200",
      items: [
        "Recomendações práticas detalhadas",
        "Melhoria na descrição das experiências",
        "Inclusão de resultados mensuráveis",
        "Otimização das competências",
        "Exemplos de boas práticas de currículo",
      ],
    },
    {
      num: 5,
      title: "Otimização do LinkedIn",
      icon: Linkedin,
      color: "bg-sky-50 text-sky-600 border-sky-200",
      items: [
        "Análise do título profissional",
        "Sugestão de headline profissional",
        "Exemplo de resumo profissional otimizado",
        "Dicas para aumentar visibilidade",
        "Recomendações de networking",
      ],
    },
  ];

  const criteria = [
    { label: "Estrutura e Organização", max: 10 },
    { label: "Qualidade da Escrita", max: 10 },
    { label: "Objetivo Profissional", max: 10 },
    { label: "Formação Acadêmica", max: 10 },
    { label: "Experiência Profissional", max: 20 },
    { label: "Resultados e Conquistas", max: 20 },
    { label: "Competências e Habilidades", max: 10 },
    { label: "Informações Complementares", max: 10 },
  ];

  const charts = [
    {
      icon: Radar,
      title: "Gráfico Radar de Avaliação",
      desc: "Visualização radar com 7 categorias: Estrutura, Português, Objetivo, Formação, Experiência, Resultados e Competências.",
    },
    {
      icon: BarChart3,
      title: "Gráfico de Pontuação Geral",
      desc: "Comparação entre sua pontuação e a média dos currículos profissionais do mercado.",
    },
    {
      icon: TrendingUp,
      title: "Gráfico de Competitividade",
      desc: "Comparação de experiência, formação e habilidades com o mercado.",
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero */}
      <div className="bg-gradient-to-br from-gray-900 via-gray-800 to-red-900 text-white py-14 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 bg-white/10 rounded-full px-4 py-1.5 text-sm mb-6">
            <ShieldCheck className="w-4 h-4 text-green-400" />
            Relatório profissional gerado por especialistas em RH
          </div>
          <h1 className="text-3xl md:text-4xl font-black mb-4 leading-tight">
            {candidateName ? (
              <>
                Olá,{" "}
                <span className="text-red-400">
                  {candidateName.split(" ")[0]}
                </span>
                !
              </>
            ) : (
              "Seu Relatório Está Pronto!"
            )}
            <br />
            Seu currículo recebeu{" "}
            <span
              className={`${overallScore >= 70 ? "text-green-400" : "text-amber-400"}`}
            >
              {overallScore} pontos
            </span>
          </h1>
          <p className="text-white/70 text-lg mb-4">
            Classificação:{" "}
            <span className="font-bold text-white">{classification}</span>
          </p>
          <p className="text-white/60 text-sm max-w-2xl mx-auto">
            A análise básica revelou oportunidades de melhoria. Adquira agora o
            relatório completo e transforme seu currículo em um passaporte para
            as melhores vagas.
          </p>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 py-12">
        {/* Price card */}
        <div className="bg-white rounded-2xl border-2 border-red-500 shadow-xl p-8 mb-10 relative overflow-hidden">
          <div className="absolute top-0 right-0 bg-red-500 text-white text-xs font-bold px-4 py-2 rounded-bl-xl">
            OFERTA ESPECIAL
          </div>
          <div className="flex flex-col md:flex-row items-center gap-8">
            <div className="flex-1">
              <h2 className="text-2xl font-black text-gray-900 mb-2">
                Relatório Completo de Avaliação
              </h2>
              <p className="text-gray-500 text-sm mb-4">
                Até 4 páginas de análise profissional + 1 página de otimização
                do LinkedIn. Simulando avaliação feita por especialistas de RH.
              </p>
              <div className="flex items-center gap-3 mb-6">
                <div>
                  <span className="text-4xl font-black text-red-600">
                    R$&nbsp;19,90
                  </span>
                  <p className="text-xs text-gray-400 mt-0.5">
                    Mais barato que o combo do seu lanche preferido e pode mudar
                    sua vida profissional para sempre!
                  </p>
                </div>
              </div>
              <Button
                onClick={onBuy}
                className="w-full md:w-auto bg-red-600 hover:bg-red-700 text-white font-bold text-base px-8 py-3 h-auto rounded-xl"
                data-ocid="relatorio.buy_button"
              >
                Quero o Relatório Completo{" "}
                <ChevronRight className="w-5 h-5 ml-1" />
              </Button>
            </div>
            <div className="bg-gray-50 rounded-xl border border-gray-200 p-5 min-w-[220px]">
              <p className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-3">
                O que está incluído:
              </p>
              {[
                "Relatório profissional de até 4 páginas",
                "1 página de análise do LinkedIn",
                "3 gráficos comparativos",
                "Pontuação por 8 critérios de RH",
                "Diagnóstico profissional completo",
              ].map((item) => (
                <div key={item} className="flex items-start gap-2 mb-2">
                  <CheckCircle2 className="w-4 h-4 text-green-500 shrink-0 mt-0.5" />
                  <span className="text-xs text-gray-700">{item}</span>
                </div>
              ))}
              <div className="border-t border-dashed border-gray-300 mt-3 pt-3">
                <div className="flex items-center gap-2 bg-amber-50 rounded-lg px-3 py-2">
                  <Gift className="w-4 h-4 text-amber-500 shrink-0" />
                  <div>
                    <p className="text-xs font-bold text-amber-700">
                      GRÁTIS com seu relatório:
                    </p>
                    <p className="text-xs text-amber-600">
                      E-book: "Quem tem medo da entrevista?"
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Report pages preview */}
        <h3 className="text-xl font-black text-gray-900 mb-6 text-center">
          O que seu relatório vai conter
        </h3>
        <div className="space-y-4 mb-12">
          {reportPages.map((page) => (
            <div
              key={page.num}
              className="bg-white rounded-xl border border-gray-200 p-5 flex gap-5"
            >
              <div
                className={`w-12 h-12 rounded-xl border flex items-center justify-center shrink-0 ${page.color}`}
              >
                <page.icon className="w-6 h-6" />
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-xs font-bold text-gray-400">
                    PÁGINA {page.num}
                  </span>
                  <h4 className="font-bold text-gray-900">{page.title}</h4>
                </div>
                <ul className="grid grid-cols-1 sm:grid-cols-2 gap-1">
                  {page.items.map((item) => (
                    <li
                      key={item}
                      className="flex items-center gap-1.5 text-xs text-gray-600"
                    >
                      <span className="w-1.5 h-1.5 rounded-full bg-red-400 shrink-0" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>

        {/* Scoring criteria */}
        <h3 className="text-xl font-black text-gray-900 mb-6 text-center">
          Critérios de Avaliação (100 pontos)
        </h3>
        <div className="bg-white rounded-2xl border border-gray-200 p-6 mb-12">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {criteria.map((c) => (
              <div
                key={c.label}
                className="flex items-center justify-between bg-gray-50 rounded-lg px-4 py-3"
              >
                <span className="text-sm text-gray-700">{c.label}</span>
                <span className="text-sm font-bold text-red-600">
                  até {c.max} pts
                </span>
              </div>
            ))}
          </div>
          <div className="mt-4 border-t pt-4 grid grid-cols-2 sm:grid-cols-4 gap-2 text-center">
            {[
              {
                range: "90–100",
                label: "Excelente",
                color: "text-green-600 bg-green-50",
              },
              {
                range: "70–89",
                label: "Bom",
                color: "text-blue-600 bg-blue-50",
              },
              {
                range: "50–69",
                label: "Regular",
                color: "text-amber-600 bg-amber-50",
              },
              {
                range: "< 50",
                label: "Necessita melhorias",
                color: "text-red-600 bg-red-50",
              },
            ].map((cl) => (
              <div
                key={cl.range}
                className={`rounded-lg px-2 py-2 text-xs font-medium ${cl.color}`}
              >
                <p className="font-bold">{cl.range}</p>
                <p>{cl.label}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Charts */}
        <h3 className="text-xl font-black text-gray-900 mb-6 text-center">
          Gráficos incluídos no relatório
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-12">
          {charts.map((chart) => (
            <div
              key={chart.title}
              className="bg-white rounded-xl border border-gray-200 p-5 text-center"
            >
              <div className="w-12 h-12 rounded-full bg-red-50 border border-red-100 flex items-center justify-center mx-auto mb-3">
                <chart.icon className="w-6 h-6 text-red-500" />
              </div>
              <h4 className="font-bold text-sm text-gray-900 mb-2">
                {chart.title}
              </h4>
              <p className="text-xs text-gray-500 leading-relaxed">
                {chart.desc}
              </p>
            </div>
          ))}
        </div>

        {/* Social proof */}
        <div className="bg-gray-900 rounded-2xl p-8 text-white text-center mb-10">
          <div className="flex justify-center gap-1 mb-3">
            {[1, 2, 3, 4, 5].map((s) => (
              <Star key={s} className="w-5 h-5 text-amber-400 fill-amber-400" />
            ))}
          </div>
          <p className="text-white/80 italic text-sm max-w-lg mx-auto mb-4">
            "O relatório foi incrível! Em 2 semanas de aplicações com o
            currículo reformulado, consegui 5 entrevistas. Valeu muito cada
            centavo!"
          </p>
          <div className="flex items-center justify-center gap-2">
            <div className="w-8 h-8 rounded-full bg-red-600 flex items-center justify-center text-sm font-bold">
              M
            </div>
            <div className="text-left">
              <p className="text-sm font-semibold">Mariana S.</p>
              <p className="text-xs text-white/50">Volta Redonda - RJ</p>
            </div>
          </div>
        </div>

        {/* Final CTA */}
        <div className="text-center">
          <Button
            onClick={onBuy}
            className="bg-red-600 hover:bg-red-700 text-white font-bold text-lg px-12 py-4 h-auto rounded-xl shadow-lg"
            data-ocid="relatorio.final_buy_button"
          >
            Quero meu Relatório Completo por R$&nbsp;19,90
            <ChevronRight className="w-5 h-5 ml-2" />
          </Button>
          <p className="text-xs text-gray-400 mt-3">
            Pagamento seguro · Receba por e-mail em até 24h
          </p>
          <button
            type="button"
            onClick={onBack}
            className="mt-4 text-sm text-gray-400 hover:text-gray-600 underline"
          >
            Voltar para minha análise básica
          </button>
        </div>
      </div>

      {/* Footer info */}
      <div className="bg-white border-t border-gray-100 py-6 px-4 text-center">
        <div className="flex items-center justify-center gap-2 text-xs text-gray-500">
          <Users className="w-4 h-4" />
          <span>Seus dados são tratados com segurança conforme a LGPD.</span>
        </div>
      </div>
    </div>
  );
}
