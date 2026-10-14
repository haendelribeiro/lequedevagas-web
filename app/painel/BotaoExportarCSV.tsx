'use client';

import { Candidatura } from '@/data/candidaturas';

type Props = {
  candidaturas: Candidatura[];
  empresaNome?: string;
};

export default function BotaoExportarCSV({ candidaturas, empresaNome = 'empresa' }: Props) {
  function exportarParaCSV() {
    if (candidaturas.length === 0) {
      alert('Nenhuma candidatura disponível para exportação no momento.');
      return;
    }

    // Cabeçalho da planilha
    const cabecalhos = ['ID', 'ID da Vaga', 'Nome do Candidato', 'E-mail', 'LinkedIn / Portfolio', 'Data de Envio', 'Carta de Apresentacao'];
    
    // Linhas de dados formatadas
    const linhas = candidaturas.map(c => [
      `"${c.id}"`,
      `"${c.vagaId}"`,
      `"${c.nome.replace(/"/g, '""')}"`,
      `"${c.email.replace(/"/g, '""')}"`,
      `"${c.linkedin.replace(/"/g, '""')}"`,
      `"${c.criadoEm}"`,
      `"${c.apresentacao.replace(/"/g, '""').replace(/\n/g, ' ')}"`
    ]);

    // UTF-8 BOM (\uFEFF) para o Microsoft Excel abrir com acentuação correta
    const conteudoCSV = '\uFEFF' + [cabecalhos.join(';'), ...linhas.map(l => l.join(';'))].join('\r\n');

    const blob = new Blob([conteudoCSV], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    
    const dataHoje = new Date().toISOString().split('T')[0];
    link.href = url;
    link.setAttribute('download', `candidaturas-${empresaNome.toLowerCase().replace(/\s+/g, '-')}-${dataHoje}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  }

  return (
    <button
      type="button"
      onClick={exportarParaCSV}
      disabled={candidaturas.length === 0}
      className="px-3.5 py-1.5 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-xs font-semibold text-[#5fd08a] hover:border-[#5fd08a]/50 flex items-center gap-1.5 transition-all disabled:opacity-40 disabled:cursor-not-allowed"
      title="Baixar planilha CSV com os dados das candidatas"
    >
      <span>📥</span>
      <span>Exportar Candidaturas (.CSV)</span>
    </button>
  );
}
