import { cookies } from 'next/headers';
import { UsuarioSessao } from '@/lib/permissoes';

const SESSION_COOKIE_NAME = 'leque_session';

export async function obterSessaoAtual(): Promise<UsuarioSessao | null> {
  const cookieStore = await cookies();
  const sessionCookie = cookieStore.get(SESSION_COOKIE_NAME);

  if (!sessionCookie?.value) {
    return null;
  }

  try {
    const dados = JSON.parse(sessionCookie.value) as UsuarioSessao;
    return dados;
  } catch {
    return null;
  }
}

export async function gravarSessao(usuario: UsuarioSessao): Promise<void> {
  const cookieStore = await cookies();
  cookieStore.set(SESSION_COOKIE_NAME, JSON.stringify(usuario), {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    path: '/',
    maxAge: 60 * 60 * 24 * 7 // 7 dias
  });
}

export async function encerrarSessao(): Promise<void> {
  const cookieStore = await cookies();
  cookieStore.delete(SESSION_COOKIE_NAME);
}
