import React, { useState } from "react";
import { Info, Sparkles, Layers, Eye, RefreshCw, CheckCircle2 } from "lucide-react";

interface AcrylicDemoExchangerModelProps {
  className?: string;
}

export const AcrylicDemoExchangerModel: React.FC<AcrylicDemoExchangerModelProps> = ({
  className = "",
}) => {
  const [activePart, setActivePart] = useState<string>("bundle");
  const [highlightFlow, setHighlightFlow] = useState<boolean>(true);

  const parts = [
    {
      id: "shell",
      title: "Transparent Acrylic Shell Cylinder",
      desc: "High-clarity optical acrylic outer shell allowing full 360° internal visual inspection of fluid flow dynamics.",
      x: "50%",
      y: "35%",
    },
    {
      id: "bundle",
      title: "Copper / Brass Tube Bundle",
      desc: "Horizontal straight tube array in vivid orange/copper finish representing heat transfer surface area.",
      x: "52%",
      y: "50%",
    },
    {
      id: "baffles",
      title: "White Perforated Baffle Plates",
      desc: "Precision CNC-drilled white segmental baffle discs supporting the tube matrix and directing shell-side cross-flow.",
      x: "41%",
      y: "48%",
    },
    {
      id: "flanges",
      title: "Clear Acrylic Flanged Connections & Nozzles",
      desc: "Transparent inlet/outlet flanged nozzles bolted with stainless steel hardware for leak-proof seal testing.",
      x: "24%",
      y: "28%",
    },
    {
      id: "channel",
      title: "Clear Acrylic Front & Rear Bonnets",
      desc: "Transparent end channels displaying pass partition plates and tube-to-tubesheet joint details.",
      x: "88%",
      y: "50%",
    },
    {
      id: "stand",
      title: "Heavy Pedestal Base & Saddle Supports",
      desc: "Solid industrial black anodized mounting base with dual clear acrylic saddle cradles.",
      x: "58%",
      y: "85%",
    },
  ];

  const currentPart = parts.find((p) => p.id === activePart) || parts[1];

  return (
    <div className={`relative w-full bg-slate-950 rounded-2xl border border-slate-800 shadow-2xl overflow-hidden flex flex-col font-sans ${className}`}>
      {/* Top Header Bar */}
      <div className="flex flex-wrap items-center justify-between gap-3 bg-slate-900 border-b border-slate-800 px-4 py-3 text-xs">
        <div className="flex items-center gap-2">
          <span className="px-2 py-0.5 rounded bg-cyan-950 text-cyan-300 border border-cyan-800 font-mono font-bold text-[10px] uppercase">
            Physical Demonstration Model
          </span>
          <h3 className="font-mono font-bold text-slate-100 text-sm tracking-tight">
            Transparent Acrylic Shell & Tube Heat Exchanger Model
          </h3>
        </div>

        <div className="flex items-center gap-2 font-mono text-xs">
          <button
            onClick={() => setHighlightFlow(!highlightFlow)}
            className={`px-3 py-1.5 rounded-lg border flex items-center gap-1.5 transition ${
              highlightFlow
                ? "bg-amber-950 border-amber-500 text-amber-300 font-bold"
                : "bg-slate-900 border-slate-800 text-slate-400"
            }`}
          >
            <Sparkles className="w-3.5 h-3.5 text-amber-400" />
            {highlightFlow ? "Flow Paths On" : "Show Model Pure"}
          </button>
        </div>
      </div>

      {/* Main Vector Model Graphic Display */}
      <div className="relative w-full aspect-[16/9] min-h-[380px] bg-gradient-to-b from-slate-950 via-[#0d1322] to-slate-950 flex items-center justify-center p-6 overflow-hidden">
        {/* Subtle grid background */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#1e293b12_1px,transparent_1px),linear-gradient(to_bottom,#1e293b12_1px,transparent_1px)] bg-[size:28px_28px]" />

        {/* Vector SVG Model matching uploaded image */}
        <svg viewBox="0 0 1000 540" className="w-full h-full object-contain drop-shadow-2xl z-10 select-none">
          <defs>
            {/* Acrylic Glass Shell Shading */}
            <linearGradient id="acrylicGlass" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#ffffff" stopOpacity="0.35" />
              <stop offset="20%" stopColor="#38bdf8" stopOpacity="0.1" />
              <stop offset="50%" stopColor="#ffffff" stopOpacity="0.05" />
              <stop offset="80%" stopColor="#0284c7" stopOpacity="0.15" />
              <stop offset="100%" stopColor="#ffffff" stopOpacity="0.3" />
            </linearGradient>

            {/* Copper Orange Tube Color */}
            <linearGradient id="copperTubeGrad" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#fb923c" />
              <stop offset="50%" stopColor="#ea580c" />
              <stop offset="100%" stopColor="#c2410c" />
            </linearGradient>

            {/* Black Pedestal Base */}
            <linearGradient id="basePedestalGrad" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#334155" />
              <stop offset="30%" stopColor="#1e293b" />
              <stop offset="100%" stopColor="#0f172a" />
            </linearGradient>

            {/* White Baffle Plates */}
            <pattern id="baffleHoles" width="12" height="12" patternUnits="userSpaceOnUse">
              <rect width="12" height="12" fill="#f8fafc" />
              <circle cx="6" cy="6" r="2.5" fill="#0f172a" />
            </pattern>
          </defs>

          {/* ================= 1. PEDESTAL BASE & SADDLE SUPPORTS ================= */}
          {/* Main Dark Base Plate */}
          <polygon points="120,440 880,440 840,500 80,500" fill="url(#basePedestalGrad)" stroke="#475569" strokeWidth="3" />
          {/* Base Plate Mounting Holes */}
          <circle cx="150" cy="485" r="5" fill="#020617" stroke="#64748b" strokeWidth="2" />
          <circle cx="810" cy="485" r="5" fill="#020617" stroke="#64748b" strokeWidth="2" />
          <circle cx="530" cy="485" r="5" fill="#020617" stroke="#64748b" strokeWidth="2" />

          {/* Left Saddle Block */}
          <rect x="250" y="380" width="130" height="60" rx="4" fill="#1e293b" stroke="#475569" strokeWidth="2" />
          <rect x="260" y="360" width="110" height="20" rx="2" fill="#334155" />
          {/* Left Acrylic Saddle Cradle */}
          <path d="M 270 360 C 270 300 360 300 360 360 Z" fill="none" stroke="#e2e8f0" strokeWidth="12" opacity="0.6" />

          {/* Right Saddle Block */}
          <rect x="580" y="380" width="130" height="60" rx="4" fill="#1e293b" stroke="#475569" strokeWidth="2" />
          <rect x="590" y="360" width="110" height="20" rx="2" fill="#334155" />
          {/* Right Acrylic Saddle Cradle */}
          <path d="M 600 360 C 600 300 690 300 690 360 Z" fill="none" stroke="#e2e8f0" strokeWidth="12" opacity="0.6" />

          {/* Nameplate Tag on Base */}
          <rect x="420" y="450" width="120" height="24" rx="2" fill="#0f172a" stroke="#94a3b8" strokeWidth="1" />
          <text x="480" y="466" textAnchor="middle" className="fill-slate-300 font-mono font-bold text-[10px]">
            TEMA MODEL DEMO
          </text>

          {/* ================= 2. TRANSPARENT ACRYLIC SHELL CYLINDER ================= */}
          {/* Shell Cylinder Outer Glass */}
          <rect x="230" y="160" width="520" height="180" rx="12" fill="url(#acrylicGlass)" stroke="#38bdf8" strokeWidth="2" opacity="0.8" />
          <line x1="230" y1="175" x2="750" y2="175" stroke="#ffffff" strokeWidth="4" opacity="0.5" />
          <line x1="230" y1="325" x2="750" y2="325" stroke="#38bdf8" strokeWidth="3" opacity="0.3" />

          {/* ================= 3. COPPER / ORANGE TUBE BUNDLE ================= */}
          {/* Array of straight horizontal copper tubes */}
          <g>
            {[
              185, 195, 205, 215, 225, 235, 245, 255, 265, 275, 285, 295, 305, 315
            ].map((ty, i) => (
              <g key={i}>
                <line x1="210" y1={ty} x2="770" y2={ty} stroke="url(#copperTubeGrad)" strokeWidth="5.5" strokeLinecap="round" />
                <line x1="210" y1={ty - 1.5} x2="770" y2={ty - 1.5} stroke="#fdba74" strokeWidth="1.5" opacity="0.8" />
              </g>
            ))}
          </g>

          {/* ================= 4. WHITE PERFORATED BAFFLE PLATES ================= */}
          {[
            { x: 330, cutTop: true },
            { x: 440, cutTop: false },
            { x: 550, cutTop: true },
            { x: 660, cutTop: false },
          ].map((b, idx) => (
            <g key={idx}>
              {/* Perforated White Baffle Body */}
              <rect
                x={b.x}
                y={b.cutTop ? 200 : 162}
                width="16"
                height="136"
                rx="3"
                fill="#f8fafc"
                stroke="#cbd5e1"
                strokeWidth="1.5"
              />
              {/* Drilled Tube Holes pattern */}
              {[175, 195, 215, 235, 255, 275, 295, 315].map((hy) => (
                <circle key={hy} cx={b.x + 8} cy={hy} r="2.5" fill="#334155" />
              ))}
            </g>
          ))}

          {/* ================= 5. ACRYLIC FLANGES & NOZZLES ================= */}
          {/* Left Main Shell Flange */}
          <rect x="210" y="145" width="22" height="210" rx="4" fill="#cbd5e1" fillOpacity="0.4" stroke="#e2e8f0" strokeWidth="2" />
          {/* Flange Bolt Details */}
          {[155, 175, 195, 215, 235, 255, 275, 295, 315, 335, 348].map((by) => (
            <g key={by}>
              <circle cx="221" cy={by} r="4" fill="#f8fafc" stroke="#475569" strokeWidth="1.5" />
              <circle cx="221" cy={by} r="1.5" fill="#0f172a" />
            </g>
          ))}

          {/* Right Main Shell Flange */}
          <rect x="748" y="145" width="22" height="210" rx="4" fill="#cbd5e1" fillOpacity="0.4" stroke="#e2e8f0" strokeWidth="2" />
          {[155, 175, 195, 215, 235, 255, 275, 295, 315, 335, 348].map((by) => (
            <g key={by}>
              <circle cx="759" cy={by} r="4" fill="#f8fafc" stroke="#475569" strokeWidth="1.5" />
              <circle cx="759" cy={by} r="1.5" fill="#0f172a" />
            </g>
          ))}

          {/* Top Flanged Nozzle 1 (Left) */}
          <rect x="250" y="100" width="30" height="60" fill="#e2e8f0" fillOpacity="0.4" stroke="#94a3b8" strokeWidth="1.5" />
          <rect x="240" y="90" width="50" height="12" rx="2" fill="#cbd5e1" stroke="#475569" strokeWidth="1.5" />
          <circle cx="248" cy="96" r="2.5" fill="#0f172a" />
          <circle cx="282" cy="96" r="2.5" fill="#0f172a" />

          {/* Top Flanged Nozzle 2 (Middle Left) */}
          <rect x="360" y="100" width="30" height="60" fill="#e2e8f0" fillOpacity="0.4" stroke="#94a3b8" strokeWidth="1.5" />
          <rect x="350" y="90" width="50" height="12" rx="2" fill="#cbd5e1" stroke="#475569" strokeWidth="1.5" />
          <circle cx="358" cy="96" r="2.5" fill="#0f172a" />
          <circle cx="392" cy="96" r="2.5" fill="#0f172a" />

          {/* Bottom Flanged Drain Nozzles */}
          <rect x="250" y="340" width="30" height="40" fill="#e2e8f0" fillOpacity="0.4" stroke="#94a3b8" strokeWidth="1.5" />
          <rect x="240" y="380" width="50" height="12" rx="2" fill="#cbd5e1" stroke="#475569" strokeWidth="1.5" />

          <rect x="710" y="340" width="30" height="40" fill="#e2e8f0" fillOpacity="0.4" stroke="#94a3b8" strokeWidth="1.5" />
          <rect x="700" y="380" width="50" height="12" rx="2" fill="#cbd5e1" stroke="#475569" strokeWidth="1.5" />

          {/* ================= 6. TRANSPARENT END BONNETS & TUBESHEET ================= */}
          {/* Front Clear Dome Bonnet (Left) */}
          <path d="M 210 160 Q 80 160 80 250 Q 80 340 210 340 Z" fill="#38bdf8" fillOpacity="0.1" stroke="#e2e8f0" strokeWidth="2.5" />
          <line x1="80" y1="250" x2="210" y2="250" stroke="#f8fafc" strokeWidth="4" opacity="0.6" />

          {/* Rear Clear Acrylic Dome Bonnet (Right) showing copper tube ends matrix */}
          <path d="M 770 160 Q 940 160 940 250 Q 940 340 770 340 Z" fill="#38bdf8" fillOpacity="0.1" stroke="#e2e8f0" strokeWidth="2.5" />
          {/* Tube End Mesh Pattern inside rear bonnet */}
          <g opacity="0.85">
            {[175, 190, 205, 220, 235, 250, 265, 280, 295, 310, 325].map((ry) => (
              <g key={ry}>
                <circle cx="810" cy={ry} r="3.5" fill="#ea580c" />
                <circle cx="830" cy={ry} r="3.5" fill="#ea580c" />
                <circle cx="850" cy={ry} r="3.5" fill="#ea580c" />
              </g>
            ))}
          </g>

          {/* ================= 7. FLOW HIGHLIGHT STREAMLINES ================= */}
          {highlightFlow && (
            <g>
              {/* Product Blue Stream inside tubes */}
              <path d="M 120 280 L 210 280 L 770 280 Q 880 280 880 250 Q 880 220 770 220 L 210 220 L 120 220" fill="none" stroke="#38bdf8" strokeWidth="3.5" strokeDasharray="8 6" className="animate-pulse" />
              {/* Heating Shell Stream serpentine line */}
              <path d="M 375 105 L 375 180 C 375 320 440 320 440 180 C 440 320 550 320 550 180 C 550 320 660 320 725 320 L 725 380" fill="none" stroke="#f97316" strokeWidth="3.5" strokeDasharray="8 6" className="animate-pulse" />
            </g>
          )}

          {/* Hotspot Target Markers */}
          {parts.map((p) => {
            const isSel = activePart === p.id;
            return (
              <g key={p.id} onClick={() => setActivePart(p.id)} className="cursor-pointer group">
                <circle cx={p.x} cy={p.y} r={isSel ? "15" : "10"} className="fill-amber-400 opacity-30 animate-ping" />
                <circle cx={p.x} cy={p.y} r={isSel ? "9" : "6"} fill="#ffffff" stroke={isSel ? "#ea580c" : "#0f172a"} strokeWidth="2.5" />
              </g>
            );
          })}
        </svg>

        {/* Legend Box */}
        <div className="absolute bottom-3 left-3 bg-slate-950/90 backdrop-blur-md p-3 rounded-xl border border-slate-800 text-[11px] font-mono text-slate-300 flex flex-col gap-1.5 z-20">
          <div className="flex items-center gap-2">
            <span className="w-3 h-3 rounded-full bg-orange-500" />
            <span className="text-orange-300 font-bold">Copper Tube Bundle (Straight Pass)</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="w-3 h-3 rounded-sm bg-slate-100 border border-slate-400" />
            <span className="text-slate-200">White CNC Drilled Baffle Discs</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="w-3 h-3 rounded-full bg-sky-400/50 border border-sky-400" />
            <span className="text-sky-300">Optical Acrylic Glass Shell & Bonnets</span>
          </div>
        </div>
      </div>

      {/* Selected Component Description */}
      <div className="bg-slate-900 border-t border-slate-800 p-4 grid grid-cols-1 md:grid-cols-3 gap-4 items-center">
        <div className="md:col-span-2 space-y-1">
          <div className="flex items-center gap-2">
            <span className="px-2 py-0.5 rounded bg-amber-950 text-amber-300 border border-amber-800 font-mono text-[10px] uppercase font-bold">
              Demo Model Component
            </span>
            <h4 className="font-bold text-slate-100 text-sm">{currentPart.title}</h4>
          </div>
          <p className="text-slate-300 text-xs leading-relaxed">{currentPart.desc}</p>
        </div>

        {/* Part Quick Selectors */}
        <div className="flex flex-wrap gap-1.5 justify-end">
          {parts.map((p) => (
            <button
              key={p.id}
              onClick={() => setActivePart(p.id)}
              className={`px-2.5 py-1 rounded-lg text-[11px] font-mono transition border ${
                activePart === p.id
                  ? "bg-amber-500 text-slate-950 border-amber-400 font-bold shadow"
                  : "bg-slate-950 text-slate-400 border-slate-800 hover:text-white"
              }`}
            >
              {p.title.split(" ")[0]}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};
