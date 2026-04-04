export interface CidadeInfo {
  nome: string;
  slug: string;
  universitaria: boolean;
  universidades?: string[];
  descricao: string;
  populacao: string;
  pib: string;
  idhm: string;
  areaKm2: string;
  economia: string;
  turismo: string[];
  pontosHistoricos: string[];
  gastronomia: string;
  fotoDescricao: string;
  fotoUrl?: string;
}

export const cidades: CidadeInfo[] = [
  {
    nome: "Angra dos Reis",
    slug: "angra-dos-reis",
    universitaria: false,
    descricao:
      "Angra dos Reis é um paraíso natural situado na Costa Verde do Rio de Janeiro, famosa por suas 365 ilhas, cristalinas baías e praias paradisíacas. Um dos principais destinos turísticos do Brasil, a cidade combina natureza exuberante com rica história colonial.",
    populacao: "~210.000",
    pib: "R$ 5,8 bilhões",
    idhm: "0.749",
    areaKm2: "816 km²",
    economia:
      "Turismo náutico, estaleiros (Brasfels/Jurong), terminal petrolífero da Petrobras, pesca artesanal e comércio local.",
    turismo: [
      "Ilha Grande — patrimônio natural e histórico",
      "Praia do Dentista e Praia de Araçatiba",
      "Mergulho e snorkeling nas águas cristalinas",
      "Passeios de escuna pelas 365 ilhas",
      "Forte de São João — séc. XVI",
      "Parque Estadual da Ilha Grande",
    ],
    pontosHistoricos: [
      "Igreja Nossa Senhora do Carmo (1746)",
      "Forte de São João",
      "Antigo Presídio Cândido Mendes na Ilha Grande",
    ],
    gastronomia:
      "Frutos do mar frescos, moqueca de peixe artesanal, camarão na chapa e lulas grelhadas nos restaurantes à beira-mar.",
    fotoDescricao:
      "Baía paradisíaca com ilhas verdes e águas azul-turquesa em Angra dos Reis",
  },
  {
    nome: "Areal",
    slug: "areal",
    universitaria: false,
    descricao:
      "Areal é um município do interior fluminense, inserido no Vale do Paraíba. Cidade de perfil rural e agrícola, destaca-se pela produção de laticínios e pelo tranquilo modo de vida interiorano.",
    populacao: "~12.000",
    pib: "R$ 320 milhões",
    idhm: "0.708",
    areaKm2: "110 km²",
    economia:
      "Agropecuária, produção de leite e derivados, comércio local e pequenas indústrias.",
    turismo: [
      "Paisagens rurais e fazendas históricas",
      "Rio Paraíba do Sul para pesca esportiva",
      "Eventos culturais locais",
      "Festa do Padroeiro — São João Batista",
    ],
    pontosHistoricos: [
      "Igreja Matriz de São João Batista",
      "Fazendas do século XIX",
    ],
    gastronomia:
      "Queijo artesanal, doces caseiros, cachaça de alambique e comida caipira típica da região.",
    fotoDescricao:
      "Paisagem rural com campos verdes e fazendas históricas em Areal, RJ",
  },
  {
    nome: "Barra do Piraí",
    slug: "barra-do-pirai",
    universitaria: false,
    descricao:
      "Barra do Piraí é um importante entroncamento ferroviário e rodoviário do Sul Fluminense. A cidade tem forte vocação industrial e é conhecida como 'Portal da Região Serrana', com relevante história ligada ao ciclo cafeeiro e à expansão ferroviária.",
    populacao: "~97.000",
    pib: "R$ 3,1 bilhões",
    idhm: "0.735",
    areaKm2: "579 km²",
    economia:
      "Indústria metalúrgica, têxtil, comércio regional e serviços, beneficiada pela localização estratégica de entroncamento viário.",
    turismo: [
      "Museu Ferroviário de Barra do Piraí",
      "Cachoeira da Fumaça",
      "Rio Paraíba do Sul",
      "Parque Municipal do Caiçara",
      "Eventos históricos do ciclo do café",
    ],
    pontosHistoricos: [
      "Estação Ferroviária Central",
      "Igreja Matriz Nossa Senhora do Amparo",
      "Palacete histórico do século XIX",
    ],
    gastronomia:
      "Culinária mineira adaptada, pão de queijo artesanal, doce de leite, biscoitos de polvilho e frios regionais.",
    fotoDescricao:
      "Estação ferroviária histórica e arquitetura do século XIX em Barra do Piraí",
  },
  {
    nome: "Barra Mansa",
    slug: "barra-mansa",
    universitaria: true,
    universidades: ["UBM — Centro Universitário de Barra Mansa"],
    descricao:
      "Barra Mansa é uma cidade polo do Sul Fluminense, com forte base industrial e educacional. Considerada cidade universitária, abriga o UBM — Centro Universitário de Barra Mansa, referência regional, além de relevante setor industrial metalúrgico e cimenteiro.",
    populacao: "~180.000",
    pib: "R$ 5,2 bilhões",
    idhm: "0.751",
    areaKm2: "540 km²",
    economia:
      "Indústria metalúrgica, cimenteira (LafargeHolcim), CSN Parafusos, indústria diversificada, serviços e comércio regional.",
    turismo: [
      "Zoológico Municipal de Barra Mansa",
      "Parque das Águas",
      "Rio Paraíba do Sul — passeios e pesca",
      "Igreja Nossa Senhora do Rosário (1848)",
      "Cachoeiras na zona rural",
    ],
    pontosHistoricos: [
      "Igreja Matriz Nossa Senhora do Rosário",
      "Museu Municipal de Barra Mansa",
      "Antiga Estação Ferroviária",
    ],
    gastronomia:
      "Culinária interiorana com feijão tropeiro, linguiça artesanal, queijo minas e doces de tacho típicos do interior fluminense.",
    fotoDescricao:
      "Vista panorâmica da cidade universitária de Barra Mansa com rio Paraíba ao fundo",
  },
  {
    nome: "Comendador Levy Gasparian",
    slug: "comendador-levy-gasparian",
    universitaria: false,
    descricao:
      "Comendador Levy Gasparian é um pequeno município do Vale do Paraíba fluminense, com história ligada à ferrovia e ao ciclo cafeeiro. Preserva características rurais e um modo de vida tranquilo.",
    populacao: "~9.000",
    pib: "R$ 240 milhões",
    idhm: "0.701",
    areaKm2: "220 km²",
    economia:
      "Agropecuária, pecuária leiteira, pequenas indústrias e comércio local.",
    turismo: [
      "Fazendas históricas do ciclo do café",
      "Rio Paraíba do Sul",
      "Estação ferroviária histórica",
      "Pesca artesanal",
    ],
    pontosHistoricos: [
      "Estação Ferroviária histórica",
      "Fazendas do século XIX",
      "Igreja Matriz local",
    ],
    gastronomia:
      "Comida caseira do interior, queijo minas, doce de goiaba e rapaduras artesanais.",
    fotoDescricao:
      "Estação ferroviária histórica e paisagem rural de Comendador Levy Gasparian",
  },
  {
    nome: "Engenheiro Paulo de Frontin",
    slug: "engenheiro-paulo-de-frontin",
    universitaria: false,
    descricao:
      "Engenheiro Paulo de Frontin é um município serrano do estado do Rio de Janeiro, com clima ameno e paisagens montanhosas. Homenageia o ilustre engenheiro que construiu a ligação ferroviária entre Rio e São Paulo.",
    populacao: "~14.000",
    pib: "R$ 350 milhões",
    idhm: "0.715",
    areaKm2: "257 km²",
    economia:
      "Agropecuária, floricultura, pequenas indústrias e turismo rural.",
    turismo: [
      "Serra da Mantiqueira — ecoturismo",
      "Cachoeiras e trilhas ecológicas",
      "Museu em homenagem ao Engenheiro Paulo de Frontin",
      "Turismo rural em fazendas",
    ],
    pontosHistoricos: [
      "Monumento ao Engenheiro Paulo de Frontin",
      "Igreja Matriz São José",
      "Antiga Estação Ferroviária",
    ],
    gastronomia:
      "Trutas frescas, queijos serranos, mel artesanal e pratos da cozinha caipira da serra fluminense.",
    fotoDescricao:
      "Paisagem serrana com montanhas verdes e cachoeiras em Engenheiro Paulo de Frontin",
  },
  {
    nome: "Itatiaia",
    slug: "itatiaia",
    universitaria: false,
    descricao:
      "Itatiaia abriga o primeiro parque nacional do Brasil, o Parque Nacional do Itatiaia, criado em 1937. Ponto de ecoturismo e montanhismo de nível nacional, o município atrai aventureiros e amantes da natureza do Brasil inteiro.",
    populacao: "~35.000",
    pib: "R$ 1,4 bilhões",
    idhm: "0.754",
    areaKm2: "213 km²",
    economia:
      "Turismo ecológico, hotelaria e pousadas, parques e áreas de preservação, além de comércio e serviços de apoio ao turismo.",
    turismo: [
      "Parque Nacional do Itatiaia",
      "Pico das Agulhas Negras (2.791m)",
      "Cachoeira do Véu da Noiva",
      "Trilhas e montanhismo",
      "Mirante do Último Adeus",
      "Lago Azul",
    ],
    pontosHistoricos: [
      "Parque Nacional do Itatiaia — 1° parque nacional do Brasil (1937)",
      "Museu do Parque Nacional do Itatiaia",
      "Casa do Pesquisador do IBDF",
    ],
    gastronomia:
      "Trutas do Rio Campo Belo, fondue suíço, fondues de queijo e chocolate, e pratos da cozinha serrana em restaurantes de pousadas.",
    fotoDescricao:
      "Pico das Agulhas Negras coberto de névoa e floresta atlântica densa no Parque Nacional do Itatiaia",
  },
  {
    nome: "Mendes",
    slug: "mendes",
    universitaria: false,
    descricao:
      "Mendes é um município histórico do Vale do Paraíba fluminense, com forte ligação ao ciclo cafeeiro do século XIX. O município preserva fazendas históricas e mantém tradições rurais.",
    populacao: "~18.000",
    pib: "R$ 480 milhões",
    idhm: "0.719",
    areaKm2: "200 km²",
    economia:
      "Agropecuária, indústria de alimentos, comércio local e serviços.",
    turismo: [
      "Fazendas históricas do ciclo do café",
      "Rio Paraíba do Sul",
      "Igreja Matriz de Nossa Senhora da Glória",
      "Festas juninas tradicionais",
    ],
    pontosHistoricos: [
      "Igreja Matriz Nossa Senhora da Glória",
      "Fazendas do ciclo cafeeiro",
      "Centro histórico colonial",
    ],
    gastronomia:
      "Doce de leite artesanal, queijo minas, bolo de fubá, canjica e quitandas típicas do interior do Rio de Janeiro.",
    fotoDescricao:
      "Fazenda histórica do ciclo do café com casarão colonial em Mendes, RJ",
  },
  {
    nome: "Miguel Pereira",
    slug: "miguel-pereira",
    universitaria: false,
    descricao:
      "Conhecida como 'A Suíça Fluminense', Miguel Pereira é um município de serras, clima ameno e paisagens deslumbrantes. Principal destino de turismo de lazer da região, atrai visitantes buscando frescor e natureza preservada.",
    populacao: "~25.000",
    pib: "R$ 660 milhões",
    idhm: "0.738",
    areaKm2: "290 km²",
    economia:
      "Turismo rural e de lazer, segunda residência, hotelaria e serviços.",
    turismo: [
      "Serra do Mar — mirantes e trilhas",
      "Cascatinha do Moura",
      "Parque Municipal da Estrada da Escarpa",
      "Praça da Independência — centro histórico",
      "Cavernas e grutas da região",
    ],
    pontosHistoricos: [
      "Igreja Matriz Nossa Senhora da Glória",
      "Estação de trem desativada",
      "Casarões históricos do centro",
    ],
    gastronomia:
      "Trutas, hambúrgueres artesanais, fondues em clima de montanha, queijos e mel da Serra Fluminense.",
    fotoDescricao:
      "Paisagem montanhosa com neblina ao amanhecer em Miguel Pereira, a Suíça Fluminense",
  },
  {
    nome: "Paracambi",
    slug: "paracambi",
    universitaria: false,
    descricao:
      "Paracambi é um município industrial do Sul Fluminense com forte tradição têxtil. A cidade tem importante papel na economia regional e está próxima ao Parque Estadual do Cunhambebe, área de preservação da Mata Atlântica.",
    populacao: "~50.000",
    pib: "R$ 1,5 bilhões",
    idhm: "0.728",
    areaKm2: "179 km²",
    economia: "Indústria têxtil, metalurgia, comércio regional e serviços.",
    turismo: [
      "Parque Estadual do Cunhambebe (área de preservação próxima)",
      "Rio Paraíba do Sul",
      "Cachoeiras locais",
      "Usina Hidrelétrica Paracambi",
    ],
    pontosHistoricos: [
      "Antiga Fábrica Têxtil (patrimônio industrial)",
      "Igreja Matriz São João Batista",
      "Centro histórico",
    ],
    gastronomia:
      "Culinária regional típica, carne de sol, feijão com linguiça e doces caseiros do interior fluminense.",
    fotoDescricao:
      "Vista aérea da cidade industrial de Paracambi com rio e vegetação ao redor",
  },
  {
    nome: "Paraíba do Sul",
    slug: "paraiba-do-sul",
    universitaria: false,
    descricao:
      "Paraíba do Sul é uma cidade histórica às margens do rio que lhe dá nome. Com forte ligação ao período imperial e ao ciclo cafeeiro, a cidade preserva importante patrimônio histórico e conta com comércio regional ativo.",
    populacao: "~42.000",
    pib: "R$ 1,3 bilhões",
    idhm: "0.720",
    areaKm2: "590 km²",
    economia: "Agropecuária, indústria de alimentos, comércio e serviços.",
    turismo: [
      "Rio Paraíba do Sul — navegação e pesca",
      "Fazendas históricas do período imperial",
      "Igreja Nossa Senhora das Dores",
      "Ponte Velha sobre o rio Paraíba",
    ],
    pontosHistoricos: [
      "Igreja Matriz Nossa Senhora das Dores",
      "Fazenda Boa Sorte (século XIX)",
      "Ponte histórica sobre o Paraíba",
    ],
    gastronomia:
      "Peixe fresco do rio Paraíba, comida caipira com arroz com frango caipira, broa de milho e doces de frutas do quintal.",
    fotoDescricao:
      "Rio Paraíba do Sul ao entardecer com ponte histórica e vegetação ciliar exuberante",
  },
  {
    nome: "Paraty",
    slug: "paraty",
    universitaria: false,
    descricao:
      "Paraty é um dos principais patrimônios histórico-culturais do Brasil, com seu centro histórico tombado e reconhecido como Patrimônio Mundial pela UNESCO. Combina riqueza cultural, festas literárias de repercussão mundial e belezas naturais incomparáveis.",
    populacao: "~42.000",
    pib: "R$ 2,2 bilhões",
    idhm: "0.693",
    areaKm2: "925 km²",
    economia:
      "Turismo cultural e ecológico, cachaça artesanal (cachaça Paraty), pesca e comércio turístico.",
    turismo: [
      "Centro Histórico tombado pela UNESCO",
      "FLIP — Festa Literária Internacional de Paraty",
      "CACHAÇA — rotas de alambiques artesanais",
      "Parque Nacional da Serra da Bocaina",
      "Praias de Trinidade, Vermelha e Lula",
      "Passeios de escuna pela baía",
    ],
    pontosHistoricos: [
      "Centro Histórico Colonial do século XVII",
      "Igreja Nossa Senhora do Rosário (1725)",
      "Forte Defensor Perpétuo",
      "Casa da Cultura de Paraty",
    ],
    gastronomia:
      "Cachaça artesanal de alambique, frutos do mar, peixe com pirão, lambari frito e doce de banana da terra.",
    fotoDescricao:
      "Ruas de pedra colonial do centro histórico tombado de Paraty com casarões brancos e varanda colorida",
  },
  {
    nome: "Paty do Alferes",
    slug: "paty-do-alferes",
    universitaria: false,
    descricao:
      "Paty do Alferes é um município serrano do interior fluminense, conhecida pela produção de tomates e hortaliças de alta qualidade. O turismo rural e o clima ameno atraem visitantes em busca de descanso.",
    populacao: "~27.000",
    pib: "R$ 580 milhões",
    idhm: "0.722",
    areaKm2: "324 km²",
    economia:
      "Produção de tomates e hortaliças (capital fluminense do tomate), floricultura e turismo rural.",
    turismo: [
      "Rota da Hortaliça — fazendas produtoras",
      "Cachoeiras e trilhas rurais",
      "Festa do Tomate",
      "Pousadas rurais e turismo de lazer",
    ],
    pontosHistoricos: [
      "Igreja Matriz de Santana",
      "Fazendas históricas do ciclo cafeeiro",
    ],
    gastronomia:
      "Tomate orgânico artesanal, saladas frescas, molhos de tomate artesanais, pão caseiro e pratos da roça.",
    fotoDescricao:
      "Plantações de tomates em terraços com paisagem serrana ao fundo em Paty do Alferes",
  },
  {
    nome: "Pinheiral",
    slug: "pinheiral",
    universitaria: false,
    descricao:
      "Pinheiral é o município mais jovem do Sul Fluminense, emancipado em 1995. Apesar de sua juventude como cidade independente, tem vocação industrial e educacional crescente, com perfil urbano moderno.",
    populacao: "~24.000",
    pib: "R$ 750 milhões",
    idhm: "0.737",
    areaKm2: "74 km²",
    economia:
      "Indústria, comércio regional e serviços, beneficiado pela proximidade com Volta Redonda e Barra Mansa.",
    turismo: [
      "Parque Municipal do Aterrado",
      "Rio Paraíba do Sul",
      "Eventos culturais municipais",
    ],
    pontosHistoricos: [
      "Igreja Matriz São Francisco de Assis",
      "Marco da Emancipação Municipal (1995)",
    ],
    gastronomia:
      "Culinária regional fluminense, carne assada, arroz com feijão e pratos caseiros típicos da região.",
    fotoDescricao:
      "Vista da cidade de Pinheiral com o Rio Paraíba do Sul e paisagem urbana moderna",
  },
  {
    nome: "Piraí",
    slug: "pirai",
    universitaria: false,
    descricao:
      "Piraí é uma cidade às margens da represa de Ribeirão das Lajes, que abastece parte da Grande Rio. Com forte vocação para energia e recursos hídricos, a cidade tem também tradição histórica e rural.",
    populacao: "~28.000",
    pib: "R$ 1,8 bilhões",
    idhm: "0.745",
    areaKm2: "514 km²",
    economia:
      "Energia elétrica (Hidrelétricas), agropecuária, indústria e turismo de pesca.",
    turismo: [
      "Represa de Ribeirão das Lajes — pesca esportiva e passeios",
      "Cachoeiras e trilhas ecológicas",
      "Fazendas históricas rurais",
      "Museu Municipal",
    ],
    pontosHistoricos: [
      "Igreja Nossa Senhora dos Remédios",
      "Casa do Barão de Piraí",
      "Museu Histórico Municipal",
    ],
    gastronomia:
      "Peixe de água doce (tilápia, tucunaré), cozido caipira, feijão com couve e rapadura da região.",
    fotoDescricao:
      "Represa de Ribeirão das Lajes com ilhas verdes ao entardecer em Piraí, RJ",
  },
  {
    nome: "Porto Real",
    slug: "porto-real",
    universitaria: false,
    descricao:
      "Porto Real é um dos municípios mais jovens do Sul Fluminense, emancipado em 1997. Destaca-se pelo polo automobilístico com a fábrica da Stellantis (ex-PSA Peugeot Citroën), sendo um importante gerador de empregos industriais na região.",
    populacao: "~18.000",
    pib: "R$ 5,2 bilhões",
    idhm: "0.740",
    areaKm2: "55 km²",
    economia:
      "Indústria automobilística (Stellantis — Peugeot Citroën), fornecedores do setor automotivo e serviços.",
    turismo: [
      "Complexo industrial da Stellantis — visitas técnicas",
      "Rio Paraíba do Sul",
      "Eventos do polo industrial",
    ],
    pontosHistoricos: ["Marco da Emancipação Municipal (1997)", "Igreja local"],
    gastronomia:
      "Restaurantes industriais e comércio gastronômico diversificado, culinária regional fluminense.",
    fotoDescricao:
      "Complexo industrial moderno de Porto Real com o Rio Paraíba ao fundo",
  },
  {
    nome: "Quatis",
    slug: "quatis",
    universitaria: false,
    descricao:
      "Quatis é um pequeno município do Sul Fluminense às margens do rio Paraíba do Sul. Com perfil rural e pequenas indústrias, a cidade preserva o ritmo pacato do interior fluminense.",
    populacao: "~13.000",
    pib: "R$ 430 milhões",
    idhm: "0.720",
    areaKm2: "224 km²",
    economia:
      "Agropecuária, cana-de-açúcar, pequenas indústrias e comércio local.",
    turismo: [
      "Rio Paraíba do Sul — lazer e pesca",
      "Cachoeiras rurais",
      "Festas tradicionais locais",
    ],
    pontosHistoricos: [
      "Igreja Matriz Nossa Senhora de Fátima",
      "Fazendas históricas",
    ],
    gastronomia:
      "Cana-de-açúcar processada em rapadura e cachaça artesanal, frango caipira e comida interiorana.",
    fotoDescricao:
      "Campo de cana-de-açúcar ao entardecer com rio Paraíba ao fundo em Quatis, RJ",
  },
  {
    nome: "Resende",
    slug: "resende",
    universitaria: true,
    universidades: [
      "AEDB — Associação de Ensino de Resende",
      "UFF — Universidade Federal Fluminense (campus Resende — engenharias)",
    ],
    descricao:
      "Resende é um dos principais polos industriais e educacionais do Sul Fluminense. Sede da Academia Militar das Agulhas Negras (AMAN), a mais importante escola militar do Brasil, a cidade combina tradição militar, ensino superior de qualidade e rica natureza.",
    populacao: "~150.000",
    pib: "R$ 12,5 bilhões",
    idhm: "0.753",
    areaKm2: "1.163 km²",
    economia:
      "CSN Aços Especiais, polo petroquímico (Braskem), indústria diversificada, educação superior e turismo ecológico e militar.",
    turismo: [
      "Academia Militar das Agulhas Negras (AMAN)",
      "Parque Nacional do Itatiaia — acesso sul",
      "Serra da Mantiqueira — trilhas e cachoeiras",
      "Visconde de Mauá — distrito turístico",
      "Camping e ecoturismo",
    ],
    pontosHistoricos: [
      "Academia Militar das Agulhas Negras (AMAN) — fundada em 1811",
      "Igreja Nossa Senhora da Conceição (1715)",
      "Museu da AMAN",
    ],
    gastronomia:
      "Trutas de Visconde de Mauá, fondue de queijo, comida serrana e churrascarias com cortes especiais.",
    fotoDescricao:
      "Academia Militar das Agulhas Negras com a Serra da Mantiqueira ao fundo em Resende",
  },
  {
    nome: "Rio Claro",
    slug: "rio-claro",
    universitaria: false,
    descricao:
      "Rio Claro é um município rural do Sul Fluminense com grande potencial de ecoturismo. Seu território abrange parte da Serra do Mar e possui cachoeiras, trilhas e belezas naturais preservadas.",
    populacao: "~18.000",
    pib: "R$ 460 milhões",
    idhm: "0.700",
    areaKm2: "840 km²",
    economia:
      "Agropecuária, ecoturismo emergente, extração vegetal e comércio local.",
    turismo: [
      "Parque Estadual da Serra do Mar",
      "Cachoeira do Perdão e Cachoeira do Jundu",
      "Trilhas ecológicas",
      "Turismo de aventura",
    ],
    pontosHistoricos: [
      "Igreja Matriz São João Batista",
      "Fazendas rurais históricas",
    ],
    gastronomia:
      "Mel artesanal, produtos orgânicos rurais, frutas silvestres e pratos da cozinha caipira.",
    fotoDescricao:
      "Cachoeira exuberante na Mata Atlântica preservada em Rio Claro, Sul Fluminense",
  },
  {
    nome: "Rio das Flores",
    slug: "rio-das-flores",
    universitaria: false,
    descricao:
      "Rio das Flores é uma pequena cidade histórica do Vale do Paraíba fluminense. Com ricas fazendas do ciclo cafeeiro e paisagens naturais preservadas, é um destino de turismo rural e histórico.",
    populacao: "~9.000",
    pib: "R$ 220 milhões",
    idhm: "0.695",
    areaKm2: "430 km²",
    economia:
      "Agropecuária, pecuária leiteira, turismo rural e comércio local.",
    turismo: [
      "Fazendas históricas do ciclo do café",
      "Rio das Flores (rio) — pesca e lazer",
      "Trilhas rurais e cachoeiras",
    ],
    pontosHistoricos: [
      "Fazenda Pau D'Alho (1860)",
      "Igreja Matriz Nossa Senhora das Dores",
      "Casarões coloniais",
    ],
    gastronomia:
      "Queijo artesanal, doce de leite de tacho, broa de milho e comida do interior fluminense.",
    fotoDescricao:
      "Fazenda colonial com jardins floridos e casarão histórico em Rio das Flores, RJ",
  },
  {
    nome: "Sapucaia",
    slug: "sapucaia",
    universitaria: false,
    descricao:
      "Sapucaia é um município do Vale do Paraíba fluminense com forte tradição ferroviária e rural. A cidade preserva estruturas da era do Barão de Mauá e do ciclo cafeeiro.",
    populacao: "~18.000",
    pib: "R$ 440 milhões",
    idhm: "0.709",
    areaKm2: "390 km²",
    economia:
      "Agropecuária, produção de cana-de-açúcar, cerâmica e comércio local.",
    turismo: [
      "Estação Ferroviária histórica",
      "Rio Paraíba do Sul",
      "Fazendas históricas",
      "Museu local",
    ],
    pontosHistoricos: [
      "Estação Ferroviária de Sapucaia",
      "Igreja Matriz São João Batista",
      "Fazenda histórica do século XIX",
    ],
    gastronomia:
      "Produtos de cana artesanais (rapadura, melado), queijo e doces caseiros do interior.",
    fotoDescricao:
      "Estação ferroviária histórica com trem antigo e paisagem interiorana em Sapucaia",
  },
  {
    nome: "Três Rios",
    slug: "tres-rios",
    universitaria: true,
    universidades: ["Faculdade Três Rios (FTR)"],
    descricao:
      "Três Rios recebeu este nome pela confluência de três rios: Paraíba do Sul, Paraibuna e Piabanha. Importante polo regional com vocação educacional, a cidade é referência em serviços e comércio no Vale do Paraíba.",
    populacao: "~80.000",
    pib: "R$ 2,8 bilhões",
    idhm: "0.748",
    areaKm2: "325 km²",
    economia:
      "Comércio regional, serviços, indústria de médio porte e educação superior.",
    turismo: [
      "Confluência dos três rios — mirante natural",
      "Museu Municipal",
      "Parque das Cachoeiras",
      "Eventos culturais regionais",
    ],
    pontosHistoricos: [
      "Marco da confluência dos rios Paraíba, Paraibuna e Piabanha",
      "Igreja Matriz Nossa Senhora Auxiliadora",
      "Museu Histórico Municipal",
    ],
    gastronomia:
      "Culinária regional diversificada, restaurantes com pratos mineiros e fluminenses, doces artesanais e festas gastronômicas.",
    fotoDescricao:
      "Confluência de três rios com pontes históricas e cidade ao fundo em Três Rios",
  },
  {
    nome: "Valença",
    slug: "valenca",
    universitaria: true,
    universidades: [
      "FAA — Faculdade de Medicina de Valença",
      "FEVE — Faculdade de Engenharia de Valença",
      "FACS — Faculdade de Ciências da Saúde de Valença",
    ],
    descricao:
      "Valença é uma das mais tradicionais cidades históricas do Sul Fluminense. Com riquíssimo patrimônio arquitetônico do ciclo cafeeiro, mansões imperiais e teatro histórico, é considerada um dos maiores acervos do Brasil imperial.",
    populacao: "~76.000",
    pib: "R$ 2,1 bilhões",
    idhm: "0.730",
    areaKm2: "1.306 km²",
    economia:
      "Têxtil histórica, agropecuária, educação superior, comércio regional e turismo histórico.",
    turismo: [
      "Teatrão — Teatro Municipal de Valença (1878)",
      "Fazendas históricas do ciclo do café",
      "Museu Casa da Hera",
      "Palacete dos Lacerda",
      "Rota do Café Imperial",
    ],
    pontosHistoricos: [
      "Teatro Municipal de Valença (1878)",
      "Fazenda Monte Alegre — casa do Barão de Valença",
      "Igreja Nossa Senhora da Glória",
      "Museu Casa da Hera",
    ],
    gastronomia:
      "Queijo Minas artesanal, doce de leite de tacho, linguiça defumada, pão de queijo e comida mineira típica.",
    fotoDescricao:
      "Teatro Municipal histórico de 1878 iluminado à noite em Valença, RJ",
  },
  {
    nome: "Vassouras",
    slug: "vassouras",
    universitaria: true,
    universidades: [
      "USS — Universidade de Vassouras (reconhecida pelo curso de Medicina)",
    ],
    descricao:
      "Vassouras é conhecida como a 'Capital do Café' do Brasil imperial, pela riqueza de fazendas e casarões do Segundo Reinado. Cidade universitária de prestígio nacional, abriga a Universidade de Vassouras, famosa pelo curso de Medicina, e preserva o maior conjunto arquitetônico imperial do país.",
    populacao: "~35.000",
    pib: "R$ 1,1 bilhões",
    idhm: "0.735",
    areaKm2: "545 km²",
    economia:
      "Educação superior (USS), turismo histórico e rural, agropecuária e serviços.",
    turismo: [
      "Museu Casa da Hera — Patrimônio Nacional",
      "Fazendas imperiais do século XIX",
      "Rota do Café — fazendas históricas",
      "Centro histórico tombado pelo IPHAN",
      "Casa do Barão de Vassouras",
    ],
    pontosHistoricos: [
      "Museu Casa da Hera (Patrimônio Nacional)",
      "Fazenda Santa Eufrásia",
      "Igreja Nossa Senhora da Conceição (1833)",
      "Solar da Baronesa de Vassouras",
    ],
    gastronomia:
      "Doce de leite imperial, queijo minas fresco, canjica, broa e comida do ciclo cafeeiro.",
    fotoDescricao:
      "Casarão imperial do século XIX com jardins históricos em Vassouras, capital do ciclo cafeeiro",
  },
  {
    nome: "Volta Redonda",
    slug: "volta-redonda",
    universitaria: true,
    universidades: [
      "UNIFOA — Centro Universitário de Volta Redonda (sede principal)",
      "UGB — Centro Universitário Geraldo Di Biase",
    ],
    descricao:
      "Volta Redonda é a maior cidade do Sul Fluminense e o maior polo industrial e educacional da região. Conhecida como 'Cidade do Aço' pela Companhia Siderúrgica Nacional (CSN), a cidade combina tradição industrial com moderna rede universitária e infraestrutura de serviços.",
    populacao: "~275.000",
    pib: "R$ 14,8 bilhões",
    idhm: "0.771",
    areaKm2: "182 km²",
    economia:
      "CSN — Companhia Siderúrgica Nacional (maior siderúrgica privada do Brasil), metalurgia, serviços, comércio regional e educação.",
    turismo: [
      "CSN — Companhia Siderúrgica Nacional (visitas técnicas)",
      "Parque da Cidade",
      "Museu Preservado da CSN",
      "Estádio Raulino de Oliveira",
      "Rio Paraíba do Sul",
    ],
    pontosHistoricos: [
      "CSN — fundada em 1941, símbolo do nacional-desenvolvimentismo",
      "Bairro Siderúrgica — cidade operária planejada (décadas de 1940-50)",
      "Museu da CSN",
    ],
    gastronomia:
      "Churrascarias, culinária italiana (herança dos operários imigrantes), massas artesanais, esfihas e ampla oferta gastronômica de cidade grande.",
    fotoDescricao:
      "Usina siderúrgica da CSN com chaminés ao entardecer e o Rio Paraíba ao fundo em Volta Redonda",
  },
];

export function getCidadeBySlug(slug: string): CidadeInfo | undefined {
  return cidades.find((c) => c.slug === slug);
}

export function getCidadeSlug(nome: string): string {
  return nome
    .toLowerCase()
    .normalize("NFD")
    .replace(/\p{M}/gu, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}
