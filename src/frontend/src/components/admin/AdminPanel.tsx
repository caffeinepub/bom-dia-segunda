import type {
  BlogPost,
  JobListing,
  JobSource,
  PaymentConfig,
  Product,
  Resume,
  Testimonial,
} from "@/backend.d";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Textarea } from "@/components/ui/textarea";
import { useActor } from "@/hooks/useActor";
import {
  BookOpen,
  Briefcase,
  CreditCard,
  FileText,
  Globe,
  Image,
  Layers,
  LogOut,
  Mail,
  MessageSquare,
  RefreshCw,
  Settings,
  ShoppingBag,
  Star,
  Trash2,
  TrendingUp,
  Users,
  X,
} from "lucide-react";
import { useEffect, useState } from "react";
import { toast } from "sonner";

type Tab =
  | "dashboard"
  | "vagas"
  | "curriculos"
  | "depoimentos"
  | "blog"
  | "mentoria"
  | "imagens"
  | "newsletter"
  | "loja"
  | "fontes"
  | "configuracoes";

const SIDEBAR_ITEMS: { id: Tab; label: string; icon: React.ReactNode }[] = [
  {
    id: "dashboard",
    label: "Dashboard",
    icon: <TrendingUp className="w-4 h-4" />,
  },
  { id: "vagas", label: "Vagas", icon: <Briefcase className="w-4 h-4" /> },
  {
    id: "curriculos",
    label: "Currículos",
    icon: <FileText className="w-4 h-4" />,
  },
  {
    id: "depoimentos",
    label: "Depoimentos",
    icon: <MessageSquare className="w-4 h-4" />,
  },
  { id: "blog", label: "Blog", icon: <BookOpen className="w-4 h-4" /> },
  { id: "mentoria", label: "Mentoria", icon: <Star className="w-4 h-4" /> },
  { id: "imagens", label: "Imagens", icon: <Image className="w-4 h-4" /> },
  { id: "newsletter", label: "Newsletter", icon: <Mail className="w-4 h-4" /> },
  { id: "loja", label: "Loja", icon: <ShoppingBag className="w-4 h-4" /> },
  {
    id: "fontes",
    label: "Fontes de Vagas",
    icon: <Globe className="w-4 h-4" />,
  },
  {
    id: "configuracoes",
    label: "Configurações",
    icon: <Settings className="w-4 h-4" />,
  },
];

function fmtDate(nanoseconds: bigint) {
  return new Date(Number(nanoseconds) / 1_000_000).toLocaleDateString("pt-BR");
}

function nowNano(): bigint {
  return BigInt(Date.now() * 1_000_000);
}

export default function AdminPanel() {
  const { actor, isFetching } = useActor();
  const [isAdmin, setIsAdmin] = useState<boolean | null>(null);
  const [loading, setLoading] = useState(false);
  const [activeTab, setActiveTab] = useState<Tab>("dashboard");
  const [loginUser, setLoginUser] = useState("");
  const [loginPass, setLoginPass] = useState("");

  async function handleLogin() {
    if (!actor) {
      toast.error("Conecte-se com a sua identidade ICP para continuar.");
      return;
    }
    setLoading(true);
    try {
      const ok = await actor.isCallerAdmin();
      setIsAdmin(ok);
      if (!ok) toast.error("Você não tem permissão de administrador.");
    } catch {
      toast.error("Erro ao verificar permissões.");
    } finally {
      setLoading(false);
    }
  }

  function handlePasswordLogin() {
    if (loginUser === "admin" && loginPass === "123456") {
      setIsAdmin(true);
    } else {
      toast.error("Credenciais incorretas.");
    }
  }

  if (isAdmin === null) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#f5f5f5]">
        <div className="bg-white rounded-2xl p-10 shadow-lg w-full max-w-sm text-center">
          <div className="mb-4 flex justify-center">
            <div className="w-14 h-14 rounded-full bg-[#1a1a1a] flex items-center justify-center">
              <Layers className="w-7 h-7 text-white" />
            </div>
          </div>
          <h1 className="text-xl font-bold text-[#1a1a1a] mb-1">
            <span>CMS – </span>
            <span>BOM </span>
            <span style={{ color: "#d7350d" }}>DIA </span>
            <span>SEGUNDA</span>
          </h1>
          <p className="text-sm text-gray-500 mb-6">
            Painel de administração exclusivo
          </p>
          <div className="text-left space-y-3 mb-4">
            <div>
              <Label
                htmlFor="admin-login"
                className="text-xs text-gray-600 mb-1 block"
              >
                Login
              </Label>
              <Input
                id="admin-login"
                type="text"
                value={loginUser}
                onChange={(e) => setLoginUser(e.target.value)}
                placeholder="Usuário"
                data-ocid="admin.input"
              />
            </div>
            <div>
              <Label
                htmlFor="admin-pass"
                className="text-xs text-gray-600 mb-1 block"
              >
                Senha
              </Label>
              <Input
                id="admin-pass"
                type="password"
                value={loginPass}
                onChange={(e) => setLoginPass(e.target.value)}
                placeholder="Senha"
                onKeyDown={(e) => e.key === "Enter" && handlePasswordLogin()}
                data-ocid="admin.input"
              />
            </div>
          </div>
          <Button
            className="w-full bg-[#1a1a1a] hover:bg-[#333] text-white mb-4"
            onClick={handlePasswordLogin}
            data-ocid="admin.submit_button"
          >
            Entrar
          </Button>
          <div className="flex items-center gap-2 mb-4">
            <div className="flex-1 h-px bg-gray-200" />
            <span className="text-xs text-gray-400">ou</span>
            <div className="flex-1 h-px bg-gray-200" />
          </div>
          <Button
            className="w-full bg-[#d7350d] hover:bg-[#c02e0c] text-white"
            onClick={handleLogin}
            disabled={loading || isFetching}
            data-ocid="admin.primary_button"
          >
            {loading ? "Verificando..." : "Entrar como Administrador (ICP)"}
          </Button>
          <button
            type="button"
            className="mt-4 text-xs text-gray-400 hover:text-gray-600 underline"
            onClick={() => {
              window.location.hash = "";
            }}
          >
            ← Voltar ao site
          </button>
        </div>
      </div>
    );
  }

  if (!isAdmin) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#f5f5f5]">
        <div className="bg-white rounded-2xl p-10 shadow-lg w-full max-w-sm text-center">
          <p className="text-red-600 font-semibold mb-4">
            Você não tem permissão de administrador.
          </p>
          <button
            type="button"
            className="text-sm text-gray-500 hover:underline"
            onClick={() => {
              window.location.hash = "";
            }}
          >
            ← Voltar ao site
          </button>
        </div>
      </div>
    );
  }

  return (
    <div
      className="min-h-screen flex flex-col"
      style={{ background: "#f0f0f0" }}
    >
      {/* Header */}
      <header
        className="h-14 flex items-center px-6 justify-between shadow-sm"
        style={{ background: "#1a1a1a" }}
      >
        <h1 className="text-sm font-bold text-white tracking-wide">
          CMS –{" "}
          <span className="italic">
            BOM <span style={{ color: "#d7350d" }}>DIA</span> SEGUNDA
          </span>
        </h1>
        <div className="flex items-center gap-3">
          <button
            type="button"
            className="text-xs text-white/60 hover:text-white flex items-center gap-1"
            onClick={() => {
              window.location.hash = "";
            }}
          >
            <LogOut className="w-3.5 h-3.5" /> Sair
          </button>
        </div>
      </header>

      <div className="flex flex-1 overflow-hidden">
        {/* Sidebar */}
        <aside
          className="w-52 shrink-0 py-4 overflow-y-auto"
          style={{ background: "#1a1a1a" }}
        >
          <nav className="space-y-0.5 px-2">
            {SIDEBAR_ITEMS.map((item) => (
              <button
                type="button"
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`w-full flex items-center gap-2.5 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                  activeTab === item.id
                    ? "bg-[#d7350d] text-white"
                    : "text-white/60 hover:text-white hover:bg-white/5"
                }`}
                data-ocid={`admin.${item.id}.tab`}
              >
                {item.icon}
                {item.label}
              </button>
            ))}
          </nav>
        </aside>

        {/* Content */}
        <main className="flex-1 overflow-auto p-6">
          {activeTab === "dashboard" && (
            <DashboardTab onNavigate={setActiveTab} />
          )}
          {activeTab === "vagas" && <VagasTab />}
          {activeTab === "curriculos" && <CurriculosTab />}
          {activeTab === "depoimentos" && <DepoimentosTab />}
          {activeTab === "blog" && <BlogTab />}
          {activeTab === "mentoria" && <MentoriaTab />}
          {activeTab === "imagens" && <ImagensTab />}
          {activeTab === "newsletter" && <NewsletterTab />}
          {activeTab === "loja" && <LojaTab />}
          {activeTab === "fontes" && <FontesTab />}
          {activeTab === "configuracoes" && <ConfiguracoesTab />}
        </main>
      </div>
    </div>
  );
}

/* =========================================================
   DASHBOARD TAB
   ========================================================= */
