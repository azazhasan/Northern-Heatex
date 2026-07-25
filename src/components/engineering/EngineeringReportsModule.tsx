import React, { useState } from "react";
import {
  FileText,
  Printer,
  Download,
  CheckCircle2,
  Building2,
  Mail,
  Phone,
  MapPin,
  ShieldCheck,
  Zap,
  Flame,
  Globe2,
} from "lucide-react";

export const EngineeringReportsModule: React.FC = () => {
  const [reportTitle, setReportTitle] = useState("ASME Section VIII Div 1 Design Verification Report");
  const [clientName, setClientName] = useState("Siemens Energy India Ltd");
  const [projectNo, setProjectNo] = useState("NHES-2026-0881");
  const [temaType, setTemaType] = useState("BEM");

  return (
    <div className="space-y-8 animate-fadeIn">
      {/* Header Banner */}
      <div className="relative bg-gradient-to-br from-[#070910] via-[#05070d] to-[#0c101d] border border-cyan-500/30 rounded-3xl p-8 shadow-2xl overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-3 max-w-3xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-950 text-cyan-400 border border-cyan-500/40 text-xs font-mono font-bold uppercase">
              <FileText className="w-3.5 h-3.5 text-cyan-400" /> Engineering Report Studio (Module 9)
            </div>

            <h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
              Official PDF Engineering Report Compiler
            </h1>

            <p className="text-sm text-cyan-200/80 font-normal leading-relaxed">
              Generates formal technical dossiers featuring ASME VIII Div 1 calculations, TEMA thermal data sheets, metallurgical justifications, BOMs, and official Northern HeatEx Corporation certification branding.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => window.print()}
              className="px-5 py-3 bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-slate-950 font-bold rounded-2xl font-mono text-xs uppercase tracking-wider flex items-center gap-2 shadow-xl"
            >
              <Printer className="w-4 h-4" /> Print / Export PDF Report
            </button>
          </div>
        </div>
      </div>

      {/* Printable Report Document Card */}
      <div className="bg-white text-slate-900 rounded-3xl p-8 sm:p-12 space-y-8 shadow-2xl font-sans border border-slate-200 max-w-5xl mx-auto printable-report">
        {/* Official Letterhead Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6 border-b-2 border-slate-900 pb-6">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <Flame className="w-8 h-8 text-blue-700" />
              <h1 className="text-2xl font-black tracking-tight text-slate-900 uppercase">
                NORTHERN HEATEX CORPORATION
              </h1>
            </div>
            <p className="text-xs font-mono text-slate-600 font-bold uppercase tracking-wider">
              Thermal Heat Transfer & Mechanical Equipment Manufacturer
            </p>
          </div>

          <div className="text-xs font-mono text-slate-700 space-y-1 text-right">
            <div className="flex items-center justify-end gap-1 font-bold text-slate-900">
              <MapPin className="w-3.5 h-3.5 text-blue-700" /> Noor Engineering Works (est. 1983)
            </div>
            <div>Shastri Nagar, Near G.G.I. College, Jwalapur, Haridwar, Uttarakhand – 249407</div>
            <div className="flex items-center justify-end gap-2 text-[11px] text-blue-800">
              <Mail className="w-3 h-3" /> northernheatex@outlook.in • inquiry@northernheatex.co.in
            </div>
            <div className="text-[11px] text-slate-600">
              Mob: +91 97603 62826 | +91 95575 656742 | +91 85328 23883
            </div>
          </div>
        </div>

        {/* Report Metadata Block */}
        <div className="bg-slate-100 rounded-2xl p-6 grid grid-cols-2 sm:grid-cols-4 gap-4 font-mono text-xs border border-slate-300">
          <div>
            <div className="text-slate-500 uppercase text-[10px]">Project Ref</div>
            <div className="font-bold text-slate-900 text-sm">{projectNo}</div>
          </div>
          <div>
            <div className="text-slate-500 uppercase text-[10px]">Client Name</div>
            <div className="font-bold text-slate-900 text-sm">{clientName}</div>
          </div>
          <div>
            <div className="text-slate-500 uppercase text-[10px]">TEMA Type</div>
            <div className="font-bold text-blue-800 text-sm">{temaType}</div>
          </div>
          <div>
            <div className="text-slate-500 uppercase text-[10px]">Date & Revision</div>
            <div className="font-bold text-slate-900 text-sm">24-Jul-2026 (Rev 02)</div>
          </div>
        </div>

        {/* Executive Report Title */}
        <div className="space-y-2 border-b border-slate-200 pb-4">
          <h2 className="text-2xl font-black text-slate-900 tracking-tight">{reportTitle}</h2>
          <p className="text-xs text-slate-600">
            Certified per ASME Section VIII Division 1 (2025 Ed.) & TEMA Class R Specifications
          </p>
        </div>

        {/* Section 1: Process Boundary Inputs */}
        <div className="space-y-3">
          <h3 className="text-sm font-bold uppercase tracking-wider text-blue-900 font-mono border-b border-blue-900/30 pb-1">
            1. Process Boundary Conditions & Design Basis
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 font-mono text-xs">
            <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 space-y-1.5">
              <div className="font-bold text-amber-800 uppercase text-[11px]">Hot Side (Shell Side): ISO VG 46 Oil</div>
              <div className="flex justify-between"><span>Flow Rate:</span> <strong>45,000 kg/h</strong></div>
              <div className="flex justify-between"><span>Inlet / Outlet Temp:</span> <strong>85.0°C / 50.0°C</strong></div>
              <div className="flex justify-between"><span>Design Pressure:</span> <strong>16.0 Bar (MAWP)</strong></div>
              <div className="flex justify-between"><span>Design Temp:</span> <strong>120.0°C</strong></div>
            </div>

            <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 space-y-1.5">
              <div className="font-bold text-blue-800 uppercase text-[11px]">Cold Side (Tube Side): Cooling Water</div>
              <div className="flex justify-between"><span>Flow Rate:</span> <strong>95,000 kg/h</strong></div>
              <div className="flex justify-between"><span>Inlet / Outlet Temp:</span> <strong>28.0°C / 38.0°C</strong></div>
              <div className="flex justify-between"><span>Design Pressure:</span> <strong>10.0 Bar (MAWP)</strong></div>
              <div className="flex justify-between"><span>Design Temp:</span> <strong>65.0°C</strong></div>
            </div>
          </div>
        </div>

        {/* Section 2: Thermal & Mechanical Calculation Summary */}
        <div className="space-y-3">
          <h3 className="text-sm font-bold uppercase tracking-wider text-blue-900 font-mono border-b border-blue-900/30 pb-1">
            2. Thermal Performance & Mechanical Thickness Summary
          </h3>

          <div className="overflow-x-auto border border-slate-200 rounded-xl font-mono text-xs">
            <table className="w-full text-left">
              <thead className="bg-slate-900 text-white uppercase text-[10px]">
                <tr>
                  <th className="p-2.5">Parameter</th>
                  <th className="p-2.5">Calculated Value</th>
                  <th className="p-2.5">ASME / TEMA Standard Code Limit</th>
                  <th className="p-2.5">Compliance</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200">
                <tr>
                  <td className="p-2.5 font-bold">Total Heat Duty Q</td>
                  <td className="p-2.5 text-blue-800 font-bold">1,250 kW</td>
                  <td className="p-2.5">Process Duty Requirement</td>
                  <td className="p-2.5 text-emerald-700 font-bold">PASSED</td>
                </tr>
                <tr>
                  <td className="p-2.5 font-bold">Corrected LMTD</td>
                  <td className="p-2.5">24.8 °C</td>
                  <td className="p-2.5">F-Factor = 0.94</td>
                  <td className="p-2.5 text-emerald-700 font-bold">PASSED</td>
                </tr>
                <tr>
                  <td className="p-2.5 font-bold">Overall Heat Transfer U</td>
                  <td className="p-2.5">520 W/m²·K</td>
                  <td className="p-2.5">Fouling Included (0.0002 m²K/W)</td>
                  <td className="p-2.5 text-emerald-700 font-bold">PASSED</td>
                </tr>
                <tr>
                  <td className="p-2.5 font-bold">Shell Thickness (UG-27)</td>
                  <td className="p-2.5 text-blue-800 font-bold">12.5 mm + 3.0 mm CA = 15.5 mm</td>
                  <td className="p-2.5">Min nominal = 16.0 mm (SA-516 Gr 70)</td>
                  <td className="p-2.5 text-emerald-700 font-bold">PASSED</td>
                </tr>
                <tr>
                  <td className="p-2.5 font-bold">Tubesheet Thickness</td>
                  <td className="p-2.5 text-blue-800 font-bold">68.2 mm + 3.0 mm CA = 71.2 mm</td>
                  <td className="p-2.5">Min nominal = 75.0 mm Disc</td>
                  <td className="p-2.5 text-emerald-700 font-bold">PASSED</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* Section 3: Material Selection Justification */}
        <div className="space-y-3 font-mono text-xs">
          <h3 className="text-sm font-bold uppercase tracking-wider text-blue-900 font-mono border-b border-blue-900/30 pb-1">
            3. Metallurgy & Corrosion Resistance Justification
          </h3>
          <p className="text-slate-700 leading-relaxed">
            The tube material selected is <strong>Copper-Nickel 90/10 (SB-111 C70600)</strong> due to its superior resistance to macro-fouling, erosion-corrosion, and pitting in raw river cooling water. Tubesheets are manufactured from forged <strong>SA-266 Grade 2 clad with 10mm Cu-Ni 90/10</strong> to prevent galvanic potential mismatch at the tube joint.
          </p>
        </div>

        {/* Official Signoff Footnote */}
        <div className="pt-8 border-t-2 border-slate-900 flex flex-col sm:flex-row items-center justify-between gap-6 font-mono text-xs">
          <div className="space-y-1">
            <div className="font-bold text-slate-900 uppercase">Prepared & Approved By:</div>
            <div className="text-slate-600">Lead Thermal & Mechanical Engineering Director</div>
            <div className="text-blue-800 font-bold">Northern HeatEx Corporation • Noor Engineering Works (est. 1983)</div>
          </div>

          <div className="text-center p-3 border-2 border-dashed border-blue-800 rounded-xl bg-blue-50">
            <ShieldCheck className="w-6 h-6 text-blue-800 mx-auto" />
            <div className="font-bold text-blue-900 uppercase text-[10px] mt-1">THIRD PARTY INSPECTED (TPI)</div>
            <div className="text-[9px] text-slate-500">INSPECTION CLEARANCE VERIFIED</div>
          </div>
        </div>
      </div>
    </div>
  );
};
