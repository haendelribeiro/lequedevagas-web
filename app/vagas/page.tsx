import Link from 'next/link';
import { listarVagas } from '@/data/vagas';
import PaginacaoVagas from './PaginacaoVagas';
import EstatisticasMercado from './EstatisticasMercado';
import BotaoFavorito from './BotaoFavorito';
import BotaoCompartilhar from './BotaoCompartilhar';
import ModalVagasSalvas from './ModalVagasSalvas';

export const metadata = {
  title: 'Mural de Vagas · Leque de Vagas',
  description: 'Lista de vagas de tecnologia filtradas por área, senioridade e modelo de trabalho.',
};

const ITENS_POR_PAGINA = 6;

type Props = {
  searchParams: Promise<{
    area?: string;
    senioridade?: string;
    iniciante?: string;
    busca?: string;
    pagina?: string;
  }>;
};

export default async function MuralDeVagasPage({ searchParams }: Props) {
  const params = await searchParams;
  const areaFiltro = params.area || '';
  const senioridadeFiltro = params.senioridade || '';
  const inicianteFiltro = params.iniciante === 'sim';
  const termoBusca = (params.busca || '').toLowerCase();
  const paginaAtual = Math.max(1, parseInt(params.pagina || '1', 10) || 1);

  const todasVagas = listarVagas();

  // Filtragem no Server Component
  const vagasFiltradas = todasVagas.filter((vaga) => {
    if (areaFiltro && vaga.area !== areaFiltro) return false;
    if (senioridadeFiltro && vaga.senioridade !== senioridadeFiltro) return false;
    if (inicianteFiltro && !vaga.aceitaIniciante) return false;
    if (
      termoBusca &&
      !vaga.titulo.toLowerCase().includes(termoBusca) &&
      !vaga.empresa.toLowerCase().includes(termoBusca) &&
      !vaga.tags?.some(t => t.toLowerCase().includes(termoBusca))
    ) {
      return false;
    }
    return true;
  });

  const totalVagas = vagasFiltradas.length;
  const totalPaginas = Math.ceil(totalVagas / ITENS_POR_PAGINA);
  const inicio = (paginaAtual - 1) * ITENS_POR_PAGINA;
  const vagasPaginadas = vagasFiltradas.slice(inicio, inicio + ITENS_POR_PAGINA);

  const iniciantesCount = vagasFiltradas.filter((v) => v.aceitaIniciante).length;

  return (
    <div className="space-y-8">
      {/* Título & Contadores */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 border-b border-white/10 pb-6">
        <div>
          <h1 className="text-3xl font-extrabold text-white">Mural de Vagas</h1>
          <p className="text-sm text-[#B4AEC6] mt-1">
            Exibindo <span className="text-white font-bold">{vagasPaginadas.length}</span> de {totalVagas} encontradas ({todasVagas.length} no total) ·{' '}
            <span className="text-[#5fd08a] font-bold">{iniciantesCount} aceitam iniciantes</span>
          </p>
        </div>

        <div className="flex items-center gap-3">
          <ModalVagasSalvas todasVagas={todasVagas} />
          <Link 
            href="/vagas/nova" 
            className="px-4 py-2 rounded-full bg-[#F24487] text-white text-sm font-semibold hover:bg-[#E73982] transition-colors"
          >
            + Publicar Nova Vaga
          </Link>
        </div>
      </div>

      {/* Estatísticas de Mercado / Data Viz (Frente 4) */}
      <EstatisticasMercado todasVagas={todasVagas} areaSelecionada={areaFiltro} />

      {/* Filtros em Formulário GET (grava diretamente na URL /searchParams) */}
      <form method="GET" className="bg-[#1B1632] border border-white/10 p-4 rounded-2xl grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div>
          <label className="block text-xs font-mono uppercase tracking-wider text-[#8B84A0] mb-1">Buscar por palavra-chave</label>
          <input 
            type="text" 
            name="busca" 
            defaultValue={params.busca || ''} 
            placeholder="Ex: Next.js, React, Python..." 
            className="w-full bg-[#08070E] border border-white/10 rounded-xl px-3 py-2 text-sm text-white placeholder-white/30 focus:outline-none focus:border-[#F24487]"
          />
        </div>

        <div>
          <label className="block text-xs font-mono uppercase tracking-wider text-[#8B84A0] mb-1">Área</label>
          <select 
            name="area" 
            defaultValue={areaFiltro}
            className="w-full bg-[#08070E] border border-white/10 rounded-xl px-3 py-2 text-sm text-white focus:outline-none focus:border-[#F24487]"
          >
            <option value="">Todas as áreas</option>
            <option value="Front-end">Front-end</option>
            <option value="Back-end">Back-end</option>
            <option value="Dados">Dados</option>
            <option value="QA">QA</option>
            <option value="Design">Design</option>
          </select>
        </div>

        <div>
          <label className="block text-xs font-mono uppercase tracking-wider text-[#8B84A0] mb-1">Senioridade</label>
          <select 
            name="senioridade" 
            defaultValue={senioridadeFiltro}
            className="w-full bg-[#08070E] border border-white/10 rounded-xl px-3 py-2 text-sm text-white focus:outline-none focus:border-[#F24487]"
          >
            <option value="">Todas</option>
            <option value="Estágio">Estágio</option>
            <option value="Júnior">Júnior</option>
            <option value="Pleno">Pleno</option>
          </select>
        </div>

        <div className="flex items-end gap-2">
          <label className="flex items-center gap-2 text-sm text-white bg-[#08070E] border border-white/10 rounded-xl px-3 py-2.5 w-full cursor-pointer hover:border-white/20">
            <input 
              type="checkbox" 
              name="iniciante" 
              value="sim" 
              defaultChecked={inicianteFiltro}
              className="accent-[#F24487] w-4 h-4"
            />
            <span>Só Aceita Iniciante</span>
          </label>

          <button 
            type="submit" 
            className="px-4 py-2.5 bg-[#7B4FD0] text-white text-sm font-semibold rounded-xl hover:bg-[#683eb8] transition-colors"
          >
            Filtrar
          </button>
        </div>
      </form>

      {/* Lista de Vagas */}
      {vagasFiltradas.length === 0 ? (
        <div className="text-center py-12 bg-[#1B1632]/50 border border-white/10 rounded-2xl">
          <p className="text-lg text-[#B4AEC6]">Nenhuma vaga encontrada para os filtros selecionados.</p>
          <Link href="/vagas" className="text-sm text-[#F24487] hover:underline mt-2 inline-block">Limpar filtros</Link>
        </div>
      ) : (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {vagasPaginadas.map((vaga) => (
              <div 
                key={vaga.id} 
                className="bg-[#1B1632] border border-white/10 hover:border-[#F24487]/50 p-5 rounded-2xl flex flex-col justify-between transition-all group"
              >
                <div>
                  <div className="flex items-center justify-between gap-2 mb-2">
                    <Link href={`/empresas/${vaga.empresaSlug}`} className="text-xs font-mono text-[#A98CE0] hover:underline">
                      {vaga.empresa}
                    </Link>
                    <div className="flex items-center gap-2">
                      {vaga.aceitaIniciante && (
                        <span className="text-[11px] font-mono px-2 py-0.5 rounded-full bg-[#5fd08a]/10 text-[#5fd08a] border border-[#5fd08a]/30">
                          🌱 Aceita Iniciante
                        </span>
                      )}
                      <BotaoFavorito vagaId={vaga.id} />
                    </div>
                  </div>

                  <h2 className="text-lg font-bold text-white group-hover:text-[#F24487] transition-colors">
                    <Link href={`/vagas/${vaga.id}`}>
                      {vaga.titulo}
                    </Link>
                  </h2>

                  <p className="text-xs text-[#8B84A0] mt-1 flex flex-wrap items-center gap-1.5">
                    <span>📍 {vaga.local}</span>
                    <span>·</span>
                    <span>🏷️ {vaga.area}</span>
                    <span>·</span>
                    <span>🎓 {vaga.senioridade}</span>
                    {vaga.salario && (
                      <>
                        <span>·</span>
                        <span className="text-[#5fd08a] font-semibold">💰 {vaga.salario}</span>
                        <span className="px-1.5 py-0.2 rounded bg-white/5 border border-white/10 text-[10px] text-[#B4AEC6]">{vaga.regime || 'CLT'}</span>
                      </>
                    )}
                  </p>

                  <p className="text-sm text-[#B4AEC6] mt-3 line-clamp-2">
                    {vaga.descricao}
                  </p>

                  {vaga.tags && vaga.tags.length > 0 && (
                    <div className="flex flex-wrap gap-1.5 mt-3">
                      {vaga.tags.map((tag) => (
                        <Link
                          key={tag}
                          href={`/vagas?busca=${encodeURIComponent(tag)}`}
                          className="text-[11px] font-mono px-2 py-0.5 rounded-md bg-[#08070E] border border-white/10 text-[#B4AEC6] hover:text-[#F24487] hover:border-[#F24487]/40 transition-colors"
                        >
                          #{tag}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>

                <div className="mt-4 pt-3 border-t border-white/5 flex items-center justify-between">
                  <span className="text-xs text-[#8B84A0]">Publicada em {vaga.publicadaEm}</span>
                  <div className="flex items-center gap-2">
                    <BotaoCompartilhar vagaId={vaga.id} titulo={vaga.titulo} empresa={vaga.empresa} />
                    <Link 
                      href={`/vagas/${vaga.id}/editar`}
                      className="text-xs text-[#8B84A0] hover:text-white"
                      title="Editar vaga"
                    >
                      ✏️
                    </Link>
                    <Link 
                      href={`/vagas/${vaga.id}`}
                      className="text-xs font-semibold text-[#F24487] group-hover:translate-x-1 transition-transform inline-flex items-center gap-1"
                    >
                      Ver Detalhes →
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Paginação da Frente 4 */}
          <PaginacaoVagas 
            paginaAtual={paginaAtual} 
            totalPaginas={totalPaginas} 
            parametrosAtuais={{
              area: params.area,
              senioridade: params.senioridade,
              iniciante: params.iniciante,
              busca: params.busca,
            }}
          />
        </>
      )}
    </div>
  );
}
