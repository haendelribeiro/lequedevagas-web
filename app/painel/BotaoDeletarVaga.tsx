'use client';

import { useTransition } from 'react';
import { deletarVagaAction } from '@/app/actions/vagas';

export default function BotaoDeletarVaga({ vagaId, titulo }: { vagaId: string; titulo: string }) {
  const [isPending, startTransition] = useTransition();

  function handleDeletar() {
    if (confirm(`Tem certeza que deseja encerrar e excluir a vaga "${titulo}"? Esta ação não pode ser desfeita.`)) {
      startTransition(async () => {
        await deletarVagaAction(vagaId);
      });
    }
  }

  return (
    <button
      type="button"
      onClick={handleDeletar}
      disabled={isPending}
      className="text-xs text-red-400 bg-red-500/10 hover:bg-red-500/20 px-3 py-1.5 rounded-lg font-semibold transition-colors disabled:opacity-50"
      title="Encerrar e excluir vaga"
    >
      {isPending ? 'Excluindo...' : '🗑️ Encerrar'}
    </button>
  );
}
