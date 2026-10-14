import test from 'node:test';
import assert from 'node:assert/strict';
import { podePublicarVaga, podeEditarVaga, podeSeCandidatar } from '../lib/permissoes.ts';
import type { UsuarioSessao } from '../lib/permissoes.ts';
import { novaVagaSchema, candidaturaSchema, loginSchema } from '../lib/zod-schemas.ts';

test('RBAC - Permissões de Usuário', async (t) => {
  await t.test('Visitante não pode publicar vagas', () => {
    assert.equal(podePublicarVaga(null), false);
    assert.equal(podePublicarVaga(undefined), false);
  });

  await t.test('Candidata não pode publicar vagas', () => {
    const candidata: UsuarioSessao = {
      id: '1',
      nome: 'Maria',
      email: 'maria@email.com',
      papel: 'candidata'
    };
    assert.equal(podePublicarVaga(candidata), false);
  });

  await t.test('Empresa pode publicar vagas', () => {
    const empresa: UsuarioSessao = {
      id: '2',
      nome: 'Aurora Tech',
      email: 'recrutamento@aurora.com',
      papel: 'empresa',
      empresaSlug: 'aurora-tech'
    };
    assert.equal(podePublicarVaga(empresa), true);
  });

  await t.test('Empresa só pode editar vagas do seu próprio slug', () => {
    const empresa: UsuarioSessao = {
      id: '2',
      nome: 'Aurora Tech',
      email: 'recrutamento@aurora.com',
      papel: 'empresa',
      empresaSlug: 'aurora-tech'
    };
    assert.equal(podeEditarVaga('aurora-tech', empresa), true);
    assert.equal(podeEditarVaga('apex-sistemas', empresa), false);
  });

  await t.test('Candidata pode enviar candidatura', () => {
    const candidata: UsuarioSessao = {
      id: '1',
      nome: 'Maria',
      email: 'maria@email.com',
      papel: 'candidata'
    };
    assert.equal(podeSeCandidatar(candidata), true);
    assert.equal(podeSeCandidatar(null), true); // Visitantes também
  });
});

test('Validações de Schemas com Zod', async (t) => {
  await t.test('novaVagaSchema rejeita título curto ou área inválida', () => {
    const vagaInvalida = {
      titulo: 'Dev',
      empresa: 'Tech',
      empresaSlug: 'tech',
      area: 'Invalida',
      senioridade: 'Júnior',
      local: 'Remoto',
      aceitaIniciante: true,
      descricao: 'Curta'
    };

    const resultado = novaVagaSchema.safeParse(vagaInvalida);
    assert.equal(resultado.success, false);
  });

  await t.test('novaVagaSchema aceita dados válidos', () => {
    const vagaValida = {
      titulo: 'Desenvolvedor Frontend Júnior',
      empresa: 'Aurora Tech',
      empresaSlug: 'aurora-tech',
      area: 'Front-end',
      senioridade: 'Júnior',
      local: 'Remoto',
      aceitaIniciante: true,
      descricao: 'Vaga focada em Next.js e TypeScript com mentoria contínua para iniciantes.'
    };

    const resultado = novaVagaSchema.safeParse(vagaValida);
    assert.equal(resultado.success, true);
  });

  await t.test('candidaturaSchema valida email e URL de LinkedIn', () => {
    const dadosInvalidos = {
      nome: 'Al',
      email: 'email-invalido',
      linkedin: 'nao-e-url',
      apresentacao: 'Oi'
    };
    const resInvalido = candidaturaSchema.safeParse(dadosInvalidos);
    assert.equal(resInvalido.success, false);

    const dadosValidos = {
      nome: 'Alexandre Souza',
      email: 'alexandre@email.com',
      linkedin: 'https://linkedin.com/in/alexandresouza',
      apresentacao: 'Tenho muita vontade de aprender e construir produtos inovadores.'
    };
    const resValido = candidaturaSchema.safeParse(dadosValidos);
    assert.equal(resValido.success, true);
  });

  await t.test('loginSchema valida email e senha mínima de 6 caracteres', () => {
    const res = loginSchema.safeParse({ email: 'teste@email.com', senha: '123456', papel: 'candidata' });
    assert.equal(res.success, true);

    const resCurto = loginSchema.safeParse({ email: 'teste@email.com', senha: '123', papel: 'candidata' });
    assert.equal(resCurto.success, false);
  });
});
