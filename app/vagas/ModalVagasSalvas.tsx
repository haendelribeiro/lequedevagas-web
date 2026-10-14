'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import type { Vaga } from '@/data/vagas';

type Props = {
  todasVagas: Vaga[];
};

export default function ModalVagasSalvas({ todasVagas }: Props) {
  const [aberto, setAberto] = useState(false);
  const [favoritosIds, setFavoritosIds] = useState<string[]>([]);
  const [montado, setMontado] = useState(false);

  function carregarFavoritos() {
    try {
      const salvos = JSON.parse(localStorage.getItem('leque_vagas_favoritas') || '[]');
      setFavoritosIds(Array.isArray(salvos) ? salvos : []);
    } catch {
      setFavoritosIds([]);
    }
  }

  useEffect(() => {
    carregarFavoritos();
    setMontado(true);

    window.addEventListener('favoritosAtualizados', carregarFavoritos);
    return () => {
      window.removeEventListener('favoritosAtualizados', carregarFavoritos);
    };
  }, []);

  function removerFavorito(vagaId: string, e: React.MouseEvent) {
    e.preventDefault();
    e.stopPropagation();
    try {
      const novos = favoritosIds.filter(id => id !== vagaId);
      localStorage.setItem('leque_vagas_favoritas', JSON.stringify(novos));
      setFavoritosIds(novos);
      window.dispatchEvent(new Event('favoritosAtualizados'));
    } catch (err) {
      console.error('Erro ao remover favorito:', err);
    }
  }

  const vagasSalvas = todasVagas.filter(v => favoritosIds.includes(v.id));

  if (!montado) {
    return null;
  }

  return (
    <>
      <button
        type="button"
        onClick={() => setAberto(true)}
        className="px-3.5 py-1.5 rounded-full bg-white/5 hover:bg-white/10 border border-white/10 text-xs font-semibold text-amber-300 flex items-center gap-1.5 transition-all hover:border-amber-400/40"
        title="Ver vagas que você salvou como favoritas"
      >
        <span>⭐</span>
        <span>Vagas Salvas</span>
        <span className="ml-1 px-1.5 py-0.2 rounded-full bg-amber-400/20 text-amber-300 font-mono text-[11px]">
          {favoritosIds.length}
        </span>
      </button>

      {/* Modal / Slide-over de Vagas Salvas */}
      {aberto && (
        <div 
          className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4 animate-fadeIn"
          onClick={() => setAberto(false)}
        >
          <div 
            className="bg-[#100D1B] border border-white/15 rounded-3xl max-w-lg w-full p-6 shadow-2xl relative flex flex-col max-h-[85vh]"
            onClick={e => e.stopPropagation()}
          >
            {/* Cabeçalho */}
            <div className="flex items-center justify-between pb-4 border-b border-white/10">
              <div className="flex items-center gap-2">
                <span className="text-xl">⭐</span>
                <h3 className="text-lg font-bold text-white">Minhas Vagas Salvas</h3>
                <span className="text-xs font-mono text-amber-300 bg-amber-400/10 px-2 py-0.5 rounded-full">
                  {vagasSalvas.length} {vagasSalvas.length === 1 ? 'vaga' : 'vagas'}
                </span>
              </div>
              <button
                type="button"
                onClick={() => setAberto(false)}
                className="w-8 h-8 rounded-full bg-white/5 hover:bg-white/10 text-[#8B84A0] hover:text-white flex items-center justify-center text-sm"
              >
                ✕
              </button>
            </div>

            {/* Conteúdo / Lista */}
            <div className="overflow-y-auto py-4 space-y-3 flex-1 pr-1">
              {vagasSalvas.length === 0 ? (
                <div className="text-center py-10 space-y-3">
                  <span className="text-4xl block">🔖</span>
                  <p className="text-sm font-semibold text-white">Nenhuma vaga salva ainda</p>
                  <p className="text-xs text-[#8B84A0] max-w-xs mx-auto">
                    Clique na estrelinha dos cards no mural de vagas para guardar oportunidades e acessá-las rapidamente por aqui!
                  </p>
                </div>
              ) : (
                vagasSalvas.map(vaga => (
                  <div 
                    key={vaga.id}
                    className="p-3.5 rounded-xl bg-[#1B1632] border border-white/10 hover:border-[#F24487]/40 transition-all flex items-center justify-between gap-3 group"
                  >
                    <div className="min-w-0 flex-1">
                      <Link 
                        href={`/vagas/${vaga.id}`}
                        onClick={() => setAberto(false)}
                        className="font-bold text-sm text-white hover:text-[#F24487] transition-colors truncate block"
                      >
                        {vaga.titulo}
                      </Link>
                      <p className="text-xs text-[#8B84A0] flex items-center gap-1.5 mt-0.5">
                        <span className="text-[#A98CE0]">{vaga.empresa}</span>
                        <span>·</span>
                        <span>{vaga.local}</span>
                        {vaga.salario && (
                          <>
                            <span>·</span>
                            <span className="text-[#5fd08a]">{vaga.salario}</span>
                          </>
                        )}
                      </p>
                    </div>

                    <div className="flex items-center gap-2 shrink-0">
                      <Link
                        href={`/vagas/${vaga.id}`}
                        onClick={() => setAberto(false)}
                        className="text-xs px-2.5 py-1 rounded-lg bg-[#F24487]/20 text-[#F24487] font-semibold hover:bg-[#F24487] hover:text-white transition-colors"
                      >
                        Ver →
                      </Link>
                      <button
                        type="button"
                        onClick={(e) => removerFavorito(vaga.id, e)}
                        className="text-xs p-1.5 rounded-lg text-[#8B84A0] hover:text-red-400 hover:bg-white/5 transition-colors"
                        title="Remover dos favoritos"
                      >
                        🗑️
                      </button>
                    </div>
                  </div>
                ))
              )}
            </div>

            {/* Rodapé */}
            <div className="pt-3 border-t border-white/10 flex justify-between items-center text-xs text-[#8B84A0]">
              <span>Salvo localmente no seu navegador</span>
              <button
                type="button"
                onClick={() => setAberto(false)}
                className="text-white hover:underline font-mono"
              >
                Fechar
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
