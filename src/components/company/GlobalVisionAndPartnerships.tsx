import React, { useState } from "react";
import { motion } from "motion/react";
import {
  Globe2,
  Calendar,
  Building2,
  Handshake,
  CheckCircle2,
  ArrowRight,
  Sparkles,
  Award,
  Layers,
  ChevronRight,
} from "lucide-react";

export const GlobalVisionAndPartnershipsSection: React.FC = () => {
  // Page 13 Interactive State: Timeline filter selection
  const [selectedEra, setSelectedEra] = useState<"all" | "foundation" | "expansion" | "digital">("all");

  const timelineMilestones = [
    {
      year: "1983",
      era: "foundation",
      title: "Founding of Noor Engineering Works",
      desc: "Established in Haridwar, Uttarakhand as Noor Engineering Works, supplying precision engineering and fabrication services to India's government and public sector (BHEL, Power Grid, NTPC).",
    },
    {
      year: "1989",
      era: "foundation",
      title: "ASME VIII Design & TEMA Compliance",
      desc: "Established engineering processes matching ASME Boiler & Pressure Vessel Code Section VIII Division 1 and TEMA Class R standards under Third Party Inspection.",
    },
    {
      year: "1997",
      era: "expansion",
      title: "Haridwar Facility Heavy Expansion",
      desc: "Expanded Haridwar works with a dedicated heavy fabrication bay capable of handling large tube bundles, hydro turbine coolers, and retubing equipment.",
    },
    {
      year: "2006",
      era: "expansion",
      title: "Patented Wire Wound Fin Technology",
      desc: "Introduced spirally wound wire finned tubing providing up to 3.5x higher heat transfer flux for gas coolers.",
    },
    {
      year: "2014",
      era: "expansion",
      title: "Northern HeatEx Corporation Formation",
      desc: "Established and formed by the next generation of the founding family to cater specifically to private sector clients, corporate accounts, and international export operations.",
    },
    {
      year: "2021",
      era: "digital",
      title: "Launch of NHEE AI Thermal Engine",
      desc: "Pioneered automated thermal design software integrating computational fluid dynamics and vibration avoidance algorithms.",
    },
    {
      year: "2026",
      era: "digital",
      title: "Cloud Digital Twin & Net-Zero Vision",
      desc: "Deploying IoT-connected digital twin telemetry for real-time thermal fouling prediction and zero-carbon heat recovery.",
    },
  ];

  const filteredMilestones =
    selectedEra === "all"
      ? timelineMilestones
      : timelineMilestones.filter((m) => m.era === selectedEra);

  const globalPartners = [
    {
      category: "Power Generation & Utilities",
      logos: ["Siemens Energy", "GE Vernova", "EDF Nuclear", "TransAlta Utilities"],
      desc: "Primary OEM supplier for steam surface condensers, stator air coolers, and turbine lube oil cooling systems.",
    },
    {
      category: "Petrochemical & Refining",
      logos: ["Shell Global", "ExxonMobil", "Chevron", "TotalEnergies"],
      desc: "Engineering high-pressure TEMA Class R exchangers for hydrocrackers and sour gas treating columns.",
    },
    {
      category: "EPC & Engineering Consultants",
      logos: ["Bechtel", "Fluor Corporation", "Wood Group", "Worley"],
      desc: "Collaborative design-build partner for mega LNG liquefaction and offshore FPSO heat transfer modules.",
    },
    {
      category: "Research Institutes",
      logos: ["ETH Zürich", "Imperial College London", "MIT Thermal Lab", "HTRI Consortium"],
      desc: "Joint research partner on Super Duplex pitting resistance and AI computational fluid dynamics.",
    },
  ];

  return (
    <div className="space-y-16">
      {/* PAGE 12: GLOBAL VISION */}
      <section id="global-vision" className="relative">
        <div className="bg-gradient-to-br from-slate-900 via-slate-950 to-slate-900 border border-slate-800 rounded-3xl p-8 lg:p-12 shadow-2xl space-y-8">
          <div className="flex items-center justify-between border-b border-slate-800 pb-4">
            <div className="flex items-center gap-3">
              <span className="bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 text-xs font-mono px-3 py-1 rounded-full font-bold uppercase tracking-wider">
                Corporate Dossier • Page 12
              </span>
              <span className="text-slate-500 text-xs font-mono">|</span>
              <span className="text-slate-400 text-xs font-mono">International Expansion & Digital Transformation Strategy</span>
            </div>
            <Globe2 className="w-5 h-5 text-cyan-400" />
          </div>

          <div className="max-w-3xl space-y-4">
            <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
              Global Vision: Expanding Engineering Excellence Worldwide
            </h2>
            <p className="text-slate-300 text-sm font-light leading-relaxed">
              Our vision encompasses a seamlessly connected global network of smart manufacturing plants, 24/7 technical response hubs, and cloud AI simulation engines. As energy markets transition toward green hydrogen, geothermal, and carbon capture, Northern HeatEx is positioning itself as the world's most trusted thermal technology partner.
            </p>
          </div>
        </div>
      </section>

      {/* PAGE 13: CORPORATE TIMELINE */}
      <section id="corporate-timeline" className="relative">
        <div className="bg-slate-950 border border-slate-800 rounded-3xl p-8 lg:p-12 shadow-2xl space-y-8">
          <div className="flex flex-wrap items-center justify-between gap-4 border-b border-slate-800 pb-4">
            <div className="flex items-center gap-3">
              <span className="bg-blue-500/10 border border-blue-500/30 text-blue-400 text-xs font-mono px-3 py-1 rounded-full font-bold uppercase tracking-wider">
                Corporate Dossier • Page 13
              </span>
              <span className="text-slate-500 text-xs font-mono">|</span>
              <span className="text-slate-400 text-xs font-mono">Interactive 48-Year Milestone Timeline</span>
            </div>

            {/* Era Filter Switches */}
            <div className="flex items-center gap-1 font-mono text-xs bg-slate-900 p-1 rounded-lg border border-slate-800">
              <button
                onClick={() => setSelectedEra("all")}
                className={`px-3 py-1 rounded-md transition ${selectedEra === "all" ? "bg-cyan-500 text-slate-950 font-bold" : "text-slate-400 hover:text-white"}`}
              >
                All Milestones
              </button>
              <button
                onClick={() => setSelectedEra("foundation")}
                className={`px-3 py-1 rounded-md transition ${selectedEra === "foundation" ? "bg-cyan-500 text-slate-950 font-bold" : "text-slate-400 hover:text-white"}`}
              >
                1978-1990
              </button>
              <button
                onClick={() => setSelectedEra("expansion")}
                className={`px-3 py-1 rounded-md transition ${selectedEra === "expansion" ? "bg-cyan-500 text-slate-950 font-bold" : "text-slate-400 hover:text-white"}`}
              >
                1991-2015
              </button>
              <button
                onClick={() => setSelectedEra("digital")}
                className={`px-3 py-1 rounded-md transition ${selectedEra === "digital" ? "bg-cyan-500 text-slate-950 font-bold" : "text-slate-400 hover:text-white"}`}
              >
                2016-2026+
              </button>
            </div>
          </div>

          <div className="relative border-l-2 border-slate-800 pl-6 lg:pl-10 space-y-8 my-6">
            {filteredMilestones.map((m, idx) => (
              <motion.div
                key={m.year}
                initial={{ opacity: 0, x: -15 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.3, delay: idx * 0.05 }}
                className="relative group"
              >
                {/* Timeline Bullet Node */}
                <span className="absolute -left-[31px] lg:-left-[47px] top-1 w-4 h-4 rounded-full bg-slate-950 border-2 border-cyan-400 group-hover:scale-125 group-hover:bg-cyan-400 transition" />

                <div className="bg-slate-900/80 border border-slate-800 p-5 rounded-2xl group-hover:border-cyan-500/40 transition space-y-2">
                  <div className="flex items-center gap-3">
                    <span className="text-xl font-extrabold text-cyan-400 font-mono">{m.year}</span>
                    <span className="text-[10px] font-mono text-slate-500 uppercase px-2 py-0.5 rounded bg-slate-950 border border-slate-800">
                      {m.era.toUpperCase()}
                    </span>
                  </div>
                  <h4 className="text-sm font-bold text-slate-100 font-mono">{m.title}</h4>
                  <p className="text-xs text-slate-400 font-sans leading-relaxed">{m.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* PAGE 19: GLOBAL PARTNERSHIPS */}
      <section id="global-partnerships" className="relative">
        <div className="bg-slate-950 border border-slate-800 rounded-3xl p-8 lg:p-12 shadow-2xl space-y-8">
          <div className="flex items-center justify-between border-b border-slate-800 pb-4">
            <div className="flex items-center gap-3">
              <span className="bg-indigo-500/10 border border-indigo-500/30 text-indigo-400 text-xs font-mono px-3 py-1 rounded-full font-bold uppercase tracking-wider">
                Corporate Dossier • Page 19
              </span>
              <span className="text-slate-500 text-xs font-mono">|</span>
              <span className="text-slate-400 text-xs font-mono">OEMs, Power Utilities & Engineering Ecosystem</span>
            </div>
            <Handshake className="w-5 h-5 text-indigo-400" />
          </div>

          <div className="max-w-2xl space-y-2">
            <h2 className="text-2xl font-bold text-white tracking-tight">
              Global Industry Ecosystem & Strategic Alliances
            </h2>
            <p className="text-xs text-slate-400 font-mono">
              Partnering with global Fortune 500 energy leaders, Tier-1 EPC contractors, and academic research consortia.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-2 font-mono text-xs">
            {globalPartners.map((p) => (
              <div
                key={p.category}
                className="bg-slate-900/80 border border-slate-800 p-6 rounded-2xl space-y-4 hover:border-indigo-500/40 transition"
              >
                <div className="border-b border-slate-800 pb-2">
                  <h4 className="text-sm font-bold text-indigo-300 uppercase">{p.category}</h4>
                  <p className="text-[11px] text-slate-400 font-sans mt-1">{p.desc}</p>
                </div>

                <div className="flex flex-wrap gap-2 pt-1">
                  {p.logos.map((logo) => (
                    <span
                      key={logo}
                      className="bg-slate-950 text-slate-200 border border-slate-800 px-3 py-1.5 rounded-lg font-bold flex items-center gap-1.5"
                    >
                      <CheckCircle2 className="w-3.5 h-3.5 text-indigo-400" />
                      {logo}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};
