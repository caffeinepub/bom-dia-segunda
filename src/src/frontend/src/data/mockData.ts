import imgBlogCurriculo from "/assets/generated/blog-curriculo.dim_600x400.jpg";
import imgBlogEntrevista from "/assets/generated/blog-entrevista.dim_600x400.jpg";
import imgBlogMercado from "/assets/generated/blog-mercado.dim_600x400.jpg";
import imgCaneca1 from "/assets/generated/caneca-bomdiasegunda-1.dim_300x400.jpg";
import imgCaneca2 from "/assets/generated/caneca-bomdiasegunda-2.dim_300x400.jpg";
import imgCursoExcel from "/assets/generated/curso-excel.dim_300x400.jpg";
import imgCursoOratoria from "/assets/generated/curso-oratoria.dim_300x400.jpg";
import imgEbookCurriculo from "/assets/generated/ebook-curriculo.dim_300x400.jpg";
import imgEbookLinkedin from "/assets/generated/ebook-linkedin.dim_300x400.jpg";
import imgEbookPrimeiroEmprego from "/assets/generated/ebook-primeiro-emprego.dim_300x400.jpg";
import imgLivroNetworking from "/assets/generated/livro-networking.dim_180x135.jpg";

export interface Job {
  id: string;
  title: string;
  company: string;
  city: string;
  salary: string;
  type:
    | "Efetiva"
    | "Temporária"
    | "Estágio"
    | "Menor Aprendiz"
    | "Remota"
    | "PCD";
  badge?: "Nova" | "Urgente" | "PCD" | "Jovem Aprendiz";
  deadline: string;
  source: string;
  applyUrl: string;
  area: string;
  skills?: string[];
  education?: string;
}

