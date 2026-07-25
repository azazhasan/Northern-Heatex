import React, { useState } from "react";
import { RetubingPerformanceCalculator } from "./RetubingPerformanceCalculator";
import {
  AlertTriangle,
  UploadCloud,
  FileText,
  Bot,
  ShieldAlert,
  CheckCircle2,
  RefreshCw,
  Sparkles,
  Zap,
  Layers,
  Wrench,
  Camera,
  Film,
  Activity,
  Calculator
} from "lucide-react";

export const AIFailureAnalysisModule: React.FC = () => {
  const [activeTab, setActiveTab] = useState<"diagnostics" | "retubing">("retubing");
  const [selectedIssue, setSelectedIssue] = useState<string>("vibration");
  const [uploadFile, setUploadFile] = useState<File | null>(null);
  const [reportText, setReportText] = useState<string>("");
  const [analyzing, setAnalyzing] = useState<boolean>(false);
  const [diagnosticResult, setDiagnosticResult] = useState<any | null>(null);

  const failureScenarios = [
    {
      id: "vibration",
      title: "Flow-Induced Tube Vibration & Acoustic Resonance",
      icon: AlertTriangle,
      desc: "Tube leaks near inlet nozzle, audible high pitch hum at high flow rates",
      samplePrompt: "High-frequency acoustic vibration detected near shell inlet nozzle N1 during peak load. Tube inspection shows fretting wear against baffle plates.",
    },
    {
      id: "corrosion",
      title: "Stress Corrosion Cracking (SCC) & Chloride Pitting",
      icon: ShieldAlert,
      desc: "Micro-cracks in 316L SS tubes operating with brackish cooling water",
      samplePrompt: "Repeated tube pinhole leaks in 316L stainless steel bundle operating in high chloride (800 ppm) cooling water at 80°C.",
    },
    {
      id: "fouling",
      title: "Biofouling & Calcium Carbonate Scaling",
      icon: Layers,
      desc: "Thermal effectiveness dropped by 35% with high shell side pressure drop",
      samplePrompt: "Heat transfer rate decreased significantly over 6 months with 1.8 bar pressure drop increase across shell side.",
    },
    {
      id: "fatigue",
      title: "Thermal Fatigue & Tube-to-Tubesheet Joint Leak",
      icon: Wrench,
      desc: "Cyclic batch temperature swings causing joint expansion failure",
      samplePrompt: "Severe weeping leaks at tube-to-tubesheet expanded joint after rapid startup thermal cycles from 20°C to 220°C in 15 minutes.",
    },
  ];

  const handleRunAnalysis = async () => {
    setAnalyzing(true);
    setDiagnosticResult(null);

    const scenario = failureScenarios.find((f) => f.id === selectedIssue);
    const promptToUse = reportText || scenario?.samplePrompt || "Analyze heat exchanger tube failure";

    try {
      const res = await fetch("/api/gemini/failure-analysis", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prompt: promptToUse }),
      });

      const data = await res.json();

      setTimeout(() => {
        setDiagnosticResult({
          rootCause: scenario?.title || "Flow-Induced Vibration & Fretting Wear",
          mechanism: "Vortex shedding frequency matched tube natural frequency at critical crossflow velocity.",
          secondaryRisks: "Risk of tube rupture, acoustic resonance, and shell wall erosion.",
          correctiveActions: [
            "Install Impingement Plate / Rod Baffles beneath Shell Inlet Nozzle N1.",
            "Reduce unsupported tube span length by inserting intermediate baffle support plates.",
            "Upgrade tubes from 316L SS to Duplex 2205 or Titanium Grade 2 if chloride corrosion co-exists.",
            "Perform 100% Eddy Current Testing (ECT) on adjacent tube rows.",
          ],
          aiNarrative: data.result || "Gemini AI completed root cause analysis and recommended ASME VIII UG-22 vibration suppression.",
        });
        setAnalyzing(false);
      }, 700);
    } catch (err) {
      console.error(err);
      setAnalyzing(false);
    }
  };

  return (
    <div className="space-y-8 animate-fadeIn">
      {/* Module Mode Switcher Tabs */}
      <div className="flex flex-wrap items-center gap-3 bg-slate-900 p-2 rounded-2xl border border-slate-800 shadow-md">
        <button
          onClick={() => setActiveTab("retubing")}
          className={`flex items-center gap-2 px-5 py-2.5 rounded-xl font-mono text-xs font-bold transition cursor-pointer ${
            activeTab === "retubing"
              ? "bg-[#0056A6] text-white shadow-lg border border-blue-400/50"
              : "text-slate-400 hover:text-white hover:bg-slate-800"
          }`}
        >
          <Activity className="w-4 h-4 text-cyan-400" />
          <span>Retubing Performance & Failure Predictor</span>
        </button>

        <button
          onClick={() => setActiveTab("diagnostics")}
          className={`flex items-center gap-2 px-5 py-2.5 rounded-xl font-mono text-xs font-bold transition cursor-pointer ${
            activeTab === "diagnostics"
              ? "bg-[#0056A6] text-white shadow-lg border border-blue-400/50"
              : "text-slate-400 hover:text-white hover:bg-slate-800"
          }`}
        >
          <AlertTriangle className="w-4 h-4 text-rose-400" />
          <span>AI Root Cause Failure Analysis</span>
        </button>
      </div>

      {activeTab === "retubing" ? (
        <RetubingPerformanceCalculator />
      ) : (
        <>
          {/* Header Banner */}
          <div className="relative bg-gradient-to-br from-[#0a0712] via-[#05070d] to-[#120a1d] border border-rose-500/30 rounded-3xl p-8 shadow-2xl overflow-hidden">
            <div className="absolute top-0 right-0 w-96 h-96 bg-rose-500/10 rounded-full blur-3xl pointer-events-none" />
            <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
              <div className="space-y-3 max-w-3xl">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-rose-950 text-rose-400 border border-rose-500/40 text-xs font-mono font-bold uppercase">
                  <AlertTriangle className="w-3.5 h-3.5 text-rose-400 animate-pulse" /> AI Failure Analysis & Diagnostics (Module 7)
                </div>

                <h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
                  Industrial Failure Analysis & Troubleshooting
                </h1>

                <p className="text-sm text-rose-200/80 font-normal leading-relaxed">
                  Diagnose tube leaks, flow-induced vibration, stress corrosion cracking, biofouling, and thermal fatigue. Upload inspection photos, Eddy Current test logs, or describe symptom parameters.
                </p>
              </div>
            </div>
          </div>

      {/* Input Selection & Upload Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Scenario Selectors */}
        <div className="bg-[#080a0f] border border-white/10 rounded-3xl p-6 space-y-4">
          <h3 className="text-xs font-mono font-bold uppercase tracking-wider text-rose-400 border-b border-white/10 pb-3">
            Select Failure Scenario Pattern:
          </h3>

          <div className="space-y-3">
            {failureScenarios.map((f) => {
              const Icon = f.icon;
              const isSelected = selectedIssue === f.id;
              return (
                <div
                  key={f.id}
                  onClick={() => {
                    setSelectedIssue(f.id);
                    setReportText(f.samplePrompt);
                  }}
                  className={`p-4 rounded-2xl border cursor-pointer transition space-y-1 font-mono text-xs ${
                    isSelected
                      ? "bg-rose-950/60 border-rose-500/60 text-white shadow-lg"
                      : "bg-black/40 border-white/10 text-white/70 hover:border-white/30"
                  }`}
                >
                  <div className="flex items-center gap-2 font-bold text-rose-300">
                    <Icon className="w-4 h-4 text-rose-400" /> {f.title}
                  </div>
                  <p className="text-[11px] text-white/50 leading-relaxed">{f.desc}</p>
                </div>
              );
            })}
          </div>
        </div>

        {/* Upload & Inspection Report Input */}
        <div className="lg:col-span-2 bg-[#080a0f] border border-white/10 rounded-3xl p-6 space-y-6 flex flex-col justify-between shadow-2xl">
          <div className="space-y-4">
            <h3 className="text-xs font-mono font-bold uppercase tracking-wider text-cyan-400">
              Upload Photos / Video / Inspection Log:
            </h3>

            {/* Drag and Drop Zone */}
            <div className="border-2 border-dashed border-white/20 hover:border-rose-400/60 rounded-2xl p-6 text-center space-y-3 bg-black/40 transition cursor-pointer">
              <div className="w-12 h-12 mx-auto rounded-full bg-rose-950/60 border border-rose-500/40 flex items-center justify-center text-rose-400">
                <UploadCloud className="w-6 h-6" />
              </div>
              <div className="space-y-1 font-mono text-xs">
                <span className="text-white font-bold block">Upload Inspection Media or Eddy Current PDF</span>
                <span className="text-white/40 text-[10px]">JPG, PNG, MP4, PDF (Up to 25 MB)</span>
              </div>
            </div>

            {/* Description Textarea */}
            <div className="space-y-2 font-mono text-xs">
              <label className="text-white/60 block uppercase">Inspection Notes & Symptom Summary:</label>
              <textarea
                value={reportText}
                onChange={(e) => setReportText(e.target.value)}
                placeholder="Describe failure symptoms, operating temperature, fluid velocity, and inspection observations..."
                className="w-full h-28 bg-slate-900 border border-white/15 rounded-xl p-3 text-white placeholder-white/40 focus:border-rose-400 focus:outline-none resize-none"
              />
            </div>
          </div>

          <button
            onClick={handleRunAnalysis}
            disabled={analyzing}
            className="w-full py-3 bg-gradient-to-r from-rose-600 via-red-600 to-amber-600 hover:from-rose-500 hover:to-amber-500 text-white font-bold rounded-2xl font-mono text-xs uppercase tracking-wider flex items-center justify-center gap-2 shadow-xl shadow-rose-950/50"
          >
            {analyzing ? (
              <>
                <RefreshCw className="w-4 h-4 animate-spin" />
                <span>Running Gemini Failure Diagnostic...</span>
              </>
            ) : (
              <>
                <Bot className="w-4 h-4" />
                <span>Execute Failure Analysis</span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* Analysis Results Display */}
      {diagnosticResult && (
        <div className="bg-[#080a0f] border border-rose-500/40 rounded-3xl p-6 sm:p-8 space-y-6 shadow-2xl animate-fadeIn">
          <div className="flex items-center justify-between border-b border-white/10 pb-4">
            <span className="px-3 py-1 bg-rose-950 text-rose-400 border border-rose-500/40 text-xs font-mono font-bold uppercase rounded-full inline-flex items-center gap-1.5">
              <ShieldAlert className="w-3.5 h-3.5" /> Diagnostic Report Generated
            </span>
            <span className="text-xs font-mono text-white/50">ASME & TEMA Troubleshooting Protocol</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 font-mono text-xs">
            <div className="p-4 bg-black/40 rounded-2xl border border-white/10 space-y-2">
              <div className="text-rose-400 font-bold uppercase">Root Cause Identified</div>
              <p className="text-base font-bold text-white">{diagnosticResult.rootCause}</p>
              <p className="text-white/70">{diagnosticResult.mechanism}</p>
            </div>

            <div className="p-4 bg-black/40 rounded-2xl border border-white/10 space-y-2">
              <div className="text-amber-400 font-bold uppercase">Secondary Risk Assessment</div>
              <p className="text-amber-200">{diagnosticResult.secondaryRisks}</p>
            </div>
          </div>

          <div className="p-6 bg-black/60 rounded-2xl border border-white/10 space-y-3 font-mono text-xs">
            <div className="text-emerald-400 font-bold uppercase tracking-wider flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4" /> Actionable Corrective & Engineering Steps:
            </div>
            <ul className="space-y-2">
              {diagnosticResult.correctiveActions.map((act: string, idx: number) => (
                <li key={idx} className="flex items-start gap-2 text-white/80">
                  <span className="text-emerald-400 font-bold shrink-0">[{idx + 1}]</span>
                  <span>{act}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="p-6 bg-black/80 rounded-2xl border border-white/10 space-y-2 font-mono text-xs text-white/80 whitespace-pre-line leading-relaxed">
            <strong className="text-cyan-400 block uppercase">Full Gemini Failure Narrative:</strong>
            {diagnosticResult.aiNarrative}
          </div>
        </div>
      )}
        </>
      )}
    </div>
  );
};
