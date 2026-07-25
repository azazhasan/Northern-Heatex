import React, { useState, useEffect, useMemo, useCallback } from "react";
import {
  ArrowRightLeft,
  X,
  Copy,
  Check,
  RotateCcw,
  Flame,
  Gauge,
  Ruler,
  Thermometer,
  Activity,
  Zap,
  Layers,
  Scale,
  Sparkles,
  History,
  BookOpen,
  ChevronDown,
  Maximize2,
  Minimize2,
  Sliders,
  CheckCircle2,
  HelpCircle,
  Code,
  BarChart2
} from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  Cell,
  CartesianGrid
} from "recharts";

import { MaterialWeightCalculator } from "../engineering/MaterialWeightCalculator";

// --- UNIT CONVERSION ENGINE TYPES & DATA ---

export type UnitCategoryKey =
  | "thermal_duty"
  | "pressure"
  | "length_tubes"
  | "temperature"
  | "temp_difference"
  | "mass_flow"
  | "vol_flow"
  | "heat_coeff"
  | "thermal_cond"
  | "specific_heat"
  | "fouling_factor"
  | "viscosity"
  | "surface_area"
  | "density";

export interface UnitDefinition {
  id: string;
  name: string;
  symbol: string;
  // Conversion to base unit: baseValue = userValue * toBaseFactor + toBaseOffset
  toBaseFactor: number;
  toBaseOffset?: number;
  // Conversion from base unit: userValue = (baseValue + fromBaseOffset) * fromBaseFactor
  fromBaseFactor: number;
  fromBaseOffset?: number;
  description?: string;
}

export interface UnitCategory {
  id: UnitCategoryKey;
  label: string;
  shortName: string;
  icon: React.ElementType;
  baseUnitId: string;
  units: UnitDefinition[];
}

export interface PresetItem {
  category: UnitCategoryKey;
  title: string;
  subtitle: string;
  value: number;
  unitId: string;
  badge?: string;
}

export interface HistoryItem {
  id: string;
  timestamp: string;
  categoryLabel: string;
  fromVal: number;
  fromSymbol: string;
  toVal: number;
  toSymbol: string;
}

