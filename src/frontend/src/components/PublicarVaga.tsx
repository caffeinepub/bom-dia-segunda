import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { ArrowLeft, CheckCircle, Info } from "lucide-react";
import { useEffect, useState } from "react";

const STORAGE_KEY = "bds_company_data";

const CITIES = [
  "Angra dos Reis",
  "Barra do Piraí",
  "Barra Mansa",
  "Itatiaia",
  "Paraty",
  "Pinheiral",
  "Piraí",
  "Porto Real",
  "Quatis",
  "Resende",
  "Rio Claro",
  "Rio das Flores",
  "Valença",
  "Três Rios",
  "Vassouras",
  "Areal",
  "Comendador Levy Gasparian",
  "Engenheiro Paulo de Frontin",
  "Mendes",
  "Miguel Pereira",
  "Paracambi",
  "Paraíba do Sul",
  "Paty do Alferes",
  "Sapucaia",
  "Outra",
];

const CONTRACT_TYPES = [
  "Efetiva",
  "Temporária",
  "Estágio",
  "Menor Aprendiz",
  "Remota",
  "PCD",
];

const EDUCATION_LEVELS = [
  "Ensino Fundamental",
  "Ensino Médio",
  "Ensino Técnico",
  "Graduação",
  "Pós-graduação",
];

interface CompanyData {
  razaoSocial: string;
  cnpj: string;
  endereco: string;
  telefone: string;
  responsavel: string;
  whatsapp: string;
}

interface FormErrors {
  razaoSocial?: string;
  cnpj?: string;
  endereco?: string;
  telefone?: string;
  responsavel?: string;
  whatsapp?: string;
  tituloCargo?: string;
  tipoContratacao?: string;
  cidade?: string;
  descricao?: string;
  requisitos?: string;
  escolaridade?: string;
  lgpd?: string;
}

function formatCNPJ(value: string): string {
  const digits = value.replace(/\D/g, "").slice(0, 14);
  if (digits.length <= 2) return digits;
  if (digits.length <= 5) return `${digits.slice(0, 2)}.${digits.slice(2)}`;
  if (digits.length <= 8)
    return `${digits.slice(0, 2)}.${digits.slice(2, 5)}.${digits.slice(5)}`;
  if (digits.length <= 12)
    return `${digits.slice(0, 2)}.${digits.slice(2, 5)}.${digits.slice(5, 8)}/${digits.slice(8)}`;
  return `${digits.slice(0, 2)}.${digits.slice(2, 5)}.${digits.slice(5, 8)}/${digits.slice(8, 12)}-${digits.slice(12)}`;
}

function formatPhone(value: string): string {
  const digits = value.replace(/\D/g, "").slice(0, 11);
  if (digits.length <= 2) return digits.length ? `(${digits}` : "";
  if (digits.length <= 7) return `(${digits.slice(0, 2)}) ${digits.slice(2)}`;
  return `(${digits.slice(0, 2)}) ${digits.slice(2, 7)}-${digits.slice(7)}`;
}

function Logo() {
  return (
    <span className="font-black italic text-2xl tracking-tight leading-none select-none">
      <span className="text-black">BOM</span>
      <span className="text-[#d7350d]">DIA</span>
      <span className="text-black">SEGUNDA</span>
    </span>
  );
}

