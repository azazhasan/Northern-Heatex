import React, { useState } from "react";
import { 
  Flame, Layers, Wrench, ShieldAlert, Cpu, Settings, Zap, ArrowRight, X, Check, FileText 
} from "lucide-react";

export interface SolutionItem {
  id: string;
  title: string;
  subtitle: string;
  category: string;
  description: string;
  specs: string[];
  features: string[];
  asmeCode: string;
  applications: string;
  iconName: string;
}

export const SOLUTIONS_LIST: SolutionItem[] = [
  {
    id: "shell-tube",
    title: "Shell & Tube Heat Exchangers",
    subtitle: "TEMA Class R, C & B Coded Pressure Vessels",
    category: "Heat Transfer Equipment",
    description: "High-pressure, heavy-duty shell and tube exchangers engineered to exact TEMA and ASME Section VIII Division 1 & 2 requirements.",
    specs: ["Pressure: Up to 350 Bar", "Temperature: -196°C to +850°C", "Diameter: 200mm to 3,500mm"],
    features: ["Fixed Tubesheet (BEM, NEN)", "Floating Head (AES, AEP)", "U-Tube Bundle (BEU)"],
    asmeCode: "ASME Section VIII Div 1 & 2 • TEMA Class R • API 660",
    applications: "Oil & Gas Refineries, Petrochemical Plants, Power Generation",
    iconName: "Flame",
  },
  {
    id: "wire-wound-fin",
    title: "Wire Wound Fin Tubes",
    subtitle: "High-Turbulence Enhanced Extended Surface",
    category: "Specialized Tubing",
    description: "Patented wire-loop wound tubing providing up to 4x heat transfer coefficient improvement in viscous oil and gas cooling applications.",
    specs: ["Tube OD: 12.7mm to 38.1mm", "Wire Material: Copper, Stainless, Monel", "Loop Height: 6mm to 18mm"],
    features: ["Boundary layer destruction", "Low pressure drop ratio", "Self-cleaning turbulence"],
    asmeCode: "ASME B31.1 / B31.3",
    applications: "Turbine Lube Oil Coolers, Transformer Oil Coolers, Compressor Coolers",
    iconName: "Zap",
  },
  {
    id: "strip-wound-fin",
    title: "Strip Wound Fin Coolers",
    subtitle: "Heavy Industrial Air-Cooled Heat Exchangers",
    category: "Air Cooling Solutions",
    description: "Continuous helical strip-wound finned tubes for high-duty air-cooled heat exchangers (ACHE) and radiator banks.",
    specs: ["Fin Density: 230 - 450 fins/m", "Tube Materials: Carbon Steel, Stainless 316L, CuNi", "Fin Material: Aluminum 1100 / Copper"],
    features: ["Embedded G-Fin & L-Fin styles", "Extruded bi-metallic options", "High vibration resistance"],
    asmeCode: "API 661 / ISO 13706",
    applications: "Gas Compression Stations, Power Plant Steam Condensers",
    iconName: "Layers",
  },
  {
    id: "bearing-oil-coolers",
    title: "Bearing Oil Coolers",
    subtitle: "Turbine & Generator Lube Oil Thermal Management",
    category: "Power Plant Components",
    description: "Precision-manufactured shell & tube or submerged oil coolers designed to prevent thermal breakdown of bearing lubricant.",
    specs: ["Shell Diameter: 150mm to 1200mm", "Dual Oil Circuit Design", "Zero-Leakage Assurance"],
    features: ["Double tube-sheet safety barrier", "Removable bundle for cleaning", "Cu-Ni 90/10 or Titanium tubes"],
    asmeCode: "ASME Sec VIII • HEI Standards",
    applications: "Steam Turbines, Hydro Turbines, Heavy Industrial Gearboxes",
    iconName: "Cpu",
  },
  {
    id: "stator-air-coolers",
    title: "Stator Air & Hydrogen Coolers",
    subtitle: "Generator Stator Winding Thermal Exchangers",
    category: "Turbine Generator Equipment",
    description: "Direct replacement and custom engineered stator air and hydrogen coolers for power plant synchronous generators.",
    specs: ["Cooling Media: Demineralized Water / Air / H2", "High Thermal Efficiency", "Compact Envelope"],
    features: ["Extruded aluminum/copper fins", "Sectionalized tube rows", "Non-magnetic frame construction"],
    asmeCode: "ASME Sec VIII • IEC 60034",
    applications: "Thermal Power Plants, Nuclear Generators, Hydroelectric Plants",
    iconName: "Zap",
  },
  {
    id: "tube-bundles",
    title: "Replacement Tube Bundles",
    subtitle: "Drop-In Exact Match Re-Bundling",
    category: "Refurbishment & Spare Parts",
    description: "Rapid fabrication of drop-in replacement tube bundles matching exact dimensional envelopes and thermal duties of OEM units.",
    specs: ["Custom Tubesheets", "CNC Baffle Plate Drilling", "Hydrotested to 1.5x MAWP"],
    features: ["Reverse engineered drawings", "Emergency 48-72 hour turnarounds", "Enhanced tube-to-tubesheet joints"],
    asmeCode: "ASME Sec VIII Div 1 Design Rules • TPI Inspected",
    applications: "Scheduled Turnarounds, Emergency Plant Outages",
    iconName: "Wrench",
  },
  {
    id: "surface-condensers",
    title: "Steam Surface Condensers",
    subtitle: "High-Vacuum Main Turbine Condensing Systems",
    category: "Power Generation Systems",
    description: "Large-scale utility and industrial steam surface condensers designed according to HEI standards for maximum vacuum efficiency.",
    specs: ["Steam Duty: Up to 500 MW", "Shell Construction: Fabricated Carbon Steel", "Tubes: Titanium Gr.2 / CuNi"],
    features: ["Deaerating hotwell design", "Modular shop fabrication", "Air removal bundle optimization"],
    asmeCode: "HEI Standards • ASME Section VIII",
    applications: "Nuclear Power Plants, Utility Steam Turbines, Biomass Plants",
    iconName: "Flame",
  },
  {
    id: "retubing-services",
    title: "Field Retubing & Emergency Outage",
    subtitle: "On-Site Mobile Field Refurbishment Teams",
    category: "Field Engineering Services",
    description: "Complete field retubing, tube extraction, hydraulic expanding, and seal/strength welding services deployed 24/7 across India.",
    specs: ["Hydraulic Expansion up to 30,000 PSI", "Eddy Current NDE Testing", "Helium Leak Detection"],
    features: ["24/7 Rapid Outage Response", "Mobile Machining Trailer Units", "Third Party Inspection Clearance"],
    asmeCode: "ASME VIII Div 1 Rules • TPI Inspected",
    applications: "Onsite Refinery Maintenance, Nuclear Plant Refueling Outages",
    iconName: "ShieldAlert",
  },
  {
    id: "hydro-turbine",
    title: "Hydro Turbine Components",
    subtitle: "Runner Hubs, Shaft Sleeves & Wicket Gate Coolers",
    category: "Hydroelectric Equipment",
    description: "Precision-machined hydroelectric turbine sub-assemblies, guide bearing coolers, and stainless steel wear rings.",
    specs: ["Machining Diameter: Up to 4.5 Meters", "Materials: 13-4 Stainless, 316L, Bronze", "Tolerance: ±0.012 mm"],
    features: ["Hydrodynamic oil film cooling", "Corrosion resistant overlays", "Dynamic balancing"],
    asmeCode: "ISO 9001:2015 Registered",
    applications: "Kaplan, Francis, and Pelton Hydroelectric Stations",
    iconName: "Settings",
  },
  {
    id: "reverse-engineering",
    title: "3D Laser Scanning & Reverse Engineering",
    subtitle: "OEM Blueprint Reconstruction",
    category: "Engineering Services",
    description: "High-precision 3D FARO laser scanning and metallurgical failure analysis to reconstruct legacy, obsolete OEM heat exchanger designs.",
    specs: ["Point Cloud Accuracy: ±0.025 mm", "Material Alloy PMI Spectroscopy", "3D CAD Model Export (STEP, DWG)"],
    features: ["Thermal re-rating", "Fouling mitigation upgrades", "Exact bolt hole matching"],
    asmeCode: "ASME Code Re-Rating",
    applications: "Obsolete Plant Equipment, Legacy OEM Replacement",
    iconName: "Cpu",
  },
  {
    id: "babbitt-bearings",
    title: "White Metal Bearing Re-Babbitting",
    subtitle: "Centrifugal Cast ASTM B23 Grade 2/3 Babbitt",
    category: "Precision Machining",
    description: "Centrifugally cast white metal babbitt re-lining and precision CNC machining for heavy power plant journal and thrust bearings.",
    specs: ["Journal Diameters: 100mm to 1800mm", "Ultrasonic Bond Testing (UT)", "100% Defect-Free Bond"],
    features: ["Centrifugal casting process", "Oil groove precision milling", "Tilt-pad bearing restoration"],
    asmeCode: "ASTM B23 / ISO 4381",
    applications: "Steam Turbine Shaft Bearings, Hydro Generators, Heavy Mills",
    iconName: "Settings",
  },
  {
    id: "precision-machining",
    title: "CNC Tube Sheet & Flange Machining",
    subtitle: "Heavy Duty 5-Axis CNC Machining Center",
    category: "Manufacturing Services",
    description: "High-accuracy CNC drilling, grooving, and face machining for massive tubesheets, baffles, and heavy pressure vessel flanges.",
    specs: ["Thickness: Up to 350 mm", "Diameter: Up to 4,000 mm", "Hole Pitch Tolerance: ±0.01 mm"],
    features: ["Triple-grooved tube holes", "Serration flange facing", "5-Axis CNC deep hole drilling"],
    asmeCode: "ASME Section VIII Div 1 & 2",
    applications: "Heavy Pressure Vessel Fabrication, OEM Machining Subcontracts",
    iconName: "Wrench",
  },
];

