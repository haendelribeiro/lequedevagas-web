# 💼 Leque de Vagas — Plataforma de Vagas Tech para Migração de Carreira

> **Disciplina:** Tecnologias para Frontend Avançado (Next.js 16 App Router) — 2026.2  
> **Professor(a):** Nicoly Almeida (NickDev / Um Leque de Tecnologia)  
> **Repositório Oficial:** [github.com/haendelribeiro/lequedevagas-web](https://github.com/haendelribeiro/lequedevagas-web)  
> **Deploy de Referência:** https://lequedevagas-web.vercel.app  
> **Status:** 100% Concluído · 11 Testes Unitários Aprovados · CI/CD Ativo  

---

## 🧭 1. Visão Geral e Proposta de Valor

### O Problema do Mundo Real
No mercado de tecnologia, um dos maiores desafios para quem está iniciando ou migrando de carreira é encontrar oportunidades reais de entrada. A imensa maioria das vagas rotuladas como "Júnior" exige requisitos irreais (3 a 4 anos de experiência, dezenas de bibliotecas e testes avançados).

### A Solução: Leque de Vagas
O **Leque de Vagas** é uma plataforma desenvolvida para conectar novos talentos a empresas inclusivas. A aplicação permite:
* Filtrar com 1 clique oportunidades que aceitam iniciantes e transição de carreira.
* Conhecer a cultura e localização das empresas recrutadoras com navegação dinâmica.
* Enviar candidaturas com validação server-side estrita via Zod.
* Painel administrativo exclusivo para empresas gerenciarem suas vagas e candidaturas recebidas.

---

## 👥 2. Contrato da Equipe & Divisão das 4 Frentes

A arquitetura do sistema foi estruturada em **4 frentes autônomas de desenvolvimento**, permitindo evolução paralela e modular:

| Frente | Responsabilidade Principal | Telas & Rotas Sob Sua Guarda | Destaque Técnico |
| :--- | :--- | :--- | :--- |
| **Frente 1: Vaga** | CRUD completo de vagas e detalhes | `data/vagas.ts`, `/vagas/[id]`, `/vagas/nova`, `/vagas/[id]/editar` | Server Actions (`"use server"`), validação Zod e `revalidatePath()` |
| **Frente 2: Empresa** | Perfil institucional e governança | `data/empresas.ts`, `/empresas/[slug]`, `/painel` | Abas dinâmicas via `searchParams` e métricas de candidaturas em tempo real |
| **Frente 3: Pessoa & Candidatura** | Candidatura, Auth e RBAC | `app/actions/candidaturas.ts`, `/entrar`, `lib/permissoes.ts`, `lib/auth-session.ts` | Controle de acesso por papel (`candidata` vs `empresa`) e cookies HTTP-Only |
| **Frente 4: Busca & Números** | Performance de busca e estatísticas | `MuralDeVagas`, `PaginacaoVagas`, `EstatisticasMercado`, `BotaoFavorito` | Single Source of Truth na URL (`searchParams`), paginação e gráfico de mercado |

---

## 🏛️ 3. Arquitetura Técnica & Decisões Justificadas

### 1. Server Components (RSC) por Padrão
* **Decisão:** Todas as páginas utilizam o modelo de **React Server Components (RSC)**, isolando a diretiva `'use client'` estritamente nas folhas da árvore (botões e formulários interativos).
* **Justificativa:** Reduz o bundle JavaScript entregue ao cliente, otimiza os índices de *Core Web Vitals* e viabiliza renderização direta para indexação imediata de SEO.

### 2. Server Actions com Validação Obrigatória via Zod
* **Decisão:** As mutações de dados (criação, edição e exclusão de vagas, além de candidaturas) utilizam **Server Actions** nativas integradas ao hook `useActionState` do React 19.
* **Justificativa:** A validação com **Zod** no servidor protege a aplicação contra payloads maliciosos ou incompletos, garantindo type-safety em tempo de execução.

### 3. Filtros e Paginação Sincronizados na URL (`searchParams`)
* **Decisão:** Os parâmetros de busca, filtros de área, senioridade, flag de iniciante e paginação são lidos diretamente da URL.
* **Justificativa:** Funciona como fonte única da verdade (*Single Source of Truth*), permitindo compartilhamento de links pré-filtrados e preservação do histórico de navegação.

### 4. Streaming SSR com Skeleton UI (`app/loading.tsx`)
* **Decisão:** Implementação de layout skeleton pulsante (`animate-pulse`) imitando os cards de vagas.
* **Justificativa:** Melhora a percepção de performance do usuário (*Perceived Performance*) durante o carregamento assíncrono dos dados.

### 5. SEO Técnico Automatizado
* **Decisão:** Criação das rotas nativas `app/sitemap.ts` e `app/robots.ts`, aliadas à Metadata API dinâmica (`generateMetadata`).
* **Justificativa:** Geração dinâmica do `sitemap.xml` para indexação de todas as vagas e empresas no Google.

---

## 📁 4. Estrutura de Arquivos e Pastas

```text
lequedevagas-web/
├── .github/
│   └── workflows/ci.yml         # Pipeline de CI/CD para validação automática
├── app/
│   ├── (institucional)/         # Route Group: termos e privacidade
│   ├── actions/                 # Server Actions ("use server"): vagas, candidaturas, auth
│   ├── empresas/[slug]/         # Perfil institucional com abas dinâmicas
│   ├── entrar/                  # Autenticação e alternância de perfis RBAC
│   ├── painel/                  # Dashboard de gestão da empresa com exclusão de vagas
│   ├── vagas/                   # Mural, paginação, filtros, estatísticas e favoritos
│   │   ├── [id]/editar/         # Edição de vagas existentes
│   │   └── [id]/                # Detalhes da vaga e formulário de candidatura
│   ├── error.tsx                # Error boundary do cliente com botão reset
│   ├── globals.css              # Design system com Tailwind CSS v4
│   ├── layout.tsx               # RootLayout com navegação e estado de sessão
│   ├── loading.tsx              # Skeleton UI com animação pulsante
│   ├── not-found.tsx            # Página 404 customizada
│   ├── page.tsx                 # Landing page (Home)
│   ├── robots.ts                # Metadata route: robots.txt
│   └── sitemap.ts               # Metadata route: sitemap.xml
├── data/                        # Repositórios de vagas, empresas e candidaturas
├── lib/                         # Schemas Zod, regras RBAC e sessões por cookies
├── prisma/schema.prisma         # Modelagem relacional do banco de dados
└── tests/                       # 11 Testes unitários automatizados com node:test
```

---

## 🛠️ Tecnologias Utilizadas

* **Framework:** Next.js 16 (App Router + Turbopack)
* **Linguagem:** TypeScript 5
* **Estilização:** Tailwind CSS v4 & PostCSS
* **Validação de Schemas:** Zod
* **Persistência & Modelagem:** Prisma ORM
* **Autenticação & Sessão:** Cookies HTTP-Only com RBAC
* **Testes Automatizados:** Test Runner Nativo do Node.js (`node:test`)
* **CI/CD:** GitHub Actions

---

## 🚀 Como Rodar o Projeto Localmente

```bash
# 1. Clonar o repositório
git clone https://github.com/haendelribeiro/lequedevagas-web.git

# 2. Entrar na pasta do projeto
cd lequedevagas-web

# 3. Instalar as dependências
npm install

# 4. Executar os testes automatizados (11 testes)
npm run test

# 5. Iniciar o servidor de desenvolvimento
npm run dev

# 6. Compilar para produção (Next.js 16 + Turbopack)
npm run build
```

Abra [http://localhost:3000](http://localhost:3000) no seu navegador para ver a aplicação em execução.

---

## 🧪 Testes Automatizados e CI/CD

O projeto conta com **11 testes unitários** automatizados cobrindo as regras de negócio:
```bash
▶ RBAC - Permissões de Usuário
  ✔ Visitante não pode publicar vagas
  ✔ Candidata não pode publicar vagas
  ✔ Empresa pode publicar vagas
  ✔ Empresa só pode editar vagas do seu próprio slug
  ✔ Candidata pode enviar candidatura
✔ RBAC - Permissões de Usuário (5/5)

▶ Validações de Schemas com Zod
  ✔ novaVagaSchema rejeita título curto ou área inválida
  ✔ novaVagaSchema aceita dados válidos
  ✔ candidaturaSchema valida email e URL de LinkedIn
  ✔ loginSchema valida email e senha mínima de 6 caracteres
✔ Validações de Schemas com Zod (4/4)

ℹ tests 11 | pass 11 | fail 0 (100% de sucesso)
```

---

## 👥 Autores & Contribuidores

* **Haendel Ribeiro** — *Desenvolvedor e Arquiteto de Software* — [GitHub](https://github.com/haendelribeiro)
* Desenvolvido como projeto prático da disciplina **Tecnologias para Frontend Avançado (2026.2)** sob orientação da professora **Nicoly Almeida (NickDev)**.
