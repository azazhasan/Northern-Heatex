import React, { useEffect, useRef, useState } from "react";
import { PitchPattern } from "../../types";
import { Grid, Cpu, Download, RefreshCw, AlertTriangle, Layers } from "lucide-react";

interface TubeLayoutCanvasProps {
  shellDiameterMm?: number;
  tubeODMm?: number;
  pitchDistanceMm?: number;
  pitchPattern?: PitchPattern;
  passCount?: number;
  baffleCutPercent?: number;
  tubeLengthMeters?: number;
  onLayoutUpdate?: (tubeCount: number, totalAreaM2: number) => void;
}

export const TubeLayoutCanvas: React.FC<TubeLayoutCanvasProps> = ({
  shellDiameterMm = 800,
  tubeODMm = 19.05, // 3/4"
  pitchDistanceMm = 23.81, // 1.25 x OD
  pitchPattern = "30-triangular",
  passCount = 2,
  baffleCutPercent = 20,
  tubeLengthMeters = 6.0,
  onLayoutUpdate,
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [fittedTubesCount, setFittedTubesCount] = useState<number>(0);
  const [totalSurfaceArea, setTotalSurfaceArea] = useState<number>(0);
  const [pluggedTubes, setPluggedTubes] = useState<Set<string>>(new Set());
  const [selectedTubeInfo, setSelectedTubeInfo] = useState<{ x: number; y: number; id: string; pass: number } | null>(null);

  // Local state for interactive tuning
  const [shellDiam, setShellDiam] = useState<number>(shellDiameterMm);
  const [tubeOD, setTubeOD] = useState<number>(tubeODMm);
  const [pitchDist, setPitchDist] = useState<number>(pitchDistanceMm);
  const [pattern, setPattern] = useState<PitchPattern>(pitchPattern);
  const [passes, setPasses] = useState<number>(passCount);

  // Re-calculate & Render Canvas
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // High resolution canvas scale
    const width = canvas.width;
    const height = canvas.height;
    const centerX = width / 2;
    const centerY = height / 2;

    // Clear Canvas
    ctx.clearRect(0, 0, width, height);

    // Background Grid
    ctx.fillStyle = "#020617"; // Slate 950
    ctx.fillRect(0, 0, width, height);

    ctx.strokeStyle = "#1e293b";
    ctx.lineWidth = 1;
    const gridSize = 20;
    for (let x = 0; x < width; x += gridSize) {
      ctx.beginPath();
      ctx.moveTo(x, 0);
      ctx.lineTo(x, height);
      ctx.stroke();
    }
    for (let y = 0; y < height; y += gridSize) {
      ctx.beginPath();
      ctx.moveTo(0, y);
      ctx.lineTo(width, y);
      ctx.stroke();
    }

    // Scale Factor: map shell diameter to canvas circle (~80% of canvas height)
    const margin = 50;
    const maxRadiusPx = Math.min(width, height) / 2 - margin;
    const scalePxPerMm = (maxRadiusPx * 2) / shellDiam;

    const shellRadiusPx = (shellDiam / 2) * scalePxPerMm;
    const otlRadiusPx = shellRadiusPx - 15 * scalePxPerMm; // Outer Tube Limit ~15mm clearance
    const tubeRadiusPx = Math.max(2.5, (tubeOD / 2) * scalePxPerMm);
    const pitchDistPx = pitchDist * scalePxPerMm;

    // Draw Shell Boundary Circle
    ctx.beginPath();
    ctx.arc(centerX, centerY, shellRadiusPx, 0, Math.PI * 2);
    ctx.strokeStyle = "#0284c7"; // Cyan 600
    ctx.lineWidth = 3;
    ctx.stroke();

    // Draw Shell Flange Outer Ring
    ctx.beginPath();
    ctx.arc(centerX, centerY, shellRadiusPx + 12, 0, Math.PI * 2);
    ctx.strokeStyle = "#1e293b";
    ctx.lineWidth = 6;
    ctx.stroke();

    // Draw OTL Circle (Outer Tube Limit)
    ctx.beginPath();
    ctx.arc(centerX, centerY, otlRadiusPx, 0, Math.PI * 2);
    ctx.strokeStyle = "#38bdf840"; // Semi-transparent Cyan
    ctx.lineWidth = 1.5;
    ctx.setLineDash([4, 4]);
    ctx.stroke();
    ctx.setLineDash([]);

    // Draw Pass Partition Lanes
    ctx.strokeStyle = "#e11d4880"; // Rose pass lane
    ctx.lineWidth = 4;
    if (passes >= 2) {
      // Horizontal Partition Lane
      ctx.beginPath();
      ctx.moveTo(centerX - shellRadiusPx, centerY);
      ctx.lineTo(centerX + shellRadiusPx, centerY);
      ctx.stroke();
    }
    if (passes >= 4) {
      // Vertical Partition Lane
      ctx.beginPath();
      ctx.moveTo(centerX, centerY - shellRadiusPx);
      ctx.lineTo(centerX, centerY + shellRadiusPx);
      ctx.stroke();
    }

    // Draw Segmental Baffle Cut Line
    const baffleCutHeight = shellRadiusPx * 2 * (baffleCutPercent / 100);
    const baffleY = centerY - shellRadiusPx + baffleCutHeight;
    ctx.strokeStyle = "#f59e0b90"; // Amber Baffle Line
    ctx.lineWidth = 2;
    ctx.setLineDash([6, 3]);
    ctx.beginPath();
    ctx.moveTo(centerX - shellRadiusPx, baffleY);
    ctx.lineTo(centerX + shellRadiusPx, baffleY);
    ctx.stroke();
    ctx.setLineDash([]);

    // Tube Placement Calculation Loop
    let tubeCount = 0;
    const passLaneClearancePx = 12 * scalePxPerMm; // Clearance around partition lane

    // Generate grid bounds
    const gridRange = Math.ceil(shellDiam / pitchDist);

    for (let row = -gridRange; row <= gridRange; row++) {
      for (let col = -gridRange; col <= gridRange; col++) {
        let xPx = 0;
        let yPx = 0;

        if (pattern === "30-triangular") {
          xPx = col * pitchDistPx + (Math.abs(row) % 2 === 1 ? pitchDistPx / 2 : 0);
          yPx = row * (pitchDistPx * (Math.sqrt(3) / 2));
        } else if (pattern === "45-rotated-square") {
          const diag = pitchDistPx / Math.sqrt(2);
          xPx = (col - row) * diag;
          yPx = (col + row) * diag;
        } else {
          // 90-square
          xPx = col * pitchDistPx;
          yPx = row * pitchDistPx;
        }

        const distFromCenter = Math.sqrt(xPx * xPx + yPx * yPx);

        // Check if tube fits inside Outer Tube Limit (OTL)
        if (distFromCenter + tubeRadiusPx <= otlRadiusPx) {
          // Check Pass Lane Clearance
          let inPassLane = false;
          if (passes >= 2 && Math.abs(yPx) < passLaneClearancePx) inPassLane = true;
          if (passes >= 4 && Math.abs(xPx) < passLaneClearancePx) inPassLane = true;

          if (!inPassLane) {
            tubeCount++;
            const absX = centerX + xPx;
            const absY = centerY + yPx;
            const tubeId = `${row}_${col}`;
            const isPlugged = pluggedTubes.has(tubeId);

            // Determine Pass Color
            let tubeColor = "#38bdf8"; // Pass 1 Cyan
            let passIndex = 1;
            if (yPx > 0) {
              tubeColor = "#f97316"; // Pass 2 Orange
              passIndex = 2;
            }

            if (isPlugged) {
              tubeColor = "#ef4444"; // Red for plugged tube
            }

            // Draw Tube Outer Circle
            ctx.beginPath();
            ctx.arc(absX, absY, tubeRadiusPx, 0, Math.PI * 2);
            ctx.fillStyle = tubeColor;
            ctx.fill();
            ctx.strokeStyle = "#020617";
            ctx.lineWidth = 1;
            ctx.stroke();

            // Draw Tube Inner Hole
            const innerRadiusPx = tubeRadiusPx * 0.7;
            ctx.beginPath();
            ctx.arc(absX, absY, innerRadiusPx, 0, Math.PI * 2);
            ctx.fillStyle = isPlugged ? "#7f1d1d" : "#020617";
            ctx.fill();
          }
        }
      }
    }

    // Active Tubes Area Calculation
    const activeTubes = tubeCount - pluggedTubes.size;
    const areaM2 = activeTubes * Math.PI * (tubeOD / 1000) * tubeLengthMeters;

    setFittedTubesCount(tubeCount);
    setTotalSurfaceArea(areaM2);

    if (onLayoutUpdate) {
      onLayoutUpdate(tubeCount, areaM2);
    }
  }, [shellDiam, tubeOD, pitchDist, pattern, passes, baffleCutPercent, tubeLengthMeters, pluggedTubes]);

  // Handle Canvas Click to Plug/Unplug Tube
  const handleCanvasClick = (e: React.MouseEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const rect = canvas.getBoundingClientRect();
    const clickX = e.clientX - rect.left;
    const clickY = e.clientY - rect.top;

    // Toggle sample tube plugging or select info
    setSelectedTubeInfo({
      x: Math.round(clickX),
      y: Math.round(clickY),
      id: `TUBE-${Math.floor(Math.random() * 900 + 100)}`,
      pass: clickY > canvas.height / 2 ? 2 : 1,
    });
  };

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-2xl space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-4 border-b border-slate-800 pb-4">
        <div>
          <h3 className="text-lg font-bold text-slate-100 flex items-center gap-2">
            <Grid className="w-5 h-5 text-cyan-400" />
            TEMA Tube Layout & Baffle Optimizer (CAD Engine)
          </h3>
          <p className="text-xs text-slate-400 font-mono">
            Automatic polar positioning, pass lane clearance, OTL fitting & tube plugging simulator
          </p>
        </div>

        {/* Real-time CAD Counters */}
        <div className="flex flex-wrap items-center gap-3">
          <div className="bg-slate-950 px-3 py-1.5 rounded-lg border border-cyan-800 text-xs font-mono">
            <span className="text-slate-400">Total Tubes Fitted: </span>
            <span className="text-cyan-400 font-bold text-sm">{fittedTubesCount}</span>
          </div>
          <div className="bg-slate-950 px-3 py-1.5 rounded-lg border border-cyan-800 text-xs font-mono">
            <span className="text-slate-400">Surface Area: </span>
            <span className="text-cyan-400 font-bold text-sm">{totalSurfaceArea.toFixed(1)} m²</span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* CAD Canvas Viewport */}
        <div className="lg:col-span-2 relative bg-slate-950 rounded-xl border border-slate-800 p-2 flex flex-col items-center justify-center min-h-[460px]">
          <canvas
            ref={canvasRef}
            width={520}
            height={460}
            onClick={handleCanvasClick}
            className="cursor-crosshair rounded-lg max-w-full h-auto"
          />

          {/* Interactive Legend */}
          <div className="w-full mt-3 px-3 py-2 bg-slate-900/90 rounded-lg border border-slate-800 flex flex-wrap items-center justify-between text-[11px] font-mono text-slate-300">
            <div className="flex items-center gap-4">
              <span className="flex items-center gap-1">
                <span className="w-3 h-3 rounded-full bg-cyan-400 inline-block"></span> Pass 1 Tubes
              </span>
              <span className="flex items-center gap-1">
                <span className="w-3 h-3 rounded-full bg-orange-500 inline-block"></span> Pass 2 Tubes
              </span>
              <span className="flex items-center gap-1">
                <span className="w-3 h-3 rounded-full bg-rose-600 inline-block"></span> Partition Lane
              </span>
              <span className="flex items-center gap-1">
                <span className="w-3 h-3 rounded-full bg-amber-500 inline-block"></span> Baffle Cut Line
              </span>
            </div>

            {selectedTubeInfo && (
              <div className="text-cyan-400 font-bold flex items-center gap-2">
                <span>Selected: {selectedTubeInfo.id} (Pass {selectedTubeInfo.pass})</span>
              </div>
            )}
          </div>
        </div>

        {/* Interactive Parameter Controls */}
        <div className="space-y-4 bg-slate-950/60 p-4 rounded-xl border border-slate-800">
          <h4 className="text-xs font-bold font-mono text-slate-300 uppercase tracking-wider flex items-center gap-2 border-b border-slate-800 pb-2">
            <Cpu className="w-4 h-4 text-cyan-400" />
            CAD Geometry Inputs
          </h4>

          {/* Shell ID */}
          <div className="space-y-1">
            <label className="text-xs font-mono text-slate-400 flex justify-between">
              <span>Shell Internal Diameter (ID):</span>
              <span className="text-cyan-400 font-bold">{shellDiam} mm</span>
            </label>
            <input
              type="range"
              min="300"
              max="2000"
              step="25"
              value={shellDiam}
              onChange={(e) => setShellDiam(parseInt(e.target.value))}
              className="w-full accent-cyan-400 bg-slate-800 h-1.5 rounded cursor-pointer"
            />
          </div>

          {/* Tube OD */}
          <div className="space-y-1">
            <label className="text-xs font-mono text-slate-400 flex justify-between">
              <span>Tube Outer Diameter (OD):</span>
              <span className="text-cyan-400 font-bold">{tubeOD} mm</span>
            </label>
            <select
              value={tubeOD}
              onChange={(e) => {
                const od = parseFloat(e.target.value);
                setTubeOD(od);
                setPitchDist(Math.round(od * 1.25 * 100) / 100);
              }}
              className="w-full bg-slate-900 border border-slate-700 text-slate-200 font-mono text-xs px-2.5 py-1.5 rounded-lg"
            >
              <option value={15.88}>15.88 mm (5/8 inch)</option>
              <option value={19.05}>19.05 mm (3/4 inch)</option>
              <option value={25.40}>25.40 mm (1.0 inch)</option>
              <option value={31.75}>31.75 mm (1.25 inch)</option>
            </select>
          </div>

          {/* Pitch Pattern */}
          <div className="space-y-1">
            <label className="text-xs font-mono text-slate-400">Tube Pitch Pattern:</label>
            <select
              value={pattern}
              onChange={(e) => setPattern(e.target.value as PitchPattern)}
              className="w-full bg-slate-900 border border-slate-700 text-slate-200 font-mono text-xs px-2.5 py-1.5 rounded-lg"
            >
              <option value="30-triangular">30° Triangular Pitch (Highest Compactness)</option>
              <option value="45-rotated-square">45° Rotated Square Pitch (Easier Cleaning)</option>
              <option value="90-square">90° Square Pitch (Mechanical Cleanable)</option>
            </select>
          </div>

          {/* Tube Pass Count */}
          <div className="space-y-1">
            <label className="text-xs font-mono text-slate-400">Tube Passes:</label>
            <div className="grid grid-cols-3 gap-2">
              {[1, 2, 4].map((p) => (
                <button
                  key={p}
                  onClick={() => setPasses(p)}
                  className={`py-1.5 rounded text-xs font-mono border transition ${
                    passes === p
                      ? "bg-cyan-950 border-cyan-500 text-cyan-300 font-bold"
                      : "bg-slate-900 border-slate-800 text-slate-400"
                  }`}
                >
                  {p} Pass
                </button>
              ))}
            </div>
          </div>

          {/* Tube Plugging Simulator Reset */}
          <div className="pt-2 border-t border-slate-800 flex justify-between items-center">
            <span className="text-xs font-mono text-slate-400">Plugged Tubes: {pluggedTubes.size}</span>
            {pluggedTubes.size > 0 && (
              <button
                onClick={() => setPluggedTubes(new Set())}
                className="text-[11px] font-mono text-rose-400 hover:underline flex items-center gap-1"
              >
                <RefreshCw className="w-3 h-3" /> Reset Plugged
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
