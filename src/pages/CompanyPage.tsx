import React from "react";
import { useRouter } from "../context/RouterContext";
import { CompanyHub } from "../components/company/CompanyHub";
import { Award, Building2, ShieldCheck, Users, Sparkles, BookOpen, Leaf, GraduationCap } from "lucide-react";

export const CompanyPage: React.FC = () => {
  const { currentPath, navigate } = useRouter();

  // Determine active sub-tab from current route
  let activeTabFromPath = "overview";
  if (currentPath.includes("/story")) activeTabFromPath = "story";
  else if (currentPath.includes("/vision")) activeTabFromPath = "vision";
  else if (currentPath.includes("/mission")) activeTabFromPath = "mission";
  else if (currentPath.includes("/leadership")) activeTabFromPath = "leadership";
  else if (currentPath.includes("/quality")) activeTabFromPath = "quality";
  else if (currentPath.includes("/rd")) activeTabFromPath = "rnd";
  else if (currentPath.includes("/csr")) activeTabFromPath = "csr";
  else if (currentPath.includes("/careers")) activeTabFromPath = "careers";

  const subPages = [
    { label: "Overview", path: "/company", icon: Building2 },
    { label: "Our Story (1983)", path: "/company/story", icon: BookOpen },
    { label: "Vision & Mission", path: "/company/vision", icon: Sparkles },
    { label: "Leadership", path: "/company/leadership", icon: Users },
    { label: "Quality & ASME", path: "/company/quality", icon: ShieldCheck },
    { label: "Thermal R&D", path: "/company/rd", icon: Award },
    { label: "CSR & Community", path: "/company/csr", icon: Leaf },
    { label: "Careers", path: "/company/careers", icon: GraduationCap },
  ];

  return (
    <div className="space-y-8">
      {/* Unique Hero Header for Company Pages */}
      <div className="bg-slate-900 rounded-3xl p-6 sm:p-10 text-white relative overflow-hidden border border-slate-800 shadow-xl">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-950/80 via-slate-900 to-cyan-950/80 z-10" />

        <div className="relative z-20 space-y-4 max-w-4xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/20 text-amber-300 border border-amber-500/30 text-xs font-mono font-bold">
            <Award className="w-3.5 h-3.5 text-amber-400" />
            PARENT: NOOR ENGINEERING WORKS • EST. 1983
          </div>

          <h1 className="text-3xl sm:text-4xl font-black tracking-tight text-white">
            Corporate Profile & Engineering Heritage
          </h1>

          <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
            Four decades of precision manufacturing at Haridwar Works, Uttarakhand. Trusted supplier to BHEL, NTPC, Indian Oil, and major Indian PSUs.
          </p>

          {/* Sub-page Navigation Tabs */}
          <div className="flex flex-wrap gap-2 pt-4 border-t border-white/10 font-mono text-xs">
            {subPages.map((sub) => {
              const Icon = sub.icon;
              const isActive = currentPath === sub.path || (sub.path === "/company" && currentPath === "/company");
              return (
                <button
                  key={sub.path}
                  onClick={() => navigate(sub.path)}
                  className={`flex items-center gap-1.5 px-3.5 py-2 rounded-xl font-bold transition cursor-pointer ${
                    isActive
                      ? "bg-[#0056A6] text-white shadow-md border border-blue-400/50"
                      : "bg-white/10 hover:bg-white/20 text-slate-200 border border-white/10"
                  }`}
                >
                  <Icon className="w-3.5 h-3.5" />
                  <span>{sub.label}</span>
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Embedded Company Content Component with initial page state */}
      <CompanyHub onQuickQuoteClick={() => navigate("/contact/request-quotation")} />
    </div>
  );
};
