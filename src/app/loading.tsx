export default function Loading() {
  return (
    <div className="flex min-h-[60vh] w-full flex-col items-center justify-center bg-white" aria-busy="true" aria-live="polite">
      <div className="relative flex items-center justify-center">
        <div 
          className="w-10 h-10 rounded-full border-2 border-[#E7E5E0] border-t-[#0B3D2E] animate-spin" 
          style={{ animationDuration: '0.8s' }} 
        />
      </div>
      <span className="sr-only">Loading...</span>
    </div>
  );
}
