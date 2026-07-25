/**
 * Northern HeatEx Engineering Ecosystem (NHEE)
 * Core TypeScript Definitions
 */

export type UserRole =
  | "Guest"
  | "Registered User"
  | "Professional Engineer"
  | "Enterprise Customer"
  | "Company Administrator"
  | "Super Administrator";

export type EngineeringTab =
  | "dashboard"
  | "ai-designer"
  | "thermal-calc"
  | "mechanical-asme"
  | "materials"
  | "fabrication"
  | "cost-quotation"
  | "drawings"
  | "bom"
  | "reports"
  | "project-manager"
  | "ai-suite"
  | "knowledge"
  | "settings"
  | "showcase"
  | "products"
  | "company"
  | "3d-cad"
  | "tube-layout"
  | "customer-portal"
  | "admin-portal"
  | "gst-center";

export type TEMAType =
  | "BEM" // Fixed tubesheet, single pass shell
  | "AES" // Split ring floating head
  | "BEU" // U-tube bundle
  | "NEN" // Fixed tubesheet with integral heads
  | "AKT" // Kettle reboiler with pull-through bundle
  | "CFU"; // Channel with removable cover, u-tube

export type PitchPattern = "30-triangular" | "45-rotated-square" | "90-square";

export interface FluidProperties {
  name: string;
  flowRate: number; // kg/h or GPM
  tempIn: number; // °C
  tempOut: number; // °C
  specificHeat: number; // kJ/kg·K
  density: number; // kg/m³
  viscosity: number; // cP
  thermalConductivity: number; // W/m·K
  foulingFactor: number; // m²·K/W
}

export interface HeatExchangerDesign {
  id: string;
  title: string;
  clientName: string;
  temaType: TEMAType;
  designPressureShell: number; // bar or psi
  designPressureTube: number; // bar or psi
  designTempShell: number; // °C
  designTempTube: number; // °C
  hotSide: FluidProperties;
  coldSide: FluidProperties;
  shellDiameter: number; // mm
  tubeOD: number; // mm (e.g. 19.05mm = 3/4")
  tubeBWG: number; // BWG 14, 16, 18, 20
  tubeWallThickness: number; // mm
  tubeLength: number; // mm
  pitchPattern: PitchPattern;
  pitchDistance: number; // mm
  passCount: number; // 1, 2, 4, 6
  baffleCutPercent: number; // 20%, 25%
  baffleSpacing: number; // mm
  shellMaterial: string;
  tubeMaterial: string;
  tubeSheetMaterial: string;
  calculatedHeatDuty: number; // kW
  calculatedLMTD: number; // °C
  calculatedU: number; // W/m²·K
  calculatedArea: number; // m²
  calculatedTubeCount: number;
}

export interface MaterialSpec {
  id: string;
  name: string;
  grade: string;
  asmeSpec: string;
  density: number; // g/cm³
  thermalConductivity: number; // W/m·K
  maxTemp: number; // °C
  corrosionResistance: "Excellent" | "Good" | "Moderate" | "Specialized";
  costIndex: number; // Relative to Carbon Steel = 1.0
  allowableStressAt20C: number; // MPa
  allowableStressAt200C: number; // MPa
  suitableFluids: string[];
  description: string;
}

export interface QuotationLineItem {
  id: string;
  category: "Materials" | "Machining" | "Welding" | "Inspection" | "Stamping" | "Engineering";
  description: string;
  quantity: number;
  unit: string;
  unitCost: number;
  totalCost: number;
}

export interface CommercialQuotation {
  id: string;
  quoteNumber: string;
  date: string;
  validUntil: string;
  clientName: string;
  clientCompany: string;
  projectTitle: string;
  designId: string;
  items: QuotationLineItem[];
  subtotal: number;
  contingencyPercent: number;
  marginPercent: number;
  totalAmount: number;
  currency: string;
  leadTimeWeeks: number;
  status: "Draft" | "Pending Approval" | "Approved" | "In Production" | "Delivered";
}

export interface ProductCapability {
  id: string;
  title: string;
  subtitle: string;
  category: string;
  description: string;
  keySpecs: string[];
  asmeStandards: string[];
  applications: string[];
  imageUrl: string;
  model3DType: "shell-tube" | "fin-tube" | "stator-cooler" | "bearing" | "condenser";
}

export interface ProjectMilestone {
  id: string;
  title: string;
  description: string;
  status: "Completed" | "In Progress" | "Upcoming";
  completionDate?: string;
}

export interface CustomerProject {
  id: string;
  projectNumber: string;
  title: string;
  clientCompany: string;
  temaType: TEMAType;
  status: "Engineering Review" | "Material Procurement" | "CNC Machining" | "Tube Bundle Assembly" | "Hydro Testing" | "Factory Acceptance" | "Shipped";
  progressPercent: number;
  estimatedDelivery: string;
  milestones: ProjectMilestone[];
  asmeStamped: boolean;
  documents: { title: string; type: string; url: string; size: string }[];
}

export interface AIMessage {
  id: string;
  sender: "user" | "ai";
  role: "Thermal Engineer" | "Mechanical Engineer" | "Welding Specialist" | "Failure Analyst" | "Proposal Specialist" | "Knowledge Assistant";
  text: string;
  timestamp: string;
  parametersUsed?: Record<string, any>;
}
