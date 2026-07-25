import React from "react";
import { useRouter } from "../context/RouterContext";
import { HeatExchanger3DCanvas } from "../components/3d/HeatExchanger3DCanvas";
import { 
  Camera, Factory, Cpu, ShieldCheck, Download, Sparkles, Send 
} from "lucide-react";

export const GalleryPage: React.FC = () => {
  const { navigate } = useRouter();

  const galleryCategories = [
    {
      title: "Haridwar Works Manufacturing Bay",
      desc: "5-axis CNC deep-hole tubesheet drilling machines, automated orbital TIG welding stations, and hydraulic tube bundle pullers.",
      items: [
        { title: "5-Axis CNC Deep Hole Machine", tag: "CNC Machining", location: "Haridwar Bay 1" },
        { title: "Orbital TIG Tube-to-Tubesheet Weld", tag: "TIG Welding", location: "Haridwar Bay 2" },
        { title: "Hydraulic Tube Bundle Puller", tag: "Bundle Assembly", location: "Haridwar Yard" },
      ],
    },
    {
      title: "Hydrotest Bunker & Quality NDE Bay",
      desc: "Hydrostatic test pit certified to 500 bar, Helium mass spectrometer leak detection chamber, and XRF PMI material testing.",
      items: [
        { title: "500 Bar Hydrotest Pit", tag: "Hydrotest QC", location: "Testing Bay" },
        { title: "Helium Mass Spectrometer Chamber", tag: "Leak Detection", location: "Clean Lab" },
        { title: "Lloyd's TPI Inspection Clearance", tag: "Third Party", location: "QC Office" },
      ],
    },
  ];

  return (
    <div className="space-y-12">
      {/* Hero Banner */}
      <div className="bg-slate-900 rounded-3xl p-6 sm:p-10 text-white relative overflow-hidden border border-slate-800 shadow-xl">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-950/80 via-slate-900 to-cyan-950/80 z-10" />

        <div className="relative z-20 space-y-4 max-w-4xl">
          <span className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-cyan-500/20 text-cyan-300 border border-cyan-500/30 text-xs font-mono font-bold uppercase tracking-wider">
            <Camera className="w-3.5 h-3.5 text-cyan-400" />
            HARIDWAR WORKS WORKSHOP & MEDIA GALLERY
          </span>

          <h1 className="text-3xl sm:text-4xl font-black tracking-tight text-white">
            Manufacturing Facilities, Testing & 3D Interactive WebGL Models
          </h1>

          <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
            High-resolution visual tour of our Haridwar Works manufacturing plant, CNC machines, hydrotest bunker, and WebGL 3D CAD models.
          </p>
        </div>
      </div>

      {/* 3D WebGL Viewer Feature Card */}
      <div className="bg-slate-950 border border-slate-800 rounded-2xl p-6 space-y-4 shadow-xl text-white">
        <div className="flex items-center justify-between font-mono text-xs">
          <span className="text-cyan-400 font-bold flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-cyan-300" /> WebGL 3D Interactive CAD Library
          </span>
          <span className="text-slate-400">TEMA BEM Shell & Tube Inspection Model</span>
        </div>

        <div className="h-[400px] rounded-xl overflow-hidden border border-slate-800 bg-slate-900">
          <HeatExchanger3DCanvas
            temaType="BEM"
            shellDiameter={800}
            tubeCount={190}
            tubeLength={6000}
          />
        </div>
      </div>

      {/* Gallery Sections */}
      <div className="space-y-8">
        {galleryCategories.map((cat, idx) => (
          <div key={idx} className="bg-white border border-slate-200 rounded-2xl p-6 space-y-4 shadow-sm">
            <h3 className="text-xl font-bold text-slate-900">{cat.title}</h3>
            <p className="text-xs text-slate-600 font-sans">{cat.desc}</p>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 font-mono text-xs">
              {cat.items.map((item, i) => (
                <div key={i} className="bg-slate-50 border border-slate-200 rounded-xl p-4 space-y-2 hover:border-[#0056A6] transition">
                  <div className="w-8 h-8 rounded-lg bg-blue-100 text-[#0056A6] flex items-center justify-center font-bold">
                    <Factory className="w-4 h-4" />
                  </div>
                  <h4 className="font-bold text-slate-900 text-xs font-sans">{item.title}</h4>
                  <div className="flex items-center justify-between text-[11px] text-slate-500">
                    <span className="bg-blue-50 text-[#0056A6] px-2 py-0.5 rounded border border-blue-200 font-bold">{item.tag}</span>
                    <span>{item.location}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
