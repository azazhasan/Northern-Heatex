import React, { useState, useMemo } from "react";
import { ShapeVisualGraphic } from "./ShapeVisualGraphics";
import {
  Scale,
  Calculator,
  DollarSign,
  Package,
  Ruler,
  Layers,
  Copy,
  Check,
  RotateCcw,
  Sparkles,
  Info,
  ChevronDown,
  PieChart,
  Tag,
  Boxes,
  FileSpreadsheet
} from "lucide-react";
import { motion } from "motion/react";

// --- MATERIAL DATABASE WITH DENSITIES AND DEFAULT MARKET BENCHMARK PRICES ---

export interface MaterialOption {
  id: string;
  name: string;
  category: "carbon_steel" | "stainless_steel" | "duplex" | "nickel_alloy" | "copper_alloy" | "titanium" | "aluminum" | "non_metal";
  categoryLabel: string;
  densityKgM3: number; // Density in kg/m³
  densityLbIn3: number; // Density in lb/in³
  defaultPricePerKgUSD: number; // Default benchmark price in USD / kg
  description: string;
  isFerrous: boolean;
}

export const MATERIAL_LIBRARY: MaterialOption[] = [
  // Carbon & Low Alloy Steel (Ferrous)
  {
    id: "cs_a106_a516",
    name: "Carbon Steel (SA-516 Gr. 70 / SA-106 Gr. B)",
    category: "carbon_steel",
    categoryLabel: "Carbon & Low Alloy Steel",
    densityKgM3: 7850,
    densityLbIn3: 0.2836,
    defaultPricePerKgUSD: 1.25,
    description: "Standard ASME pressure vessel plate and seamless tube material",
    isFerrous: true,
  },
  {
    id: "cs_ltcs_a333",
    name: "LTCS (SA-333 Gr. 6 / SA-350 LF2)",
    category: "carbon_steel",
    categoryLabel: "Carbon & Low Alloy Steel",
    densityKgM3: 7850,
    densityLbIn3: 0.2836,
    defaultPricePerKgUSD: 1.65,
    description: "Low-temperature carbon steel for sub-zero cryogenic service (-46°C)",
    isFerrous: true,
  },
  {
    id: "alloy_cr_mo",
    name: "Cr-Mo Alloy Steel (SA-387 Gr. 11/22 / P11/P22)",
    category: "carbon_steel",
    categoryLabel: "Carbon & Low Alloy Steel",
    densityKgM3: 7850,
    densityLbIn3: 0.2836,
    defaultPricePerKgUSD: 2.80,
    description: "Chromium-molybdenum high temperature creep resistant alloy steel",
    isFerrous: true,
  },

  // Stainless Steel (Ferrous - Austenitic)
  {
    id: "ss_304",
    name: "Stainless Steel 304 / 304L (UNS S30400/S30403)",
    category: "stainless_steel",
    categoryLabel: "Stainless Steels",
    densityKgM3: 7930,
    densityLbIn3: 0.2865,
    defaultPricePerKgUSD: 3.40,
    description: "Standard 18/8 austenitic stainless steel for general corrosion service",
    isFerrous: true,
  },
  {
    id: "ss_316",
    name: "Stainless Steel 316 / 316L (UNS S31600/S31603)",
    category: "stainless_steel",
    categoryLabel: "Stainless Steels",
    densityKgM3: 8000,
    densityLbIn3: 0.289,
    defaultPricePerKgUSD: 4.80,
    description: "Molybdenum-bearing stainless steel for marine & chloride resistance",
    isFerrous: true,
  },
  {
    id: "ss_317l",
    name: "Stainless Steel 317L (UNS S31703)",
    category: "stainless_steel",
    categoryLabel: "Stainless Steels",
    densityKgM3: 8000,
    densityLbIn3: 0.289,
    defaultPricePerKgUSD: 6.20,
    description: "High molybdenum stainless steel for severe acid condensate service",
    isFerrous: true,
  },
  {
    id: "ss_321_347",
    name: "Stainless Steel 321 / 347 (Titanium/Niobium Stabilized)",
    category: "stainless_steel",
    categoryLabel: "Stainless Steels",
    densityKgM3: 8000,
    densityLbIn3: 0.289,
    defaultPricePerKgUSD: 5.40,
    description: "Stabilized stainless steel for high temperature intergranular corrosion",
    isFerrous: true,
  },
  {
    id: "ss_904l",
    name: "Stainless Steel 904L (UNS N08904)",
    category: "stainless_steel",
    categoryLabel: "Stainless Steels",
    densityKgM3: 8050,
    densityLbIn3: 0.2908,
    defaultPricePerKgUSD: 11.50,
    description: "High nickel super-austenitic stainless steel for sulfuric acid",
    isFerrous: true,
  },

  // Duplex & Super Duplex Steel (Ferrous)
  {
    id: "duplex_2205",
    name: "Duplex 2205 (UNS S31803 / S32205)",
    category: "duplex",
    categoryLabel: "Duplex & Super Duplex",
    densityKgM3: 7800,
    densityLbIn3: 0.2818,
    defaultPricePerKgUSD: 5.90,
    description: "22% Cr duplex stainless steel with high mechanical strength & pitting resistance",
    isFerrous: true,
  },
  {
    id: "super_duplex_2507",
    name: "Super Duplex 2507 (UNS S32750)",
    category: "duplex",
    categoryLabel: "Duplex & Super Duplex",
    densityKgM3: 7800,
    densityLbIn3: 0.2818,
    defaultPricePerKgUSD: 8.50,
    description: "25% Cr super duplex steel for offshore oil & gas seawater applications",
    isFerrous: true,
  },

  // Nickel Alloys (Non-Ferrous)
  {
    id: "monel_400",
    name: "Monel 400 (UNS N04400 / Nickel-Copper)",
    category: "nickel_alloy",
    categoryLabel: "Nickel Alloys (High Performance)",
    densityKgM3: 8800,
    densityLbIn3: 0.318,
    defaultPricePerKgUSD: 28.00,
    description: "Nickel-copper alloy with superior resistance to hydrofluoric acid & seawater",
    isFerrous: false,
  },
  {
    id: "inconel_600_625",
    name: "Inconel 625 (UNS N06625 / Nickel-Chromium)",
    category: "nickel_alloy",
    categoryLabel: "Nickel Alloys (High Performance)",
    densityKgM3: 8440,
    densityLbIn3: 0.305,
    defaultPricePerKgUSD: 36.50,
    description: "High strength nickel-chromium-molybdenum alloy for extreme heat & oxidation",
    isFerrous: false,
  },
  {
    id: "hastelloy_c276",
    name: "Hastelloy C-276 (UNS N10276 / Ni-Mo-Cr)",
    category: "nickel_alloy",
    categoryLabel: "Nickel Alloys (High Performance)",
    densityKgM3: 8890,
    densityLbIn3: 0.321,
    defaultPricePerKgUSD: 42.00,
    description: "Premier corrosion resistant alloy against wet chlorine gas & harsh chemicals",
    isFerrous: false,
  },
  {
    id: "incoloy_800_825",
    name: "Incoloy 825 (UNS N08825)",
    category: "nickel_alloy",
    categoryLabel: "Nickel Alloys (High Performance)",
    densityKgM3: 8100,
    densityLbIn3: 0.2926,
    defaultPricePerKgUSD: 22.50,
    description: "Nickel-iron-chromium alloy with molybdenum & copper for acid heat exchangers",
    isFerrous: false,
  },

  // Copper Alloys (Non-Ferrous)
  {
    id: "cuni_90_10",
    name: "Copper Nickel 90/10 (UNS C70600)",
    category: "copper_alloy",
    categoryLabel: "Copper & Brass Alloys",
    densityKgM3: 8940,
    densityLbIn3: 0.323,
    defaultPricePerKgUSD: 14.20,
    description: "Standard marine condenser & seawater heat exchanger tube material",
    isFerrous: false,
  },
  {
    id: "cuni_70_30",
    name: "Copper Nickel 70/30 (UNS C71500)",
    category: "copper_alloy",
    categoryLabel: "Copper & Brass Alloys",
    densityKgM3: 8940,
    densityLbIn3: 0.323,
    defaultPricePerKgUSD: 16.80,
    description: "Higher strength Cu-Ni alloy for high velocity seawater condensers",
    isFerrous: false,
  },
  {
    id: "admiralty_brass",
    name: "Admiralty Brass (UNS C44300)",
    category: "copper_alloy",
    categoryLabel: "Copper & Brass Alloys",
    densityKgM3: 8530,
    densityLbIn3: 0.308,
    defaultPricePerKgUSD: 9.80,
    description: "Inhibited brass for power plant steam condensers & oil coolers",
    isFerrous: false,
  },
  {
    id: "pure_copper",
    name: "Pure Copper (UNS C11000 / ETP Copper)",
    category: "copper_alloy",
    categoryLabel: "Copper & Brass Alloys",
    densityKgM3: 8960,
    densityLbIn3: 0.3237,
    defaultPricePerKgUSD: 10.50,
    description: "Ultra-high thermal conductivity pure copper for electrical & chiller coils",
    isFerrous: false,
  },

  // Titanium Alloys (Non-Ferrous)
  {
    id: "ti_gr2",
    name: "Titanium Grade 2 (UNS R50400 / Commercially Pure)",
    category: "titanium",
    categoryLabel: "Titanium Alloys",
    densityKgM3: 4510,
    densityLbIn3: 0.163,
    defaultPricePerKgUSD: 24.50,
    description: "Lightweight titanium for plate heat exchangers & seawater desalination",
    isFerrous: false,
  },
  {
    id: "ti_gr5",
    name: "Titanium Grade 5 (Ti-6Al-4V)",
    category: "titanium",
    categoryLabel: "Titanium Alloys",
    densityKgM3: 4430,
    densityLbIn3: 0.160,
    defaultPricePerKgUSD: 38.00,
    description: "High strength aerospace & high-pressure titanium alloy",
    isFerrous: false,
  },

  // Aluminum Alloys (Non-Ferrous)
  {
    id: "al_6061_5052",
    name: "Aluminum 6061-T6 / 5052-H32",
    category: "aluminum",
    categoryLabel: "Aluminum Alloys",
    densityKgM3: 2700,
    densityLbIn3: 0.0975,
    defaultPricePerKgUSD: 3.80,
    description: "Lightweight aluminum for air-cooled exchangers (fin fans) & radiator fins",
    isFerrous: false,
  },

  // Non-Metals, Gaskets & Refractories
  {
    id: "ptfe_teflon",
    name: "PTFE / Teflon (Gasket & Sleeve)",
    category: "non_metal",
    categoryLabel: "Non-Metals, Gaskets & Plastics",
    densityKgM3: 2200,
    densityLbIn3: 0.0795,
    defaultPricePerKgUSD: 18.00,
    description: "Chemically inert gasket lining & corrosive tube insert material",
    isFerrous: false,
  },
  {
    id: "viton_fkm",
    name: "Viton / FKM Elastomer Gasket",
    category: "non_metal",
    categoryLabel: "Non-Metals, Gaskets & Plastics",
    densityKgM3: 1850,
    densityLbIn3: 0.0668,
    defaultPricePerKgUSD: 32.00,
    description: "High temperature fluorocarbon gasket for PHE (Plate Heat Exchangers)",
    isFerrous: false,
  },
  {
    id: "graphite_expanded",
    name: "Expanded Flexible Graphite Sheet",
    category: "non_metal",
    categoryLabel: "Non-Metals, Gaskets & Plastics",
    densityKgM3: 1000,
    densityLbIn3: 0.0361,
    defaultPricePerKgUSD: 22.00,
    description: "High temperature spiral wound gasket filler & graphite exchanger block",
    isFerrous: false,
  },
  {
    id: "cnaf_gasket",
    name: "Non-Asbestos Fiber Sheet (CNAF)",
    category: "non_metal",
    categoryLabel: "Non-Metals, Gaskets & Plastics",
    densityKgM3: 1800,
    densityLbIn3: 0.065,
    defaultPricePerKgUSD: 8.50,
    description: "Standard jointing sheet gasket for flange sealing",
    isFerrous: false,
  },
];

