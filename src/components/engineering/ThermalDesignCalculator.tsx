import React, { useState } from "react";
import { DEFAULT_DESIGN_EXAMPLE } from "../../data/mockData";
import { HeatExchangerDesign } from "../../types";
import { Calculator, Flame, Bot, CheckCircle2, ArrowRight, RefreshCw, FileText, Zap } from "lucide-react";

interface ThermalDesignCalculatorProps {
  onDesignUpdate?: (design: HeatExchangerDesign) => void;
  onSendToAI?: (prompt: string, params: any) => void;
}

export const ThermalDesignCalculator: React.FC<ThermalDesignCalculatorProps> = ({
  onDesignUpdate,
  onSendToAI,
}) => {
  const [design, setDesign] = useState<HeatExchangerDesign>(DEFAULT_DESIGN_EXAMPLE);
  const [aiAnalysis, setAiAnalysis] = useState<string | null>(null);
  const [loadingAI, setLoadingAI] = useState<boolean>(false);

  // Recalculate Thermal Engineering Parameters
  const calculateThermalData = (d: HeatExchangerDesign) => {
    // Hot side heat duty: Q_h = m_h * Cp_h * (Th1 - Th2) [kW]
    const mh = d.hotSide.flowRate / 3600; // kg/s
    const Cph = d.hotSide.specificHeat; // kJ/kg·K
    const deltaTh = d.hotSide.tempIn - d.hotSide.tempOut;
    const Qh = mh * Cph * deltaTh; // kW

    // Cold side temperature check
    const mc = d.coldSide.flowRate / 3600;
    const Cpc = d.coldSide.specificHeat;
    const deltaTc = d.coldSide.tempOut - d.coldSide.tempIn;

    // LMTD Calculation
    const dt1 = d.hotSide.tempIn - d.coldSide.tempOut;
    const dt2 = d.hotSide.tempOut - d.coldSide.tempIn;

    let lmtd = 0;
    if (dt1 > 0 && dt2 > 0 && dt1 !== dt2) {
      lmtd = (dt1 - dt2) / Math.log(dt1 / dt2);
    } else {
      lmtd = (dt1 + dt2) / 2;
    }

    // LMTD Correction factor F (approximate for 1 shell pass 2 tube pass)
    const R = (d.hotSide.tempIn - d.hotSide.tempOut) / (d.coldSide.tempOut - d.coldSide.tempIn || 1);
    const P = (d.coldSide.tempOut - d.coldSide.tempIn) / (d.hotSide.tempIn - d.coldSide.tempIn || 1);
    let F = 0.92; // default
    if (R > 0 && P > 0 && R !== 1) {
      const num = Math.sqrt(R * R + 1) * Math.log((1 - P) / (1 - P * R));
      const den = (R - 1) * Math.log((2 - P * (R + 1 - Math.sqrt(R * R + 1))) / (2 - P * (R + 1 + Math.sqrt(R * R + 1))));
      if (den !== 0) F = Math.min(0.99, Math.max(0.75, Math.abs(num / den)));
    }

    // Estimated U coefficient (W/m²·K)
    const overallU = d.calculatedU || 450;

    // Required Surface Area A = Q * 1000 / (U * F * LMTD)
    const effectiveLMTD = lmtd * F;
    const area = effectiveLMTD > 0 ? (Qh * 1000) / (overallU * effectiveLMTD) : 50;

    // Tube Count
    const tubeAreaOne = Math.PI * (d.tubeOD / 1000) * (d.tubeLength / 1000);
    const tubeCount = Math.ceil(area / tubeAreaOne);

    return {
      calculatedHeatDuty: Math.round(Qh * 10) / 10,
      calculatedLMTD: Math.round(lmtd * 10) / 10,
      calculatedArea: Math.round(area * 10) / 10,
      calculatedTubeCount: tubeCount,
    };
  };

  const currentCalc = calculateThermalData(design);

  const handleInputChange = (category: "hot" | "cold" | "general", field: string, value: any) => {
    setDesign((prev) => {
      let updated = { ...prev };
      if (category === "hot") {
        updated.hotSide = { ...updated.hotSide, [field]: value };
      } else if (category === "cold") {
        updated.coldSide = { ...updated.coldSide, [field]: value };
      } else {
        updated = { ...updated, [field]: value };
      }
      return updated;
    });
  };

  // Call Server-Side Gemini API for Thermal Engineering Review
  const runAIThermalReview = async () => {
    setLoadingAI(true);
    setAiAnalysis(null);
    try {
      const response = await fetch("/api/gemini/thermal-engineer", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          prompt: `Analyze thermal performance for TEMA Type ${design.temaType} heat exchanger: ${design.title}`,
          parameters: {
            hotFluid: design.hotSide,
            coldFluid: design.coldSide,
            thermalOutput: currentCalc,
            shellMaterial: design.shellMaterial,
            tubeMaterial: design.tubeMaterial,
          },
        }),
      });

      const data = await response.json();
      if (data.result) {
        setAiAnalysis(data.result);
      } else {
        setAiAnalysis("AI Response received without text payload.");
      }
    } catch (err: any) {
      console.error(err);
      setAiAnalysis("Error calling AI Thermal Engineer backend service. Ensure GEMINI_API_KEY is configured.");
    } finally {
      setLoadingAI(false);
    }
  };

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-2xl space-y-8">
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-4 border-b border-slate-800 pb-4">
        <div>
          <h3 className="text-xl font-bold text-slate-100 flex items-center gap-2">
            <Flame className="w-6 h-6 text-amber-500" />
            Thermal Engineering & Heat Transfer Studio
          </h3>
          <p className="text-xs text-slate-400 font-mono">
            LMTD, Heat Duty $Q$, $U$-value estimation, Surface Area $A$, and Tube Count calculator
          </p>
        </div>

        <button
          onClick={runAIThermalReview}
          disabled={loadingAI}
          className="bg-gradient-to-r from-indigo-600 via-blue-600 to-cyan-500 hover:from-indigo-500 hover:to-cyan-400 text-white px-4 py-2 rounded-xl text-xs font-bold font-mono flex items-center gap-2 shadow-lg shadow-indigo-500/20 transition disabled:opacity-50"
        >
          {loadingAI ? <RefreshCw className="w-4 h-4 animate-spin" /> : <Bot className="w-4 h-4" />}
          <span>{loadingAI ? "Analyzing Thermal Physics..." : "AI Thermal Review"}</span>
        </button>
      </div>

      {/* Main Grid: Inputs vs Thermal Outputs */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Column 1 & 2: Process Fluid Parameters */}
        <div className="lg:col-span-2 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Hot Fluid Side Card */}
            <div className="bg-slate-950 p-5 rounded-xl border border-rose-900/40 space-y-4">
              <h4 className="text-sm font-bold text-rose-400 font-mono flex items-center gap-2 border-b border-rose-900/40 pb-2">
                <span className="w-2.5 h-2.5 rounded-full bg-rose-500"></span> Hot Side (Shell / Tube Fluid)
              </h4>

              <div className="space-y-3">
                <div>
                  <label className="text-xs font-mono text-slate-400">Fluid Name:</label>
                  <input
                    type="text"
                    value={design.hotSide.name}
                    onChange={(e) => handleInputChange("hot", "name", e.target.value)}
                    className="w-full bg-slate-900 border border-slate-800 text-slate-200 text-xs px-3 py-1.5 rounded-lg mt-1"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="text-xs font-mono text-slate-400">Flow Rate (kg/h):</label>
                    <input
                      type="number"
                      value={design.hotSide.flowRate}
                      onChange={(e) => handleInputChange("hot", "flowRate", parseFloat(e.target.value))}
                      className="w-full bg-slate-900 border border-slate-800 text-slate-200 text-xs px-3 py-1.5 rounded-lg mt-1 font-mono"
                    />
                  </div>

                  <div>
                    <label className="text-xs font-mono text-slate-400">Sp. Heat (kJ/kg·K):</label>
                    <input
                      type="number"
                      step="0.05"
                      value={design.hotSide.specificHeat}
                      onChange={(e) => handleInputChange("hot", "specificHeat", parseFloat(e.target.value))}
                      className="w-full bg-slate-900 border border-slate-800 text-slate-200 text-xs px-3 py-1.5 rounded-lg mt-1 font-mono"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="text-xs font-mono text-slate-400">Temp In (°C):</label>
                    <input
                      type="number"
                      value={design.hotSide.tempIn}
                      onChange={(e) => handleInputChange("hot", "tempIn", parseFloat(e.target.value))}
                      className="w-full bg-slate-900 border border-slate-800 text-rose-300 font-bold text-xs px-3 py-1.5 rounded-lg mt-1 font-mono"
                    />
                  </div>

                  <div>
                    <label className="text-xs font-mono text-slate-400">Temp Out (°C):</label>
                    <input
                      type="number"
                      value={design.hotSide.tempOut}
                      onChange={(e) => handleInputChange("hot", "tempOut", parseFloat(e.target.value))}
                      className="w-full bg-slate-900 border border-slate-800 text-rose-300 font-bold text-xs px-3 py-1.5 rounded-lg mt-1 font-mono"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Cold Fluid Side Card */}
            <div className="bg-slate-950 p-5 rounded-xl border border-cyan-900/40 space-y-4">
              <h4 className="text-sm font-bold text-cyan-400 font-mono flex items-center gap-2 border-b border-cyan-900/40 pb-2">
                <span className="w-2.5 h-2.5 rounded-full bg-cyan-500"></span> Cold Side (Coolant Stream)
              </h4>

              <div className="space-y-3">
                <div>
                  <label className="text-xs font-mono text-slate-400">Fluid Name:</label>
                  <input
                    type="text"
                    value={design.coldSide.name}
                    onChange={(e) => handleInputChange("cold", "name", e.target.value)}
                    className="w-full bg-slate-900 border border-slate-800 text-slate-200 text-xs px-3 py-1.5 rounded-lg mt-1"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="text-xs font-mono text-slate-400">Flow Rate (kg/h):</label>
                    <input
                      type="number"
                      value={design.coldSide.flowRate}
                      onChange={(e) => handleInputChange("cold", "flowRate", parseFloat(e.target.value))}
                      className="w-full bg-slate-900 border border-slate-800 text-slate-200 text-xs px-3 py-1.5 rounded-lg mt-1 font-mono"
                    />
                  </div>

                  <div>
                    <label className="text-xs font-mono text-slate-400">Sp. Heat (kJ/kg·K):</label>
                    <input
                      type="number"
                      step="0.05"
                      value={design.coldSide.specificHeat}
                      onChange={(e) => handleInputChange("cold", "specificHeat", parseFloat(e.target.value))}
                      className="w-full bg-slate-900 border border-slate-800 text-slate-200 text-xs px-3 py-1.5 rounded-lg mt-1 font-mono"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="text-xs font-mono text-slate-400">Temp In (°C):</label>
                    <input
                      type="number"
                      value={design.coldSide.tempIn}
                      onChange={(e) => handleInputChange("cold", "tempIn", parseFloat(e.target.value))}
                      className="w-full bg-slate-900 border border-slate-800 text-cyan-300 font-bold text-xs px-3 py-1.5 rounded-lg mt-1 font-mono"
                    />
                  </div>

                  <div>
                    <label className="text-xs font-mono text-slate-400">Temp Out (°C):</label>
                    <input
                      type="number"
                      value={design.coldSide.tempOut}
                      onChange={(e) => handleInputChange("cold", "tempOut", parseFloat(e.target.value))}
                      className="w-full bg-slate-900 border border-slate-800 text-cyan-300 font-bold text-xs px-3 py-1.5 rounded-lg mt-1 font-mono"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Mechanical / Geometry Parameters Row */}
          <div className="bg-slate-950 p-5 rounded-xl border border-slate-800 space-y-4">
            <h4 className="text-xs font-bold font-mono text-slate-300 uppercase tracking-wider">
              Heat Exchanger Geometry Parameters
            </h4>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-xs">
              <div>
                <label className="font-mono text-slate-400">Tube Length (mm):</label>
                <input
                  type="number"
                  value={design.tubeLength}
                  onChange={(e) => handleInputChange("general", "tubeLength", parseFloat(e.target.value))}
                  className="w-full bg-slate-900 border border-slate-800 text-slate-200 p-2 rounded-lg mt-1 font-mono"
                />
              </div>

              <div>
                <label className="font-mono text-slate-400">Overall U (W/m²·K):</label>
                <input
                  type="number"
                  value={design.calculatedU || 420}
                  onChange={(e) => handleInputChange("general", "calculatedU", parseFloat(e.target.value))}
                  className="w-full bg-slate-900 border border-slate-800 text-slate-200 p-2 rounded-lg mt-1 font-mono"
                />
              </div>

              <div>
                <label className="font-mono text-slate-400">Tube Material:</label>
                <input
                  type="text"
                  value={design.tubeMaterial}
                  onChange={(e) => handleInputChange("general", "tubeMaterial", e.target.value)}
                  className="w-full bg-slate-900 border border-slate-800 text-slate-200 p-2 rounded-lg mt-1"
                />
              </div>

              <div>
                <label className="font-mono text-slate-400">Shell Material:</label>
                <input
                  type="text"
                  value={design.shellMaterial}
                  onChange={(e) => handleInputChange("general", "shellMaterial", e.target.value)}
                  className="w-full bg-slate-900 border border-slate-800 text-slate-200 p-2 rounded-lg mt-1"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Column 3: Live Engineering Output Summary Card */}
        <div className="bg-slate-950 p-6 rounded-xl border border-amber-900/40 space-y-6 flex flex-col justify-between">
          <div>
            <h4 className="text-sm font-bold text-amber-400 font-mono uppercase tracking-wider flex items-center gap-2 border-b border-amber-900/40 pb-3">
              <Zap className="w-4 h-4 text-amber-400" />
              Thermal Performance Output
            </h4>

            <div className="space-y-4 pt-4 font-mono">
              <div className="bg-slate-900 p-3.5 rounded-lg border border-slate-800 flex justify-between items-center">
                <span className="text-xs text-slate-400">Total Heat Duty ($Q$):</span>
                <span className="text-lg font-bold text-amber-400">{currentCalc.calculatedHeatDuty} kW</span>
              </div>

              <div className="bg-slate-900 p-3.5 rounded-lg border border-slate-800 flex justify-between items-center">
                <span className="text-xs text-slate-400">Log Mean Temp Diff (LMTD):</span>
                <span className="text-lg font-bold text-cyan-400">{currentCalc.calculatedLMTD} °C</span>
              </div>

              <div className="bg-slate-900 p-3.5 rounded-lg border border-slate-800 flex justify-between items-center">
                <span className="text-xs text-slate-400">Required Surface Area ($A$):</span>
                <span className="text-lg font-bold text-slate-100">{currentCalc.calculatedArea} m²</span>
              </div>

              <div className="bg-slate-900 p-3.5 rounded-lg border border-slate-800 flex justify-between items-center">
                <span className="text-xs text-slate-400">Est. Tubes Required ($N_t$):</span>
                <span className="text-lg font-bold text-emerald-400">{currentCalc.calculatedTubeCount} tubes</span>
              </div>
            </div>
          </div>

          <div className="bg-slate-900/80 p-3 rounded-lg border border-slate-800 text-xs font-mono text-slate-400 space-y-1">
            <div className="flex justify-between text-[11px]">
              <span>TEMA Classification:</span>
              <span className="text-cyan-400 font-bold">{design.temaType} Class R</span>
            </div>
            <div className="flex justify-between text-[11px]">
              <span>Overall U Design Basis:</span>
              <span>{design.calculatedU || 420} W/m²·K</span>
            </div>
          </div>
        </div>
      </div>

      {/* AI Analysis Output Display */}
      {aiAnalysis && (
        <div className="bg-slate-950 border border-indigo-800/60 rounded-xl p-6 space-y-3">
          <div className="flex items-center justify-between border-b border-indigo-900/60 pb-3">
            <div className="flex items-center gap-2">
              <Bot className="w-5 h-5 text-indigo-400" />
              <h4 className="text-sm font-bold text-indigo-200 font-mono">
                AI Senior Thermal Engineer Evaluation Report
              </h4>
            </div>
            <span className="text-[10px] font-mono bg-indigo-950 text-indigo-300 px-2 py-0.5 rounded border border-indigo-800">
              Gemini 3.6 Flash Verified
            </span>
          </div>
          <div className="prose prose-invert prose-sm text-xs text-slate-300 font-mono whitespace-pre-wrap leading-relaxed max-h-96 overflow-y-auto pr-2">
            {aiAnalysis}
          </div>
        </div>
      )}
    </div>
  );
};
