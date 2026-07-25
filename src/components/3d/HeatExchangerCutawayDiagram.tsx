import React, { useState, useEffect } from "react";
import { Play, Pause, Info, Flame, Droplets, Sliders, CheckCircle2, ShieldAlert, Sparkles, Activity } from "lucide-react";

interface HeatExchangerCutawayDiagramProps {
  className?: string;
  autoAnimate?: boolean;
  onHotspotSelect?: (hotspot: string) => void;
}

export const HeatExchangerCutawayDiagram: React.FC<HeatExchangerCutawayDiagramProps> = ({
  className = "",
  autoAnimate = true,
  onHotspotSelect,
}) => {
  const [isPlaying, setIsPlaying] = useState<boolean>(autoAnimate);
  const [flowSpeed, setFlowSpeed] = useState<number>(1);
  const [selectedHotspot, setSelectedHotspot] = useState<string | null>("tubes");
  const [showFlowPaths, setShowFlowPaths] = useState<{ product: boolean; shellFluid: boolean }>({
    product: true,
    shellFluid: true,
  });
  const [flowOffset, setFlowOffset] = useState<number>(0);

  // Animation frame loop for flowing dashed lines & animated fluid dots
  useEffect(() => {
    if (!isPlaying) return;
    const interval = setInterval(() => {
      setFlowOffset((prev) => (prev + 1.5 * flowSpeed) % 100);
    }, 40);
    return () => clearInterval(interval);
  }, [isPlaying, flowSpeed]);

  const hotspots = [
    {
      id: "product-inlet",
      name: "Product Inlet / Channel Pass",
      x: "13%",
      y: "88%",
      color: "bg-blue-500",
      description: "Process fluid entering the front stationary bonnet at controlled pressure (12.4 Bar, 25°C).",
    },
    {
      id: "tubes",
      name: "Seamless U-Tube Bundle",
      x: "50%",
      y: "48%",
      color: "bg-amber-400",
      description: "Array of SA-213 TP316L stainless steel tubes carrying process fluid through the shell pass.",
    },
    {
      id: "baffles",
      name: "Segmental Baffle Plates",
      x: "42%",
      y: "28%",
      color: "bg-cyan-400",
      description: "Precision-cut steel baffles creating cross-flow velocity and supporting tube bundle against vibration.",
    },
    {
      id: "shell-inlet",
      name: "Heating / Cooling Fluid Inlet",
      x: "74%",
      y: "20%",
      color: "bg-red-500",
      description: "Utility heating steam or cooling water inlet nozzle (180°C inlet temperature).",
    },
    {
      id: "u-bend",
      name: "Rear U-Bend Return Head",
      x: "88%",
      y: "50%",
      color: "bg-emerald-400",
      description: "180° cold-bent U-tube bundle end allowing differential thermal expansion without stress.",
    },
    {
      id: "saddles",
      name: "Heavy Support Saddles",
      x: "67%",
      y: "82%",
      color: "bg-slate-400",
      description: "Structural carbon steel mounting legs anchored to foundations with sliding expansion slots.",
    },
  ];

  const currentHotspotInfo = hotspots.find((h) => h.id === selectedHotspot) || hotspots[1];

  const handleSelect = (id: string) => {
    setSelectedHotspot(id);
    if (onHotspotSelect) onHotspotSelect(id);
  };

  return (
    <div className={`relative w-full bg-slate-950 rounded-2xl border border-slate-800 shadow-2xl overflow-hidden flex flex-col font-sans ${className}`}>
      {/* Top Banner Control Bar */}
      <div className="flex flex-wrap items-center justify-between gap-3 bg-slate-900/90 border-b border-slate-800 px-4 py-3 text-xs">
        <div className="flex items-center gap-2">
          <span className="p-1 rounded bg-amber-500/20 text-amber-400 border border-amber-500/30">
            <Sparkles className="w-3.5 h-3.5" />
          </span>
          <h3 className="font-mono font-bold text-slate-100 text-sm tracking-tight">
            Enhanced Cutaway Diagram: How a Shell & Tube Exchanger Works
          </h3>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          {/* Flow Toggles */}
          <button
            onClick={() => setShowFlowPaths((p) => ({ ...p, product: !p.product }))}
            className={`px-2.5 py-1 rounded-lg border font-mono text-[11px] flex items-center gap-1.5 transition ${
              showFlowPaths.product
                ? "bg-blue-950/80 border-blue-500 text-blue-300 font-bold"
                : "bg-slate-900 border-slate-800 text-slate-500 opacity-60"
            }`}
          >
            <Droplets className="w-3.5 h-3.5 text-blue-400" />
            Product Tube Path (Blue)
          </button>

          <button
            onClick={() => setShowFlowPaths((p) => ({ ...p, shellFluid: !p.shellFluid }))}
            className={`px-2.5 py-1 rounded-lg border font-mono text-[11px] flex items-center gap-1.5 transition ${
              showFlowPaths.shellFluid
                ? "bg-red-950/80 border-red-500 text-red-300 font-bold"
                : "bg-slate-900 border-slate-800 text-slate-500 opacity-60"
            }`}
          >
            <Flame className="w-3.5 h-3.5 text-red-400" />
            Heating/Cooling Path (Red)
          </button>

          {/* Animation Play/Pause */}
          <button
            onClick={() => setIsPlaying(!isPlaying)}
            className="p-1.5 rounded-lg bg-slate-800 border border-slate-700 text-slate-200 hover:bg-slate-700 transition"
            title={isPlaying ? "Pause Flow Animation" : "Play Flow Animation"}
          >
            {isPlaying ? <Pause className="w-3.5 h-3.5 text-amber-400" /> : <Play className="w-3.5 h-3.5 text-emerald-400" />}
          </button>

          {/* Speed Selector */}
          <div className="flex items-center gap-1 bg-slate-950 px-2 py-1 rounded-lg border border-slate-800 text-[10px] font-mono">
            <span className="text-slate-400">Speed:</span>
            {[1, 2, 3].map((s) => (
              <button
                key={s}
                onClick={() => setFlowSpeed(s)}
                className={`px-1.5 py-0.5 rounded ${flowSpeed === s ? "bg-cyan-500 text-slate-950 font-bold" : "text-slate-400 hover:text-white"}`}
              >
                {s}x
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Main Diagram Render Stage */}
      <div className="relative w-full aspect-[16/9] min-h-[380px] bg-[#0d121f] flex items-center justify-center p-4 overflow-hidden">
        {/* Background Grid Accent */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#1e293b15_1px,transparent_1px),linear-gradient(to_bottom,#1e293b15_1px,transparent_1px)] bg-[size:24px_24px]" />

        {/* Scalable High-Definition Vector SVG Cutaway Model */}
        <svg
          viewBox="0 0 1000 520"
          className="w-full h-full object-contain drop-shadow-2xl z-10 select-none"
        >
          <defs>
            {/* Gradients */}
            <linearGradient id="metalShell" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#94a3b8" />
              <stop offset="30%" stopColor="#cbd5e1" />
              <stop offset="70%" stopColor="#64748b" />
              <stop offset="100%" stopColor="#334155" />
            </linearGradient>

            <linearGradient id="shellInterior" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#1e293b" />
              <stop offset="50%" stopColor="#0f172a" />
              <stop offset="100%" stopColor="#1e293b" />
            </linearGradient>

            <linearGradient id="tubeYellowGrad" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#fef08a" />
              <stop offset="50%" stopColor="#eab308" />
              <stop offset="100%" stopColor="#ca8a04" />
            </linearGradient>

            <linearGradient id="fluidBlueGrad" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#38bdf8" />
              <stop offset="100%" stopColor="#2563eb" />
            </linearGradient>

            <linearGradient id="fluidRedGrad" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#f87171" />
              <stop offset="100%" stopColor="#dc2626" />
            </linearGradient>

            {/* Dashed Line Flow Animation Filters */}
            <pattern id="flowPatternBlue" width="20" height="20" patternUnits="userSpaceOnUse">
              <circle cx="10" cy="10" r="3" fill="#38bdf8" />
            </pattern>
          </defs>

          {/* Title Header inside diagram canvas */}
          <text x="500" y="45" textAnchor="middle" className="fill-slate-100 font-sans font-extrabold text-2xl tracking-tight">
            How a Shell and Tube Heat Exchanger Works
          </text>

          {/* ================= 1. BASE STRUCTURE & NOZZLES ================= */}
          {/* Saddles / Support Feet */}
          <path d="M 320 330 L 300 420 L 360 420 L 340 330 Z" fill="#475569" stroke="#1e293b" strokeWidth="2" />
          <path d="M 670 330 L 650 420 L 710 420 L 690 330 Z" fill="#475569" stroke="#1e293b" strokeWidth="2" />
          <rect x="280" y="415" width="100" height="12" rx="2" fill="#334155" />
          <rect x="630" y="415" width="100" height="12" rx="2" fill="#334155" />

          {/* Shell Outer Cylinder Cutaway View */}
          <rect x="230" y="160" width="530" height="170" rx="8" fill="url(#shellInterior)" stroke="#475569" strokeWidth="4" />

          {/* Cutaway Opening Window revealing inside tubes & baffles */}
          <rect x="290" y="172" width="450" height="146" fill="#1e293b" opacity="0.6" rx="4" />

          {/* Shell Top Inlet Nozzle (Heating/Cooling Fluid) */}
          <g>
            <rect x="730" y="110" width="40" height="52" fill="url(#metalShell)" stroke="#334155" strokeWidth="2" />
            <rect x="720" y="102" width="60" height="12" rx="2" fill="#475569" stroke="#1e293b" strokeWidth="2" />
            <text x="750" y="80" textAnchor="middle" className="fill-slate-200 font-sans font-bold text-sm">
              Heating / Cooling Fluid
            </text>
            <path d="M 750 88 L 750 100 M 745 94 L 750 100 L 755 94" fill="none" stroke="#ef4444" strokeWidth="3" strokeLinecap="round" />
          </g>

          {/* Shell Bottom Drain Nozzle */}
          <rect x="280" y="328" width="30" height="30" fill="url(#metalShell)" stroke="#334155" strokeWidth="2" />
          <rect x="272" y="356" width="46" height="10" rx="2" fill="#475569" />

          {/* Front Channel Shell Nozzle (Product Outlet Top) */}
          <rect x="130" y="110" width="36" height="52" fill="url(#metalShell)" stroke="#334155" strokeWidth="2" />
          <rect x="122" y="102" width="52" height="12" rx="2" fill="#475569" stroke="#1e293b" strokeWidth="2" />

          {/* Front Channel Shell Nozzle (Product Inlet Bottom) */}
          <rect x="130" y="328" width="36" height="52" fill="url(#metalShell)" stroke="#334155" strokeWidth="2" />
          <rect x="122" y="378" width="52" height="12" rx="2" fill="#475569" stroke="#1e293b" strokeWidth="2" />
          <text x="148" y="412" textAnchor="middle" className="fill-slate-200 font-sans font-bold text-sm">
            Product
          </text>
          <path d="M 148 400 L 148 388 M 143 394 L 148 388 L 153 394" fill="none" stroke="#38bdf8" strokeWidth="3" strokeLinecap="round" />

          {/* ================= 2. FRONT BONNET CHANNEL & TUBESHEET ================= */}
          {/* Front Bonnet Channel Housing */}
          <path d="M 80 160 Q 80 245 80 330 L 210 330 L 210 160 Z" fill="#64748b" stroke="#1e293b" strokeWidth="3" />
          {/* Channel Cover Flange & Bolts */}
          <rect x="70" y="152" width="16" height="186" rx="3" fill="#334155" stroke="#0f172a" strokeWidth="2" />
          {[160, 180, 200, 220, 240, 260, 280, 300, 320].map((by) => (
            <circle key={by} cx="78" cy={by} r="3" fill="#94a3b8" />
          ))}

          {/* Partition Plate inside front bonnet dividing top/bottom passes */}
          <rect x="80" y="242" width="130" height="8" fill="#1e293b" />
          {/* Curved Flow Divider Plate at bottom inlet */}
          <path d="M 80 328 C 120 328 170 300 170 248 L 80 248 Z" fill="#475569" opacity="0.6" />

          {/* Flange Connection between Channel & Shell */}
          <rect x="210" y="150" width="20" height="190" rx="2" fill="#475569" stroke="#0f172a" strokeWidth="2" />

          {/* Stationary Tubesheet (Heavy Steel Disc) */}
          <rect x="228" y="156" width="14" height="178" fill="#94a3b8" stroke="#1e293b" strokeWidth="2" />

          {/* ================= 3. SEGMENTAL BAFFLE PLATES ================= */}
          {/* Segmental Baffles (Alternating top cut & bottom cut) */}
          {[
            { x: 350, topCut: true },
            { x: 430, topCut: false },
            { x: 510, topCut: true },
            { x: 590, topCut: false },
            { x: 670, topCut: true },
          ].map((b, idx) => (
            <g key={idx}>
              <rect
                x={b.x}
                y={b.topCut ? 200 : 165}
                width="10"
                height="90"
                fill="#64748b"
                stroke="#334155"
                strokeWidth="1.5"
                rx="1"
              />
              {/* Baffle Tie Rods */}
              <line x1="242" y1="180" x2="760" y2="180" stroke="#94a3b8" strokeWidth="2" />
              <line x1="242" y1="310" x2="760" y2="310" stroke="#94a3b8" strokeWidth="2" />
            </g>
          ))}

          {/* ================= 4. TUBE BUNDLE & REAR U-BENDS ================= */}
          {/* Main Straight Tubes (Yellow Bundle) */}
          <g>
            {[180, 192, 204, 216, 228, 260, 272, 284, 296, 308].map((ty) => (
              <line
                key={ty}
                x1="242"
                y1={ty}
                x2="760"
                y2={ty}
                stroke="url(#tubeYellowGrad)"
                strokeWidth="6"
                strokeLinecap="round"
              />
            ))}

            {/* Rear U-Bends connecting upper & lower tubes */}
            {[
              { r: 64, cy: 244 },
              { r: 52, cy: 244 },
              { r: 40, cy: 244 },
              { r: 28, cy: 244 },
              { r: 16, cy: 244 },
            ].map((u, i) => (
              <path
                key={i}
                d={`M 760 ${244 - u.r} A ${u.r} ${u.r} 0 0 1 760 ${244 + u.r}`}
                fill="none"
                stroke="url(#tubeYellowGrad)"
                strokeWidth="6"
              />
            ))}

            {/* Rear Head Housing Cover */}
            <path d="M 760 152 L 780 152 Q 860 245 780 338 L 760 338 Z" fill="#475569" stroke="#1e293b" strokeWidth="3" opacity="0.85" />
            <path d="M 800 160 Q 860 245 800 330 Z" fill="#b91c1c" opacity="0.75" />
          </g>

          {/* ================= 5. FLOW ANIMATION PATH OVERLAYS ================= */}
          {/* PRODUCT TUBE-SIDE FLOW PATH (BLUE DASHED LINE) */}
          {showFlowPaths.product && (
            <g className="transition-opacity duration-300">
              {/* Lower Tube Pass (Inward Flow) */}
              <path
                d="M 148 370 L 148 284 L 760 284 A 40 40 0 0 0 760 204 L 148 204 L 148 118"
                fill="none"
                stroke="#38bdf8"
                strokeWidth="4"
                strokeDasharray="10 8"
                strokeDashoffset={-flowOffset}
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              {/* Product Directional Flow Arrows */}
              <polygon points="148,310 142,320 154,320" fill="#38bdf8" />
              <polygon points="450,284 460,278 460,290" fill="#38bdf8" />
              <polygon points="800,244 804,234 792,238" fill="#38bdf8" />
              <polygon points="450,204 440,198 440,210" fill="#38bdf8" />
              <polygon points="148,135 142,145 154,145" fill="#38bdf8" />
            </g>
          )}

          {/* HEATING / COOLING SHELL-SIDE FLOW PATH (RED DASHED SERPENTINE WAVE) */}
          {showFlowPaths.shellFluid && (
            <g className="transition-opacity duration-300">
              {/* Serpentine Wavy Path through Baffles */}
              <path
                d="M 750 140 L 750 180 C 750 290 690 310 630 310 C 570 310 550 180 470 180 C 390 180 370 310 310 310 L 295 350"
                fill="none"
                stroke="#ef4444"
                strokeWidth="4"
                strokeDasharray="12 8"
                strokeDashoffset={-flowOffset * 1.2}
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              {/* Red Flow Directional Arrows */}
              <polygon points="750,155 744,145 756,145" fill="#ef4444" />
              <polygon points="610,310 600,304 600,316" fill="#ef4444" />
              <polygon points="430,180 420,174 420,186" fill="#ef4444" />
              <polygon points="295,340 289,330 301,330" fill="#ef4444" />
            </g>
          )}

          {/* ================= 6. INTERACTIVE HOTSPOT PIN MARKERS ================= */}
          {hotspots.map((hs) => {
            const isSelected = selectedHotspot === hs.id;
            return (
              <g
                key={hs.id}
                onClick={() => handleSelect(hs.id)}
                className="cursor-pointer group"
              >
                {/* Outer Ping Animation Circle */}
                <circle
                  cx={hs.x}
                  cy={hs.y}
                  r={isSelected ? "14" : "10"}
                  className={`${hs.color} opacity-40 animate-ping`}
                />
                {/* Center Target Circle */}
                <circle
                  cx={hs.x}
                  cy={hs.y}
                  r={isSelected ? "8" : "6"}
                  fill="#ffffff"
                  stroke={isSelected ? "#0284c7" : "#0f172a"}
                  strokeWidth="2.5"
                  className="transition-all duration-200 group-hover:scale-125"
                />
              </g>
            );
          })}
        </svg>

        {/* Legend Overlay Box on Bottom Left of Canvas */}
        <div className="absolute bottom-3 left-3 bg-slate-950/85 backdrop-blur-md p-2.5 rounded-xl border border-slate-800 text-[11px] font-mono text-slate-300 flex flex-col gap-1.5 z-20">
          <div className="flex items-center gap-2">
            <span className="w-3 h-1 bg-sky-400 rounded-full" />
            <span className="text-sky-300 font-bold">Product Tube-Side Stream</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="w-3 h-1 bg-red-500 rounded-full" />
            <span className="text-red-300 font-bold">Heating/Cooling Shell Stream</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="w-3 h-3 bg-amber-400 rounded-sm" />
            <span className="text-amber-200">U-Tube Heat Transfer Surface</span>
          </div>
        </div>
      </div>

      {/* Selected Hotspot Detailed Component Card */}
      <div className="bg-slate-900 border-t border-slate-800 p-4 grid grid-cols-1 md:grid-cols-3 gap-4 items-center">
        <div className="md:col-span-2 space-y-1">
          <div className="flex items-center gap-2">
            <span className="px-2 py-0.5 rounded bg-cyan-950 text-cyan-300 border border-cyan-800 font-mono text-[10px] uppercase font-bold">
              Component Inspection
            </span>
            <h4 className="font-bold text-slate-100 text-sm">{currentHotspotInfo.name}</h4>
          </div>
          <p className="text-slate-300 text-xs leading-relaxed">{currentHotspotInfo.description}</p>
        </div>

        {/* Quick Component Hotspot Switcher buttons */}
        <div className="flex flex-wrap gap-1.5 justify-end">
          {hotspots.map((h) => (
            <button
              key={h.id}
              onClick={() => handleSelect(h.id)}
              className={`px-2.5 py-1 rounded-lg text-[11px] font-mono transition border ${
                selectedHotspot === h.id
                  ? "bg-cyan-500 text-slate-950 border-cyan-400 font-bold shadow"
                  : "bg-slate-950 text-slate-400 border-slate-800 hover:text-white"
              }`}
            >
              {h.name.split("/")[0]}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};