export const OurSolutionsSection: React.FC = () => {
  const [selectedSolution, setSelectedSolution] = useState<SolutionItem | null>(null);

  return (
    <section id="solutions" className="py-16 bg-[#F8FAFC] text-slate-900 border-t border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        {/* Header */}
        <div className="flex flex-wrap items-end justify-between gap-6 border-b border-slate-200 pb-6">
          <div className="max-w-2xl space-y-2">
            <span className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-50 border border-blue-200 text-[#0056A6] text-xs font-mono font-bold uppercase tracking-wider">
              <Layers className="w-3.5 h-3.5 text-[#0056A6]" />
              Engineering Portfolio
            </span>

            <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-slate-900">
              Core Equipment & Manufacturing Capabilities
            </h2>
          </div>

          <p className="text-xs font-mono text-slate-500 max-w-sm">
            Click any equipment card for ASME compliance specifications, tube materials, and TPI inspection standards.
          </p>
        </div>

        {/* 12 Solutions Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {SOLUTIONS_LIST.map((item) => (
            <div
              key={item.id}
              onClick={() => setSelectedSolution(item)}
              className="bg-white border border-slate-200 rounded-2xl p-6 hover:border-[#0056A6] hover:shadow-md transition duration-200 cursor-pointer flex flex-col justify-between group relative overflow-hidden"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-mono px-2.5 py-1 bg-slate-100 text-[#0056A6] rounded border border-slate-200 font-bold uppercase">
                    {item.category}
                  </span>
                  <div className="w-8 h-8 rounded-lg bg-blue-50 border border-blue-200 flex items-center justify-center text-[#0056A6]">
                    <Flame className="w-4 h-4" />
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-bold text-slate-900 group-hover:text-[#0056A6] transition">
                    {item.title}
                  </h3>
                  <p className="text-xs font-mono text-[#00A6D6]">{item.subtitle}</p>
                </div>

                <p className="text-xs text-slate-600 leading-relaxed line-clamp-3">
                  {item.description}
                </p>

                <ul className="space-y-1 pt-3 border-t border-slate-100 text-[11px] font-mono text-slate-700">
                  {item.specs.map((sp, i) => (
                    <li key={i} className="flex items-center gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#0056A6] shrink-0"></span>
                      <span>{sp}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="pt-5 flex items-center justify-between text-xs font-mono text-[#0056A6] font-bold group-hover:translate-x-1 transition">
                <span>View Details</span>
                <ArrowRight className="w-4 h-4" />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Expanded Solution Detail Modal */}
      {selectedSolution && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
          <div className="bg-white border border-slate-200 rounded-3xl max-w-2xl w-full p-6 sm:p-8 space-y-6 shadow-2xl relative text-slate-900 my-8">
            <button
              onClick={() => setSelectedSolution(null)}
              className="absolute top-6 right-6 w-9 h-9 rounded-full bg-slate-100 hover:bg-slate-200 flex items-center justify-center text-slate-600 transition cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="space-y-2">
              <span className="text-xs font-mono px-3 py-1 bg-blue-50 text-[#0056A6] rounded border border-blue-200 font-bold uppercase">
                {selectedSolution.category}
              </span>
              <h3 className="text-2xl sm:text-3xl font-extrabold text-slate-900">
                {selectedSolution.title}
              </h3>
              <p className="text-xs font-mono text-[#00A6D6]">{selectedSolution.subtitle}</p>
            </div>

            <p className="text-sm text-slate-700 leading-relaxed">
              {selectedSolution.description}
            </p>

            <div className="space-y-3 bg-slate-50 p-4 rounded-xl border border-slate-200">
              <h4 className="text-xs font-mono text-[#0056A6] uppercase font-bold tracking-wider flex items-center gap-2">
                <FileText className="w-4 h-4 text-[#0056A6]" />
                Technical Parameters
              </h4>
              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs font-mono text-slate-800">
                {selectedSolution.specs.map((sp, i) => (
                  <li key={i} className="flex items-center gap-2 bg-white p-2 rounded border border-slate-200">
                    <Check className="w-3.5 h-3.5 text-[#0056A6] shrink-0" />
                    <span>{sp}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="space-y-2">
              <h4 className="text-xs font-mono text-slate-800 uppercase font-bold tracking-wider">
                Key Features
              </h4>
              <ul className="space-y-1 text-xs text-slate-700 font-mono">
                {selectedSolution.features.map((ft, i) => (
                  <li key={i} className="flex items-center gap-2">
                    <Zap className="w-3.5 h-3.5 text-[#00A6D6] shrink-0" />
                    <span>{ft}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs font-mono border-t border-slate-200 pt-4">
              <div>
                <span className="text-slate-500 block text-[10px] uppercase">Design Codes</span>
                <span className="text-[#0056A6] font-bold">{selectedSolution.asmeCode}</span>
              </div>
              <div>
                <span className="text-slate-500 block text-[10px] uppercase">Primary Industries</span>
                <span className="text-slate-900 font-bold">{selectedSolution.applications}</span>
              </div>
            </div>

            <div className="pt-2 flex justify-end gap-3">
              <button
                onClick={() => setSelectedSolution(null)}
                className="bg-slate-100 hover:bg-slate-200 text-slate-800 px-5 py-2.5 rounded-xl text-xs font-mono font-semibold transition cursor-pointer"
              >
                Close
              </button>
              <a
                href="#inquiry"
                onClick={() => setSelectedSolution(null)}
                className="bg-[#0056A6] hover:bg-blue-700 text-white font-bold px-6 py-2.5 rounded-xl text-xs font-mono uppercase tracking-wider transition cursor-pointer"
              >
                Request Quotation →
              </a>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
