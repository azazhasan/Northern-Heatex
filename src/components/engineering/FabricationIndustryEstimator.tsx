import React, { useState, useMemo } from "react";
import {
  Calculator,
  Download,
  FileText,
  PieChart as PieChartIcon,
  BarChart3,
  DollarSign,
  Layers,
  Wrench,
  ShieldCheck,
  Building2,
  Clock,
  Sparkles,
  CheckCircle2,
  Info,
  Sliders,
  TrendingUp,
  Scale,
  RefreshCw,
  Printer
} from "lucide-react";
import {
  PieChart,
  Pie,
  Cell,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  ResponsiveContainer
} from "recharts";
import jsPDF from "jspdf";

// --- MATERIALS DATABASE FOR FABRICATION ---
export interface FabricationMaterial {
  id: string;
  name: string;
  code: string;
  densityKgM3: number;
  baseCostPerKgUSD: number;
  weldabilityFactor: number; // multiplier for weld speed/labor
}

export const FAB_MATERIALS: FabricationMaterial[] = [
  { id: "cs_516", name: "Carbon Steel SA-516 Gr 70", code: "CS SA516-70", densityKgM3: 7850, baseCostPerKgUSD: 1.85, weldabilityFactor: 1.0 },
  { id: "ss_304l", name: "Stainless Steel 304/304L", code: "SS 304L", densityKgM3: 7930, baseCostPerKgUSD: 3.90, weldabilityFactor: 1.2 },
  { id: "ss_316l", name: "Stainless Steel 316/316L", code: "SS 316L", densityKgM3: 7980, baseCostPerKgUSD: 4.80, weldabilityFactor: 1.25 },
  { id: "duplex_2205", name: "Duplex Stainless UNS S32205", code: "Duplex 2205", densityKgM3: 7800, baseCostPerKgUSD: 7.20, weldabilityFactor: 1.5 },
  { id: "super_duplex", name: "Super Duplex UNS S32750", code: "S.Duplex 2507", densityKgM3: 7820, baseCostPerKgUSD: 11.50, weldabilityFactor: 1.75 },
  { id: "cuni_9010", name: "Copper Nickel 90/10", code: "CuNi 90/10", densityKgM3: 8940, baseCostPerKgUSD: 12.00, weldabilityFactor: 1.4 },
  { id: "inconel_625", name: "Inconel 625 Alloy", code: "Inconel 625", densityKgM3: 8440, baseCostPerKgUSD: 38.00, weldabilityFactor: 2.1 },
  { id: "titanium_gr2", name: "Titanium Grade 2", code: "Ti Gr.2", densityKgM3: 4510, baseCostPerKgUSD: 32.00, weldabilityFactor: 2.4 },
];

export interface EquipmentType {
  id: string;
  name: string;
  defaultLaborHours: number;
  cncFactor: number;
  ndeComplexity: number;
}

export const EQUIPMENT_TYPES: EquipmentType[] = [
  { id: "shell_tube", name: "Shell & Tube Heat Exchanger", defaultLaborHours: 140, cncFactor: 1.5, ndeComplexity: 1.3 },
  { id: "pressure_vessel", name: "ASME Pressure Vessel / Column", defaultLaborHours: 110, cncFactor: 1.1, ndeComplexity: 1.2 },
  { id: "air_cooler", name: "Air Cooled Exchanger Tube Bundle", defaultLaborHours: 160, cncFactor: 1.6, ndeComplexity: 1.25 },
  { id: "storage_tank", name: "Storage Vessel / Process Tank", defaultLaborHours: 85, cncFactor: 0.8, ndeComplexity: 1.0 },
  { id: "piping_spool", name: "Heavy Industrial Piping Spool", defaultLaborHours: 60, cncFactor: 0.7, ndeComplexity: 1.15 },
  { id: "structure", name: "Heavy Structural Steel Skid", defaultLaborHours: 75, cncFactor: 0.6, ndeComplexity: 0.9 },
];

export interface FabricationEstimatorProps {
  embeddedInModal?: boolean;
}

