import Link from 'next/link';
import { notFound } from 'next/navigation';
import { buscarVagaPorId } from '@/data/vagas';
import FormularioEditarVaga from './FormularioEditarVaga';
import { obterSessaoAtual } from '@/lib/auth-session';
import { podeEditarVaga } from '@/lib/permissoes';

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
    title: `Editar ${vaga.titulo} · Leque de Vagas`,
  };
}

export default async function EditarVagaPage({ params }: Props) {
  const { id } = await params;
  const vaga = buscarVagaPorId(id);

  if (!vaga) {
    notFound();
  }

  const usuario = await obterSessaoAtual();
  const autorizado = podeEditarVaga(vaga.empresaSlug, usuario);

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      <Link href={`/vagas/${vaga.id}`} className="text-sm font-mono text-[#B4AEC6] hover:text-white flex items-center gap-1">
        ← Cancelar e voltar para a vaga
      </Link>

      <div className="bg-[#1B1632] border border-white/10 p-6 md:p-8 rounded-3xl space-y-6">
        <div>
          <h1 className="text-2xl font-bold text-white">Editar Vaga</h1>
          <p className="text-xs text-[#B4AEC6] mt-1">
            Modifique as informações da oportunidade abaixo. As alterações serão salvas imediatamente.
          </p>
        </div>

        {!autorizado && usuario && (
          <div className="p-4 rounded-xl bg-amber-500/10 border border-amber-500/30 text-amber-300 text-xs">
            ⚠️ <strong>Aviso de permissão:</strong> Você está conectado como <strong>{usuario.nome}</strong>. Apenas gestores da empresa <strong>{vaga.empresa}</strong> têm autorização de edição.
          </div>
        )}

        <FormularioEditarVaga vaga={vaga} />
      </div>
    </div>
  );
}
