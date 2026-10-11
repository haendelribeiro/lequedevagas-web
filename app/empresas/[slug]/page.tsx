import { empresasIniciais } from '@/data/empresas';
import { listarVagas } from '@/data/vagas';
import Link from 'next/link';
import { notFound } from 'next/navigation';

type Props = {
  params: Promise<{
    slug: string;
  }>;
  searchParams: Promise<{
    aba?: string;
  }>;
};

export async function generateMetadata({ params }: Props) {
  const { slug } = await params;
  const empresa = empresasIniciais.find(e => e.slug === slug);
  if (!empresa) return { title: 'Empresa não encontrada · Leque de Vagas' };

  return {
    title: `${empresa.nome} · Perfil e Vagas no Leque de Vagas`,
    description: empresa.sobre.slice(0, 160),
  };
}

export default async function EmpresaPage({ params, searchParams }: Props) {
  const { slug } = await params;
  const { aba } = await searchParams;
  const abaAtiva = aba || 'sobre';

  const empresa = empresasIniciais.find(e => e.slug === slug);
  if (!empresa) {
    notFound();
  }

  const vagasDaEmpresa = listarVagas().filter(v => v.empresaSlug === slug);

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      {/* Voltar */}
      <Link href="/vagas" className="text-sm font-mono text-[#B4AEC6] hover:text-white flex items-center gap-1">
        ← Voltar ao mural
      </Link>

      {/* Hero da Empresa */}
      <div className="bg-[#1B1632] border border-white/10 p-6 md:p-8 rounded-3xl flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        <div className="flex items-center gap-4">
          <div className="w-16 h-16 rounded-2xl bg-[#08070E] border border-white/10 flex items-center justify-center text-3xl">
            {empresa.logo}
          </div>
          <div>
            <h1 className="text-2xl md:text-3xl font-extrabold text-white">{empresa.nome}</h1>
            <p className="text-xs text-[#8B84A0] mt-1">📍 {empresa.localizacao}</p>
          </div>
        </div>

        <a 
          href={empresa.site} 
          target="_blank" 
          rel="noopener noreferrer" 
          className="px-4 py-2 rounded-xl bg-white/10 border border-white/20 text-white text-xs font-semibold hover:bg-white/20 transition-all"
        >
          🌐 Acessar site oficial
        </a>
      </div>

      {/* AbasDaEmpresa (Frente 2) */}
      <div className="space-y-6">
        <div className="flex border-b border-white/10 gap-4">
          <Link 
            href={`/empresas/${slug}?aba=sobre`}
            className={`pb-3 text-sm font-semibold transition-colors border-b-2 ${
              abaAtiva === 'sobre' 
                ? 'border-[#F24487] text-[#F24487]' 
                : 'border-transparent text-[#8B84A0] hover:text-white'
            }`}
          >
            Sobre a Empresa
          </Link>
          <Link 
            href={`/empresas/${slug}?aba=vagas`}
            className={`pb-3 text-sm font-semibold transition-colors border-b-2 ${
              abaAtiva === 'vagas' 
                ? 'border-[#F24487] text-[#F24487]' 
                : 'border-transparent text-[#8B84A0] hover:text-white'
            }`}
          >
            Vagas Abertas ({vagasDaEmpresa.length})
          </Link>
        </div>

        {/* Conteúdo da Aba */}
        {abaAtiva === 'sobre' ? (
          <div className="bg-[#1B1632] border border-white/10 p-6 rounded-3xl space-y-4">
            <h2 className="text-lg font-bold text-white">Nossa História & Cultura</h2>
            <p className="text-sm text-[#B4AEC6] leading-relaxed">
              {empresa.sobre}
            </p>
          </div>
        ) : (
          <div className="space-y-4">
            {vagasDaEmpresa.length === 0 ? (
              <p className="text-sm text-[#8B84A0] py-6 text-center">Nenhuma vaga aberta nesta empresa no momento.</p>
            ) : (
              vagasDaEmpresa.map(vaga => (
                <div key={vaga.id} className="bg-[#1B1632] border border-white/10 p-5 rounded-2xl flex justify-between items-center">
                  <div>
                    <h3 className="text-base font-bold text-white">
                      <Link href={`/vagas/${vaga.id}`} className="hover:text-[#F24487]">
                        {vaga.titulo}
                      </Link>
                    </h3>
                    <p className="text-xs text-[#8B84A0] mt-1">📍 {vaga.local} · 🎓 {vaga.senioridade}</p>
                  </div>
                  <Link 
                    href={`/vagas/${vaga.id}`}
                    className="px-3 py-1.5 rounded-lg bg-[#F24487]/10 text-[#F24487] text-xs font-semibold hover:bg-[#F24487]/20"
                  >
                    Ver Vaga
                  </Link>
                </div>
              ))
            )}
          </div>
        )}
      </div>
    </div>
  );
}
