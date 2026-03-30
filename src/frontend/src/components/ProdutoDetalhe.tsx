import { PRODUCTS } from "@/data/mockData";
import {
  ArrowLeft,
  ExternalLink,
  Package,
  ShoppingCart,
  Star,
  Tag,
  Truck,
} from "lucide-react";

interface ProdutoDetalheProps {
  productId: string;
  onBack: () => void;
  onViewOther: (id: string) => void;
}

const PRODUCT_DETAILS: Record<
  string,
  { description: string; features: string[]; type: "direct" | "affiliate" }
> = {
  "1": {
    description:
      "Guia completo para quem entra no mercado pela primeira vez. Aprenda a montar um currículo atrativo, como se comportar em entrevistas e onde buscar vagas na sua cidade.",
    features: [
      "Mais de 80 páginas de conteúdo prático",
      "Modelos de currículo editáveis incluídos",
      "Checklist de preparação para entrevistas",
      "Guia de pesquisa de emprego por região",
      "Acesso imediato em PDF após pagamento",
    ],
    type: "direct",
  },
  "2": {
    description:
      "Transforme seu currículo em uma ferramenta poderosa. Passo a passo para criar um currículo que passa pela triagem ATS e impressiona recrutadores.",
    features: [
      "7 etapas detalhadas com exemplos reais",
      "Técnicas de otimização para sistemas ATS",
      "Banco de verbos de ação profissionais",
      "Versão para Word e Google Docs incluída",
    ],
    type: "direct",
  },
  "3": {
    description:
      "Domine o LinkedIn e atraia recrutadores. Aprenda como configurar cada seção, usar as palavras-chave certas e aumentar sua visibilidade.",
    features: [
      "Configuração completa do perfil passo a passo",
      "Estratégias de palavras-chave",
      "Como fazer networking efetivo",
      "Templates de mensagem para recrutadores",
    ],
    type: "direct",
  },
  "4": {
    description:
      "Supere o medo de falar em público e comunique-se com confiança em entrevistas, reuniões e apresentações. Curso com videoaulas e certificado.",
    features: [
      "12 horas de videoaulas",
      "Material de apoio em PDF",
      "Simulações de entrevista",
      "Certificado de conclusão",
    ],
    type: "affiliate",
  },
  "5": {
    description:
      "Do básico ao avançado, aprenda todas as funcionalidades do Excel que o mercado exige. Projetos práticos do mundo real.",
    features: [
      "15 horas de videoaulas",
      "Planilhas modelo para download",
      "Fórmulas, tabelas dinâmicas e dashboards",
      "Certificado de conclusão",
    ],
    type: "affiliate",
  },
  "6": {
    description:
      "Caneca de porcelana de alta qualidade com a frase motivacional 'Segunda é dia de vencer!'. Produto exclusivo BOM DIA SEGUNDA.",
    features: [
      "Porcelâna premium 350ml",
      "Arte impressa em alta resolução",
      "Resistênte a lava-louças",
      "Embalagem para presente inclusa",
    ],
    type: "direct",
  },
  "7": {
    description:
      "Caneca de porcelana com a frase 'Seu sucesso começa hoje!'. Um lembrete diário para manter o foco na sua jornada profissional.",
    features: [
      "Porcelâna premium 350ml",
      "Arte impressa em alta resolução",
      "Resistênte a lava-louças",
      "Embalagem para presente inclusa",
    ],
    type: "direct",
  },
  "8": {
    description:
      "Obra essencial sobre como construir e nutrir uma rede de contatos que realmente abre portas. Leitura recomendada pela equipe BOM DIA SEGUNDA.",
    features: [
      "Livro físico ou digital",
      "Técnicas de networking para introvertidos e extrovertidos",
      "Como manter relacionamentos profissionais",
      "Recomendação BDS",
    ],
    type: "affiliate",
  },
};

