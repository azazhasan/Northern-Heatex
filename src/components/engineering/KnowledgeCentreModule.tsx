import React, { useState } from "react";
import {
  BookOpen,
  Search,
  FileText,
  Bookmark,
  ShieldCheck,
  ChevronRight,
  Zap,
  Cpu,
  Layers,
  Flame,
} from "lucide-react";

export const KnowledgeCentreModule: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedStandard, setSelectedStandard] = useState<string>("TEMA Class R");

  const standardsList = [
    {
      title: "TEMA Class R Standards",
      code: "TEMA Class R (10th Ed)",
      category: "Equipment Classification",
      desc: "Severe duty requirements for petroleum, chemical, and heavy industrial applications.",
      keyClauses: [
        "Minimum Tubesheet Thickness = 0.875 inches (22.2 mm)",
        "Tube pitch minimum clearance = 0.25 x Tube OD",
        "Corrosion Allowance standard = 3.2 mm (1/8 in) for carbon steel parts",
        "Baffle plate thickness minimum = 9.5 mm for shell diameters > 750 mm",
      ],
    },
    {
      title: "ASME Sec VIII Div 1 UG-27",
      code: "ASME UG-27 (Shell Thickness)",
      category: "Mechanical Code",
      desc: "Formula for circumferential stress shell thickness under internal pressure.",
      keyClauses: [
        "Formula: t = (P * R) / (S * E - 0.6 * P) + C",
        "P = Design Pressure (MPa), R = Inside Radius (mm)",
        "S = Allowable Stress (MPa), E = Joint Efficiency (1.0 for 100% RT)",
        "C = Corrosion Allowance (mm)",
      ],
    },
    {
      title: "API 660 / ISO 16812",
      code: "API 660 (Shell-and-Tube Exchangers)",
      category: "Refinery Standards",
      desc: "Specific design rules for refinery service heat exchangers.",
      keyClauses: [
        "Full diameter removable bundle requirement for floating head exchangers",
        "Minimum nozzle rating = ANSI 150# RFWN",
        "Pass partition plate minimum thickness = 9.5 mm (3/8 in)",
      ],
    },
    {
      title: "HEI Standards for Condensers",
      code: "HEI Condenser Standards",
      category: "Power Generation",
      desc: "Heat Exchange Institute rules for steam turbine surface condensers.",
      keyClauses: [
        "Heat duty sizing for steam surface condensation at vacuum pressures",
        "Air removal system sizing and non-condensable gas extraction",
      ],
    },
  ];

  const filteredStandards = standardsList.filter(
    (s) =>
      s.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      s.code.toLowerCase().includes(searchQuery.toLowerCase()) ||
      s.desc.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="space-y-8 animate-fadeIn">
      {/* Header Banner */}
      <div className="relative bg-gradient-to-br from-[#070a12] via-[#05070d] to-[#0c101d] border border-cyan-500/30 rounded-3xl p-8 shadow-2xl overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-3 max-w-3xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-950 text-cyan-400 border border-cyan-500/40 text-xs font-mono font-bold uppercase">
              <BookOpen className="w-3.5 h-3.5 text-cyan-400" /> Engineering Knowledge Centre (Module 13)
            </div>

            <h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
              TEMA, ASME & API Standards Library
            </h1>

            <p className="text-sm text-cyan-200/80 font-normal leading-relaxed">
              Authoritative engineering reference library covering TEMA Class R, C & B specifications, ASME Section VIII Div 1 & 2 formulas, API 660, HEI guidelines, and material allowable stress tables.
            </p>
          </div>
        </div>
      </div>

      {/* Search Bar */}
      <div className="bg-[#080a0f] border border-white/10 rounded-2xl p-6">
        <div className="relative">
          <Search className="w-4 h-4 text-white/40 absolute left-3.5 top-3.5" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search standards clauses, formulas (e.g., UG-27, TEMA pitch, API 660)..."
            className="w-full bg-slate-900 border border-white/15 rounded-xl pl-10 pr-4 py-2.5 text-xs text-white placeholder-white/40 font-mono focus:border-cyan-400 focus:outline-none"
          />
        </div>
      </div>

      {/* Standards Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {filteredStandards.map((std, idx) => (
          <div
            key={idx}
            className="bg-[#080a0f] border border-white/10 hover:border-cyan-500/50 rounded-3xl p-6 space-y-4 transition shadow-xl"
          >
            <div className="flex items-center justify-between font-mono text-xs">
              <span className="px-2.5 py-0.5 bg-cyan-950 text-cyan-300 border border-cyan-500/30 rounded font-bold uppercase">
                {std.category}
              </span>
              <span className="text-white/40 text-[10px]">{std.code}</span>
            </div>

            <h3 className="text-xl font-bold text-white">{std.title}</h3>
            <p className="text-xs text-white/60 leading-relaxed font-mono">{std.desc}</p>

            <div className="pt-3 border-t border-white/10 space-y-2 font-mono text-xs">
              <strong className="text-amber-400 text-[11px] uppercase block">Mandatory Code Rules:</strong>
              <ul className="space-y-1 text-white/80">
                {std.keyClauses.map((clause, cIdx) => (
                  <li key={cIdx} className="flex items-start gap-2 text-[11px]">
                    <span className="text-cyan-400 font-bold">•</span>
                    <span>{clause}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
