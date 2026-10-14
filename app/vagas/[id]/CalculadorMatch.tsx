'use client';

import { useState } from 'react';

type Props = {
  titulo: string;
  tags?: string[];
  aceitaIniciante?: boolean;
};

export default function CalculadorMatch({ titulo, tags = [], aceitaIniciante = false }: Props) {
  // Se a vaga tiver poucas tags, complementamos com competências fundamentais
  const listaBase = tags && tags.length >= 3 
    ? tags 
    : Array.from(new Set([...tags, 'Git / GitHub', 'Comunicação', 'Resolução de Problemas']));

  const [selecionadas, setSelecionadas] = useState<string[]>([]);

  function alternarSkill(skill: string) {
    setSelecionadas(prev => 
      prev.includes(skill) ? prev.filter(s => s !== skill) : [...prev, skill]
    );
  }

  const total = listaBase.length;
  const porcentagem = total > 0 ? Math.round((selecionadas.length / total) * 100) : 0;

  let corBarra = 'bg-amber-400';
  let corTexto = 'text-amber-300';
  let badgeMensagem = '🌱 Começando';
  let textoIncentivo = 'Dica para quem está em transição: você não precisa saber tudo! Vagas júnior buscam pessoas dedicadas e com vontade de aprender.';

  if (porcentagem >= 80) {
    corBarra = 'bg-emerald-400';
    corTexto = 'text-emerald-300';
    badgeMensagem = '⭐ Super Afinidade!';
    textoIncentivo = 'Excelente alinhamento! Seu perfil cobre a maior parte dos requisitos técnicos. Recomendamos fortemente o envio da candidatura.';
  } else if (porcentagem >= 40) {
    corBarra = 'bg-gradient-to-r from-[#F24487] to-[#7B4FD0]';
    corTexto = 'text-[#F24487]';
    badgeMensagem = '🚀 Perfil Promissor';
    textoIncentivo = 'Ótimo nível para posições de entrada! Com mais da metade dos itens você já se destaca da média dos candidatos.';
  }

  return (
    <div className="bg-[#100D1B] border border-white/10 rounded-2xl p-5 space-y-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="text-xl">🎯</span>
          <div>
            <h3 className="text-sm font-bold text-white">Medidor de Afinidade com a Vaga</h3>
            <p className="text-[11px] text-[#8B84A0]">Marque o que você já estudou ou praticou:</p>
          </div>
        </div>

        <span className={`text-xs font-mono font-bold px-2 py-0.5 rounded-full bg-white/5 border border-white/10 ${corTexto}`}>
          {badgeMensagem}
        </span>
      </div>

      {/* Checklist Interativo de Habilidades */}
      <div className="flex flex-wrap gap-2 pt-1">
        {listaBase.map(skill => {
          const marcado = selecionadas.includes(skill);
          return (
            <button
              key={skill}
              type="button"
              onClick={() => alternarSkill(skill)}
              className={`text-xs font-mono px-3 py-1.5 rounded-xl border transition-all flex items-center gap-1.5 cursor-pointer ${
                marcado
                  ? 'bg-[#F24487]/20 border-[#F24487] text-white shadow-sm shadow-[#F24487]/20'
                  : 'bg-[#08070E] border-white/10 text-[#8B84A0] hover:text-white hover:border-white/20'
              }`}
            >
              <span>{marcado ? '✓' : '+'}</span>
              <span>{skill}</span>
            </button>
          );
        })}
      </div>

      {/* Barra de Progresso com Kaizen / Afinidade */}
      <div className="space-y-1.5 pt-1">
        <div className="flex justify-between items-center text-xs font-mono">
          <span className="text-[#8B84A0]">Compatibilidade estimada:</span>
          <span className={`font-bold ${corTexto}`}>{porcentagem}%</span>
        </div>
        <div className="w-full bg-[#08070E] h-2 rounded-full overflow-hidden border border-white/5">
          <div 
            className={`h-full transition-all duration-500 ease-out rounded-full ${corBarra}`} 
            style={{ width: `${porcentagem}%` }}
          />
        </div>
      </div>

      {/* Mensagem Motivacional Anti-Síndrome do Impostor */}
      <div className="p-3 rounded-xl bg-white/5 border border-white/5 text-xs text-[#B4AEC6] leading-relaxed">
        <p>{textoIncentivo}</p>
      </div>
    </div>
  );
}
