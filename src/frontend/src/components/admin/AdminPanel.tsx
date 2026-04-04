import type { Resume as BaseResume } from "@/backend";
import type {
  BlogPost,
  JobListing,
  JobSource,
  PaymentConfig,
  Product,
  ShoppingCustomer,
  Testimonial,
} from "@/backend.d";

// Extend with CRM fields
interface Resume extends BaseResume {
  nome?: string;
  email?: string;
  whatsapp?: string;
  status?: string;
  relatorioSimples?: string;
  compraRelatorio?: boolean;
  relatorioCompleto?: string;
}
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
import { type CidadeInfo, cidades as cidadesData } from "@/data/cidades";
import { useActor } from "@/hooks/useActor";
import {
  BookOpen,
  Briefcase,
  Check,
  CreditCard,
  Eye,
  FileText,
  Globe,
  Image,
  Layers,
  LogOut,
  Mail,
  MapPin,
  MessageSquare,
  Music,
  Pencil,
  RefreshCw,
  Search,
  Settings,
  ShoppingBag,
  ShoppingCart,
  Star,
  Trash2,
  TrendingUp,
  Upload,
  UserPlus,
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
  | "audio"
  | "cidades"
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
    id: "audio",
    label: "Áudio / Música",
    icon: <Music className="w-4 h-4" />,
  },
  {
    id: "cidades",
    label: "Cidades",
    icon: <MapPin className="w-4 h-4" />,
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
          {activeTab === "audio" && <AudioTab />}
          {activeTab === "cidades" && <CidadesTab />}
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
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("todos");
  const [confirmDelete, setConfirmDelete] = useState<string | null>(null);

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

  async function handleUpdateStatus(id: string, status: string) {
    // Simulate locally since backend method is frontend-only
    setResumes((prev) => prev.map((r) => (r.id === id ? { ...r, status } : r)));
    toast.success(`Status atualizado para "${status}".`);
    try {
      await actor!.updateResumeReportStatus(id, status === "enviado");
    } catch {
      // non-blocking
    }
  }

  async function handleDeleteData(id: string) {
    setResumes((prev) =>
      prev.map((r) =>
        r.id === id
          ? {
              ...r,
              status: "excluido",
              relatorioSimples: "",
              relatorioCompleto: "",
              fileName: "",
              jobDesc: "",
            }
          : r,
      ),
    );
    setConfirmDelete(null);
    toast.success("Registro excluído. Dados pessoais preservados.");
    try {
      await actor!.updateResumeReportStatus(id, false);
    } catch {
      // non-blocking
    }
  }

  const filtered = resumes.filter((r) => {
    const matchSearch =
      !search ||
      (r.nome ?? "").toLowerCase().includes(search.toLowerCase()) ||
      (r.email ?? "").toLowerCase().includes(search.toLowerCase());
    const matchStatus =
      statusFilter === "todos" || (r.status ?? "ativo") === statusFilter;
    return matchSearch && matchStatus;
  });

  const total = resumes.length;
  const ativos = resumes.filter(
    (r) => (r.status ?? "ativo") === "ativo",
  ).length;
  const enviados = resumes.filter((r) => r.status === "enviado").length;
  const cancelados = resumes.filter((r) => r.status === "cancelado").length;

  const statusColors: Record<string, string> = {
    ativo: "bg-blue-100 text-blue-700 border-blue-200",
    enviado: "bg-green-100 text-green-700 border-green-200",
    cancelado: "bg-orange-100 text-orange-700 border-orange-200",
    excluido: "bg-gray-100 text-gray-500 border-gray-200",
  };

  const statusLabels: Record<string, string> = {
    ativo: "Ativo",
    enviado: "Enviado",
    cancelado: "Cancelado",
    excluido: "Excluído",
  };

  const STATUS_FILTERS = [
    { value: "todos", label: "Todos" },
    { value: "ativo", label: "Ativo" },
    { value: "enviado", label: "Enviado" },
    { value: "cancelado", label: "Cancelado" },
    { value: "excluido", label: "Excluído" },
  ];

  return (
    <div className="space-y-5">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-lg font-bold text-[#1a1a1a]">
            CRM — Currículos Submetidos
          </h2>
          <p className="text-xs text-gray-400 mt-0.5">
            O sistema impede cadastros duplicados por e-mail — apenas um
            registro por candidato.
          </p>
        </div>
        <button
          type="button"
          className="text-xs text-blue-600 hover:text-blue-800 flex items-center gap-1 font-medium"
          onClick={load}
          data-ocid="admin.curriculos.button"
        >
          <RefreshCw className="w-3.5 h-3.5" /> Atualizar
        </button>
      </div>

      {/* Stat cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        {[
          {
            label: "Total",
            value: total,
            color: "text-gray-700",
            bg: "bg-gray-50 border-gray-200",
          },
          {
            label: "Ativos",
            value: ativos,
            color: "text-blue-700",
            bg: "bg-blue-50 border-blue-200",
          },
          {
            label: "Enviados",
            value: enviados,
            color: "text-green-700",
            bg: "bg-green-50 border-green-200",
          },
          {
            label: "Cancelados",
            value: cancelados,
            color: "text-orange-700",
            bg: "bg-orange-50 border-orange-200",
          },
        ].map((stat, i) => (
          <div
            key={stat.label}
            className={`rounded-xl border p-4 ${stat.bg}`}
            data-ocid={`admin.curriculos.card.${i + 1}`}
          >
            <div className={`text-3xl font-black ${stat.color}`}>
              {stat.value}
            </div>
            <div className="text-xs text-gray-500 mt-1 font-medium">
              {stat.label}
            </div>
          </div>
        ))}
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1 max-w-xs">
          <Users className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
          <input
            type="text"
            placeholder="Buscar por nome ou e-mail…"
            className="w-full pl-9 pr-3 py-2 text-sm border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#d7350d]/30 border-gray-200"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            data-ocid="admin.curriculos.search_input"
          />
        </div>
        <div className="flex gap-2 flex-wrap">
          {STATUS_FILTERS.map((f) => (
            <button
              key={f.value}
              type="button"
              onClick={() => setStatusFilter(f.value)}
              className={`px-3 py-1.5 rounded-full text-xs font-semibold border transition-colors ${
                statusFilter === f.value
                  ? "bg-[#d7350d] text-white border-[#d7350d]"
                  : "bg-white text-gray-600 border-gray-200 hover:border-[#d7350d] hover:text-[#d7350d]"
              }`}
              data-ocid="admin.curriculos.tab"
            >
              {f.label}
            </button>
          ))}
        </div>
      </div>

      {/* Table */}
      <div className="bg-white rounded-xl border overflow-x-auto shadow-sm">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Nome</TableHead>
              <TableHead>E-mail</TableHead>
              <TableHead>WhatsApp</TableHead>
              <TableHead>Currículo</TableHead>
              <TableHead>Rel. Simples</TableHead>
              <TableHead>Compra</TableHead>
              <TableHead>Rel. Completo</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Data</TableHead>
              <TableHead>Ações</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filtered.length === 0 && (
              <TableRow>
                <TableCell
                  colSpan={10}
                  className="text-center text-gray-400 py-10"
                  data-ocid="admin.curriculos.empty_state"
                >
                  Nenhum registro encontrado.
                </TableCell>
              </TableRow>
            )}
            {filtered.map((r, i) => {
              const status = r.status ?? "ativo";
              const isExcluido = status === "excluido";
              return (
                <TableRow
                  key={r.id}
                  className={isExcluido ? "opacity-50" : ""}
                  data-ocid={`admin.curriculos.item.${i + 1}`}
                >
                  <TableCell className="font-medium max-w-[120px] truncate text-sm">
                    {r.nome || <span className="text-gray-300">—</span>}
                  </TableCell>
                  <TableCell className="max-w-[140px] truncate text-xs text-gray-600">
                    {r.email || <span className="text-gray-300">—</span>}
                  </TableCell>
                  <TableCell className="text-xs text-gray-600 whitespace-nowrap">
                    {r.whatsapp || <span className="text-gray-300">—</span>}
                  </TableCell>
                  <TableCell className="text-xs max-w-[100px] truncate">
                    {isExcluido || !r.fileName ? (
                      <span className="text-gray-300">—</span>
                    ) : (
                      r.fileName
                    )}
                  </TableCell>
                  <TableCell>
                    {isExcluido || !r.relatorioSimples ? (
                      <span className="text-gray-300 text-xs">—</span>
                    ) : (
                      <span className="text-xs text-green-600 font-medium">
                        ✓ Gerado
                      </span>
                    )}
                  </TableCell>
                  <TableCell>
                    {r.compraRelatorio ? (
                      <span className="text-xs bg-green-100 text-green-700 px-2 py-0.5 rounded-full font-semibold">
                        Comprado
                      </span>
                    ) : (
                      <span className="text-xs text-gray-400">Não</span>
                    )}
                  </TableCell>
                  <TableCell>
                    {isExcluido || !r.relatorioCompleto ? (
                      <span className="text-gray-300 text-xs">—</span>
                    ) : (
                      <span className="text-xs text-blue-600 font-medium">
                        ✓ Disponível
                      </span>
                    )}
                  </TableCell>
                  <TableCell>
                    <span
                      className={`text-xs px-2 py-0.5 rounded-full border font-semibold ${statusColors[status] ?? statusColors.ativo}`}
                    >
                      {statusLabels[status] ?? status}
                    </span>
                  </TableCell>
                  <TableCell className="text-xs whitespace-nowrap">
                    {fmtDate(r.createdAt)}
                  </TableCell>
                  <TableCell>
                    <div className="flex gap-1 items-center flex-wrap">
                      {/* Ver */}
                      <button
                        type="button"
                        className="text-blue-500 hover:text-blue-700 p-1 rounded hover:bg-blue-50 transition-colors"
                        title="Ver detalhes"
                        onClick={() => setSelected(r)}
                        data-ocid={`admin.curriculos.edit_button.${i + 1}`}
                      >
                        <Eye className="w-3.5 h-3.5" />
                      </button>
                      {!isExcluido && status !== "enviado" && (
                        <button
                          type="button"
                          className="text-xs px-2 py-1 rounded bg-green-100 text-green-700 hover:bg-green-200 font-semibold transition-colors whitespace-nowrap"
                          onClick={() => handleUpdateStatus(r.id, "enviado")}
                          data-ocid={`admin.curriculos.confirm_button.${i + 1}`}
                        >
                          Enviado
                        </button>
                      )}
                      {!isExcluido && status !== "cancelado" && (
                        <button
                          type="button"
                          className="text-xs px-2 py-1 rounded bg-orange-100 text-orange-700 hover:bg-orange-200 font-semibold transition-colors whitespace-nowrap"
                          onClick={() => handleUpdateStatus(r.id, "cancelado")}
                          data-ocid={`admin.curriculos.cancel_button.${i + 1}`}
                        >
                          Cancelado
                        </button>
                      )}
                      {!isExcluido && (
                        <button
                          type="button"
                          className="text-red-400 hover:text-red-600 p-1 rounded hover:bg-red-50 transition-colors"
                          title="Excluir dados"
                          onClick={() => setConfirmDelete(r.id)}
                          data-ocid={`admin.curriculos.delete_button.${i + 1}`}
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      )}
                    </div>
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </div>

      {/* Detail Dialog */}
      <Dialog open={!!selected} onOpenChange={() => setSelected(null)}>
        <DialogContent
          className="max-w-2xl max-h-[85vh] overflow-y-auto"
          data-ocid="admin.curriculos.dialog"
        >
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <Users className="w-5 h-5 text-[#d7350d]" />
              Detalhes do Candidato
            </DialogTitle>
          </DialogHeader>
          {selected && (
            <div className="space-y-4 text-sm">
              {/* Candidate info */}
              <div className="bg-gray-50 rounded-xl border p-4 space-y-2">
                <div className="flex items-center justify-between">
                  <h4 className="font-semibold text-gray-700">
                    Dados Pessoais
                  </h4>
                  <span
                    className={`text-xs px-2 py-0.5 rounded-full border font-semibold ${statusColors[selected.status ?? "ativo"] ?? statusColors.ativo}`}
                  >
                    {statusLabels[selected.status ?? "ativo"] ??
                      selected.status}
                  </span>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-sm">
                  <div>
                    <span className="text-gray-500 text-xs font-medium">
                      Nome
                    </span>
                    <p className="font-semibold">{selected.nome || "—"}</p>
                  </div>
                  <div>
                    <span className="text-gray-500 text-xs font-medium">
                      E-mail
                    </span>
                    <p className="font-semibold break-all">
                      {selected.email || "—"}
                    </p>
                  </div>
                  <div>
                    <span className="text-gray-500 text-xs font-medium">
                      WhatsApp
                    </span>
                    <p className="font-semibold">{selected.whatsapp || "—"}</p>
                  </div>
                  <div>
                    <span className="text-gray-500 text-xs font-medium">
                      Arquivo
                    </span>
                    <p className="font-semibold text-xs truncate">
                      {selected.fileName || "—"}
                    </p>
                  </div>
                </div>
              </div>

              {/* Scores */}
              <div className="bg-gray-50 rounded-xl border p-4">
                <h4 className="font-semibold text-gray-700 mb-3">Pontuações</h4>
                <div className="flex gap-6 flex-wrap">
                  <div className="text-center">
                    <div className="text-2xl font-black text-[#d7350d]">
                      {String(selected.overallScore)}
                    </div>
                    <div className="text-xs text-gray-500">Score Geral</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-black text-blue-600">
                      {String(selected.atsScore)}
                    </div>
                    <div className="text-xs text-gray-500">ATS</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-black text-amber-600">
                      {String(selected.acceptanceRate)}%
                    </div>
                    <div className="text-xs text-gray-500">Aceitação</div>
                  </div>
                </div>
              </div>

              {/* Relatório Simples */}
              {selected.relatorioSimples &&
                (selected.status ?? "ativo") !== "excluido" && (
                  <div className="border rounded-xl overflow-hidden">
                    <div className="bg-gray-100 px-4 py-2 flex items-center justify-between">
                      <span className="font-semibold text-xs text-gray-700">
                        Relatório Simples (HTML)
                      </span>
                    </div>
                    <div
                      className="max-h-64 overflow-y-auto p-3 text-xs bg-white"
                      // biome-ignore lint/security/noDangerouslySetInnerHtml: controlled HTML report
                      dangerouslySetInnerHTML={{
                        __html: selected.relatorioSimples,
                      }}
                    />
                  </div>
                )}

              {/* Compra e Relatório Completo */}
              {selected.compraRelatorio && (
                <div className="bg-green-50 border border-green-200 rounded-xl px-4 py-3 flex items-center gap-2">
                  <span className="text-green-600 font-bold text-sm">✓</span>
                  <span className="text-green-700 font-semibold text-sm">
                    Relatório Completo Comprado
                  </span>
                </div>
              )}
              {selected.relatorioCompleto &&
                (selected.status ?? "ativo") !== "excluido" && (
                  <div className="border rounded-xl overflow-hidden">
                    <div className="bg-blue-50 px-4 py-2">
                      <span className="font-semibold text-xs text-blue-700">
                        Relatório Completo (5 págs)
                      </span>
                    </div>
                    <div
                      className="max-h-64 overflow-y-auto p-3 text-xs bg-white"
                      // biome-ignore lint/security/noDangerouslySetInnerHtml: controlled HTML report
                      dangerouslySetInnerHTML={{
                        __html: selected.relatorioCompleto,
                      }}
                    />
                  </div>
                )}

              {/* Competências */}
              {selected.competencies?.length > 0 && (
                <div>
                  <h4 className="font-semibold text-gray-700 mb-2">
                    Competências
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {selected.competencies.map((c) => (
                      <span
                        key={c}
                        className="text-xs bg-green-50 text-green-700 border border-green-200 px-2 py-0.5 rounded-full"
                      >
                        {c}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* Melhorias */}
              {selected.improvements?.length > 0 && (
                <div>
                  <h4 className="font-semibold text-gray-700 mb-2">
                    Sugestões de Melhoria
                  </h4>
                  <ol className="space-y-1 list-decimal list-inside">
                    {selected.improvements.map((imp) => (
                      <li key={imp} className="text-xs text-gray-600">
                        {imp}
                      </li>
                    ))}
                  </ol>
                </div>
              )}

              {/* LinkedIn tips */}
              {selected.linkedinTips?.length > 0 && (
                <div>
                  <h4 className="font-semibold text-gray-700 mb-2">
                    Dicas LinkedIn
                  </h4>
                  <ul className="space-y-1">
                    {selected.linkedinTips.map((t) => (
                      <li key={t} className="text-xs text-gray-600 flex gap-2">
                        <span className="text-blue-500">→</span>
                        {t}
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              <button
                type="button"
                className="w-full py-2 rounded-lg border border-gray-200 text-sm text-gray-600 hover:bg-gray-50 transition-colors"
                onClick={() => setSelected(null)}
                data-ocid="admin.curriculos.close_button"
              >
                Fechar
              </button>
            </div>
          )}
        </DialogContent>
      </Dialog>

      {/* Confirm Delete Dialog */}
      <Dialog
        open={!!confirmDelete}
        onOpenChange={() => setConfirmDelete(null)}
      >
        <DialogContent className="max-w-sm" data-ocid="admin.curriculos.modal">
          <DialogHeader>
            <DialogTitle>Confirmar Exclusão</DialogTitle>
          </DialogHeader>
          <p className="text-sm text-gray-600">
            Ao excluir, o currículo e os relatórios serão removidos. Os dados
            cadastrais (nome, e-mail, WhatsApp) serão mantidos conforme a LGPD.
          </p>
          <div className="flex gap-3 mt-2">
            <button
              type="button"
              className="flex-1 py-2 rounded-lg border text-sm text-gray-600 hover:bg-gray-50 transition-colors"
              onClick={() => setConfirmDelete(null)}
              data-ocid="admin.curriculos.cancel_button"
            >
              Cancelar
            </button>
            <button
              type="button"
              className="flex-1 py-2 rounded-lg bg-red-500 text-white text-sm font-semibold hover:bg-red-600 transition-colors"
              onClick={() => confirmDelete && handleDeleteData(confirmDelete)}
              data-ocid="admin.curriculos.confirm_button"
            >
              Excluir Dados
            </button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}

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

  async function handleTogglePublished(post: BlogPost) {
    const updated = {
      ...post,
      published: !post.published,
      updatedAt: nowNano(),
    };
    try {
      await actor!.updateBlogPost(updated);
      toast.success(
        updated.published ? "Artigo publicado!" : "Artigo despublicado!",
      );
      load();
    } catch {
      toast.error("Erro ao atualizar artigo.");
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
                      className={`text-xs px-2 py-0.5 rounded font-medium border transition-colors ${
                        p.published
                          ? "border-orange-400 text-orange-600 hover:bg-orange-50"
                          : "border-green-500 text-green-600 hover:bg-green-50"
                      }`}
                      onClick={() => handleTogglePublished(p)}
                      data-ocid={`admin.blog.toggle_button.${i + 1}`}
                    >
                      {p.published ? "Desabilitar" : "Habilitar"}
                    </button>
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
                        className="flex items-center gap-1 text-xs px-2 py-1 rounded border border-red-400 text-red-600 hover:bg-red-50 transition-colors font-medium"
                        title="Excluir inscrito"
                        data-ocid={`admin.newsletter.delete_button.${i + 1}`}
                      >
                        <Trash2 size={12} />
                        Excluir
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
   SHOPPING CLIENTES CRM
   ========================================================= */

const mockCustomers: ShoppingCustomer[] = [
  {
    id: "c1",
    nome: "Ana Paula Ferreira",
    email: "ana.ferreira@email.com",
    whatsapp: "(24) 99123-4567",
    telefone: "(24) 3344-5566",
    cpf: "123.456.789-00",
    logradouro: "Rua das Flores",
    numero: "123",
    complemento: "Apto 4",
    bairro: "Centro",
    cidade: "Volta Redonda",
    estado: "RJ",
    cep: "27255-000",
    produtoId: "p1",
    produtoNome: "Relatório Completo de Currículo",
    valorCompra: 19.9,
    status: "ativo",
    dataPedido: "2026-04-01",
    createdAt: BigInt(Date.now()),
  },
  {
    id: "c2",
    nome: "Carlos Eduardo Silva",
    email: "carlos.silva@email.com",
    whatsapp: "(24) 98765-4321",
    telefone: "(24) 3322-1100",
    cpf: "987.654.321-00",
    logradouro: "Av. Getúlio Vargas",
    numero: "500",
    complemento: "",
    bairro: "Vila Santa Cecília",
    cidade: "Volta Redonda",
    estado: "RJ",
    cep: "27260-000",
    produtoId: "p2",
    produtoNome: "E-book: Minha Melhor Receita de Currículo",
    valorCompra: 29.9,
    status: "concluido",
    dataPedido: "2026-03-28",
    createdAt: BigInt(Date.now() - 86400000),
  },
  {
    id: "c3",
    nome: "Fernanda Costa",
    email: "fernanda.costa@email.com",
    whatsapp: "(24) 97654-3210",
    telefone: "(24) 3311-2200",
    cpf: "456.789.123-00",
    logradouro: "Rua Presidente Vargas",
    numero: "77",
    complemento: "Casa",
    bairro: "Jardim Belvedere",
    cidade: "Resende",
    estado: "RJ",
    cep: "27500-000",
    produtoId: "p3",
    produtoNome: "Mentoria Primeiro Emprego",
    valorCompra: 197.0,
    status: "cancelado",
    dataPedido: "2026-03-25",
    createdAt: BigInt(Date.now() - 172800000),
  },
];

function maskCpf(cpf: string): string {
  const digits = cpf.replace(/\D/g, "");
  if (digits.length < 11) return cpf;
  return `***.***.*${digits.slice(8, 9)}-${digits.slice(9, 11)}`;
}

function fmtCurrency(v: number): string {
  return v.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });
}

function statusBadgeClass(status: string): string {
  switch (status) {
    case "ativo":
      return "bg-blue-100 text-blue-700 border-blue-200";
    case "concluido":
      return "bg-green-100 text-green-700 border-green-200";
    case "cancelado":
      return "bg-amber-100 text-amber-700 border-amber-200";
    case "excluido":
      return "bg-gray-100 text-gray-500 border-gray-200";
    default:
      return "bg-gray-100 text-gray-500 border-gray-200";
  }
}

function statusLabel(status: string): string {
  switch (status) {
    case "ativo":
      return "Ativo";
    case "concluido":
      return "Concluído";
    case "cancelado":
      return "Cancelado";
    case "excluido":
      return "Excluído";
    default:
      return status;
  }
}

interface ClientesCRMSectionProps {
  resumes: Resume[];
}

function ClientesCRMSection({ resumes }: ClientesCRMSectionProps) {
  const [customers, setCustomers] = useState<ShoppingCustomer[]>(mockCustomers);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("todos");
  const [viewCustomer, setViewCustomer] = useState<ShoppingCustomer | null>(
    null,
  );
  const [deleteTarget, setDeleteTarget] = useState<ShoppingCustomer | null>(
    null,
  );
  const [addOpen, setAddOpen] = useState(false);
  const [newForm, setNewForm] = useState<Partial<ShoppingCustomer>>({
    status: "ativo",
    dataPedido: new Date().toISOString().split("T")[0],
  });

  const filtered = customers.filter((c) => {
    const q = search.toLowerCase();
    const matchSearch =
      !q ||
      c.nome.toLowerCase().includes(q) ||
      c.email.toLowerCase().includes(q) ||
      c.cpf.replace(/\D/g, "").includes(q.replace(/\D/g, ""));
    const matchStatus = statusFilter === "todos" || c.status === statusFilter;
    return matchSearch && matchStatus;
  });

  const total = customers.length;
  const ativos = customers.filter((c) => c.status === "ativo").length;
  const concluidos = customers.filter((c) => c.status === "concluido").length;
  const cancelados = customers.filter((c) => c.status === "cancelado").length;

  function updateStatus(id: string, status: string) {
    setCustomers((prev) =>
      prev.map((c) => (c.id === id ? { ...c, status } : c)),
    );
    toast.success(`Status atualizado para ${statusLabel(status)}.`);
  }

  function confirmDelete(c: ShoppingCustomer) {
    setDeleteTarget(c);
  }

  function executeDelete() {
    if (!deleteTarget) return;
    setCustomers((prev) =>
      prev.map((c) =>
        c.id === deleteTarget.id
          ? {
              ...c,
              cpf: "",
              logradouro: "",
              numero: "",
              complemento: "",
              bairro: "",
              cep: "",
              status: "excluido",
            }
          : c,
      ),
    );
    toast.success("Dados pessoais removidos. Registro mantido para auditoria.");
    setDeleteTarget(null);
  }

  function handleAddCustomer() {
    if (!newForm.nome || !newForm.email || !newForm.produtoId) {
      toast.error("Nome, e-mail e produto são obrigatórios.");
      return;
    }
    const duplicate = customers.find(
      (c) => c.email === newForm.email && c.produtoId === newForm.produtoId,
    );
    if (duplicate) {
      toast.error("Cliente já cadastrado para este produto.");
      return;
    }
    const customer: ShoppingCustomer = {
      id: crypto.randomUUID(),
      nome: newForm.nome ?? "",
      email: newForm.email ?? "",
      whatsapp: newForm.whatsapp ?? "",
      telefone: newForm.telefone ?? "",
      cpf: newForm.cpf ?? "",
      logradouro: newForm.logradouro ?? "",
      numero: newForm.numero ?? "",
      complemento: newForm.complemento ?? "",
      bairro: newForm.bairro ?? "",
      cidade: newForm.cidade ?? "",
      estado: newForm.estado ?? "",
      cep: newForm.cep ?? "",
      produtoId: newForm.produtoId ?? "",
      produtoNome: newForm.produtoNome ?? "",
      valorCompra: newForm.valorCompra ?? 0,
      status: newForm.status ?? "ativo",
      dataPedido: newForm.dataPedido ?? new Date().toISOString().split("T")[0],
      createdAt: BigInt(Date.now()),
    };
    setCustomers((prev) => [customer, ...prev]);
    toast.success("Cliente cadastrado com sucesso!");
    setAddOpen(false);
    setNewForm({
      status: "ativo",
      dataPedido: new Date().toISOString().split("T")[0],
    });
  }

  const statusTabs = ["todos", "ativo", "concluido", "cancelado", "excluido"];

  return (
    <div className="space-y-5">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-base font-bold text-[#1a1a1a] flex items-center gap-2">
            <ShoppingCart className="w-5 h-5 text-[#d7350d]" />
            CRM – Clientes da Loja
          </h3>
          <p className="text-xs text-gray-400 mt-0.5">
            Clientes com e-mail já cadastrado no CRM de Currículos são
            automaticamente vinculados (badge verde).
          </p>
        </div>
        <Button
          className="bg-[#d7350d] text-white hover:bg-[#c02e0c] flex items-center gap-1.5"
          onClick={() => setAddOpen(true)}
          data-ocid="admin.clientes.open_modal_button"
        >
          <UserPlus className="w-4 h-4" />+ Novo Cliente
        </Button>
      </div>

      {/* Stat Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        {[
          {
            label: "Total de Clientes",
            value: total,
            color: "text-[#1a1a1a]",
            bg: "bg-gray-50",
          },
          {
            label: "Pedidos Ativos",
            value: ativos,
            color: "text-blue-600",
            bg: "bg-blue-50",
          },
          {
            label: "Concluídos",
            value: concluidos,
            color: "text-green-600",
            bg: "bg-green-50",
          },
          {
            label: "Cancelados",
            value: cancelados,
            color: "text-amber-600",
            bg: "bg-amber-50",
          },
        ].map((stat) => (
          <div
            key={stat.label}
            className={`${stat.bg} rounded-xl border p-4 flex flex-col gap-1`}
          >
            <span className="text-xs text-gray-500 font-medium">
              {stat.label}
            </span>
            <span className={`text-2xl font-bold ${stat.color}`}>
              {stat.value}
            </span>
          </div>
        ))}
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-3 items-start sm:items-center">
        <div className="relative flex-1 max-w-xs">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
          <input
            type="text"
            className="w-full pl-9 pr-3 py-2 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#d7350d]/30 bg-white"
            placeholder="Buscar por nome, e-mail ou CPF..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            data-ocid="admin.clientes.search_input"
          />
        </div>
        <div className="flex gap-1.5 flex-wrap">
          {statusTabs.map((s) => (
            <button
              type="button"
              key={s}
              className={`text-xs px-3 py-1.5 rounded-full font-medium border transition-colors capitalize ${
                statusFilter === s
                  ? "bg-[#d7350d] text-white border-[#d7350d]"
                  : "bg-white text-gray-500 border-gray-200 hover:border-gray-300"
              }`}
              onClick={() => setStatusFilter(s)}
              data-ocid="admin.clientes.tab"
            >
              {s === "todos" ? "Todos" : statusLabel(s)}
            </button>
          ))}
        </div>
      </div>

      {/* Table */}
      <div className="bg-white rounded-xl border overflow-hidden shadow-sm">
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Nome</TableHead>
                <TableHead>E-mail</TableHead>
                <TableHead>Telefone</TableHead>
                <TableHead>CPF</TableHead>
                <TableHead>Produto</TableHead>
                <TableHead>Valor</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Data</TableHead>
                <TableHead />
              </TableRow>
            </TableHeader>
            <TableBody>
              {filtered.length === 0 && (
                <TableRow>
                  <TableCell
                    colSpan={9}
                    className="text-center text-gray-400 py-10"
                    data-ocid="admin.clientes.empty_state"
                  >
                    Nenhum cliente encontrado.
                  </TableCell>
                </TableRow>
              )}
              {filtered.map((c, i) => (
                <TableRow
                  key={c.id}
                  className={c.status === "excluido" ? "opacity-60" : ""}
                  data-ocid={`admin.clientes.item.${i + 1}`}
                >
                  <TableCell className="font-medium whitespace-nowrap">
                    {c.nome}
                  </TableCell>
                  <TableCell className="text-sm text-gray-600 max-w-[160px] truncate">
                    {c.email}
                  </TableCell>
                  <TableCell className="text-sm whitespace-nowrap">
                    {c.telefone}
                  </TableCell>
                  <TableCell className="text-sm font-mono">
                    {maskCpf(c.cpf)}
                  </TableCell>
                  <TableCell className="text-sm max-w-[140px] truncate">
                    {c.produtoNome}
                  </TableCell>
                  <TableCell className="text-sm whitespace-nowrap font-medium">
                    {fmtCurrency(c.valorCompra)}
                  </TableCell>
                  <TableCell>
                    <span
                      className={`inline-flex items-center text-xs px-2 py-0.5 rounded-full border font-medium ${statusBadgeClass(c.status)}`}
                    >
                      {statusLabel(c.status)}
                    </span>
                  </TableCell>
                  <TableCell className="text-xs text-gray-500 whitespace-nowrap">
                    {c.dataPedido}
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-1">
                      <button
                        type="button"
                        title="Ver detalhes"
                        className="p-1.5 rounded hover:bg-gray-100 text-gray-500 hover:text-gray-700"
                        onClick={() => setViewCustomer(c)}
                        data-ocid={`admin.clientes.edit_button.${i + 1}`}
                      >
                        <Eye className="w-4 h-4" />
                      </button>
                      {c.status !== "concluido" && c.status !== "excluido" && (
                        <button
                          type="button"
                          title="Marcar como Concluído"
                          className="p-1.5 rounded hover:bg-green-50 text-green-600 hover:text-green-700"
                          onClick={() => updateStatus(c.id, "concluido")}
                          data-ocid={`admin.clientes.confirm_button.${i + 1}`}
                        >
                          <Check className="w-4 h-4" />
                        </button>
                      )}
                      {c.status !== "cancelado" && c.status !== "excluido" && (
                        <button
                          type="button"
                          title="Cancelar pedido"
                          className="p-1.5 rounded hover:bg-amber-50 text-amber-600 hover:text-amber-700"
                          onClick={() => updateStatus(c.id, "cancelado")}
                          data-ocid={`admin.clientes.cancel_button.${i + 1}`}
                        >
                          <X className="w-4 h-4" />
                        </button>
                      )}
                      {c.status !== "excluido" && (
                        <button
                          type="button"
                          title="Excluir dados"
                          className="p-1.5 rounded hover:bg-red-50 text-red-500 hover:text-red-700"
                          onClick={() => confirmDelete(c)}
                          data-ocid={`admin.clientes.delete_button.${i + 1}`}
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      )}
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>

      {/* View Customer Dialog */}
      <Dialog
        open={!!viewCustomer}
        onOpenChange={(o) => !o && setViewCustomer(null)}
      >
        <DialogContent className="max-w-lg" data-ocid="admin.clientes.dialog">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <Users className="w-5 h-5 text-[#d7350d]" />
              Detalhes do Cliente
            </DialogTitle>
          </DialogHeader>
          {viewCustomer && (
            <div className="space-y-4 max-h-[70vh] overflow-y-auto pr-1">
              {/* Dados Pessoais */}
              <div className="bg-gray-50 rounded-lg p-4 space-y-2">
                <h4 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">
                  Dados Pessoais
                </h4>
                <div className="grid grid-cols-2 gap-2 text-sm">
                  <div>
                    <span className="text-gray-400 text-xs">Nome</span>
                    <p className="font-medium">{viewCustomer.nome}</p>
                  </div>
                  <div>
                    <span className="text-gray-400 text-xs">CPF</span>
                    <p className="font-mono">{maskCpf(viewCustomer.cpf)}</p>
                  </div>
                  <div>
                    <span className="text-gray-400 text-xs">E-mail</span>
                    <p className="truncate">{viewCustomer.email}</p>
                  </div>
                  <div>
                    <span className="text-gray-400 text-xs">WhatsApp</span>
                    <p>{viewCustomer.whatsapp}</p>
                  </div>
                  <div>
                    <span className="text-gray-400 text-xs">Telefone</span>
                    <p>{viewCustomer.telefone}</p>
                  </div>
                </div>
              </div>

              {/* Endereço */}
              <div className="bg-gray-50 rounded-lg p-4 space-y-2">
                <h4 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">
                  Endereço
                </h4>
                {viewCustomer.logradouro ? (
                  <div className="text-sm space-y-1">
                    <p>
                      {viewCustomer.logradouro}, {viewCustomer.numero}
                      {viewCustomer.complemento
                        ? ` – ${viewCustomer.complemento}`
                        : ""}
                    </p>
                    <p className="text-gray-500">{viewCustomer.bairro}</p>
                    <p className="text-gray-500">
                      {viewCustomer.cidade} / {viewCustomer.estado} – CEP:{" "}
                      {viewCustomer.cep}
                    </p>
                  </div>
                ) : (
                  <p className="text-sm text-gray-400 italic">
                    Dados removidos (registro excluído).
                  </p>
                )}
              </div>

              {/* Pedido */}
              <div className="bg-gray-50 rounded-lg p-4 space-y-2">
                <h4 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">
                  Pedido
                </h4>
                <div className="grid grid-cols-2 gap-2 text-sm">
                  <div>
                    <span className="text-gray-400 text-xs">Produto</span>
                    <p className="font-medium">{viewCustomer.produtoNome}</p>
                  </div>
                  <div>
                    <span className="text-gray-400 text-xs">Valor</span>
                    <p className="font-bold text-[#d7350d]">
                      {fmtCurrency(viewCustomer.valorCompra)}
                    </p>
                  </div>
                  <div>
                    <span className="text-gray-400 text-xs">Status</span>
                    <p>
                      <span
                        className={`inline-flex items-center text-xs px-2 py-0.5 rounded-full border font-medium ${statusBadgeClass(viewCustomer.status)}`}
                      >
                        {statusLabel(viewCustomer.status)}
                      </span>
                    </p>
                  </div>
                  <div>
                    <span className="text-gray-400 text-xs">
                      Data do Pedido
                    </span>
                    <p>{viewCustomer.dataPedido}</p>
                  </div>
                </div>
              </div>

              {/* Vínculo CRM */}
              <div className="bg-gray-50 rounded-lg p-4">
                <h4 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">
                  Vínculo CRM – Currículo
                </h4>
                {(() => {
                  const linked = resumes.find(
                    (r) => r.email === viewCustomer.email,
                  );
                  if (linked) {
                    return (
                      <div className="space-y-1">
                        <span className="inline-flex items-center gap-1.5 bg-green-100 text-green-700 text-xs px-3 py-1 rounded-full font-medium border border-green-200">
                          <Check className="w-3.5 h-3.5" />
                          Avaliou currículo
                          {linked.overallScore
                            ? ` — Nota: ${linked.overallScore}`
                            : ""}
                        </span>
                        <p className="text-xs text-gray-500 mt-1">
                          Este cliente também possui avaliação de currículo no
                          sistema.
                        </p>
                      </div>
                    );
                  }
                  return (
                    <p className="text-xs text-gray-400 italic">
                      Nenhuma avaliação de currículo vinculada.
                    </p>
                  );
                })()}
              </div>
            </div>
          )}
          <div className="flex justify-end pt-2">
            <Button
              variant="outline"
              onClick={() => setViewCustomer(null)}
              data-ocid="admin.clientes.close_button"
            >
              Fechar
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      {/* Delete Confirm Dialog */}
      <Dialog
        open={!!deleteTarget}
        onOpenChange={(o) => !o && setDeleteTarget(null)}
      >
        <DialogContent data-ocid="admin.clientes.modal">
          <DialogHeader>
            <DialogTitle className="text-red-600">
              Excluir dados do cliente
            </DialogTitle>
          </DialogHeader>
          <p className="text-sm text-gray-600">
            Os dados pessoais (CPF, endereço) serão removidos, mas o registro de
            compra será mantido para fins de auditoria. Esta ação não pode ser
            desfeita.
          </p>
          <p className="text-sm font-medium text-[#1a1a1a]">
            Cliente: {deleteTarget?.nome}
          </p>
          <div className="flex justify-end gap-2 pt-2">
            <Button
              variant="outline"
              onClick={() => setDeleteTarget(null)}
              data-ocid="admin.clientes.cancel_button"
            >
              Cancelar
            </Button>
            <Button
              className="bg-red-600 text-white hover:bg-red-700"
              onClick={executeDelete}
              data-ocid="admin.clientes.confirm_button"
            >
              Confirmar Exclusão
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      {/* Add New Customer Dialog */}
      <Dialog open={addOpen} onOpenChange={setAddOpen}>
        <DialogContent className="max-w-lg" data-ocid="admin.clientes.dialog">
          <DialogHeader>
            <DialogTitle>Novo Cliente</DialogTitle>
          </DialogHeader>
          <div className="space-y-3 max-h-[65vh] overflow-y-auto pr-1">
            <div className="grid grid-cols-2 gap-3">
              <div className="col-span-2">
                <Label>Nome *</Label>
                <Input
                  value={newForm.nome ?? ""}
                  onChange={(e) =>
                    setNewForm((f) => ({ ...f, nome: e.target.value }))
                  }
                  data-ocid="admin.clientes.input"
                />
              </div>
              <div>
                <Label>E-mail *</Label>
                <Input
                  type="email"
                  value={newForm.email ?? ""}
                  onChange={(e) =>
                    setNewForm((f) => ({ ...f, email: e.target.value }))
                  }
                  data-ocid="admin.clientes.input"
                />
              </div>
              <div>
                <Label>CPF</Label>
                <Input
                  value={newForm.cpf ?? ""}
                  placeholder="000.000.000-00"
                  onChange={(e) =>
                    setNewForm((f) => ({ ...f, cpf: e.target.value }))
                  }
                  data-ocid="admin.clientes.input"
                />
              </div>
              <div>
                <Label>WhatsApp</Label>
                <Input
                  value={newForm.whatsapp ?? ""}
                  placeholder="(24) 99999-9999"
                  onChange={(e) =>
                    setNewForm((f) => ({ ...f, whatsapp: e.target.value }))
                  }
                  data-ocid="admin.clientes.input"
                />
              </div>
              <div>
                <Label>Telefone</Label>
                <Input
                  value={newForm.telefone ?? ""}
                  placeholder="(24) 3333-3333"
                  onChange={(e) =>
                    setNewForm((f) => ({ ...f, telefone: e.target.value }))
                  }
                  data-ocid="admin.clientes.input"
                />
              </div>
            </div>
            <div className="border-t pt-3">
              <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">
                Endereço
              </p>
              <div className="grid grid-cols-2 gap-3">
                <div className="col-span-2">
                  <Label>Logradouro</Label>
                  <Input
                    value={newForm.logradouro ?? ""}
                    onChange={(e) =>
                      setNewForm((f) => ({ ...f, logradouro: e.target.value }))
                    }
                    data-ocid="admin.clientes.input"
                  />
                </div>
                <div>
                  <Label>Número</Label>
                  <Input
                    value={newForm.numero ?? ""}
                    onChange={(e) =>
                      setNewForm((f) => ({ ...f, numero: e.target.value }))
                    }
                    data-ocid="admin.clientes.input"
                  />
                </div>
                <div>
                  <Label>Complemento</Label>
                  <Input
                    value={newForm.complemento ?? ""}
                    onChange={(e) =>
                      setNewForm((f) => ({
                        ...f,
                        complemento: e.target.value,
                      }))
                    }
                    data-ocid="admin.clientes.input"
                  />
                </div>
                <div>
                  <Label>Bairro</Label>
                  <Input
                    value={newForm.bairro ?? ""}
                    onChange={(e) =>
                      setNewForm((f) => ({ ...f, bairro: e.target.value }))
                    }
                    data-ocid="admin.clientes.input"
                  />
                </div>
                <div>
                  <Label>CEP</Label>
                  <Input
                    value={newForm.cep ?? ""}
                    placeholder="00000-000"
                    onChange={(e) =>
                      setNewForm((f) => ({ ...f, cep: e.target.value }))
                    }
                    data-ocid="admin.clientes.input"
                  />
                </div>
                <div>
                  <Label>Cidade</Label>
                  <Input
                    value={newForm.cidade ?? ""}
                    onChange={(e) =>
                      setNewForm((f) => ({ ...f, cidade: e.target.value }))
                    }
                    data-ocid="admin.clientes.input"
                  />
                </div>
                <div>
                  <Label>Estado (UF)</Label>
                  <Input
                    value={newForm.estado ?? ""}
                    placeholder="RJ"
                    maxLength={2}
                    onChange={(e) =>
                      setNewForm((f) => ({
                        ...f,
                        estado: e.target.value.toUpperCase(),
                      }))
                    }
                    data-ocid="admin.clientes.input"
                  />
                </div>
              </div>
            </div>
            <div className="border-t pt-3">
              <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">
                Pedido
              </p>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <Label>ID do Produto *</Label>
                  <Input
                    value={newForm.produtoId ?? ""}
                    placeholder="p1"
                    onChange={(e) =>
                      setNewForm((f) => ({ ...f, produtoId: e.target.value }))
                    }
                    data-ocid="admin.clientes.input"
                  />
                </div>
                <div>
                  <Label>Nome do Produto</Label>
                  <Input
                    value={newForm.produtoNome ?? ""}
                    onChange={(e) =>
                      setNewForm((f) => ({ ...f, produtoNome: e.target.value }))
                    }
                    data-ocid="admin.clientes.input"
                  />
                </div>
                <div>
                  <Label>Valor (R$)</Label>
                  <Input
                    type="number"
                    step="0.01"
                    value={newForm.valorCompra ?? ""}
                    onChange={(e) =>
                      setNewForm((f) => ({
                        ...f,
                        valorCompra: Number.parseFloat(e.target.value) || 0,
                      }))
                    }
                    data-ocid="admin.clientes.input"
                  />
                </div>
                <div>
                  <Label>Data do Pedido</Label>
                  <Input
                    type="date"
                    value={newForm.dataPedido ?? ""}
                    onChange={(e) =>
                      setNewForm((f) => ({
                        ...f,
                        dataPedido: e.target.value,
                      }))
                    }
                    data-ocid="admin.clientes.input"
                  />
                </div>
              </div>
            </div>
          </div>
          <div className="flex justify-end gap-2 pt-2">
            <Button
              variant="outline"
              onClick={() => setAddOpen(false)}
              data-ocid="admin.clientes.cancel_button"
            >
              Cancelar
            </Button>
            <Button
              className="bg-[#d7350d] text-white hover:bg-[#c02e0c]"
              onClick={handleAddCustomer}
              data-ocid="admin.clientes.submit_button"
            >
              Cadastrar Cliente
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}

/* =========================================================
   LOJA TAB
   ========================================================= */
function LojaTab() {
  const { actor } = useActor();
  const [lojaSubTab, setLojaSubTab] = useState<"produtos" | "clientes">(
    "produtos",
  );
  const [products, setProducts] = useState<Product[]>([]);
  const [resumes, setResumes] = useState<Resume[]>([]);
  const [open, setOpen] = useState(false);
  const [editing, setEditing] = useState<Product | null>(null);
  const [form, setForm] = useState<Partial<Product>>({ available: true });
  const [payConf, setPayConf] = useState<Partial<PaymentConfig>>({});

  async function load() {
    try {
      const [list, conf, resumeList] = await Promise.all([
        actor!.getAllProducts(),
        actor!.getPaymentConfig(),
        actor!.getAllResumes(),
      ]);
      setProducts(list);
      if (conf) setPayConf(conf as PaymentConfig);
      setResumes(resumeList as Resume[]);
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

  async function handleToggleAvailable(p: Product) {
    const updated = { ...p, available: !p.available };
    try {
      await actor!.updateProduct(updated);
      toast.success(
        updated.available ? "Produto habilitado!" : "Produto desabilitado!",
      );
      load();
    } catch {
      toast.error("Erro ao atualizar produto.");
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
      {/* Sub-tab pills */}
      <div className="flex items-center gap-1 border-b pb-3">
        {(["produtos", "clientes"] as const).map((t) => (
          <button
            type="button"
            key={t}
            className={`flex items-center gap-1.5 text-sm px-4 py-1.5 rounded-full font-medium transition-colors ${
              lojaSubTab === t
                ? "bg-[#d7350d] text-white"
                : "bg-gray-100 text-gray-600 hover:bg-gray-200"
            }`}
            onClick={() => setLojaSubTab(t)}
            data-ocid="admin.loja.tab"
          >
            {t === "produtos" ? (
              <>
                <ShoppingBag className="w-3.5 h-3.5" /> Produtos
              </>
            ) : (
              <>
                <Users className="w-3.5 h-3.5" /> Clientes (CRM)
              </>
            )}
          </button>
        ))}
      </div>

      {lojaSubTab === "clientes" && <ClientesCRMSection resumes={resumes} />}

      {lojaSubTab === "produtos" && (
        <>
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-bold text-[#1a1a1a]">
              Produtos – Loja
            </h2>
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
                    <TableCell>
                      R$ {p.price.toFixed(2).replace(".", ",")}
                    </TableCell>
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
                          className={`text-xs px-2 py-0.5 rounded font-medium border transition-colors ${
                            p.available
                              ? "border-orange-400 text-orange-600 hover:bg-orange-50"
                              : "border-green-500 text-green-600 hover:bg-green-50"
                          }`}
                          onClick={() => handleToggleAvailable(p)}
                          data-ocid={`admin.loja.toggle_button.${i + 1}`}
                        >
                          {p.available ? "Desabilitar" : "Habilitar"}
                        </button>
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

          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mx-0 mb-4">
            <p className="text-sm text-blue-700 font-medium">
              💡 Página de Venda
            </p>
            <p className="text-xs text-blue-600 mt-1">
              Cada produto possui uma página de venda própria no estilo
              marketplace. Configure os detalhes acima para criar uma
              experiência completa de compra. Use "Habilitar/Desabilitar" para
              controlar a visibilidade no site.
            </p>
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
                    setPayConf((c) => ({
                      ...c,
                      mercadoPagoKey: e.target.value,
                    }))
                  }
                  data-ocid="admin.loja.input"
                />
              </div>
              <div>
                <Label>PayPal Client ID</Label>
                <Input
                  value={payConf.paypalClientId ?? ""}
                  onChange={(e) =>
                    setPayConf((c) => ({
                      ...c,
                      paypalClientId: e.target.value,
                    }))
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
                  <Label>Descrição Completa (Página de Vendas)</Label>
                  <Textarea
                    className="min-h-[100px]"
                    placeholder="Descrição detalhada do produto para a página de venda..."
                    value={(form as any).fullDescription ?? ""}
                    onChange={(e) =>
                      setForm(
                        (f) =>
                          ({ ...f, fullDescription: e.target.value }) as any,
                      )
                    }
                    data-ocid="admin.loja.textarea"
                  />
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <Label>Imagem Adicional 2 (URL)</Label>
                    <Input
                      placeholder="https://..."
                      value={(form as any).imageUrl2 ?? ""}
                      onChange={(e) =>
                        setForm(
                          (f) => ({ ...f, imageUrl2: e.target.value }) as any,
                        )
                      }
                      data-ocid="admin.loja.input"
                    />
                  </div>
                  <div>
                    <Label>Imagem Adicional 3 (URL)</Label>
                    <Input
                      placeholder="https://..."
                      value={(form as any).imageUrl3 ?? ""}
                      onChange={(e) =>
                        setForm(
                          (f) => ({ ...f, imageUrl3: e.target.value }) as any,
                        )
                      }
                      data-ocid="admin.loja.input"
                    />
                  </div>
                </div>
                <div>
                  <Label>Tipo de Produto</Label>
                  <Select
                    value={(form as any).productType ?? "direto"}
                    onValueChange={(v) =>
                      setForm((f) => ({ ...f, productType: v }) as any)
                    }
                  >
                    <SelectTrigger data-ocid="admin.loja.select">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="direto">
                        Venda Direta (Gateway de Pagamento)
                      </SelectItem>
                      <SelectItem value="parceiro">
                        Produto Parceiro (Redirecionamento Externo)
                      </SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label>
                    {(form as any).productType === "parceiro"
                      ? "Link de Redirecionamento (Parceiro)"
                      : "Link do Gateway de Pagamento"}
                  </Label>
                  <Input
                    placeholder="https://..."
                    value={form.paymentLink ?? ""}
                    onChange={(e) =>
                      setForm((f) => ({ ...f, paymentLink: e.target.value }))
                    }
                    data-ocid="admin.loja.input"
                  />
                </div>
                <div>
                  <Label>Avaliação (1-5 estrelas)</Label>
                  <Input
                    type="number"
                    min={1}
                    max={5}
                    step={0.1}
                    placeholder="Ex: 4.5"
                    value={(form as any).rating ?? ""}
                    onChange={(e) =>
                      setForm(
                        (f) =>
                          ({
                            ...f,
                            rating: Number.parseFloat(e.target.value) || 0,
                          }) as any,
                      )
                    }
                    data-ocid="admin.loja.input"
                  />
                </div>
                <div>
                  <Label>O que está incluído (um item por linha)</Label>
                  <Textarea
                    placeholder="Acesso imediato ao material&#10;Suporte por 30 dias&#10;Certificado de conclusão"
                    value={(form as any).includes ?? ""}
                    onChange={(e) =>
                      setForm(
                        (f) => ({ ...f, includes: e.target.value }) as any,
                      )
                    }
                    data-ocid="admin.loja.textarea"
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
        </>
      )}
    </div>
  );
}

/* =========================================================
   FONTES DE VAGAS TAB
   ========================================================= */

const DEFAULT_SOURCES: JobSource[] = [
  // --- Portais Nacionais ---
  {
    id: "catho",
    name: "Catho",
    url: "https://www.catho.com.br/vagas-emprego/?q=vagas&where=sul+fluminense",
    region: "Nacional / Sul Fluminense",
    active: true,
    notes:
      "Maior portal de empregos do Brasil. Filtrar por cidade: Resende, Volta Redonda, Barra Mansa, Angra dos Reis, Itatiaia. Coletar apenas vagas com data de publicação nas últimas 24h.",
    createdAt: BigInt(0),
  },
  {
    id: "infojobs",
    name: "InfoJobs",
    url: "https://www.infojobs.com.br/empregos.aspx?ciudad=sul-fluminense",
    region: "Nacional / Sul Fluminense",
    active: true,
    notes:
      "Portal consolidado. Buscar por localidade e filtrar por 'Publicado hoje' ou 'Últimas 24h'. Excluir vagas sem geolocalização confirmada (exceto remotas).",
    createdAt: BigInt(0),
  },
  {
    id: "indeed",
    name: "Indeed Brasil",
    url: "https://br.indeed.com/vagas?q=emprego&l=Sul+Fluminense%2C+RJ",
    region: "Nacional / Sul Fluminense",
    active: true,
    notes:
      "Maior motor de busca de empregos do mundo. Buscar por 'Sul Fluminense RJ', 'Volta Redonda', 'Resende', 'Barra Mansa'. Incluir vagas remotas separadamente.",
    createdAt: BigInt(0),
  },
  {
    id: "linkedin",
    name: "LinkedIn Vagas",
    url: "https://www.linkedin.com/jobs/search/?location=Sul%20Fluminense%2C%20Rio%20de%20Janeiro%2C%20Brasil",
    region: "Nacional / Sul Fluminense",
    active: true,
    notes:
      "Alta qualidade de vagas CLT, PJ e Remoto. Filtrar por: localidade Sul Fluminense, data de publicação '24 horas'. Priorizar vagas de empresas verificadas.",
    createdAt: BigInt(0),
  },
  {
    id: "vagas_com",
    name: "Vagas.com",
    url: "https://www.vagas.com.br/vagas-de-emprego-sul-fluminense-rj",
    region: "Nacional / Sul Fluminense",
    active: true,
    notes:
      "Foco em vagas formais CLT. Filtrar por estado RJ e cidades da região. Coletar categoria, salário e benefícios quando disponíveis.",
    createdAt: BigInt(0),
  },
  {
    id: "sine",
    name: "SINE / Emprega Brasil",
    url: "https://empregabrasil.mte.gov.br/",
    region: "Nacional / Governo",
    active: true,
    notes:
      "Sistema Nacional de Emprego. Vagas oficiais do governo federal, inclui PCD e Jovem Aprendiz. Fonte prioritária para vagas assistidas. Verificar agências de SINE de Volta Redonda e Resende.",
    createdAt: BigInt(0),
  },
  {
    id: "glassdoor",
    name: "Glassdoor",
    url: "https://www.glassdoor.com.br/Vagas/sul-fluminense-vagas-SRCH_IL.0,14_IC2712853.htm",
    region: "Nacional / Sul Fluminense",
    active: true,
    notes:
      "Bom para vagas com informação salarial. Combinar com dados de mercado para a seção 'O MERCADO EM NÚMEROS'. Filtrar por últimas 24h.",
    createdAt: BigInt(0),
  },
  {
    id: "trabalha_brasil",
    name: "Trabalha Brasil",
    url: "https://www.trabalhabrasil.com.br/vagas-empregos-em-sul-fluminense-rj",
    region: "Sul Fluminense",
    active: true,
    notes:
      "Vagas locais e regionais. Boa cobertura de Volta Redonda, Barra Mansa, Resende e Angra dos Reis. Coletar vagas de estágio e jovem aprendiz separadamente.",
    createdAt: BigInt(0),
  },
  // --- Grupos e Redes Sociais ---
  {
    id: "grupo_whatsapp_vr",
    name: "Grupos WhatsApp — Vagas VR e Região",
    url: "https://chat.whatsapp.com/",
    region: "Volta Redonda e Região",
    active: true,
    notes:
      "Monitorar grupos de WhatsApp de vagas do Sul Fluminense. Vagas coletadas manualmente pelo admin. Verificar: nome da empresa, cidade, tipo de contratação e prazo. Não publicar vagas sem cidade identificada (exceto remotas).",
    createdAt: BigInt(0),
  },
  {
    id: "grupo_facebook_vr",
    name: "Grupos Facebook — Empregos Sul Fluminense",
    url: "https://www.facebook.com/groups/",
    region: "Sul Fluminense",
    active: true,
    notes:
      "Grupos: 'Vagas de Emprego Volta Redonda', 'Empregos Barra Mansa e Região', 'Vagas Resende RJ'. Coletar diariamente. Inserção manual pelo admin. Verificar autenticidade antes de publicar.",
    createdAt: BigInt(0),
  },
  {
    id: "grupo_telegram_rj",
    name: "Grupos Telegram — Vagas RJ",
    url: "https://t.me/",
    region: "Rio de Janeiro / Sul Fluminense",
    active: true,
    notes:
      "Canais de vagas do interior RJ. Monitorar canais públicos com vagas para a região. Inserção manual. Priorizar vagas com informação de geolocalização confirmada.",
    createdAt: BigInt(0),
  },
  // --- Locais / Regionais ---
  {
    id: "prefeitura_vr",
    name: "Prefeitura de Volta Redonda — Emprego",
    url: "https://www.voltaredonda.rj.gov.br/",
    region: "Volta Redonda",
    active: true,
    notes:
      "Vagas do SINE municipal, vagas públicas, concursos e processos seletivos. Verificar página de notícias e secretaria de trabalho. Inserção manual pelo admin.",
    createdAt: BigInt(0),
  },
  {
    id: "prefeitura_resende",
    name: "Prefeitura de Resende — Emprego",
    url: "https://www.resende.rj.gov.br/",
    region: "Resende",
    active: true,
    notes:
      "Vagas do Polo Industrial de Resende. Incluir vagas da Zona de Processamento de Exportação (ZPE) e grandes empresas do setor automotivo. Inserção manual.",
    createdAt: BigInt(0),
  },
  {
    id: "csn_vagas",
    name: "CSN — Companhia Siderúrgica Nacional",
    url: "https://www.csn.com.br/pt-br/carreiras",
    region: "Volta Redonda",
    active: true,
    notes:
      "Maior empregadora da cidade. Coletar vagas abertas no portal de carreiras. Inclui vagas diretas, estágio e jovem aprendiz. Alta prioridade — publicar no mesmo dia da abertura.",
    createdAt: BigInt(0),
  },
  {
    id: "nipoarcos",
    name: "Nipo / Arcos e Empresas do Polo de Resende",
    url: "https://www.linkedin.com/company/polo-industrial-resende",
    region: "Resende / Itatiaia",
    active: true,
    notes:
      "Polo Industrial de Resende: Volkswagen, MAN Latin America, Nissan, Toyota, Hyundai, GE. Monitorar portais de carreiras de cada empresa e LinkedIn. Alta relevância para a região.",
    createdAt: BigInt(0),
  },
];

function FontesTab() {
  const { actor } = useActor();
  const [sources, setSources] = useState<JobSource[]>([]);
  const [open, setOpen] = useState(false);
  const [editing, setEditing] = useState<JobSource | null>(null);
  const [form, setForm] = useState<Partial<JobSource>>({ active: true });
  const [updating, setUpdating] = useState(false);
  const [viewSource, setViewSource] = useState<JobSource | null>(null);

  async function load() {
    try {
      let list = await actor!.getJobSources();
      // Se não há fontes cadastradas, pré-popular com as padrão
      if (list.length === 0) {
        for (const s of DEFAULT_SOURCES) {
          await actor!.addJobSource(s);
        }
        list = await actor!.getJobSources();
      }
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
    setForm({ active: true, region: "Sul Fluminense" });
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

  async function handleTriggerUpdate() {
    setUpdating(true);
    try {
      await actor!.triggerWeeklyUpdate();
      toast.success(
        "Atualização e divulgação disparadas! As vagas serão coletadas e publicadas em breve.",
      );
    } catch {
      toast.error("Erro ao disparar atualização.");
    } finally {
      setUpdating(false);
    }
  }

  const activeSources = sources.filter((s) => s.active);
  const inactiveSources = sources.filter((s) => !s.active);

  const cidadesCobertas = [
    "Volta Redonda",
    "Barra Mansa",
    "Resende",
    "Itatiaia",
    "Angra dos Reis",
    "Paraty",
    "Porto Real",
    "Barra do Piraí",
    "Valença",
    "Vassouras",
    "Três Rios",
    "Paraíba do Sul",
    "Piraí",
    "Rio Claro",
    "Mendes",
    "Engenheiro Paulo de Frontin",
    "Pinheiral",
    "Quatis",
    "Rio das Flores",
    "Sapucaia",
  ];

  return (
    <div className="space-y-5">
      {/* Header com botão de atualização */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <h2 className="text-lg font-bold text-[#1a1a1a]">Fontes de Vagas</h2>
          <p className="text-sm text-gray-500 mt-0.5">
            {activeSources.length} fontes ativas • {inactiveSources.length}{" "}
            inativas
          </p>
        </div>
        <div className="flex gap-2 flex-wrap">
          <Button
            className="bg-[#d7350d] text-white hover:bg-[#c02e0c] flex items-center gap-2 font-semibold"
            onClick={handleTriggerUpdate}
            disabled={updating}
            data-ocid="admin.fontes.trigger_update_button"
          >
            <RefreshCw
              className={`w-4 h-4 ${updating ? "animate-spin" : ""}`}
            />
            {updating
              ? "Atualizando vagas..."
              : "▶ Disparar Atualização + Divulgação"}
          </Button>
          <Button
            variant="outline"
            className="border-[#d7350d] text-[#d7350d] hover:bg-red-50"
            onClick={openNew}
            data-ocid="admin.fontes.open_modal_button"
          >
            + Nova Fonte
          </Button>
        </div>
      </div>

      {/* Painel de Geolocalização */}
      <div className="bg-blue-50 border border-blue-200 rounded-xl p-4">
        <div className="flex items-start gap-3">
          <span className="text-2xl">📍</span>
          <div>
            <h3 className="font-semibold text-blue-900 text-sm mb-1">
              Geolocalização das Vagas
            </h3>
            <p className="text-xs text-blue-700 mb-2">
              A coleta respeita a geolocalização de cada vaga. Vagas presenciais
              devem corresponder a uma das cidades abaixo. Vagas{" "}
              <strong>remotas e híbridas</strong> são coletadas sem restrição
              geográfica.
            </p>
            <div className="flex flex-wrap gap-1.5">
              {cidadesCobertas.map((c) => (
                <span
                  key={c}
                  className="bg-white border border-blue-200 text-blue-800 text-xs px-2 py-0.5 rounded-full"
                >
                  {c}
                </span>
              ))}
              <span className="bg-[#d7350d] text-white text-xs px-2 py-0.5 rounded-full font-medium">
                + Todo o Brasil (remotas)
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Orientações gerais de coleta */}
      <div className="bg-amber-50 border border-amber-200 rounded-xl p-4">
        <div className="flex items-start gap-3">
          <span className="text-2xl">📋</span>
          <div>
            <h3 className="font-semibold text-amber-900 text-sm mb-1">
              Orientações Gerais de Coleta
            </h3>
            <ul className="text-xs text-amber-800 space-y-1 list-disc list-inside">
              <li>
                Coletar apenas vagas publicadas nas{" "}
                <strong>últimas 24 horas</strong>. Vagas com mais de 10 dias são
                excluídas automaticamente.
              </li>
              <li>
                Vagas novas recebem automaticamente a tag{" "}
                <span className="bg-green-100 text-green-700 text-xs px-1.5 py-0.5 rounded font-semibold">
                  Nova
                </span>
                .
              </li>
              <li>
                Período de compilação: <strong>domingo a sábado</strong>.
                Atualização automática diária iniciando às{" "}
                <strong>23:50</strong>.
              </li>
              <li>
                Vagas de grupos (WhatsApp, Facebook, Telegram) devem ser
                inseridas <strong>manualmente</strong> pelo admin com validação
                prévia.
              </li>
              <li>
                Validar cidade antes de publicar. Se a cidade não estiver na
                lista de cobertura e não for remota,{" "}
                <strong>não publicar</strong>.
              </li>
              <li>
                Incluir sempre: cargo, empresa (quando disponível), cidade, tipo
                de contratação, salário (quando disponível) e link original.
              </li>
              <li>
                Badges automáticos:{" "}
                <strong>PCD, Jovem Aprendiz, Urgente, Remoto</strong> — aplicar
                conforme descritivo da vaga.
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Tabela de fontes */}
      <div className="bg-white rounded-xl border overflow-hidden shadow-sm">
        <div className="px-4 pt-4 pb-2 border-b bg-gray-50">
          <h3 className="text-sm font-semibold text-gray-700">
            Fontes Cadastradas ({sources.length})
          </h3>
        </div>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Nome / Tipo</TableHead>
              <TableHead>URL</TableHead>
              <TableHead>Região</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Orientações</TableHead>
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
                  Carregando fontes...
                </TableCell>
              </TableRow>
            )}
            {sources.map((s, i) => (
              <TableRow key={s.id} data-ocid={`admin.fontes.item.${i + 1}`}>
                <TableCell className="font-medium max-w-[140px]">
                  {s.name}
                </TableCell>
                <TableCell className="max-w-[180px] truncate text-xs">
                  <a
                    href={s.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-500 hover:underline"
                  >
                    {s.url
                      .replace("https://", "")
                      .replace("http://", "")
                      .slice(0, 35)}
                    {s.url.length > 43 ? "…" : ""}
                  </a>
                </TableCell>
                <TableCell className="text-xs">{s.region}</TableCell>
                <TableCell>
                  <Badge variant={s.active ? "default" : "secondary"}>
                    {s.active ? "Ativa" : "Inativa"}
                  </Badge>
                </TableCell>
                <TableCell className="max-w-[200px]">
                  {s.notes ? (
                    <button
                      type="button"
                      className="text-xs text-blue-600 hover:underline text-left"
                      onClick={() => setViewSource(s)}
                      data-ocid={`admin.fontes.view_notes.${i + 1}`}
                    >
                      {s.notes.slice(0, 50)}
                      {s.notes.length > 50 ? "… ver mais" : ""}
                    </button>
                  ) : (
                    <span className="text-xs text-gray-400">—</span>
                  )}
                </TableCell>
                <TableCell>
                  <div className="flex gap-1">
                    <button
                      type="button"
                      className="p-1.5 rounded hover:bg-gray-100 text-gray-500"
                      onClick={() => openEdit(s)}
                      data-ocid={`admin.fontes.edit_button.${i + 1}`}
                    >
                      <Pencil className="w-3.5 h-3.5" />
                    </button>
                    <button
                      type="button"
                      className="p-1.5 rounded hover:bg-red-50 text-red-400"
                      onClick={() => handleDelete(s.id)}
                      data-ocid={`admin.fontes.delete_button.${i + 1}`}
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      {/* Modal de orientações detalhadas */}
      <Dialog open={!!viewSource} onOpenChange={() => setViewSource(null)}>
        <DialogContent data-ocid="admin.fontes.notes_dialog">
          <DialogHeader>
            <DialogTitle>{viewSource?.name}</DialogTitle>
          </DialogHeader>
          <div className="space-y-3">
            <div>
              <p className="text-xs font-semibold text-gray-500 mb-1">URL</p>
              <a
                href={viewSource?.url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm text-blue-500 hover:underline break-all"
              >
                {viewSource?.url}
              </a>
            </div>
            <div>
              <p className="text-xs font-semibold text-gray-500 mb-1">
                Região de Cobertura
              </p>
              <p className="text-sm">{viewSource?.region}</p>
            </div>
            <div>
              <p className="text-xs font-semibold text-gray-500 mb-1">
                Orientações de Coleta
              </p>
              <div className="bg-amber-50 border border-amber-200 rounded-lg p-3 text-sm text-amber-900">
                {viewSource?.notes}
              </div>
            </div>
          </div>
          <div className="flex justify-end pt-2">
            <Button variant="outline" onClick={() => setViewSource(null)}>
              Fechar
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      {/* Modal de adicionar/editar */}
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
              <Label>Região de Cobertura</Label>
              <Input
                value={form.region ?? ""}
                placeholder="Ex: Sul Fluminense, Nacional, Volta Redonda"
                onChange={(e) =>
                  setForm((f) => ({ ...f, region: e.target.value }))
                }
                data-ocid="admin.fontes.input"
              />
            </div>
            <div>
              <Label>Orientações de Coleta</Label>
              <Textarea
                value={form.notes ?? ""}
                placeholder="Descreva como coletar, filtros a usar, tipo de vaga, observações..."
                className="min-h-[100px]"
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

/* =========================================================
   AUDIO TAB
   ========================================================= */
interface AudioFile {
  id: string;
  name: string;
  src: string;
  isActive: boolean;
}

function AudioTab() {
  const [audioFiles, setAudioFiles] = useState<AudioFile[]>([
    {
      id: "1",
      name: "Música Tema BomDiaSegunda",
      src: "/assets/audio/tema-bomdiasegunda.mp3",
      isActive: true,
    },
  ]);
  const [previewAudio, setPreviewAudio] = useState<HTMLAudioElement | null>(
    null,
  );
  const [playingId, setPlayingId] = useState<string | null>(null);

  function handleSetActive(id: string) {
    const file = audioFiles.find((f) => f.id === id);
    if (!file) return;
    setAudioFiles((prev) => prev.map((f) => ({ ...f, isActive: f.id === id })));
    localStorage.setItem("bds_audio_src", file.src);
    toast.success("Áudio ativo atualizado!");
  }

  function handlePreview(file: AudioFile) {
    if (previewAudio) {
      previewAudio.pause();
      previewAudio.src = "";
    }
    if (playingId === file.id) {
      setPlayingId(null);
      setPreviewAudio(null);
      return;
    }
    const audio = new Audio(file.src);
    audio.play().catch(() => {});
    audio.addEventListener("ended", () => setPlayingId(null));
    setPreviewAudio(audio);
    setPlayingId(file.id);
  }

  function handleUpload(e: React.ChangeEvent<HTMLInputElement>) {
    const files = e.target.files;
    if (!files || files.length === 0) return;
    if (audioFiles.length >= 5) {
      toast.error(
        "Limite de 5 arquivos MP3 atingido. Remova um antes de adicionar.",
      );
      return;
    }
    const file = files[0];
    const objectUrl = URL.createObjectURL(file);
    const newFile: AudioFile = {
      id: Date.now().toString(),
      name: file.name.replace(/\.mp3$/i, ""),
      src: objectUrl,
      isActive: false,
    };
    setAudioFiles((prev) => [...prev, newFile]);
    toast.success("Arquivo adicionado!");
  }

  function handleDelete(id: string) {
    const file = audioFiles.find((f) => f.id === id);
    if (file?.isActive) {
      toast.error("Não é possível remover o arquivo ativo.");
      return;
    }
    setAudioFiles((prev) => prev.filter((f) => f.id !== id));
  }

  return (
    <div className="space-y-6 max-w-2xl">
      <div>
        <h2 className="text-xl font-bold text-gray-800 mb-1">
          Áudio / Música Tema
        </h2>
        <p className="text-sm text-gray-500">
          Gerencie os arquivos de áudio. O arquivo marcado como{" "}
          <strong>ATIVO</strong> será tocado no header do site.
        </p>
      </div>

      <div className="bg-white rounded-xl border shadow-sm overflow-hidden">
        <div className="p-4 border-b bg-gray-50 flex items-center justify-between">
          <span className="text-sm font-medium text-gray-700">
            Arquivos MP3 ({audioFiles.length}/5)
          </span>
          <label
            className={`flex items-center gap-2 px-3 py-1.5 rounded-lg text-sm font-medium cursor-pointer transition-colors ${
              audioFiles.length >= 5
                ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                : "bg-[#d7350d] text-white hover:bg-[#c02e0c]"
            }`}
            data-ocid="admin.audio.upload_button"
          >
            <Upload className="w-3.5 h-3.5" />
            Adicionar MP3
            <input
              type="file"
              accept=".mp3,audio/mpeg"
              className="hidden"
              onChange={handleUpload}
              disabled={audioFiles.length >= 5}
            />
          </label>
        </div>

        <div className="divide-y">
          {audioFiles.map((file) => (
            <div
              key={file.id}
              className="flex items-center gap-3 p-4"
              data-ocid={`admin.audio.item.${audioFiles.indexOf(file) + 1}`}
            >
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2">
                  <span className="font-medium text-gray-800 text-sm truncate">
                    {file.name}
                  </span>
                  {file.isActive && (
                    <Badge className="bg-green-100 text-green-700 border-green-200 text-xs">
                      ATIVO
                    </Badge>
                  )}
                </div>
                <p className="text-xs text-gray-400 truncate mt-0.5">
                  {file.src}
                </p>
              </div>
              <div className="flex items-center gap-2 shrink-0">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handlePreview(file)}
                  className="h-7 px-2 text-xs"
                  data-ocid="admin.audio.button"
                >
                  {playingId === file.id ? (
                    <>
                      <X className="w-3 h-3 mr-1" /> Parar
                    </>
                  ) : (
                    <>
                      <Music className="w-3 h-3 mr-1" /> Ouvir
                    </>
                  )}
                </Button>
                {!file.isActive && (
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleSetActive(file.id)}
                    className="h-7 px-2 text-xs border-green-300 text-green-700 hover:bg-green-50"
                    data-ocid="admin.audio.primary_button"
                  >
                    <Check className="w-3 h-3 mr-1" />
                    Definir como Ativo
                  </Button>
                )}
                {audioFiles.length > 1 && (
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => handleDelete(file.id)}
                    className="h-7 w-7 p-0 text-red-400 hover:text-red-600 hover:bg-red-50"
                    data-ocid="admin.audio.delete_button"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </Button>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="bg-blue-50 border border-blue-200 rounded-xl p-4 text-sm text-blue-700">
        <strong>ℹ️ Como funciona:</strong> O tocador no header irá reproduzir o
        arquivo marcado como ativo. Você pode armazenar até 5 versões de arquivo
        MP3.
      </div>
    </div>
  );
}

/* =========================================================
   CIDADES TAB
   ========================================================= */
function CidadesTab() {
  const [cidadesList, setCidadesList] = useState<CidadeInfo[]>(() =>
    cidadesData.map((c) => ({ ...c })),
  );
  const [selectedSlug, setSelectedSlug] = useState<string | null>(
    cidadesData[0]?.slug ?? null,
  );
  const [saved, setSaved] = useState(false);

  const selectedCidade =
    cidadesList.find((c) => c.slug === selectedSlug) ?? null;

  function updateField<K extends keyof CidadeInfo>(
    slug: string,
    field: K,
    value: CidadeInfo[K],
  ) {
    setCidadesList((prev) =>
      prev.map((c) => (c.slug === slug ? { ...c, [field]: value } : c)),
    );
    setSaved(false);
  }

  function handleSave() {
    setSaved(true);
    toast.success("Cidade atualizada!");
  }

  function handleFotoUpload(
    slug: string,
    e: React.ChangeEvent<HTMLInputElement>,
  ) {
    const file = e.target.files?.[0];
    if (!file) return;
    const objectUrl = URL.createObjectURL(file);
    updateField(slug, "fotoUrl", objectUrl);
  }

  return (
    <div>
      <div className="mb-4">
        <h2 className="text-xl font-bold text-gray-800 mb-1">
          Gerenciar Cidades
        </h2>
        <p className="text-sm text-gray-500">
          Edite as informações e fotos das páginas de cada cidade.
        </p>
      </div>

      <div className="flex gap-4" style={{ minHeight: "600px" }}>
        {/* City list */}
        <div
          className="w-52 shrink-0 bg-white rounded-xl border shadow-sm overflow-y-auto"
          style={{ maxHeight: "70vh" }}
        >
          <div className="p-3 border-b bg-gray-50">
            <span className="text-xs font-semibold text-gray-600 uppercase tracking-wide">
              Cidades ({cidadesList.length})
            </span>
          </div>
          <div className="divide-y">
            {cidadesList.map((cidade) => (
              <button
                key={cidade.slug}
                type="button"
                onClick={() => {
                  setSelectedSlug(cidade.slug);
                  setSaved(false);
                }}
                className={`w-full flex items-center gap-2 px-3 py-2.5 text-left text-sm transition-colors ${
                  selectedSlug === cidade.slug
                    ? "bg-[#d7350d]/10 text-[#d7350d] font-medium"
                    : "text-gray-700 hover:bg-gray-50"
                }`}
                data-ocid={`admin.cidades.item.${cidadesList.indexOf(cidade) + 1}`}
              >
                <MapPin className="w-3.5 h-3.5 shrink-0 opacity-60" />
                <span className="truncate">{cidade.nome}</span>
                {cidade.universitaria && (
                  <span className="ml-auto text-[9px] bg-blue-100 text-blue-600 rounded px-1 shrink-0">
                    UNIV
                  </span>
                )}
              </button>
            ))}
          </div>
        </div>

        {/* Edit form */}
        {selectedCidade ? (
          <div
            className="flex-1 bg-white rounded-xl border shadow-sm overflow-y-auto"
            style={{ maxHeight: "70vh" }}
          >
            <div className="p-5 border-b bg-gray-50 flex items-center justify-between">
              <h3 className="font-semibold text-gray-800">
                {selectedCidade.nome}
              </h3>
              <Button
                onClick={handleSave}
                className="bg-[#d7350d] hover:bg-[#c02e0c] text-white h-8 px-4 text-sm"
                data-ocid="admin.cidades.save_button"
              >
                {saved ? (
                  <>
                    <Check className="w-3.5 h-3.5 mr-1" /> Salvo
                  </>
                ) : (
                  "Salvar alterações"
                )}
              </Button>
            </div>
            <div className="p-5 space-y-4">
              {/* Nome */}
              <div>
                <Label className="text-xs text-gray-600 mb-1 block">
                  Nome da Cidade
                </Label>
                <Input
                  value={selectedCidade.nome}
                  onChange={(e) =>
                    updateField(selectedCidade.slug, "nome", e.target.value)
                  }
                  data-ocid="admin.cidades.input"
                />
              </div>

              {/* Descrição */}
              <div>
                <Label className="text-xs text-gray-600 mb-1 block">
                  Descrição
                </Label>
                <Textarea
                  rows={3}
                  value={selectedCidade.descricao}
                  onChange={(e) =>
                    updateField(
                      selectedCidade.slug,
                      "descricao",
                      e.target.value,
                    )
                  }
                  data-ocid="admin.cidades.textarea"
                />
              </div>

              {/* Stats row */}
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <Label className="text-xs text-gray-600 mb-1 block">
                    População
                  </Label>
                  <Input
                    value={selectedCidade.populacao}
                    onChange={(e) =>
                      updateField(
                        selectedCidade.slug,
                        "populacao",
                        e.target.value,
                      )
                    }
                    data-ocid="admin.cidades.input"
                  />
                </div>
                <div>
                  <Label className="text-xs text-gray-600 mb-1 block">
                    PIB
                  </Label>
                  <Input
                    value={selectedCidade.pib}
                    onChange={(e) =>
                      updateField(selectedCidade.slug, "pib", e.target.value)
                    }
                    data-ocid="admin.cidades.input"
                  />
                </div>
                <div>
                  <Label className="text-xs text-gray-600 mb-1 block">
                    IDHM
                  </Label>
                  <Input
                    value={selectedCidade.idhm}
                    onChange={(e) =>
                      updateField(selectedCidade.slug, "idhm", e.target.value)
                    }
                    data-ocid="admin.cidades.input"
                  />
                </div>
                <div>
                  <Label className="text-xs text-gray-600 mb-1 block">
                    Área (km²)
                  </Label>
                  <Input
                    value={selectedCidade.areaKm2}
                    onChange={(e) =>
                      updateField(
                        selectedCidade.slug,
                        "areaKm2",
                        e.target.value,
                      )
                    }
                    data-ocid="admin.cidades.input"
                  />
                </div>
              </div>

              {/* Economia */}
              <div>
                <Label className="text-xs text-gray-600 mb-1 block">
                  Economia
                </Label>
                <Textarea
                  rows={2}
                  value={selectedCidade.economia}
                  onChange={(e) =>
                    updateField(selectedCidade.slug, "economia", e.target.value)
                  }
                  data-ocid="admin.cidades.textarea"
                />
              </div>

              {/* Turismo */}
              <div>
                <Label className="text-xs text-gray-600 mb-1 block">
                  Turismo (um item por linha)
                </Label>
                <Textarea
                  rows={4}
                  value={selectedCidade.turismo.join("\n")}
                  onChange={(e) =>
                    updateField(
                      selectedCidade.slug,
                      "turismo",
                      e.target.value.split("\n").filter(Boolean),
                    )
                  }
                  data-ocid="admin.cidades.textarea"
                />
              </div>

              {/* Pontos Históricos */}
              <div>
                <Label className="text-xs text-gray-600 mb-1 block">
                  Pontos Históricos (um por linha)
                </Label>
                <Textarea
                  rows={3}
                  value={selectedCidade.pontosHistoricos.join("\n")}
                  onChange={(e) =>
                    updateField(
                      selectedCidade.slug,
                      "pontosHistoricos",
                      e.target.value.split("\n").filter(Boolean),
                    )
                  }
                  data-ocid="admin.cidades.textarea"
                />
              </div>

              {/* Gastronomia */}
              <div>
                <Label className="text-xs text-gray-600 mb-1 block">
                  Gastronomia
                </Label>
                <Textarea
                  rows={2}
                  value={selectedCidade.gastronomia}
                  onChange={(e) =>
                    updateField(
                      selectedCidade.slug,
                      "gastronomia",
                      e.target.value,
                    )
                  }
                  data-ocid="admin.cidades.textarea"
                />
              </div>

              {/* Foto */}
              <div>
                <Label className="text-xs text-gray-600 mb-1 block">
                  Descrição da Foto
                </Label>
                <Input
                  value={selectedCidade.fotoDescricao}
                  onChange={(e) =>
                    updateField(
                      selectedCidade.slug,
                      "fotoDescricao",
                      e.target.value,
                    )
                  }
                  data-ocid="admin.cidades.input"
                />
              </div>

              <div>
                <Label className="text-xs text-gray-600 mb-1 block">
                  Foto da Cidade
                </Label>
                <div className="flex items-start gap-3">
                  {selectedCidade.fotoUrl && (
                    <img
                      src={selectedCidade.fotoUrl}
                      alt={selectedCidade.fotoDescricao}
                      className="w-24 h-16 object-cover rounded-lg border"
                    />
                  )}
                  <label
                    className="flex items-center gap-2 px-3 py-2 rounded-lg border border-dashed border-gray-300 text-sm text-gray-600 hover:border-[#d7350d] hover:text-[#d7350d] cursor-pointer transition-colors"
                    data-ocid="admin.cidades.upload_button"
                  >
                    <Upload className="w-4 h-4" />
                    {selectedCidade.fotoUrl ? "Trocar foto" : "Enviar foto"}
                    <input
                      type="file"
                      accept="image/*"
                      className="hidden"
                      onChange={(e) => handleFotoUpload(selectedCidade.slug, e)}
                    />
                  </label>
                </div>
              </div>

              {/* Cidade Universitária */}
              <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                <input
                  type="checkbox"
                  id="universitaria-toggle"
                  checked={selectedCidade.universitaria}
                  onChange={(e) =>
                    updateField(
                      selectedCidade.slug,
                      "universitaria",
                      e.target.checked,
                    )
                  }
                  className="w-4 h-4 accent-[#d7350d]"
                  data-ocid="admin.cidades.checkbox"
                />
                <label
                  htmlFor="universitaria-toggle"
                  className="text-sm font-medium text-gray-700"
                >
                  Cidade Universitária (exibe selo na página)
                </label>
              </div>

              {/* Universidades */}
              {selectedCidade.universitaria && (
                <div>
                  <Label className="text-xs text-gray-600 mb-1 block">
                    Universidades (uma por linha)
                  </Label>
                  <Textarea
                    rows={3}
                    value={(selectedCidade.universidades ?? []).join("\n")}
                    onChange={(e) =>
                      updateField(
                        selectedCidade.slug,
                        "universidades",
                        e.target.value.split("\n").filter(Boolean),
                      )
                    }
                    data-ocid="admin.cidades.textarea"
                  />
                </div>
              )}

              <div className="pt-2">
                <Button
                  onClick={handleSave}
                  className="w-full bg-[#d7350d] hover:bg-[#c02e0c] text-white"
                  data-ocid="admin.cidades.submit_button"
                >
                  Salvar alterações
                </Button>
                <p className="text-xs text-gray-400 mt-2 text-center">
                  As alterações são salvas localmente. Para persistência
                  permanente, exporte e aplique no código.
                </p>
              </div>
            </div>
          </div>
        ) : (
          <div className="flex-1 flex items-center justify-center text-gray-400">
            <div className="text-center">
              <MapPin className="w-10 h-10 mx-auto mb-2 opacity-30" />
              <p>Selecione uma cidade para editar</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
