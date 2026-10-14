'use client';

import { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { vagasIniciais } from '@/data/vagas';

type ItemComando = {
  id: string;
  tipo: 'vaga' | 'pagina';
  titulo: string;
  subtitulo: string;
  url: string;
  icone: string;
};

const PAGINAS_SISTEMA: ItemComando[] = [
  { id: 'p-mural', tipo: 'pagina', titulo: 'Mural de Vagas', subtitulo: 'Explorar todas as vagas e filtros', url: '/vagas', icone: '💼' },
  { id: 'p-nova', tipo: 'pagina', titulo: 'Publicar Nova Vaga', subtitulo: 'Formulário de cadastro para empresas', url: '/vagas/nova', icone: '➕' },
  { id: 'p-painel', tipo: 'pagina', titulo: 'Painel da Empresa', subtitulo: 'Gerenciar vagas e candidaturas recebidas', url: '/painel', icone: '📊' },
  { id: 'p-empresa', tipo: 'pagina', titulo: 'Empresa: Aurora Tech', subtitulo: 'Perfil institucional e vagas ativas', url: '/empresas/aurora-tech', icone: '🏢' },
  { id: 'p-entrar', tipo: 'pagina', titulo: 'Alternar Perfil / Login', subtitulo: 'Candidata, Empresa ou Visitante', url: '/entrar', icone: '🔑' },
];

export default function BarraComandoGlobal() {
  const [aberto, setAberto] = useState(false);
  const [termo, setTermo] = useState('');
  const [itemAtivoIndex, setItemAtivoIndex] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);
  const router = useRouter();

  // Escuta atalho Ctrl+K / Cmd+K e tecla Escape
  useEffect(() => {
    function handleKeyDown(e: KeyboardEvent) {
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        setAberto(prev => !prev);
      } else if (e.key === 'Escape' && aberto) {
        e.preventDefault();
        setAberto(false);
      }
    }

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [aberto]);

  // Foca no input ao abrir
  useEffect(() => {
    if (aberto) {
      setTimeout(() => inputRef.current?.focus(), 50);
      setItemAtivoIndex(0);
    } else {
      setTermo('');
    }
  }, [aberto]);

  // Lista de vagas indexadas para busca instantânea
  const itensVagas: ItemComando[] = vagasIniciais.map(v => ({
    id: `v-${v.id}`,
    tipo: 'vaga',
    titulo: v.titulo,
    subtitulo: `${v.empresa} · ${v.local} · ${v.area}${v.salario ? ` · ${v.salario}` : ''}`,
    url: `/vagas/${v.id}`,
    icone: v.aceitaIniciante ? '🌱' : '💼'
  }));

  const todosItens = [...PAGINAS_SISTEMA, ...itensVagas];

  const itensFiltrados = termo.trim() === ''
    ? todosItens.slice(0, 7)
    : todosItens.filter(item => 
        item.titulo.toLowerCase().includes(termo.toLowerCase()) ||
        item.subtitulo.toLowerCase().includes(termo.toLowerCase())
      ).slice(0, 8);

  function selecionarItem(url: string) {
    setAberto(false);
    router.push(url);
  }

  function handleInputKeyDown(e: React.KeyboardEvent) {
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setItemAtivoIndex(prev => (prev + 1) % (itensFiltrados.length || 1));
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setItemAtivoIndex(prev => (prev - 1 + itensFiltrados.length) % (itensFiltrados.length || 1));
    } else if (e.key === 'Enter' && itensFiltrados[itemAtivoIndex]) {
      e.preventDefault();
      selecionarItem(itensFiltrados[itemAtivoIndex].url);
    }
  }

  return (
    <>
      {/* Botão de Trigger no Header */}
      <button
        type="button"
        onClick={() => setAberto(true)}
        className="hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/5 hover:bg-white/10 border border-white/10 text-xs text-[#8B84A0] hover:text-white transition-all group"
        title="Busca rápida (Ctrl + K)"
      >
        <span>🔍</span>
        <span className="font-mono text-[11px]">Buscar...</span>
        <kbd className="px-1.5 py-0.5 rounded bg-white/10 font-mono text-[10px] text-[#B4AEC6] group-hover:text-white border border-white/10">
          Ctrl K
        </kbd>
      </button>

      {/* Modal Command Palette */}
      {aberto && (
        <div 
          className="fixed inset-0 z-50 bg-black/75 backdrop-blur-sm flex items-start justify-center pt-20 px-4 animate-fadeIn"
          onClick={() => setAberto(false)}
        >
          <div 
            className="bg-[#100D1B] border border-white/20 rounded-3xl max-w-xl w-full shadow-2xl overflow-hidden relative flex flex-col"
            onClick={e => e.stopPropagation()}
          >
            {/* Input de Busca */}
            <div className="flex items-center gap-3 px-5 py-4 border-b border-white/10">
              <span className="text-lg text-[#F24487]">🔍</span>
              <input
                ref={inputRef}
                type="text"
                value={termo}
                onChange={e => {
                  setTermo(e.target.value);
                  setItemAtivoIndex(0);
                }}
                onKeyDown={handleInputKeyDown}
                placeholder="Buscar vagas, empresas, tecnologias ou atalhos..."
                className="w-full bg-transparent text-white text-sm placeholder-white/40 focus:outline-none"
              />
              <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-white/10 text-[#8B84A0] border border-white/10">
                ESC
              </span>
            </div>

            {/* Lista de Resultados */}
            <div className="p-2 max-h-96 overflow-y-auto space-y-1">
              {itensFiltrados.length === 0 ? (
                <div className="text-center py-8 text-xs text-[#8B84A0]">
                  Nenhum resultado encontrado para &quot;{termo}&quot;.
                </div>
              ) : (
                itensFiltrados.map((item, index) => {
                  const ativo = index === itemAtivoIndex;
                  return (
                    <div
                      key={item.id}
                      onClick={() => selecionarItem(item.url)}
                      onMouseEnter={() => setItemAtivoIndex(index)}
                      className={`px-3.5 py-2.5 rounded-xl cursor-pointer flex items-center justify-between transition-colors ${
                        ativo 
                          ? 'bg-[#F24487]/20 border border-[#F24487]/40 text-white' 
                          : 'hover:bg-white/5 text-[#B4AEC6]'
                      }`}
                    >
                      <div className="flex items-center gap-3 min-w-0">
                        <span className="text-base shrink-0">{item.icone}</span>
                        <div className="min-w-0">
                          <p className={`text-xs font-semibold truncate ${ativo ? 'text-white' : 'text-[#E0DBED]'}`}>
                            {item.titulo}
                          </p>
                          <p className="text-[11px] text-[#8B84A0] truncate font-mono">
                            {item.subtitulo}
                          </p>
                        </div>
                      </div>
                      <span className="text-xs text-[#8B84A0] font-mono shrink-0 ml-2">
                        {ativo ? '↵ Ir' : ''}
                      </span>
                    </div>
                  );
                })
              )}
            </div>

            {/* Dica de Teclado no Rodapé */}
            <div className="px-5 py-2.5 border-t border-white/10 bg-[#08070E] flex items-center justify-between text-[11px] text-[#8B84A0] font-mono">
              <div className="flex items-center gap-3">
                <span>↑↓ para navegar</span>
                <span>↵ para abrir</span>
                <span>ESC para sair</span>
              </div>
              <span className="text-[#A98CE0]">Leque de Vagas Search</span>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
