export type AreaTech = 'Front-end' | 'Back-end' | 'Dados' | 'QA' | 'Design';
export type Senioridade = 'Estágio' | 'Júnior' | 'Pleno';
export type RegimeContratacao = 'CLT' | 'PJ' | 'Estágio';

export type Vaga = {
  id: string;
  titulo: string;
  empresa: string;
  empresaSlug: string;
  area: AreaTech;
  senioridade: Senioridade;
  local: string;
  aceitaIniciante: boolean;
  descricao: string;
  publicadaEm: string;
  salario?: string;
  regime?: RegimeContratacao;
  tags?: string[];
};

export const vagasIniciais: Vaga[] = [
  {
    id: "vaga-01",
    titulo: "Pessoa Desenvolvedora Front-end Júnior (Next.js)",
    empresa: "Aurora Tech",
    empresaSlug: "aurora-tech",
    area: "Front-end",
    senioridade: "Júnior",
    local: "Remoto",
    aceitaIniciante: true,
    salario: "R$ 3.800 - R$ 4.500",
    regime: "CLT",
    descricao: "Buscamos uma pessoa desenvolvedora motivada para atuar na criação de interfaces modernas utilizando React, Next.js e Tailwind CSS. Aceitamos pessoas em transição de carreira que tenham projetos práticos construídos.",
    publicadaEm: "2026-10-01",
    tags: ["Next.js", "React", "TypeScript", "Tailwind CSS"]
  },
  {
    id: "vaga-02",
    titulo: "Estágio em Engenharia de Software Back-end",
    empresa: "Apex Sistemas",
    empresaSlug: "apex-sistemas",
    area: "Back-end",
    senioridade: "Estágio",
    local: "Híbrido (São Paulo - SP)",
    aceitaIniciante: true,
    salario: "R$ 1.800 + VR/VT",
    regime: "Estágio",
    descricao: "Oportunidade de estágio para estudantes de tecnologia que desejam aprender Node.js, TypeScript e arquitetura de microsserviços na prática. Mentoria dedicada garantida.",
    publicadaEm: "2026-10-02",
    tags: ["Node.js", "TypeScript", "SQL", "APIs REST"]
  },
  {
    id: "vaga-03",
    titulo: "Analista de Dados Júnior (SQL & Python)",
    empresa: "DataNova Analytics",
    empresaSlug: "datanova-analytics",
    area: "Dados",
    senioridade: "Júnior",
    local: "Remoto",
    aceitaIniciante: true,
    salario: "R$ 3.500 - R$ 4.200",
    regime: "CLT",
    descricao: "Vaga focada em estruturação de Dashboards e consultas SQL para apoio à tomada de decisão. Procuramos pessoas com raciocínio analítico afiado e vontade de aprender PowerBI e Python.",
    publicadaEm: "2026-10-03",
    tags: ["Python", "SQL", "PowerBI", "Pandas"]
  },
  {
    id: "vaga-04",
    titulo: "Pessoa QA Tester Júnior (Automação)",
    empresa: "QualitaSoft",
    empresaSlug: "qualitasoft",
    area: "QA",
    senioridade: "Júnior",
    local: "Presencial (João Pessoa - PB)",
    aceitaIniciante: true,
    salario: "R$ 3.200 - R$ 3.800",
    regime: "CLT",
    descricao: "Atuação no planejamento de casos de testes funcionais e início no aprendizado de automação de testes E2E com Cypress e Playwright.",
    publicadaEm: "2026-10-03",
    tags: ["Playwright", "Cypress", "QA", "Testes E2E"]
  },
  {
    id: "vaga-05",
    titulo: "UI/UX Designer Júnior",
    empresa: "Estúdio Criativo",
    empresaSlug: "estudio-criativo",
    area: "Design",
    senioridade: "Júnior",
    local: "Remoto",
    aceitaIniciante: true,
    salario: "R$ 3.400 - R$ 4.000",
    regime: "PJ",
    descricao: "Criação de protótipos navegáveis no Figma, wireframes e testes de usabilidade para produtos digitais. É fundamental apresentar um portfólio com estudos de caso fictícios ou reais.",
    publicadaEm: "2026-10-04",
    tags: ["Figma", "UI Design", "UX Research", "Wireframes"]
  },
  {
    id: "vaga-06",
    titulo: "Desenvolvedor(a) Back-end Pleno (Node.js & Prisma)",
    empresa: "Apex Sistemas",
    empresaSlug: "apex-sistemas",
    area: "Back-end",
    senioridade: "Pleno",
    local: "Remoto",
    aceitaIniciante: false,
    salario: "R$ 7.500 - R$ 9.000",
    regime: "CLT",
    descricao: "Construção de APIs RESTful e Server Actions de alta performance com Node.js, Prisma ORM e PostgreSQL.",
    publicadaEm: "2026-10-04",
    tags: ["Node.js", "Prisma", "PostgreSQL", "Docker"]
  },
  {
    id: "vaga-07",
    titulo: "Desenvolvedor(a) React Native Júnior",
    empresa: "Aurora Tech",
    empresaSlug: "aurora-tech",
    area: "Front-end",
    senioridade: "Júnior",
    local: "Remoto",
    aceitaIniciante: true,
    salario: "R$ 3.600 - R$ 4.300",
    regime: "CLT",
    descricao: "Desenvolvimento de funcionalidades para aplicativos mobile iOS e Android. Desejável conhecimento em Expo e consumo de APIs REST.",
    publicadaEm: "2026-10-04",
    tags: ["React Native", "Expo", "Mobile", "TypeScript"]
  },
  {
    id: "vaga-08",
    titulo: "Estágio em Análise de Dados e BI",
    empresa: "DataNova Analytics",
    empresaSlug: "datanova-analytics",
    area: "Dados",
    senioridade: "Estágio",
    local: "Híbrido (Recife - PE)",
    aceitaIniciante: true,
    salario: "R$ 1.600 + Bolsa",
    regime: "Estágio",
    descricao: "Apoio no tratamento de dados, criação de relatórios gerenciais e organização de bancos de dados relacionais.",
    publicadaEm: "2026-10-05",
    tags: ["SQL", "Excel", "Data Analytics", "ETL"]
  },
  {
    id: "vaga-09",
    titulo: "Engenheiro(a) de Software Front-end Pleno",
    empresa: "Aurora Tech",
    empresaSlug: "aurora-tech",
    area: "Front-end",
    senioridade: "Pleno",
    local: "Remoto",
    aceitaIniciante: false,
    salario: "R$ 8.000 - R$ 9.500",
    regime: "PJ",
    descricao: "Liderança técnica de componentes complexos, otimização de performance (Core Web Vitals) e arquitetura de design systems com Tailwind e shadcn/ui.",
    publicadaEm: "2026-10-05",
    tags: ["Next.js", "Tailwind CSS", "Design Systems", "Web Vitals"]
  },
  {
    id: "vaga-10",
    titulo: "Pessoa Desenvolvedora Python Júnior (Django)",
    empresa: "Apex Sistemas",
    empresaSlug: "apex-sistemas",
    area: "Back-end",
    senioridade: "Júnior",
    local: "Remoto",
    aceitaIniciante: true,
    salario: "R$ 3.800 - R$ 4.600",
    regime: "CLT",
    descricao: "Manutenção e criação de novas rotas em sistemas web utilizando Python, Django e PostgreSQL. Ambiente colaborativo e focado em aprendizado.",
    publicadaEm: "2026-10-05",
    tags: ["Python", "Django", "PostgreSQL", "APIs"]
  },
  {
    id: "vaga-11",
    titulo: "Estágio em Garantia de Qualidade (QA)",
    empresa: "QualitaSoft",
    empresaSlug: "qualitasoft",
    area: "QA",
    senioridade: "Estágio",
    local: "Presencial (Cabedelo - PB)",
    aceitaIniciante: true,
    salario: "R$ 1.500 + VT",
    regime: "Estágio",
    descricao: "Execução manual de testes em sistemas web e mobile, report de bugs e elaboração de relatórios de cobertura de testes.",
    publicadaEm: "2026-10-05",
    tags: ["Testes Manuais", "QA", "Jira", "Test Plans"]
  },
  {
    id: "vaga-12",
    titulo: "Product Designer Pleno",
    empresa: "Estúdio Criativo",
    empresaSlug: "estudio-criativo",
    area: "Design",
    senioridade: "Pleno",
    local: "Remoto",
    aceitaIniciante: false,
    salario: "R$ 7.000 - R$ 8.500",
    regime: "PJ",
    descricao: "Definição de fluxos de jornada complexos, testes com usuários reais e manutenção de sistemas de design corporativos.",
    publicadaEm: "2026-10-05",
    tags: ["Figma", "Design System", "Product Design", "UX"]
  }
];

