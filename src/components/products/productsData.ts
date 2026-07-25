export interface ProductCategoryData {
  id: string;
  title: string;
  subtitle: string;
  categoryTag: string;
  badgeText: string;
  overview: string;
  workingPrinciple: string;
  quickStats: { label: string; value: string; detail: string }[];
  applications: { title: string; desc: string; industry: string }[];
  engineeringFeatures: { title: string; desc: string }[];
  availableConfigurations: string[];
  materialsOptions: { material: string; grade: string; application: string; corrosionRating: string }[];
  asmeStandards: string[];
  manufacturingQC: string[];
  operatingLimits: { maxPressureBar: number; maxTempC: number; maxFlowM3h: number; surfaceAreaM2: string };
  faqs: { q: string; a: string }[];
  downloads: { title: string; format: string; size: string; docType: string }[];
  calculatorPreset: { hotTempIn: number; hotTempOut: number; coldTempIn: number; coldTempOut: number; defaultPressure: number };
}

export const PRODUCTS_DATABASE: ProductCategoryData[] = [
  {
    id: "shell-and-tube",
    title: "Shell & Tube Heat Exchangers",
    subtitle: "TEMA Class R, C & B Certified Heavy-Duty Industrial Process Units",
    categoryTag: "Process & Refineries",
    badgeText: "ASME VIII Div 1 & 2 • TEMA Type BEM / AES / BEU / AKT",
    overview: "Northern HeatEx Shell & Tube Heat Exchangers are the flagship workhorse of global power plants, petrochemical refineries, and LNG terminals. Engineered strictly to TEMA Class R, C, and B standards and ASME Section VIII Division 1 & 2 codes, these units are custom-built to withstand severe thermal fatigue, cyclic pressures up to 350 bar, and highly corrosive fluid media.",
    workingPrinciple: "Heat transfer occurs across conductive metal tube walls separating two isolated fluid streams. High-pressure tube-side fluid flows inside a multi-pass bundle, while shell-side fluid flows across precision-spaced segmental or helical baffles. Baffle geometry induces turbulent cross-flow, maximizing overall thermal heat transfer coefficient (U) while maintaining controlled shell-side pressure drop.",
    quickStats: [
      { label: "Design Pressure", value: "Up to 350 Bar", detail: "ASME VIII Div 2 Certified" },
      { label: "Operating Temp", value: "-196°C to +850°C", detail: "Cryogenic to Extreme Heat" },
      { label: "Shell Diameters", value: "150mm - 3,200mm", detail: "Single or Multi-Shell Units" },
      { label: "Thermal Duty", value: "Up to 120 MW", detail: "Per Shell Assembly" }
    ],
    applications: [
      { title: "Refinery Hydrotreating & Reboilers", desc: "High-pressure, high-temperature crude oil fractions and amine gas treating.", industry: "Oil & Gas" },
      { title: "Combined Cycle Power Condensers", desc: "Steam condensing and boiler feedwater preheating in heavy power generation.", industry: "Power Generation" },
      { title: "Chemical Reactor Feed Cooling", desc: "Corrosive acid and organic synthesis heat removal using Hastelloy and Titanium bundles.", industry: "Chemical Processing" },
      { title: "Offshore Gas Dehydration", desc: "High-pressure gas cooling and glycol heat exchangers on FPSO vessels.", industry: "Offshore & Marine" }
    ],
    engineeringFeatures: [
      { title: "TEMA Precision Baffling", desc: "Single, double, or triple segmental baffles, as well as RODbaffle systems to eliminate flow-induced vibration." },
      { title: "Explosion-Welded Tubesheets", desc: "Clad tubesheets combining SA-516 Gr 70 backing plates with Titanium or Inconel cladding for high-pressure isolation." },
      { title: "Hydraulic Tube Expansion", desc: "Controlled 2-step hydraulic tube expansion guaranteeing zero joint leakage under cyclic thermal shocks." },
      { title: "Finite Element Thermal Stress Analysis", desc: "ANSYS FEA verification of tubesheet thickness, nozzle loads, and differential expansion stresses." }
    ],
    availableConfigurations: ["TEMA BEM (Fixed Tubesheet)", "TEMA AES (Split Ring Floating Head)", "TEMA BEU (U-Tube Bundle)", "TEMA AKT (Kettle Reboiler)", "TEMA NEN (Integral Head)"],
    materialsOptions: [
      { material: "Carbon Steel", grade: "SA-516 Gr 70 / SA-106 Gr B", application: "Standard Hydrocarbon & Cooling Water", corrosionRating: "Moderate" },
      { material: "Stainless Steel", grade: "SA-240 316/316L & 304/304L", application: "Process Fluids & Clean Condensate", corrosionRating: "High" },
      { material: "Duplex Stainless", grade: "UNS S32205 / S32750 (Super Duplex)", application: "Seawater & High Chloride Streams", corrosionRating: "Superior" },
      { material: "Nickel Alloys", grade: "Inconel 625 / Hastelloy C-276", application: "Extreme Acid & H2S Sour Gas", corrosionRating: "Maximum" },
      { material: "Titanium", grade: "SB-265 Grade 2 & Grade 12", application: "Direct Marine Seawater Cooling", corrosionRating: "Impervious to Chlorides" }
    ],
    asmeStandards: ["ASME Section VIII Div 1 & Div 2", "TEMA Class R, C, and B", "API 660 (Shell & Tube for Petroleum Services)", "PED 2014/68/EU CE Marking", "NACE MR0175 / ISO 15156 (Sour Service Compliance)"],
    manufacturingQC: ["100% Radiographic Testing (RT) of pressure welds", "Positive Material Identification (PMI) with XRF analyzers", "Helium Mass Spectrometer Leak Testing (<10⁻⁹ mbar·l/s)", "Hydrostatic pressure testing up to 1.5x design pressure"],
    operatingLimits: { maxPressureBar: 350, maxTempC: 850, maxFlowM3h: 8500, surfaceAreaM2: "5,500 m² per unit" },
    faqs: [
      { q: "What is the primary difference between TEMA BEM and AES models?", a: "BEM features fixed tubesheets welded directly to the shell, making it economical but restricted to clean fluids. AES features a split-ring floating head that accommodates thermal expansion and allows complete withdrawal of the tube bundle for mechanical cleaning." },
      { q: "How do you mitigate tube vibration caused by cross-flow?", a: "We utilize proprietary HTRI vibration analysis software to calculate fluidelastic instability and vortex shedding frequencies. If critical thresholds are met, we integrate intermediate support plates or RODbaffle geometry." }
    ],
    downloads: [
      { title: "Shell & Tube Engineering Specification Sheet", format: "PDF", size: "3.4 MB", docType: "Technical Manual" },
      { title: "TEMA Type Selection & GA Drawing Template", format: "DXF", size: "8.1 MB", docType: "CAD Model" },
      { title: "ASME VIII Div 2 Compliance Dossier", format: "PDF", size: "1.9 MB", docType: "Certification" }
    ],
    calculatorPreset: { hotTempIn: 180, hotTempOut: 85, coldTempIn: 25, coldTempOut: 65, defaultPressure: 45 }
  },
  {
    id: "tube-bundles",
    title: "Tube Bundles & Replacement Cores",
    subtitle: "Precision-Machined Replacement Bundles for Existing Shell Assemblies",
    categoryTag: "Maintenance & Retrofits",
    badgeText: "Direct Drop-In Replacement • Straight & U-Tube • Rapid Turnaround",
    overview: "Northern HeatEx supplies direct-fit replacement tube bundles and custom engineering cores for all major OEM shell & tube heat exchangers. Engineered to exact dimensional tolerances, our replacement bundles restore degraded thermal efficiency, eliminate chronic tube leaks, and upgrade metallurgy without requiring modifications to existing plant piping or shell structures.",
    workingPrinciple: "A pre-assembled structural core consisting of precision-drilled tubesheets, support baffles, tie rods, spacer tubes, and a dense array of straight or U-bent tubes. The bundle slides directly into the existing shell housing, sealing against high-pressure gaskets or floating head split rings.",
    quickStats: [
      { label: "Turnaround Time", value: "7 to 14 Days", detail: "Emergency Shutdown Expedite" },
      { label: "Bundle Diameter", value: "Up to 3,000mm", detail: "Exact OEM Match Guarantee" },
      { label: "Tube Length", value: "Up to 12.2 Meters", detail: "Straight or U-Bent Precision" },
      { label: "Tube Joint Seal", value: "Strength Welded", detail: "Or 2-Step Hydraulic Expansion" }
    ],
    applications: [
      { title: "Refinery Turnaround Bundle Swaps", desc: "Emergency or scheduled replacement during plant outages to restore crude heat exchanger trains.", industry: "Refining" },
      { title: "Power Plant Condenser Re-Tubing", desc: "Replacing copper-nickel tube bundles with High-Grade Titanium or Super Duplex for extended service life.", industry: "Power Generation" },
      { title: "FPSO Module Bundle Upgrades", desc: "Metallurgy upgrades to Titanium Grade 2 for sour oil processing platforms.", industry: "Offshore" }
    ],
    engineeringFeatures: [
      { title: "Laser Tube Sheet Hole Profiling", desc: "Sub-millimeter CNC drilling with serrated grooves for ultra-tight tube expansion sealing." },
      { title: "Precision U-Bend Stress Relieving", desc: "Induction heat treatment of small-radius U-bends to eliminate stress corrosion cracking." },
      { title: "Custom Baffle Cage Stiffening", desc: "Heavy-duty tie rod arrangements to prevent bundle collapse during crane lifting and installation." }
    ],
    availableConfigurations: ["Straight Tube Fixed Bundle", "Straight Tube Pull-Through Floating Head", "U-Tube Removable Bundle", "High-Finned External Tube Core"],
    materialsOptions: [
      { material: "Titanium SB-338 Gr 2", grade: "ASTM B338 Grade 2", application: "Severe Seawater Cooling", corrosionRating: "Impervious" },
      { material: "Super Duplex UNS S32750", grade: "SA-789 / SA-790", application: "High Pressure Chloride Streams", corrosionRating: "Superior" },
      { material: "CuNi 90/10 & 70/30", grade: "SB-111 C70600 / C71500", application: "Marine Heat Exchanger Retrofits", corrosionRating: "Good Marine" }
    ],
    asmeStandards: ["ASME Section VIII Div 1", "TEMA Class R & C", "API 660 Tube Joint Requirements"],
    manufacturingQC: ["100% Eddy Current Testing (ECT) of all individual tubes", "Pneumatic bubble leak test under water", "Hydrostatic bundle test on custom test rings"],
    operatingLimits: { maxPressureBar: 300, maxTempC: 650, maxFlowM3h: 6000, surfaceAreaM2: "4,200 m²" },
    faqs: [
      { q: "Can Northern HeatEx reverse-engineer an OEM bundle without original drawings?", a: "Yes. Our field service team uses 3D laser scanning technology to scan the existing tubesheets, baffle spacing, and shell geometry on-site, producing precision CAD manufacturing models within 24 hours." }
    ],
    downloads: [
      { title: "Tube Bundle Measuring & Specification Guide", format: "PDF", size: "2.1 MB", docType: "Field Guide" }
    ],
    calculatorPreset: { hotTempIn: 150, hotTempOut: 70, coldTempIn: 30, coldTempOut: 60, defaultPressure: 30 }
  },
  {
    id: "air-cooled",
    title: "Air-Cooled Heat Exchangers (Fin-Fan)",
    subtitle: "API 661 Certified Forced & Induced Draft Heavy Air Cooling Systems",
    categoryTag: "Power & Gas Transmission",
    badgeText: "API 661 / ISO 13706 • High-Thermal High-Finned Tube Technology",
    overview: "Designed for locations with limited water availability or severe environmental regulations, Northern HeatEx Air-Cooled Heat Exchangers (ACHE) utilize ambient air moved by large axial fans over finned tube bundles. Built to API 661 and ISO 13706 standards, these units handle high-pressure process gas, lube oil, and steam condensing in remote desert and arctic operating environments.",
    workingPrinciple: "Process fluid flows inside horizontally mounted finned tube banks while high-efficiency axial fans blow (forced draft) or pull (induced draft) vast volumes of ambient air across the external aluminum extruded or embedded finned surface, dissipating thermal energy directly into the atmosphere.",
    quickStats: [
      { label: "Bay Width", value: "Up to 12.5 Meters", detail: "Multi-Fan Modular Structure" },
      { label: "Design Pressure", value: "Up to 450 Bar", detail: "Plug Header or Split Header" },
      { label: "Fin Technology", value: "Extruded / Embedded G-Fin", detail: "Maximum Thermal Contact" },
      { label: "Noise Rating", value: "<72 dBA @ 1 Meter", detail: "Ultra-Low Noise Fan Blades" }
    ],
    applications: [
      { title: "Gas Pipeline Compressor Station Cooling", desc: "Cooling compressed natural gas downstream of turbine compressor units.", industry: "Gas Transmission" },
      { title: "Steam Turbine Air Cooled Condensers (ACC)", desc: "Direct dry steam condensing in zero-water power plants.", industry: "Power Generation" },
      { title: "Refining Fractionation Overhead Coolers", desc: "Cooling hydrocarbon vapor streams without water treatment overheads.", industry: "Oil & Gas" }
    ],
    engineeringFeatures: [
      { title: "API 661 Removable Plug Headers", desc: "Forged steel box headers with threaded plug access for individual tube cleaning and inspection." },
      { title: "Bimetallic Extruded Fin Tubes", desc: "Aluminum outer sleeve extruded over high-alloy core tube, completely encasing the tube to prevent galvanic corrosion." },
      { title: "VFD Automated Louvers & Anti-Recirculation", desc: "Motorized louver control for precise temperature regulation in freezing winter conditions." }
    ],
    availableConfigurations: ["Forced Draft Bay Arrangement", "Induced Draft Bay Arrangement", "V-Frame Recalcitrant Structure", "Recirculating Winterized Chamber"],
    materialsOptions: [
      { material: "Carbon Steel Header / CS Tube", grade: "SA-214 / SA-179 / SA-516 70", application: "Standard Process Cooling", corrosionRating: "Standard" },
      { material: "Stainless Steel Tube / Al Fin", grade: "316L / Aluminum 1100", application: "Corrosive Gas & Condensate", corrosionRating: "High" },
      { material: "Incoloy 825 Header", grade: "UNS N08825", application: "High Temperature H2S / CO2", corrosionRating: "Maximum" }
    ],
    asmeStandards: ["API 661 / ISO 13706", "ASME VIII Div 1", "AWS D1.1 / Structural Welding Standards"],
    manufacturingQC: ["Dynamic fan balancing to ISO 1940 Grade G2.5", "100% NDT on header box welds", "Air-flow velocity profile testing across finned bays"],
    operatingLimits: { maxPressureBar: 450, maxTempC: 400, maxFlowM3h: 12000, surfaceAreaM2: "85,000 m² finned area" },
    faqs: [
      { q: "When should forced draft be selected over induced draft?", a: "Forced draft locates the fans below the tube bundle, making maintenance easier and extending motor life because fans operate in cool ambient air. Induced draft mounts fans above the bundle, offering better air distribution and protection against rain/hail." }
    ],
    downloads: [
      { title: "Air Cooled Heat Exchanger API 661 Data Sheet", format: "PDF", size: "4.2 MB", docType: "Catalog" }
    ],
    calculatorPreset: { hotTempIn: 120, hotTempOut: 50, coldTempIn: 30, coldTempOut: 45, defaultPressure: 80 }
  },
  {
    id: "plate-and-frame",
    title: "Plate & Frame Heat Exchangers",
    subtitle: "Gasketed, Semi-Welded & All-Welded High Efficiency Compact Thermal Units",
    categoryTag: "Chemical & HVAC",
    badgeText: "High Heat Transfer Coefficient • Compact Footprint • Easy Maintenance",
    overview: "Northern HeatEx Plate & Frame Heat Exchangers deliver thermal performance up to 5x higher than traditional shell & tube exchangers while requiring only 20% of the physical installation space. Available in gasketed, semi-welded, and brazed architectures, these units are ideal for duties demanding tight temperature approaches down to 1°C.",
    workingPrinciple: "Thin, corrugated metal plates clamped between a fixed frame and movable pressure plate form narrow channel passages. Hot and cold media flow through alternating channels in true counter-current direction. Corrugations induce intense micro-turbulence at low Reynolds numbers, inhibiting fouling and maximizing thermal duty.",
    quickStats: [
      { label: "Heat Transfer U", value: "Up to 7,500 W/m²K", detail: "5x Shell & Tube Rate" },
      { label: "Temp Approach", value: "Down to 1.0°C", detail: "Optimal Heat Recovery" },
      { label: "Plate Thickness", value: "0.4mm to 0.8mm", detail: "High Grade Alloys" },
      { label: "Max Flow Rate", value: "Up to 4,800 m³/h", detail: "Single Frame Size" }
    ],
    applications: [
      { title: "District Heating & Cooling Sub-Stations", desc: "Centralized HVAC thermal exchange separating building loops from city mains.", industry: "HVAC" },
      { title: "Chemical Acid Concentration & Recovery", desc: "Handling concentrated nitric and sulfuric acids using pure Tantalum or Titanium plates.", industry: "Chemical" },
      { title: "Dairy & Beverage Pasteurization", desc: "Sanitary stainless steel plates with FDA approved gaskets for heat treatment.", industry: "Food & Pharma" }
    ],
    engineeringFeatures: [
      { title: "OptiWave™ Plate Patterning", desc: "Computer-optimized herringbone pattern ensuring uniform fluid distribution across the entire width of the plate." },
      { title: "Clip-On Glueless Gaskets", desc: "Easy maintenance interlocking gaskets that snap securely into plate channels without chemical adhesives." },
      { title: "Non-Symmetric Channel Alignment", desc: "Adjustable channel gaps allowing asymmetric flow ratios between hot and cold media." }
    ],
    availableConfigurations: ["Gasketed Plate & Frame", "Semi-Welded (Laser Pair for Refrigerants)", "Brazed Stainless/Copper Compact Unit", "Welded Block Plate Exchanger"],
    materialsOptions: [
      { material: "Titanium Gr 1", grade: "ASTM B265 Grade 1", application: "Seawater & Brine Systems", corrosionRating: "Impervious" },
      { material: "Hastelloy C-276", grade: "UNS N10276", application: "Severe Organic Acid Processing", corrosionRating: "Maximum" },
      { material: "316L Stainless Steel", grade: "AISI 316L / 1.4404", application: "General Chemical & HVAC", corrosionRating: "Good" }
    ],
    asmeStandards: ["ASME VIII Div 1", "AHRI 400 Certified Performance", "FDA 21 CFR Sanitary Compliance"],
    manufacturingQC: ["Liquid penetrant testing on plate pressings", "Helium leak detection on semi-welded cassettes", "Hydrostatic frame pressure testing up to 25 bar"],
    operatingLimits: { maxPressureBar: 30, maxTempC: 200, maxFlowM3h: 4800, surfaceAreaM2: "2,200 m²" },
    faqs: [
      { q: "Can additional plates be added after installation if capacity needs grow?", a: "Yes. One of the greatest advantages of gasketed plate exchangers is modularity. The frame length allows inserting extra plates up to the frame capacity with simple tie-bolt adjustment." }
    ],
    downloads: [
      { title: "Plate Exchanger Design & Gasket Selection Matrix", format: "PDF", size: "3.1 MB", docType: "Manual" }
    ],
    calculatorPreset: { hotTempIn: 80, hotTempOut: 40, coldTempIn: 20, coldTempOut: 60, defaultPressure: 16 }
  },
  {
    id: "double-pipe",
    title: "Double Pipe & Hairpin Heat Exchangers",
    subtitle: "True Counter-Current Flow for High Pressure & Temperature Crosses",
    categoryTag: "Specialty Process",
    badgeText: "ASME VIII Div 1 • Multi-Tube Finned Hairpin • Thermal Shock Resistant",
    overview: "Northern HeatEx Double Pipe and Hairpin Heat Exchangers are designed specifically for severe thermal cross applications where the hot fluid outlet temperature is lower than the cold fluid outlet temperature. Featuring modular hairpin structures with removable U-bend sections, these units withstand extreme thermal expansion differentials without requiring expansion joints.",
    workingPrinciple: "Concentric outer pipe (shell) and inner pipe/tube construct a pure counter-current flow path. For enhanced thermal duty, multi-tube hairpins utilize inner longitudinal finned tubes that increase heat transfer surface area up to 800% per linear foot.",
    quickStats: [
      { label: "Design Pressure", value: "Up to 500 Bar", detail: "Shell & Inner Pipe" },
      { label: "Temp Cross", value: "Unlimited", detail: "True Counter-Current Flow" },
      { label: "Fin Geometry", value: "Longitudinal Cut", detail: "Resistance Welded Fins" },
      { label: "Modularity", value: "Stackable Hairpins", detail: "Series or Parallel" }
    ],
    applications: [
      { title: "Viscous Heavy Crude Oil Preheating", desc: "Longitudinal finned inner pipes reduce pumping power and boost thermal transfer in heavy bitumen streams.", industry: "Oil & Gas" },
      { title: "High Pressure Synthetic Gas Coolers", desc: "Handling gases at 300+ bar without thick shell wall requirements.", industry: "Petrochem" }
    ],
    engineeringFeatures: [
      { title: "Separated Tubesheet Design", desc: "Eliminates cross-contamination risk between shell fluid and tube fluid." },
      { title: "Resistance Welded Fins", desc: "Fins welded along the length of inner tubes for permanent structural and thermal bond." }
    ],
    availableConfigurations: ["Single Bare Inner Pipe Hairpin", "Multi-Tube Bare Hairpin", "Multi-Tube Longitudinal Finned Hairpin"],
    materialsOptions: [
      { material: "Chrome-Moly Alloy", grade: "SA-335 P11 / P22 / P91", application: "High Temp Refinery Gas", corrosionRating: "High Temp" },
      { material: "Inconel 625", grade: "UNS N06625", application: "Sour Corrosive Slurry", corrosionRating: "Maximum" }
    ],
    asmeStandards: ["ASME VIII Div 1", "TEMA Hairpin Standards"],
    manufacturingQC: ["Ultrasonic testing on high-pressure pipe welds", "Hydrostatic testing of hairpin segments independently"],
    operatingLimits: { maxPressureBar: 500, maxTempC: 600, maxFlowM3h: 800, surfaceAreaM2: "450 m²" },
    faqs: [
      { q: "Why choose Hairpin over standard Shell & Tube?", a: "Hairpins handle extreme temperature crosses and cyclic thermal shock far better than shell & tube units, while allowing easy modular expansion in small footprints." }
    ],
    downloads: [
      { title: "Double Pipe Engineering Brochure", format: "PDF", size: "1.8 MB", docType: "Brochure" }
    ],
    calculatorPreset: { hotTempIn: 220, hotTempOut: 50, coldTempIn: 30, coldTempOut: 180, defaultPressure: 120 }
  },
  {
    id: "spiral",
    title: "Spiral Heat Exchangers",
    subtitle: "Single-Channel Self-Cleaning Units for Heavy Slurries & High Solids",
    categoryTag: "Pulp, Paper & Mining",
    badgeText: "Self-Cleaning Flow • Zero Dead Zones • High Solids Concentration",
    overview: "Northern HeatEx Spiral Heat Exchangers are engineered to handle the toughest fluid media that immediately clog standard shell & tube or plate exchangers. Featuring a single, circular curved concentric channel design, these units process slurries, wastewater sludges, pulp suspensions, and high-solids viscous media with continuous self-cleaning action.",
    workingPrinciple: "Two long metal strips are rolled around a central split core to form two concentric rectangular channels. Fluids flow in pure counter-current path. If solids deposit in the single channel, the flow area contracts, increasing local fluid velocity until the deposit is scoured away automatically.",
    quickStats: [
      { label: "Solids Content", value: "Up to 45% WT", detail: "Heavy Slurry Processing" },
      { label: "Self-Cleaning", value: "Automatic Scour", detail: "Single Channel Hydrodynamics" },
      { label: "Channel Gap", value: "5mm to 30mm", detail: "Custom Debris Passages" },
      { label: "Thermal Duty", value: "Up to 30 MW", detail: "High Viscosity Efficiency" }
    ],
    applications: [
      { title: "Municipal Sewage Sludge Digester Heating", desc: "Continuous sludge heating without clogging or frequent chemical washdowns.", industry: "Wastewater" },
      { title: "Pulp & Paper Black Liquor Cooling", desc: "Handling heavy fibrous liquors in paper recycling and cellulose bleaching.", industry: "Pulp & Paper" },
      { title: "Mineral Processing Tailings Heat Recovery", desc: "Mining slurry heat extraction before mineral flotation.", industry: "Mining" }
    ],
    engineeringFeatures: [
      { title: "Single-Channel Hydrodynamics", desc: "Guarantees that localized velocity spikes scour fouling layers dynamically." },
      { title: "Hinged Removable Covers", desc: "Full access to the spiral channels for rapid visual inspection." }
    ],
    availableConfigurations: ["Type 1 (Counter-Current Liquid-Liquid)", "Type 2 (Vapor Condenser Cross-Flow)", "Type 3 (Top Entry Slurry Evaporator)"],
    materialsOptions: [
      { material: "Super Duplex 2507", grade: "UNS S32750", application: "Mining Acidic Slurries", corrosionRating: "Superior" },
      { material: "316L Stainless Steel", grade: "SA-240 316L", application: "Standard Sludge & Effluent", corrosionRating: "High" }
    ],
    asmeStandards: ["ASME VIII Div 1", "NACE Compliance"],
    manufacturingQC: ["100% dye penetrant on spiral sheet welds", "Hydraulic deflection check"],
    operatingLimits: { maxPressureBar: 30, maxTempC: 400, maxFlowM3h: 1500, surfaceAreaM2: "800 m²" },
    faqs: [
      { q: "How does the self-cleaning mechanism work?", a: "Because there is only one continuous channel for each fluid, any obstruction forces all flow through the reduced cross-section, raising local velocity and flushing the debris away." }
    ],
    downloads: [
      { title: "Spiral Heat Exchanger Slurry Handbook", format: "PDF", size: "2.8 MB", docType: "Guide" }
    ],
    calculatorPreset: { hotTempIn: 90, hotTempOut: 45, coldTempIn: 15, coldTempOut: 65, defaultPressure: 10 }
  },
  {
    id: "pche",
    title: "Printed Circuit Heat Exchangers (PCHE)",
    subtitle: "Diffusion-Bonded Microchannel Exchangers for Extreme Pressure & Temperature",
    categoryTag: "Clean Energy & LNG",
    badgeText: "85% Smaller Footprint • Diffusion Bonded • Up to 1,000 Bar Operating Pressure",
    overview: "Northern HeatEx Printed Circuit Heat Exchangers represent the cutting edge of thermal micro-engineering. Manufactured via photochemical etching and solid-state diffusion bonding, PCHEs merge the high thermal efficiency of compact exchangers with the robust structural integrity of a solid block of forged alloy, making them ideal for high-pressure S-CO2 power cycles, hydrogen refueling, and offshore FLNG units.",
    workingPrinciple: "Microfluidic flow channels (0.5mm to 2.0mm wide) are chemical-etched into metal plates. Stacked plates are subjected to high pressure and elevated temperatures in a vacuum furnace, causing atomic diffusion across grain boundaries. The resulting solid core contains zero solder, braze, or weld seams.",
    quickStats: [
      { label: "Operating Pressure", value: "Up to 1,000 Bar", detail: "Solid Alloy Block Matrix" },
      { label: "Thermal Density", value: "Up to 15 MW/m³", detail: "Ultra-Compact Footprint" },
      { label: "Core Integrity", value: "Parent Metal Strength", detail: "Zero Braze / Zero Gaskets" },
      { label: "Temp Rating", value: "-200°C to +900°C", detail: "Supercritical CO2 Ready" }
    ],
    applications: [
      { title: "Supercritical CO2 (sCO2) Power Cycles", desc: "Recuperator heat exchangers operating at 300 bar and 700°C in nuclear and solar thermal power generation.", industry: "Power Generation" },
      { title: "Floating LNG (FLNG) BOG Pre-Cooling", desc: "Ultra-compact gas cooling on offshore vessels where weight and footprint are strictly constrained.", industry: "LNG & Gas" },
      { title: "High-Pressure Hydrogen Dispensing", desc: "Pre-cooling hydrogen gas to -40°C at 875 bar during heavy transport refueling.", industry: "Hydrogen Energy" }
    ],
    engineeringFeatures: [
      { title: "Diffusion Bonding Technology", desc: "Atomic grain growth across plate interfaces yielding 100% base material joint strength." },
      { title: "Semi-Zigzag Channel Profiles", desc: "Optimized channel curvature that maximizes turbulence while minimizing pressure drop." }
    ],
    availableConfigurations: ["Counter-Flow Core Block", "Cross-Flow Gas Cooler Core", "Multi-Stream Cryogenic Matrix"],
    materialsOptions: [
      { material: "Stainless Steel 316L", grade: "SA-240 316L", application: "Standard LNG & High Pressure Gas", corrosionRating: "High" },
      { material: "Inconel 617 / 625", grade: "UNS N06617", application: "Extreme Temp sCO2 Cycles (>750°C)", corrosionRating: "Extreme Temp" },
      { material: "Titanium Gr 2", grade: "ASTM B265 Gr 2", application: "Ultra-Lightweight Offshore Units", corrosionRating: "Lightweight" }
    ],
    asmeStandards: ["ASME VIII Div 1 Code Case 2437", "PED High Pressure Annex"],
    manufacturingQC: ["100% Ultrasonic C-scan of diffusion bond line", "Helium mass spec leak testing"],
    operatingLimits: { maxPressureBar: 1000, maxTempC: 900, maxFlowM3h: 3500, surfaceAreaM2: "12,000 m²/m³ density" },
    faqs: [
      { q: "Is a diffusion bonded joint as strong as solid metal?", a: "Yes. Tensile and fatigue tests confirm that the bond line possesses mechanical strength and elongation properties identical to the parent wrought alloy." }
    ],
    downloads: [
      { title: "PCHE Technology Whitepaper & sCO2 Case Study", format: "PDF", size: "5.6 MB", docType: "Whitepaper" }
    ],
    calculatorPreset: { hotTempIn: 550, hotTempOut: 180, coldTempIn: 120, coldTempOut: 480, defaultPressure: 280 }
  },
  {
    id: "hydrogen-cryo",
    title: "Hydrogen & Cryogenic Heat Exchangers",
    subtitle: "Vacuum Insulated & Matrix Exchangers for Liquid H2, Helium & LNG Services",
    categoryTag: "Clean Tech & Aerospace",
    badgeText: "Liquid H2 (-253°C) • Vacuum Insulation Jacket • Zero Permeation Seals",
    overview: "Northern HeatEx Hydrogen & Cryogenic Heat Exchangers are custom engineered for extreme cryogenic conditions down to -253°C (20 K). Designed for liquid hydrogen liquefaction, cryogenic LH2 storage boil-off recovery, helium refrigeration, and air separation plants, these units combine vacuum insulation jackets with zero-permeation metallic barriers.",
    workingPrinciple: "Boil-off cryogenic liquid or high-density gas enters a vacuum-jacketed multi-stream cold box matrix. Thermal transfer occurs through high-purity aluminum or stainless steel brazed micro-fin plates with multi-layer reflective vacuum insulation (MLI) eliminating heat ingress from ambient surroundings.",
    quickStats: [
      { label: "Cryogenic Rating", value: "Down to -253°C", detail: "Liquid Hydrogen (20 Kelvin)" },
      { label: "Vacuum Jacket", value: "10⁻⁶ Torr Vacuum", detail: "Multi-Layer Foil Insulation" },
      { label: "H2 Permeation", value: "Zero Leakage", detail: "Gold-Sealed Flanged Interfaces" },
      { label: "Thermal Insulation", value: "MLI Composite", detail: "Minimal Heat Leak Ingress" }
    ],
    applications: [
      { title: "Liquid Hydrogen Liquefaction Plants", desc: "Cooling gaseous H2 from ambient down to -253°C using ortho-to-para catalytic heat exchangers.", industry: "Clean Hydrogen" },
      { title: "Aerospace Rocket Propellant Pre-Cooling", desc: "Chilling liquid oxygen and liquid hydrogen rocket feed lines.", industry: "Aerospace" },
      { title: "LNG Liquefaction & BOG Recovery", desc: "Cryogenic boil-off gas reliquefaction on LNG bunkering vessels.", industry: "LNG" }
    ],
    engineeringFeatures: [
      { title: "Integrated Ortho-Para H2 Catalyst Matrix", desc: "Embedded nickel silicate catalysts promoting ortho-to-para hydrogen conversion during chilling." },
      { title: "Cryogenic Vacuum Barrier Seal", desc: "Hermetic seal welds with gold wire gaskets for ultra-low temperature flange connections." }
    ],
    availableConfigurations: ["Vacuum-Jacketed Shell & Tube", "Brazed Aluminum Cryogenic Plate-Fin (BAHX)", "Stainless Steel Micro-Matrix Cold Box"],
    materialsOptions: [
      { material: "Cryogenic Stainless 304L/316L", grade: "SA-240 316L", application: "Structural Pipe & Cold Box Shell", corrosionRating: "Cryo Tough" },
      { material: "High Purity Aluminum 3003", grade: "ASTM B209 3003", application: "Plate-Fin Thermal Core Matrix", corrosionRating: "Light Cryo" }
    ],
    asmeStandards: ["ASME VIII Div 1 Cryogenic Mandatory Appendix", "ISO 19880-1 Hydrogen Fueling Compliance"],
    manufacturingQC: ["Helium mass spectrometer leak rate testing at cryogenic liquid nitrogen soak temperatures (-196°C)"],
    operatingLimits: { maxPressureBar: 350, maxTempC: 150, maxFlowM3h: 2500, surfaceAreaM2: "15,000 m²" },
    faqs: [
      { q: "Why is ortho-to-para conversion critical in liquid hydrogen exchangers?", a: "Hydrogen exists in two nuclear spin states (ortho and para). At room temperature it is 75% ortho. As it cools, it converts to para exothermically. If not converted during cooling, the released heat will boil off the liquid H2 in storage." }
    ],
    downloads: [
      { title: "Cryogenic Liquid Hydrogen Exchanger Technical Dossier", format: "PDF", size: "4.8 MB", docType: "Technical Dossier" }
    ],
    calculatorPreset: { hotTempIn: -40, hotTempOut: -240, coldTempIn: -250, coldTempOut: -60, defaultPressure: 100 }
  },
  {
    id: "stator-generator",
    title: "Stator & Generator Air Coolers",
    subtitle: "Heavy-Duty Utility Power Generation & Hydro-Electric Generator Coolers",
    categoryTag: "Power Generation",
    badgeText: "Power Plant Heavy Duty • Double Tube Safety Design • 100% Water Leak Isolation",
    overview: "Northern HeatEx Stator & Generator Air Coolers are engineered to safeguard massive steam, gas, and hydro-turbine power generators. Custom engineered to fit seamlessly into generator stator frames, these coolers utilize double-tube safety construction or specialized finned arrangements that prevent cooling water from ever contacting high-voltage stator windings.",
    workingPrinciple: "Hot air enclosed inside the generator stator housing is recirculated by rotor fans across heavy-duty finned tube banks. Internal cooling water absorbs the electrical losses, dissipating heat and maintaining stator winding insulation below critical thermal degradation thresholds.",
    quickStats: [
      { label: "Generator Output", value: "50 MW to 1,200 MW", detail: "Turbo & Hydro Generators" },
      { label: "Safety System", value: "Double-Tube Outer Core", detail: "Leak Detection Annulus" },
      { label: "Fin Construction", value: "Solderless Mechanical Tension", detail: "Copper or Aluminum Fins" },
      { label: "Expected Life", value: "35+ Years", detail: "Continuous Utility Service" }
    ],
    applications: [
      { title: "Hydro-Electric Power Station Generators", desc: "Vertical or horizontal hydro generator stator air cooling with raw river water or closed loop water.", industry: "Hydro Power" },
      { title: "Nuclear Power Steam Turbine Generators", desc: "Heavy duty double-tube stator coolers meeting IEEE power standards.", industry: "Nuclear Power" },
      { title: "Gas Turbine Generator Frame Coolers", desc: "Air cooling for peak load aeroderivative gas turbine installations.", industry: "Power Generation" }
    ],
    engineeringFeatures: [
      { title: "Double-Tube Safety Barrier", desc: "Inner tube carries water; outer tube expanded over inner tube. Any leak enters an intermediate groove monitored by electronic pressure sensors." },
      { title: "Removable Water Box Cover Plates", desc: "Clean tube internal bores without breaking generator frame air seals." }
    ],
    availableConfigurations: ["Horizontal Stator Frame Mounted", "Vertical Hydro Frame Sectional", "Double Tube Safety Circuit"],
    materialsOptions: [
      { material: "CuNi 90/10 Tubes / Cu Fins", grade: "C70600 / Copper Fins", application: "Standard Lake/River Cooling Water", corrosionRating: "High Thermal" },
      { material: "Titanium Gr 2 / Al Fins", grade: "ASTM B338 Gr 2", application: "Bracketed Saltwater Cooling", corrosionRating: "Impervious" }
    ],
    asmeStandards: ["IEEE 115 Power Generator Standards", "ASME VIII Div 1"],
    manufacturingQC: ["100% hydrostatic testing at 20 bar for 24 hours", "Air leakage pressure hold test"],
    operatingLimits: { maxPressureBar: 25, maxTempC: 150, maxFlowM3h: 3000, surfaceAreaM2: "1,800 m²" },
    faqs: [
      { q: "How does the double-tube leak detection system operate?", a: "If an inner tube suffers pinhole corrosion, water enters the microscopic gap between inner and outer tubes and drains to a collection manifold fitted with a conductivity sensor that triggers a control room alarm before water touches stator windings." }
    ],
    downloads: [
      { title: "Generator Stator Air Cooler Replacement Specs", format: "PDF", size: "3.5 MB", docType: "Manual" }
    ],
    calculatorPreset: { hotTempIn: 75, hotTempOut: 40, coldTempIn: 22, coldTempOut: 32, defaultPressure: 10 }
  },
  {
    id: "transformer-oil",
    title: "Transformer Oil Coolers (OFWF & OFAF)",
    subtitle: "Forced Oil Water / Forced Oil Air Coolers for High-Voltage Transformers",
    categoryTag: "Grid Infrastructure",
    badgeText: "IEEE C57.12 • OFWF & OFAF Architecture • Compact High-Reliability Motors",
    overview: "Northern HeatEx Transformer Oil Coolers deliver critical thermal dissipation for high-voltage grid transformers, traction transformers, and industrial arc furnace step-down units. Available in Forced Oil Water Forced (OFWF) shell-and-tube configurations or Forced Oil Air Forced (OFAF) air-finned cooler packages.",
    workingPrinciple: "High-voltage transformer insulating oil is pumped through special low-pressure-drop cooler passages while cooling water (OFWF) or forced air (OFAF) removes dielectric thermal losses, keeping transformer oil below aging thresholds.",
    quickStats: [
      { label: "Voltage Class", value: "Up to 765 kV", detail: "Grid Substation Utility Grade" },
      { label: "Cooling Method", value: "OFWF / OFAF / ODAF", detail: "Forced Oil Directional Flow" },
      { label: "Oil Pump Integration", value: "Submerged Sealless", detail: "Zero Leakage Glandless Pump" },
      { label: "Noise Emissions", value: "<65 dBA Substation", detail: "Low Noise Acoustic Blades" }
    ],
    applications: [
      { title: "Extra High Voltage Substation Transformers", desc: "765kV main step-up grid transformer oil cooling.", industry: "Power Grid" },
      { title: "Electric Arc Furnace Transformers", desc: "Handling rapid thermal spikes in heavy steel mill melting operations.", industry: "Steel Mills" }
    ],
    engineeringFeatures: [
      { title: "Sealless Submerged Oil Pumps", desc: "Eliminates pump shaft seal leaks that cause dielectric oil contamination." },
      { title: "Anti-Static Fluid Passages", desc: "Internal surface treatments preventing static electricity buildup during high oil flow velocity." }
    ],
    availableConfigurations: ["OFWF Shell & Tube Water Cooled", "OFAF Air Cooled Radiator Bank", "ODAF Directed Flow Modular Package"],
    materialsOptions: [
      { material: "Stainless Steel 316L", grade: "SA-240 316L", application: "Corrosive Industrial Environments", corrosionRating: "High" },
      { material: "Extruded Aluminum Fin / Cu Tube", grade: "C12200 Copper / Al 6063", application: "High Thermal Conductivity Air Coolers", corrosionRating: "Standard" }
    ],
    asmeStandards: ["IEEE C57.12.00 Transformer Cooling Standards", "IEC 60076-7 Loading Guide"],
    manufacturingQC: ["Transformer oil compatibility dielectric voltage breakdown test"],
    operatingLimits: { maxPressureBar: 16, maxTempC: 130, maxFlowM3h: 1200, surfaceAreaM2: "2,500 m²" },
    faqs: [
      { q: "Why is sealless pump integration mandatory for transformer oil coolers?", a: "Traditional mechanical seals degrade over time, letting air bubbles enter the insulating oil. Air bubbles reduce oil dielectric strength, leading to catastrophic high-voltage arcing." }
    ],
    downloads: [
      { title: "Transformer Oil Cooler OFWF Specification Sheet", format: "PDF", size: "2.7 MB", docType: "Catalog" }
    ],
    calculatorPreset: { hotTempIn: 85, hotTempOut: 55, coldTempIn: 25, coldTempOut: 38, defaultPressure: 6 }
  },
  {
    id: "steam-coil",
    title: "Steam Coil Air Heaters (SCAH)",
    subtitle: "Heavy Industrial Boiler Combustion Air Preheaters & Process Drying Coils",
    categoryTag: "Boilers & Process Thermal",
    badgeText: "ASME Section I & VIII • Freeze-Proof Coils • High Pressure Steam",
    overview: "Northern HeatEx Steam Coil Air Heaters (SCAH) are high-pressure steam-to-air heat exchangers installed in boiler combustion air ducts and industrial drying systems. Designed to operate with high-pressure saturated or superheated steam, these units preheat incoming cold outdoor combustion air before it enters main air preheaters, preventing dew-point cold-end corrosion.",
    workingPrinciple: "High-pressure steam condenses inside heavy-wall finned tubes arranged in serpentine coil banks. Latent heat of vaporization is transferred directly to the high-velocity duct air stream flowing over external spiral-wound or tension-wound fins.",
    quickStats: [
      { label: "Steam Pressure", value: "Up to 85 Bar", detail: "Saturated or Superheated" },
      { label: "Freeze Protection", value: "Vertical Tube Pitch", detail: "Self-Draining Condensate" },
      { label: "Air Velocity", value: "Up to 15 m/s", detail: "Heavy Duty Duct Frames" },
      { label: "Thermal Output", value: "Up to 40 MW", detail: "Utility Boiler Ducts" }
    ],
    applications: [
      { title: "Utility Boiler Combustion Air Preheating", desc: "Protecting regenerative air preheaters from sulfuric acid dew-point corrosion during winter cold starts.", industry: "Power Generation" },
      { title: "Pulp & Paper Spray Dryer Air Heating", desc: "High temperature process air heating for paper drying hoods.", industry: "Pulp & Paper" }
    ],
    engineeringFeatures: [
      { title: "Self-Draining Vertical Tube Pitch", desc: "Ensures condensate drains immediately under gravity, preventing freeze-up bursts in sub-zero ambient weather." },
      { title: "Tension-Wound Helical Fins", desc: "Heavy spiral fins wound under continuous tension for maximum heat transfer contact." }
    ],
    availableConfigurations: ["Single Row Serpentine Steam Coil", "Multi-Row Headers with Distribution Jet Tubes", "Removable Drawer Frame Core"],
    materialsOptions: [
      { material: "Heavy Wall Carbon Steel SA-214", grade: "SA-214 / SA-178 Gr A", application: "High Pressure Saturated Steam", corrosionRating: "Standard" },
      { material: "316L Stainless Steel / SS Fin", grade: "SA-249 316L", application: "Corrosive Acidic Duct Environments", corrosionRating: "High" }
    ],
    asmeStandards: ["ASME Section I (Power Boilers)", "ASME VIII Div 1"],
    manufacturingQC: ["Hydrostatic testing at 1.5x design steam pressure", "Thermal imaging check under live steam"],
    operatingLimits: { maxPressureBar: 85, maxTempC: 350, maxFlowM3h: 25000, surfaceAreaM2: "6,000 m²" },
    faqs: [
      { q: "How do Northern HeatEx SCAH coils prevent freezing in sub-zero winter air?", a: "We utilize directional condensate distribution orifice inner tubes and steep vertical tube inclinations so steam condensate drains instantly before it can stall and freeze." }
    ],
    downloads: [
      { title: "SCAH Boiler Application Manual", format: "PDF", size: "3.0 MB", docType: "Manual" }
    ],
    calculatorPreset: { hotTempIn: 250, hotTempOut: 180, coldTempIn: -10, coldTempOut: 65, defaultPressure: 35 }
  },
  {
    id: "condensers-reboilers",
    title: "Condensers & Reboilers",
    subtitle: "Kettle, Thermosiphon, Falling Film & Vacuum Steam Condensers",
    categoryTag: "Chemical & Distillation",
    badgeText: "Phase Change Engineering • HTRI Vapor Two-Phase Calculations • ASME VIII",
    overview: "Specialized phase-change thermal equipment engineered by Northern HeatEx for distillation columns, chemical evaporators, and steam turbine exhausts. Our Kettle Reboilers, Vertical/Horizontal Thermosiphons, and Falling Film Evaporators are designed using advanced two-phase boiling and condensation fluid dynamic software to ensure stable vapor disengagement without liquid entrainment.",
    workingPrinciple: "Phase-change heat transfer utilizes latent heat. In reboilers, liquid bottom fraction absorbs heat from hot steam or thermal fluid, vaporizing and returning as column driving vapor. In condensers, high-velocity vapor streams release latent heat against cold cooling media, condensing into pure liquid condensate.",
    quickStats: [
      { label: "Vapor Disengagement", value: "40% Oversized Dome", detail: "Zero Liquid Carryover" },
      { label: "Vapor Velocity", value: "Sub-Sonic Controlled", detail: "Optimized Nozzle Sizing" },
      { label: "Two-Phase Duty", value: "Up to 80 MW", detail: "Latent Heat Dominated" },
      { label: "Vacuum Service", value: "Down to 0.01 Bar Abs", detail: "Vacuum Condensers" }
    ],
    applications: [
      { title: "Petrochemical Fractionation Column Reboilers", desc: "Providing boiling vapor drive for ethylene, propylene, and benzene distillation columns.", industry: "Petrochem" },
      { title: "Desalination Multi-Effect Distillation (MED)", desc: "Falling film evaporators for seawater desalination plants.", industry: "Desalination" },
      { title: "Steam Turbine Surface Condensers", desc: "Maintaining deep vacuum at turbine exhaust to maximize megawatt generation efficiency.", industry: "Power Generation" }
    ],
    engineeringFeatures: [
      { title: "Enlarged Vapor Surge Dome (AKT)", desc: "Kettle reboiler shells feature expanded upper vapor disengagement space with mesh mist eliminators." },
      { title: "Thermosiphon Natural Circulation Design", desc: "Engineered hydrostatic head differential driving natural fluid recirculation without mechanical pumps." }
    ],
    availableConfigurations: ["TEMA AKT Kettle Reboiler", "Vertical Thermosiphon Reboiler", "Horizontal Shell-Side Condenser", "Falling Film Tubular Evaporator"],
    materialsOptions: [
      { material: "Monel 400 (UNS N04400)", grade: "SB-127 / SB-163", application: "Hydrofluoric Acid Alkylation Reboilers", corrosionRating: "Extreme Acid" },
      { material: "Duplex 2205", grade: "SA-240 UNS S32205", application: "High Chloride Organic Distillation", corrosionRating: "Superior" }
    ],
    asmeStandards: ["ASME VIII Div 1 & 2", "HEI (Heat Exchange Institute) Vacuum Surface Condenser Standards"],
    manufacturingQC: ["100% helium leak test on vacuum envelope", "Radiographic testing of all shell-to-dome transition welds"],
    operatingLimits: { maxPressureBar: 180, maxTempC: 500, maxFlowM3h: 18000, surfaceAreaM2: "7,200 m²" },
    faqs: [
      { q: "What is the key advantage of a Thermosiphon Reboiler over a Kettle Reboiler?", a: "Thermosiphons feature higher fluid velocities and shorter residence times, reducing fouling and preventing thermal degradation of heat-sensitive chemical liquids, while requiring no internal vapor dome." }
    ],
    downloads: [
      { title: "Distillation Column Reboiler Design Guide", format: "PDF", size: "4.1 MB", docType: "Design Guide" }
    ],
    calculatorPreset: { hotTempIn: 210, hotTempOut: 205, coldTempIn: 130, coldTempOut: 160, defaultPressure: 22 }
  },
  {
    id: "waste-heat-recovery",
    title: "Waste Heat Recovery Units (WHRU / HRSG)",
    subtitle: "Flue Gas & Exhaust Energy Capture Coils for Industrial Decarbonization",
    categoryTag: "Energy Transition",
    badgeText: "Decarbonization Impact • Gas Turbine Exhaust Capture • Fin-Tube Boiler Modules",
    overview: "Northern HeatEx Waste Heat Recovery Units capture high-temperature exhaust thermal energy from gas turbines, diesel engines, industrial incinerators, and cement kilns, converting wasted heat into high-pressure steam, hot oil, or electricity. These modular heat exchanger banks lower corporate fuel consumption and reduce carbon dioxide emissions.",
    workingPrinciple: "Hot flue gas (up to 1,000°C) passes through heavily finned tube banks. Water, thermal oil, or organic Rankine cycle (ORC) working fluid inside the tubes absorbs heat, generating superheated steam or thermal fluid for downstream power generation or process heating.",
    quickStats: [
      { label: "Exhaust Temp Range", value: "250°C to 1,000°C", detail: "Turbine & Engine Flue Gas" },
      { label: "Heat Recovery Efficiency", value: "Up to 88%", detail: "Thermal Energy Recaptured" },
      { label: "Payback Period", value: "12 to 24 Months", detail: "Fuel Savings Return" },
      { label: "Sootblower Integration", value: "Acoustic / Steam", detail: "Automatic Ash Cleaning" }
    ],
    applications: [
      { title: "Gas Turbine Compressor Station WHRU", desc: "Generating thermal oil heating for offshore oil processing from gas turbine exhaust.", industry: "Offshore" },
      { title: "Cement Kiln Waste Heat Power Generation", desc: "ORC boiler coils generating 10 MW clean electricity from hot cement exhaust gas.", industry: "Heavy Industry" },
      { title: "Biomass & Incinerator HRSG Modules", desc: "Steam generation from municipal waste combustion flue gas.", industry: "Waste to Energy" }
    ],
    engineeringFeatures: [
      { title: "High-Frequency Resistance Welded Serrated Fins", desc: "Maximizes heat transfer in dirty flue gas while minimizing particulate trapping." },
      { title: "Integrated Diverter Valves & Bypass Ducts", desc: "Allows full process operation even during WHRU isolation and maintenance." }
    ],
    availableConfigurations: ["Horizontal Flue Gas Cross-Flow", "Vertical Self-Supporting Module", "ORC Evaporator / Superheater Bank"],
    materialsOptions: [
      { material: "High Temp Alloy SA-213 T22 / T91", grade: "SA-213 T91 Chrome Moly", application: "High Temp Flue Gas (>600°C)", corrosionRating: "Extreme Heat" },
      { material: "Incoloy 800H", grade: "UNS N08810", application: "Corrosive Acidic Exhaust Streams", corrosionRating: "Maximum" }
    ],
    asmeStandards: ["ASME Section I Power Boilers", "ASME Section VIII Div 1"],
    manufacturingQC: ["100% weld inspection with ultrasonic phased array", "Thermal cycle testing of module headers"],
    operatingLimits: { maxPressureBar: 120, maxTempC: 1000, maxFlowM3h: 50000, surfaceAreaM2: "18,000 m²" },
    faqs: [
      { q: "How do WHRU units handle soot and particulate build-up in flue gas?", a: "We integrate automated rotary steam sootblowers or acoustic wave pulse cleaners that shatter particulate deposits continuously without interrupting operations." }
    ],
    downloads: [
      { title: "Industrial Decarbonization & WHRU ROI Calculator Brochure", format: "PDF", size: "3.9 MB", docType: "Whitepaper" }
    ],
    calculatorPreset: { hotTempIn: 520, hotTempOut: 160, coldTempIn: 40, coldTempOut: 280, defaultPressure: 40 }
  },
  {
    id: "high-pressure-gas",
    title: "High-Pressure Process Gas Coolers",
    subtitle: "Heavy Forged Thick-Wall Exchangers for 100+ Bar Industrial Gas Systems",
    categoryTag: "Fertilizer & Syngas",
    badgeText: "Up to 500 Bar • Monolithic Forged Headers • Hydrogen Nitriding Resistant",
    overview: "Specifically engineered for severe high-pressure gas processing, synthetic ammonia synthesis, urea plants, and hyper-compressor intercoolers operating at pressures exceeding 100 to 500 bar. Built using monolithic forged steel headers and heavy-wall seamless alloy tubing to prevent hydrogen embrittlement and high-temperature hydrogen attack (HTHA).",
    workingPrinciple: "High-density compressed gas at extreme pressures flows through gun-drilled heavy forged headers and seamless heavy-wall tubes. High shell-side water flow rates rapidly remove heat of compression, stabilizing process gas temperatures for subsequent catalyst bed reaction stages.",
    quickStats: [
      { label: "Operating Pressure", value: "100 to 500 Bar", detail: "Extreme Gas Pressure" },
      { label: "HTHA Resistance", value: "Nelson Curve Compliant", detail: "Hydrogen Attack Safe" },
      { label: "Header Structure", value: "Monolithic Forging", detail: "Zero Longitudinal Welds" },
      { label: "Tube Wall Thickness", value: "Up to 12.5mm", detail: "Heavy Wall Seamless" }
    ],
    applications: [
      { title: "Ammonia & Urea Synthesis Loop Coolers", desc: "Cooling syngas (N2 + 3H2) at 250 bar downstream of synthesis reactors.", industry: "Fertilizer" },
      { title: "LDPE Hyper-Compressor Intercoolers", desc: "Cooling ethylene gas at 300+ bar in high-density polyethylene plants.", industry: "Petrochem" }
    ],
    engineeringFeatures: [
      { title: "Forged Barrel Header Closures", desc: "Heavy forged steel barrels with breech lock or shear ring closures for easy high-pressure access." },
      { title: "Breech Lock Threaded Closures", desc: "ASME VIII Div 2 approved threaded locking rings that distribute internal pressure loads uniformly." }
    ],
    availableConfigurations: ["Monolithic Forged Header Exchanger", "Breech Lock High Pressure Unit", "Multitube High Pressure Barrel"],
    materialsOptions: [
      { material: "2.25Cr-1Mo-0.25V Alloy", grade: "SA-336 F22V / SA-541 22V", application: "High Pressure High Temp Hydrogen", corrosionRating: "HTHA Proof" },
      { material: "Forged Super Duplex", grade: "SA-182 F53", application: "Corrosive High Pressure Acid Gas", corrosionRating: "Superior" }
    ],
    asmeStandards: ["ASME VIII Div 2 Class 1 & 2", "API 660 High Pressure Addenda"],
    manufacturingQC: ["100% Volumetric Ultrasonic Exam on all forgings", "48-hour hydrostatic proof test at 1.5x design pressure"],
    operatingLimits: { maxPressureBar: 500, maxTempC: 550, maxFlowM3h: 4000, surfaceAreaM2: "3,800 m²" },
    faqs: [
      { q: "What is HTHA and how does Northern HeatEx prevent it?", a: "High Temperature Hydrogen Attack (HTHA) occurs when molecular hydrogen dissociates into atomic hydrogen, penetrating steel and reacting with carbon to form methane bubbles that rupture the metal. We select vanadium-modified Chrome-Moly alloys strictly adhering to API 941 Nelson Curves." }
    ],
    downloads: [
      { title: "High-Pressure Gas Engineering Whitepaper", format: "PDF", size: "4.5 MB", docType: "Whitepaper" }
    ],
    calculatorPreset: { hotTempIn: 320, hotTempOut: 80, coldTempIn: 28, coldTempOut: 75, defaultPressure: 250 }
  },
  {
    id: "marine-offshore",
    title: "Marine & Offshore Heat Exchangers",
    subtitle: "DNV, ABS, Lloyd's Register Certified Titanium & CuNi Heat Exchangers",
    categoryTag: "Marine & FPSO",
    badgeText: "DNV & ABS Approved • Seawater Resistant • Titanium & CuNi Metallurgy",
    overview: "Engineered specifically for harsh marine environments, FPSO topsides, commercial ships, and naval vessels. Built with pure Titanium, CuNi 90/10, and Super Duplex stainless steels, Northern HeatEx Marine & Offshore Heat Exchangers withstand severe wave motion shock loads, biofouling, and highly aggressive raw seawater corrosion.",
    workingPrinciple: "Raw ocean seawater is pumped through corrosion-impervious Titanium or Copper-Nickel tube circuits, absorbing heat from central closed-loop cooling water, lube oil, or main propulsion engine jacket water.",
    quickStats: [
      { label: "Marine Certifications", value: "DNV, ABS, LR, BV", detail: "Full Class Society Approval" },
      { label: "Seawater Resistance", value: "100% Immunity", detail: "Titanium / CuNi 90/10" },
      { label: "Shock Load Rating", value: "Up to 30g Dynamic", detail: "Naval Shock Verified" },
      { label: "Biofouling Control", value: "CuNi Natural Biocide", detail: "Inhibits Marine Growth" }
    ],
    applications: [
      { title: "FPSO Topside Central Seawater Coolers", desc: "Cooling closed-loop fresh water modules on offshore production ships.", industry: "Offshore Oil & Gas" },
      { title: "Container Ship Main Engine Jacket Water Coolers", desc: "Primary propulsion engine thermal management with raw seawater.", industry: "Commercial Marine" }
    ],
    engineeringFeatures: [
      { title: "Dynamic Wave Motion Internal Baffling", desc: "Special baffle support structures preventing fluid sloshing and dry spots during severe vessel pitch and roll." },
      { title: "Sacrificial Zinc & Iron Anode Protection", desc: "Replaceable galvanic anodes integrated into water boxes to protect against stray electrical current." }
    ],
    availableConfigurations: ["Titanium Shell & Tube Marine Exchanger", "Gasketed Titanium Plate Central Cooler", "Direct Seawater Box Cooler"],
    materialsOptions: [
      { material: "Titanium Grade 2", grade: "ASTM B338 Gr 2", application: "Direct Raw Seawater Exposure", corrosionRating: "Impervious" },
      { material: "Copper-Nickel 90/10", grade: "C70600", application: "Engine Jacket Water Coolers", corrosionRating: "Natural Antifouling" }
    ],
    asmeStandards: ["DNV Rules for Classification of Ships", "ABS Marine Vessels Rules", "ASME VIII Div 1"],
    manufacturingQC: ["Marine Class Surveyor witness testing", "100% helium leak test"],
    operatingLimits: { maxPressureBar: 40, maxTempC: 180, maxFlowM3h: 6000, surfaceAreaM2: "3,500 m²" },
    faqs: [
      { q: "Why is Titanium Grade 2 the gold standard for marine raw seawater coolers?", a: "Titanium forms a self-healing titanium oxide passive surface film that is completely immune to pitting and crevice corrosion in seawater at all temperatures up to 130°C." }
    ],
    downloads: [
      { title: "Marine & Offshore Class Certificate Portfolio", format: "PDF", size: "5.2 MB", docType: "Certificates" }
    ],
    calculatorPreset: { hotTempIn: 70, hotTempOut: 36, coldTempIn: 22, coldTempOut: 32, defaultPressure: 12 }
  },
  {
    id: "nuclear-grade",
    title: "Nuclear Grade Heat Exchangers",
    subtitle: "ASME Section III Class 1, 2 & 3 Certified Nuclear Island Thermal Equipment",
    categoryTag: "Nuclear Power",
    badgeText: "ASME N-Stamp • NQA-1 Quality Program • Seismic Class 1A Certified",
    overview: "Northern HeatEx Nuclear Grade Heat Exchangers are designed and manufactured under our strict ASME N-Stamp accreditation and ASME NQA-1 quality assurance program. Engineered for nuclear island auxiliary cooling, decay heat removal, component cooling water (CCW), and emergency core cooling systems (ECCS) in SMR, Gen III+, and Gen IV nuclear power stations.",
    workingPrinciple: "Heavy primary or secondary nuclear cooling water flows through double-contained alloy tubing under high pressure. Structural engineering accounts for combined thermal, hydraulic, dynamic LOCA (Loss of Coolant Accident), and SSE (Safe Shutdown Earthquake) loading.",
    quickStats: [
      { label: "Nuclear Stamping", value: "ASME N, NPT, NA", detail: "Class 1, 2, and 3 Certified" },
      { label: "Quality Program", value: "ASME NQA-1 Full", detail: "10 CFR 50 Appendix B" },
      { label: "Seismic Rating", value: "SSE Class 1A", detail: "100% Dynamic Finite Element" },
      { label: "Design Life", value: "60 to 80 Years", detail: "Nuclear Plant Lifetime" }
    ],
    applications: [
      { title: "Component Cooling Water (CCW) Exchangers", desc: "Primary nuclear island closed-loop cooling for reactor coolant pumps.", industry: "Nuclear Energy" },
      { title: "Decay Heat Removal & Residual Heat Removal (RHR)", desc: "Emergency reactor shutdown thermal extraction.", industry: "Nuclear Energy" },
      { title: "Small Modular Reactor (SMR) Integrated Modules", desc: "Compact nuclear heat exchangers for SMR containment vessels.", industry: "Next-Gen Nuclear" }
    ],
    engineeringFeatures: [
      { title: "100% Traceable Forged Materials", desc: "Full physical and chemical heat code traceability from raw ingot melt to finished stamping." },
      { title: "Seismic Dynamic Snubber Brackets", desc: "Heavy structural mountings engineered to withstand 3D acceleration response spectra." }
    ],
    availableConfigurations: ["Class 1 Heavy Vertical Shell & Tube", "Class 2 Component Cooling Unit", "Class 3 Emergency Auxiliary Core"],
    materialsOptions: [
      { material: "Low Cobalt Stainless 304L/316L", grade: "SA-240 316LN (Co < 0.05%)", application: "Primary Loop Water Isolation", corrosionRating: "Nuclear Pure" },
      { material: "Inconel 690", grade: "UNS N06690", application: "Steam Generator & RHR Bundles", corrosionRating: "SCC Resistant" }
    ],
    asmeStandards: ["ASME Section III Division 1 (N-Stamp)", "ASME NQA-1", "10 CFR 50 Appendix B"],
    manufacturingQC: ["100% Radiographic, Ultrasonic, Magnetic Particle, and Liquid Penetrant NDT", "Third Party Authorized Nuclear Inspector (ANI) hold points"],
    operatingLimits: { maxPressureBar: 180, maxTempC: 350, maxFlowM3h: 7500, surfaceAreaM2: "6,500 m²" },
    faqs: [
      { q: "Why is low-cobalt content strictly enforced in nuclear grade stainless steels?", a: "Cobalt under neutron irradiation in a nuclear reactor core transforms into Cobalt-60, a potent gamma emitter. Restricting cobalt to <0.05% prevents dangerous radiation buildup in primary cooling loops." }
    ],
    downloads: [
      { title: "Nuclear Engineering & ASME N-Stamp Capabilities", format: "PDF", size: "6.0 MB", docType: "Nuclear Quality Dossier" }
    ],
    calculatorPreset: { hotTempIn: 310, hotTempOut: 285, coldTempIn: 38, coldTempOut: 65, defaultPressure: 155 }
  },
  {
    id: "custom-engineered",
    title: "Custom Engineered Heat Exchangers",
    subtitle: "One-Off First-of-a-Kind Prototypes & Heavy Duty Specialized Thermal Units",
    categoryTag: "Specialty & Prototype",
    badgeText: "Bespoke Engineering • First-of-a-Kind Prototypes • Exotic Metallurgies",
    overview: "When off-the-shelf heat exchangers cannot meet non-standard space geometries, extreme multi-fluid stream demands, or revolutionary clean energy process requirements, Northern HeatEx Custom Engineering Group delivers. We design, simulate, build, and test one-off prototype units with exotic alloys and novel flow patterns.",
    workingPrinciple: "Custom fluid routing geometries tailored to specific customer thermal envelope constraints. May combine multiple heat exchange mechanisms (e.g. direct contact + conductive surface) or multi-stream 4-fluid matrix topologies.",
    quickStats: [
      { label: "Custom Design", value: "100% Bespoke", detail: "Zero Template Constraints" },
      { label: "Multifluid Capacity", value: "Up to 6 Streams", detail: "Single Integrated Core" },
      { label: "FEA Simulation", value: "ANSYS Thermal/Fluid", detail: "3D CFD Validation" },
      { label: "Prototyping", value: "Full Scale Pilot", detail: "Factory Performance Rig" }
    ],
    applications: [
      { title: "Geothermal Power High-Brine Binary Exchangers", desc: "Handling ultra-high silica brine without scaling or structural corrosion.", industry: "Geothermal" },
      { title: "Carbon Capture (CCUS) Amine Stripper Units", desc: "Custom stainless / titanium multi-stage gas strippers for direct air capture.", industry: "Carbon Capture" }
    ],
    engineeringFeatures: [
      { title: "3D Computational Fluid Dynamics (CFD)", desc: "Full Navier-Stokes fluid turbulence and conjugate heat transfer simulation prior to metal cutting." },
      { title: "Exotic Alloy Cladding", desc: "Explosion clad or roll-clad combinations of Tantalum, Zirconium, and Hastelloy." }
    ],
    availableConfigurations: ["Multi-Stream Heat Exchanger Core", "Non-Symmetrical Geometry Shell", "Hybrid Plate-Tube Composite Unit"],
    materialsOptions: [
      { material: "Pure Tantalum", grade: "UNS R05200", application: "Concentrated Boiling Sulfuric Acid", corrosionRating: "Ultimate Chemical" },
      { material: "Zirconium 702", grade: "UNS R60702", application: "Hydrochloric & Acetic Acid Synthesis", corrosionRating: "Extreme Acid" }
    ],
    asmeStandards: ["ASME VIII Div 1 & 2 Custom Code Cases"],
    manufacturingQC: ["100% full-scale prototype performance rig testing with calibrated mass flow meters"],
    operatingLimits: { maxPressureBar: 400, maxTempC: 800, maxFlowM3h: 5000, surfaceAreaM2: "Custom" },
    faqs: [
      { q: "What is the lead time for a custom engineered prototype?", a: "Depending on alloy availability and ASME approval scope, custom prototype lead times typically range from 12 to 24 weeks including full CFD validation." }
    ],
    downloads: [
      { title: "Custom Engineering & Special Metallurgy Guide", format: "PDF", size: "3.8 MB", docType: "Guide" }
    ],
    calculatorPreset: { hotTempIn: 200, hotTempOut: 60, coldTempIn: 25, coldTempOut: 110, defaultPressure: 50 }
  },
  {
    id: "spare-parts-lifecycle",
    title: "Spare Parts & Lifecycle Engineering",
    subtitle: "OEM Gaskets, Tubes, Headers, Re-tubing Tools & Field Engineering Services",
    categoryTag: "Services & Spare Parts",
    badgeText: "24/7 Global Spare Parts • OEM Equivalent • On-Site Re-Tubing Teams",
    overview: "Northern HeatEx maintains a global inventory of over $15 Million in certified raw tube stock, replacement gaskets, tubesheets, plug closures, and hydraulic expansion tooling. Supported by our mobile field service crews, we provide emergency on-site leak repairs, bundle pull services, ultrasonic tube wall thickness testing, and complete retubing.",
    workingPrinciple: "Rapid deployment of original OEM certified spare components and field engineering teams equipped with specialized hydraulic bundle pullers, torque wrenches, and tube expansion equipment.",
    quickStats: [
      { label: "Inventory Stock", value: "$15M+ On Hand", detail: "SA-179, SA-214, 316L, Duplex" },
      { label: "Dispatch Time", value: "Under 24 Hours", detail: "In-Stock Emergency Parts" },
      { label: "Field Service", value: "24/7 Mobile Crews", detail: "Global On-Site Deployment" },
      { label: "Gasket Materials", value: "NBR, EPDM, Viton, PTFE", detail: "Precision Die-Cut Seals" }
    ],
    applications: [
      { title: "Refinery Shutdown Rapid Retubing", desc: "In-situ field retubing of 2,000+ tubes within 72-hour outage windows.", industry: "Refining" },
      { title: "Plate Heat Exchanger Regasket & Re-Plate", desc: "Chemical cleaning, dye penetrant inspection, and regasket of plate packs.", industry: "Chemical" }
    ],
    engineeringFeatures: [
      { title: "Hydraulic Bundle Puller Systems", desc: "50-ton mobile self-contained bundle extractors for safe field removal." },
      { title: "Ultrasonic Eddy Current Tube Inspection", desc: "Non-destructive flaw detection identifying wall loss before catastrophic leaks occur." }
    ],
    availableConfigurations: ["Replacement Tube Stock (Straight & U-Bent)", "Plate Exchanger Gaskets & Plates", "Tubesheet Threaded Plugs", "Hydraulic Expansion Tools"],
    materialsOptions: [
      { material: "High Temp Viton / FKM", grade: "Viton GF / Extreme", application: "Hydrocarbon Chemical Plate Gaskets", corrosionRating: "Chemical Seal" },
      { material: "Brass & Alloy Tube Plugs", grade: "C36000 / 316 SS Plugs", application: "Emergency Tube Isolation Plugs", corrosionRating: "High Pressure Seal" }
    ],
    asmeStandards: ["ASME R-Stamp (Metallic Repairs)", "API 510 Pressure Vessel Inspection Code"],
    manufacturingQC: ["Positive Material Identification (PMI) report with every spare part shipment"],
    operatingLimits: { maxPressureBar: 350, maxTempC: 600, maxFlowM3h: 0, surfaceAreaM2: "N/A" },
    faqs: [
      { q: "Do you supply gaskets for non-Northern HeatEx plate exchangers?", a: "Yes. We supply 100% compatible replacement gaskets and plates for all major manufacturers including Alfa Laval, GEA, Kelvion, Tranter, APV, and SWEP." }
    ],
    downloads: [
      { title: "Spare Parts & Emergency Field Service Catalog", format: "PDF", size: "2.5 MB", docType: "Catalog" }
    ],
    calculatorPreset: { hotTempIn: 100, hotTempOut: 50, coldTempIn: 20, coldTempOut: 60, defaultPressure: 16 }
  }
];
