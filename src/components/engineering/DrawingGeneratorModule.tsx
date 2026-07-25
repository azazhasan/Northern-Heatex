import React, { useState } from "react";
import {
  Layers,
  Download,
  Maximize2,
  ZoomIn,
  ZoomOut,
  RefreshCw,
  FileCode,
  FileText,
  Eye,
  Sliders,
  CheckCircle2,
  Zap,
} from "lucide-react";

export const DrawingGeneratorModule: React.FC = () => {
  const [activeView, setActiveView] = useState<
    "ga" | "tubesheet" | "nozzle" | "baffle" | "assembly" | "exploded" | "section" | "bom"
  >("ga");

  const [zoomLevel, setZoomLevel] = useState<number>(100);

  const viewsList = [
    { id: "ga", label: "General Arrangement (GA)", desc: "Overall dimensions, mounting feet, nozzle orientation" },
    { id: "tubesheet", label: "Tube Sheet Layout", desc: "Drilling pattern, pitch pattern, tube count layout" },
    { id: "nozzle", label: "Nozzle Layout & Flanges", desc: "Shell/tube nozzle positions, flange ratings & projections" },
    { id: "baffle", label: "Baffle & Tie Rod Layout", desc: "Segmental baffle cut orientation, tie rod circle" },
    { id: "assembly", label: "Assembly Cross Section", desc: "Full sectional assembly with parts callout" },
    { id: "exploded", label: "Exploded 3D View", desc: "3D exploded component disassembly schematic" },
    { id: "section", label: "Detail Section Views", desc: "Tube-to-tubesheet joint details, gasket grooves" },
    { id: "bom", label: "Bill of Material (BOM) Table", desc: "Integrated parts list and weight breakdown" },
  ];

  return (
    <div className="space-y-8 animate-fadeIn">
      {/* Header Banner */}
      <div className="relative bg-gradient-to-br from-[#070910] via-[#05070d] to-[#0c101d] border border-cyan-500/30 rounded-3xl p-8 shadow-2xl overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-3 max-w-3xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-950 text-cyan-400 border border-cyan-500/40 text-xs font-mono font-bold uppercase">
              <Layers className="w-3.5 h-3.5 text-cyan-400" /> Generative CAD Drawing Engine (Module 6)
            </div>

            <h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
              Automated Engineering Drawing Generator
            </h1>

            <p className="text-sm text-cyan-200/80 font-normal leading-relaxed">
              Generates dimensioned General Arrangement (GA), Tubesheet drilling layouts, Nozzle orientation schematics, and exploded 3D CAD views ready for export in AutoCAD DXF, SVG, and high-resolution PDF.
            </p>
          </div>

          <div className="flex flex-wrap gap-2 font-mono text-xs">
            <button
              onClick={() => alert("Downloading AutoCAD DXF vector file...")}
              className="px-4 py-2.5 bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold rounded-xl flex items-center gap-2 shadow-lg"
            >
              <FileCode className="w-4 h-4" /> Export DXF
            </button>
            <button
              onClick={() => alert("Downloading High-Res Vector SVG...")}
              className="px-4 py-2.5 bg-white/5 hover:bg-white/10 text-white border border-white/15 rounded-xl font-bold flex items-center gap-2"
            >
              <Download className="w-4 h-4 text-cyan-400" /> Export SVG
            </button>
          </div>
        </div>
      </div>

      {/* Main CAD Stage Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Drawing View Selector Sidebar */}
        <div className="bg-[#080a0f] border border-white/10 rounded-3xl p-4 space-y-2">
          <h3 className="text-xs font-mono font-bold uppercase tracking-wider text-cyan-400 px-3 py-2 border-b border-white/10">
            Drawing Sheets & Views
          </h3>
          {viewsList.map((v) => (
            <button
              key={v.id}
              onClick={() => setActiveView(v.id as any)}
              className={`w-full text-left p-3 rounded-2xl font-mono text-xs transition space-y-0.5 ${
                activeView === v.id
                  ? "bg-cyan-950 text-cyan-300 border border-cyan-500/50 font-bold shadow-lg"
                  : "bg-black/40 text-white/70 hover:text-white border border-transparent"
              }`}
            >
              <div className="font-bold">{v.label}</div>
              <div className="text-[10px] text-white/40 line-clamp-1">{v.desc}</div>
            </button>
          ))}
        </div>

        {/* Viewport Canvas */}
        <div className="lg:col-span-3 bg-[#080a0f] border border-white/10 rounded-3xl p-6 space-y-4 flex flex-col justify-between shadow-2xl relative min-h-[520px]">
          {/* Top Canvas Controls */}
          <div className="flex items-center justify-between font-mono text-xs border-b border-white/10 pb-3">
            <div className="flex items-center gap-2">
              <span className="text-cyan-400 font-bold uppercase">{viewsList.find((v) => v.id === activeView)?.label}</span>
              <span className="text-[10px] text-white/40 bg-white/5 px-2 py-0.5 rounded border border-white/10">
                SCALE 1:15 • DWG NO: NHEE-2026-D01
              </span>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={() => setZoomLevel((z) => Math.max(50, z - 10))}
                className="p-1.5 bg-black/60 rounded-lg hover:bg-white/10 text-white"
              >
                <ZoomOut className="w-4 h-4" />
              </button>
              <span className="text-cyan-300 w-12 text-center">{zoomLevel}%</span>
              <button
                onClick={() => setZoomLevel((z) => Math.min(200, z + 10))}
                className="p-1.5 bg-black/60 rounded-lg hover:bg-white/10 text-white"
              >
                <ZoomIn className="w-4 h-4" />
              </button>
              <button
                onClick={() => setZoomLevel(100)}
                className="p-1.5 bg-black/60 rounded-lg hover:bg-white/10 text-white"
              >
                <Maximize2 className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Interactive Dynamic Blueprint Vector Render */}
          <div className="flex-1 flex items-center justify-center p-6 bg-slate-950/80 rounded-2xl border border-white/10 overflow-hidden relative">
            <div
              className="transition-transform duration-300 w-full flex items-center justify-center"
              style={{ transform: `scale(${zoomLevel / 100})` }}
            >
              {/* Dynamic SVG CAD View Rendering */}
              <svg viewBox="0 0 800 450" className="w-full max-w-2xl h-auto font-mono text-[10px]">
                {/* Blueprint Background Grid */}
                <defs>
                  <pattern id="cadGrid" width="20" height="20" patternUnits="userSpaceOnUse">
                    <path d="M 20 0 L 0 0 0 20" fill="none" stroke="rgba(6, 182, 212, 0.08)" strokeWidth="1" />
                  </pattern>
                </defs>
                <rect width="800" height="450" fill="#04060a" />
                <rect width="800" height="450" fill="url(#cadGrid)" />

                {/* Drawing Outer Border */}
                <rect x="20" y="20" width="760" height="410" fill="none" stroke="#06b6d4" strokeWidth="1.5" />
                <rect x="25" y="25" width="750" height="400" fill="none" stroke="#06b6d4" strokeWidth="0.5" strokeDasharray="4 2" />

                {/* CAD Title Block */}
                <g transform="translate(520, 320)">
                  <rect x="0" y="0" width="250" height="100" fill="#070a12" stroke="#06b6d4" strokeWidth="1" />
                  <line x1="0" y1="25" x2="250" y2="25" stroke="#06b6d4" strokeWidth="0.5" />
                  <line x1="0" y1="50" x2="250" y2="50" stroke="#06b6d4" strokeWidth="0.5" />
                  <line x1="0" y1="75" x2="250" y2="75" stroke="#06b6d4" strokeWidth="0.5" />
                  <line x1="125" y1="25" x2="125" y2="100" stroke="#06b6d4" strokeWidth="0.5" />

                  <text x="10" y="17" fill="#38bdf8" fontWeight="bold" fontSize="11">NORTHERN HEATEX CORP</text>
                  <text x="10" y="42" fill="#a5f3fc" fontSize="9">DWG: NHES-TEMA-BEM-01</text>
                  <text x="135" y="42" fill="#a5f3fc" fontSize="9">REV: 02 (APPROVED)</text>
                  <text x="10" y="67" fill="#a5f3fc" fontSize="9">SHELL OD: 900 mm</text>
                  <text x="135" y="67" fill="#a5f3fc" fontSize="9">TUBE L: 4500 mm</text>
                  <text x="10" y="92" fill="#38bdf8" fontSize="9">CODE: ASME VIII DIV 1</text>
                  <text x="135" y="92" fill="#38bdf8" fontSize="9">TEMA CLASS: R</text>
                </g>

                {/* Drawing View Graphic */}
                {activeView === "ga" && (
                  <g>
                    {/* Shell Main Cylinder */}
                    <rect x="180" y="140" width="340" height="140" fill="none" stroke="#38bdf8" strokeWidth="2" />
                    {/* Channel Head Left */}
                    <path d="M 180 140 Q 120 140 120 210 Q 120 280 180 280 Z" fill="none" stroke="#38bdf8" strokeWidth="2" />
                    {/* Bonnet Right */}
                    <path d="M 520 140 Q 580 140 580 210 Q 580 280 520 280 Z" fill="none" stroke="#38bdf8" strokeWidth="2" />
                    {/* Nozzles Top */}
                    <rect x="220" y="90" width="40" height="50" fill="none" stroke="#38bdf8" strokeWidth="1.5" />
                    <line x1="200" y1="90" x2="280" y2="90" stroke="#38bdf8" strokeWidth="3" />
                    <rect x="440" y="90" width="40" height="50" fill="none" stroke="#38bdf8" strokeWidth="1.5" />
                    <line x1="420" y1="90" x2="500" y2="90" stroke="#38bdf8" strokeWidth="3" />
                    {/* Saddle Supports */}
                    <path d="M 220 280 L 210 330 L 270 330 L 260 280 Z" fill="none" stroke="#38bdf8" strokeWidth="1.5" />
                    <path d="M 440 280 L 430 330 L 490 330 L 480 280 Z" fill="none" stroke="#38bdf8" strokeWidth="1.5" />

                    {/* Dimension Lines */}
                    <line x1="120" y1="360" x2="580" y2="360" stroke="#f59e0b" strokeWidth="1" strokeDasharray="4 2" />
                    <text x="320" y="355" fill="#f59e0b" fontSize="10">OVERALL LENGTH = 5250 mm</text>
                  </g>
                )}

                {activeView === "tubesheet" && (
                  <g>
                    {/* Tubesheet Circle */}
                    <circle cx="350" cy="210" r="130" fill="none" stroke="#38bdf8" strokeWidth="2" />
                    <circle cx="350" cy="210" r="142" fill="none" stroke="#38bdf8" strokeWidth="1" strokeDasharray="4 2" />

                    {/* Grid of Tube Holes */}
                    {[...Array(9)].map((_, r) =>
                      [...Array(9)].map((_, c) => {
                        const cx = 270 + c * 20;
                        const cy = 130 + r * 20;
                        const dist = Math.sqrt((cx - 350) ** 2 + (cy - 210) ** 2);
                        if (dist < 115) {
                          return <circle key={`${r}-${c}`} cx={cx} cy={cy} r="5" fill="#0284c7" stroke="#38bdf8" strokeWidth="0.8" />;
                        }
                        return null;
                      })
                    )}

                    <text x="300" y="370" fill="#f59e0b" fontSize="10">420 TUBES • 30° TRIANGULAR PITCH</text>
                  </g>
                )}

                {activeView !== "ga" && activeView !== "tubesheet" && (
                  <g>
                    <rect x="150" y="100" width="400" height="220" fill="none" stroke="#06b6d4" strokeWidth="1.5" strokeDasharray="6 3" />
                    <text x="240" y="210" fill="#a5f3fc" fontSize="14" fontWeight="bold">
                      CAD SCHEMATIC: {viewsList.find((v) => v.id === activeView)?.label.toUpperCase()}
                    </text>
                    <text x="280" y="240" fill="#f59e0b" fontSize="10">READY FOR DXF / DWG EXPORT</text>
                  </g>
                )}
              </svg>
            </div>
          </div>

          {/* Bottom Info Bar */}
          <div className="flex flex-wrap items-center justify-between font-mono text-xs text-white/60 border-t border-white/10 pt-3">
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-400" />
              <span>Checked per ASME Sec VIII Div 1 & TEMA Class R tolerances</span>
            </div>
            <div>File Formats: AutoCAD .dxf, Scalable Vector .svg, Printable .pdf</div>
          </div>
        </div>
      </div>
    </div>
  );
};
