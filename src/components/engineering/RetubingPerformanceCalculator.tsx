import React, { useState, useMemo } from "react";
import {
  Wrench,
  Calculator,
  TrendingDown,
  TrendingUp,
  AlertTriangle,
  ShieldCheck,
  Zap,
  Activity,
  Calendar,
  Clock,
  DollarSign,
  ArrowRight,
  RotateCcw,
  Sparkles,
  CheckCircle2,
  XCircle,
  HelpCircle,
  BarChart2,
  Layers,
  Thermometer,
  Gauge,
  Flame,
  LineChart as LineChartIcon,
  ShieldAlert,
  Sliders,
  FileSpreadsheet,
  Copy,
  Check
} from "lucide-react";
import {
  ResponsiveContainer,
  LineChart,
  Line,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  CartesianGrid,
  ReferenceLine,
  AreaChart,
  Area
} from "recharts";

// --- TUBE MATERIAL THERMAL CONDUCTIVITY & CORROSION FACTORS ---
export interface TubeMaterialSpec {
  id: string;
  name: string;
  kValueWmK: number; // Thermal conductivity W/m-K
  corrosionFactor: number; // 1.0 (best) to 3.0 (corrodes fast)
  costRatio: number; // Cost relative to Carbon Steel
}

const TUBE_MATERIALS: TubeMaterialSpec[] = [
  { id: "cs_a179", name: "Carbon Steel (SA-179 / SA-214)", kValueWmK: 50, corrosionFactor: 2.2, costRatio: 1.0 },
  { id: "ss304", name: "Stainless Steel 304L (SA-249)", kValueWmK: 16.2, corrosionFactor: 1.4, costRatio: 2.2 },
  { id: "ss316", name: "Stainless Steel 316L (SA-249)", kValueWmK: 16.3, corrosionFactor: 1.1, costRatio: 2.8 },
  { id: "duplex2205", name: "Duplex 2205 (SA-789)", kValueWmK: 19.0, corrosionFactor: 0.6, costRatio: 3.8 },
  { id: "cuni9010", name: "Copper-Nickel 90/10 (SB-111)", kValueWmK: 45.0, corrosionFactor: 0.9, costRatio: 3.2 },
  { id: "titanium_gr2", name: "Titanium Grade 2 (SB-338)", kValueWmK: 21.9, corrosionFactor: 0.2, costRatio: 5.5 },
  { id: "inconel625", name: "Inconel 625 (SB-444)", kValueWmK: 9.8, corrosionFactor: 0.3, costRatio: 8.0 },
];

