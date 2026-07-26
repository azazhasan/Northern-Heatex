import React from "react";
import { motion } from "motion/react";
import {
  Award,
  Shield,
  Lightbulb,
  HeartHandshake,
  BookOpen,
  Leaf,
  Target,
  Eye,
  Sparkles,
  Zap,
  CheckCircle2,
  Lock,
} from "lucide-react";

export const LegacyAndValuesSection: React.FC = () => {
  const coreValues = [
    {
      title: "Engineering Excellence",
      subtitle: "Uncompromising Precision",
      desc: "Every calculation, weld seam, and tubesheet tolerance is executed with surgical accuracy exceeding ASME and TEMA guidelines.",
      icon: Award,
      color: "from-cyan-500/20 to-blue-600/20",
      borderColor: "border-cyan-500/40",
      textColor: "text-cyan-400",
    },
    {
      title: "Absolute Integrity",
      subtitle: "Transparent Quality",
      desc: "Complete material test report (MTR) traceability, non-destructive examination (NDE) honesty, and ethical commercial stewardship.",
      icon: Shield,
      color: "from-blue-500/20 to-indigo-600/20",
      borderColor: "border-blue-500/40",
      textColor: "text-blue-400",
    },
    {
      title: "Pioneering Innovation",
      subtitle: "AI & Digital Engineering",
      desc: "Continuously advancing heat transfer science with computational fluid dynamics, wire-fin geometries, and predictive AI modeling.",
      icon: Lightbulb,
      color: "from-amber-500/20 to-orange-600/20",
      borderColor: "border-amber-500/40",
      textColor: "text-amber-400",
    },
    {
      title: "Industrial Safety First",
      subtitle: "Zero Harm Philosophy",
      desc: "Protecting technicians, plant operators, and community habitats through leak-proof containment and safe shopfloor practices.",
      icon: Lock,
      color: "from-emerald-500/20 to-teal-600/20",
      borderColor: "border-emerald-500/40",
      textColor: "text-emerald-400",
    },
    {
      title: "Obsessive Reliability",
      subtitle: "Zero Unplanned Downtime",
      desc: "Designing units that survive extreme thermal cycling, water hammer, vibration fatigue, and corrosive chemical attack.",
      icon: Zap,
      color: "from-purple-500/20 to-pink-600/20",
      borderColor: "border-purple-500/40",
      textColor: "text-purple-400",
    },
    {
      title: "Customer Partnership Success",
      subtitle: "Long-Term Commitment",
      desc: "Serving as an active technical consultant throughout the entire 30+ year operating lifecycle of every heat exchanger.",
      icon: HeartHandshake,
      color: "from-sky-500/20 to-blue-600/20",
      borderColor: "border-sky-500/40",
      textColor: "text-sky-400",
    },
    {
      title: "Continuous Learning",
      subtitle: "R&D Mastery",
      desc: "Empowering our engineers with continuous metallurgical research, ASME code committee involvement, and advanced training.",
      icon: BookOpen,
      color: "from-indigo-500/20 to-violet-600/20",
      borderColor: "border-indigo-500/40",
      textColor: "text-indigo-400",
    },
    {
      title: "Environmental Sustainability",
      subtitle: "Green Heat Recovery",
      desc: "Maximizing energy recapture to directly lower fuel consumption and eliminate megatons of industrial carbon emissions.",
      icon: Leaf,
      color: "from-green-500/20 to-emerald-600/20",
      borderColor: "border-green-500/40",
      textColor: "text-green-400",
    },
  ];

  return (
    <div className="space-y-16">
      {/* PAGE 3: ENGINEERING LEGACY */}
      <section id="engineering-legacy" className="relative">
        <div className="bg-slate-950 border border-slate-800 rounded-3xl p-8 lg:p-12 shadow-2xl space-y-8">
          <div className="flex items-center gap-3 border-b border-slate-800 pb-4">
            <span className="bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 text-xs font-mono px-3 py-1 rounded-full font-bold uppercase tracking-wider">
              Corporate Dossier • Page 03
            </span>
            <span className="text-slate-500 text-xs font-mono">|</span>
            <span className="text-slate-400 text-xs font-mono">Precision Manufacturing Craftsmanship</span>
          </div>

          <div className="max-w-3xl space-y-4">
            <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
              Engineering Legacy: Four Decades of Uncompromising Craftsmanship
            </h2>
            <p className="text-slate-300 text-sm font-light leading-relaxed">
              At Northern HeatEx, engineering legacy is measured in micron-level tolerances, flawless orbital TIG welds, and thermal units operating uninterrupted after 35 years in service.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-4 font-mono">
            <div className="bg-slate-900/80 p-5 rounded-2xl border border-slate-800 space-y-3">
              <span className="text-xs text-cyan-400 font-bold uppercase tracking-wider block">01 / Machining Precision</span>
              <h4 className="text-sm font-bold text-slate-100">Micron-Tolerance CNC Tubesheet Drilling</h4>
              <p className="text-xs text-slate-400 leading-relaxed font-sans">
                Deep-hole gantry drills ensure exact tube hole geometry and groove depths to prevent tube-to-tubesheet joint bypass or crevice corrosion under high pressure differential.
              </p>
            </div>

            <div className="bg-slate-900/80 p-5 rounded-2xl border border-slate-800 space-y-3">
              <span className="text-xs text-cyan-400 font-bold uppercase tracking-wider block">02 / Welding Metallurgy</span>
              <h4 className="text-sm font-bold text-slate-100">Automated Orbital TIG Welding</h4>
              <p className="text-xs text-slate-400 leading-relaxed font-sans">
                Closed-loop inertia-controlled TIG orbital tube welding produces full-penetration strength welds in Super Duplex, Inconel 625, and Hastelloy C276 with zero oxidation.
              </p>
            </div>

            <div className="bg-slate-900/80 p-5 rounded-2xl border border-slate-800 space-y-3">
              <span className="text-xs text-cyan-400 font-bold uppercase tracking-wider block">03 / Hydro & NDE Inspection</span>
              <h4 className="text-sm font-bold text-slate-100">Third Party Verified Hydro & Vacuum Testing</h4>
              <p className="text-xs text-slate-400 leading-relaxed font-sans">
                Every unit undergoes high-pressure hydrostatic testing up to 1.5x design pressure, accompanied by precision vacuum leak testing for zero micro-fissure leakage.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* PAGES 4 & 5: MISSION & VISION */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* PAGE 4: MISSION */}
        <section id="mission" className="bg-gradient-to-br from-slate-900 via-slate-950 to-slate-900 border border-slate-800 rounded-3xl p-8 shadow-2xl relative overflow-hidden">
          <div className="absolute top-0 right-0 w-32 h-32 bg-cyan-500/10 rounded-full blur-2xl pointer-events-none" />

          <div className="space-y-6 relative z-10">
            <div className="flex items-center gap-2 border-b border-slate-800 pb-3">
              <Target className="w-5 h-5 text-cyan-400" />
              <span className="text-xs font-mono font-bold uppercase text-cyan-400 tracking-wider">
                Corporate Dossier • Page 04 — Mission
              </span>
            </div>

            <h3 className="text-xl font-bold text-white tracking-tight">
              Our Corporate Mission
            </h3>

            <p className="text-sm text-slate-300 leading-relaxed font-light">
              To design, manufacture, and service world-class heat transfer systems and high-precision mechanical equipment that ensure operational reliability, maximize thermal energy efficiency, and protect human and environmental safety across global energy and industrial infrastructure.
            </p>

            <div className="space-y-2 font-mono text-xs text-slate-300 pt-2">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-cyan-400 shrink-0" />
                <span>Zero-defect thermal and mechanical design precision</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-cyan-400 shrink-0" />
                <span>Rapid turnaround for critical shutdown equipment</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-cyan-400 shrink-0" />
                <span>Empowering customer success through AI technology</span>
              </div>
            </div>
          </div>
        </section>

        {/* PAGE 5: VISION */}
        <section id="vision" className="bg-gradient-to-br from-slate-900 via-slate-950 to-slate-900 border border-slate-800 rounded-3xl p-8 shadow-2xl relative overflow-hidden">
          <div className="absolute top-0 right-0 w-32 h-32 bg-indigo-500/10 rounded-full blur-2xl pointer-events-none" />

          <div className="space-y-6 relative z-10">
            <div className="flex items-center gap-2 border-b border-slate-800 pb-3">
              <Eye className="w-5 h-5 text-indigo-400" />
              <span className="text-xs font-mono font-bold uppercase text-indigo-400 tracking-wider">
                Corporate Dossier • Page 05 — Vision
              </span>
            </div>

            <h3 className="text-xl font-bold text-white tracking-tight">
              Our Corporate Vision
            </h3>

            <p className="text-sm text-slate-300 leading-relaxed font-light">
              To be the globally undisputed technology leader in advanced heat transfer solutions and AI-driven thermal equipment lifecycle management — setting the global standard for industrial decarbonization, reliability, and digital twin engineering.
            </p>

            <div className="space-y-2 font-mono text-xs text-slate-300 pt-2">
              <div className="flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-indigo-400 shrink-0" />
                <span>AI-powered autonomous thermal calculation engines</span>
              </div>
              <div className="flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-indigo-400 shrink-0" />
                <span>Global footprint with smart manufacturing hubs</span>
              </div>
              <div className="flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-indigo-400 shrink-0" />
                <span>Championing net-zero thermal process recovery</span>
              </div>
            </div>
          </div>
        </section>
      </div>

      {/* PAGE 6: CORE VALUES */}
      <section id="core-values" className="relative">
        <div className="bg-slate-950 border border-slate-800 rounded-3xl p-8 lg:p-12 shadow-2xl space-y-8">
          <div className="flex items-center justify-between border-b border-slate-800 pb-4">
            <div className="flex items-center gap-3">
              <span className="bg-amber-500/10 border border-amber-500/30 text-amber-400 text-xs font-mono px-3 py-1 rounded-full font-bold uppercase tracking-wider">
                Corporate Dossier • Page 06
              </span>
              <span className="text-slate-500 text-xs font-mono">|</span>
              <span className="text-slate-400 text-xs font-mono">8 Animated Core Values</span>
            </div>
            <span className="text-xs font-mono text-slate-400">Cultural Foundation</span>
          </div>

          <div className="max-w-2xl space-y-2">
            <h2 className="text-2xl font-bold text-white tracking-tight">
              Core Operating Values
            </h2>
            <p className="text-slate-400 text-xs font-mono">
              Hover over or inspect each core value card to discover the underlying operating culture of Northern HeatEx Corporation.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {coreValues.map((val, idx) => {
              const IconComponent = val.icon;
              return (
                <motion.div
                  key={val.title}
                  initial={{ opacity: 0, y: 15 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.3, delay: idx * 0.05 }}
                  className={`bg-gradient-to-b ${val.color} bg-slate-900/90 border ${val.borderColor} p-5 rounded-2xl hover:scale-[1.02] transition duration-300 shadow-xl space-y-3 flex flex-col justify-between`}
                >
                  <div className="space-y-3">
                    <div className={`w-10 h-10 rounded-xl bg-slate-950/80 border border-slate-800 flex items-center justify-center ${val.textColor}`}>
                      <IconComponent className="w-5 h-5" />
                    </div>
                    <div>
                      <span className={`text-[10px] font-mono uppercase font-bold tracking-wider ${val.textColor}`}>
                        {val.subtitle}
                      </span>
                      <h4 className="text-sm font-bold text-slate-100 mt-0.5">
                        {val.title}
                      </h4>
                    </div>
                    <p className="text-xs text-slate-300 leading-relaxed font-sans">
                      {val.desc}
                    </p>
                  </div>

                  <div className="pt-3 border-t border-slate-800/80 text-[10px] font-mono text-slate-500 flex justify-between">
                    <span>VALUE-0{idx + 1}</span>
                    <span className={val.textColor}>✓ CERTIFIED</span>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>
    </div>
  );
};
