import Link from 'next/link';

type Props = {
  paginaAtual: number;
  totalPaginas: number;
  parametrosAtuais: Record<string, string | undefined>;
};

export default function PaginacaoVagas({
  paginaAtual,
  totalPaginas,
  parametrosAtuais,
}: Props) {
  if (totalPaginas <= 1) return null;

  function gerarHref(pagina: number) {
    const params = new URLSearchParams();

    Object.entries(parametrosAtuais).forEach(([chave, valor]) => {
      if (valor && chave !== 'pagina') {
        params.set(chave, valor);
      }
    });

    params.set('pagina', String(pagina));
    return `/vagas?${params.toString()}`;
  }

  const paginas = Array.from({ length: totalPaginas }, (_, i) => i + 1);

  return (
    <div className="flex items-center justify-center gap-2 pt-6">
      {paginaAtual > 1 && (
        <Link
          href={gerarHref(paginaAtual - 1)}
          className="px-3 py-1.5 rounded-lg border border-white/10 bg-[#1B1632] text-xs font-mono text-[#B4AEC6] hover:text-white hover:border-[#F24487]/50"
        >
          ← Anterior
        </Link>
      )}

      {paginas.map((num) => {
        const ativa = num === paginaAtual;
        return (
          <Link
            key={num}
            href={gerarHref(num)}
            className={`w-8 h-8 rounded-lg flex items-center justify-center text-xs font-mono font-bold transition-all ${
              ativa
                ? 'bg-[#F24487] text-white shadow-md shadow-[#F24487]/30'
                : 'bg-[#1B1632] text-[#B4AEC6] border border-white/10 hover:text-white hover:border-white/30'
            }`}
          >
            {num}
          </Link>
        );
      })}

      {paginaAtual < totalPaginas && (
        <Link
          href={gerarHref(paginaAtual + 1)}
          className="px-3 py-1.5 rounded-lg border border-white/10 bg-[#1B1632] text-xs font-mono text-[#B4AEC6] hover:text-white hover:border-[#F24487]/50"
        >
          Próxima →
        </Link>
      )}
    </div>
  );
}
