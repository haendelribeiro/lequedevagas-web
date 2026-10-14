'use client';

import { useState, useTransition } from 'react';
import type { StatusCandidatura } from '@/data/candidaturas';
import { atualizarStatusCandidaturaAction } from '@/app/actions/candidaturas';

type Props = {
  candidaturaId: string;
  statusInicial?: StatusCandidatura;
};

const STATUS_CONFIG: Record<StatusCandidatura, { label: string; cor: string; bg: string; border: string }> = {
  recebido: {
    label: '🟡 Recebido',
    cor: 'text-amber-300',
    bg: 'bg-amber-400/10',
    border: 'border-amber-400/30'
  },
  em_analise: {
    label: '🔵 Em Análise',
    cor: 'text-blue-300',
    bg: 'bg-blue-400/10',
    border: 'border-blue-400/30'
  },
  entrevista: {
    label: '🟣 Entrevista',
    cor: 'text-purple-300',
    bg: 'bg-purple-400/10',
    border: 'border-purple-400/30'
  },
  aprovada: {
    label: '🟢 Aprovada',
    cor: 'text-emerald-300',
    bg: 'bg-emerald-400/10',
    border: 'border-emerald-400/30'
  },
  rejeitada: {
    label: '⚪ Não Selecionada',
    cor: 'text-[#8B84A0]',
    bg: 'bg-white/5',
    border: 'border-white/10'
  }
};

export default function SeletorStatusCandidatura({ candidaturaId, statusInicial = 'recebido' }: Props) {
  const [status, setStatus] = useState<StatusCandidatura>(statusInicial);
  const [isPending, startTransition] = useTransition();

  const config = STATUS_CONFIG[status] || STATUS_CONFIG.recebido;

  function handleChange(e: React.ChangeEvent<HTMLSelectElement>) {
    const novoStatus = e.target.value as StatusCandidatura;
    setStatus(novoStatus);

    startTransition(async () => {
      await atualizarStatusCandidaturaAction(candidaturaId, novoStatus);
    });
  }

  return (
    <div className="relative inline-flex items-center">
      <select
        value={status}
        disabled={isPending}
        onChange={handleChange}
        className={`text-xs font-mono font-medium rounded-lg px-2.5 py-1 border transition-all cursor-pointer appearance-none pr-6 focus:outline-none focus:ring-1 focus:ring-[#F24487] ${config.bg} ${config.cor} ${config.border} ${
          isPending ? 'opacity-50' : ''
        }`}
        title="Alterar status do processo seletivo"
      >
        <option value="recebido" className="bg-[#1B1632] text-white">🟡 Recebido</option>
        <option value="em_analise" className="bg-[#1B1632] text-white">🔵 Em Análise</option>
        <option value="entrevista" className="bg-[#1B1632] text-white">🟣 Entrevista</option>
        <option value="aprovada" className="bg-[#1B1632] text-white">🟢 Aprovada</option>
        <option value="rejeitada" className="bg-[#1B1632] text-white">⚪ Não Selecionada</option>
      </select>
      <span className="pointer-events-none absolute right-1.5 text-[10px] text-white/50">
        ▼
      </span>
    </div>
  );
}