// --- SHAPE & PROFILE GEOMETRIES ---

export type ShapeTypeKey =
  | "plate_sheet"
  | "round_bar"
  | "tube_pipe"
  | "square_bar"
  | "hollow_square"
  | "angle_iron"
  | "c_channel"
  | "i_beam"
  | "tubesheet_disc"
  | "hex_bar";

export interface ShapeDefinition {
  id: ShapeTypeKey;
  label: string;
  shortLabel: string;
  iconName: string;
  description: string;
  dimensions: { key: string; label: string; defaultMm: number; placeholder: string }[];
}

export const SHAPE_DEFINITIONS: ShapeDefinition[] = [
  {
    id: "plate_sheet",
    label: "Sheet / Plate / Flat Bar",
    shortLabel: "Plate / Flat",
    iconName: "Layers",
    description: "Rectangular shell plates, baffle plates, channel covers & flat bars",
    dimensions: [
      { key: "thickness", label: "Thickness (T)", defaultMm: 12, placeholder: "e.g., 12 mm or 0.5 in" },
      { key: "width", label: "Width (W)", defaultMm: 1500, placeholder: "e.g., 1500 mm" },
      { key: "length", label: "Length (L)", defaultMm: 3000, placeholder: "e.g., 3000 mm" },
    ],
  },
  {
    id: "tube_pipe",
    label: "Tube / Round Pipe / Hollow Bar",
    shortLabel: "Tube / Pipe",
    iconName: "Circle",
    description: "Heat exchanger tubes, shell pipes, nozzle necks & hollow bars",
    dimensions: [
      { key: "od", label: "Outer Diameter (OD)", defaultMm: 19.05, placeholder: "e.g., 19.05 mm (3/4 in)" },
      { key: "wt", label: "Wall Thickness (WT)", defaultMm: 1.65, placeholder: "e.g., 1.65 mm (BWG 16)" },
      { key: "length", label: "Length (L)", defaultMm: 6000, placeholder: "e.g., 6000 mm (20 ft)" },
    ],
  },
  {
    id: "round_bar",
    label: "Round Bar / Solid Rod",
    shortLabel: "Round Bar",
    iconName: "CircleDot",
    description: "Tie rods, spacer rods, studs & solid cylindrical shafts",
    dimensions: [
      { key: "diameter", label: "Diameter (D)", defaultMm: 25, placeholder: "e.g., 25 mm or 1 in" },
      { key: "length", label: "Length (L)", defaultMm: 2000, placeholder: "e.g., 2000 mm" },
    ],
  },
  {
    id: "tubesheet_disc",
    label: "Tube Sheet Disc / Circular Flange",
    shortLabel: "Tube Sheet / Disc",
    iconName: "Disc",
    description: "Perforated circular tube sheets, body flanges & circular blind plates",
    dimensions: [
      { key: "od", label: "Outer Diameter (OD)", defaultMm: 800, placeholder: "e.g., 800 mm" },
      { key: "id", label: "Inner Cutout ID (0 if solid)", defaultMm: 0, placeholder: "0 for solid disc" },
      { key: "thickness", label: "Thickness (T)", defaultMm: 50, placeholder: "e.g., 50 mm" },
      { key: "holeCount", label: "Number of Tube Holes", defaultMm: 320, placeholder: "e.g., 320 holes" },
      { key: "holeDia", label: "Hole Diameter", defaultMm: 19.25, placeholder: "e.g., 19.25 mm" },
    ],
  },
  {
    id: "square_bar",
    label: "Square / Rectangular Bar",
    shortLabel: "Square Bar",
    iconName: "Square",
    description: "Square keyways, support rails & solid block supports",
    dimensions: [
      { key: "width", label: "Width (W)", defaultMm: 50, placeholder: "e.g., 50 mm" },
      { key: "height", label: "Height (H)", defaultMm: 50, placeholder: "e.g., 50 mm" },
      { key: "length", label: "Length (L)", defaultMm: 1000, placeholder: "e.g., 1000 mm" },
    ],
  },
  {
    id: "hollow_square",
    label: "Square / Rectangular Pipe (RHS/SHS)",
    shortLabel: "Hollow Square",
    iconName: "Box",
    description: "Structural skid frame hollow section tubing",
    dimensions: [
      { key: "width", label: "Width (W)", defaultMm: 100, placeholder: "e.g., 100 mm" },
      { key: "height", label: "Height (H)", defaultMm: 100, placeholder: "e.g., 100 mm" },
      { key: "wt", label: "Wall Thickness (WT)", defaultMm: 5, placeholder: "e.g., 5 mm" },
      { key: "length", label: "Length (L)", defaultMm: 6000, placeholder: "e.g., 6000 mm" },
    ],
  },
  {
    id: "angle_iron",
    label: "Equal / Unequal L-Angle Iron",
    shortLabel: "L-Angle",
    iconName: "CornerDownRight",
    description: "Structural support angles, baffle runners & skid framing",
    dimensions: [
      { key: "leg1", label: "Leg 1 Width (A)", defaultMm: 75, placeholder: "e.g., 75 mm" },
      { key: "leg2", label: "Leg 2 Width (B)", defaultMm: 75, placeholder: "e.g., 75 mm" },
      { key: "thickness", label: "Thickness (T)", defaultMm: 6, placeholder: "e.g., 6 mm" },
      { key: "length", label: "Length (L)", defaultMm: 6000, placeholder: "e.g., 6000 mm" },
    ],
  },
  {
    id: "c_channel",
    label: "C-Channel / Structural Channel",
    shortLabel: "C-Channel",
    iconName: "Columns",
    description: "Base skid frame channels & cradle support beams",
    dimensions: [
      { key: "height", label: "Web Height (H)", defaultMm: 150, placeholder: "e.g., 150 mm" },
      { key: "flangeWidth", label: "Flange Width (B)", defaultMm: 75, placeholder: "e.g., 75 mm" },
      { key: "webThickness", label: "Web Thickness (tw)", defaultMm: 6, placeholder: "e.g., 6 mm" },
      { key: "flangeThickness", label: "Flange Thickness (tf)", defaultMm: 9, placeholder: "e.g., 9 mm" },
      { key: "length", label: "Length (L)", defaultMm: 6000, placeholder: "e.g., 6000 mm" },
    ],
  },
  {
    id: "i_beam",
    label: "I-Beam / H-Beam Structural Section",
    shortLabel: "I-Beam / H-Beam",
    iconName: "Binary",
    description: "Heavy heat exchanger skid frame main beams",
    dimensions: [
      { key: "height", label: "Total Height (H)", defaultMm: 200, placeholder: "e.g., 200 mm" },
      { key: "flangeWidth", label: "Flange Width (B)", defaultMm: 150, placeholder: "e.g., 150 mm" },
      { key: "webThickness", label: "Web Thickness (tw)", defaultMm: 6.5, placeholder: "e.g., 6.5 mm" },
      { key: "flangeThickness", label: "Flange Thickness (tf)", defaultMm: 10, placeholder: "e.g., 10 mm" },
      { key: "length", label: "Length (L)", defaultMm: 6000, placeholder: "e.g., 6000 mm" },
    ],
  },
  {
    id: "hex_bar",
    label: "Hexagonal Bar",
    shortLabel: "Hex Bar",
    iconName: "Hexagon",
    description: "Hexagonal fasteners, bolt stock & specialized fittings",
    dimensions: [
      { key: "flatToFlat", label: "Flat-to-Flat Width (S)", defaultMm: 36, placeholder: "e.g., 36 mm" },
      { key: "length", label: "Length (L)", defaultMm: 1000, placeholder: "e.g., 1000 mm" },
    ],
  },
];