// Full industrial unit definitions
export const UNIT_CATEGORIES: UnitCategory[] = [
  {
    id: "thermal_duty",
    label: "Thermal Duty & Power",
    shortName: "Duty / Power",
    icon: Flame,
    baseUnitId: "kW",
    units: [
      { id: "kW", name: "Kilowatt", symbol: "kW", toBaseFactor: 1, fromBaseFactor: 1, description: "SI base unit for heat exchanger thermal capacity" },
      { id: "BTU_hr", name: "BTU / hour", symbol: "BTU/hr", toBaseFactor: 0.00029307107, fromBaseFactor: 3412.14163, description: "Standard US Customary thermal duty rating" },
      { id: "MMBTU_hr", name: "Million BTU / hour", symbol: "MMBTU/hr", toBaseFactor: 293.07107, fromBaseFactor: 0.0034121416, description: "High-capacity refinery exchanger rating" },
      { id: "MW", name: "Megawatt", symbol: "MW", toBaseFactor: 1000, fromBaseFactor: 0.001, description: "Power plant thermal rating" },
      { id: "W", name: "Watt", symbol: "W", toBaseFactor: 0.001, fromBaseFactor: 1000, description: "Small component heat dissipation" },
      { id: "kcal_hr", name: "Kilocalorie / hour", symbol: "kcal/hr", toBaseFactor: 0.001163, fromBaseFactor: 859.8452, description: "Metric process heat duty" },
      { id: "Gcal_hr", name: "Gigacalorie / hour", symbol: "Gcal/hr", toBaseFactor: 1163, fromBaseFactor: 0.000859845, description: "District heating & steel plant rating" },
      { id: "HP_mech", name: "Horsepower (Mechanical)", symbol: "HP", toBaseFactor: 0.74569987, fromBaseFactor: 1.341022, description: "Mechanical shaft power" },
      { id: "HP_boiler", name: "Horsepower (Boiler)", symbol: "BHP", toBaseFactor: 9.8095, fromBaseFactor: 0.10194, description: "Boiler evaporation power" },
      { id: "TR", name: "Tons of Refrigeration", symbol: "TR", toBaseFactor: 3.5168525, fromBaseFactor: 0.284345, description: "HVAC & chiller thermal duty" },
    ],
  },
  {
    id: "pressure",
    label: "Pressure & Head",
    shortName: "Pressure",
    icon: Gauge,
    baseUnitId: "bar",
    units: [
      { id: "bar", name: "Bar", symbol: "bar", toBaseFactor: 1, fromBaseFactor: 1, description: "Standard metric pressure unit" },
      { id: "psi", name: "Pounds / sq. inch", symbol: "PSI", toBaseFactor: 0.06894757, fromBaseFactor: 14.503774, description: "ASME VIII Div 1 standard pressure" },
      { id: "kPa", name: "Kilopascal", symbol: "kPa", toBaseFactor: 0.01, fromBaseFactor: 100, description: "SI metric pressure" },
      { id: "MPa", name: "Megapascal", symbol: "MPa", toBaseFactor: 10, fromBaseFactor: 0.1, description: "High-pressure vessel design stress unit" },
      { id: "Pa", name: "Pascal", symbol: "Pa", toBaseFactor: 0.00001, fromBaseFactor: 100000, description: "Low pressure drop & fan static head" },
      { id: "kgf_cm2", name: "Kilogram-force / cm²", symbol: "kgf/cm²", toBaseFactor: 0.980665, fromBaseFactor: 1.019716, description: "Indian & European legacy plant pressure" },
      { id: "atm", name: "Standard Atmosphere", symbol: "atm", toBaseFactor: 1.01325, fromBaseFactor: 0.986923, description: "Atmospheric pressure reference" },
      { id: "mmHg", name: "Millimeters of Mercury", symbol: "mmHg", toBaseFactor: 0.00133322, fromBaseFactor: 750.06168, description: "Vacuum condenser pressure rating" },
      { id: "mH2O", name: "Meters of Water (4°C)", symbol: "mH₂O", toBaseFactor: 0.0980665, fromBaseFactor: 10.19716, description: "Hydraulic pump head rating" },
      { id: "inH2O", name: "Inches of Water (60°F)", symbol: "inH₂O", toBaseFactor: 0.00249089, fromBaseFactor: 401.463, description: "Fan & duct differential pressure" },
    ],
  },
  {
    id: "length_tubes",
    label: "Length & Tube Geometry",
    shortName: "Dimensions",
    icon: Ruler,
    baseUnitId: "mm",
    units: [
      { id: "mm", name: "Millimeter", symbol: "mm", toBaseFactor: 1, fromBaseFactor: 1, description: "Primary ISO manufacturing metric" },
      { id: "inch", name: "Inch", symbol: "in", toBaseFactor: 25.4, fromBaseFactor: 0.039370078, description: "TEMA & ASME standard tube OD size" },
      { id: "meter", name: "Meter", symbol: "m", toBaseFactor: 1000, fromBaseFactor: 0.001, description: "Shell length & plant layout dimension" },
      { id: "foot", name: "Foot", symbol: "ft", toBaseFactor: 304.8, fromBaseFactor: 0.00328084, description: "US exchanger tube length specification" },
      { id: "cm", name: "Centimeter", symbol: "cm", toBaseFactor: 10, fromBaseFactor: 0.1, description: "Centimeter measurement" },
      { id: "micron", name: "Micrometer / Micron", symbol: "µm", toBaseFactor: 0.001, fromBaseFactor: 1000, description: "Machining tolerances & wall roughness" },
    ],
  },
  {
    id: "temperature",
    label: "Temperature (Absolute)",
    shortName: "Temperature",
    icon: Thermometer,
    baseUnitId: "C",
    units: [
      { id: "C", name: "Celsius", symbol: "°C", toBaseFactor: 1, fromBaseFactor: 1, description: "Metric operating temperature" },
      { id: "F", name: "Fahrenheit", symbol: "°F", toBaseFactor: 1, fromBaseFactor: 1, description: "Imperial operating temperature" },
      { id: "K", name: "Kelvin", symbol: "K", toBaseFactor: 1, fromBaseFactor: 1, description: "Absolute thermodynamic temperature" },
      { id: "R", name: "Rankine", symbol: "°R", toBaseFactor: 1, fromBaseFactor: 1, description: "Absolute imperial temperature" },
    ],
  },
  {
    id: "temp_difference",
    label: "Temperature Difference (ΔT)",
    shortName: "Temp Diff (ΔT)",
    icon: Thermometer,
    baseUnitId: "delta_C",
    units: [
      { id: "delta_C", name: "Delta Celsius", symbol: "Δ°C", toBaseFactor: 1, fromBaseFactor: 1, description: "Log Mean Temperature Difference (LMTD)" },
      { id: "delta_K", name: "Delta Kelvin", symbol: "ΔK", toBaseFactor: 1, fromBaseFactor: 1, description: "SI thermodynamic temperature difference" },
      { id: "delta_F", name: "Delta Fahrenheit", symbol: "Δ°F", toBaseFactor: 0.55555556, fromBaseFactor: 1.8, description: "Imperial temperature difference" },
      { id: "delta_R", name: "Delta Rankine", symbol: "Δ°R", toBaseFactor: 0.55555556, fromBaseFactor: 1.8, description: "Imperial absolute delta T" },
    ],
  },
  {
    id: "mass_flow",
    label: "Mass Flow Rate",
    shortName: "Mass Flow",
    icon: Activity,
    baseUnitId: "kg_hr",
    units: [
      { id: "kg_hr", name: "Kilogram / hour", symbol: "kg/hr", toBaseFactor: 1, fromBaseFactor: 1, description: "Standard process mass flow rate" },
      { id: "lb_hr", name: "Pounds / hour", symbol: "lb/hr", toBaseFactor: 0.45359237, fromBaseFactor: 2.2046226, description: "US refinery steam & fluid flow rate" },
      { id: "kg_s", name: "Kilogram / second", symbol: "kg/s", toBaseFactor: 3600, fromBaseFactor: 0.00027777778, description: "SI scientific mass flow rate" },
      { id: "lb_s", name: "Pounds / second", symbol: "lb/s", toBaseFactor: 1632.9325, fromBaseFactor: 0.000612395, description: "Turbine steam mass flow" },
      { id: "MT_hr", name: "Metric Ton / hour", symbol: "MT/hr", toBaseFactor: 1000, fromBaseFactor: 0.001, description: "Power station cooling water mass flow" },
    ],
  },
  {
    id: "vol_flow",
    label: "Volumetric Flow Rate",
    shortName: "Vol Flow",
    icon: Activity,
    baseUnitId: "m3_hr",
    units: [
      { id: "m3_hr", name: "Cubic meters / hour", symbol: "m³/hr", toBaseFactor: 1, fromBaseFactor: 1, description: "Industrial pump & shell side flow rate" },
      { id: "GPM", name: "US Gallons / minute", symbol: "GPM", toBaseFactor: 0.2271247, fromBaseFactor: 4.4028675, description: "Standard US pump capacity rating" },
      { id: "L_min", name: "Liters / minute", symbol: "L/min", toBaseFactor: 0.06, fromBaseFactor: 16.666667, description: "Cooling water circuit flow rate" },
      { id: "L_s", name: "Liters / second", symbol: "L/s", toBaseFactor: 3.6, fromBaseFactor: 0.27777778, description: "Hydraulic turbine water flow" },
      { id: "CFM", name: "Cubic feet / minute", symbol: "CFM", toBaseFactor: 1.6990108, fromBaseFactor: 0.5885778, description: "Generator air cooler & fan capacity" },
      { id: "m3_s", name: "Cubic meters / second", symbol: "m³/s", toBaseFactor: 3600, fromBaseFactor: 0.00027777778, description: "Penstock & condenser cooling flow" },
    ],
  },
  {
    id: "heat_coeff",
    label: "Overall Heat Transfer Coefficient (U)",
    shortName: "U-Coeff",
    icon: Zap,
    baseUnitId: "W_m2K",
    units: [
      { id: "W_m2K", name: "Watt / (m² · K)", symbol: "W/(m²·K)", toBaseFactor: 1, fromBaseFactor: 1, description: "SI overall heat transfer coefficient" },
      { id: "BTU_hr_ft2_F", name: "BTU / (hr · ft² · °F)", symbol: "BTU/(hr·ft²·°F)", toBaseFactor: 5.6782633, fromBaseFactor: 0.17611018, description: "TEMA & ASME U-coefficient unit" },
      { id: "kcal_hr_m2_C", name: "kcal / (hr · m² · °C)", symbol: "kcal/(hr·m²·°C)", toBaseFactor: 1.163, fromBaseFactor: 0.8598452, description: "Metric heat transfer rating" },
    ],
  },
  {
    id: "thermal_cond",
    label: "Thermal Conductivity (k)",
    shortName: "Conductivity (k)",
    icon: Flame,
    baseUnitId: "W_mK",
    units: [
      { id: "W_mK", name: "Watt / (m · K)", symbol: "W/(m·K)", toBaseFactor: 1, fromBaseFactor: 1, description: "SI metal & fluid thermal conductivity" },
      { id: "BTU_hr_ft_F", name: "BTU / (hr · ft · °F)", symbol: "BTU/(hr·ft·°F)", toBaseFactor: 1.730735, fromBaseFactor: 0.577789, description: "Imperial thermal conductivity" },
      { id: "BTU_in_hr_ft2_F", name: "BTU · in / (hr · ft² · °F)", symbol: "BTU·in/(hr·ft²·°F)", toBaseFactor: 0.1442279, fromBaseFactor: 6.933471, description: "Insulating material k-value" },
      { id: "kcal_hr_m_C", name: "kcal / (hr · m · °C)", symbol: "kcal/(hr·m·°C)", toBaseFactor: 1.163, fromBaseFactor: 0.8598452, description: "Metric thermal conductivity" },
    ],
  },
  {
    id: "specific_heat",
    label: "Specific Heat Capacity (Cp)",
    shortName: "Specific Heat",
    icon: Layers,
    baseUnitId: "kJ_kgK",
    units: [
      { id: "kJ_kgK", name: "Kilojoule / (kg · K)", symbol: "kJ/(kg·K)", toBaseFactor: 1, fromBaseFactor: 1, description: "SI fluid specific heat capacity" },
      { id: "BTU_lb_F", name: "BTU / (lb · °F)", symbol: "BTU/(lb·°F)", toBaseFactor: 4.1868, fromBaseFactor: 0.2388459, description: "Imperial fluid heat capacity (Water ≈ 1.0)" },
      { id: "kcal_kg_C", name: "kcal / (kg · °C)", symbol: "kcal/(kg·°C)", toBaseFactor: 4.1868, fromBaseFactor: 0.2388459, description: "Metric fluid specific heat" },
      { id: "J_gK", name: "Joule / (g · K)", symbol: "J/(g·K)", toBaseFactor: 1, fromBaseFactor: 1, description: "Laboratory specific heat unit" },
    ],
  },
  {
    id: "fouling_factor",
    label: "Fouling Resistance (Rf)",
    shortName: "Fouling (Rf)",
    icon: Layers,
    baseUnitId: "m2K_W",
    units: [
      { id: "m2K_W", name: "m² · K / Watt", symbol: "m²·K/W", toBaseFactor: 1, fromBaseFactor: 1, description: "SI TEMA fouling resistance factor" },
      { id: "hr_ft2_F_BTU", name: "hr · ft² · °F / BTU", symbol: "hr·ft²·°F/BTU", toBaseFactor: 0.17611018, fromBaseFactor: 5.6782633, description: "Standard TEMA Class R fouling factor" },
      { id: "hr_m2_C_kcal", name: "hr · m² · °C / kcal", symbol: "hr·m²·°C/kcal", toBaseFactor: 0.8598452, fromBaseFactor: 1.163, description: "Metric fouling resistance" },
    ],
  },
  {
    id: "viscosity",
    label: "Dynamic Viscosity (μ)",
    shortName: "Viscosity",
    icon: Sliders,
    baseUnitId: "cP",
    units: [
      { id: "cP", name: "Centipoise", symbol: "cP", toBaseFactor: 1, fromBaseFactor: 1, description: "Standard liquid viscosity (Water @ 20°C ≈ 1.0 cP)" },
      { id: "mPa_s", name: "Millipascal-second", symbol: "mPa·s", toBaseFactor: 1, fromBaseFactor: 1, description: "SI dynamic viscosity equivalent" },
      { id: "Pa_s", name: "Pascal-second", symbol: "Pa·s", toBaseFactor: 1000, fromBaseFactor: 0.001, description: "SI heavy oil viscosity" },
      { id: "lb_ft_hr", name: "Pounds / (ft · hour)", symbol: "lb/(ft·hr)", toBaseFactor: 0.4133789, fromBaseFactor: 2.419088, description: "TEMA pressure drop viscosity factor" },
      { id: "lb_ft_s", name: "Pounds / (ft · second)", symbol: "lb/(ft·s)", toBaseFactor: 1488.164, fromBaseFactor: 0.0006719689, description: "Imperial fluid mechanics viscosity" },
    ],
  },
  {
    id: "surface_area",
    label: "Heat Transfer Surface Area",
    shortName: "Surface Area",
    icon: Scale,
    baseUnitId: "m2",
    units: [
      { id: "m2", name: "Square Meter", symbol: "m²", toBaseFactor: 1, fromBaseFactor: 1, description: "SI total heat transfer surface area" },
      { id: "ft2", name: "Square Foot", symbol: "ft²", toBaseFactor: 0.09290304, fromBaseFactor: 10.76391, description: "TEMA thermal calculation surface area" },
      { id: "in2", name: "Square Inch", symbol: "in²", toBaseFactor: 0.00064516, fromBaseFactor: 1550.003, description: "Individual tube surface area" },
      { id: "cm2", name: "Square Centimeter", symbol: "cm²", toBaseFactor: 0.0001, fromBaseFactor: 10000, description: "Small component area" },
    ],
  },
  {
    id: "density",
    label: "Fluid Density (ρ)",
    shortName: "Density",
    icon: Scale,
    baseUnitId: "kg_m3",
    units: [
      { id: "kg_m3", name: "Kilogram / m³", symbol: "kg/m³", toBaseFactor: 1, fromBaseFactor: 1, description: "SI fluid density (Water ≈ 1000 kg/m³)" },
      { id: "lb_ft3", name: "Pounds / ft³", symbol: "lb/ft³", toBaseFactor: 16.018463, fromBaseFactor: 0.06242796, description: "Imperial fluid density (Water ≈ 62.4 lb/ft³)" },
      { id: "g_cm3", name: "Gram / cm³", symbol: "g/cm³", toBaseFactor: 1000, fromBaseFactor: 0.001, description: "Specific gravity equivalent density" },
      { id: "lb_in3", name: "Pounds / in³", symbol: "lb/in³", toBaseFactor: 27679.9, fromBaseFactor: 0.0000361273, description: "Alloy metal density (SS316 ≈ 0.29 lb/in³)" },
    ],
  },
];

