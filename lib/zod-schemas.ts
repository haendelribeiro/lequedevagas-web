import { z } from 'zod';

export const novaVagaSchema = z.object({
  titulo: z.string().min(5, { message: "O título deve ter pelo menos 5 caracteres." }),
  empresa: z.string().min(2, { message: "O nome da empresa é obrigatório." }),
  empresaSlug: z.string().min(2, { message: "O slug da empresa é obrigatório." }),
  area: z.enum(['Front-end', 'Back-end', 'Dados', 'QA', 'Design'], {
    errorMap: () => ({ message: "Selecione uma área válida." })
  }),
  senioridade: z.enum(['Estágio', 'Júnior', 'Pleno'], {
    errorMap: () => ({ message: "Selecione uma senioridade válida." })
  }),
  local: z.string().min(3, { message: "Informe a localização ou Remoto." }),
  aceitaIniciante: z.boolean().default(true),
  descricao: z.string().min(20, { message: "A descrição precisa ter no mínimo 20 caracteres detalhando a vaga." })
});

export const candidaturaSchema = z.object({
  nome: z.string().min(3, { message: "Informe seu nome completo." }),
  email: z.string().email({ message: "Digite um e-mail válido." }),
  linkedin: z.string().url({ message: "Insira uma URL válida do seu LinkedIn ou Portfólio." }),
  apresentacao: z.string().min(15, { message: "Sua mensagem de apresentação deve ter pelo menos 15 caracteres." })
});

export const loginSchema = z.object({
  email: z.string().email({ message: "E-mail inválido." }),
  senha: z.string().min(6, { message: "A senha deve ter no mínimo 6 caracteres." }),
  papel: z.enum(['candidata', 'empresa']).default('candidata')
});
