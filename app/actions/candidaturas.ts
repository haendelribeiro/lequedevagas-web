'use server';

import { candidaturaSchema } from '@/lib/zod-schemas';
import { adicionarCandidatura } from '@/data/candidaturas';
import { revalidatePath } from 'next/cache';
import { obterSessaoAtual } from '@/lib/auth-session';
import { podeSeCandidatar } from '@/lib/permissoes';

export type CandidaturaActionState = {
  success?: boolean;
  errors?: Record<string, string[]>;
  mensagemGeral?: string;
};

export async function enviarCandidaturaAction(
  vagaId: string,
  _prevState: CandidaturaActionState | null,
  formData: FormData
): Promise<CandidaturaActionState> {
  const usuario = await obterSessaoAtual();

  if (usuario && !podeSeCandidatar(usuario)) {
    return {
      success: false,
      mensagemGeral: 'Contas empresariais não podem enviar candidaturas.'
    };
  }

  const rawData = {
    nome: formData.get('nome') as string,
    email: formData.get('email') as string,
    linkedin: formData.get('linkedin') as string,
    apresentacao: formData.get('apresentacao') as string,
  };

  const validacao = candidaturaSchema.safeParse(rawData);

  if (!validacao.success) {
    return {
      success: false,
      errors: validacao.error.flatten().fieldErrors,
      mensagemGeral: 'Verifique os dados informados no formulário.'
    };
  }

  adicionarCandidatura({
    vagaId,
    nome: validacao.data.nome,
    email: validacao.data.email,
    linkedin: validacao.data.linkedin,
    apresentacao: validacao.data.apresentacao,
  });

  revalidatePath(`/vagas/${vagaId}`);
  revalidatePath('/painel');

  return {
    success: true,
    mensagemGeral: '🎉 Sua candidatura foi enviada com sucesso! A empresa entrará em contato em breve.'
  };
}
