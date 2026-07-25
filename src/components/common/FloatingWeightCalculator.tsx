import React, { useState, useEffect } from "react";
import {
  Scale,
  X,
  Copy,
  Check,
  RotateCcw,
  Sparkles,
  Maximize2,
  Minimize2,
  BookOpen,
  DollarSign,
  Layers,
  Search,
  Calculator,
  Boxes,
  Info
} from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { MaterialWeightCalculator, MATERIAL_LIBRARY } from "../engineering/MaterialWeightCalculator";

export const FloatingWeightCalculator: React.FC = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [isMinimized, setIsMinimized] = useState<boolean>(false);
  const [activeTab, setActiveTab] = useState<"calculator" | "density" | "profiles" | "prices">("calculator");
  const [densitySearch, setDensitySearch] = useState<string>("");
  const [copiedMaterialId, setCopiedMaterialId] = useState<string | null>(null);

  // Keyboard shortcut listener (Alt + W or Ctrl + Shift + W)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (
        (e.altKey && (e.key === "w" || e.key === "W")) ||
        ((e.ctrlKey || e.metaKey) && e.shiftKey && (e.key === "w" || e.key === "W"))
      ) {
        e.preventDefault();
        setIsOpen((prev) => !prev);
        setIsMinimized(false);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  const filteredMaterials = MATERIAL_LIBRARY.filter(
    (m) =>
      m.name.toLowerCase().includes(densitySearch.toLowerCase()) ||
      m.categoryLabel.toLowerCase().includes(densitySearch.toLowerCase()) ||
      m.description.toLowerCase().includes(densitySearch.toLowerCase())
  );

  const handleCopyMaterialData = (m: typeof MATERIAL_LIBRARY[0]) => {
    const text = `${m.name}: Density = ${m.densityKgM3} kg/m³ (${m.densityLbIn3} lb/in³) | Market Price ≈ $${m.defaultPricePerKgUSD.toFixed(2)}/kg`;
    navigator.clipboard.writeText(text);
    setCopiedMaterialId(m.id);
    setTimeout(() => setCopiedMaterialId(null), 2000);
  };

  return (
    <>
      {/* --- FLOATING LAUNCHER BUTTON (DOCKED AT BOTTOM-RIGHT NEXT TO UNIT CONVERTER) --- */}
      <div className="fixed bottom-20 sm:bottom-6 right-6 sm:right-[215px] z-[95] flex items-center gap-2 font-['Plus_Jakarta_Sans',sans-serif]">
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => {
            setIsOpen(!isOpen);
            setIsMinimized(false);
          }}
          className={`flex items-center gap-2.5 px-4 py-3 rounded-2xl shadow-2xl transition-all duration-300 border cursor-pointer ${
            isOpen
              ? "bg-slate-900 text-amber-400 border-amber-500/50 ring-2 ring-amber-500/30"
              : "bg-gradient-to-r from-amber-600 to-amber-700 hover:from-amber-500 hover:to-amber-600 text-white border-amber-400/30 glow-amber"
          }`}
          title="Metal Weight & Commercial Price Calculator (Alt + W)"
        >
          <div className="relative">
            <Scale className="w-5 h-5 text-amber-200 animate-pulse" />
            <span className="absolute -top-1 -right-1 w-2 h-2 bg-emerald-400 rounded-full" />
          </div>
          <div className="text-left hidden sm:block">
            <span className="block text-xs font-black uppercase tracking-wider font-mono">Weight Calc</span>
            <span className="block text-[10px] text-amber-100/80">Metals & Price (Alt+W)</span>
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
              className={`pointer-events-auto bg-white/95 backdrop-blur-xl border border-slate-200 shadow-2xl rounded-3xl overflow-hidden flex flex-col font-['Plus_Jakarta_Sans',sans-serif] transition-all duration-300 w-full max-w-xl sm:w-[560px] ${
                isMinimized ? "h-[80px]" : "max-h-[88vh] h-[720px]"
              }`}
            >
              {/* Widget Header */}
              <div className="p-4 bg-gradient-to-r from-slate-900 via-[#1e293b] to-amber-950 text-white flex items-center justify-between shrink-0 border-b border-slate-800">
                <div className="flex items-center gap-3">
                  <div className="p-2.5 rounded-xl bg-amber-500/20 text-amber-300 border border-amber-400/30">
                    <Scale className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <h3 className="text-sm font-black uppercase tracking-wider font-mono text-white">
                        Metal Weight & Price Calculator
                      </h3>
                      <span className="px-2 py-0.5 bg-amber-500/20 text-amber-300 text-[9px] font-mono font-bold rounded-full border border-amber-500/30">
                        ASME / TEMA
                      </span>
                    </div>
                    <p className="text-[11px] text-amber-100/80 line-clamp-1">
                      Plates, tubes, flanges, solid bars, & raw material costing
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-1.5 text-slate-300">
                  <button
                    onClick={() => setIsMinimized(!isMinimized)}
                    className="p-1.5 hover:bg-white/10 rounded-lg transition text-slate-300 hover:text-white cursor-pointer"
                    title={isMinimized ? "Expand Panel" : "Minimize Panel"}
                  >
                    {isMinimized ? <Maximize2 className="w-4 h-4" /> : <Minimize2 className="w-4 h-4" />}
                  </button>
                  <button
                    onClick={() => setIsOpen(false)}
                    className="p-1.5 hover:bg-red-500/20 hover:text-red-300 rounded-lg transition text-slate-300 cursor-pointer"
                    title="Close Utility (Esc)"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>
              </div>

              {/* Main Content (Hidden when minimized) */}
              {!isMinimized && (
                <>
                  {/* Internal Sub-Navigation Tabs */}
                  <div className="flex items-center justify-between px-4 pt-3 pb-2 bg-slate-50 border-b border-slate-200/80 shrink-0 text-xs font-mono font-bold">
                    <div className="flex items-center gap-1 bg-slate-200/80 p-1 rounded-xl">
                      <button
                        onClick={() => setActiveTab("calculator")}
                        className={`px-3 py-1.5 rounded-lg transition cursor-pointer flex items-center gap-1.5 ${
                          activeTab === "calculator"
                            ? "bg-amber-600 text-white shadow-sm"
                            : "text-slate-600 hover:text-slate-900"
                        }`}
                      >
                        <Calculator className="w-3.5 h-3.5" />
                        Calculator
                      </button>
                      <button
                        onClick={() => setActiveTab("density")}
                        className={`px-3 py-1.5 rounded-lg transition cursor-pointer flex items-center gap-1.5 ${
                          activeTab === "density"
                            ? "bg-amber-600 text-white shadow-sm"
                            : "text-slate-600 hover:text-slate-900"
                        }`}
                      >
                        <BookOpen className="w-3.5 h-3.5" />
                        Density Library
                      </button>
                      <button
                        onClick={() => setActiveTab("profiles")}
                        className={`px-3 py-1.5 rounded-lg transition cursor-pointer flex items-center gap-1.5 ${
                          activeTab === "profiles"
                            ? "bg-amber-600 text-white shadow-sm"
                            : "text-slate-600 hover:text-slate-900"
                        }`}
                      >
                        <Boxes className="w-3.5 h-3.5" />
                        Profiles
                      </button>
                      <button
                        onClick={() => setActiveTab("prices")}
                        className={`px-3 py-1.5 rounded-lg transition cursor-pointer flex items-center gap-1.5 ${
                          activeTab === "prices"
                            ? "bg-amber-600 text-white shadow-sm"
                            : "text-slate-600 hover:text-slate-900"
                        }`}
                      >
                        <DollarSign className="w-3.5 h-3.5 text-emerald-300" />
                        Price Index
                      </button>
                    </div>

                    <span className="text-[10px] text-slate-400 font-normal hidden sm:inline">
                      Press <kbd className="px-1 py-0.5 bg-slate-200 rounded text-slate-700 font-mono font-bold">Alt+W</kbd>
                    </span>
                  </div>

                  {/* Tab Scroll Container */}
                  <div className="flex-1 overflow-y-auto p-4 sm:p-5">
                    {/* TAB 1: INTERACTIVE MATERIAL WEIGHT CALCULATOR */}
                    {activeTab === "calculator" && (
                      <MaterialWeightCalculator embeddedInModal={true} />
                    )}

                    {/* TAB 2: DENSITY REFERENCE LIBRARY */}
                    {activeTab === "density" && (
                      <div className="space-y-4">
                        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 pb-2 border-b border-slate-200">
                          <div>
                            <h4 className="text-sm font-bold text-slate-900">Alloy Density Reference Library</h4>
                            <p className="text-[11px] text-slate-500">
                              Physical mass density factors for ASME pressure vessel materials
                            </p>
                          </div>

                          <div className="relative w-full sm:w-56">
                            <Search className="w-3.5 h-3.5 absolute left-3 top-2.5 text-slate-400" />
                            <input
                              type="text"
                              placeholder="Search alloy name..."
                              value={densitySearch}
                              onChange={(e) => setDensitySearch(e.target.value)}
                              className="w-full pl-8 pr-3 py-1.5 bg-slate-100 border border-slate-200 rounded-xl text-xs font-mono focus:outline-none focus:ring-2 focus:ring-amber-500"
                            />
                          </div>
                        </div>

                        <div className="space-y-2 max-h-[460px] overflow-y-auto pr-1">
                          {filteredMaterials.map((m) => (
                            <div
                              key={m.id}
                              className="p-3 bg-slate-50 border border-slate-200 rounded-xl flex items-center justify-between text-xs hover:border-amber-400 transition"
                            >
                              <div className="space-y-0.5 max-w-[75%]">
                                <div className="flex items-center gap-2">
                                  <span className="font-bold text-slate-900 font-mono text-xs">{m.name}</span>
                                  <span className="px-1.5 py-0.2 bg-slate-200 text-slate-700 font-mono text-[9px] rounded font-semibold">
                                    {m.categoryLabel}
                                  </span>
                                </div>
                                <p className="text-[11px] text-slate-500 line-clamp-1">{m.description}</p>
                              </div>

                              <div className="flex items-center gap-3">
                                <div className="text-right font-mono">
                                  <span className="block font-bold text-amber-700">{m.densityKgM3} kg/m³</span>
                                  <span className="block text-[10px] text-slate-400">{m.densityLbIn3} lb/in³</span>
                                </div>

                                <button
                                  onClick={() => handleCopyMaterialData(m)}
                                  className="p-1.5 bg-white hover:bg-slate-200 border border-slate-200 rounded-lg text-slate-600 transition cursor-pointer"
                                  title="Copy density & specs"
                                >
                                  {copiedMaterialId === m.id ? (
                                    <Check className="w-3.5 h-3.5 text-emerald-600" />
                                  ) : (
                                    <Copy className="w-3.5 h-3.5" />
                                  )}
                                </button>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* TAB 3: PROFILES & SHAPES OVERVIEW */}
                    {activeTab === "profiles" && (
                      <div className="space-y-4">
                        <div className="pb-2 border-b border-slate-200">
                          <h4 className="text-sm font-bold text-slate-900">Supported Profile Formulas</h4>
                          <p className="text-[11px] text-slate-500">
                            Theoretical volume & weight calculation formulas used by the engine
                          </p>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                          <div className="p-3 bg-slate-50 border border-slate-200 rounded-xl space-y-1">
                            <span className="font-mono font-bold text-slate-900 block">1. Rectangular Shell / Tube Plate</span>
                            <span className="text-[11px] text-slate-600 font-mono block">V = Length × Width × Thickness</span>
                            <p className="text-[10px] text-slate-500">Used for shell barrel unrolled sheets, baffles, and structural mounting plates.</p>
                          </div>

                          <div className="p-3 bg-slate-50 border border-slate-200 rounded-xl space-y-1">
                            <span className="font-mono font-bold text-slate-900 block">2. Seamless Tube / Pipe</span>
                            <span className="text-[11px] text-slate-600 font-mono block">V = π/4 × (OD² - ID²) × Length</span>
                            <p className="text-[10px] text-slate-500">Used for heat exchanger tubing (BWG wall) and shell piping (SCH schedule).</p>
                          </div>

                          <div className="p-3 bg-slate-50 border border-slate-200 rounded-xl space-y-1">
                            <span className="font-mono font-bold text-slate-900 block">3. Circular Disc / Tubesheet</span>
                            <span className="text-[11px] text-slate-600 font-mono block">V = π/4 × Diameter² × Thickness</span>
                            <p className="text-[10px] text-slate-500">Used for tubesheet blanks, blind flanges, and channel covers.</p>
                          </div>

                          <div className="p-3 bg-slate-50 border border-slate-200 rounded-xl space-y-1">
                            <span className="font-mono font-bold text-slate-900 block">4. Solid Round Bar / Rod</span>
                            <span className="text-[11px] text-slate-600 font-mono block">V = π/4 × Diameter² × Length</span>
                            <p className="text-[10px] text-slate-500">Used for tie rods, spacer bars, and bonnet stay bolts.</p>
                          </div>
                        </div>
                      </div>
                    )}

                    {/* TAB 4: MARKET PRICE INDEX */}
                    {activeTab === "prices" && (
                      <div className="space-y-4">
                        <div className="pb-2 border-b border-slate-200">
                          <h4 className="text-sm font-bold text-slate-900">Alloy Raw Material Benchmark Price Index</h4>
                          <p className="text-[11px] text-slate-500">
                            Estimated commercial mill prices for raw metal inventory budgeting
                          </p>
                        </div>

                        <div className="space-y-2">
                          {MATERIAL_LIBRARY.map((m) => (
                            <div key={m.id} className="p-2.5 bg-slate-50 border border-slate-200 rounded-xl flex items-center justify-between text-xs">
                              <div>
                                <span className="font-bold text-slate-900 font-mono block">{m.name}</span>
                                <span className="text-[10px] text-slate-500">{m.categoryLabel}</span>
                              </div>
                              <div className="text-right font-mono">
                                <span className="font-black text-emerald-700 text-sm">${m.defaultPricePerKgUSD.toFixed(2)} / kg</span>
                                <span className="block text-[10px] text-slate-400">~${(m.defaultPricePerKgUSD / 2.20462).toFixed(2)} / lb</span>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Widget Footer Bar */}
                  <div className="p-3 bg-slate-100 border-t border-slate-200 flex justify-between items-center text-[10px] font-mono text-slate-500 shrink-0">
                    <span className="flex items-center gap-1">
                      <Sparkles className="w-3 h-3 text-amber-600" /> Northern HeatEx Engineering Ecosystem
                    </span>
                    <span>ASME VIII Div 1 & TEMA Standard</span>
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
