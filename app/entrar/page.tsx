import Link from 'next/link';
import FormularioEntrar from './FormularioEntrar';
import { obterSessaoAtual } from '@/lib/auth-session';
import { logoutAction } from '@/app/actions/auth';

export const metadata = {
  title: 'Entrar · Leque de Vagas',
};

export default async function EntrarPage() {
  const usuario = await obterSessaoAtual();

  return (
    <div className="max-w-md mx-auto py-8">
      <div className="bg-[#1B1632] border border-white/10 p-6 md:p-8 rounded-3xl space-y-6 text-center">
        <div className="text-4xl">🔐</div>
        <div>
          <h1 className="text-2xl font-bold text-white">Acessar Conta</h1>
          <p className="text-xs text-[#B4AEC6] mt-1">Entre como candidata ou empresa parceira</p>
        </div>

        {usuario ? (
          <div className="p-4 rounded-2xl bg-[#08070E] border border-white/10 space-y-3 text-center">
            <p className="text-xs text-[#8B84A0]">Você já está conectado como:</p>
            <p className="text-base font-bold text-white">{usuario.nome}</p>
            <p className="text-xs font-mono text-[#A98CE0] capitalize">Perfil: {usuario.papel}</p>

            <form action={logoutAction} className="pt-2">
              <button
                type="submit"
                className="w-full py-2 rounded-xl bg-white/10 hover:bg-white/20 text-xs font-semibold text-white transition-colors"
              >
                Sair da Conta (Logout)
              </button>
            </form>
          </div>
        ) : (
          <FormularioEntrar />
        )}

        <p className="text-xs text-[#8B84A0]">
          Não possui cadastro prévio? Faça login direto acima para testar as permissões de acesso.
        </p>
      </div>
    </div>
  );
}
