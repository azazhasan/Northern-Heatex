/**
 * Northern HeatEx Engineering Ecosystem (NHEE)
 * Service Layer: DXF (Drawing Exchange Format) CAD File Generator
 * 
 * Generates industry-standard ASCII DXF files compatible with AutoCAD, SolidWorks,
 * Inventor, and Rhino for Heat Exchanger Tubesheets and Longitudinal Shell Elevations.
 */

import { HeatExchangerDesign } from "../types";

export interface DXFOptions {
  includeDimensions?: boolean;
  includeGrid?: boolean;
  viewType?: "tubesheet" | "elevation" | "combined";
  units?: "mm" | "inches";
}

/**
 * Calculates tube coordinates in mm relative to center (0,0)
 */
export function calculateTubePositions(design: HeatExchangerDesign): Array<{ x: number; y: number; pass: number }> {
  const { shellDiameter, tubeOD, pitchDistance, pitchPattern, passCount } = design;
  const otlRadius = shellDiameter / 2 - 15; // Outer Tube Limit clearance
  const tubeRadius = tubeOD / 2;
  const passLaneClearance = passCount > 1 ? 12 : 0;
  const gridRange = Math.ceil(shellDiameter / pitchDistance);

  const tubes: Array<{ x: number; y: number; pass: number }> = [];

  for (let row = -gridRange; row <= gridRange; row++) {
    for (let col = -gridRange; col <= gridRange; col++) {
      let x = 0;
      let y = 0;

      if (pitchPattern === "30-triangular") {
        x = col * pitchDistance + (Math.abs(row) % 2 === 1 ? pitchDistance / 2 : 0);
        y = row * (pitchDistance * (Math.sqrt(3) / 2));
      } else if (pitchPattern === "45-rotated-square") {
        const diag = pitchDistance / Math.sqrt(2);
        x = (col - row) * diag;
        y = (col + row) * diag;
      } else {
        // 90-square
        x = col * pitchDistance;
        y = row * pitchDistance;
      }

      const dist = Math.sqrt(x * x + y * y);

      if (dist + tubeRadius <= otlRadius) {
        let inPassLane = false;
        if (passCount >= 2 && Math.abs(y) < passLaneClearance) inPassLane = true;
        if (passCount >= 4 && Math.abs(x) < passLaneClearance) inPassLane = true;

        if (!inPassLane) {
          const pass = y <= 0 ? 1 : 2;
          tubes.push({ x: Number(x.toFixed(3)), y: Number(y.toFixed(3)), pass });
        }
      }
    }
  }

  return tubes;
}

/**
 * DXF Generator Core Service
 */
export class DXFExportService {
  /**
   * Generates ASCII DXF string content for a Heat Exchanger Design
   */
  public static generateDXF(design: HeatExchangerDesign, options: DXFOptions = {}): string {
    const { viewType = "combined", includeDimensions = true } = options;

    let dxf = "";

    // 1. HEADER SECTION
    dxf += "0\nSECTION\n2\nHEADER\n";
    dxf += "9\n$ACADVER\n1\nAC1009\n"; // AutoCAD R12 ASCII compatibility for maximum software support
    dxf += "9\n$INSBASE\n10\n0.0\n20\n0.0\n30\n0.0\n";
    dxf += "9\n$EXTMIN\n10\n-2000.0\n20\n-2000.0\n30\n0.0\n";
    dxf += "9\n$EXTMAX\n10\n10000.0\n20\n4000.0\n30\n0.0\n";
    dxf += "0\nENDSEC\n";

    // 2. TABLES SECTION (Layer definitions)
    dxf += "0\nSECTION\n2\nTABLES\n";
    dxf += "0\nTABLE\n2\nLAYER\n70\n6\n";

    // Define standard CAD layers with colors
    const layers = [
      { name: "0", color: 7 }, // White/Black default
      { name: "SHELL_OUTLINE", color: 2 }, // Yellow
      { name: "TUBES", color: 4 }, // Cyan
      { name: "BAFFLES", color: 1 }, // Red
      { name: "NOZZLES", color: 3 }, // Green
      { name: "CENTERLINES", color: 5 }, // Blue
      { name: "DIMENSIONS", color: 6 }, // Magenta
      { name: "ANNOTATIONS", color: 7 }, // White
    ];

    layers.forEach((l) => {
      dxf += `0\nLAYER\n2\n${l.name}\n70\n0\n62\n${l.color}\n6\nCONTINUOUS\n`;
    });

    dxf += "0\nENDTAB\n0\nENDSEC\n";

    // 3. BLOCKS SECTION
    dxf += "0\nSECTION\n2\nBLOCKS\n0\nENDSEC\n";

    // 4. ENTITIES SECTION
    dxf += "0\nSECTION\n2\nENTITIES\n";

    if (viewType === "tubesheet" || viewType === "combined") {
      dxf += this.generateTubesheetEntities(design, 0, 0, includeDimensions);
    }

    if (viewType === "elevation" || viewType === "combined") {
      // Offset elevation view to the right in CAD space
      const offsetX = viewType === "combined" ? design.shellDiameter * 2.2 + 800 : 0;
      dxf += this.generateElevationEntities(design, offsetX, 0, includeDimensions);
    }

    // Title Block
    dxf += this.generateTitleBlock(design, options);

    dxf += "0\nENDSEC\n";

    // 5. END OF FILE
    dxf += "0\nEOF\n";

    return dxf;
  }

