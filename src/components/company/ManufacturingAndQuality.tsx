import React, { useState } from "react";
import { motion } from "motion/react";
import {
  Factory,
  ShieldCheck,
  Award,
  CheckCircle2,
  FileCheck2,
  Plus,
  Lock,
  Layers,
  Sparkles,
  Zap,
  Microscope,
  RotateCcw,
} from "lucide-react";

export const ManufacturingAndQualitySection: React.FC = () => {
  // Page 15 State: Dynamic Certification Management (Admin Mode Toggle)
  const [showAdminCertModal, setShowAdminCertModal] = useState(false);
  const [certifications, setCertifications] = useState([
    {
      code: "ISO 9001:2015",
      title: "Quality Management Systems Certification",
      body: "Lloyd's Register Quality Assurance (LRQA) / Standard Audited",
      validUntil: "2028-12-31",
      status: "Active Held",
    },
    {
      code: "ISO 14001:2025",
      title: "Environmental Management Systems Compliance",
      body: "ISO Environmental Safety & Sustainability Standard",
      validUntil: "2028-12-31",
      status: "Active Held",
    },
    {
      code: "TPI CLEARANCE",
      title: "Third Party Inspection Clearance & Standard Procedures",
      body: "Inspected by Internationally Accepted Agencies (TUV, Lloyd's, Bureau Veritas, SGS)",
      validUntil: "2029-12-31",
      status: "Active Assurance",
    },
  ]);

  const [newCert, setNewCert] = useState({
    code: "",
    title: "",
    body: "",
    validUntil: "",
    status: "Active Compliance",
  });

  const handleAddCert = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newCert.code || !newCert.title) return;
    setCertifications([...certifications, newCert]);
    setNewCert({ code: "", title: "", body: "", validUntil: "", status: "Active Compliance" });
    setShowAdminCertModal(false);
  };

  const manufacturingLifecycle = [
    {
      step: "01",
      phase: "Thermal Design & Calculation",
      desc: "Process thermal sizing and fluid channel optimization for pressure drop minimization and high heat transfer efficiency.",
    },
    {
      step: "02",
      phase: "3D CAD Solid Modeling",
      desc: "Full parametric 3D CAD modeling with FEA structural stress analysis under seismic and nozzle load vectors.",
    },
    {
      step: "03",
      phase: "Raw Material Metallurgical Validation",
      desc: "Complete 100% PMI optical emission spectrometry chemical analysis and MTR verification before cutting.",
    },
    {
      step: "04",
      phase: "Precision CNC Tubesheet Machining",
      desc: "Micron-accurate deep-hole drilling, reaming, and double-grooving on high-end CNC machining workstations.",
    },
    {
      step: "05",
      phase: "Automated Orbital TIG Welding",
      desc: "Precision orbital TIG tube-to-tubesheet strength welding with closed-loop inert argon gas purging.",
    },
    {
      step: "06",
      phase: "Hydrostatic & Vacuum Leak Testing",
      desc: "High-pressure shell and tube hydro testing followed by precision vacuum leak detection witnessed by TPI Inspectors.",
    },
    {
      step: "07",
      phase: "Final Coating & Export Packaging",
      desc: "Heavy marine protective coating application, nitrogen purge charge, and ocean-ready crating.",
    },
  ];

  return (
    <div className="space-y-16">
      {/* PAGE 9: MANUFACTURING PHILOSOPHY */}
      <section id="manufacturing-philosophy" className="relative">
        <div className="bg-slate-950 border border-slate-800 rounded-3xl p-8 lg:p-12 shadow-2xl space-y-8">
          <div className="flex items-center justify-between border-b border-slate-800 pb-4">
            <div className="flex items-center gap-3">
              <span className="bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 text-xs font-mono px-3 py-1 rounded-full font-bold uppercase tracking-wider">
                Corporate Dossier • Page 09
              </span>
              <span className="text-slate-500 text-xs font-mono">|</span>
              <span className="text-slate-400 text-xs font-mono">7-Stage Closed-Loop Production Philosophy</span>
            </div>
            <Factory className="w-5 h-5 text-cyan-400" />
          </div>

          <div className="max-w-3xl space-y-3">
            <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
              Manufacturing Philosophy: Closed-Loop Lifecycle Precision
            </h2>
            <p className="text-slate-300 text-sm font-light leading-relaxed">
              Our manufacturing philosophy unites advanced CNC automation with rigorous ASME metallurgical quality control. Every step from thermal calculation to site installation follows a closed-loop quality gateway.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 pt-2 font-mono">
            {manufacturingLifecycle.map((m) => (
              <div
                key={m.step}
                className="bg-slate-900/80 border border-slate-800 p-5 rounded-2xl space-y-2 relative overflow-hidden"
              >
                <span className="text-2xl font-extrabold text-cyan-500/30 block absolute top-3 right-3 font-mono">
                  {m.step}
                </span>
                <span className="text-[10px] text-cyan-400 font-bold uppercase tracking-wider block">
                  STAGE {m.step}
                </span>
                <h4 className="text-sm font-bold text-slate-100">{m.phase}</h4>
                <p className="text-xs text-slate-400 font-sans leading-relaxed">{m.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* PAGE 14: QUALITY COMMITMENT */}
      <section id="quality-commitment" className="relative">
        <div className="bg-gradient-to-br from-slate-900 via-slate-950 to-slate-900 border border-slate-800 rounded-3xl p-8 lg:p-12 shadow-2xl space-y-8">
          <div className="flex items-center justify-between border-b border-slate-800 pb-4">
            <div className="flex items-center gap-3">
              <span className="bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-mono px-3 py-1 rounded-full font-bold uppercase tracking-wider">
                Corporate Dossier • Page 14
              </span>
              <span className="text-slate-500 text-xs font-mono">|</span>
              <span className="text-slate-400 text-xs font-mono">Zero Defect Quality Assurance</span>
            </div>
            <ShieldCheck className="w-5 h-5 text-emerald-400" />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            <div className="lg:col-span-6 space-y-4">
              <h3 className="text-xl font-bold text-white tracking-tight">
                Our Uncompromising Quality Commitment & NDE Protocols
              </h3>
              <p className="text-xs text-slate-300 leading-relaxed font-light">
                Quality at Northern HeatEx is not a final inspection step — it is an active engineering culture woven into every phase of fabrication. We maintain complete 1:1 heat-number traceability for every mill plate, forging, and tube length.
              </p>

              <div className="space-y-2 font-mono text-xs text-slate-300 pt-2">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>100% Positive Material Identification (PMI) by XRF & OES</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>Radiographic Examination (RT-2 / RT-1) on shell seam welds</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>Ultrasonic Testing (UT) of tubesheet forgings and white metal Babbitt bonds</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>Dye Penetrant (PT) & Magnetic Particle Inspection (MT) on nozzle fillets</span>
                </div>
              </div>
            </div>

            <div className="lg:col-span-6 bg-slate-900/90 p-6 rounded-2xl border border-slate-800 space-y-4 font-mono text-xs">
              <h4 className="text-slate-200 font-bold uppercase tracking-wider flex items-center gap-2 border-b border-slate-800 pb-3">
                <Microscope className="w-4 h-4 text-emerald-400" />
                ASME Quality Control Documentation Dossier
              </h4>

              <div className="space-y-2">
                <div className="bg-slate-950 p-3 rounded border border-slate-800 flex justify-between items-center">
                  <div>
                    <strong className="text-slate-100 block">Manufacturer Data & Hydrotest Reports</strong>
                    <span className="text-slate-400 text-[11px]">Third Party Inspector (TPI) Verified</span>
                  </div>
                  <span className="text-emerald-400 font-bold">INCLUDED</span>
                </div>

                <div className="bg-slate-950 p-3 rounded border border-slate-800 flex justify-between items-center">
                  <div>
                    <strong className="text-slate-100 block">Mill Test Reports (MTRs) EN 10204 3.1 / 3.2</strong>
                    <span className="text-slate-400 text-[11px]">Full chemical & mechanical mechanical lab certs</span>
                  </div>
                  <span className="text-emerald-400 font-bold">INCLUDED</span>
                </div>

                <div className="bg-slate-950 p-3 rounded border border-slate-800 flex justify-between items-center">
                  <div>
                    <strong className="text-slate-100 block">WPS / PQR / WPQ Welder Performance Qualifications</strong>
                    <span className="text-slate-400 text-[11px]">ASME Sec IX certified welding procedures</span>
                  </div>
                  <span className="text-emerald-400 font-bold">INCLUDED</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* PAGE 15: CERTIFICATIONS & STANDARDS */}
      <section id="certifications" className="relative">
        <div className="bg-slate-950 border border-slate-800 rounded-3xl p-8 lg:p-12 shadow-2xl space-y-8">
          <div className="flex flex-wrap items-center justify-between gap-4 border-b border-slate-800 pb-4">
            <div className="flex items-center gap-3">
              <span className="bg-amber-500/10 border border-amber-500/30 text-amber-400 text-xs font-mono px-3 py-1 rounded-full font-bold uppercase tracking-wider">
                Corporate Dossier • Page 15
              </span>
              <span className="text-slate-500 text-xs font-mono">|</span>
              <span className="text-slate-400 text-xs font-mono">International Standards & Quality Stamp Registry</span>
            </div>

            <button
              onClick={() => setShowAdminCertModal(!showAdminCertModal)}
              className="bg-slate-800 hover:bg-slate-700 text-amber-300 font-mono text-xs font-bold px-3 py-1.5 rounded-lg border border-amber-500/30 flex items-center gap-2 transition"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Admin Certification Manager</span>
            </button>
          </div>

          <div className="max-w-2xl space-y-2">
            <h2 className="text-2xl font-bold text-white tracking-tight">
              Held Certifications & Global Code Compliance
            </h2>
            <p className="text-xs text-slate-400 font-mono">
              Note: Compliance credentials listed are strictly maintained under audited quality systems. Additional certificates can be added dynamically via the admin panel.
            </p>
          </div>

          {/* Certification Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {certifications.map((c) => (
              <div
                key={c.code}
                className="bg-slate-900/90 border border-slate-800 p-5 rounded-2xl space-y-3 relative overflow-hidden group hover:border-amber-500/40 transition"
              >
                <div className="flex justify-between items-start">
                  <span className="text-xs font-mono font-bold text-amber-400 bg-amber-950/60 px-2.5 py-1 rounded border border-amber-500/30">
                    {c.code}
                  </span>
                  <span className="text-[10px] font-mono text-emerald-400 bg-emerald-950/60 px-2 py-0.5 rounded border border-emerald-500/30 font-bold">
                    {c.status}
                  </span>
                </div>

                <div>
                  <h4 className="text-sm font-bold text-slate-100 font-mono">{c.title}</h4>
                  <p className="text-xs text-slate-400 mt-1 font-sans">{c.body}</p>
                </div>

                <div className="pt-3 border-t border-slate-800 text-[10px] font-mono text-slate-500 flex justify-between">
                  <span>VALID THRU: {c.validUntil}</span>
                  <FileCheck2 className="w-3.5 h-3.5 text-amber-400" />
                </div>
              </div>
            ))}
          </div>

          {/* Admin Certification Addition Modal */}
          {showAdminCertModal && (
            <div className="bg-slate-900 border border-amber-500/40 p-6 rounded-2xl space-y-4 font-mono text-xs">
              <h4 className="text-sm font-bold text-amber-300 uppercase tracking-wider flex items-center gap-2 border-b border-slate-800 pb-2">
                <Lock className="w-4 h-4 text-amber-400" />
                Add New Corporate Certification / Quality Standard
              </h4>

              <form onSubmit={handleAddCert} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
                <input
                  type="text"
                  placeholder="Code (e.g. ISO 45001)"
                  required
                  value={newCert.code}
                  onChange={(e) => setNewCert({ ...newCert, code: e.target.value })}
                  className="bg-slate-950 border border-slate-800 p-2.5 rounded text-slate-200 focus:border-amber-500 focus:outline-none"
                />
                <input
                  type="text"
                  placeholder="Title Description"
                  required
                  value={newCert.title}
                  onChange={(e) => setNewCert({ ...newCert, title: e.target.value })}
                  className="bg-slate-950 border border-slate-800 p-2.5 rounded text-slate-200 focus:border-amber-500 focus:outline-none"
                />
                <input
                  type="text"
                  placeholder="Auditing Authority"
                  value={newCert.body}
                  onChange={(e) => setNewCert({ ...newCert, body: e.target.value })}
                  className="bg-slate-950 border border-slate-800 p-2.5 rounded text-slate-200 focus:border-amber-500 focus:outline-none"
                />
                <button
                  type="submit"
                  className="bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold p-2.5 rounded transition"
                >
                  Add Certificate
                </button>
              </form>
            </div>
          )}
        </div>
      </section>
    </div>
  );
};
