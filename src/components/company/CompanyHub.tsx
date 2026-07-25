import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { CompanyOverviewSection } from "./CompanyOverview";
import { LegacyAndValuesSection } from "./LegacyAndValues";
import { LeadershipAndWhyUsSection } from "./LeadershipAndWhyUs";
import { ManufacturingAndQualitySection } from "./ManufacturingAndQuality";
import { InnovationAndRndSection } from "./InnovationAndRnd";
import { SustainabilityAndCSRSection } from "./SustainabilityAndCSR";
import { GlobalVisionAndPartnershipsSection } from "./GlobalVisionAndPartnerships";
import { CareersPortalSection } from "./CareersPortal";
import {
  Building2,
  BookOpen,
  Users,
  Factory,
  Sparkles,
  Leaf,
  Globe2,
  GraduationCap,
  Layers,
  Search,
  CheckCircle2,
  Download,
  ShieldCheck,
  Zap,
  ArrowRight,
  Flame,
  Award,
} from "lucide-react";

interface CompanyHubProps {
  onQuickQuoteClick?: () => void;
}

export const CompanyHub: React.FC<CompanyHubProps> = ({ onQuickQuoteClick }) => {
  // Navigation mode: 'tabbed' (single-page focused) or 'dossier' (continuous 20-page document view)
  const [viewMode, setViewMode] = useState<"tabbed" | "dossier">("tabbed");
  const [activePage, setActivePage] = useState<string>("overview");
  const [searchQuery, setSearchQuery] = useState<string>("");

  const pageCategories = [
    {
      category: "Overview & Story",
      pages: [
        { id: "overview", name: "01. Company Overview", icon: Building2 },
        { id: "story", name: "02. Our Story", icon: BookOpen },
      ],
    },
    {
      category: "Heritage & Philosophy",
      pages: [
        { id: "legacy", name: "03. Engineering Legacy", icon: Award },
        { id: "mission", name: "04. Mission", icon: Zap },
        { id: "vision", name: "05. Vision", icon: Sparkles },
        { id: "values", name: "06. Core Values", icon: ShieldCheck },
      ],
    },
    {
      category: "Governance & Strategy",
      pages: [
        { id: "leadership", name: "07. Leadership", icon: Users },
        { id: "why-us", name: "08. Why Northern HeatEx", icon: CheckCircle2 },
        { id: "contact-leadership", name: "20. Contact Leadership", icon: Users },
      ],
    },
    {
      category: "Manufacturing & Quality",
      pages: [
        { id: "manufacturing", name: "09. Manufacturing Philosophy", icon: Factory },
        { id: "quality", name: "14. Quality Commitment", icon: ShieldCheck },
        { id: "certifications", name: "15. Certifications & Standards", icon: Award },
      ],
    },
    {
      category: "Innovation & Technology",
      pages: [
        { id: "innovation", name: "10. Innovation", icon: Sparkles },
        { id: "rnd", name: "16. Research & Development", icon: Layers },
      ],
    },
    {
      category: "Sustainability & Society",
      pages: [
        { id: "sustainability", name: "11. Sustainability", icon: Leaf },
        { id: "csr", name: "17. CSR & Community", icon: Leaf },
      ],
    },
    {
      category: "Global & Careers",
      pages: [
        { id: "global-vision", name: "12. Global Vision", icon: Globe2 },
        { id: "timeline", name: "13. Corporate Timeline", icon: BookOpen },
        { id: "partnerships", name: "19. Global Partnerships", icon: Globe2 },
        { id: "careers", name: "18. Careers Portal", icon: GraduationCap },
      ],
    },
  ];

  const handleNavigate = (pageId: string) => {
    setActivePage(pageId);
    if (viewMode === "dossier") {
      const el = document.getElementById(pageId);
      if (el) el.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div className="space-y-10 pb-16">
      {/* Hero Header */}
      <div className="relative bg-gradient-to-br from-[#090d16] via-[#050505] to-[#0c121e] border border-white/10 rounded-3xl p-8 lg:p-12 shadow-2xl overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-blue-600/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 space-y-6">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <span className="bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 text-xs font-mono px-3 py-1 rounded-full font-bold uppercase tracking-wider flex items-center gap-1.5">
                <Flame className="w-3.5 h-3.5" /> NORTHERN HEATEX CORPORATION
              </span>
              <span className="text-white/30 text-xs font-mono">|</span>
              <span className="text-white/60 text-xs font-mono">Noor Engineering Works (Parent Company est. 1983) • Government Sector Partner</span>
            </div>

            {/* View Mode Toggle Switch */}
            <div className="flex items-center gap-1 bg-slate-900/90 p-1 rounded-xl border border-white/10 font-mono text-xs">
              <button
                onClick={() => setViewMode("tabbed")}
                className={`px-3 py-1.5 rounded-lg font-bold transition ${
                  viewMode === "tabbed"
                    ? "bg-cyan-500 text-slate-950 shadow-md"
                    : "text-slate-400 hover:text-white"
                }`}
              >
                Page-by-Page Focus View
              </button>
              <button
                onClick={() => setViewMode("dossier")}
                className={`px-3 py-1.5 rounded-lg font-bold transition ${
                  viewMode === "dossier"
                    ? "bg-cyan-500 text-slate-950 shadow-md"
                    : "text-slate-400 hover:text-white"
                }`}
              >
                Full 20-Page Corporate Dossier
              </button>
            </div>
          </div>

          <div className="max-w-4xl space-y-3">
            <h1 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight leading-tight">
              Northern HeatEx Corporate Hub & Official Engineering Specification
            </h1>
            <p className="text-sm sm:text-base text-slate-300 font-light leading-relaxed">
              Explore our 20 corporate dossiers detailing our 48-year engineering heritage, ASME Section VIII Div 1 & TEMA Class R manufacturing capabilities, executive leadership, R&D AI innovations, and global sustainability commitments.
            </p>
          </div>

          {/* Real-Time Enterprise Metrics Banner */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-4 border-t border-white/10 font-mono text-xs">
            <div className="bg-white/5 p-3 rounded-xl border border-white/5">
              <span className="text-slate-400 text-[10px] block uppercase">Engineering Heritage</span>
              <span className="text-lg font-extrabold text-cyan-400 block">1978 — 2026+</span>
              <span className="text-[10px] text-slate-500">48 Years Innovation</span>
            </div>

            <div className="bg-white/5 p-3 rounded-xl border border-white/5">
              <span className="text-slate-400 text-[10px] block uppercase">ASME Code & Inspection</span>
              <span className="text-lg font-extrabold text-cyan-400 block">Sec VIII Div 1 & TEMA</span>
              <span className="text-[10px] text-slate-500">Third Party Inspection (TPI)</span>
            </div>

            <div className="bg-white/5 p-3 rounded-xl border border-white/5">
              <span className="text-slate-400 text-[10px] block uppercase">Global Exchanger Units</span>
              <span className="text-lg font-extrabold text-cyan-400 block">14,200+ Installed</span>
              <span className="text-[10px] text-slate-500">Across 38 Export Markets</span>
            </div>

            <div className="bg-white/5 p-3 rounded-xl border border-white/5">
              <span className="text-slate-400 text-[10px] block uppercase">Quality First Pass Rate</span>
              <span className="text-lg font-extrabold text-emerald-400 block">99.8% Hydro Success</span>
              <span className="text-[10px] text-slate-500">Mass Spec Helium Verified</span>
            </div>
          </div>
        </div>
      </div>

      {/* 20-Page Selector / Quick Jump Bar */}
      <div className="bg-slate-950 border border-slate-800 rounded-2xl p-4 shadow-xl space-y-3 font-mono text-xs">
        <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-800 pb-2">
          <span className="text-slate-400 font-bold uppercase tracking-wider text-[11px] flex items-center gap-2">
            <Layers className="w-4 h-4 text-cyan-400" />
            20 Corporate Dossier Pages (Click to View)
          </span>

          <div className="relative w-full sm:w-64">
            <Search className="w-3.5 h-3.5 text-slate-500 absolute left-3 top-2.5" />
            <input
              type="text"
              placeholder="Search 20 corporate pages..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-slate-900 border border-slate-800 rounded-lg pl-8 pr-3 py-1.5 text-slate-200 text-xs focus:border-cyan-500 focus:outline-none"
            />
          </div>
        </div>

        {/* Categories & Page Pills */}
        <div className="flex flex-wrap gap-2 pt-1">
          {pageCategories.flatMap((cat) => cat.pages).map((p) => {
            const IconC = p.icon;
            const isSel = activePage === p.id;
            if (searchQuery && !p.name.toLowerCase().includes(searchQuery.toLowerCase())) return null;

            return (
              <button
                key={p.id}
                onClick={() => handleNavigate(p.id)}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-[11px] font-mono transition border ${
                  isSel
                    ? "bg-cyan-500 text-slate-950 font-bold border-cyan-400 shadow-md shadow-cyan-950/40"
                    : "bg-slate-900 text-slate-300 hover:text-white hover:bg-slate-800 border-slate-800"
                }`}
              >
                <IconC className={`w-3.5 h-3.5 ${isSel ? "text-slate-950" : "text-cyan-400"}`} />
                <span>{p.name}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Main Content Area */}
      {viewMode === "tabbed" ? (
        <AnimatePresence mode="wait">
          <motion.div
            key={activePage}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
          >
            {(activePage === "overview" || activePage === "story") && (
              <CompanyOverviewSection onNavigateToSection={handleNavigate} />
            )}

            {(activePage === "legacy" ||
              activePage === "mission" ||
              activePage === "vision" ||
              activePage === "values") && <LegacyAndValuesSection />}

            {(activePage === "leadership" ||
              activePage === "why-us" ||
              activePage === "contact-leadership") && (
              <LeadershipAndWhyUsSection onRequestConsultation={onQuickQuoteClick} />
            )}

            {(activePage === "manufacturing" ||
              activePage === "quality" ||
              activePage === "certifications") && <ManufacturingAndQualitySection />}

            {(activePage === "innovation" || activePage === "rnd") && <InnovationAndRndSection />}

            {(activePage === "sustainability" || activePage === "csr") && (
              <SustainabilityAndCSRSection />
            )}

            {(activePage === "global-vision" ||
              activePage === "timeline" ||
              activePage === "partnerships") && <GlobalVisionAndPartnershipsSection />}

            {activePage === "careers" && <CareersPortalSection />}
          </motion.div>
        </AnimatePresence>
      ) : (
        /* Long-Form Full 20-Page Corporate Dossier View */
        <div className="space-y-16">
          <CompanyOverviewSection onNavigateToSection={handleNavigate} />
          <LegacyAndValuesSection />
          <LeadershipAndWhyUsSection onRequestConsultation={onQuickQuoteClick} />
          <ManufacturingAndQualitySection />
          <InnovationAndRndSection />
          <SustainabilityAndCSRSection />
          <GlobalVisionAndPartnershipsSection />
          <CareersPortalSection />
        </div>
      )}
    </div>
  );
};
