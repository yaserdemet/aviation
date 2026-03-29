import { Plane } from "lucide-react";

export default function LoadingPage() {
  return (
    <div className="fixed inset-0 flex flex-col items-center justify-center bg-background/80 backdrop-blur-sm z-50">
      <div className="relative flex items-center justify-center">
        {/* Radar dalgaları animasyonu */}
        <div className="absolute w-24 h-24 border border-primary/30 rounded-full animate-ping" />
        <div className="absolute w-32 h-32 border border-primary/10 rounded-full animate-ping [animation-delay:0.5s]" />
        
        {/* Dönen radar çemberi */}
        <div className="w-20 h-20 rounded-full border-2 border-primary/20 flex items-center justify-center">
            <div className="absolute w-full h-full rounded-full border-t-2 border-primary animate-spin" />
            <Plane className="w-8 h-8 text-primary animate-pulse" />
        </div>
      </div>
      
      {/* Yazı ve ilerleme çubuğu */}
      <div className="mt-8 flex flex-col items-center gap-3">
        <h2 className="text-xl font-medium tracking-tight text-foreground/80">
          Hava Trafiği Yükleniyor...
        </h2>
        <div className="w-48 h-1 bg-muted rounded-full overflow-hidden">
          <div className="w-1/2 h-full bg-primary animate-[loading_1.5s_ease-in-out_infinite]" />
        </div>
        <p className="text-xs text-muted-foreground uppercase tracking-widest font-semibold">
          Radar Merkezi
        </p>
      </div>

      <style dangerouslySetInnerHTML={{ __html: `
        @keyframes loading {
          0% { transform: translateX(-100%); width: 30%; }
          50% { transform: translateX(100%); width: 60%; }
          100% { transform: translateX(200%); width: 30%; }
        }
      `}} />
    </div>
  );
}
