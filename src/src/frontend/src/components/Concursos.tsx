import { Button } from "@/components/ui/button";
import {
  BookOpen,
  Building2,
  CalendarDays,
  ChevronLeft,
  ChevronRight,
  ExternalLink,
  MapPin,
  Users,
} from "lucide-react";
import { useCallback, useEffect, useRef, useState } from "react";

interface Concurso {
  id: string;
  orgao: string;
  vagas: string;
  escolaridade: string;
  salario: string;
  inscricoes: string;
  dataProva: string;
  status: string;
  banca: string;
  link: string;
  regiao: string;
}

const concursos: Concurso[] = [
  {
    id: "1",
    orgao: "MP RJ — Promotor de Justiça",
    vagas: "10 + CR",
    escolaridade: "Superior (Direito)",
    salario: "R$ 37.765,53",
    inscricoes: "18/03/2026 a 16/04/2026",
    dataProva: "31/05/2026",
    status: "Inscrições abertas",
    banca: "FGV",
    link: "https://www.mprj.mp.br/concursos",
    regiao: "Estado do Rio de Janeiro",
  },
  {
    id: "2",
    orgao: "TRF 2ª Região — Juiz Federal",
    vagas: "27 + CR",
    escolaridade: "Superior (Direito)",
    salario: "R$ 37.765,55",
    inscricoes: "Previsto 2026",
    dataProva: "2º semestre 2026",
    status: "Banca definida",
    banca: "FGV",
    link: "https://www.trf2.jus.br/",
    regiao: "RJ e ES",
  },
  {
    id: "3",
    orgao: "Polícia Civil RJ — Delegado",
    vagas: "85",
    escolaridade: "Superior (Direito)",
    salario: "Até R$ 26.900",
    inscricoes: "Previsto 2026",
    dataProva: "2026",
    status: "Banca definida",
    banca: "Cesgranrio",
    link: "https://www.pcerj.rj.gov.br/",
    regiao: "Estado do Rio de Janeiro",
  },
  {
    id: "4",
    orgao: "Prefeitura de Saquarema — Múltiplos cargos",
    vagas: "1.794",
    escolaridade: "Fund. / Médio / Técnico / Superior",
    salario: "A definir",
    inscricoes: "Previsto 2026",
    dataProva: "2026",
    status: "Edital previsto",
    banca: "IBAM",
    link: "https://www.saquarema.rj.gov.br/",
    regiao: "Saquarema, RJ",
  },
  {
    id: "5",
    orgao: "Bombeiros RJ — Temporários",
    vagas: "1.500",
    escolaridade: "Médio / Superior",
    salario: "A definir",
    inscricoes: "Previsto 2026",
    dataProva: "2026",
    status: "Banca definida",
    banca: "AOCP",
    link: "https://www.cbmerj.rj.gov.br/",
    regiao: "Estado do Rio de Janeiro",
  },
  {
    id: "6",
    orgao: "UniRio — Técnico-Administrativo",
    vagas: "127",
    escolaridade: "Médio / Superior",
    salario: "Até R$ 4.967,04",
    inscricoes: "Previsto 2026",
    dataProva: "2026",
    status: "Banca definida",
    banca: "AOCP",
    link: "https://www.unirio.br/concursos",
    regiao: "Rio de Janeiro, RJ",
  },
  {
    id: "7",
    orgao: "SES RJ — Saúde",
    vagas: "287",
    escolaridade: "Médio / Superior",
    salario: "Até R$ 6.409,94",
    inscricoes: "Previsto 2026",
    dataProva: "2026",
    status: "Edital previsto",
    banca: "A definir",
    link: "https://www.rj.gov.br/secretaria/saude",
    regiao: "Estado do Rio de Janeiro",
  },
  {
    id: "8",
    orgao: "IBGE — Agente de Pesquisas (Temporário)",
    vagas: "36.946",
    escolaridade: "Ensino Médio",
    salario: "A definir",
    inscricoes: "Previsto maio/2026",
    dataProva: "2026",
    status: "Edital previsto",
    banca: "A definir",
    link: "https://www.ibge.gov.br/",
    regiao: "Todo o Brasil",
  },
  {
    id: "9",
    orgao: "Teatro Municipal RJ — Múltiplos cargos",
    vagas: "110",
    escolaridade: "Fund. / Médio / Superior",
    salario: "Até R$ 7.193,46",
    inscricoes: "Previsto 2026",
    dataProva: "2026",
    status: "Edital previsto",
    banca: "A definir",
    link: "https://www.theatromunicipal.rj.gov.br/",
    regiao: "Rio de Janeiro, RJ",
  },
  {
    id: "10",
    orgao: "Prefeitura de Angra dos Reis — Agente Tributário",
    vagas: "20 + CR",
    escolaridade: "Superior",
    salario: "Até R$ 4.600",
    inscricoes: "Previsto 2026",
    dataProva: "2026",
    status: "Banca definida",
    banca: "Consuplan",
    link: "https://portal.angra.rj.gov.br/transp-concursos.asp",
    regiao: "Angra dos Reis, RJ",
  },
];

