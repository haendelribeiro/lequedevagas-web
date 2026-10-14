import { MetadataRoute } from 'next';
import { listarVagas } from '@/data/vagas';
import { empresasIniciais } from '@/data/empresas';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://lequedevagas-web.vercel.app';
  const hoje = new Date();

  // Rotas estáticas
  const rotasEstaticas: MetadataRoute.Sitemap = [
    {
      url: `${baseUrl}`,
      lastModified: hoje,
      changeFrequency: 'daily',
      priority: 1.0,
    },
    {
      url: `${baseUrl}/vagas`,
      lastModified: hoje,
      changeFrequency: 'hourly',
      priority: 0.9,
    },
    {
      url: `${baseUrl}/termos`,
      lastModified: hoje,
      changeFrequency: 'monthly',
      priority: 0.3,
    },
    {
      url: `${baseUrl}/privacidade`,
      lastModified: hoje,
      changeFrequency: 'monthly',
      priority: 0.3,
    },
  ];

  // Rotas dinâmicas de Vagas
  const vagas = listarVagas();
  const rotasVagas: MetadataRoute.Sitemap = vagas.map((vaga) => ({
    url: `${baseUrl}/vagas/${vaga.id}`,
    lastModified: new Date(vaga.publicadaEm),
    changeFrequency: 'weekly',
    priority: 0.8,
  }));

  // Rotas dinâmicas de Empresas
  const rotasEmpresas: MetadataRoute.Sitemap = empresasIniciais.map((empresa) => ({
    url: `${baseUrl}/empresas/${empresa.slug}`,
    lastModified: hoje,
    changeFrequency: 'weekly',
    priority: 0.7,
  }));

  return [...rotasEstaticas, ...rotasVagas, ...rotasEmpresas];
}
