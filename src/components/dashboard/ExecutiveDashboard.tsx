import React, { useState } from "react";
import { UserRole, EngineeringTab } from "../../types";
import {
  Flame,
  Clock,
  FileCheck,
  Bot,
  BarChart3,
  Download,
  Star,
  Bell,
  ChevronRight,
  ShieldCheck,
  Sparkles,
  Zap,
  Activity,
  Layers,
  Calculator,
  Cpu,
  FileSpreadsheet,
  Grid,
  Boxes,
  Sliders,
  CheckCircle2,
  AlertTriangle,
  FolderGit2,
  Share2,
  FileText,
} from "lucide-react";

interface ExecutiveDashboardProps {
  currentRole: UserRole;
  onNavigateTab: (tab: EngineeringTab) => void;
  onQuickQuoteClick: () => void;
}

export const ExecutiveDashboard: React.FC<ExecutiveDashboardProps> = ({
  currentRole,
  onNavigateTab,
  onQuickQuoteClick,
}) => {
  const [activeFilter, setActiveFilter] = useState<"all" | "active" | "completed">("all");

  const recentProjects = [
    {
      id: "NHES-2026-0881",
      client: "Siemens Energy India Ltd",
      type: "Stator Air Cooler (Double Tubesheet)",
      status: "CNC Machining",
      progress: 68,
      asme: true,
      lastUpdated: "2 hours ago",
      duty: "1,250 kW",
      material: "Cu-Ni 70/30",
    },
    {
      id: "NHES-2026-0882",
      client: "GE Vernova - Haridwar Hydro",
      type: "Bearing Oil Cooler (U-Tube)",
      status: "Hydro Testing",
      progress: 92,
      asme: true,
      lastUpdated: "5 hours ago",
      duty: "450 kW",
      material: "Admiralty Brass C44300",
    },
    {
      id: "NHES-2026-0883",
      client: "IOCL Refineries Mathura",
      type: "High-Pressure Hydrogen Reboiler",
      status: "Engineering Review",
      progress: 25,
      asme: true,
      lastUpdated: "1 day ago",
      duty: "4,800 kW",
      material: "SA-516 Gr 70 + Monel Clad",
    },
    {
      id: "NHES-2026-0884",
      client: "NTPC Ramagundam Power",
      type: "Surface Condenser Tube Bundle",
      status: "Factory Acceptance",
      progress: 98,
      asme: true,
      lastUpdated: "Yesterday",
      duty: "12,000 kW",
      material: "Titanium Grade 2",
    },
  ];

  const savedDesigns = [
    { id: "DES-901", name: "BEM 800mm High Viscosity Oil Cooler", date: "Jul 24, 2026", area: "128 m²", pressure: "25 Bar" },
    { id: "DES-902", name: "BEU Wire Wound Fin Hydrogen Cooler", date: "Jul 22, 2026", area: "84 m²", pressure: "60 Bar" },
    { id: "DES-903", name: "AES Floating Head Naphtha Heat Exchanger", date: "Jul 20, 2026", area: "310 m²", pressure: "40 Bar" },
  ];

  const pendingReports = [
    { title: "ASME Form U-1 Manufacturer Data Report", project: "NHES-2026-0882", reviewer: "Chief Inspector", status: "Signoff Required" },
    { title: "Thermal Performance & LMTD Verification", project: "NHES-2026-0883", reviewer: "Lead Thermal Engineer", status: "In Review" },
    { title: "WPS/PQR Tube-to-Tubesheet Joint Qualification", project: "NHES-2026-0881", reviewer: "Metallurgy Team", status: "Approved" },
  ];

  const latestAIConversations = [
    { agent: "AI Failure Analyst", topic: "Acoustic vibration & baffle pitch tuning for high velocity gas stream", time: "10 mins ago" },
    { agent: "AI Mechanical Specialist", topic: "ASME UG-27 shell thickness validation at 35 bar design pressure", time: "1 hour ago" },
    { agent: "AI Material Selector", topic: "Duplex 2205 vs Titanium Gr 2 in high chloride brackish water", time: "3 hours ago" },
  ];

  const favoriteCalculators = [
    { title: "Thermal Sizing Engine", tab: "thermal-calc" as EngineeringTab, icon: Calculator, badge: "LMTD & NTU" },
    { title: "ASME VIII Div 1 Thickness", tab: "mechanical-asme" as EngineeringTab, icon: ShieldCheck, badge: "UG-27 / UG-34" },
    { title: "Pro Fabrication Estimator", tab: "fabrication" as EngineeringTab, icon: FileSpreadsheet, badge: "Multi-Currency" },
    { title: "Official Letterhead Studio", tab: "official-letterhead" as EngineeringTab, icon: FileText, badge: "Admin Dispatch" },
    { title: "AI Cost & Proposal Generator", tab: "cost-quotation" as EngineeringTab, icon: FileSpreadsheet, badge: "Instant Quote" },
    { title: "AI Failure Diagnostics", tab: "ai-suite" as EngineeringTab, icon: Bot, badge: "Gemini 3.6 Flash" },
  ];

  const notifications = [
    { id: 1, text: "Hydrotest passed at 45.5 Bar for Siemens Stator Cooler (NHES-0881)", type: "success", time: "15m ago" },
    { id: 2, text: "Material certificate for Titanium Grade 2 tubes approved by NDT Auditor", type: "info", time: "1h ago" },
    { id: 3, text: "Engineering Revision 2 required for Nozzle N1 flange rating", type: "alert", time: "3h ago" },
  ];

  return (
    <div className="space-y-8 animate-fadeIn">
      {/* Apple-style Glassmorphism Header */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-[#0a0d14] via-[#06080e] to-[#0d1322] border border-cyan-500/20 p-8 shadow-2xl backdrop-blur-xl">
        <div className="absolute top-0 right-0 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-blue-600/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-3 max-w-3xl">
            <div className="flex flex-wrap items-center gap-2 font-mono text-xs">
              <span className="px-3 py-1 rounded-full bg-cyan-950/80 text-cyan-400 border border-cyan-500/40 flex items-center gap-1.5 font-bold">
                <Zap className="w-3.5 h-3.5 text-cyan-400 animate-pulse" /> NHES Enterprise v3.2
              </span>
              <span className="px-3 py-1 rounded-full bg-white/5 text-white/70 border border-white/10 flex items-center gap-1.5">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" /> Role: <strong className="text-white">{currentRole}</strong>
              </span>
              <span className="px-3 py-1 rounded-full bg-white/5 text-cyan-300 border border-white/10 font-mono">
                Haridwar Facility • India
              </span>
            </div>

            <h1 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight leading-tight">
              Northern HeatEx <span className="bg-gradient-to-r from-cyan-400 via-blue-400 to-indigo-400 bg-clip-text text-transparent">Engineering Suite</span>
            </h1>

            <p className="text-sm sm:text-base text-cyan-200/80 font-normal leading-relaxed">
              AI-driven thermal sizing, ASME Section VIII mechanical verification, generative CAD tube layouts, fabrication sequencing, and commercial proposal engine for heavy industrial process equipment.
            </p>
          </div>

          <div className="flex flex-wrap sm:flex-col gap-3 min-w-[200px]">
            <button
              onClick={() => onNavigateTab("ai-designer")}
              className="w-full py-3 px-5 bg-gradient-to-r from-cyan-500 via-blue-600 to-indigo-600 hover:from-cyan-400 hover:to-indigo-500 text-slate-950 font-bold rounded-2xl text-xs uppercase tracking-wider flex items-center justify-center gap-2 shadow-xl shadow-cyan-500/20 transition group"
            >
              <Sparkles className="w-4 h-4 text-slate-950 group-hover:scale-125 transition" />
              <span>Launch AI Designer</span>
            </button>
            <button
              onClick={onQuickQuoteClick}
              className="w-full py-3 px-5 bg-white/5 hover:bg-white/10 text-white border border-white/15 rounded-2xl text-xs uppercase font-mono font-bold tracking-wider flex items-center justify-center gap-2 transition"
            >
              <FileSpreadsheet className="w-4 h-4 text-cyan-400" />
              <span>Request Quote</span>
            </button>
          </div>
        </div>

        {/* Executive KPI Bar */}
        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-6 gap-3 mt-8 pt-6 border-t border-white/10 font-mono">
          <div className="p-3 bg-black/40 rounded-xl border border-white/10">
            <div className="text-[10px] text-white/50 uppercase">Active Projects</div>
            <div className="text-xl font-black text-cyan-400">14 Units</div>
          </div>
          <div className="p-3 bg-black/40 rounded-xl border border-white/10">
            <div className="text-[10px] text-white/50 uppercase">ASME Stamped</div>
            <div className="text-xl font-black text-emerald-400">100% Valid</div>
          </div>
          <div className="p-3 bg-black/40 rounded-xl border border-white/10">
            <div className="text-[10px] text-white/50 uppercase">Saved Designs</div>
            <div className="text-xl font-black text-indigo-300">42 Models</div>
          </div>
          <div className="p-3 bg-black/40 rounded-xl border border-white/10">
            <div className="text-[10px] text-white/50 uppercase">Pending Audits</div>
            <div className="text-xl font-black text-amber-400">3 Reports</div>
          </div>
          <div className="p-3 bg-black/40 rounded-xl border border-white/10">
            <div className="text-[10px] text-white/50 uppercase">AI Queries</div>
            <div className="text-xl font-black text-blue-300">188 Sessions</div>
          </div>
          <div className="p-3 bg-black/40 rounded-xl border border-white/10">
            <div className="text-[10px] text-white/50 uppercase">Production Status</div>
            <div className="text-xl font-black text-emerald-300">On Schedule</div>
          </div>
        </div>
      </div>

      {/* Main Grid: Projects, Calculators & Reports */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left 2 Columns: Recent Projects & Saved Designs */}
        <div className="lg:col-span-2 space-y-8">
          {/* Recent Projects Panel */}
          <div className="bg-[#080a0f] border border-white/10 rounded-3xl p-6 space-y-6 shadow-xl">
            <div className="flex flex-wrap items-center justify-between gap-4">
              <div>
                <h2 className="text-xl font-bold text-white flex items-center gap-2">
                  <Activity className="w-5 h-5 text-cyan-400" /> Active Engineering Projects
                </h2>
                <p className="text-xs text-white/60 font-mono">Live status from Haridwar manufacturing facility</p>
              </div>

              <div className="flex items-center gap-2 font-mono text-xs">
                <button
                  onClick={() => setActiveFilter("all")}
                  className={`px-3 py-1 rounded-lg transition ${
                    activeFilter === "all" ? "bg-cyan-500 text-slate-950 font-bold" : "bg-white/5 text-white/60 hover:text-white"
                  }`}
                >
                  All (14)
                </button>
                <button
                  onClick={() => onNavigateTab("project-manager")}
                  className="px-3 py-1 bg-white/5 text-cyan-300 hover:bg-white/10 rounded-lg flex items-center gap-1"
                >
                  Project Manager <ChevronRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>

            <div className="space-y-3">
              {recentProjects.map((proj) => (
                <div
                  key={proj.id}
                  onClick={() => onNavigateTab("project-manager")}
                  className="bg-black/40 border border-white/10 hover:border-cyan-500/50 rounded-2xl p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4 cursor-pointer transition group"
                >
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="font-mono text-xs font-bold text-cyan-400 px-2 py-0.5 bg-cyan-950 rounded border border-cyan-500/30">
                        {proj.id}
                      </span>
                      <h3 className="text-sm font-bold text-white group-hover:text-cyan-300 transition">
                        {proj.client}
                      </h3>
                      {proj.asme && (
                        <span className="text-[10px] font-mono px-1.5 py-0.2 bg-emerald-950 text-emerald-400 rounded border border-emerald-500/30">
                          ASME U
                        </span>
                      )}
                    </div>
                    <p className="text-xs text-white/70">{proj.type}</p>
                    <div className="flex items-center gap-3 text-[11px] font-mono text-white/40">
                      <span>Duty: <strong className="text-cyan-300">{proj.duty}</strong></span>
                      <span>•</span>
                      <span>Material: <strong className="text-white/80">{proj.material}</strong></span>
                    </div>
                  </div>

                  <div className="sm:text-right space-y-1.5 min-w-[160px]">
                    <div className="flex items-center justify-between sm:justify-end gap-2 font-mono text-xs">
                      <span className="text-white/60">{proj.status}</span>
                      <span className="font-bold text-cyan-400">{proj.progress}%</span>
                    </div>
                    <div className="w-full bg-white/10 h-2 rounded-full overflow-hidden">
                      <div
                        className="bg-gradient-to-r from-cyan-500 to-blue-500 h-full rounded-full transition-all duration-500"
                        style={{ width: `${proj.progress}%` }}
                      />
                    </div>
                    <div className="text-[10px] font-mono text-white/40">Updated {proj.lastUpdated}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Quick Access Engineering Suite Calculators */}
          <div className="bg-[#080a0f] border border-white/10 rounded-3xl p-6 space-y-6 shadow-xl">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-xl font-bold text-white flex items-center gap-2">
                  <Star className="w-5 h-5 text-amber-400 fill-amber-400/20" /> Favourite Engineering Tools
                </h2>
                <p className="text-xs text-white/60 font-mono">Instant access to core NHES calculation engines</p>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {favoriteCalculators.map((calc, idx) => {
                const Icon = calc.icon;
                return (
                  <button
                    key={idx}
                    onClick={() => onNavigateTab(calc.tab)}
                    className="bg-black/40 border border-white/10 hover:border-cyan-500/60 rounded-2xl p-4 flex items-center justify-between text-left transition group hover:shadow-lg hover:shadow-cyan-500/10"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-xl bg-cyan-950/80 border border-cyan-500/30 flex items-center justify-center text-cyan-400 group-hover:scale-110 transition">
                        <Icon className="w-5 h-5" />
                      </div>
                      <div>
                        <div className="text-sm font-bold text-white group-hover:text-cyan-300 transition">
                          {calc.title}
                        </div>
                        <span className="text-[10px] font-mono text-cyan-400 bg-cyan-950/60 px-2 py-0.5 rounded border border-cyan-500/20 inline-block mt-1">
                          {calc.badge}
                        </span>
                      </div>
                    </div>
                    <ChevronRight className="w-4 h-4 text-white/40 group-hover:text-cyan-400 transition" />
                  </button>
                );
              })}
            </div>
          </div>

          {/* Saved Engineering Designs */}
          <div className="bg-[#080a0f] border border-white/10 rounded-3xl p-6 space-y-4 shadow-xl">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-bold text-white flex items-center gap-2">
                <FolderGit2 className="w-5 h-5 text-indigo-400" /> Saved Design Models
              </h2>
              <button
                onClick={() => onNavigateTab("thermal-calc")}
                className="text-xs font-mono text-cyan-400 hover:underline flex items-center gap-1"
              >
                Open Calculation Studio <ChevronRight className="w-3.5 h-3.5" />
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {savedDesigns.map((d) => (
                <div
                  key={d.id}
                  onClick={() => onNavigateTab("thermal-calc")}
                  className="bg-black/40 border border-white/10 hover:border-indigo-500/50 rounded-2xl p-4 space-y-2 cursor-pointer transition group"
                >
                  <div className="flex items-center justify-between font-mono text-[10px] text-white/50">
                    <span className="text-indigo-400 font-bold">{d.id}</span>
                    <span>{d.date}</span>
                  </div>
                  <h3 className="text-xs font-bold text-white group-hover:text-indigo-300 line-clamp-2">
                    {d.name}
                  </h3>
                  <div className="flex items-center justify-between font-mono text-[10px] pt-2 border-t border-white/5 text-white/60">
                    <span>Area: <strong className="text-cyan-300">{d.area}</strong></span>
                    <span>MAWP: <strong className="text-amber-300">{d.pressure}</strong></span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right 1 Column: AI Sessions, Notifications & Reports */}
        <div className="space-y-8">
          {/* AI Conversations Panel */}
          <div className="bg-[#080a0f] border border-white/10 rounded-3xl p-6 space-y-4 shadow-xl">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-bold text-white flex items-center gap-2">
                <Bot className="w-5 h-5 text-cyan-400" /> Latest AI Engineering Insights
              </h2>
              <button
                onClick={() => onNavigateTab("ai-suite")}
                className="text-xs font-mono text-cyan-400 hover:underline"
              >
                Open AI Suite
              </button>
            </div>

            <div className="space-y-3">
              {latestAIConversations.map((conv, idx) => (
                <div
                  key={idx}
                  onClick={() => onNavigateTab("ai-suite")}
                  className="p-3 bg-black/40 rounded-2xl border border-white/10 hover:border-cyan-500/40 cursor-pointer space-y-1 transition group"
                >
                  <div className="flex items-center justify-between font-mono text-[10px]">
                    <span className="text-cyan-400 font-bold flex items-center gap-1">
                      <Sparkles className="w-3 h-3 text-cyan-400" /> {conv.agent}
                    </span>
                    <span className="text-white/40">{conv.time}</span>
                  </div>
                  <p className="text-xs text-white/80 group-hover:text-cyan-200 transition line-clamp-2">
                    {conv.topic}
                  </p>
                </div>
              ))}
            </div>

            <button
              onClick={() => onNavigateTab("ai-designer")}
              className="w-full py-2.5 bg-cyan-950 hover:bg-cyan-900 text-cyan-300 border border-cyan-500/40 rounded-xl text-xs font-mono font-bold uppercase tracking-wider flex items-center justify-center gap-2 transition"
            >
              <Bot className="w-4 h-4" /> Start New Engineering Session
            </button>
          </div>

          {/* Pending Signoffs & Reports */}
          <div className="bg-[#080a0f] border border-white/10 rounded-3xl p-6 space-y-4 shadow-xl">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-bold text-white flex items-center gap-2">
                <FileCheck className="w-5 h-5 text-emerald-400" /> Pending Reports & Audits
              </h2>
              <button
                onClick={() => onNavigateTab("reports")}
                className="text-xs font-mono text-cyan-400 hover:underline"
              >
                View All
              </button>
            </div>

            <div className="space-y-3">
              {pendingReports.map((rep, idx) => (
                <div
                  key={idx}
                  onClick={() => onNavigateTab("reports")}
                  className="p-3 bg-black/40 rounded-2xl border border-white/10 hover:border-emerald-500/40 cursor-pointer space-y-1 transition group"
                >
                  <div className="flex items-center justify-between font-mono text-[10px]">
                    <span className="text-emerald-400 font-bold">{rep.project}</span>
                    <span className="px-2 py-0.5 rounded bg-emerald-950 text-emerald-300 border border-emerald-500/30">
                      {rep.status}
                    </span>
                  </div>
                  <h3 className="text-xs font-bold text-white group-hover:text-emerald-200 transition">
                    {rep.title}
                  </h3>
                  <p className="text-[10px] font-mono text-white/50">Assigned: {rep.reviewer}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Real-time Notifications */}
          <div className="bg-[#080a0f] border border-white/10 rounded-3xl p-6 space-y-4 shadow-xl">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-bold text-white flex items-center gap-2">
                <Bell className="w-5 h-5 text-amber-400" /> System Notifications
              </h2>
              <span className="text-[10px] font-mono text-cyan-400 bg-cyan-950 px-2 py-0.5 rounded border border-cyan-500/30">
                Live Feed
              </span>
            </div>

            <div className="space-y-2.5">
              {notifications.map((n) => (
                <div
                  key={n.id}
                  className="p-3 bg-black/40 rounded-2xl border border-white/10 flex items-start gap-2.5 font-mono text-xs"
                >
                  {n.type === "success" && <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />}
                  {n.type === "info" && <ShieldCheck className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />}
                  {n.type === "alert" && <AlertTriangle className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />}
                  <div className="space-y-0.5">
                    <p className="text-white/80 text-[11px] leading-snug">{n.text}</p>
                    <span className="text-[10px] text-white/40 block">{n.time}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
