import React from "react";
import { useRouter } from "../context/RouterContext";
import { 
  Wrench, ShieldCheck, Clock, Award, Zap, RefreshCw, Send, CheckCircle2, Factory, Layers, Cpu 
} from "lucide-react";

export const ServicesPage: React.FC = () => {
  const { currentPath, navigate } = useRouter();

  const servicesList = [
    {
      slug: "manufacturing",
      title: "Heat Exchanger Manufacturing",
      desc: "High-end CNC deep hole drilling, automated orbital TIG tube-to-tubesheet welding, and hydraulic expansion under National and International standards.",
      highlights: ["High-End CNC Drilling", "Orbital TIG Welding", "100% NDE Clearance", "TPI Inspected & Cleared"],
      cta: "Request Manufacturing Spec",
    },
    {
      slug: "retubing",
      title: "On-Site Field Retubing Services",
      desc: "24/7 mobile emergency response teams equipped with hydraulic bundle pullers, automatic tube pulling guns, and two-stage tube expanders across India.",
      highlights: ["72-Hour Response", "Mobile Hydraulic Pullers", "Eddy Current Testing", "Zero Outage Delay"],
      cta: "Schedule Emergency Retubing",
    },
    {
      slug: "repair",
      title: "Exchanger Repair & Re-Gasketing",
      desc: "Full refurbishment of leaking tube bundles, channel cover re-machining, serrated gasket replacement, and hydrostatic testing to 1.5x MAWP.",
      highlights: ["Pressure Leak Repair", "Flange Facing", "Tube Plugging", "Hydrotest Verification"],
      cta: "Book Repair Inspection",
    },
    {
      slug: "performance-enhancement",
      title: "Performance Upgrade & Re-Rating",
      desc: "Retrofitting proprietary wire-wound fin tubes and optimizing tube pitch layout to boost thermal heat duty by up to 300% within the same shell envelope.",
      highlights: ["Wire-Wound Finning", "Thermal Re-Rating", "Duty Optimization", "Fouling Mitigation"],
      cta: "Request Duty Upgrade",
    },
    {
      slug: "shutdown-maintenance",
      title: "Power Plant Shutdown Maintenance",
      desc: "Turnkey heat exchanger overhaul during scheduled power station turnaround outages, with 24-hour shift working at Works Facility at Haridwar.",
      highlights: ["Turnaround Outages", "Helium Leak Detection", "Bundles Extraction", "Rapid Re-Assembly"],
      cta: "Plan Outage Support",
    },
    {
      slug: "reverse-engineering",
      title: "Reverse Engineering & CAD Reconstruction",
      desc: "Precision physical measurement on site for obsolete or un-documented OEM heat exchangers, generating manufacturing 2D CAD & 3D models.",
      highlights: ["Physical Measurement", "CAD Blueprint Creation", "Material Spectrometry", "Exact Drop-In Fit"],
      cta: "Request Reverse Engineering",
    },
    {
      slug: "white-metal-rebabbitting",
      title: "White Metal Bearing Re-Babbitting",
      desc: "ASTM B23 tin-based babbitt lining for Turbine Guide pads, Upper guide pads, Lower guide pads, and Thrust Pads with 100% bonding and defect free surface.",
      highlights: ["Turbine Guide Pads", "Upper & Lower Guide Pads", "Thrust Pads 100% Bonded", "Defect Free Surface"],
      cta: "Inquire Bearing Re-Babbitting",
    },
    {
      slug: "precision-machining",
      title: "High-End CNC Tubesheet Drilling",
      desc: "Precision deep-hole drilling of thick tubesheets up to 400mm thickness, serrated tube groove machining, and baffle plate bundle stack cutting.",
      highlights: ["400mm Max Thickness", "Serrated Tube Grooves", "Baffle Stack CNC", "High Hole Pitch Tolerance"],
      cta: "Request Machining Quote",
    },
    {
      slug: "consultancy",
      title: "Thermal & Standards Design Consultancy",
      desc: "Expert thermal duty calculations, flow-induced vibration risk assessment, and material selection audits led by senior Haridwar engineers.",
      highlights: ["LMTD & NTU Verification", "Vibration FEA Analysis", "Alloy Cost Optimization", "Third Party Clearance"],
      cta: "Consult Lead Engineer",
    },
    {
      slug: "field-services",
      title: "Field NDE & Hydrotesting Services",
      desc: "Non-destructive examination (Eddy Current Testing, Dye Penetrant, Radiography, Helium Leak Mass Spectrometry) delivered directly at plant sites.",
      highlights: ["Eddy Current NDE", "Helium Leak Detection", "PMI XRF Spectrometry", "ASNT Level II / III Certified"],
      cta: "Request Field NDE Team",
    },
  ];

  const currentSlug = currentPath.replace("/services", "").replace(/^\//, "");
  const selectedService = servicesList.find((s) => s.slug === currentSlug);

  return (
    <div className="space-y-12">
      {/* Services Hero Banner */}
      <div className="bg-slate-900 rounded-3xl p-6 sm:p-10 text-white relative overflow-hidden border border-slate-800 shadow-xl">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-950/80 via-slate-900 to-cyan-950/80 z-10" />

        <div className="relative z-20 space-y-4 max-w-4xl">
          <span className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-cyan-500/20 text-cyan-300 border border-cyan-500/30 text-xs font-mono font-bold uppercase tracking-wider">
            <Wrench className="w-3.5 h-3.5 text-cyan-400" />
            LIFECYCLE ENGINEERING & OUTAGE SERVICES
          </span>

          <h1 className="text-3xl sm:text-4xl font-black tracking-tight text-white">
            {selectedService ? selectedService.title : "Manufacturing, Retubing & Field Engineering Services"}
          </h1>

          <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
            From high-precision CNC machining at Works Facility at Haridwar to 24/7 mobile retubing response for power plants and refineries across India.
          </p>

          {/* Sub-Service Buttons */}
          <div className="flex flex-wrap gap-2 pt-4 border-t border-white/10 font-mono text-xs">
            {servicesList.map((srv) => (
              <button
                key={srv.slug}
                onClick={() => navigate(`/services/${srv.slug}`)}
                className={`px-3 py-1.5 rounded-xl transition cursor-pointer ${
                  currentSlug === srv.slug || (!currentSlug && srv.slug === "manufacturing")
                    ? "bg-[#0056A6] text-white font-bold border border-blue-400/50"
                    : "bg-white/10 hover:bg-white/20 text-slate-300 border border-white/10"
                }`}
              >
                {srv.title}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Services Grid or Single Detail View */}
      {selectedService ? (
        <div className="bg-white border border-slate-200 rounded-2xl p-8 shadow-sm space-y-6">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-xl bg-blue-100 text-[#0056A6] flex items-center justify-center font-bold">
              <Wrench className="w-6 h-6" />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-slate-900">{selectedService.title}</h2>
              <span className="text-xs font-mono text-[#0056A6] font-bold">ASME Sec VIII & TEMA Standard Procedure</span>
            </div>
          </div>

          <p className="text-slate-700 text-sm sm:text-base leading-relaxed">
            {selectedService.desc}
          </p>

          <div className="bg-slate-50 border border-slate-200 rounded-xl p-6 space-y-3">
            <h4 className="text-xs font-mono font-bold text-[#0056A6] uppercase tracking-wider">Key Service Highlights</h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {selectedService.highlights.map((h, idx) => (
                <div key={idx} className="flex items-center gap-2 text-xs text-slate-800 font-mono font-bold">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>{h}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="pt-4 flex flex-wrap gap-4">
            <button
              onClick={() => navigate("/contact/request-quotation")}
              className="bg-[#0056A6] hover:bg-blue-700 text-white font-bold px-6 py-3 rounded-xl text-xs uppercase tracking-wider flex items-center gap-2 cursor-pointer"
            >
              <Send className="w-4 h-4" /> {selectedService.cta}
            </button>
            <button
              onClick={() => navigate("/services")}
              className="bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold px-6 py-3 rounded-xl text-xs uppercase tracking-wider cursor-pointer"
            >
              ← Back to All Services
            </button>
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {servicesList.map((srv) => (
            <div
              key={srv.slug}
              className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm hover:border-[#0056A6] transition duration-200 flex flex-col justify-between space-y-4"
            >
              <div className="space-y-3">
                <div className="w-10 h-10 rounded-xl bg-blue-50 text-[#0056A6] flex items-center justify-center font-bold">
                  <Wrench className="w-5 h-5" />
                </div>
                <h3 className="text-base font-bold text-slate-900">{srv.title}</h3>
                <p className="text-xs text-slate-600 leading-relaxed">{srv.desc}</p>
                <div className="pt-2 flex flex-wrap gap-1.5">
                  {srv.highlights.slice(0, 2).map((h, i) => (
                    <span key={i} className="text-[10px] font-mono bg-blue-50 text-[#0056A6] px-2 py-0.5 rounded border border-blue-200">
                      {h}
                    </span>
                  ))}
                </div>
              </div>

              <button
                onClick={() => navigate(`/services/${srv.slug}`)}
                className="w-full bg-slate-100 hover:bg-[#0056A6] hover:text-white text-slate-800 font-mono text-xs font-bold py-2.5 rounded-xl transition cursor-pointer text-center"
              >
                Explore Service Details →
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
