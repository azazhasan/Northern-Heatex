import React from "react";
import { useRouter } from "../context/RouterContext";
import { ThermalDesignCalculator } from "../components/engineering/ThermalDesignCalculator";
import { MechanicalASMEStudio } from "../components/engineering/MechanicalASMEStudio";
import { MaterialSelectionMatrix } from "../components/engineering/MaterialSelectionMatrix";
import { CostAndQuotationBuilder } from "../components/engineering/CostAndQuotationBuilder";
import { EngineeringReportsModule } from "../components/engineering/EngineeringReportsModule";
import { DrawingGeneratorModule } from "../components/engineering/DrawingGeneratorModule";
import { BOMGeneratorModule } from "../components/engineering/BOMGeneratorModule";
import { FabricationIndustryEstimator } from "../components/engineering/FabricationIndustryEstimator";
import { MaterialWeightCalculator } from "../components/engineering/MaterialWeightCalculator";
import { OfficialLetterheadStudio } from "../components/admin/OfficialLetterheadStudio";
import { GSTBusinessToolsHub } from "../components/business/GSTBusinessToolsHub";
import { HeatExchanger3DCanvas } from "../components/3d/HeatExchanger3DCanvas";
import { AIFailureAnalysisModule } from "../components/engineering/AIFailureAnalysisModule";
import { ProjectManagerModule } from "../components/engineering/ProjectManagerModule";
import { TubeLayoutCanvas } from "../components/engineering/TubeLayoutCanvas";
import { RetubingPerformanceCalculator } from "../components/engineering/RetubingPerformanceCalculator";
import { BafflePlateDesigner } from "../components/engineering/BafflePlateDesigner";
import { 
  Calculator, Cpu, FileSpreadsheet, Layers, Sparkles, Download, Code, ShieldCheck, CheckCircle2, Send, FileCode, Wrench, Activity, Ruler, FileText, Scale
} from "lucide-react";

