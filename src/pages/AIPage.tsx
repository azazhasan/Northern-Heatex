import React from "react";
import { useRouter } from "../context/RouterContext";
import { AIEngineeringSuite } from "../components/ai/AIEngineeringSuite";
import { Sparkles, Bot, Cpu, Calculator, ShieldCheck, FileText, BookOpen } from "lucide-react";

export const AIPage: React.FC = () => {
  const { currentPath, navigate } = useRouter();

  const aiRoles = [
    { slug: "engineer", label: "AI Lead Engineer", role: "Thermal Engineer", icon: Bot },
    { slug: "thermal-engineer", label: "AI Thermal Specialist", role: "Thermal Engineer", icon: Calculator },
    { slug: "mechanical-engineer", label: "AI Mechanical Specialist", role: "Mechanical Engineer", icon: Cpu },
    { slug: "material-expert", label: "AI Metallurgy & WPS Expert", role: "Welding Specialist", icon: ShieldCheck },
    { slug: "failure-diagnosis", label: "AI Failure Diagnostician", role: "Failure Analyst", icon: Sparkles },
    { slug: "proposal-generator", label: "AI RFQ Proposal Generator", role: "Proposal Specialist", icon: FileText },
    { slug: "knowledge-assistant", label: "AI Code Standards Assistant", role: "Knowledge Assistant", icon: BookOpen },
  ];

  const subSlug = currentPath.replace("/ai", "").replace(/^\//, "");

  return (
    <div className="space-y-8">
      {/* AI Hero Banner */}
      <div className="bg-slate-900 rounded-3xl p-6 sm:p-10 text-white relative overflow-hidden border border-slate-800 shadow-xl">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-950/80 via-slate-900 to-cyan-950/80 z-10" />

        <div className="relative z-20 space-y-4 max-w-4xl">
          <span className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-cyan-500/20 text-cyan-300 border border-cyan-500/30 text-xs font-mono font-bold uppercase tracking-wider">
            <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
            GEMINI 3.6 FLASH POWERED ENGINEERING AGENTS
          </span>

          <h1 className="text-3xl sm:text-4xl font-black tracking-tight text-white">
            AI Engineering & Diagnostics Suite
          </h1>

          <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
            Direct server-side integration with Google's Gemini models for instant LMTD calculations, ASME thickness derivations, WPS filler metal selection, and root-cause tube failure analysis.
          </p>

          {/* Sub AI Pills */}
          <div className="flex flex-wrap gap-2 pt-4 border-t border-white/10 font-mono text-xs">
            {aiRoles.map((r) => {
              const Icon = r.icon;
              const isActive = subSlug === r.slug || (!subSlug && r.slug === "engineer");

              return (
                <button
                  key={r.slug}
                  onClick={() => navigate(`/ai/${r.slug}`)}
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl transition cursor-pointer ${
                    isActive
                      ? "bg-[#0056A6] text-white font-bold border border-blue-400/50 shadow-md"
                      : "bg-white/10 hover:bg-white/20 text-slate-300 border border-white/10"
                  }`}
                >
                  <Icon className="w-3.5 h-3.5" />
                  <span>{r.label}</span>
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Render AI Suite */}
      <AIEngineeringSuite />
    </div>
  );
};
