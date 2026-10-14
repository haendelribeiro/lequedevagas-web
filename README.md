# 💼 Leque de Vagas — Plataforma de Vagas Tech para Migração de Carreira

> **Disciplina:** Tecnologias para Frontend Avançado (Introdução ao Next.js 16) — 2026.2  
> **Professor:** NickDev / Um Leque de Tecnologia  
> **Deploy de Referência (Vercel):** https://lequedevagas-web.vercel.app  

---

## 👥 Contrato da Equipe & Divisão das 4 Frentes

Para garantir máxima produtividade sem atropelos de código, a equipe dividiu a arquitetura do sistema em **4 frentes de desenvolvimento independentes**:

| Integrante | Frente | Responsabilidade Principal | Telas & Rotas Sob Sua Guarda |
| :--- | :--- | :--- | :--- |
| **Integrante 1** | **Frente 1: Vaga** | Contrato do dado `Vaga`, Cards, Detalhes e CRUD completo de publicação. | `data/vagas.ts`, `CardDeVaga`, `/vagas/[id]`, `/vagas/nova`, `/vagas/[id]/editar` |
| **Integrante 2** | **Frente 2: Empresa** | Perfil das empresas recrutadoras, abas dinâmicas e painel administrativo. | `data/empresas.ts`, `/empresas/[slug]`, `AbasDaEmpresa`, `/painel` |
| **Integrante 3** | **Frente 3: Pessoa & Candidatura** | Formulários de candidatura, validação com Zod, Autenticação e RBAC. | `FormularioDeCandidatura`, `/entrar`, `lib/permissoes.ts`, Sessões |
| **Integrante 4** | **Frente 4: Busca & Números** | Busca performática na URL via `searchParams`, filtros e estatísticas. | `MuralDeVagas`, `Filtros`, Contadores dinâmicos, Paginação |

---

## 🏗️ Arquitetura & Decisões Técnicas Justificadas

### 1. Next.js 16 App Router com Server Components por Padrão
* **Decisão:** Adotamos o modelo de **Server Components (RSC)** em todas as páginas por padrão (`/vagas`, `/empresas`, `/vagas/[id]`), isolando a marcação `"use client"` estritamente na ponta das folhas da árvore de componentes (como botões interativos e formulários).
* **Justificativa:** Isso reduz drasticamente o tamanho do bundle JavaScript enviado para o navegador, melhorando as métricas de *Core Web Vitals* e garantindo que os dados das vagas sejam renderizados diretamente no servidor para indexação imediata de SEO.

### 2. Busca e Filtros na URL via `searchParams` (Frente 4)
* **Decisão:** Os filtros de busca por área, senioridade e o indicador `aceitaIniciante` são gravados e lidos diretamente dos parâmetros de busca da URL (`searchParams`).
* **Justificativa:** Permite que a pessoa usuária compartilhe o link exato de uma busca pré-filtrada com amigos ou grupos de estudo sem perder o estado dos filtros ao recarregar a página.

### 3. Server Actions com Validação Obrigatória via Zod (Frente 1 & 3)
* **Decisão:** Todas as operações de mutação (cadastro de vaga, candidatura e login) utilizam **Server Actions** (`"use server"`) acompanhadas da validação de schema com **Zod** logo na primeira linha da ação.
* **Justificativa:** Como toda Server Action expõe um endpoint HTTP público por debaixo dos panos, a validação no backend garante segurança contra injeções e dados malformados antes de qualquer persistência.

### 4. Contrato de Dados Centralizado (`data/vagas.ts`)
* **Decisão:** Definimos o tipo `Vaga` e a coleção inicial com 12 vagas realistas antes da escrita de qualquer interface visual.
* **Justificativa:** Permitiu que as frentes 2, 3 e 4 desenvolvessem suas telas simultaneamente em paralelo contra um contrato tipado e seguro.

---

## 🛠️ Tecnologias Utilizadas

* **Framework:** Next.js 16 (App Router)
* **Linguagem:** TypeScript
* **Estilização:** Tailwind CSS & Lucide Icons
* **Validação de Schemas:** Zod
* **Persistência / ORM:** Prisma ORM
* **Autenticação:** Auth.js (NextAuth)
* **Hospedagem & CI/CD:** Vercel

---

## 🚀 Como Rodar o Projeto Localmente

```bash
# 1. Clonar o repositório
git clone https://github.com/Um-Leque-de-Tecnologia/lequedevagas-web.git

# 2. Entrar na pasta do projeto
cd lequedevagas-web

# 3. Instalar as dependências
npm install

# 4. Rodar os testes automatizados
npm run test

# 5. Iniciar o servidor de desenvolvimento
npm run dev

# 6. Compilar para produção (Next.js 16 + Turbopack)
npm run build
```

Abra [http://localhost:3000](http://localhost:3000) no seu navegador para ver a aplicação rodando.

