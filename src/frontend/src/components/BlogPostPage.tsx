import { BLOG_POSTS } from "@/data/mockData";
import { ArrowLeft, ArrowRight, Calendar, Clock } from "lucide-react";

interface BlogPostPageProps {
  postId: string;
  onBack: () => void;
  onReadOther: (id: string) => void;
}

const FULL_CONTENT: Record<string, string[]> = {
  "1": [
    "Um currículo é sua primeira impressão — e, muitas vezes, a última chance de ser notado por um recrutador. Antes mesmo da entrevista, seu documento passa por uma triagem rápida. Pequenos erros podem custar uma oportunidade.",
    "**1. Foto inadequada ou ausente**",
    "Em muitas empresas, uma foto informal ou ausente já elimina o candidato. Use uma foto com fundo neutro, boa iluminação e traje profissional.",
    "**2. E-mail não profissional**",
    "Evite endereços como 'gatinha_lindona@...' ou 'joaozinhofoda@...'. Crie um e-mail com nome e sobrenome.",
    "**3. Objetivos genéricos**",
    "Frases como 'Busco uma oportunidade de crescimento' dizem pouco. Seja específico: 'Analista de RH em empresa de médio porte no setor industrial'.",
    "**4. Excesso de informação**",
    "Currículo não é autobiografia. Foque nas últimas experiências relevantes e mantenha máximo 2 páginas.",
    "**5. Erros de português**",
    "Revise sempre. Use o corretor ortográfico. Erros de digitação passam a imagem de descuido.",
    "Com essas correções, suas chances na triagem aumentam significativamente. Quer uma análise gratuita do seu currículo? Use nosso BDS Avaliador!",
  ],
  "2": [
    "Conseguir uma entrevista é uma vitória — mas é apenas o começo. A preparação adequada faz toda a diferença entre aprovação e reprovação.",
    "**Pesquise a empresa**",
    "Conheça a missão, valores, produtos e notícias recentes. Demonstrar esse conhecimento impressiona qualquer recrutador.",
    "**Prepare respostas para perguntas clássicas**",
    "- 'Fale sobre você' (prepare um resumo de 2 minutos focado em carreira)",
    "- 'Qual é seu maior defeito?' (cite um real, mas mostre que está trabalhando nele)",
    "- 'Por que quer trabalhar aqui?' (resposta específica, não genérica)",
    "**Linguagem corporal**",
    "Manter contato visual, postura ereta e aperto de mão firme transmitem confiança. Evite cruzar os braços ou olhar para o celular.",
    "**Perguntas para fazer ao recrutador**",
    "Sempre tenha 2 ou 3 perguntas preparadas. Isso demonstra interesse genuíno.",
    "**Chegue com antecedência**",
    "Imprevistos acontecem. Planeje chegar 15 minutos antes.",
  ],
  "3": [
    "O mercado de trabalho no Sul e Centro-Sul Fluminense vive um momento de transformação em 2026. Entender as tendências locais é essencial para quem busca recolocação ou primeiro emprego na região.",
    "**Setores em crescimento**",
    "A indústria siderúrgica e metalúrgica continua sendo o maior empregador da região. O setor de logística e transporte também cresce, impulsionado por novos polos industriais em Porto Real e Quatis.",
    "**Habilidades mais valorizadas em 2026**",
    "- Pacote Office e planilhas (essencial em todas as áreas)",
    "- Comunicação escrita e verbal",
    "- Soft skills: trabalho em equipe, proatividade e resolução de problemas",
    "- Conhecimento básico em tecnologia da informação",
    "**Vagas para jovens**",
    "O programa Menor Aprendiz segue em alta, com empresas como CSN, Michelin e Volkswagen mantendo cotas ativas. Vagas de estágio também cresceram 18% em relação ao ano anterior.",
    "**Trabalho remoto**",
    "Ainda representam minoria (cerca de 12% das vagas), mas cresceram especialmente nas áreas de tecnologia, marketing digital e atendimento ao cliente.",
    "O BOM DIA SEGUNDA atualiza semanalmente as vagas disponíveis na região, conectando você diretamente às melhores oportunidades.",
  ],
};

