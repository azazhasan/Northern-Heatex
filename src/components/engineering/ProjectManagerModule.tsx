import React, { useState } from "react";
import {
  FolderGit2,
  CheckCircle2,
  Clock,
  Download,
  FileText,
  ShieldCheck,
  Building2,
  Calendar,
  Search,
  Filter,
  Activity,
  ArrowRight,
} from "lucide-react";

export const ProjectManagerModule: React.FC = () => {
  const [selectedProjectId, setSelectedProjectId] = useState<string>("NHES-2026-0881");
  const [searchFilter, setSearchFilter] = useState<string>("");

  const projects = [
    {
      id: "NHES-2026-0881",
      title: "Stator Air Cooler (Double Tubesheet)",
      client: "Siemens Energy India Ltd",
      tema: "BEM",
      status: "CNC Machining",
      progress: 68,
      delivery: "Aug 28, 2026",
      asmeStamped: true,
      milestones: [
        { title: "Thermal & ASME Design Approval", status: "Completed", date: "Jul 05, 2026" },
        { title: "Raw Material Procurement (Cu-Ni & SA-516)", status: "Completed", date: "Jul 18, 2026" },
        { title: "CNC Tubesheet Drilling & Reaming", status: "In Progress", date: "Est. Jul 28, 2026" },
        { title: "Automatic GTAW Tube Expansion & Welding", status: "Upcoming", date: "Est. Aug 08, 2026" },
        { title: "Hydrostatic Testing (31.2 Bar)", status: "Upcoming", date: "Est. Aug 18, 2026" },
        { title: "Factory Acceptance & TPI Clearance", status: "Upcoming", date: "Est. Aug 25, 2026" },
      ],
      documents: [
        { title: "ASME VIII Thermal & Mechanical Calculation Sheet", size: "3.2 MB" },
        { title: "Tubesheet Drilling CNC Program & Layout Drawing", size: "8.5 MB" },
        { title: "WPS-NHEE-TIG-09 Tube-to-Tubesheet Welding Spec", size: "1.4 MB" },
        { title: "Raw Material Test Certificates (Mill MTRs)", size: "4.1 MB" },
      ],
    },
    {
      id: "NHES-2026-0882",
      title: "Bearing Oil Cooler (U-Tube Bundle)",
      client: "GE Vernova - Haridwar Hydro Project",
      tema: "BEU",
      status: "Hydro Testing",
      progress: 92,
      delivery: "Aug 10, 2026",
      asmeStamped: true,
      milestones: [
        { title: "Design Signoff & Client Drawing Approval", status: "Completed", date: "Jun 20, 2026" },
        { title: "U-Tube Bending & Stress Relief Heat Treatment", status: "Completed", date: "Jul 12, 2026" },
        { title: "Bundle Baffle Assembly & Insertion", status: "Completed", date: "Jul 20, 2026" },
        { title: "Hydrostatic Test at 1.3x MAWP", status: "In Progress", date: "Est. Jul 26, 2026" },
        { title: "Final Painting, Packing & Shipping", status: "Upcoming", date: "Est. Aug 05, 2026" },
      ],
      documents: [
        { title: "General Arrangement Drawing GA-BEU-02", size: "5.1 MB" },
        { title: "Hydrotest Traveler & AI Inspection Certificate", size: "2.2 MB" },
      ],
    },
    {
      id: "NHES-2026-0883",
      title: "High-Pressure Hydrogen Reboiler",
      client: "IOCL Refineries Mathura",
      tema: "AES",
      status: "Engineering Review",
      progress: 25,
      delivery: "Oct 15, 2026",
      asmeStamped: true,
      milestones: [
        { title: "ASME Section VIII Div 2 Finite Element Analysis", status: "In Progress", date: "Est. Aug 02, 2026" },
        { title: "Forging & Monel Clad Plate Order", status: "Upcoming", date: "Est. Aug 15, 2026" },
      ],
      documents: [
        { title: "Design Basis & Process Data Sheet", size: "1.8 MB" },
      ],
    },
  ];

  const currentProject = projects.find((p) => p.id === selectedProjectId) || projects[0];

  return (
    <div className="space-y-8 animate-fadeIn">
      {/* Header Banner */}
      <div className="relative bg-gradient-to-br from-[#070912] via-[#05070d] to-[#0c101d] border border-cyan-500/30 rounded-3xl p-8 shadow-2xl overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-3 max-w-3xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-950 text-cyan-400 border border-cyan-500/40 text-xs font-mono font-bold uppercase">
              <FolderGit2 className="w-3.5 h-3.5 text-cyan-400" /> Enterprise Project Lifecycle Manager (Module 11)
            </div>

            <h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
              Project Execution & Client Delivery Tracker
            </h1>

            <p className="text-sm text-cyan-200/80 font-normal leading-relaxed">
              Track manufacturing milestones, Third Party Inspection (TPI) holds, CNC machining readiness, hydrotest certificates, and client engineering document transmittals in real time.
            </p>
          </div>
        </div>
      </div>

      {/* Main Project Management Workspace */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Column: Project List */}
        <div className="bg-[#080a0f] border border-white/10 rounded-3xl p-6 space-y-4 shadow-xl">
          <div className="relative">
            <Search className="w-4 h-4 text-white/40 absolute left-3.5 top-3.5" />
            <input
              type="text"
              value={searchFilter}
              onChange={(e) => setSearchFilter(e.target.value)}
              placeholder="Filter by project code, client..."
              className="w-full bg-slate-900 border border-white/15 rounded-xl pl-10 pr-4 py-2.5 text-xs text-white placeholder-white/40 font-mono focus:border-cyan-400 focus:outline-none"
            />
          </div>

          <div className="space-y-3">
            {projects.map((p) => {
              const isSelected = p.id === selectedProjectId;
              return (
                <div
                  key={p.id}
                  onClick={() => setSelectedProjectId(p.id)}
                  className={`p-4 rounded-2xl border cursor-pointer transition space-y-2 font-mono text-xs ${
                    isSelected
                      ? "bg-cyan-950/80 border-cyan-500/60 text-white shadow-lg"
                      : "bg-black/40 border-white/10 text-white/70 hover:border-white/30"
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-cyan-400">{p.id}</span>
                    <span className="px-2 py-0.5 bg-emerald-950 text-emerald-300 border border-emerald-500/30 rounded text-[10px]">
                      ASME U
                    </span>
                  </div>
                  <h3 className="font-bold text-white leading-snug">{p.title}</h3>
                  <p className="text-[11px] text-white/50">{p.client}</p>

                  <div className="pt-2 border-t border-white/5 flex items-center justify-between text-[10px]">
                    <span className="text-white/60">{p.status}</span>
                    <span className="font-bold text-cyan-300">{p.progress}%</span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Right 2 Columns: Detailed Project Workspace */}
        <div className="lg:col-span-2 space-y-6">
          {/* Active Project Card */}
          <div className="bg-[#080a0f] border border-white/10 rounded-3xl p-6 sm:p-8 space-y-6 shadow-2xl">
            <div className="flex flex-wrap items-center justify-between gap-4 border-b border-white/10 pb-4 font-mono">
              <div>
                <span className="text-cyan-400 font-bold text-xs uppercase">{currentProject.id} • {currentProject.tema} TYPE</span>
                <h2 className="text-2xl font-bold text-white mt-1">{currentProject.title}</h2>
                <p className="text-xs text-white/60">{currentProject.client}</p>
              </div>

              <div className="text-right">
                <div className="text-xs text-white/50">Target Delivery</div>
                <div className="text-lg font-bold text-amber-300">{currentProject.delivery}</div>
              </div>
            </div>

            {/* Progress Bar */}
            <div className="space-y-2 font-mono text-xs">
              <div className="flex justify-between text-white/70">
                <span>Manufacturing Stage: <strong className="text-cyan-400">{currentProject.status}</strong></span>
                <span className="font-bold text-white">{currentProject.progress}% Complete</span>
              </div>
              <div className="w-full bg-white/10 h-3 rounded-full overflow-hidden">
                <div
                  className="bg-gradient-to-r from-cyan-500 via-blue-500 to-emerald-500 h-full rounded-full transition-all duration-500"
                  style={{ width: `${currentProject.progress}%` }}
                />
              </div>
            </div>

            {/* Milestones Checklist */}
            <div className="space-y-4">
              <h3 className="text-sm font-bold text-white font-mono uppercase tracking-wider text-cyan-400 flex items-center gap-2">
                <Activity className="w-4 h-4" /> Production Milestones & Hold Points:
              </h3>

              <div className="space-y-3 font-mono text-xs">
                {currentProject.milestones.map((m, idx) => (
                  <div
                    key={idx}
                    className="p-3 bg-black/40 rounded-2xl border border-white/10 flex items-center justify-between gap-3"
                  >
                    <div className="flex items-center gap-3">
                      {m.status === "Completed" && <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />}
                      {m.status === "In Progress" && <Clock className="w-5 h-5 text-amber-400 animate-pulse shrink-0" />}
                      {m.status === "Upcoming" && <div className="w-5 h-5 rounded-full border-2 border-white/20 shrink-0" />}
                      <div>
                        <div className="font-bold text-white">{m.title}</div>
                        <div className="text-[10px] text-white/40">{m.date}</div>
                      </div>
                    </div>

                    <span
                      className={`px-2.5 py-0.5 rounded text-[10px] font-bold ${
                        m.status === "Completed"
                          ? "bg-emerald-950 text-emerald-400 border border-emerald-500/30"
                          : m.status === "In Progress"
                          ? "bg-amber-950 text-amber-300 border border-amber-500/30"
                          : "bg-white/5 text-white/50"
                      }`}
                    >
                      {m.status}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Document Package Section */}
            <div className="space-y-4 pt-4 border-t border-white/10">
              <h3 className="text-sm font-bold text-white font-mono uppercase tracking-wider text-cyan-400 flex items-center gap-2">
                <FileText className="w-4 h-4" /> Associated Transmittal Package:
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 font-mono text-xs">
                {currentProject.documents.map((doc, idx) => (
                  <div
                    key={idx}
                    className="p-3 bg-black/40 rounded-xl border border-white/10 flex items-center justify-between gap-2 hover:border-cyan-500/40 transition cursor-pointer"
                    onClick={() => alert(`Downloading document: ${doc.title}`)}
                  >
                    <div className="space-y-0.5">
                      <div className="text-white font-bold line-clamp-1">{doc.title}</div>
                      <div className="text-[10px] text-white/40">{doc.size}</div>
                    </div>
                    <Download className="w-4 h-4 text-cyan-400 shrink-0" />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