export const JOBS: Job[] = [
  {
    id: "1",
    title: "Analista de Recursos Humanos",
    company: "CSN - Companhia Siderúrgica Nacional",
    city: "Volta Redonda",
    salary: "R$ 3.500 - R$ 4.800",
    type: "Efetiva",
    badge: "Nova",
    deadline: "30/04/2026",
    source: "Gupy/CSN",
    applyUrl: "https://vagascsn.gupy.io/",
    area: "RH",
    skills: [
      "recrutamento",
      "seleção",
      "comunicação",
      "rh",
      "recursos humanos",
      "gestão de pessoas",
    ],
    education: "Superior",
  },
  {
    id: "2",
    title: "Operador de Produção",
    company: "Michelin do Brasil",
    city: "Resende",
    salary: "R$ 2.800 - R$ 3.200",
    type: "Efetiva",
    badge: "Urgente",
    deadline: "28/04/2026",
    source: "Michelin Carreiras",
    applyUrl: "https://jobs.michelin.com/",
    area: "Produção",
    skills: ["produção", "manufatura", "operação", "indústria", "técnico"],
    education: "Ensino Médio",
  },
  {
    id: "3",
    title: "Estagiário de Engenharia Mecânica",
    company: "Hyundai CAOA",
    city: "Porto Real",
    salary: "R$ 1.500 + benefícios",
    type: "Estágio",
    badge: "Nova",
    deadline: "05/05/2026",
    source: "Hyundai CAOA",
    applyUrl: "https://www.hyundaicaoa.com.br/trabalhe-conosco",
    area: "Engenharia",
    skills: ["engenharia", "mecânica", "estágio", "autocad", "projeto"],
    education: "Superior",
  },
  {
    id: "4",
    title: "Auxiliar Administrativo - PCD",
    company: "Banco do Brasil",
    city: "Barra Mansa",
    salary: "R$ 2.200 - R$ 2.800",
    type: "PCD",
    badge: "PCD",
    deadline: "15/05/2026",
    source: "BB Carreiras",
    applyUrl: "https://www.bb.com.br/site/carreiras/",
    area: "Administrativo",
    skills: [
      "administrativo",
      "organização",
      "excel",
      "office",
      "secretariado",
    ],
    education: "Ensino Médio",
  },
  {
    id: "5",
    title: "Menor Aprendiz - Logística",
    company: "Magazine Luiza",
    city: "Volta Redonda",
    salary: "R$ 1.412 + vale transporte",
    type: "Menor Aprendiz",
    badge: "Jovem Aprendiz",
    deadline: "20/04/2026",
    source: "CIEE",
    applyUrl: "https://www.ciee.org.br/",
    area: "Logística",
    skills: ["logística", "estoque", "aprendiz", "jovem aprendiz", "armazém"],
    education: "Ensino Médio",
  },
  {
    id: "6",
    title: "Desenvolvedor Full Stack",
    company: "Stefanini Group",
    city: "Resende",
    salary: "R$ 6.000 - R$ 9.000",
    type: "Efetiva",
    badge: "Nova",
    deadline: "10/05/2026",
    source: "LinkedIn",
    applyUrl:
      "https://www.linkedin.com/jobs/search/?keywords=desenvolvedor+full+stack&location=Resende%2C+Rio+de+Janeiro",
    area: "TI",
    skills: [
      "desenvolvimento",
      "programação",
      "javascript",
      "react",
      "python",
      "fullstack",
      "ti",
      "tecnologia",
    ],
    education: "Superior",
  },
  {
    id: "7",
    title: "Técnico de Manutenção Industrial",
    company: "Votorantim Metais",
    city: "Barra do Piraí",
    salary: "R$ 3.200 - R$ 4.500",
    type: "Efetiva",
    deadline: "12/05/2026",
    source: "Votorantim Carreiras",
    applyUrl: "https://careers.votorantim.com.br/",
    area: "Manutenção",
    skills: ["manutenção", "elétrica", "mecânica", "técnico", "industrial"],
    education: "Técnico",
  },
  {
    id: "8",
    title: "Assistente de Contabilidade",
    company: "Contabilidade Regional Sul Fluminense",
    city: "Valença",
    salary: "R$ 1.800 - R$ 2.400",
    type: "Temporária",
    deadline: "25/04/2026",
    source: "Catho",
    applyUrl: "https://www.catho.com.br/vagas/assistente-contabilidade/rj/",
    area: "Contabilidade",
    skills: ["contabilidade", "fiscal", "financeiro", "excel", "notas fiscais"],
    education: "Técnico",
  },
  {
    id: "9",
    title: "Enfermeiro(a) Plantonista",
    company: "Hospital Regional do Médio Paraíba",
    city: "Volta Redonda",
    salary: "R$ 4.200 - R$ 5.500",
    type: "Efetiva",
    badge: "Urgente",
    deadline: "27/04/2026",
    source: "Indeed",
    applyUrl:
      "https://br.indeed.com/vagas?q=enfermeiro+plantonista&l=Volta+Redonda%2C+RJ",
    area: "Saúde",
    skills: [
      "enfermagem",
      "saúde",
      "coren",
      "hospital",
      "plantonista",
      "medicina",
    ],
    education: "Superior",
  },
  {
    id: "10",
    title: "Operador de Processo Químico",
    company: "Ambev",
    city: "Piraí",
    salary: "R$ 3.000 - R$ 4.200",
    type: "Efetiva",
    badge: "Nova",
    deadline: "18/05/2026",
    source: "Ambev Carreiras",
    applyUrl: "https://ambevcarreiras.gupy.io/",
    area: "Produção",
    skills: [
      "química",
      "produção",
      "processo",
      "operação",
      "indústria",
      "boas práticas",
    ],
    education: "Técnico",
  },
  {
    id: "11",
    title: "Assistente de Vendas",
    company: "Natura &Co",
    city: "Barra Mansa",
    salary: "R$ 1.900 + comissão",
    type: "Efetiva",
    deadline: "30/04/2026",
    source: "Vagas.com",
    applyUrl:
      "https://www.vagas.com.br/vagas-de-assistente-de-vendas-em-barra-mansa-rj",
    area: "Comercial",
    skills: ["vendas", "atendimento", "comunicação", "negociação", "comercial"],
    education: "Ensino Médio",
  },
  {
    id: "12",
    title: "Técnico em Segurança do Trabalho",
    company: "Volkswagen do Brasil",
    city: "Resende",
    salary: "R$ 3.800 - R$ 5.000",
    type: "Efetiva",
    badge: "Urgente",
    deadline: "22/04/2026",
    source: "Volkswagen Carreiras",
    applyUrl: "https://www.vw.com.br/pt/volkswagen/trabalhe-conosco.html",
    area: "Segurança",
    skills: ["segurança do trabalho", "nr", "epi", "normas", "fiscalização"],
    education: "Técnico",
  },
  {
    id: "13",
    title: "Auxiliar de Creche - PCD",
    company: "Prefeitura de Resende",
    city: "Resende",
    salary: "R$ 1.672,68",
    type: "PCD",
    badge: "PCD",
    deadline: "10/05/2026",
    source: "SINE",
    applyUrl: "https://www.sine.com.br/vagas-empregos-em-resende-rj",
    area: "Educação",
    skills: [
      "educação",
      "cuidador",
      "creche",
      "educação infantil",
      "pedagógico",
    ],
    education: "Ensino Médio",
  },
  {
    id: "14",
    title: "Jovem Aprendiz - Administrativo",
    company: "Itaú Unibanco",
    city: "Volta Redonda",
    salary: "R$ 1.412 + benefícios",
    type: "Menor Aprendiz",
    badge: "Jovem Aprendiz",
    deadline: "28/04/2026",
    source: "CIEE",
    applyUrl:
      "https://www.ciee.org.br/portal/candidato/vagas/jovem-aprendiz.aspx",
    area: "Administrativo",
    skills: [
      "administrativo",
      "organização",
      "atendimento",
      "aprendiz",
      "escritório",
    ],
    education: "Ensino Médio",
  },
  {
    id: "15",
    title: "Engenheiro de Produção",
    company: "Nissan do Brasil",
    city: "Resende",
    salary: "R$ 7.500 - R$ 10.000",
    type: "Efetiva",
    badge: "Nova",
    deadline: "15/05/2026",
    source: "Nissan Carreiras",
    applyUrl: "https://nissan.gupy.io/",
    area: "Engenharia",
    skills: [
      "engenharia de produção",
      "manufatura",
      "lean",
      "melhoria contínua",
      "kaizen",
      "engenharia",
    ],
    education: "Superior",
  },
  {
    id: "16",
    title: "Analista de Marketing Digital",
    company: "CSN Inova",
    city: "Volta Redonda",
    salary: "R$ 4.500 - R$ 6.000",
    type: "Efetiva",
    deadline: "08/05/2026",
    source: "Gupy/CSN",
    applyUrl: "https://vagascsn.gupy.io/",
    area: "Marketing",
    skills: [
      "marketing digital",
      "redes sociais",
      "conteúdo",
      "google ads",
      "seo",
    ],
    education: "Superior",
  },
  {
    id: "17",
    title: "Operador de Caixa",
    company: "Grupo Carrefour",
    city: "Angra dos Reis",
    salary: "R$ 1.800 - R$ 2.100",
    type: "Efetiva",
    deadline: "25/04/2026",
    source: "Carrefour Carreiras",
    applyUrl: "https://talentos.grupocarrefour.com.br/",
    area: "Varejo",
    skills: ["caixa", "atendimento", "varejo", "financeiro", "organização"],
    education: "Ensino Médio",
  },
  {
    id: "18",
    title: "Eletricista Industrial",
    company: "ThyssenKrupp",
    city: "Barra Mansa",
    salary: "R$ 3.500 - R$ 5.000",
    type: "Efetiva",
    badge: "Urgente",
    deadline: "20/04/2026",
    source: "Indeed",
    applyUrl:
      "https://br.indeed.com/vagas?q=eletricista+industrial&l=Barra+Mansa%2C+RJ",
    area: "Manutenção",
    skills: ["elétrica", "manutenção", "industrial", "automação", "nr10"],
    education: "Técnico",
  },
  {
    id: "19",
    title: "Analista de Logística",
    company: "DHL Supply Chain",
    city: "Porto Real",
    salary: "R$ 3.200 - R$ 4.500",
    type: "Efetiva",
    badge: "Nova",
    deadline: "12/05/2026",
    source: "DHL Carreiras",
    applyUrl: "https://careers.dhl.com/",
    area: "Logística",
    skills: [
      "logística",
      "supply chain",
      "wms",
      "estoque",
      "transporte",
      "armazém",
    ],
    education: "Superior",
  },
  {
    id: "20",
    title: "Auxiliar de Produção",
    company: "Peugeot Citroën do Brasil",
    city: "Porto Real",
    salary: "R$ 2.200 - R$ 2.800",
    type: "Efetiva",
    deadline: "30/04/2026",
    source: "Stellantis Carreiras",
    applyUrl: "https://careers.stellantis.com/",
    area: "Produção",
    skills: [
      "produção",
      "montagem",
      "linha de montagem",
      "indústria",
      "automobilístico",
    ],
    education: "Ensino Médio",
  },
];

