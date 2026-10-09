import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center py-20 text-center space-y-4">
      <div className="text-6xl">404</div>
      <h2 className="text-2xl font-bold text-white">Página ou Vaga não encontrada</h2>
      <p className="text-sm text-[#B4AEC6]">A vaga pode ter sido preenchida ou o endereço inserido está incorreto.</p>
      <Link 
        href="/vagas"
        className="px-6 py-2.5 rounded-full bg-gradient-to-r from-[#F24487] to-[#7B4FD0] text-white font-semibold text-sm hover:opacity-90 transition-opacity"
      >
        Voltar para o Mural de Vagas
      </Link>
    </div>
  );
}