function renderLine(line: string, postId: string) {
  const key = `${postId}-${line.slice(0, 40)}`;
  if (line.startsWith("**") && line.endsWith("**")) {
    return (
      <h3 key={key} className="font-bold text-lg mt-6 mb-1 text-foreground">
        {line.replace(/\*\*/g, "")}
      </h3>
    );
  }
  if (line.startsWith("- ")) {
    return (
      <p key={key} className="ml-4 text-muted-foreground">
        • {line.replace(/^- /, "")}
      </p>
    );
  }
  return (
    <p key={key} className="text-muted-foreground leading-relaxed">
      {line}
    </p>
  );
}

export default function BlogPostPage({
  postId,
  onBack,
  onReadOther,
}: BlogPostPageProps) {
  const post = BLOG_POSTS.find((p) => p.id === postId);
  const otherPosts = BLOG_POSTS.filter((p) => p.id !== postId);

  if (!post) return null;

  const lines = FULL_CONTENT[postId] || [post.excerpt];

  return (
    <div className="min-h-screen bg-background">
      <div className="bg-white border-b border-border sticky top-0 z-50">
        <div className="max-w-4xl mx-auto px-4 py-3 flex items-center gap-3">
          <button
            type="button"
            onClick={onBack}
            className="flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors"
          >
            <ArrowLeft className="w-4 h-4" /> Voltar
          </button>
          <span className="text-muted-foreground">/</span>
          <span className="text-sm font-medium truncate max-w-xs">
            {post.title}
          </span>
        </div>
      </div>

      <article className="max-w-4xl mx-auto px-4 py-10">
        <div className="mb-6">
          <span className="text-xs font-semibold text-primary bg-primary/10 px-2 py-0.5 rounded-full">
            {post.category}
          </span>
          <h1 className="text-3xl font-bold text-foreground mt-3 mb-4 leading-tight">
            {post.title}
          </h1>
          <div className="flex items-center gap-4 text-sm text-muted-foreground">
            <span className="flex items-center gap-1">
              <Calendar className="w-4 h-4" />
              {post.date}
            </span>
            <span className="flex items-center gap-1">
              <Clock className="w-4 h-4" />
              {post.readTime} de leitura
            </span>
          </div>
        </div>

        <div className="aspect-video overflow-hidden rounded-xl mb-8 bg-muted">
          <img
            src={post.image}
            alt={post.title}
            className="w-full h-full object-cover"
          />
        </div>

        <div className="max-w-none space-y-2">
          {lines.map((line) => renderLine(line, postId))}
        </div>
      </article>

      {otherPosts.length > 0 && (
        <div className="bg-gray-50 border-t border-border py-12 px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-xl font-bold text-foreground mb-6">
              Outros artigos disponíveis
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {otherPosts.map((other) => (
                <button
                  key={other.id}
                  type="button"
                  className="bg-white rounded-xl overflow-hidden shadow-sm border border-border hover:shadow-md transition-shadow cursor-pointer flex gap-4 text-left w-full"
                  onClick={() => onReadOther(other.id)}
                >
                  <div className="w-28 shrink-0 overflow-hidden">
                    <img
                      src={other.image}
                      alt={other.title}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="p-4 flex flex-col justify-between">
                    <div>
                      <span className="text-[10px] font-semibold text-primary bg-primary/10 px-2 py-0.5 rounded-full">
                        {other.category}
                      </span>
                      <h3 className="font-semibold text-sm mt-1 mb-1 line-clamp-2">
                        {other.title}
                      </h3>
                      <p className="text-xs text-muted-foreground line-clamp-2">
                        {other.excerpt}
                      </p>
                    </div>
                    <span className="text-primary text-xs font-medium flex items-center gap-1 mt-2">
                      Ler artigo <ArrowRight className="w-3 h-3" />
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
