import Link from 'next/link';
import { Vaga } from '@/data/vagas';

type Props = {
  todasVagas: Vaga[];
  areaSelecionada?: string;
};

export default function EstatisticasMercado({ todasVagas, areaSelecionada }: Props) {
  const total = todasVagas.length || 1;

  const contagemPorArea: Record<string, { count: number; cor: string; bgBadge: string }> = {
    'Front-end': { count: 0, cor: 'bg-[#F24487]', bgBadge: 'border-[#F24487]/30 text-[#F24487]' },
    'Back-end': { count: 0, cor: 'bg-[#7B4FD0]', bgBadge: 'border-[#7B4FD0]/30 text-[#A98CE0]' },
    'Dados': { count: 0, cor: 'bg-cyan-500', bgBadge: 'border-cyan-500/30 text-cyan-400' },
    'QA': { count: 0, cor: 'bg-[#5fd08a]', bgBadge: 'border-[#5fd08a]/30 text-[#5fd08a]' },
    'Design': { count: 0, cor: 'bg-amber-400', bgBadge: 'border-amber-400/30 text-amber-300' },
  };

  todasVagas.forEach((v) => {
    if (contagemPorArea[v.area]) {
      contagemPorArea[v.area].count += 1;
    }
  });

  return (
    <div className="bg-[#1B1632] border border-white/10 p-5 rounded-2xl space-y-4">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2">
        <div>
          <h2 className="text-sm font-bold text-white flex items-center gap-2">
            <span>📊</span>
            <span>Raio-X de Oportunidades por Área de Tecnologia</span>
          </h2>
          <p className="text-xs text-[#8B84A0] mt-0.5">
            Distribuição em tempo real das vagas abertas na plataforma
          </p>
        </div>
        <span className="text-xs font-mono text-[#B4AEC6] bg-[#08070E] px-2.5 py-1 rounded-lg border border-white/10">
          Total: {total} vagas
        </span>
      </div>

      {/* Barra Visual Segmentada Proporcional */}
      <div className="w-full h-3 bg-[#08070E] rounded-full overflow-hidden flex p-0.5 gap-0.5 border border-white/5">
        {Object.entries(contagemPorArea).map(([area, info]) => {
          const porcentagem = Math.round((info.count / total) * 100);
          if (porcentagem === 0) return null;
          return (
            <div
              key={area}
              style={{ width: `${porcentagem}%` }}
              title={`${area}: ${info.count} vagas (${porcentagem}%)`}
              className={`h-full rounded-sm transition-all hover:opacity-80 ${info.cor}`}
            />
          );
        })}
      </div>

      {/* Atalhos de Filtro Rápido */}
      <div className="flex flex-wrap gap-2 pt-1">
        {Object.entries(contagemPorArea).map(([area, info]) => {
          const ativa = areaSelecionada === area;
          const porcentagem = Math.round((info.count / total) * 100);

          return (
            <Link
              key={area}
              href={ativa ? '/vagas' : `/vagas?area=${encodeURIComponent(area)}`}
              className={`text-xs font-mono px-3 py-1.5 rounded-xl border flex items-center gap-2 transition-all ${
                ativa
                  ? 'bg-white/10 border-white text-white font-bold shadow-sm'
                  : `bg-[#08070E] ${info.bgBadge} hover:bg-white/5`
              }`}
            >
              <span>{area}</span>
              <span className="text-[10px] opacity-70">
                {info.count} ({porcentagem}%)
              </span>
              {ativa && <span className="text-[10px]">✕</span>}
            </Link>
          );
        })}
      </div>
    </div>
  );
}
