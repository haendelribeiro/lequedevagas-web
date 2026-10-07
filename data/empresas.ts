export type Empresa = {
  slug: string;
  nome: string;
  sobre: string;
  site: string;
  localizacao: string;
  logo: string;
};

export const empresasIniciais: Empresa[] = [
  {
    slug: "aurora-tech",
    nome: "Aurora Tech",
    sobre: "A Aurora Tech é uma startup de tecnologia focada no desenvolvimento de soluções web e mobile de alto impacto. Valorizamos a inclusão e o desenvolvimento contínuo de pessoas que estão iniciando ou migrando para a área de tecnologia.",
    site: "https://auroratech.example.com",
    localizacao: "São Paulo - SP (Atuação Global/Remota)",
    logo: "⚡"
  },
  {
    slug: "apex-sistemas",
    nome: "Apex Sistemas",
    sobre: "Especializada no desenvolvimento de softwares corporativos e microsserviços escaláveis, a Apex Sistemas possui mais de 10 anos de mercado oferecendo produtos robustos e programa de mentoria para iniciantes.",
    site: "https://apexsistemas.example.com",
    localizacao: "São Paulo - SP",
    logo: "🏢"
  },
  {
    slug: "datanova-analytics",
    nome: "DataNova Analytics",
    sobre: "Consultoria líder em inteligência de dados, business intelligence e inteligência artificial aplicada. Ajudamos empresas a tomarem decisões baseadas em dados concretos.",
    site: "https://datanova.example.com",
    localizacao: "Recife - PE / Remoto",
    logo: "📊"
  },
  {
    slug: "qualitasoft",
    nome: "QualitaSoft",
    sobre: "Empresa referência em garantia de qualidade e automação de testes de software no Nordeste. Focada na formação de novos talentos em engenharia de qualidade de software.",
    site: "https://qualitasoft.example.com",
    localizacao: "João Pessoa - PB / Cabedelo - PB",
    logo: "🛡️"
  },
  {
    slug: "estudio-criativo",
    nome: "Estúdio Criativo",
    sobre: "Agência de design de produtos digitais especializada em experiência do usuário (UX) e interfaces intuitivas (UI) para edtechs e fintechs.",
    site: "https://estudiocriativo.example.com",
    localizacao: "Remoto",
    logo: "🎨"
  }
];
