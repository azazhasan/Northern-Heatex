import React, { useState, useMemo } from "react";
import {
  Calculator,
  Search,
  FileText,
  DollarSign,
  TrendingUp,
  Percent,
  RefreshCw,
  Copy,
  Check,
  Building2,
  ShieldCheck,
  Download,
  Printer,
  Sparkles,
  HelpCircle,
  ArrowRightLeft,
  Flame,
  Zap,
  Tag,
  Info,
  Scale,
  CheckCircle2,
  Sliders,
} from "lucide-react";
import { CompanyLogo } from "../common/CompanyLogo";
import jsPDF from "jspdf";
import {
  UNIT_CATEGORIES,
  convertUnitValue,
  formatEngineeringNumber,
  UnitCategoryKey,
} from "../common/FloatingUnitConverter";
import { MaterialWeightCalculator } from "../engineering/MaterialWeightCalculator";
import { OfficialLetterheadStudio } from "../admin/OfficialLetterheadStudio";

// HSN Code Interface
export interface HSNRecord {
  hsnCode: string;
  category: string;
  productName: string;
  description: string;
  gstRate: number; // 0, 5, 12, 18, 28
  taxType: string;
  lastUpdated: string;
}

// Initial updateable HSN Database
export const INITIAL_HSN_DATABASE: HSNRecord[] = [
  {
    hsnCode: "8419 50 00",
    category: "Thermal Heat Exchangers",
    productName: "Shell & Tube Heat Exchangers",
    description: "Industrial shell & tube, double pipe, and coiled heat exchangers for thermal transfer",
    gstRate: 18,
    taxType: "CGST (9%) + SGST (9%) or IGST (18%)",
    lastUpdated: "2026-04-01",
  },
  {
    hsnCode: "8419 89 10",
    category: "Thermal Equipment",
    productName: "Industrial Condensers & Evaporators",
    description: "Steam surface condensers, vacuum evaporators, and reboilers for chemical plants",
    gstRate: 18,
    taxType: "CGST (9%) + SGST (9%) or IGST (18%)",
    lastUpdated: "2026-04-01",
  },
  {
    hsnCode: "8419 90 90",
    category: "Machinery Parts",
    productName: "Heat Exchanger Components (Tubesheets, Baffles, Channels)",
    description: "Precision CNC drilled tubesheets, baffles, floating heads, channel covers & tie rods",
    gstRate: 18,
    taxType: "CGST (9%) + SGST (9%) or IGST (18%)",
    lastUpdated: "2026-04-01",
  },
  {
    hsnCode: "8419 90 10",
    category: "Heat Transfer Tubes",
    productName: "High Efficiency Finned Tubes & Wire-Wound Tubing",
    description: "Integral finned tubes, spirally wound fins, and wire-wound heat transfer enhancement tubes",
    gstRate: 18,
    taxType: "CGST (9%) + SGST (9%) or IGST (18%)",
    lastUpdated: "2026-04-01",
  },
  {
    hsnCode: "7311 00 10",
    category: "Pressure Vessels",
    productName: "Unfired Industrial Pressure Vessels & Storage Tanks",
    description: "High-pressure process vessels, separators, air receivers fabricated per ASME Sec VIII Div 1",
    gstRate: 18,
    taxType: "CGST (9%) + SGST (9%) or IGST (18%)",
    lastUpdated: "2026-04-01",
  },
  {
    hsnCode: "7304 49 00",
    category: "Seamless Piping",
    productName: "Seamless Stainless Steel & Alloy Tubes",
    description: "SA-213 316L, 304L, Duplex 2205 heat exchanger seamless and welded U-bent tubes",
    gstRate: 18,
    taxType: "CGST (9%) + SGST (9%) or IGST (18%)",
    lastUpdated: "2026-04-01",
  },
  {
    hsnCode: "7307 29 00",
    category: "Pipe Fittings",
    productName: "Forged Steel Flanges & High Pressure Fittings",
    description: "SA-105, SA-182 F316 weld neck flanges, slip-on flanges, nozzles, and body couplings",
    gstRate: 18,
    taxType: "CGST (9%) + SGST (9%) or IGST (18%)",
    lastUpdated: "2026-04-01",
  },
  {
    hsnCode: "8484 10 90",
    category: "Gaskets & Seals",
    productName: "Spiral Wound & Metallic Gaskets for Heat Exchangers",
    description: "SS316L/Graphite spiral wound gaskets, corrugated metal gaskets, and elastomeric seals",
    gstRate: 18,
    taxType: "CGST (9%) + SGST (9%) or IGST (18%)",
    lastUpdated: "2026-04-01",
  },
  {
    hsnCode: "8483 10 90",
    category: "Hydro Components",
    productName: "Hydro Turbine Cooler Parts & Thrust Bearing Coolers",
    description: "Oil coolers, stator water coolers, generator air coolers for hydroelectric power stations",
    gstRate: 18,
    taxType: "CGST (9%) + SGST (9%) or IGST (18%)",
    lastUpdated: "2026-04-01",
  },
  {
    hsnCode: "9988 19",
    category: "Job Work / Fabrication",
    productName: "CNC Machining & Custom Job Work Fabrication",
    description: "Job work services for heavy equipment fabrication, drilling, turning, and welding",
    gstRate: 18,
    taxType: "CGST (9%) + SGST (9%) or IGST (18%)",
    lastUpdated: "2026-04-01",
  },
  {
    hsnCode: "9987 19",
    category: "Field Services",
    productName: "On-Site Retubing, Hydrotesting & Overhaul Services",
    description: "Emergency bundle extraction, tube expansion, hydrotesting, and field retubing services",
    gstRate: 18,
    taxType: "CGST (9%) + SGST (9%) or IGST (18%)",
    lastUpdated: "2026-04-01",
  },
];

