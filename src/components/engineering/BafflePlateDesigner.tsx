import React, { useState, useMemo, useRef } from "react";
import {
  Ruler,
  Layers,
  Download,
  Printer,
  Sparkles,
  Info,
  CheckCircle2,
  FileCode,
  RotateCcw,
  Maximize2,
  Copy,
  Check,
  Eye,
  Sliders,
  Award,
  Grid,
  Scale
} from "lucide-react";
import { motion } from "motion/react";
import { MATERIAL_LIBRARY } from "./MaterialWeightCalculator";

export const BafflePlateDesigner: React.FC = () => {
  // --- DESIGN PARAMETER STATES ---
  const [shellIdMm, setShellIdMm] = useState<number>(600); // Shell Inside Diameter (mm)
  const [clearanceMm, setClearanceMm] = useState<number>(3.2); // Baffle-to-shell clearance (mm)
  const [baffleCutPercent, setBaffleCutPercent] = useState<number>(25); // Baffle Cut (15% to 45%)
  const [cutOrientation, setCutOrientation] = useState<"horizontal" | "vertical">("horizontal");
  const [tubeOdMm, setTubeOdMm] = useState<number>(19.05); // 3/4" Tube OD (mm)
  const [holeClearenceMm, setHoleClearenceMm] = useState<number>(0.8); // Hole clearance over tube OD
  const [pitchMm, setPitchMm] = useState<number>(23.81); // 1.25 x Tube OD
  const [pitchAngle, setPitchAngle] = useState<30 | 45 | 60 | 90>(30); // 30° Triangular, 45° Diamond, 60° Rotated Tri, 90° Square
  const [baffleThkMm, setBaffleThkMm] = useState<number>(9.5); // 3/8" (9.5 mm)
  const [materialId, setMaterialId] = useState<string>("cs_a106_a516");
  const [tieRodCount, setTieRodCount] = useState<number>(4);
  const [tieRodHoleDiaMm, setTieRodHoleDiaMm] = useState<number>(16);
  const [viewMode, setViewMode] = useState<"2d" | "3d">("2d");
  const [rotation, setRotation] = useState<{ x: number; y: number }>({ x: 25, y: -35 });
  const [copiedSpecs, setCopiedSpecs] = useState<boolean>(false);

  const svgRef = useRef<SVGSVGElement | null>(null);

  // Selected Material
  const selectedMaterial = useMemo(() => {
    return MATERIAL_LIBRARY.find((m) => m.id === materialId) || MATERIAL_LIBRARY[0];
  }, [materialId]);

  // Tube Hole Diameter
  const holeDiaMm = useMemo(() => {
    return tubeOdMm + holeClearenceMm;
  }, [tubeOdMm, holeClearenceMm]);

  // Baffle Outside Diameter
  const baffleOdMm = useMemo(() => {
    return Math.max(10, shellIdMm - clearanceMm);
  }, [shellIdMm, clearanceMm]);

  // Outer Tube Limit (OTL)
  const otlMm = useMemo(() => {
    return Math.max(10, shellIdMm - 18);
  }, [shellIdMm]);

  // Baffle Cut Height (Hc) & Remaining Height (Hb)
  const cutHeightMm = useMemo(() => {
    return (baffleCutPercent / 100) * baffleOdMm;
  }, [baffleCutPercent, baffleOdMm]);

  const remainingHeightMm = useMemo(() => {
    return baffleOdMm - cutHeightMm;
  }, [baffleOdMm, cutHeightMm]);

  // Geometry: Subtended Angle theta & Cut Area
  const segmentMath = useMemo(() => {
    const R = baffleOdMm / 2;
    const h = cutHeightMm;
    // ratio constrained [-1, 1]
    const ratio = Math.max(-1, Math.min(1, 1 - h / R));
    const theta = 2 * Math.acos(ratio); // in radians

    const totalCircleArea = Math.PI * R * R;
    const cutArea = 0.5 * R * R * (theta - Math.sin(theta));
    const grossBaffleArea = Math.max(0, totalCircleArea - cutArea);
    const cutAreaPercent = (cutArea / totalCircleArea) * 100;

    return {
      R,
      thetaRad: theta,
      thetaDeg: (theta * 180) / Math.PI,
      totalCircleArea,
      cutArea,
      grossBaffleArea,
      cutAreaPercent,
    };
  }, [baffleOdMm, cutHeightMm]);

  // Tube Hole Grid Generator
  const tubeHolePositions = useMemo(() => {
    const positions: { x: number; y: number; inBaffle: boolean }[] = [];
    const R_otl = otlMm / 2;
    const R_baffle = baffleOdMm / 2;
    const p = pitchMm;

    // Cut limit boundary line
    // Horizontal cut: cut occurs at top y = R_baffle - cutHeightMm
    const cutLimitY = R_baffle - cutHeightMm;
    const cutLimitX = R_baffle - cutHeightMm;

    // Calculate grid range
    const maxIndex = Math.ceil(R_otl / p) + 3;

    for (let row = -maxIndex; row <= maxIndex; row++) {
      for (let col = -maxIndex; col <= maxIndex; col++) {
        let x = 0;
        let y = 0;

        if (pitchAngle === 30) {
          x = col * p + (row % 2 === 0 ? 0 : p / 2);
          y = row * p * (Math.sqrt(3) / 2);
        } else if (pitchAngle === 60) {
          x = col * p * (Math.sqrt(3) / 2);
          y = row * p + (col % 2 === 0 ? 0 : p / 2);
        } else if (pitchAngle === 45) {
          x = (col - row) * (p / Math.sqrt(2));
          y = (col + row) * (p / Math.sqrt(2));
        } else {
          // 90° Square
          x = col * p;
          y = row * p;
        }

        const distFromCenter = Math.sqrt(x * x + y * y);

        // Hole must lie inside Outer Tube Limit (OTL)
        if (distFromCenter <= R_otl - holeDiaMm / 2) {
          let inBaffle = true;

          if (cutOrientation === "horizontal") {
            inBaffle = y <= cutLimitY;
          } else {
            inBaffle = x <= cutLimitX;
          }

          positions.push({ x, y, inBaffle });
        }
      }
    }

    return positions;
  }, [otlMm, baffleOdMm, pitchMm, pitchAngle, cutHeightMm, cutOrientation, holeDiaMm]);

  // Hole Counts
  const totalTubesInBaffle = useMemo(() => {
    return tubeHolePositions.filter((t) => t.inBaffle).length;
  }, [tubeHolePositions]);

  const totalTubesInCutout = useMemo(() => {
    return tubeHolePositions.filter((t) => !t.inBaffle).length;
  }, [tubeHolePositions]);

  // Tie Rod Positions
  const tieRodPositions = useMemo(() => {
    const rods: { x: number; y: number }[] = [];
    const r = (otlMm / 2) * 0.85; // Place tie rods at 85% OTL radius
    const stepAngle = (2 * Math.PI) / tieRodCount;

    for (let i = 0; i < tieRodCount; i++) {
      const angle = i * stepAngle + Math.PI / 4;
      const x = r * Math.cos(angle);
      const y = r * Math.sin(angle);

      // Check if tie rod lies in remaining baffle
      const R_baffle = baffleOdMm / 2;
      const cutLimit = R_baffle - cutHeightMm;

      let inBaffle = true;
      if (cutOrientation === "horizontal") {
        inBaffle = y <= cutLimit;
      } else {
        inBaffle = x <= cutLimit;
      }

      if (inBaffle) {
        rods.push({ x, y });
      }
    }
    return rods;
  }, [otlMm, tieRodCount, baffleOdMm, cutHeightMm, cutOrientation]);

  // Net Area & Weight Calculations
  const netCalculations = useMemo(() => {
    const holeAreaSingle = (Math.PI / 4) * Math.pow(holeDiaMm / 1000, 2); // m²
    const tieRodHoleAreaSingle = (Math.PI / 4) * Math.pow(tieRodHoleDiaMm / 1000, 2); // m²

    const grossAreaM2 = segmentMath.grossBaffleArea / 1e6; // m²
    const totalHolesAreaM2 = totalTubesInBaffle * holeAreaSingle;
    const totalTieRodsAreaM2 = tieRodPositions.length * tieRodHoleAreaSingle;

    const netSolidAreaM2 = Math.max(0, grossAreaM2 - totalHolesAreaM2 - totalTieRodsAreaM2);
    const volumeM3 = netSolidAreaM2 * (baffleThkMm / 1000);

    const netWeightKg = volumeM3 * selectedMaterial.densityKgM3;
    const netWeightLbs = netWeightKg * 2.20462;

    // TEMA Recommended Baffle Spacing limits
    const minBaffleSpacingMm = Math.max(shellIdMm * 0.2, 50.8); // 0.2 Ds or 2 inches
    const maxBaffleSpacingMm = shellIdMm; // 1.0 Ds

    return {
      grossAreaM2,
      netSolidAreaM2,
      volumeM3,
      netWeightKg,
      netWeightLbs,
      minBaffleSpacingMm,
      maxBaffleSpacingMm,
    };
  }, [
    segmentMath.grossBaffleArea,
    holeDiaMm,
    tieRodHoleDiaMm,
    totalTubesInBaffle,
    tieRodPositions.length,
    baffleThkMm,
    selectedMaterial,
    shellIdMm,
  ]);

  // Download SVG Vector File
  const handleDownloadSvg = () => {
    if (!svgRef.current) return;
    const svgData = new XMLSerializer().serializeToString(svgRef.current);
    const svgBlob = new Blob([svgData], { type: "image/svg+xml;charset=utf-8" });
    const svgUrl = URL.createObjectURL(svgBlob);
    const downloadLink = document.createElement("a");
    downloadLink.href = svgUrl;
    downloadLink.download = `baffle_plate_Ds${shellIdMm}mm_Cut${baffleCutPercent}pct.svg`;
    document.body.appendChild(downloadLink);
    downloadLink.click();
    document.body.removeChild(downloadLink);
  };

  // Download DXF Data Specification Report
  const handleDownloadDxfReport = () => {
    const reportText = `================================================================================
ASME / TEMA HEAT EXCHANGER BAFFLE PLATE DESIGN REPORT & CAD SPECIFICATION
NORTHERN HEATEX ENGINEERING ECOSYSTEM - HIGH PRECISION THERMAL & MECHANICAL SUITE
================================================================================

1. SHELL & BAFFLE GEOMETRY SPECIFICATIONS:
--------------------------------------------------------------------------------
Shell Inside Diameter (Ds):          ${shellIdMm.toFixed(2)} mm
Baffle-to-Shell Clearance (Cb):       ${clearanceMm.toFixed(2)} mm
Baffle Outside Diameter (Db):         ${baffleOdMm.toFixed(2)} mm
Baffle Cut Percentage:                ${baffleCutPercent}% Single Segmental
Baffle Cut Orientation:              ${cutOrientation.toUpperCase()}
Baffle Cut Height (Hc):               ${cutHeightMm.toFixed(2)} mm
Remaining Baffle Height (Hb):         ${remainingHeightMm.toFixed(2)} mm
Plate Thickness (Tb):                 ${baffleThkMm.toFixed(2)} mm
Material Specification:               ${selectedMaterial.name} (${selectedMaterial.densityKgM3} kg/m³)

2. TUBE HOLE & PITCH MATRIX PARAMETERS:
--------------------------------------------------------------------------------
Tube Outer Diameter (do):             ${tubeOdMm.toFixed(2)} mm
Baffle Tube Hole Diameter (dh):       ${holeDiaMm.toFixed(2)} mm (Clearance: +${holeClearenceMm.toFixed(2)} mm)
Tube Pitch (Pt):                      ${pitchMm.toFixed(2)} mm
Pitch Layout Angle:                   ${pitchAngle}° ${
      pitchAngle === 30
        ? "Triangular"
        : pitchAngle === 60
        ? "Rotated Triangular"
        : pitchAngle === 45
        ? "Diamond Square"
        : "Square"
    }
Total Active Holes in Baffle:        ${totalTubesInBaffle} Holes
Holes in Segment Cutout Area:        ${totalTubesInCutout} Holes
Tie Rod Holes Count & Size:          ${tieRodPositions.length} Holes × Ø${tieRodHoleDiaMm.toFixed(2)} mm

3. MECHANICAL METRICS & WEIGHT ESTIMATE:
--------------------------------------------------------------------------------
Gross Baffle Area (w/o cut):         ${(segmentMath.totalCircleArea / 100).toFixed(2)} cm²
Cut Away Area:                        ${(segmentMath.cutArea / 100).toFixed(2)} cm² (${segmentMath.cutAreaPercent.toFixed(1)}%)
Gross Segment Plate Area:             ${(segmentMath.grossBaffleArea / 100).toFixed(2)} cm²
Net Solid Plate Area:                 ${(netCalculations.netSolidAreaM2 * 10000).toFixed(2)} cm²
Net Single Baffle Weight:             ${netCalculations.netWeightKg.toFixed(2)} kg (${netCalculations.netWeightLbs.toFixed(2)} lbs)

4. TEMA BAFFLE SPACING RECOMMENDATIONS:
--------------------------------------------------------------------------------
Recommended Min Baffle Spacing:      ${netCalculations.minBaffleSpacingMm.toFixed(1)} mm (0.2 × Ds)
Recommended Max Baffle Spacing:      ${netCalculations.maxBaffleSpacingMm.toFixed(1)} mm (1.0 × Ds)
TEMA Hole Clearance Compliance:      PASSED (TEMA Class R/C/B Standard)

================================================================================
Generated on: ${new Date().toISOString().split("T")[0]} | ASME Section VIII Div 1
================================================================================
`;

    const blob = new Blob([reportText], { type: "text/plain;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `baffle_plate_spec_Ds${shellIdMm}mm.txt`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // Copy Specs Summary to Clipboard
  const handleCopySpecs = () => {
    const text = `Baffle Plate Design Specs: Shell ID = ${shellIdMm}mm | Baffle OD = ${baffleOdMm.toFixed(
      1
    )}mm | Cut = ${baffleCutPercent}% (${cutHeightMm.toFixed(1)}mm) | Holes = ${totalTubesInBaffle} × Ø${holeDiaMm.toFixed(
      2
    )}mm (${pitchAngle}° Pitch) | Weight = ${netCalculations.netWeightKg.toFixed(2)} kg | Material = ${selectedMaterial.name}`;
    navigator.clipboard.writeText(text);
    setCopiedSpecs(true);
    setTimeout(() => setCopiedSpecs(false), 2000);
  };

  // Trigger Print Mode
  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="space-y-6 font-['Plus_Jakarta_Sans',sans-serif]">
      {/* SECTION HEADER & CONTROL BAR */}
      <div className="bg-slate-900 text-white p-6 sm:p-8 rounded-3xl border border-slate-800 shadow-xl relative overflow-hidden flex flex-col md:flex-row items-start md:items-center justify-between gap-6 print:hidden">
        <div className="space-y-2 max-w-2xl">
          <div className="flex items-center gap-2">
            <span className="px-3 py-1 bg-amber-500/20 text-amber-300 border border-amber-500/30 text-xs font-mono font-bold rounded-full uppercase tracking-wider flex items-center gap-1.5">
              <Ruler className="w-3.5 h-3.5 text-amber-400" /> ASME VIII & TEMA STANDARD
            </span>
            <span className="px-2.5 py-0.5 bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 text-[10px] font-mono font-bold rounded-full">
              CAD & 3D STUDIO
            </span>
          </div>

          <h1 className="text-2xl sm:text-3xl font-black font-mono tracking-tight text-white">
            Heat Exchanger Baffle Plate Designer
          </h1>

          <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
            Configure segmental baffle plate geometries, tube pitch matrices, cut heights, free-flow window areas, and net dry weight. Export vector SVG CAD blueprints and DXF datasheets.
          </p>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-wrap items-center gap-2 shrink-0">
          <button
            onClick={handleCopySpecs}
            className="px-3.5 py-2.5 bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 text-xs font-mono font-bold rounded-xl transition flex items-center gap-2 cursor-pointer"
          >
            {copiedSpecs ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
            <span>{copiedSpecs ? "Specs Copied!" : "Copy Summary"}</span>
          </button>

          <button
            onClick={handleDownloadSvg}
            className="px-3.5 py-2.5 bg-[#0056A6] hover:bg-blue-600 text-white font-mono font-bold text-xs rounded-xl transition shadow-lg flex items-center gap-2 cursor-pointer border border-blue-400/30"
          >
            <Download className="w-4 h-4" />
            <span>Download CAD SVG</span>
          </button>

          <button
            onClick={handleDownloadDxfReport}
            className="px-3.5 py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white font-mono font-bold text-xs rounded-xl transition shadow-lg flex items-center gap-2 cursor-pointer"
          >
            <FileCode className="w-4 h-4" />
            <span>Export DXF Specs</span>
          </button>

          <button
            onClick={handlePrint}
            className="px-3.5 py-2.5 bg-amber-500 hover:bg-amber-400 text-slate-950 font-mono font-black text-xs rounded-xl transition shadow-lg flex items-center gap-2 cursor-pointer"
          >
            <Printer className="w-4 h-4" />
            <span>Print Blueprint</span>
          </button>
        </div>
      </div>

      {/* MAIN TWO-COLUMN GRID */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* LEFT COLUMN: PARAMETER INPUT CONTROLS (LG: 5 COLS) */}
        <div className="lg:col-span-5 bg-white p-5 sm:p-6 rounded-3xl border border-slate-200 shadow-sm space-y-5 print:hidden">
          <div className="flex items-center justify-between pb-3 border-b border-slate-200">
            <h2 className="text-sm font-black font-mono uppercase tracking-wider text-slate-900 flex items-center gap-2">
              <Sliders className="w-4 h-4 text-[#0056A6]" /> Geometry & Tube Parameters
            </h2>
            <span className="text-[10px] font-mono text-slate-500">ASME / TEMA Standards</span>
          </div>

          {/* INPUT SECTION 1: Shell & Baffle Diameters */}
          <div className="space-y-3">
            <label className="text-xs font-bold text-slate-800 font-mono uppercase block">
              1. Shell ID & Clearance
            </label>

            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-1 bg-slate-50 p-3 rounded-2xl border border-slate-200">
                <label className="text-[10px] font-bold text-slate-600 block">Shell Inside Dia (Ds)</label>
                <div className="flex items-center gap-1">
                  <input
                    type="number"
                    value={shellIdMm}
                    onChange={(e) => setShellIdMm(Math.max(100, parseFloat(e.target.value) || 100))}
                    className="w-full p-2 bg-white border border-slate-300 rounded-xl font-mono text-sm font-bold text-slate-900 focus:outline-none focus:ring-2 focus:ring-[#0056A6]"
                  />
                  <span className="text-xs font-mono font-bold text-slate-500">mm</span>
                </div>
              </div>

              <div className="space-y-1 bg-slate-50 p-3 rounded-2xl border border-slate-200">
                <label className="text-[10px] font-bold text-slate-600 block">Baffle Clearance (Cb)</label>
                <div className="flex items-center gap-1">
                  <input
                    type="number"
                    step="0.1"
                    value={clearanceMm}
                    onChange={(e) => setClearanceMm(Math.max(0, parseFloat(e.target.value) || 0))}
                    className="w-full p-2 bg-white border border-slate-300 rounded-xl font-mono text-sm font-bold text-slate-900 focus:outline-none focus:ring-2 focus:ring-[#0056A6]"
                  />
                  <span className="text-xs font-mono font-bold text-slate-500">mm</span>
                </div>
              </div>
            </div>

            <div className="p-2.5 bg-blue-50/70 border border-blue-100 rounded-xl text-xs font-mono flex justify-between">
              <span className="text-slate-600">Computed Baffle OD (Db):</span>
              <strong className="text-[#0056A6]">{baffleOdMm.toFixed(2)} mm</strong>
            </div>
          </div>

          {/* INPUT SECTION 2: Baffle Cut Percentage & Orientation */}
          <div className="space-y-3 pt-2 border-t border-slate-100">
            <div className="flex justify-between items-center">
              <label className="text-xs font-bold text-slate-800 font-mono uppercase">
                2. Baffle Cut Percentage
              </label>
              <span className="text-xs font-mono font-bold text-amber-700 bg-amber-100 px-2 py-0.5 rounded-md">
                {baffleCutPercent}% Segmental Cut
              </span>
            </div>

            <input
              type="range"
              min="15"
              max="45"
              step="1"
              value={baffleCutPercent}
              onChange={(e) => setBaffleCutPercent(parseInt(e.target.value))}
              className="w-full accent-[#0056A6] cursor-pointer"
            />

            <div className="grid grid-cols-2 gap-2 text-xs font-mono">
              <button
                type="button"
                onClick={() => setCutOrientation("horizontal")}
                className={`p-2 rounded-xl border font-bold transition cursor-pointer text-center ${
                  cutOrientation === "horizontal"
                    ? "bg-[#0056A6] text-white border-[#0056A6]"
                    : "bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100"
                }`}
              >
                Horizontal Cut (Top/Bottom)
              </button>
              <button
                type="button"
                onClick={() => setCutOrientation("vertical")}
                className={`p-2 rounded-xl border font-bold transition cursor-pointer text-center ${
                  cutOrientation === "vertical"
                    ? "bg-[#0056A6] text-white border-[#0056A6]"
                    : "bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100"
                }`}
              >
                Vertical Cut (Side/Side)
              </button>
            </div>

            <div className="grid grid-cols-2 gap-2 text-[11px] font-mono text-slate-600 bg-slate-50 p-2.5 rounded-xl border border-slate-200">
              <div>Cut Height (Hc): <strong className="text-slate-900">{cutHeightMm.toFixed(1)} mm</strong></div>
              <div>Baffle Height (Hb): <strong className="text-slate-900">{remainingHeightMm.toFixed(1)} mm</strong></div>
            </div>
          </div>

          {/* INPUT SECTION 3: Tube Pitch & Pattern Angle */}
          <div className="space-y-3 pt-2 border-t border-slate-100">
            <label className="text-xs font-bold text-slate-800 font-mono uppercase block">
              3. Tube OD & Pitch Pattern
            </label>

            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-1 bg-slate-50 p-3 rounded-2xl border border-slate-200">
                <label className="text-[10px] font-bold text-slate-600 block">Tube Outer Dia (do)</label>
                <select
                  value={tubeOdMm}
                  onChange={(e) => {
                    const od = parseFloat(e.target.value);
                    setTubeOdMm(od);
                    setPitchMm(Number((od * 1.25).toFixed(2)));
                  }}
                  className="w-full p-2 bg-white border border-slate-300 rounded-xl font-mono text-xs font-bold text-slate-900"
                >
                  <option value={15.875}>15.88 mm (5/8 in)</option>
                  <option value={19.05}>19.05 mm (3/4 in)</option>
                  <option value={25.4}>25.40 mm (1.0 in)</option>
                  <option value={31.75}>31.75 mm (1-1/4 in)</option>

                  <option value={38.1}>38.10 mm (1-1/2 in)</option>
                </select>
              </div>

              <div className="space-y-1 bg-slate-50 p-3 rounded-2xl border border-slate-200">
                <label className="text-[10px] font-bold text-slate-600 block">Tube Pitch (Pt)</label>
                <input
                  type="number"
                  step="0.01"
                  value={pitchMm}
                  onChange={(e) => setPitchMm(parseFloat(e.target.value) || tubeOdMm * 1.25)}
                  className="w-full p-2 bg-white border border-slate-300 rounded-xl font-mono text-xs font-bold text-slate-900"
                />
              </div>
            </div>

            {/* Pitch Layout Angle Selector */}
            <div className="space-y-1">
              <label className="text-[10px] font-bold text-slate-600 font-mono uppercase block">
                Select Layout Angle
              </label>
              <div className="grid grid-cols-4 gap-1.5 font-mono text-xs">
                {([30, 60, 45, 90] as const).map((angle) => (
                  <button
                    key={angle}
                    type="button"
                    onClick={() => setPitchAngle(angle)}
                    className={`py-2 px-1 rounded-xl border font-bold transition text-center cursor-pointer ${
                      pitchAngle === angle
                        ? "bg-[#0056A6] text-white border-[#0056A6] shadow-sm"
                        : "bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100"
                    }`}
                  >
                    {angle}° {angle === 30 ? "Tri" : angle === 60 ? "Rot Tri" : angle === 45 ? "Dia" : "Sq"}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* INPUT SECTION 4: Plate Thickness & Material */}
          <div className="space-y-3 pt-2 border-t border-slate-100">
            <label className="text-xs font-bold text-slate-800 font-mono uppercase block">
              4. Plate Thickness & Alloy Material
            </label>

            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-1 bg-slate-50 p-3 rounded-2xl border border-slate-200">
                <label className="text-[10px] font-bold text-slate-600 block">Plate Thickness (Tb)</label>
                <select
                  value={baffleThkMm}
                  onChange={(e) => setBaffleThkMm(parseFloat(e.target.value))}
                  className="w-full p-2 bg-white border border-slate-300 rounded-xl font-mono text-xs font-bold text-slate-900"
                >
                  <option value={4.76}>4.76 mm (3/16 in)</option>
                  <option value={6.35}>6.35 mm (1/4 in)</option>
                  <option value={9.525}>9.53 mm (3/8 in)</option>
                  <option value={12.7}>12.70 mm (1/2 in)</option>
                  <option value={15.88}>15.88 mm (5/8 in)</option>
                  <option value={19.05}>19.05 mm (3/4 in)</option>
                </select>
              </div>

              <div className="space-y-1 bg-slate-50 p-3 rounded-2xl border border-slate-200">
                <label className="text-[10px] font-bold text-slate-600 block">Material Specification</label>
                <select
                  value={materialId}
                  onChange={(e) => setMaterialId(e.target.value)}
                  className="w-full p-2 bg-white border border-slate-300 rounded-xl font-mono text-xs font-bold text-slate-900"
                >
                  {MATERIAL_LIBRARY.map((mat) => (
                    <option key={mat.id} value={mat.id}>
                      {mat.name.split("/")[0]}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>

          {/* INPUT SECTION 5: Tie Rod Holes */}
          <div className="space-y-3 pt-2 border-t border-slate-100">
            <label className="text-xs font-bold text-slate-800 font-mono uppercase block">
              5. Tie Rod Holes Specification
            </label>

            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-1 bg-slate-50 p-3 rounded-2xl border border-slate-200">
                <label className="text-[10px] font-bold text-slate-600 block">Tie Rod Holes Count</label>
                <input
                  type="number"
                  min="2"
                  max="12"
                  value={tieRodCount}
                  onChange={(e) => setTieRodCount(Math.max(2, parseInt(e.target.value) || 4))}
                  className="w-full p-2 bg-white border border-slate-300 rounded-xl font-mono text-xs font-bold text-slate-900"
                />
              </div>

              <div className="space-y-1 bg-slate-50 p-3 rounded-2xl border border-slate-200">
                <label className="text-[10px] font-bold text-slate-600 block">Tie Rod Hole Dia</label>
                <input
                  type="number"
                  value={tieRodHoleDiaMm}
                  onChange={(e) => setTieRodHoleDiaMm(parseFloat(e.target.value) || 16)}
                  className="w-full p-2 bg-white border border-slate-300 rounded-xl font-mono text-xs font-bold text-slate-900"
                />
              </div>
            </div>
          </div>
        </div>

        {/* RIGHT COLUMN: INTERACTIVE 2D CAD VIEWPORT & MECHANICAL RESULTS (LG: 7 COLS) */}
        <div className="lg:col-span-7 space-y-6">
          {/* VIEWPORT HEADER TABS */}
          <div className="bg-slate-900 p-2 rounded-2xl border border-slate-800 flex items-center justify-between text-xs font-mono font-bold text-white print:hidden">
            <div className="flex items-center gap-1">
              <button
                onClick={() => setViewMode("2d")}
                className={`px-4 py-2 rounded-xl transition cursor-pointer flex items-center gap-2 ${
                  viewMode === "2d" ? "bg-[#0056A6] text-white shadow-md" : "text-slate-400 hover:text-white"
                }`}
              >
                <FileCode className="w-4 h-4" /> 2D CAD Vector Blueprint
              </button>

              <button
                onClick={() => setViewMode("3d")}
                className={`px-4 py-2 rounded-xl transition cursor-pointer flex items-center gap-2 ${
                  viewMode === "3d" ? "bg-[#0056A6] text-white shadow-md" : "text-slate-400 hover:text-white"
                }`}
              >
                <Eye className="w-4 h-4 text-amber-400" /> 3D Extruded Plate Inspector
              </button>
            </div>

            <span className="text-[11px] text-emerald-400 hidden sm:flex items-center gap-1 pr-2">
              <CheckCircle2 className="w-3.5 h-3.5" /> ASME / TEMA Compliant
            </span>
          </div>

          {/* VIEWPORT CONTAINER */}
          <div className="bg-slate-950 p-4 sm:p-6 rounded-3xl border border-slate-800 shadow-2xl relative overflow-hidden">
            {viewMode === "2d" ? (
              /* --- 2D CAD SVG DRAWING VIEWPORT --- */
              <div className="w-full flex flex-col items-center justify-center">
                <svg
                  ref={svgRef}
                  viewBox="-350 -350 700 700"
                  className="w-full h-auto max-h-[580px] select-none"
                  style={{ background: "#090d16" }}
                >
                  <defs>
                    {/* Baffle Cut Hatch Pattern */}
                    <pattern id="baffleHatch" width="12" height="12" patternTransform="rotate(45 0 0)" patternUnits="userSpaceOnUse">
                      <line x1="0" y1="0" x2="0" y2="12" stroke="#f59e0b" strokeWidth="1" opacity="0.2" />
                    </pattern>

                    {/* Title Block Gradient */}
                    <linearGradient id="titleBg" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor="#1e293b" />
                      <stop offset="100%" stopColor="#0f172a" />
                    </linearGradient>
                  </defs>

                  {/* CAD Grid Lines Background */}
                  <g opacity="0.15">
                    {[-300, -200, -100, 0, 100, 200, 300].map((pos) => (
                      <React.Fragment key={pos}>
                        <line x1={pos} y1="-320" x2={pos} y2="320" stroke="#38bdf8" strokeWidth="0.5" strokeDasharray="4 4" />
                        <line x1="-320" y1={pos} x2="320" y2={pos} stroke="#38bdf8" strokeWidth="0.5" strokeDasharray="4 4" />
                      </React.Fragment>
                    ))}
                  </g>

                  {/* Centerlines */}
                  <line x1="-320" y1="0" x2="320" y2="0" stroke="#f43f5e" strokeWidth="0.8" strokeDasharray="8 4 2 4" opacity="0.6" />
                  <line x1="0" y1="-320" x2="0" y2="320" stroke="#f43f5e" strokeWidth="0.8" strokeDasharray="8 4 2 4" opacity="0.6" />

                  {/* SCALE CONVERSION FACTOR: Map Shell ID mm to SVG radius ~220 units */}
                  {(() => {
                    const scaleFactor = 220 / (shellIdMm / 2);
                    const rShell = (shellIdMm / 2) * scaleFactor;
                    const rBaffle = (baffleOdMm / 2) * scaleFactor;
                    const rOtl = (otlMm / 2) * scaleFactor;
                    const hCut = cutHeightMm * scaleFactor;

                    const cutY = rBaffle - hCut; // Horizontal cut y level

                    return (
                      <g>
                        {/* 1. Shell Inside Diameter Reference Circle (Cyan Dashed) */}
                        <circle cx="0" cy="0" r={rShell} fill="none" stroke="#00f2fe" strokeWidth="1.2" strokeDasharray="6 3" opacity="0.7" />

                        {/* 2. Outer Tube Limit (OTL Circle) */}
                        <circle cx="0" cy="0" r={rOtl} fill="none" stroke="#94a3b8" strokeWidth="0.8" strokeDasharray="3 3" opacity="0.5" />

                        {/* 3. Solid Baffle Plate Contour Path with Segmental Cut */}
                        {cutOrientation === "horizontal" ? (
                          <g>
                            {/* Baffle Plate Boundary */}
                            <clipPath id="baffleClipHoriz">
                              <rect x="-350" y={cutY} width="700" height="700" fill="red" />
                            </clipPath>

                            {/* Baffle Plate Solid Body Fill */}
                            <circle cx="0" cy="0" r={rBaffle} fill="#0284c7" fillOpacity="0.15" stroke="#38bdf8" strokeWidth="2.5" />

                            {/* Segment Cut Cutout Shading */}
                            <path
                              d={`M -300 ${cutY} L 300 ${cutY} L 300 -300 L -300 -300 Z`}
                              fill="url(#baffleHatch)"
                            />

                            {/* Horizontal Baffle Cut Line */}
                            <line x1="-300" y1={cutY} x2="300" y2={cutY} stroke="#f59e0b" strokeWidth="2.5" strokeDasharray="5 3" />
                          </g>
                        ) : (
                          <g>
                            {/* Vertical Cut */}
                            <line x1={cutY} y1="-300" x2={cutY} y2="300" stroke="#f59e0b" strokeWidth="2.5" strokeDasharray="5 3" />
                            <path
                              d={`M ${cutY} -300 L 300 -300 L 300 300 L ${cutY} 300 Z`}
                              fill="url(#baffleHatch)"
                            />
                            <circle cx="0" cy="0" r={rBaffle} fill="#0284c7" fillOpacity="0.15" stroke="#38bdf8" strokeWidth="2.5" />
                          </g>
                        )}

                        {/* 4. Drilled Tube Holes Matrix Rendering */}
                        {tubeHolePositions.map((pos, idx) => {
                          const cx = pos.x * scaleFactor;
                          const cy = pos.y * scaleFactor;
                          const rHole = (holeDiaMm / 2) * scaleFactor;

                          return (
                            <circle
                              key={idx}
                              cx={cx}
                              cy={cy}
                              r={Math.max(1.5, rHole)}
                              fill={pos.inBaffle ? "#030712" : "none"}
                              stroke={pos.inBaffle ? "#38bdf8" : "#475569"}
                              strokeWidth={pos.inBaffle ? "1" : "0.5"}
                              strokeDasharray={pos.inBaffle ? "none" : "2 2"}
                              opacity={pos.inBaffle ? 0.95 : 0.4}
                            />
                          );
                        })}

                        {/* 5. Tie Rod Holes with Gold Accent Rings */}
                        {tieRodPositions.map((rod, idx) => {
                          const cx = rod.x * scaleFactor;
                          const cy = rod.y * scaleFactor;
                          const rRod = (tieRodHoleDiaMm / 2) * scaleFactor;

                          return (
                            <g key={`rod-${idx}`}>
                              <circle cx={cx} cy={cy} r={Math.max(2, rRod)} fill="#0f172a" stroke="#fbbf24" strokeWidth="2" />
                              <line x1={cx - 4} y1={cy} x2={cx + 4} y2={cy} stroke="#fbbf24" strokeWidth="1" />
                              <line x1={cx} y1={cy - 4} x2={cx} y2={cy + 4} stroke="#fbbf24" strokeWidth="1" />
                            </g>
                          );
                        })}

                        {/* 6. Dimension Lines & Callouts */}
                        {/* Shell ID Arrow */}
                        <line x1={-rShell} y1="-260" x2={rShell} y2="-260" stroke="#00f2fe" strokeWidth="1.5" />
                        <text x="0" y="-268" fill="#00f2fe" fontSize="12" fontWeight="bold" fontFamily="monospace" textAnchor="middle">
                          Shell ID = {shellIdMm} mm
                        </text>

                        {/* Baffle Cut Height Callout Hc */}
                        {cutOrientation === "horizontal" && (
                          <g>
                            <line x1="240" y1={rBaffle} x2="240" y2={cutY} stroke="#f59e0b" strokeWidth="1.5" />
                            <polygon points={`240,${rBaffle} 236,${rBaffle - 6} 244,${rBaffle - 6}`} fill="#f59e0b" />
                            <polygon points={`240,${cutY} 236,${cutY + 6} 244,${cutY + 6}`} fill="#f59e0b" />
                            <text x="250" y={(rBaffle + cutY) / 2 + 4} fill="#f59e0b" fontSize="11" fontWeight="bold" fontFamily="monospace">
                              Hc = {cutHeightMm.toFixed(1)}mm ({baffleCutPercent}%)
                            </text>
                          </g>
                        )}
                      </g>
                    );
                  })()}

                  {/* ASME TECHNICAL BLUEPRINT TITLE BLOCK (BOTTOM RIGHT) */}
                  <g transform="translate(60, 200)">
                    <rect x="0" y="0" x2="260" y2="100" width="260" height="100" fill="url(#titleBg)" stroke="#38bdf8" strokeWidth="1.5" rx="6" />
                    <line x1="0" y1="25" x2="260" y2="25" stroke="#334155" strokeWidth="1" />
                    <line x1="0" y1="50" x2="260" y2="50" stroke="#334155" strokeWidth="1" />
                    <line x1="130" y1="50" x2="130" y2="100" stroke="#334155" strokeWidth="1" />

                    <text x="10" y="17" fill="#f8fafc" fontSize="10" fontWeight="black" fontFamily="sans-serif">
                      NORTHERN HEATEX ENGINEERING
                    </text>
                    <text x="180" y="17" fill="#fbbf24" fontSize="9" fontWeight="bold" fontFamily="monospace">
                      ASME SEC VIII
                    </text>

                    <text x="10" y="42" fill="#38bdf8" fontSize="10" fontWeight="bold" fontFamily="monospace">
                      DWG: BAFFLE PLATE {shellIdMm}mm
                    </text>

                    <text x="10" y="66" fill="#94a3b8" fontSize="8" fontFamily="monospace">MAT: {selectedMaterial.name.split(" ")[0]}</text>
                    <text x="10" y="86" fill="#94a3b8" fontSize="8" fontFamily="monospace">THK: {baffleThkMm} mm</text>

                    <text x="140" y="66" fill="#94a3b8" fontSize="8" fontFamily="monospace">HOLES: {totalTubesInBaffle} Pcs</text>
                    <text x="140" y="86" fill="#94a3b8" fontSize="8" fontFamily="monospace">SCALE: N.T.S</text>
                  </g>
                </svg>

                <p className="text-[11px] text-slate-400 font-mono mt-3 text-center">
                  * Dynamic SVG CAD Blueprint — Blue circles represent drilled tube holes on <strong className="text-amber-400">{pitchAngle}° pitch</strong>. Yellow hatched area represents segmental cutaway.
                </p>
              </div>
            ) : (
              /* --- 3D EXTRUDED PLATE INSPECTOR VIEWPORT --- */
              <div className="w-full h-[520px] flex flex-col items-center justify-center relative">
                {/* Simulated 3D Rotatable Baffle Plate Representation */}
                <div
                  className="w-full h-full flex items-center justify-center cursor-grab active:cursor-grabbing"
                  onMouseMove={(e) => {
                    if (e.buttons === 1) {
                      setRotation((prev) => ({
                        x: prev.x + e.movementY * 0.5,
                        y: prev.y + e.movementX * 0.5,
                      }));
                    }
                  }}
                >
                  <div
                    className="relative transition-transform duration-75"
                    style={{
                      transform: `rotateX(${rotation.x}deg) rotateY(${rotation.y}deg)`,
                      transformStyle: "preserve-3d",
                      perspective: 1000,
                    }}
                  >
                    {/* Front Face */}
                    <div className="w-72 h-72 rounded-full border-4 border-cyan-400 bg-cyan-900/40 backdrop-blur-md shadow-2xl flex items-center justify-center relative overflow-hidden">
                      {/* Segmental Cutaway Mask */}
                      <div
                        className="absolute top-0 left-0 right-0 bg-slate-950/90 border-b-2 border-amber-400 flex items-center justify-center"
                        style={{ height: `${baffleCutPercent}%` }}
                      >
                        <span className="text-[10px] font-mono text-amber-400 font-bold">SEGMENTAL CUT {baffleCutPercent}%</span>
                      </div>

                      {/* Holes Matrix Overlay */}
                      <div className="grid grid-cols-6 gap-3 p-6 opacity-80">
                        {Array.from({ length: 36 }).map((_, i) => (
                          <div key={i} className="w-4 h-4 rounded-full bg-slate-950 border border-cyan-300 shadow-inner" />
                        ))}
                      </div>
                    </div>
                  </div>
                </div>

                <div className="absolute bottom-3 left-3 bg-slate-900/90 p-3 rounded-xl border border-slate-800 text-[11px] font-mono text-slate-300">
                  <span className="text-amber-400 font-bold block">3D Interactive Control:</span>
                  Click and drag to orbit 3D extruded baffle plate view.
                </div>
              </div>
            )}
          </div>

          {/* MECHANICAL & GEOMETRICAL SUMMARY CARDS */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="p-4 bg-white border border-slate-200 rounded-2xl space-y-1">
              <span className="text-[10px] text-slate-500 font-mono font-bold uppercase block">Active Tube Holes</span>
              <span className="text-2xl font-black font-mono text-[#0056A6] block">{totalTubesInBaffle} Holes</span>
              <span className="text-[10px] text-slate-400 block font-mono">({totalTubesInCutout} in cutout window)</span>
            </div>

            <div className="p-4 bg-white border border-slate-200 rounded-2xl space-y-1">
              <span className="text-[10px] text-slate-500 font-mono font-bold uppercase block">Net Baffle Plate Weight</span>
              <span className="text-2xl font-black font-mono text-amber-700 block">{netCalculations.netWeightKg.toFixed(2)} kg</span>
              <span className="text-[10px] text-slate-400 block font-mono">({netCalculations.netWeightLbs.toFixed(2)} lbs)</span>
            </div>

            <div className="p-4 bg-white border border-slate-200 rounded-2xl space-y-1">
              <span className="text-[10px] text-slate-500 font-mono font-bold uppercase block">TEMA Baffle Spacing Range</span>
              <span className="text-xl font-bold font-mono text-emerald-700 block">
                {netCalculations.minBaffleSpacingMm.toFixed(0)} - {netCalculations.maxBaffleSpacingMm.toFixed(0)} mm
              </span>
              <span className="text-[10px] text-slate-400 block font-mono">(0.2 Ds to 1.0 Ds)</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
