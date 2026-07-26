import React, { useState, useEffect } from "react";
import {
  Calculator,
  X,
  Maximize2,
  Minimize2,
  Sparkles,
  FileText,
  DollarSign,
  Layers,
  Wrench,
  ShieldCheck,
  TrendingUp,
  Download
} from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { FabricationIndustryEstimator } from "../engineering/FabricationIndustryEstimator";

export const FloatingFabEstimator: React.FC = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [isMinimized, setIsMinimized] = useState<boolean>(false);

  // Keyboard shortcut listener (Alt + F or Ctrl + Shift + F)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (
        (e.altKey && (e.key === "f" || e.key === "F")) ||
        ((e.ctrlKey || e.metaKey) && e.shiftKey && (e.key === "f" || e.key === "F"))
      ) {
        e.preventDefault();
        setIsOpen((prev) => !prev);
        setIsMinimized(false);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  return (
    <>
      {/* --- FLOATING LAUNCHER BUTTON (DOCKED AT BOTTOM-RIGHT BESIDE WEIGHT CALC & UNIT CONVERTER) --- */}
      <div className="fixed bottom-36 sm:bottom-6 right-6 sm:right-[415px] z-[95] flex items-center gap-2 font-['Plus_Jakarta_Sans',sans-serif]">
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => {
            setIsOpen(!isOpen);
            setIsMinimized(false);
          }}
          className={`flex items-center gap-2.5 px-4 py-3 rounded-2xl shadow-2xl transition-all duration-300 border cursor-pointer ${
            isOpen
              ? "bg-slate-900 text-emerald-400 border-emerald-500/50 ring-2 ring-emerald-500/30"
              : "bg-gradient-to-r from-emerald-600 to-teal-700 hover:from-emerald-500 hover:to-teal-600 text-white border-emerald-400/30 glow-emerald"
          }`}
          title="Fabrication Industry Cost & Project Estimator (Alt + F)"
        >
          <div className="relative">
            <Calculator className="w-5 h-5 text-emerald-200 animate-pulse" />
            <span className="absolute -top-1 -right-1 w-2 h-2 bg-amber-400 rounded-full" />
          </div>
          <div className="text-left hidden sm:block">
            <span className="block text-xs font-black uppercase tracking-wider font-mono">Fab Estimator</span>
            <span className="block text-[10px] text-emerald-100/80">Project Analysis (Alt+F)</span>
          </div>
        </motion.button>
      </div>

      {/* --- FLOATING UTILITY WIDGET PANEL --- */}
      <AnimatePresence>
        {isOpen && (
          <div className="fixed inset-0 z-[100] pointer-events-none flex items-end sm:items-center justify-center sm:justify-end sm:pr-6 sm:pb-20">
            <motion.div
              initial={{ opacity: 0, y: 30, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 30, scale: 0.95 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              className={`pointer-events-auto bg-white/95 backdrop-blur-xl border border-slate-200 shadow-2xl rounded-3xl overflow-hidden flex flex-col font-['Plus_Jakarta_Sans',sans-serif] transition-all duration-300 w-full max-w-4xl sm:w-[820px] ${
                isMinimized ? "h-[80px]" : "max-h-[90vh] h-[780px]"
              }`}
            >
              {/* Widget Header Bar */}
              <div className="p-4 bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900 text-white flex justify-between items-center shrink-0 border-b border-slate-700/80">
                <div className="flex items-center gap-3">
                  <div className="p-2.5 bg-emerald-500/20 text-emerald-400 rounded-2xl border border-emerald-500/30">
                    <Calculator className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <h3 className="text-sm font-black text-white tracking-tight">Fabrication Industry Cost & Estimate Analyzer</h3>
                      <span className="px-2 py-0.5 bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 rounded-full text-[10px] font-mono font-bold">
                        Commercial Grade
                      </span>
                    </div>
                    <p className="text-[11px] text-slate-300">
                      ASME VIII & TEMA project BOQ, tender quote calculations, graphical analysis & PDF export
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-1">
                  <button
                    onClick={() => setIsMinimized(!isMinimized)}
                    className="p-1.5 hover:bg-slate-700/60 rounded-lg transition text-slate-300"
                    title={isMinimized ? "Expand Panel" : "Minimize Panel"}
                  >
                    {isMinimized ? <Maximize2 className="w-4 h-4" /> : <Minimize2 className="w-4 h-4" />}
                  </button>
                  <button
                    onClick={() => setIsOpen(false)}
                    className="p-1.5 hover:bg-red-500/20 hover:text-red-300 rounded-lg transition text-slate-300"
                    title="Close Utility (Esc)"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>
              </div>

              {/* Main Content (Hidden when minimized) */}
              {!isMinimized && (
                <>
                  <div className="flex-1 overflow-y-auto p-4 space-y-4 text-slate-800">
                    <FabricationIndustryEstimator embeddedInModal={true} />
                  </div>

                  {/* Widget Footer Bar */}
                  <div className="p-3 bg-slate-100 border-t border-slate-200 flex justify-between items-center text-[10px] font-mono text-slate-500 shrink-0">
                    <span className="flex items-center gap-1">
                      <Sparkles className="w-3 h-3 text-[#0056A6]" /> Northern HeatEx Engineering Ecosystem
                    </span>
                    <span>ASME VIII Div 1 & 2 • TEMA Class R, C, B</span>
                  </div>
                </>
              )}
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
};