// --- MAIN COMPONENT ---

export interface MaterialWeightCalculatorProps {
  embeddedInModal?: boolean;
}

export const MaterialWeightCalculator: React.FC<MaterialWeightCalculatorProps> = ({
  embeddedInModal = false,
}) => {
  // Input states
  const [selectedMaterialId, setSelectedMaterialId] = useState<string>("cs_a106_a516");
  const [selectedShapeId, setSelectedShapeId] = useState<ShapeTypeKey>("tube_pipe");
  const [dimUnit, setDimUnit] = useState<"mm" | "inch" | "meter" | "feet">("mm");

  // Dynamic state for shape dimensions
  const [dimValues, setDimValues] = useState<Record<string, number>>({
    od: 19.05,
    wt: 1.65,
    length: 6000,
    thickness: 12,
    width: 1500,
    diameter: 25,
    height: 100,
    leg1: 75,
    leg2: 75,
    flangeWidth: 75,
    webThickness: 6,
    flangeThickness: 9,
    holeCount: 320,
    holeDia: 19.25,
    id: 0,
    flatToFlat: 36,
  });

  // Price & Quantity states
  const [currencySymbol, setCurrencySymbol] = useState<"$" | "₹" | "€" | "£">("$");
  const [pricePerKg, setPricePerKg] = useState<number>(1.25);
  const [scrapPercent, setScrapPercent] = useState<number>(5); // 5% cutting waste allowance
  const [quantity, setQuantity] = useState<number>(480); // e.g. 480 tubes or 2 plates
  const [copiedSummary, setCopiedSummary] = useState<boolean>(false);

  // Selected Material & Shape objects
  const selectedMaterial = useMemo(() => {
    return MATERIAL_LIBRARY.find((m) => m.id === selectedMaterialId) || MATERIAL_LIBRARY[0];
  }, [selectedMaterialId]);

  const selectedShape = useMemo(() => {
    return SHAPE_DEFINITIONS.find((s) => s.id === selectedShapeId) || SHAPE_DEFINITIONS[0];
  }, [selectedShapeId]);

  // Update default price when material changes
  const handleMaterialChange = (materialId: string) => {
    setSelectedMaterialId(materialId);
    const mat = MATERIAL_LIBRARY.find((m) => m.id === materialId);
    if (mat) {
      if (currencySymbol === "₹") {
        setPricePerKg(Math.round(mat.defaultPricePerKgUSD * 85));
      } else if (currencySymbol === "€") {
        setPricePerKg(Number((mat.defaultPricePerKgUSD * 0.92).toFixed(2)));
      } else if (currencySymbol === "£") {
        setPricePerKg(Number((mat.defaultPricePerKgUSD * 0.78).toFixed(2)));
      } else {
        setPricePerKg(mat.defaultPricePerKgUSD);
      }
    }
  };

  // Update currency and auto-scale price
  const handleCurrencyChange = (curr: "$" | "₹" | "€" | "£") => {
    setCurrencySymbol(curr);
    if (curr === "₹") {
      setPricePerKg(Math.round(selectedMaterial.defaultPricePerKgUSD * 85));
    } else if (curr === "€") {
      setPricePerKg(Number((selectedMaterial.defaultPricePerKgUSD * 0.92).toFixed(2)));
    } else if (curr === "£") {
      setPricePerKg(Number((selectedMaterial.defaultPricePerKgUSD * 0.78).toFixed(2)));
    } else {
      setPricePerKg(selectedMaterial.defaultPricePerKgUSD);
    }
  };

  // Convert input length/dimension value to meters for universal volume math
  const getDimInMeters = (value: number, unit: "mm" | "inch" | "meter" | "feet"): number => {
    if (isNaN(value)) return 0;
    if (unit === "mm") return value / 1000;
    if (unit === "inch") return (value * 25.4) / 1000;
    if (unit === "feet") return (value * 304.8) / 1000;
    return value; // meter
  };

  // Compute Volume in Cubic Meters (m³) for 1 piece
  const volumeM3 = useMemo(() => {
    const unit = dimUnit;
    const v = dimValues;

    switch (selectedShapeId) {
      case "plate_sheet": {
        const t = getDimInMeters(v.thickness || 0, unit);
        const w = getDimInMeters(v.width || 0, unit);
        const l = getDimInMeters(v.length || 0, unit);
        return t * w * l;
      }
      case "round_bar": {
        const d = getDimInMeters(v.diameter || 0, unit);
        const l = getDimInMeters(v.length || 0, unit);
        const radius = d / 2;
        return Math.PI * radius * radius * l;
      }
      case "tube_pipe": {
        const od = getDimInMeters(v.od || 0, unit);
        const wt = getDimInMeters(v.wt || 0, unit);
        const l = getDimInMeters(v.length || 0, unit);
        const id = Math.max(0, od - 2 * wt);
        const rOuter = od / 2;
        const rInner = id / 2;
        return Math.PI * (rOuter * rOuter - rInner * rInner) * l;
      }
      case "square_bar": {
        const w = getDimInMeters(v.width || 0, unit);
        const h = getDimInMeters(v.height || 0, unit);
        const l = getDimInMeters(v.length || 0, unit);
        return w * h * l;
      }
      case "hollow_square": {
        const w = getDimInMeters(v.width || 0, unit);
        const h = getDimInMeters(v.height || 0, unit);
        const wt = getDimInMeters(v.wt || 0, unit);
        const l = getDimInMeters(v.length || 0, unit);
        const innerW = Math.max(0, w - 2 * wt);
        const innerH = Math.max(0, h - 2 * wt);
        const outerArea = w * h;
        const innerArea = innerW * innerH;
        return (outerArea - innerArea) * l;
      }
      case "angle_iron": {
        const a = getDimInMeters(v.leg1 || 0, unit);
        const b = getDimInMeters(v.leg2 || 0, unit);
        const t = getDimInMeters(v.thickness || 0, unit);
        const l = getDimInMeters(v.length || 0, unit);
        const area = (a + b - t) * t;
        return Math.max(0, area) * l;
      }
      case "c_channel": {
        const h = getDimInMeters(v.height || 0, unit);
        const b = getDimInMeters(v.flangeWidth || 0, unit);
        const tw = getDimInMeters(v.webThickness || 0, unit);
        const tf = getDimInMeters(v.flangeThickness || 0, unit);
        const l = getDimInMeters(v.length || 0, unit);
        const area = 2 * (b * tf) + (h - 2 * tf) * tw;
        return Math.max(0, area) * l;
      }
      case "i_beam": {
        const h = getDimInMeters(v.height || 0, unit);
        const b = getDimInMeters(v.flangeWidth || 0, unit);
        const tw = getDimInMeters(v.webThickness || 0, unit);
        const tf = getDimInMeters(v.flangeThickness || 0, unit);
        const l = getDimInMeters(v.length || 0, unit);
        const area = 2 * (b * tf) + (h - 2 * tf) * tw;
        return Math.max(0, area) * l;
      }
      case "tubesheet_disc": {
        const od = getDimInMeters(v.od || 0, unit);
        const innerD = getDimInMeters(v.id || 0, unit);
        const t = getDimInMeters(v.thickness || 0, unit);
        const holeCount = v.holeCount || 0;
        const holeDia = getDimInMeters(v.holeDia || 0, unit);

        const outerArea = Math.PI * Math.pow(od / 2, 2);
        const innerArea = Math.PI * Math.pow(innerD / 2, 2);
        const grossArea = Math.max(0, outerArea - innerArea);

        const singleHoleArea = Math.PI * Math.pow(holeDia / 2, 2);
        const totalHolesArea = holeCount * singleHoleArea;

        const netArea = Math.max(0, grossArea - totalHolesArea);
        return netArea * t;
      }
      case "hex_bar": {
        const s = getDimInMeters(v.flatToFlat || 0, unit);
        const l = getDimInMeters(v.length || 0, unit);
        const area = (Math.sqrt(3) / 2) * Math.pow(s, 2);
        return area * l;
      }
      default:
        return 0;
    }
  }, [selectedShapeId, dimValues, dimUnit]);

  // Weight Calculations
  const unitWeightKg = useMemo(() => {
    return volumeM3 * selectedMaterial.densityKgM3;
  }, [volumeM3, selectedMaterial]);

  const unitWeightLbs = useMemo(() => {
    return unitWeightKg * 2.2046226;
  }, [unitWeightKg]);

  // Total Calculations with Scrap Waste & Quantity Multiplier
  const totalWeightKgNet = useMemo(() => {
    return unitWeightKg * quantity;
  }, [unitWeightKg, quantity]);

  const scrapMultiplier = 1 + scrapPercent / 100;

  const totalWeightKgGross = useMemo(() => {
    return totalWeightKgNet * scrapMultiplier;
  }, [totalWeightKgNet, scrapMultiplier]);

  const totalWeightLbsGross = useMemo(() => {
    return totalWeightKgGross * 2.2046226;
  }, [totalWeightKgGross]);

  const totalWeightMTGross = useMemo(() => {
    return totalWeightKgGross / 1000;
  }, [totalWeightKgGross]);

  const totalEstimatedCost = useMemo(() => {
    return totalWeightKgGross * pricePerKg;
  }, [totalWeightKgGross, pricePerKg]);

  // Copy structured quotation report
  const handleCopySummary = () => {
    const summaryText = `
==================================================
NORTHERN HEATEX - MATERIAL WEIGHT & PRICE REPORT
==================================================
Material Alloy: ${selectedMaterial.name} (${selectedMaterial.isFerrous ? "Ferrous" : "Non-Ferrous"})
Category: ${selectedMaterial.categoryLabel}
Material Density: ${selectedMaterial.densityKgM3} kg/m³ (${selectedMaterial.densityLbIn3} lb/in³)
Profile Shape: ${selectedShape.label}
Dimension Units: ${dimUnit}

QUANTITY & WEIGHT BREAKDOWN:
--------------------------------------------------
Single Unit Volume: ${volumeM3.toFixed(6)} m³
Single Unit Weight: ${unitWeightKg.toFixed(3)} kg (${unitWeightLbs.toFixed(3)} lbs)
Order Quantity: ${quantity} pcs
Net Total Weight: ${totalWeightKgNet.toFixed(2)} kg

Cutting / Scrap Allowance: ${scrapPercent}%
Gross Total Weight (incl. Scrap): ${totalWeightKgGross.toFixed(2)} kg (${totalWeightLbsGross.toFixed(2)} lbs / ${totalWeightMTGross.toFixed(3)} MT)

ESTIMATED MATERIAL PRICE:
--------------------------------------------------
Raw Material Rate: ${currencySymbol}${pricePerKg.toFixed(2)} / kg
Total Estimated Material Cost: ${currencySymbol}${totalEstimatedCost.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
==================================================
Northern HeatEx Engineering Suite - Official Calculation
    `.trim();

    navigator.clipboard.writeText(summaryText);
    setCopiedSummary(true);
    setTimeout(() => setCopiedSummary(false), 2000);
  };

  return (
    <div className={`font-['Plus_Jakarta_Sans',sans-serif] ${embeddedInModal ? "" : "space-y-6"}`}>
      {/* Top Banner */}
      {!embeddedInModal && (
        <div className="bg-gradient-to-r from-slate-900 via-[#003366] to-[#0056A6] text-white p-6 rounded-3xl shadow-xl border border-slate-800 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <span className="px-2.5 py-0.5 bg-amber-500/20 text-amber-300 font-mono text-[10px] font-bold uppercase rounded-full border border-amber-500/30">
                Heat Exchanger Engineering
              </span>
              <span className="px-2.5 py-0.5 bg-emerald-500/20 text-emerald-300 font-mono text-[10px] font-bold uppercase rounded-full border border-emerald-500/30">
                Ferrous & Non-Ferrous Alloys
              </span>
            </div>
            <h2 className="text-xl sm:text-2xl font-black font-mono tracking-tight text-white flex items-center gap-2">
              <Scale className="w-6 h-6 text-cyan-400" /> Material Weight & Price Calculator
            </h2>
            <p className="text-xs text-cyan-100/80 max-w-2xl">
              Calculate exact component weights and commercial raw material costings across all ASME/TEMA plates, tubes, solid rods, flanges, tube sheets & structural skid profiles.
            </p>
          </div>

          <button
            onClick={handleCopySummary}
            className="px-4 py-2.5 bg-cyan-400 hover:bg-cyan-300 text-slate-950 font-black text-xs uppercase tracking-wider rounded-xl transition-all shadow-lg flex items-center gap-2 cursor-pointer shrink-0"
          >
            {copiedSummary ? <Check className="w-4 h-4 text-slate-950" /> : <Copy className="w-4 h-4" />}
            {copiedSummary ? "Report Copied!" : "Export Estimate"}
          </button>
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* LEFT COLUMN: MATERIAL & GEOMETRY INPUTS */}
        <div className="lg:col-span-7 bg-white p-5 sm:p-6 rounded-3xl border border-slate-200/80 shadow-sm space-y-6">
          {/* STEP 1: Material Alloy Selection */}
          <div className="space-y-3">
            <div className="flex justify-between items-center">
              <label className="text-xs font-black uppercase tracking-wider font-mono text-slate-700 flex items-center gap-1.5">
                <span className="w-5 h-5 rounded-full bg-[#0056A6] text-white flex items-center justify-center text-[10px]">
                  1
                </span>
                Select Material Alloy / Non-Metal
              </label>

              <span className={`px-2 py-0.5 text-[10px] font-mono font-bold rounded-full ${
                selectedMaterial.isFerrous
                  ? "bg-slate-100 text-slate-800 border border-slate-300"
                  : "bg-amber-100 text-amber-900 border border-amber-300"
              }`}>
                {selectedMaterial.isFerrous ? "Ferrous Steel" : "Non-Ferrous / Specialty"}
              </span>
            </div>

            <div className="relative">
              <select
                value={selectedMaterialId}
                onChange={(e) => handleMaterialChange(e.target.value)}
                className="w-full pl-4 pr-10 py-3 bg-slate-50 border border-slate-300 rounded-2xl font-bold text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-[#0056A6] cursor-pointer"
              >
                {MATERIAL_LIBRARY.map((mat) => (
                  <option key={mat.id} value={mat.id}>
                    [{mat.categoryLabel}] — {mat.name} ({mat.densityKgM3} kg/m³)
                  </option>
                ))}
              </select>
              <ChevronDown className="w-4 h-4 text-slate-500 absolute right-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
            </div>

            <div className="p-3 bg-blue-50/60 rounded-xl border border-blue-100 text-xs flex items-center justify-between font-mono">
              <div className="space-y-0.5">
                <span className="text-[10px] text-slate-500 block">Density Specification:</span>
                <span className="font-bold text-[#0056A6]">
                  {selectedMaterial.densityKgM3} kg/m³
                </span>{" "}
                <span className="text-slate-500">
                  ({selectedMaterial.densityLbIn3} lb/in³)
                </span>
              </div>

              <div className="text-right space-y-0.5">
                <span className="text-[10px] text-slate-500 block">Typical Benchmark Rate:</span>
                <span className="font-bold text-emerald-700">
                  {currencySymbol === "₹"
                    ? `₹${Math.round(selectedMaterial.defaultPricePerKgUSD * 85)}`
                    : currencySymbol === "€"
                    ? `€${(selectedMaterial.defaultPricePerKgUSD * 0.92).toFixed(2)}`
                    : currencySymbol === "£"
                    ? `£${(selectedMaterial.defaultPricePerKgUSD * 0.78).toFixed(2)}`
                    : `$${selectedMaterial.defaultPricePerKgUSD.toFixed(2)}`} / kg
                </span>
              </div>
            </div>
          </div>

          {/* STEP 2: Profile & Shape Selection with Visual Figures */}
          <div className="space-y-3">
            <label className="text-xs font-black uppercase tracking-wider font-mono text-slate-700 flex items-center gap-1.5">
              <span className="w-5 h-5 rounded-full bg-[#0056A6] text-white flex items-center justify-center text-[10px]">
                2
              </span>
              Select Structural Geometry / Shape
            </label>

            <div className="grid grid-cols-2 sm:grid-cols-5 gap-2.5">
              {SHAPE_DEFINITIONS.map((s) => {
                const isSelected = s.id === selectedShapeId;
                return (
                  <button
                    key={s.id}
                    type="button"
                    onClick={() => setSelectedShapeId(s.id)}
                    className={`p-2.5 rounded-2xl border text-left transition-all cursor-pointer flex flex-col justify-between overflow-hidden relative group ${
                      isSelected
                        ? "bg-[#0056A6] text-white border-[#0056A6] shadow-md ring-2 ring-blue-300"
                        : "bg-slate-50 hover:bg-slate-100 text-slate-800 border-slate-200"
                    }`}
                  >
                    {/* Embedded SVG Shape Thumbnail Figure */}
                    <div className="w-full h-14 mb-1.5 flex items-center justify-center rounded-xl bg-slate-900/10 p-1 group-hover:scale-105 transition-transform">
                      <ShapeVisualGraphic shapeId={s.id} showLabels={false} className="w-full h-full object-contain" />
                    </div>

                    <div>
                      <span className="text-[11px] font-bold line-clamp-1 block">{s.shortLabel}</span>
                      <span className={`text-[9px] font-mono block mt-0.5 ${isSelected ? "text-cyan-200" : "text-slate-400"}`}>
                        {s.dimensions.length} Dimensions
                      </span>
                    </div>
                  </button>
                );
              })}
            </div>

            <p className="text-[11px] text-slate-500 italic bg-slate-50 p-2.5 rounded-xl border border-slate-200/60 flex items-center gap-2">
              <Info className="w-4 h-4 text-[#0056A6] shrink-0" />
              <span>{selectedShape.description}</span>
            </p>
          </div>

          {/* STEP 3: Technical Visual Graphic & Dimensional Inputs */}
          <div className="space-y-4 pt-3 border-t border-slate-100">
            <div className="flex justify-between items-center">
              <label className="text-xs font-black uppercase tracking-wider font-mono text-slate-700 flex items-center gap-1.5">
                <span className="w-5 h-5 rounded-full bg-[#0056A6] text-white flex items-center justify-center text-[10px]">
                  3
                </span>
                Shape Technical Figure & Dimensions
              </label>

              {/* Unit Toggle */}
              <div className="flex items-center gap-1 bg-slate-100 p-1 rounded-xl">
                {(["mm", "inch", "meter", "feet"] as const).map((u) => (
                  <button
                    key={u}
                    type="button"
                    onClick={() => setDimUnit(u)}
                    className={`px-2.5 py-1 rounded-lg text-xs font-mono font-bold transition cursor-pointer ${
                      dimUnit === u
                        ? "bg-[#0056A6] text-white shadow-sm"
                        : "text-slate-600 hover:text-slate-900"
                    }`}
                  >
                    {u}
                  </button>
                ))}
              </div>
            </div>

            {/* Visual Technical Diagram Display Banner */}
            <div className="p-4 bg-slate-900 rounded-2xl border border-slate-800 text-white relative overflow-hidden shadow-inner flex flex-col sm:flex-row items-center gap-4">
              <div className="w-full sm:w-1/2 flex items-center justify-center p-2 bg-slate-950/60 rounded-xl border border-slate-800">
                <ShapeVisualGraphic shapeId={selectedShapeId} showLabels={true} className="w-full h-36 object-contain" />
              </div>

              <div className="w-full sm:w-1/2 space-y-2 text-xs font-mono">
                <div className="flex items-center gap-2 text-amber-400 font-bold border-b border-slate-800 pb-1.5">
                  <Ruler className="w-4 h-4 text-amber-400" />
                  <span>{selectedShape.label}</span>
                </div>
                <p className="text-[11px] text-slate-300 font-sans leading-relaxed">
                  Enter exact dimensional tolerances below in <strong className="text-amber-300 font-mono">{dimUnit}</strong>. Volume and mass density will auto-calculate instantly.
                </p>
                <div className="text-[10px] text-slate-400 bg-slate-800/80 p-2 rounded-lg border border-slate-700/60">
                  <strong className="text-cyan-300">Active Profile:</strong> {selectedShape.dimensions.map(d => d.key.toUpperCase()).join(" × ")}
                </div>
              </div>
            </div>

            {/* Dynamic Dimension Input Fields */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {selectedShape.dimensions.map((dim) => (
                <div key={dim.key} className="space-y-1 bg-slate-50 p-3 rounded-2xl border border-slate-200">
                  <label className="text-[11px] font-bold text-slate-700 block font-mono">
                    {dim.label} ({dimUnit})
                  </label>
                  <input
                    type="number"
                    step="any"
                    value={dimValues[dim.key] ?? dim.defaultMm}
                    onChange={(e) =>
                      setDimValues({
                        ...dimValues,
                        [dim.key]: parseFloat(e.target.value) || 0,
                      })
                    }
                    placeholder={dim.placeholder}
                    className="w-full p-2.5 bg-white border border-slate-300 rounded-xl font-mono text-sm font-bold text-slate-900 focus:outline-none focus:ring-2 focus:ring-[#0056A6]"
                  />
                </div>
              ))}
            </div>
          </div>

          {/* STEP 4: Quantity & Pricing Commercial Parameters */}
          <div className="space-y-3 pt-2 border-t border-slate-100">
            <label className="text-xs font-black uppercase tracking-wider font-mono text-slate-700 flex items-center gap-1.5">
              <span className="w-5 h-5 rounded-full bg-[#0056A6] text-white flex items-center justify-center text-[10px]">
                4
              </span>
              Quantity & Commercial Costing
            </label>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div className="space-y-1 bg-slate-50 p-3 rounded-2xl border border-slate-200">
                <label className="text-[10px] font-bold text-slate-600 block uppercase font-mono">
                  Quantity (Pcs / Items)
                </label>
                <input
                  type="number"
                  min="1"
                  value={quantity}
                  onChange={(e) => setQuantity(Math.max(1, parseInt(e.target.value) || 1))}
                  className="w-full p-2 bg-white border border-slate-300 rounded-xl font-mono text-sm font-bold text-slate-900"
                />
              </div>

              <div className="space-y-1 bg-slate-50 p-3 rounded-2xl border border-slate-200">
                <label className="text-[10px] font-bold text-slate-600 block uppercase font-mono">
                  Cutting Waste / Scrap (%)
                </label>
                <input
                  type="number"
                  min="0"
                  max="50"
                  value={scrapPercent}
                  onChange={(e) => setScrapPercent(Math.max(0, parseFloat(e.target.value) || 0))}
                  className="w-full p-2 bg-white border border-slate-300 rounded-xl font-mono text-sm font-bold text-slate-900"
                />
              </div>

              <div className="space-y-1 bg-slate-50 p-3 rounded-2xl border border-slate-200">
                <div className="flex justify-between items-center">
                  <label className="text-[10px] font-bold text-slate-600 uppercase font-mono">
                    Market Rate / kg
                  </label>

                  {/* Currency selector */}
                  <div className="flex gap-1">
                    {(["$", "₹", "€", "£"] as const).map((c) => (
                      <button
                        key={c}
                        type="button"
                        onClick={() => handleCurrencyChange(c)}
                        className={`w-5 h-5 rounded text-[10px] font-mono font-bold flex items-center justify-center ${
                          currencySymbol === c ? "bg-[#0056A6] text-white" : "bg-slate-200 text-slate-700"
                        }`}
                      >
                        {c}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="relative">
                  <span className="absolute left-2.5 top-1/2 -translate-y-1/2 font-mono font-bold text-slate-500 text-sm">
                    {currencySymbol}
                  </span>
                  <input
                    type="number"
                    step="0.01"
                    value={pricePerKg}
                    onChange={(e) => setPricePerKg(parseFloat(e.target.value) || 0)}
                    className="w-full pl-7 pr-2 py-2 bg-white border border-slate-300 rounded-xl font-mono text-sm font-bold text-slate-900"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* RIGHT COLUMN: CALCULATION RESULTS & COMMERCIAL BREAKDOWN */}
        <div className="lg:col-span-5 space-y-4">
          {/* MAIN COST & WEIGHT CARDS */}
          <div className="bg-gradient-to-br from-slate-900 via-[#003366] to-[#0056A6] text-white p-6 rounded-3xl shadow-xl space-y-5 border border-slate-800">
            <div className="flex items-center justify-between text-xs font-mono text-cyan-300 border-b border-white/10 pb-3">
              <span className="font-bold uppercase tracking-wider flex items-center gap-1.5">
                <Sparkles className="w-4 h-4 text-amber-300" /> Material Cost Estimate
              </span>
              <span className="px-2.5 py-0.5 bg-emerald-500/20 text-emerald-300 rounded-full text-[10px] font-bold">
                {quantity} {quantity === 1 ? "Item" : "Items"} Total
              </span>
            </div>

            {/* Total Estimated Cost Display */}
            <div>
              <span className="text-[11px] font-mono text-cyan-200 block uppercase font-bold">
                Total Material Commercial Value
              </span>
              <div className="text-3xl sm:text-4xl font-black font-mono text-emerald-300 tracking-tight mt-1">
                {currencySymbol}
                {totalEstimatedCost.toLocaleString("en-US", {
                  minimumFractionDigits: 2,
                  maximumFractionDigits: 2,
                })}
              </div>
              <p className="text-[10px] text-slate-300 font-mono mt-1">
                Based on {currencySymbol}{pricePerKg.toFixed(2)}/kg × {totalWeightKgGross.toFixed(1)} kg gross required weight
              </p>
            </div>

            {/* Weight Breakdown Cards */}
            <div className="grid grid-cols-2 gap-3 pt-3 border-t border-white/10 text-xs font-mono">
              <div className="bg-white/10 p-3 rounded-2xl border border-white/10">
                <span className="text-[10px] text-cyan-200 block">1 Unit Net Weight</span>
                <span className="text-base font-black text-white font-mono mt-0.5 block">
                  {unitWeightKg.toFixed(3)} kg
                </span>
                <span className="text-[10px] text-slate-300">
                  ({unitWeightLbs.toFixed(3)} lbs)
                </span>
              </div>

              <div className="bg-white/10 p-3 rounded-2xl border border-white/10">
                <span className="text-[10px] text-amber-300 block">Gross Weight (+{scrapPercent}% Waste)</span>
                <span className="text-base font-black text-amber-300 font-mono mt-0.5 block">
                  {totalWeightKgGross.toFixed(2)} kg
                </span>
                <span className="text-[10px] text-slate-300">
                  ({totalWeightMTGross.toFixed(3)} Metric Tons)
                </span>
              </div>
            </div>

            {/* Summary Action */}
            <button
              type="button"
              onClick={handleCopySummary}
              className="w-full py-3 bg-cyan-400 hover:bg-cyan-300 text-slate-950 font-black text-xs uppercase tracking-wider rounded-2xl transition-all shadow-lg flex items-center justify-center gap-2 cursor-pointer"
            >
              {copiedSummary ? <Check className="w-4 h-4 text-slate-950" /> : <Copy className="w-4 h-4" />}
              {copiedSummary ? "Copied to Clipboard!" : "Copy Full Calculation Report"}
            </button>
          </div>

          {/* DETAILED SPECIFICATION SUMMARY PANEL */}
          <div className="bg-white p-5 rounded-3xl border border-slate-200/80 shadow-sm space-y-3 font-mono text-xs">
            <h4 className="font-extrabold text-slate-900 border-b border-slate-100 pb-2 flex items-center justify-between">
              <span>Technical Calculation Audit</span>
              <span className="text-[10px] text-[#0056A6] bg-blue-50 px-2 py-0.5 rounded">
                ASME Standard
              </span>
            </h4>

            <div className="space-y-2 text-slate-700">
              <div className="flex justify-between py-1 border-b border-slate-100">
                <span className="text-slate-500">Selected Alloy:</span>
                <span className="font-bold text-slate-900 line-clamp-1">{selectedMaterial.name}</span>
              </div>

              <div className="flex justify-between py-1 border-b border-slate-100">
                <span className="text-slate-500">Ferrous Category:</span>
                <span className="font-bold text-slate-900">{selectedMaterial.categoryLabel}</span>
              </div>

              <div className="flex justify-between py-1 border-b border-slate-100">
                <span className="text-slate-500">Specific Density:</span>
                <span className="font-bold text-slate-900">{selectedMaterial.densityKgM3} kg/m³</span>
              </div>

              <div className="flex justify-between py-1 border-b border-slate-100">
                <span className="text-slate-500">Profile Shape:</span>
                <span className="font-bold text-[#0056A6]">{selectedShape.label}</span>
              </div>

              <div className="flex justify-between py-1 border-b border-slate-100">
                <span className="text-slate-500">Single Piece Volume:</span>
                <span className="font-bold text-emerald-700">{volumeM3.toFixed(6)} m³</span>
              </div>

              <div className="flex justify-between py-1 border-b border-slate-100">
                <span className="text-slate-500">Net Order Weight:</span>
                <span className="font-bold text-slate-900">{totalWeightKgNet.toFixed(2)} kg</span>
              </div>

              <div className="flex justify-between py-1">
                <span className="text-slate-500">Raw Scrap Waste ({scrapPercent}%):</span>
                <span className="font-bold text-amber-700">+{(totalWeightKgGross - totalWeightKgNet).toFixed(2)} kg</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
