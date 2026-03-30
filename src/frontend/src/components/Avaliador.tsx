import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Progress } from "@/components/ui/progress";
import { Textarea } from "@/components/ui/textarea";
import { useActor } from "@/hooks/useActor";
import { Principal } from "@icp-sdk/core/principal";
import {
  AlertCircle,
  ArrowRight,
  CheckCircle2,
  FileText,
  Heart,
  HeartCrack,
  Lightbulb,
  Linkedin,
  MapPin,
  ShieldCheck,
  Star,
  Target,
  Upload,
  Zap,
} from "lucide-react";
import { useRef, useState } from "react";
import { toast } from "sonner";

interface CVResult {
  overallScore: number;
  atsScore: number;
  acceptanceRate: number;
  competencies: string[];
  improvements: string[];
  linkedinTips: string[];
  highlightSkills: string[];
  matchScore?: number;
}

function simulateEvaluation(input: string, jobDesc?: string): CVResult {
  const words = input.toLowerCase().split(/\s+/).filter(Boolean);
  const hasObjective = /objetivo|perfil|sobre mim|resumo/i.test(input);
  const hasExperience = /experiência|empresa|cargo|trabalhei|atuei/i.test(
    input,
  );
  const hasEducation =
    /formação|educação|faculdade|universidade|técnico|curso/i.test(input);
  const hasSkills = /habilidades|competências|skills|conhecimentos/i.test(
    input,
  );
  const hasContact = /telefone|email|linkedin|celular/i.test(input);
  const hasQuantified =
    /\d+%|\d+ anos|\d+ meses|aumento|reduzi|gerenciei/i.test(input);
  const wordCount = words.length;

  let score = 40;
  if (wordCount > 30) score += 8;
  if (wordCount > 80) score += 8;
  if (wordCount > 150) score += 6;
  if (hasObjective) score += 6;
  if (hasExperience) score += 10;
  if (hasEducation) score += 6;
  if (hasSkills) score += 6;
  if (hasContact) score += 5;
  if (hasQuantified) score += 8;
  score = Math.min(score, 94);

  const atsBase = score - 8;
  const atsScore = Math.min(
    Math.max(25, atsBase + (hasSkills ? 8 : 0) + (hasQuantified ? 5 : 0)),
    98,
  );
  const acceptanceRate = Math.min(
    Math.floor(score * 0.75 + (hasExperience ? 5 : 0)),
    92,
  );

  const allCompetencies = [
    "Comunicação Eficaz",
    "Trabalho em Equipe",
    "Proatividade",
    "Organização e Planejamento",
    "Liderança",
    "Resolução de Problemas",
    "Adaptabilidade",
    "Foco em Resultados",
    "Gestão de Tempo",
    "Criatividade",
  ];

  const competencyCount = Math.min(
    Math.max(2, Math.floor(score / 12)),
    allCompetencies.length,
  );
  const competencies = allCompetencies.slice(0, competencyCount);

  const allImprovements = [
    "Adicione um resumo profissional objetivo de 3-4 linhas no topo do currículo",
    "Quantifique suas conquistas com dados concretos (ex: 'aumentei vendas em 20%', 'gerenciei equipe de 8 pessoas')",
    "Inclua palavras-chave relevantes da vaga em todo o currículo para passar pelos filtros ATS",
    "Padronize o formato das datas em todas as experiências (MM/AAAA)",
    "Adicione uma seção de habilidades técnicas com ferramentas e softwares que domina",
    "Descreva as responsabilidades de cada cargo com verbos de ação no passado (gerenciei, desenvolvi, implementei)",
    "Revise ortografia e gramática — erros eliminam candidatos na triagem inicial",
    "Inclua informações de contato completas: e-mail profissional, telefone e LinkedIn",
  ];

  const improvementCount = Math.max(2, Math.min(6, 8 - Math.floor(score / 15)));
  const improvements = allImprovements.slice(0, improvementCount);

  const allHighlight = [
    "Pacote Office (Word, Excel, PowerPoint)",
    "Comunicação e relacionamento interpessoal",
    "Proatividade e iniciativa",
    "Trabalho em equipe multidisciplinar",
    "Organização e gestão de prioridades",
    "Atendimento ao cliente",
  ];

  const highlightCount = Math.min(
    Math.max(2, Math.floor(score / 18)),
    allHighlight.length,
  );

  // Compute match score if job description provided
  let matchScore: number | undefined;
  if (jobDesc && jobDesc.trim().length > 0) {
    const jobWords = new Set(
      jobDesc
        .toLowerCase()
        .split(/\W+/)
        .filter((w) => w.length > 3),
    );
    const inputWords = input
      .toLowerCase()
      .split(/\W+/)
      .filter((w) => w.length > 3);
    if (jobWords.size > 0) {
      const matches = inputWords.filter((w) => jobWords.has(w)).length;
      matchScore = Math.min(100, Math.round((matches / jobWords.size) * 100));
    }
  }

  return {
    overallScore: score,
    atsScore,
    acceptanceRate,
    competencies,
    improvements,
    linkedinTips: [
      "Adicione uma foto profissional (aumenta 14x as visualizações do perfil)",
      "Personalize sua URL do LinkedIn com seu nome completo (ex: linkedin.com/in/seunome)",
      "Peça recomendações a ex-colegas, gestores e professores",
      "Publique conteúdo relacionado à sua área pelo menos 2x por semana",
      "Ative a opção 'Aberto a oportunidades' nas configurações do perfil",
    ],
    highlightSkills: allHighlight.slice(0, highlightCount),
    matchScore,
  };
}

