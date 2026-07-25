import React, { useState } from "react";
import { HeatExchangerDesign, CommercialQuotation } from "../../types";
import { DEFAULT_DESIGN_EXAMPLE, INITIAL_QUOTATION } from "../../data/mockData";
import { PDFDataSheetService } from "../../services/pdfDataSheetService";
import { DXFExportService, DXFOptions } from "../../services/dxfExportService";
import {
  FileCode,
  FileText,
  Download,
  CheckCircle2,
  Settings,
  Layers,
  Sparkles,
  ShieldCheck,
  PackageCheck,
  Eye,
  Sliders,
  Printer,
  Compass,
} from "lucide-react";

interface EngineeringExportStudioProps {
  currentDesign?: HeatExchangerDesign;
  currentQuotation?: CommercialQuotation;
}

export const EngineeringExportStudio: React.FC<EngineeringExportStudioProps> = ({
  currentDesign = DEFAULT_DESIGN_EXAMPLE,
  currentQuotation = INITIAL_QUOTATION,
}) => {
  const [design, setDesign] = useState<HeatExchangerDesign>(currentDesign);
  const [quote, setQuote] = useState<CommercialQuotation>(currentQuotation);

  // DXF Config Options
  const [dxfView, setDxfView] = useState<"tubesheet" | "elevation" | "combined">("combined");
  const [includeDimensions, setIncludeDimensions] = useState<boolean>(true);
  const [includeCommercialAttachment, setIncludeCommercialAttachment] = useState<boolean>(true);

  // Download Feedback State
  const [lastExportMessage, setLastExportMessage] = useState<string | null>(null);

  const notifySuccess = (msg: string) => {
    setLastExportMessage(msg);
    setTimeout(() => setLastExportMessage(null), 4500);
  };

  // Export TEMA PDF Data Sheet
  const handleExportPDFDataSheet = () => {
    const filename = `${design.id}_TEMA_${design.temaType}_DataSheet.pdf`;
    PDFDataSheetService.downloadDataSheetPDF(
      design,
      includeCommercialAttachment ? quote : undefined,
      filename
    );
    notifySuccess(`Successfully generated and downloaded TEMA Specification Data Sheet: ${filename}`);
  };

  // Export Commercial Proposal PDF
  const handleExportCommercialPDF = () => {
    const filename = `${quote.quoteNumber}_Commercial_Quotation.pdf`;
    PDFDataSheetService.downloadDataSheetPDF(design, quote, filename);
    notifySuccess(`Successfully generated commercial engineering quotation PDF: ${filename}`);
  };

  // Export DXF CAD File
  const handleExportDXF = () => {
    const options: DXFOptions = {
      viewType: dxfView,
      includeDimensions,
      units: "mm",
    };
    const dxfString = DXFExportService.generateDXF(design, options);
    const filename = `NHEE_${design.temaType}_${design.shellDiameter}mm_${dxfView.toUpperCase()}.dxf`;
    DXFExportService.downloadDXF(dxfString, filename);
    notifySuccess(`Successfully generated AutoCAD/SolidWorks ASCII DXF CAD File: ${filename}`);
  };

  // Export Complete Deliverables Package
  const handleExportCompletePackage = () => {
    handleExportPDFDataSheet();
    setTimeout(() => {
      handleExportDXF();
      notifySuccess(`Full Engineering Deliverable Package (PDF Data Sheet + DXF CAD) exported!`);
    }, 1000);
  };

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-2xl space-y-8">
      {/* Top Header */}
      <div className="flex flex-wrap items-center justify-between gap-4 border-b border-slate-800 pb-5">
        <div>
          <div className="flex items-center gap-2">
            <span className="bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 text-[10px] font-mono px-2.5 py-0.5 rounded-full font-bold uppercase tracking-wider">
              NHEE Service Layer
            </span>
            <span className="bg-amber-500/10 border border-amber-500/30 text-amber-400 text-[10px] font-mono px-2.5 py-0.5 rounded-full font-bold uppercase tracking-wider">
              ASME Sec VIII & TEMA Compliant
            </span>
          </div>
          <h3 className="text-xl font-bold text-slate-100 mt-2 flex items-center gap-2">
            <PackageCheck className="w-6 h-6 text-cyan-400" />
            Engineering Data Sheet & DXF CAD Export Service Studio
          </h3>
          <p className="text-xs text-slate-400 font-mono mt-1">
            Generate formal TEMA Class R Specification Data Sheets (PDF) and precision DXF vector CAD drawings for AutoCAD & SolidWorks
          </p>
        </div>

        <button
          onClick={handleExportCompletePackage}
          className="bg-gradient-to-r from-cyan-500 via-blue-600 to-indigo-600 hover:from-cyan-400 hover:to-indigo-500 text-slate-950 font-extrabold px-6 py-3 rounded-xl text-xs font-mono flex items-center gap-2 shadow-lg shadow-cyan-500/25 transition transform active:scale-95"
        >
          <Download className="w-4 h-4" />
          <span>Export Full Package (PDF + DXF CAD)</span>
        </button>
      </div>

      {/* Success Notification Banner */}
      {lastExportMessage && (
        <div className="bg-emerald-950/80 border border-emerald-800 text-emerald-300 px-4 py-3 rounded-xl text-xs font-mono flex items-center gap-3 animate-fade-in shadow-lg">
          <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />
          <span>{lastExportMessage}</span>
        </div>
      )}

      {/* Main Grid: Data Context Summary & Service Controls */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column: Active Heat Exchanger Context (4 cols) */}
        <div className="lg:col-span-5 bg-slate-950 p-5 rounded-xl border border-slate-800 space-y-5">
          <div className="flex items-center justify-between border-b border-slate-800 pb-3">
            <h4 className="text-xs font-bold font-mono text-slate-200 uppercase tracking-wider flex items-center gap-2">
              <Compass className="w-4 h-4 text-cyan-400" />
              Bound Heat Exchanger Parameters
            </h4>
            <span className="text-[11px] font-mono text-cyan-400 font-bold bg-slate-900 px-2 py-0.5 rounded border border-slate-800">
              {design.temaType} Type
            </span>
          </div>

          <div className="space-y-3 font-mono text-xs text-slate-300">
            <div className="bg-slate-900/80 p-3 rounded-lg border border-slate-800/80">
              <span className="text-slate-500 text-[10px] block uppercase">Equipment Title & Tag</span>
              <span className="font-bold text-slate-100 block truncate">{design.title}</span>
              <span className="text-slate-400 text-[11px] block mt-0.5">Client: {design.clientName}</span>
            </div>

            <div className="grid grid-cols-2 gap-2">
              <div className="bg-slate-900/60 p-2.5 rounded border border-slate-800">
                <span className="text-slate-500 text-[10px] block">Shell ID</span>
                <span className="font-bold text-cyan-300 text-sm">{design.shellDiameter} mm</span>
              </div>

              <div className="bg-slate-900/60 p-2.5 rounded border border-slate-800">
                <span className="text-slate-500 text-[10px] block">Tube OD x Wall</span>
                <span className="font-bold text-cyan-300 text-sm">{design.tubeOD} x {design.tubeWallThickness}mm</span>
              </div>

              <div className="bg-slate-900/60 p-2.5 rounded border border-slate-800">
                <span className="text-slate-500 text-[10px] block">Calculated Area</span>
                <span className="font-bold text-emerald-400 text-sm">{design.calculatedArea} m²</span>
              </div>

              <div className="bg-slate-900/60 p-2.5 rounded border border-slate-800">
                <span className="text-slate-500 text-[10px] block">Heat Duty</span>
                <span className="font-bold text-emerald-400 text-sm">{design.calculatedHeatDuty} kW</span>
              </div>
            </div>

            <div className="bg-slate-900/60 p-3 rounded border border-slate-800 space-y-1.5">
              <div className="flex justify-between text-[11px]">
                <span className="text-slate-400">Tube Length:</span>
                <span className="text-slate-200 font-bold">{design.tubeLength} mm</span>
              </div>
              <div className="flex justify-between text-[11px]">
                <span className="text-slate-400">Pitch Pattern:</span>
                <span className="text-slate-200 font-bold">{design.pitchPattern} ({design.pitchDistance}mm)</span>
              </div>
              <div className="flex justify-between text-[11px]">
                <span className="text-slate-400">Shell / Tube Material:</span>
                <span className="text-slate-200 font-bold truncate max-w-[180px]">{design.tubeMaterial}</span>
              </div>
              <div className="flex justify-between text-[11px]">
                <span className="text-slate-400">Design Press (S/T):</span>
                <span className="text-slate-200 font-bold">{design.designPressureShell} / {design.designPressureTube} bar</span>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Export Service Cards (7 cols) */}
        <div className="lg:col-span-7 space-y-6">
          {/* Card 1: TEMA PDF Data Sheet Service */}
          <div className="bg-slate-950 p-5 rounded-xl border border-slate-800 space-y-4 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-cyan-500/5 rounded-full blur-2xl pointer-events-none" />

            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <div className="flex items-center gap-2">
                <FileText className="w-5 h-5 text-cyan-400" />
                <div>
                  <h4 className="text-sm font-bold text-slate-100 font-mono">
                    1. Professional TEMA PDF Data Sheet Service
                  </h4>
                  <p className="text-[11px] text-slate-400 font-mono">
                    Formal 2-Page engineering specification datasheet with process side-by-side tables
                  </p>
                </div>
              </div>

              <span className="text-[10px] font-mono text-cyan-400 border border-cyan-500/30 bg-cyan-500/10 px-2 py-0.5 rounded">
                PDF / Vector
              </span>
            </div>

            <div className="space-y-3 font-mono text-xs">
              <label className="flex items-center gap-2 text-slate-300 cursor-pointer select-none">
                <input
                  type="checkbox"
                  checked={includeCommercialAttachment}
                  onChange={(e) => setIncludeCommercialAttachment(e.target.checked)}
                  className="rounded border-slate-700 bg-slate-900 text-cyan-500 focus:ring-cyan-500/30 w-4 h-4"
                />
                <span>Include Commercial Pricing & Fabrication Lead Time Attachment (Page 2)</span>
              </label>

              <div className="flex flex-wrap items-center gap-3 pt-2">
                <button
                  onClick={handleExportPDFDataSheet}
                  className="bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold px-4 py-2 rounded-lg text-xs font-mono flex items-center gap-2 shadow-md shadow-cyan-500/20 transition"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>Download TEMA Data Sheet PDF</span>
                </button>

                <button
                  onClick={handleExportCommercialPDF}
                  className="bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 font-bold px-4 py-2 rounded-lg text-xs font-mono flex items-center gap-2 transition"
                >
                  <Printer className="w-3.5 h-3.5 text-cyan-400" />
                  <span>Download Commercial Proposal Only</span>
                </button>
              </div>
            </div>
          </div>

          {/* Card 2: DXF CAD Vector Generator Service */}
          <div className="bg-slate-950 p-5 rounded-xl border border-slate-800 space-y-4 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-amber-500/5 rounded-full blur-2xl pointer-events-none" />

            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <div className="flex items-center gap-2">
                <FileCode className="w-5 h-5 text-amber-400" />
                <div>
                  <h4 className="text-sm font-bold text-slate-100 font-mono">
                    2. Precision DXF Vector CAD File Exporter
                  </h4>
                  <p className="text-[11px] text-slate-400 font-mono">
                    ASCII DXF drawing format compatible with AutoCAD, SolidWorks, Inventor, and CNC machinery
                  </p>
                </div>
              </div>

              <span className="text-[10px] font-mono text-amber-400 border border-amber-500/30 bg-amber-500/10 px-2 py-0.5 rounded">
                ASCII DXF / CAD
              </span>
            </div>

            <div className="space-y-4 font-mono text-xs">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="text-slate-400 text-[11px] block mb-1">CAD Drawing View Selection:</label>
                  <select
                    value={dxfView}
                    onChange={(e) => setDxfView(e.target.value as any)}
                    className="w-full bg-slate-900 border border-slate-800 rounded-lg p-2 text-slate-200 font-mono text-xs focus:border-amber-500 focus:outline-none"
                  >
                    <option value="combined">Combined (Tubesheet + Elevation View)</option>
                    <option value="tubesheet">Tubesheet Pattern Only (Cross-Section)</option>
                    <option value="elevation">Longitudinal Shell Elevation Only</option>
                  </select>
                </div>

                <div className="flex items-end pb-1">
                  <label className="flex items-center gap-2 text-slate-300 cursor-pointer select-none">
                    <input
                      type="checkbox"
                      checked={includeDimensions}
                      onChange={(e) => setIncludeDimensions(e.target.checked)}
                      className="rounded border-slate-700 bg-slate-900 text-amber-500 focus:ring-amber-500/30 w-4 h-4"
                    />
                    <span>Include CAD Dimension Overlays</span>
                  </label>
                </div>
              </div>

              <div className="flex items-center gap-3 pt-1">
                <button
                  onClick={handleExportDXF}
                  className="bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold px-4 py-2 rounded-lg text-xs font-mono flex items-center gap-2 shadow-md shadow-amber-500/20 transition"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>Download ASCII DXF CAD File</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
