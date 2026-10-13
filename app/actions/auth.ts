'use server';

import { loginSchema } from '@/lib/zod-schemas';
import { gravarSessao, encerrarSessao } from '@/lib/auth-session';
import { UsuarioSessao } from '@/lib/permissoes';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';

export type AuthActionState = {
  success?: boolean;
  errors?: Record<string, string[]>;
  mensagemGeral?: string;
};

export async function loginAction(
  _prevState: AuthActionState | null,
  formData: FormData
): Promise<AuthActionState> {
  const email = formData.get('email') as string;
  const senha = formData.get('senha') as string;
  const papel = (formData.get('papel') as 'candidata' | 'empresa') || 'candidata';

  const validacao = loginSchema.safeParse({ email, senha, papel });

  if (!validacao.success) {
    return {
      success: false,
      errors: validacao.error.flatten().fieldErrors,
      mensagemGeral: 'Preencha as credenciais corretamente.'
    };
  }

  // Gera a sessão de acordo com o papel escolhido
  const usuario: UsuarioSessao = {
    id: `usr-${Date.now().toString().slice(-4)}`,
    nome: papel === 'empresa' ? 'Aurora Tech (Recrutamento)' : email.split('@')[0],
    email: validacao.data.email,
    papel: validacao.data.papel,
    empresaSlug: papel === 'empresa' ? 'aurora-tech' : undefined,
  };

  await gravarSessao(usuario);
  revalidatePath('/', 'layout');

  if (papel === 'empresa') {
    redirect('/painel');
  } else {
    redirect('/vagas');
  }
}

export async function loginRapidoAction(tipo: 'candidata' | 'empresa'): Promise<void> {
  const usuario: UsuarioSessao = tipo === 'empresa'
    ? {
        id: 'usr-aurora',
        nome: 'Aurora Tech RH',
        email: 'recrutamento@auroratech.com',
        papel: 'empresa',
        empresaSlug: 'aurora-tech'
      }
    : {
        id: 'usr-candidata',
        nome: 'Maria Silva (Dev Jr)',
        email: 'maria.silva@email.com',
        papel: 'candidata'
      };

  await gravarSessao(usuario);
  revalidatePath('/', 'layout');

  if (tipo === 'empresa') {
    redirect('/painel');
  } else {
    redirect('/vagas');
  }
}

export async function logoutAction(): Promise<void> {
  await encerrarSessao();
  revalidatePath('/', 'layout');
  redirect('/');
}
