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

export const CompanyOverviewSection: React.FC<CompanyOverviewProps> = () => {
  const capabilities = [
    {
      title: "Shell & Tube Heat Exchangers",
      desc: "Custom thermal units engineered for heavy industrial duty and high pressure/temperature process applications under Third Party Inspection.",
      icon: Flame,
    },
    {
      title: "Heat Exchanger Refurbishment",
      desc: "Comprehensive retubing, tube bundle extraction, tubesheet re-facing, and hydrostatic testing for complete thermal life extension.",
      icon: Wrench,
    },
    {
      title: "Tube Bundle Manufacturing",
      desc: "Precision CNC drilled baffle and tubesheet bundles engineered with automated TIG tube-to-tubesheet strength welding.",
      icon: Layers,
    },
    {
      title: "Wire Wound Fin Tubes",
      desc: "High-efficiency spirally wound wire finned tubing providing significantly increased heat transfer surface area per meter.",
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
      desc: "Compact, high-heat flux oil coolers for steam turbines, hydro turbines, and large industrial gearboxes.",
      icon: Gauge,
    },
    {
      title: "Surface Condensers",
      desc: "HEI standard steam surface condensers engineered for sub-atmospheric vacuum service in hydro and thermal power stations.",
      icon: Compass,
    },
    {
      title: "Hydro Turbine Components",
      desc: "Precision hydro-plant components including wicket gate bushings, runner seal rings, and cooling jacket assemblies.",
      icon: ShieldCheck,
    },
    {
      title: "White Metal Bearing Re-Babbitting",
      desc: "ASTM B23 white metal Babbitt re-lining for Turbine Guide pads, Upper guide pads, Lower guide pads, and Thrust Pads with 100% bonding and defect free surface.",
      icon: Award,
    },
    {
      title: "Precision Machining & Performance",
      desc: "Use of high end CNC machining and other high end precise machinery for deep-hole drilling and custom fabrication.",
      icon: Globe,
    },
  ];

  return (
    <div className="space-y-16">
      {/* PAGE 1: COMPANY OVERVIEW */}
      <section id="company-overview" className="relative">
        <div className="bg-gradient-to-br from-slate-900 via-slate-950 to-slate-900 border border-slate-800 rounded-3xl p-8 lg:p-12 shadow-2xl overflow-hidden">
          <div className="absolute -top-24 -right-24 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-blue-600/10 rounded-full blur-3xl pointer-events-none" />

          <div className="relative z-10 space-y-8">
            <div className="flex flex-wrap items-center justify-between gap-4 border-b border-slate-800/80 pb-6">
              <div className="flex items-center gap-3">
                <span className="bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 text-xs font-mono px-3 py-1 rounded-full font-bold uppercase tracking-wider flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5" /> Corporate Profile
                </span>
                <span className="text-slate-500 text-xs font-mono">|</span>
                <span className="text-slate-400 text-xs font-mono">TPI Inspected • ISO 9001:2015 & ISO 14001:2025</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse" />
                <span className="text-xs font-mono text-emerald-400 font-bold uppercase tracking-widest">
                  Works Facility at Haridwar
                </span>
              </div>
            </div>

            <div className="max-w-4xl space-y-4">
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight leading-tight">
                Engineering Thermal Certainty • Legacy 1983 to 2026+
              </h1>
              <p className="text-base sm:text-lg text-slate-300 font-light leading-relaxed">
                Building on the foundational heritage of parent enterprise <strong className="text-white">Noor Engineering Works (Established 1983)</strong>, <strong className="text-white">Northern HeatEx Corporation</strong> was formed in 2025 to expand global operations. Located at our <strong className="text-white">Works Facility at Haridwar</strong>, Uttarakhand, India, we manufacture, refurbish, and engineer thermal equipment under strict National and International standard procedures and Third Party Inspection (TPI) for government PSUs (NHPC Ltd, THDC Ltd, UJVNL, NPCIL, BBMB) and global industrial clients.
              </p>
            </div>

            {/* Core Capability Matrix Grid */}
            <div className="pt-6 space-y-6">
              <div className="flex items-center justify-between">
                <h3 className="text-xs font-mono font-bold uppercase tracking-widest text-cyan-400 flex items-center gap-2">
                  <Zap className="w-4 h-4 text-cyan-400" />
                  Specialized Industrial Product & Engineering Capabilities
                </h3>
                <span className="text-xs text-slate-500 font-mono">11 Core Divisions</span>
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
                Our Heritage & Story
              </span>
              <span className="text-slate-500 text-xs font-mono">|</span>
              <span className="text-slate-400 text-xs font-mono">Noor Engineering Works • Est. 1983</span>
            </div>
            <span className="text-xs font-mono text-cyan-400">Since 1983 to 2026+ • Government PSU Partner</span>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-7 space-y-6">
              <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
                Our Story: Legacy from 1983 to 2026+
              </h2>
              <div className="space-y-4 text-slate-300 text-sm leading-relaxed font-light">
                <p>
                  Established in 1983 as <strong className="text-white">Noor Engineering Works</strong>, our parent enterprise laid the foundation of precision mechanical engineering and heavy fabrication in Haridwar, Uttarakhand, serving as a trusted supplier for India's government sector, State Electricity Boards, Railways, and government PSUs like <strong className="text-white">NHPC Ltd, THDC Ltd, BBMB, UJVNL, NPCIL</strong>, and other major organizations.
                </p>
                <p>
                  Building on over four decades of foundational excellence, <strong className="text-white">Northern HeatEx Corporation</strong> was formed in 2025 to expand operations globally and serve private corporate accounts and international clients.
                </p>
                <p>
                  Outfitted with high-end CNC deep-hole tubesheet drilling machinery, automated TIG welding stations, and high-pressure hydrostatic test facilities at our <strong className="text-white">Works Facility at Haridwar</strong>, Northern HeatEx Corporation carries forward this rich legacy under strict National and International standard procedures and Third Party Inspection (TPI).
                </p>
              </div>

              <div className="grid grid-cols-3 gap-4 pt-4 border-t border-slate-800 font-mono">
                <div className="bg-slate-900/80 p-3.5 rounded-xl border border-slate-800">
                  <span className="text-2xl font-extrabold text-cyan-400 block">4,000+</span>
                  <span className="text-[11px] text-slate-400 uppercase tracking-wider block mt-1">Global Projects Completed</span>
                </div>
                <div className="bg-slate-900/80 p-3.5 rounded-xl border border-slate-800">
                  <span className="text-2xl font-extrabold text-cyan-400 block">99.8%</span>
                  <span className="text-[11px] text-slate-400 uppercase tracking-wider block mt-1">First-Pass Hydro Success</span>
                </div>
                <div className="bg-slate-900/80 p-3.5 rounded-xl border border-slate-800">
                  <span className="text-2xl font-extrabold text-cyan-400 block">1983-2026+</span>
                  <span className="text-[11px] text-slate-400 uppercase tracking-wider block mt-1">Engineering Heritage</span>
                </div>
              </div>
            </div>

            <div className="lg:col-span-5 bg-gradient-to-b from-slate-900 to-slate-950 p-6 rounded-2xl border border-slate-800 space-y-6">
              <h3 className="text-sm font-bold font-mono text-slate-200 uppercase tracking-wider flex items-center gap-2 border-b border-slate-800 pb-3">
                <Award className="w-4 h-4 text-cyan-400" />
                Pillars of Our Engineering Excellence
              </h3>

              <ul className="space-y-4 font-mono text-xs">
                <li className="flex items-start gap-3">
                  <span className="w-5 h-5 rounded bg-cyan-950 border border-cyan-500/40 text-cyan-400 flex items-center justify-center font-bold shrink-0 mt-0.5">1</span>
                  <div>
                    <strong className="text-slate-100 block">Strict TPI & Standard Procedures</strong>
                    <span className="text-slate-400 text-[11px]">Strict adherence to National and International standard procedures with Third Party Inspection clearance from raw material to final hydro-test.</span>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <span className="w-5 h-5 rounded bg-cyan-950 border border-cyan-500/40 text-cyan-400 flex items-center justify-center font-bold shrink-0 mt-0.5">2</span>
                  <div>
                    <strong className="text-slate-100 block">Rapid Outage Turnaround</strong>
                    <span className="text-slate-400 text-[11px]">Dedicated emergency response team for scheduled and unscheduled power station and refinery outage retubing.</span>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <span className="w-5 h-5 rounded bg-cyan-950 border border-cyan-500/40 text-cyan-400 flex items-center justify-center font-bold shrink-0 mt-0.5">3</span>
                  <div>
                    <strong className="text-slate-100 block">High-End Precision Machining</strong>
                    <span className="text-slate-400 text-[11px]">High-end CNC deep-hole drilling and automated TIG welding ensuring high quality and zero-defect execution.</span>
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