export default function PublicarVaga() {
  const [autoFilled, setAutoFilled] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [errors, setErrors] = useState<FormErrors>({});

  // Company fields
  const [razaoSocial, setRazaoSocial] = useState("");
  const [cnpj, setCnpj] = useState("");
  const [endereco, setEndereco] = useState("");
  const [telefone, setTelefone] = useState("");
  const [responsavel, setResponsavel] = useState("");
  const [whatsapp, setWhatsapp] = useState("");

  // Job fields
  const [tituloCargo, setTituloCargo] = useState("");
  const [tipoContratacao, setTipoContratacao] = useState("");
  const [cidade, setCidade] = useState("");
  const [faixaSalarial, setFaixaSalarial] = useState("");
  const [prazoInscricao, setPrazoInscricao] = useState("");
  const [descricao, setDescricao] = useState("");
  const [requisitos, setRequisitos] = useState("");
  const [escolaridade, setEscolaridade] = useState("");

  // LGPD
  const [lgpdAccepted, setLgpdAccepted] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      try {
        const data: CompanyData = JSON.parse(saved);
        setRazaoSocial(data.razaoSocial || "");
        setCnpj(data.cnpj || "");
        setEndereco(data.endereco || "");
        setTelefone(data.telefone || "");
        setResponsavel(data.responsavel || "");
        setWhatsapp(data.whatsapp || "");
        if (data.razaoSocial) setAutoFilled(true);
      } catch {
        // ignore
      }
    }
  }, []);

  function clearSavedData() {
    localStorage.removeItem(STORAGE_KEY);
    setRazaoSocial("");
    setCnpj("");
    setEndereco("");
    setTelefone("");
    setResponsavel("");
    setWhatsapp("");
    setAutoFilled(false);
  }

  function goHome() {
    window.location.hash = "";
    window.scrollTo(0, 0);
  }

  function validate(): boolean {
    const newErrors: FormErrors = {};
    if (!razaoSocial.trim()) newErrors.razaoSocial = "Campo obrigatório";
    if (!cnpj.trim() || cnpj.replace(/\D/g, "").length < 14)
      newErrors.cnpj = "CNPJ inválido";
    if (!endereco.trim()) newErrors.endereco = "Campo obrigatório";
    if (!telefone.trim()) newErrors.telefone = "Campo obrigatório";
    if (!responsavel.trim()) newErrors.responsavel = "Campo obrigatório";
    if (!whatsapp.trim()) newErrors.whatsapp = "Campo obrigatório";
    if (!tituloCargo.trim()) newErrors.tituloCargo = "Campo obrigatório";
    if (!tipoContratacao) newErrors.tipoContratacao = "Selecione o tipo";
    if (!cidade) newErrors.cidade = "Selecione a cidade";
    if (!descricao.trim()) newErrors.descricao = "Campo obrigatório";
    if (!requisitos.trim()) newErrors.requisitos = "Campo obrigatório";
    if (!escolaridade) newErrors.escolaridade = "Selecione o nível";
    if (!lgpdAccepted)
      newErrors.lgpd = "Você deve aceitar os termos LGPD para continuar";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!validate()) return;

    // Save company data
    const companyData: CompanyData = {
      razaoSocial,
      cnpj,
      endereco,
      telefone,
      responsavel,
      whatsapp,
    };
    localStorage.setItem(STORAGE_KEY, JSON.stringify(companyData));

    setSubmitted(true);
    window.scrollTo(0, 0);
  }

  function handlePublishAnother() {
    setTituloCargo("");
    setTipoContratacao("");
    setCidade("");
    setFaixaSalarial("");
    setPrazoInscricao("");
    setDescricao("");
    setRequisitos("");
    setEscolaridade("");
    setLgpdAccepted(false);
    setErrors({});
    setSubmitted(false);
    window.scrollTo(0, 0);
  }

  if (submitted) {
    return (
      <div className="min-h-screen bg-gray-50 flex flex-col">
        <header className="sticky top-0 z-50 bg-white border-b border-gray-200 shadow-sm">
          <div className="max-w-3xl mx-auto px-4 h-16 flex items-center gap-4">
            <button
              type="button"
              onClick={goHome}
              className="flex items-center gap-1 text-sm text-gray-600 hover:text-[#d7350d] transition-colors"
              data-ocid="publicar_vaga.link"
            >
              <ArrowLeft className="w-4 h-4" />
              Voltar
            </button>
            <Logo />
            <span className="text-gray-400">|</span>
            <span className="text-sm font-semibold text-[#1a1a1a]">
              Publicar Vaga
            </span>
          </div>
        </header>
        <main className="flex-1 flex items-center justify-center px-4 py-16">
          <div
            className="max-w-lg w-full text-center"
            data-ocid="publicar_vaga.success_state"
          >
            <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <CheckCircle className="w-10 h-10 text-green-600" />
            </div>
            <h2 className="text-2xl font-bold text-[#1a1a1a] mb-3">
              Vaga enviada com sucesso!
            </h2>
            <p className="text-gray-600 mb-2">
              Sua vaga será revisada pela nossa equipe e publicada em breve.
            </p>
            <p className="text-gray-500 text-sm mb-8">
              Prazo de análise: até 48 horas úteis.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Button
                onClick={handlePublishAnother}
                className="bg-[#d7350d] hover:bg-[#b82d0b] text-white"
                data-ocid="publicar_vaga.primary_button"
              >
                Publicar outra vaga
              </Button>
              <Button
                variant="outline"
                onClick={goHome}
                data-ocid="publicar_vaga.secondary_button"
              >
                <ArrowLeft className="w-4 h-4 mr-1" /> Voltar ao site
              </Button>
            </div>
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-white border-b border-gray-200 shadow-sm">
        <div className="max-w-3xl mx-auto px-4 h-16 flex items-center gap-4">
          <button
            type="button"
            onClick={goHome}
            className="flex items-center gap-1 text-sm text-gray-600 hover:text-[#d7350d] transition-colors"
            data-ocid="publicar_vaga.link"
          >
            <ArrowLeft className="w-4 h-4" />
            Voltar
          </button>
          <Logo />
          <span className="text-gray-400">|</span>
          <span className="text-sm font-semibold text-[#1a1a1a]">
            Publicar Vaga
          </span>
        </div>
      </header>

      <main className="flex-1 px-4 py-8">
        <div className="max-w-2xl mx-auto">
          <div className="mb-6">
            <h1 className="text-2xl font-bold text-[#1a1a1a] mb-1">
              Publicar Vaga
            </h1>
            <p className="text-gray-500 text-sm">
              Preencha o formulário abaixo para divulgar sua vaga na plataforma
              Bom Dia Segunda.
            </p>
          </div>

          <form onSubmit={handleSubmit} noValidate className="space-y-6">
            {/* Section 1: Dados da Empresa */}
            <Card className="border border-gray-200 shadow-sm">
              <CardHeader className="pb-3">
                <CardTitle className="text-base font-semibold text-[#1a1a1a] flex items-center gap-2">
                  <span className="w-6 h-6 rounded-full bg-[#d7350d] text-white text-xs flex items-center justify-center font-bold">
                    1
                  </span>
                  Dados da Empresa
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {autoFilled && (
                  <div
                    className="flex items-start gap-2 bg-blue-50 border border-blue-200 rounded-md px-3 py-2"
                    data-ocid="publicar_vaga.panel"
                  >
                    <Info className="w-4 h-4 text-blue-500 mt-0.5 shrink-0" />
                    <div className="flex-1 text-sm text-blue-700">
                      ✓ Dados da empresa carregados do seu último cadastro.
                      <button
                        type="button"
                        onClick={clearSavedData}
                        className="ml-2 underline text-blue-600 hover:text-blue-800"
                        data-ocid="publicar_vaga.secondary_button"
                      >
                        Limpar dados salvos
                      </button>
                    </div>
                  </div>
                )}

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="sm:col-span-2">
                    <Label
                      htmlFor="razaoSocial"
                      className="text-sm font-medium"
                    >
                      Razão Social <span className="text-[#d7350d]">*</span>
                    </Label>
                    <Input
                      id="razaoSocial"
                      value={razaoSocial}
                      onChange={(e) => setRazaoSocial(e.target.value)}
                      placeholder="Nome da empresa conforme CNPJ"
                      className={`mt-1 ${errors.razaoSocial ? "border-red-500" : ""}`}
                      data-ocid="publicar_vaga.input"
                    />
                    {errors.razaoSocial && (
                      <p
                        className="text-red-500 text-xs mt-1"
                        data-ocid="publicar_vaga.error_state"
                      >
                        {errors.razaoSocial}
                      </p>
                    )}
                  </div>

                  <div>
                    <Label htmlFor="cnpj" className="text-sm font-medium">
                      CNPJ <span className="text-[#d7350d]">*</span>
                    </Label>
                    <Input
                      id="cnpj"
                      value={cnpj}
                      onChange={(e) => setCnpj(formatCNPJ(e.target.value))}
                      placeholder="00.000.000/0000-00"
                      className={`mt-1 ${errors.cnpj ? "border-red-500" : ""}`}
                      data-ocid="publicar_vaga.input"
                    />
                    {errors.cnpj && (
                      <p
                        className="text-red-500 text-xs mt-1"
                        data-ocid="publicar_vaga.error_state"
                      >
                        {errors.cnpj}
                      </p>
                    )}
                  </div>

                  <div className="sm:col-span-2">
                    <Label htmlFor="endereco" className="text-sm font-medium">
                      Endereço Completo{" "}
                      <span className="text-[#d7350d]">*</span>
                    </Label>
                    <Input
                      id="endereco"
                      value={endereco}
                      onChange={(e) => setEndereco(e.target.value)}
                      placeholder="Rua, número, bairro, cidade, CEP"
                      className={`mt-1 ${errors.endereco ? "border-red-500" : ""}`}
                      data-ocid="publicar_vaga.input"
                    />
                    {errors.endereco && (
                      <p
                        className="text-red-500 text-xs mt-1"
                        data-ocid="publicar_vaga.error_state"
                      >
                        {errors.endereco}
                      </p>
                    )}
                  </div>

                  <div>
                    <Label htmlFor="telefone" className="text-sm font-medium">
                      Telefone de Contato{" "}
                      <span className="text-[#d7350d]">*</span>
                    </Label>
                    <Input
                      id="telefone"
                      value={telefone}
                      onChange={(e) => setTelefone(formatPhone(e.target.value))}
                      placeholder="(24) 99999-9999"
                      className={`mt-1 ${errors.telefone ? "border-red-500" : ""}`}
                      data-ocid="publicar_vaga.input"
                    />
                    {errors.telefone && (
                      <p
                        className="text-red-500 text-xs mt-1"
                        data-ocid="publicar_vaga.error_state"
                      >
                        {errors.telefone}
                      </p>
                    )}
                  </div>

                  <div>
                    <Label
                      htmlFor="responsavel"
                      className="text-sm font-medium"
                    >
                      Responsável pela Vaga{" "}
                      <span className="text-[#d7350d]">*</span>
                    </Label>
                    <Input
                      id="responsavel"
                      value={responsavel}
                      onChange={(e) => setResponsavel(e.target.value)}
                      placeholder="Nome do responsável"
                      className={`mt-1 ${errors.responsavel ? "border-red-500" : ""}`}
                      data-ocid="publicar_vaga.input"
                    />
                    {errors.responsavel && (
                      <p
                        className="text-red-500 text-xs mt-1"
                        data-ocid="publicar_vaga.error_state"
                      >
                        {errors.responsavel}
                      </p>
                    )}
                  </div>

                  <div>
                    <Label htmlFor="whatsapp" className="text-sm font-medium">
                      WhatsApp do Responsável{" "}
                      <span className="text-[#d7350d]">*</span>
                    </Label>
                    <Input
                      id="whatsapp"
                      value={whatsapp}
                      onChange={(e) => setWhatsapp(formatPhone(e.target.value))}
                      placeholder="(24) 99999-9999"
                      className={`mt-1 ${errors.whatsapp ? "border-red-500" : ""}`}
                      data-ocid="publicar_vaga.input"
                    />
                    {errors.whatsapp && (
                      <p
                        className="text-red-500 text-xs mt-1"
                        data-ocid="publicar_vaga.error_state"
                      >
                        {errors.whatsapp}
                      </p>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Section 2: Informações da Vaga */}
            <Card className="border border-gray-200 shadow-sm">
              <CardHeader className="pb-3">
                <CardTitle className="text-base font-semibold text-[#1a1a1a] flex items-center gap-2">
                  <span className="w-6 h-6 rounded-full bg-[#d7350d] text-white text-xs flex items-center justify-center font-bold">
                    2
                  </span>
                  Informações da Vaga
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="sm:col-span-2">
                    <Label
                      htmlFor="tituloCargo"
                      className="text-sm font-medium"
                    >
                      Título do Cargo <span className="text-[#d7350d]">*</span>
                    </Label>
                    <Input
                      id="tituloCargo"
                      value={tituloCargo}
                      onChange={(e) => setTituloCargo(e.target.value)}
                      placeholder="Ex: Auxiliar Administrativo, Vendedor, Analista de TI"
                      className={`mt-1 ${errors.tituloCargo ? "border-red-500" : ""}`}
                      data-ocid="publicar_vaga.input"
                    />
                    {errors.tituloCargo && (
                      <p
                        className="text-red-500 text-xs mt-1"
                        data-ocid="publicar_vaga.error_state"
                      >
                        {errors.tituloCargo}
                      </p>
                    )}
                  </div>

                  <div>
                    <Label className="text-sm font-medium">
                      Tipo de Contratação{" "}
                      <span className="text-[#d7350d]">*</span>
                    </Label>
                    <Select
                      value={tipoContratacao}
                      onValueChange={setTipoContratacao}
                    >
                      <SelectTrigger
                        className={`mt-1 ${errors.tipoContratacao ? "border-red-500" : ""}`}
                        data-ocid="publicar_vaga.select"
                      >
                        <SelectValue placeholder="Selecione" />
                      </SelectTrigger>
                      <SelectContent>
                        {CONTRACT_TYPES.map((t) => (
                          <SelectItem key={t} value={t}>
                            {t}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    {errors.tipoContratacao && (
                      <p
                        className="text-red-500 text-xs mt-1"
                        data-ocid="publicar_vaga.error_state"
                      >
                        {errors.tipoContratacao}
                      </p>
                    )}
                  </div>

                  <div>
                    <Label className="text-sm font-medium">
                      Cidade <span className="text-[#d7350d]">*</span>
                    </Label>
                    <Select value={cidade} onValueChange={setCidade}>
                      <SelectTrigger
                        className={`mt-1 ${errors.cidade ? "border-red-500" : ""}`}
                        data-ocid="publicar_vaga.select"
                      >
                        <SelectValue placeholder="Selecione" />
                      </SelectTrigger>
                      <SelectContent>
                        {CITIES.map((c) => (
                          <SelectItem key={c} value={c}>
                            {c}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    {errors.cidade && (
                      <p
                        className="text-red-500 text-xs mt-1"
                        data-ocid="publicar_vaga.error_state"
                      >
                        {errors.cidade}
                      </p>
                    )}
                  </div>

                  <div>
                    <Label
                      htmlFor="faixaSalarial"
                      className="text-sm font-medium"
                    >
                      Faixa Salarial{" "}
                      <span className="text-gray-400 font-normal">
                        (opcional)
                      </span>
                    </Label>
                    <Input
                      id="faixaSalarial"
                      value={faixaSalarial}
                      onChange={(e) => setFaixaSalarial(e.target.value)}
                      placeholder="Ex: R$ 2.500 - R$ 3.000 ou A combinar"
                      className="mt-1"
                      data-ocid="publicar_vaga.input"
                    />
                  </div>

                  <div>
                    <Label
                      htmlFor="prazoInscricao"
                      className="text-sm font-medium"
                    >
                      Prazo de Inscrição{" "}
                      <span className="text-gray-400 font-normal">
                        (opcional)
                      </span>
                    </Label>
                    <Input
                      id="prazoInscricao"
                      type="date"
                      value={prazoInscricao}
                      onChange={(e) => setPrazoInscricao(e.target.value)}
                      className="mt-1"
                      data-ocid="publicar_vaga.input"
                    />
                  </div>

                  <div>
                    <Label className="text-sm font-medium">
                      Nível de Escolaridade{" "}
                      <span className="text-[#d7350d]">*</span>
                    </Label>
                    <Select
                      value={escolaridade}
                      onValueChange={setEscolaridade}
                    >
                      <SelectTrigger
                        className={`mt-1 ${errors.escolaridade ? "border-red-500" : ""}`}
                        data-ocid="publicar_vaga.select"
                      >
                        <SelectValue placeholder="Selecione" />
                      </SelectTrigger>
                      <SelectContent>
                        {EDUCATION_LEVELS.map((e) => (
                          <SelectItem key={e} value={e}>
                            {e}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    {errors.escolaridade && (
                      <p
                        className="text-red-500 text-xs mt-1"
                        data-ocid="publicar_vaga.error_state"
                      >
                        {errors.escolaridade}
                      </p>
                    )}
                  </div>

                  <div className="sm:col-span-2">
                    <Label htmlFor="descricao" className="text-sm font-medium">
                      Descrição Detalhada do Cargo{" "}
                      <span className="text-[#d7350d]">*</span>
                    </Label>
                    <Textarea
                      id="descricao"
                      value={descricao}
                      onChange={(e) => setDescricao(e.target.value)}
                      placeholder="Descreva as atividades, responsabilidades e benefícios da vaga..."
                      rows={5}
                      className={`mt-1 resize-y ${errors.descricao ? "border-red-500" : ""}`}
                      data-ocid="publicar_vaga.textarea"
                    />
                    {errors.descricao && (
                      <p
                        className="text-red-500 text-xs mt-1"
                        data-ocid="publicar_vaga.error_state"
                      >
                        {errors.descricao}
                      </p>
                    )}
                  </div>

                  <div className="sm:col-span-2">
                    <Label htmlFor="requisitos" className="text-sm font-medium">
                      Requisitos <span className="text-[#d7350d]">*</span>
                    </Label>
                    <Textarea
                      id="requisitos"
                      value={requisitos}
                      onChange={(e) => setRequisitos(e.target.value)}
                      placeholder="Liste os requisitos necessários para a vaga..."
                      rows={3}
                      className={`mt-1 resize-y ${errors.requisitos ? "border-red-500" : ""}`}
                      data-ocid="publicar_vaga.textarea"
                    />
                    {errors.requisitos && (
                      <p
                        className="text-red-500 text-xs mt-1"
                        data-ocid="publicar_vaga.error_state"
                      >
                        {errors.requisitos}
                      </p>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Section 3: LGPD */}
            <Card className="border border-amber-200 bg-amber-50 shadow-sm">
              <CardHeader className="pb-3">
                <CardTitle className="text-base font-semibold text-[#1a1a1a] flex items-center gap-2">
                  <span className="w-6 h-6 rounded-full bg-amber-500 text-white text-xs flex items-center justify-center font-bold">
                    3
                  </span>
                  Autorização LGPD
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-start gap-3">
                  <Checkbox
                    id="lgpd"
                    checked={lgpdAccepted}
                    onCheckedChange={(v) => setLgpdAccepted(v === true)}
                    className="mt-0.5"
                    data-ocid="publicar_vaga.checkbox"
                  />
                  <Label
                    htmlFor="lgpd"
                    className="text-sm text-gray-700 leading-relaxed cursor-pointer"
                  >
                    Autorizo o uso dos dados fornecidos para divulgação da vaga
                    na plataforma Bom Dia Segunda, conforme a Lei Geral de
                    Proteção de Dados (LGPD - Lei nº 13.709/2018).
                  </Label>
                </div>
                {errors.lgpd && (
                  <p
                    className="text-red-500 text-xs"
                    data-ocid="publicar_vaga.error_state"
                  >
                    {errors.lgpd}
                  </p>
                )}
                <p className="text-xs text-gray-500">
                  Seus dados serão utilizados exclusivamente para fins de
                  divulgação da vaga. Você pode solicitar a remoção a qualquer
                  momento pelo e-mail{" "}
                  <a
                    href="mailto:contato@bomdiasegunda.com.br"
                    className="underline hover:text-[#d7350d]"
                  >
                    contato@bomdiasegunda.com.br
                  </a>
                </p>
              </CardContent>
            </Card>

            <Button
              type="submit"
              className="w-full bg-[#d7350d] hover:bg-[#b82d0b] text-white text-base py-3 h-auto"
              data-ocid="publicar_vaga.submit_button"
            >
              Enviar Vaga para Publicação
            </Button>
          </form>
        </div>
      </main>
    </div>
  );
}
