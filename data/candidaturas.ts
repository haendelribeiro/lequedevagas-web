export type Candidatura = {
  id: string;
  vagaId: string;
  nome: string;
  email: string;
  linkedin: string;
  apresentacao: string;
  criadoEm: string;
};

export const candidaturasIniciais: Candidatura[] = [
  {
    id: "cand-01",
    vagaId: "vaga-01",
    nome: "Maria Clara Souza",
    email: "maria.souza@email.com",
    linkedin: "https://linkedin.com/in/mariaclarasouza",
    apresentacao: "Estudante de transição de carreira, apaixonada por React e Next.js. Já construí projetos reais.",
    criadoEm: "2026-10-02"
  },
  {
    id: "cand-02",
    vagaId: "vaga-01",
    nome: "Lucas Mendes",
    email: "lucas.mendes@email.com",
    linkedin: "https://linkedin.com/in/lucasmendes-dev",
    apresentacao: "Migrando de engenharia civil para front-end. Desenvolvi aplicações web completas com Tailwind e TypeScript.",
    criadoEm: "2026-10-03"
  }
];

const globalForCandidaturas = globalThis as unknown as {
  candidaturasStore?: Candidatura[];
};

if (!globalForCandidaturas.candidaturasStore) {
  globalForCandidaturas.candidaturasStore = [...candidaturasIniciais];
}

export function listarCandidaturas(): Candidatura[] {
  return globalForCandidaturas.candidaturasStore || candidaturasIniciais;
}

export function buscarCandidaturasPorVaga(vagaId: string): Candidatura[] {
  return (globalForCandidaturas.candidaturasStore || candidaturasIniciais).filter(
    (c) => c.vagaId === vagaId
  );
}

export function adicionarCandidatura(dados: Omit<Candidatura, 'id' | 'criadoEm'>): Candidatura {
  const store = globalForCandidaturas.candidaturasStore || candidaturasIniciais;
  const novoId = `cand-${String(store.length + 1).padStart(2, '0')}-${Date.now().toString().slice(-4)}`;
  const hoje = new Date().toISOString().split('T')[0];

  const novaCandidatura: Candidatura = {
    ...dados,
    id: novoId,
    criadoEm: hoje
  };

  store.unshift(novaCandidatura);
  globalForCandidaturas.candidaturasStore = store;
  return novaCandidatura;
}
