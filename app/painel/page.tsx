import Link from 'next/link';
import { listarVagas } from '@/data/vagas';
import { listarCandidaturas } from '@/data/candidaturas';
import { obterSessaoAtual } from '@/lib/auth-session';
import BotaoDeletarVaga from './BotaoDeletarVaga';
import BotaoExportarCSV from './BotaoExportarCSV';
import SeletorStatusCandidatura from './SeletorStatusCandidatura';

export const metadata = {
  title: 'Painel da Empresa · Leque de Vagas',
};

export default async function PainelEmpresaPage() {
  const usuario = await obterSessaoAtual();
  const todasVagas = listarVagas();
  const todasCandidaturas = listarCandidaturas();

  const slugEmpresa = usuario?.empresaSlug || 'aurora-tech';
  const vagasDaEmpresa = todasVagas.filter(v => v.empresaSlug === slugEmpresa);
  const idsVagasEmpresa = new Set(vagasDaEmpresa.map(v => v.id));
  const candidaturasDaEmpresa = todasCandidaturas.filter(c => idsVagasEmpresa.has(c.vagaId));

  return (
    <div className="space-y-8">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 border-b border-white/10 pb-6">
        <div>
          <h1 className="text-3xl font-extrabold text-white">
            Painel de Gestão — {usuario?.empresaSlug === 'aurora-tech' ? 'Aurora Tech' : 'Empresa Parceira'}
          </h1>
          <p className="text-sm text-[#B4AEC6] mt-1">
            Gerencie suas vagas ativas, edições e candidaturas recebidas
          </p>
        </div>

        <Link 
          href="/vagas/nova" 
          className="px-4 py-2 rounded-full bg-[#F24487] text-white text-sm font-semibold hover:bg-[#E73982] transition-colors"
        >
          + Publicar Nova Vaga
        </Link>
      </div>

      {/* Cards de Métricas */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-[#1B1632] border border-white/10 p-5 rounded-2xl">
          <p className="text-xs font-mono text-[#8B84A0] uppercase">Vagas Ativas</p>
          <p className="text-3xl font-extrabold text-white mt-1">{vagasDaEmpresa.length}</p>
        </div>
        <div className="bg-[#1B1632] border border-white/10 p-5 rounded-2xl">
          <p className="text-xs font-mono text-[#8B84A0] uppercase">Candidaturas Recebidas</p>
          <p className="text-3xl font-extrabold text-[#5fd08a] mt-1">{candidaturasDaEmpresa.length}</p>
        </div>
        <div className="bg-[#1B1632] border border-white/10 p-5 rounded-2xl">
          <p className="text-xs font-mono text-[#8B84A0] uppercase">Status do Processo</p>
          <p className="text-3xl font-extrabold text-[#A98CE0] mt-1">Ativo 🟢</p>
        </div>
      </div>

      {/* Vagas Cadastradas */}
      <div className="bg-[#1B1632] border border-white/10 rounded-2xl p-6 space-y-4">
        <h2 className="text-lg font-bold text-white">Suas Vagas Cadastradas</h2>
        {vagasDaEmpresa.length === 0 ? (
          <p className="text-sm text-[#8B84A0]">Nenhuma vaga cadastrada por esta empresa ainda.</p>
        ) : (
          <div className="divide-y divide-white/5">
            {vagasDaEmpresa.map(vaga => (
              <div key={vaga.id} className="py-4 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3">
                <div>
                  <h3 className="text-sm font-bold text-white">{vaga.titulo}</h3>
                  <p className="text-xs text-[#8B84A0] mt-0.5">📍 {vaga.local} · 🏷️ {vaga.area} · 🎓 {vaga.senioridade}</p>
                </div>
                <div className="flex gap-2">
                  <Link 
                    href={`/vagas/${vaga.id}`} 
                    className="text-xs text-white bg-white/10 px-3 py-1.5 rounded-lg hover:bg-white/20"
                  >
                    Ver Detalhes
                  </Link>
                  <Link 
                    href={`/vagas/${vaga.id}/editar`} 
                    className="text-xs text-[#F24487] bg-[#F24487]/10 px-3 py-1.5 rounded-lg hover:bg-[#F24487]/20 font-semibold"
                  >
                    ✏️ Editar
                  </Link>
                  <BotaoDeletarVaga vagaId={vaga.id} titulo={vaga.titulo} />
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Candidaturas Recebidas */}
      <div className="bg-[#1B1632] border border-white/10 rounded-2xl p-6 space-y-4">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2">
          <h2 className="text-lg font-bold text-white">Últimas Candidaturas Recebidas</h2>
          <BotaoExportarCSV 
            candidaturas={candidaturasDaEmpresa} 
            empresaNome={usuario?.empresaSlug === 'aurora-tech' ? 'Aurora Tech' : 'Empresa'} 
          />
        </div>
        {candidaturasDaEmpresa.length === 0 ? (
          <p className="text-sm text-[#8B84A0]">Ainda não há candidaturas enviadas para as vagas desta empresa.</p>
        ) : (
          <div className="space-y-3">
            {candidaturasDaEmpresa.map(cand => (
              <div key={cand.id} className="p-4 rounded-xl bg-[#08070E] border border-white/5 flex flex-col md:flex-row justify-between items-start md:items-center gap-3">
                <div className="flex-1">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="font-bold text-sm text-white">{cand.nome}</span>
                    <span className="text-xs text-[#8B84A0] font-mono">({cand.email})</span>
                    <span className="text-[11px] text-[#8B84A0] font-mono">· {cand.criadoEm}</span>
                  </div>
                  <p className="text-xs text-[#B4AEC6] mt-1 line-clamp-1 italic">"{cand.apresentacao}"</p>
                </div>
                <div className="flex items-center gap-3 shrink-0 self-end md:self-center">
                  <SeletorStatusCandidatura candidaturaId={cand.id} statusInicial={cand.status} />
                  <a 
                    href={cand.linkedin} 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="text-xs text-[#A98CE0] hover:underline"
                  >
                    Ver Perfil ↗
                  </a>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
