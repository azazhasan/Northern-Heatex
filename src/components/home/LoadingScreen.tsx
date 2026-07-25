import React, { useEffect, useState } from "react";
import { CompanyLogo } from "../common/CompanyLogo";
import { ShieldCheck, Zap } from "lucide-react";

interface LoadingScreenProps {
  onLoadingComplete: () => void;
}

export const LoadingScreen: React.FC<LoadingScreenProps> = ({ onLoadingComplete }) => {
  const [progress, setProgress] = useState<number>(0);
  const [statusText, setStatusText] = useState<string>("Initializing Indian GST & Thermal Physics Engine...");

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setTimeout(() => {
            onLoadingComplete();
          }, 300);
          return 100;
        }

        if (prev === 25) setStatusText("Loading 3D TEMA Heat Exchanger CAD Engine...");
        if (prev === 55) setStatusText("Loading HSN Code Database & GST Tax Suite...");
        if (prev === 85) setStatusText("Readying Northern HeatEx Enterprise Platform...");

        return prev + 3;
      });
    }, 30);

    return () => clearInterval(interval);
  }, [onLoadingComplete]);

  return (
    <div className="fixed inset-0 z-[100] bg-gradient-to-br from-slate-900 via-[#003366] to-[#0056A6] text-white flex flex-col items-center justify-center p-4">
      <div className="relative z-10 flex flex-col items-center text-center max-w-xl space-y-6">
        <div className="bg-white/10 backdrop-blur-md p-6 rounded-2xl border border-white/20 shadow-2xl">
          <CompanyLogo variant="full" size="xl" lightBackground={false} />
        </div>

        <div className="space-y-1">
          <h1 className="text-xl sm:text-2xl font-extrabold tracking-wider text-white uppercase font-sans">
            Northern HeatEx Corporation
          </h1>
          <p className="text-amber-400 text-xs tracking-widest uppercase font-mono font-bold">
            Noor Engineering Works (Est. 1983) • Haridwar, India
          </p>
        </div>

        {/* Progress Bar Container */}
        <div className="w-full max-w-md space-y-2 pt-2">
          <div className="flex justify-between items-center text-xs">
            <span className="flex items-center gap-1.5 text-cyan-200 font-bold font-mono">
              <Zap className="w-3.5 h-3.5 text-amber-400 animate-spin" />
              {statusText}
            </span>
            <span className="text-amber-400 font-extrabold text-sm font-mono">{progress}%</span>
          </div>

          <div className="w-full h-2 bg-white/20 rounded-full overflow-hidden p-0.5 border border-white/20">
            <div
              className="h-full bg-gradient-to-r from-cyan-400 via-amber-400 to-emerald-400 rounded-full transition-all duration-100 ease-out"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>

        {/* Cert Badges */}
        <div className="flex items-center gap-2 pt-2 text-[10px] text-cyan-200 font-mono">
          <span className="px-2.5 py-1 bg-white/10 border border-white/20 rounded">ASME SEC VIII DIV 1</span>
          <span className="px-2.5 py-1 bg-white/10 border border-white/20 rounded">TEMA CLASS R</span>
          <span className="px-2.5 py-1 bg-amber-500/20 text-amber-300 font-bold border border-amber-500/40 rounded">
            INDIAN GST READY
          </span>
        </div>

        <button
          onClick={onLoadingComplete}
          className="text-cyan-300 hover:text-white text-xs underline pt-2 cursor-pointer transition font-mono"
        >
          Skip Intro →
        </button>
      </div>
    </div>
  );
};