// Presets & Standard Reference Table Items
export const INDUSTRIAL_PRESETS: PresetItem[] = [
  // Tube Diameters
  { category: "length_tubes", title: "3/4\" (19.05 mm) Tube OD", subtitle: "Most common TEMA Shell & Tube heat exchanger tube size", value: 0.75, unitId: "inch", badge: "TEMA Std" },
  { category: "length_tubes", title: "1\" (25.40 mm) Tube OD", subtitle: "Heavy fouling viscous fluid & refinery oil cooler tube size", value: 1.0, unitId: "inch", badge: "Heavy Duty" },
  { category: "length_tubes", title: "5/8\" (15.88 mm) Tube OD", subtitle: "Compact turbine lube oil & generator air cooler tube size", value: 0.625, unitId: "inch", badge: "Compact" },
  { category: "length_tubes", title: "1.25\" (31.75 mm) Tube OD", subtitle: "Large boiler feed water preheater & condenser tube size", value: 1.25, unitId: "inch", badge: "High Flow" },
  
  // BWG Gauges (Wall Thickness)
  { category: "length_tubes", title: "BWG 12 (2.77 mm / 0.109 in)", subtitle: "Heavy wall tube thickness for high pressure gas vessels", value: 2.77, unitId: "mm", badge: "BWG 12" },
  { category: "length_tubes", title: "BWG 14 (2.11 mm / 0.083 in)", subtitle: "Standard wall thickness for high-pressure exchangers", value: 2.11, unitId: "mm", badge: "BWG 14" },
  { category: "length_tubes", title: "BWG 16 (1.65 mm / 0.065 in)", subtitle: "Most common TEMA carbon steel & stainless tube wall thickness", value: 1.65, unitId: "mm", badge: "BWG 16" },
  { category: "length_tubes", title: "BWG 18 (1.24 mm / 0.049 in)", subtitle: "Copper-Nickel & Admiralty Brass tube wall thickness", value: 1.24, unitId: "mm", badge: "BWG 18" },

  // ASME Pressure Classes
  { category: "pressure", title: "ASME Class 150 Design Rating", subtitle: "150 PSI = 10.34 Bar = 1.034 MPa", value: 150, unitId: "psi", badge: "Class 150" },
  { category: "pressure", title: "ASME Class 300 Design Rating", subtitle: "300 PSI = 20.68 Bar = 2.068 MPa", value: 300, unitId: "psi", badge: "Class 300" },
  { category: "pressure", title: "ASME Class 600 Design Rating", subtitle: "600 PSI = 41.37 Bar = 4.137 MPa", value: 600, unitId: "psi", badge: "Class 600" },
  { category: "pressure", title: "Full Vacuum Condenser Rating", subtitle: "760 mmHg = 1.013 Bar = 14.7 PSI", value: 760, unitId: "mmHg", badge: "Vacuum" },

  // Thermal Duty
  { category: "thermal_duty", title: "1 MMBTU/hr Heat Duty", subtitle: "Standard medium industrial process duty = 293.07 kW", value: 1, unitId: "MMBTU_hr", badge: "1 MMBTU/h" },
  { category: "thermal_duty", title: "10 MMBTU/hr Refinery Duty", subtitle: "Heavy refinery preheat exchanger duty = 2.93 MW", value: 10, unitId: "MMBTU_hr", badge: "10 MMBTU/h" },
  { category: "thermal_duty", title: "100 TR Turbine Lube Cooler", subtitle: "Hydro power plant bearing oil cooler duty = 351.69 kW", value: 100, unitId: "TR", badge: "100 TR" },

  // TEMA Fouling Factors
  { category: "fouling_factor", title: "Clean Treated Water Fouling", subtitle: "TEMA Rf = 0.000176 m²·K/W (0.001 hr·ft²·°F/BTU)", value: 0.000176, unitId: "m2K_W", badge: "Clean Water" },
  { category: "fouling_factor", title: "River Water / Heavy Fouling", subtitle: "TEMA Rf = 0.000528 m²·K/W (0.003 hr·ft²·°F/BTU)", value: 0.000528, unitId: "m2K_W", badge: "River Water" },
];

