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
  description?: string;
  requirements?: string[];
  benefits?: string[];
  workHours?: string;
  contractType?: string;
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
    description:
      "O Analista de RH será responsável por conduzir processos seletivos end-to-end, desde a triagem de currículos até a integração de novos colaboradores. Atuará também no desenvolvimento de políticas de gestão de pessoas, treinamento e retenção de talentos. O profissional apoiará a liderança na implementação de programas de engajamento e clima organizacional.",
    requirements: [
      "Ensino Superior completo em Psicologia, Administração ou áreas correlatas",
      "Experiência mínima de 2 anos em Recursos Humanos",
      "Domínio do Pacote Office (Excel avançado)",
      "Conhecimento em sistemas de RH (TOTVS, SAP ou similares)",
      "Habilidade em entrevistas por competências",
      "Boa comunicação oral e escrita",
    ],
    benefits: [
      "Vale Transporte",
      "Vale Refeição (R$ 35/dia)",
      "Plano de Saúde Bradesco",
      "Plano Odontológico",
      "PLR semestral",
      "Seguro de Vida em Grupo",
    ],
    workHours: "Segunda a Sexta, 8h às 17h",
    contractType: "CLT — Regime Efetivo",
  },
  {
    id: "2",
    title: "Operador de Produção",
    company: "Michelin do Brasil",
    city: "Resende",
    salary: "R$ 2.800 - R$ 3.200",
    type: "Efetiva",
    badge: "Urgente",
    deadline: "28/03/2026",
    source: "Gupy",
    applyUrl: "https://jobs.michelin.com/",
    area: "Produção",
    skills: ["produção", "manufatura", "operação", "indústria", "técnico"],
    education: "Ensino Médio",
    description:
      "O Operador de Produção atuará diretamente na linha de fabricação de pneus, garantindo a qualidade e eficiência dos processos produtivos. Será responsável pelo monitoramento de máquinas, controle de qualidade in-line e cumprimento das metas de produção. A vaga é para turno rotativo em uma das maiores fábricas da América Latina.",
    requirements: [
      "Ensino Médio completo",
      "Experiência mínima de 1 ano em linha de produção industrial",
      "Disponibilidade para trabalho em turnos rotativos",
      "Noções de qualidade e segurança do trabalho",
      "Curso de NR-12 (Segurança em Máquinas) — desejável",
    ],
    benefits: [
      "Vale Transporte",
      "Refeitório no local (almoço e jantar)",
      "Plano de Saúde Unimed",
      "Plano Odontológico",
      "Adicional noturno",
      "Participação nos Lucros e Resultados (PLR)",
    ],
    workHours: "Turnos rotativos (manhã/tarde/noite) — 6x2",
    contractType: "CLT — Regime Efetivo",
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
    description:
      "O estagiário de Engenharia Mecânica atuará no suporte técnico aos projetos de manutenção e melhoria de processos na linha de montagem de veículos. Participará de reuniões técnicas, elaboração de relatórios e análise de indicadores de produção. Será uma oportunidade única de aprendizado em uma montadora de alcance global.",
    requirements: [
      "Cursando Engenharia Mecânica, Mecatrônica ou Produção — a partir do 5º semestre",
      "Conhecimento em AutoCAD ou SolidWorks",
      "Conhecimento básico em Excel e relatórios técnicos",
      "Disponibilidade para estágio de 6h diárias",
      "Inglês intermediário (desejável)",
    ],
    benefits: [
      "Bolsa auxílio de R$ 1.500",
      "Vale Transporte",
      "Vale Refeição no refeitório da empresa",
      "Seguro de Vida",
      "Possibilidade de efetivação ao término do estágio",
    ],
    workHours: "Segunda a Sexta, 8h às 14h",
    contractType: "Estágio Curricular Obrigatório ou Não Obrigatório",
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
    description:
      "Vaga exclusiva para Pessoas com Deficiência (PCD). O Auxiliar Administrativo prestará suporte às operações do setor, incluindo organização de documentos, atendimento telefônico, controle de agenda e alimentação de sistemas internos. O Banco do Brasil é comprometido com a inclusão e oferece ambiente acessível e adaptado.",
    requirements: [
      "Ensino Médio completo",
      "Laudo médico atualizado comprovando a deficiência (CID)",
      "Conhecimento básico em Pacote Office (Word e Excel)",
      "Organização, proatividade e boa comunicação",
      "Experiência administrativa — desejável mas não obrigatória",
    ],
    benefits: [
      "Vale Transporte",
      "Vale Alimentação (R$ 850/mês)",
      "Plano de Saúde",
      "Plano Odontológico",
      "Auxílio Creche",
      "Previdência Privada BB Previdência",
    ],
    workHours: "Segunda a Sexta, 9h às 18h",
    contractType: "CLT — Vaga PCD",
  },
  {
    id: "5",
    title: "Menor Aprendiz - Logística",
    company: "Magazine Luiza",
    city: "Volta Redonda",
    salary: "R$ 1.072 + vale transporte",
    type: "Menor Aprendiz",
    badge: "Jovem Aprendiz",
    deadline: "20/04/2026",
    source: "CIEE",
    applyUrl: "https://carreiras.magazineluiza.com.br/",
    area: "Logística",
    skills: ["logística", "estoque", "aprendiz", "jovem aprendiz", "armazém"],
    education: "Ensino Médio",
    description:
      "Programa Jovem Aprendiz do Magazine Luiza para a área de Logística. O jovem aprendiz auxiliará nas atividades de recebimento, separação e expedição de mercadorias, aprendendo as rotinas do setor de distribuição. O programa inclui capacitação teórica pelo CIEE com formação profissional certificada.",
    requirements: [
      "Idade entre 14 e 22 anos",
      "Cursando ou ter concluído o Ensino Médio",
      "Não possuir carteira de trabalho assinada anteriormente (para benefício fiscal)",
      "Disponibilidade de 4h diárias",
      "Responsabilidade e pontualidade",
    ],
    benefits: [
      "Salário baseado no salário mínimo proporcional",
      "Vale Transporte",
      "Formação profissional gratuita pelo CIEE",
      "Certificado de conclusão do programa",
      "Possibilidade de efetivação ao final do programa",
    ],
    workHours: "Segunda a Sexta, 4 horas diárias (horário a definir)",
    contractType: "Contrato de Aprendizagem — CLT",
  },
  {
    id: "6",
    title: "Desenvolvedor Full Stack",
    company: "Startup TechVale",
    city: "Resende",
    salary: "R$ 6.000 - R$ 9.000",
    type: "Efetiva",
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
    description:
      "A TechVale busca um Desenvolvedor Full Stack para atuar no desenvolvimento e manutenção de plataformas SaaS voltadas para o mercado industrial. Você trabalhará em um ambiente ágil (Scrum), com autonomia para propor soluções e impactar diretamente o produto. A empresa tem crescimento de 80% ao ano e planos de expansão nacional.",
    requirements: [
      "Ensino Superior completo ou cursando em Ciência da Computação, Sistemas de Informação ou áreas correlatas",
      "Experiência comprovada com React.js e Node.js",
      "Conhecimento em Python (Django ou FastAPI) — desejável",
      "Experiência com bancos de dados relacionais (PostgreSQL) e NoSQL (MongoDB)",
      "Familiaridade com Git, Docker e metodologias ágeis",
      "Inglês para leitura técnica",
    ],
    benefits: [
      "Vale Refeição (R$ 40/dia)",
      "Plano de Saúde",
      "Home Office 3x por semana",
      "Stock Options após 1 ano",
      "Auxílio Educação (cursos e certificações)",
      "Day Off no aniversário",
    ],
    workHours: "Segunda a Sexta, 9h às 18h (híbrido)",
    contractType: "CLT ou PJ — negociável",
  },
  {
    id: "7",
    title: "Técnico de Manutenção Industrial",
    company: "Votorantim Metais",
    city: "Barra do Piraí",
    salary: "R$ 3.200 - R$ 4.500",
    type: "Efetiva",
    deadline: "12/04/2026",
    source: "Vagas.com",
    applyUrl: "https://www.votorantim.com.br/carreiras/",
    area: "Manutenção",
    skills: ["manutenção", "elétrica", "mecânica", "técnico", "industrial"],
    education: "Técnico",
    description:
      "O Técnico de Manutenção Industrial será responsável pela manutenção preventiva, preditiva e corretiva de equipamentos e instalações industriais. Atuará no diagnóstico de falhas elétricas e mecânicas, garantindo a disponibilidade dos equipamentos e a segurança das operações. Reportará ao Supervisor de Manutenção e participará de projetos de melhoria contínua.",
    requirements: [
      "Ensino Técnico completo em Eletromecânica, Elétrica ou Mecânica",
      "Experiência mínima de 3 anos em manutenção industrial",
      "Conhecimento em manutenção elétrica (NR-10 — obrigatório)",
      "Habilidade com leitura de esquemas elétricos e mecânicos",
      "Conhecimento em instrumentação e automação — desejável",
      "Habilitação para trabalho em altura (NR-35) — desejável",
    ],
    benefits: [
      "Vale Transporte",
      "Refeitório na empresa",
      "Plano de Saúde Sul América",
      "Seguro de Vida",
      "Participação nos Lucros (PLR)",
      "Adicional de Periculosidade",
    ],
    workHours: "Segunda a Sábado, 7h às 16h (com horas extras ocasionais)",
    contractType: "CLT — Regime Efetivo",
  },
  {
    id: "8",
    title: "Assistente de Contabilidade",
    company: "Escritório Contábil Lima & Associados",
    city: "Valença",
    salary: "R$ 1.800 - R$ 2.400",
    type: "Temporária",
    deadline: "25/03/2026",
    source: "Catho",
    applyUrl: "https://www.catho.com.br/vagas/assistente-contabilidade/",
    area: "Contabilidade",
    skills: ["contabilidade", "fiscal", "financeiro", "excel", "notas fiscais"],
    education: "Técnico",
    description:
      "O Assistente de Contabilidade auxiliará nas rotinas contábeis e fiscais do escritório, atendendo a uma carteira diversificada de clientes. As atividades incluem lançamentos contábeis, conciliação bancária, apuração de tributos (ICMS, ISS, PIS, COFINS) e emissão de notas fiscais. Contrato temporário com possibilidade de efetivação.",
    requirements: [
      "Ensino Médio completo; Técnico em Contabilidade ou cursando Ciências Contábeis",
      "Conhecimento em rotinas fiscais e contábeis",
      "Experiência com softwares contábeis (Domínio, Contábil ou similares)",
      "Excel intermediário (planilhas, fórmulas básicas)",
      "Organização e atenção aos detalhes",
    ],
    benefits: [
      "Vale Transporte",
      "Vale Refeição (R$ 25/dia)",
      "Convênio Farmácia",
      "Possibilidade de efetivação",
    ],
    workHours: "Segunda a Sexta, 8h às 17h30",
    contractType: "Temporário (90 dias com possibilidade de prorrogação)",
  },
  {
    id: "9",
    title: "Enfermeiro(a) Plantonista",
    company: "Hospital Regional do Médio Paraíba",
    city: "Volta Redonda",
    salary: "R$ 4.200 - R$ 5.500",
    type: "Efetiva",
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
    description:
      "O(A) Enfermeiro(a) Plantonista atuará em unidade de internação clínica e cirúrgica, sendo responsável pela assistência direta ao paciente, supervisão da equipe de técnicos de enfermagem e cumprimento dos protocolos assistenciais do hospital. A vaga é para plantão de 12x36 horas, com escala mensal definida com antecedência.",
    requirements: [
      "Graduação em Enfermagem",
      "COREN-RJ ativo e regular (obrigatório)",
      "Experiência mínima de 1 ano em ambiente hospitalar",
      "Curso de BLS (Suporte Básico de Vida) — desejável",
      "Disponibilidade para plantões diurnos e noturnos",
      "Pós-graduação em área clínica — diferencial",
    ],
    benefits: [
      "Vale Transporte",
      "Refeição no refeitório hospitalar",
      "Plano de Saúde Amil (titular + 2 dependentes)",
      "Plano Odontológico",
      "Adicional Noturno de 30%",
      "Seguro de Vida",
    ],
    workHours: "Plantão 12x36 horas (diurno e noturno)",
    contractType: "CLT — Regime Efetivo",
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
