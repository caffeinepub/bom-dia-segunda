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

export interface Job {
  id: string;
  title: string;
  company: string;
  city: string;
  salary: string;
  type: "CLT" | "Estágio" | "Jovem Aprendiz" | "PCD" | "PJ" | "Remoto";
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
    type: "CLT",
    badge: "Nova",
    deadline: "30/03/2026",
    source: "SINE",
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
    type: "CLT",
    badge: "Urgente",
    deadline: "28/03/2026",
    source: "Gupy",
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
    deadline: "05/04/2026",
    source: "LinkedIn",
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
    deadline: "15/04/2026",
    source: "Indeed",
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
    title: "Jovem Aprendiz - Logística",
    company: "Magazine Luiza",
    city: "Volta Redonda",
    salary: "R$ 1.072 + vale transporte",
    type: "Jovem Aprendiz",
    badge: "Jovem Aprendiz",
    deadline: "20/04/2026",
    source: "CIEE",
    applyUrl: "https://carreiras.magazineluiza.com.br/",
    area: "Logística",
    skills: ["logística", "estoque", "aprendiz", "jovem aprendiz", "armazém"],
    education: "Ensino Médio",
  },
  {
    id: "6",
    title: "Desenvolvedor Full Stack",
    company: "Startup TechVale",
    city: "Resende",
    salary: "R$ 6.000 - R$ 9.000",
    type: "CLT",
    badge: "Nova",
    deadline: "10/04/2026",
    source: "LinkedIn",
    applyUrl:
      "https://www.linkedin.com/jobs/search/?keywords=desenvolvedor+full+stack&location=Resende",
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
    type: "CLT",
    deadline: "12/04/2026",
    source: "Vagas.com",
    applyUrl: "https://www.votorantim.com.br/carreiras/",
    area: "Manutenção",
    skills: ["manutenção", "elétrica", "mecânica", "técnico", "industrial"],
    education: "Técnico",
  },
  {
    id: "8",
    title: "Assistente de Contabilidade",
    company: "Escritório Contábil Lima & Associados",
    city: "Valença",
    salary: "R$ 1.800 - R$ 2.400",
    type: "CLT",
    deadline: "25/03/2026",
    source: "Catho",
    applyUrl: "https://www.catho.com.br/vagas/assistente-contabilidade/",
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
    type: "CLT",
    badge: "Urgente",
    deadline: "27/03/2026",
    source: "Gupy",
    applyUrl: "https://www.gupy.io/",
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
  "Todos",
  "CLT",
  "Estágio",
  "Jovem Aprendiz",
  "PCD",
  "PJ",
  "Remoto",
];

export interface Product {
  id: string;
  title: string;
  author: string;
  price: string;
  image: string;
  buyUrl: string;
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
