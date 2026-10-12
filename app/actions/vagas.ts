'use server';

import { novaVagaSchema } from '@/lib/zod-schemas';
import { adicionarVaga, atualizarVaga, buscarVagaPorId, removerVaga } from '@/data/vagas';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { obterSessaoAtual } from '@/lib/auth-session';
import { podeEditarVaga, podePublicarVaga } from '@/lib/permissoes';

export type ActionState = {
  success?: boolean;
  errors?: Record<string, string[]>;
  mensagemGeral?: string;
  vagaId?: string;
};

export async function publicarVagaAction(
  _prevState: ActionState | null,
  formData: FormData
): Promise<ActionState> {
  const usuario = await obterSessaoAtual();

  // Verificação de permissão RBAC (se houver sessão)
  if (usuario && !podePublicarVaga(usuario)) {
    return {
      success: false,
      mensagemGeral: 'Apenas contas do tipo Empresa têm permissão para publicar vagas.'
    };
  }

  const rawData = {
    titulo: formData.get('titulo') as string,
    empresa: formData.get('empresa') as string,
    empresaSlug: formData.get('empresaSlug') as string,
    area: formData.get('area') as string,
    senioridade: formData.get('senioridade') as string,
    local: formData.get('local') as string,
    aceitaIniciante: formData.get('aceitaIniciante') === 'on',
    descricao: formData.get('descricao') as string,
  };

  const validacao = novaVagaSchema.safeParse(rawData);

  if (!validacao.success) {
    return {
      success: false,
      errors: validacao.error.flatten().fieldErrors,
      mensagemGeral: 'Por favor, corrija os erros nos campos indicados.'
    };
  }

  const novaVaga = adicionarVaga({
    titulo: validacao.data.titulo,
    empresa: validacao.data.empresa,
    empresaSlug: validacao.data.empresaSlug,
    area: validacao.data.area,
    senioridade: validacao.data.senioridade,
    local: validacao.data.local,
    aceitaIniciante: validacao.data.aceitaIniciante,
    descricao: validacao.data.descricao,
  });

  revalidatePath('/vagas');
  revalidatePath(`/empresas/${novaVaga.empresaSlug}`);
  revalidatePath('/painel');

  redirect(`/vagas/${novaVaga.id}`);
}

export async function editarVagaAction(
  vagaId: string,
  _prevState: ActionState | null,
  formData: FormData
): Promise<ActionState> {
  const vagaExistente = buscarVagaPorId(vagaId);
  if (!vagaExistente) {
    return {
      success: false,
      mensagemGeral: 'Vaga não encontrada para edição.'
    };
  }

  const usuario = await obterSessaoAtual();
  if (usuario && !podeEditarVaga(vagaExistente.empresaSlug, usuario)) {
    return {
      success: false,
      mensagemGeral: 'Você não tem permissão para editar as vagas desta empresa.'
    };
  }

  const rawData = {
    titulo: formData.get('titulo') as string,
    empresa: formData.get('empresa') as string,
    empresaSlug: formData.get('empresaSlug') as string,
    area: formData.get('area') as string,
    senioridade: formData.get('senioridade') as string,
    local: formData.get('local') as string,
    aceitaIniciante: formData.get('aceitaIniciante') === 'on',
    descricao: formData.get('descricao') as string,
  };

  const validacao = novaVagaSchema.safeParse(rawData);

  if (!validacao.success) {
    return {
      success: false,
      errors: validacao.error.flatten().fieldErrors,
      mensagemGeral: 'Por favor, corrija os erros nos campos indicados.'
    };
  }

  atualizarVaga(vagaId, {
    titulo: validacao.data.titulo,
    empresa: validacao.data.empresa,
    empresaSlug: validacao.data.empresaSlug,
    area: validacao.data.area,
    senioridade: validacao.data.senioridade,
    local: validacao.data.local,
    aceitaIniciante: validacao.data.aceitaIniciante,
    descricao: validacao.data.descricao,
  });

  revalidatePath('/vagas');
  revalidatePath(`/vagas/${vagaId}`);
  revalidatePath(`/empresas/${validacao.data.empresaSlug}`);
  revalidatePath('/painel');

  redirect(`/vagas/${vagaId}`);
}

export async function deletarVagaAction(vagaId: string): Promise<ActionState> {
  const vagaExistente = buscarVagaPorId(vagaId);
  if (!vagaExistente) {
    return {
      success: false,
      mensagemGeral: 'Vaga não encontrada.'
    };
  }

  const usuario = await obterSessaoAtual();
  if (usuario && !podeEditarVaga(vagaExistente.empresaSlug, usuario)) {
    return {
      success: false,
      mensagemGeral: 'Você não tem permissão para excluir vagas desta empresa.'
    };
  }

  removerVaga(vagaId);

  revalidatePath('/vagas');
  revalidatePath('/painel');
  revalidatePath(`/empresas/${vagaExistente.empresaSlug}`);

  return {
    success: true,
    mensagemGeral: `A vaga "${vagaExistente.titulo}" foi encerrada e removida com sucesso.`
  };
}
