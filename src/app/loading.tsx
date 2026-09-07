export default function Loading() {
  return (
    <div className="flex h-[70vh] w-full flex-col items-center justify-center gap-5 bg-white text-[#1d1d1f]">
      <div className="relative flex items-center justify-center">
        {/* Subtle Apple Spinner Ring */}
        <div 
          className="absolute -inset-3 rounded-full border-2 border-black/[0.06] border-t-[#0071e3] animate-spin" 
          style={{ animationDuration: '1.2s' }} 
        />
        {/* Authentic JSM Logo */}
        <div className="relative w-14 h-14 rounded-full overflow-hidden shadow-sm flex items-center justify-center bg-white p-1">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/images/jsm_logo_transparent.png"
            alt="JSM Logo"
            className="w-full h-full object-contain"
          />
        </div>
      </div>
      
      {/* Precision Apple Progress Bar */}
      <div className="w-40 h-1 bg-black/[0.06] rounded-full overflow-hidden mt-2">
        <div 
          className="h-full bg-[#0071e3] w-1/2 rounded-full" 
          style={{
            transformOrigin: 'left',
            animation: 'shimmer 1.4s infinite ease-in-out'
          }}
        >
          <style dangerouslySetInnerHTML={{__html: `
            @keyframes shimmer {
              0% { transform: translateX(-100%); }
              100% { transform: translateX(200%); }
            }
          `}} />
        </div>
      </div>

      <div className="text-center space-y-0.5">
        <span className="text-[11px] font-semibold tracking-wider text-[#1d1d1f] uppercase block font-mono">
          JSM INTEGRATED SERVICES
        </span>
        <span className="text-[10px] text-[#86868b] font-mono">
          Loading operations environment...
        </span>
      </div>
    </div>
  );
}
