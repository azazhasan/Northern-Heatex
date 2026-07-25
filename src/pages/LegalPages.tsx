import React from "react";
import { useRouter } from "../context/RouterContext";
import { ShieldCheck, FileText, AlertTriangle } from "lucide-react";

export const LegalPages: React.FC = () => {
  const { currentPath } = useRouter();

  if (currentPath === "/terms") {
    return (
      <div className="max-w-4xl mx-auto bg-white border border-slate-200 rounded-2xl p-8 sm:p-12 space-y-6 text-slate-800 font-sans shadow-sm">
        <div className="border-b border-slate-200 pb-4 space-y-2 font-mono">
          <span className="text-xs font-bold text-[#0056A6] uppercase tracking-wider">Commercial & Legal Terms</span>
          <h1 className="text-3xl font-black text-slate-900 font-sans">Terms & Conditions of Supply</h1>
          <p className="text-xs text-slate-500">Effective Date: January 1, 2026 • Northern HeatEx Corporation / Noor Engineering Works (Est. 1983)</p>
        </div>

        <div className="space-y-4 text-xs sm:text-sm leading-relaxed text-slate-700">
          <h3 className="text-base font-bold text-slate-900">1. Scope of Agreement</h3>
          <p>
            All quotations, design calculations, tube bundle supply, and repair services rendered by Northern HeatEx Corporation (operating under parent Noor Engineering Works) are subject to these commercial terms unless explicitly overridden by a signed bilateral contract or PSU tender agreement.
          </p>

          <h3 className="text-base font-bold text-slate-900">2. ASME & TEMA Design Compliance</h3>
          <p>
            Equipment manufactured under ASME Section VIII Division 1 or TEMA Class R/C/B receives Third Party Inspection (TPI) clearance by authorized inspectors (Lloyd's, TUV, BV, DNV, or BHEL/NTPC inspectors) prior to factory dispatch from Haridwar Works.
          </p>

          <h3 className="text-base font-bold text-slate-900">3. Indian GST Invoicing</h3>
          <p>
            All invoices comply with Indian Goods and Services Tax (GST) rules under Chapter 8419 (Heat Exchangers and Machinery). GST invoice breakups, alloy surcharges, and E-Way bills are issued with official Haridwar Works credentials.
          </p>

          <h3 className="text-base font-bold text-slate-900">4. Warranty & Performance Guarantees</h3>
          <p>
            Standard equipment carries an 18-month warranty from shipment or 12-month warranty from commissioning against manufacturing and material defects, subject to operational thermal limits specified in the design datasheet.
          </p>
        </div>
      </div>
    );
  }

  if (currentPath === "/disclaimer") {
    return (
      <div className="max-w-4xl mx-auto bg-white border border-slate-200 rounded-2xl p-8 sm:p-12 space-y-6 text-slate-800 font-sans shadow-sm">
        <div className="border-b border-slate-200 pb-4 space-y-2 font-mono">
          <span className="text-xs font-bold text-amber-600 uppercase tracking-wider">Technical & Engineering Notice</span>
          <h1 className="text-3xl font-black text-slate-900 font-sans">Engineering Calculation Disclaimer</h1>
          <p className="text-xs text-slate-500">Notice for Professional Engineers & Thermal Calculators</p>
        </div>

        <div className="space-y-4 text-xs sm:text-sm leading-relaxed text-slate-700">
          <div className="p-4 bg-amber-50 border border-amber-200 rounded-xl flex items-start gap-3 text-amber-900 text-xs font-mono">
            <AlertTriangle className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
            <div>
              <strong className="block font-bold">Preliminary Estimation Tool Notice:</strong>
              Calculations performed via the online Thermal Design Calculator, ASME Mechanical Studio, and AI Engineering Agents are intended for preliminary engineering estimation. Final manufacturing drawings require review by our certified Haridwar engineering directorate.
            </div>
          </div>

          <p>
            While Northern HeatEx software employs standard LMTD, NTU, and ASME Section VIII Division 1 formulas, final pressure vessel stamping requires formal verification of physical material test reports (MTR) and non-destructive examination (NDE) clearance at Haridwar Works.
          </p>
        </div>
      </div>
    );
  }

  // Default: Privacy Policy
  return (
    <div className="max-w-4xl mx-auto bg-white border border-slate-200 rounded-2xl p-8 sm:p-12 space-y-6 text-slate-800 font-sans shadow-sm">
      <div className="border-b border-slate-200 pb-4 space-y-2 font-mono">
        <span className="text-xs font-bold text-[#0056A6] uppercase tracking-wider">Data Protection</span>
        <h1 className="text-3xl font-black text-slate-900 font-sans">Privacy Policy & Security</h1>
        <p className="text-xs text-slate-500">Northern HeatEx Corporation • Noor Engineering Works (Est. 1983)</p>
      </div>

      <div className="space-y-4 text-xs sm:text-sm leading-relaxed text-slate-700">
        <p>
          Northern HeatEx Corporation is committed to protecting corporate engineering data, CAD blueprints, and RFQ submission information provided by our enterprise clients and government partners.
        </p>
        <h3 className="text-base font-bold text-slate-900">Information Handling</h3>
        <p>
          Uploaded CAD files (STEP, DWG, DXF, PDF) and thermal parameter submissions are strictly transmitted over encrypted HTTPS channels to our internal Haridwar CRM for quotation preparation and are never shared with unauthorized third parties.
        </p>
      </div>
    </div>
  );
};
