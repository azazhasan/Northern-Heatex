import React, { useState } from "react";
import { 
  Zap, Flame, Shield, Factory, FlaskConical, Droplet, FileText, Utensils, Anchor, Activity, ArrowRight 
} from "lucide-react";

export interface IndustryItem {
  id: string;
  name: string;
  desc: string;
  equipment: string;
  pressure: string;
  tempRange: string;
  icon: any;
}

export const INDUSTRIES_LIST: IndustryItem[] = [
  {
    id: "hydroelectric",
    name: "Hydroelectric Power",
    desc: "Guide bearing oil coolers, thrust bearing oil coolers, runner hub cooling, and generator stator coolers.",
    equipment: "Submerged & Shell-and-Tube Oil Coolers",
    pressure: "Up to 40 Bar",
    tempRange: "10°C to 80°C",
    icon: Zap,
  },
  {
    id: "thermal-power",
    name: "Thermal Power Plants",
    desc: "Main turbine steam surface condensers, feedwater heaters, gland steam condensers, and turbine oil coolers.",
    equipment: "HEI Surface Condensers & High-Pressure Feedwater Heaters",
    pressure: "Full Vacuum to 250 Bar",
    tempRange: "-20°C to +580°C",
    icon: Flame,
  },
  {
    id: "nuclear",
    name: "Nuclear Power Generation",
    desc: "Safety-related auxiliary heat exchangers, component cooling water (CCW) exchangers, and stator cooling systems.",
    equipment: "ASME Section III Coded Exchangers & Titanium Plate/Shell",
    pressure: "150 Bar",
    tempRange: " cryogenic to +350°C",
    icon: Shield,
  },
  {
    id: "steel",
    name: "Steel & Metallurgy",
    desc: "Blast furnace cooling plates, rolling mill hydraulic oil coolers, and continuous caster heat transfer.",
    equipment: "Heavy Duty Wire-Wound Oil Coolers",
    pressure: "100 Bar",
    tempRange: "0°C to +400°C",
    icon: Factory,
  },
  {
    id: "chemical",
    name: "Chemical & Petrochemical",
    desc: "Corrosive acid coolers, reactor jacket fluid exchangers, chlorine vaporizers, and solvent recovery condensers.",
    equipment: "Haselloy, Inconel & Duplex Stainless Exchangers",
    pressure: "Up to 300 Bar",
    tempRange: "-100°C to +650°C",
    icon: FlaskConical,
  },
  {
    id: "oil-gas",
    name: "Oil & Gas Refineries",
    desc: "Crude distillation unit (CDU) preheat trains, amine reboilers, hydrocracker high-pressure gas coolers, and API 660 units.",
    equipment: "TEMA Class R Heavy Petroleum Exchangers",
    pressure: "Up to 350 Bar",
    tempRange: "-50°C to +550°C",
    icon: Droplet,
  },
  {
    id: "paper",
    name: "Paper & Pulp Mills",
    desc: "Black liquor evaporators, digester liquor heaters, blow heat recovery steam condensers, and dryer hood heat recovery.",
    equipment: "Titanium & 316L Stainless Tube Bundles",
    pressure: "30 Bar",
    tempRange: "20°C to +220°C",
    icon: FileText,
  },
  {
    id: "sugar",
    name: "Sugar Refining",
    desc: "Juice heaters, multi-effect evaporators, vacuum pans, and molasses massecuite heating equipment.",
    equipment: "Brass & Stainless Tubular Evaporator Bundles",
    pressure: "15 Bar",
    tempRange: "30°C to +150°C",
    icon: Activity,
  },
  {
    id: "marine",
    name: "Marine Engineering",
    desc: "Main engine jacket water coolers, marine lube oil coolers, central freshwater coolers, and bow thruster oil units.",
    equipment: "Cu-Ni 90/10 Seawater Shell & Tube Exchangers",
    pressure: "25 Bar",
    tempRange: "5°C to +110°C",
    icon: Anchor,
  },
  {
    id: "food-pharma",
    name: "Food & Pharmaceutical",
    desc: "Sanitary double tubesheet heat exchangers, WFI (Water-for-Injection) heaters, and pasteurization heating.",
    equipment: "Sanitary 316L Electropolished ASME BPE Exchangers",
    pressure: "20 Bar",
    tempRange: "-10°C to +160°C",
    icon: Utensils,
  },
];

