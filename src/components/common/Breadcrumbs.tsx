import React from "react";
import { useRouter } from "../../context/RouterContext";
import { ChevronRight, Home } from "lucide-react";

export const Breadcrumbs: React.FC = () => {
  const { breadcrumbs, navigate, currentPath } = useRouter();

  if (currentPath === "/") return null;

  return (
    <nav className="bg-slate-100/80 border-b border-slate-200 py-2.5 px-4 sm:px-6 lg:px-8 text-xs font-mono text-slate-600 mb-6 rounded-xl">
      <div className="max-w-7xl mx-auto flex items-center flex-wrap gap-1.5">
        {breadcrumbs.map((crumb, index) => {
          const isLast = index === breadcrumbs.length - 1;
          return (
            <React.Fragment key={crumb.path}>
              {index > 0 && <ChevronRight className="w-3.5 h-3.5 text-slate-400 shrink-0" />}
              {isLast ? (
                <span className="font-bold text-[#0056A6] bg-blue-50 px-2 py-0.5 rounded border border-blue-200">
                  {crumb.label}
                </span>
              ) : (
                <button
                  onClick={() => navigate(crumb.path)}
                  className="hover:text-[#0056A6] flex items-center gap-1 transition cursor-pointer"
                >
                  {index === 0 && <Home className="w-3.5 h-3.5 text-slate-500" />}
                  <span>{crumb.label}</span>
                </button>
              )}
            </React.Fragment>
          );
        })}
      </div>
    </nav>
  );
};