function ScoreRing({
  value,
  label,
  color,
}: { value: number; label: string; color: string }) {
  const radius = 40;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (value / 100) * circumference;
  return (
    <div className="flex flex-col items-center gap-2">
      <div className="relative w-24 h-24">
        <svg
          className="w-full h-full"
          viewBox="0 0 100 100"
          aria-label={`${label}: ${value}`}
        >
          <title>
            {label}: {value}
          </title>
          <circle
            cx="50"
            cy="50"
            r={radius}
            fill="none"
            stroke="#f0f0f0"
            strokeWidth="10"
          />
          <circle
            cx="50"
            cy="50"
            r={radius}
            fill="none"
            stroke={color}
            strokeWidth="10"
            strokeDasharray={circumference}
            strokeDashoffset={offset}
            strokeLinecap="round"
            className="score-ring"
            style={{ transition: "stroke-dashoffset 1s ease" }}
          />
        </svg>
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="text-xl font-bold text-foreground">{value}</span>
        </div>
      </div>
      <span className="text-xs text-muted-foreground text-center">{label}</span>
    </div>
  );
}

interface AvaliadorProps {
  onRequestFullReport: (score: number, name: string) => void;
}

export default function Avaliador({ onRequestFullReport }: AvaliadorProps) {
  const { actor } = useActor();
  const [jobDesc, setJobDesc] = useState("");
  const [linkedinUrl, setLinkedinUrl] = useState("");
  const [fileName, setFileName] = useState("");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<CVResult | null>(null);
  const [_resumeId, setResumeId] = useState("");
  const fileRef = useRef<HTMLInputElement>(null);

  // Lead capture fields
  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [whatsapp, setWhatsapp] = useState("");
  const [escolaridade, setEscolaridade] = useState("");
  const [cidade, setCidade] = useState("");

  const canSubmit =
    !!fileName &&
    nome.trim() !== "" &&
    email.trim() !== "" &&
    whatsapp.trim() !== "" &&
    escolaridade !== "" &&
    cidade.trim() !== "";

  const handleFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setFileName(file.name);
  };

  const handleEvaluate = async () => {
    if (!canSubmit) return;
    setLoading(true);
    await new Promise((r) => setTimeout(r, 1800));
    const evaluated = simulateEvaluation(`${fileName} ${jobDesc}`, jobDesc);
    setResult(evaluated);

    const newId = crypto.randomUUID();
    setResumeId(newId);

    try {
      if (actor) {
        await actor.saveResume({
          id: newId,
          overallScore: BigInt(evaluated.overallScore),
          atsScore: BigInt(evaluated.atsScore),
          acceptanceRate: BigInt(evaluated.acceptanceRate),
          competencies: evaluated.competencies,
          improvements: evaluated.improvements,
          linkedinTips: evaluated.linkedinTips,
          highlightSkills: evaluated.highlightSkills,
          jobDesc,
          linkedinUrl,
          fileName,
          userId: Principal.fromText("2vxsx-fae"),
          createdAt: BigInt(Date.now()),
          reportRequested: false,
          pdfGenerated: false,
        });
      }
    } catch (_err) {
      // backend save failure is non-blocking
    }

    setLoading(false);
    setTimeout(() => {
      document
        .getElementById("resultado-cv")
        ?.scrollIntoView({ behavior: "smooth" });
    }, 100);
  };

  const scoreColor = (v: number) =>
    v < 40 ? "#EF4444" : v < 70 ? "#F59E0B" : "#22C55E";

  const atsLabel = (v: number) =>
    v < 40
      ? "Baixo — precisa de melhorias urgentes"
      : v < 70
        ? "Médio — bom potencial, ajustes necessários"
        : "Alto — currículo bem otimizado para ATS";

  const atsBg = (v: number) =>
    v < 40
      ? "bg-red-50 border-red-200"
      : v < 70
        ? "bg-amber-50 border-amber-200"
        : "bg-green-50 border-green-200";

  const atsText = (v: number) =>
    v < 40 ? "text-red-600" : v < 70 ? "text-amber-600" : "text-green-600";

  return (
    <section id="avaliador" className="py-16 px-4 bg-background">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-2 tracking-wide">
            <span style={{ color: "#1a1a1a" }}>B</span>
            <span style={{ color: "#d7350d" }}>D</span>
            <span style={{ color: "#1a1a1a" }}>S</span>
            <span style={{ color: "#1a1a1a" }}>AVALIADOR DE CURRÍCULO</span>
          </h2>
          <p
            className="font-bold text-foreground mb-1"
            style={{ fontSize: "18px" }}
          >
            Seu currículo está pronto para o mercado de trabalho?
          </p>
          <p className="text-foreground" style={{ fontSize: "14px" }}>
            Descubra agora com nossa análise gratuita e aumente as chances de
            ser contratado
          </p>
        </div>

        {/* Top two-column layout: form + info cards */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* LEFT: Upload form */}
          <div className="bg-card rounded-2xl border border-border shadow-card p-6">
            <h3 className="font-semibold text-lg mb-5">Envie seu Currículo</h3>

            <label
              htmlFor="file-upload"
              className="border-2 border-dashed border-border rounded-xl p-6 text-center mb-4 cursor-pointer hover:border-primary hover:bg-primary/5 transition-colors block"
              data-ocid="avaliador.dropzone"
            >
              <Upload className="w-8 h-8 mx-auto mb-2 text-muted-foreground" />
              {fileName ? (
                <p className="text-sm font-medium text-primary">
                  {fileName} recebido ✓
                </p>
              ) : (
                <>
                  <p className="text-sm font-medium">
                    Clique para enviar PDF, DOCX ou TXT
                  </p>
                  <p className="text-xs text-muted-foreground mt-1">
                    Tamanho máximo: 5MB
                  </p>
                </>
              )}
              <input
                id="file-upload"
                ref={fileRef}
                type="file"
                accept=".pdf,.docx,.txt"
                className="hidden"
                onChange={handleFile}
              />
            </label>

            <div className="flex gap-3 items-start bg-blue-50 border border-blue-200 rounded-lg px-4 py-3 mb-5">
              <ShieldCheck className="w-4 h-4 text-blue-600 shrink-0 mt-0.5" />
              <p className="text-xs text-blue-800 leading-relaxed">
                Ao enviar seu currículo, você autoriza análise automatizada para
                fins de feedback. Seus dados serão mantidos com segurança por{" "}
                <strong>90 dias</strong> em nosso banco de dados de acordo com a
                LGPD. A qualquer momento, solicite o seu relatório
                personalizado.
              </p>
            </div>

            <div className="space-y-4 mb-5">
              <div>
                <Label
                  htmlFor="lead-nome"
                  className="text-sm font-medium mb-1 block"
                >
                  Nome completo <span className="text-primary">*</span>
                </Label>
                <Input
                  id="lead-nome"
                  type="text"
                  placeholder="Seu nome completo"
                  value={nome}
                  onChange={(e) => setNome(e.target.value)}
                  data-ocid="avaliador.input"
                />
              </div>

              <div>
                <Label
                  htmlFor="lead-email"
                  className="text-sm font-medium mb-1 block"
                >
                  E-mail <span className="text-primary">*</span>
                  <span className="text-muted-foreground font-normal ml-1 text-xs">
                    (para newsletter)
                  </span>
                </Label>
                <Input
                  id="lead-email"
                  type="email"
                  placeholder="Seu e-mail"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  data-ocid="avaliador.input"
                />
              </div>

              <div>
                <Label
                  htmlFor="lead-whatsapp"
                  className="text-sm font-medium mb-1 block"
                >
                  WhatsApp <span className="text-primary">*</span>
                  <span className="text-muted-foreground font-normal ml-1 text-xs">
                    (para contato)
                  </span>
                </Label>
                <Input
                  id="lead-whatsapp"
                  type="tel"
                  placeholder="(24) 99999-9999"
                  value={whatsapp}
                  onChange={(e) => setWhatsapp(e.target.value)}
                  data-ocid="avaliador.input"
                />
              </div>

              <div>
                <Label
                  htmlFor="lead-escolaridade"
                  className="text-sm font-medium mb-1 block"
                >
                  Nível de Escolaridade <span className="text-primary">*</span>
                </Label>
                <select
                  id="lead-escolaridade"
                  value={escolaridade}
                  onChange={(e) => setEscolaridade(e.target.value)}
                  className="border border-input bg-background px-3 py-2 text-sm rounded-md w-full focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
                  data-ocid="avaliador.select"
                >
                  <option value="" disabled>
                    Selecione seu nível de escolaridade
                  </option>
                  <option value="fundamental">Ensino Fundamental</option>
                  <option value="medio">Ensino Médio</option>
                  <option value="tecnico">Ensino Técnico</option>
                  <option value="graduacao">Graduação</option>
                  <option value="pos-graduacao">Pós-graduação</option>
                </select>
              </div>

              <div>
                <Label
                  htmlFor="lead-cidade"
                  className="text-sm font-medium mb-1 flex items-center gap-1"
                >
                  <MapPin className="w-3.5 h-3.5" />
                  Cidade <span className="text-primary">*</span>
                </Label>
                <Input
                  id="lead-cidade"
                  type="text"
                  placeholder="Sua cidade / UF"
                  value={cidade}
                  onChange={(e) => setCidade(e.target.value)}
                  data-ocid="avaliador.input"
                />
              </div>
            </div>

            <div className="mb-4">
              <Label
                htmlFor="job-desc"
                className="text-sm font-medium mb-1 block"
              >
                Descrição da Vaga
                <span className="text-muted-foreground font-normal ml-1 text-xs">
                  (opcional)
                </span>
              </Label>
              <Textarea
                id="job-desc"
                placeholder="Cole a descrição da vaga para análise mais precisa..."
                className="h-24 resize-none"
                value={jobDesc}
                onChange={(e) => setJobDesc(e.target.value)}
                data-ocid="avaliador.textarea"
              />
            </div>

            <div className="mb-6">
              <Label
                htmlFor="linkedin"
                className="text-sm font-medium mb-1 flex items-center gap-1"
              >
                <Linkedin className="w-4 h-4" /> URL do LinkedIn
                <span className="text-muted-foreground font-normal ml-1 text-xs">
                  (opcional)
                </span>
              </Label>
              <Input
                id="linkedin"
                placeholder="https://linkedin.com/in/seu-perfil"
                value={linkedinUrl}
                onChange={(e) => setLinkedinUrl(e.target.value)}
                data-ocid="avaliador.input"
              />
            </div>

            <Button
              type="button"
              className="w-full bg-primary hover:bg-primary/90 text-white"
              onClick={handleEvaluate}
              disabled={loading || !canSubmit}
              data-ocid="avaliador.submit_button"
            >
              {loading ? (
                <>
                  <span className="animate-spin mr-2 border-2 border-white border-t-transparent rounded-full w-4 h-4 inline-block" />
                  Analisando...
                </>
              ) : (
                <>
                  <Zap className="w-4 h-4 mr-2" />
                  Avaliar Currículo
                </>
              )}
            </Button>

            {!canSubmit && fileName && (
              <p className="text-xs text-muted-foreground text-center mt-2">
                Preencha todos os campos obrigatórios (*) para continuar
              </p>
            )}
          </div>

          {/* RIGHT: Info cards */}
          <div className="space-y-4">
            {[
              {
                icon: Target,
                color: "text-primary bg-primary/10",
                title: "Score ATS",
                desc: "Avaliamos se seu currículo passa pelos filtros automáticos das empresas (Applicant Tracking System).",
              },
              {
                icon: CheckCircle2,
                color: "text-green-600 bg-green-50",
                title: "Competências Identificadas",
                desc: "Mapeamos as competências presentes no seu currículo e as compara com as mais requisitadas do mercado.",
              },
              {
                icon: Lightbulb,
                color: "text-amber-600 bg-amber-50",
                title: "Sugestões de Melhoria",
                desc: "Lista personalizada de melhorias para aumentar suas chances de ser chamado para entrevistas.",
              },
              {
                icon: Star,
                color: "text-purple-600 bg-purple-50",
                title: "Análise do LinkedIn",
                desc: "Dicas específicas para otimizar seu perfil no LinkedIn e aumentar a visibilidade para recrutadores.",
              },
              {
                icon: Heart,
                color: "text-red-500 bg-red-50",
                title: "Match Vaga",
                desc: "Verificamos a compatibilidade do seu currículo com a descrição da vaga. Exibido apenas quando você preencher a descrição da vaga.",
              },
            ].map((item) => (
              <div
                key={item.title}
                className="bg-card rounded-xl border border-border p-5 flex gap-4"
              >
                <div
                  className={`w-10 h-10 rounded-lg flex items-center justify-center shrink-0 ${item.color}`}
                >
                  <item.icon className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-semibold text-sm mb-1">{item.title}</h4>
                  <p className="text-xs text-muted-foreground leading-relaxed">
                    {item.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Results section */}
        {result && (
          <div id="resultado-cv" className="mt-10">
            {/* Header */}
            <div className="bg-card rounded-2xl border border-border shadow-card p-6 mb-6 text-center">
              <h3 className="font-bold text-xl mb-2">Resultado da Avaliação</h3>
              <p className="text-sm text-muted-foreground">
                Análise completa do seu currículo com pontuações e recomendações
              </p>
            </div>

            {/* Row 1: Score rings */}
            <div className="bg-card rounded-2xl border border-border p-6 mb-6 flex flex-wrap justify-center gap-10">
              <ScoreRing
                value={result.overallScore}
                label="Score Geral"
                color={scoreColor(result.overallScore)}
              />
              <ScoreRing
                value={result.atsScore}
                label="Score ATS"
                color={scoreColor(result.atsScore)}
              />
              <ScoreRing
                value={result.acceptanceRate}
                label="Taxa de Aceitação"
                color={scoreColor(result.acceptanceRate)}
              />
            </div>

            {/* Row 2: 2x2 grid of result cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              {/* Card 1: Pontuação ATS */}
              <div className="bg-card rounded-2xl border border-border p-6">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-9 h-9 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                    <Target className="w-5 h-5 text-primary" />
                  </div>
                  <h4 className="font-semibold text-base">Pontuação ATS</h4>
                </div>

                <div
                  className={`rounded-xl border p-4 mb-4 ${atsBg(result.atsScore)}`}
                >
                  <div className="flex items-end justify-between mb-2">
                    <span
                      className={`text-4xl font-black ${atsText(result.atsScore)}`}
                    >
                      {result.atsScore}
                    </span>
                    <span
                      className={`text-sm font-semibold ${atsText(result.atsScore)}`}
                    >
                      /100
                    </span>
                  </div>
                  <p
                    className={`text-xs font-medium mb-3 ${atsText(result.atsScore)}`}
                  >
                    {atsLabel(result.atsScore)}
                  </p>
                  <Progress
                    value={result.atsScore}
                    className="h-3 rounded-full"
                  />
                </div>

                <div className="space-y-2 text-xs text-muted-foreground">
                  <div className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-red-400 shrink-0" />
                    <span>0–39: Baixo — reformulação necessária</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-amber-400 shrink-0" />
                    <span>40–69: Médio — ajustes podem melhorar bastante</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-green-400 shrink-0" />
                    <span>
                      70+: Alto — boa compatibilidade com sistemas ATS
                    </span>
                  </div>
                </div>
              </div>

              {/* Card 2: Competências Identificadas */}
              <div className="bg-card rounded-2xl border border-border p-6">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-9 h-9 rounded-lg bg-green-50 flex items-center justify-center shrink-0">
                    <CheckCircle2 className="w-5 h-5 text-green-600" />
                  </div>
                  <h4 className="font-semibold text-base">
                    Competências Identificadas
                  </h4>
                </div>

                <div className="mb-4">
                  <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2">
                    Competências mapeadas
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {result.competencies.map((c) => (
                      <span
                        key={c}
                        className="text-xs bg-green-50 text-green-700 border border-green-200 px-3 py-1 rounded-full font-medium"
                      >
                        {c}
                      </span>
                    ))}
                  </div>
                </div>

                <div>
                  <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2">
                    Pontos a Destacar
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {result.highlightSkills.map((s) => (
                      <span
                        key={s}
                        className="text-xs bg-amber-50 text-amber-700 border border-amber-200 px-3 py-1 rounded-full font-medium"
                      >
                        {s}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Card 3: Sugestões de Melhoria */}
              <div className="bg-card rounded-2xl border border-border p-6">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-9 h-9 rounded-lg bg-red-50 flex items-center justify-center shrink-0">
                    <AlertCircle className="w-5 h-5 text-red-500" />
                  </div>
                  <h4 className="font-semibold text-base">
                    Sugestões de Melhoria
                  </h4>
                </div>

                <ol className="space-y-3">
                  {result.improvements.map((imp, idx) => (
                    <li
                      key={imp}
                      className="flex gap-3 text-sm text-muted-foreground"
                    >
                      <span className="w-6 h-6 rounded-full bg-red-100 text-red-600 font-bold flex items-center justify-center shrink-0 text-xs mt-0.5">
                        {idx + 1}
                      </span>
                      <span className="leading-relaxed">{imp}</span>
                    </li>
                  ))}
                </ol>
              </div>

              {/* Card 4: Análise LinkedIn */}
              <div className="bg-card rounded-2xl border border-border p-6">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-9 h-9 rounded-lg bg-blue-50 flex items-center justify-center shrink-0">
                    <Linkedin className="w-5 h-5 text-blue-600" />
                  </div>
                  <h4 className="font-semibold text-base">Análise LinkedIn</h4>
                </div>

                <p className="text-xs text-muted-foreground mb-4 bg-blue-50 border border-blue-100 rounded-lg px-3 py-2">
                  Dicas para otimizar seu perfil e aumentar a visibilidade para
                  recrutadores.
                </p>

                <ul className="space-y-3">
                  {result.linkedinTips.map((tip) => (
                    <li
                      key={tip}
                      className="flex gap-3 text-sm text-muted-foreground"
                    >
                      <span className="text-blue-500 font-bold shrink-0 mt-0.5">
                        →
                      </span>
                      <span className="leading-relaxed">{tip}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Card 5: Match com a Vaga (only when jobDesc is present) */}
              {result.matchScore !== undefined && jobDesc && (
                <div className="bg-card rounded-2xl border border-border p-6 md:col-span-2">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-9 h-9 rounded-lg bg-red-50 flex items-center justify-center shrink-0">
                      {result.matchScore >= 55 ? (
                        <Heart className="w-5 h-5 text-red-500 fill-red-500" />
                      ) : (
                        <HeartCrack className="w-5 h-5 text-gray-400" />
                      )}
                    </div>
                    <h4 className="font-semibold text-base">
                      Match com a Vaga
                    </h4>
                  </div>

                  <div
                    className={`rounded-xl border p-4 mb-4 ${result.matchScore >= 55 ? "bg-red-50 border-red-100" : "bg-gray-50 border-gray-200"}`}
                  >
                    <div className="flex items-center gap-4">
                      <div className="flex flex-col items-center">
                        {result.matchScore >= 55 ? (
                          <Heart className="w-10 h-10 text-red-500 fill-red-500 mb-1" />
                        ) : (
                          <HeartCrack className="w-10 h-10 text-gray-400 mb-1" />
                        )}
                        <span
                          className={`text-3xl font-black ${result.matchScore >= 55 ? "text-red-500" : "text-gray-500"}`}
                        >
                          {result.matchScore}%
                        </span>
                      </div>
                      <div className="flex-1">
                        <p
                          className={`font-semibold text-sm mb-2 ${result.matchScore >= 55 ? "text-red-600" : "text-gray-600"}`}
                        >
                          {result.matchScore >= 55
                            ? "Boa compatibilidade com a vaga"
                            : "Baixa compatibilidade com a vaga"}
                        </p>
                        <Progress
                          value={result.matchScore}
                          className="h-3 rounded-full"
                        />
                        <p className="text-xs text-muted-foreground mt-2">
                          {result.matchScore >= 55
                            ? "Seu currículo apresenta boa correspondência com os requisitos desta vaga."
                            : "Considere ajustar seu currículo para incluir mais termos e competências da descrição da vaga."}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* CTA Mentoria banner */}
            <div className="bg-gradient-to-r from-gray-900 to-red-600 rounded-xl p-6 text-white text-center mb-6">
              <h4 className="font-bold text-lg mb-2">
                Quer um currículo profissional de verdade?
              </h4>
              <p className="text-white/80 text-sm mb-4">
                Nossa mentoria personalizada transforma seu currículo e perfil
                em uma máquina de atrair entrevistas.
              </p>
              <Button
                className="bg-white text-red-600 hover:bg-white/90 font-semibold"
                asChild
              >
                <a href="#mentoria" data-ocid="avaliador.primary_button">
                  Quero a Mentoria <ArrowRight className="w-4 h-4 ml-2" />
                </a>
              </Button>
            </div>

            {/* Report request card */}
            <div className="bg-card border border-border rounded-xl p-6 text-center">
              <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-3">
                <FileText className="w-6 h-6 text-primary" />
              </div>
              <h4 className="font-bold text-lg mb-2">
                Relatório Completo (até 5 páginas)
              </h4>
              <p className="text-muted-foreground text-sm mb-2 max-w-md mx-auto">
                Receba uma análise detalhada do seu currículo com recomendações
                personalizadas, análise de mercado e plano de ação para sua
                carreira.
              </p>
              <p className="text-xs text-muted-foreground mb-4 max-w-md mx-auto">
                ✅ Seu currículo foi salvo com segurança. Ele ficará disponível
                por <strong>90 dias</strong> — a qualquer momento você pode
                solicitar seu relatório personalizado.
              </p>
              <Button
                type="button"
                className="bg-primary hover:bg-primary/90 text-white px-8 text-base font-bold"
                onClick={() => onRequestFullReport(result.overallScore, nome)}
                data-ocid="avaliador.secondary_button"
              >
                Ver Relatório Completo — R$ 19,90 →
              </Button>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