function statusBadge(status: string) {
  if (status === "Inscrições abertas") {
    return "bg-green-100 text-green-700 border-green-200";
  }
  if (status === "Banca definida") {
    return "bg-blue-100 text-blue-700 border-blue-200";
  }
  return "bg-amber-100 text-amber-700 border-amber-200";
}

export default function Concursos() {
  const [current, setCurrent] = useState(0);
  const total = concursos.length;
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const stopTimer = useCallback(() => {
    if (timerRef.current) {
      clearInterval(timerRef.current);
      timerRef.current = null;
    }
  }, []);

  const startTimer = useCallback(() => {
    stopTimer();
    timerRef.current = setInterval(() => {
      setCurrent((c) => (c + 1) % total);
    }, 5000);
  }, [stopTimer, total]);

  useEffect(() => {
    startTimer();
    return () => stopTimer();
  }, [startTimer, stopTimer]);

  function prev() {
    stopTimer();
    setCurrent((c) => (c - 1 + total) % total);
    startTimer();
  }

  function next() {
    stopTimer();
    setCurrent((c) => (c + 1) % total);
    startTimer();
  }

  function goTo(i: number) {
    stopTimer();
    setCurrent(i);
    startTimer();
  }

  const concurso = concursos[current];

  return (
    <section id="concursos" className="py-16 px-4 bg-white">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-10">
          <h2 className="text-3xl font-bold text-gray-900 mb-2">
            CONCURSOS 2026
          </h2>
          <p className="text-gray-500">
            Concursos públicos abertos e previstos para 2026
          </p>
        </div>

        {/* Carousel */}
        <div className="relative">
          {/* Card */}
          <div className="bg-white rounded-2xl border border-gray-200 shadow-md overflow-hidden">
            <div className="grid grid-cols-1 md:grid-cols-2">
              {/* Left — main info */}
              <div className="p-8 border-b md:border-b-0 md:border-r border-gray-100">
                {/* Status badge */}
                <span
                  className={`inline-block text-xs font-semibold px-3 py-1 rounded-full border mb-4 ${statusBadge(concurso.status)}`}
                  data-ocid="concursos.card"
                >
                  {concurso.status}
                </span>

                <h3 className="text-xl font-bold text-gray-900 mb-1 leading-tight">
                  {concurso.orgao}
                </h3>
                <div className="flex items-center gap-1.5 text-sm text-gray-500 mb-5">
                  <MapPin className="w-3.5 h-3.5 text-[#d7350d] shrink-0" />
                  <span>{concurso.regiao}</span>
                </div>

                <div className="grid grid-cols-2 gap-4 mb-6">
                  <div className="flex flex-col gap-0.5">
                    <span className="text-xs text-gray-400 uppercase tracking-wide">
                      Vagas
                    </span>
                    <span className="font-bold text-gray-900 flex items-center gap-1">
                      <Users className="w-3.5 h-3.5 text-[#d7350d]" />
                      {concurso.vagas}
                    </span>
                  </div>
                  <div className="flex flex-col gap-0.5">
                    <span className="text-xs text-gray-400 uppercase tracking-wide">
                      Salário
                    </span>
                    <span className="font-bold text-gray-900">
                      {concurso.salario}
                    </span>
                  </div>
                  <div className="flex flex-col gap-0.5">
                    <span className="text-xs text-gray-400 uppercase tracking-wide">
                      Escolaridade
                    </span>
                    <span className="text-sm text-gray-700 flex items-center gap-1">
                      <BookOpen className="w-3.5 h-3.5 text-[#d7350d] shrink-0" />
                      {concurso.escolaridade}
                    </span>
                  </div>
                  <div className="flex flex-col gap-0.5">
                    <span className="text-xs text-gray-400 uppercase tracking-wide">
                      Banca
                    </span>
                    <span className="text-sm text-gray-700 flex items-center gap-1">
                      <Building2 className="w-3.5 h-3.5 text-[#d7350d] shrink-0" />
                      {concurso.banca}
                    </span>
                  </div>
                </div>

                <a
                  href={concurso.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  data-ocid="concursos.primary_button"
                >
                  <Button className="bg-[#d7350d] hover:bg-[#c02e0c] text-white w-full gap-2">
                    Ver edital <ExternalLink className="w-4 h-4" />
                  </Button>
                </a>
              </div>

              {/* Right — timeline */}
              <div className="p-8 bg-gray-50">
                <h4 className="text-xs font-semibold uppercase tracking-widest text-gray-400 mb-5">
                  Cronograma
                </h4>
                <ol className="space-y-5">
                  <li className="flex gap-3">
                    <div className="flex flex-col items-center">
                      <div className="w-8 h-8 rounded-full bg-[#d7350d] text-white flex items-center justify-center shrink-0">
                        <CalendarDays className="w-4 h-4" />
                      </div>
                      <div className="flex-1 w-px bg-gray-200 mt-1" />
                    </div>
                    <div className="pb-5">
                      <p className="text-xs text-gray-400 mb-0.5">Inscrições</p>
                      <p className="text-sm font-semibold text-gray-900">
                        {concurso.inscricoes}
                      </p>
                    </div>
                  </li>
                  <li className="flex gap-3">
                    <div className="flex flex-col items-center">
                      <div className="w-8 h-8 rounded-full bg-gray-300 text-white flex items-center justify-center shrink-0">
                        <CalendarDays className="w-4 h-4" />
                      </div>
                    </div>
                    <div>
                      <p className="text-xs text-gray-400 mb-0.5">
                        Data da Prova
                      </p>
                      <p className="text-sm font-semibold text-gray-900">
                        {concurso.dataProva}
                      </p>
                    </div>
                  </li>
                </ol>

                {/* Counter */}
                <div className="mt-8 pt-5 border-t border-gray-200">
                  <p className="text-xs text-gray-400 text-center">
                    {current + 1} de {total} concursos
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Navigation arrows */}
          <button
            type="button"
            onClick={prev}
            className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 w-9 h-9 rounded-full bg-white border border-gray-200 shadow flex items-center justify-center hover:border-[#d7350d] hover:text-[#d7350d] transition-colors"
            aria-label="Anterior"
            data-ocid="concursos.pagination_prev"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          <button
            type="button"
            onClick={next}
            className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 w-9 h-9 rounded-full bg-white border border-gray-200 shadow flex items-center justify-center hover:border-[#d7350d] hover:text-[#d7350d] transition-colors"
            aria-label="Próximo"
            data-ocid="concursos.pagination_next"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>

        {/* Dots */}
        <div className="flex justify-center gap-2 mt-6">
          {concursos.map((c) => (
            <button
              key={c.id}
              type="button"
              onClick={() => goTo(concursos.indexOf(c))}
              aria-label={`Ir para concurso ${c.id}`}
              className={`w-2.5 h-2.5 rounded-full transition-all ${
                concursos.indexOf(c) === current
                  ? "bg-[#d7350d] scale-125"
                  : "bg-gray-300 hover:bg-gray-400"
              }`}
              data-ocid="concursos.toggle"
            />
          ))}
        </div>

        {/* Footnote */}
        <p className="text-center text-xs text-gray-400 mt-6">
          Dados atualizados em abril/2026. Verifique os editais oficiais nos
          sites dos órgãos.
        </p>
      </div>
    </section>
  );
}
