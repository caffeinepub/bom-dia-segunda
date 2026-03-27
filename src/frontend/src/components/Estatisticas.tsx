import {
  Accessibility,
  GraduationCap,
  MapPin,
  TrendingDown,
  TrendingUp,
  Users,
} from "lucide-react";

const stats = [
  {
    icon: Users,
    value: "247",
    label: "Vagas Disponíveis",
    trend: "+12%",
    up: true,
    stable: false,
  },
  {
    icon: TrendingUp,
    value: "189",
    label: "Vagas Efetivas (CLT)",
    trend: "+8%",
    up: true,
    stable: false,
  },
  {
    icon: GraduationCap,
    value: "43%",
    label: "Exigem Ensino Superior",
    trend: "estável",
    up: false,
    stable: true,
  },
  {
    icon: Accessibility,
    value: "28",
    label: "Vagas PCD",
    trend: "+15%",
    up: true,
    stable: false,
  },
];

const educationData = [
  { label: "Ensino Fundamental", pct: 8, color: "bg-blue-400" },
  { label: "Ensino Médio", pct: 32, color: "bg-[#d7350d]" },
  { label: "Ensino Técnico", pct: 20, color: "bg-yellow-500" },
  { label: "Graduação", pct: 28, color: "bg-purple-500" },
  { label: "Pós-graduação", pct: 12, color: "bg-green-500" },
];

const modalityData = [
  { label: "Efetiva", pct: 40, color: "bg-[#d7350d]" },
  { label: "Temporária", pct: 20, color: "bg-blue-500" },
  { label: "Estágio", pct: 18, color: "bg-yellow-500" },
  { label: "Menor Aprendiz", pct: 10, color: "bg-purple-500" },
  { label: "Remota", pct: 8, color: "bg-green-500" },
  { label: "PCD", pct: 4, color: "bg-gray-500" },
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

const vagasPorCidade = [
  { city: "Resende", count: 62 },
  { city: "Barra Mansa", count: 48 },
  { city: "Volta Redonda", count: 41 },
  { city: "Angra dos Reis", count: 29 },
  { city: "Valença", count: 24 },
  { city: "Três Rios", count: 18 },
  { city: "Itatiaia", count: 15 },
  { city: "Porto Real", count: 10 },
];

const maxCidade = Math.max(...vagasPorCidade.map((c) => c.count));

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
            Dados atualizados para a semana de{" "}
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