export const ClientIndustriesSection: React.FC = () => {
  const [activeIndustry, setActiveIndustry] = useState<IndustryItem>(INDUSTRIES_LIST[0]);

  return (
    <section id="industries" className="py-20 bg-[#050505] text-white border-t border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        {/* Header */}
        <div className="flex flex-wrap items-end justify-between gap-6 border-b border-white/10 pb-6">
          <div className="max-w-2xl space-y-2">
            <span className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-950/80 border border-blue-500/30 text-cyan-300 text-xs font-mono font-bold uppercase tracking-wider glow-blue">
              <Factory className="w-3.5 h-3.5 text-cyan-400" />
              Section 6 • Global Market Sectors
            </span>

            <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight">
              Tailored Engineering for{" "}
              <span className="bg-gradient-to-r from-cyan-400 via-blue-400 to-indigo-300 bg-clip-text text-transparent">
                Critical Industries
              </span>
            </h2>
          </div>

          <p className="text-xs font-mono text-white/50 max-w-sm">
            Select an industry below to view specialized heat exchanger geometries and operating specs.
          </p>
        </div>

        {/* Industry Grid Buttons */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3 font-mono text-xs">
          {INDUSTRIES_LIST.map((ind) => {
            const Icon = ind.icon;
            const isSelected = activeIndustry.id === ind.id;
            return (
              <button
                key={ind.id}
                onClick={() => setActiveIndustry(ind)}
                className={`p-4 rounded-xl border flex flex-col items-center text-center gap-3 transition duration-300 cursor-pointer ${
                  isSelected
                    ? "bg-blue-600 text-white border-blue-400 shadow-2xl glow-blue font-bold scale-105"
                    : "bg-[#0a0a0a] text-white/70 border-white/10 hover:bg-white/5 hover:text-white hover:border-white/20"
                }`}
              >
                <Icon className={`w-6 h-6 ${isSelected ? "text-white" : "text-cyan-400"}`} />
                <span className="text-[11px] leading-tight">{ind.name}</span>
              </button>
            );
          })}
        </div>

        {/* Selected Industry Spec Sheet Panel */}
        <div className="bg-[#0a0a0a] border border-cyan-500/30 rounded-2xl p-6 sm:p-8 space-y-6 shadow-2xl">
          <div className="flex flex-wrap items-center justify-between gap-4 border-b border-white/10 pb-4">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-xl bg-blue-950 border border-blue-500/40 flex items-center justify-center text-cyan-400 glow-cyan">
                {React.createElement(activeIndustry.icon, { className: "w-6 h-6" })}
              </div>
              <div>
                <h3 className="text-xl font-extrabold text-white">{activeIndustry.name}</h3>
                <p className="text-xs font-mono text-cyan-400">Target Industry Profile</p>
              </div>
            </div>

            <span className="px-3 py-1 bg-cyan-950 text-cyan-300 border border-cyan-700/60 rounded text-xs font-mono font-bold uppercase">
              ASME Coded Solution Available
            </span>
          </div>

          <p className="text-sm text-white/80 leading-relaxed font-sans">
            {activeIndustry.desc}
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 font-mono text-xs">
            <div className="bg-[#050505] p-4 rounded-xl border border-white/5 space-y-1">
              <span className="text-white/40 uppercase text-[10px]">Primary Equipment Geometry</span>
              <div className="text-sm font-bold text-cyan-300">{activeIndustry.equipment}</div>
            </div>

            <div className="bg-[#050505] p-4 rounded-xl border border-white/5 space-y-1">
              <span className="text-white/40 uppercase text-[10px]">Operating Pressure Limit</span>
              <div className="text-sm font-bold text-white">{activeIndustry.pressure}</div>
            </div>

            <div className="bg-[#050505] p-4 rounded-xl border border-white/5 space-y-1">
              <span className="text-white/40 uppercase text-[10px]">Temperature Operating Range</span>
              <div className="text-sm font-bold text-cyan-400">{activeIndustry.tempRange}</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
