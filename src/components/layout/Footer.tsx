import React from "react";
import { useRouter } from "../../context/RouterContext";
import { CompanyLogo } from "../common/CompanyLogo";
import { ShieldCheck, Globe, Mail, Phone, MapPin, Building2, Flame } from "lucide-react";

export const Footer: React.FC = () => {
  const { navigate } = useRouter();

  return (
    <footer className="bg-slate-900 text-white text-sm mt-20 border-t border-slate-800">
      {/* Certifications Banner */}
      <div className="bg-[#003366] border-b border-blue-800/50 py-6 px-4">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-6">
          <div className="flex items-center gap-4">
            <div className="w-10 h-10 rounded-xl bg-white/10 border border-white/20 flex items-center justify-center shrink-0">
              <ShieldCheck className="w-6 h-6 text-amber-400" />
            </div>
            <div>
              <h4 className="text-white font-bold text-sm">
                Designed per ASME VIII Div 1 & TEMA Class R, C, B • ISO Certified & International Standards
              </h4>
              <p className="text-xs text-cyan-200 font-mono">
                Legacy: Noor Engineering Works (Est. 1996) • Northern HeatEx Corporation • Haridwar, Uttarakhand
              </p>
            </div>
          </div>
          <div className="flex flex-wrap items-center gap-3 font-mono text-xs text-white">
            <span className="px-3 py-1 bg-white/10 rounded-lg border border-white/20">ASME SEC VIII DIV 1</span>
            <span className="px-3 py-1 bg-white/10 rounded-lg border border-white/20">TEMA CLASS R / C / B</span>
            <span className="px-3 py-1 bg-white/10 rounded-lg border border-white/20">ISO CERTIFIED</span>
            <span className="px-3 py-1 bg-amber-500/20 text-amber-300 font-bold rounded-lg border border-amber-500/40">
              EST. 1996
            </span>
          </div>
        </div>
      </div>

      {/* Main Footer Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-8">
        {/* Brand Info */}
        <div className="lg:col-span-2 space-y-4">
          <div onClick={() => navigate("/")} className="cursor-pointer">
            <CompanyLogo variant="full" size="md" lightBackground={false} />
          </div>

          <p className="text-xs text-slate-300 leading-relaxed max-w-sm">
            For over four decades, <strong className="text-amber-300">Northern HeatEx Corporation</strong> (carrying forward the legacy of Noor Engineering Works, Est. 1996) has been the trusted engineering partner for power utilities, EPC contractors, and process industries worldwide.
          </p>

          <div className="pt-2 text-xs font-mono text-cyan-300 flex items-center gap-2">
            <Globe className="w-4 h-4 text-cyan-400" />
            <span>Haridwar Works, Uttarakhand, India</span>
          </div>
        </div>

        {/* Column 1: Equipment */}
        <div>
          <h5 className="text-amber-400 font-bold text-xs uppercase tracking-widest mb-4 font-mono">
            Equipment & Products
          </h5>
          <ul className="space-y-2 text-xs text-slate-300 font-mono">
            <li><button onClick={() => navigate("/products/shell-and-tube-heat-exchanger")} className="hover:text-amber-300">Shell & Tube Exchangers</button></li>
            <li><button onClick={() => navigate("/products/stator-air-cooler")} className="hover:text-amber-300">Stator Air Coolers</button></li>
            <li><button onClick={() => navigate("/products/bearing-oil-cooler")} className="hover:text-amber-300">Bearing Oil Coolers</button></li>
            <li><button onClick={() => navigate("/products/tube-bundle")} className="hover:text-amber-300">Replacement Bundles</button></li>
            <li><button onClick={() => navigate("/products/wire-wound-fin-tube")} className="hover:text-amber-300">Wire Wound Fin Tubes</button></li>
            <li><button onClick={() => navigate("/products/surface-condenser")} className="hover:text-amber-300">Surface Condensers</button></li>
          </ul>
        </div>

        {/* Column 2: Software & Tools */}
        <div>
          <h5 className="text-amber-400 font-bold text-xs uppercase tracking-widest mb-4 font-mono">
            Software & GST Tools
          </h5>
          <ul className="space-y-2 text-xs text-slate-300 font-mono">
            <li><button onClick={() => navigate("/software/thermal-design")} className="hover:text-amber-300">Thermal Calculator</button></li>
            <li><button onClick={() => navigate("/software/mechanical-design")} className="hover:text-amber-300">ASME Mechanical Studio</button></li>
            <li><button onClick={() => navigate("/software/gst-calculator")} className="hover:text-amber-300">Indian GST Calculator</button></li>
            <li><button onClick={() => navigate("/software/hsn-finder")} className="hover:text-amber-300">HSN 8419 Search</button></li>
            <li><button onClick={() => navigate("/software/cost-estimator")} className="hover:text-amber-300">Quotation Builder</button></li>
            <li><button onClick={() => navigate("/software/drawing-generator")} className="hover:text-amber-300">2D CAD Generator</button></li>
          </ul>
        </div>

        {/* Column 3: Corporate & Portals */}
        <div>
          <h5 className="text-amber-400 font-bold text-xs uppercase tracking-widest mb-4 font-mono">
            Corporate & Portals
          </h5>
          <ul className="space-y-2 text-xs text-slate-300 font-mono">
            <li><button onClick={() => navigate("/company")} className="hover:text-amber-300">Company Overview</button></li>
            <li><button onClick={() => navigate("/company/quality")} className="hover:text-amber-300">ASME & TPI Quality</button></li>
            <li><button onClick={() => navigate("/customer")} className="hover:text-amber-300">Client Portal Login</button></li>
            <li><button onClick={() => navigate("/admin")} className="hover:text-amber-300">Admin Operations</button></li>
            <li><button onClick={() => navigate("/careers")} className="hover:text-amber-300">Careers & Hiring</button></li>
            <li><button onClick={() => navigate("/resources")} className="hover:text-amber-300">Knowledge Centre</button></li>
          </ul>
        </div>

        {/* Column 4: Contact & Location */}
        <div>
          <h5 className="text-amber-400 font-bold text-xs uppercase tracking-widest mb-4 font-mono">
            Haridwar Works
          </h5>
          <ul className="space-y-3 text-xs text-slate-300">
            <li className="flex items-start gap-2">
              <MapPin className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
              <span>Shastri Nagar, Jwalapur, Haridwar, Uttarakhand - 249407, India</span>
            </li>
            <li className="flex items-start gap-2">
              <Phone className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
              <div className="space-y-0.5 font-mono text-[11px]">
                <div>+91 97603 62826</div>
                <div>+91 95575 65742</div>
                <div>+91 85328 23883</div>
              </div>
            </li>
            <li className="flex items-start gap-2">
              <Mail className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
              <div className="space-y-0.5 font-mono text-[11px]">
                <div>info@northernheatex.co.in</div>
                <div>northernheatex@outlook.in</div>
              </div>
            </li>
          </ul>
        </div>
      </div>

      {/* Legal & Copyright Bottom Bar */}
      <div className="bg-slate-950 py-4 border-t border-slate-800 text-xs text-slate-400 font-mono text-center">
        <div className="max-w-7xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p>© {new Date().getFullYear()} Northern HeatEx Corporation • Legacy: Noor Engineering Works (Est. 1996). All Rights Reserved.</p>
          <div className="flex gap-4 text-slate-400">
            <button onClick={() => navigate("/privacy")} className="hover:text-white">Privacy Policy</button>
            <button onClick={() => navigate("/terms")} className="hover:text-white">Terms & Conditions</button>
            <button onClick={() => navigate("/disclaimer")} className="hover:text-white">Engineering Disclaimer</button>
          </div>
        </div>
      </div>
    </footer>
  );
};
