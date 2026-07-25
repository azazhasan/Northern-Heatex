import React from "react";
import { motion } from "motion/react";
import {
  Leaf,
  Heart,
  Globe2,
  Recycle,
  GraduationCap,
  Trees,
  CheckCircle2,
  Sparkles,
  Zap,
  Building2,
  Award,
} from "lucide-react";

export const SustainabilityAndCSRSection: React.FC = () => {
  return (
    <div className="space-y-16">
      {/* PAGE 11: SUSTAINABILITY */}
      <section id="sustainability" className="relative">
        <div className="bg-gradient-to-br from-slate-900 via-slate-950 to-slate-900 border border-slate-800 rounded-3xl p-8 lg:p-12 shadow-2xl space-y-8">
          <div className="flex items-center justify-between border-b border-slate-800 pb-4">
            <div className="flex items-center gap-3">
              <span className="bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-mono px-3 py-1 rounded-full font-bold uppercase tracking-wider">
                Corporate Dossier • Page 11
              </span>
              <span className="text-slate-500 text-xs font-mono">|</span>
              <span className="text-slate-400 text-xs font-mono">Green Engineering & Industrial Decarbonization</span>
            </div>
            <Leaf className="w-5 h-5 text-emerald-400" />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-7 space-y-4">
              <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
                Decarbonizing Global Process Industries Through Heat Recovery
              </h2>
              <p className="text-sm text-slate-300 leading-relaxed font-light">
                Industrial heat exchangers are the unsung champions of clean energy transition. By recapturing high-grade waste thermal energy from power generation, steam surface condensers, and chemical process streams, Northern HeatEx equipment directly eliminates millions of tons of fossil fuel combustion annually.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2 font-mono text-xs">
                <div className="bg-slate-900/80 p-4 rounded-xl border border-slate-800 space-y-2">
                  <Recycle className="w-5 h-5 text-emerald-400" />
                  <h4 className="font-bold text-slate-100">Lifecycle Asset Extension</h4>
                  <p className="text-slate-400 font-sans">
                    Refurbishing and retubing existing shell structures reduces raw steel consumption by 75% compared to scrap-and-replace alternatives.
                  </p>
                </div>

                <div className="bg-slate-900/80 p-4 rounded-xl border border-slate-800 space-y-2">
                  <Trees className="w-5 h-5 text-emerald-400" />
                  <h4 className="font-bold text-slate-100">Green Facility Operations</h4>
                  <p className="text-slate-400 font-sans">
                    100% of shopfloor coolant fluids and cutting oils are recycled via closed-loop centrifugal filtration systems.
                  </p>
                </div>
              </div>
            </div>

            <div className="lg:col-span-5 bg-slate-950 p-6 rounded-2xl border border-slate-800 font-mono text-xs space-y-4">
              <h3 className="text-slate-200 font-bold uppercase tracking-wider border-b border-slate-800 pb-2">
                Annual Environmental Impact
              </h3>

              <div className="space-y-3">
                <div className="bg-slate-900 p-3 rounded border border-slate-800">
                  <span className="text-slate-500 text-[10px] block">FLUE GAS HEAT RECOVERY</span>
                  <span className="text-xl font-bold text-emerald-400">4.8 Terawatt-Hours</span>
                  <span className="text-slate-400 text-[11px] block mt-0.5">Recaptured thermal energy per year</span>
                </div>

                <div className="bg-slate-900 p-3 rounded border border-slate-800">
                  <span className="text-slate-500 text-[10px] block">AVOIDED GREENHOUSE GAS</span>
                  <span className="text-xl font-bold text-emerald-400">1.2 Million Tons CO₂e</span>
                  <span className="text-slate-400 text-[11px] block mt-0.5">Equivalent to taking 260,000 cars off the road</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* PAGE 17: CORPORATE SOCIAL RESPONSIBILITY (CSR) */}
      <section id="csr" className="relative">
        <div className="bg-slate-950 border border-slate-800 rounded-3xl p-8 lg:p-12 shadow-2xl space-y-8">
          <div className="flex items-center justify-between border-b border-slate-800 pb-4">
            <div className="flex items-center gap-3">
              <span className="bg-pink-500/10 border border-pink-500/30 text-pink-400 text-xs font-mono px-3 py-1 rounded-full font-bold uppercase tracking-wider">
                Corporate Dossier • Page 17
              </span>
              <span className="text-slate-500 text-xs font-mono">|</span>
              <span className="text-slate-400 text-xs font-mono">Engineering Education & Community Stewardship</span>
            </div>
            <Heart className="w-5 h-5 text-pink-400" />
          </div>

          <div className="max-w-3xl space-y-3">
            <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
              Corporate Social Responsibility & Education Endowments
            </h2>
            <p className="text-slate-300 text-sm font-light leading-relaxed">
              We believe engineering leadership carries a responsibility to uplift future generations. Northern HeatEx sponsors thermal physics research, funds university STEM scholarships, and provides free technical apprenticeships in precision machining and ASME welding.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 font-mono text-xs pt-2">
            <div className="bg-slate-900/80 p-5 rounded-2xl border border-slate-800 space-y-3">
              <GraduationCap className="w-6 h-6 text-pink-400" />
              <h4 className="text-sm font-bold text-slate-100">STEM University Chair Endowments</h4>
              <p className="text-slate-400 font-sans leading-relaxed">
                Endowing the Northern HeatEx Chair in Thermal Physics at top engineering institutions to advance next-generation heat exchange science.
              </p>
            </div>

            <div className="bg-slate-900/80 p-5 rounded-2xl border border-slate-800 space-y-3">
              <Award className="w-6 h-6 text-pink-400" />
              <h4 className="text-sm font-bold text-slate-100">ASME Welder Apprentice Academy</h4>
              <p className="text-slate-400 font-sans leading-relaxed">
                Paid 3-year apprenticeship program training young technicians in orbital TIG welding, Super Duplex metallurgy, and NDE inspection.
              </p>
            </div>

            <div className="bg-slate-900/80 p-5 rounded-2xl border border-slate-800 space-y-3">
              <Globe2 className="w-6 h-6 text-pink-400" />
              <h4 className="text-sm font-bold text-slate-100">Community Clean Water Infrastructure</h4>
              <p className="text-slate-400 font-sans leading-relaxed">
                Donating surface water heat exchanger cooling units to remote arctic and coastal drinking water desalination plants.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
