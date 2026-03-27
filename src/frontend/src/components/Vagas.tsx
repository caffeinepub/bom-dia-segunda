import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { CITIES, JOBS, JOB_TYPES, type Job } from "@/data/mockData";
import { useActor } from "@/hooks/useActor";
import {
  ArrowRight,
  Briefcase,
  Clock,
  DollarSign,
  ExternalLink,
  Globe,
  MapPin,
  Upload,
} from "lucide-react";
import { useEffect, useState } from "react";

const badgeStyles: Record<string, string> = {
  Nova: "bg-green-100 text-green-700 border-green-200",
  Urgente: "bg-red-100 text-red-700 border-red-200",
  PCD: "bg-blue-100 text-blue-700 border-blue-200",
  "Jovem Aprendiz": "bg-purple-100 text-purple-700 border-purple-200",
  Estágio: "bg-yellow-100 text-yellow-700 border-yellow-200",
  Remoto: "bg-gray-100 text-gray-700 border-gray-200",
};

function JobCard({ job }: { job: Job }) {
  const badge = Array.isArray(job.badge) ? job.badge[0] : job.badge;
  const badges = Array.isArray(job.badge)
    ? job.badge
    : job.badge
      ? [job.badge]
      : [];

  return (
    <div className="bg-white rounded-xl overflow-hidden shadow-sm border border-gray-200 hover:shadow-lg hover:-translate-y-1 transition-all duration-200 flex flex-col">
      <div className="p-5 flex-1">
        {badge && (
          <span
            className={`inline-block text-xs font-semibold px-2.5 py-0.5 rounded-full border mb-3 ${badgeStyles[badge] ?? "bg-gray-100 text-gray-700 border-gray-200"}`}
          >
            {badge}
          </span>
        )}
        <h3 className="font-bold text-base text-gray-900 mb-0.5 line-clamp-2 leading-tight">
          {job.title}
        </h3>
        <p className="text-sm text-[#d7350d] font-medium mb-3 line-clamp-1">
          {job.company}
        </p>
        <div className="space-y-1.5 text-xs text-gray-500">
          <div className="flex items-center gap-1.5">
            <MapPin className="w-3.5 h-3.5 text-gray-400 shrink-0" />
            <span>{job.city}</span>
          </div>
          <div className="flex items-center gap-1.5">
            <DollarSign className="w-3.5 h-3.5 text-gray-400 shrink-0" />
            <span>{job.salary || "A combinar"}</span>
          </div>
          <div className="flex items-center gap-1.5">
            <Clock className="w-3.5 h-3.5 text-gray-400 shrink-0" />
            <span>Prazo: {job.deadline}</span>
          </div>
          <div className="flex items-center gap-1.5">
            <Globe className="w-3.5 h-3.5 text-gray-400 shrink-0" />
            <span>Fonte: {job.source}</span>
          </div>
        </div>
      </div>

      {/* Action buttons */}
      <div className="px-5 pb-5 flex gap-2">
        {/* Detalhes button + Dialog */}
        <Dialog>
          <DialogTrigger asChild>
            <Button
              variant="outline"
              className="flex-1 border-gray-300 text-gray-700 hover:border-[#d7350d] hover:text-[#d7350d] text-sm"
              data-ocid="vagas.secondary_button"
            >
              Detalhes
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-md">
            <DialogHeader>
              <DialogTitle className="text-lg font-bold text-gray-900 leading-tight">
                {job.title}
              </DialogTitle>
            </DialogHeader>
            <div className="mt-1">
              <p className="text-[#d7350d] font-semibold text-sm mb-3">
                {job.company}
              </p>

              {/* Badges */}
              {badges.length > 0 && (
                <div className="flex flex-wrap gap-1.5 mb-4">
                  {badges.map((b) => (
                    <span
                      key={b}
                      className={`text-xs font-semibold px-2.5 py-0.5 rounded-full border ${badgeStyles[b] ?? "bg-gray-100 text-gray-700 border-gray-200"}`}
                    >
                      {b}
                    </span>
                  ))}
                </div>
              )}

              {/* Info rows */}
              <div className="space-y-3 text-sm text-gray-600">
                <div className="flex items-center gap-2">
                  <MapPin className="w-4 h-4 text-[#d7350d] shrink-0" />
                  <span>
                    <span className="font-medium">Localidade:</span> {job.city}
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <DollarSign className="w-4 h-4 text-[#d7350d] shrink-0" />
                  <span>
                    <span className="font-medium">Salário:</span>{" "}
                    {job.salary || "A combinar"}
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="w-4 h-4 text-[#d7350d] shrink-0" />
                  <span>
                    <span className="font-medium">Prazo:</span> {job.deadline}
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <Globe className="w-4 h-4 text-[#d7350d] shrink-0" />
                  <span>
                    <span className="font-medium">Fonte:</span> {job.source}
                  </span>
                </div>
                {(job.type || job.area) && (
                  <div className="flex items-center gap-2">
                    <Briefcase className="w-4 h-4 text-[#d7350d] shrink-0" />
                    <span>
                      <span className="font-medium">Tipo:</span>{" "}
                      {[job.type, job.area].filter(Boolean).join(" · ")}
                    </span>
                  </div>
                )}
              </div>

              {/* Apply button inside dialog */}
              <a
                href={job.applyUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-5 flex items-center justify-center gap-2 w-full py-2.5 rounded-lg bg-[#d7350d] text-white text-sm font-semibold hover:bg-[#c02e0c] transition-colors"
                data-ocid="vagas.primary_button"
              >
                Candidatar-se <ExternalLink className="w-4 h-4" />
              </a>
            </div>
          </DialogContent>
        </Dialog>

        {/* Candidatar-se button */}
        <a
          href={job.applyUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="flex-1 flex items-center justify-center gap-1.5 py-2 rounded-md bg-[#d7350d] text-white text-sm font-semibold hover:bg-[#c02e0c] transition-colors"
          data-ocid="vagas.primary_button"
        >
          Candidatar-se <ExternalLink className="w-3.5 h-3.5" />
        </a>
      </div>
    </div>
  );
}

interface VagasProps {
  initialKeyword?: string;
  initialCity?: string;
}

export default function Vagas({
  initialKeyword = "",
  initialCity = "Todas",
}: VagasProps) {
  const { actor } = useActor();
  const [jobs, setJobs] = useState<Job[]>(JOBS);
  const [selectedCity, setSelectedCity] = useState(initialCity);
  const [selectedType, setSelectedType] = useState("Todos");
  const [visibleCount, setVisibleCount] = useState(9);

  const [cvFile, setCvFile] = useState<File | null>(null);
  const [cvFileName, setCvFileName] = useState("");
  const [cvLoading, setCvLoading] = useState(false);
  const [cvMatches, setCvMatches] = useState<Job[] | null>(null);
  const [isDragging, setIsDragging] = useState(false);

  useEffect(() => {
    if (!actor) return;
    async function loadVagas() {
      try {
        await actor!.deleteExpiredVagas();
        const listings = await actor!.getVagas();
        if (listings && listings.length > 0) {
          const mapped: Job[] = listings.map((j) => ({
            id: j.id,
            title: j.title,
            company: j.company,
            city: j.city,
            salary: j.salary,
            type: j.jobType as Job["type"],
            area: j.area,
            source: j.source,
            applyUrl: j.applyUrl,
            badge: (j.badge as Job["badge"]) ?? undefined,
            deadline: new Date(
              Number(j.postedAt) + 10 * 24 * 60 * 60 * 1000,
            ).toLocaleDateString("pt-BR"),
          }));
          setJobs(mapped);
        }
      } catch (_err) {
        // fallback to mockData
      }
    }
    loadVagas();
  }, [actor]);

  function simulateCVMatch(fileName: string): Job[] {
    const name = fileName.toLowerCase();
    const inferredKeywords: string[] = [];
    if (/engenharia|engineer|eng\b/i.test(name))
      inferredKeywords.push("engenharia", "técnico", "superior");
    if (/admin|secretar|aux/i.test(name))
      inferredKeywords.push("administrativo", "organização");
    if (/ti|tech|dev|programad|software/i.test(name))
      inferredKeywords.push("ti", "programação", "javascript");
    if (/saude|saúde|enferma|medic/i.test(name))
      inferredKeywords.push("saúde", "enfermagem");
    if (/contab|fiscal|financ/i.test(name))
      inferredKeywords.push("contabilidade", "financeiro");
    if (/log|estoque|armaz/i.test(name))
      inferredKeywords.push("logística", "estoque");
    if (/rh|recursos|human/i.test(name))
      inferredKeywords.push("rh", "recrutamento");
    if (inferredKeywords.length === 0)
      inferredKeywords.push("comunicação", "organização", "administrativo");
    const scored = jobs.map((job) => {
      const jobSkills = job.skills || [];
      const matches = jobSkills.filter((s) =>
        inferredKeywords.some((k) => s.includes(k) || k.includes(s)),
      );
      return { job, score: matches.length };
    });
    return scored
      .filter((s) => s.score > 0)
      .sort((a, b) => b.score - a.score)
      .map((s) => s.job)
      .slice(0, 6);
  }

  const filtered = jobs.filter((j) => {
    const cityMatch = selectedCity === "Todas" || j.city === selectedCity;
    const typeMatch =
      selectedType === "Todos" ||
      j.type === selectedType ||
      (Array.isArray(j.badge) ? j.badge[0] : j.badge) === selectedType;
    const keywordMatch =
      !initialKeyword ||
      j.title.toLowerCase().includes(initialKeyword.toLowerCase()) ||
      j.company.toLowerCase().includes(initialKeyword.toLowerCase());
    return cityMatch && typeMatch && keywordMatch;
  });

  const visible = filtered.slice(0, visibleCount);
  void cvFile;

  return (
    <section id="vagas" className="py-16 px-4 bg-[#fafafa]">
      <div className="max-w-6xl mx-auto">
        {/* Section header */}
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-[#1a1a1a] mb-2">
            Vagas da Semana
          </h2>
          <p className="text-gray-600">
            Oportunidades selecionadas para a região Sul Fluminense
          </p>
        </div>

        {/* City filter pills */}
        <div className="flex flex-wrap gap-2 mb-4 justify-center">
          {CITIES.map((city) => (
            <button
              type="button"
              key={city}
              onClick={() => setSelectedCity(city)}
              className={`px-4 py-1.5 rounded-full text-sm font-medium transition-colors border ${
                selectedCity === city
                  ? "bg-[#d7350d] text-white border-[#d7350d]"
                  : "bg-white text-gray-600 border-gray-300 hover:border-[#d7350d] hover:text-[#d7350d]"
              }`}
              data-ocid="vagas.filter.tab"
            >
              {city}
            </button>
          ))}
        </div>

        {/* Type filter pills */}
        <div className="flex flex-wrap gap-2 mb-8 justify-center">
          {["Todos", ...JOB_TYPES].map((type) => (
            <button
              type="button"
              key={type}
              onClick={() => setSelectedType(type)}
              className={`px-3 py-1 rounded-full text-xs font-medium transition-colors border ${
                selectedType === type
                  ? "bg-gray-900 text-white border-gray-900"
                  : "bg-white text-gray-500 border-gray-200 hover:border-gray-400"
              }`}
              data-ocid="vagas.filter.tab"
            >
              {type}
            </button>
          ))}
        </div>

        {/* CV Upload */}
        <div
          className={`rounded-xl border-2 border-dashed p-6 mb-8 text-center transition-colors ${
            isDragging
              ? "border-[#d7350d] bg-red-50"
              : "border-gray-300 bg-white"
          }`}
          onDragOver={(e) => {
            e.preventDefault();
            setIsDragging(true);
          }}
          onDragLeave={() => setIsDragging(false)}
          onDrop={(e) => {
            e.preventDefault();
            setIsDragging(false);
            const file = e.dataTransfer.files[0];
            if (file) {
              setCvFile(file);
              setCvFileName(file.name);
            }
          }}
        >
          <Upload className="w-8 h-8 text-gray-400 mx-auto mb-2" />
          <p className="text-sm text-gray-600 mb-1 font-medium">
            Envie seu currículo para receber vagas compatíveis com seu perfil
          </p>
          <p className="text-xs text-gray-400 mb-4">
            Arraste e solte aqui ou clique para selecionar (PDF, DOC, DOCX)
          </p>

          {cvFileName && (
            <p className="text-xs text-[#d7350d] mb-3 font-medium">
              📎 {cvFileName}
            </p>
          )}
          <div className="flex gap-2 justify-center">
            <label className="cursor-pointer px-4 py-2 rounded-lg border border-gray-300 text-sm text-gray-600 hover:border-[#d7350d] hover:text-[#d7350d] transition-colors">
              Selecionar arquivo
              <input
                type="file"
                accept=".pdf,.doc,.docx"
                className="hidden"
                onChange={(e) => {
                  const file = e.target.files?.[0];
                  if (file) {
                    setCvFile(file);
                    setCvFileName(file.name);
                  }
                }}
              />
            </label>
            <Button
              className="bg-[#d7350d] text-white hover:bg-[#c02e0c]"
              disabled={!cvFileName || cvLoading}
              onClick={() => {
                if (!cvFileName) return;
                setCvLoading(true);
                setTimeout(() => {
                  const matches = simulateCVMatch(cvFileName);
                  setCvMatches(matches);
                  setCvLoading(false);
                }, 1200);
              }}
              data-ocid="vagas.upload_button"
            >
              {cvLoading ? "Analisando..." : "Enviar Currículo"}
            </Button>
          </div>
        </div>

        {/* CV Match results */}
        {cvMatches !== null && (
          <div className="mb-8">
            {cvMatches.length >= 3 ? (
              <div>
                <h3 className="font-bold text-gray-900 mb-4 text-center">
                  🎯 Vagas compatíveis com seu perfil ({cvMatches.length})
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-4">
                  {cvMatches.map((job) => (
                    <JobCard key={job.id} job={job} />
                  ))}
                </div>
              </div>
            ) : (
              <div className="bg-orange-50 border border-orange-200 rounded-xl p-6 text-center">
                <p className="text-orange-800 font-semibold mb-2">
                  Encontramos poucas vagas para o seu perfil
                </p>
                <p className="text-orange-600 text-sm mb-4">
                  Nossa mentoria pode ajudá-lo a se destacar no mercado de
                  trabalho!
                </p>
                <a
                  href="#mentoria"
                  className="inline-flex items-center gap-2 px-5 py-2.5 bg-[#d7350d] text-white rounded-lg text-sm font-semibold hover:bg-[#c02e0c] transition-colors"
                >
                  Conhecer Mentoria <ArrowRight className="w-4 h-4" />
                </a>
              </div>
            )}
          </div>
        )}

        {/* Jobs grid */}
        {visible.length === 0 ? (
          <div
            className="text-center py-16 text-gray-400"
            data-ocid="vagas.empty_state"
          >
            <Briefcase className="w-12 h-12 mx-auto mb-3 opacity-30" />
            <p>Nenhuma vaga encontrada para os filtros selecionados.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {visible.map((job) => (
              <JobCard key={job.id} job={job} />
            ))}
          </div>
        )}

        {/* Load more */}
        {filtered.length > visibleCount && (
          <div className="text-center mt-8">
            <Button
              variant="outline"
              className="border-[#d7350d] text-[#d7350d] hover:bg-[#d7350d] hover:text-white px-8"
              onClick={() => setVisibleCount((c) => c + 9)}
              data-ocid="vagas.pagination_next"
            >
              Carregar mais vagas ({filtered.length - visibleCount} restantes)
            </Button>
          </div>
        )}
      </div>
    </section>
  );
}
