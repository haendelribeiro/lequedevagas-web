import { buscarVagaPorId } from '@/data/vagas';
import { empresasIniciais } from '@/data/empresas';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import FormularioCandidatura from './FormularioCandidatura';
import BotaoFavorito from '../BotaoFavorito';

type Props = {
  params: Promise<{
    id: string;
  }>;
};

export async function generateMetadata({ params }: Props) {
  const { id } = await params;
  const vaga = buscarVagaPorId(id);
  if (!vaga) return { title: 'Vaga não encontrada · Leque de Vagas' };

  return {
    title: `${vaga.titulo} em ${vaga.empresa} · Leque de Vagas`,
    description: vaga.descricao.slice(0, 160),
  };
}

export default async function DetalheVagaPage({ params }: Props) {
  const { id } = await params;
  const vaga = buscarVagaPorId(id);

  if (!vaga) {
    notFound();
  }

  const empresa = empresasIniciais.find(e => e.slug === vaga.empresaSlug);

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      {/* Botão Voltar */}
      <Link href="/vagas" className="text-sm font-mono text-[#B4AEC6] hover:text-white flex items-center gap-1">
        ← Voltar ao mural de vagas
      </Link>

      {/* Header da Vaga */}
      <div className="bg-[#1B1632] border border-white/10 p-6 md:p-8 rounded-3xl space-y-4">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <span className="text-3xl">{empresa?.logo || '🏢'}</span>
            <div>
              <Link href={`/empresas/${vaga.empresaSlug}`} className="text-sm font-mono text-[#A98CE0] hover:underline">
                {vaga.empresa}
              </Link>
              <p className="text-xs text-[#8B84A0]">{empresa?.localizacao}</p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {vaga.aceitaIniciante && (
              <span className="px-3 py-1 rounded-full bg-[#5fd08a]/10 text-[#5fd08a] border border-[#5fd08a]/30 text-xs font-mono font-semibold">
                🌱 Aceita Transição / Iniciantes
              </span>
            )}
            <Link 
              href={`/vagas/${vaga.id}/editar`}
              className="px-3 py-1 rounded-full bg-white/5 hover:bg-white/10 border border-white/10 text-xs text-[#B4AEC6] hover:text-white font-mono"
            >
              ✏️ Editar Vaga
            </Link>
            <BotaoFavorito vagaId={vaga.id} />
          </div>
        </div>

        <h1 className="text-2xl md:text-4xl font-extrabold text-white">
          {vaga.titulo}
        </h1>

        <div className="flex flex-wrap gap-2 text-xs font-mono">
          <span className="bg-[#08070E] px-3 py-1.5 rounded-lg border border-white/10 text-white">
            📍 Local: {vaga.local}
          </span>
          <span className="bg-[#08070E] px-3 py-1.5 rounded-lg border border-white/10 text-white">
            🏷️ Área: {vaga.area}
          </span>
          <span className="bg-[#08070E] px-3 py-1.5 rounded-lg border border-white/10 text-white">
            🎓 Nível: {vaga.senioridade}
          </span>
          <span className="bg-[#08070E] px-3 py-1.5 rounded-lg border border-white/10 text-[#8B84A0]">
            📅 Publicada em: {vaga.publicadaEm}
          </span>
        </div>
      </div>

      {/* Grid Principal: Descrição da Vaga + Form de Candidatura */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Descrição Detalhada */}
        <div className="lg:col-span-2 bg-[#1B1632] border border-white/10 p-6 rounded-3xl space-y-4">
          <h2 className="text-xl font-bold text-white border-b border-white/10 pb-3">Sobre a Vaga</h2>
          <div className="text-sm text-[#B4AEC6] leading-relaxed whitespace-pre-line">
            {vaga.descricao}
          </div>

          {empresa && (
            <div className="mt-8 pt-6 border-t border-white/10 space-y-2">
              <h3 className="text-md font-bold text-white">Sobre a empresa ({empresa.nome})</h3>
              <p className="text-xs text-[#B4AEC6]">{empresa.sobre}</p>
              <a 
                href={empresa.site} 
                target="_blank" 
                rel="noopener noreferrer" 
                className="text-xs text-[#F24487] hover:underline inline-block pt-1"
              >
                Visitar site oficial →
              </a>
            </div>
          )}
        </div>

        {/* Formulário de Candidatura (Frente 3) */}
        <div className="bg-[#1B1632] border border-white/10 p-6 rounded-3xl space-y-4 h-fit">
          <h2 className="text-xl font-bold text-white border-b border-white/10 pb-3">Candidatar-se</h2>
          <FormularioCandidatura vagaId={vaga.id} />
        </div>
      </div>
    </div>
  );
}
