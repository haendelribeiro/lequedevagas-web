import Link from 'next/link';
import FormularioNovaVaga from './FormularioNovaVaga';
import { obterSessaoAtual } from '@/lib/auth-session';
import { podePublicarVaga } from '@/lib/permissoes';

export const metadata = {
  title: 'Publicar Nova Vaga · Leque de Vagas',
};

export default async function NovaVagaPage() {
  const usuario = await obterSessaoAtual();
  const autorizado = podePublicarVaga(usuario);

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      <Link href="/vagas" className="text-sm font-mono text-[#B4AEC6] hover:text-white flex items-center gap-1">
        ← Voltar ao mural
      </Link>

      <div className="bg-[#1B1632] border border-white/10 p-6 md:p-8 rounded-3xl space-y-6">
        <div>
          <h1 className="text-2xl font-bold text-white">Publicar Nova Vaga de Tecnologia</h1>
          <p className="text-xs text-[#B4AEC6] mt-1">
            Preencha os dados abaixo. Lembre-se: o foco da plataforma são vagas para quem está migrando de carreira.
          </p>
        </div>

        {/* Alerta de Perfil / RBAC */}
        {!autorizado && usuario && (
          <div className="p-4 rounded-xl bg-amber-500/10 border border-amber-500/30 text-amber-300 text-xs">
            ⚠️ <strong>Modo Demonstração:</strong> Você está conectado como <strong>{usuario.nome}</strong> ({usuario.papel}). Para publicar vagas oficiais como empresa recrutadora, alterne sua conta em <Link href="/entrar" className="underline font-bold">Acessar Conta</Link>.
          </div>
        )}

        <FormularioNovaVaga />
      </div>
    </div>
  );
}
