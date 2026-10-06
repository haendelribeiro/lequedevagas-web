import './globals.css';
import Link from 'next/link';
import type { Metadata } from 'next';
import { obterSessaoAtual } from '@/lib/auth-session';
import { logoutAction } from '@/app/actions/auth';

export const metadata: Metadata = {
  title: 'Leque de Vagas — Oportunidades Tech para Migração de Carreira',
  description: 'Encontre vagas de tecnologia de entrada sem exigências absurdas de experiência. Filtradas por área, senioridade e modelo de trabalho.',
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const usuario = await obterSessaoAtual();

  return (
    <html lang="pt-BR">
      <body>
        {/* Cabeçalho de Navegação */}
        <header className="border-b border-white/10 bg-[#100D1B]/80 backdrop-blur-md sticky top-0 z-50">
          <div className="max-w-6xl mx-auto px-4 h-16 flex items-center justify-between">
            <Link href="/" className="flex items-center gap-2 font-bold text-xl tracking-tight text-white hover:opacity-90">
              <span className="text-2xl">💼</span>
              <span>Leque de <span className="bg-gradient-to-r from-[#F24487] to-[#7B4FD0] bg-clip-text text-transparent">Vagas</span></span>
            </Link>

            <nav className="flex items-center gap-4 sm:gap-6 text-sm font-medium text-[#B4AEC6]">
              <Link href="/vagas" className="hover:text-white transition-colors">
                Mural de Vagas
              </Link>
              <Link href="/empresas/aurora-tech" className="hover:text-white transition-colors hidden md:block">
                Empresas
              </Link>
              
              {usuario?.papel === 'empresa' && (
                <Link href="/painel" className="text-[#F24487] hover:underline font-semibold">
                  Painel da Empresa
                </Link>
              )}

              <Link href="/vagas/nova" className="px-3.5 py-1.5 rounded-full bg-gradient-to-r from-[#F24487] to-[#7B4FD0] text-white font-semibold hover:shadow-lg hover:shadow-[#F24487]/20 transition-all text-xs sm:text-sm">
                + Publicar
              </Link>

              {usuario ? (
                <div className="flex items-center gap-3 pl-2 border-l border-white/10">
                  <div className="text-right hidden sm:block">
                    <p className="text-xs text-white font-bold leading-tight">{usuario.nome}</p>
                    <p className="text-[10px] text-[#A98CE0] font-mono capitalize">{usuario.papel}</p>
                  </div>
                  <form action={logoutAction}>
                    <button 
                      type="submit" 
                      className="text-xs text-[#8B84A0] hover:text-red-400 font-mono transition-colors"
                      title="Sair da conta"
                    >
                      Sair
                    </button>
                  </form>
                </div>
              ) : (
                <Link href="/entrar" className="text-white hover:underline text-xs sm:text-sm">
                  Entrar
                </Link>
              )}
            </nav>
          </div>
        </header>

        {/* Conteúdo Principal */}
        <main className="flex-1 max-w-6xl w-full mx-auto px-4 py-8">
          {children}
        </main>

        {/* Rodapé do Projeto */}
        <footer className="border-t border-white/10 bg-[#0B0913] py-8 text-center text-sm text-[#8B84A0]">
          <div className="max-w-6xl mx-auto px-4 flex flex-col sm:flex-row justify-between items-center gap-4">
            <p>© 2026 Leque de Vagas — Projeto desenvolvido na disciplina de Frontend Avançado.</p>
            <div className="flex gap-4">
              <Link href="/termos" className="hover:underline">Termos de Uso</Link>
              <Link href="/privacidade" className="hover:underline">Privacidade</Link>
            </div>
          </div>
        </footer>
      </body>
    </html>
  );
}
