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
    subtitle: "TEMA Class R, C & B Heavy-Duty Industrial Process Units",
    categoryTag: "Process & Refineries",
    badgeText: "ISO 9001:2015 & ISO 14001:2025 Certified • TEMA Type BEM / AES / BEU / AKT • TPI Clearance",
    overview: "Northern HeatEx Shell & Tube Heat Exchangers are the workhorse of power generation, process utilities, and hydro stations across India and global export markets. Engineered strictly to TEMA Class R, C, and B standards and National/International procedures, these units are custom-built to withstand severe thermal fatigue and cyclic operating conditions.",
    workingPrinciple: "Heat transfer occurs across conductive metal tube walls separating two isolated fluid streams. High-pressure tube-side fluid flows inside a multi-pass bundle, while shell-side fluid flows across precision-spaced segmental or helical baffles. Baffle geometry induces turbulent cross-flow, maximizing overall thermal heat transfer coefficient (U) while maintaining controlled shell-side pressure drop.",
    quickStats: [
      { label: "Configuration", value: "Custom Heavy Duty", detail: "Tailored Shell & Bundle Geometry" },
      { label: "Design Code", value: "ASME VIII / TEMA", detail: "Coded Pressure Vessel Fabrication" },
      { label: "MOC Options", value: "CS, SS, Duplex, Ti", detail: "Corrosion Resistant Alloy Selection" },
      { label: "Thermal Duty", value: "Custom Tailored", detail: "Optimized for Plant Process" }
    ],
    applications: [
      { title: "Refinery Process Streams", desc: "Heavy hydrocarbon fraction cooling and amine gas treating.", industry: "Oil & Gas" },
      { title: "Hydro & Power Plant Coolers", desc: "Generator stator air cooling and turbine lube oil preheating.", industry: "Power Generation" },
      { title: "Chemical Reactor Heat Removal", desc: "Corrosive acid and organic synthesis heat removal using Hastelloy and Titanium bundles.", industry: "Chemical Processing" },
      { title: "Offshore Gas Dehydration", desc: "High-pressure gas cooling and glycol heat exchangers.", industry: "Offshore & Marine" }
    ],
    engineeringFeatures: [
      { title: "TEMA Precision Baffling", desc: "Single, double, or triple segmental baffles, as well as RODbaffle systems to eliminate flow-induced vibration." },
      { title: "Explosion-Welded Tubesheets", desc: "Clad tubesheets combining SA-516 Gr 70 backing plates with Titanium or Inconel cladding." },
      { title: "Hydraulic Tube Expansion", desc: "Controlled 2-step hydraulic tube expansion guaranteeing zero joint leakage under cyclic thermal shocks." },
      { title: "Finite Element Stress Analysis", desc: "FEA verification of tubesheet thickness, nozzle loads, and differential expansion stresses." }
    ],
    availableConfigurations: ["TEMA BEM (Fixed Tubesheet)", "TEMA AES (Split Ring Floating Head)", "TEMA BEU (U-Tube Bundle)", "TEMA AKT (Kettle Reboiler)", "TEMA NEN (Integral Head)"],
    materialsOptions: [
      { material: "Carbon Steel", grade: "SA-516 Gr 70 / SA-106 Gr B", application: "Standard Hydrocarbon & Cooling Water", corrosionRating: "Moderate" },
      { material: "Stainless Steel", grade: "SA-240 316/316L & 304/304L", application: "Process Fluids & Clean Condensate", corrosionRating: "High" },
      { material: "Duplex Stainless", grade: "UNS S32205 / S32750 (Super Duplex)", application: "Seawater & High Chloride Streams", corrosionRating: "Superior" },
      { material: "Nickel Alloys", grade: "Inconel 625 / Hastelloy C-276", application: "Extreme Acid & H2S Sour Gas", corrosionRating: "Maximum" },
      { material: "Titanium", grade: "SB-265 Grade 2 & Grade 12", application: "Direct Marine Seawater Cooling", corrosionRating: "Impervious to Chlorides" }
    ],
    asmeStandards: ["National & International Standards", "TEMA Class R, C, and B", "API 660 Compliance", "Third Party Inspection Clearance (TPI)"],
    manufacturingQC: ["100% Radiographic Testing (RT) of pressure welds", "Positive Material Identification (PMI) with XRF analyzers", "Hydrostatic & Vacuum Leak Testing", "Hydrostatic pressure testing"],
    operatingLimits: { maxPressureBar: 350, maxTempC: 850, maxFlowM3h: 8500, surfaceAreaM2: "5,500 m² per unit" },
    faqs: [
      { q: "What TEMA types are available for rapid dispatch?", a: "We manufacture TEMA BEM, BEU, and AES configurations with standard tube bundle lead times." }
    ],
    downloads: [
      { title: "Shell & Tube Engineering Manual", format: "PDF", size: "4.2 MB", docType: "Specification" }
    ],
    calculatorPreset: { hotTempIn: 180, hotTempOut: 45, coldTempIn: 28, coldTempOut: 65, defaultPressure: 30 }
  },
  {
    id: "tube-bundles",
    title: "Replacement Tube Bundles & Cores",
    subtitle: "Precision Retubing, Drop-In Replacement Bundles & Re-Facing",
    categoryTag: "Power & Gas Transmission",
    badgeText: "Exact Fit Engineering • TPI Verified • Rapid Outage Turnaround",
    overview: "Northern HeatEx supplies exact drop-in replacement tube bundles for existing shell-and-tube exchangers across hydro power stations, thermal power plants, and process industries. Engineered from precise physical site measurements or original drawings, our replacement bundles eliminate long outage delays.",
    workingPrinciple: "A pre-assembled replacement bundle comprising precision CNC drilled tubesheets, baffles, tie-rods, spacer tubes, and seamless straight or U-tubes is inserted into the host shell.",
    quickStats: [
      { label: "Turnaround Time", value: "Emergency Dispatch", detail: "For Outage Support" },
      { label: "Dimensional Accuracy", value: "Sub-Millimeter", detail: "Direct Drop-In Guaranteed" },
      { label: "Metallurgies", value: "Full Range Available", detail: "CuNi, Titanium, Stainless, Inconel" },
      { label: "Testing Clearance", value: "100% Hydro & NDT", detail: "Prior to Dispatch" }
    ],
    applications: [
      { title: "Power Station Condenser Bundle Overhaul", desc: "Complete retubing of surface condensers and LP heaters during plant turnaround.", industry: "Power Generation" },
      { title: "Hydro Turbine Oil Cooler Replacement", desc: "Drop-in CuNi tube bundles for thrust bearing and stator air cooling circuits.", industry: "Hydro Power" }
    ],
    engineeringFeatures: [
      { title: "CNC Precision Baffle Stacks", desc: "CNC-milled tube holes with chamfered edges to prevent tube scoring during bundle insertion." },
      { title: "Orbital TIG Tube Jointing", desc: "Precision orbital TIG tube-to-tubesheet strength welding." }
    ],
    availableConfigurations: ["Fixed Tubesheet Replacement Bundle", "Floating Head Bundle with Split Rings", "U-Tube Bundle Assembly"],
    materialsOptions: [
      { material: "Copper-Nickel", grade: "CuNi 90/10 (C70600) & 70/30", application: "Seawater & Hydro Plant Cooling", corrosionRating: "High Marine" },
      { material: "Admiralty Brass", grade: "C44300 Inhibited Brass", application: "Freshwater Condensers", corrosionRating: "Good" }
    ],
    asmeStandards: ["TEMA Class R, C, B", "TPI Cleared"],
    manufacturingQC: ["100% Pneumatic bubble testing", "Hydrostatic testing of completed bundle"],
    operatingLimits: { maxPressureBar: 300, maxTempC: 650, maxFlowM3h: 6000, surfaceAreaM2: "4,200 m²" },
    faqs: [
      { q: "Can Northern HeatEx fabricate replacement bundles without original drawings?", a: "Yes. Our engineers can measure your old bundle on site or at Works Facility at Haridwar to reproduce 2D/3D manufacturing drawings." }
    ],
    downloads: [
      { title: "Replacement Tube Bundle Specification Sheet", format: "PDF", size: "3.1 MB", docType: "Catalog" }
    ],
    calculatorPreset: { hotTempIn: 120, hotTempOut: 50, coldTempIn: 25, coldTempOut: 45, defaultPressure: 16 }
  },
  {
    id: "air-cooled",
    title: "Air-Cooled Heat Exchangers (Fin-Fan Coolers)",
    subtitle: "Forced & Induced Draft Fin-Fan Coolers for Heavy Duty Process",
    categoryTag: "Clean Energy & LNG",
    badgeText: "API 661 Standard Compliance • High-Efficiency Finned Tubes • TPI Verified",
    overview: "Northern HeatEx Air-Cooled Heat Exchangers (ACHE) utilize ambient air to cool hot process fluids or steam without consuming fresh water. Featuring heavy-duty axial fans, louvers, and spirally wound wire or strip finned tubing.",
    workingPrinciple: "Hot process fluid circulates through headers into multi-pass finned tube bundles. High-volume axial fans blow ambient air over the external finned surface, rejecting heat into the atmosphere.",
    quickStats: [
      { label: "Draft Options", value: "Forced or Induced", detail: "API 661 Design" },
      { label: "Finned Tube Types", value: "Wire-Wound / Extruded", detail: "High Heat Transfer Rate" },
      { label: "Noise Ratings", value: "Low-Noise Fans", detail: "VFD Speed Controlled" },
      { label: "Bay Lengths", value: "Up to 18 Meters", detail: "Modular Transportable Design" }
    ],
    applications: [
      { title: "Refinery Gas Overhead Coolers", desc: "Condensing hydrocarbon vapor fractions with zero cooling water consumption.", industry: "Refining" },
      { title: "Gas Compression Station Intercoolers", desc: "Cooling natural gas between compressor stages.", industry: "Gas Pipelines" }
    ],
    engineeringFeatures: [
      { title: "Spirally Wound Wire Fin Technology", desc: "High efficiency wire loops spirally wound under tension onto base tubes for high heat flux." },
      { title: "Plug Type Headers", desc: "Forged box headers with shoulder-threaded plug access for tube cleaning and inspection." }
    ],
    availableConfigurations: ["Forced Draft Horizontal ACHE", "Induced Draft ACHE", "V-Frame Compact Air Cooler"],
    materialsOptions: [
      { material: "Extruded Aluminum Fin", grade: "Al 1060 / Al 6063", application: "High Ambient Temperature Gas Cooling", corrosionRating: "Atmospheric Proof" },
      { material: "Wire-Wound Finned Tubing", grade: "Carbon Steel or Copper Fin", application: "Viscous Fluid Heat Flux", corrosionRating: "High Transfer" }
    ],
    asmeStandards: ["API 660 / API 661", "National & International Standards"],
    manufacturingQC: ["Dynamic balancing of fan assemblies", "Radiographic testing of header welds"],
    operatingLimits: { maxPressureBar: 450, maxTempC: 400, maxFlowM3h: 12000, surfaceAreaM2: "85,000 m² finned area" },
    faqs: [
      { q: "What is the advantage of wire-wound fin tubes over standard fins?", a: "Wire loops break up air-side boundary layer formation, increasing heat transfer rates by up to 300% compared to smooth helical fins." }
    ],
    downloads: [
      { title: "Air-Cooled Heat Exchanger Engineering Guide", format: "PDF", size: "5.4 MB", docType: "Guide" }
    ],
    calculatorPreset: { hotTempIn: 150, hotTempOut: 55, coldTempIn: 35, coldTempOut: 50, defaultPressure: 40 }
  },
  {
    id: "plate-and-frame",
    title: "Plate & Frame Heat Exchangers",
    subtitle: "Gasketed & Semi-Welded High Thermal Efficiency Compact Units",
    categoryTag: "Chemical & HVAC",
    badgeText: "High Heat Transfer Duty • Modular Plate Packs • TPI Inspected",
    overview: "Northern HeatEx Plate & Frame Heat Exchangers feature pressed corrugated alloy plates held within a heavy frame. Delivering thermal efficiency up to 3x higher than conventional shell-and-tube units in a compact footprint.",
    workingPrinciple: "Corrugated metal plates create narrow channels through which hot and cold fluids flow in counter-current directions. Chevron plate patterns create high fluid turbulence even at low flow velocities.",
    quickStats: [
      { label: "Thermal Efficiency", value: "Up to 93%", detail: "Close Temperature Approach" },
      { label: "Footprint Saving", value: "70% Smaller", detail: "Compared to Shell & Tube" },
      { label: "Plate Metallurgies", value: "SS316L, Titanium, Hastelloy", detail: "Corrosion Resistant" },
      { label: "Gasket Seal Types", value: "Clip-On NBR / EPDM", detail: "Easy Maintenance" }
    ],
    applications: [
      { title: "District Heating & HVAC Systems", desc: "Central heat transfer stations for HVAC and hot water loops.", industry: "Commercial HVAC" },
      { title: "Chemical Acid Cooling", desc: "Titanium plate heat exchangers handling chloride-laden liquids.", industry: "Chemical" }
    ],
    engineeringFeatures: [
      { title: "OptiWave Chevron Plate Corrugation", desc: "Even fluid distribution across entire width minimizing stagnant fouling zones." },
      { title: "Clip-On Glue-less Gaskets", desc: "Precision moulded elastomeric gaskets snap securely into channels for quick replacement." }
    ],
    availableConfigurations: ["Gasketed Plate & Frame", "Semi-Welded Twin Plate Unit", "Double-Wall Safety Exchanger"],
    materialsOptions: [
      { material: "Stainless Steel 316L", grade: "SA-240 316L (0.5mm - 0.7mm)", application: "Standard HVAC & Process Streams", corrosionRating: "High" },
      { material: "Titanium Grade 1", grade: "ASTM B265 Gr 1", application: "Seawater & Brine Cooling", corrosionRating: "Impervious" }
    ],
    asmeStandards: ["National & International Standards", "ISO 9001:2015"],
    manufacturingQC: ["100% dye penetrant testing of pressed plates", "Hydrostatic testing of plate pack"],
    operatingLimits: { maxPressureBar: 30, maxTempC: 200, maxFlowM3h: 4800, surfaceAreaM2: "2,200 m²" },
    faqs: [
      { q: "How easy is it to expand capacity on a plate heat exchanger?", a: "By loosening the frame tie-bolts, additional pressed plates can be added to increase thermal capacity effortlessly." }
    ],
    downloads: [
      { title: "Plate Heat Exchanger Technical Catalog", format: "PDF", size: "2.8 MB", docType: "Brochure" }
    ],
    calculatorPreset: { hotTempIn: 90, hotTempOut: 45, coldTempIn: 30, coldTempOut: 75, defaultPressure: 10 }
  },
  {
    id: "stator-generator",
    title: "Stator & Generator Air Coolers",
    subtitle: "Heavy-Duty Hydro & Turbo Generator Stator Frame Coolers",
    categoryTag: "Power Generation",
    badgeText: "Hydro & Power Sector Specialized • 100% Leak Proof • TPI Certified",
    overview: "Custom engineered for major power generating stations including NHPC Ltd, THDC Ltd, UJVNL, BBMB, and NPCIL. Our stator air coolers preserve generator winding insulation life by rejecting rotor and stator friction heat to closed cooling water loops.",
    workingPrinciple: "Hot closed-loop generator air flows over external wire-finned or strip-finned tubes. Cold water circulating inside the tubes absorbs heat, lowering air temperature before re-entering the generator rotor.",
    quickStats: [
      { label: "Target Machinery", value: "50 MW to 1000 MW", detail: "Hydro & Turbo Generators" },
      { label: "Tube Metallurgies", value: "CuNi 90/10 / Admiralty", detail: "High Corrosion Resistance" },
      { label: "Fin Geometry", value: "Wire-Wound / Plate Fin", detail: "Maximizes Air Turbulence" },
      { label: "Leak Integrity", value: "Zero Leakage", detail: "Mass Spec Vacuum Checked" }
    ],
    applications: [
      { title: "Hydro Power Station Generator Coolers", desc: "Stator frame cooling for vertical Francis and Pelton hydro turbine generators at UJVNL and NHPC stations.", industry: "Hydro Power" },
      { title: "Thermal Power Station Turbo Generators", desc: "Cooling closed hydrogen/air circuits in large utility turbo generators.", industry: "Thermal Utilities" }
    ],
    engineeringFeatures: [
      { title: "Removable Water Box Covers", desc: "Allows internal tube cleaning without disconnecting generator air ducting." },
      { title: "Double Tubesheet Protection", desc: "Eliminates risk of water ingress into generator electrical winding coils." }
    ],
    availableConfigurations: ["Vertical Stator Frame Cooler", "Horizontal Duct Section Air Cooler", "Sectional Modular Cooler"],
    materialsOptions: [
      { material: "Copper-Nickel 90/10", grade: "C70600 Finned Tubing", application: "River Water & Raw Water Coolers", corrosionRating: "Superior Marine" },
      { material: "Admiralty Brass", grade: "C44300", application: "Clean Reservoir Water Circuits", corrosionRating: "Excellent" }
    ],
    asmeStandards: ["National & International Standards", "ISO 9001:2015", "TPI Cleared"],
    manufacturingQC: ["Submerged air pressure leak testing", "Hydrostatic test at 1.5x working pressure"],
    operatingLimits: { maxPressureBar: 25, maxTempC: 150, maxFlowM3h: 3000, surfaceAreaM2: "1,800 m²" },
    faqs: [
      { q: "Why are double tubesheets used in generator coolers?", a: "An air gap between the two tubesheets ensures any joint weepage drains safely outward instead of spraying into high-voltage generator windings." }
    ],
    downloads: [
      { title: "Generator Stator Air Cooler Engineering Spec", format: "PDF", size: "3.9 MB", docType: "Specification" }
    ],
    calculatorPreset: { hotTempIn: 75, hotTempOut: 40, coldTempIn: 25, coldTempOut: 35, defaultPressure: 10 }
  },
  {
    id: "transformer-oil",
    title: "Transformer Oil Coolers (OFWF & OFAF)",
    subtitle: "Forced Oil Water / Air Coolers for Power Transformers",
    categoryTag: "Power & Gas Transmission",
    badgeText: "CBIP Standard Compliant • OFWF / OFAF Coolers • TPI Cleared",
    overview: "Northern HeatEx Transformer Oil Coolers are engineered for extra-high-voltage (EHV) power transformers and reactor units. Built to handle mineral transformer oil and synthetic ester fluids under continuous forced circulation.",
    workingPrinciple: "Hot transformer oil pumped from the top of the tank passes through compact cooler banks. Water (OFWF) or forced air (OFAF) removes heat from the oil, maintaining transformer winding hot-spot temperatures within safe insulation limits.",
    quickStats: [
      { label: "Cooling Methods", value: "OFWF & OFAF", detail: "Forced Oil Water / Air" },
      { label: "Oil Flow Rating", value: "Up to 500 m³/h", detail: "High Head Oil Pumps" },
      { label: "Thermal Capacity", value: "100 kW to 5,000 kW", detail: "Per Cooler Unit" },
      { label: "Oil Contamination", value: "Zero Water Ingress", detail: "Double Wall Security" }
    ],
    applications: [
      { title: "Grid Substation Transformer Cooling", desc: "400kV and 765kV power transformer oil coolers for state transmission grids.", industry: "Power Transmission" },
      { title: "Hydro Power Generator Transformers", desc: "OFWF oil-to-water heat exchangers for underground cavern transformer bays.", industry: "Hydro Power" }
    ],
    engineeringFeatures: [
      { title: "Inner Grooved Turbo-Tubes", desc: "Internal helical grooves enhance oil heat transfer coefficient by breaking laminar oil film." },
      { title: "Low-Noise Oil Pumps & Fans", desc: "Submerged glandless oil pumps eliminating shaft seal oil leakage." }
    ],
    availableConfigurations: ["Oil-to-Water Cooler (OFWF)", "Oil-to-Air Forced Cooler (OFAF)", "Compact Tank-Mounted Radiator Assembly"],
    materialsOptions: [
      { material: "Deoxidized High Conductivity Copper", grade: "C12200", application: "Transformer Oil Coils", corrosionRating: "High Conductivity" },
      { material: "Carbon Steel Shell", grade: "SA-516 Gr 70", application: "Heavy Transformer Oil Vessels", corrosionRating: "Standard" }
    ],
    asmeStandards: ["CBIP Manual Guidelines", "ISO 9001:2015 & ISO 14001:2025"],
    manufacturingQC: ["Hot transformer oil loop test", "High pressure nitrogen leak test"],
    operatingLimits: { maxPressureBar: 16, maxTempC: 130, maxFlowM3h: 1200, surfaceAreaM2: "2,500 m²" },
    faqs: [
      { q: "What is the difference between OFAF and OFWF cooling?", a: "OFAF uses forced air blown by fans over finned oil tubes, while OFWF uses forced water circulating inside tubes to cool transformer oil." }
    ],
    downloads: [
      { title: "Power Transformer Oil Cooler Manual", format: "PDF", size: "3.4 MB", docType: "Manual" }
    ],
    calculatorPreset: { hotTempIn: 85, hotTempOut: 55, coldTempIn: 30, coldTempOut: 42, defaultPressure: 6 }
  },
  {
    id: "steam-coil",
    title: "Steam Coil Air Heaters (SCAH)",
    subtitle: "Heavy Industrial Steam Coils for Boiler Air Preheating",
    categoryTag: "Power Generation",
    badgeText: "High Pressure Steam Rated • Freeze-Proof Coils • TPI Cleared",
    overview: "Northern HeatEx Steam Coil Air Heaters (SCAH) preheat combustion air entering thermal power station boilers, biomass boilers, and process furnaces using low or medium pressure steam.",
    workingPrinciple: "High-pressure steam condenses inside heavy-wall finned tubes arranged in serpentine coil banks. Latent heat of vaporization is transferred directly to the high-velocity duct air stream flowing over external spiral-wound or tension-wound fins.",
    quickStats: [
      { label: "Steam Pressure", value: "Up to 85 Bar", detail: "High Pressure Steam Rated" },
      { label: "Air Temperature Rise", value: "+30°C to +180°C", detail: "Combustion Efficiency Boost" },
      { label: "Tube Materials", value: "SA-214 / SA-179 / SS316", detail: "Heavy Wall Seamless" },
      { label: "Freeze Protection", value: "Vertical Tube Pitch", detail: "Self-Draining Condensate" }
    ],
    applications: [
      { title: "Boiler Air Preheating (SCAH)", desc: "Preheating boiler forced-draft combustion air to prevent cold-end acid dew-point corrosion.", industry: "Power Plants" },
      { title: "Paper Mill & Textile Dryers", desc: "High-temperature air heating for industrial drying tunnels.", industry: "Paper & Textile" }
    ],
    engineeringFeatures: [
      { title: "Tension-Wound Helical Fins", desc: "Heavy spiral fins wound under continuous tension for maximum heat transfer contact." },
      { title: "Floating Header Thermal Expansion", desc: "Floating steam header allows differential coil expansion during rapid boiler start-up." }
    ],
    availableConfigurations: ["Single-Row Serpentine SCAH Coil", "Multi-Row Modular SCAH Bank", "Removable Frame SCAH Assembly"],
    materialsOptions: [
      { material: "Seamless Carbon Steel", grade: "SA-179 / SA-214", application: "Standard Steam Air Heaters", corrosionRating: "Standard" },
      { material: "Stainless Steel 316L", grade: "SA-240 316L", application: "Corrosive Duct Gases", corrosionRating: "High" }
    ],
    asmeStandards: ["National & International Standards", "TPI Cleared"],
    manufacturingQC: ["100% Hydrostatic test at 1.5x steam design pressure"],
    operatingLimits: { maxPressureBar: 85, maxTempC: 350, maxFlowM3h: 25000, surfaceAreaM2: "6,000 m²" },
    faqs: [
      { q: "How does SCAH prevent cold-end corrosion in rotary air preheaters?", a: "By raising incoming air temperature above the flue gas acid dew point (approx. 110°C - 130°C), SCAH prevents sulfuric acid condensation on metal plates." }
    ],
    downloads: [
      { title: "Steam Coil Air Heater Application Guide", format: "PDF", size: "4.1 MB", docType: "Guide" }
    ],
    calculatorPreset: { hotTempIn: 210, hotTempOut: 180, coldTempIn: 25, coldTempOut: 110, defaultPressure: 18 }
  },
  {
    id: "condensers-reboilers",
    title: "Condensers & Kettle Reboilers",
    subtitle: "Steam Surface Condensers & High Duty Kettle Process Reboilers",
    categoryTag: "Process & Refineries",
    badgeText: "HEI Standard Compliant • High Vacuum Condensers • TPI Clearance",
    overview: "Engineered for thermal power plants, sugar mills, and chemical distillation columns. Northern HeatEx Condensers and Reboilers handle phase-change heat transfer under strict pressure control.",
    workingPrinciple: "In steam surface condensers, exhaust steam from turbines condenses on the outer tube surface under high vacuum. In kettle reboilers, process liquid fills an enlarged shell chamber containing a submerged heating tube bundle.",
    quickStats: [
      { label: "Vacuum Service", value: "Down to 0.04 Bar(a)", detail: "HEI Standard Vacuum" },
      { label: "Reboiler Shells", value: "Enlarged Vapor Dome", detail: "Prevents Liquid Entrainment" },
      { label: "Condenser Tubes", value: "Titanium / CuNi / SS316L", detail: "High Velocity Flow" },
      { label: "Non-Condensable Removal", value: "Internal Air Coolers", detail: "Integrated Vacuum Extraction" }
    ],
    applications: [
      { title: "Steam Surface Condensers", desc: "Main turbine exhaust steam condensing for power generating stations.", industry: "Power Generation" },
      { title: "Distillation Column Reboilers", desc: "Bottom liquid vaporization in petrochemical fractionating towers.", industry: "Refining" }
    ],
    engineeringFeatures: [
      { title: "HEI Optimized Tube Layouts", desc: "Steam lane orientation engineered to minimize pressure drop and eliminate stagnant air pockets." },
      { title: "Internal Baffled Vapor Disengagement", desc: "Kettle reboiler shells feature large vapor spaces to release clean dry gas." }
    ],
    availableConfigurations: ["Surface Condenser (Direct Axial Exhaust)", "TEMA AKT Kettle Reboiler", "Thermosyphon Vertical Reboiler"],
    materialsOptions: [
      { material: "Titanium Grade 2", grade: "SB-338 Gr 2", application: "Seawater Cooled Surface Condensers", corrosionRating: "Impervious" },
      { material: "Low Carbon Steel", grade: "SA-516 Gr 70", application: "Standard Kettle Reboiler Shells", corrosionRating: "Standard" }
    ],
    asmeStandards: ["HEI Standards for Steam Surface Condensers", "TEMA Class R, C, B"],
    manufacturingQC: ["Helium mass spec leak testing on vacuum joints", "Hydrostatic testing"],
    operatingLimits: { maxPressureBar: 180, maxTempC: 500, maxFlowM3h: 18000, surfaceAreaM2: "7,200 m²" },
    faqs: [
      { q: "Why is vacuum integrity critical for surface condensers?", a: "Even a small air leak into the vacuum condenser raises backpressure on the turbine, significantly reducing electrical power generation efficiency." }
    ],
    downloads: [
      { title: "Surface Condenser & Reboiler Design Whitepaper", format: "PDF", size: "4.8 MB", docType: "Whitepaper" }
    ],
    calculatorPreset: { hotTempIn: 110, hotTempOut: 45, coldTempIn: 28, coldTempOut: 38, defaultPressure: 1 }
  },
  {
    id: "marine-offshore",
    title: "Marine & Hydro Heat Exchangers",
    subtitle: "Seawater Resistant Titanium & CuNi Heat Exchangers",
    categoryTag: "Marine & FPSO",
    badgeText: "Seawater Resistant • Titanium & CuNi Metallurgy • TPI Cleared",
    overview: "Engineered specifically for harsh marine environments, hydro power stations, commercial ships, and naval vessels. Built with Titanium, CuNi 90/10, and Super Duplex stainless steels, Northern HeatEx Marine & Hydro Heat Exchangers withstand biofouling and aggressive raw water corrosion.",
    workingPrinciple: "Raw water is pumped through corrosion-impervious Titanium or Copper-Nickel tube circuits, absorbing heat from central closed-loop cooling water, lube oil, or main propulsion engine jacket water.",
    quickStats: [
      { label: "Seawater Resistance", value: "100% Immunity", detail: "Titanium / CuNi 90/10" },
      { label: "Biofouling Control", value: "CuNi Natural Biocide", detail: "Inhibits Aquatic Growth" },
      { label: "Tube Materials", value: "Titanium Gr 2 / CuNi", detail: "High Corrosion Protection" },
      { label: "Design Life", value: "30+ Years", detail: "Marine & Hydro Station Life" }
    ],
    applications: [
      { title: "Hydro Power Station Plant Coolers", desc: "Cooling closed-loop fresh water modules on hydro stations.", industry: "Hydro Power" },
      { title: "Ship Main Engine Jacket Water Coolers", desc: "Primary propulsion engine thermal management with raw seawater.", industry: "Commercial Marine" }
    ],
    engineeringFeatures: [
      { title: "Dynamic Wave Motion Internal Baffling", desc: "Special baffle support structures preventing fluid sloshing during vessel movement." },
      { title: "Sacrificial Zinc Protection", desc: "Replaceable galvanic anodes integrated into water boxes to protect against stray currents." }
    ],
    availableConfigurations: ["Titanium Shell & Tube Exchanger", "Direct Seawater Box Cooler"],
    materialsOptions: [
      { material: "Titanium Grade 2", grade: "ASTM B338 Gr 2", application: "Direct Raw Seawater Exposure", corrosionRating: "Impervious" },
      { material: "Copper-Nickel 90/10", grade: "C70600", application: "Engine Jacket Water Coolers", corrosionRating: "Natural Antifouling" }
    ],
    asmeStandards: ["National & International Standards", "ISO 9001:2015"],
    manufacturingQC: ["Helium leak test", "Full hydrostatic test"],
    operatingLimits: { maxPressureBar: 40, maxTempC: 180, maxFlowM3h: 6000, surfaceAreaM2: "3,500 m²" },
    faqs: [
      { q: "Why is Titanium Grade 2 preferred for raw seawater coolers?", a: "Titanium forms a self-healing titanium oxide passive surface film that is completely immune to pitting and crevice corrosion in raw water." }
    ],
    downloads: [
      { title: "Marine & Hydro Heat Exchanger Catalog", format: "PDF", size: "5.2 MB", docType: "Catalog" }
    ],
    calculatorPreset: { hotTempIn: 70, hotTempOut: 36, coldTempIn: 22, coldTempOut: 32, defaultPressure: 12 }
  },
  {
    id: "custom-engineered",
    title: "Custom Engineered Heat Exchangers",
    subtitle: "Bespoke Thermal Units & Heavy Duty Specialized Process Equipment",
    categoryTag: "Specialty & Prototype",
    badgeText: "Bespoke Engineering • Custom Geometries • Exotic Metallurgies",
    overview: "When standard heat exchangers cannot meet custom spatial boundaries or non-standard fluid demands, Northern HeatEx Custom Engineering Group delivers. We design, build, and test custom thermal units with exotic alloys and tailored fluid routing.",
    workingPrinciple: "Custom fluid routing geometries tailored to specific customer thermal envelope constraints. May combine multiple heat exchange mechanisms or multi-stream topologies.",
    quickStats: [
      { label: "Custom Design", value: "100% Bespoke", detail: "Zero Template Constraints" },
      { label: "Multifluid Capacity", value: "Multi-Stream", detail: "Single Integrated Core" },
      { label: "Simulation", value: "3D CFD Validation", detail: "Fluid Dynamics Verified" },
      { label: "Testing", value: "Full Factory Test", detail: "Haridwar Facility Rig" }
    ],
    applications: [
      { title: "Specialized Process Brine Exchangers", desc: "Handling corrosive mineral brine streams without scaling or structural corrosion.", industry: "Process Utilities" },
      { title: "Carbon Capture Gas Units", desc: "Custom stainless / titanium multi-stage gas strippers.", industry: "Process Engineering" }
    ],
    engineeringFeatures: [
      { title: "3D Computational Fluid Dynamics (CFD)", desc: "Full fluid turbulence and conjugate heat transfer simulation prior to metal cutting." },
      { title: "Exotic Alloy Cladding", desc: "Explosion clad or roll-clad combinations of Tantalum, Zirconium, and Hastelloy." }
    ],
    availableConfigurations: ["Multi-Stream Heat Exchanger Core", "Non-Symmetrical Geometry Shell"],
    materialsOptions: [
      { material: "Pure Tantalum", grade: "UNS R05200", application: "Concentrated Acid Streams", corrosionRating: "Ultimate Chemical" },
      { material: "Zirconium 702", grade: "UNS R60702", application: "Corrosive Acid Synthesis", corrosionRating: "Extreme Acid" }
    ],
    asmeStandards: ["National & International Standards", "ISO 9001:2015"],
    manufacturingQC: ["Factory performance rig testing with calibrated mass flow meters"],
    operatingLimits: { maxPressureBar: 400, maxTempC: 800, maxFlowM3h: 5000, surfaceAreaM2: "Custom" },
    faqs: [
      { q: "What is the typical lead time for a custom engineered exchanger?", a: "Depending on raw material availability, custom units range from 8 to 16 weeks including full engineering validation." }
    ],
    downloads: [
      { title: "Custom Engineering & Special Metallurgy Guide", format: "PDF", size: "3.8 MB", docType: "Guide" }
    ],
    calculatorPreset: { hotTempIn: 200, hotTempOut: 60, coldTempIn: 25, coldTempOut: 110, defaultPressure: 50 }
  },
  {
    id: "spare-parts-lifecycle",
    title: "Spare Parts & Lifecycle Engineering",
    subtitle: "Gaskets, Tube Bundles, Headers, Tube Plugs & Re-Babbitting Services",
    categoryTag: "Services & Spare Parts",
    badgeText: "Spare Parts • Re-Babbitting Services • On-Site Engineering Teams",
    overview: "Northern HeatEx maintains a comprehensive inventory of certified raw tube stock, replacement gaskets, tubesheets, tube plugs, and re-babbitting alloy supplies. Supported by our mobile field service crews at Works Facility at Haridwar, we provide emergency on-site leak repairs and bearing re-babbitting.",
    workingPrinciple: "Rapid deployment of original certified spare components and field engineering teams equipped with specialized hydraulic bundle pullers, torque wrenches, and tube expansion equipment.",
    quickStats: [
      { label: "Inventory Stock", value: "Ready Stock", detail: "SA-179, SA-214, 316L, Duplex" },
      { label: "Dispatch Time", value: "Rapid Dispatch", detail: "In-Stock Emergency Parts" },
      { label: "Field Service", value: "Mobile Crews", detail: "On-Site Deployment" },
      { label: "Gasket Materials", value: "NBR, EPDM, Viton, PTFE", detail: "Precision Seals" }
    ],
    applications: [
      { title: "Power & Refinery Outage Support", desc: "In-situ field retubing and bundle replacement within tight outage windows.", industry: "Refining & Power" },
      { title: "White Metal Bearing Re-Babbitting", desc: "ASTM B23 tin-based babbitt bearing overhaul for Turbine Guide pads, Upper guide pads, Lower guide pads, and Thrust Pads with 100% bonding and defect free surface.", industry: "Hydro Power" }
    ],
    engineeringFeatures: [
      { title: "Hydraulic Bundle Puller Systems", desc: "Mobile self-contained bundle extractors for safe field removal." },
      { title: "Ultrasonic Eddy Current Tube Inspection", desc: "Non-destructive flaw detection identifying wall loss before leaks occur." }
    ],
    availableConfigurations: ["Replacement Tube Stock (Straight & U-Bent)", "Plate Exchanger Gaskets", "Threaded Tube Plugs", "Turbine Guide & Thrust Pads Re-Babbitting"],
    materialsOptions: [
      { material: "High Temp Viton / FKM", grade: "Viton GF", application: "Hydrocarbon Chemical Plate Gaskets", corrosionRating: "Chemical Seal" },
      { material: "Brass & Alloy Tube Plugs", grade: "316 SS / Brass Plugs", application: "Emergency Tube Isolation Plugs", corrosionRating: "High Pressure Seal" }
    ],
    asmeStandards: ["National & International Standards", "ISO 9001:2015 & ISO 14001:2025"],
    manufacturingQC: ["Positive Material Identification (PMI) report with every shipment"],
    operatingLimits: { maxPressureBar: 350, maxTempC: 600, maxFlowM3h: 0, surfaceAreaM2: "N/A" },
    faqs: [
      { q: "Do you supply gaskets for non-Northern HeatEx plate exchangers?", a: "Yes. We supply 100% compatible replacement gaskets and plates for standard industrial plate exchangers." }
    ],
    downloads: [
      { title: "Spare Parts & Service Catalog", format: "PDF", size: "2.5 MB", docType: "Catalog" }
    ],
    calculatorPreset: { hotTempIn: 100, hotTempOut: 50, coldTempIn: 20, coldTempOut: 60, defaultPressure: 16 }
  }
];
