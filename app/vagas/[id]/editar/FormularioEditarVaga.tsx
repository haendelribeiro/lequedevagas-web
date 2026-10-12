'use client';

import { useActionState } from 'react';
import { useFormStatus } from 'react-dom';
import { editarVagaAction, ActionState } from '@/app/actions/vagas';
import { Vaga } from '@/data/vagas';

function BotaoSalvar() {
  const { pending } = useFormStatus();

  return (
    <button 
      type="submit" 
      disabled={pending}
      className="w-full py-3.5 rounded-xl bg-gradient-to-r from-[#F24487] to-[#7B4FD0] text-white font-bold text-sm hover:shadow-lg hover:shadow-[#F24487]/30 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
    >
      {pending ? (
        <>
          <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></span>
          <span>Salvando alterações via Server Action...</span>
        </>
      ) : (
        <span>💾 Salvar Alterações (Server Action + Zod)</span>
      )}
    </button>
  );
}

export default function FormularioEditarVaga({ vaga }: { vaga: Vaga }) {
  const actionComId = editarVagaAction.bind(null, vaga.id);
  const [state, formAction] = useActionState<ActionState | null, FormData>(
    actionComId,
    null
  );

  return (
    <form action={formAction} className="space-y-5">
      {state?.mensagemGeral && (
        <div className={`p-4 rounded-xl text-sm ${state.success ? 'bg-[#5fd08a]/10 text-[#5fd08a] border border-[#5fd08a]/30' : 'bg-red-500/10 text-red-400 border border-red-500/30'}`}>
          {state.mensagemGeral}
        </div>
      )}

      <div>
        <label className="block text-xs font-mono uppercase tracking-wider text-[#8B84A0] mb-1">
          Título da Vaga *
        </label>
        <input 
          type="text" 
          name="titulo"
          defaultValue={vaga.titulo}
          className="w-full bg-[#08070E] border border-white/10 rounded-xl px-3 py-2.5 text-sm text-white focus:outline-none focus:border-[#F24487]" 
        />
        {state?.errors?.titulo && (
          <p className="text-xs text-red-400 mt-1">{state.errors.titulo[0]}</p>
        )}
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-xs font-mono uppercase tracking-wider text-[#8B84A0] mb-1">
            Empresa *
          </label>
          <input 
            type="text" 
            name="empresa"
            defaultValue={vaga.empresa}
            className="w-full bg-[#08070E] border border-white/10 rounded-xl px-3 py-2.5 text-sm text-white focus:outline-none focus:border-[#F24487]" 
          />
          {state?.errors?.empresa && (
            <p className="text-xs text-red-400 mt-1">{state.errors.empresa[0]}</p>
          )}
        </div>

        <div>
          <label className="block text-xs font-mono uppercase tracking-wider text-[#8B84A0] mb-1">
            Slug da Empresa *
          </label>
          <input 
            type="text" 
            name="empresaSlug"
            defaultValue={vaga.empresaSlug}
            className="w-full bg-[#08070E] border border-white/10 rounded-xl px-3 py-2.5 text-sm text-white focus:outline-none focus:border-[#F24487]" 
          />
          {state?.errors?.empresaSlug && (
            <p className="text-xs text-red-400 mt-1">{state.errors.empresaSlug[0]}</p>
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div>
          <label className="block text-xs font-mono uppercase tracking-wider text-[#8B84A0] mb-1">
            Área *
          </label>
          <select name="area" defaultValue={vaga.area} className="w-full bg-[#08070E] border border-white/10 rounded-xl px-3 py-2.5 text-sm text-white focus:outline-none focus:border-[#F24487]">
            <option value="Front-end">Front-end</option>
            <option value="Back-end">Back-end</option>
            <option value="Dados">Dados</option>
            <option value="QA">QA</option>
            <option value="Design">Design</option>
          </select>
          {state?.errors?.area && (
            <p className="text-xs text-red-400 mt-1">{state.errors.area[0]}</p>
          )}
        </div>

        <div>
          <label className="block text-xs font-mono uppercase tracking-wider text-[#8B84A0] mb-1">
            Senioridade *
          </label>
          <select name="senioridade" defaultValue={vaga.senioridade} className="w-full bg-[#08070E] border border-white/10 rounded-xl px-3 py-2.5 text-sm text-white focus:outline-none focus:border-[#F24487]">
            <option value="Estágio">Estágio</option>
            <option value="Júnior">Júnior</option>
            <option value="Pleno">Pleno</option>
          </select>
          {state?.errors?.senioridade && (
            <p className="text-xs text-red-400 mt-1">{state.errors.senioridade[0]}</p>
          )}
        </div>

        <div>
          <label className="block text-xs font-mono uppercase tracking-wider text-[#8B84A0] mb-1">
            Localidade *
          </label>
          <input 
            type="text" 
            name="local"
            defaultValue={vaga.local}
            className="w-full bg-[#08070E] border border-white/10 rounded-xl px-3 py-2.5 text-sm text-white focus:outline-none focus:border-[#F24487]" 
          />
          {state?.errors?.local && (
            <p className="text-xs text-red-400 mt-1">{state.errors.local[0]}</p>
          )}
        </div>
      </div>

      <div className="pt-2">
        <label className="flex items-center gap-2 cursor-pointer">
          <input 
            type="checkbox" 
            name="aceitaIniciante" 
            defaultChecked={vaga.aceitaIniciante} 
            className="accent-[#F24487] w-4 h-4" 
          />
          <span className="text-sm text-white">Esta vaga aceita pessoas em transição de carreira / iniciantes</span>
        </label>
      </div>

      <div>
        <label className="block text-xs font-mono uppercase tracking-wider text-[#8B84A0] mb-1">
          Descrição Detalhada * (mínimo 20 caracteres)
        </label>
        <textarea 
          name="descricao"
          rows={5}
          defaultValue={vaga.descricao}
          className="w-full bg-[#08070E] border border-white/10 rounded-xl px-3 py-2.5 text-sm text-white focus:outline-none focus:border-[#F24487]"
        ></textarea>
        {state?.errors?.descricao && (
          <p className="text-xs text-red-400 mt-1">{state.errors.descricao[0]}</p>
        )}
      </div>

      <BotaoSalvar />
    </form>
  );
}
