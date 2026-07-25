import React, { useState, useMemo } from "react";
import {
  Search,
  X,
  FileText,
  Calculator,
  Box,
  Building2,
  Tag,
  ArrowRight,
  Sparkles,
} from "lucide-react";
import { EngineeringTab } from "../../types";

interface GlobalSearchModalProps {
  isOpen: boolean;
  onClose: () => void;
  onNavigateTab: (tab: EngineeringTab) => void;
}

interface SearchResultItem {
  id: string;
  category: "Products" | "GST & HSN" | "Calculators" | "Reports & Projects";
  title: string;
  subtitle: string;
  targetTab: EngineeringTab;
  badge?: string;
}

const SEARCH_DATABASE: SearchResultItem[] = [
  // Products
  {
    id: "p1",
    category: "Products",
    title: "TEMA Shell & Tube Heat Exchanger (BEU, BEM, AES)",
    subtitle: "High efficiency industrial heat exchangers manufactured per ASME VIII Div 1 & TEMA Class R",
    targetTab: "products",
    badge: "HSN 8419 50 00",
  },
  {
    id: "p2",
    category: "Products",
    title: "Hydro Turbine Oil & Bearing Coolers",
    subtitle: "Stator water coolers, generator air coolers for hydroelectric power projects",
    targetTab: "products",
    badge: "HSN 8483 10 90",
  },
  {
    id: "p3",
    category: "Products",
    title: "Precision CNC Drilled Tubesheets & Baffles",
    subtitle: "SA-516 Gr 70, SA-240 316L tubesheets with automated reaming and serration grooves",
    targetTab: "products",
    badge: "HSN 8419 90 90",
  },

  // GST & HSN
  {
    id: "g1",
    category: "GST & HSN",
    title: "HSN 8419 50 00 - Heat Exchangers (18% GST)",
    subtitle: "Indian GST rate calculation, CGST 9% + SGST 9% or IGST 18%",
    targetTab: "gst-center",
    badge: "18% GST",
  },
  {
    id: "g2",
    category: "GST & HSN",
    title: "HSN 9987 19 - On-Site Retubing & Overhaul Services",
    subtitle: "Job work and field retubing tax rates for power plants and refineries",
    targetTab: "gst-center",
    badge: "18% GST",
  },
  {
    id: "g3",
    category: "GST & HSN",
    title: "GST Invoice & Quotation Generator",
    subtitle: "Create 100% compliant Indian GST invoices with QR code and bank details",
    targetTab: "gst-center",
    badge: "PDF Invoice",
  },

  // Calculators
  {
    id: "c1",
    category: "Calculators",
    title: "Thermal Design & Rating Engine",
    subtitle: "Kernel-level LMTD, heat duty, overall U coefficient & tube count sizing",
    targetTab: "thermal-calc",
    badge: "TEMA Standard",
  },
  {
    id: "c2",
    category: "Calculators",
    title: "ASME VIII Mechanical Thickness Calculator",
    subtitle: "Shell minimum thickness, nozzle reinforcement & hydrostatic test pressure per ASME Sec VIII Div 1",
    targetTab: "mechanical-asme",
    badge: "ASME VIII",
  },
  {
    id: "c3",
    category: "Calculators",
    title: "Manufacturing Profit & Commercial Margin Calculator",
    subtitle: "Material, labour, machining, testing, overheads & GST margin breakdown",
    targetTab: "gst-center",
    badge: "Commercial",
  },

  // Reports
  {
    id: "r1",
    category: "Reports & Projects",
    title: "ASME Manufacturer Data Report & Hydrotest Certs",
    subtitle: "Digital twin inspection holds, material test reports (MTRs) & TPI clearance",
    targetTab: "reports",
    badge: "TPI Verified",
  },
  {
    id: "r2",
    category: "Reports & Projects",
    title: "Noor Engineering Works (Est. 1983) History",
    subtitle: "Four decades serving BHEL, NTPC, Indian Railways, and Hydro Power PSUs",
    targetTab: "company",
    badge: "Est. 1983",
  },
];

export const GlobalSearchModal: React.FC<GlobalSearchModalProps> = ({
  isOpen,
  onClose,
  onNavigateTab,
}) => {
  const [query, setQuery] = useState("");

  const results = useMemo(() => {
    if (!query.trim()) return SEARCH_DATABASE;
    const q = query.toLowerCase();
    return SEARCH_DATABASE.filter(
      (item) =>
        item.title.toLowerCase().includes(q) ||
        item.subtitle.toLowerCase().includes(q) ||
        item.category.toLowerCase().includes(q) ||
        (item.badge && item.badge.toLowerCase().includes(q))
    );
  }, [query]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[150] bg-slate-900/60 backdrop-blur-sm flex items-start justify-center pt-20 px-4">
      <div
        className="bg-white w-full max-w-2xl rounded-2xl shadow-2xl border border-slate-200 overflow-hidden flex flex-col max-h-[80vh] animate-in fade-in zoom-in-95 duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Search Header */}
        <div className="p-4 border-b border-slate-100 flex items-center gap-3 bg-slate-50">
          <Search className="w-5 h-5 text-[#0056A6]" />
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search Products, GST/HSN Codes, Calculators, Reports..."
            className="w-full bg-transparent text-sm font-bold text-slate-900 focus:outline-none"
            autoFocus
          />
          <button
            onClick={onClose}
            className="p-1.5 hover:bg-slate-200 rounded-lg text-slate-500 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Search Results List */}
        <div className="overflow-y-auto p-4 space-y-2 flex-1">
          {results.length === 0 ? (
            <div className="text-center py-8 text-slate-400 text-xs">
              No matching records found for "{query}". Try searching "Heat Exchanger", "GST", "8419", or "ASME".
            </div>
          ) : (
            results.map((item) => (
              <div
                key={item.id}
                onClick={() => {
                  onNavigateTab(item.targetTab);
                  onClose();
                }}
                className="p-3.5 rounded-xl hover:bg-blue-50/70 border border-transparent hover:border-blue-100 transition-all cursor-pointer flex items-center justify-between group"
              >
                <div className="space-y-0.5 max-w-md">
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider font-mono">
                      {item.category}
                    </span>
                    {item.badge && (
                      <span className="px-2 py-0.5 bg-blue-100 text-[#0056A6] font-mono text-[10px] font-bold rounded-full">
                        {item.badge}
                      </span>
                    )}
                  </div>
                  <h5 className="font-bold text-slate-900 text-xs sm:text-sm group-hover:text-[#0056A6] transition-colors">
                    {item.title}
                  </h5>
                  <p className="text-[11px] text-slate-500 line-clamp-1">{item.subtitle}</p>
                </div>

                <div className="p-2 rounded-lg bg-slate-100 group-hover:bg-[#0056A6] group-hover:text-white text-slate-400 transition-all">
                  <ArrowRight className="w-4 h-4" />
                </div>
              </div>
            ))
          )}
        </div>

        {/* Footer */}
        <div className="p-3 bg-slate-100 border-t border-slate-200 flex justify-between items-center text-[10px] font-mono text-slate-500">
          <span>Northern HeatEx Search Engine</span>
          <span>Press ESC or click anywhere outside to close</span>
        </div>
      </div>
    </div>
  );
};
