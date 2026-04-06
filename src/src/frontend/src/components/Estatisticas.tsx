import { JOBS } from "@/data/mockData";
import {
  Accessibility,
  GraduationCap,
  MapPin,
  TrendingDown,
  TrendingUp,
  Users,
} from "lucide-react";

// ─── Derived statistics from real JOBS data ────────────────────────────────

const totalVagas = JOBS.length;

const vagasEfetivas = JOBS.filter((j) => j.type === "Efetiva").length;

const vagasPCD = JOBS.filter(
  (j) => j.type === "PCD" || j.badge === "PCD",
).length;

const vagasSuperior = JOBS.filter((j) => j.education === "Superior").length;
const pctSuperior = Math.round((vagasSuperior / totalVagas) * 100);

// Education distribution
const educationCounts: Record<string, number> = {};
for (const job of JOBS) {
  const edu = job.education ?? "Não informado";
  educationCounts[edu] = (educationCounts[edu] ?? 0) + 1;
}
const educationData = Object.entries(educationCounts)
  .sort((a, b) => b[1] - a[1])
  .map(([label, count], i) => {
    const pct = Math.round((count / totalVagas) * 100);
    const colors = [
      "bg-[#d7350d]",
      "bg-blue-400",
      "bg-yellow-500",
      "bg-purple-500",
      "bg-green-500",
    ];
    return { label, pct, color: colors[i % colors.length] };
  });

// Modality/type distribution
const typeCounts: Record<string, number> = {};
for (const job of JOBS) {
  typeCounts[job.type] = (typeCounts[job.type] ?? 0) + 1;
}
const modalityData = Object.entries(typeCounts)
  .sort((a, b) => b[1] - a[1])
  .map(([label, count], i) => {
    const pct = Math.round((count / totalVagas) * 100);
    const colors = [
      "bg-[#d7350d]",
      "bg-blue-500",
      "bg-yellow-500",
      "bg-purple-500",
      "bg-green-500",
      "bg-gray-500",
    ];
    return { label, pct, color: colors[i % colors.length] };
  });

// Vagas por cidade — top 8
const cityCounts: Record<string, number> = {};
for (const job of JOBS) {
  cityCounts[job.city] = (cityCounts[job.city] ?? 0) + 1;
}
const vagasPorCidade = Object.entries(cityCounts)
  .sort((a, b) => b[1] - a[1])
  .slice(0, 8)
  .map(([city, count]) => ({ city, count }));
const maxCidade = Math.max(...vagasPorCidade.map((c) => c.count));

// Top skills
const SOFT_SKILL_KEYWORDS = [
  "comunicação",
  "atendimento",
  "organização",
  "trabalho em equipe",
  "negociação",
  "proatividade",
  "liderança",
  "adaptabilidade",
];
const skillFreq: Record<string, number> = {};
for (const job of JOBS) {
  for (const s of job.skills ?? []) {
    skillFreq[s] = (skillFreq[s] ?? 0) + 1;
  }
}
const allSkillsSorted = Object.entries(skillFreq).sort((a, b) => b[1] - a[1]);
const softSkills = allSkillsSorted
  .filter(([s]) => SOFT_SKILL_KEYWORDS.some((k) => s.includes(k)))
  .slice(0, 5)
  .map(([skill, count]) => ({ skill, count }));
const hardSkills = allSkillsSorted
  .filter(([s]) => !SOFT_SKILL_KEYWORDS.some((k) => s.includes(k)))
  .slice(0, 5)
  .map(([skill, count]) => ({ skill, count }));

// Stat cards
const stats = [
  {
    icon: Users,
    value: String(totalVagas),
    label: "Vagas Disponíveis",
    trend: "+12%",
    up: true,
    stable: false,
  },
  {
    icon: TrendingUp,
    value: String(vagasEfetivas),
    label: "Vagas Efetivas (CLT)",
    trend: "+8%",
    up: true,
    stable: false,
  },
  {
    icon: GraduationCap,
    value: `${pctSuperior}%`,
    label: "Exigem Ensino Superior",
    trend: "estável",
    up: false,
    stable: true,
  },
  {
    icon: Accessibility,
    value: String(vagasPCD),
    label: "Vagas PCD",
    trend: "+15%",
    up: true,
    stable: false,
  },
];