export const CITIES = [
  "Todas",
  "Angra dos Reis",
  "Areal",
  "Barra do Piraí",
  "Barra Mansa",
  "Comendador Levy Gasparian",
  "Engenheiro Paulo de Frontin",
  "Itatiaia",
  "Mendes",
  "Miguel Pereira",
  "Paracambi",
  "Paraíba do Sul",
  "Paraty",
  "Paty do Alferes",
  "Pinheiral",
  "Piraí",
  "Porto Real",
  "Quatis",
  "Resende",
  "Rio Claro",
  "Rio das Flores",
  "Sapucaia",
  "Três Rios",
  "Valença",
  "Vassouras",
  "Volta Redonda",
];

export const JOB_TYPES = [
  "Efetiva",
  "Temporária",
  "Estágio",
  "Menor Aprendiz",
  "Remota",
  "PCD",
];

export interface Product {
  id: string;
  title: string;
  author: string;
  price: string;
  image: string;
  buyUrl: string;
  badge?: string;
}

export const PRODUCTS: Product[] = [
  {
    id: "1",
    title: "Como Conquistar seu Primeiro Emprego",
    author: "Carla Mendes",
    price: "R$ 29,90",
    image: imgEbookPrimeiroEmprego,
    buyUrl: "#",
  },
  {
    id: "2",
    title: "Currículo Perfeito em 7 Passos",
    author: "Roberto Silva",
    price: "R$ 19,90",
    image: imgEbookCurriculo,
    buyUrl: "#",
  },
  {
    id: "3",
    title: "LinkedIn para Iniciantes",
    author: "Ana Beatriz Costa",
    price: "R$ 24,90",
    image: imgEbookLinkedin,
    buyUrl: "#",
  },
  {
    id: "4",
    title: "Curso de Oratória — Fale com Confiança",
    author: "Bom Dia Segunda",
    price: "R$ 79,90",
    image: imgCursoOratoria,
    buyUrl: "#",
  },
  {
    id: "5",
    title: "Curso de Excel — Do Básico ao Avançado",
    author: "Bom Dia Segunda",
    price: "R$ 59,90",
    image: imgCursoExcel,
    buyUrl: "#",
  },
  {
    id: "6",
    title: "Caneca Motivacional — 'Segunda é dia de vencer!'",
    author: "Bom Dia Segunda",
    price: "R$ 39,90",
    image: imgCaneca1,
    buyUrl: "#",
  },
  {
    id: "7",
    title: "Caneca Motivacional — 'Seu sucesso começa hoje!'",
    author: "Bom Dia Segunda",
    price: "R$ 39,90",
    image: imgCaneca2,
    buyUrl: "#",
  },
  {
    id: "8",
    title: "O Poder do Networking — Conexões que Transformam Carreiras",
    author: "Recomendação BDS",
    price: "R$ 34,90",
    image: imgLivroNetworking,
    buyUrl: "#",
    badge: "recomendação de leitura BDS",
  },
];

export interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  date: string;
  readTime: string;
  image: string;
  category: string;
}

export const BLOG_POSTS: BlogPost[] = [
  {
    id: "1",
    title: "5 Erros no Currículo que Eliminam sua Candidatura",
    excerpt:
      "Saiba quais são os erros mais comuns que fazem recrutadores descartarem seu currículo ainda na triagem inicial.",
    date: "20 Mar 2026",
    readTime: "5 min",
    image: imgBlogCurriculo,
    category: "Currículo",
  },
  {
    id: "2",
    title: "Como se Preparar para Entrevistas de Emprego",
    excerpt:
      "Dicas práticas para se destacar nas entrevistas e aumentar suas chances de conseguir a vaga dos sonhos.",
    date: "15 Mar 2026",
    readTime: "7 min",
    image: imgBlogEntrevista,
    category: "Entrevista",
  },
  {
    id: "3",
    title: "Mercado de Trabalho no Sul Fluminense em 2026",
    excerpt:
      "Análise das principais tendências de emprego na região, setores em crescimento e as habilidades mais valorizadas.",
    date: "10 Mar 2026",
    readTime: "8 min",
    image: imgBlogMercado,
    category: "Mercado",
  },
];

export interface Testimonial {
  id: string;
  name: string;
  role: string;
  city: string;
  text: string;
  stars: number;
  initials: string;
  color: string;
}

export const TESTIMONIALS: Testimonial[] = [
  {
    id: "1",
    name: "Mariana Oliveira",
    role: "Analista de RH",
    city: "Volta Redonda",
    text: "Encontrei minha vaga em apenas 3 dias! A plataforma é incrível, filtrei por cidade e apareceram vagas que nunca tinha visto em outros sites. Hoje estou empregada e feliz!",
    stars: 5,
    initials: "MO",
    color: "bg-orange-500",
  },
  {
    id: "2",
    name: "Carlos Eduardo Santos",
    role: "Técnico Industrial",
    city: "Resende",
    text: "O avaliador de currículo foi um divisor de águas. Melhorei meu currículo com base nas sugestões e na semana seguinte já estava com uma entrevista agendada. Recomendo muito!",
    stars: 5,
    initials: "CE",
    color: "bg-blue-500",
  },
  {
    id: "3",
    name: "Fernanda Lima",
    role: "Estagiária de Engenharia",
    city: "Porto Real",
    text: "Como recém-formada, estava perdida no mercado de trabalho. A mentoria me deu clareza sobre o que buscar e como me posicionar. Consegui meu primeiro estágio em menos de um mês!",
    stars: 5,
    initials: "FL",
    color: "bg-purple-500",
  },
  {
    id: "4",
    name: "João Pedro Moraes",
    role: "Jovem Aprendiz",
    city: "Volta Redonda",
    text: "Nunca pensei que conseguiria um emprego antes dos 18 anos. O Bom Dia Segunda me mostrou vagas de jovem aprendiz na minha cidade. Muito grato pela plataforma!",
    stars: 5,
    initials: "JP",
    color: "bg-green-500",
  },
];
