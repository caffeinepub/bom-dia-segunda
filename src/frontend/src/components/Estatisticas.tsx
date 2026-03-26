import { Accessibility, GraduationCap, TrendingUp, Users } from "lucide-react";

const stats = [
  { icon: Users, value: "247", label: "Vagas Ativas", trend: "+12%", up: true },
  {
    icon: TrendingUp,
    value: "189",
    label: "Vagas Efetivas (CLT)",
    trend: "+8%",
    up: true,
  },
  {
    icon: GraduationCap,
    value: "43%",
    label: "Exigem Ensino Superior",
    trend: "-3%",
    up: false,
  },
  {
    icon: Accessibility,
    value: "28",
    label: "Vagas PCD",
    trend: "+15%",
    up: true,
  },
];

const educationData = [
  { label: "Ensino Médio", pct: 57 },
  { label: "Técnico / Tecnólogo", pct: 22 },
  { label: "Ensino Superior", pct: 43 },
  { label: "Pós-graduação", pct: 8 },
];

const modalityData = [
  { label: "CLT", pct: 76, color: "bg-primary" },
  { label: "Estágio", pct: 15, color: "bg-brand-blue" },
  { label: "Jovem Aprendiz", pct: 11, color: "bg-brand-purple" },
  { label: "PCD", pct: 11, color: "bg-brand-green" },
];

const softSkills = [
  { skill: "Comunicação", count: 142 },
  { skill: "Trabalho em equipe", count: 128 },
  { skill: "Proatividade", count: 115 },
  { skill: "Organização", count: 98 },
  { skill: "Adaptabilidade", count: 87 },
];

const hardSkills = [
  { skill: "Pacote Office", count: 134 },
  { skill: "Excel Avançado", count: 96 },
  { skill: "Habilitação CNH B", count: 88 },
  { skill: "Inglês básico", count: 74 },
  { skill: "SAP / ERP", count: 61 },
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
            O Mercado em Números
          </h2>
          <p className="text-muted-foreground">
            Dados da semana de 23 a 29 de Março de 2026
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
                className={`text-xs font-semibold ${s.up ? "text-green-600" : "text-red-500"}`}
              >
                {s.trend} vs semana anterior
              </div>
            </div>
          ))}
        </div>

        {/* Charts Row */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Education */}
          <div className="bg-card rounded-xl p-6 shadow-card border border-border">
            <h3 className="font-semibold text-base mb-4 flex items-center gap-2">
              <GraduationCap className="w-4 h-4 text-primary" /> Escolaridade
            </h3>
            <div className="space-y-3">
              {educationData.map((d) => (
                <div key={d.label}>
                  <div className="flex justify-between text-xs text-muted-foreground mb-1">
                    <span>{d.label}</span>
                    <span>{d.pct}%</span>
                  </div>
                  <div className="h-2 bg-muted rounded-full overflow-hidden">
                    <div
                      className="h-full bg-primary rounded-full"
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
              <Users className="w-4 h-4 text-primary" /> Modalidade
            </h3>
            <div className="space-y-3">
              {modalityData.map((d) => (
                <div key={d.label}>
                  <div className="flex justify-between text-xs text-muted-foreground mb-1">
                    <span>{d.label}</span>
                    <span>{d.pct}%</span>
                  </div>
                  <div className="h-2 bg-muted rounded-full overflow-hidden">
                    <div
                      className={`h-full ${d.color} rounded-full`}
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
      </div>
    </section>
  );
}
