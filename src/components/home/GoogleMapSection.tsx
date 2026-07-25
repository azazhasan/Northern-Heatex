import React, { useState } from "react";
import { MapPin, Phone, Mail, Navigation, Compass, ExternalLink, Building2, Wrench, ShieldCheck } from "lucide-react";

export const GoogleMapSection: React.FC = () => {
  const [selectedBay, setSelectedBay] = useState<"HQ" | "MACHINING" | "RETUBING">("HQ");

  const facilityBays = {
    HQ: {
      name: "Noor Engineering Works • Main Manufacturing Facility",
      address: "Shastri Nagar, Near G.G.I. College, Jwalapur, Haridwar, Uttarakhand – 249407, India",
      coords: "29.9318° N, 78.1176° E",
      phone: "+91 97603 62826 | +91 95575 65742 | +91 85328 23883",
      email: "northernheatex@outlook.in • inquiry@northernheatex.co.in",
      area: "Integrated Fabrication Bay • Heavy Duty CNC Tubesheet Drilling • Hydrotest Bunker • TPI Inspection Bay",
      mapEmbedUrl: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d13824.288591876872!2d78.108!3d29.932!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3909470123456789%3A0x123456789abcdef!2sJwalapur%2C%20Haridwar%2C%20Uttarakhand%20249407!5e0!3m2!1sen!2sin!4v1710000000000!5m2!1sen!2sin",
    },
    MACHINING: {
      name: "Heavy Machining & Tubesheet Drilling Division",
      address: "Shastri Nagar, Near G.G.I. College, Jwalapur, Haridwar, Uttarakhand – 249407, India",
      coords: "29.9318° N, 78.1176° E",
      phone: "+91 97603 62826 | +91 95575 65742",
      email: "northernheatex@outlook.in",
      area: "Multi-Spindle CNC Deep-Hole Tube Sheet Drilling • Shell Milling • Automatic GTAW Tube Expanding",
      mapEmbedUrl: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d13824.288591876872!2d78.108!3d29.932!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3909470123456789%3A0x123456789abcdef!2sJwalapur%2C%20Haridwar%2C%20Uttarakhand%20249407!5e0!3m2!1sen!2sin!4v1710000000000!5m2!1sen!2sin",
    },
    RETUBING: {
      name: "Bundle Assembly, Retubing & Quality Testing Bay",
      address: "Shastri Nagar, Near G.G.I. College, Jwalapur, Haridwar, Uttarakhand – 249407, India",
      coords: "29.9318° N, 78.1176° E",
      phone: "+91 95575 65742 | +91 85328 23883",
      email: "inquiry@northernheatex.co.in",
      area: "Hydrostatic Testing up to 100 Bar • Pneumatic Testing • Third Party Inspection (TPI) Clearance Hold Points",
      mapEmbedUrl: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d13824.288591876872!2d78.108!3d29.932!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3909470123456789%3A0x123456789abcdef!2sJwalapur%2C%20Haridwar%2C%20Uttarakhand%20249407!5e0!3m2!1sen!2sin!4v1710000000000!5m2!1sen!2sin",
    },
  };

  const current = facilityBays[selectedBay];

  return (
    <section id="map" className="py-20 bg-[#050505] text-white border-t border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        {/* Header */}
        <div className="flex flex-wrap items-end justify-between gap-6 border-b border-white/10 pb-6">
          <div className="max-w-2xl space-y-2">
            <span className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-950/80 border border-blue-500/30 text-cyan-300 text-xs font-mono font-bold uppercase tracking-wider glow-blue">
              <MapPin className="w-3.5 h-3.5 text-cyan-400" />
              Parent Enterprise • Noor Engineering Works (est. 1983)
            </span>

            <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight">
              Noor Engineering Works &{" "}
              <span className="bg-gradient-to-r from-cyan-400 via-blue-400 to-indigo-300 bg-clip-text text-transparent">
                Manufacturing Location
              </span>
            </h2>
          </div>

          {/* Bay Switcher */}
          <div className="flex flex-wrap gap-2 font-mono text-xs">
            <button
              onClick={() => setSelectedBay("HQ")}
              className={`px-3.5 py-2 rounded-xl border transition cursor-pointer flex items-center gap-1.5 ${
                selectedBay === "HQ"
                  ? "bg-blue-600 text-white border-blue-400 glow-blue font-bold"
                  : "bg-[#0a0a0a] text-white/60 border-white/10 hover:text-white"
              }`}
            >
              <Building2 className="w-3.5 h-3.5" />
              Main Works (Haridwar)
            </button>
            <button
              onClick={() => setSelectedBay("MACHINING")}
              className={`px-3.5 py-2 rounded-xl border transition cursor-pointer flex items-center gap-1.5 ${
                selectedBay === "MACHINING"
                  ? "bg-blue-600 text-white border-blue-400 glow-blue font-bold"
                  : "bg-[#0a0a0a] text-white/60 border-white/10 hover:text-white"
              }`}
            >
              <Wrench className="w-3.5 h-3.5" />
              CNC Machining
            </button>
            <button
              onClick={() => setSelectedBay("RETUBING")}
              className={`px-3.5 py-2 rounded-xl border transition cursor-pointer flex items-center gap-1.5 ${
                selectedBay === "RETUBING"
                  ? "bg-blue-600 text-white border-blue-400 glow-blue font-bold"
                  : "bg-[#0a0a0a] text-white/60 border-white/10 hover:text-white"
              }`}
            >
              <ShieldCheck className="w-3.5 h-3.5" />
              TPI & Testing Bay
            </button>
          </div>
        </div>

        {/* Map & Facility Details Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Facility Spec Panel */}
          <div className="bg-[#0a0a0a] border border-white/10 rounded-3xl p-6 sm:p-8 space-y-6 shadow-2xl flex flex-col justify-between">
            <div className="space-y-4 font-mono">
              <span className="px-3 py-1 bg-cyan-950 text-cyan-300 border border-cyan-700/60 rounded text-xs font-bold uppercase inline-block">
                Manufacturing Location • Haridwar, Uttarakhand
              </span>

              <h3 className="text-xl font-bold text-white font-sans">{current.name}</h3>

              <div className="space-y-3 text-xs text-white/80">
                <div className="flex items-start gap-2.5">
                  <MapPin className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
                  <span>{current.address}</span>
                </div>

                <div className="flex items-center gap-2.5">
                  <Compass className="w-4 h-4 text-cyan-400 shrink-0" />
                  <span className="text-cyan-300 font-bold">{current.coords}</span>
                </div>

                <div className="flex items-start gap-2.5">
                  <Phone className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
                  <span>{current.phone}</span>
                </div>

                <div className="flex items-center gap-2.5">
                  <Mail className="w-4 h-4 text-cyan-400 shrink-0" />
                  <span>{current.email}</span>
                </div>
              </div>

              <div className="pt-4 border-t border-white/10">
                <span className="text-white/40 uppercase text-[10px] block">Facility Operations</span>
                <p className="text-xs text-white/70 font-sans mt-1">{current.area}</p>
              </div>
            </div>

            <a
              href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent("Shastri Nagar, Near G.G.I. College, Jwalapur, Haridwar, Uttarakhand 249407")}`}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-blue-600 hover:bg-blue-500 text-white font-bold py-3.5 rounded-xl text-xs font-mono uppercase tracking-wider flex items-center justify-center gap-2 glow-blue transition cursor-pointer"
            >
              <Navigation className="w-4 h-4" />
              <span>Open Map Location in Google Maps</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          </div>

          {/* Map Embed Frame */}
          <div className="lg:col-span-2 bg-[#0a0a0a] border border-white/10 rounded-3xl overflow-hidden shadow-2xl relative h-[420px]">
            <iframe
              title={current.name}
              src={current.mapEmbedUrl}
              className="w-full h-full border-0 grayscale opacity-85 hover:grayscale-0 transition duration-500"
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
            <div className="absolute top-4 right-4 bg-[#0a0a0a]/90 backdrop-blur-md px-3 py-1.5 rounded-lg border border-white/10 text-xs font-mono text-cyan-300 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse"></span>
              Jwalapur, Haridwar, Uttarakhand – 249407
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
