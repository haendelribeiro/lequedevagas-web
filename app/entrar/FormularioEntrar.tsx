'use client';

import { useActionState, useTransition } from 'react';
import { useFormStatus } from 'react-dom';
import { loginAction, loginRapidoAction, AuthActionState } from '@/app/actions/auth';

function BotaoEntrar() {
  const { pending } = useFormStatus();

  return (
    <button 
      type="submit" 
      disabled={pending}
      className="w-full py-3 rounded-xl bg-gradient-to-r from-[#F24487] to-[#7B4FD0] text-white font-bold text-sm hover:shadow-lg hover:shadow-[#F24487]/30 transition-all disabled:opacity-50 flex items-center justify-center gap-2"
    >
      {pending ? (
        <>
          <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></span>
          <span>Autenticando...</span>
        </>
      ) : (
        <span>Entrar no Sistema</span>
      )}
    </button>
  );
}

export default function FormularioEntrar() {
  const [state, formAction] = useActionState<AuthActionState | null, FormData>(
    loginAction,
    null
  );
  const [isPending, startTransition] = useTransition();

  return (
    <div className="space-y-6">
      {/* Botões de Acesso Rápido para Avaliação do Professor */}
      <div className="p-4 rounded-2xl bg-[#08070E] border border-white/10 space-y-3 text-left">
        <p className="text-xs font-mono text-[#8B84A0] uppercase tracking-wider">
          ⚡ Acesso Rápido para Testes (RBAC)
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
          <button
            type="button"
            disabled={isPending}
            onClick={() => startTransition(() => loginRapidoAction('candidata'))}
            className="px-3 py-2 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-xs font-semibold text-white flex items-center justify-center gap-2 transition-all disabled:opacity-50"
          >
            <span>👩‍💻</span>
            <span>Entrar como Candidata</span>
          </button>
          <button
            type="button"
            disabled={isPending}
            onClick={() => startTransition(() => loginRapidoAction('empresa'))}
            className="px-3 py-2 rounded-xl bg-[#F24487]/10 hover:bg-[#F24487]/20 border border-[#F24487]/30 text-xs font-semibold text-[#F24487] flex items-center justify-center gap-2 transition-all disabled:opacity-50"
          >
            <span>🏢</span>
            <span>Entrar como Empresa</span>
          </button>
        </div>
      </div>

      <div className="flex items-center gap-3">
        <div className="flex-1 h-px bg-white/10"></div>
        <span className="text-xs font-mono text-[#8B84A0]">ou com credenciais</span>
        <div className="flex-1 h-px bg-white/10"></div>
      </div>

      <form action={formAction} className="space-y-4 text-left">
        {state?.mensagemGeral && (
          <div className="p-3 rounded-xl text-xs bg-red-500/10 text-red-400 border border-red-500/30">
            {state.mensagemGeral}
          </div>
        )}

        <div>
          <label className="block text-xs font-mono uppercase tracking-wider text-[#8B84A0] mb-1">E-mail</label>
          <input 
            type="email" 
            name="email"
            placeholder="seu@email.com"
            className="w-full bg-[#08070E] border border-white/10 rounded-xl px-3 py-2.5 text-sm text-white focus:outline-none focus:border-[#F24487]" 
          />
          {state?.errors?.email && (
            <p className="text-xs text-red-400 mt-1">{state.errors.email[0]}</p>
          )}
        </div>

        <div>
          <label className="block text-xs font-mono uppercase tracking-wider text-[#8B84A0] mb-1">Senha</label>
          <input 
            type="password" 
            name="senha"
            placeholder="••••••••"
            className="w-full bg-[#08070E] border border-white/10 rounded-xl px-3 py-2.5 text-sm text-white focus:outline-none focus:border-[#F24487]" 
          />
          {state?.errors?.senha && (
            <p className="text-xs text-red-400 mt-1">{state.errors.senha[0]}</p>
          )}
        </div>

        <div>
          <label className="block text-xs font-mono uppercase tracking-wider text-[#8B84A0] mb-1">Tipo de Perfil</label>
          <select 
            name="papel"
            className="w-full bg-[#08070E] border border-white/10 rounded-xl px-3 py-2.5 text-sm text-white focus:outline-none focus:border-[#F24487]"
          >
            <option value="candidata">Pessoa Candidata (Buscando Vagas)</option>
            <option value="empresa">Empresa Recrutadora (Aurora Tech)</option>
          </select>
        </div>

        <BotaoEntrar />
      </form>
    </div>
  );
}