// Helper to convert values between temperature scales
function convertTemperature(value: number, fromId: string, toId: string): number {
  if (fromId === toId) return value;
  
  // Step 1: Convert from source unit to Celsius
  let inC = value;
  if (fromId === "F") inC = ((value - 32) * 5) / 9;
  else if (fromId === "K") inC = value - 273.15;
  else if (fromId === "R") inC = ((value - 491.67) * 5) / 9;

  // Step 2: Convert from Celsius to target unit
  if (toId === "C") return inC;
  if (toId === "F") return (inC * 9) / 5 + 32;
  if (toId === "K") return inC + 273.15;
  if (toId === "R") return (inC + 273.15) * 1.8;

  return inC;
}

// Convert value between any two units in a category
export function convertUnitValue(
  value: number,
  categoryKey: UnitCategoryKey,
  fromUnitId: string,
  toUnitId: string
): number {
  if (isNaN(value)) return 0;
  if (fromUnitId === toUnitId) return value;

  // Special linear formula handling for absolute Temperature
  if (categoryKey === "temperature") {
    return convertTemperature(value, fromUnitId, toUnitId);
  }

  const category = UNIT_CATEGORIES.find((c) => c.id === categoryKey);
  if (!category) return value;

  const fromUnit = category.units.find((u) => u.id === fromUnitId);
  const toUnit = category.units.find((u) => u.id === toUnitId);

  if (!fromUnit || !toUnit) return value;

  // Step 1: Convert to base unit value
  const baseValue = value * fromUnit.toBaseFactor;
  // Step 2: Convert from base unit value to target unit value
  const targetValue = baseValue * toUnit.fromBaseFactor;

  return targetValue;
}

// Format engineering numeric values with smart precision
export function formatEngineeringNumber(num: number): string {
  if (isNaN(num)) return "0";
  if (num === 0) return "0";

  const absNum = Math.abs(num);
  if (absNum >= 1e6 || absNum < 0.0001) {
    return num.toExponential(4);
  }
  if (absNum >= 1000) {
    return num.toLocaleString("en-US", { maximumFractionDigits: 3 });
  }
  if (absNum >= 1) {
    return Number(num.toFixed(4)).toString();
  }
  return Number(num.toFixed(6)).toString();
}

// --- UNIT SCALE RELATIONSHIP CHART (RECHARTS) ---
interface ScaleChartProps {
  category: UnitCategory;
  inputValue: number;
  fromUnitId: string;
  toUnitId: string;
}