export const FabricationIndustryEstimator: React.FC<FabricationEstimatorProps> = ({ embeddedInModal = false }) => {
  // Navigation tabs inside estimator
  const [activeSubTab, setActiveSubTab] = useState<"calculator" | "charts" | "report">("calculator");
  const [currency, setCurrency] = useState<"INR" | "USD" | "EUR" | "GBP">("INR");
  const usdToInrRate = 86.5;

  // Project Identification
  const [projectName, setProjectName] = useState<string>("TEMA Heat Exchanger Assembly #4501");
  const [clientName, setClientName] = useState<string>("Reliance Energy / IOCL Refinery");
  const [equipmentTypeId, setEquipmentTypeId] = useState<string>("shell_tube");
  const [materialId, setMaterialId] = useState<string>("ss_316l");

  // Equipment Geometry & Quantity Inputs
  const [shellThicknessMm, setShellThicknessMm] = useState<number>(16);
  const [shellDiameterMm, setShellDiameterMm] = useState<number>(1200);
  const [shellLengthMm, setShellLengthMm] = useState<number>(4500);
  const [quantityUnits, setQuantityUnits] = useState<number>(1);

  // Internals / Bundles (for exchangers/vessels)
  const [tubeCount, setTubeCount] = useState<number>(480);
  const [tubeOdMm, setTubeOdMm] = useState<number>(19.05);
  const [tubeWallMm, setTubeWallMm] = useState<number>(1.65);
  const [tubeLengthM, setTubeLengthM] = useState<number>(4.5);
  const [tubesheetThicknessMm, setTubesheetThicknessMm] = useState<number>(65);

  // Welding & Labor Inputs
  const [weldProcess, setWeldProcess] = useState<"GTAW" | "SMAW" | "SAW" | "GMAW">("GTAW");
  const [totalWeldSeamM, setTotalWeldSeamM] = useState<number>(85);
  const [cncMachiningHours, setCncMachiningHours] = useState<number>(36);
  const [fitupLaborHours, setFitupLaborHours] = useState<number>(90);
  const [weldingLaborHours, setWeldingLaborHours] = useState<number>(120);

  // Commercial / Financial Inputs
  const [shopLaborRateUSD, setShopLaborRateUSD] = useState<number>(28); // $28/hr
  const [overheadMarginPct, setOverheadMarginPct] = useState<number>(15); // 15%
  const [profitMarginPct, setProfitMarginPct] = useState<number>(18); // 18%
  const [contingencyPct, setContingencyPct] = useState<number>(5); // 5%

  // Current material & equipment metadata
  const activeMaterial = useMemo(() => {
    return FAB_MATERIALS.find((m) => m.id === materialId) || FAB_MATERIALS[2];
  }, [materialId]);

  const activeEquipment = useMemo(() => {
    return EQUIPMENT_TYPES.find((e) => e.id === equipmentTypeId) || EQUIPMENT_TYPES[0];
  }, [equipmentTypeId]);

  // Currency Formatter
  const fmtCurr = (valUSD: number) => {
    if (currency === "INR") {
      const valINR = valUSD * usdToInrRate;
      return new Intl.NumberFormat("en-IN", { style: "currency", currency: "INR", maximumFractionDigits: 0 }).format(valINR);
    } else if (currency === "EUR") {
      return new Intl.NumberFormat("de-DE", { style: "currency", currency: "EUR", maximumFractionDigits: 0 }).format(valUSD * 0.92);
    } else if (currency === "GBP") {
      return new Intl.NumberFormat("en-GB", { style: "currency", currency: "GBP", maximumFractionDigits: 0 }).format(valUSD * 0.78);
    }
    return new Intl.NumberFormat("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 0 }).format(valUSD);
  };

  // --- MATHEMATICAL ENGINEERING CALCULATIONS ---
  const calculations = useMemo(() => {
    const rho = activeMaterial.densityKgM3;

    // 1. Shell Plate Weight (Cylinder Shell Volume * Density)
    // Mean Diameter = Outer Diameter - Thickness
    const meanDiamM = (shellDiameterMm - shellThicknessMm) / 1000;
    const lengthM = shellLengthMm / 1000;
    const shellVolumeM3 = Math.PI * meanDiamM * (shellThicknessMm / 1000) * lengthM;
    const shellWeightKg = shellVolumeM3 * rho;

    // 2. Tube Bundle Weight (if applicable)
    // Tube Metal Cross Section Volume = PI/4 * (OD^2 - ID^2) * Length * Count
    const tubeOdM = tubeOdMm / 1000;
    const tubeIdM = (tubeOdMm - 2 * tubeWallMm) / 1000;
    const tubeCrossSecM2 = (Math.PI / 4) * (Math.pow(tubeOdM, 2) - Math.pow(tubeIdM, 2));
    const totalTubeVolumeM3 = tubeCrossSecM2 * tubeLengthM * tubeCount;
    const tubesWeightKg = totalTubeVolumeM3 * rho;

    // 3. Tubesheets & Flanges Weight
    // Tubesheet Area = PI/4 * D^2 * Thickness * 2
    const tubesheetDiamM = (shellDiameterMm + 150) / 1000; // flange/tubesheet lip
    const tubesheetVolM3 = (Math.PI / 4) * Math.pow(tubesheetDiamM, 2) * (tubesheetThicknessMm / 1000) * 2;
    const tubesheetsWeightKg = tubesheetVolM3 * rho * 0.85; // 15% reduction for tube holes

    // Total Steel Weight
    const netEquipmentWeightKg = (shellWeightKg + tubesWeightKg + tubesheetsWeightKg) * quantityUnits;
    const grossMaterialWeightKg = netEquipmentWeightKg * 1.10; // 10% plate cutting/scrap allowance

    // Direct Material Costs
    const baseMatCostUSD = grossMaterialWeightKg * activeMaterial.baseCostPerKgUSD;
    const weldingConsumablesCostUSD = totalWeldSeamM * 18 * activeMaterial.weldabilityFactor;

    // Direct Labor Costs
    const totalLaborHours = (fitupLaborHours + weldingLaborHours * activeMaterial.weldabilityFactor + cncMachiningHours * activeEquipment.cncFactor) * quantityUnits;
    const directLaborCostUSD = totalLaborHours * shopLaborRateUSD;

    // NDE Testing & QA Inspection Cost
    const testingInspectionCostUSD = (netEquipmentWeightKg * 0.45 + totalWeldSeamM * 12) * activeEquipment.ndeComplexity;

    // Blasting & Surface Protection Cost (Shell Outer + Inner Surface)
    const surfaceAreaM2 = Math.PI * (shellDiameterMm / 1000) * (shellLengthMm / 1000) * 2 * quantityUnits;
    const surfaceCoatingCostUSD = surfaceAreaM2 * 22; // $22/m² blasting and epoxy primer

    // Total Direct Cost
    const totalDirectCostUSD = baseMatCostUSD + weldingConsumablesCostUSD + directLaborCostUSD + testingInspectionCostUSD + surfaceCoatingCostUSD;

    // Overheads & Margins
    const overheadCostUSD = totalDirectCostUSD * (overheadMarginPct / 100);
    const subtotalShopCostUSD = totalDirectCostUSD + overheadCostUSD;
    const profitCostUSD = subtotalShopCostUSD * (profitMarginPct / 100);
    const contingencyCostUSD = (subtotalShopCostUSD + profitCostUSD) * (contingencyPct / 100);

    // Final Commercial Tender Quote Price
    const finalTenderQuoteUSD = subtotalShopCostUSD + profitCostUSD + contingencyCostUSD;
    const costPerKgUSD = finalTenderQuoteUSD / netEquipmentWeightKg;

    return {
      shellWeightKg,
      tubesWeightKg,
      tubesheetsWeightKg,
      netEquipmentWeightKg,
      grossMaterialWeightKg,
      baseMatCostUSD,
      weldingConsumablesCostUSD,
      totalLaborHours,
      directLaborCostUSD,
      testingInspectionCostUSD,
      surfaceAreaM2,
      surfaceCoatingCostUSD,
      totalDirectCostUSD,
      overheadCostUSD,
      subtotalShopCostUSD,
      profitCostUSD,
      contingencyCostUSD,
      finalTenderQuoteUSD,
      costPerKgUSD,
    };
  }, [
    activeMaterial,
    activeEquipment,
    shellThicknessMm,
    shellDiameterMm,
    shellLengthMm,
    quantityUnits,
    tubeCount,
    tubeOdMm,
    tubeWallMm,
    tubeLengthM,
    tubesheetThicknessMm,
    totalWeldSeamM,
    fitupLaborHours,
    weldingLaborHours,
    cncMachiningHours,
    shopLaborRateUSD,
    overheadMarginPct,
    profitMarginPct,
    contingencyPct,
  ]);

  // --- CHART DATA GENERATION ---
  const costDistributionData = [
    { name: "Raw Materials", value: Math.round(calculations.baseMatCostUSD) },
    { name: "Labor & Machining", value: Math.round(calculations.directLaborCostUSD) },
    { name: "Weld Consumables", value: Math.round(calculations.weldingConsumablesCostUSD) },
    { name: "NDE & Testing", value: Math.round(calculations.testingInspectionCostUSD) },
    { name: "Overhead & Margin", value: Math.round(calculations.overheadCostUSD + calculations.profitCostUSD + calculations.contingencyCostUSD) },
  ];

  const COLORS = ["#0056A6", "#00A6D6", "#F7931E", "#10B981", "#8B5CF6"];

  const laborBreakdownData = [
    { activity: "Fit-up & Assembly", hours: fitupLaborHours },
    { activity: "Weld Pass & Seams", hours: Math.round(weldingLaborHours * activeMaterial.weldabilityFactor) },
    { activity: "CNC Drilling", hours: Math.round(cncMachiningHours * activeEquipment.cncFactor) },
    { activity: "NDE Inspection", hours: Math.round(totalWeldSeamM * 0.3) },
  ];

  const materialComparisonData = FAB_MATERIALS.slice(0, 5).map((mat) => {
    const estCost = calculations.netEquipmentWeightKg * mat.baseCostPerKgUSD * 2.1;
    return {
      material: mat.code,
      tenderQuoteUSD: Math.round(estCost),
    };
  });

  // --- PDF REPORT GENERATOR USING JSPDF ---
  const handleDownloadPDFReport = () => {
    const doc = new jsPDF({ unit: "mm", format: "a4" });
    const currSym = currency === "INR" ? "INR " : "$";
    const currMult = currency === "INR" ? usdToInrRate : 1;

    // Header & Title
    doc.setFillColor(0, 86, 166);
    doc.rect(0, 0, 210, 28, "F");

    doc.setTextColor(255, 255, 255);
    doc.setFontSize(16);
    doc.setFont("helvetica", "bold");
    doc.text("NORTHERN HEATEX CORPORATION", 14, 12);
    doc.setFontSize(10);
    doc.setFont("helvetica", "normal");
    doc.text("FABRICATION ESTIMATE & TECHNICAL ANALYSIS REPORT", 14, 20);
    doc.text("ASME VIII Div 1 & TEMA Standard", 145, 20);

    // Metadata Box
    doc.setFillColor(245, 247, 250);
    doc.rect(14, 34, 182, 32, "F");
    doc.setDrawColor(220, 225, 230);
    doc.rect(14, 34, 182, 32, "S");

    doc.setTextColor(30, 41, 59);
    doc.setFontSize(9);
    doc.setFont("helvetica", "bold");
    doc.text(`Project Name:`, 18, 42);
    doc.setFont("helvetica", "normal");
    doc.text(`${projectName}`, 45, 42);

    doc.setFont("helvetica", "bold");
    doc.text(`Client Name:`, 18, 49);
    doc.setFont("helvetica", "normal");
    doc.text(`${clientName}`, 45, 49);

    doc.setFont("helvetica", "bold");
    doc.text(`Equipment Type:`, 18, 56);
    doc.setFont("helvetica", "normal");
    doc.text(`${activeEquipment.name}`, 45, 56);

    doc.setFont("helvetica", "bold");
    doc.text(`Date:`, 125, 42);
    doc.setFont("helvetica", "normal");
    doc.text(`${new Date().toLocaleDateString()}`, 145, 42);

    doc.setFont("helvetica", "bold");
    doc.text(`Primary Material:`, 125, 49);
    doc.setFont("helvetica", "normal");
    doc.text(`${activeMaterial.name}`, 155, 49);

    doc.setFont("helvetica", "bold");
    doc.text(`Net Finished Weight:`, 125, 56);
    doc.setFont("helvetica", "normal");
    doc.text(`${Math.round(calculations.netEquipmentWeightKg).toLocaleString()} kg`, 160, 56);

    // Section 1: Itemized Cost Summary
    doc.setFontSize(11);
    doc.setFont("helvetica", "bold");
    doc.setTextColor(0, 86, 166);
    doc.text("1. COMMERCIAL ESTIMATE SUMMARY", 14, 75);

    doc.setFillColor(0, 86, 166);
    doc.rect(14, 80, 182, 7, "F");
    doc.setTextColor(255, 255, 255);
    doc.setFontSize(8.5);
    doc.text("Cost Element / Work Package", 18, 85);
    doc.text("Quantity / Basis", 110, 85);
    doc.text(`Amount (${currency})`, 165, 85);

    let y = 92;
    const addRow = (label: string, basis: string, amount: number, isBold = false) => {
      if (isBold) {
        doc.setFont("helvetica", "bold");
        doc.setTextColor(15, 23, 42);
      } else {
        doc.setFont("helvetica", "normal");
        doc.setTextColor(51, 65, 85);
      }
      doc.text(label, 18, y);
      doc.text(basis, 110, y);
      doc.text(`${currSym}${(amount * currMult).toLocaleString("en-US", { maximumFractionDigits: 0 })}`, 165, y);
      y += 6.5;
    };

    addRow("Raw Alloy Plate & Tube Material", `${Math.round(calculations.grossMaterialWeightKg).toLocaleString()} kg @ ${currSym}${(activeMaterial.baseCostPerKgUSD * currMult).toFixed(2)}/kg`, calculations.baseMatCostUSD);
    addRow("Welding Consumables & Inert Gas", `${totalWeldSeamM}m Seams (${weldProcess})`, calculations.weldingConsumablesCostUSD);
    addRow("Shop Labor & CNC Machining", `${Math.round(calculations.totalLaborHours)} Hours @ ${currSym}${(shopLaborRateUSD * currMult).toFixed(0)}/hr`, calculations.directLaborCostUSD);
    addRow("NDE Testing, RT & Hydro Test", "100% RT / UT Clearance", calculations.testingInspectionCostUSD);
    addRow("Surface Prep & Painting", `${calculations.surfaceAreaM2.toFixed(1)} m² Blasting & Paint`, calculations.surfaceCoatingCostUSD);
    
    doc.setDrawColor(200, 200, 200);
    doc.line(14, y - 2, 196, y - 2);

    addRow("TOTAL DIRECT MANUFACTURING COST", "Base Cost Subtotal", calculations.totalDirectCostUSD, true);
    addRow(`Shop Overhead (${overheadMarginPct}%)`, "Facility Allocation", calculations.overheadCostUSD);
    addRow(`Manufacturing Subtotal`, "Net Cost", calculations.subtotalShopCostUSD, true);
    addRow(`Profit Margin (${profitMarginPct}%)`, "Commercial Margin", calculations.profitCostUSD);
    addRow(`Contingency & Taxes (${contingencyPct}%)`, "Risk Allocation", calculations.contingencyCostUSD);

    y += 2;
    doc.setFillColor(240, 253, 244);
    doc.rect(14, y, 182, 10, "F");
    doc.setDrawColor(34, 197, 94);
    doc.rect(14, y, 182, 10, "S");

    doc.setFont("helvetica", "bold");
    doc.setFontSize(10);
    doc.setTextColor(22, 101, 52);
    doc.text("FINAL TENDER QUOTE PRICE:", 18, y + 6.5);
    doc.text(`${currSym}${(calculations.finalTenderQuoteUSD * currMult).toLocaleString("en-US", { maximumFractionDigits: 0 })}`, 150, y + 6.5);

    // Section 2: Technical Specifications & BOQ
    y += 18;
    doc.setFontSize(11);
    doc.setFont("helvetica", "bold");
    doc.setTextColor(0, 86, 166);
    doc.text("2. EQUIPMENT ENGINEERING SPECIFICATIONS", 14, y);

    y += 5;
    doc.setFillColor(248, 250, 252);
    doc.rect(14, y, 182, 38, "F");
    doc.setDrawColor(226, 232, 240);
    doc.rect(14, y, 182, 38, "S");

    y += 7;
    doc.setFontSize(8.5);
    doc.setTextColor(51, 65, 85);
    doc.setFont("helvetica", "bold");
    doc.text("Shell / Body Dimensions:", 18, y);
    doc.setFont("helvetica", "normal");
    doc.text(`OD ${shellDiameterMm} mm  ×  Length ${shellLengthMm} mm  ×  Thickness ${shellThicknessMm} mm`, 60, y);

    y += 6;
    doc.setFont("helvetica", "bold");
    doc.text("Internal Tube Bundle:", 18, y);
    doc.setFont("helvetica", "normal");
    doc.text(`${tubeCount} Tubes  ×  OD ${tubeOdMm} mm  ×  Wall ${tubeWallMm} mm  ×  Length ${tubeLengthM} m`, 60, y);

    y += 6;
    doc.setFont("helvetica", "bold");
    doc.text("Tubesheets & Flanges:", 18, y);
    doc.setFont("helvetica", "normal");
    doc.text(`Thickness ${tubesheetThicknessMm} mm  ×  Material ${activeMaterial.code}`, 60, y);

    y += 6;
    doc.setFont("helvetica", "bold");
    doc.text("Welding Procedure (WPS):", 18, y);
    doc.setFont("helvetica", "normal");
    doc.text(`${weldProcess} Process  ×  Total ${totalWeldSeamM} Meters Seams  ×  Full Penetration`, 60, y);

    y += 6;
    doc.setFont("helvetica", "bold");
    doc.text("NDE Quality Plan:", 18, y);
    doc.setFont("helvetica", "normal");
    doc.text("100% Radiography RT, Hydrotest @ 1.5x MAWP, Dye Penetrant PT on Nozzles", 60, y);

    // Sign-off block
    y += 22;
    doc.setDrawColor(180, 180, 180);
    doc.line(18, y + 15, 75, y + 15);
    doc.line(135, y + 15, 192, y + 15);

    doc.setFontSize(8);
    doc.setTextColor(100, 116, 139);
    doc.text("Prepared By: Design Estimator", 18, y + 19);
    doc.text("Approved By: Chief Thermal Engineer", 135, y + 19);

    doc.setFontSize(7);
    doc.text("Northern HeatEx Corporation • Haridwar Works • GST & ISO Certified Manufacturing Facility", 14, 285);

    // Save PDF file
    doc.save(`Fabrication_Estimate_${projectName.replace(/[^a-zA-Z0-9]/g, "_")}.pdf`);
  };

  return (
    <div className={`space-y-4 font-['Plus_Jakarta_Sans',sans-serif] ${embeddedInModal ? "" : "p-4 sm:p-6 bg-slate-50 border border-slate-200 rounded-2xl"}`}>
      {/* HEADER BAR & SUB TABS */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 pb-3 border-b border-slate-200">
        <div>
          <div className="flex items-center gap-2">
            <span className="px-2 py-0.5 bg-amber-100 text-amber-800 font-mono text-[10px] font-black rounded uppercase">
              Pro Grade
            </span>
            <h3 className="text-base font-black text-slate-900 flex items-center gap-2">
              <Calculator className="w-5 h-5 text-[#0056A6]" /> High-End Fabrication Cost & Project Estimator
            </h3>
          </div>
          <p className="text-xs text-slate-500 mt-0.5">
            ASME & TEMA commercial quote analyzer, material weight BOQ, labor breakdown & PDF report generator
          </p>
        </div>

        <div className="flex items-center gap-2 w-full sm:w-auto justify-between sm:justify-end">
          {/* Currency Toggle */}
          <div className="flex items-center gap-1 bg-slate-200 p-0.5 rounded-lg text-xs font-mono font-bold">
            <button
              onClick={() => setCurrency("INR")}
              className={`px-2 py-1 rounded transition cursor-pointer ${currency === "INR" ? "bg-[#0056A6] text-white shadow-sm" : "text-slate-600 hover:text-slate-900"}`}
            >
              ₹ INR
            </button>
            <button
              onClick={() => setCurrency("USD")}
              className={`px-2 py-1 rounded transition cursor-pointer ${currency === "USD" ? "bg-[#0056A6] text-white shadow-sm" : "text-slate-600 hover:text-slate-900"}`}
            >
              $ USD
            </button>
            <button
              onClick={() => setCurrency("EUR")}
              className={`px-2 py-1 rounded transition cursor-pointer ${currency === "EUR" ? "bg-[#0056A6] text-white shadow-sm" : "text-slate-600 hover:text-slate-900"}`}
            >
              € EUR
            </button>
            <button
              onClick={() => setCurrency("GBP")}
              className={`px-2 py-1 rounded transition cursor-pointer ${currency === "GBP" ? "bg-[#0056A6] text-white shadow-sm" : "text-slate-600 hover:text-slate-900"}`}
            >
              £ GBP
            </button>
          </div>

          {/* Download PDF Button */}
          <button
            onClick={handleDownloadPDFReport}
            className="flex items-center gap-1.5 px-3 py-1.5 bg-[#0056A6] hover:bg-blue-700 text-white rounded-lg text-xs font-bold transition shadow-sm cursor-pointer"
            title="Download PDF Engineering & Commercial Report"
          >
            <Download className="w-3.5 h-3.5" />
            Download PDF Report
          </button>
        </div>
      </div>

      {/* SUB TAB BUTTONS */}
      <div className="flex items-center gap-1 bg-slate-200/80 p-1 rounded-xl text-xs font-mono font-bold">
        <button
          onClick={() => setActiveSubTab("calculator")}
          className={`flex-1 sm:flex-none px-3 py-1.5 rounded-lg transition flex items-center justify-center gap-1.5 cursor-pointer ${
            activeSubTab === "calculator" ? "bg-[#0056A6] text-white shadow-sm" : "text-slate-600 hover:text-slate-900"
          }`}
        >
          <Sliders className="w-3.5 h-3.5" />
          Estimate Analysis
        </button>
        <button
          onClick={() => setActiveSubTab("charts")}
          className={`flex-1 sm:flex-none px-3 py-1.5 rounded-lg transition flex items-center justify-center gap-1.5 cursor-pointer ${
            activeSubTab === "charts" ? "bg-[#0056A6] text-white shadow-sm" : "text-slate-600 hover:text-slate-900"
          }`}
        >
          <PieChartIcon className="w-3.5 h-3.5" />
          Graphical Analytics
        </button>
        <button
          onClick={() => setActiveSubTab("report")}
          className={`flex-1 sm:flex-none px-3 py-1.5 rounded-lg transition flex items-center justify-center gap-1.5 cursor-pointer ${
            activeSubTab === "report" ? "bg-[#0056A6] text-white shadow-sm" : "text-slate-600 hover:text-slate-900"
          }`}
        >
          <FileText className="w-3.5 h-3.5" />
          Project Report & BOQ
        </button>
      </div>

      {/* --- TAB 1: ESTIMATE ANALYSIS INPUTS & SUMMARY --- */}
      {activeSubTab === "calculator" && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
          {/* LEFT: INPUT CONTROL PANEL (7 COLS) */}
          <div className="lg:col-span-7 space-y-4">
            {/* 1. Project & Equipment Info */}
            <div className="p-3.5 bg-white border border-slate-200 rounded-xl space-y-3 shadow-xs">
              <span className="text-[11px] font-extrabold text-slate-500 uppercase tracking-wider block font-mono">
                1. Project & Equipment Classification
              </span>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                <div>
                  <label className="block text-slate-600 font-semibold mb-1">Equipment Category</label>
                  <select
                    value={equipmentTypeId}
                    onChange={(e) => setEquipmentTypeId(e.target.value)}
                    className="w-full p-2 bg-slate-50 border border-slate-300 rounded-lg font-bold text-slate-900 focus:outline-none focus:ring-2 focus:ring-[#0056A6]"
                  >
                    {EQUIPMENT_TYPES.map((eq) => (
                      <option key={eq.id} value={eq.id}>
                        {eq.name}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-slate-600 font-semibold mb-1">Primary Material (MOC)</label>
                  <select
                    value={materialId}
                    onChange={(e) => setMaterialId(e.target.value)}
                    className="w-full p-2 bg-slate-50 border border-slate-300 rounded-lg font-bold text-slate-900 focus:outline-none focus:ring-2 focus:ring-[#0056A6]"
                  >
                    {FAB_MATERIALS.map((m) => (
                      <option key={m.id} value={m.id}>
                        {m.name} ({fmtCurr(m.baseCostPerKgUSD)}/kg)
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-slate-600 font-semibold mb-1">Project Name / Reference</label>
                  <input
                    type="text"
                    value={projectName}
                    onChange={(e) => setProjectName(e.target.value)}
                    className="w-full p-2 bg-slate-50 border border-slate-300 rounded-lg font-bold text-slate-900 focus:outline-none focus:ring-2 focus:ring-[#0056A6]"
                  />
                </div>

                <div>
                  <label className="block text-slate-600 font-semibold mb-1">Client / Target Customer</label>
                  <input
                    type="text"
                    value={clientName}
                    onChange={(e) => setClientName(e.target.value)}
                    className="w-full p-2 bg-slate-50 border border-slate-300 rounded-lg font-bold text-slate-900 focus:outline-none focus:ring-2 focus:ring-[#0056A6]"
                  />
                </div>
              </div>
            </div>

            {/* 2. Vessel Geometry & Tube Bundle */}
            <div className="p-3.5 bg-white border border-slate-200 rounded-xl space-y-3 shadow-xs">
              <span className="text-[11px] font-extrabold text-slate-500 uppercase tracking-wider block font-mono">
                2. Shell & Internal Dimensions
              </span>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 text-xs">
                <div>
                  <label className="block text-slate-600 font-semibold mb-1">Shell OD (mm)</label>
                  <input
                    type="number"
                    value={shellDiameterMm}
                    onChange={(e) => setShellDiameterMm(Number(e.target.value))}
                    className="w-full p-2 bg-slate-50 border border-slate-300 rounded-lg font-mono font-bold text-slate-900"
                  />
                </div>
                <div>
                  <label className="block text-slate-600 font-semibold mb-1">Thickness (mm)</label>
                  <input
                    type="number"
                    value={shellThicknessMm}
                    onChange={(e) => setShellThicknessMm(Number(e.target.value))}
                    className="w-full p-2 bg-slate-50 border border-slate-300 rounded-lg font-mono font-bold text-slate-900"
                  />
                </div>
                <div>
                  <label className="block text-slate-600 font-semibold mb-1">Length (mm)</label>
                  <input
                    type="number"
                    value={shellLengthMm}
                    onChange={(e) => setShellLengthMm(Number(e.target.value))}
                    className="w-full p-2 bg-slate-50 border border-slate-300 rounded-lg font-mono font-bold text-slate-900"
                  />
                </div>
                <div>
                  <label className="block text-slate-600 font-semibold mb-1">Quantity (Units)</label>
                  <input
                    type="number"
                    min={1}
                    value={quantityUnits}
                    onChange={(e) => setQuantityUnits(Number(e.target.value))}
                    className="w-full p-2 bg-slate-50 border border-slate-300 rounded-lg font-mono font-bold text-slate-900"
                  />
                </div>
              </div>

              {equipmentTypeId === "shell_tube" || equipmentTypeId === "air_cooler" ? (
                <div className="pt-2 border-t border-slate-100 grid grid-cols-2 sm:grid-cols-4 gap-2.5 text-xs">
                  <div>
                    <label className="block text-slate-600 font-semibold mb-1">Tube Count</label>
                    <input
                      type="number"
                      value={tubeCount}
                      onChange={(e) => setTubeCount(Number(e.target.value))}
                      className="w-full p-2 bg-slate-50 border border-slate-300 rounded-lg font-mono font-bold text-slate-900"
                    />
                  </div>
                  <div>
                    <label className="block text-slate-600 font-semibold mb-1">Tube OD (mm)</label>
                    <input
                      type="number"
                      step={0.1}
                      value={tubeOdMm}
                      onChange={(e) => setTubeOdMm(Number(e.target.value))}
                      className="w-full p-2 bg-slate-50 border border-slate-300 rounded-lg font-mono font-bold text-slate-900"
                    />
                  </div>
                  <div>
                    <label className="block text-slate-600 font-semibold mb-1">Tubesheet (mm)</label>
                    <input
                      type="number"
                      value={tubesheetThicknessMm}
                      onChange={(e) => setTubesheetThicknessMm(Number(e.target.value))}
                      className="w-full p-2 bg-slate-50 border border-slate-300 rounded-lg font-mono font-bold text-slate-900"
                    />
                  </div>
                  <div>
                    <label className="block text-slate-600 font-semibold mb-1">Weld Seams (m)</label>
                    <input
                      type="number"
                      value={totalWeldSeamM}
                      onChange={(e) => setTotalWeldSeamM(Number(e.target.value))}
                      className="w-full p-2 bg-slate-50 border border-slate-300 rounded-lg font-mono font-bold text-slate-900"
                    />
                  </div>
                </div>
              ) : null}
            </div>

            {/* 3. Labor & Shop Commercial Margins */}
            <div className="p-3.5 bg-white border border-slate-200 rounded-xl space-y-3 shadow-xs">
              <span className="text-[11px] font-extrabold text-slate-500 uppercase tracking-wider block font-mono">
                3. Labor Rates & Commercial Margins
              </span>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 text-xs">
                <div>
                  <label className="block text-slate-600 font-semibold mb-1">
                    Labor Rate ({currency === "INR" ? "₹" : currency === "EUR" ? "€" : currency === "GBP" ? "£" : "$"}/hr)
                  </label>
                  <input
                    type="number"
                    value={shopLaborRateUSD}
                    onChange={(e) => setShopLaborRateUSD(Number(e.target.value))}
                    className="w-full p-2 bg-slate-50 border border-slate-300 rounded-lg font-mono font-bold text-slate-900"
                  />
                </div>
                <div>
                  <label className="block text-slate-600 font-semibold mb-1">Overhead (%)</label>
                  <input
                    type="number"
                    value={overheadMarginPct}
                    onChange={(e) => setOverheadMarginPct(Number(e.target.value))}
                    className="w-full p-2 bg-slate-50 border border-slate-300 rounded-lg font-mono font-bold text-slate-900"
                  />
                </div>
                <div>
                  <label className="block text-slate-600 font-semibold mb-1">Profit Margin (%)</label>
                  <input
                    type="number"
                    value={profitMarginPct}
                    onChange={(e) => setProfitMarginPct(Number(e.target.value))}
                    className="w-full p-2 bg-slate-50 border border-slate-300 rounded-lg font-mono font-bold text-slate-900"
                  />
                </div>
                <div>
                  <label className="block text-slate-600 font-semibold mb-1">Contingency (%)</label>
                  <input
                    type="number"
                    value={contingencyPct}
                    onChange={(e) => setContingencyPct(Number(e.target.value))}
                    className="w-full p-2 bg-slate-50 border border-slate-300 rounded-lg font-mono font-bold text-slate-900"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* RIGHT: REAL-TIME COMMERCIAL SUMMARY CARD (5 COLS) */}
          <div className="lg:col-span-5 space-y-4">
            <div className="bg-slate-900 text-white p-5 rounded-2xl shadow-xl border border-slate-800 space-y-4">
              <div className="flex items-center justify-between pb-3 border-b border-slate-800">
                <div>
                  <span className="text-[10px] font-mono text-cyan-400 font-bold uppercase tracking-wider block">
                    Commercial Quote Summary
                  </span>
                  <h4 className="text-lg font-black text-white">Tender Quote Analysis</h4>
                </div>
                <div className="p-2 bg-slate-800 rounded-xl text-cyan-400">
                  <DollarSign className="w-6 h-6" />
                </div>
              </div>

              {/* Big Quote Price */}
              <div className="p-4 bg-slate-950/80 rounded-xl border border-slate-800/80 text-center space-y-1">
                <span className="text-xs text-slate-400 font-mono">Estimated Tender Quote Price</span>
                <div className="text-2xl sm:text-3xl font-black text-emerald-400 font-mono tracking-tight">
                  {fmtCurr(calculations.finalTenderQuoteUSD)}
                </div>
                <div className="text-[11px] text-slate-400 flex items-center justify-center gap-2 pt-1 font-mono">
                  <span>Weight: {Math.round(calculations.netEquipmentWeightKg).toLocaleString()} kg</span>
                  <span>•</span>
                  <span>Rate: {fmtCurr(calculations.costPerKgUSD)}/kg</span>
                </div>
              </div>

              {/* Itemized Breakdowns */}
              <div className="space-y-2 text-xs font-mono pt-1">
                <div className="flex justify-between items-center py-1 border-b border-slate-800 text-slate-300">
                  <span className="flex items-center gap-1.5">
                    <span className="w-2 h-2 bg-[#0056A6] rounded-full" /> Raw Material Cost
                  </span>
                  <span className="font-bold text-white">{fmtCurr(calculations.baseMatCostUSD)}</span>
                </div>

                <div className="flex justify-between items-center py-1 border-b border-slate-800 text-slate-300">
                  <span className="flex items-center gap-1.5">
                    <span className="w-2 h-2 bg-[#00A6D6] rounded-full" /> Labor & Machining
                  </span>
                  <span className="font-bold text-white">{fmtCurr(calculations.directLaborCostUSD)}</span>
                </div>

                <div className="flex justify-between items-center py-1 border-b border-slate-800 text-slate-300">
                  <span className="flex items-center gap-1.5">
                    <span className="w-2 h-2 bg-[#F7931E] rounded-full" /> Welding Consumables
                  </span>
                  <span className="font-bold text-white">{fmtCurr(calculations.weldingConsumablesCostUSD)}</span>
                </div>

                <div className="flex justify-between items-center py-1 border-b border-slate-800 text-slate-300">
                  <span className="flex items-center gap-1.5">
                    <span className="w-2 h-2 bg-[#10B981] rounded-full" /> NDE & Hydro Testing
                  </span>
                  <span className="font-bold text-white">{fmtCurr(calculations.testingInspectionCostUSD)}</span>
                </div>

                <div className="flex justify-between items-center py-1 border-b border-slate-800 text-slate-300">
                  <span className="flex items-center gap-1.5">
                    <span className="w-2 h-2 bg-[#8B5CF6] rounded-full" /> Overhead & Margins
                  </span>
                  <span className="font-bold text-white">
                    {fmtCurr(calculations.overheadCostUSD + calculations.profitCostUSD + calculations.contingencyCostUSD)}
                  </span>
                </div>
              </div>

              {/* Action Button */}
              <button
                onClick={handleDownloadPDFReport}
                className="w-full py-3 bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-400 hover:to-teal-500 text-white font-bold rounded-xl text-xs transition flex items-center justify-center gap-2 shadow-lg cursor-pointer"
              >
                <Download className="w-4 h-4" />
                Download Complete PDF Report
              </button>
            </div>
          </div>
        </div>
      )}

      {/* --- TAB 2: GRAPHICAL ANALYTICS --- */}
      {activeSubTab === "charts" && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {/* Donut Chart: Cost Allocation */}
          <div className="p-4 bg-white border border-slate-200 rounded-2xl space-y-3">
            <h4 className="text-xs font-bold text-slate-900 flex items-center gap-2 font-mono uppercase">
              <PieChartIcon className="w-4 h-4 text-[#0056A6]" /> Cost Distribution Breakdown
            </h4>
            <p className="text-[11px] text-slate-500">
              Proportional allocation of direct materials, labor, consumables, and commercial profit
            </p>

            <div className="h-64 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={costDistributionData}
                    cx="50%"
                    cy="50%"
                    innerRadius={55}
                    outerRadius={85}
                    paddingAngle={3}
                    dataKey="value"
                  >
                    {costDistributionData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip formatter={(val: number) => fmtCurr(val)} />
                  <Legend wrapperStyle={{ fontSize: "11px" }} />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Bar Chart: Labor Hours */}
          <div className="p-4 bg-white border border-slate-200 rounded-2xl space-y-3">
            <h4 className="text-xs font-bold text-slate-900 flex items-center gap-2 font-mono uppercase">
              <BarChart3 className="w-4 h-4 text-[#00A6D6]" /> Fabrication Labor Hours Breakdown
            </h4>
            <p className="text-[11px] text-slate-500">
              Shop labor workload distribution across fit-up, welding, CNC drilling, and inspection
            </p>

            <div className="h-64 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={laborBreakdownData}>
                  <XAxis dataKey="activity" tick={{ fontSize: 10 }} />
                  <YAxis tick={{ fontSize: 10 }} />
                  <Tooltip formatter={(val: number) => [`${val} Hours`, "Workload"]} />
                  <Bar dataKey="hours" fill="#0056A6" radius={[6, 6, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Material Sensitivity Comparison */}
          <div className="md:col-span-2 p-4 bg-white border border-slate-200 rounded-2xl space-y-3">
            <h4 className="text-xs font-bold text-slate-900 flex items-center gap-2 font-mono uppercase">
              <TrendingUp className="w-4 h-4 text-emerald-600" /> Material Cost Sensitivity Matrix
            </h4>
            <p className="text-[11px] text-slate-500">
              Comparative tender quote impact across CS SA-516, SS 304L, SS 316L, Duplex 2205, & Super Duplex
            </p>

            <div className="h-56 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={materialComparisonData}>
                  <XAxis dataKey="material" tick={{ fontSize: 11 }} />
                  <YAxis tick={{ fontSize: 10 }} />
                  <Tooltip formatter={(val: number) => [fmtCurr(val), "Estimated Quote"]} />
                  <Bar dataKey="tenderQuoteUSD" fill="#10B981" radius={[6, 6, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
      )}

      {/* --- TAB 3: PROJECT REPORT & BOQ --- */}
      {activeSubTab === "report" && (
        <div className="space-y-4">
          <div className="p-4 bg-white border border-slate-200 rounded-2xl space-y-3">
            <div className="flex items-center justify-between pb-2 border-b border-slate-200">
              <div>
                <h4 className="text-sm font-black text-slate-900 font-mono">PROJECT BILL OF QUANTITIES (BOQ)</h4>
                <p className="text-xs text-slate-500">{projectName} • {clientName}</p>
              </div>

              <button
                onClick={handleDownloadPDFReport}
                className="px-3 py-1.5 bg-[#0056A6] text-white text-xs font-bold rounded-lg hover:bg-blue-700 transition flex items-center gap-1.5 cursor-pointer"
              >
                <Download className="w-3.5 h-3.5" />
                Export PDF
              </button>
            </div>

            {/* BOQ Table */}
            <div className="overflow-x-auto text-xs font-mono">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-slate-100 border-b border-slate-200 text-slate-700 font-bold">
                    <th className="p-2.5">Item Description</th>
                    <th className="p-2.5">Material Specification</th>
                    <th className="p-2.5">Quantity / Mass</th>
                    <th className="p-2.5">Rate</th>
                    <th className="p-2.5 text-right">Subtotal</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 text-slate-800">
                  <tr>
                    <td className="p-2.5 font-sans font-semibold">Shell Plate & Flange Stock</td>
                    <td className="p-2.5">{activeMaterial.name}</td>
                    <td className="p-2.5">{Math.round(calculations.grossMaterialWeightKg).toLocaleString()} kg</td>
                    <td className="p-2.5">{fmtCurr(activeMaterial.baseCostPerKgUSD)}/kg</td>
                    <td className="p-2.5 text-right font-bold">{fmtCurr(calculations.baseMatCostUSD)}</td>
                  </tr>
                  <tr>
                    <td className="p-2.5 font-sans font-semibold">Internal Tube Bundle (if app)</td>
                    <td className="p-2.5">{activeMaterial.code} Seamless</td>
                    <td className="p-2.5">{tubeCount} Tubes ({tubeLengthM}m)</td>
                    <td className="p-2.5">Calculated</td>
                    <td className="p-2.5 text-right font-bold">{fmtCurr(calculations.tubesWeightKg * activeMaterial.baseCostPerKgUSD * 1.15)}</td>
                  </tr>
                  <tr>
                    <td className="p-2.5 font-sans font-semibold">WPS Consumables & Inert Gas</td>
                    <td className="p-2.5">{weldProcess} Filler Wire & Argon</td>
                    <td className="p-2.5">{totalWeldSeamM} Meters Seam</td>
                    <td className="p-2.5">Standard WPS</td>
                    <td className="p-2.5 text-right font-bold">{fmtCurr(calculations.weldingConsumablesCostUSD)}</td>
                  </tr>
                  <tr>
                    <td className="p-2.5 font-sans font-semibold">Shop Labor & CNC Drilling</td>
                    <td className="p-2.5">ASME Coded Welders & Machinists</td>
                    <td className="p-2.5">{Math.round(calculations.totalLaborHours)} Hours</td>
                    <td className="p-2.5">{fmtCurr(shopLaborRateUSD)}/hr</td>
                    <td className="p-2.5 text-right font-bold">{fmtCurr(calculations.directLaborCostUSD)}</td>
                  </tr>
                  <tr>
                    <td className="p-2.5 font-sans font-semibold">NDE Radiography & Hydrotest</td>
                    <td className="p-2.5">100% RT / UT Clearance</td>
                    <td className="p-2.5">Full Scope</td>
                    <td className="p-2.5">Inspection Rate</td>
                    <td className="p-2.5 text-right font-bold">{fmtCurr(calculations.testingInspectionCostUSD)}</td>
                  </tr>
                </tbody>
              </table>
            </div>

            {/* Execution Schedule & QA Hold Points */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-3 border-t border-slate-200">
              <div className="p-3 bg-slate-50 rounded-xl space-y-1">
                <span className="text-[10px] font-bold text-slate-500 uppercase font-mono block">Manufacturing Lead Time</span>
                <p className="text-xs font-bold text-slate-900">Est. 4 to 6 Weeks (Rapid Outage Dispatch Available)</p>
              </div>

              <div className="p-3 bg-slate-50 rounded-xl space-y-1">
                <span className="text-[10px] font-bold text-slate-500 uppercase font-mono block">QA/QC Quality Inspection Plan</span>
                <p className="text-xs font-bold text-slate-900">Third Party Witnessed (TPI) Hydrotest @ 1.5x MAWP</p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
