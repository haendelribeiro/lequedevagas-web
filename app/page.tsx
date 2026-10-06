import Link from 'next/link';

export default function HomePage() {
  return (
    <div className="flex flex-col items-center text-center py-12 md:py-20 gap-8">
      <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-[#F24487]/30 bg-[#F24487]/10 text-[#E88BB8] text-sm font-medium">
        <span>✨ Projeto da Turma 2026.2</span>
        <span>•</span>
        <span>NickDev / Um Leque de Tecnologia</span>
      </div>

      <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight max-w-3xl leading-tight">
        Vagas de tecnologia de entrada <span className="bg-gradient-to-r from-[#F24487] via-[#E73982] to-[#7B4FD0] bg-clip-text text-transparent">sem requisitos absurdos</span>
      </h1>

      <p className="text-lg md:text-xl text-[#B4AEC6] max-w-2xl leading-relaxed">
        Chega de procurar vaga de "Júnior" que exige 3 anos de experiência. O Leque de Vagas filtra apenas as oportunidades reais para quem está migrando de carreira.
      </p>

      <div className="flex flex-wrap gap-4 justify-center">
        <Link 
          href="/vagas" 
          className="px-8 py-3.5 rounded-full bg-gradient-to-r from-[#F24487] to-[#7B4FD0] text-white font-bold text-lg hover:shadow-xl hover:shadow-[#F24487]/30 hover:-translate-y-0.5 transition-all"
        >
          🔍 Explorar Mural de Vagas
        </Link>
        <Link 
          href="/vagas/nova" 
          className="px-8 py-3.5 rounded-full border border-white/20 bg-white/5 text-white font-semibold text-lg hover:bg-white/10 transition-all"
        >
          📢 Sou Empresa / Publicar
        </Link>
      </div>

      {/* Destaques de Funcionalidades */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full max-w-4xl mt-12 text-left">
        <div className="p-6 rounded-2xl bg-[#1B1632] border border-white/10">
          <div className="text-3xl mb-3">🎯</div>
          <h3 className="text-lg font-bold text-white mb-2">Filtro Aceita Iniciante</h3>
          <p className="text-sm text-[#B4AEC6]">Veja com um clique apenas as empresas receptivas a pessoas em transição de carreira.</p>
        </div>
        <div className="p-6 rounded-2xl bg-[#1B1632] border border-white/10">
          <div className="text-3xl mb-3">⚡</div>
          <h3 className="text-lg font-bold text-white mb-2">Busca Instantânea</h3>
          <p className="text-sm text-[#B4AEC6]">Filtros sincronizados na URL via Server Components e searchParams sem recarregar a tela.</p>
        </div>
        <div className="p-6 rounded-2xl bg-[#1B1632] border border-white/10">
          <div className="text-3xl mb-3">🛡️</div>
          <h3 className="text-lg font-bold text-white mb-2">Empresas Verificadas</h3>
          <p className="text-sm text-[#B4AEC6]">Saiba exatamente o perfil da empresa recrutadora antes de enviar a sua candidatura.</p>
        </div>
      </div>
    </div>
  );
}