const globalForVagas = globalThis as unknown as {
  vagasStore?: Vaga[];
};

if (!globalForVagas.vagasStore) {
  globalForVagas.vagasStore = [...vagasIniciais];
}

export function listarVagas(): Vaga[] {
  return globalForVagas.vagasStore || vagasIniciais;
}

export function buscarVagaPorId(id: string): Vaga | undefined {
  return (globalForVagas.vagasStore || vagasIniciais).find((v) => v.id === id);
}

export function adicionarVaga(dados: Omit<Vaga, 'id' | 'publicadaEm'>): Vaga {
  const store = globalForVagas.vagasStore || vagasIniciais;
  const novoId = `vaga-${String(store.length + 1).padStart(2, '0')}-${Date.now().toString().slice(-4)}`;
  const hoje = new Date().toISOString().split('T')[0];

  const novaVaga: Vaga = {
    ...dados,
    id: novoId,
    publicadaEm: hoje,
    salario: dados.salario || 'A combinar',
    regime: dados.regime || 'CLT',
    tags: dados.tags && dados.tags.length > 0 ? dados.tags : [dados.area, dados.senioridade]
  };

  store.unshift(novaVaga);
  globalForVagas.vagasStore = store;
  return novaVaga;
}

export function atualizarVaga(id: string, dados: Partial<Omit<Vaga, 'id' | 'publicadaEm'>>): Vaga | null {
  const store = globalForVagas.vagasStore || vagasIniciais;
  const index = store.findIndex((v) => v.id === id);
  if (index === -1) return null;

  const vagaAtualizada: Vaga = {
    ...store[index],
    ...dados
  };

  store[index] = vagaAtualizada;
  globalForVagas.vagasStore = store;
  return vagaAtualizada;
}

export function removerVaga(id: string): boolean {
  const store = globalForVagas.vagasStore || vagasIniciais;
  const index = store.findIndex((v) => v.id === id);
  if (index === -1) return false;

  store.splice(index, 1);
  globalForVagas.vagasStore = store;
  return true;
}
