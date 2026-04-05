import {
  Carousel,
  type CarouselApi,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { CONTESTS, type Contest } from "@/data/mockData";
import {
  Briefcase,
  Calendar,
  DollarSign,
  ExternalLink,
  MapPin,
  Users,
} from "lucide-react";
import { useCallback, useEffect, useState } from "react";

// Stable dot identifiers based on CONTESTS
const DOT_IDS = CONTESTS.map((c) => c.id);

function ContestCard({ contest }: { contest: Contest }) {
  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 hover:shadow-md hover:-translate-y-0.5 transition-all duration-200 flex flex-col h-full">
      {/* Card header */}
      <div className="p-5 pb-3">
        <div className="flex items-start justify-between gap-2 mb-3">
          <div className="flex-1">
            {contest.badge && (
              <span
                className={`inline-block text-xs font-semibold px-2.5 py-0.5 rounded-full border mb-2 ${
                  contest.badge === "Novo"
                    ? "bg-green-100 text-green-700 border-green-200"
                    : "bg-red-100 text-red-700 border-red-200"
                }`}
              >
                {contest.badge}
              </span>
            )}
            <h3 className="font-bold text-sm text-gray-900 leading-snug line-clamp-2">
              {contest.title}
            </h3>
          </div>
        </div>
        <p className="text-sm text-[#d7350d] font-semibold line-clamp-1 mb-1">
          {contest.organ}
        </p>
        <div className="flex items-center gap-1 text-xs text-gray-500">
          <MapPin className="w-3.5 h-3.5 shrink-0" />
          <span>{contest.city}</span>
        </div>
      </div>

      {/* Stats grid */}
      <div className="px-5 pb-3">
        <div className="grid grid-cols-2 gap-2">
          <div className="bg-gray-50 rounded-lg p-2.5 flex items-center gap-2">
            <Briefcase className="w-4 h-4 text-gray-400 shrink-0" />
            <div>
              <p className="text-[10px] text-gray-500 leading-none mb-0.5">
                Nível
              </p>
              <p className="text-xs font-semibold text-gray-800">
                {contest.level}
              </p>
            </div>
          </div>
          <div className="bg-gray-50 rounded-lg p-2.5 flex items-center gap-2">
            <Users className="w-4 h-4 text-gray-400 shrink-0" />
            <div>
              <p className="text-[10px] text-gray-500 leading-none mb-0.5">
                Vagas
              </p>
              <p className="text-xs font-semibold text-gray-800">
                {contest.vacancies}
              </p>
            </div>
          </div>
          <div className="bg-gray-50 rounded-lg p-2.5 flex items-center gap-2">
            <DollarSign className="w-4 h-4 text-gray-400 shrink-0" />
            <div>
              <p className="text-[10px] text-gray-500 leading-none mb-0.5">
                Salário
              </p>
              <p className="text-xs font-semibold text-gray-800">
                {contest.salary}
              </p>
            </div>
          </div>
          <div className="bg-gray-50 rounded-lg p-2.5 flex items-center gap-2">
            <Calendar className="w-4 h-4 text-gray-400 shrink-0" />
            <div>
              <p className="text-[10px] text-gray-500 leading-none mb-0.5">
                Inscrições
              </p>
              <p className="text-[10px] font-semibold text-gray-800 leading-tight">
                {contest.inscriptionStart} a {contest.inscriptionEnd}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* CTA */}
      <div className="px-5 pb-5 mt-auto">
        <a
          href={contest.editalUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center justify-center gap-1.5 w-full py-2.5 rounded-lg bg-[#d7350d] text-white text-sm font-semibold hover:bg-[#c02e0c] transition-colors"
          data-ocid="concursos.primary_button"
        >
          Ver Edital <ExternalLink className="w-3.5 h-3.5" />
        </a>
      </div>
    </div>
  );
}

export default function Concursos() {
  const [api, setApi] = useState<CarouselApi>();
  const [current, setCurrent] = useState(0);
  const [snapCount, setSnapCount] = useState(0);

  const scrollNext = useCallback(() => {
    api?.scrollNext();
  }, [api]);

  useEffect(() => {
    if (!api) return;
    setSnapCount(api.scrollSnapList().length);
    setCurrent(api.selectedScrollSnap());
    api.on("select", () => {
      setCurrent(api.selectedScrollSnap());
    });
  }, [api]);

  // Autoplay every 5 seconds
  useEffect(() => {
    if (!api) return;
    const interval = setInterval(scrollNext, 5000);
    return () => clearInterval(interval);
  }, [api, scrollNext]);

  // Stable dot list derived from contest IDs (capped at snapCount)
  const visibleDots = DOT_IDS.slice(0, snapCount);

  return (
    <section id="concursos" className="py-16 px-4 bg-[#fafafa]">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-10">
          <div className="inline-flex items-center gap-2 mb-3">
            <span className="block w-8 h-0.5 bg-[#d7350d]" />
            <span className="text-xs font-bold text-[#d7350d] uppercase tracking-widest">
              Setor Público
            </span>
            <span className="block w-8 h-0.5 bg-[#d7350d]" />
          </div>
          <h2 className="text-3xl font-bold text-[#1a1a1a] uppercase mb-3 tracking-tight">
            Concursos
          </h2>
          <p className="text-gray-600 max-w-md mx-auto">
            Oportunidades no setor público para a sua região
          </p>
        </div>

        {/* Carousel */}
        <div className="relative">
          <Carousel
            setApi={setApi}
            className="w-full"
            opts={{ loop: true, align: "start" }}
          >
            <CarouselContent className="-ml-3">
              {CONTESTS.map((contest) => (
                <CarouselItem
                  key={contest.id}
                  className="pl-3 basis-full md:basis-1/2 lg:basis-1/3"
                  data-ocid={`concursos.item.${contest.id}`}
                >
                  <ContestCard contest={contest} />
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious
              className="hidden sm:flex -left-4 border-gray-300 text-gray-700 hover:bg-[#d7350d] hover:text-white hover:border-[#d7350d] transition-colors"
              data-ocid="concursos.pagination_prev"
            />
            <CarouselNext
              className="hidden sm:flex -right-4 border-gray-300 text-gray-700 hover:bg-[#d7350d] hover:text-white hover:border-[#d7350d] transition-colors"
              data-ocid="concursos.pagination_next"
            />
          </Carousel>

          {/* Dot indicators using stable contest IDs */}
          {visibleDots.length > 0 && (
            <div className="flex justify-center gap-1.5 mt-6">
              {visibleDots.map((dotId, position) => (
                <button
                  key={dotId}
                  type="button"
                  onClick={() => api?.scrollTo(position)}
                  className={`rounded-full transition-all duration-200 ${
                    position === current
                      ? "bg-[#d7350d] w-5 h-2"
                      : "bg-gray-300 w-2 h-2 hover:bg-gray-400"
                  }`}
                  aria-label={`Ir para concurso ${position + 1}`}
                  data-ocid="concursos.toggle"
                />
              ))}
            </div>
          )}
        </div>

        {/* Info strip */}
        <div className="mt-8 bg-red-50 border border-red-100 rounded-xl p-4 flex flex-col sm:flex-row items-center gap-3 text-center sm:text-left">
          <div className="text-2xl">📋</div>
          <div>
            <p className="text-sm font-semibold text-gray-800">
              Fique atento aos prazos de inscrição!
            </p>
            <p className="text-xs text-gray-500 mt-0.5">
              As datas são atualizadas semanalmente. Acesse o edital oficial
              para confirmar as informações.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
