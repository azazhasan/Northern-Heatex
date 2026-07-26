import React from "react";
import { motion } from "motion/react";
import {
  Globe2,
  Building2,
  CheckCircle2,
  Award,
  Sparkles,
  Zap,
} from "lucide-react";

export const GlobalVisionAndPartnershipsSection: React.FC = () => {
  const indianUtilities = [
    {
      name: "NHPC Ltd",
      fullName: "National Hydroelectric Power Corporation",
      role: "Premier Hydro Power Partner",
      desc: "Supplier of stator air coolers, bearing oil coolers, and retubing services for major hydro power stations.",
    },
    {
      name: "UJVN Ltd",
      fullName: "Uttarakhand Jal Vidyut Nigam Limited",
      role: "State Hydro Infrastructure Partner",
      desc: "Turnkey fabrication and overhaul of generator cooling systems for hydro generation stations in Uttarakhand.",
    },
    {
      name: "THDC Ltd",
      fullName: "THDC India Limited",
      role: "Thermal & Hydro Power Partner",
      desc: "High-pressure heat exchangers and custom replacement tube bundles for multi-MW power complexes.",
    },
    {
      name: "BBMB",
      fullName: "Bhakra Beas Management Board",
      role: "Hydro Utility Engineering Partner",
      desc: "Manufacturing and refurbishing heavy-duty generator air coolers and oil cooling units.",
    },
    {
      name: "NPCIL Ltd",
      fullName: "Nuclear Power Corporation of India Limited",
      role: "Nuclear & Clean Energy Partner",
      desc: "Quality-assured heat transfer equipment manufactured under strict Third Party Inspection.",
    },
  ];

  return (
    <div className="space-y-16">
      {/* GLOBAL VISION ARTICLE */}
      <section id="global-vision" className="relative">
        <div className="bg-gradient-to-br from-slate-900 via-slate-950 to-slate-900 border border-slate-800 rounded-3xl p-8 lg:p-12 shadow-2xl space-y-8">
          <div className="flex items-center justify-between border-b border-slate-800 pb-4">
            <div className="flex items-center gap-3">
              <span className="bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 text-xs font-mono px-3 py-1 rounded-full font-bold uppercase tracking-wider flex items-center gap-1.5">
                <Globe2 className="w-3.5 h-3.5" /> Corporate Vision & Ambition
              </span>
              <span className="text-slate-500 text-xs font-mono">|</span>
              <span className="text-slate-400 text-xs font-mono">From Haridwar to the World</span>
            </div>
            <span className="text-xs font-mono text-cyan-400 font-bold">1983 — 2026+ Legacy</span>
          </div>

          <div className="max-w-4xl space-y-6">
            <h1 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight leading-tight">
              Expanding 40+ Years of Engineering Legacy into a Global Force
            </h1>

            <div className="space-y-4 text-slate-300 text-sm sm:text-base font-light leading-relaxed">
              <p>
                In 1983, <strong className="text-white">Noor Engineering Works</strong> began its journey in Haridwar, Uttarakhand, driven by a singular commitment: delivering uncompromised mechanical engineering and precision fabrication for India's crucial power generation and public sector infrastructure. For over four decades, our foundational craftsmanship earned the trust of India's esteemed power utilities, state electricity boards, and major government organizations.
              </p>
              <p>
                Building upon this rock-solid heritage, <strong className="text-white">Northern HeatEx Corporation</strong> was formed in 2025 as our next-generation enterprise. Our mission is to take four decades of Indian engineering mastery and expand it onto the global stage. We are scaling our manufacturing footprint at <strong className="text-white">Works Facility at Haridwar</strong> with high-end CNC machining, automated TIG welding, and international quality management standards (ISO 9001:2015 & ISO 14001:2025).
              </p>
              <p>
                As global industries transition toward cleaner power generation, energy efficiency, and high-performance process heat recovery, Northern HeatEx Corporation is uniquely positioned. We combine deep technical expertise with rapid agility, offering global clients custom-engineered heat transfer equipment that meets strict National and International standards with full Third Party Inspection (TPI) clearance.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-6 border-t border-slate-800 font-mono text-xs">
              <div className="bg-slate-900/80 p-4 rounded-xl border border-slate-800">
                <span className="text-xs text-cyan-400 font-bold uppercase block">Core Origin</span>
                <span className="text-white font-extrabold text-base block mt-1">Noor Engineering Works (1983)</span>
                <span className="text-slate-400 text-[11px] block mt-0.5">Foundational Craftsmen</span>
              </div>
              <div className="bg-slate-900/80 p-4 rounded-xl border border-slate-800">
                <span className="text-xs text-cyan-400 font-bold uppercase block">Global Identity</span>
                <span className="text-white font-extrabold text-base block mt-1">Northern HeatEx Corp (2025)</span>
                <span className="text-slate-400 text-[11px] block mt-0.5">Global Expansion Entity</span>
              </div>
              <div className="bg-slate-900/80 p-4 rounded-xl border border-slate-800">
                <span className="text-xs text-cyan-400 font-bold uppercase block">Execution Hub</span>
                <span className="text-white font-extrabold text-base block mt-1">Works Facility at Haridwar</span>
                <span className="text-slate-400 text-[11px] block mt-0.5">Uttarakhand, India</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* POWER GENERATION & UTILITIES CLIENTS */}
      <section id="power-generation-partners" className="relative">
        <div className="bg-slate-950 border border-slate-800 rounded-3xl p-8 lg:p-12 shadow-2xl space-y-8">
          <div className="flex flex-wrap items-center justify-between gap-4 border-b border-slate-800 pb-4">
            <div className="flex items-center gap-3">
              <span className="bg-blue-500/10 border border-blue-500/30 text-blue-400 text-xs font-mono px-3 py-1 rounded-full font-bold uppercase tracking-wider">
                Power Generation & Utilities
              </span>
              <span className="text-slate-500 text-xs font-mono">|</span>
              <span className="text-slate-400 text-xs font-mono">Trusted Indian Power PSUs & Organizations</span>
            </div>
            <Award className="w-5 h-5 text-cyan-400" />
          </div>

          <div className="space-y-4">
            <h2 className="text-2xl font-bold text-white tracking-tight">
              Key Indian Power Generation & Government Utility Partners
            </h2>
            <p className="text-slate-400 text-sm font-light leading-relaxed">
              Serving India's flagship hydro, thermal, and nuclear power utilities with custom heat exchangers, stator air coolers, and emergency outage services.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {indianUtilities.map((partner) => (
              <div
                key={partner.name}
                className="bg-slate-900/90 border border-slate-800 hover:border-cyan-500/40 p-6 rounded-2xl space-y-3 group transition duration-300"
              >
                <div className="flex items-center justify-between border-b border-slate-800/80 pb-3">
                  <span className="text-lg font-black font-mono text-cyan-300 tracking-wider">
                    {partner.name}
                  </span>
                  <span className="px-2.5 py-1 bg-cyan-950 text-cyan-400 text-[10px] font-mono font-bold rounded border border-cyan-500/30">
                    PSU Partner
                  </span>
                </div>
                <h4 className="text-xs font-bold text-slate-200 font-mono">{partner.fullName}</h4>
                <p className="text-xs text-slate-400 leading-relaxed font-sans">{partner.desc}</p>
                <div className="pt-2 flex items-center gap-1.5 text-[11px] font-mono text-cyan-400">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  <span>{partner.role}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};
