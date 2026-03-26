import { Button } from "@/components/ui/button";
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
  Zap,
} from "lucide-react";
import { useEffect, useState } from "react";

const badgeStyles: Record<string, string> = {
  Nova: "bg-green-100 text-green-700 border-green-200",
  Urgente: "bg-red-100 text-red-700 border-red-200",
  PCD: "bg-purple-100 text-purple-700 border-purple-200",
  "Jovem Aprendiz": "bg-blue-100 text-blue-700 border-blue-200",
};

const areaColors: Record<string, string> = {
  RH: "from-orange-400 to-red-500",
  Produção: "from-blue-400 to-indigo-500",
  Engenharia: "from-teal-400 to-cyan-500",
  Administrativo: "from-gray-400 to-slate-500",
  Logística: "from-yellow-400 to-amber-500",
  TI: "from-violet-400 to-purple-500",
  Manutenção: "from-orange-400 to-orange-600",
  Contabilidade: "from-green-400 to-emerald-500",
  Saúde: "from-pink-400 to-rose-500",
};

function JobCard({ job }: { job: Job }) {
  const gradient = areaColors[job.area] || "from-gray-400 to-gray-600";
  return (
    <div className="bg-card rounded-xl overflow-hidden shadow-card card-hover border border-border">
      <div
        className={`h-20 bg-gradient-to-br ${gradient} flex items-center justify-center`}
      >
        <Briefcase className="w-8 h-8 text-white/80" />
      </div>
      <div className="p-4">
        {job.badge && (
          <span
            className={`inline-block text-xs font-semibold px-2 py-0.5 rounded-full border mb-2 ${badgeStyles[job.badge]}`}
          >
            {job.badge}
          </span>
        )}
        <h3 className="font-semibold text-base text-foreground mb-1 line-clamp-2">
          {job.title}
        </h3>
        <p className="text-sm text-muted-foreground mb-3 line-clamp-1">
          {job.company}
        </p>
        <div className="space-y-1.5 text-xs text-muted-foreground">
          <div className="flex items-center gap-1.5">
            <MapPin className="w-3.5 h-3.5 shrink-0" />
            <span>{job.city}</span>
          </div>
          <div className="flex items-center gap-1.5">
            <DollarSign className="w-3.5 h-3.5 shrink-0" />
            <span>{job.salary}</span>
          </div>
          <div className="flex items-center gap-1.5">
            <Clock className="w-3.5 h-3.5 shrink-0" />
            <span>Prazo: {job.deadline}</span>
          </div>
          <div className="flex items-center gap-1.5">
            <Globe className="w-3.5 h-3.5 shrink-0" />
            <span>Fonte: {job.source}</span>
          </div>
        </div>
        <Button
          size="sm"
          className="w-full mt-4 bg-primary/10 text-primary hover:bg-primary hover:text-white transition-colors border border-primary/20"
          asChild
        >
          <a
            href={job.applyUrl}
            target="_blank"
            rel="noopener noreferrer"
            data-ocid="vagas.primary_button"
          >
            Ver Detalhes <ExternalLink className="w-3.5 h-3.5 ml-1" />
          </a>
        </Button>
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
  const [visibleCount, setVisibleCount] = useState(6);

  // CV upload matching state
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
        // fallback to mockData already set as default state
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
      inferredKeywords.push(
        "ti",
        "programação",
        "javascript",
        "desenvolvimento",
      );
    if (/saude|saúde|enferma|medic/i.test(name))
      inferredKeywords.push("saúde", "enfermagem", "hospital");
    if (/contab|fiscal|financ/i.test(name))
      inferredKeywords.push("contabilidade", "financeiro");
    if (/log|estoque|armaz/i.test(name))
      inferredKeywords.push("logística", "estoque");
    if (/rh|recursos|human/i.test(name))
      inferredKeywords.push("rh", "recrutamento", "gestão de pessoas");

    if (inferredKeywords.length === 0) {
      inferredKeywords.push(
        "comunicação",
        "organização",
        "administrativo",
        "produção",
      );
    }

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
      j.badge === selectedType;
    const keywordMatch =
      !initialKeyword ||
      j.title.toLowerCase().includes(initialKeyword.toLowerCase()) ||
      j.company.toLowerCase().includes(initialKeyword.toLowerCase());
    return cityMatch && typeMatch && keywordMatch;
  });

  const visible = filtered.slice(0, visibleCount);

  // suppress unused warning
  void cvFile;

  return (
    <section id="vagas" className="py-16 px-4 bg-background">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-6">
          <h2 className="text-3xl font-bold text-foreground mb-2">
            Vagas da Semana
          </h2>
          <p className="text-muted-foreground">
            Oportunidades selecionadas para a região Sul Fluminense
          </p>
        </div>

        <div className="flex flex-wrap gap-2 mb-4 justify-center">
          {CITIES.map((city) => (
            <button
              type="button"
              key={city}
              onClick={() => setSelectedCity(city)}
              className={`px-4 py-1.5 rounded-full text-sm font-medium transition-colors border ${
                selectedCity === city
                  ? "bg-primary text-white border-primary"
                  : "bg-card text-muted-foreground border-border hover:border-primary hover:text-primary"
              }`}
              data-ocid="vagas.tab"
            >
              {city}
            </button>
          ))}
        </div>

        <div className="flex flex-wrap gap-2 mb-8 justify-center">
          {JOB_TYPES.map((type) => (
            <button
              type="button"
              key={type}
              onClick={() => setSelectedType(type)}
              className={`px-3 py-1 rounded-full text-xs font-medium transition-colors border ${
                selectedType === type
                  ? "bg-foreground text-background border-foreground"
                  : "bg-card text-muted-foreground border-border hover:border-foreground"
              }`}
              data-ocid="vagas.tab"
            >
              {type}
            </button>
          ))}
        </div>

        {/* CV Upload Section */}
        <div
          className="mb-8 rounded-2xl border-2 border-dashed border-border bg-card overflow-hidden transition-colors"
          style={{
            borderColor: isDragging ? "hsl(var(--primary))" : undefined,
          }}
          onDragOver={(e) => {
            e.preventDefault();
            setIsDragging(true);
          }}
          onDragLeave={() => setIsDragging(false)}
          onDrop={(e) => {
            e.preventDefault();
            setIsDragging(false);
            const file = e.dataTransfer.files?.[0];
            if (file) {
              setCvFile(file);
              setCvFileName(file.name);
              setCvMatches(null);
            }
          }}
          data-ocid="vagas.dropzone"
        >
          <div className="p-6 text-center">
            <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-3">
              <Upload className="w-6 h-6 text-primary" />
            </div>
            <p className="text-sm font-medium text-foreground mb-1">
              Faça o upload ou arraste e solte seu currículo aqui para receber
              recomendações de vagas com base em suas habilidades e experiência.
            </p>
            {cvFileName ? (
              <p className="text-xs text-primary font-semibold mt-2 mb-3">
                {cvFileName} ✓
              </p>
            ) : (
              <p className="text-xs text-muted-foreground mt-1 mb-3">
                PDF, DOCX ou TXT — máx. 5MB
              </p>
            )}
            <div className="flex items-center justify-center gap-3 flex-wrap">
              <label
                htmlFor="cv-upload-vagas"
                className="cursor-pointer inline-flex items-center gap-2 px-4 py-2 rounded-lg border border-primary/30 text-primary text-sm font-medium hover:bg-primary/5 transition-colors"
              >
                <Upload className="w-4 h-4" />
                {cvFileName ? "Trocar arquivo" : "Selecionar arquivo"}
                <input
                  id="cv-upload-vagas"
                  type="file"
                  accept=".pdf,.docx,.txt"
                  className="hidden"
                  onChange={(e) => {
                    const file = e.target.files?.[0];
                    if (file) {
                      setCvFile(file);
                      setCvFileName(file.name);
                      setCvMatches(null);
                    }
                  }}
                  data-ocid="vagas.upload_button"
                />
              </label>
              <button
                type="button"
                disabled={!cvFileName || cvLoading}
                onClick={async () => {
                  if (!cvFileName) return;
                  setCvLoading(true);
                  await new Promise((r) => setTimeout(r, 1600));
                  const matches = simulateCVMatch(cvFileName);
                  setCvMatches(matches);
                  setCvLoading(false);
                  setTimeout(
                    () =>
                      document
                        .getElementById("cv-matches")
                        ?.scrollIntoView({ behavior: "smooth" }),
                    100,
                  );
                }}
                className="inline-flex items-center gap-2 px-5 py-2 rounded-lg bg-primary text-white text-sm font-semibold hover:bg-primary/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                data-ocid="vagas.submit_button"
              >
                {cvLoading ? (
                  <>
                    <span className="animate-spin border-2 border-white border-t-transparent rounded-full w-4 h-4 inline-block" />{" "}
                    Analisando...
                  </>
                ) : (
                  <>
                    <Zap className="w-4 h-4" /> Enviar Currículo
                  </>
                )}
              </button>
            </div>
          </div>

          {cvMatches !== null && (
            <div
              id="cv-matches"
              className="border-t border-border p-6 bg-background"
            >
              <h3 className="font-bold text-base mb-4 text-foreground">
                {cvMatches.length > 0
                  ? `${cvMatches.length} vaga${cvMatches.length !== 1 ? "s" : ""} recomendada${cvMatches.length !== 1 ? "s" : ""} para o seu perfil`
                  : "Nenhuma vaga compatível encontrada com os filtros atuais"}
              </h3>

              {cvMatches.length >= 3 && (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
                  {cvMatches.map((job, i) => (
                    <div key={job.id} data-ocid={`vagas.cv_match.${i + 1}`}>
                      <JobCard job={job} />
                    </div>
                  ))}
                </div>
              )}

              {cvMatches.length < 3 && cvMatches.length > 0 && (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
                  {cvMatches.map((job, i) => (
                    <div key={job.id} data-ocid={`vagas.cv_match.${i + 1}`}>
                      <JobCard job={job} />
                    </div>
                  ))}
                </div>
              )}

              {cvMatches.length < 3 && (
                <div className="bg-gradient-to-r from-gray-900 to-red-600 rounded-xl p-6 text-white text-center">
                  <div className="text-2xl mb-2">🎯</div>
                  <h4 className="font-bold text-lg mb-2">
                    Poucas vagas compatíveis? Vamos mudar isso!
                  </h4>
                  <p className="text-white/80 text-sm mb-4 max-w-md mx-auto">
                    Nosso serviço de mentoria avalia seu currículo em detalhes e
                    te orienta para aumentar drasticamente suas chances no
                    mercado.
                  </p>
                  <a
                    href="#mentoria"
                    className="inline-flex items-center gap-2 bg-white text-red-600 font-semibold px-6 py-2.5 rounded-lg hover:bg-white/90 transition-colors text-sm"
                    data-ocid="vagas.primary_button"
                  >
                    Quero Mentoria de Currículo{" "}
                    <ArrowRight className="w-4 h-4" />
                  </a>
                </div>
              )}
            </div>
          )}
        </div>

        {visible.length === 0 ? (
          <div
            className="text-center py-16 text-muted-foreground"
            data-ocid="vagas.empty_state"
          >
            <Briefcase className="w-12 h-12 mx-auto mb-3 opacity-30" />
            <p>Nenhuma vaga encontrada com esses filtros.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {visible.map((job, i) => (
              <div key={job.id} data-ocid={`vagas.item.${i + 1}`}>
                <JobCard job={job} />
              </div>
            ))}
          </div>
        )}

        {visibleCount < filtered.length && (
          <div className="text-center mt-8">
            <Button
              type="button"
              variant="outline"
              className="px-8 border-primary text-primary hover:bg-primary hover:text-white"
              onClick={() => setVisibleCount((v) => v + 3)}
              data-ocid="vagas.secondary_button"
            >
              Carregar mais vagas ({filtered.length - visibleCount} restantes)
            </Button>
          </div>
        )}
      </div>
    </section>
  );
}