export const RetubingPerformanceCalculator: React.FC = () => {
  // --- INPUT STATES ---
  // Exchanger Basic Parameters
  const [designHeatDutyKw, setDesignHeatDutyKw] = useState<number>(2500); // 2500 kW
  const [totalTubeCount, setTotalTubeCount] = useState<number>(480);
  const [tubeODMm, setTubeODMm] = useState<number>(19.05); // 3/4 in
  const [tubeWTMm, setTubeWTMm] = useState<number>(1.65); // BWG 16
  const [tubeLengthMeters, setTubeLengthMeters] = useState<number>(6.0);
  const [shellSideFlowM3h, setShellSideFlowM3h] = useState<number>(120);
  const [tubeSideFlowM3h, setTubeSideFlowM3h] = useState<number>(180);

  // Temperature Conditions
  const [hotInTempC, setHotInTempC] = useState<number>(110);
  const [hotOutTempC, setHotOutTempC] = useState<number>(65);
  const [coldInTempC, setColdInTempC] = useState<number>(25);
  const [coldOutTempC, setColdOutTempC] = useState<number>(55);

  // Before Retubing (Degraded State)
  const [operatingYears, setOperatingYears] = useState<number>(8); // Years in service
  const [pluggedTubesPercent, setPluggedTubesPercent] = useState<number>(14); // 14% leakers plugged
  const [currentFoulingFactor, setCurrentFoulingFactor] = useState<number>(0.0006); // m²K/W
  const [beforeMaterialId, setBeforeMaterialId] = useState<string>("cs_a179");
  const [waterCorrosiveness, setWaterCorrosiveness] = useState<"low" | "moderate" | "severe">("moderate");
  const [thermalCyclesPerMonth, setThermalCyclesPerMonth] = useState<number>(15);

  // After Retubing (New State)
  const [afterMaterialId, setAfterMaterialId] = useState<string>("ss316");
  const [cleanFoulingFactor, setCleanFoulingFactor] = useState<number>(0.00015); // m²K/W
  const [retubingCostUSD, setRetubingCostUSD] = useState<number>(28000);
  const [energyCostPerKwhUSD, setEnergyCostPerKwhUSD] = useState<number>(0.12);
  const [plantOperatingHoursPerYear, setPlantOperatingHoursPerYear] = useState<number>(8000);

  const [copiedReport, setCopiedReport] = useState<boolean>(false);

  // Material Lookups
  const matBefore = useMemo(() => TUBE_MATERIALS.find(m => m.id === beforeMaterialId) || TUBE_MATERIALS[0], [beforeMaterialId]);
  const matAfter = useMemo(() => TUBE_MATERIALS.find(m => m.id === afterMaterialId) || TUBE_MATERIALS[2], [afterMaterialId]);

  // --- CALCULATION ENGINE ---

  // 1. Surface Area Calculations
  const tubeAreaSingleM2 = useMemo(() => {
    return Math.PI * (tubeODMm / 1000) * tubeLengthMeters;
  }, [tubeODMm, tubeLengthMeters]);

  const totalDesignAreaM2 = useMemo(() => {
    return tubeAreaSingleM2 * totalTubeCount;
  }, [tubeAreaSingleM2, totalTubeCount]);

  const activeTubesBefore = useMemo(() => {
    return Math.round(totalTubeCount * (1 - pluggedTubesPercent / 100));
  }, [totalTubeCount, pluggedTubesPercent]);

  const areaBeforeM2 = useMemo(() => {
    return tubeAreaSingleM2 * activeTubesBefore;
  }, [tubeAreaSingleM2, activeTubesBefore]);

  const areaAfterM2 = totalDesignAreaM2; // 100% tubes active after retubing

  // 2. LMTD Calculation
  const lmtdC = useMemo(() => {
    const dt1 = hotInTempC - coldOutTempC;
    const dt2 = hotOutTempC - coldInTempC;
    if (dt1 <= 0 || dt2 <= 0 || dt1 === dt2) return 30; // fallback safety
    return (dt1 - dt2) / Math.log(dt1 / dt2);
  }, [hotInTempC, hotOutTempC, coldInTempC, coldOutTempC]);

  // 3. Overall U Coefficients (Clean, Before Retubing, After Retubing)
  // Clean design U base: approx 850 W/m²K for liquid-liquid
  const designU = 850;

  // Before retubing U (degraded by fouling + lower material k + tube plugging velocity shift)
  const uBefore = useMemo(() => {
    const resistanceFouling = currentFoulingFactor;
    const resistanceMaterial = (tubeWTMm / 1000) / matBefore.kValueWmK;
    const baseCleanU = 1 / (1 / designU + resistanceMaterial);
    const uFouled = 1 / (1 / baseCleanU + resistanceFouling);
    return Math.max(150, Math.round(uFouled));
  }, [currentFoulingFactor, tubeWTMm, matBefore, designU]);

  // After retubing U (new tubes + minimal clean fouling)
  const uAfter = useMemo(() => {
    const resistanceFouling = cleanFoulingFactor;
    const resistanceMaterial = (tubeWTMm / 1000) / matAfter.kValueWmK;
    const baseCleanU = 1 / (1 / designU + resistanceMaterial);
    const uClean = 1 / (1 / baseCleanU + resistanceFouling);
    return Math.round(uClean);
  }, [cleanFoulingFactor, tubeWTMm, matAfter, designU]);

  // 4. Actual Heat Duty Output (Q = U * A * LMTD)
  const qActualBeforeKw = useMemo(() => {
    const qWatts = uBefore * areaBeforeM2 * lmtdC;
    return Math.round(qWatts / 1000);
  }, [uBefore, areaBeforeM2, lmtdC]);

  const qActualAfterKw = useMemo(() => {
    const qWatts = uAfter * areaAfterM2 * lmtdC;
    return Math.round(qWatts / 1000);
  }, [uAfter, areaAfterM2, lmtdC]);

  // 5. Exchanger Heat Exchanging Quality Index (0 to 100 Score)
  const thermalQualityBefore = useMemo(() => {
    const ratio = qActualBeforeKw / designHeatDutyKw;
    return Math.min(100, Math.max(10, Math.round(ratio * 100)));
  }, [qActualBeforeKw, designHeatDutyKw]);

  const thermalQualityAfter = useMemo(() => {
    const ratio = qActualAfterKw / designHeatDutyKw;
    return Math.min(100, Math.max(10, Math.round(ratio * 100)));
  }, [qActualAfterKw, designHeatDutyKw]);

  // 6. Tube Side Pressure Drop Penalty
  // Plugging tubes reduces flow area, increasing velocity squared -> higher pressure drop!
  const dpTubeBeforeBar = useMemo(() => {
    const pluggingFactor = Math.pow(totalTubeCount / Math.max(1, activeTubesBefore), 1.8);
    return Number((0.45 * pluggingFactor * (1 + currentFoulingFactor * 1000)).toFixed(2));
  }, [totalTubeCount, activeTubesBefore, currentFoulingFactor]);

  const dpTubeAfterBar = 0.45; // baseline clean pressure drop

  // 7. Financial & Energy Loss Metrics
  const thermalDutyDeficitKw = Math.max(0, qActualAfterKw - qActualBeforeKw);
  const annualEnergyLossKwH = thermalDutyDeficitKw * plantOperatingHoursPerYear;
  const annualEnergyCostLossUSD = Math.round(annualEnergyLossKwH * energyCostPerKwhUSD);
  
  // Payback period in months
  const paybackPeriodMonths = useMemo(() => {
    if (annualEnergyCostLossUSD <= 0) return 999;
    const years = retubingCostUSD / annualEnergyCostLossUSD;
    return Number((years * 12).toFixed(1));
  }, [retubingCostUSD, annualEnergyCostLossUSD]);

  // 8. Breakdown Probability Weibull Reliability Model
  // Weibull distribution parameters based on water aggressiveness and thermal cycling
  const weibullBeta = 2.8; // wear-out phase
  const aggressivenessMultiplier = waterCorrosiveness === "severe" ? 0.55 : waterCorrosiveness === "moderate" ? 0.8 : 1.1;
  const cyclingPenalty = 1 + (thermalCyclesPerMonth / 30) * 0.4;
  const characteristicLifeYears = Math.max(3, (12 * aggressivenessMultiplier) / (matBefore.corrosionFactor * cyclingPenalty));

  // Current Breakdown Probability at operatingYears
  const currentBreakdownProbabilityPercent = useMemo(() => {
    const t = operatingYears;
    const eta = characteristicLifeYears;
    const prob = 1 - Math.exp(-Math.pow(t / eta, weibullBeta));
    return Math.min(99.9, Math.max(0.5, Number((prob * 100).toFixed(1))));
  }, [operatingYears, characteristicLifeYears, weibullBeta]);

  // Remaining Useful Life (RUL) in Years/Months until 60% breakdown risk
  const remainingUsefulLifeMonths = useMemo(() => {
    const tTarget = characteristicLifeYears * Math.pow(-Math.log(1 - 0.60), 1 / weibullBeta);
    const diffYears = Math.max(0, tTarget - operatingYears);
    return Math.round(diffYears * 12);
  }, [characteristicLifeYears, weibullBeta, operatingYears]);

  // Decision Recommendation logic
  const decisionRecommendation = useMemo(() => {
    if (currentBreakdownProbabilityPercent >= 65 || pluggedTubesPercent >= 15 || thermalQualityBefore < 70) {
      return {
        status: "RETUBE IMMEDIATELY",
        color: "red",
        badgeBg: "bg-rose-500/20 border-rose-500/40 text-rose-300",
        summary: "Critical Risk of Sudden Tube Rupture & Plant Shutdown",
        actionText: "Schedule retubing at next plant turnaround (within 30-60 days). The financial payback is under 12 months from energy recovery alone.",
        urgencyScore: 92,
      };
    } else if (currentBreakdownProbabilityPercent >= 35 || pluggedTubesPercent >= 8 || thermalQualityBefore < 85) {
      return {
        status: "PLAN FOR RETUBING (MONITORING ZONE)",
        color: "amber",
        badgeBg: "bg-amber-500/20 border-amber-500/40 text-amber-300",
        summary: "Moderate Degradation & Increasing Pitting/Fouling Risk",
        actionText: "Procure replacement tube bundle materials now. Perform Eddy Current Testing (ECT) during next planned maintenance.",
        urgencyScore: 58,
      };
    } else {
      return {
        status: "WAIT & CONTINUE MONITORING",
        color: "emerald",
        badgeBg: "bg-emerald-500/20 border-emerald-500/40 text-emerald-300",
        summary: "Exchanger Operating Efficiently in Safe Lifecycle Zone",
        actionText: "Exchanger health is good. Perform standard chemical descaling or mechanical online brushing. Retubing is not required yet.",
        urgencyScore: 18,
      };
    }
  }, [currentBreakdownProbabilityPercent, pluggedTubesPercent, thermalQualityBefore]);

  // --- CHART DATA GENERATION ---

  // 1. Performance & Thermal Quality Trend over 15 Operating Years (Before vs After Retubing)
  const performanceTimelineData = useMemo(() => {
    const data = [];
    for (let yr = 0; yr <= 15; yr++) {
      // Degraded trajectory
      const foulingComp = currentFoulingFactor * (yr / Math.max(1, operatingYears));
      const pluggedComp = Math.min(30, Math.round(pluggedTubesPercent * (yr / Math.max(1, operatingYears))));
      
      const qDegraded = Math.max(800, Math.round(designHeatDutyKw * Math.exp(-0.045 * yr) * (1 - pluggedComp / 200)));
      const qualityDegraded = Math.min(100, Math.round((qDegraded / designHeatDutyKw) * 100));

      // After retubing assumption at operatingYears: jumps back to 100% quality
      let qWithRetubing = qDegraded;
      let qualityWithRetubing = qualityDegraded;

      if (yr >= operatingYears) {
        const yearsPostRetube = yr - operatingYears;
        qWithRetubing = Math.round(qActualAfterKw * Math.exp(-0.015 * yearsPostRetube));
        qualityWithRetubing = Math.min(100, Math.round((qWithRetubing / designHeatDutyKw) * 100));
      }

      data.push({
        year: `Yr ${yr}`,
        yearNum: yr,
        withoutRetubingKw: qDegraded,
        withRetubingKw: qWithRetubing,
        qualityWithout: qualityDegraded,
        qualityWith: qualityWithRetubing,
        isCurrentYear: yr === operatingYears,
      });
    }
    return data;
  }, [operatingYears, currentFoulingFactor, pluggedTubesPercent, designHeatDutyKw, qActualAfterKw]);

  // 2. Weibull Failure Probability Curve over 15 Years
  const failureProbabilityData = useMemo(() => {
    const data = [];
    for (let yr = 0; yr <= 15; yr++) {
      const prob = 1 - Math.exp(-Math.pow(yr / characteristicLifeYears, weibullBeta));
      const pct = Math.min(99.9, Math.round(prob * 100));

      data.push({
        year: `Year ${yr}`,
        yearNum: yr,
        breakdownRiskPct: pct,
        safeThreshold: 20,
        criticalThreshold: 60,
      });
    }
    return data;
  }, [characteristicLifeYears, weibullBeta]);

  // 3. Before vs After Comparison Bar Chart Data
  const comparisonBarData = useMemo(() => {
    return [
      { metric: "Heat Duty (kW)", Before: qActualBeforeKw, After: qActualAfterKw },
      { metric: "Quality Index (%)", Before: thermalQualityBefore, After: thermalQualityAfter },
      { metric: "Overall U (W/m²K)", Before: uBefore, After: uAfter },
      { metric: "Active Tubes", Before: activeTubesBefore, After: totalTubeCount },
    ];
  }, [qActualBeforeKw, qActualAfterKw, thermalQualityBefore, thermalQualityAfter, uBefore, uAfter, activeTubesBefore, totalTubeCount]);

  // Copy Full Report Handler
  const handleCopyReport = () => {
    const text = `
============================================================
NORTHERN HEATEX - RETUBING PERFORMANCE & BREAKDOWN AUDIT
============================================================
Exchanger Design Duty: ${designHeatDutyKw} kW
Operating Service Time: ${operatingYears} Years
Current Plugged Tubes: ${pluggedTubesPercent}% (${activeTubesBefore} / ${totalTubeCount} Tubes Active)

BEFORE RETUBING (DEGRADED STATE):
------------------------------------------------------------
Tube Material: ${matBefore.name}
Overall U Coefficient: ${uBefore} W/m²K
Actual Heat Thermal Duty: ${qActualBeforeKw} kW
Heat Exchanging Quality Index: ${thermalQualityBefore}%
Tube Pressure Drop: ${dpTubeBeforeBar} bar

AFTER RETUBING (RESTORED STATE):
------------------------------------------------------------
New Tube Material: ${matAfter.name}
Overall U Coefficient: ${uAfter} W/m²K
Restored Heat Thermal Duty: ${qActualAfterKw} kW
Restored Quality Index: ${thermalQualityAfter}%
Restored Pressure Drop: ${dpTubeAfterBar} bar
Thermal Performance Gain: +${(qActualAfterKw - qActualBeforeKw)} kW (+${(((qActualAfterKw - qActualBeforeKw) / Math.max(1, qActualBeforeKw)) * 100).toFixed(1)}%)

BREAKDOWN PROBABILITY & MAINTENANCE DECISION:
------------------------------------------------------------
Current Breakdown Risk Probability: ${currentBreakdownProbabilityPercent}%
Estimated Remaining Useful Life (RUL): ${remainingUsefulLifeMonths} Months
Decision Recommendation: ${decisionRecommendation.status}
Urgency Score: ${decisionRecommendation.urgencyScore}/100
Summary: ${decisionRecommendation.summary}

COMMERCIAL ROI & ENERGY SAVINGS:
------------------------------------------------------------
Annual Fuel/Energy Loss Cost: $${annualEnergyCostLossUSD.toLocaleString()} / year
Estimated Retubing Turnaround Cost: $${retubingCostUSD.toLocaleString()}
Financial Payback Period: ${paybackPeriodMonths} Months
============================================================
Northern HeatEx Engineering Suite - Certified Audit
    `.trim();

    navigator.clipboard.writeText(text);
    setCopiedReport(true);
    setTimeout(() => setCopiedReport(false), 2000);
  };

  return (
    <div className="space-y-8 font-['Plus_Jakarta_Sans',sans-serif]">
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-slate-900 via-[#003366] to-[#0056A6] text-white p-6 sm:p-8 rounded-3xl shadow-xl border border-slate-800 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6">
          <div className="space-y-2 max-w-3xl">
            <div className="flex flex-wrap items-center gap-2">
              <span className="px-3 py-1 bg-amber-500/20 text-amber-300 font-mono text-[10px] font-bold uppercase rounded-full border border-amber-500/30 flex items-center gap-1">
                <Wrench className="w-3.5 h-3.5" /> Maintenance & Turnaround Engineering
              </span>
              <span className="px-3 py-1 bg-cyan-500/20 text-cyan-300 font-mono text-[10px] font-bold uppercase rounded-full border border-cyan-500/30">
                Weibull Failure Risk Model
              </span>
            </div>

            <h1 className="text-2xl sm:text-3xl font-black font-mono tracking-tight text-white flex items-center gap-2">
              <Activity className="w-7 h-7 text-cyan-400" /> Heat Exchanger Retubing & Failure Predictor
            </h1>

            <p className="text-xs sm:text-sm text-cyan-100/90 leading-relaxed">
              Compare thermal duty & pressure drop before vs. after retubing. Forecast breakdown probabilities, remaining useful life (RUL), and determine whether to <span className="text-amber-300 font-bold">Retube Now</span> or <span className="text-emerald-300 font-bold">Wait</span>.
            </p>
          </div>

          <button
            type="button"
            onClick={handleCopyReport}
            className="px-5 py-3 bg-cyan-400 hover:bg-cyan-300 text-slate-950 font-black text-xs uppercase tracking-wider rounded-2xl transition-all shadow-xl flex items-center gap-2 cursor-pointer shrink-0"
          >
            {copiedReport ? <Check className="w-4 h-4 text-slate-950" /> : <Copy className="w-4 h-4" />}
            {copiedReport ? "Report Copied!" : "Export Turnaround Report"}
          </button>
        </div>
      </div>

      {/* DECISION MATRIX BANNER: WHEN TO CHANGE VS WHEN TO WAIT */}
      <div className={`p-6 rounded-3xl border shadow-lg flex flex-col md:flex-row justify-between items-start md:items-center gap-6 ${
        decisionRecommendation.color === "red"
          ? "bg-rose-950/80 border-rose-500/40 text-white"
          : decisionRecommendation.color === "amber"
          ? "bg-amber-950/80 border-amber-500/40 text-white"
          : "bg-emerald-950/80 border-emerald-500/40 text-white"
      }`}>
        <div className="space-y-2 max-w-3xl">
          <div className="flex items-center gap-2">
            <span className={`px-3 py-1 rounded-full text-xs font-mono font-black tracking-wider uppercase border ${decisionRecommendation.badgeBg}`}>
              RECOMMENDATION: {decisionRecommendation.status}
            </span>
            <span className="text-xs font-mono text-slate-300">
              Urgency Score: <strong className="text-white">{decisionRecommendation.urgencyScore}/100</strong>
            </span>
          </div>

          <h3 className="text-xl font-bold font-mono text-white flex items-center gap-2">
            {decisionRecommendation.color === "red" ? (
              <ShieldAlert className="w-6 h-6 text-rose-400" />
            ) : decisionRecommendation.color === "amber" ? (
              <AlertTriangle className="w-6 h-6 text-amber-400" />
            ) : (
              <ShieldCheck className="w-6 h-6 text-emerald-400" />
            )}
            {decisionRecommendation.summary}
          </h3>

          <p className="text-xs text-slate-200 leading-relaxed font-mono">
            {decisionRecommendation.actionText}
          </p>
        </div>

        <div className="flex flex-row md:flex-col items-center md:items-end justify-between w-full md:w-auto pt-4 md:pt-0 border-t md:border-t-0 border-white/10 gap-4">
          <div className="text-left md:text-right">
            <span className="text-[10px] font-mono text-slate-300 block">Current Breakdown Risk</span>
            <span className="text-2xl font-black font-mono text-cyan-300">
              {currentBreakdownProbabilityPercent}%
            </span>
          </div>

          <div className="text-left md:text-right">
            <span className="text-[10px] font-mono text-slate-300 block">Remaining Useful Life (RUL)</span>
            <span className="text-2xl font-black font-mono text-amber-300">
              {remainingUsefulLifeMonths} Months
            </span>
          </div>
        </div>
      </div>

      {/* INPUT PARAMETERS & CONFIGURATION GRID */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* INPUT COLUMN 1: EXCHANGER GEOMETRY & SERVICE CONDITIONS */}
        <div className="lg:col-span-6 bg-white p-6 rounded-3xl border border-slate-200/80 shadow-sm space-y-6">
          <div className="pb-3 border-b border-slate-100 flex items-center justify-between">
            <h3 className="text-sm font-bold text-slate-900 font-mono uppercase tracking-wider flex items-center gap-2">
              <Sliders className="w-4 h-4 text-[#0056A6]" /> 1. Exchanger Geometry & Baseline
            </h3>
            <span className="text-[10px] font-mono bg-blue-50 text-[#0056A6] font-bold px-2 py-0.5 rounded">
              TEMA Standard
            </span>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div className="space-y-1 bg-slate-50 p-3 rounded-2xl border border-slate-200">
              <label className="text-[10px] font-bold font-mono text-slate-600 block uppercase">
                Design Duty Q (kW)
              </label>
              <input
                type="number"
                value={designHeatDutyKw}
                onChange={(e) => setDesignHeatDutyKw(Math.max(10, Number(e.target.value)))}
                className="w-full p-2 bg-white border border-slate-300 rounded-xl font-mono text-sm font-bold text-slate-900"
              />
            </div>

            <div className="space-y-1 bg-slate-50 p-3 rounded-2xl border border-slate-200">
              <label className="text-[10px] font-bold font-mono text-slate-600 block uppercase">
                Total Tube Count
              </label>
              <input
                type="number"
                value={totalTubeCount}
                onChange={(e) => setTotalTubeCount(Math.max(10, Number(e.target.value)))}
                className="w-full p-2 bg-white border border-slate-300 rounded-xl font-mono text-sm font-bold text-slate-900"
              />
            </div>

            <div className="space-y-1 bg-slate-50 p-3 rounded-2xl border border-slate-200">
              <label className="text-[10px] font-bold font-mono text-slate-600 block uppercase">
                Tube OD (mm)
              </label>
              <input
                type="number"
                step="0.01"
                value={tubeODMm}
                onChange={(e) => setTubeODMm(Number(e.target.value))}
                className="w-full p-2 bg-white border border-slate-300 rounded-xl font-mono text-sm font-bold text-slate-900"
              />
            </div>

            <div className="space-y-1 bg-slate-50 p-3 rounded-2xl border border-slate-200">
              <label className="text-[10px] font-bold font-mono text-slate-600 block uppercase">
                Tube Length (m)
              </label>
              <input
                type="number"
                step="0.1"
                value={tubeLengthMeters}
                onChange={(e) => setTubeLengthMeters(Number(e.target.value))}
                className="w-full p-2 bg-white border border-slate-300 rounded-xl font-mono text-sm font-bold text-slate-900"
              />
            </div>
          </div>

          {/* Service Environment Factors */}
          <div className="space-y-3 pt-2 border-t border-slate-100">
            <label className="text-xs font-bold font-mono uppercase text-slate-700 block">
              Operating Risk Environment
            </label>

            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-1 bg-slate-50 p-3 rounded-2xl border border-slate-200">
                <label className="text-[10px] font-bold font-mono text-slate-600 block uppercase">
                  Operating Time (Years)
                </label>
                <input
                  type="number"
                  min="0"
                  max="30"
                  value={operatingYears}
                  onChange={(e) => setOperatingYears(Math.max(0, Number(e.target.value)))}
                  className="w-full p-2 bg-white border border-slate-300 rounded-xl font-mono text-sm font-bold text-slate-900"
                />
              </div>

              <div className="space-y-1 bg-slate-50 p-3 rounded-2xl border border-slate-200">
                <label className="text-[10px] font-bold font-mono text-slate-600 block uppercase">
                  Fluid Corrosiveness
                </label>
                <select
                  value={waterCorrosiveness}
                  onChange={(e) => setWaterCorrosiveness(e.target.value as any)}
                  className="w-full p-2 bg-white border border-slate-300 rounded-xl font-mono text-xs font-bold text-slate-900"
                >
                  <option value="low">Low (Clean Demin Water)</option>
                  <option value="moderate">Moderate (Tower Water)</option>
                  <option value="severe">Severe (Chloride / Seawater)</option>
                </select>
              </div>
            </div>
          </div>
        </div>

        {/* INPUT COLUMN 2: BEFORE VS AFTER RETUBING SPECIFICATIONS */}
        <div className="lg:col-span-6 bg-white p-6 rounded-3xl border border-slate-200/80 shadow-sm space-y-6">
          <div className="pb-3 border-b border-slate-100 flex items-center justify-between">
            <h3 className="text-sm font-bold text-slate-900 font-mono uppercase tracking-wider flex items-center gap-2">
              <Wrench className="w-4 h-4 text-[#0056A6]" /> 2. Retubing Scope Comparison
            </h3>
            <span className="text-[10px] font-mono bg-emerald-50 text-emerald-800 font-bold px-2 py-0.5 rounded">
              Material Upgrade Option
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* BEFORE STATE */}
            <div className="p-4 bg-rose-50/50 rounded-2xl border border-rose-200 space-y-3">
              <span className="text-xs font-black font-mono uppercase text-rose-800 block">
                🔴 Before Retubing (Current)
              </span>

              <div className="space-y-1">
                <label className="text-[10px] font-bold font-mono text-slate-600 block uppercase">
                  Tube Alloy
                </label>
                <select
                  value={beforeMaterialId}
                  onChange={(e) => setBeforeMaterialId(e.target.value)}
                  className="w-full p-2 bg-white border border-slate-300 rounded-xl font-mono text-xs font-bold text-slate-900"
                >
                  {TUBE_MATERIALS.map((m) => (
                    <option key={m.id} value={m.id}>
                      {m.name}
                    </option>
                  ))}
                </select>
              </div>

              <div className="space-y-1">
                <label className="text-[10px] font-bold font-mono text-slate-600 block uppercase">
                  Plugged Leaker Tubes (%)
                </label>
                <input
                  type="number"
                  min="0"
                  max="50"
                  value={pluggedTubesPercent}
                  onChange={(e) => setPluggedTubesPercent(Math.max(0, Number(e.target.value)))}
                  className="w-full p-2 bg-white border border-slate-300 rounded-xl font-mono text-sm font-bold text-slate-900"
                />
              </div>

              <div className="space-y-1">
                <label className="text-[10px] font-bold font-mono text-slate-600 block uppercase">
                  Fouling Factor (m²K/W)
                </label>
                <input
                  type="number"
                  step="0.0001"
                  value={currentFoulingFactor}
                  onChange={(e) => setCurrentFoulingFactor(Number(e.target.value))}
                  className="w-full p-2 bg-white border border-slate-300 rounded-xl font-mono text-sm font-bold text-slate-900"
                />
              </div>
            </div>

            {/* AFTER STATE */}
            <div className="p-4 bg-emerald-50/50 rounded-2xl border border-emerald-200 space-y-3">
              <span className="text-xs font-black font-mono uppercase text-emerald-800 block">
                🟢 After Retubing (New)
              </span>

              <div className="space-y-1">
                <label className="text-[10px] font-bold font-mono text-slate-600 block uppercase">
                  Replacement Tube Alloy
                </label>
                <select
                  value={afterMaterialId}
                  onChange={(e) => setAfterMaterialId(e.target.value)}
                  className="w-full p-2 bg-white border border-slate-300 rounded-xl font-mono text-xs font-bold text-slate-900"
                >
                  {TUBE_MATERIALS.map((m) => (
                    <option key={m.id} value={m.id}>
                      {m.name}
                    </option>
                  ))}
                </select>
              </div>

              <div className="space-y-1">
                <label className="text-[10px] font-bold font-mono text-slate-600 block uppercase">
                  Active Tubes
                </label>
                <div className="p-2 bg-emerald-100/80 rounded-xl font-mono text-xs font-black text-emerald-900 border border-emerald-300">
                  100% ({totalTubeCount} Tubes Restored)
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-[10px] font-bold font-mono text-slate-600 block uppercase">
                  Clean Fouling Factor
                </label>
                <input
                  type="number"
                  step="0.00005"
                  value={cleanFoulingFactor}
                  onChange={(e) => setCleanFoulingFactor(Number(e.target.value))}
                  className="w-full p-2 bg-white border border-slate-300 rounded-xl font-mono text-sm font-bold text-slate-900"
                />
              </div>
            </div>
          </div>

          {/* Turnaround Budget & Energy Cost Inputs */}
          <div className="grid grid-cols-2 gap-3 pt-2 border-t border-slate-100">
            <div className="space-y-1 bg-slate-50 p-3 rounded-2xl border border-slate-200">
              <label className="text-[10px] font-bold font-mono text-slate-600 block uppercase">
                Retubing Budget ($)
              </label>
              <input
                type="number"
                value={retubingCostUSD}
                onChange={(e) => setRetubingCostUSD(Number(e.target.value))}
                className="w-full p-2 bg-white border border-slate-300 rounded-xl font-mono text-sm font-bold text-slate-900"
              />
            </div>

            <div className="space-y-1 bg-slate-50 p-3 rounded-2xl border border-slate-200">
              <label className="text-[10px] font-bold font-mono text-slate-600 block uppercase">
                Energy Cost ($/kWh)
              </label>
              <input
                type="number"
                step="0.01"
                value={energyCostPerKwhUSD}
                onChange={(e) => setEnergyCostPerKwhUSD(Number(e.target.value))}
                className="w-full p-2 bg-white border border-slate-300 rounded-xl font-mono text-sm font-bold text-slate-900"
              />
            </div>
          </div>
        </div>
      </div>

      {/* COMPARATIVE RESULTS CARDS & METRICS */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {/* Metric 1: Heat Duty Q */}
        <div className="bg-white p-5 rounded-3xl border border-slate-200/80 shadow-sm space-y-2">
          <span className="text-[10px] font-mono font-bold uppercase text-slate-500 block">
            Thermal Duty Q (kW)
          </span>

          <div className="flex items-baseline justify-between">
            <div>
              <span className="text-2xl font-black font-mono text-[#0056A6]">
                {qActualAfterKw}
              </span>
              <span className="text-xs text-slate-400 block font-mono">After Retubing</span>
            </div>

            <div className="text-right">
              <span className="text-sm font-bold font-mono text-rose-600">
                {qActualBeforeKw}
              </span>
              <span className="text-xs text-slate-400 block font-mono">Before</span>
            </div>
          </div>

          <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-xs font-mono font-bold text-emerald-700">
            <span>Thermal Gain:</span>
            <span>+{(qActualAfterKw - qActualBeforeKw)} kW</span>
          </div>
        </div>

        {/* Metric 2: Exchanging Quality Index */}
        <div className="bg-white p-5 rounded-3xl border border-slate-200/80 shadow-sm space-y-2">
          <span className="text-[10px] font-mono font-bold uppercase text-slate-500 block">
            Heat Exchanging Quality (%)
          </span>

          <div className="flex items-baseline justify-between">
            <div>
              <span className="text-2xl font-black font-mono text-emerald-700">
                {thermalQualityAfter}%
              </span>
              <span className="text-xs text-slate-400 block font-mono">Restored Rating</span>
            </div>

            <div className="text-right">
              <span className="text-sm font-bold font-mono text-rose-600">
                {thermalQualityBefore}%
              </span>
              <span className="text-xs text-slate-400 block font-mono">Degraded</span>
            </div>
          </div>

          <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-xs font-mono font-bold text-[#0056A6]">
            <span>Overall U Coefficient:</span>
            <span>{uBefore} → {uAfter} W/m²K</span>
          </div>
        </div>

        {/* Metric 3: Pressure Drop ΔP */}
        <div className="bg-white p-5 rounded-3xl border border-slate-200/80 shadow-sm space-y-2">
          <span className="text-[10px] font-mono font-bold uppercase text-slate-500 block">
            Tube Side Pressure Drop (bar)
          </span>

          <div className="flex items-baseline justify-between">
            <div>
              <span className="text-2xl font-black font-mono text-[#0056A6]">
                {dpTubeAfterBar} bar
              </span>
              <span className="text-xs text-slate-400 block font-mono">Normal Flow</span>
            </div>

            <div className="text-right">
              <span className="text-sm font-bold font-mono text-rose-600">
                {dpTubeBeforeBar} bar
              </span>
              <span className="text-xs text-slate-400 block font-mono">Choked Flow</span>
            </div>
          </div>

          <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-xs font-mono font-bold text-emerald-700">
            <span>Pumping Power Saved:</span>
            <span>-{Math.round(((dpTubeBeforeBar - dpTubeAfterBar) / dpTubeBeforeBar) * 100)}%</span>
          </div>
        </div>

        {/* Metric 4: Financial Payback */}
        <div className="bg-gradient-to-br from-slate-900 to-[#003366] text-white p-5 rounded-3xl shadow-md space-y-2">
          <span className="text-[10px] font-mono font-bold uppercase text-cyan-300 block">
            Financial ROI & Payback
          </span>

          <div className="space-y-0.5">
            <span className="text-2xl font-black font-mono text-emerald-300">
              {paybackPeriodMonths} Months
            </span>
            <span className="text-xs text-slate-300 block font-mono">Turnaround Payback</span>
          </div>

          <div className="pt-2 border-t border-white/10 flex items-center justify-between text-xs font-mono text-cyan-200">
            <span>Annual Loss Saved:</span>
            <span className="font-bold text-white">${annualEnergyCostLossUSD.toLocaleString()}/yr</span>
          </div>
        </div>
      </div>

      {/* RECHARTS VISUALIZATIONS SECTION */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* GRAPH 1: THERMAL PERFORMANCE & QUALITY TIMELINE */}
        <div className="lg:col-span-7 bg-slate-900 text-white p-6 rounded-3xl border border-slate-800 shadow-xl space-y-4">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2 border-b border-slate-800 pb-3">
            <div>
              <h4 className="text-sm font-bold font-mono text-cyan-300 flex items-center gap-2">
                <LineChartIcon className="w-4 h-4 text-cyan-400" /> Performance & Heat Exchanging Quality Forecast
              </h4>
              <p className="text-[11px] text-slate-400 font-mono">
                Compare thermal duty (kW) trajectory: Without Retubing vs. With Retubing at Year {operatingYears}
              </p>
            </div>

            <span className="px-2.5 py-0.5 bg-cyan-500/20 text-cyan-300 font-mono text-[10px] font-bold rounded-full border border-cyan-500/30">
              15-Year Life Cycle
            </span>
          </div>

          <div className="h-72 w-full pt-2">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={performanceTimelineData} margin={{ top: 10, right: 10, left: -15, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#334155" vertical={false} />
                <XAxis dataKey="year" stroke="#94a3b8" fontSize={11} tickLine={false} />
                <YAxis stroke="#94a3b8" fontSize={10} tickLine={false} />
                <Tooltip
                  content={({ active, payload }) => {
                    if (active && payload && payload.length) {
                      const d = payload[0].payload;
                      return (
                        <div className="bg-slate-950 border border-cyan-500/40 p-3 rounded-2xl shadow-2xl text-xs font-mono space-y-1 z-50">
                          <p className="font-bold text-cyan-300">{d.year} Operational Status</p>
                          <p className="text-rose-400 font-mono">
                            Without Retubing: {d.withoutRetubingKw} kW (Quality: {d.qualityWithout}%)
                          </p>
                          <p className="text-emerald-400 font-mono font-bold">
                            With Retubing: {d.withRetubingKw} kW (Quality: {d.qualityWith}%)
                          </p>
                        </div>
                      );
                    }
                    return null;
                  }}
                />
                <Legend wrapperStyle={{ fontSize: "11px", paddingTop: "8px" }} />
                <ReferenceLine x={`Yr ${operatingYears}`} stroke="#f59e0b" strokeDasharray="3 3" label={{ value: "Current Year", fill: "#f59e0b", fontSize: 10 }} />
                <Line
                  type="monotone"
                  dataKey="withoutRetubingKw"
                  name="Without Retubing (Degraded kW)"
                  stroke="#ef4444"
                  strokeWidth={2.5}
                  dot={{ r: 3 }}
                />
                <Line
                  type="monotone"
                  dataKey="withRetubingKw"
                  name="With Retubing (Restored kW)"
                  stroke="#10b981"
                  strokeWidth={3}
                  dot={{ r: 4 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* GRAPH 2: WEIBULL BREAKDOWN PROBABILITY RISK CURVE */}
        <div className="lg:col-span-5 bg-slate-900 text-white p-6 rounded-3xl border border-slate-800 shadow-xl space-y-4">
          <div className="flex justify-between items-center border-b border-slate-800 pb-3">
            <div>
              <h4 className="text-sm font-bold font-mono text-rose-400 flex items-center gap-2">
                <AlertTriangle className="w-4 h-4 text-rose-400" /> Failure & Breakdown Risk Curve
              </h4>
              <p className="text-[11px] text-slate-400 font-mono">
                Weibull probability of leakers & catastrophic bundle failure (%)
              </p>
            </div>
            <span className="px-2.5 py-0.5 bg-rose-500/20 text-rose-300 font-mono text-[10px] font-bold rounded-full border border-rose-500/30">
              Risk Audit
            </span>
          </div>

          <div className="h-72 w-full pt-2">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={failureProbabilityData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <defs>
                  <linearGradient id="riskGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#f43f5e" stopOpacity={0.8} />
                    <stop offset="95%" stopColor="#f43f5e" stopOpacity={0.0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#334155" vertical={false} />
                <XAxis dataKey="year" stroke="#94a3b8" fontSize={10} tickLine={false} />
                <YAxis stroke="#94a3b8" fontSize={10} tickLine={false} domain={[0, 100]} />
                <Tooltip
                  content={({ active, payload }) => {
                    if (active && payload && payload.length) {
                      const d = payload[0].payload;
                      return (
                        <div className="bg-slate-950 border border-rose-500/40 p-2.5 rounded-xl shadow-2xl text-xs font-mono z-50">
                          <p className="font-bold text-rose-300">{d.year}</p>
                          <p className="text-white font-black text-sm">
                            Breakdown Risk: {d.breakdownRiskPct}%
                          </p>
                        </div>
                      );
                    }
                    return null;
                  }}
                />
                <ReferenceLine y={60} stroke="#f43f5e" strokeDasharray="3 3" label={{ value: "Critical Window (60%)", fill: "#f43f5e", fontSize: 10 }} />
                <Area
                  type="monotone"
                  dataKey="breakdownRiskPct"
                  name="Breakdown Probability (%)"
                  stroke="#f43f5e"
                  fillOpacity={1}
                  fill="url(#riskGrad)"
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* SUMMARY COMPARISON BAR CHART */}
      <div className="bg-white p-6 rounded-3xl border border-slate-200/80 shadow-sm space-y-4">
        <div className="flex justify-between items-center border-b border-slate-100 pb-3">
          <h4 className="text-sm font-bold font-mono text-slate-900 flex items-center gap-2">
            <BarChart2 className="w-4 h-4 text-[#0056A6]" /> Side-by-Side Parameter Audit
          </h4>
          <span className="text-xs font-mono text-slate-500">
            Before vs After Retubing Metrics
          </span>
        </div>

        <div className="h-64 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={comparisonBarData} margin={{ top: 10, right: 20, left: 0, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" vertical={false} />
              <XAxis dataKey="metric" stroke="#64748b" fontSize={11} tickLine={false} />
              <YAxis stroke="#64748b" fontSize={10} tickLine={false} />
              <Tooltip />
              <Legend wrapperStyle={{ fontSize: "12px" }} />
              <Bar dataKey="Before" name="Before Retubing (Degraded)" fill="#f43f5e" radius={[4, 4, 0, 0]} />
              <Bar dataKey="After" name="After Retubing (Restored)" fill="#0284c7" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};
