import React from "react";
import { useRouter } from "../context/RouterContext";
import { HeatExchanger3DCanvas } from "../components/3d/HeatExchanger3DCanvas";
import { WhoWeAreSection } from "../components/home/WhoWeAreSection";
import { OurSolutionsSection } from "../components/home/OurSolutionsSection";
import { WhyNorthernHeatExSection } from "../components/home/WhyNorthernHeatExSection";
import { InquiryFormSection } from "../components/home/InquiryFormSection";
import { ArrowRight, ShieldCheck, Zap, Sparkles, Send, Award, FileText, CheckCircle2 } from "lucide-react";

export const HomePage: React.FC = () => {
  const { navigate } = useRouter();

  return (
    <div className="space-y-16">
      {/* Unique Hero Section for Home Page */}
      <section className="relative bg-slate-900 rounded-3xl p-6 sm:p-10 lg:p-12 text-white overflow-hidden shadow-2xl border border-slate-800">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-950/90 via-slate-900/90 to-cyan-950/80 z-10" />

        <div className="relative z-20 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          <div className="lg:col-span-7 space-y-6">
            <div className="flex flex-wrap items-center gap-2">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/20 text-amber-300 border border-amber-500/40 text-xs font-mono font-bold">
                <Award className="w-3.5 h-3.5 text-amber-400" />
                LEGACY EST. 1996 • HARIDWAR WORKS
              </span>
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 text-xs font-mono font-bold">
                <ShieldCheck className="w-3.5 h-3.5 text-cyan-400" />
                ASME SEC VIII DIV 1 & TEMA CLASS R/C/B
              </span>
            </div>

            <h1 className="text-3xl sm:text-5xl font-black tracking-tight leading-tight">
              Enterprise <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-sky-200 to-amber-300">Thermal Engineering</span> Ecosystem
            </h1>

            <p className="text-slate-300 text-sm sm:text-base leading-relaxed max-w-2xl">
              Northern HeatEx Corporation was established by the next generation of parent enterprise <strong className="text-amber-300">Noor Engineering Works (Est. 1983)</strong> to deliver specialized ASME-certified shell & tube exchangers, coolers, and retubing services for private corporate clients and global exports.
            </p>

            <div className="flex flex-wrap items-center gap-3 pt-2">
              <button
                onClick={() => navigate("/contact/request-quotation")}
                className="bg-[#0056A6] hover:bg-blue-600 text-white font-extrabold px-6 py-3.5 rounded-xl text-xs uppercase tracking-wider flex items-center gap-2 shadow-lg transition cursor-pointer"
              >
                <Send className="w-4 h-4" /> Request Official Quotation
              </button>

              <button
                onClick={() => navigate("/software/thermal-design")}
                className="bg-white/10 hover:bg-white/20 text-white font-bold px-6 py-3.5 rounded-xl text-xs uppercase tracking-wider flex items-center gap-2 border border-white/20 backdrop-blur-sm transition cursor-pointer"
              >
                Launch Thermal Calculator <ArrowRight className="w-4 h-4" />
              </button>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-6 border-t border-white/10 font-mono text-xs text-slate-300">
              <div>
                <div className="text-lg font-bold text-cyan-400">40+ Years</div>
                <div className="text-[11px] text-slate-400">Engineering Legacy</div>
              </div>
              <div>
                <div className="text-lg font-bold text-amber-400">5,000+</div>
                <div className="text-[11px] text-slate-400">Units Installed</div>
              </div>
              <div>
                <div className="text-lg font-bold text-emerald-400">100% GST</div>
                <div className="text-[11px] text-slate-400">Invoicing Compliant</div>
              </div>
              <div>
                <div className="text-lg font-bold text-sky-400">72-Hour</div>
                <div className="text-[11px] text-slate-400">Emergency Retubing</div>
              </div>
            </div>
          </div>

          {/* Interactive 3D WebGL Canvas Right */}
          <div className="lg:col-span-5 h-[340px] sm:h-[400px] rounded-2xl overflow-hidden border border-white/15 shadow-2xl relative bg-slate-950">
            <HeatExchanger3DCanvas
              temaType="BEM"
              shellDiameter={800}
              tubeCount={190}
              tubeLength={6000}
            />
            <div className="absolute bottom-3 left-3 right-3 bg-slate-900/80 backdrop-blur-md px-3 py-2 rounded-xl border border-white/10 flex items-center justify-between text-[11px] font-mono text-slate-300">
              <span className="flex items-center gap-1.5 text-cyan-400 font-bold">
                <Sparkles className="w-3.5 h-3.5" /> Interactive 3D Inspection Model
              </span>
              <button
                onClick={() => navigate("/software/digital-twin")}
                className="text-amber-300 hover:underline"
              >
                Expand 3D Studio →
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Main Home Page Sections */}
      <WhoWeAreSection />
      <OurSolutionsSection />
      <WhyNorthernHeatExSection />
      <InquiryFormSection />
    </div>
  );
};
