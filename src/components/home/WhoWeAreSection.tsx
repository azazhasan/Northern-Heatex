import React, { useEffect, useRef, useState } from "react";
import { Award, Shield, Factory, Building2, Wrench } from "lucide-react";

export const WhoWeAreSection: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [activeRegion, setActiveRegion] = useState<string>("Thermal Power & Hydro");

  const regions = [
    { name: "Thermal Power & Hydro", lat: 29.9, lng: 78.1, projects: 1850, hubs: ["Haridwar Main Works", "Hydro Turbine Support"] },
    { name: "Refineries & Petrochem", lat: 22.5, lng: 72.8, projects: 1200, hubs: ["Process Equipment Division", "Heavy Fabrication Bay"] },
    { name: "Fertilizer & Chemicals", lat: 26.8, lng: 80.9, projects: 950, hubs: ["Tubesheet Drilling CNC", "High-Pressure Retubing Bay"] },
    { name: "Steel & Heavy Metal", lat: 22.8, lng: 86.2, projects: 680, hubs: ["Cooler Refurbishment Bay", "TPI Hydrotest Bunker"] },
  ];

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = canvas.parentElement?.clientWidth || 800);
    let height = (canvas.height = 300);

    let angle = 0;

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      // Light background grid
      ctx.fillStyle = "#F8FAFC";
      ctx.fillRect(0, 0, width, height);

      ctx.strokeStyle = "rgba(0, 86, 166, 0.08)";
      ctx.lineWidth = 1;
      for (let x = 0; x < width; x += 40) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, height);
        ctx.stroke();
      }
      for (let y = 0; y < height; y += 40) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(width, y);
        ctx.stroke();
      }

      angle += 0.005;

      regions.forEach((reg) => {
        const x = ((reg.lng - 65) / 35) * width;
        const y = ((35 - reg.lat) / 25) * height;

        const isSelected = activeRegion === reg.name;

        ctx.save();
        ctx.beginPath();
        ctx.arc(x, y, isSelected ? 16 + Math.sin(angle * 3) * 4 : 8, 0, Math.PI * 2);
        ctx.strokeStyle = isSelected ? "rgba(0, 86, 166, 0.8)" : "rgba(100, 116, 139, 0.3)";
        ctx.lineWidth = isSelected ? 2 : 1;
        ctx.stroke();
        ctx.restore();

        ctx.save();
        ctx.beginPath();
        ctx.arc(x, y, isSelected ? 6 : 4, 0, Math.PI * 2);
        ctx.fillStyle = isSelected ? "#0056A6" : "#94a3b8";
        ctx.fill();
        ctx.restore();
      });

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animationFrameId);
    };
  }, [activeRegion]);

  return (
    <section id="who-we-are" className="py-16 bg-white text-slate-900 border-t border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <span className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-blue-50 border border-blue-200 text-[#0056A6] text-xs font-mono font-bold uppercase tracking-wider">
            <Building2 className="w-3.5 h-3.5 text-[#0056A6]" />
            PARENT ENTERPRISE: NOOR ENGINEERING WORKS (EST. 1983)
          </span>

          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-slate-900">
            Four Decades of Engineering Reliability
          </h2>

          <p className="text-slate-600 text-sm sm:text-base leading-relaxed font-medium">
            Rooted in parent company <strong className="text-slate-900">Noor Engineering Works (Established 1983)</strong>, Northern HeatEx Corporation was formed by the next generation to serve private sector clients and expand export business globally. We manufacture, retube, and engineer high-pressure heat transfer equipment and pressure vessels under TPI clearance.
          </p>
        </div>

        {/* Interactive Industry Canvas */}
        <div className="bg-slate-50 border border-slate-200 rounded-2xl p-6 shadow-sm relative overflow-hidden">
          <div className="flex flex-wrap items-center justify-between gap-4 mb-4 border-b border-slate-200 pb-4">
            <div>
              <h3 className="text-sm font-bold text-[#0056A6] uppercase tracking-wider">
                Industrial Footprint & Operations
              </h3>
              <p className="text-xs text-slate-500 font-mono">
                Noor Engineering Works • Shastri Nagar, Near G.G.I. College, Jwalapur, Haridwar – 249407
              </p>
            </div>

            <div className="flex flex-wrap gap-2 text-xs">
              {regions.map((reg) => (
                <button
                  key={reg.name}
                  onClick={() => setActiveRegion(reg.name)}
                  className={`px-3 py-1.5 rounded-lg font-bold border transition cursor-pointer ${
                    activeRegion === reg.name
                      ? "bg-[#0056A6] text-white border-[#0056A6]"
                      : "bg-white text-slate-700 border-slate-200 hover:bg-slate-100"
                  }`}
                >
                  {reg.name}
                </button>
              ))}
            </div>
          </div>

          <div className="w-full h-[300px] relative rounded-xl overflow-hidden border border-slate-200">
            <canvas ref={canvasRef} className="w-full h-full" />

            <div className="absolute bottom-4 left-4 bg-white/95 backdrop-blur-md p-4 rounded-xl border border-slate-200 max-w-sm space-y-1 shadow-md">
              <span className="text-xs font-bold text-[#0056A6] block">{activeRegion}</span>
              <p className="text-xs text-slate-700">
                Units Fabricated: <strong className="text-slate-900">{regions.find((r) => r.name === activeRegion)?.projects}+ Exchangers</strong>
              </p>
              <div className="text-[11px] text-slate-500">
                Facilities: {regions.find((r) => r.name === activeRegion)?.hubs.join(" • ")}
              </div>
            </div>
          </div>
        </div>

        {/* Counter Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="bg-slate-50 p-6 rounded-2xl border border-slate-200 space-y-2">
            <div className="w-10 h-10 rounded-xl bg-blue-100 text-[#0056A6] flex items-center justify-center mb-2">
              <Award className="w-5 h-5" />
            </div>
            <div className="text-3xl font-black text-[#0056A6]">40+ Years</div>
            <div className="text-xs font-bold text-slate-800 uppercase tracking-wider">Established 1983</div>
            <p className="text-xs text-slate-600">
              Four decades serving India's government sector and heavy industry.
            </p>
          </div>

          <div className="bg-slate-50 p-6 rounded-2xl border border-slate-200 space-y-2">
            <div className="w-10 h-10 rounded-xl bg-cyan-100 text-[#00A6D6] flex items-center justify-center mb-2">
              <Factory className="w-5 h-5" />
            </div>
            <div className="text-3xl font-black text-slate-900">5,000+</div>
            <div className="text-xs font-bold text-slate-800 uppercase tracking-wider">Units Delivered</div>
            <p className="text-xs text-slate-600">
              Shell & tube heat exchangers, hydro turbine coolers, and retubed bundles.
            </p>
          </div>

          <div className="bg-slate-50 p-6 rounded-2xl border border-slate-200 space-y-2">
            <div className="w-10 h-10 rounded-xl bg-amber-100 text-amber-600 flex items-center justify-center mb-2">
              <Shield className="w-5 h-5" />
            </div>
            <div className="text-3xl font-black text-[#0056A6]">100% TPI</div>
            <div className="text-xs font-bold text-slate-800 uppercase tracking-wider">Third Party Inspection</div>
            <p className="text-xs text-slate-600">
              Verified by Lloyd's, TUV, BV, and leading agency inspectors.
            </p>
          </div>

          <div className="bg-slate-50 p-6 rounded-2xl border border-slate-200 space-y-2">
            <div className="w-10 h-10 rounded-xl bg-emerald-100 text-emerald-600 flex items-center justify-center mb-2">
              <Wrench className="w-5 h-5" />
            </div>
            <div className="text-3xl font-black text-slate-900">24/7 Service</div>
            <div className="text-xs font-bold text-slate-800 uppercase tracking-wider">Emergency Outages</div>
            <p className="text-xs text-slate-600">
              On-site retubing, tube expanding, and emergency field services.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};