export default function ProdutoDetalhe({
  productId,
  onBack,
  onViewOther,
}: ProdutoDetalheProps) {
  const product = PRODUCTS.find((p) => p.id === productId);
  const otherProducts = PRODUCTS.filter((p) => p.id !== productId).slice(0, 4);
  const details = PRODUCT_DETAILS[productId];
  if (!product) return null;
  const isAffiliate = details?.type === "affiliate";

  return (
    <div className="min-h-screen bg-background">
      <div className="bg-white border-b border-border sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-4 py-3 flex items-center gap-2 flex-wrap">
          <button
            type="button"
            onClick={onBack}
            className="flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors"
          >
            <ArrowLeft className="w-4 h-4" /> Voltar ao Shopping
          </button>
          <span className="text-muted-foreground">/</span>
          <span className="text-sm font-bold">
            <span style={{ color: "#1a1a1a" }}>BOM</span>
            <span style={{ color: "#d7350d" }}>DIA</span>
            <span style={{ color: "#1a1a1a" }}>SEGUNDA</span>
            <span style={{ color: "#1a1a1a" }}> SHOPPING</span>
          </span>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
          <div className="flex items-start justify-center">
            <div className="w-full max-w-sm aspect-[3/4] overflow-hidden rounded-2xl shadow-lg border border-border relative">
              <img
                src={product.image}
                alt={product.title}
                className="w-full h-full object-cover"
              />
              {product.badge && (
                <span className="absolute top-3 left-3 bg-primary text-white text-xs font-bold px-3 py-1 rounded-full">
                  {product.badge}
                </span>
              )}
            </div>
          </div>

          <div className="flex flex-col gap-4">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <span className="text-xs font-semibold bg-gray-100 text-gray-600 px-2 py-0.5 rounded-full">
                  {product.author}
                </span>
                {isAffiliate && (
                  <span className="text-xs font-semibold bg-blue-50 text-blue-600 px-2 py-0.5 rounded-full flex items-center gap-1">
                    <ExternalLink className="w-3 h-3" /> Parceiro BDS
                  </span>
                )}
              </div>
              <h1 className="text-2xl font-bold text-foreground mb-3 leading-snug">
                {product.title}
              </h1>
              <div className="flex items-center gap-1 mb-3">
                {[1, 2, 3, 4, 5].map((s) => (
                  <Star
                    key={s}
                    className="w-4 h-4 fill-yellow-400 text-yellow-400"
                  />
                ))}
                <span className="text-sm text-muted-foreground ml-1">
                  (12 avaliações)
                </span>
              </div>
              <div className="text-3xl font-bold text-primary mb-4">
                {product.price}
              </div>
            </div>

            {details && (
              <div>
                <p className="text-muted-foreground leading-relaxed mb-4">
                  {details.description}
                </p>
                <div className="bg-gray-50 rounded-xl p-4 mb-4">
                  <h3 className="font-semibold text-sm text-foreground mb-3 flex items-center gap-2">
                    <Package className="w-4 h-4 text-primary" /> O que está
                    incluído:
                  </h3>
                  <ul className="space-y-2">
                    {details.features.map((f) => (
                      <li
                        key={f}
                        className="flex items-start gap-2 text-sm text-muted-foreground"
                      >
                        <span className="w-4 h-4 rounded-full bg-primary/20 text-primary flex items-center justify-center text-[10px] font-bold shrink-0 mt-0.5">
                          ✓
                        </span>
                        {f}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            )}

            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Truck className="w-4 h-4 text-green-500" />
              {isAffiliate
                ? "Redirecionamento para site parceiro"
                : "Entrega digital imediata ou envio em 2-5 dias úteis"}
            </div>
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Tag className="w-4 h-4 text-primary" />
              {isAffiliate
                ? "Produto de associado BOM DIA SEGUNDA"
                : "Venda direta — pagamento seguro"}
            </div>

            <div className="flex flex-col gap-3 mt-2">
              <a
                href={product.buyUrl || "#"}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full flex items-center justify-center gap-2 bg-primary text-white font-bold py-4 px-6 rounded-xl hover:bg-primary/90 transition-colors text-base"
              >
                {isAffiliate ? (
                  <>
                    <ExternalLink className="w-5 h-5" /> Acessar produto
                    parceiro
                  </>
                ) : (
                  <>
                    <ShoppingCart className="w-5 h-5" /> Comprar agora
                  </>
                )}
              </a>
              {!isAffiliate && (
                <a
                  href={product.buyUrl || "#"}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full flex items-center justify-center gap-2 bg-white border border-primary text-primary font-semibold py-3 px-6 rounded-xl hover:bg-primary/5 transition-colors"
                >
                  <Tag className="w-4 h-4" /> Ir para o checkout
                </a>
              )}
            </div>
          </div>
        </div>
      </div>

      {otherProducts.length > 0 && (
        <div className="bg-gray-50 border-t border-border py-12 px-4 mt-8">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-xl font-bold text-foreground mb-6">
              Outros produtos disponíveis
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {otherProducts.map((p) => (
                <button
                  key={p.id}
                  type="button"
                  className="bg-white rounded-xl overflow-hidden shadow-sm border border-border hover:shadow-md transition-shadow cursor-pointer text-left w-full"
                  onClick={() => onViewOther(p.id)}
                >
                  <div className="aspect-[3/4] overflow-hidden bg-muted">
                    <img
                      src={p.image}
                      alt={p.title}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="p-3">
                    <h3 className="font-semibold text-xs line-clamp-2 mb-1">
                      {p.title}
                    </h3>
                    <span className="text-primary font-bold text-sm">
                      {p.price}
                    </span>
                  </div>
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
