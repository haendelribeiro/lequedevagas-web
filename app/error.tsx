'use client';

import { useEffect } from 'react';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="flex flex-col items-center justify-center py-20 text-center space-y-4">
      <div className="text-5xl">⚠️</div>
      <h2 className="text-2xl font-bold text-white">Ops! Algo deu errado ao carregar esta página.</h2>
      <p className="text-sm text-[#B4AEC6] max-w-md">Não se preocupe, nosso sistema já registrou a ocorrência.</p>
      <button
        onClick={() => reset()}
        className="px-6 py-2.5 rounded-full bg-[#F24487] text-white font-semibold text-sm hover:bg-[#E73982] transition-colors"
      >
        Tentar novamente
      </button>
    </div>
  );
}
