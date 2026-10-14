'use client';

import { useState, useEffect } from 'react';

type Props = {
  vagaId: string;
};

export default function BotaoFavorito({ vagaId }: Props) {
  const [salvo, setSalvo] = useState(false);
  const [carregado, setCarregado] = useState(false);

  useEffect(() => {
    try {
      const favoritos = JSON.parse(localStorage.getItem('leque_vagas_favoritas') || '[]');
      setSalvo(favoritos.includes(vagaId));
    } catch {
      // Ignora erro de JSON
    } finally {
      setCarregado(true);
    }
  }, [vagaId]);

  function alternarFavorito(e: React.MouseEvent) {
    e.preventDefault();
    e.stopPropagation();

    try {
      const favoritos: string[] = JSON.parse(localStorage.getItem('leque_vagas_favoritas') || '[]');
      let novosFavoritos: string[];

      if (favoritos.includes(vagaId)) {
        novosFavoritos = favoritos.filter(id => id !== vagaId);
        setSalvo(false);
      } else {
        novosFavoritos = [...favoritos, vagaId];
        setSalvo(true);
      }

      localStorage.setItem('leque_vagas_favoritas', JSON.stringify(novosFavoritos));
      window.dispatchEvent(new Event('favoritosAtualizados'));
    } catch (err) {
      console.error('Erro ao salvar favorito:', err);
    }
  }

  if (!carregado) {
    return <span className="w-7 h-7 inline-block"></span>;
  }

  return (
    <button
      type="button"
      onClick={alternarFavorito}
      title={salvo ? 'Remover das vagas salvas' : 'Salvar vaga para depois'}
      className={`w-7 h-7 rounded-full flex items-center justify-center text-sm transition-all ${
        salvo 
          ? 'bg-amber-400/20 text-amber-300 border border-amber-400/40 shadow-sm shadow-amber-400/20 scale-110' 
          : 'bg-white/5 text-[#8B84A0] hover:text-white hover:bg-white/10 border border-white/10'
      }`}
    >
      {salvo ? '★' : '☆'}
    </button>
  );
}
