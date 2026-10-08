export type PapelUsuario = 'candidata' | 'empresa' | 'visitante';

export type UsuarioSessao = {
  id: string;
  nome: string;
  email: string;
  papel: PapelUsuario;
  empresaSlug?: string;
};

export function podePublicarVaga(usuario?: UsuarioSessao | null): boolean {
  if (!usuario) return false;
  return usuario.papel === 'empresa';
}

export function podeEditarVaga(vagaEmpresaSlug: string, usuario?: UsuarioSessao | null): boolean {
  if (!usuario) return false;
  if (usuario.papel !== 'empresa') return false;
  return usuario.empresaSlug === vagaEmpresaSlug;
}

export function podeSeCandidatar(usuario?: UsuarioSessao | null): boolean {
  if (!usuario) return true; // Visitantes podem ver o formulário
  return usuario.papel === 'candidata';
}
