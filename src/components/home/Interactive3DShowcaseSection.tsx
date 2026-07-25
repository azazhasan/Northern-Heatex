import React, { useState } from "react";
import { HeatExchanger3DCanvas } from "../3d/HeatExchanger3DCanvas";
import { Box, Eye, Flame, Sliders, Layers, Zap, Activity, ShieldCheck } from "lucide-react";
import { TEMAType } from "../../types";

export const Interactive3DShowcaseSection: React.FC = () => {
  const [temaType, setTemaType] = useState<TEMAType>("BEM");
  const [simulationMode, setSimulationMode] = useState<"thermal" | "flow" | "pressure">("thermal");

  return (
    <section id="showcase-3d" className="py-20 bg-[#050505] text-white border-t border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        {/* Header */}
        <div className="flex flex-wrap items-end justify-between gap-6 border-b border-white/10 pb-6">
          <div className="max-w-2xl space-y-2">
            <span className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-cyan-950/80 border border-cyan-500/30 text-cyan-300 text-xs font-mono font-bold uppercase tracking-wider glow-cyan">
              <Box className="w-3.5 h-3.5 text-cyan-400" />
              Section 4 • Interactive 3D Product Inspector
            </span>

            <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight">
              Real-Time 3D Exchanger{" "}
              <span className="bg-gradient-to-r from-cyan-400 via-blue-400 to-indigo-300 bg-clip-text text-transparent">
                CAD & Physics Simulator
              </span>
            </h2>
          </div>

          <div className="flex flex-wrap gap-2 font-mono text-xs">
            <button
              onClick={() => setSimulationMode("thermal")}
              className={`px-3.5 py-2 rounded-xl border flex items-center gap-1.5 transition cursor-pointer ${
                simulationMode === "thermal"
                  ? "bg-amber-950/80 text-amber-300 border-amber-500/50 font-bold glow-cyan"
                  : "bg-white/5 text-white/60 border-white/10 hover:text-white"
              }`}
            >
              <Flame className="w-4 h-4 text-amber-400" />
              Thermal Heatmap
            </button>

            <button
              onClick={() => setSimulationMode("flow")}
              className={`px-3.5 py-2 rounded-xl border flex items-center gap-1.5 transition cursor-pointer ${
                simulationMode === "flow"
                  ? "bg-blue-950/80 text-cyan-300 border-blue-500/50 font-bold glow-blue"
                  : "bg-white/5 text-white/60 border-white/10 hover:text-white"
              }`}
            >
              <Activity className="w-4 h-4 text-cyan-400" />
              Flow Velocity Vector
            </button>

            <button
              onClick={() => setSimulationMode("pressure")}
              className={`px-3.5 py-2 rounded-xl border flex items-center gap-1.5 transition cursor-pointer ${
                simulationMode === "pressure"
                  ? "bg-indigo-950/80 text-indigo-300 border-indigo-500/50 font-bold glow-indigo"
                  : "bg-white/5 text-white/60 border-white/10 hover:text-white"
              }`}
            >
              <Zap className="w-4 h-4 text-indigo-400" />
              Pressure Drop Delta
            </button>
          </div>
        </div>

        {/* 3D Canvas Box */}
        <div className="bg-[#0a0a0a] border border-white/10 rounded-3xl p-6 shadow-2xl space-y-6">
          <HeatExchanger3DCanvas
            temaType={temaType}
            shellDiameter={850}
            tubeCount={220}
            tubeLength={6000}
          />

          {/* Simulation Analytics Readout */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 text-xs font-mono">
            <div className="bg-[#050505] p-4 rounded-xl border border-white/5 space-y-1">
              <span className="text-white/40 uppercase text-[10px]">TEMA Shell Type</span>
              <div className="text-sm font-bold text-cyan-400">{temaType} (Fixed/Floating Tubesheet)</div>
            </div>

            <div className="bg-[#050505] p-4 rounded-xl border border-white/5 space-y-1">
              <span className="text-white/40 uppercase text-[10px]">Simulation Focus</span>
              <div className="text-sm font-bold text-amber-400 capitalize">{simulationMode} Mode Active</div>
            </div>

            <div className="bg-[#050505] p-4 rounded-xl border border-white/5 space-y-1">
              <span className="text-white/40 uppercase text-[10px]">Hot Fluid In/Out</span>
              <div className="text-sm font-bold text-white">180°C → 95°C (12.4 Bar)</div>
            </div>

            <div className="bg-[#050505] p-4 rounded-xl border border-white/5 space-y-1">
              <span className="text-white/40 uppercase text-[10px]">Cold Fluid In/Out</span>
              <div className="text-sm font-bold text-cyan-300">25°C → 68°C (8.1 Bar)</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
