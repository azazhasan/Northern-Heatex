import React, { useState } from "react";
import { ProductCategoryData } from "./productsData";
import {
  Flame,
  Zap,
  Activity,
  Layers,
  ShieldCheck,
  Maximize2,
  Gauge,
  Thermometer,
  Eye,
  Sliders,
  CheckCircle2,
  RefreshCw,
} from "lucide-react";

interface Props {
  product: ProductCategoryData;
  onOpenRFQ?: () => void;
}

export const InteractiveProductViewer: React.FC<Props> = ({ product, onOpenRFQ }) => {
  const [viewMode, setViewMode] = useState<"heatmap" | "vectors" | "stress">("heatmap");
  const [flowVelocity, setFlowVelocity] = useState<number>(2.5); // m/s
  const [hotInletTemp, setHotInletTemp] = useState<number>(product.calculatorPreset.hotTempIn);
  const [coldInletTemp, setColdInletTemp] = useState<number>(product.calculatorPreset.coldTempIn);
  const [selectedMaterial, setSelectedMaterial] = useState<string>(product.materialsOptions[0]?.material || "Carbon Steel");
  const [isExploded, setIsExploded] = useState<boolean>(false);

  // Dynamic calculated heat duty approximation based on temperature delta & flow rate
  const hotDelta = hotInletTemp - product.calculatorPreset.hotTempOut;
  const coldDelta = product.calculatorPreset.coldTempOut - coldInletTemp;
  const approxLMTD = Math.max(1, (hotDelta - coldDelta) / Math.log(Math.max(1.05, hotDelta / Math.max(0.1, coldDelta)))).toFixed(1);
  const approxDutyMW = ((flowVelocity * 4.2 * Math.max(10, hotDelta)) / 10).toFixed(2);
  const approxReynolds = Math.round(flowVelocity * 14500);

  const activeMat = product.materialsOptions.find((m) => m.material === selectedMaterial) || product.materialsOptions[0];

  return (
    <div className="bg-[#0a0a0d] border border-cyan-500/30 rounded-2xl p-6 shadow-2xl relative overflow-hidden backdrop-blur-xl">
      {/* Glow Effects */}
      <div className="absolute -top-24 -left-24 w-72 h-72 bg-blue-600/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-24 -right-24 w-72 h-72 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />

      {/* Header Bar */}
      <div className="flex flex-wrap items-center justify-between gap-4 border-b border-white/10 pb-4 mb-6">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-[10px] font-mono uppercase tracking-widest px-2 py-0.5 rounded bg-cyan-950/80 text-cyan-400 border border-cyan-500/30 font-bold">
              CAD & Flow Simulation Engine
            </span>
            <span className="text-xs font-mono text-white/40">ID: {product.id}-SIM</span>
          </div>
          <h3 className="text-xl font-extrabold text-white mt-1 flex items-center gap-2">
            {product.title} Interactive Cutaway Model
          </h3>
        </div>

        {/* View Mode Buttons */}
        <div className="flex items-center gap-1.5 bg-black/60 p-1 rounded-xl border border-white/10 font-mono text-xs">
          <button
            onClick={() => setViewMode("heatmap")}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg transition font-medium ${
              viewMode === "heatmap" ? "bg-cyan-500 text-slate-950 font-bold shadow-lg" : "text-white/60 hover:text-white"
            }`}
          >
            <Thermometer className="w-3.5 h-3.5" /> Heatmap
          </button>
          <button
            onClick={() => setViewMode("vectors")}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg transition font-medium ${
              viewMode === "vectors" ? "bg-cyan-500 text-slate-950 font-bold shadow-lg" : "text-white/60 hover:text-white"
            }`}
          >
            <Activity className="w-3.5 h-3.5" /> Flow Vectors
          </button>
          <button
            onClick={() => setViewMode("stress")}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg transition font-medium ${
              viewMode === "stress" ? "bg-cyan-500 text-slate-950 font-bold shadow-lg" : "text-white/60 hover:text-white"
            }`}
          >
            <Zap className="w-3.5 h-3.5" /> FEA Stress
          </button>
        </div>
      </div>

      {/* Main Canvas & Controls Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Visual Stage (8 cols) */}
        <div className="lg:col-span-8 bg-[#040406] border border-white/10 rounded-xl p-4 relative min-h-[380px] flex flex-col justify-between overflow-hidden">
          {/* Top Live Telemetry Overlay */}
          <div className="flex flex-wrap items-center justify-between gap-2 z-10 font-mono text-xs">
            <div className="flex items-center gap-3 bg-black/70 backdrop-blur-md px-3 py-1.5 rounded-lg border border-white/10">
              <span className="flex items-center gap-1 text-red-400 font-bold">
                <Flame className="w-3.5 h-3.5" /> Hot In: {hotInletTemp}°C
              </span>
              <span className="text-white/30">|</span>
              <span className="flex items-center gap-1 text-cyan-400 font-bold">
                <Gauge className="w-3.5 h-3.5" /> Cold In: {coldInletTemp}°C
              </span>
            </div>

            <div className="flex items-center gap-3 bg-black/70 backdrop-blur-md px-3 py-1.5 rounded-lg border border-white/10">
              <span className="text-amber-300 font-bold">Duty: {approxDutyMW} MW</span>
              <span className="text-white/30">|</span>
              <span className="text-emerald-400 font-bold">LMTD: {approxLMTD}°C</span>
            </div>
          </div>

          {/* Cutaway SVG Graphic Representation */}
          <div className="my-6 relative flex items-center justify-center">
            <svg
              viewBox="0 0 800 320"
              className="w-full h-auto max-h-[280px] drop-shadow-2xl transition-all duration-500"
            >
              <defs>
                {/* Heatmap Gradients */}
                <linearGradient id="hotFlowGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="#ef4444" stopOpacity="0.9" />
                  <stop offset="50%" stopColor="#f97316" stopOpacity="0.8" />
                  <stop offset="100%" stopColor="#eab308" stopOpacity="0.7" />
                </linearGradient>

                <linearGradient id="coldFlowGrad" x1="100%" y1="0%" x2="0%" y2="0%">
                  <stop offset="0%" stopColor="#06b6d4" stopOpacity="0.9" />
                  <stop offset="50%" stopColor="#0284c7" stopOpacity="0.8" />
                  <stop offset="100%" stopColor="#3b82f6" stopOpacity="0.7" />
                </linearGradient>

                <linearGradient id="metalBarrier" x1="0%" y1="0%" x2="0%" y2="100%">
                  <stop offset="0%" stopColor="#475569" />
                  <stop offset="50%" stopColor="#94a3b8" />
                  <stop offset="100%" stopColor="#334155" />
                </linearGradient>

                <pattern id="grid" width="20" height="20" patternUnits="userSpaceOnUse">
                  <path d="M 20 0 L 0 0 0 20" fill="none" stroke="rgba(255,255,255,0.04)" strokeWidth="1" />
                </pattern>
              </defs>

              {/* Background Grid */}
              <rect width="800" height="320" fill="url(#grid)" rx="10" />

              {/* Shell Outer Boundary */}
              <rect
                x="120"
                y="50"
                width="560"
                height="220"
                rx="16"
                fill="none"
                stroke={viewMode === "stress" ? "#f59e0b" : "rgba(255,255,255,0.2)"}
                strokeWidth={viewMode === "stress" ? "4" : "2"}
                strokeDasharray={viewMode === "stress" ? "8 4" : undefined}
                className="transition-all duration-300"
              />

              {/* Tubesheet Flanges */}
              <rect x="100" y="40" width="20" height="240" fill="url(#metalBarrier)" rx="2" />
              <rect x="680" y="40" width="20" height="240" fill="url(#metalBarrier)" rx="2" />

              {/* Baffles */}
              <line x1="240" y1="50" x2="240" y2="220" stroke="#64748b" strokeWidth="6" />
              <line x1="380" y1="100" x2="380" y2="270" stroke="#64748b" strokeWidth="6" />
              <line x1="520" y1="50" x2="520" y2="220" stroke="#64748b" strokeWidth="6" />

              {/* Tube Bundle Lines (Hot Side Internal Flow) */}
              {Array.from({ length: 9 }).map((_, i) => {
                const yPos = 80 + i * 20;
                return (
                  <g key={i}>
                    {/* Outer tube wall */}
                    <line
                      x1="120"
                      y1={yPos}
                      x2="680"
                      y2={yPos}
                      stroke={selectedMaterial.includes("Titanium") ? "#a855f7" : "#0284c7"}
                      strokeWidth="6"
                      opacity="0.5"
                    />
                    {/* Inner Fluid Stream */}
                    <line
                      x1="120"
                      y1={yPos}
                      x2="680"
                      y2={yPos}
                      stroke={viewMode === "stress" && i % 2 === 0 ? "#ef4444" : "url(#hotFlowGrad)"}
                      strokeWidth="3"
                    >
                      {viewMode === "vectors" && (
                        <animate
                          attributeName="stroke-dashoffset"
                          values="100;0"
                          dur={`${2 / flowVelocity}s`}
                          repeatCount="indefinite"
                        />
                      )}
                    </line>
                  </g>
                );
              })}

              {/* Shell Side Fluid Flow Path (Cold Side Counter-Current) */}
              <path
                d="M 660 80 Q 590 180 520 250 Q 450 120 380 70 Q 310 220 240 250 L 140 250"
                fill="none"
                stroke="url(#coldFlowGrad)"
                strokeWidth="18"
                opacity="0.35"
                strokeLinecap="round"
              />

              {/* Animated Velocity Particles if in vectors mode */}
              {viewMode === "vectors" && (
                <g>
                  <circle cx="200" cy="120" r="4" fill="#38bdf8">
                    <animate attributeName="cx" values="120;680" dur={`${3 / flowVelocity}s`} repeatCount="indefinite" />
                  </circle>
                  <circle cx="350" cy="160" r="4" fill="#f97316">
                    <animate attributeName="cx" values="120;680" dur={`${2.2 / flowVelocity}s`} repeatCount="indefinite" />
                  </circle>
                  <circle cx="500" cy="200" r="4" fill="#38bdf8">
                    <animate attributeName="cx" values="120;680" dur={`${2.8 / flowVelocity}s`} repeatCount="indefinite" />
                  </circle>
                </g>
              )}

              {/* Hotspots in Stress Mode */}
              {viewMode === "stress" && (
                <g>
                  <circle cx="120" cy="80" r="14" fill="#ef4444" opacity="0.6" className="animate-ping" />
                  <circle cx="680" cy="240" r="14" fill="#f59e0b" opacity="0.6" className="animate-ping" />
                  <text x="135" y="70" fill="#ef4444" fontSize="10" fontFamily="monospace" fontWeight="bold">
                    Thermal Stress Concentration (Tubesheet Joint)
                  </text>
                  <text x="500" y="280" fill="#f59e0b" fontSize="10" fontFamily="monospace" fontWeight="bold">
                    Max Shell Expansion Differential
                  </text>
                </g>
              )}

              {/* Labels & Annotations */}
              <text x="30" y="85" fill="#f87171" fontSize="10" fontFamily="monospace" fontWeight="bold">
                TUBE INLET →
              </text>
              <text x="705" y="245" fill="#38bdf8" fontSize="10" fontFamily="monospace" fontWeight="bold">
                ← SHELL INLET
              </text>
              <text x="705" y="85" fill="#fbbf24" fontSize="10" fontFamily="monospace" fontWeight="bold">
                TUBE OUTLET →
              </text>
              <text x="30" y="245" fill="#38bdf8" fontSize="10" fontFamily="monospace" fontWeight="bold">
                ← SHELL OUTLET
              </text>
            </svg>
          </div>

          {/* Bottom Interactive Legend */}
          <div className="flex flex-wrap items-center justify-between gap-4 pt-3 border-t border-white/10 font-mono text-[11px] text-white/60">
            <div className="flex items-center gap-4">
              <span className="flex items-center gap-1">
                <span className="w-2.5 h-2.5 rounded-full bg-red-500"></span> Hot Process Stream
              </span>
              <span className="flex items-center gap-1">
                <span className="w-2.5 h-2.5 rounded-full bg-cyan-400"></span> Cold Cooling Water
              </span>
              <span className="flex items-center gap-1">
                <span className="w-2.5 h-2.5 rounded-full bg-purple-400"></span> {selectedMaterial} Tubes
              </span>
            </div>

            <div className="flex items-center gap-2">
              <span className="text-white/40">Re = {approxReynolds} ({approxReynolds > 4000 ? "Turbulent Flow" : "Laminar"})</span>
            </div>
          </div>
        </div>

        {/* Control Panel Sidebar (4 cols) */}
        <div className="lg:col-span-4 space-y-4">
          {/* Hydraulic Parameter Sliders */}
          <div className="bg-[#0f0f13] border border-white/10 rounded-xl p-4 space-y-4">
            <div className="flex items-center justify-between border-b border-white/10 pb-2">
              <h4 className="text-sm font-bold text-white flex items-center gap-2">
                <Sliders className="w-4 h-4 text-cyan-400" /> Hydraulic Simulation
              </h4>
              <button
                onClick={() => {
                  setHotInletTemp(product.calculatorPreset.hotTempIn);
                  setColdInletTemp(product.calculatorPreset.coldTempIn);
                  setFlowVelocity(2.5);
                }}
                className="text-[10px] font-mono text-cyan-400 hover:underline flex items-center gap-1"
              >
                <RefreshCw className="w-3 h-3" /> Reset
              </button>
            </div>

            {/* Hot Temp Slider */}
            <div className="space-y-1">
              <div className="flex justify-between text-xs font-mono">
                <span className="text-white/60">Hot Inlet Temp</span>
                <span className="text-red-400 font-bold">{hotInletTemp}°C</span>
              </div>
              <input
                type="range"
                min="30"
                max="650"
                value={hotInletTemp}
                onChange={(e) => setHotInletTemp(Number(e.target.value))}
                className="w-full h-1.5 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-red-500"
              />
            </div>

            {/* Cold Temp Slider */}
            <div className="space-y-1">
              <div className="flex justify-between text-xs font-mono">
                <span className="text-white/60">Cold Inlet Temp</span>
                <span className="text-cyan-400 font-bold">{coldInletTemp}°C</span>
              </div>
              <input
                type="range"
                min="0"
                max="100"
                value={coldInletTemp}
                onChange={(e) => setColdInletTemp(Number(e.target.value))}
                className="w-full h-1.5 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-cyan-400"
              />
            </div>

            {/* Velocity Slider */}
            <div className="space-y-1">
              <div className="flex justify-between text-xs font-mono">
                <span className="text-white/60">Fluid Velocity</span>
                <span className="text-amber-300 font-bold">{flowVelocity} m/s</span>
              </div>
              <input
                type="range"
                min="0.5"
                max="6.0"
                step="0.1"
                value={flowVelocity}
                onChange={(e) => setFlowVelocity(Number(e.target.value))}
                className="w-full h-1.5 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-amber-400"
              />
            </div>
          </div>

          {/* Material Metallurgy Selector */}
          <div className="bg-[#0f0f13] border border-white/10 rounded-xl p-4 space-y-3">
            <h4 className="text-sm font-bold text-white flex items-center gap-2">
              <Layers className="w-4 h-4 text-purple-400" /> Metallurgy & Corrosion
            </h4>

            <div className="space-y-2">
              <select
                value={selectedMaterial}
                onChange={(e) => setSelectedMaterial(e.target.value)}
                className="w-full bg-slate-900 border border-white/15 rounded-lg px-3 py-2 text-xs font-mono text-cyan-300 focus:outline-none focus:border-cyan-500"
              >
                {product.materialsOptions.map((m) => (
                  <option key={m.material} value={m.material}>
                    {m.material} ({m.grade})
                  </option>
                ))}
              </select>

              {activeMat && (
                <div className="p-3 bg-black/50 rounded-lg border border-white/10 space-y-1 font-mono text-xs">
                  <div className="flex justify-between">
                    <span className="text-white/40">Grade Spec:</span>
                    <span className="text-white font-bold">{activeMat.grade}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-white/40">Corrosion Rating:</span>
                    <span className="text-cyan-400 font-bold">{activeMat.corrosionRating}</span>
                  </div>
                  <p className="text-[11px] text-white/60 pt-1 border-t border-white/5 mt-1">
                    {activeMat.application}
                  </p>
                </div>
              )}
            </div>
          </div>

          {/* Quick Action Button */}
          {onOpenRFQ && (
            <button
              onClick={onOpenRFQ}
              className="w-full py-3 bg-gradient-to-r from-blue-600 to-cyan-500 hover:from-blue-500 hover:to-cyan-400 text-slate-950 font-bold uppercase rounded-xl shadow-xl transition transform active:scale-95 flex items-center justify-center gap-2 font-mono text-xs"
            >
              <ShieldCheck className="w-4 h-4" /> Request Custom Sizing Datasheet
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
