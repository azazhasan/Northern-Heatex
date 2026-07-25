import React from "react";
import { motion } from "motion/react";
import {
  Flame,
  ShieldCheck,
  Cpu,
  Globe,
  Award,
  Zap,
  CheckCircle2,
  ArrowRight,
  Gauge,
  Wrench,
  Sparkles,
  Layers,
  Factory,
  Compass,
} from "lucide-react";

interface CompanyOverviewProps {
  onNavigateToSection?: (pageId: string) => void;
}

export const CompanyOverviewSection: React.FC<CompanyOverviewProps> = ({ onNavigateToSection }) => {
  const capabilities = [
    {
      title: "Shell & Tube Heat Exchangers",
      desc: "Custom ASME Sec VIII Div 1 & TEMA Class R, C, B thermal units engineered for extreme pressure (>350 bar) and high temperatures (>850°C).",
      icon: Flame,
    },
    {
      title: "Heat Exchanger Refurbishment",
      desc: "Comprehensive retubing, tube bundle extraction, tubesheet re-facing, and ASME hydro-testing for thermal life extension.",
      icon: Wrench,
    },
    {
      title: "Tube Bundle Manufacturing",
      desc: "Precision CNC drilled baffle and tubesheet bundles engineered with orbital TIG tube-to-tubesheet strength welding.",
      icon: Layers,
    },
    {
      title: "Wire Wound Fin Tubes",
      desc: "High-efficiency spirally wound wire finned tubing providing up to 350% increased heat transfer surface area per meter.",
      icon: Cpu,
    },
    {
      title: "Strip Wound Fin Coolers",
      desc: "Rugged helical strip fin cooling exchangers designed for forced-draft air-cooled heat exchanger (ACHE) installations.",
      icon: Zap,
    },
    {
      title: "Stator Air Coolers",
      desc: "Heavy-duty hydro-generator and turbo-generator closed-loop stator frame air coolers with 100% leak integrity.",
      icon: Factory,
    },
    {
      title: "Bearing Oil Coolers",
      desc: "Compact, high-heat flux oil coolers for steam turbines, gas turbines, hydro turbines, and large industrial gearboxes.",
      icon: Gauge,
    },
    {
      title: "Surface Condensers",
      desc: "HEI standard steam surface condensers engineered for sub-atmospheric vacuum service in nuclear and fossil power plants.",
      icon: Compass,
    },
    {
      title: "Hydro Turbine Components",
      desc: "Precision hydro-plant components including wicket gate bushings, runner seal rings, and cooling jacket assemblies.",
      icon: ShieldCheck,
    },
    {
      title: "White Metal Bearing Re-Babbitting",
      desc: "Centrifugal cast ASTM B23 Grade 2 white metal Babbitt bearing liners with ultrasonic bond integrity testing.",
      icon: Award,
    },
    {
      title: "Reverse Engineering",
      desc: "3D laser scanning, alloy optical emission spectrometry (OES), and thermal re-design for obsolete OEM units.",
      icon: Sparkles,
    },
    {
      title: "Precision Machining & Performance",
      desc: "5-axis gantry CNC milling, deep-hole drilling, and AI-driven CFD flow channel optimization.",
      icon: Globe,
    },
  ];

  return (
    <div className="space-y-16">
      {/* PAGE 1: COMPANY OVERVIEW */}
      <section id="company-overview" className="relative">
        <div className="bg-gradient-to-br from-slate-900 via-slate-950 to-slate-900 border border-slate-800 rounded-3xl p-8 lg:p-12 shadow-2xl overflow-hidden">
          {/* Subtle Ambient Radial Glow */}
          <div className="absolute -top-24 -right-24 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-blue-600/10 rounded-full blur-3xl pointer-events-none" />

          <div className="relative z-10 space-y-8">
            <div className="flex flex-wrap items-center justify-between gap-4 border-b border-slate-800/80 pb-6">
              <div className="flex items-center gap-3">
                <span className="bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 text-xs font-mono px-3 py-1 rounded-full font-bold uppercase tracking-wider flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5" /> Corporate Dossier • Page 01
                </span>
                <span className="text-slate-500 text-xs font-mono">|</span>
                <span className="text-slate-400 text-xs font-mono">TPI Inspected • ASME VIII Div 1 & TEMA</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse" />
                <span className="text-xs font-mono text-emerald-400 font-bold uppercase tracking-widest">
                  Noor Engineering Works (Parent Company est. 1983)
                </span>
              </div>
            </div>

            <div className="max-w-4xl space-y-4">
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight leading-tight">
                Engineering Thermal Certainty • Noor Engineering Works (est. 1983)
              </h1>
              <p className="text-base sm:text-lg text-slate-300 font-light leading-relaxed">
                Founded on the 40-year legacy of parent enterprise <strong className="text-white">Noor Engineering Works (Established 1983)</strong>, Northern HeatEx Corporation was established by the next generation to serve private industrial clients and expand global export business. Headquartered in Haridwar, Uttarakhand, India, we manufacture, refurbish, and engineer high-pressure thermal heat transfer equipment under Third Party Inspection (TPI).
              </p>
            </div>

            {/* Core Capability Matrix Grid */}
            <div className="pt-6 space-y-6">
              <div className="flex items-center justify-between">
                <h3 className="text-xs font-mono font-bold uppercase tracking-widest text-cyan-400 flex items-center gap-2">
                  <Zap className="w-4 h-4 text-cyan-400" />
                  Specialized Industrial Product & Engineering Capabilities
                </h3>
                <span className="text-xs text-slate-500 font-mono">12 Core Divisions</span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {capabilities.map((cap, idx) => {
                  const IconComp = cap.icon;
                  return (
                    <motion.div
                      key={cap.title}
                      initial={{ opacity: 0, y: 15 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.3, delay: idx * 0.04 }}
                      className="bg-slate-900/80 border border-slate-800/80 hover:border-cyan-500/40 p-5 rounded-2xl group transition duration-300 hover:shadow-xl hover:shadow-cyan-950/40 flex flex-col justify-between"
                    >
                      <div className="space-y-3">
                        <div className="w-10 h-10 rounded-xl bg-slate-800/80 border border-slate-700/60 flex items-center justify-center text-cyan-400 group-hover:bg-cyan-500 group-hover:text-slate-950 transition duration-300">
                          <IconComp className="w-5 h-5" />
                        </div>
                        <h4 className="text-sm font-bold text-slate-100 group-hover:text-cyan-300 transition font-mono">
                          {cap.title}
                        </h4>
                        <p className="text-xs text-slate-400 leading-relaxed">
                          {cap.desc}
                        </p>
                      </div>

                      <div className="pt-4 border-t border-slate-800/60 mt-4 flex items-center justify-between text-[11px] font-mono text-slate-500 group-hover:text-cyan-400 transition">
                        <span>DIV-0{idx + 1} SPEC</span>
                        <CheckCircle2 className="w-3.5 h-3.5 text-cyan-500/70" />
                      </div>
                    </motion.div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* PAGE 2: OUR STORY */}
      <section id="our-story" className="relative">
        <div className="bg-slate-950 border border-slate-800 rounded-3xl p-8 lg:p-12 shadow-2xl space-y-10">
          <div className="flex flex-wrap items-center justify-between gap-4 border-b border-slate-800 pb-6">
            <div className="flex items-center gap-3">
              <span className="bg-blue-500/10 border border-blue-500/30 text-blue-400 text-xs font-mono px-3 py-1 rounded-full font-bold uppercase tracking-wider">
                Corporate Dossier • Page 02
              </span>
              <span className="text-slate-500 text-xs font-mono">|</span>
              <span className="text-slate-400 text-xs font-mono">Noor Engineering Works • Est. 1983</span>
            </div>
            <span className="text-xs font-mono text-cyan-400">Since 1983 • Government Sector Partner</span>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-7 space-y-6">
              <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
                Our Story: 40+ Years of Government & Industrial Engineering Excellence
              </h2>
              <div className="space-y-4 text-slate-300 text-sm leading-relaxed font-light">
                <p>
                  Established in 1983 as <strong className="text-white">Noor Engineering Works</strong>, our parent enterprise laid the foundation of precision mechanical engineering and heavy fabrication in Haridwar, Uttarakhand, serving as a trusted supplier for India's government sector, BHEL, State Electricity Boards, Railways, and PSUs.
                </p>
                <p>
                  Building on over four decades of foundational excellence, the next generation established and formed <strong className="text-white">Northern HeatEx Corporation</strong> to cater to private corporate clients, MNCs, process engineering sectors, and international export business.
                </p>
                <p>
                  Outfitted with heavy CNC deep-hole tubesheet drilling centers, automated orbital TIG welding stations, and high-pressure hydrostatic test bunkers in Jwalapur, Haridwar, Northern HeatEx Corporation carries forward this rich 1983 legacy under strict ASME VIII Div 1, TEMA, and Third Party Inspection (TPI) standards.
                </p>
              </div>

              <div className="grid grid-cols-3 gap-4 pt-4 border-t border-slate-800 font-mono">
                <div className="bg-slate-900/80 p-3.5 rounded-xl border border-slate-800">
                  <span className="text-2xl font-extrabold text-cyan-400 block">14,200+</span>
                  <span className="text-[11px] text-slate-400 uppercase tracking-wider block mt-1">Exchangers Installed</span>
                </div>
                <div className="bg-slate-900/80 p-3.5 rounded-xl border border-slate-800">
                  <span className="text-2xl font-extrabold text-cyan-400 block">99.8%</span>
                  <span className="text-[11px] text-slate-400 uppercase tracking-wider block mt-1">First-Pass Hydro Success</span>
                </div>
                <div className="bg-slate-900/80 p-3.5 rounded-xl border border-slate-800">
                  <span className="text-2xl font-extrabold text-cyan-400 block">38</span>
                  <span className="text-[11px] text-slate-400 uppercase tracking-wider block mt-1">Global Markets Served</span>
                </div>
              </div>
            </div>

            <div className="lg:col-span-5 bg-gradient-to-b from-slate-900 to-slate-950 p-6 rounded-2xl border border-slate-800 space-y-6">
              <h3 className="text-sm font-bold font-mono text-slate-200 uppercase tracking-wider flex items-center gap-2 border-b border-slate-800 pb-3">
                <Award className="w-4 h-4 text-cyan-400" />
                Foundational Pillars of Our Growth
              </h3>

              <ul className="space-y-4 font-mono text-xs">
                <li className="flex items-start gap-3">
                  <span className="w-5 h-5 rounded bg-cyan-950 border border-cyan-500/40 text-cyan-400 flex items-center justify-center font-bold shrink-0 mt-0.5">1</span>
                  <div>
                    <strong className="text-slate-100 block">Uncompromising ASME Integrity</strong>
                    <span className="text-slate-400 text-[11px]">Strict adherence to ASME Sec VIII Div 1 & TEMA Class R standards from raw ingot to final hydro-test.</span>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <span className="w-5 h-5 rounded bg-cyan-950 border border-cyan-500/40 text-cyan-400 flex items-center justify-center font-bold shrink-0 mt-0.5">2</span>
                  <div>
                    <strong className="text-slate-100 block">Rapid Emergency Turnaround</strong>
                    <span className="text-slate-400 text-[11px]">Dedicated 24/7 emergency response unit for unscheduled plant shutdown retubing and bundle delivery.</span>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <span className="w-5 h-5 rounded bg-cyan-950 border border-cyan-500/40 text-cyan-400 flex items-center justify-center font-bold shrink-0 mt-0.5">3</span>
                  <div>
                    <strong className="text-slate-100 block">AI & Digital Twin Integration</strong>
                    <span className="text-slate-400 text-[11px]">Next-generation predictive modeling for thermal fouling, acoustic resonance, and vibration prevention.</span>
                  </div>
                </li>
              </ul>

              {onNavigateToSection && (
                <button
                  onClick={() => onNavigateToSection("timeline")}
                  className="w-full bg-slate-800 hover:bg-slate-700 text-cyan-300 font-mono text-xs font-bold py-2.5 rounded-xl border border-slate-700 flex items-center justify-center gap-2 transition"
                >
                  <span>Explore 48-Year Interactive Corporate Timeline</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              )}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