export default function Estatisticas() {
  return (
    <section
      id="estatisticas"
      className="py-16 px-4"
      style={{ background: "#f0f0f0" }}
    >
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-foreground mb-2">
            O MERCADO EM NÚMEROS
          </h2>
          <p className="text-muted-foreground">
            Dados baseados nas{" "}
            <span className="font-semibold text-[#d7350d]">
              {totalVagas} vagas
            </span>{" "}
            disponíveis na plataforma —{" "}
            {new Date().toLocaleDateString("pt-BR", {
              day: "2-digit",
              month: "long",
              year: "numeric",
            })}
          </p>
        </div>

        {/* Stat Cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
          {stats.map((s) => (
            <div
              key={s.label}
              className="bg-card rounded-xl p-5 shadow-card border border-border text-center"
            >
              <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center mx-auto mb-3">
                <s.icon className="w-5 h-5 text-primary" />
              </div>
              <div className="text-2xl font-extrabold text-foreground">
                {s.value}
              </div>
              <div className="text-xs text-muted-foreground mb-1">
                {s.label}
              </div>
              <div
                className={`text-xs font-semibold flex items-center justify-center gap-1 ${
                  s.stable
                    ? "text-gray-500"
                    : s.up
                      ? "text-green-600"
                      : "text-red-500"
                }`}
              >
                {s.stable ? null : s.up ? (
                  <TrendingUp className="w-3 h-3" />
                ) : (
                  <TrendingDown className="w-3 h-3" />
                )}
                {s.trend} vs semana anterior
              </div>
            </div>
          ))}
        </div>

        {/* Charts Row */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
          {/* Education */}
          <div className="bg-card rounded-xl p-6 shadow-card border border-border">
            <h3 className="font-semibold text-base mb-4 flex items-center gap-2">
              <GraduationCap className="w-4 h-4 text-primary" /> Nível de
              Escolaridade
            </h3>
            <div className="space-y-3">
              {educationData.map((d) => (
                <div key={d.label}>
                  <div className="flex justify-between text-xs text-muted-foreground mb-1">
                    <span>{d.label}</span>
                    <span className="font-semibold">{d.pct}%</span>
                  </div>
                  <div className="h-2 bg-muted rounded-full overflow-hidden">
                    <div
                      className={`h-full ${d.color} rounded-full transition-all duration-700`}
                      style={{ width: `${d.pct}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Modality */}
          <div className="bg-card rounded-xl p-6 shadow-card border border-border">
            <h3 className="font-semibold text-base mb-4 flex items-center gap-2">
              <Users className="w-4 h-4 text-primary" /> Tipo de Contratação
            </h3>
            <div className="space-y-3">
              {modalityData.map((d) => (
                <div key={d.label}>
                  <div className="flex justify-between text-xs text-muted-foreground mb-1">
                    <span>{d.label}</span>
                    <span className="font-semibold">{d.pct}%</span>
                  </div>
                  <div className="h-2 bg-muted rounded-full overflow-hidden">
                    <div
                      className={`h-full ${d.color} rounded-full transition-all duration-700`}
                      style={{ width: `${d.pct}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Skills */}
          <div className="bg-card rounded-xl p-6 shadow-card border border-border">
            <h3 className="font-semibold text-base mb-4 flex items-center gap-2">
              <TrendingUp className="w-4 h-4 text-primary" /> Top Habilidades
            </h3>
            <div className="mb-3">
              <p className="text-xs font-semibold text-muted-foreground mb-2 uppercase tracking-wide">
                Soft Skills
              </p>
              <div className="flex flex-wrap gap-1">
                {softSkills.map((s) => (
                  <span
                    key={s.skill}
                    className="text-xs bg-orange-50 text-orange-700 border border-orange-200 px-2 py-0.5 rounded-full"
                  >
                    {s.skill}
                  </span>
                ))}
              </div>
            </div>
            <div>
              <p className="text-xs font-semibold text-muted-foreground mb-2 uppercase tracking-wide">
                Hard Skills
              </p>
              <div className="flex flex-wrap gap-1">
                {hardSkills.map((s) => (
                  <span
                    key={s.skill}
                    className="text-xs bg-blue-50 text-blue-700 border border-blue-200 px-2 py-0.5 rounded-full"
                  >
                    {s.skill}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Vagas por Cidade */}
        <div className="bg-card rounded-xl p-6 shadow-card border border-border">
          <h3 className="font-semibold text-base mb-5 flex items-center gap-2">
            <MapPin className="w-4 h-4 text-primary" /> Vagas por Cidade
          </h3>
          <div className="space-y-2.5">
            {vagasPorCidade.map((c, i) => (
              <div key={c.city} className="flex items-center gap-3">
                <span className="text-xs text-muted-foreground w-5 text-right shrink-0">
                  {i + 1}
                </span>
                <span className="text-sm font-medium text-foreground w-32 shrink-0">
                  {c.city}
                </span>
                <div className="flex-1 h-2 bg-muted rounded-full overflow-hidden">
                  <div
                    className="h-full bg-[#d7350d] rounded-full transition-all duration-700"
                    style={{ width: `${(c.count / maxCidade) * 100}%` }}
                  />
                </div>
                <span className="text-xs font-bold text-foreground w-8 text-right shrink-0">
                  {c.count}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
