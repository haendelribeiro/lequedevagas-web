'use client';

import { useActionState } from 'react';
import { useFormStatus } from 'react-dom';
import { enviarCandidaturaAction, CandidaturaActionState } from '@/app/actions/candidaturas';

function BotaoEnviar() {
  const { pending } = useFormStatus();

  return (
    <button 
      type="submit" 
      disabled={pending}
      className="w-full py-3 rounded-xl bg-gradient-to-r from-[#F24487] to-[#7B4FD0] text-white font-bold text-sm hover:shadow-lg hover:shadow-[#F24487]/30 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
    >
      {pending ? (
        <>
          <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></span>
          <span>Enviando candidatura...</span>
        </>
      ) : (
        <span>Enviar Candidatura</span>
      )}
    </button>
  );
}

export default function FormularioCandidatura({ vagaId }: { vagaId: string }) {
  const actionComId = enviarCandidaturaAction.bind(null, vagaId);
  const [state, formAction] = useActionState<CandidaturaActionState | null, FormData>(
    actionComId,
    null
  );

  if (state?.success) {
    return (
      <div className="bg-[#5fd08a]/10 border border-[#5fd08a]/30 p-5 rounded-2xl text-center space-y-2">
        <div className="text-3xl">🎉</div>
        <h3 className="text-white font-bold text-sm">Candidatura Registrada!</h3>
        <p className="text-xs text-[#5fd08a] leading-relaxed">
          {state.mensagemGeral}
        </p>
      </div>
    );
  }

  return (
    <form action={formAction} className="space-y-4">
      {state?.mensagemGeral && (
        <div className="p-3 rounded-xl text-xs bg-red-500/10 text-red-400 border border-red-500/30">
          {state.mensagemGeral}
        </div>
      )}

      <div>
        <label className="block text-xs font-mono uppercase tracking-wider text-[#8B84A0] mb-1">
          Nome Completo *
        </label>
        <input 
          type="text" 
          name="nome"
          placeholder="Seu nome"
          className="w-full bg-[#08070E] border border-white/10 rounded-xl px-3 py-2 text-sm text-white focus:outline-none focus:border-[#F24487]" 
        />
        {state?.errors?.nome && (
          <p className="text-xs text-red-400 mt-1">{state.errors.nome[0]}</p>
        )}
      </div>

      <div>
        <label className="block text-xs font-mono uppercase tracking-wider text-[#8B84A0] mb-1">
          E-mail *
        </label>
        <input 
          type="email" 
          name="email"
          placeholder="seu@email.com"
          className="w-full bg-[#08070E] border border-white/10 rounded-xl px-3 py-2 text-sm text-white focus:outline-none focus:border-[#F24487]" 
        />
        {state?.errors?.email && (
          <p className="text-xs text-red-400 mt-1">{state.errors.email[0]}</p>
        )}
      </div>

      <div>
        <label className="block text-xs font-mono uppercase tracking-wider text-[#8B84A0] mb-1">
          LinkedIn / Portfólio (URL válida) *
        </label>
        <input 
          type="url" 
          name="linkedin"
          placeholder="https://linkedin.com/in/seu-perfil"
          className="w-full bg-[#08070E] border border-white/10 rounded-xl px-3 py-2 text-sm text-white focus:outline-none focus:border-[#F24487]" 
        />
        {state?.errors?.linkedin && (
          <p className="text-xs text-red-400 mt-1">{state.errors.linkedin[0]}</p>
        )}
      </div>

      <div>
        <label className="block text-xs font-mono uppercase tracking-wider text-[#8B84A0] mb-1">
          Apresentação * (mínimo 15 caracteres)
        </label>
        <textarea 
          name="apresentacao"
          rows={3}
          placeholder="Conte brevemente sobre seus estudos, cursos ou projetos..."
          className="w-full bg-[#08070E] border border-white/10 rounded-xl px-3 py-2 text-sm text-white focus:outline-none focus:border-[#F24487]"
        ></textarea>
        {state?.errors?.apresentacao && (
          <p className="text-xs text-red-400 mt-1">{state.errors.apresentacao[0]}</p>
        )}
      </div>

      <BotaoEnviar />
    </form>
  );
}
