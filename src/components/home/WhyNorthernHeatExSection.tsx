import React from "react";
import { 
  Award, ShieldCheck, Zap, Clock, TrendingUp, RefreshCw, DollarSign, Headphones, CheckCircle2 
} from "lucide-react";

export const WhyNorthernHeatExSection: React.FC = () => {
  const pillars = [
    {
      icon: Award,
      title: "40+ Years Engineering Legacy",
      desc: "Founded in 1983 as Noor Engineering Works, supplying BHEL, NTPC, and state power entities for four decades.",
    },
    {
      icon: ShieldCheck,
      title: "Precision Haridwar Facility",
      desc: "Precision CNC tubesheet drilling, automated orbital tube-to-tubesheet TIG welding, and hydraulic expansion.",
    },
    {
      icon: Zap,
      title: "ASME & Third Party Inspection",
      desc: "Designed per ASME Sec VIII Div 1 & TEMA Class R/C/B with TPI clearance by Lloyd's, TUV, BV, and DNV.",
    },
    {
      icon: Clock,
      title: "Emergency 72-Hour Response",
      desc: "Rapid mobilization for unplanned power plant and refinery outages across India.",
    },
    {
      icon: TrendingUp,
      title: "Enhanced Wire-Wound Finning",
      desc: "Proprietary wire-loop extended surfaces that improve heat transfer coefficients by up to 300%.",
    },
    {
      icon: RefreshCw,
      title: "On-Site Retubing & NDE",
      desc: "Mobile hydraulic bundle pullers, Eddy Current testing, and vacuum leak testing.",
    },
    {
      icon: DollarSign,
      title: "GST Invoicing & Cost Transparency",
      desc: "Official Indian GST compliant billing, clear alloy breakups, and competitive corporate pricing.",
    },
    {
      icon: Headphones,
      title: "Direct Engineering Hotline",
      desc: "Direct access to senior thermal design engineers in Haridwar 24 hours a day.",
    },
  ];

  return (
    <section id="why-us" className="py-16 bg-white text-slate-900 border-t border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <span className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-blue-50 border border-blue-200 text-[#0056A6] text-xs font-mono font-bold uppercase tracking-wider">
            <Award className="w-3.5 h-3.5 text-[#0056A6]" />
            THE NORTHERN HEATEX ADVANTAGE
          </span>

          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-slate-900">
            Why Enterprise Clients Choose Us
          </h2>

          <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
            Combining 40+ years of Haridwar manufacturing heritage with modern ASME design tools and Indian GST compliance.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {pillars.map((item, idx) => {
            const Icon = item.icon;
            return (
              <div
                key={idx}
                className="bg-slate-50 border border-slate-200 rounded-2xl p-6 hover:border-[#0056A6] transition duration-200 space-y-3 shadow-sm"
              >
                <div className="w-10 h-10 rounded-xl bg-blue-100 text-[#0056A6] flex items-center justify-center">
                  <Icon className="w-5 h-5" />
                </div>

                <h3 className="text-base font-bold text-slate-900">
                  {item.title}
                </h3>

                <p className="text-xs text-slate-600 leading-relaxed font-sans">
                  {item.desc}
                </p>

                <div className="pt-2 flex items-center gap-1.5 text-[11px] font-mono text-[#0056A6]">
                  <CheckCircle2 className="w-3.5 h-3.5 text-[#0056A6]" />
                  <span>Verified Capability</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
