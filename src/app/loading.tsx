export default function Loading() {
  return (
    <div className="flex h-[70vh] w-full flex-col items-center justify-center gap-6">
      <div className="relative flex items-center justify-center">
        {/* Outer glowing ring */}
        <div className="absolute inset-0 rounded-full border-t-2 border-[#C5A880] opacity-20 animate-spin" style={{ animationDuration: '3s' }} />
        {/* Inner pulsing logo */}
        <h2 className="text-4xl font-black tracking-tight text-black animate-pulse">
          JSM<span className="text-[#C5A880]">.</span>
        </h2>
      </div>
      <div className="w-48 h-1 bg-zinc-100 rounded-full overflow-hidden">
        <div className="h-full bg-[#C5A880] w-1/2 rounded-full" style={{
          transformOrigin: 'left',
          animation: 'shimmer 1.5s infinite alternate'
        }}>
          <style dangerouslySetInnerHTML={{__html: `
            @keyframes shimmer {
              0% { transform: translateX(-100%); }
              100% { transform: translateX(200%); }
            }
          `}} />
        </div>
      </div>
      <p className="text-zinc-400 text-xs font-bold tracking-widest uppercase">Loading</p>
    </div>
  );
}