export const GSTBusinessToolsHub: React.FC = () => {
  const [activeSubTab, setActiveSubTab] = useState<
    "gst-calc" | "hsn-finder" | "engineering-calc" | "unit-converter" | "currency" | "profit-calc" | "invoice-gen" | "weight-calc" | "letterhead-studio"
  >("gst-calc");

  // --- MODULE 1: GST CALCULATOR STATE ---
  const [gstAmountInput, setGstAmountInput] = useState<number>(100000);
  const [gstRate, setGstRate] = useState<number>(18);
  const [isInclusive, setIsInclusive] = useState<boolean>(false);
  const [isInterState, setIsInterState] = useState<boolean>(false); // Intra (CGST+SGST) vs Inter (IGST)
  const [isReverseCharge, setIsReverseCharge] = useState<boolean>(false);
  const [copiedState, setCopiedState] = useState<boolean>(false);

  // GST Calculations
  const gstCalcResults = useMemo(() => {
    let netAmount = 0;
    let taxAmount = 0;
    let grandTotal = 0;

    if (isInclusive) {
      netAmount = (gstAmountInput * 100) / (100 + gstRate);
      taxAmount = gstAmountInput - netAmount;
      grandTotal = gstAmountInput;
    } else {
      netAmount = gstAmountInput;
      taxAmount = (gstAmountInput * gstRate) / 100;
      grandTotal = gstAmountInput + taxAmount;
    }

    const roundOffDiff = Math.round(grandTotal) - grandTotal;
    const roundedGrandTotal = Math.round(grandTotal);

    const cgst = isInterState ? 0 : taxAmount / 2;
    const sgst = isInterState ? 0 : taxAmount / 2;
    const igst = isInterState ? taxAmount : 0;

    return {
      netAmount,
      taxAmount,
      grandTotal,
      roundedGrandTotal,
      roundOffDiff,
      cgst,
      sgst,
      igst,
    };
  }, [gstAmountInput, gstRate, isInclusive, isInterState]);

  // --- MODULE 2 & 4: HSN FINDER & SMART GST SUGGESTER STATE ---
  const [hsnSearchQuery, setHsnSearchQuery] = useState<string>("");
  const [hsnDatabase, setHsnDatabase] = useState<HSNRecord[]>(INITIAL_HSN_DATABASE);
  const [selectedHsn, setSelectedHsn] = useState<HSNRecord | null>(INITIAL_HSN_DATABASE[0]);

  const filteredHsnList = useMemo(() => {
    if (!hsnSearchQuery.trim()) return hsnDatabase;
    const q = hsnSearchQuery.toLowerCase();
    return hsnDatabase.filter(
      (item) =>
        item.productName.toLowerCase().includes(q) ||
        item.hsnCode.toLowerCase().includes(q) ||
        item.category.toLowerCase().includes(q) ||
        item.description.toLowerCase().includes(q)
    );
  }, [hsnSearchQuery, hsnDatabase]);

  // Smart GST Suggester handler
  const handleApplyHsnToGst = (item: HSNRecord) => {
    setSelectedHsn(item);
    setGstRate(item.gstRate);
    setActiveSubTab("gst-calc");
  };

  // --- MODULE 5: SCIENTIFIC ENGINEERING CALCULATOR STATE ---
  const [calcDisplay, setCalcDisplay] = useState<string>("0");
  const [calcMemory, setCalcMemory] = useState<number>(0);
  const [calcHistory, setCalcHistory] = useState<string[]>([]);

  const handleCalcButton = (val: string) => {
    if (val === "C") {
      setCalcDisplay("0");
    } else if (val === "=") {
      try {
        // Sanitize math expression
        const sanitized = calcDisplay
          .replace(/×/g, "*")
          .replace(/÷/g, "/")
          .replace(/π/g, "Math.PI")
          .replace(/e/g, "Math.E")
          .replace(/sin\(/g, "Math.sin(")
          .replace(/cos\(/g, "Math.cos(")
          .replace(/tan\(/g, "Math.tan(")
          .replace(/log\(/g, "Math.log10(")
          .replace(/ln\(/g, "Math.log(");

        // eslint-disable-next-line no-eval
        const result = Function(`"use strict"; return (${sanitized})`)();
        const formatted = String(Number(result.toFixed(6)));
        setCalcHistory((prev) => [`${calcDisplay} = ${formatted}`, ...prev.slice(0, 9)]);
        setCalcDisplay(formatted);
      } catch (err) {
        setCalcDisplay("Error");
      }
    } else if (val === "back") {
      setCalcDisplay((prev) => (prev.length > 1 ? prev.slice(0, -1) : "0"));
    } else if (["sin", "cos", "tan", "log", "ln", "sqrt"].includes(val)) {
      if (val === "sqrt") setCalcDisplay((prev) => `Math.sqrt(${prev === "0" ? "" : prev}`);
      else setCalcDisplay((prev) => `${val}(${prev === "0" ? "" : prev}`);
    } else {
      setCalcDisplay((prev) => (prev === "0" || prev === "Error" ? val : prev + val));
    }
  };

  // --- MODULE 6: UNIT CONVERTER STATE ---
  const [unitCategory, setUnitCategory] = useState<"pressure" | "temperature" | "heat" | "flow" | "density">("pressure");
  const [unitVal, setUnitVal] = useState<number>(10);
  const [unitFrom, setUnitFrom] = useState<string>("bar");

  const convertedUnits = useMemo(() => {
    if (unitCategory === "pressure") {
      // Base: bar
      let inBar = unitVal;
      if (unitFrom === "psi") inBar = unitVal / 14.5038;
      if (unitFrom === "kPa") inBar = unitVal / 100;
      if (unitFrom === "MPa") inBar = unitVal / 0.1;
      if (unitFrom === "atm") inBar = unitVal * 1.01325;

      return [
        { name: "Bar", val: inBar, unit: "bar" },
        { name: "PSI (lb/in²)", val: inBar * 14.5038, unit: "psi" },
        { name: "Kilopascal", val: inBar * 100, unit: "kPa" },
        { name: "Megapascal", val: inBar * 0.1, unit: "MPa" },
        { name: "Atmosphere", val: inBar / 1.01325, unit: "atm" },
      ];
    } else if (unitCategory === "temperature") {
      // Base: Celsius
      let inC = unitVal;
      if (unitFrom === "F") inC = ((unitVal - 32) * 5) / 9;
      if (unitFrom === "K") inC = unitVal - 273.15;

      return [
        { name: "Celsius", val: inC, unit: "°C" },
        { name: "Fahrenheit", val: (inC * 9) / 5 + 32, unit: "°F" },
        { name: "Kelvin", val: inC + 273.15, unit: "K" },
      ];
    } else if (unitCategory === "heat") {
      // Base: kW
      let inKw = unitVal;
      if (unitFrom === "MW") inKw = unitVal * 1000;
      if (unitFrom === "BTUh") inKw = unitVal / 3412.14;
      if (unitFrom === "kcalh") inKw = unitVal / 859.845;

      return [
        { name: "Kilowatt (kW)", val: inKw, unit: "kW" },
        { name: "Megawatt (MW)", val: inKw / 1000, unit: "MW" },
        { name: "BTU/hour", val: inKw * 3412.14, unit: "BTU/h" },
        { name: "kcal/hour", val: inKw * 859.845, unit: "kcal/h" },
      ];
    } else {
      // Flow Rate (m³/h base)
      let inM3h = unitVal;
      if (unitFrom === "GPM") inM3h = unitVal / 4.40287;
      if (unitFrom === "Lmin") inM3h = (unitVal * 60) / 1000;

      return [
        { name: "Cubic Meters / Hour", val: inM3h, unit: "m³/h" },
        { name: "US Gallons / Minute", val: inM3h * 4.40287, unit: "GPM" },
        { name: "Liters / Minute", val: (inM3h * 1000) / 60, unit: "L/min" },
      ];
    }
  }, [unitCategory, unitVal, unitFrom]);

  // --- MODULE 7: CURRENCY CONVERTER STATE ---
  const [currencyAmount, setCurrencyAmount] = useState<number>(100000);
  const [fromCurrency, setFromCurrency] = useState<string>("INR");

  const exchangeRatesINR: Record<string, number> = {
    INR: 1.0,
    USD: 86.5,
    EUR: 92.0,
    GBP: 110.2,
    JPY: 0.58,
    AED: 23.55,
    SAR: 23.05,
    CAD: 62.4,
    AUD: 56.8,
  };

  const currencyResults = useMemo(() => {
    const amountInINR = currencyAmount * exchangeRatesINR[fromCurrency];
    return Object.keys(exchangeRatesINR).map((curr) => ({
      code: curr,
      amount: amountInINR / exchangeRatesINR[curr],
    }));
  }, [currencyAmount, fromCurrency]);

  // --- MODULE 8: PROFIT & MARGIN CALCULATOR STATE ---
  const [costMaterial, setCostMaterial] = useState<number>(350000);
  const [costLabour, setCostLabour] = useState<number>(80000);
  const [costMachining, setCostMachining] = useState<number>(60000);
  const [costTesting, setCostTesting] = useState<number>(25000);
  const [costFreight, setCostFreight] = useState<number>(35000);
  const [overheadPercent, setOverheadPercent] = useState<number>(10);
  const [targetMarginPercent, setTargetMarginPercent] = useState<number>(20);
  const [profitGstRate, setProfitGstRate] = useState<number>(18);

  const profitCalcResults = useMemo(() => {
    const directCost = costMaterial + costLabour + costMachining + costTesting + costFreight;
    const overheadCost = (directCost * overheadPercent) / 100;
    const totalCost = directCost + overheadCost;

    // Selling Price before GST = TotalCost / (1 - Margin%)
    const marginFrac = targetMarginPercent / 100;
    const sellingPriceExclGst = marginFrac >= 1 ? totalCost : totalCost / (1 - marginFrac);
    const profitAmount = sellingPriceExclGst - totalCost;
    const gstTax = (sellingPriceExclGst * profitGstRate) / 100;
    const grandTotalVal = sellingPriceExclGst + gstTax;

    return {
      directCost,
      overheadCost,
      totalCost,
      sellingPriceExclGst,
      profitAmount,
      marginPercent: targetMarginPercent,
      markupPercent: totalCost > 0 ? (profitAmount / totalCost) * 100 : 0,
      gstTax,
      grandTotalVal,
    };
  }, [costMaterial, costLabour, costMachining, costTesting, costFreight, overheadPercent, targetMarginPercent, profitGstRate]);

  // --- MODULE 9: GST INVOICE GENERATOR STATE ---
  const [invCustomerName, setInvCustomerName] = useState<string>("Bharat Heavy Electricals Limited (BHEL)");
  const [invCustomerGstin, setInvCustomerGstin] = useState<string>("05AAACB1234F1Z2");
  const [invCustomerAddress, setInvCustomerAddress] = useState<string>("Heavy Electrical Equipment Plant (HEEP), Ranipur, Haridwar, Uttarakhand – 249403");
  const [invNumber, setInvNumber] = useState<string>("NHEC/2026-27/INV-0482");
  const [invDate, setInvDate] = useState<string>("2026-07-25");
  const [invPoNumber, setInvPoNumber] = useState<string>("PO/BHEL/2026/8841");
  const [invItemDesc, setInvItemDesc] = useState<string>("Supply of TEMA Type BEU Shell & Tube Oil Cooler with Cu-Ni Tubes & SA-516 Gr 70 Tubesheets");
  const [invHsnCode, setInvHsnCode] = useState<string>("8419 50 00");
  const [invQty, setInvQty] = useState<number>(2);
  const [invUnitPrice, setInvUnitPrice] = useState<number>(450000);
  const [invGstRate, setInvGstRate] = useState<number>(18);
  const [invIsInterstate, setInvIsInterstate] = useState<boolean>(false);

  const invSummary = useMemo(() => {
    const subtotal = invQty * invUnitPrice;
    const tax = (subtotal * invGstRate) / 100;
    const grandTotal = subtotal + tax;
    const cgst = invIsInterstate ? 0 : tax / 2;
    const sgst = invIsInterstate ? 0 : tax / 2;
    const igst = invIsInterstate ? tax : 0;
    return { subtotal, tax, grandTotal, cgst, sgst, igst };
  }, [invQty, invUnitPrice, invGstRate, invIsInterstate]);

  // Generate PDF Invoice
  const handleGenerateInvoicePdf = () => {
    const doc = new jsPDF();
    const margin = 14;

    // Header Logo & Company Info
    doc.setFillColor(0, 86, 166); // Engineering Blue
    doc.rect(0, 0, 210, 36, "F");

    doc.setTextColor(255, 255, 255);
    doc.setFont("helvetica", "bold");
    doc.setFontSize(16);
    doc.text("NORTHERN HEATEX CORPORATION", margin, 15);

    doc.setFontSize(9);
    doc.setFont("helvetica", "normal");
    doc.text("Parent Enterprise: Noor Engineering Works (Established 1983)", margin, 21);
    doc.text("Shastri Nagar, Near G.G.I. College, Jwalapur, Haridwar, Uttarakhand – 249407, India", margin, 26);
    doc.text("GSTIN: 05AAAFN1403E1ZM • Phone: +91 97603 62826 • Email: northernheatex@outlook.in", margin, 31);

    // Invoice Title
    doc.setTextColor(15, 23, 42);
    doc.setFont("helvetica", "bold");
    doc.setFontSize(14);
    doc.text("TAX INVOICE", margin, 46);

    doc.setFontSize(9);
    doc.setFont("helvetica", "normal");
    doc.text(`Invoice No: ${invNumber}`, margin, 52);
    doc.text(`Date: ${invDate}`, margin, 57);
    doc.text(`P.O. Ref: ${invPoNumber}`, margin, 62);

    // Bill To
    doc.setFillColor(248, 250, 252);
    doc.rect(margin, 68, 182, 26, "F");
    doc.setDrawColor(226, 232, 240);
    doc.rect(margin, 68, 182, 26, "S");

    doc.setFont("helvetica", "bold");
    doc.text("BILLED TO (BUYER):", margin + 4, 74);
    doc.setFont("helvetica", "normal");
    doc.text(invCustomerName, margin + 4, 80);
    doc.text(`GSTIN: ${invCustomerGstin}`, margin + 4, 85);
    doc.text(invCustomerAddress, margin + 4, 90);

    // Table Header
    let y = 102;
    doc.setFillColor(0, 86, 166);
    doc.rect(margin, y, 182, 8, "F");
    doc.setTextColor(255, 255, 255);
    doc.setFont("helvetica", "bold");
    doc.text("Description", margin + 2, y + 5.5);
    doc.text("HSN", margin + 95, y + 5.5);
    doc.text("Qty", margin + 120, y + 5.5);
    doc.text("Rate (₹)", margin + 135, y + 5.5);
    doc.text("Amount (₹)", margin + 162, y + 5.5);

    // Item Row
    y += 12;
    doc.setTextColor(15, 23, 42);
    doc.setFont("helvetica", "normal");
    doc.text(invItemDesc.substring(0, 52), margin + 2, y);
    doc.text(invHsnCode, margin + 95, y);
    doc.text(String(invQty), margin + 120, y);
    doc.text(invUnitPrice.toLocaleString("en-IN"), margin + 135, y);
    doc.text(invSummary.subtotal.toLocaleString("en-IN"), margin + 162, y);

    // Divider Line
    y += 15;
    doc.setDrawColor(200, 200, 200);
    doc.line(margin, y, margin + 182, y);

    // Tax Totals
    y += 8;
    doc.setFont("helvetica", "bold");
    doc.text("Subtotal:", 135, y);
    doc.text(`₹ ${invSummary.subtotal.toLocaleString("en-IN")}`, 162, y);

    if (!invIsInterstate) {
      y += 6;
      doc.setFont("helvetica", "normal");
      doc.text(`CGST (${invGstRate / 2}%):`, 135, y);
      doc.text(`₹ ${invSummary.cgst.toLocaleString("en-IN")}`, 162, y);

      y += 6;
      doc.text(`SGST (${invGstRate / 2}%):`, 135, y);
      doc.text(`₹ ${invSummary.sgst.toLocaleString("en-IN")}`, 162, y);
    } else {
      y += 6;
      doc.setFont("helvetica", "normal");
      doc.text(`IGST (${invGstRate}%):`, 135, y);
      doc.text(`₹ ${invSummary.igst.toLocaleString("en-IN")}`, 162, y);
    }

    y += 8;
    doc.setFillColor(241, 245, 249);
    doc.rect(130, y - 5, 66, 10, "F");
    doc.setFont("helvetica", "bold");
    doc.setTextColor(0, 86, 166);
    doc.text("Grand Total:", 132, y + 1.5);
    doc.text(`₹ ${invSummary.grandTotal.toLocaleString("en-IN")}`, 162, y + 1.5);

    // Bank Details & Footer
    y += 24;
    doc.setTextColor(15, 23, 42);
    doc.setFontSize(9);
    doc.setFont("helvetica", "bold");
    doc.text("BANK PAYMENT DETAILS:", margin, y);

    doc.setFont("helvetica", "normal");
    doc.text("Bank Name: State Bank of India (Main Branch, Haridwar)", margin, y + 5);
    doc.text("Account Name: Noor Engineering Works / Northern HeatEx Corp", margin, y + 10);
    doc.text("Account No: 38810293841 • IFSC Code: SBIN0000382", margin, y + 15);

    // Signature Block
    doc.setFont("helvetica", "bold");
    doc.text("For NORTHERN HEATEX CORPORATION", 125, y + 10);
    doc.setFont("helvetica", "normal");
    doc.text("(Authorized Signatory & Stamp)", 132, y + 22);

    doc.save(`${invNumber.replace(/\//g, "_")}_Invoice.pdf`);
  };

  return (
    <div className="space-y-8">
      {/* Top Banner & Header */}
      <div className="bg-gradient-to-r from-slate-900 via-[#003366] to-[#0056A6] text-white p-6 sm:p-8 rounded-2xl shadow-xl border border-blue-800/40 relative overflow-hidden">
        <div className="absolute right-0 top-0 bottom-0 w-1/3 bg-radial from-cyan-500/10 via-transparent to-transparent pointer-events-none" />

        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 relative z-10">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="px-3 py-1 bg-amber-500/20 text-amber-300 border border-amber-500/40 rounded-full text-xs font-mono font-bold uppercase tracking-wider flex items-center gap-1.5">
                <Flame className="w-3.5 h-3.5 text-amber-400" /> GST & Business Calculator Centre
              </span>
              <span className="px-3 py-1 bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 rounded-full text-xs font-mono">
                Noor Engineering Works • Est. 1983
              </span>
            </div>

            <h1 className="text-2xl sm:text-4xl font-extrabold tracking-tight text-white">
              Indian Industrial GST & Commercial Suite
            </h1>
            <p className="text-sm text-cyan-100/80 mt-1 max-w-3xl leading-relaxed">
              Official tax calculator, HSN search engine, profit margin planner, scientific unit converter, and instant GST invoice generator tailored for heavy engineering & manufacturing enterprises.
            </p>
          </div>

          <div className="bg-white/10 backdrop-blur-md p-3.5 rounded-xl border border-white/15 shrink-0 hidden sm:block">
            <CompanyLogo variant="full" size="md" lightBackground={false} />
          </div>
        </div>

        {/* Sub-Tabs Navigation */}
        <div className="flex items-center gap-1.5 overflow-x-auto pt-6 border-t border-white/10 mt-6 no-scrollbar">
          {[
            { id: "gst-calc", label: "GST Calculator", icon: Calculator },
            { id: "weight-calc", label: "Metal Weight & Price", icon: Scale },
            { id: "letterhead-studio", label: "Official Letterhead", icon: FileText },
            { id: "hsn-finder", label: "HSN Code Database", icon: Search },
            { id: "profit-calc", label: "Profit & Margin", icon: TrendingUp },
            { id: "invoice-gen", label: "GST Invoice Generator", icon: FileText },
            { id: "engineering-calc", label: "Scientific Calc", icon: Sliders },
            { id: "unit-converter", label: "Unit Converter", icon: ArrowRightLeft },
            { id: "currency", label: "Currency Rates", icon: DollarSign },
          ].map((tab) => {
            const Icon = tab.icon;
            const isActive = activeSubTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveSubTab(tab.id as any)}
                className={`px-4 py-2.5 rounded-xl font-medium text-xs sm:text-sm flex items-center gap-2 whitespace-nowrap transition-all duration-200 ${
                  isActive
                    ? "bg-white text-[#0056A6] font-bold shadow-md scale-[1.02]"
                    : "text-white/80 hover:bg-white/10 hover:text-white"
                }`}
              >
                <Icon className={`w-4 h-4 ${isActive ? "text-[#0056A6]" : "text-cyan-300"}`} />
                {tab.label}
              </button>
            );
          })}
        </div>
      </div>

      {/* SUB-TAB 1: GST CALCULATOR */}
      {activeSubTab === "gst-calc" && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Controls Panel */}
          <div className="lg:col-span-7 bg-white p-6 sm:p-8 rounded-2xl border border-slate-200/80 shadow-md space-y-6">
            <div className="flex justify-between items-center pb-4 border-b border-slate-100">
              <div>
                <h3 className="text-lg font-bold text-slate-900 flex items-center gap-2">
                  <Calculator className="w-5 h-5 text-[#0056A6]" /> GST Calculation Engine
                </h3>
                <p className="text-xs text-slate-500">Calculate CGST, SGST, IGST and Net/Grand Total instantly</p>
              </div>

              <span className="px-3 py-1 bg-blue-50 text-[#0056A6] font-bold text-xs rounded-full border border-blue-100">
                100% Tax Compliant
              </span>
            </div>

            {/* Quick Rates Presets */}
            <div className="space-y-2">
              <label className="text-xs font-bold text-slate-700 uppercase tracking-wider block">
                Select Applicable GST Rate (%)
              </label>
              <div className="grid grid-cols-6 gap-2">
                {[0, 5, 12, 18, 28].map((rate) => (
                  <button
                    key={rate}
                    onClick={() => setGstRate(rate)}
                    className={`py-2.5 rounded-xl font-bold text-sm border transition-all ${
                      gstRate === rate
                        ? "bg-[#0056A6] text-white border-[#0056A6] shadow-sm"
                        : "bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100"
                    }`}
                  >
                    {rate}%
                  </button>
                ))}
                <div className="relative">
                  <input
                    type="number"
                    value={gstRate}
                    onChange={(e) => setGstRate(Number(e.target.value))}
                    className="w-full h-full py-2 px-2 text-center rounded-xl font-bold text-xs border border-slate-200 bg-slate-50 text-slate-800 focus:outline-none focus:ring-2 focus:ring-[#0056A6]"
                    placeholder="Custom"
                  />
                </div>
              </div>
            </div>

            {/* Price Mode: Inclusive vs Exclusive */}
            <div className="grid grid-cols-2 gap-3 p-1.5 bg-slate-100 rounded-xl">
              <button
                onClick={() => setIsInclusive(false)}
                className={`py-2.5 rounded-lg text-xs font-bold transition-all ${
                  !isInclusive
                    ? "bg-white text-[#0056A6] shadow-sm"
                    : "text-slate-600 hover:text-slate-900"
                }`}
              >
                GST Exclusive (Add GST to Amount)
              </button>
              <button
                onClick={() => setIsInclusive(true)}
                className={`py-2.5 rounded-lg text-xs font-bold transition-all ${
                  isInclusive
                    ? "bg-white text-[#0056A6] shadow-sm"
                    : "text-slate-600 hover:text-slate-900"
                }`}
              >
                GST Inclusive (Extract GST from Amount)
              </button>
            </div>

            {/* Amount Input */}
            <div className="space-y-2">
              <label className="text-xs font-bold text-slate-700 uppercase tracking-wider block">
                Enter Base Amount (₹ INR)
              </label>
              <div className="relative">
                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 font-bold text-lg">₹</span>
                <input
                  type="number"
                  value={gstAmountInput}
                  onChange={(e) => setGstAmountInput(Number(e.target.value))}
                  className="w-full pl-10 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-lg font-bold text-slate-900 focus:outline-none focus:ring-2 focus:ring-[#0056A6]"
                />
              </div>
            </div>

            {/* Intra-State vs Inter-State Toggle */}
            <div className="flex items-center justify-between p-4 bg-slate-50 rounded-xl border border-slate-200/80">
              <div>
                <span className="text-xs font-bold text-slate-800 block">Transaction Territory</span>
                <span className="text-[11px] text-slate-500">
                  {isInterState ? "Inter-State (IGST applies)" : "Intra-State Uttarakhand (CGST 50% + SGST 50%)"}
                </span>
              </div>
              <button
                onClick={() => setIsInterState(!isInterState)}
                className={`px-3.5 py-1.5 rounded-lg text-xs font-bold border transition-all ${
                  isInterState
                    ? "bg-amber-500 text-white border-amber-600"
                    : "bg-[#0056A6] text-white border-[#0056A6]"
                }`}
              >
                {isInterState ? "IGST (Inter-State)" : "CGST + SGST (Intra-State)"}
              </button>
            </div>

            {/* Reverse Charge Mechanism Toggle */}
            <div className="flex items-center justify-between p-4 bg-slate-50 rounded-xl border border-slate-200/80">
              <div>
                <span className="text-xs font-bold text-slate-800 block">Reverse Charge Mechanism (RCM)</span>
                <span className="text-[11px] text-slate-500">
                  Check if tax is payable by recipient under Section 9(3)/9(4)
                </span>
              </div>
              <input
                type="checkbox"
                checked={isReverseCharge}
                onChange={(e) => setIsReverseCharge(e.target.checked)}
                className="w-5 h-5 rounded text-[#0056A6] focus:ring-[#0056A6]"
              />
            </div>
          </div>

          {/* Tax Summary Display Panel */}
          <div className="lg:col-span-5 bg-gradient-to-br from-slate-900 to-[#003366] text-white p-6 sm:p-8 rounded-2xl shadow-xl flex flex-col justify-between space-y-6">
            <div className="space-y-6">
              <div className="flex justify-between items-center pb-4 border-b border-white/10">
                <h4 className="text-sm font-bold uppercase tracking-wider text-cyan-300 font-mono">
                  Calculated Tax Summary
                </h4>
                <CompanyLogo variant="icon" size="xs" lightBackground={false} />
              </div>

              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-xs text-slate-300">Net Amount (Excl. Tax)</span>
                  <span className="text-base font-bold text-white font-mono">
                    ₹ {gstCalcResults.netAmount.toLocaleString("en-IN", { maximumFractionDigits: 2 })}
                  </span>
                </div>

                {!isInterState ? (
                  <>
                    <div className="flex justify-between items-center pl-3 border-l-2 border-cyan-400/50">
                      <span className="text-xs text-cyan-200">CGST ({gstRate / 2}%)</span>
                      <span className="text-sm font-semibold text-cyan-300 font-mono">
                        ₹ {gstCalcResults.cgst.toLocaleString("en-IN", { maximumFractionDigits: 2 })}
                      </span>
                    </div>

                    <div className="flex justify-between items-center pl-3 border-l-2 border-cyan-400/50">
                      <span className="text-xs text-cyan-200">SGST ({gstRate / 2}%)</span>
                      <span className="text-sm font-semibold text-cyan-300 font-mono">
                        ₹ {gstCalcResults.sgst.toLocaleString("en-IN", { maximumFractionDigits: 2 })}
                      </span>
                    </div>
                  </>
                ) : (
                  <div className="flex justify-between items-center pl-3 border-l-2 border-amber-400/50">
                    <span className="text-xs text-amber-200">IGST ({gstRate}%)</span>
                    <span className="text-sm font-semibold text-amber-300 font-mono">
                      ₹ {gstCalcResults.igst.toLocaleString("en-IN", { maximumFractionDigits: 2 })}
                    </span>
                  </div>
                )}

                <div className="flex justify-between items-center pt-2 border-t border-white/10">
                  <span className="text-xs text-slate-300">Total Tax Payable</span>
                  <span className="text-lg font-bold text-amber-400 font-mono">
                    ₹ {gstCalcResults.taxAmount.toLocaleString("en-IN", { maximumFractionDigits: 2 })}
                  </span>
                </div>

                <div className="bg-white/10 p-4 rounded-xl border border-white/15 space-y-1">
                  <span className="text-xs text-slate-300 block">Grand Total (Rounded)</span>
                  <div className="text-2xl sm:text-3xl font-black text-emerald-400 font-mono">
                    ₹ {gstCalcResults.roundedGrandTotal.toLocaleString("en-IN")}
                  </div>
                  {gstCalcResults.roundOffDiff !== 0 && (
                    <span className="text-[10px] text-slate-400 block font-mono">
                      Round Off Adjustment: ₹ {gstCalcResults.roundOffDiff.toFixed(2)}
                    </span>
                  )}
                </div>

                {isReverseCharge && (
                  <div className="p-3 bg-amber-500/20 rounded-xl border border-amber-500/40 text-amber-300 text-xs flex items-center gap-2">
                    <Info className="w-4 h-4 shrink-0" />
                    <span>Reverse Charge Applicable: Recipient is liable to pay GST directly to Government.</span>
                  </div>
                )}
              </div>
            </div>

            <button
              onClick={() => {
                const text = `GST Summary (Northern HeatEx Corp):\nNet Amount: ₹${gstCalcResults.netAmount.toFixed(2)}\nGST Rate: ${gstRate}%\nTotal Tax: ₹${gstCalcResults.taxAmount.toFixed(2)}\nGrand Total: ₹${gstCalcResults.roundedGrandTotal}`;
                navigator.clipboard.writeText(text);
                setCopiedState(true);
                setTimeout(() => setCopiedState(false), 2000);
              }}
              className="w-full py-3 bg-[#00A6D6] hover:bg-cyan-500 text-white font-bold text-xs uppercase tracking-wider rounded-xl transition-all flex items-center justify-center gap-2 shadow-lg"
            >
              {copiedState ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
              {copiedState ? "Tax Summary Copied!" : "Copy Tax Statement"}
            </button>
          </div>
        </div>
      )}

      {/* SUB-TAB 1.5: METAL WEIGHT & COMMERCIAL PRICE CALCULATOR */}
      {activeSubTab === "weight-calc" && (
        <MaterialWeightCalculator />
      )}

      {/* SUB-TAB 1.6: OFFICIAL LETTERHEAD STUDIO */}
      {activeSubTab === "letterhead-studio" && (
        <OfficialLetterheadStudio />
      )}

      {/* SUB-TAB 2: HSN CODE DATABASE & SMART SEARCH */}
      {activeSubTab === "hsn-finder" && (
        <div className="space-y-6">
          <div className="bg-white p-6 sm:p-8 rounded-2xl border border-slate-200/80 shadow-md space-y-6">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
              <div>
                <h3 className="text-xl font-bold text-slate-900 flex items-center gap-2">
                  <Search className="w-5 h-5 text-[#0056A6]" /> Indian HSN Code & GST Rate Database
                </h3>
                <p className="text-xs text-slate-500">
                  Official HSN classification table for heat exchangers, pressure vessels, tubesheets, and engineering services
                </p>
              </div>

              <div className="relative w-full md:w-80">
                <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                <input
                  type="text"
                  value={hsnSearchQuery}
                  onChange={(e) => setHsnSearchQuery(e.target.value)}
                  placeholder="Search HSN code, product, category..."
                  className="w-full pl-9 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-bold text-slate-800 focus:outline-none focus:ring-2 focus:ring-[#0056A6]"
                />
              </div>
            </div>

            {/* Table */}
            <div className="overflow-x-auto border border-slate-200 rounded-xl">
              <table className="w-full text-left border-collapse text-xs">
                <thead>
                  <tr className="bg-slate-100 text-slate-700 font-bold border-b border-slate-200 uppercase tracking-wider font-mono">
                    <th className="p-3.5">HSN Code</th>
                    <th className="p-3.5">Product / Service Name</th>
                    <th className="p-3.5">Category</th>
                    <th className="p-3.5">GST Rate</th>
                    <th className="p-3.5">Tax Structure</th>
                    <th className="p-3.5 text-right">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {filteredHsnList.map((item) => (
                    <tr key={item.hsnCode} className="hover:bg-blue-50/50 transition-colors">
                      <td className="p-3.5 font-mono font-bold text-[#0056A6]">{item.hsnCode}</td>
                      <td className="p-3.5">
                        <span className="font-bold text-slate-900 block">{item.productName}</span>
                        <span className="text-[11px] text-slate-500">{item.description}</span>
                      </td>
                      <td className="p-3.5 font-medium text-slate-600">{item.category}</td>
                      <td className="p-3.5">
                        <span className="px-2.5 py-1 bg-blue-100 text-[#0056A6] font-bold rounded-full text-[11px]">
                          {item.gstRate}% GST
                        </span>
                      </td>
                      <td className="p-3.5 text-slate-500 font-mono text-[11px]">{item.taxType}</td>
                      <td className="p-3.5 text-right">
                        <button
                          onClick={() => handleApplyHsnToGst(item)}
                          className="px-3 py-1.5 bg-[#0056A6] hover:bg-blue-700 text-white font-bold rounded-lg text-[11px] transition-all inline-flex items-center gap-1"
                        >
                          Calculate <Sparkles className="w-3 h-3 text-cyan-300" />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="p-4 bg-amber-50 rounded-xl border border-amber-200 text-xs text-amber-800 flex items-start gap-2">
              <ShieldCheck className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
              <div>
                <strong className="block font-bold">Official Statutory Disclaimer:</strong>
                HSN code classifications and GST rates are provided based on the latest Central Board of Indirect Taxes and Customs (CBIC) notifications. Final classification and tax compliance responsibility remains with the billing business entity.
              </div>
            </div>
          </div>
        </div>
      )}

      {/* SUB-TAB 3: PROFIT & MARGIN CALCULATOR */}
      {activeSubTab === "profit-calc" && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          <div className="lg:col-span-7 bg-white p-6 sm:p-8 rounded-2xl border border-slate-200/80 shadow-md space-y-6">
            <h3 className="text-xl font-bold text-slate-900 flex items-center gap-2 pb-3 border-b border-slate-100">
              <TrendingUp className="w-5 h-5 text-[#0056A6]" /> Manufacturing Cost & Profit Margin Calculator
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-700">Material Cost (₹)</label>
                <input
                  type="number"
                  value={costMaterial}
                  onChange={(e) => setCostMaterial(Number(e.target.value))}
                  className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl font-bold text-sm text-slate-900"
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-700">Labour & Fitting Cost (₹)</label>
                <input
                  type="number"
                  value={costLabour}
                  onChange={(e) => setCostLabour(Number(e.target.value))}
                  className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl font-bold text-sm text-slate-900"
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-700">CNC Machining & Drilling (₹)</label>
                <input
                  type="number"
                  value={costMachining}
                  onChange={(e) => setCostMachining(Number(e.target.value))}
                  className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl font-bold text-sm text-slate-900"
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-700">Testing & NDE Clearance (₹)</label>
                <input
                  type="number"
                  value={costTesting}
                  onChange={(e) => setCostTesting(Number(e.target.value))}
                  className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl font-bold text-sm text-slate-900"
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-700">Packing & Transportation (₹)</label>
                <input
                  type="number"
                  value={costFreight}
                  onChange={(e) => setCostFreight(Number(e.target.value))}
                  className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl font-bold text-sm text-slate-900"
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-700">Overhead Allowance (%)</label>
                <input
                  type="number"
                  value={overheadPercent}
                  onChange={(e) => setOverheadPercent(Number(e.target.value))}
                  className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl font-bold text-sm text-slate-900"
                />
              </div>
            </div>

            <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 space-y-3">
              <div className="flex justify-between items-center text-xs font-bold text-slate-800">
                <span>Target Profit Margin: {targetMarginPercent}%</span>
                <span>Markup: {profitCalcResults.markupPercent.toFixed(1)}%</span>
              </div>
              <input
                type="range"
                min="5"
                max="50"
                value={targetMarginPercent}
                onChange={(e) => setTargetMarginPercent(Number(e.target.value))}
                className="w-full accent-[#0056A6]"
              />
            </div>
          </div>

          <div className="lg:col-span-5 bg-gradient-to-br from-[#003366] to-[#0056A6] text-white p-6 sm:p-8 rounded-2xl shadow-xl flex flex-col justify-between space-y-6">
            <div className="space-y-4">
              <h4 className="text-xs font-bold uppercase tracking-wider text-cyan-300 font-mono pb-3 border-b border-white/10">
                Profit & Commercial Breakdown
              </h4>

              <div className="space-y-3 text-xs">
                <div className="flex justify-between">
                  <span className="text-slate-300">Direct Production Cost:</span>
                  <span className="font-mono font-bold">₹ {profitCalcResults.directCost.toLocaleString("en-IN")}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-300">Overheads ({overheadPercent}%):</span>
                  <span className="font-mono font-bold">₹ {profitCalcResults.overheadCost.toLocaleString("en-IN")}</span>
                </div>
                <div className="flex justify-between pt-2 border-t border-white/10 text-sm font-bold">
                  <span>Total Manufacturing Cost:</span>
                  <span className="font-mono text-cyan-300">₹ {profitCalcResults.totalCost.toLocaleString("en-IN")}</span>
                </div>
                <div className="flex justify-between text-emerald-300 font-bold pt-2">
                  <span>Net Profit Margin ({targetMarginPercent}%):</span>
                  <span className="font-mono text-base">₹ {profitCalcResults.profitAmount.toLocaleString("en-IN")}</span>
                </div>
                <div className="flex justify-between text-amber-300">
                  <span>GST Amount ({profitGstRate}%):</span>
                  <span className="font-mono font-bold">₹ {profitCalcResults.gstTax.toLocaleString("en-IN")}</span>
                </div>
              </div>

              <div className="bg-white/10 p-4 rounded-xl border border-white/15 space-y-1 mt-4">
                <span className="text-xs text-slate-300 block">Recommended Selling Price (Excl. GST)</span>
                <div className="text-2xl font-black text-white font-mono">
                  ₹ {profitCalcResults.sellingPriceExclGst.toLocaleString("en-IN", { maximumFractionDigits: 0 })}
                </div>
              </div>

              <div className="bg-emerald-950/80 p-4 rounded-xl border border-emerald-500/40 space-y-1">
                <span className="text-xs text-emerald-300 block">Final Client Invoice Price (Incl. GST)</span>
                <div className="text-2xl font-black text-emerald-400 font-mono">
                  ₹ {profitCalcResults.grandTotalVal.toLocaleString("en-IN", { maximumFractionDigits: 0 })}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* SUB-TAB 4: GST INVOICE GENERATOR */}
      {activeSubTab === "invoice-gen" && (
        <div className="bg-white p-6 sm:p-8 rounded-2xl border border-slate-200/80 shadow-md space-y-6">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 pb-4 border-b border-slate-100">
            <div>
              <h3 className="text-xl font-bold text-slate-900 flex items-center gap-2">
                <FileText className="w-5 h-5 text-[#0056A6]" /> Official GST Invoice & Proposal Generator
              </h3>
              <p className="text-xs text-slate-500">
                Generate 100% Indian GST compliant tax invoices with company details and instant PDF download
              </p>
            </div>

            <button
              onClick={handleGenerateInvoicePdf}
              className="px-5 py-2.5 bg-[#0056A6] hover:bg-blue-700 text-white font-bold text-xs uppercase tracking-wider rounded-xl transition-all shadow-md flex items-center gap-2"
            >
              <Download className="w-4 h-4 text-cyan-300" /> Download GST Invoice PDF
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-xs">
            {/* Buyer Details */}
            <div className="space-y-4 bg-slate-50 p-5 rounded-xl border border-slate-200">
              <h4 className="font-bold text-slate-900 uppercase tracking-wider text-xs border-b border-slate-200 pb-2">
                Buyer / Customer Information
              </h4>

              <div className="space-y-2">
                <label className="font-bold text-slate-700 block">Customer Name</label>
                <input
                  type="text"
                  value={invCustomerName}
                  onChange={(e) => setInvCustomerName(e.target.value)}
                  className="w-full p-2 bg-white border border-slate-200 rounded-lg font-bold text-slate-900"
                />
              </div>

              <div className="space-y-2">
                <label className="font-bold text-slate-700 block">Customer GSTIN</label>
                <input
                  type="text"
                  value={invCustomerGstin}
                  onChange={(e) => setInvCustomerGstin(e.target.value)}
                  className="w-full p-2 bg-white border border-slate-200 rounded-lg font-mono font-bold text-slate-900 uppercase"
                />
              </div>

              <div className="space-y-2">
                <label className="font-bold text-slate-700 block">Billing Address</label>
                <textarea
                  value={invCustomerAddress}
                  onChange={(e) => setInvCustomerAddress(e.target.value)}
                  rows={2}
                  className="w-full p-2 bg-white border border-slate-200 rounded-lg font-medium text-slate-800"
                />
              </div>
            </div>

            {/* Invoice Meta */}
            <div className="space-y-4 bg-slate-50 p-5 rounded-xl border border-slate-200">
              <h4 className="font-bold text-slate-900 uppercase tracking-wider text-xs border-b border-slate-200 pb-2">
                Invoice Metadata & Terms
              </h4>

              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="font-bold text-slate-700 block">Invoice No.</label>
                  <input
                    type="text"
                    value={invNumber}
                    onChange={(e) => setInvNumber(e.target.value)}
                    className="w-full p-2 bg-white border border-slate-200 rounded-lg font-mono font-bold text-slate-900"
                  />
                </div>

                <div className="space-y-1">
                  <label className="font-bold text-slate-700 block">Date</label>
                  <input
                    type="date"
                    value={invDate}
                    onChange={(e) => setInvDate(e.target.value)}
                    className="w-full p-2 bg-white border border-slate-200 rounded-lg font-bold text-slate-900"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="font-bold text-slate-700 block">P.O. Reference</label>
                <input
                  type="text"
                  value={invPoNumber}
                  onChange={(e) => setInvPoNumber(e.target.value)}
                  className="w-full p-2 bg-white border border-slate-200 rounded-lg font-mono font-bold text-slate-900"
                />
              </div>

              <div className="flex items-center justify-between p-2.5 bg-white rounded-lg border border-slate-200">
                <span className="font-bold text-slate-800">Supply State</span>
                <button
                  onClick={() => setInvIsInterstate(!invIsInterstate)}
                  className="px-3 py-1 bg-[#0056A6] text-white font-bold rounded text-[11px]"
                >
                  {invIsInterstate ? "Inter-State (IGST)" : "Intra-State (CGST+SGST)"}
                </button>
              </div>
            </div>
          </div>

          {/* Line Items Table */}
          <div className="bg-slate-50 p-5 rounded-xl border border-slate-200 space-y-4">
            <h4 className="font-bold text-slate-900 uppercase tracking-wider text-xs border-b border-slate-200 pb-2">
              Itemized Line Items
            </h4>

            <div className="grid grid-cols-1 md:grid-cols-12 gap-3 items-center text-xs">
              <div className="md:col-span-5 space-y-1">
                <label className="font-bold text-slate-700 block">Description</label>
                <input
                  type="text"
                  value={invItemDesc}
                  onChange={(e) => setInvItemDesc(e.target.value)}
                  className="w-full p-2 bg-white border border-slate-200 rounded-lg font-bold text-slate-900"
                />
              </div>

              <div className="md:col-span-2 space-y-1">
                <label className="font-bold text-slate-700 block">HSN Code</label>
                <input
                  type="text"
                  value={invHsnCode}
                  onChange={(e) => setInvHsnCode(e.target.value)}
                  className="w-full p-2 bg-white border border-slate-200 rounded-lg font-mono font-bold text-slate-900"
                />
              </div>

              <div className="md:col-span-2 space-y-1">
                <label className="font-bold text-slate-700 block">Qty</label>
                <input
                  type="number"
                  value={invQty}
                  onChange={(e) => setInvQty(Number(e.target.value))}
                  className="w-full p-2 bg-white border border-slate-200 rounded-lg font-bold text-slate-900"
                />
              </div>

              <div className="md:col-span-3 space-y-1">
                <label className="font-bold text-slate-700 block">Unit Price (₹)</label>
                <input
                  type="number"
                  value={invUnitPrice}
                  onChange={(e) => setInvUnitPrice(Number(e.target.value))}
                  className="w-full p-2 bg-white border border-slate-200 rounded-lg font-bold text-slate-900"
                />
              </div>
            </div>
          </div>
        </div>
      )}

      {/* SUB-TAB 5: SCIENTIFIC ENGINEERING CALCULATOR */}
      {activeSubTab === "engineering-calc" && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          <div className="lg:col-span-7 bg-white p-6 sm:p-8 rounded-2xl border border-slate-200/80 shadow-md space-y-6">
            <h3 className="text-xl font-bold text-slate-900 flex items-center gap-2 pb-3 border-b border-slate-100">
              <Sliders className="w-5 h-5 text-[#0056A6]" /> Scientific Engineering Calculator
            </h3>

            {/* Display */}
            <div className="bg-slate-900 text-emerald-400 p-4 rounded-xl text-right font-mono text-2xl sm:text-3xl font-bold border border-slate-800 shadow-inner">
              {calcDisplay}
            </div>

            {/* Keypad */}
            <div className="grid grid-cols-5 gap-2 font-mono text-xs font-bold">
              {["sin", "cos", "tan", "log", "ln"].map((fn) => (
                <button
                  key={fn}
                  onClick={() => handleCalcButton(fn)}
                  className="py-3 bg-slate-100 hover:bg-slate-200 text-slate-800 rounded-lg"
                >
                  {fn}
                </button>
              ))}
              {["sqrt", "(", ")", "^", "C"].map((fn) => (
                <button
                  key={fn}
                  onClick={() => handleCalcButton(fn)}
                  className={`py-3 rounded-lg ${
                    fn === "C" ? "bg-red-500 text-white" : "bg-slate-100 hover:bg-slate-200 text-slate-800"
                  }`}
                >
                  {fn}
                </button>
              ))}
              {["7", "8", "9", "÷", "back"].map((fn) => (
                <button
                  key={fn}
                  onClick={() => handleCalcButton(fn)}
                  className="py-3 bg-slate-50 hover:bg-slate-100 text-slate-900 border border-slate-200 rounded-lg"
                >
                  {fn}
                </button>
              ))}
              {["4", "5", "6", "×", "π"].map((fn) => (
                <button
                  key={fn}
                  onClick={() => handleCalcButton(fn)}
                  className="py-3 bg-slate-50 hover:bg-slate-100 text-slate-900 border border-slate-200 rounded-lg"
                >
                  {fn}
                </button>
              ))}
              {["1", "2", "3", "-", "e"].map((fn) => (
                <button
                  key={fn}
                  onClick={() => handleCalcButton(fn)}
                  className="py-3 bg-slate-50 hover:bg-slate-100 text-slate-900 border border-slate-200 rounded-lg"
                >
                  {fn}
                </button>
              ))}
              {["0", ".", "=", "+"].map((fn) => (
                <button
                  key={fn}
                  onClick={() => handleCalcButton(fn)}
                  className={`py-3 rounded-lg ${
                    fn === "="
                      ? "bg-[#0056A6] text-white col-span-2 text-base font-bold"
                      : "bg-slate-50 hover:bg-slate-100 text-slate-900 border border-slate-200"
                  }`}
                >
                  {fn}
                </button>
              ))}
            </div>
          </div>

          <div className="lg:col-span-5 bg-white p-6 sm:p-8 rounded-2xl border border-slate-200/80 shadow-md space-y-4">
            <h4 className="text-sm font-bold text-slate-900 uppercase tracking-wider font-mono pb-2 border-b border-slate-100">
              Calculation History Log
            </h4>
            <div className="space-y-2 max-h-80 overflow-y-auto pr-1">
              {calcHistory.length === 0 ? (
                <span className="text-xs text-slate-400 italic">No calculation history yet.</span>
              ) : (
                calcHistory.map((item, idx) => (
                  <div key={idx} className="p-2.5 bg-slate-50 rounded-lg font-mono text-xs font-bold text-slate-800 border border-slate-200">
                    {item}
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      )}

      {/* SUB-TAB 6: UNIT CONVERTER */}
      {activeSubTab === "unit-converter" && (
        <div className="bg-white p-6 sm:p-8 rounded-2xl border border-slate-200/80 shadow-md space-y-6">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 pb-4 border-b border-slate-100">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <span className="px-2.5 py-0.5 bg-blue-100 text-[#0056A6] font-mono text-[10px] font-bold rounded-full">
                  14 Industrial Categories
                </span>
                <span className="px-2.5 py-0.5 bg-emerald-100 text-emerald-800 font-mono text-[10px] font-bold rounded-full">
                  Keyboard Shortcut: Alt + U
                </span>
              </div>
              <h3 className="text-xl font-bold text-slate-900 flex items-center gap-2">
                <Scale className="w-5 h-5 text-[#0056A6]" /> Multi-Dimension Engineering Unit Converter
              </h3>
              <p className="text-xs text-slate-500">
                Convert thermal duty, pressure, tube ODs, BWG wall thickness, heat transfer coefficients, & viscosity across metric & imperial standards
              </p>
            </div>

            <button
              onClick={() => {
                const event = new KeyboardEvent("keydown", { key: "u", altKey: true, bubbles: true });
                window.dispatchEvent(event);
              }}
              className="px-4 py-2.5 bg-[#0056A6] hover:bg-blue-700 text-white font-bold text-xs uppercase tracking-wider rounded-xl transition-all shadow-md flex items-center gap-2 cursor-pointer"
            >
              <ArrowRightLeft className="w-4 h-4 text-cyan-300" /> Open Floating Converter Widget (Alt+U)
            </button>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
            {/* Input Controls Column */}
            <div className="lg:col-span-5 bg-slate-50 p-5 rounded-2xl border border-slate-200 space-y-4">
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-700 uppercase tracking-wider font-mono block">
                  1. Select Category
                </label>
                <select
                  value={unitCategory}
                  onChange={(e) => setUnitCategory(e.target.value as any)}
                  className="w-full p-2.5 bg-white border border-slate-300 rounded-xl font-bold text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-[#0056A6]"
                >
                  {UNIT_CATEGORIES.map((cat) => (
                    <option key={cat.id} value={cat.id}>
                      {cat.label}
                    </option>
                  ))}
                </select>
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-700 uppercase tracking-wider font-mono block">
                  2. Input Value
                </label>
                <input
                  type="number"
                  value={unitVal}
                  onChange={(e) => setUnitVal(Number(e.target.value))}
                  className="w-full p-3 bg-white border border-slate-300 rounded-xl font-mono text-xl font-black text-slate-900 focus:outline-none focus:ring-2 focus:ring-[#0056A6]"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-700 uppercase tracking-wider font-mono block">
                  3. From Source Unit
                </label>
                <select
                  value={unitFrom}
                  onChange={(e) => setUnitFrom(e.target.value)}
                  className="w-full p-2.5 bg-white border border-slate-300 rounded-xl font-bold text-xs text-slate-800 focus:outline-none focus:ring-2 focus:ring-[#0056A6]"
                >
                  {(UNIT_CATEGORIES.find((c) => c.id === (unitCategory as any)) || UNIT_CATEGORIES[0]).units.map((u) => (
                    <option key={u.id} value={u.id}>
                      {u.symbol} — {u.name}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Results Grid Column */}
            <div className="lg:col-span-7 space-y-3">
              <label className="text-xs font-bold text-slate-700 uppercase tracking-wider font-mono block">
                Simultaneous Conversion Matrix
              </label>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 max-h-[380px] overflow-y-auto pr-1">
                {(UNIT_CATEGORIES.find((c) => c.id === (unitCategory as any)) || UNIT_CATEGORIES[0]).units.map((u) => {
                  const val = convertUnitValue(unitVal, unitCategory as UnitCategoryKey, unitFrom, u.id);
                  const isSource = u.id === unitFrom;

                  return (
                    <div
                      key={u.id}
                      onClick={() => {
                        const text = `${formatEngineeringNumber(val)} ${u.symbol}`;
                        navigator.clipboard.writeText(text);
                      }}
                      className={`p-3.5 rounded-xl border transition-all cursor-pointer flex flex-col justify-between ${
                        isSource
                          ? "bg-blue-50/80 border-[#0056A6] ring-1 ring-[#0056A6]"
                          : "bg-slate-50 border-slate-200 hover:bg-slate-100 hover:border-blue-300"
                      }`}
                    >
                      <div className="flex justify-between items-start">
                        <span className="text-xs font-bold text-slate-800 line-clamp-1">{u.name}</span>
                        <span className="font-mono text-[10px] font-bold px-1.5 py-0.5 bg-slate-200 text-slate-700 rounded">
                          {u.symbol}
                        </span>
                      </div>

                      <div className="pt-2 flex justify-between items-baseline">
                        <span className="text-base font-black text-[#0056A6] font-mono">
                          {formatEngineeringNumber(val)}
                        </span>
                        <span className="text-[10px] text-slate-400 font-mono">Click to Copy</span>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* SUB-TAB 7: CURRENCY CONVERTER */}
      {activeSubTab === "currency" && (
        <div className="bg-white p-6 sm:p-8 rounded-2xl border border-slate-200/80 shadow-md space-y-6">
          <div className="flex justify-between items-center pb-4 border-b border-slate-100">
            <div>
              <h3 className="text-xl font-bold text-slate-900 flex items-center gap-2">
                <DollarSign className="w-5 h-5 text-[#0056A6]" /> International Currency Converter
              </h3>
              <p className="text-xs text-slate-500">Live & updateable commercial exchange rates for global exports</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-center">
            <div className="space-y-2">
              <label className="text-xs font-bold text-slate-700">Enter Amount</label>
              <input
                type="number"
                value={currencyAmount}
                onChange={(e) => setCurrencyAmount(Number(e.target.value))}
                className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl font-bold text-lg text-slate-900"
              />
            </div>

            <div className="space-y-2">
              <label className="text-xs font-bold text-slate-700">From Currency</label>
              <select
                value={fromCurrency}
                onChange={(e) => setFromCurrency(e.target.value)}
                className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl font-bold text-sm text-slate-900"
              >
                {Object.keys(exchangeRatesINR).map((curr) => (
                  <option key={curr} value={curr}>
                    {curr}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 pt-4">
            {currencyResults.map((res) => (
              <div key={res.code} className="p-4 bg-slate-50 border border-slate-200 rounded-xl space-y-1">
                <span className="text-xs font-bold text-slate-500 block uppercase">{res.code}</span>
                <div className="text-lg font-black text-slate-900 font-mono">
                  {res.amount.toLocaleString("en-US", { maximumFractionDigits: 2 })}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
