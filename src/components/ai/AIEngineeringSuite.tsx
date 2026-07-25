import React, { useState } from "react";
import { Bot, Flame, ShieldCheck, Cpu, AlertTriangle, FileText, Send, Sparkles, RefreshCw, Zap } from "lucide-react";

type AIAgentType =
  | "thermal"
  | "mechanical"
  | "welding"
  | "failure"
  | "proposal"
  | "knowledge";

export const AIEngineeringSuite: React.FC = () => {
  const [activeAgent, setActiveAgent] = useState<AIAgentType>("thermal");
  const [userPrompt, setUserPrompt] = useState<string>("");
  const [aiResponse, setAiResponse] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  const agentsList = [
    {
      id: "thermal" as AIAgentType,
      name: "AI Thermal Engineer",
      role: "Thermal Design & Sizing",
      icon: Flame,
      color: "text-amber-400",
      bgColor: "bg-amber-950/40 border-amber-800/60",
      description: "Optimizes heat duty Q, LMTD, overall heat transfer coefficient U, and tube count.",
      endpoint: "/api/gemini/thermal-engineer",
      defaultPrompt: "Calculate heat duty and surface area for a shell and tube exchanger cooling 50,000 kg/h hot oil from 180°C to 90°C using cooling water at 25°C.",
    },
    {
      id: "mechanical" as AIAgentType,
      name: "AI Mechanical & ASME Specialist",
      role: "ASME Sec VIII Div 1 & TEMA",
      icon: ShieldCheck,
      color: "text-cyan-400",
      bgColor: "bg-cyan-950/40 border-cyan-800/60",
      description: "Evaluates shell thickness t, tubesheet thickness, MAWP, and hydrotest pressure.",
      endpoint: "/api/gemini/mechanical-engineer",
      defaultPrompt: "Check minimum shell thickness per ASME UG-27 for 30 bar design pressure, 200°C design temp, 900mm OD shell in SA-516 Gr 70 with 3mm corrosion allowance.",
    },
    {
      id: "welding" as AIAgentType,
      name: "AI Welding & Metallurgy Specialist",
      role: "WPS / PQR & Alloy Engineering",
      icon: Cpu,
      color: "text-emerald-400",
      bgColor: "bg-emerald-950/40 border-emerald-800/60",
      description: "Provides WPS guidelines for Super Duplex 2205, Titanium, Cu-Ni, and White Metal Re-Babbitting.",
      endpoint: "/api/gemini/welding-metallurgy",
      defaultPrompt: "Provide tube-to-tubesheet joint welding WPS parameters for automatic GTAW welding of Titanium Grade 2 tubes into Titanium clad tubesheet.",
    },
    {
      id: "failure" as AIAgentType,
      name: "AI Failure Analysis & Troubleshooting",
      role: "Vibration & Corrosion Diagnostics",
      icon: AlertTriangle,
      color: "text-rose-400",
      bgColor: "bg-rose-950/40 border-rose-800/60",
      description: "Diagnoses tube leaks, flow-induced vibration, acoustic resonance, and fouling.",
      endpoint: "/api/gemini/failure-analysis",
      defaultPrompt: "Analyze cause of repeated tube leaks in first 3 tube rows of compressor intercooler running at high gas velocity (acoustic vibration suspected).",
    },
    {
      id: "proposal" as AIAgentType,
      name: "AI Proposal & Tech Doc Generator",
      role: "Commercial & Spec Compiler",
      icon: FileText,
      color: "text-indigo-400",
      bgColor: "bg-indigo-950/40 border-indigo-800/60",
      description: "Auto-generates formal TEMA technical datasheets and commercial proposals.",
      endpoint: "/api/gemini/proposal-generator",
      defaultPrompt: "Generate a complete technical proposal for Siemens Energy for 6 units of Stator Air Coolers in Cu-Ni 70/30 with double tubesheet construction.",
    },
    {
      id: "knowledge" as AIAgentType,
      name: "AI Engineering Knowledge Base",
      role: "TEMA & ASME Standards RAG",
      icon: Bot,
      color: "text-blue-400",
      bgColor: "bg-blue-950/40 border-blue-800/60",
      description: "Query assistant for TEMA Class R, C, B, API 660, HEI, and PED 2014/68/EU standards.",
      endpoint: "/api/gemini/knowledge-base",
      defaultPrompt: "What are the TEMA Class R requirements for minimum tube sheet thickness and baffle clearance tolerances?",
    },
  ];

  const currentAgent = agentsList.find((a) => a.id === activeAgent) || agentsList[0];

  const runAIAgent = async () => {
    if (!userPrompt.trim()) return;
    setLoading(true);
    setAiResponse(null);

    try {
      const response = await fetch(currentAgent.endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          prompt: userPrompt,
          query: userPrompt,
          symptoms: userPrompt,
          clientName: "Enterprise Partner",
          projectTitle: "Industrial Thermal Unit",
        }),
      });

      const data = await response.json();
      if (data.result) {
        setAiResponse(data.result);
      } else {
        setAiResponse(data.error || "Execution completed.");
      }
    } catch (err) {
      console.error(err);
      setAiResponse("Failed to communicate with AI Backend. Ensure GEMINI_API_KEY environment secret is configured.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-2xl space-y-8">
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-4 border-b border-slate-800 pb-4">
        <div>
          <h3 className="text-xl font-bold text-slate-100 flex items-center gap-2">
            <Bot className="w-6 h-6 text-indigo-400 animate-pulse" />
            AI Engineering Agent Suite (Gemini 3.6 Flash Engine)
          </h3>
          <p className="text-xs text-slate-400 font-mono">
            Autonomous multi-agent thermal, mechanical, welding, diagnostic, and technical proposal assistant
          </p>
        </div>

        <span className="px-3 py-1 bg-indigo-950 text-indigo-300 rounded-lg border border-indigo-800 text-xs font-mono flex items-center gap-1.5 font-bold">
          <Sparkles className="w-3.5 h-3.5 text-indigo-400" />
          Server-Side Gemini API Proxy Active
        </span>
      </div>

      {/* Agents Selection Cards Bar */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {agentsList.map((ag) => {
          const Icon = ag.icon;
          const isSelected = activeAgent === ag.id;
          return (
            <div
              key={ag.id}
              onClick={() => {
                setActiveAgent(ag.id);
                setUserPrompt(ag.defaultPrompt);
                setAiResponse(null);
              }}
              className={`cursor-pointer rounded-xl p-4 border transition duration-200 flex flex-col justify-between space-y-2 ${
                isSelected
                  ? "bg-slate-950 border-cyan-500 shadow-xl shadow-cyan-950"
                  : "bg-slate-950/60 border-slate-800 hover:border-slate-700"
              }`}
            >
              <div className="flex items-center gap-3">
                <div className={`p-2 rounded-lg bg-slate-900 border ${ag.bgColor}`}>
                  <Icon className={`w-5 h-5 ${ag.color}`} />
                </div>
                <div>
                  <h4 className="font-bold text-xs text-slate-100">{ag.name}</h4>
                  <p className="text-[10px] font-mono text-slate-400">{ag.role}</p>
                </div>
              </div>
              <p className="text-[11px] text-slate-400 line-clamp-2">{ag.description}</p>
            </div>
          );
        })}
      </div>

      {/* Active Agent Interactive Workspace */}
      <div className="bg-slate-950 p-6 rounded-xl border border-slate-800 space-y-6">
        <div className="flex items-center justify-between border-b border-slate-800 pb-3">
          <div className="flex items-center gap-2">
            <currentAgent.icon className={`w-5 h-5 ${currentAgent.color}`} />
            <h4 className="font-bold text-sm text-slate-100 font-mono">
              Active Agent: {currentAgent.name}
            </h4>
          </div>
          <span className="text-xs font-mono text-slate-400">{currentAgent.role}</span>
        </div>

        {/* Prompt Input Area */}
        <div className="space-y-3">
          <label className="text-xs font-mono text-slate-400">Engineering Inquiry / Prompt Inputs:</label>
          <textarea
            rows={4}
            value={userPrompt}
            onChange={(e) => setUserPrompt(e.target.value)}
            placeholder="Type your engineering parameters or question here..."
            className="w-full bg-slate-900 border border-slate-700 text-slate-200 text-xs p-3.5 rounded-xl font-mono focus:outline-none focus:border-cyan-500 leading-relaxed"
          />

          <div className="flex justify-between items-center pt-1">
            <button
              onClick={() => setUserPrompt(currentAgent.defaultPrompt)}
              className="text-xs font-mono text-cyan-400 hover:underline"
            >
              Load Example Engineering Prompt
            </button>

            <button
              onClick={runAIAgent}
              disabled={loading || !userPrompt.trim()}
              className="bg-gradient-to-r from-cyan-500 via-blue-600 to-indigo-600 hover:from-cyan-400 hover:to-indigo-500 text-slate-950 font-bold px-6 py-2.5 rounded-xl text-xs font-mono flex items-center gap-2 shadow-lg shadow-cyan-500/20 transition disabled:opacity-50"
            >
              {loading ? <RefreshCw className="w-4 h-4 animate-spin" /> : <Send className="w-4 h-4" />}
              <span>{loading ? "AI Processing Prompt..." : "Execute AI Analysis"}</span>
            </button>
          </div>
        </div>

        {/* AI Response Output Display */}
        {aiResponse && (
          <div className="bg-slate-900 border border-cyan-800/80 rounded-xl p-6 space-y-3 shadow-2xl">
            <div className="flex items-center justify-between border-b border-cyan-900/60 pb-3">
              <div className="flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-cyan-400 animate-pulse" />
                <h5 className="font-bold text-xs text-cyan-300 font-mono">
                  {currentAgent.name} Official Technical Response
                </h5>
              </div>
              <span className="text-[10px] font-mono text-slate-400">
                Northern HeatEx AI Ecosystem
              </span>
            </div>
            <div className="prose prose-invert prose-sm text-xs text-slate-200 font-mono whitespace-pre-wrap leading-relaxed max-h-[500px] overflow-y-auto pr-2">
              {aiResponse}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
