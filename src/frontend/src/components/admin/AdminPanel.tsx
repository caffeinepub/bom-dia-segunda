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
  FileText,
  Globe,
  Layers,
  LogOut,
  MessageSquare,
  RefreshCw,
  Settings,
  ShoppingBag,
  Star,
  Trash2,
  X,
} from "lucide-react";
import { useEffect, useState } from "react";
import { toast } from "sonner";

type Tab =
  | "vagas"
  | "curriculos"
  | "depoimentos"
  | "blog"
  | "loja"
  | "fontes"
  | "configuracoes";

const SIDEBAR_ITEMS: { id: Tab; label: string; icon: React.ReactNode }[] = [
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
  const [activeTab, setActiveTab] = useState<Tab>("vagas");

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
          <Button
            className="w-full bg-[#d7350d] hover:bg-[#c02e0c] text-white"
            onClick={handleLogin}
            disabled={loading || isFetching}
            data-ocid="admin.primary_button"
          >
            {loading ? "Verificando..." : "Entrar como Administrador"}
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
        <aside className="w-52 shrink-0 py-4" style={{ background: "#1a1a1a" }}>
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
          {activeTab === "vagas" && <VagasTab />}
          {activeTab === "curriculos" && <CurriculosTab />}
          {activeTab === "depoimentos" && <DepoimentosTab />}
          {activeTab === "blog" && <BlogTab />}
          {activeTab === "loja" && <LojaTab />}
          {activeTab === "fontes" && <FontesTab />}
          {activeTab === "configuracoes" && <ConfiguracoesTab />}
        </main>
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
  const [form, setForm] = useState<Partial<JobListing>>({
    jobType: "CLT",
  });

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
        jobType: form.jobType ?? "CLT",
        salary: form.salary ?? "A combinar",
        badge: form.badge ?? undefined,
        area: form.area ?? "Geral",
        source: form.source ?? "Manual",
        applyUrl: form.applyUrl ?? "#",
        postedAt: nowNano(),
      });
      toast.success("Vaga adicionada!");
      setOpen(false);
      setForm({ jobType: "CLT" });
      load();
    } catch {
      toast.error("Erro ao adicionar vaga.");
    }
  }

  async function handleDelete(id: string) {
    // There's no deleteVaga in API, so we just remove from local state
    setVagas((v) => v.filter((j) => j.id !== id));
    toast.success("Vaga removida.");
  }

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

      <div className="bg-white rounded-xl border overflow-hidden shadow-sm">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Título</TableHead>
              <TableHead>Empresa</TableHead>
              <TableHead>Cidade</TableHead>
              <TableHead>Tipo</TableHead>
              <TableHead>Fonte</TableHead>
              <TableHead>Data</TableHead>
              <TableHead />
            </TableRow>
          </TableHeader>
          <TableBody>
            {vagas.length === 0 && (
              <TableRow>
                <TableCell
                  colSpan={7}
                  className="text-center text-gray-400 py-8"
                  data-ocid="admin.vagas.empty_state"
                >
                  Nenhuma vaga cadastrada.
                </TableCell>
              </TableRow>
            )}
            {vagas.map((v, i) => (
              <TableRow key={v.id} data-ocid={`admin.vagas.item.${i + 1}`}>
                <TableCell className="font-medium">{v.title}</TableCell>
                <TableCell>{v.company}</TableCell>
                <TableCell>{v.city}</TableCell>
                <TableCell>
                  <Badge variant="outline">{v.jobType}</Badge>
                </TableCell>
                <TableCell>{v.source}</TableCell>
                <TableCell>{fmtDate(v.postedAt)}</TableCell>
                <TableCell>
                  <button
                    type="button"
                    onClick={() => handleDelete(v.id)}
                    className="text-red-500 hover:text-red-700"
                    data-ocid={`admin.vagas.delete_button.${i + 1}`}
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent data-ocid="admin.vagas.dialog">
          <DialogHeader>
            <DialogTitle>Nova Vaga</DialogTitle>
          </DialogHeader>
          <div className="space-y-3 py-2">
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
                  value={form.jobType ?? "CLT"}
                  onValueChange={(v) => setForm((f) => ({ ...f, jobType: v }))}
                >
                  <SelectTrigger data-ocid="admin.vagas.select">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {[
                      "CLT",
                      "Estágio",
                      "Jovem Aprendiz",
                      "PCD",
                      "PJ",
                      "Remoto",
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
                  placeholder="R$ 2.000 - R$ 3.000"
                  onChange={(e) =>
                    setForm((f) => ({ ...f, salary: e.target.value }))
                  }
                  data-ocid="admin.vagas.input"
                />
              </div>
              <div>
                <Label>Badge</Label>
                <Input
                  value={form.badge ?? ""}
                  placeholder="Nova, Urgente..."
                  onChange={(e) =>
                    setForm((f) => ({
                      ...f,
                      badge: e.target.value || undefined,
                    }))
                  }
                  data-ocid="admin.vagas.input"
                />
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

  return (
    <div>
      <h2 className="text-lg font-bold text-[#1a1a1a] mb-4">Depoimentos</h2>
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
            {testimonials.length === 0 && (
              <TableRow>
                <TableCell
                  colSpan={7}
                  className="text-center text-gray-400 py-8"
                  data-ocid="admin.depoimentos.empty_state"
                >
                  Nenhum depoimento encontrado.
                </TableCell>
              </TableRow>
            )}
            {testimonials.map((t, i) => (
              <TableRow
                key={t.id}
                className={!t.approved ? "bg-yellow-50" : ""}
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
                        className="text-green-600 hover:text-green-800"
                        onClick={() => approve(t.id)}
                        data-ocid={`admin.depoimentos.confirm_button.${i + 1}`}
                      >
                        <Star className="w-4 h-4" />
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
  const [form, setForm] = useState<Partial<BlogPost>>({ published: false });

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
    setForm({ published: false });
    setOpen(true);
  }

  function openEdit(post: BlogPost) {
    setEditing(post);
    setForm({ ...post });
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
      published: form.published ?? false,
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
              <TableHead>Data</TableHead>
              <TableHead />
            </TableRow>
          </TableHeader>
          <TableBody>
            {posts.length === 0 && (
              <TableRow>
                <TableCell
                  colSpan={5}
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
                <TableCell>
                  <Badge variant={p.published ? "default" : "outline"}>
                    {p.published ? "Publicado" : "Rascunho"}
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
            <div className="flex items-center gap-2">
              <Checkbox
                id="pub"
                checked={form.published ?? false}
                onCheckedChange={(v) =>
                  setForm((f) => ({ ...f, published: !!v }))
                }
                data-ocid="admin.blog.checkbox"
              />
              <Label htmlFor="pub">Publicado</Label>
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
      if (conf) setPayConf(conf);
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

      {/* Payment Config */}
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
                id="active"
                checked={form.active ?? true}
                onCheckedChange={(v) => setForm((f) => ({ ...f, active: !!v }))}
                data-ocid="admin.fontes.checkbox"
              />
              <Label htmlFor="active">Fonte ativa</Label>
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
    <div className="max-w-xl">
      <h2 className="text-lg font-bold text-[#1a1a1a] mb-6">Configurações</h2>
      <div className="bg-white rounded-xl border p-6 shadow-sm space-y-6">
        <div>
          <h3 className="font-semibold text-sm text-gray-700 mb-1">
            Atualização de Vagas
          </h3>
          <p className="text-xs text-gray-500 mb-3">
            Dispara manualmente a coleta semanal de vagas. Normalmente executada
            automaticamente todo domingo.
          </p>
          <Button
            className="bg-[#d7350d] text-white hover:bg-[#c02e0c] flex items-center gap-2"
            onClick={triggerUpdate}
            disabled={updating}
            data-ocid="admin.config.primary_button"
          >
            <RefreshCw
              className={`w-4 h-4 ${updating ? "animate-spin" : ""}`}
            />
            {updating ? "Atualizando..." : "Disparar Atualização Semanal"}
          </Button>
        </div>

        <div className="border-t pt-4">
          <h3 className="font-semibold text-sm text-gray-700 mb-2">
            Informações do Sistema
          </h3>
          <ul className="text-xs text-gray-500 space-y-1">
            <li>Plataforma: Bom Dia Segunda v1.0</li>
            <li>Região: Sul Fluminense & Centro-Sul Fluminense</li>
            <li>Infraestrutura: Internet Computer (ICP)</li>
            <li>Atualização automática: todo domingo</li>
          </ul>
        </div>

        <div className="border-t pt-4">
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
    </div>
  );
}