export const UnitScaleChart: React.FC<ScaleChartProps> = ({
  category,
  inputValue,
  fromUnitId,
  toUnitId,
}) => {
  const [scaleMode, setScaleMode] = useState<"direct" | "log">("direct");

  const chartData = useMemo(() => {
    return category.units.map((unit) => {
      const convertedVal = convertUnitValue(inputValue, category.id, fromUnitId, unit.id);
      const absVal = Math.abs(convertedVal);
      // Logarithmic scaling for visual balance when units differ by orders of magnitude
      const logVal = absVal > 0 ? Number(Math.log10(absVal + 1).toFixed(3)) : 0;

      return {
        unitId: unit.id,
        name: unit.name,
        symbol: unit.symbol,
        value: convertedVal,
        absVal: absVal,
        displayVal: scaleMode === "log" ? logVal : absVal,
        isFrom: unit.id === fromUnitId,
        isTo: unit.id === toUnitId,
      };
    });
  }, [category, inputValue, fromUnitId, toUnitId, scaleMode]);

  const fromUnitSymbol = category.units.find((u) => u.id === fromUnitId)?.symbol || "";
  const toUnitSymbol = category.units.find((u) => u.id === toUnitId)?.symbol || "";

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-2xl p-3.5 text-white space-y-2 shadow-lg">
      <div className="flex items-center justify-between text-xs font-mono font-bold border-b border-slate-800 pb-2">
        <div className="flex items-center gap-1.5 text-cyan-400">
          <BarChart2 className="w-4 h-4 text-cyan-300" />
          <span>Scale Relationship ({category.shortName})</span>
        </div>

        <div className="flex items-center gap-1 bg-slate-800 p-0.5 rounded-lg text-[10px]">
          <button
            type="button"
            onClick={() => setScaleMode("direct")}
            className={`px-2 py-0.5 rounded font-bold transition cursor-pointer ${
              scaleMode === "direct" ? "bg-[#0056A6] text-white" : "text-slate-400 hover:text-slate-200"
            }`}
          >
            Direct
          </button>
          <button
            type="button"
            onClick={() => setScaleMode("log")}
            className={`px-2 py-0.5 rounded font-bold transition cursor-pointer ${
              scaleMode === "log" ? "bg-[#0056A6] text-white" : "text-slate-400 hover:text-slate-200"
            }`}
          >
            Log Scale
          </button>
        </div>
      </div>

      <div className="h-32 w-full pt-1">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={chartData} margin={{ top: 8, right: 8, left: -20, bottom: 0 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#334155" vertical={false} />
            <XAxis dataKey="symbol" stroke="#94a3b8" fontSize={10} tickLine={false} />
            <YAxis stroke="#94a3b8" fontSize={9} tickLine={false} />
            <Tooltip
              content={({ active, payload }) => {
                if (active && payload && payload.length) {
                  const data = payload[0].payload;
                  return (
                    <div className="bg-slate-950 border border-cyan-500/40 p-2.5 rounded-xl shadow-2xl text-xs font-mono z-50">
                      <p className="font-bold text-cyan-300">{data.name} ({data.symbol})</p>
                      <p className="text-emerald-300 font-black text-sm mt-0.5">
                        {formatEngineeringNumber(data.value)} {data.symbol}
                      </p>
                      {data.isFrom && (
                        <span className="inline-block mt-1 px-1.5 py-0.5 bg-amber-500/20 text-amber-300 text-[9px] font-bold rounded">
                          Source Unit
                        </span>
                      )}
                      {data.isTo && (
                        <span className="inline-block mt-1 px-1.5 py-0.5 bg-emerald-500/20 text-emerald-300 text-[9px] font-bold rounded">
                          Target Unit
                        </span>
                      )}
                    </div>
                  );
                }
                return null;
              }}
            />
            <Bar dataKey="displayVal" radius={[4, 4, 0, 0]}>
              {chartData.map((entry) => (
                <Cell
                  key={entry.unitId}
                  fill={
                    entry.isFrom
                      ? "#f59e0b" // Amber for Source
                      : entry.isTo
                      ? "#10b981" // Emerald for Target
                      : "#0284c7" // Sky blue for Category Units
                  }
                />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>

      <div className="flex flex-wrap items-center justify-between text-[10px] text-slate-400 font-mono pt-1 border-t border-slate-800/80 gap-2">
        <div className="flex items-center gap-3">
          <span className="flex items-center gap-1">
            <span className="w-2 h-2 rounded-full bg-amber-500 inline-block" /> Source ({fromUnitSymbol})
          </span>
          <span className="flex items-center gap-1">
            <span className="w-2 h-2 rounded-full bg-emerald-500 inline-block" /> Target ({toUnitSymbol})
          </span>
          <span className="flex items-center gap-1">
            <span className="w-2 h-2 rounded-full bg-sky-600 inline-block" /> Category Units
          </span>
        </div>
        <span className="text-slate-500 italic">
          {scaleMode === "log" ? "Log scale visualizes massive order-of-magnitude ranges" : "Direct magnitude comparison"}
        </span>
      </div>
    </div>
  );
};

// --- MAIN FLOATING UNIT CONVERTER COMPONENT ---

export const FloatingUnitConverter: React.FC = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [isMinimized, setIsMinimized] = useState<boolean>(false);
  const [activeTab, setActiveTab] = useState<"converter" | "matrix" | "presets" | "history" | "weight_price">("converter");

  // Converter state
  const [selectedCategoryKey, setSelectedCategoryKey] = useState<UnitCategoryKey>("thermal_duty");
  const [inputValue, setInputValue] = useState<number>(1000);
  const [fromUnitId, setFromUnitId] = useState<string>("BTU_hr");
  const [toUnitId, setToUnitId] = useState<string>("kW");

  const [copiedState, setCopiedState] = useState<boolean>(false);
  const [historyList, setHistoryList] = useState<HistoryItem[]>([
    {
      id: "h1",
      timestamp: "10:15 AM",
      categoryLabel: "Thermal Duty & Power",
      fromVal: 1000000,
      fromSymbol: "BTU/hr",
      toVal: 293.071,
      toSymbol: "kW",
    },
    {
      id: "h2",
      timestamp: "10:22 AM",
      categoryLabel: "Pressure & Head",
      fromVal: 150,
      fromSymbol: "PSI",
      toVal: 10.342,
      toSymbol: "bar",
    },
    {
      id: "h3",
      timestamp: "10:30 AM",
      categoryLabel: "Length & Tube Geometry",
      fromVal: 0.75,
      fromSymbol: "in",
      toVal: 19.05,
      toSymbol: "mm",
    },
  ]);

  // Current category metadata
  const currentCategory = useMemo(() => {
    return UNIT_CATEGORIES.find((c) => c.id === selectedCategoryKey) || UNIT_CATEGORIES[0];
  }, [selectedCategoryKey]);

  // Sync default from/to units whenever category changes
  useEffect(() => {
    if (currentCategory.units.length >= 2) {
      setFromUnitId(currentCategory.units[0].id);
      setToUnitId(currentCategory.units[1].id);
    } else if (currentCategory.units.length === 1) {
      setFromUnitId(currentCategory.units[0].id);
      setToUnitId(currentCategory.units[0].id);
    }
  }, [selectedCategoryKey, currentCategory]);

  // Calculate current conversion result
  const calculatedResult = useMemo(() => {
    return convertUnitValue(inputValue, selectedCategoryKey, fromUnitId, toUnitId);
  }, [inputValue, selectedCategoryKey, fromUnitId, toUnitId]);

  // Calculate exact multiplier string
  const conversionFormulaString = useMemo(() => {
    const fromUnit = currentCategory.units.find((u) => u.id === fromUnitId);
    const toUnit = currentCategory.units.find((u) => u.id === toUnitId);
    if (!fromUnit || !toUnit) return "";

    if (selectedCategoryKey === "temperature") {
      if (fromUnitId === "C" && toUnitId === "F") return "°F = (°C × 9/5) + 32";
      if (fromUnitId === "F" && toUnitId === "C") return "°C = (°F − 32) × 5/9";
      if (fromUnitId === "C" && toUnitId === "K") return "K = °C + 273.15";
      if (fromUnitId === "K" && toUnitId === "C") return "°C = K − 273.15";
    }

    const unitFactor = convertUnitValue(1, selectedCategoryKey, fromUnitId, toUnitId);
    return `1 ${fromUnit.symbol} = ${formatEngineeringNumber(unitFactor)} ${toUnit.symbol}`;
  }, [selectedCategoryKey, fromUnitId, toUnitId, currentCategory]);

  // Handle unit swap button
  const handleSwapUnits = () => {
    const temp = fromUnitId;
    setFromUnitId(toUnitId);
    setToUnitId(temp);
  };

  // Save to history when converting or copying
  const logToHistory = useCallback(() => {
    const fromUnit = currentCategory.units.find((u) => u.id === fromUnitId);
    const toUnit = currentCategory.units.find((u) => u.id === toUnitId);
    if (!fromUnit || !toUnit) return;

    const newItem: HistoryItem = {
      id: Date.now().toString(),
      timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
      categoryLabel: currentCategory.label,
      fromVal: inputValue,
      fromSymbol: fromUnit.symbol,
      toVal: calculatedResult,
      toSymbol: toUnit.symbol,
    };

    setHistoryList((prev) => [newItem, ...prev.slice(0, 14)]);
  }, [currentCategory, fromUnitId, toUnitId, inputValue, calculatedResult]);

  // Copy result to clipboard
  const handleCopyResult = () => {
    const toUnit = currentCategory.units.find((u) => u.id === toUnitId);
    const textToCopy = `${formatEngineeringNumber(calculatedResult)} ${toUnit?.symbol || ""}`;
    navigator.clipboard.writeText(textToCopy);
    setCopiedState(true);
    logToHistory();
    setTimeout(() => setCopiedState(false), 2000);
  };

  // Keyboard shortcut listener (Alt + U or Ctrl + Shift + U)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.altKey && (e.key === "u" || e.key === "U")) || ((e.ctrlKey || e.metaKey) && e.shiftKey && (e.key === "u" || e.key === "U"))) {
        e.preventDefault();
        setIsOpen((prev) => !prev);
        setIsMinimized(false);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  // Preset click handler
  const handleApplyPreset = (preset: PresetItem) => {
    setSelectedCategoryKey(preset.category);
    setInputValue(preset.value);
    setFromUnitId(preset.unitId);
    setActiveTab("converter");
  };

  const CategoryIcon = currentCategory.icon;
  const currentFromUnit = currentCategory.units.find((u) => u.id === fromUnitId) || currentCategory.units[0];
  const currentToUnit = currentCategory.units.find((u) => u.id === toUnitId) || currentCategory.units[1] || currentCategory.units[0];

  return (
    <>
      {/* --- FLOATING LAUNCHER BUTTON (ALWAYS VISIBLE IN BOTTOM-RIGHT) --- */}
      <div className="fixed bottom-6 right-6 z-[95] flex items-center gap-2 font-['Plus_Jakarta_Sans',sans-serif]">
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => {
            setIsOpen(!isOpen);
            setIsMinimized(false);
          }}
          className={`flex items-center gap-2.5 px-4 py-3 rounded-2xl shadow-2xl transition-all duration-300 border cursor-pointer ${
            isOpen
              ? "bg-slate-900 text-cyan-400 border-cyan-500/50 ring-2 ring-cyan-500/30"
              : "bg-[#0056A6] hover:bg-blue-700 text-white border-blue-400/30 glow-cyan"
          }`}
          title="Quick Thermal & Mechanical Unit Converter (Alt + U)"
        >
          <div className="relative">
            <ArrowRightLeft className="w-5 h-5 text-cyan-300 animate-pulse" />
            <span className="absolute -top-1 -right-1 w-2 h-2 bg-emerald-400 rounded-full" />
          </div>
          <div className="text-left hidden sm:block">
            <span className="block text-xs font-black uppercase tracking-wider font-mono">Unit Converter</span>
            <span className="block text-[10px] text-cyan-200/80">Thermal & ASME (Alt+U)</span>
          </div>
        </motion.button>
      </div>

      {/* --- FLOATING UTILITY WIDGET PANEL --- */}
      <AnimatePresence>
        {isOpen && (
          <div className="fixed inset-0 z-[100] pointer-events-none flex items-end sm:items-center justify-center sm:justify-end sm:pr-6 sm:pb-20">
            <motion.div
              initial={{ opacity: 0, y: 30, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 30, scale: 0.95 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              className={`pointer-events-auto bg-white/95 backdrop-blur-xl border border-slate-200 shadow-2xl rounded-3xl overflow-hidden flex flex-col font-['Plus_Jakarta_Sans',sans-serif] transition-all duration-300 w-full max-w-xl sm:w-[540px] ${
                isMinimized ? "h-[80px]" : "max-h-[85vh] h-[680px]"
              }`}
            >
              {/* Widget Header */}
              <div className="p-4 bg-gradient-to-r from-slate-900 via-[#003366] to-[#0056A6] text-white flex items-center justify-between shrink-0 border-b border-slate-800">
                <div className="flex items-center gap-3">
                  <div className="p-2.5 rounded-xl bg-cyan-500/20 text-cyan-300 border border-cyan-400/30">
                    <CategoryIcon className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <h3 className="text-sm font-black uppercase tracking-wider font-mono text-white">
                        Engineering Unit Converter
                      </h3>
                      <span className="px-2 py-0.5 bg-amber-500/20 text-amber-300 text-[9px] font-mono font-bold rounded-full border border-amber-500/30">
                        TEMA / ASME
                      </span>
                    </div>
                    <p className="text-[11px] text-cyan-100/80 line-clamp-1">
                      Thermal duty, pressure, tube OD, BWG, & U-coefficients
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-1.5 text-slate-300">
                  <button
                    onClick={() => setIsMinimized(!isMinimized)}
                    className="p-1.5 hover:bg-white/10 rounded-lg transition text-slate-300 hover:text-white"
                    title={isMinimized ? "Expand Panel" : "Minimize Panel"}
                  >
                    {isMinimized ? <Maximize2 className="w-4 h-4" /> : <Minimize2 className="w-4 h-4" />}
                  </button>
                  <button
                    onClick={() => setIsOpen(false)}
                    className="p-1.5 hover:bg-red-500/20 hover:text-red-300 rounded-lg transition text-slate-300"
                    title="Close Utility (Esc)"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>
              </div>

              {/* Main Content (Hidden when minimized) */}
              {!isMinimized && (
                <>
                  {/* Internal Sub-Navigation Tabs */}
                  <div className="flex items-center justify-between px-4 pt-3 pb-2 bg-slate-50 border-b border-slate-200/80 shrink-0 text-xs font-mono font-bold">
                    <div className="flex items-center gap-1 bg-slate-200/80 p-1 rounded-xl">
                      <button
                        onClick={() => setActiveTab("converter")}
                        className={`px-3 py-1.5 rounded-lg transition cursor-pointer flex items-center gap-1.5 ${
                          activeTab === "converter"
                            ? "bg-[#0056A6] text-white shadow-sm"
                            : "text-slate-600 hover:text-slate-900"
                        }`}
                      >
                        <ArrowRightLeft className="w-3.5 h-3.5" />
                        Quick Convert
                      </button>
                      <button
                        onClick={() => setActiveTab("matrix")}
                        className={`px-3 py-1.5 rounded-lg transition cursor-pointer flex items-center gap-1.5 ${
                          activeTab === "matrix"
                            ? "bg-[#0056A6] text-white shadow-sm"
                            : "text-slate-600 hover:text-slate-900"
                        }`}
                      >
                        <Sliders className="w-3.5 h-3.5" />
                        Full Matrix
                      </button>
                      <button
                        onClick={() => setActiveTab("presets")}
                        className={`px-3 py-1.5 rounded-lg transition cursor-pointer flex items-center gap-1.5 ${
                          activeTab === "presets"
                            ? "bg-[#0056A6] text-white shadow-sm"
                            : "text-slate-600 hover:text-slate-900"
                        }`}
                      >
                        <BookOpen className="w-3.5 h-3.5" />
                        BWG & Presets
                      </button>
                      <button
                        onClick={() => setActiveTab("weight_price")}
                        className={`px-3 py-1.5 rounded-lg transition cursor-pointer flex items-center gap-1.5 ${
                          activeTab === "weight_price"
                            ? "bg-[#0056A6] text-white shadow-sm"
                            : "text-slate-600 hover:text-slate-900"
                        }`}
                      >
                        <Scale className="w-3.5 h-3.5 text-amber-500" />
                        Weight & Price Calc
                      </button>
                      <button
                        onClick={() => setActiveTab("history")}
                        className={`px-3 py-1.5 rounded-lg transition cursor-pointer flex items-center gap-1.5 ${
                          activeTab === "history"
                            ? "bg-[#0056A6] text-white shadow-sm"
                            : "text-slate-600 hover:text-slate-900"
                        }`}
                      >
                        <History className="w-3.5 h-3.5" />
                        History
                      </button>
                    </div>

                    <span className="text-[10px] text-slate-400 font-normal hidden sm:inline">
                      Press <kbd className="px-1 py-0.5 bg-slate-200 rounded text-slate-700 font-mono font-bold">Alt+U</kbd>
                    </span>
                  </div>

                  {/* Body Content Container */}
                  <div className="flex-1 overflow-y-auto p-4 space-y-4 text-slate-800">
                    {/* TAB 1: QUICK CONVERTER */}
                    {activeTab === "converter" && (
                      <div className="space-y-4">
                        {/* Category Selector Dropdown & Grid Pills */}
                        <div className="space-y-2">
                          <label className="text-[11px] font-extrabold text-slate-500 uppercase tracking-wider block font-mono">
                            Engineering Category
                          </label>

                          <div className="relative">
                            <select
                              value={selectedCategoryKey}
                              onChange={(e) => setSelectedCategoryKey(e.target.value as UnitCategoryKey)}
                              className="w-full pl-4 pr-10 py-2.5 bg-slate-100 border border-slate-300 rounded-xl font-bold text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-[#0056A6] appearance-none cursor-pointer"
                            >
                              {UNIT_CATEGORIES.map((cat) => (
                                <option key={cat.id} value={cat.id}>
                                  {cat.label} ({cat.units.length} units)
                                </option>
                              ))}
                            </select>
                            <ChevronDown className="w-4 h-4 text-slate-500 absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
                          </div>
                        </div>

                        {/* Input Value & Unit Selector Grid */}
                        <div className="grid grid-cols-1 sm:grid-cols-12 gap-3 items-center pt-2">
                          {/* From Unit Block */}
                          <div className="sm:col-span-5 bg-slate-50 p-3.5 rounded-2xl border border-slate-200/80 space-y-2">
                            <label className="text-[10px] font-bold text-slate-500 uppercase tracking-wider font-mono block">
                              From Value & Unit
                            </label>

                            <input
                              type="number"
                              value={inputValue}
                              onChange={(e) => setInputValue(Number(e.target.value))}
                              className="w-full py-1.5 px-2.5 bg-white border border-slate-300 rounded-xl font-mono text-lg font-black text-slate-900 focus:outline-none focus:ring-2 focus:ring-[#0056A6]"
                            />

                            <select
                              value={fromUnitId}
                              onChange={(e) => setFromUnitId(e.target.value)}
                              className="w-full py-2 px-2.5 bg-white border border-slate-300 rounded-xl font-bold text-xs text-slate-800 focus:outline-none focus:ring-2 focus:ring-[#0056A6] cursor-pointer"
                            >
                              {currentCategory.units.map((u) => (
                                <option key={u.id} value={u.id}>
                                  {u.symbol} — {u.name}
                                </option>
                              ))}
                            </select>

                            <p className="text-[10px] text-slate-400 line-clamp-1 italic">
                              {currentFromUnit.description}
                            </p>
                          </div>

                          {/* Swap Button Center */}
                          <div className="sm:col-span-2 flex flex-col items-center justify-center py-1 sm:py-0">
                            <motion.button
                              whileHover={{ rotate: 180, scale: 1.08 }}
                              whileTap={{ scale: 0.92 }}
                              onClick={handleSwapUnits}
                              className="px-3 py-2.5 bg-blue-100 hover:bg-[#0056A6] hover:text-white text-[#0056A6] rounded-2xl transition-all shadow-sm border border-blue-200 cursor-pointer flex flex-col items-center gap-1 group"
                              title="Swap Source and Target Units (Reverses Direction)"
                            >
                              <ArrowRightLeft className="w-5 h-5 transition-transform duration-300 group-hover:scale-110" />
                              <span className="text-[9px] font-mono font-black uppercase tracking-wider">
                                Swap
                              </span>
                            </motion.button>
                          </div>

                          {/* To Unit Block */}
                          <div className="sm:col-span-5 bg-slate-50 p-3.5 rounded-2xl border border-slate-200/80 space-y-2">
                            <label className="text-[10px] font-bold text-slate-500 uppercase tracking-wider font-mono block">
                              To Target Unit
                            </label>

                            <select
                              value={toUnitId}
                              onChange={(e) => setToUnitId(e.target.value)}
                              className="w-full py-2 px-2.5 bg-white border border-slate-300 rounded-xl font-bold text-xs text-slate-800 focus:outline-none focus:ring-2 focus:ring-[#0056A6] cursor-pointer"
                            >
                              {currentCategory.units.map((u) => (
                                <option key={u.id} value={u.id}>
                                  {u.symbol} — {u.name}
                                </option>
                              ))}
                            </select>

                            <div className="p-2.5 bg-white rounded-xl border border-slate-200 text-right">
                              <span className="text-[10px] font-mono text-slate-400 block">Target Symbol</span>
                              <span className="text-sm font-black text-[#0056A6] font-mono">
                                {currentToUnit.symbol}
                              </span>
                            </div>

                            <p className="text-[10px] text-slate-400 line-clamp-1 italic">
                              {currentToUnit.description}
                            </p>
                          </div>
                        </div>

                        {/* BIG RESULT DISPLAY CARD */}
                        <div className="bg-gradient-to-br from-slate-900 via-[#003366] to-[#0056A6] text-white p-5 rounded-2xl shadow-xl space-y-3 relative overflow-hidden border border-slate-800">
                          <div className="flex items-center justify-between text-xs font-mono text-cyan-300 font-bold border-b border-white/10 pb-2">
                            <span>Calculated Engineering Result</span>
                            <span className="px-2 py-0.5 bg-cyan-500/20 rounded text-[10px] text-cyan-200">
                              {currentCategory.label}
                            </span>
                          </div>

                          <div className="flex items-baseline justify-between gap-2">
                            <div>
                              <div className="text-2xl sm:text-3xl font-black font-mono text-emerald-300 tracking-tight">
                                {formatEngineeringNumber(calculatedResult)}
                              </div>
                              <div className="text-sm font-bold text-white font-mono">
                                {currentToUnit.symbol} ({currentToUnit.name})
                              </div>
                            </div>

                            <div className="flex items-center gap-2 shrink-0">
                              <button
                                onClick={handleSwapUnits}
                                className="px-3 py-2 bg-white/10 hover:bg-white/20 text-cyan-200 font-bold text-xs uppercase tracking-wider rounded-xl transition-all border border-white/20 flex items-center gap-1.5 cursor-pointer"
                                title="Swap source and target units"
                              >
                                <ArrowRightLeft className="w-3.5 h-3.5 text-cyan-300" />
                                <span>Swap</span>
                              </button>

                              <button
                                onClick={handleCopyResult}
                                className="px-4 py-2 bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-black text-xs uppercase tracking-wider rounded-xl transition-all shadow-lg flex items-center gap-1.5 cursor-pointer"
                              >
                                {copiedState ? <Check className="w-4 h-4 text-slate-950" /> : <Copy className="w-4 h-4" />}
                                {copiedState ? "Copied!" : "Copy"}
                              </button>
                            </div>
                          </div>

                          {/* Conversion Formula / Multiplier info */}
                          <div className="pt-2 border-t border-white/10 flex justify-between items-center text-[11px] font-mono text-slate-300">
                            <span>Exact Multiplier:</span>
                            <span className="text-amber-300 font-bold">{conversionFormulaString}</span>
                          </div>
                        </div>

                        {/* Recharts Scale Relationship Visualizer */}
                        <UnitScaleChart
                          category={currentCategory}
                          inputValue={inputValue}
                          fromUnitId={fromUnitId}
                          toUnitId={toUnitId}
                        />

                        {/* Quick Multiplier Utility Buttons */}
                        <div className="flex items-center justify-between text-xs font-mono pt-1">
                          <span className="text-slate-500 font-bold">Quick Value Adjust:</span>
                          <div className="flex gap-1.5">
                            <button
                              onClick={() => setInputValue((v) => v * 10)}
                              className="px-2.5 py-1 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold rounded-lg transition"
                            >
                              ×10
                            </button>
                            <button
                              onClick={() => setInputValue((v) => v / 10)}
                              className="px-2.5 py-1 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold rounded-lg transition"
                            >
                              ÷10
                            </button>
                            <button
                              onClick={() => setInputValue((v) => -v)}
                              className="px-2.5 py-1 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold rounded-lg transition"
                            >
                              ± Negate
                            </button>
                            <button
                              onClick={() => setInputValue(1)}
                              className="px-2.5 py-1 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold rounded-lg transition"
                            >
                              Reset = 1
                            </button>
                          </div>
                        </div>
                      </div>
                    )}

                    {/* TAB 2: FULL CONVERSION MATRIX */}
                    {activeTab === "matrix" && (
                      <div className="space-y-4">
                        <div className="flex justify-between items-center pb-2 border-b border-slate-200">
                          <div>
                            <h4 className="text-sm font-bold text-slate-900">
                              Full Comparison Matrix for {inputValue} {currentFromUnit.symbol}
                            </h4>
                            <p className="text-[11px] text-slate-500">
                              Instant simultaneous conversion across all units in {currentCategory.label}
                            </p>
                          </div>
                          <span className="px-2.5 py-1 bg-blue-50 text-[#0056A6] font-mono font-bold text-xs rounded-full">
                            {currentCategory.units.length} Units
                          </span>
                        </div>

                        <div className="space-y-2 max-h-[380px] overflow-y-auto pr-1">
                          {currentCategory.units.map((unit) => {
                            const val = convertUnitValue(inputValue, selectedCategoryKey, fromUnitId, unit.id);
                            const isCurrentFrom = unit.id === fromUnitId;

                            return (
                              <div
                                key={unit.id}
                                onClick={() => {
                                  setToUnitId(unit.id);
                                  setActiveTab("converter");
                                }}
                                className={`p-3 rounded-xl border transition-all cursor-pointer flex items-center justify-between ${
                                  isCurrentFrom
                                    ? "bg-blue-50/80 border-[#0056A6] ring-1 ring-[#0056A6]"
                                    : "bg-slate-50 border-slate-200 hover:border-blue-300 hover:bg-slate-100"
                                }`}
                              >
                                <div>
                                  <span className="font-bold text-xs text-slate-900 block">{unit.name}</span>
                                  <span className="text-[10px] text-slate-500 font-mono">{unit.description}</span>
                                </div>

                                <div className="text-right">
                                  <span className="font-mono font-black text-sm text-[#0056A6] block">
                                    {formatEngineeringNumber(val)}
                                  </span>
                                  <span className="font-mono text-[10px] text-slate-400 uppercase font-bold">
                                    {unit.symbol}
                                  </span>
                                </div>
                              </div>
                            );
                          })}
                        </div>
                      </div>
                    )}

                    {/* TAB 3: BWG & INDUSTRIAL PRESETS */}
                    {activeTab === "presets" && (
                      <div className="space-y-4">
                        <div className="pb-2 border-b border-slate-200">
                          <h4 className="text-sm font-bold text-slate-900">
                            Industrial Engineering Standards & Presets
                          </h4>
                          <p className="text-[11px] text-slate-500">
                            Quickly load standard ASME tube ODs, Birmingham Wire Gauges (BWG), and pressure classes
                          </p>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 max-h-[380px] overflow-y-auto pr-1">
                          {INDUSTRIAL_PRESETS.map((preset, idx) => (
                            <div
                              key={idx}
                              onClick={() => handleApplyPreset(preset)}
                              className="p-3 bg-slate-50 hover:bg-blue-50/80 border border-slate-200 hover:border-blue-300 rounded-xl transition cursor-pointer flex flex-col justify-between space-y-2 group"
                            >
                              <div className="flex items-center justify-between">
                                <span className="text-xs font-bold text-slate-900 group-hover:text-[#0056A6]">
                                  {preset.title}
                                </span>
                                {preset.badge && (
                                  <span className="px-2 py-0.5 bg-blue-100 text-[#0056A6] text-[10px] font-mono font-bold rounded-full">
                                    {preset.badge}
                                  </span>
                                )}
                              </div>

                              <p className="text-[10px] text-slate-500 line-clamp-2">{preset.subtitle}</p>

                              <div className="pt-2 border-t border-slate-200/80 flex items-center justify-between text-[11px] font-mono font-bold text-[#0056A6]">
                                <span>Preset Value: {preset.value}</span>
                                <span className="text-slate-400 group-hover:text-[#0056A6] text-[10px]">Apply →</span>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* TAB 4: CONVERSION HISTORY */}
                    {activeTab === "history" && (
                      <div className="space-y-4">
                        <div className="flex justify-between items-center pb-2 border-b border-slate-200">
                          <div>
                            <h4 className="text-sm font-bold text-slate-900">Recent Conversions Log</h4>
                            <p className="text-[11px] text-slate-500">
                              Track & reuse recent converted values across your active session
                            </p>
                          </div>

                          <button
                            onClick={() => setHistoryList([])}
                            className="text-[11px] font-bold text-red-600 hover:underline cursor-pointer"
                          >
                            Clear History
                          </button>
                        </div>

                        {historyList.length === 0 ? (
                          <div className="text-center py-12 text-slate-400 text-xs font-mono">
                            No recent conversion records. Perform a conversion or copy a result to log it here.
                          </div>
                        ) : (
                          <div className="space-y-2 max-h-[360px] overflow-y-auto pr-1">
                            {historyList.map((item) => (
                              <div
                                key={item.id}
                                className="p-3 bg-slate-50 border border-slate-200 rounded-xl flex items-center justify-between text-xs"
                              >
                                <div>
                                  <div className="flex items-center gap-2">
                                    <span className="text-[10px] font-mono font-bold text-slate-400 uppercase">
                                      {item.categoryLabel}
                                    </span>
                                    <span className="text-[10px] text-slate-300">• {item.timestamp}</span>
                                  </div>
                                  <div className="font-mono font-bold text-slate-800 pt-0.5">
                                    {formatEngineeringNumber(item.fromVal)} {item.fromSymbol} →{" "}
                                    <span className="text-[#0056A6] font-black">
                                      {formatEngineeringNumber(item.toVal)} {item.toSymbol}
                                    </span>
                                  </div>
                                </div>

                                <button
                                  onClick={() => {
                                    navigator.clipboard.writeText(
                                      `${formatEngineeringNumber(item.toVal)} ${item.toSymbol}`
                                    );
                                  }}
                                  className="p-2 bg-white hover:bg-slate-200 border border-slate-200 rounded-lg text-slate-600 transition"
                                  title="Copy converted value"
                                >
                                  <Copy className="w-3.5 h-3.5" />
                                </button>
                              </div>
                            ))}
                          </div>
                        )}
                      </div>
                    )}

                    {/* TAB 5: MATERIAL WEIGHT & PRICE CALCULATOR */}
                    {activeTab === "weight_price" && (
                      <div className="space-y-4">
                        <div className="pb-2 border-b border-slate-200">
                          <h4 className="text-sm font-bold text-slate-900 flex items-center gap-2">
                            <Scale className="w-4 h-4 text-[#0056A6]" /> Metal & Alloy Weight and Commercial Price Calculator
                          </h4>
                          <p className="text-[11px] text-slate-500">
                            Calculate theoretical piece weights, scrap waste allowances, & market price totals across all profiles and alloys
                          </p>
                        </div>

                        <MaterialWeightCalculator embeddedInModal={true} />
                      </div>
                    )}
                  </div>

                  {/* Widget Footer Bar */}
                  <div className="p-3 bg-slate-100 border-t border-slate-200 flex justify-between items-center text-[10px] font-mono text-slate-500 shrink-0">
                    <span className="flex items-center gap-1">
                      <Sparkles className="w-3 h-3 text-[#0056A6]" /> Northern HeatEx Engineering Ecosystem
                    </span>
                    <span>ASME VIII Div 1 & TEMA Standard</span>
                  </div>
                </>
              )}
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
};