  /**
   * Generates Tubesheet CAD entities (Shell Circle, OTL, Tubes, Pass Partition, Baffle Cut)
   */
  private static generateTubesheetEntities(
    design: HeatExchangerDesign,
    cx: number,
    cy: number,
    includeDimensions: boolean
  ): string {
    let e = "";
    const tubes = calculateTubePositions(design);

    // Shell Outer Diameter Circle
    const shellR = design.shellDiameter / 2;
    e += this.dxfCircle(cx, cy, shellR, "SHELL_OUTLINE");

    // Shell Outer Flange Ring
    e += this.dxfCircle(cx, cy, shellR + 60, "SHELL_OUTLINE");

    // Outer Tube Limit (OTL) Circle
    const otlR = shellR - 15;
    e += this.dxfCircle(cx, cy, otlR, "CENTERLINES");

    // Tubes
    const tubeR = design.tubeOD / 2;
    const innerTubeR = tubeR - design.tubeWallThickness;

    tubes.forEach((t) => {
      const tx = cx + t.x;
      const ty = cy + t.y;
      // Outer Tube Circle
      e += this.dxfCircle(tx, ty, tubeR, "TUBES");
      // Inner Tube Circle
      e += this.dxfCircle(tx, ty, innerTubeR, "TUBES");
    });

    // Pass Partition Lane Line
    if (design.passCount >= 2) {
      e += this.dxfLine(cx - shellR - 40, cy, cx + shellR + 40, cy, "BAFFLES");
    }

    // Centerlines
    e += this.dxfLine(cx - shellR - 100, cy, cx + shellR + 100, cy, "CENTERLINES");
    e += this.dxfLine(cx, cy - shellR - 100, cx, cy + shellR + 100, "CENTERLINES");

    // Baffle Cut Line
    const baffleCutHeight = design.shellDiameter * (design.baffleCutPercent / 100);
    const baffleY = cy + shellR - baffleCutHeight;
    e += this.dxfLine(cx - shellR, baffleY, cx + shellR, baffleY, "BAFFLES");

    // Text Annotations
    e += this.dxfText(cx, cy - shellR - 160, `TUBESHEET LAYOUT - SHELL ID: ${design.shellDiameter}mm`, 25, "ANNOTATIONS");
    e += this.dxfText(
      cx,
      cy - shellR - 200,
      `TUBE COUNT: ${tubes.length} | OD: ${design.tubeOD}mm | PITCH: ${design.pitchDistance}mm (${design.pitchPattern})`,
      18,
      "ANNOTATIONS"
    );

    if (includeDimensions) {
      // Shell ID Dimension Text
      e += this.dxfText(cx + shellR + 20, cy + 20, `Ø ${design.shellDiameter} mm Shell ID`, 18, "DIMENSIONS");
      e += this.dxfLine(cx, cy, cx + shellR, cy, "DIMENSIONS");
    }

    return e;
  }

