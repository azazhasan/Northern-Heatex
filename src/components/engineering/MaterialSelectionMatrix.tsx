import React, { useState } from "react";
import { MATERIALS_DATABASE } from "../../data/mockData";
import { MaterialSpec } from "../../types";
import { Cpu, ShieldCheck, Flame, Search, CheckCircle2, AlertTriangle, Bot, RefreshCw } from "lucide-react";

export const MaterialSelectionMatrix: React.FC = () => {
  const [selectedFluid, setSelectedFluid] = useState<string>("All");
  const [selectedMaterial, setSelectedMaterial] = useState<MaterialSpec>(MATERIALS_DATABASE[1]); // SS316L default
  const [weldingInquiry, setWeldingInquiry] = useState<string>("");
  const [aiWeldingReport, setAiWeldingReport] = useState<string | null>(null);
  const [loadingAI, setLoadingAI] = useState<boolean>(false);

  const fluidsList = [
    "All",
    "Seawater",
    "Cooling Tower Water",
    "Sour Oil & Gas (H2S)",
    "Demineralized Water",
    "Ammonia",
    "High Chlorides",
    "Turbine Lube Oil",
  ];

  const filteredMaterials = MATERIALS_DATABASE.filter((m) => {
    if (selectedFluid === "All") return true;
    return m.suitableFluids.some((f) => f.toLowerCase().includes(selectedFluid.toLowerCase()));
  });

  const runAIWeldingConsultation = async () => {
    setLoadingAI(true);
    setAiWeldingReport(null);
    try {
      const response = await fetch("/api/gemini/welding-metallurgy", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          prompt: weldingInquiry || `Provide WPS/PQR welding parameters and filler metal recommendation for ${selectedMaterial.name}`,
          parameters: {
            materialName: selectedMaterial.name,
            asmeSpec: selectedMaterial.asmeSpec,
            corrosionResistance: selectedMaterial.corrosionResistance,
            maxTemp: selectedMaterial.maxTemp,
          },
        }),
      });

      const data = await response.json();
      if (data.result) {
        setAiWeldingReport(data.result);
      } else {
        setAiWeldingReport("Welding evaluation completed.");
      }
    } catch (err) {
      console.error(err);
      setAiWeldingReport("Error connecting to AI Welding Specialist endpoint.");
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
            <Cpu className="w-6 h-6 text-cyan-400" />
            Alloy & Metallurgy Material Selection Matrix
          </h3>
          <p className="text-xs text-slate-400 font-mono">
            ASME Section II materials property database, fluid corrosion resistance, and relative cost factors
          </p>
        </div>

        {/* Fluid Filter Buttons */}
        <div className="flex flex-wrap items-center gap-2 text-xs font-mono">
          <span className="text-slate-400">Filter Stream Fluid:</span>
          <select
            value={selectedFluid}
            onChange={(e) => setSelectedFluid(e.target.value)}
            className="bg-slate-950 border border-slate-700 text-cyan-300 px-3 py-1.5 rounded-lg focus:outline-none"
          >
            {fluidsList.map((f) => (
              <option key={f} value={f}>
                {f}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Materials Comparison Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredMaterials.map((mat) => {
          const isSelected = selectedMaterial.id === mat.id;
          return (
            <div
              key={mat.id}
              onClick={() => setSelectedMaterial(mat)}
              className={`cursor-pointer rounded-xl p-5 transition duration-200 border flex flex-col justify-between space-y-4 ${
                isSelected
                  ? "bg-slate-950 border-cyan-500 shadow-xl shadow-cyan-950"
                  : "bg-slate-950/60 border-slate-800 hover:border-slate-700"
              }`}
            >
              <div className="space-y-2">
                <div className="flex items-start justify-between gap-2">
                  <h4 className="font-bold text-sm text-slate-100">{mat.name}</h4>
                  <span
                    className={`text-[10px] font-mono px-2 py-0.5 rounded border font-bold ${
                      mat.corrosionResistance === "Specialized" || mat.corrosionResistance === "Excellent"
                        ? "bg-emerald-950 text-emerald-400 border-emerald-800"
                        : "bg-amber-950 text-amber-400 border-amber-800"
                    }`}
                  >
                    {mat.corrosionResistance} Corrosion
                  </span>
                </div>
                <p className="text-xs text-slate-400 font-mono">{mat.asmeSpec}</p>
                <p className="text-xs text-slate-300 line-clamp-2">{mat.description}</p>
              </div>

              {/* Specs Badge Bar */}
              <div className="space-y-2 pt-2 border-t border-slate-800/80 text-xs font-mono">
                <div className="flex justify-between text-slate-400">
                  <span>Thermal Cond ($k$):</span>
                  <span className="text-cyan-400 font-bold">{mat.thermalConductivity} W/m·K</span>
                </div>
                <div className="flex justify-between text-slate-400">
                  <span>Max Temp:</span>
                  <span className="text-amber-400 font-bold">{mat.maxTemp} °C</span>
                </div>
                <div className="flex justify-between text-slate-400">
                  <span>Relative Cost Index:</span>
                  <span className="text-emerald-400 font-bold">{mat.costIndex}x CS</span>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Selected Material Deep Metallurgy & AI Welding Consultation */}
      {selectedMaterial && (
        <div className="bg-slate-950 p-6 rounded-xl border border-slate-800 space-y-6">
          <div className="flex flex-wrap items-center justify-between gap-4 border-b border-slate-800 pb-4">
            <div>
              <h4 className="text-base font-bold text-slate-100 flex items-center gap-2">
                <ShieldCheck className="w-5 h-5 text-cyan-400" />
                Active Alloy Specification: {selectedMaterial.name} ({selectedMaterial.grade})
              </h4>
              <p className="text-xs text-slate-400 font-mono">{selectedMaterial.asmeSpec}</p>
            </div>

            <div className="flex items-center gap-2">
              <span className="text-xs text-slate-400 font-mono">Suitable Streams:</span>
              <div className="flex flex-wrap gap-1">
                {selectedMaterial.suitableFluids.map((sf) => (
                  <span key={sf} className="px-2 py-0.5 bg-slate-900 border border-slate-700 text-cyan-300 rounded text-[11px] font-mono">
                    {sf}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* AI Welding Specification Box */}
          <div className="space-y-4">
            <div className="flex flex-col sm:flex-row gap-3 items-stretch">
              <input
                type="text"
                placeholder={`Ask AI Welding Specialist about ${selectedMaterial.name} (e.g. tube-to-tubesheet joint WPS, filler metal, PWHT)...`}
                value={weldingInquiry}
                onChange={(e) => setWeldingInquiry(e.target.value)}
                className="flex-1 bg-slate-900 border border-slate-700 text-slate-200 text-xs px-4 py-2.5 rounded-xl font-mono focus:outline-none focus:border-cyan-500"
              />
              <button
                onClick={runAIWeldingConsultation}
                disabled={loadingAI}
                className="bg-cyan-600 hover:bg-cyan-500 text-slate-950 font-bold font-mono px-5 py-2.5 rounded-xl text-xs flex items-center justify-center gap-2 shadow-lg shadow-cyan-600/20 shrink-0"
              >
                {loadingAI ? <RefreshCw className="w-4 h-4 animate-spin" /> : <Bot className="w-4 h-4" />}
                <span>{loadingAI ? "Consulting Metallurgist..." : "Consult AI Welding Engineer"}</span>
              </button>
            </div>

            {aiWeldingReport && (
              <div className="bg-slate-900 border border-indigo-900/60 rounded-xl p-5 space-y-2">
                <div className="flex items-center justify-between border-b border-indigo-900/40 pb-2">
                  <span className="text-xs font-bold font-mono text-indigo-300 flex items-center gap-2">
                    <Bot className="w-4 h-4 text-indigo-400" />
                    Master Welding & Metallurgical Procedure (WPS / PQR Guidelines)
                  </span>
                  <span className="text-[10px] font-mono text-slate-400">AWS / ASME Sec IX Standards</span>
                </div>
                <div className="prose prose-invert prose-sm text-xs text-slate-300 font-mono whitespace-pre-wrap leading-relaxed max-h-80 overflow-y-auto pt-2">
                  {aiWeldingReport}
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
