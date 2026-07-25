import React from "react";
import { useRouter } from "../context/RouterContext";
import { FolderGit2, ShieldCheck, CheckCircle2, Clock, Send, Award, FileText } from "lucide-react";

export const ProjectsPage: React.FC = () => {
  const { currentPath, navigate } = useRouter();

  const caseStudies = [
    {
      id: "cs-01",
      title: "500 MW Hydro Station Stator Air Cooler Overhaul",
      client: "Uttarakhand Jal Vidyut Nigam (UJVNL) • Tehri / Haridwar Region",
      scope: "Complete retubing of 12 sets of generator stator air coolers with 90/10 CuNi finned tubes during 10-day planned monsoon outage.",
      stats: { duty: "18.5 MW", tubes: "2,400 Tubes", turnaround: "8 Days", status: "In Commission" },
      image: "https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=800&q=80",
    },
    {
      id: "cs-02",
      title: "Supercritical Thermal Power Surface Condenser Retubing",
      client: "NTPC Thermal Power Station • Singrauli / Haridwar Dispatch",
      scope: "Fabrication & site deployment of 18-meter SB-338 Titanium Grade 2 tube bundle for high-vacuum steam surface condenser.",
      stats: { duty: "85 MW", tubes: "6,200 Tubes", turnaround: "14 Days", status: "ASME Stamped" },
      image: "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&w=800&q=80",
    },
    {
      id: "cs-03",
      title: "Refinery High-Pressure API 660 Amine Exchanger Train",
      client: "Indian Oil Corporation Limited (IOCL) • Mathura Refinery",
      scope: "Design & manufacture of TEMA AES split ring floating head exchanger in SA-240 316L for sour amine gas service at 180 bar.",
      stats: { duty: "32 MW", pressure: "180 Bar", materials: "316L SS", status: "Delivered" },
      image: "https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&w=800&q=80",
    },
    {
      id: "cs-04",
      title: "Centrifugal Cast White Metal Journal Bearing Re-Babbitting",
      client: "BHEL Hardwar Heavy Electrical Equipment Plant (HEEP)",
      scope: "Emergency centrifugal casting of ASTM B23 Grade 2 tin-based babbitt lining for 600mm turbine main journal bearing with ultrasonic bond check.",
      stats: { diameter: "600 mm", material: "Tin Babbitt", turnaround: "48 Hours", status: "Verified" },
      image: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&w=800&q=80",
    },
  ];

  return (
    <div className="space-y-12">
      {/* Hero Banner */}
      <div className="bg-slate-900 rounded-3xl p-6 sm:p-10 text-white relative overflow-hidden border border-slate-800 shadow-xl">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-950/80 via-slate-900 to-cyan-950/80 z-10" />

        <div className="relative z-20 space-y-4 max-w-4xl">
          <span className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-amber-500/20 text-amber-300 border border-amber-500/30 text-xs font-mono font-bold uppercase tracking-wider">
            <FolderGit2 className="w-3.5 h-3.5 text-amber-400" />
            5,000+ COMPLETED PROJECTS & CASE STUDIES
          </span>

          <h1 className="text-3xl sm:text-4xl font-black tracking-tight text-white">
            Engineering Case Studies & Project Portfolio
          </h1>

          <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
            Real-world execution track record across hydro stations, supercritical power plants, oil refineries, and heavy industrial facilities.
          </p>
        </div>
      </div>

      {/* Case Studies Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {caseStudies.map((cs) => (
          <div key={cs.id} className="bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-sm hover:border-[#0056A6] transition duration-200 flex flex-col justify-between">
            <div className="p-6 space-y-4">
              <div className="flex items-center justify-between font-mono text-xs text-[#0056A6]">
                <span className="font-bold bg-blue-50 px-2.5 py-1 rounded border border-blue-200">{cs.id.toUpperCase()}</span>
                <span className="flex items-center gap-1 font-bold text-emerald-600"><CheckCircle2 className="w-3.5 h-3.5" /> {cs.stats.status}</span>
              </div>

              <h3 className="text-lg font-bold text-slate-900 leading-snug">{cs.title}</h3>
              <p className="text-xs font-mono text-amber-700 bg-amber-50 px-3 py-1.5 rounded-lg border border-amber-200">{cs.client}</p>
              <p className="text-xs text-slate-600 leading-relaxed font-sans">{cs.scope}</p>

              <div className="grid grid-cols-2 gap-2 pt-2 font-mono text-xs text-slate-700 bg-slate-50 p-3 rounded-xl border border-slate-200">
                {Object.entries(cs.stats).map(([k, v]) => (
                  <div key={k}>
                    <span className="text-[10px] text-slate-400 uppercase block">{k}:</span>
                    <strong className="text-slate-900">{v}</strong>
                  </div>
                ))}
              </div>
            </div>

            <div className="px-6 pb-6">
              <button
                onClick={() => navigate("/contact/request-quotation")}
                className="w-full bg-[#0056A6] hover:bg-blue-700 text-white font-mono text-xs font-bold py-3 rounded-xl transition cursor-pointer text-center flex items-center justify-center gap-2"
              >
                <Send className="w-3.5 h-3.5" /> Request Similar Project Quotation
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
