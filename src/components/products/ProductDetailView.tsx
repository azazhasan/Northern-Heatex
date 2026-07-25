import React, { useState } from "react";
import { ProductCategoryData } from "./productsData";
import { InteractiveProductViewer } from "./InteractiveProductViewer";
import {
  Flame,
  Zap,
  CheckCircle2,
  FileText,
  Download,
  ArrowRight,
  ShieldAlert,
  Sliders,
  ChevronDown,
  ChevronRight,
  Send,
  Building2,
  Cpu,
  Layers,
  Award,
  BookOpen,
  HelpCircle,
  X,
  Sparkles,
  Calculator,
  Grid,
} from "lucide-react";

interface Props {
  product: ProductCategoryData;
  onBackToCatalog: () => void;
  onNavigateToTab?: (tab: string) => void;
}

export const ProductDetailView: React.FC<Props> = ({ product, onBackToCatalog, onNavigateToTab }) => {
  const [activeFaq, setActiveFaq] = useState<number | null>(0);
  const [rfqModalOpen, setRfqModalOpen] = useState<boolean>(false);

  // Quick Sizing Calculator State
  const [calcHotIn, setCalcHotIn] = useState<number>(product.calculatorPreset.hotTempIn);
  const [calcHotOut, setCalcHotOut] = useState<number>(product.calculatorPreset.hotTempIn - 65);
  const [calcColdIn, setCalcColdIn] = useState<number>(product.calculatorPreset.coldTempIn);
  const [calcColdOut, setCalcColdOut] = useState<number>(product.calculatorPreset.coldTempIn + 40);
  const [calcFlowRate, setCalcFlowRate] = useState<number>(120); // m³/h

  // RFQ Form State
  const [rfqName, setRfqName] = useState("");
  const [rfqEmail, setRfqEmail] = useState("");
  const [rfqCompany, setRfqCompany] = useState("");
  const [rfqNotes, setRfqNotes] = useState("");
  const [rfqSubmitted, setRfqSubmitted] = useState(false);

  // Quick Heat Calculation
  const hotDelta = Math.max(1, calcHotIn - calcHotOut);
  const coldDelta = Math.max(1, calcColdOut - calcColdIn);
  const lmtd = Math.max(1, (hotDelta - coldDelta) / Math.log(Math.max(1.05, hotDelta / Math.max(0.1, coldDelta)))).toFixed(1);
  const estimatedDutyMW = ((calcFlowRate * 4.18 * hotDelta) / 3600).toFixed(2);
  const estimatedAreaM2 = Math.round((Number(estimatedDutyMW) * 1000000) / (850 * Number(lmtd)));
  const estimatedTubeCount = Math.round(estimatedAreaM2 / (0.01905 * Math.PI * 6.0));

  const handleRfqSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setRfqSubmitted(true);
    setTimeout(() => {
      setRfqSubmitted(false);
      setRfqModalOpen(false);
    }, 2500);
  };

  return (
    <div className="space-y-12">
      {/* Top Breadcrumb & Navigation */}
      <div className="flex flex-wrap items-center justify-between gap-4 border-b border-white/10 pb-4">
        <button
          onClick={onBackToCatalog}
          className="flex items-center gap-2 text-xs font-mono text-cyan-400 hover:text-cyan-300 font-bold uppercase tracking-wider transition"
        >
          ← Back to All 18 Product Categories
        </button>

        <div className="flex items-center gap-3 font-mono text-xs text-white/50">
          <span>Categories</span>
          <span>/</span>
          <span className="text-cyan-400 font-bold">{product.title}</span>
        </div>
      </div>

      {/* Hero Banner Section */}
      <div className="relative bg-gradient-to-br from-[#0a0d14] via-[#050508] to-[#0d111c] border border-cyan-500/30 rounded-3xl p-8 sm:p-12 overflow-hidden shadow-2xl">
        <div className="absolute top-0 right-0 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 space-y-6 max-w-4xl">
          <div className="flex flex-wrap items-center gap-3">
            <span className="px-3 py-1 rounded-full text-xs font-mono font-bold uppercase tracking-wider bg-cyan-950 text-cyan-400 border border-cyan-500/40">
              {product.categoryTag}
            </span>
            <span className="px-3 py-1 rounded-full text-xs font-mono text-white/70 bg-white/5 border border-white/10">
              {product.badgeText}
            </span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight leading-tight">
            {product.title}
          </h1>

          <p className="text-lg text-cyan-200/80 font-medium leading-relaxed">
            {product.subtitle}
          </p>

          <p className="text-sm text-white/70 leading-relaxed max-w-3xl">
            {product.overview}
          </p>

          {/* Quick Stats Pill Matrix */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-4 border-t border-white/10">
            {product.quickStats.map((stat, idx) => (
              <div key={idx} className="p-3 bg-black/40 rounded-xl border border-white/10 font-mono">
                <div className="text-[10px] text-white/50 uppercase tracking-wider">{stat.label}</div>
                <div className="text-lg font-extrabold text-cyan-300 mt-0.5">{stat.value}</div>
                <div className="text-[10px] text-cyan-400/80 mt-0.5">{stat.detail}</div>
              </div>
            ))}
          </div>

          {/* Action CTAs */}
          <div className="flex flex-wrap items-center gap-4 pt-2">
            <button
              onClick={() => setRfqModalOpen(true)}
              className="px-6 py-3.5 bg-cyan-400 hover:bg-cyan-300 text-slate-950 font-extrabold text-xs uppercase tracking-wider rounded-xl shadow-lg hover:shadow-cyan-500/20 transition transform active:scale-95 flex items-center gap-2"
            >
              <Send className="w-4 h-4" /> Request Custom Quote & RFQ
            </button>

            <a
              href="#interactive-sim"
              className="px-6 py-3.5 bg-white/5 hover:bg-white/10 text-white font-bold text-xs uppercase tracking-wider rounded-xl border border-white/15 transition flex items-center gap-2 font-mono"
            >
              <Zap className="w-4 h-4 text-cyan-400" /> Launch CAD Flow Simulator
            </a>
          </div>
        </div>
      </div>

      {/* Section 1: Working Principle & Engineering Overview */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
        <div className="lg:col-span-7 bg-[#080a0f] border border-white/10 rounded-2xl p-6 sm:p-8 space-y-4">
          <div className="flex items-center gap-2 text-cyan-400 font-mono text-xs font-bold uppercase tracking-wider">
            <BookOpen className="w-4 h-4" /> Hydrodynamic & Thermal Physics
          </div>
          <h2 className="text-2xl font-bold text-white tracking-tight">
            Working Principle & Fluid Dynamics
          </h2>
          <p className="text-sm text-white/80 leading-relaxed">
            {product.workingPrinciple}
          </p>

          <div className="p-4 bg-cyan-950/30 border border-cyan-500/20 rounded-xl space-y-2 mt-4">
            <div className="text-xs font-mono font-bold text-cyan-300 uppercase tracking-wider">
              ASME & TEMA Design Margins
            </div>
            <p className="text-xs text-white/70">
              All Northern HeatEx units incorporate a minimum +15% thermal fouling surface margin and a 1.5x hydraulic pressure design factor to ensure continuous uninterrupted service life during operational upsets.
            </p>
          </div>
        </div>

        {/* Operating Limits Card */}
        <div className="lg:col-span-5 bg-[#080a0f] border border-white/10 rounded-2xl p-6 sm:p-8 flex flex-col justify-between space-y-4">
          <div className="flex items-center gap-2 text-amber-400 font-mono text-xs font-bold uppercase tracking-wider">
            <Sliders className="w-4 h-4" /> Operational Envelope Limits
          </div>
          <h2 className="text-2xl font-bold text-white tracking-tight">
            Maximum Rated Parameters
          </h2>

          <div className="space-y-3 font-mono text-xs">
            <div className="flex justify-between p-3 bg-black/40 rounded-lg border border-white/5">
              <span className="text-white/60">Max Design Pressure:</span>
              <span className="text-cyan-300 font-bold">{product.operatingLimits.maxPressureBar} Bar</span>
            </div>
            <div className="flex justify-between p-3 bg-black/40 rounded-lg border border-white/5">
              <span className="text-white/60">Operating Temperature:</span>
              <span className="text-red-400 font-bold">{product.operatingLimits.maxTempC}°C Max</span>
            </div>
            <div className="flex justify-between p-3 bg-black/40 rounded-lg border border-white/5">
              <span className="text-white/60">Max Volumetric Flow:</span>
              <span className="text-amber-300 font-bold">{product.operatingLimits.maxFlowM3h.toLocaleString()} m³/h</span>
            </div>
            <div className="flex justify-between p-3 bg-black/40 rounded-lg border border-white/5">
              <span className="text-white/60">Heat Transfer Area:</span>
              <span className="text-emerald-400 font-bold">{product.operatingLimits.surfaceAreaM2}</span>
            </div>
          </div>

          <div className="text-[11px] font-mono text-white/40 italic">
            * Custom high-pressure or extreme-cryogenic ratings available upon specialized request.
          </div>
        </div>
      </div>

      {/* Section 2: Interactive CAD & Thermal Flow Viewer */}
      <div id="interactive-sim" className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <span className="text-xs font-mono text-cyan-400 font-bold uppercase tracking-wider">
              Interactive Engineering Simulation
            </span>
            <h2 className="text-2xl font-bold text-white tracking-tight">
              Real-Time Cutaway & Hydraulic Viewer
            </h2>
          </div>
        </div>

        <InteractiveProductViewer product={product} onOpenRFQ={() => setRfqModalOpen(true)} />
      </div>

      {/* Section 3: Applications & Industry Grid */}
      <div className="space-y-6">
        <div className="border-b border-white/10 pb-4">
          <span className="text-xs font-mono text-cyan-400 font-bold uppercase tracking-wider">
            Industrial Deployments
          </span>
          <h2 className="text-2xl font-bold text-white tracking-tight">
            Applications & Industry Case Studies
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {product.applications.map((app, idx) => (
            <div
              key={idx}
              className="bg-[#0a0c12] border border-white/10 rounded-2xl p-6 hover:border-cyan-500/40 transition space-y-3 group"
            >
              <div className="flex items-center justify-between">
                <span className="px-2.5 py-1 bg-cyan-950/80 text-cyan-300 border border-cyan-500/30 text-[10px] font-mono font-bold uppercase rounded">
                  {app.industry}
                </span>
                <Building2 className="w-4 h-4 text-white/30 group-hover:text-cyan-400 transition" />
              </div>
              <h3 className="text-lg font-bold text-white group-hover:text-cyan-300 transition">
                {app.title}
              </h3>
              <p className="text-xs text-white/70 leading-relaxed">
                {app.desc}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Section 4: Engineering Features & Available Configurations */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Features (7 cols) */}
        <div className="lg:col-span-7 space-y-6">
          <div className="border-b border-white/10 pb-3">
            <span className="text-xs font-mono text-cyan-400 font-bold uppercase tracking-wider">
              Proprietary Innovations
            </span>
            <h2 className="text-2xl font-bold text-white tracking-tight">
              Engineering Features & Mechanics
            </h2>
          </div>

          <div className="space-y-4">
            {product.engineeringFeatures.map((feat, idx) => (
              <div key={idx} className="p-4 bg-[#0a0c12] border border-white/10 rounded-xl space-y-1">
                <div className="flex items-center gap-2 text-sm font-bold text-white">
                  <CheckCircle2 className="w-4 h-4 text-cyan-400 shrink-0" />
                  {feat.title}
                </div>
                <p className="text-xs text-white/70 pl-6 leading-relaxed">
                  {feat.desc}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Configurations (5 cols) */}
        <div className="lg:col-span-5 space-y-6">
          <div className="border-b border-white/10 pb-3">
            <span className="text-xs font-mono text-cyan-400 font-bold uppercase tracking-wider">
              Architectural Variants
            </span>
            <h2 className="text-2xl font-bold text-white tracking-tight">
              Available Configurations
            </h2>
          </div>

          <div className="space-y-3">
            {product.availableConfigurations.map((config, idx) => (
              <div
                key={idx}
                className="p-4 bg-gradient-to-r from-[#0a0c12] to-[#0d101a] border border-cyan-500/20 rounded-xl flex items-center justify-between font-mono text-xs text-cyan-200"
              >
                <span>{config}</span>
                <ChevronRight className="w-4 h-4 text-cyan-400" />
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Section 5: Materials & Corrosion Resistance Table */}
      <div className="space-y-6">
        <div className="border-b border-white/10 pb-4">
          <span className="text-xs font-mono text-cyan-400 font-bold uppercase tracking-wider">
            Metallurgical Matrix
          </span>
          <h2 className="text-2xl font-bold text-white tracking-tight">
            Materials of Construction & Corrosion Resistance
          </h2>
        </div>

        <div className="overflow-x-auto border border-white/10 rounded-2xl bg-[#080a0f]">
          <table className="w-full text-left text-xs font-mono">
            <thead className="bg-[#0d1018] border-b border-white/10 text-white/60 uppercase">
              <tr>
                <th className="p-4">Material Alloy</th>
                <th className="p-4">Grade Specification</th>
                <th className="p-4">Recommended Application</th>
                <th className="p-4 text-right">Corrosion Rating</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5 text-white/80">
              {product.materialsOptions.map((mat, idx) => (
                <tr key={idx} className="hover:bg-cyan-950/30 transition">
                  <td className="p-4 font-bold text-cyan-300">{mat.material}</td>
                  <td className="p-4 text-white/60">{mat.grade}</td>
                  <td className="p-4">{mat.application}</td>
                  <td className="p-4 text-right">
                    <span className="px-2.5 py-1 rounded bg-cyan-950 text-cyan-300 border border-cyan-500/30 font-bold">
                      {mat.corrosionRating}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Section 6: Manufacturing QA/QC & Standards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* QA/QC Steps */}
        <div className="bg-[#080a0f] border border-white/10 rounded-2xl p-6 sm:p-8 space-y-4">
          <div className="flex items-center gap-2 text-cyan-400 font-mono text-xs font-bold uppercase tracking-wider">
            <Award className="w-4 h-4" /> ASME Quality Program
          </div>
          <h2 className="text-2xl font-bold text-white tracking-tight">
            Manufacturing & Inspection QA/QC
          </h2>
          <div className="space-y-3 font-mono text-xs">
            {product.manufacturingQC.map((qc, idx) => (
              <div key={idx} className="flex items-start gap-3 p-3 bg-black/40 rounded-lg border border-white/5">
                <span className="w-5 h-5 rounded-full bg-cyan-950 text-cyan-400 border border-cyan-500/40 flex items-center justify-center font-bold text-[10px] shrink-0 mt-0.5">
                  {idx + 1}
                </span>
                <span className="text-white/80">{qc}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Standards */}
        <div className="bg-[#080a0f] border border-white/10 rounded-2xl p-6 sm:p-8 space-y-4">
          <div className="flex items-center gap-2 text-amber-400 font-mono text-xs font-bold uppercase tracking-wider">
            <ShieldAlert className="w-4 h-4" /> Global Design Codes
          </div>
          <h2 className="text-2xl font-bold text-white tracking-tight">
            Applicable Codes & Standards
          </h2>
          <div className="space-y-2.5 font-mono text-xs">
            {product.asmeStandards.map((std, idx) => (
              <div key={idx} className="p-3 bg-cyan-950/20 border border-cyan-500/20 rounded-xl flex items-center gap-3 text-cyan-200">
                <CheckCircle2 className="w-4 h-4 text-cyan-400 shrink-0" />
                <span>{std}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Section 7: Live Quick Engineering Sizing Calculator */}
      <div className="bg-gradient-to-br from-[#0a0d16] to-[#06080e] border border-cyan-500/30 rounded-2xl p-6 sm:p-8 space-y-6">
        <div className="flex flex-wrap items-center justify-between gap-4 border-b border-white/10 pb-4">
          <div>
            <span className="text-xs font-mono text-cyan-400 font-bold uppercase tracking-wider flex items-center gap-1.5">
              <Calculator className="w-4 h-4" /> Rapid Sizing Estimator
            </span>
            <h2 className="text-2xl font-bold text-white tracking-tight mt-1">
              Quick Hydraulic & Thermal Duty Calculator
            </h2>
          </div>
          {onNavigateToTab && (
            <button
              onClick={() => onNavigateToTab("thermal-calc")}
              className="px-4 py-2 bg-blue-600/30 hover:bg-blue-600/50 text-cyan-300 border border-blue-500/50 rounded-xl text-xs font-mono font-bold uppercase tracking-wider transition"
            >
              Open Full ASME Engine →
            </button>
          )}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          {/* Inputs (7 cols) */}
          <div className="lg:col-span-7 grid grid-cols-2 gap-4 font-mono text-xs">
            <div className="space-y-1">
              <label className="text-white/60">Hot Inlet Temp (°C)</label>
              <input
                type="number"
                value={calcHotIn}
                onChange={(e) => setCalcHotIn(Number(e.target.value))}
                className="w-full bg-slate-900 border border-white/15 rounded-lg p-2.5 text-white font-bold"
              />
            </div>
            <div className="space-y-1">
              <label className="text-white/60">Hot Outlet Temp (°C)</label>
              <input
                type="number"
                value={calcHotOut}
                onChange={(e) => setCalcHotOut(Number(e.target.value))}
                className="w-full bg-slate-900 border border-white/15 rounded-lg p-2.5 text-white font-bold"
              />
            </div>
            <div className="space-y-1">
              <label className="text-white/60">Cold Inlet Temp (°C)</label>
              <input
                type="number"
                value={calcColdIn}
                onChange={(e) => setCalcColdIn(Number(e.target.value))}
                className="w-full bg-slate-900 border border-white/15 rounded-lg p-2.5 text-white font-bold"
              />
            </div>
            <div className="space-y-1">
              <label className="text-white/60">Cold Outlet Temp (°C)</label>
              <input
                type="number"
                value={calcColdOut}
                onChange={(e) => setCalcColdOut(Number(e.target.value))}
                className="w-full bg-slate-900 border border-white/15 rounded-lg p-2.5 text-white font-bold"
              />
            </div>
            <div className="col-span-2 space-y-1">
              <label className="text-white/60">Volumetric Flow Rate (m³/h)</label>
              <input
                type="number"
                value={calcFlowRate}
                onChange={(e) => setCalcFlowRate(Number(e.target.value))}
                className="w-full bg-slate-900 border border-white/15 rounded-lg p-2.5 text-amber-300 font-bold"
              />
            </div>
          </div>

          {/* Results Card (5 cols) */}
          <div className="lg:col-span-5 bg-black/60 border border-cyan-500/30 rounded-xl p-6 space-y-4 font-mono text-xs">
            <div className="text-xs font-bold text-cyan-400 uppercase tracking-wider">
              Estimated Thermal Duty & Surface Area
            </div>
            <div className="space-y-3">
              <div className="flex justify-between p-3 bg-white/5 rounded-lg">
                <span className="text-white/60">LMTD Delta T:</span>
                <span className="text-cyan-300 font-bold">{lmtd}°C</span>
              </div>
              <div className="flex justify-between p-3 bg-white/5 rounded-lg">
                <span className="text-white/60">Estimated Duty:</span>
                <span className="text-amber-300 font-bold text-sm">{estimatedDutyMW} MW</span>
              </div>
              <div className="flex justify-between p-3 bg-white/5 rounded-lg">
                <span className="text-white/60">Req. Transfer Area:</span>
                <span className="text-emerald-400 font-bold">{estimatedAreaM2} m²</span>
              </div>
              <div className="flex justify-between p-3 bg-white/5 rounded-lg">
                <span className="text-white/60">Est. 3/4" Tube Count:</span>
                <span className="text-purple-300 font-bold">{estimatedTubeCount} Tubes</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Section 8: Downloads & Technical Manuals */}
      <div className="space-y-6">
        <div className="border-b border-white/10 pb-4">
          <span className="text-xs font-mono text-cyan-400 font-bold uppercase tracking-wider">
            Documentation & CAD Models
          </span>
          <h2 className="text-2xl font-bold text-white tracking-tight">
            Engineering Downloads & GA Drawings
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {product.downloads.map((dl, idx) => (
            <div
              key={idx}
              className="bg-[#080a0f] border border-white/10 rounded-2xl p-6 flex flex-col justify-between space-y-4 hover:border-cyan-500/40 transition"
            >
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="px-2 py-0.5 bg-cyan-950 text-cyan-300 text-[10px] font-mono font-bold uppercase rounded border border-cyan-500/30">
                    {dl.format} ({dl.size})
                  </span>
                  <FileText className="w-4 h-4 text-white/40" />
                </div>
                <h3 className="text-sm font-bold text-white mt-2">{dl.title}</h3>
                <p className="text-xs text-white/50 font-mono">{dl.docType}</p>
              </div>

              <button
                onClick={() => alert(`Downloading ${dl.title}...`)}
                className="w-full py-2.5 bg-white/5 hover:bg-white/10 text-cyan-300 border border-white/15 rounded-xl text-xs font-mono font-bold flex items-center justify-center gap-2 transition"
              >
                <Download className="w-3.5 h-3.5" /> Download File
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Section 9: Technical FAQs */}
      <div className="space-y-6">
        <div className="border-b border-white/10 pb-4">
          <span className="text-xs font-mono text-cyan-400 font-bold uppercase tracking-wider flex items-center gap-1.5">
            <HelpCircle className="w-4 h-4" /> Technical Q&A
          </span>
          <h2 className="text-2xl font-bold text-white tracking-tight">
            Frequently Asked Engineering Questions
          </h2>
        </div>

        <div className="space-y-3">
          {product.faqs.map((faq, idx) => {
            const isOpen = activeFaq === idx;
            return (
              <div
                key={idx}
                className="bg-[#080a0f] border border-white/10 rounded-xl overflow-hidden transition"
              >
                <button
                  onClick={() => setActiveFaq(isOpen ? null : idx)}
                  className="w-full p-4 text-left flex items-center justify-between gap-4 font-bold text-white text-sm hover:text-cyan-300"
                >
                  <span>{faq.q}</span>
                  <ChevronDown className={`w-4 h-4 text-cyan-400 transition-transform ${isOpen ? "rotate-180" : ""}`} />
                </button>

                {isOpen && (
                  <div className="p-4 pt-0 text-xs text-white/70 leading-relaxed border-t border-white/5 bg-black/30 font-sans">
                    {faq.a}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Bottom Conversion CTA Card */}
      <div className="bg-gradient-to-r from-blue-900/40 via-cyan-950/60 to-slate-900 border border-cyan-500/40 rounded-3xl p-8 sm:p-12 text-center space-y-6 relative overflow-hidden shadow-2xl">
        <div className="max-w-2xl mx-auto space-y-4">
          <span className="px-3 py-1 rounded-full text-xs font-mono font-bold uppercase tracking-widest bg-cyan-400 text-slate-950">
            ASME Certified Engineering Consultation
          </span>
          <h2 className="text-3xl font-extrabold text-white tracking-tight">
            Need a Custom Thermal Design for {product.title}?
          </h2>
          <p className="text-sm text-cyan-100/80 leading-relaxed">
            Upload your process datasheet, stream fluid properties, or OEM dimensions. Our senior thermal engineers will provide an ASME-compliant thermal sizing calculation and commercial proposal within 24 hours.
          </p>

          <div className="pt-4 flex flex-wrap items-center justify-center gap-4">
            <button
              onClick={() => setRfqModalOpen(true)}
              className="px-8 py-4 bg-cyan-400 hover:bg-cyan-300 text-slate-950 font-extrabold text-xs uppercase tracking-wider rounded-xl shadow-2xl transition transform active:scale-95 flex items-center gap-2"
            >
              <Send className="w-4 h-4" /> Upload RFQ & Request Sizing
            </button>
          </div>
        </div>
      </div>

      {/* RFQ Drawer / Modal */}
      {rfqModalOpen && (
        <div className="fixed inset-0 z-[120] bg-black/80 backdrop-blur-md flex items-center justify-center p-4">
          <div className="bg-[#0a0d14] border border-cyan-500/40 rounded-2xl p-6 sm:p-8 max-w-xl w-full relative shadow-2xl space-y-6">
            <button
              onClick={() => setRfqModalOpen(false)}
              className="absolute top-4 right-4 p-2 text-white/50 hover:text-white rounded-lg bg-white/5"
            >
              <X className="w-5 h-5" />
            </button>

            <div>
              <span className="text-xs font-mono text-cyan-400 font-bold uppercase tracking-wider">
                Engineering RFQ Specification
              </span>
              <h3 className="text-xl font-bold text-white mt-1">
                Request Proposal for {product.title}
              </h3>
            </div>

            {rfqSubmitted ? (
              <div className="py-12 text-center space-y-4">
                <div className="w-16 h-16 rounded-full bg-cyan-950 border border-cyan-400 flex items-center justify-center mx-auto text-cyan-400">
                  <CheckCircle2 className="w-8 h-8" />
                </div>
                <h4 className="text-xl font-bold text-white">RFQ Successfully Transmitted!</h4>
                <p className="text-xs font-mono text-white/70">
                  Reference ID: <span className="text-cyan-300 font-bold">NHEE-RFQ-{Math.floor(Math.random()*899999+100000)}</span>
                </p>
                <p className="text-xs text-white/50">
                  Our Senior Thermal Engineering team has received your parameters and will respond within 24 hours.
                </p>
              </div>
            ) : (
              <form onSubmit={handleRfqSubmit} className="space-y-4 font-mono text-xs">
                <div className="space-y-1">
                  <label className="text-white/70">Contact Name *</label>
                  <input
                    type="text"
                    required
                    value={rfqName}
                    onChange={(e) => setRfqName(e.target.value)}
                    placeholder="e.g. Dr. Marcus Vance"
                    className="w-full bg-slate-900 border border-white/15 rounded-lg p-2.5 text-white font-sans text-sm focus:border-cyan-400 focus:outline-none"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label className="text-white/70">Work Email *</label>
                    <input
                      type="email"
                      required
                      value={rfqEmail}
                      onChange={(e) => setRfqEmail(e.target.value)}
                      placeholder="m.vance@siemens-energy.com"
                      className="w-full bg-slate-900 border border-white/15 rounded-lg p-2.5 text-white font-sans text-sm focus:border-cyan-400 focus:outline-none"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-white/70">Company / Entity</label>
                    <input
                      type="text"
                      value={rfqCompany}
                      onChange={(e) => setRfqCompany(e.target.value)}
                      placeholder="Siemens Energy / Alfa Laval"
                      className="w-full bg-slate-900 border border-white/15 rounded-lg p-2.5 text-white font-sans text-sm focus:border-cyan-400 focus:outline-none"
                    />
                  </div>
                </div>

                <div className="space-y-1">
                  <label className="text-white/70">Process Notes & Operating Conditions</label>
                  <textarea
                    rows={3}
                    value={rfqNotes}
                    onChange={(e) => setRfqNotes(e.target.value)}
                    placeholder="Provide design pressure, fluid medium, shell diameter, or special metallurgy requirements..."
                    className="w-full bg-slate-900 border border-white/15 rounded-lg p-2.5 text-white font-sans text-xs focus:border-cyan-400 focus:outline-none"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-3.5 bg-cyan-400 hover:bg-cyan-300 text-slate-950 font-extrabold uppercase rounded-xl transition shadow-lg text-xs"
                >
                  Submit Engineering RFQ
                </button>
              </form>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
