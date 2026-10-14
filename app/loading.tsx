export default function Loading() {
  return (
    <div className="space-y-8 animate-pulse">
      {/* Header Skeleton */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 border-b border-white/10 pb-6">
        <div className="space-y-2">
          <div className="h-8 w-48 bg-white/10 rounded-xl"></div>
          <div className="h-4 w-72 bg-white/5 rounded-lg"></div>
        </div>
        <div className="h-10 w-36 bg-white/10 rounded-full"></div>
      </div>

      {/* Filtros Skeleton */}
      <div className="bg-[#1B1632] border border-white/10 p-4 rounded-2xl grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="h-10 bg-white/5 rounded-xl"></div>
        <div className="h-10 bg-white/5 rounded-xl"></div>
        <div className="h-10 bg-white/5 rounded-xl"></div>
        <div className="h-10 bg-white/5 rounded-xl"></div>
      </div>

      {/* Grid de Cards Skeleton */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {[1, 2, 3, 4, 5, 6].map((i) => (
          <div 
            key={i} 
            className="bg-[#1B1632] border border-white/10 p-5 rounded-2xl space-y-4"
          >
            <div className="flex justify-between items-center">
              <div className="h-4 w-24 bg-white/10 rounded-lg"></div>
              <div className="h-5 w-28 bg-[#5fd08a]/10 rounded-full"></div>
            </div>
            <div className="h-6 w-3/4 bg-white/15 rounded-lg"></div>
            <div className="h-3 w-1/2 bg-white/10 rounded-lg"></div>
            <div className="space-y-1.5 pt-2">
              <div className="h-3 w-full bg-white/5 rounded"></div>
              <div className="h-3 w-4/5 bg-white/5 rounded"></div>
            </div>
            <div className="pt-3 border-t border-white/5 flex justify-between items-center">
              <div className="h-3 w-28 bg-white/5 rounded"></div>
              <div className="h-4 w-20 bg-white/10 rounded-lg"></div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
