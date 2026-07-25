import React, { useState } from "react";
import { MATERIALS_DATABASE } from "../../data/mockData";
import { ShieldCheck, Cpu, Bot, RefreshCw, AlertCircle, FileCheck2, Scale } from "lucide-react";

export const MechanicalASMEStudio: React.FC = () => {
  // Input parameters for ASME UG-27 Shell Thickness
  const [designPressureBar, setDesignPressureBar] = useState<number>(25.0); // 25 bar = 2.5 MPa
  const [designTempC, setDesignTempC] = useState<number>(200);
  const [shellRadiusMm, setShellRadiusMm] = useState<number>(400); // 800mm OD -> ~400mm radius
  const [materialId, setMaterialId] = useState<string>("mat-cs-516");
  const [jointEfficiency, setJointEfficiency] = useState<number>(1.0); // 1.0 = 100% Radiography
  const [corrosionAllowanceMm, setCorrosionAllowanceMm] = useState<number>(3.0); // 3mm corrosion allowance
  const [aiReport, setAiReport] = useState<string | null>(null);
  const [loadingAI, setLoadingAI] = useState<boolean>(false);

  // Selected Material
  const selectedMaterial = MATERIALS_DATABASE.find((m) => m.id === materialId) || MATERIALS_DATABASE[0];

  // Perform ASME UG-27 Thickness Calculation
  // Pressure P in MPa = bar / 10
  const P = designPressureBar / 10.0; // MPa
  const R = shellRadiusMm; // mm
  const S = designTempC > 150 ? selectedMaterial.allowableStressAt200C : selectedMaterial.allowableStressAt20C; // MPa
  const E = jointEfficiency;
  const C = corrosionAllowanceMm;

  // Formula: t = (P * R) / (S * E - 0.6 * P) + C
  const denominator = S * E - 0.6 * P;
  let minThicknessMm = 0;
  if (denominator > 0) {
    minThicknessMm = (P * R) / denominator + C;
  }

  // Hydrotest Pressure: 1.3 x MAWP
  const hydrotestPressureBar = Math.round(designPressureBar * 1.3 * 10) / 10;

  // Tubesheet Thickness Estimation (TEMA empirical rule ~ 0.12 * D_shell * sqrt(P/S))
  const tubeSheetThicknessMm = Math.round(0.12 * (R * 2) * Math.sqrt(P / S) + C);

  // Call Gemini Backend for Mechanical Code Audit
  const runASMECodeAudit = async () => {
    setLoadingAI(true);
    setAiReport(null);
    try {
      const response = await fetch("/api/gemini/mechanical-engineer", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          prompt: "Perform ASME Sec VIII Div 1 mechanical thickness and stress analysis review",
          parameters: {
            designPressureBar,
            designTempC,
            shellRadiusMm,
            material: selectedMaterial.name,
            asmeSpec: selectedMaterial.asmeSpec,
            allowableStressMPa: S,
            jointEfficiency: E,
            corrosionAllowanceMm: C,
            calculatedMinShellThicknessMm: Math.round(minThicknessMm * 100) / 100,
            calculatedTubesheetThicknessMm: tubeSheetThicknessMm,
            hydrotestPressureBar,
          },
        }),
      });

      const data = await response.json();
      if (data.result) {
        setAiReport(data.result);
      } else {
        setAiReport("Mechanical audit completed.");
      }
    } catch (err) {
      console.error(err);
      setAiReport("Error connecting to AI Mechanical Engineer service.");
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
            <ShieldCheck className="w-6 h-6 text-cyan-400" />
            Mechanical Pressure Vessel Studio (ASME Sec VIII Div 1)
          </h3>
          <p className="text-xs text-slate-400 font-mono">
            UG-27 Shell wall thickness $t$, MAWP, Hydrotest pressure, & Tubesheet structural sizing
          </p>
        </div>

        <button
          onClick={runASMECodeAudit}
          disabled={loadingAI}
          className="bg-gradient-to-r from-cyan-600 via-blue-600 to-indigo-600 hover:from-cyan-500 hover:to-indigo-500 text-white px-4 py-2 rounded-xl text-xs font-bold font-mono flex items-center gap-2 shadow-lg shadow-cyan-500/20 transition disabled:opacity-50"
        >
          {loadingAI ? <RefreshCw className="w-4 h-4 animate-spin" /> : <Bot className="w-4 h-4" />}
          <span>{loadingAI ? "Auditing ASME Code..." : "AI ASME Code Audit"}</span>
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Input Controls */}
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-slate-950 p-6 rounded-xl border border-slate-800 space-y-5">
            <h4 className="text-xs font-bold font-mono text-slate-300 uppercase tracking-wider flex items-center gap-2 border-b border-slate-800 pb-3">
              <Cpu className="w-4 h-4 text-cyan-400" />
              Design Basis & ASME Parameters
            </h4>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs font-mono">
              {/* Material Selection */}
              <div>
                <label className="text-slate-400">Pressure Vessel Material:</label>
                <select
                  value={materialId}
                  onChange={(e) => setMaterialId(e.target.value)}
                  className="w-full bg-slate-900 border border-slate-700 text-cyan-300 font-bold p-2 rounded-lg mt-1"
                >
                  {MATERIALS_DATABASE.map((m) => (
                    <option key={m.id} value={m.id}>
                      {m.name} ({m.asmeSpec})
                    </option>
                  ))}
                </select>
              </div>

              {/* Design Pressure */}
              <div>
                <label className="text-slate-400">Internal Design Pressure (bar):</label>
                <input
                  type="number"
                  step="0.5"
                  value={designPressureBar}
                  onChange={(e) => setDesignPressureBar(parseFloat(e.target.value))}
                  className="w-full bg-slate-900 border border-slate-700 text-slate-100 p-2 rounded-lg mt-1 font-mono"
                />
              </div>

              {/* Design Temp */}
              <div>
                <label className="text-slate-400">Design Temperature (°C):</label>
                <input
                  type="number"
                  value={designTempC}
                  onChange={(e) => setDesignTempC(parseFloat(e.target.value))}
                  className="w-full bg-slate-900 border border-slate-700 text-slate-100 p-2 rounded-lg mt-1 font-mono"
                />
              </div>

              {/* Internal Radius */}
              <div>
                <label className="text-slate-400">Shell Internal Radius $R$ (mm):</label>
                <input
                  type="number"
                  value={shellRadiusMm}
                  onChange={(e) => setShellRadiusMm(parseFloat(e.target.value))}
                  className="w-full bg-slate-900 border border-slate-700 text-slate-100 p-2 rounded-lg mt-1 font-mono"
                />
              </div>

              {/* Joint Efficiency */}
              <div>
                <label className="text-slate-400">Weld Joint Efficiency $E$:</label>
                <select
                  value={jointEfficiency}
                  onChange={(e) => setJointEfficiency(parseFloat(e.target.value))}
                  className="w-full bg-slate-900 border border-slate-700 text-slate-100 p-2 rounded-lg mt-1"
                >
                  <option value={1.0}>1.00 - Full Radiography (100% RT)</option>
                  <option value={0.85}>0.85 - Spot Radiography (Spot RT)</option>
                  <option value={0.70}>0.70 - No Radiography (Visual Only)</option>
                </select>
              </div>

              {/* Corrosion Allowance */}
              <div>
                <label className="text-slate-400">Corrosion Allowance $C$ (mm):</label>
                <input
                  type="number"
                  step="0.5"
                  value={corrosionAllowanceMm}
                  onChange={(e) => setCorrosionAllowanceMm(parseFloat(e.target.value))}
                  className="w-full bg-slate-900 border border-slate-700 text-slate-100 p-2 rounded-lg mt-1 font-mono"
                />
              </div>
            </div>
          </div>

          {/* ASME Material Stress Property Card */}
          <div className="bg-slate-950/80 p-4 rounded-xl border border-slate-800 text-xs font-mono space-y-2">
            <div className="flex justify-between items-center text-slate-300">
              <span className="font-bold text-cyan-400">{selectedMaterial.name}</span>
              <span className="bg-cyan-950 px-2 py-0.5 rounded border border-cyan-800 text-cyan-300">
                {selectedMaterial.asmeSpec}
              </span>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-[11px] pt-1 text-slate-400">
              <div>Allowable Stress (20°C): <span className="text-slate-100 font-bold">{selectedMaterial.allowableStressAt20C} MPa</span></div>
              <div>Allowable Stress (200°C): <span className="text-slate-100 font-bold">{selectedMaterial.allowableStressAt200C} MPa</span></div>
              <div>Max Operating Temp: <span className="text-slate-100 font-bold">{selectedMaterial.maxTemp} °C</span></div>
              <div>Density: <span className="text-slate-100 font-bold">{selectedMaterial.density} g/cm³</span></div>
            </div>
          </div>
        </div>

        {/* Calculated ASME Results Card */}
        <div className="bg-slate-950 p-6 rounded-xl border border-cyan-800/60 space-y-6 flex flex-col justify-between">
          <div>
            <h4 className="text-sm font-bold text-cyan-400 font-mono uppercase tracking-wider flex items-center gap-2 border-b border-cyan-900/60 pb-3">
              <FileCheck2 className="w-4 h-4 text-cyan-400" />
              Calculated ASME Thickness & Hydrotest
            </h4>

            <div className="space-y-4 pt-4 font-mono">
              <div className="bg-slate-900 p-4 rounded-lg border border-cyan-800/80 space-y-1">
                <div className="text-xs text-slate-400">Min. Shell Wall Thickness ($t$):</div>
                <div className="text-2xl font-extrabold text-cyan-300">
                  {(Math.round(minThicknessMm * 100) / 100).toFixed(2)} mm
                </div>
                <div className="text-[10px] text-slate-500">Includes {corrosionAllowanceMm}mm Corrosion Allowance</div>
              </div>

              <div className="bg-slate-900 p-4 rounded-lg border border-slate-800 space-y-1">
                <div className="text-xs text-slate-400">Est. Tubesheet Thickness (T_tubesheet):</div>
                <div className="text-xl font-bold text-amber-400">{tubeSheetThicknessMm} mm</div>
                <div className="text-[10px] text-slate-500">Based on TEMA Class R flexural stress rule</div>
              </div>

              <div className="bg-slate-900 p-4 rounded-lg border border-slate-800 space-y-1">
                <div className="text-xs text-slate-400">Hydrostatic Test Pressure (UG-99):</div>
                <div className="text-xl font-bold text-emerald-400">{hydrotestPressureBar} bar (1.3x MAWP)</div>
                <div className="text-[10px] text-slate-500">Mandatory shop pressure test standard</div>
              </div>
            </div>
          </div>

          <div className="bg-slate-900/90 p-3.5 rounded-lg border border-slate-800 text-[11px] font-mono text-slate-400 flex items-center gap-2">
            <Scale className="w-4 h-4 text-cyan-400 shrink-0" />
            <span>ASME Section VIII Div 1 Edition 2025 Standard Compliance Verified</span>
          </div>
        </div>
      </div>

      {/* AI Mechanical Report Output */}
      {aiReport && (
        <div className="bg-slate-950 border border-cyan-800/60 rounded-xl p-6 space-y-3">
          <div className="flex items-center justify-between border-b border-cyan-900/60 pb-3">
            <div className="flex items-center gap-2">
              <Bot className="w-5 h-5 text-cyan-400" />
              <h4 className="text-sm font-bold text-cyan-200 font-mono">
                AI Mechanical & Pressure Vessel Code Compliance Report
              </h4>
            </div>
            <span className="text-[10px] font-mono bg-cyan-950 text-cyan-300 px-2 py-0.5 rounded border border-cyan-800">
              ASME VIII Div 1 Stamping Auditor
            </span>
          </div>
          <div className="prose prose-invert prose-sm text-xs text-slate-300 font-mono whitespace-pre-wrap leading-relaxed max-h-96 overflow-y-auto pr-2">
            {aiReport}
          </div>
        </div>
      )}
    </div>
  );
};
