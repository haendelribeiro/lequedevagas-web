export const metadata = {
  title: 'Termos de Uso · Leque de Vagas',
};

export default function TermosPage() {
  return (
    <div className="max-w-3xl mx-auto bg-[#1B1632] border border-white/10 p-8 rounded-3xl space-y-4">
      <h1 className="text-2xl font-bold text-white border-b border-white/10 pb-3">Termos de Uso</h1>
      <p className="text-sm text-[#B4AEC6] leading-relaxed">
        Bem-vindo ao Leque de Vagas. Ao utilizar nossa plataforma, você concorda que as oportunidades divulgadas visam facilitar o acesso de profissionais em transição de carreira ao mercado de trabalho em tecnologia.
      </p>
      <p className="text-sm text-[#B4AEC6] leading-relaxed">
        Todas as vagas cadastradas passam por moderação prévia para assegurar que não haja requisitos incompatíveis com o nível de entrada (Júnior/Estágio).
      </p>
    </div>
  );
}