function DashboardTab({ onNavigate }: { onNavigate: (tab: Tab) => void }) {
  const { actor } = useActor();
  const [vagasCount, setVagasCount] = useState(0);
  const [blogCount, setBlogCount] = useState(0);
  const [pendingDepCount, setPendingDepCount] = useState(0);
  const [recentVagas, setRecentVagas] = useState<JobListing[]>([]);

  useEffect(() => {
    if (!actor) return;
    async function load() {
      try {
        const [vagas, posts, testimonials] = await Promise.all([
          actor!.getVagas(),
          actor!.getAllBlogPosts(),
          actor!.getAllTestimonials(),
        ]);
        setVagasCount(vagas.length);
        setBlogCount(posts.length);
        setPendingDepCount(testimonials.filter((t) => !t.approved).length);
        setRecentVagas(
          [...vagas]
            .sort((a, b) => Number(b.postedAt - a.postedAt))
            .slice(0, 5),
        );
      } catch {
        // ignore
      }
    }
    load();
  }, [actor]);

  const summaryCards = [
    {
      label: "Total de Vagas",
      value: vagasCount,
      color: "bg-blue-500",
      tab: "vagas" as Tab,
    },
    {
      label: "Posts do Blog",
      value: blogCount,
      color: "bg-green-500",
      tab: "blog" as Tab,
    },
    {
      label: "Depoimentos Pendentes",
      value: pendingDepCount,
      color: "bg-yellow-500",
      tab: "depoimentos" as Tab,
    },
    {
      label: "Inscritos Newsletter",
      value: 127,
      color: "bg-purple-500",
      tab: "newsletter" as Tab,
    },
  ];

  const shortcuts = [
    { label: "+ Nova Vaga", tab: "vagas" as Tab },
    { label: "+ Novo Post", tab: "blog" as Tab },
    { label: "Ver Currículos", tab: "curriculos" as Tab },
    { label: "Aprovar Depoimentos", tab: "depoimentos" as Tab },
    { label: "Gerenciar Loja", tab: "loja" as Tab },
    { label: "Configurações", tab: "configuracoes" as Tab },
  ];

  return (
    <div className="space-y-6">
      <h2 className="text-lg font-bold text-[#1a1a1a]">Dashboard</h2>

      {/* Summary cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {summaryCards.map((c) => (
          <button
            type="button"
            key={c.label}
            className="bg-white rounded-xl p-5 shadow-sm border text-left hover:shadow-md transition-shadow"
            onClick={() => onNavigate(c.tab)}
            data-ocid={"admin.dashboard.card"}
          >
            <div className={`w-8 h-1.5 rounded-full ${c.color} mb-3`} />
            <div className="text-2xl font-extrabold text-[#1a1a1a]">
              {c.value}
            </div>
            <div className="text-xs text-gray-500 mt-0.5">{c.label}</div>
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Recent vagas */}
        <div className="bg-white rounded-xl border p-5 shadow-sm">
          <h3 className="font-semibold text-[#1a1a1a] mb-4 text-sm">
            Atividade Recente – Últimas Vagas
          </h3>
          {recentVagas.length === 0 ? (
            <p className="text-xs text-gray-400">
              Nenhuma vaga cadastrada ainda.
            </p>
          ) : (
            <ul className="space-y-2">
              {recentVagas.map((v) => (
                <li
                  key={v.id}
                  className="flex items-center justify-between text-xs"
                >
                  <span className="font-medium text-gray-800 truncate max-w-[200px]">
                    {v.title}
                  </span>
                  <span className="text-gray-400 shrink-0 ml-2">
                    {fmtDate(v.postedAt)}
                  </span>
                </li>
              ))}
            </ul>
          )}
        </div>

        {/* Shortcuts */}
        <div className="bg-white rounded-xl border p-5 shadow-sm">
          <h3 className="font-semibold text-[#1a1a1a] mb-4 text-sm">
            Acesso Rápido
          </h3>
          <div className="grid grid-cols-2 gap-2">
            {shortcuts.map((s) => (
              <button
                type="button"
                key={s.label}
                className="text-xs px-3 py-2 rounded-lg border border-gray-200 text-gray-700 hover:border-[#d7350d] hover:text-[#d7350d] transition-colors text-left"
                onClick={() => onNavigate(s.tab)}
                data-ocid="admin.dashboard.button"
              >
                {s.label}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

/* =========================================================
   VAGAS TAB
   ========================================================= */
function VagasTab() {
  const { actor } = useActor();
  const [vagas, setVagas] = useState<JobListing[]>([]);
  const [open, setOpen] = useState(false);
  const [form, setForm] = useState<Partial<JobListing>>({ jobType: "Efetiva" });
  const [search, setSearch] = useState("");

  async function load() {
    try {
      const list = await actor!.getVagas();
      setVagas(list);
    } catch {
      toast.error("Erro ao carregar vagas.");
    }
  }

  // biome-ignore lint/correctness/useExhaustiveDependencies: load is stable
  useEffect(() => {
    if (actor) load();
  }, [actor]);

  async function handleAdd() {
    if (!form.title || !form.company || !form.city) {
      toast.error("Preencha os campos obrigatórios.");
      return;
    }
    try {
      await actor!.addVaga({
        id: crypto.randomUUID(),
        title: form.title ?? "",
        company: form.company ?? "",
        city: form.city ?? "",
        jobType: form.jobType ?? "Efetiva",
        salary: form.salary ?? "A combinar",
        badge: form.badge ?? undefined,
        area: form.area ?? "Geral",
        source: form.source ?? "Manual",
        applyUrl: form.applyUrl ?? "#",
        postedAt: nowNano(),
      });
      toast.success("Vaga adicionada!");
      setOpen(false);
      setForm({ jobType: "Efetiva" });
      load();
    } catch {
      toast.error("Erro ao adicionar vaga.");
    }
  }

  async function handleDelete(id: string) {
    setVagas((v) => v.filter((j) => j.id !== id));
    toast.success("Vaga removida.");
  }

  function isExpired(postedAt: bigint) {
    const posted = Number(postedAt) / 1_000_000;
    return Date.now() - posted > 10 * 24 * 60 * 60 * 1000;
  }

  const filtered = vagas.filter(
    (v) =>
      !search ||
      v.title.toLowerCase().includes(search.toLowerCase()) ||
      v.company.toLowerCase().includes(search.toLowerCase()) ||
      v.city.toLowerCase().includes(search.toLowerCase()),
  );

  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-bold text-[#1a1a1a]">Vagas</h2>
        <Button
          className="bg-[#d7350d] text-white hover:bg-[#c02e0c]"
          onClick={() => setOpen(true)}
          data-ocid="admin.vagas.open_modal_button"
        >
          + Nova Vaga
        </Button>
      </div>

      <div className="mb-3">
        <Input
          placeholder="Buscar por título, empresa ou cidade..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="max-w-sm"
          data-ocid="admin.vagas.search_input"
        />
      </div>

      <div className="bg-white rounded-xl border overflow-hidden shadow-sm">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Título</TableHead>
              <TableHead>Empresa</TableHead>
              <TableHead>Cidade</TableHead>
              <TableHead>Tipo</TableHead>
              <TableHead>Badge</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Data</TableHead>
              <TableHead />
            </TableRow>
          </TableHeader>
          <TableBody>
            {filtered.length === 0 && (
              <TableRow>
                <TableCell
                  colSpan={8}
                  className="text-center text-gray-400 py-8"
                  data-ocid="admin.vagas.empty_state"
                >
                  Nenhuma vaga cadastrada.
                </TableCell>
              </TableRow>
            )}
            {filtered.map((v, i) => {
              const expired = isExpired(v.postedAt);
              const badge = Array.isArray(v.badge) ? v.badge[0] : v.badge;
              return (
                <TableRow key={v.id} data-ocid={`admin.vagas.item.${i + 1}`}>
                  <TableCell className="font-medium">{v.title}</TableCell>
                  <TableCell>{v.company}</TableCell>
                  <TableCell>{v.city}</TableCell>
                  <TableCell>
                    <Badge variant="outline">{v.jobType}</Badge>
                  </TableCell>
                  <TableCell>
                    {badge ? (
                      <Badge className="bg-orange-100 text-orange-700 border-orange-200">
                        {badge}
                      </Badge>
                    ) : (
                      <span className="text-gray-300 text-xs">-</span>
                    )}
                  </TableCell>
                  <TableCell>
                    <Badge
                      className={
                        expired
                          ? "bg-red-100 text-red-700"
                          : "bg-green-100 text-green-700"
                      }
                    >
                      {expired ? "Expirada" : "Ativa"}
                    </Badge>
                  </TableCell>
                  <TableCell>{fmtDate(v.postedAt)}</TableCell>
                  <TableCell>
                    <div className="flex gap-2">
                      <button
                        type="button"
                        className="text-blue-500 hover:text-blue-700 text-xs"
                        onClick={() => toast.info("Vaga aprovada (simulado)")}
                        data-ocid={`admin.vagas.confirm_button.${i + 1}`}
                      >
                        ✔
                      </button>
                      <button
                        type="button"
                        className="text-gray-400 hover:text-gray-600 text-xs"
                        onClick={() => toast.info("Vaga reprovada (simulado)")}
                        data-ocid={`admin.vagas.cancel_button.${i + 1}`}
                      >
                        ✖
                      </button>
                      <button
                        type="button"
                        onClick={() => handleDelete(v.id)}
                        className="text-red-500 hover:text-red-700"
                        data-ocid={`admin.vagas.delete_button.${i + 1}`}
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </div>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent data-ocid="admin.vagas.dialog">
          <DialogHeader>
            <DialogTitle>Nova Vaga</DialogTitle>
          </DialogHeader>
          <div className="space-y-3 py-2 max-h-[60vh] overflow-y-auto pr-1">
            <div>
              <Label>Título *</Label>
              <Input
                value={form.title ?? ""}
                onChange={(e) =>
                  setForm((f) => ({ ...f, title: e.target.value }))
                }
                data-ocid="admin.vagas.input"
              />
            </div>
            <div>
              <Label>Empresa *</Label>
              <Input
                value={form.company ?? ""}
                onChange={(e) =>
                  setForm((f) => ({ ...f, company: e.target.value }))
                }
                data-ocid="admin.vagas.input"
              />
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <Label>Cidade *</Label>
                <Input
                  value={form.city ?? ""}
                  onChange={(e) =>
                    setForm((f) => ({ ...f, city: e.target.value }))
                  }
                  data-ocid="admin.vagas.input"
                />
              </div>
              <div>
                <Label>Tipo</Label>
                <Select
                  value={form.jobType ?? "Efetiva"}
                  onValueChange={(v) => setForm((f) => ({ ...f, jobType: v }))}
                >
                  <SelectTrigger data-ocid="admin.vagas.select">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {[
                      "Efetiva",
                      "Temporária",
                      "Estágio",
                      "Menor Aprendiz",
                      "Remota",
                      "PCD",
                    ].map((t) => (
                      <SelectItem key={t} value={t}>
                        {t}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <Label>Salário</Label>
                <Input
                  value={form.salary ?? ""}
                  placeholder="R$ 2.000"
                  onChange={(e) =>
                    setForm((f) => ({ ...f, salary: e.target.value }))
                  }
                  data-ocid="admin.vagas.input"
                />
              </div>
              <div>
                <Label>Badge</Label>
                <Select
                  value={form.badge ?? ""}
                  onValueChange={(v) =>
                    setForm((f) => ({ ...f, badge: v || undefined }))
                  }
                >
                  <SelectTrigger data-ocid="admin.vagas.select">
                    <SelectValue placeholder="Sem badge" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="">Sem badge</SelectItem>
                    {["Nova", "Urgente", "PCD", "Jovem Aprendiz"].map((b) => (
                      <SelectItem key={b} value={b}>
                        {b}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <Label>Área</Label>
                <Input
                  value={form.area ?? ""}
                  onChange={(e) =>
                    setForm((f) => ({ ...f, area: e.target.value }))
                  }
                  data-ocid="admin.vagas.input"
                />
              </div>
              <div>
                <Label>Fonte</Label>
                <Input
                  value={form.source ?? ""}
                  onChange={(e) =>
                    setForm((f) => ({ ...f, source: e.target.value }))
                  }
                  data-ocid="admin.vagas.input"
                />
              </div>
            </div>
            <div>
              <Label>URL de candidatura</Label>
              <Input
                value={form.applyUrl ?? ""}
                onChange={(e) =>
                  setForm((f) => ({ ...f, applyUrl: e.target.value }))
                }
                data-ocid="admin.vagas.input"
              />
            </div>
          </div>
          <div className="flex justify-end gap-2 pt-2">
            <Button
              variant="outline"
              onClick={() => setOpen(false)}
              data-ocid="admin.vagas.cancel_button"
            >
              Cancelar
            </Button>
            <Button
              className="bg-[#d7350d] text-white hover:bg-[#c02e0c]"
              onClick={handleAdd}
              data-ocid="admin.vagas.submit_button"
            >
              Salvar
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}

/* =========================================================
   CURRÍCULOS TAB
   ========================================================= */
function CurriculosTab() {
  const { actor } = useActor();
  const [resumes, setResumes] = useState<Resume[]>([]);
  const [selected, setSelected] = useState<Resume | null>(null);

  async function load() {
    try {
      const list = await actor!.getAllResumes();
      setResumes(list);
    } catch {
      toast.error("Erro ao carregar currículos.");
    }
  }

  // biome-ignore lint/correctness/useExhaustiveDependencies: load is stable
  useEffect(() => {
    if (actor) load();
  }, [actor]);

  async function togglePdf(r: Resume) {
    try {
      await actor!.updateResumeReportStatus(r.id, !r.pdfGenerated);
      toast.success("Status atualizado.");
      load();
    } catch {
      toast.error("Erro ao atualizar.");
    }
  }

  return (
    <div>
      <h2 className="text-lg font-bold text-[#1a1a1a] mb-4">
        Currículos Submetidos
      </h2>
      <div className="bg-white rounded-xl border overflow-hidden shadow-sm">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Arquivo</TableHead>
              <TableHead>Vaga Desc.</TableHead>
              <TableHead>Score</TableHead>
              <TableHead>ATS</TableHead>
              <TableHead>Aceitação</TableHead>
              <TableHead>Relatório</TableHead>
              <TableHead>PDF</TableHead>
              <TableHead>Data</TableHead>
              <TableHead />
            </TableRow>
          </TableHeader>
          <TableBody>
            {resumes.length === 0 && (
              <TableRow>
                <TableCell
                  colSpan={9}
                  className="text-center text-gray-400 py-8"
                  data-ocid="admin.curriculos.empty_state"
                >
                  Nenhum currículo encontrado.
                </TableCell>
              </TableRow>
            )}
            {resumes.map((r, i) => (
              <TableRow key={r.id} data-ocid={`admin.curriculos.item.${i + 1}`}>
                <TableCell className="font-medium max-w-[160px] truncate">
                  {r.fileName}
                </TableCell>
                <TableCell className="max-w-[120px] truncate text-xs">
                  {r.jobDesc}
                </TableCell>
                <TableCell>{String(r.overallScore)}%</TableCell>
                <TableCell>{String(r.atsScore)}%</TableCell>
                <TableCell>{String(r.acceptanceRate)}%</TableCell>
                <TableCell>
                  <Badge variant={r.reportRequested ? "default" : "outline"}>
                    {r.reportRequested ? "Solicitado" : "Não"}
                  </Badge>
                </TableCell>
                <TableCell>
                  <Badge
                    variant={r.pdfGenerated ? "default" : "secondary"}
                    className="cursor-pointer"
                    onClick={() => togglePdf(r)}
                    data-ocid={`admin.curriculos.toggle.${i + 1}`}
                  >
                    {r.pdfGenerated ? "Gerado" : "Pendente"}
                  </Badge>
                </TableCell>
                <TableCell className="text-xs">
                  {fmtDate(r.createdAt)}
                </TableCell>
                <TableCell>
                  <button
                    type="button"
                    className="text-blue-500 hover:text-blue-700 text-xs underline"
                    onClick={() => setSelected(r)}
                    data-ocid={`admin.curriculos.edit_button.${i + 1}`}
                  >
                    Ver
                  </button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      <Dialog open={!!selected} onOpenChange={() => setSelected(null)}>
        <DialogContent className="max-w-lg" data-ocid="admin.curriculos.dialog">
          <DialogHeader>
            <DialogTitle>{selected?.fileName}</DialogTitle>
          </DialogHeader>
          {selected && (
            <div className="space-y-3 text-sm">
              <div>
                <span className="font-semibold">Competências:</span>
                <ul className="mt-1 list-disc list-inside text-gray-600">
                  {selected.competencies.map((c) => (
                    <li key={c}>{c}</li>
                  ))}
                </ul>
              </div>
              <div>
                <span className="font-semibold">Melhorias Sugeridas:</span>
                <ul className="mt-1 list-disc list-inside text-gray-600">
                  {selected.improvements.map((imp) => (
                    <li key={imp}>{imp}</li>
                  ))}
                </ul>
              </div>
              <div>
                <span className="font-semibold">Dicas LinkedIn:</span>
                <ul className="mt-1 list-disc list-inside text-gray-600">
                  {selected.linkedinTips.map((t) => (
                    <li key={t}>{t}</li>
                  ))}
                </ul>
              </div>
            </div>
          )}
          <div className="flex justify-end">
            <Button
              variant="outline"
              onClick={() => setSelected(null)}
              data-ocid="admin.curriculos.close_button"
            >
              Fechar
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}

/* =========================================================
   DEPOIMENTOS TAB
   ========================================================= */
function DepoimentosTab() {
  const { actor } = useActor();
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);

  async function load() {
    try {
      const list = await actor!.getAllTestimonials();
      setTestimonials(list);
    } catch {
      toast.error("Erro ao carregar depoimentos.");
    }
  }

  // biome-ignore lint/correctness/useExhaustiveDependencies: load is stable
  useEffect(() => {
    if (actor) load();
  }, [actor]);

  async function approve(id: string) {
    try {
      await actor!.approveTestimonial(id);
      toast.success("Depoimento aprovado!");
      load();
    } catch {
      toast.error("Erro ao aprovar.");
    }
  }

  async function remove(id: string) {
    try {
      await actor!.deleteTestimonial(id);
      toast.success("Depoimento excluído.");
      load();
    } catch {
      toast.error("Erro ao excluir.");
    }
  }

  const pending = testimonials.filter((t) => !t.approved);
  const approved = testimonials.filter((t) => t.approved);

  function TestimonialTable({
    items,
    isPending,
  }: { items: Testimonial[]; isPending: boolean }) {
    return (
      <div className="bg-white rounded-xl border overflow-hidden shadow-sm">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Nome</TableHead>
              <TableHead>Profissão</TableHead>
              <TableHead>Cidade</TableHead>
              <TableHead>Depoimento</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Data</TableHead>
              <TableHead />
            </TableRow>
          </TableHeader>
          <TableBody>
            {items.length === 0 && (
              <TableRow>
                <TableCell
                  colSpan={7}
                  className="text-center text-gray-400 py-6"
                  data-ocid="admin.depoimentos.empty_state"
                >
                  {isPending
                    ? "Nenhum depoimento pendente."
                    : "Nenhum depoimento aprovado."}
                </TableCell>
              </TableRow>
            )}
            {items.map((t, i) => (
              <TableRow
                key={t.id}
                className={isPending ? "bg-yellow-50" : ""}
                data-ocid={`admin.depoimentos.item.${i + 1}`}
              >
                <TableCell className="font-medium">{t.name}</TableCell>
                <TableCell>{t.profession}</TableCell>
                <TableCell>{t.city}</TableCell>
                <TableCell className="max-w-[200px] truncate text-xs">
                  {t.text}
                </TableCell>
                <TableCell>
                  <Badge variant={t.approved ? "default" : "secondary"}>
                    {t.approved ? "Aprovado" : "Pendente"}
                  </Badge>
                </TableCell>
                <TableCell className="text-xs">
                  {fmtDate(t.createdAt)}
                </TableCell>
                <TableCell>
                  <div className="flex gap-2">
                    {!t.approved && (
                      <button
                        type="button"
                        className="text-green-600 hover:text-green-800 text-xs font-semibold"
                        onClick={() => approve(t.id)}
                        data-ocid={`admin.depoimentos.confirm_button.${i + 1}`}
                      >
                        Aprovar
                      </button>
                    )}
                    <button
                      type="button"
                      className="text-red-500 hover:text-red-700"
                      onClick={() => remove(t.id)}
                      data-ocid={`admin.depoimentos.delete_button.${i + 1}`}
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <h2 className="text-lg font-bold text-[#1a1a1a]">Depoimentos</h2>
      <div>
        <div className="flex items-center gap-2 mb-3">
          <h3 className="font-semibold text-sm text-gray-700">
            Pendentes de Aprovação
          </h3>
          {pending.length > 0 && (
            <span className="bg-yellow-400 text-yellow-900 text-xs font-bold px-2 py-0.5 rounded-full">
              {pending.length}
            </span>
          )}
        </div>
        <TestimonialTable items={pending} isPending={true} />
      </div>
      <div>
        <h3 className="font-semibold text-sm text-gray-700 mb-3">Aprovados</h3>
        <TestimonialTable items={approved} isPending={false} />
      </div>
    </div>
  );
}

/* =========================================================
   BLOG TAB
   ========================================================= */
function BlogTab() {
  const { actor } = useActor();
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [open, setOpen] = useState(false);
  const [editing, setEditing] = useState<BlogPost | null>(null);
  const [form, setForm] = useState<
    Partial<
      BlogPost & {
        readTime: number;
        status: string;
        scheduledAt: string;
        categories: string;
      }
    >
  >({ published: false, status: "Rascunho" });

  async function load() {
    try {
      const list = await actor!.getAllBlogPosts();
      setPosts(list);
    } catch {
      toast.error("Erro ao carregar posts.");
    }
  }

  // biome-ignore lint/correctness/useExhaustiveDependencies: load is stable
  useEffect(() => {
    if (actor) load();
  }, [actor]);

  function openNew() {
    setEditing(null);
    setForm({ published: false, status: "Rascunho" });
    setOpen(true);
  }
  function openEdit(post: BlogPost) {
    setEditing(post);
    setForm({ ...post, status: post.published ? "Publicado" : "Rascunho" });
    setOpen(true);
  }

  async function handleSave() {
    if (!form.title || !form.content) {
      toast.error("Preencha título e conteúdo.");
      return;
    }
    const now = nowNano();
    const payload: BlogPost = {
      id: editing?.id ?? crypto.randomUUID(),
      title: form.title ?? "",
      summary: form.summary ?? "",
      content: form.content ?? "",
      author: form.author ?? "Admin",
      imageUrl: form.imageUrl ?? "",
      tags: form.tags ?? [],
      published: form.status === "Publicado",
      createdAt: editing?.createdAt ?? now,
      updatedAt: now,
    };
    try {
      if (editing) {
        await actor!.updateBlogPost(payload);
        toast.success("Artigo atualizado!");
      } else {
        await actor!.addBlogPost(payload);
        toast.success("Artigo criado!");
      }
      setOpen(false);
      load();
    } catch {
      toast.error("Erro ao salvar artigo.");
    }
  }

  async function handleDelete(id: string) {
    try {
      await actor!.deleteBlogPost(id);
      toast.success("Artigo excluído.");
      load();
    } catch {
      toast.error("Erro ao excluir.");
    }
  }

  function getStatusBadge(published: boolean) {
    return published ? (
      <Badge className="bg-green-100 text-green-700">Publicado</Badge>
    ) : (
      <Badge variant="outline">Rascunho</Badge>
    );
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-bold text-[#1a1a1a]">Blog</h2>
        <Button
          className="bg-[#d7350d] text-white hover:bg-[#c02e0c]"
          onClick={openNew}
          data-ocid="admin.blog.open_modal_button"
        >
          + Novo Artigo
        </Button>
      </div>
      <div className="bg-white rounded-xl border overflow-hidden shadow-sm">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Título</TableHead>
              <TableHead>Autor</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Tags</TableHead>
              <TableHead>Data</TableHead>
              <TableHead />
            </TableRow>
          </TableHeader>
          <TableBody>
            {posts.length === 0 && (
              <TableRow>
                <TableCell
                  colSpan={6}
                  className="text-center text-gray-400 py-8"
                  data-ocid="admin.blog.empty_state"
                >
                  Nenhum artigo encontrado.
                </TableCell>
              </TableRow>
            )}
            {posts.map((p, i) => (
              <TableRow key={p.id} data-ocid={`admin.blog.item.${i + 1}`}>
                <TableCell className="font-medium">{p.title}</TableCell>
                <TableCell>{p.author}</TableCell>
                <TableCell>{getStatusBadge(p.published)}</TableCell>
                <TableCell className="text-xs text-gray-400">
                  {p.tags.slice(0, 3).join(", ")}
                </TableCell>
                <TableCell className="text-xs">
                  {fmtDate(p.createdAt)}
                </TableCell>
                <TableCell>
                  <div className="flex gap-2">
                    <button
                      type="button"
                      className="text-blue-500 hover:text-blue-700 text-xs underline"
                      onClick={() => openEdit(p)}
                      data-ocid={`admin.blog.edit_button.${i + 1}`}
                    >
                      Editar
                    </button>
                    <button
                      type="button"
                      className="text-red-500 hover:text-red-700"
                      onClick={() => handleDelete(p.id)}
                      data-ocid={`admin.blog.delete_button.${i + 1}`}
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="max-w-2xl" data-ocid="admin.blog.dialog">
          <DialogHeader>
            <DialogTitle>
              {editing ? "Editar Artigo" : "Novo Artigo"}
            </DialogTitle>
          </DialogHeader>
          <div className="space-y-3 max-h-[60vh] overflow-y-auto pr-1">
            <div>
              <Label>Título *</Label>
              <Input
                value={form.title ?? ""}
                onChange={(e) =>
                  setForm((f) => ({ ...f, title: e.target.value }))
                }
                data-ocid="admin.blog.input"
              />
            </div>
            <div>
              <Label>Resumo</Label>
              <Input
                value={form.summary ?? ""}
                onChange={(e) =>
                  setForm((f) => ({ ...f, summary: e.target.value }))
                }
                data-ocid="admin.blog.input"
              />
            </div>
            <div>
              <Label>Conteúdo *</Label>
              <Textarea
                className="min-h-[120px]"
                value={form.content ?? ""}
                onChange={(e) =>
                  setForm((f) => ({ ...f, content: e.target.value }))
                }
                data-ocid="admin.blog.textarea"
              />
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <Label>Autor</Label>
                <Input
                  value={form.author ?? ""}
                  onChange={(e) =>
                    setForm((f) => ({ ...f, author: e.target.value }))
                  }
                  data-ocid="admin.blog.input"
                />
              </div>
              <div>
                <Label>URL da Imagem</Label>
                <Input
                  value={form.imageUrl ?? ""}
                  onChange={(e) =>
                    setForm((f) => ({ ...f, imageUrl: e.target.value }))
                  }
                  data-ocid="admin.blog.input"
                />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <Label>Status</Label>
                <Select
                  value={form.status ?? "Rascunho"}
                  onValueChange={(v) => setForm((f) => ({ ...f, status: v }))}
                >
                  <SelectTrigger data-ocid="admin.blog.select">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Rascunho">Rascunho</SelectItem>
                    <SelectItem value="Agendado">Agendado</SelectItem>
                    <SelectItem value="Publicado">Publicado</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label>Tempo de leitura (min)</Label>
                <Input
                  type="number"
                  value={form.readTime ?? ""}
                  onChange={(e) =>
                    setForm((f) => ({ ...f, readTime: Number(e.target.value) }))
                  }
                  data-ocid="admin.blog.input"
                />
              </div>
            </div>
            {form.status === "Agendado" && (
              <div>
                <Label>Data de agendamento</Label>
                <Input
                  type="date"
                  value={form.scheduledAt ?? ""}
                  onChange={(e) =>
                    setForm((f) => ({ ...f, scheduledAt: e.target.value }))
                  }
                  data-ocid="admin.blog.input"
                />
              </div>
            )}
            <div>
              <Label>Categorias (separadas por vírgula)</Label>
              <Input
                value={form.categories ?? ""}
                onChange={(e) =>
                  setForm((f) => ({ ...f, categories: e.target.value }))
                }
                placeholder="Carreira, Mercado de Trabalho"
                data-ocid="admin.blog.input"
              />
            </div>
            <div>
              <Label>Tags (separadas por vírgula)</Label>
              <Input
                value={(form.tags ?? []).join(", ")}
                onChange={(e) =>
                  setForm((f) => ({
                    ...f,
                    tags: e.target.value
                      .split(",")
                      .map((t) => t.trim())
                      .filter(Boolean),
                  }))
                }
                data-ocid="admin.blog.input"
              />
            </div>
          </div>
          <div className="flex justify-end gap-2 pt-2">
            <Button
              variant="outline"
              onClick={() => setOpen(false)}
              data-ocid="admin.blog.cancel_button"
            >
              Cancelar
            </Button>
            <Button
              className="bg-[#d7350d] text-white hover:bg-[#c02e0c]"
              onClick={handleSave}
              data-ocid="admin.blog.submit_button"
            >
              Salvar
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}

/* =========================================================
   MENTORIA TAB
   ========================================================= */
interface MentoriaPackage {
  id: string;
  title: string;
  description: string;
  price: number;
  installments: string;
  benefits: string;
  active: boolean;
}

const SAMPLE_SOLICITACOES = [
  {
    id: "1",
    name: "Ana Paula Silva",
    email: "ana@email.com",
    package: "Mentoria Individual",
    date: "15/03/2026",
    status: "Pago",
  },
  {
    id: "2",
    name: "Carlos Eduardo",
    email: "carlos@email.com",
    package: "Pacote Completo",
    date: "14/03/2026",
    status: "Pendente",
  },
  {
    id: "3",
    name: "Maria José",
    email: "maria@email.com",
    package: "Mentoria Individual",
    date: "12/03/2026",
    status: "Pago",
  },
];

function MentoriaTab() {
  const [packages, setPackages] = useState<MentoriaPackage[]>([
    {
      id: "1",
      title: "Mentoria Individual",
      description: "Sessão 1:1 focada no seu perfil profissional",
      price: 297,
      installments: "3x R$ 99",
      benefits:
        "Análise de currículo\nOrientção de carreira\nPreparation de entrevistas",
      active: true,
    },
    {
      id: "2",
      title: "Pacote Completo",
      description: "Mentoria completa com acompanhamento por 30 dias",
      price: 497,
      installments: "5x R$ 99,40",
      benefits:
        "Tudo da Mentoria Individual\nLinkedIn Review\nAcompanhamento semanal",
      active: true,
    },
  ]);
  const [open, setOpen] = useState(false);
  const [editingPkg, setEditingPkg] = useState<MentoriaPackage | null>(null);
  const [pkgForm, setPkgForm] = useState<Partial<MentoriaPackage>>({
    active: true,
  });
  const [subTab, setSubTab] = useState<
    "pacotes" | "solicitacoes" | "depoimentos"
  >("pacotes");
  const [pagamentoHabilitado, setPagamentoHabilitado] = useState(false);

  function openNewPkg() {
    setEditingPkg(null);
    setPkgForm({ active: true });
    setOpen(true);
  }
  function openEditPkg(p: MentoriaPackage) {
    setEditingPkg(p);
    setPkgForm({ ...p });
    setOpen(true);
  }

  function savePkg() {
    if (!pkgForm.title) {
      toast.error("Preencha o título.");
      return;
    }
    const pkg: MentoriaPackage = {
      id: editingPkg?.id ?? crypto.randomUUID(),
      title: pkgForm.title ?? "",
      description: pkgForm.description ?? "",
      price: pkgForm.price ?? 0,
      installments: pkgForm.installments ?? "",
      benefits: pkgForm.benefits ?? "",
      active: pkgForm.active ?? true,
    };
    if (editingPkg) {
      setPackages((prev) => prev.map((p) => (p.id === pkg.id ? pkg : p)));
      toast.success("Pacote atualizado!");
    } else {
      setPackages((prev) => [...prev, pkg]);
      toast.success("Pacote adicionado!");
    }
    setOpen(false);
  }

  return (
    <div className="space-y-4">
      <h2 className="text-lg font-bold text-[#1a1a1a]">Mentoria</h2>

      <div className="flex gap-2 border-b pb-2">
        {(["pacotes", "solicitacoes", "depoimentos"] as const).map((t) => (
          <button
            type="button"
            key={t}
            className={`text-sm px-3 py-1.5 rounded-t-lg font-medium capitalize transition-colors ${
              subTab === t
                ? "bg-[#d7350d] text-white"
                : "text-gray-500 hover:text-gray-800"
            }`}
            onClick={() => setSubTab(t)}
            data-ocid={"admin.mentoria.tab"}
          >
            {t === "pacotes"
              ? "Pacotes"
              : t === "solicitacoes"
                ? "Solicitações"
                : "Depoimentos"}
          </button>
        ))}
      </div>

      {subTab === "pacotes" && (
        <div>
          <div className="bg-white rounded-xl border p-4 shadow-sm flex items-center justify-between mb-4">
            <div>
              <p className="font-semibold text-gray-900">Pagamento Online</p>
              <p className="text-sm text-gray-500">
                Habilita o botão de pagamento nos pacotes de mentoria
              </p>
            </div>
            <div className="flex items-center gap-2">
              {pagamentoHabilitado ? (
                <div className="flex items-center gap-2">
                  <span className="text-sm text-green-600 font-medium">
                    Pagamento Habilitado ✓
                  </span>
                  <Button
                    variant="outline"
                    size="sm"
                    data-ocid="admin.mentoria.payment_toggle_button"
                    onClick={() => {
                      setPagamentoHabilitado(false);
                      toast.info("Pagamento desabilitado.");
                    }}
                  >
                    Desabilitar
                  </Button>
                </div>
              ) : (
                <Button
                  className="bg-green-600 text-white hover:bg-green-700"
                  size="sm"
                  data-ocid="admin.mentoria.payment_toggle_button"
                  onClick={() => {
                    setPagamentoHabilitado(true);
                    toast.success("Pagamento habilitado para mentoria!");
                  }}
                >
                  <CreditCard className="w-4 h-4 mr-2" />
                  Habilitar Pagamento
                </Button>
              )}
            </div>
          </div>
          <div className="flex justify-end mb-3">
            <Button
              className="bg-[#d7350d] text-white hover:bg-[#c02e0c]"
              onClick={openNewPkg}
              data-ocid="admin.mentoria.open_modal_button"
            >
              + Novo Pacote
            </Button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {packages.map((p, i) => (
              <div
                key={p.id}
                className="bg-white rounded-xl border p-5 shadow-sm"
                data-ocid={`admin.mentoria.item.${i + 1}`}
              >
                <div className="flex justify-between items-start mb-2">
                  <h3 className="font-bold text-gray-900">{p.title}</h3>
                  <Badge
                    className={
                      p.active
                        ? "bg-green-100 text-green-700"
                        : "bg-gray-100 text-gray-500"
                    }
                  >
                    {p.active ? "Ativo" : "Inativo"}
                  </Badge>
                </div>
                <p className="text-sm text-gray-600 mb-2">{p.description}</p>
                <p className="text-lg font-bold text-[#d7350d]">
                  R$ {p.price.toFixed(2).replace(".", ",")}{" "}
                  <span className="text-sm font-normal text-gray-400">
                    ({p.installments})
                  </span>
                </p>
                <div className="flex gap-2 mt-3">
                  <button
                    type="button"
                    className="text-blue-500 text-xs underline hover:text-blue-700"
                    onClick={() => openEditPkg(p)}
                    data-ocid={`admin.mentoria.edit_button.${i + 1}`}
                  >
                    Editar
                  </button>
                  <button
                    type="button"
                    className="text-red-500 text-xs underline hover:text-red-700"
                    onClick={() =>
                      setPackages((prev) => prev.filter((x) => x.id !== p.id))
                    }
                    data-ocid={`admin.mentoria.delete_button.${i + 1}`}
                  >
                    Excluir
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {subTab === "solicitacoes" && (
        <div className="bg-white rounded-xl border overflow-hidden shadow-sm">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Nome</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Pacote</TableHead>
                <TableHead>Data</TableHead>
                <TableHead>Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {SAMPLE_SOLICITACOES.map((s, i) => (
                <TableRow key={s.id} data-ocid={`admin.mentoria.item.${i + 1}`}>
                  <TableCell className="font-medium">{s.name}</TableCell>
                  <TableCell>{s.email}</TableCell>
                  <TableCell>{s.package}</TableCell>
                  <TableCell>{s.date}</TableCell>
                  <TableCell>
                    <Badge
                      className={
                        s.status === "Pago"
                          ? "bg-green-100 text-green-700"
                          : "bg-yellow-100 text-yellow-700"
                      }
                    >
                      {s.status}
                    </Badge>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      )}

      {subTab === "depoimentos" && (
        <div className="bg-white rounded-xl border p-6 shadow-sm">
          <p className="text-sm text-gray-500">
            Depoimentos específicos de mentoria aparecerão aqui. Por enquanto,
            os depoimentos gerais são gerenciados na aba Depoimentos.
          </p>
        </div>
      )}

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent data-ocid="admin.mentoria.dialog">
          <DialogHeader>
            <DialogTitle>
              {editingPkg ? "Editar Pacote" : "Novo Pacote de Mentoria"}
            </DialogTitle>
          </DialogHeader>
          <div className="space-y-3 max-h-[60vh] overflow-y-auto pr-1">
            <div>
              <Label>Título *</Label>
              <Input
                value={pkgForm.title ?? ""}
                onChange={(e) =>
                  setPkgForm((f) => ({ ...f, title: e.target.value }))
                }
                data-ocid="admin.mentoria.input"
              />
            </div>
            <div>
              <Label>Descrição</Label>
              <Textarea
                value={pkgForm.description ?? ""}
                onChange={(e) =>
                  setPkgForm((f) => ({ ...f, description: e.target.value }))
                }
                data-ocid="admin.mentoria.textarea"
              />
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <Label>Preço (R$)</Label>
                <Input
                  type="number"
                  value={pkgForm.price ?? ""}
                  onChange={(e) =>
                    setPkgForm((f) => ({ ...f, price: Number(e.target.value) }))
                  }
                  data-ocid="admin.mentoria.input"
                />
              </div>
              <div>
                <Label>Parcelamento</Label>
                <Input
                  value={pkgForm.installments ?? ""}
                  placeholder="3x R$ 99"
                  onChange={(e) =>
                    setPkgForm((f) => ({ ...f, installments: e.target.value }))
                  }
                  data-ocid="admin.mentoria.input"
                />
              </div>
            </div>
            <div>
              <Label>Benefícios (um por linha)</Label>
              <Textarea
                value={pkgForm.benefits ?? ""}
                onChange={(e) =>
                  setPkgForm((f) => ({ ...f, benefits: e.target.value }))
                }
                data-ocid="admin.mentoria.textarea"
              />
            </div>
            <div className="flex items-center gap-2">
              <Checkbox
                id="pkg-active"
                checked={pkgForm.active ?? true}
                onCheckedChange={(v) =>
                  setPkgForm((f) => ({ ...f, active: !!v }))
                }
                data-ocid="admin.mentoria.checkbox"
              />
              <Label htmlFor="pkg-active">Ativo</Label>
            </div>
          </div>
          <div className="flex justify-end gap-2 pt-2">
            <Button
              variant="outline"
              onClick={() => setOpen(false)}
              data-ocid="admin.mentoria.cancel_button"
            >
              Cancelar
            </Button>
            <Button
              className="bg-[#d7350d] text-white hover:bg-[#c02e0c]"
              onClick={savePkg}
              data-ocid="admin.mentoria.submit_button"
            >
              Salvar
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}

/* =========================================================
   IMAGENS TAB
   ========================================================= */
function ImagensTab() {
  const [images, setImages] = useState([
    {
      key: "hero",
      label: "Banner Hero",
      path: "/assets/generated/hero.jpg",
      note: "",
    },
    {
      key: "idealizador",
      label: "Foto do Idealizador",
      path: "/assets/uploads/josemar-019d2b40-e5dc-748b-9b35-de99b615a3ab-1.png",
      note: "",
    },
    {
      key: "logo",
      label: "Logo",
      path: "",
      note: "Texto estilizado no header",
    },
  ]);

  function handleFileChange(key: string, file: File) {
    const url = URL.createObjectURL(file);
    setImages((prev) =>
      prev.map((img) =>
        img.key === key
          ? { ...img, path: url, note: `Alterado: ${file.name}` }
          : img,
      ),
    );
    toast.success(`Imagem "${key}" atualizada (prévia local).`);
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-bold text-[#1a1a1a]">
          Gerenciamento de Imagens
        </h2>
        <label
          data-ocid="admin.imagens.import_button"
          className="cursor-pointer"
        >
          <input
            type="file"
            accept="image/*"
            multiple
            className="hidden"
            onChange={(e) => {
              const files = Array.from(e.target.files ?? []);
              if (!files.length) return;
              setImages((prev) => [
                ...prev,
                ...files.map((file) => ({
                  key: crypto.randomUUID(),
                  label: file.name,
                  path: URL.createObjectURL(file),
                  note: "Importada",
                })),
              ]);
              toast.success(`${files.length} imagem(ns) importada(s)!`);
            }}
          />
          <Button
            asChild={false}
            className="bg-[#d7350d] text-white hover:bg-[#c02e0c]"
            onClick={() => {}}
          >
            📥 Importar Imagens
          </Button>
        </label>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {images.map((img) => (
          <div
            key={img.key}
            className="bg-white rounded-xl border p-5 shadow-sm"
          >
            <h3 className="font-semibold text-gray-900 mb-2">{img.label}</h3>
            {img.path ? (
              <img
                src={img.path}
                alt={img.label}
                className="w-full h-32 object-cover rounded-lg mb-3 border"
              />
            ) : (
              <div className="w-full h-32 rounded-lg mb-3 border bg-gray-50 flex items-center justify-center text-gray-400 text-sm">
                {img.note}
              </div>
            )}
            <p className="text-xs text-gray-400 mb-3 truncate">
              {img.path || img.note}
            </p>
            <label
              className="cursor-pointer inline-flex items-center gap-2 px-3 py-1.5 rounded-lg border border-gray-300 text-sm text-gray-600 hover:border-[#d7350d] hover:text-[#d7350d] transition-colors"
              data-ocid="admin.imagens.upload_button"
            >
              📂 Alterar Imagem
              <input
                type="file"
                accept="image/*"
                className="hidden"
                onChange={(e) => {
                  const f = e.target.files?.[0];
                  if (f) handleFileChange(img.key, f);
                }}
              />
            </label>
          </div>
        ))}
      </div>
    </div>
  );
}

/* =========================================================
   NEWSLETTER TAB
   ========================================================= */
function NewsletterTab() {
  const [nlSubTab, setNlSubTab] = useState<"inscritos" | "enviar">("inscritos");
  const [nlSubject, setNlSubject] = useState("");
  const [nlMessage, setNlMessage] = useState("");
  const [showPreview, setShowPreview] = useState(false);
  const [subscribers, setSubscribers] = useState([
    {
      id: "1",
      email: "joao.silva@gmail.com",
      name: "João Silva",
      date: "01/03/2026",
      status: "Ativo",
    },
    {
      id: "2",
      email: "maria.santos@hotmail.com",
      name: "Maria Santos",
      date: "05/03/2026",
      status: "Ativo",
    },
    {
      id: "3",
      email: "carlos.rj@yahoo.com",
      name: "Carlos",
      date: "08/03/2026",
      status: "Ativo",
    },
    {
      id: "4",
      email: "ana.lima@gmail.com",
      name: "Ana Lima",
      date: "10/03/2026",
      status: "Cancelado",
    },
    {
      id: "5",
      email: "pedro.tech@gmail.com",
      name: "Pedro Alves",
      date: "12/03/2026",
      status: "Ativo",
    },
    {
      id: "6",
      email: "lucia.mello@outlook.com",
      name: "Lúcia Mello",
      date: "14/03/2026",
      status: "Ativo",
    },
    {
      id: "7",
      email: "roberto.valengo@gmail.com",
      name: "Roberto V.",
      date: "15/03/2026",
      status: "Ativo",
    },
    {
      id: "8",
      email: "fernanda.rj@gmail.com",
      name: "Fernanda Costa",
      date: "16/03/2026",
      status: "Ativo",
    },
    {
      id: "9",
      email: "gabriel.souza@gmail.com",
      name: "Gabriel S.",
      date: "18/03/2026",
      status: "Cancelado",
    },
    {
      id: "10",
      email: "renata.bds@gmail.com",
      name: "Renata BDS",
      date: "20/03/2026",
      status: "Ativo",
    },
  ]);

  function removeSubscriber(id: string) {
    setSubscribers((prev) => prev.filter((s) => s.id !== id));
    toast.success("Inscrito removido com sucesso!");
  }

  function exportCSV() {
    const header = "Email,Nome,Data,Status";
    const rows = subscribers.map(
      (s) => `${s.email},${s.name},${s.date},${s.status}`,
    );
    const csv = [header, ...rows].join("\n");
    const blob = new Blob([csv], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "inscritos-newsletter.csv";
    a.click();
    URL.revokeObjectURL(url);
    toast.success("CSV exportado!");
  }

  return (
    <div className="space-y-4">
      <h2 className="text-lg font-bold text-[#1a1a1a]">Newsletter</h2>
      <div className="flex gap-2 border-b pb-2">
        {(["inscritos", "enviar"] as const).map((t) => (
          <button
            type="button"
            key={t}
            className={`text-sm px-3 py-1.5 rounded-t-lg font-medium capitalize transition-colors ${
              nlSubTab === t
                ? "bg-[#d7350d] text-white"
                : "text-gray-500 hover:text-gray-800"
            }`}
            onClick={() => setNlSubTab(t)}
            data-ocid="admin.newsletter.tab"
          >
            {t === "inscritos" ? "Inscritos" : "Enviar Newsletter"}
          </button>
        ))}
      </div>

      {nlSubTab === "inscritos" && (
        <div>
          <div className="flex justify-between items-center mb-3">
            <p className="text-sm text-gray-500">
              {subscribers.filter((s) => s.status === "Ativo").length} inscritos
              ativos
            </p>
            <Button
              variant="outline"
              className="border-[#d7350d] text-[#d7350d] hover:bg-[#d7350d] hover:text-white text-xs"
              onClick={exportCSV}
              data-ocid="admin.newsletter.button"
            >
              Exportar CSV
            </Button>
          </div>
          <div className="bg-white rounded-xl border overflow-hidden shadow-sm">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Email</TableHead>
                  <TableHead>Nome</TableHead>
                  <TableHead>Data de Inscrição</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Ações</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {subscribers.map((s, i) => (
                  <TableRow
                    key={s.id}
                    data-ocid={`admin.newsletter.item.${i + 1}`}
                  >
                    <TableCell>{s.email}</TableCell>
                    <TableCell>{s.name}</TableCell>
                    <TableCell>{s.date}</TableCell>
                    <TableCell>
                      <Badge
                        className={
                          s.status === "Ativo"
                            ? "bg-green-100 text-green-700"
                            : "bg-gray-100 text-gray-500"
                        }
                      >
                        {s.status}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <button
                        type="button"
                        onClick={() => removeSubscriber(s.id)}
                        className="text-red-500 hover:text-red-700 transition-colors"
                        title="Excluir inscrito"
                        data-ocid={`admin.newsletter.delete_button.${i + 1}`}
                      >
                        <Trash2 size={16} />
                      </button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </div>
      )}

      {nlSubTab === "enviar" && (
        <div className="bg-white rounded-xl border p-6 shadow-sm space-y-4 max-w-2xl">
          <div>
            <Label>Assunto</Label>
            <Input
              value={nlSubject}
              onChange={(e) => setNlSubject(e.target.value)}
              placeholder="Novas vagas da semana!"
              data-ocid="admin.newsletter.input"
            />
          </div>
          <div>
            <Label>Mensagem</Label>
            <Textarea
              className="min-h-[160px]"
              value={nlMessage}
              onChange={(e) => setNlMessage(e.target.value)}
              placeholder="Olá! Confira as vagas desta semana..."
              data-ocid="admin.newsletter.textarea"
            />
          </div>
          <div className="rounded-lg border border-gray-200 bg-gray-50 p-3 text-xs text-gray-600">
            <p className="font-semibold mb-1">
              Rodapé automático incluído em cada envio:
            </p>
            <p>
              &ldquo;Para cancelar sua inscrição neste boletim informativo,
              responda este e-mail com o assunto <strong>DESCADASTRAR</strong>{" "}
              ou clique aqui: [link de descadastro]. Seu pedido será processado
              em até 48 horas.&rdquo;
            </p>
          </div>
          <div className="flex gap-2">
            <Button
              variant="outline"
              onClick={() => setShowPreview(!showPreview)}
              data-ocid="admin.newsletter.secondary_button"
            >
              Pré-visualizar
            </Button>
            <Button
              className="bg-[#d7350d] text-white hover:bg-[#c02e0c]"
              onClick={() =>
                toast.success("Newsletter enviada com sucesso! (simulado)")
              }
              data-ocid="admin.newsletter.submit_button"
            >
              Enviar Newsletter
            </Button>
          </div>
          {showPreview && (
            <div className="border rounded-xl p-5 bg-gray-50">
              <div className="text-xs text-gray-400 mb-2 uppercase tracking-wide">
                Prévia
              </div>
              <h4 className="font-bold text-gray-900 mb-2">
                {nlSubject || "(sem assunto)"}
              </h4>
              <p className="text-sm text-gray-700 whitespace-pre-wrap">
                {nlMessage || "(sem conteúdo)"}
              </p>
              <hr className="my-3 border-gray-200" />
              <p className="text-xs text-gray-400 italic">
                Para cancelar sua inscrição, responda este e-mail com o assunto
                DESCADASTRAR.
              </p>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

/* =========================================================
   LOJA TAB
   ========================================================= */
function LojaTab() {
  const { actor } = useActor();
  const [products, setProducts] = useState<Product[]>([]);
  const [open, setOpen] = useState(false);
  const [editing, setEditing] = useState<Product | null>(null);
  const [form, setForm] = useState<Partial<Product>>({ available: true });
  const [payConf, setPayConf] = useState<Partial<PaymentConfig>>({});

  async function load() {
    try {
      const [list, conf] = await Promise.all([
        actor!.getAllProducts(),
        actor!.getPaymentConfig(),
      ]);
      setProducts(list);
      if (conf) setPayConf(conf as PaymentConfig);
    } catch {
      toast.error("Erro ao carregar loja.");
    }
  }

  // biome-ignore lint/correctness/useExhaustiveDependencies: load is stable
  useEffect(() => {
    if (actor) load();
  }, [actor]);

  function openNew() {
    setEditing(null);
    setForm({ available: true });
    setOpen(true);
  }
  function openEdit(p: Product) {
    setEditing(p);
    setForm({ ...p });
    setOpen(true);
  }

  async function handleSave() {
    if (!form.name) {
      toast.error("Preencha o nome do produto.");
      return;
    }
    const payload: Product = {
      id: editing?.id ?? crypto.randomUUID(),
      name: form.name ?? "",
      description: form.description ?? "",
      price: form.price ?? 0,
      imageUrl: form.imageUrl ?? "",
      category: form.category ?? "Geral",
      available: form.available ?? true,
      paymentLink: form.paymentLink ?? "",
      createdAt: editing?.createdAt ?? nowNano(),
    };
    try {
      if (editing) {
        await actor!.updateProduct(payload);
        toast.success("Produto atualizado!");
      } else {
        await actor!.addProduct(payload);
        toast.success("Produto adicionado!");
      }
      setOpen(false);
      load();
    } catch {
      toast.error("Erro ao salvar produto.");
    }
  }

  async function handleDelete(id: string) {
    try {
      await actor!.deleteProduct(id);
      toast.success("Produto excluído.");
      load();
    } catch {
      toast.error("Erro ao excluir.");
    }
  }

  async function savePayment() {
    try {
      await actor!.savePaymentConfig({
        mercadoPagoKey: payConf.mercadoPagoKey ?? "",
        paypalClientId: payConf.paypalClientId ?? "",
        pixKey: payConf.pixKey ?? "",
        updatedAt: nowNano(),
      });
      toast.success("Configurações de pagamento salvas!");
    } catch {
      toast.error("Erro ao salvar config.");
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-bold text-[#1a1a1a]">Produtos – Loja</h2>
        <Button
          className="bg-[#d7350d] text-white hover:bg-[#c02e0c]"
          onClick={openNew}
          data-ocid="admin.loja.open_modal_button"
        >
          + Novo Produto
        </Button>
      </div>
      <div className="bg-white rounded-xl border overflow-hidden shadow-sm">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Nome</TableHead>
              <TableHead>Categoria</TableHead>
              <TableHead>Preço</TableHead>
              <TableHead>Disponível</TableHead>
              <TableHead>Data</TableHead>
              <TableHead />
            </TableRow>
          </TableHeader>
          <TableBody>
            {products.length === 0 && (
              <TableRow>
                <TableCell
                  colSpan={6}
                  className="text-center text-gray-400 py-8"
                  data-ocid="admin.loja.empty_state"
                >
                  Nenhum produto cadastrado.
                </TableCell>
              </TableRow>
            )}
            {products.map((p, i) => (
              <TableRow key={p.id} data-ocid={`admin.loja.item.${i + 1}`}>
                <TableCell className="font-medium">{p.name}</TableCell>
                <TableCell>{p.category}</TableCell>
                <TableCell>R$ {p.price.toFixed(2).replace(".", ",")}</TableCell>
                <TableCell>
                  <Badge variant={p.available ? "default" : "secondary"}>
                    {p.available ? "Sim" : "Não"}
                  </Badge>
                </TableCell>
                <TableCell className="text-xs">
                  {fmtDate(p.createdAt)}
                </TableCell>
                <TableCell>
                  <div className="flex gap-2">
                    <button
                      type="button"
                      className="text-blue-500 hover:text-blue-700 text-xs underline"
                      onClick={() => openEdit(p)}
                      data-ocid={`admin.loja.edit_button.${i + 1}`}
                    >
                      Editar
                    </button>
                    <button
                      type="button"
                      className="text-red-500 hover:text-red-700"
                      onClick={() => handleDelete(p.id)}
                      data-ocid={`admin.loja.delete_button.${i + 1}`}
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      <div className="bg-white rounded-xl border p-5 shadow-sm">
        <h3 className="font-semibold text-[#1a1a1a] mb-4">
          Configurações de Pagamento
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <Label>Chave Mercado Pago</Label>
            <Input
              value={payConf.mercadoPagoKey ?? ""}
              onChange={(e) =>
                setPayConf((c) => ({ ...c, mercadoPagoKey: e.target.value }))
              }
              data-ocid="admin.loja.input"
            />
          </div>
          <div>
            <Label>PayPal Client ID</Label>
            <Input
              value={payConf.paypalClientId ?? ""}
              onChange={(e) =>
                setPayConf((c) => ({ ...c, paypalClientId: e.target.value }))
              }
              data-ocid="admin.loja.input"
            />
          </div>
          <div>
            <Label>Chave PIX</Label>
            <Input
              value={payConf.pixKey ?? ""}
              onChange={(e) =>
                setPayConf((c) => ({ ...c, pixKey: e.target.value }))
              }
              data-ocid="admin.loja.input"
            />
          </div>
        </div>
        <div className="mt-4 flex justify-end">
          <Button
            className="bg-[#d7350d] text-white hover:bg-[#c02e0c]"
            onClick={savePayment}
            data-ocid="admin.loja.save_button"
          >
            Salvar Configurações
          </Button>
        </div>
      </div>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent data-ocid="admin.loja.dialog">
          <DialogHeader>
            <DialogTitle>
              {editing ? "Editar Produto" : "Novo Produto"}
            </DialogTitle>
          </DialogHeader>
          <div className="space-y-3 max-h-[60vh] overflow-y-auto pr-1">
            <div>
              <Label>Nome *</Label>
              <Input
                value={form.name ?? ""}
                onChange={(e) =>
                  setForm((f) => ({ ...f, name: e.target.value }))
                }
                data-ocid="admin.loja.input"
              />
            </div>
            <div>
              <Label>Descrição</Label>
              <Textarea
                value={form.description ?? ""}
                onChange={(e) =>
                  setForm((f) => ({ ...f, description: e.target.value }))
                }
                data-ocid="admin.loja.textarea"
              />
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <Label>Preço (R$)</Label>
                <Input
                  type="number"
                  value={form.price ?? ""}
                  onChange={(e) =>
                    setForm((f) => ({
                      ...f,
                      price: Number.parseFloat(e.target.value) || 0,
                    }))
                  }
                  data-ocid="admin.loja.input"
                />
              </div>
              <div>
                <Label>Categoria</Label>
                <Input
                  value={form.category ?? ""}
                  onChange={(e) =>
                    setForm((f) => ({ ...f, category: e.target.value }))
                  }
                  data-ocid="admin.loja.input"
                />
              </div>
            </div>
            <div>
              <Label>URL da Imagem</Label>
              <Input
                value={form.imageUrl ?? ""}
                onChange={(e) =>
                  setForm((f) => ({ ...f, imageUrl: e.target.value }))
                }
                data-ocid="admin.loja.input"
              />
            </div>
            <div>
              <Label>Link de Pagamento</Label>
              <Input
                value={form.paymentLink ?? ""}
                onChange={(e) =>
                  setForm((f) => ({ ...f, paymentLink: e.target.value }))
                }
                data-ocid="admin.loja.input"
              />
            </div>
            <div className="flex items-center gap-2">
              <Checkbox
                id="avail"
                checked={form.available ?? true}
                onCheckedChange={(v) =>
                  setForm((f) => ({ ...f, available: !!v }))
                }
                data-ocid="admin.loja.checkbox"
              />
              <Label htmlFor="avail">Disponível para venda</Label>
            </div>
          </div>
          <div className="flex justify-end gap-2 pt-2">
            <Button
              variant="outline"
              onClick={() => setOpen(false)}
              data-ocid="admin.loja.cancel_button"
            >
              Cancelar
            </Button>
            <Button
              className="bg-[#d7350d] text-white hover:bg-[#c02e0c]"
              onClick={handleSave}
              data-ocid="admin.loja.submit_button"
            >
              Salvar
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}

/* =========================================================
   FONTES DE VAGAS TAB
   ========================================================= */
function FontesTab() {
  const { actor } = useActor();
  const [sources, setSources] = useState<JobSource[]>([]);
  const [open, setOpen] = useState(false);
  const [editing, setEditing] = useState<JobSource | null>(null);
  const [form, setForm] = useState<Partial<JobSource>>({ active: true });

  async function load() {
    try {
      const list = await actor!.getJobSources();
      setSources(list);
    } catch {
      toast.error("Erro ao carregar fontes.");
    }
  }

  // biome-ignore lint/correctness/useExhaustiveDependencies: load is stable
  useEffect(() => {
    if (actor) load();
  }, [actor]);

  function openNew() {
    setEditing(null);
    setForm({ active: true });
    setOpen(true);
  }
  function openEdit(s: JobSource) {
    setEditing(s);
    setForm({ ...s });
    setOpen(true);
  }

  async function handleSave() {
    if (!form.name || !form.url) {
      toast.error("Nome e URL são obrigatórios.");
      return;
    }
    const payload: JobSource = {
      id: editing?.id ?? crypto.randomUUID(),
      name: form.name ?? "",
      url: form.url ?? "",
      region: form.region ?? "Sul Fluminense",
      active: form.active ?? true,
      notes: form.notes ?? "",
      createdAt: editing?.createdAt ?? nowNano(),
    };
    try {
      if (editing) {
        await actor!.updateJobSource(payload);
        toast.success("Fonte atualizada!");
      } else {
        await actor!.addJobSource(payload);
        toast.success("Fonte adicionada!");
      }
      setOpen(false);
      load();
    } catch {
      toast.error("Erro ao salvar fonte.");
    }
  }

  async function handleDelete(id: string) {
    try {
      await actor!.deleteJobSource(id);
      toast.success("Fonte excluída.");
      load();
    } catch {
      toast.error("Erro ao excluir.");
    }
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-bold text-[#1a1a1a]">Fontes de Vagas</h2>
        <Button
          className="bg-[#d7350d] text-white hover:bg-[#c02e0c]"
          onClick={openNew}
          data-ocid="admin.fontes.open_modal_button"
        >
          + Nova Fonte
        </Button>
      </div>
      <div className="bg-white rounded-xl border overflow-hidden shadow-sm">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Nome</TableHead>
              <TableHead>URL</TableHead>
              <TableHead>Região</TableHead>
              <TableHead>Ativa</TableHead>
              <TableHead>Notas</TableHead>
              <TableHead />
            </TableRow>
          </TableHeader>
          <TableBody>
            {sources.length === 0 && (
              <TableRow>
                <TableCell
                  colSpan={6}
                  className="text-center text-gray-400 py-8"
                  data-ocid="admin.fontes.empty_state"
                >
                  Nenhuma fonte cadastrada.
                </TableCell>
              </TableRow>
            )}
            {sources.map((s, i) => (
              <TableRow key={s.id} data-ocid={`admin.fontes.item.${i + 1}`}>
                <TableCell className="font-medium">{s.name}</TableCell>
                <TableCell className="max-w-[200px] truncate text-xs">
                  <a
                    href={s.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-500 hover:underline"
                  >
                    {s.url}
                  </a>
                </TableCell>
                <TableCell>{s.region}</TableCell>
                <TableCell>
                  <Badge variant={s.active ? "default" : "secondary"}>
                    {s.active ? "Ativa" : "Inativa"}
                  </Badge>
                </TableCell>
                <TableCell className="text-xs max-w-[140px] truncate">
                  {s.notes}
                </TableCell>
                <TableCell>
                  <div className="flex gap-2">
                    <button
                      type="button"
                      className="text-blue-500 hover:text-blue-700 text-xs underline"
                      onClick={() => openEdit(s)}
                      data-ocid={`admin.fontes.edit_button.${i + 1}`}
                    >
                      Editar
                    </button>
                    <button
                      type="button"
                      className="text-red-500 hover:text-red-700"
                      onClick={() => handleDelete(s.id)}
                      data-ocid={`admin.fontes.delete_button.${i + 1}`}
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent data-ocid="admin.fontes.dialog">
          <DialogHeader>
            <DialogTitle>
              {editing ? "Editar Fonte" : "Nova Fonte de Vagas"}
            </DialogTitle>
          </DialogHeader>
          <div className="space-y-3">
            <div>
              <Label>Nome *</Label>
              <Input
                value={form.name ?? ""}
                onChange={(e) =>
                  setForm((f) => ({ ...f, name: e.target.value }))
                }
                data-ocid="admin.fontes.input"
              />
            </div>
            <div>
              <Label>URL *</Label>
              <Input
                value={form.url ?? ""}
                onChange={(e) =>
                  setForm((f) => ({ ...f, url: e.target.value }))
                }
                data-ocid="admin.fontes.input"
              />
            </div>
            <div>
              <Label>Região</Label>
              <Input
                value={form.region ?? ""}
                onChange={(e) =>
                  setForm((f) => ({ ...f, region: e.target.value }))
                }
                data-ocid="admin.fontes.input"
              />
            </div>
            <div>
              <Label>Notas</Label>
              <Textarea
                value={form.notes ?? ""}
                onChange={(e) =>
                  setForm((f) => ({ ...f, notes: e.target.value }))
                }
                data-ocid="admin.fontes.textarea"
              />
            </div>
            <div className="flex items-center gap-2">
              <Checkbox
                id="fonte-active"
                checked={form.active ?? true}
                onCheckedChange={(v) => setForm((f) => ({ ...f, active: !!v }))}
                data-ocid="admin.fontes.checkbox"
              />
              <Label htmlFor="fonte-active">Fonte ativa</Label>
            </div>
          </div>
          <div className="flex justify-end gap-2 pt-2">
            <Button
              variant="outline"
              onClick={() => setOpen(false)}
              data-ocid="admin.fontes.cancel_button"
            >
              Cancelar
            </Button>
            <Button
              className="bg-[#d7350d] text-white hover:bg-[#c02e0c]"
              onClick={handleSave}
              data-ocid="admin.fontes.submit_button"
            >
              Salvar
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}

/* =========================================================
   CONFIGURAÇÕES TAB
   ========================================================= */
function ConfiguracoesTab() {
  const { actor } = useActor();
  const [updating, setUpdating] = useState(false);
  const [configSubTab, setConfigSubTab] = useState<
    "geral" | "coleta" | "usuarios" | "integracoes"
  >("geral");

  // Site info
  const [siteTitle, setSiteTitle] = useState("Bom Dia Segunda");
  const [siteDesc, setSiteDesc] = useState(
    "A principal plataforma de vagas do Sul Fluminense",
  );
  const [siteEmail, setSiteEmail] = useState("contato@bomdiasegunda.com.br");
  const [whatsapp, setWhatsapp] = useState("+55 24 99200-1100");

  // Coleta
  const [keywords, setKeywords] = useState(
    "vagas emprego Sul Fluminense, trabalho Resende, empregos Barra Mansa",
  );
  const collectionLogs = [
    { date: "23/03/2026", status: "Sucesso", count: 47 },
    { date: "16/03/2026", status: "Sucesso", count: 52 },
    { date: "09/03/2026", status: "Parcial", count: 31 },
  ];

  // Usuarios
  const [adminUsers] = useState([
    {
      id: "1",
      user: "admin",
      email: "admin@bomdiasegunda.com.br",
      role: "Super Admin",
    },
  ]);

  // Integracoes
  const [socialLinks, setSocialLinks] = useState({
    instagram: "https://instagram.com/bomdiasegunda",
    facebook: "https://facebook.com/bomdiasegunda",
    youtube: "https://youtube.com/@bomdiasegunda",
    linkedin: "https://linkedin.com/company/bomdiasegunda",
    tiktok: "https://tiktok.com/@bomdiasegunda",
    substack: "https://bomdiasegunda.substack.com",
    spotify: "https://open.spotify.com/show/bomdiasegunda",
    kwai: "https://kwai.com/@bomdiasegunda",
  });

  async function triggerUpdate() {
    setUpdating(true);
    try {
      await actor!.triggerWeeklyUpdate();
      toast.success("Atualização semanal disparada com sucesso!");
    } catch {
      toast.error("Erro ao disparar atualização.");
    } finally {
      setUpdating(false);
    }
  }

  return (
    <div className="space-y-4">
      <h2 className="text-lg font-bold text-[#1a1a1a]">Configurações</h2>

      <div className="flex gap-2 border-b pb-2 flex-wrap">
        {(["geral", "coleta", "usuarios", "integracoes"] as const).map((t) => (
          <button
            type="button"
            key={t}
            className={`text-sm px-3 py-1.5 rounded-t-lg font-medium capitalize transition-colors ${
              configSubTab === t
                ? "bg-[#d7350d] text-white"
                : "text-gray-500 hover:text-gray-800"
            }`}
            onClick={() => setConfigSubTab(t)}
            data-ocid="admin.config.tab"
          >
            {t === "geral"
              ? "Geral"
              : t === "coleta"
                ? "Coleta de Vagas"
                : t === "usuarios"
                  ? "Usuários Admin"
                  : "Integrações"}
          </button>
        ))}
      </div>

      {configSubTab === "geral" && (
        <div className="bg-white rounded-xl border p-6 shadow-sm space-y-4 max-w-xl">
          <h3 className="font-semibold text-gray-800 mb-2">
            Informações Gerais do Site
          </h3>
          <div>
            <Label>Título do Site</Label>
            <Input
              value={siteTitle}
              onChange={(e) => setSiteTitle(e.target.value)}
              data-ocid="admin.config.input"
            />
          </div>
          <div>
            <Label>Descrição SEO</Label>
            <Textarea
              value={siteDesc}
              onChange={(e) => setSiteDesc(e.target.value)}
              data-ocid="admin.config.textarea"
            />
          </div>
          <div>
            <Label>Email de Contato</Label>
            <Input
              value={siteEmail}
              onChange={(e) => setSiteEmail(e.target.value)}
              data-ocid="admin.config.input"
            />
          </div>
          <div>
            <Label>Número WhatsApp</Label>
            <Input
              value={whatsapp}
              onChange={(e) => setWhatsapp(e.target.value)}
              data-ocid="admin.config.input"
            />
          </div>
          <Button
            className="bg-[#d7350d] text-white hover:bg-[#c02e0c]"
            onClick={() => toast.success("Configurações salvas!")}
            data-ocid="admin.config.save_button"
          >
            Salvar
          </Button>
        </div>
      )}

      {configSubTab === "coleta" && (
        <div className="space-y-4 max-w-2xl">
          <div className="bg-white rounded-xl border p-6 shadow-sm space-y-4">
            <h3 className="font-semibold text-gray-800">
              Configurações de Coleta
            </h3>
            <div className="space-y-2 text-sm">
              <div className="flex items-center gap-2">
                <span className="font-medium text-gray-600">Frequência:</span>
                <span className="text-gray-500">
                  Diária — inicia às 23:50 e conclui ao compilar todas as vagas
                </span>
                <span className="bg-green-100 text-green-700 text-xs px-2 py-0.5 rounded-full">
                  Agendado
                </span>
              </div>
              <div className="flex items-center gap-2">
                <span className="font-medium text-gray-600">
                  Período atual:
                </span>
                <span className="text-[#d7350d] font-medium">
                  {(() => {
                    const now = new Date();
                    const day = now.getDay();
                    const start = new Date(now);
                    start.setDate(now.getDate() - day);
                    start.setHours(0, 0, 0, 0);
                    const end = new Date(start);
                    end.setDate(start.getDate() + 6);
                    const fmt = (d: Date) =>
                      d.toLocaleDateString("pt-BR", {
                        day: "2-digit",
                        month: "2-digit",
                        year: "numeric",
                      });
                    return `${fmt(start)} (dom) a ${fmt(end)} (sáb)`;
                  })()}
                </span>
              </div>
              <div className="flex items-center gap-2">
                <span className="font-medium text-gray-600">
                  Geolocalização:
                </span>
                <span className="text-gray-500">
                  Vagas restritas às cidades cadastradas (exceto remotas)
                </span>
              </div>
              <div className="flex items-center gap-2">
                <span className="font-medium text-gray-600">
                  Tag automática:
                </span>
                <span className="bg-green-100 text-green-700 text-xs px-2.5 py-0.5 rounded-full border border-green-200 font-semibold">
                  Nova
                </span>
                <span className="text-gray-500">
                  aplicada em vagas coletadas na última rodada
                </span>
              </div>
            </div>
            <div>
              <Label>Palavras-chave prioritárias</Label>
              <Textarea
                value={keywords}
                onChange={(e) => setKeywords(e.target.value)}
                className="min-h-[80px]"
                data-ocid="admin.config.textarea"
              />
            </div>
            <Button
              className="bg-[#d7350d] text-white hover:bg-[#c02e0c] flex items-center gap-2"
              onClick={triggerUpdate}
              disabled={updating}
              data-ocid="admin.config.primary_button"
            >
              <RefreshCw
                className={`w-4 h-4 ${updating ? "animate-spin" : ""}`}
              />
              {updating ? "Atualizando..." : "Disparar Atualização Manual"}
            </Button>
          </div>

          <div className="bg-white rounded-xl border p-6 shadow-sm">
            <h3 className="font-semibold text-gray-800 mb-4">Logs de Coleta</h3>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Data</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Vagas coletadas</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {collectionLogs.map((log) => (
                  <TableRow key={log.date}>
                    <TableCell>{log.date}</TableCell>
                    <TableCell>
                      <Badge
                        className={
                          log.status === "Sucesso"
                            ? "bg-green-100 text-green-700"
                            : "bg-yellow-100 text-yellow-700"
                        }
                      >
                        {log.status}
                      </Badge>
                    </TableCell>
                    <TableCell>{log.count}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </div>
      )}

      {configSubTab === "usuarios" && (
        <div className="space-y-4 max-w-2xl">
          <div className="bg-white rounded-xl border overflow-hidden shadow-sm">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Usuário</TableHead>
                  <TableHead>Email</TableHead>
                  <TableHead>Perfil</TableHead>
                  <TableHead />
                </TableRow>
              </TableHeader>
              <TableBody>
                {adminUsers.map((u, i) => (
                  <TableRow key={u.id} data-ocid={`admin.config.item.${i + 1}`}>
                    <TableCell className="font-medium">{u.user}</TableCell>
                    <TableCell>{u.email}</TableCell>
                    <TableCell>
                      <Badge>{u.role}</Badge>
                    </TableCell>
                    <TableCell>
                      <button
                        type="button"
                        className="text-xs text-gray-400 hover:text-red-500"
                        onClick={() =>
                          toast.info("Função disponível em breve.")
                        }
                      >
                        Editar
                      </button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
          <div className="bg-white rounded-xl border p-5 shadow-sm">
            <h3 className="font-semibold text-gray-700 mb-3">
              Adicionar Administrador
            </h3>
            <div className="grid grid-cols-2 gap-3 mb-3">
              <div>
                <Label>Usuário</Label>
                <Input placeholder="admin2" data-ocid="admin.config.input" />
              </div>
              <div>
                <Label>Email</Label>
                <Input
                  placeholder="admin@email.com"
                  data-ocid="admin.config.input"
                />
              </div>
            </div>
            <Button
              variant="outline"
              onClick={() => toast.info("Funcionalidade disponível em breve.")}
              data-ocid="admin.config.button"
            >
              Adicionar Admin
            </Button>
          </div>
        </div>
      )}

      {configSubTab === "integracoes" && (
        <div className="space-y-4 max-w-2xl">
          <div className="bg-white rounded-xl border p-6 shadow-sm space-y-3">
            <h3 className="font-semibold text-gray-800 mb-2">Redes Sociais</h3>
            {(Object.entries(socialLinks) as [string, string][]).map(
              ([key, val]) => (
                <div key={key}>
                  <Label className="capitalize">{key}</Label>
                  <Input
                    value={val}
                    onChange={(e) =>
                      setSocialLinks((s) => ({ ...s, [key]: e.target.value }))
                    }
                    data-ocid="admin.config.input"
                  />
                </div>
              ),
            )}
            <Button
              className="bg-[#d7350d] text-white hover:bg-[#c02e0c]"
              onClick={() => toast.success("Links salvos!")}
              data-ocid="admin.config.save_button"
            >
              Salvar Links
            </Button>
          </div>

          <div className="bg-white rounded-xl border p-5 shadow-sm">
            <h3 className="font-semibold text-gray-800 mb-1">
              WhatsApp Business
            </h3>
            <p className="text-xs text-gray-400 mb-3">
              Número do botão flutuante
            </p>
            <Input
              value={whatsapp}
              className="max-w-xs"
              readOnly
              data-ocid="admin.config.input"
            />
            <p className="text-xs text-gray-400 mt-1">Altere na aba Geral.</p>
          </div>

          <div className="bg-white rounded-xl border p-5 shadow-sm">
            <h3 className="font-semibold text-gray-800 mb-3">
              Pagamentos (Loja e Mentoria)
            </h3>
            <p className="text-xs text-gray-400">
              Configure as chaves de pagamento na aba Loja.
            </p>
          </div>
        </div>
      )}

      {/* Back to site */}
      <div className="pt-4">
        <button
          type="button"
          className="text-xs text-gray-400 hover:text-gray-600 flex items-center gap-1"
          onClick={() => {
            window.location.hash = "";
          }}
        >
          <X className="w-3 h-3" /> Sair do painel e voltar ao site
        </button>
      </div>
    </div>
  );
}
