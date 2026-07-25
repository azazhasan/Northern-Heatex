import React from "react";
import { useRouter } from "../context/RouterContext";
import { 
  Factory, ShieldCheck, Flame, Zap, CheckCircle2, Send, Building2, Globe2 
} from "lucide-react";

export const IndustriesPage: React.FC = () => {
  const { currentPath, navigate } = useRouter();

  const industriesList = [
    {
      slug: "hydroelectric",
      title: "Hydroelectric Power Generation",
      desc: "Generator stator air coolers, turbine guide bearing lube oil coolers, thrust bearing oil coolers, and runner sleeve re-babbitting for hydro plants.",
      codes: ["CBIP Guidelines", "ASME VIII Div 1", "TEMA Class C"],
      clients: "BHEL, NHPC, THDC, Uttarakhand Jal Vidyut Nigam (UJVNL)",
    },
    {
      slug: "thermal-power",
      title: "Thermal & Supercritical Power Stations",
      desc: "Boiler feedwater preheaters, high-vacuum steam surface condensers, turbine oil coolers, and gland steam condensers.",
      codes: ["HEI Standards", "ASME SEC I & VIII", "TEMA Class R"],
      clients: "NTPC, DVC, State Electricity Boards, Tata Power",
    },
    {
      slug: "nuclear",
      title: "Nuclear Power Auxiliary Systems",
      desc: "Nuclear-grade auxiliary surface condensers, heavy water intercoolers, and safety-critical emergency heat exchangers.",
      codes: ["ASME Section III", "ASME Section VIII", "NQA-1 Quality"],
      clients: "NPCIL (Nuclear Power Corporation of India Limited)",
    },
    {
      slug: "oil-gas",
      title: "Refineries & Petrochemicals",
      desc: "API 660 compliant crude oil preheat trains, amine gas treaters, high-pressure gas intercoolers, and sulfur recovery exchangers.",
      codes: ["API 660", "API 661", "NACE MR0175 / ISO 15156"],
      clients: "Indian Oil (IOCL), HPCL, BPCL, ONGC, Reliance Industries",
    },
    {
      slug: "chemical",
      title: "Fertilizer & Chemical Processing",
      desc: "Corrosive acid chillers, nitric acid condensers, and chlorine vaporizers manufactured in Titanium, Hastelloy, and Monel.",
      codes: ["ASME VIII Div 1 & 2", "TEMA Class B", "PED 2014/68/EU"],
      clients: "IFFCO, NFL, Gujarat State Fertilizers, Chambal Fertilizers",
    },
    {
      slug: "steel",
      title: "Steel Mills & Heavy Metallurgy",
      desc: "Blast furnace cooling jackets, rolling mill hydraulic oil coolers, converter water cooling panels, and transformer oil coolers.",
      codes: ["ASME VIII Div 1", "TEMA Class C", "ISO 9001"],
      clients: "SAIL, Tata Steel, JSW Steel, Jindal Steel & Power",
    },
    {
      slug: "sugar",
      title: "Sugar & Bio-Ethanol Mills",
      desc: "Juice clarification preheaters, evaporator steam calendars, vacuum pan condensers, and ethanol distillation heat exchangers.",
      codes: ["Indian Sugar Standards", "ASME Sec VIII"],
      clients: "Triveni Engineering, Bajaj Hindusthan, Uttam Sugar",
    },
    {
      slug: "marine",
      title: "Marine & Offshore Vessels",
      desc: "Copper-Nickel 90/10 and 70/30 seawater shell & tube engine jacket coolers, FPSO gas coolers, and lube oil coolers.",
      codes: ["Lloyd's Register", "DNV", "Bureau Veritas", "IRS"],
      clients: "Mazagon Dock, Garden Reach Shipbuilders, Cochin Shipyard",
    },
  ];

  const currentSlug = currentPath.replace("/industries", "").replace(/^\//, "");
  const selectedIndustry = industriesList.find((i) => i.slug === currentSlug);

  return (
    <div className="space-y-12">
      {/* Industries Hero Banner */}
      <div className="bg-slate-900 rounded-3xl p-6 sm:p-10 text-white relative overflow-hidden border border-slate-800 shadow-xl">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-950/80 via-slate-900 to-cyan-950/80 z-10" />

        <div className="relative z-20 space-y-4 max-w-4xl">
          <span className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#0056A6]/30 text-cyan-300 border border-blue-400/40 text-xs font-mono font-bold uppercase tracking-wider">
            <Factory className="w-3.5 h-3.5 text-cyan-400" />
            INDUSTRIAL SECTOR SPECIALIZATION
          </span>

          <h1 className="text-3xl sm:text-4xl font-black tracking-tight text-white">
            {selectedIndustry ? selectedIndustry.title : "Industries We Serve Across India & Globally"}
          </h1>

          <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
            Northern HeatEx equipment powers thermal power plants, hydro stations, refineries, nuclear facilities, and chemical processing plants with 40+ years of proven operational reliability.
          </p>

          {/* Sub-industry buttons */}
          <div className="flex flex-wrap gap-2 pt-4 border-t border-white/10 font-mono text-xs">
            {industriesList.map((ind) => (
              <button
                key={ind.slug}
                onClick={() => navigate(`/industries/${ind.slug}`)}
                className={`px-3 py-1.5 rounded-xl transition cursor-pointer ${
                  currentSlug === ind.slug || (!currentSlug && ind.slug === "hydroelectric")
                    ? "bg-[#0056A6] text-white font-bold border border-blue-400/50"
                    : "bg-white/10 hover:bg-white/20 text-slate-300 border border-white/10"
                }`}
              >
                {ind.title}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Industry Detail View or Grid */}
      {selectedIndustry ? (
        <div className="bg-white border border-slate-200 rounded-2xl p-8 shadow-sm space-y-6">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-xl bg-blue-100 text-[#0056A6] flex items-center justify-center font-bold">
              <Factory className="w-6 h-6" />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-slate-900">{selectedIndustry.title}</h2>
              <span className="text-xs font-mono text-[#0056A6] font-bold">Industry Sector Solutions</span>
            </div>
          </div>

          <p className="text-slate-700 text-sm sm:text-base leading-relaxed">
            {selectedIndustry.desc}
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-2">
            <div className="bg-slate-50 border border-slate-200 rounded-xl p-5 space-y-2 font-mono text-xs">
              <h4 className="font-bold text-[#0056A6] uppercase tracking-wider">Applicable Design Codes</h4>
              <ul className="space-y-1.5 text-slate-700">
                {selectedIndustry.codes.map((c, idx) => (
                  <li key={idx} className="flex items-center gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                    <span>{c}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="bg-slate-50 border border-slate-200 rounded-xl p-5 space-y-2 font-mono text-xs">
              <h4 className="font-bold text-[#0056A6] uppercase tracking-wider">Reference Clients & Partners</h4>
              <p className="text-slate-700 font-bold leading-relaxed">{selectedIndustry.clients}</p>
            </div>
          </div>

          <div className="pt-4 flex flex-wrap gap-4">
            <button
              onClick={() => navigate("/contact/request-quotation")}
              className="bg-[#0056A6] hover:bg-blue-700 text-white font-bold px-6 py-3 rounded-xl text-xs uppercase tracking-wider flex items-center gap-2 cursor-pointer"
            >
              <Send className="w-4 h-4" /> Request Sector Specific Proposal
            </button>
            <button
              onClick={() => navigate("/industries")}
              className="bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold px-6 py-3 rounded-xl text-xs uppercase tracking-wider cursor-pointer"
            >
              ← Back to All Industries
            </button>
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {industriesList.map((ind) => (
            <div
              key={ind.slug}
              className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm hover:border-[#0056A6] transition duration-200 flex flex-col justify-between space-y-4"
            >
              <div className="space-y-3">
                <div className="w-10 h-10 rounded-xl bg-blue-50 text-[#0056A6] flex items-center justify-center font-bold">
                  <Factory className="w-5 h-5" />
                </div>
                <h3 className="text-base font-bold text-slate-900">{ind.title}</h3>
                <p className="text-xs text-slate-600 leading-relaxed">{ind.desc}</p>
                <div className="pt-1 text-[11px] font-mono text-slate-500">
                  <strong className="text-[#0056A6]">Clients:</strong> {ind.clients.split(",").slice(0, 3).join(", ")}
                </div>
              </div>

              <button
                onClick={() => navigate(`/industries/${ind.slug}`)}
                className="w-full bg-slate-100 hover:bg-[#0056A6] hover:text-white text-slate-800 font-mono text-xs font-bold py-2.5 rounded-xl transition cursor-pointer text-center"
              >
                View Sector Solutions →
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
