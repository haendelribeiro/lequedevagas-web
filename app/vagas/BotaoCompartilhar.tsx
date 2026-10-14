'use client';

import { useState } from 'react';

type Props = {
  vagaId: string;
  titulo: string;
  empresa: string;
};

export default function BotaoCompartilhar({ vagaId, titulo, empresa }: Props) {
  const [toastVisivel, setToastVisivel] = useState(false);

  async function handleCompartilhar(e: React.MouseEvent) {
    e.preventDefault();
    e.stopPropagation();

    const url = `${window.location.origin}/vagas/${vagaId}`;
    const texto = `Confira esta vaga de ${titulo} na ${empresa} no Leque de Vagas: ${url}`;

    if (navigator.share) {
      try {
        await navigator.share({
          title: `${titulo} - ${empresa}`,
          text: texto,
          url: url,
        });
        return;
      } catch {
        // Se usuário cancelar o share nativo, faz fallback pro clipboard
      }
    }

    try {
      await navigator.clipboard.writeText(url);
      setToastVisivel(true);
      setTimeout(() => {
        setToastVisivel(false);
      }, 2500);
    } catch {
      alert(`Copie o link: ${url}`);
    }
  }

  return (
    <>
      <button
        type="button"
        onClick={handleCompartilhar}
        title="Compartilhar vaga ou copiar link"
        className="w-7 h-7 rounded-full bg-white/5 hover:bg-white/10 border border-white/10 text-xs text-[#B4AEC6] hover:text-white flex items-center justify-center transition-all hover:scale-105"
      >
        🔗
      </button>

      {/* Toast Flutuante de Confirmação */}
      {toastVisivel && (
        <div className="fixed bottom-6 right-6 z-50 bg-[#1B1632] border border-[#5fd08a]/40 text-white px-4 py-3 rounded-2xl shadow-2xl flex items-center gap-3 animate-bounce">
          <span className="text-xl">📋</span>
          <div>
            <p className="text-xs font-bold text-[#5fd08a]">Link copiado com sucesso!</p>
            <p className="text-[11px] text-[#B4AEC6]">Cole no WhatsApp, LinkedIn ou com seus colegas.</p>
          </div>
        </div>
      )}
    </>
  );
}