export const SoftwarePage: React.FC = () => {
  const { currentPath, navigate } = useRouter();

  const softwareTools = [
    { slug: "thermal-design", label: "Thermal Design (LMTD/NTU)", icon: Calculator },
    { slug: "baffle-designer", label: "Baffle Plate Designer (CAD)", icon: Ruler },
    { slug: "retubing-performance", label: "Retubing & Failure Predictor", icon: Activity },
    { slug: "mechanical-design", label: "ASME Mechanical Studio", icon: Cpu },
    { slug: "material-selection", label: "Material Alloy Matrix", icon: Layers },
    { slug: "fab-estimator", label: "Pro Fabrication Industry Estimator", icon: FileSpreadsheet },
    { slug: "metal-weight", label: "Metal Weight Calculator", icon: Scale },
    { slug: "official-letterhead", label: "Official Letterhead Studio [Admin]", icon: FileText },
    { slug: "cost-estimator", label: "Cost & Quotation Builder", icon: FileSpreadsheet },
    { slug: "drawing-generator", label: "2D CAD & DXF Generator", icon: FileCode },
    { slug: "bom-generator", label: "Bill of Materials (BOM)", icon: Layers },
    { slug: "report-generator", label: "Datasheet PDF Reports", icon: Sparkles },
    { slug: "gst-calculator", label: "Indian GST Calculator (18%)", icon: Calculator },
    { slug: "hsn-finder", label: "HSN 8419 Search Engine", icon: Code },
    { slug: "digital-twin", label: "3D Digital Twin Inspector", icon: Cpu },
    { slug: "predictive-maintenance", label: "AI Tube Failure Diagnostics", icon: Sparkles },
    { slug: "project-manager", label: "Plant Project Manager", icon: Wrench },
    { slug: "api", label: "REST API & Integration", icon: Code },
    { slug: "downloads", label: "Downloads & CAD Specs", icon: Download },
  ];

  const subSlug = currentPath.replace("/software", "").replace(/^\//, "");

  return (
    <div className="space-y-8">
      {/* Software Hero Banner */}
      <div className="bg-slate-900 rounded-3xl p-6 sm:p-10 text-white relative overflow-hidden border border-slate-800 shadow-xl">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-950/80 via-slate-900 to-cyan-950/80 z-10" />

        <div className="relative z-20 space-y-4 max-w-4xl">
          <span className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-amber-500/20 text-amber-300 border border-amber-500/30 text-xs font-mono font-bold uppercase tracking-wider">
            <Calculator className="w-3.5 h-3.5 text-amber-400" />
            ENTERPRISE THERMAL & MECHANICAL SOFTWARE SUITE
          </span>

          <h1 className="text-3xl sm:text-4xl font-black tracking-tight text-white">
            Digital Engineering & GST Business Tools
          </h1>

          <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
            Real-time thermal duty solvers, ASME Section VIII Div 1 thickness verifiers, official Indian GST rate calculators (HSN 8419), and WebGL 3D digital twins.
          </p>

          {/* Software Tool Navigation Pills */}
          <div className="flex flex-wrap gap-2 pt-4 border-t border-white/10 font-mono text-xs">
            {softwareTools.map((tool) => {
              const Icon = tool.icon;
              const isActive = subSlug === tool.slug || (!subSlug && tool.slug === "thermal-design");

              return (
                <button
                  key={tool.slug}
                  onClick={() => navigate(`/software/${tool.slug}`)}
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl transition cursor-pointer ${
                    isActive
                      ? "bg-[#0056A6] text-white font-bold border border-blue-400/50 shadow-md"
                      : "bg-white/10 hover:bg-white/20 text-slate-300 border border-white/10"
                  }`}
                >
                  <Icon className="w-3.5 h-3.5" />
                  <span>{tool.label}</span>
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Render Active Tool based on URL path */}
      {subSlug === "thermal-design" || !subSlug ? (
        <ThermalDesignCalculator />
      ) : subSlug === "baffle-designer" ? (
        <BafflePlateDesigner />
      ) : subSlug === "retubing-performance" ? (
        <RetubingPerformanceCalculator />
      ) : subSlug === "mechanical-design" ? (
        <MechanicalASMEStudio />
      ) : subSlug === "material-selection" ? (
        <MaterialSelectionMatrix />
      ) : subSlug === "cost-estimator" ? (
        <CostAndQuotationBuilder />
      ) : subSlug === "report-generator" ? (
        <EngineeringReportsModule />
      ) : subSlug === "drawing-generator" ? (
        <DrawingGeneratorModule />
      ) : subSlug === "bom-generator" ? (
        <BOMGeneratorModule />
      ) : subSlug === "fab-estimator" ? (
        <FabricationIndustryEstimator />
      ) : subSlug === "metal-weight" ? (
        <MaterialWeightCalculator />
      ) : subSlug === "official-letterhead" || subSlug === "letterhead" ? (
        <OfficialLetterheadStudio />
      ) : subSlug === "gst-calculator" || subSlug === "hsn-finder" || subSlug === "unit-converter" || subSlug === "scientific-calculator" || subSlug === "calculators" ? (
        <GSTBusinessToolsHub />
      ) : subSlug === "engineering-tools" ? (
        <TubeLayoutCanvas
          shellDiameterMm={800}
          tubeODMm={19.05}
          pitchDistanceMm={23.81}
          pitchPattern="30-triangular"
          passCount={2}
          baffleCutPercent={20}
          tubeLengthMeters={6.0}
        />
      ) : subSlug === "digital-twin" ? (
        <div className="space-y-6">
          <div className="border-b border-slate-200 pb-3">
            <span className="text-xs font-mono text-[#0056A6] font-bold uppercase tracking-wider">
              3D WebGL Digital Twin Inspector
            </span>
            <h2 className="text-2xl font-extrabold text-slate-900">
              Interactive Heat Exchanger Digital Twin Model
            </h2>
            <p className="text-xs text-slate-600">
              Disassemble tube bundle, toggle shell cutaways, and inspect thermal heatmap gradients in real time.
            </p>
          </div>
          <div className="h-[550px] bg-slate-950 rounded-2xl overflow-hidden border border-slate-800 shadow-xl">
            <HeatExchanger3DCanvas
              temaType="BEM"
              shellDiameter={800}
              tubeCount={190}
              tubeLength={6000}
            />
          </div>
        </div>
      ) : subSlug === "predictive-maintenance" ? (
        <AIFailureAnalysisModule />
      ) : subSlug === "project-manager" ? (
        <ProjectManagerModule />
      ) : subSlug === "api" ? (
        <div className="bg-white border border-slate-200 rounded-2xl p-8 space-y-6 shadow-sm font-mono text-xs">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-blue-100 text-[#0056A6] flex items-center justify-center font-bold">
              <Code className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-slate-900 font-sans">Northern HeatEx REST API Documentation</h3>
              <p className="text-slate-500">Integrate thermal engineering calculations & RFQ submission into SAP / ERP</p>
            </div>
          </div>

          <div className="space-y-4">
            <div className="bg-slate-900 text-slate-100 p-4 rounded-xl space-y-2">
              <div className="text-cyan-400 font-bold">POST /api/gemini/thermal-engineer</div>
              <div className="text-slate-400 text-[11px]">Request AI-assisted LMTD and overall U thermal duty analysis</div>
              <pre className="text-amber-300 text-[11px] overflow-x-auto bg-slate-950 p-2.5 rounded border border-slate-800">
{`{
  "prompt": "Calculate duty for steam condenser cooling water 25C to 35C at 150 m3/h",
  "parameters": { "hotTempIn": 100, "hotTempOut": 100, "coldTempIn": 25, "coldTempOut": 35 }
}`}
              </pre>
            </div>

            <div className="bg-slate-900 text-slate-100 p-4 rounded-xl space-y-2">
              <div className="text-cyan-400 font-bold">POST /api/inquiry</div>
              <div className="text-slate-400 text-[11px]">Log new engineering RFQ in Haridwar Works CRM</div>
              <pre className="text-amber-300 text-[11px] overflow-x-auto bg-slate-950 p-2.5 rounded border border-slate-800">
{`{
  "company": "BHEL Haridwar",
  "email": "engineer@bhel.in",
  "projectDescription": "TEMA AES split ring floating head exchanger for hydro power station"
}`}
              </pre>
            </div>
          </div>
        </div>
      ) : (
        <div className="bg-white border border-slate-200 rounded-2xl p-8 text-center space-y-4">
          <Download className="w-12 h-12 text-[#0056A6] mx-auto" />
          <h3 className="text-xl font-bold text-slate-900">Engineering Downloads & Software Resources</h3>
          <p className="text-xs text-slate-600 max-w-md mx-auto">
            Download offline CAD templates, ASME calculation spreadsheets, and software installers.
          </p>
          <button
            onClick={() => navigate("/resources")}
            className="bg-[#0056A6] hover:bg-blue-700 text-white font-bold px-6 py-2.5 rounded-xl text-xs uppercase tracking-wider cursor-pointer"
          >
            Visit Knowledge Library →
          </button>
        </div>
      )}
    </div>
  );
};
