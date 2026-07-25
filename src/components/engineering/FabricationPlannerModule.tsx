import React, { useState } from "react";
import {
  Wrench,
  Layers,
  FileCheck,
  CheckCircle2,
  Printer,
  Download,
  Flame,
  ShieldCheck,
  Boxes,
  Compass,
  Zap,
  Activity,
  Award,
} from "lucide-react";

export const FabricationPlannerModule: React.FC = () => {
  const [activeTab, setActiveTab] = useState<
    "cutting" | "machining" | "welding" | "expansion" | "assembly" | "hydro"
  >("cutting");

  const cuttingList = [
    { item: "Shell Barrel Plate", material: "SA-516 Gr 70", thickness: "16 mm", cutSize: "2827 mm x 3000 mm", qty: 1, process: "Plasma Cutting" },
    { item: "Stationary Tubesheet", material: "SA-266 Gr 2 / Clad Cu-Ni", thickness: "75 mm", cutSize: "Ø 920 mm Disc", qty: 1, process: "Waterjet / CNC Turning" },
    { item: "Floating Tubesheet", material: "SA-266 Gr 2 / Clad Cu-Ni", thickness: "65 mm", cutSize: "Ø 880 mm Disc", qty: 1, process: "Waterjet / CNC Turning" },
    { item: "Seamless Tubes 3/4\"", material: "Cu-Ni 90/10 (SB-111 C70600)", thickness: "18 BWG (1.24 mm)", cutSize: "L = 4500 mm", qty: 420, process: "Precision Saw Cutting" },
    { item: "Baffle Plates (20% Cut)", material: "Carbon Steel SA-283", thickness: "9.5 mm", cutSize: "Ø 840 mm Segment", qty: 8, process: "Laser Cutting" },
    { item: "Channel Shell & Nozzles", material: "SA-106 Gr B Pipe", thickness: "SCH 40 / 80", cutSize: "Assorted Lengths", qty: 4, process: "Cold Band Saw" },
  ];

  const machiningSequence = [
    { step: 1, title: "Tubesheet Face Milling & Turning", machine: "Vertical Turret Lathe (VTL)", tolerance: "±0.05 mm", note: "Achieve RA 1.6 µm gasket seating surface finish" },
    { step: 2, title: "CNC Tube Hole Drilling & Reaming", machine: "4-Axis CNC Drilling Center", tolerance: "H8 Tolerance Class", note: "Deep hole drilling of 420 holes Ø 19.33 mm with 2 annular grooves" },
    { step: 3, title: "Shell Edge Preparation (V-Bevel)", machine: "Plate Edge Milling Machine", tolerance: "30° Bevel Angle", note: "Prepare longitudinal seam for SAW weld prep per ASME IX" },
    { step: 4, title: "Baffle Plate Stack Drilling", machine: "CNC Drilling Center", tolerance: "Ø 19.80 mm", note: "Ganged drilling of 8 baffles simultaneously for hole alignment" },
  ];

  const weldingSequence = [
    { joint: "Longitudinal Shell Seam", wpsNo: "WPS-NHEE-SAW-01", process: "Submerged Arc Welding (SAW)", filler: "EM12K / F7A2", ndt: "100% Radiography (RT) per UW-51" },
    { joint: "Nozzle N1/N2 to Shell", wpsNo: "WPS-NHEE-GTAW-04", process: "GTAW + SMAW", filler: "ER70S-6 / E7018", ndt: "100% Dye Penetrant (PT) + Magnetic Particle (MT)" },
    { joint: "Tube-to-Tubesheet Joint", wpsNo: "WPS-NHEE-TIG-09", process: "Automatic Orbital GTAW", filler: "ERCuNi (Cu-Ni 90/10)", ndt: "100% PT + Helium Leak Detection" },
    { joint: "Channel Flange to Shell", wpsNo: "WPS-NHEE-SAW-02", process: "Submerged Arc Welding (SAW)", filler: "EM12K", ndt: "Ultrasonic Testing (UT) per ASME Sec V" },
  ];

  const tubeExpansionPlan = {
    method: "Torque-Controlled 3-Roll Hydraulic Expansion",
    tubeOD: "19.05 mm (3/4\")",
    wallThickness: "1.24 mm (18 BWG)",
    holeDiameter: "19.33 mm",
    targetExpansion: "4.5% to 6.0% Wall Reduction",
    torqueSetting: "38.5 Nm (Hydraulic Power Pack Unit)",
    grooveEngagement: "2 Annular Grooves (3mm x 0.5mm deep)",
    inspection: "100% Micrometer Bore Measurement + Pull-Out Load Test per ASME VIII App A",
  };

  const hydroTestPlan = {
    testPressureShell: "31.2 Bar (1.3 × MAWP 24.0 Bar)",
    testPressureTube: "19.5 Bar (1.3 × MAWP 15.0 Bar)",
    medium: "Demineralized Water (Chloride < 15 ppm)",
    testTemp: "28°C (Minimum 17°C above NDTT)",
    holdTime: "2.0 Hours minimum per pressure stage",
    calibration: "Calibrated Dual Pressure Gauges (Class 0.5%) + Digital Chart Recorder",
    approval: "Authorised Inspector (AI) Signoff Required",
  };

  return (
    <div className="space-y-8 animate-fadeIn">
      {/* Header Banner */}
      <div className="relative bg-gradient-to-br from-[#080b12] via-[#05070d] to-[#0c101d] border border-cyan-500/30 rounded-3xl p-8 shadow-2xl overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-3 max-w-3xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-950 text-cyan-400 border border-cyan-500/40 text-xs font-mono font-bold uppercase">
              <Wrench className="w-3.5 h-3.5 text-cyan-400" /> Automated Fabrication Planner (Module 5)
            </div>

            <h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
              Manufacturing & Workshop Execution Plan
            </h1>

            <p className="text-sm text-cyan-200/80 font-normal leading-relaxed">
              Auto-generates complete bill of materials cutting schedules, CNC deep-hole drilling parameters, ASME Sec IX welding procedures (WPS), torque-controlled tube expansion specs, and hydrotest protocols.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => window.print()}
              className="px-4 py-2.5 bg-white/5 hover:bg-white/10 text-white border border-white/15 rounded-xl font-mono text-xs font-bold uppercase flex items-center gap-2 transition"
            >
              <Printer className="w-4 h-4 text-cyan-400" /> Print Traveler
            </button>
          </div>
        </div>
      </div>

      {/* Navigation Sub-Tabs */}
      <div className="flex flex-wrap items-center gap-2 bg-[#080a0f] p-2 rounded-2xl border border-white/10 font-mono text-xs">
        <button
          onClick={() => setActiveTab("cutting")}
          className={`px-4 py-2.5 rounded-xl font-bold transition flex items-center gap-2 ${
            activeTab === "cutting" ? "bg-cyan-500 text-slate-950 shadow-lg" : "text-white/60 hover:text-white"
          }`}
        >
          <Boxes className="w-4 h-4" /> Cutting & Nesting
        </button>
        <button
          onClick={() => setActiveTab("machining")}
          className={`px-4 py-2.5 rounded-xl font-bold transition flex items-center gap-2 ${
            activeTab === "machining" ? "bg-cyan-500 text-slate-950 shadow-lg" : "text-white/60 hover:text-white"
          }`}
        >
          <Compass className="w-4 h-4" /> CNC Machining
        </button>
        <button
          onClick={() => setActiveTab("welding")}
          className={`px-4 py-2.5 rounded-xl font-bold transition flex items-center gap-2 ${
            activeTab === "welding" ? "bg-cyan-500 text-slate-950 shadow-lg" : "text-white/60 hover:text-white"
          }`}
        >
          <Flame className="w-4 h-4" /> Welding WPS / PQR
        </button>
        <button
          onClick={() => setActiveTab("expansion")}
          className={`px-4 py-2.5 rounded-xl font-bold transition flex items-center gap-2 ${
            activeTab === "expansion" ? "bg-cyan-500 text-slate-950 shadow-lg" : "text-white/60 hover:text-white"
          }`}
        >
          <Zap className="w-4 h-4" /> Tube Expansion
        </button>
        <button
          onClick={() => setActiveTab("hydro")}
          className={`px-4 py-2.5 rounded-xl font-bold transition flex items-center gap-2 ${
            activeTab === "hydro" ? "bg-cyan-500 text-slate-950 shadow-lg" : "text-white/60 hover:text-white"
          }`}
        >
          <ShieldCheck className="w-4 h-4" /> Hydro Test & NDE
        </button>
      </div>

      {/* Tab Content Display */}
      <div className="bg-[#080a0f] border border-white/10 rounded-3xl p-6 sm:p-8 space-y-6 shadow-2xl">
        {activeTab === "cutting" && (
          <div className="space-y-4">
            <h3 className="text-lg font-bold text-white flex items-center gap-2">
              <Boxes className="w-5 h-5 text-cyan-400" /> Material Nesting & Plate Cutting Schedule
            </h3>

            <div className="overflow-x-auto border border-white/10 rounded-2xl">
              <table className="w-full text-left font-mono text-xs text-white/80">
                <thead className="bg-black/60 text-cyan-400 border-b border-white/10 uppercase text-[10px]">
                  <tr>
                    <th className="p-3">Component Item</th>
                    <th className="p-3">ASME Material Grade</th>
                    <th className="p-3">Thickness</th>
                    <th className="p-3">Cutting Size</th>
                    <th className="p-3 text-center">Qty</th>
                    <th className="p-3">Cutting Process</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/5">
                  {cuttingList.map((c, idx) => (
                    <tr key={idx} className="hover:bg-white/5 transition">
                      <td className="p-3 font-bold text-white">{c.item}</td>
                      <td className="p-3 text-cyan-300">{c.material}</td>
                      <td className="p-3">{c.thickness}</td>
                      <td className="p-3 text-amber-300">{c.cutSize}</td>
                      <td className="p-3 text-center font-bold text-white">{c.qty}</td>
                      <td className="p-3 text-emerald-400">{c.process}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {activeTab === "machining" && (
          <div className="space-y-4">
            <h3 className="text-lg font-bold text-white flex items-center gap-2">
              <Compass className="w-5 h-5 text-cyan-400" /> CNC Machining & Deep-Hole Drilling Sequence
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {machiningSequence.map((m) => (
                <div key={m.step} className="p-4 bg-black/40 border border-white/10 rounded-2xl space-y-2 font-mono text-xs">
                  <div className="flex items-center justify-between text-cyan-400 font-bold">
                    <span>STEP {m.step}: {m.title}</span>
                    <span className="text-[10px] bg-cyan-950 px-2 py-0.5 rounded border border-cyan-500/30">{m.tolerance}</span>
                  </div>
                  <p className="text-white/70">Machine: <strong className="text-white">{m.machine}</strong></p>
                  <p className="text-amber-200/80 text-[11px] bg-amber-950/30 p-2 rounded border border-amber-800/40">{m.note}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === "welding" && (
          <div className="space-y-4">
            <h3 className="text-lg font-bold text-white flex items-center gap-2">
              <Flame className="w-5 h-5 text-amber-400" /> ASME IX Welding Procedure Specifications (WPS / PQR)
            </h3>

            <div className="overflow-x-auto border border-white/10 rounded-2xl">
              <table className="w-full text-left font-mono text-xs text-white/80">
                <thead className="bg-black/60 text-amber-400 border-b border-white/10 uppercase text-[10px]">
                  <tr>
                    <th className="p-3">Joint Description</th>
                    <th className="p-3">Qualified WPS No</th>
                    <th className="p-3">Weld Process</th>
                    <th className="p-3">Filler Metal Class</th>
                    <th className="p-3">Mandatory NDT Protocol</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/5">
                  {weldingSequence.map((w, idx) => (
                    <tr key={idx} className="hover:bg-white/5 transition">
                      <td className="p-3 font-bold text-white">{w.joint}</td>
                      <td className="p-3 text-cyan-300">{w.wpsNo}</td>
                      <td className="p-3 text-amber-300">{w.process}</td>
                      <td className="p-3">{w.filler}</td>
                      <td className="p-3 text-emerald-400 font-bold">{w.ndt}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {activeTab === "expansion" && (
          <div className="space-y-6 font-mono text-xs">
            <h3 className="text-lg font-bold text-white flex items-center gap-2">
              <Zap className="w-5 h-5 text-cyan-400" /> Torque-Controlled Tube Expansion & Seal Welding Plan
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="p-4 bg-black/40 border border-white/10 rounded-2xl space-y-2">
                <div className="text-cyan-400 font-bold uppercase">Expansion Technology</div>
                <p className="text-white">{tubeExpansionPlan.method}</p>

                <div className="pt-2 border-t border-white/10 space-y-1 text-white/70">
                  <div>Tube OD & Wall: <strong className="text-amber-300">{tubeExpansionPlan.tubeOD} x {tubeExpansionPlan.wallThickness}</strong></div>
                  <div>Tubesheet Hole: <strong className="text-white">{tubeExpansionPlan.holeDiameter}</strong></div>
                  <div>Target Wall Reduction: <strong className="text-emerald-400">{tubeExpansionPlan.targetExpansion}</strong></div>
                </div>
              </div>

              <div className="p-4 bg-black/40 border border-white/10 rounded-2xl space-y-2">
                <div className="text-amber-400 font-bold uppercase">Hydraulic Power Pack Setup</div>
                <p className="text-white">Torque Setting: <strong className="text-cyan-300">{tubeExpansionPlan.torqueSetting}</strong></p>

                <div className="pt-2 border-t border-white/10 space-y-1 text-white/70">
                  <div>Groove Engagement: <strong className="text-white">{tubeExpansionPlan.grooveEngagement}</strong></div>
                  <div>Quality Control: <strong className="text-emerald-400">{tubeExpansionPlan.inspection}</strong></div>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === "hydro" && (
          <div className="space-y-6 font-mono text-xs">
            <h3 className="text-lg font-bold text-white flex items-center gap-2">
              <ShieldCheck className="w-5 h-5 text-emerald-400" /> ASME Hydrostatic Pressure Testing & QA Inspection
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="p-4 bg-black/40 border border-emerald-500/30 rounded-2xl space-y-2">
                <div className="text-emerald-400 font-bold uppercase">Shell Side Hydro Test</div>
                <div className="text-2xl font-black text-white">{hydroTestPlan.testPressureShell}</div>
                <p className="text-white/60">Hold Time: {hydroTestPlan.holdTime}</p>
              </div>

              <div className="p-4 bg-black/40 border border-cyan-500/30 rounded-2xl space-y-2">
                <div className="text-cyan-400 font-bold uppercase">Tube Side Hydro Test</div>
                <div className="text-2xl font-black text-white">{hydroTestPlan.testPressureTube}</div>
                <p className="text-white/60">Hold Time: {hydroTestPlan.holdTime}</p>
              </div>
            </div>

            <div className="p-4 bg-black/60 border border-white/10 rounded-2xl space-y-2">
              <strong className="text-white block uppercase">Quality Assurance Protocols:</strong>
              <ul className="list-disc list-inside text-white/70 space-y-1">
                <li>Testing Medium: {hydroTestPlan.medium}</li>
                <li>Minimum Fluid Temperature: {hydroTestPlan.testTemp}</li>
                <li>Instrumentation: {hydroTestPlan.calibration}</li>
                <li className="text-emerald-400 font-bold">Signoff: {hydroTestPlan.approval}</li>
              </ul>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