  /**
   * Generates Longitudinal Shell Elevation Entities
   */
  private static generateElevationEntities(
    design: HeatExchangerDesign,
    ox: number,
    oy: number,
    includeDimensions: boolean
  ): string {
    let e = "";
    const L = design.tubeLength;
    const D = design.shellDiameter;
    const R = D / 2;

    // Shell Cylinder Rectangle
    e += this.dxfLine(ox, oy - R, ox + L, oy - R, "SHELL_OUTLINE"); // Top Shell Line
    e += this.dxfLine(ox, oy + R, ox + L, oy + R, "SHELL_OUTLINE"); // Bottom Shell Line

    // Tubesheets (Front & Rear)
    const tsThick = 50;
    e += this.dxfRect(ox - tsThick, oy - R - 40, tsThick, D + 80, "SHELL_OUTLINE"); // Front Tubesheet
    e += this.dxfRect(ox + L, oy - R - 40, tsThick, D + 80, "SHELL_OUTLINE"); // Rear Tubesheet

    // Front Channel Bonnet / Head
    const headLength = 400;
    e += this.dxfLine(ox - tsThick, oy - R, ox - tsThick - headLength, oy - R, "SHELL_OUTLINE");
    e += this.dxfLine(ox - tsThick, oy + R, ox - tsThick - headLength, oy + R, "SHELL_OUTLINE");
    e += this.dxfLine(
      ox - tsThick - headLength,
      oy - R,
      ox - tsThick - headLength,
      oy + R,
      "SHELL_OUTLINE"
    ); // Front Cover Plate

    // Rear Channel Head
    e += this.dxfLine(ox + L + tsThick, oy - R, ox + L + tsThick + headLength, oy - R, "SHELL_OUTLINE");
    e += this.dxfLine(ox + L + tsThick, oy + R, ox + L + tsThick + headLength, oy + R, "SHELL_OUTLINE");
    e += this.dxfLine(
      ox + L + tsThick + headLength,
      oy - R,
      ox + L + tsThick + headLength,
      oy + R,
      "SHELL_OUTLINE"
    );

    // Baffle Plates
    const numBaffles = Math.max(3, Math.floor(L / design.baffleSpacing));
    const baffleCutH = D * (design.baffleCutPercent / 100);

    for (let i = 1; i <= numBaffles; i++) {
      const bx = ox + i * design.baffleSpacing;
      if (bx < ox + L - 100) {
        if (i % 2 === 1) {
          // Baffle attached to top
          e += this.dxfLine(bx, oy - R, bx, oy + R - baffleCutH, "BAFFLES");
        } else {
          // Baffle attached to bottom
          e += this.dxfLine(bx, oy - R + baffleCutH, bx, oy + R, "BAFFLES");
        }
      }
    }

    // Nozzles
    const nozzleH = 200;
    const nozzleW = 150;

    // Shell Inlet Nozzle (Top Left)
    e += this.dxfRect(ox + 300, oy - R - nozzleH, nozzleW, nozzleH, "NOZZLES");
    e += this.dxfRect(ox + 300 - 20, oy - R - nozzleH, nozzleW + 40, 30, "NOZZLES"); // Flange

    // Shell Outlet Nozzle (Bottom Right)
    e += this.dxfRect(ox + L - 450, oy + R, nozzleW, nozzleH, "NOZZLES");
    e += this.dxfRect(ox + L - 450 - 20, oy + R + nozzleH - 30, nozzleW + 40, 30, "NOZZLES");

    // Centerline
    e += this.dxfLine(ox - headLength - 100, oy, ox + L + headLength + 100, oy, "CENTERLINES");

    // Annotations
    e += this.dxfText(
      ox + L / 2,
      oy - R - nozzleH - 100,
      `LONGITUDINAL ELEVATION VIEW - TEMA TYPE ${design.temaType}`,
      25,
      "ANNOTATIONS"
    );

    if (includeDimensions) {
      e += this.dxfText(ox + L / 2, oy + R + nozzleH + 80, `TUBE LENGTH = ${L} mm`, 20, "DIMENSIONS");
      e += this.dxfLine(ox, oy + R + nozzleH + 40, ox + L, oy + R + nozzleH + 40, "DIMENSIONS");
    }

    return e;
  }

  /**
   * Title Block CAD Border
   */
  private static generateTitleBlock(design: HeatExchangerDesign, options: DXFOptions): string {
    let e = "";
    const bx = -500;
    const by = -1500;

    e += this.dxfRect(bx, by, 4500, 300, "ANNOTATIONS");
    e += this.dxfText(bx + 50, by + 200, "NORTHERN HEATEX CORPORATION - HARIDWAR WORKS, INDIA", 28, "ANNOTATIONS");
    e += this.dxfText(
      bx + 50,
      by + 120,
      `PROJECT: ${design.title} | CLIENT: ${design.clientName} | TEMA: ${design.temaType}`,
      20,
      "ANNOTATIONS"
    );
    e += this.dxfText(
      bx + 50,
      by + 50,
      `DESIGN PRESS (S/T): ${design.designPressureShell}/${design.designPressureTube} bar | TEMP: ${design.designTempShell}/${design.designTempTube}°C`,
      16,
      "ANNOTATIONS"
    );

    return e;
  }

  // --- Helper primitives ---

  private static dxfCircle(cx: number, cy: number, r: number, layer: string): string {
    return `0\nCIRCLE\n8\n${layer}\n10\n${cx.toFixed(3)}\n20\n${cy.toFixed(3)}\n30\n0.0\n40\n${r.toFixed(3)}\n`;
  }

  private static dxfLine(x1: number, y1: number, x2: number, y2: number, layer: string): string {
    return `0\nLINE\n8\n${layer}\n10\n${x1.toFixed(3)}\n20\n${y1.toFixed(3)}\n30\n0.0\n11\n${x2.toFixed(3)}\n21\n${y2.toFixed(3)}\n31\n0.0\n`;
  }

  private static dxfRect(x: number, y: number, w: number, h: number, layer: string): string {
    let r = "";
    r += this.dxfLine(x, y, x + w, y, layer);
    r += this.dxfLine(x + w, y, x + w, y + h, layer);
    r += this.dxfLine(x + w, y + h, x, y + h, layer);
    r += this.dxfLine(x, y + h, x, y, layer);
    return r;
  }

  private static dxfText(x: number, y: number, text: string, height: number, layer: string): string {
    return `0\nTEXT\n8\n${layer}\n10\n${x.toFixed(3)}\n20\n${y.toFixed(3)}\n30\n0.0\n40\n${height}\n1\n${text}\n`;
  }

  /**
   * Helper to trigger standard browser download of DXF file
   */
  public static downloadDXF(dxfContent: string, filename: string = "Exchanger_CAD_Drawing.dxf"): void {
    const blob = new Blob([dxfContent], { type: "application/dxf;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = filename;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  }
}
