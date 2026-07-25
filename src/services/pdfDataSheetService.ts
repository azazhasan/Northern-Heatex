/**
 * Northern HeatEx Engineering Ecosystem (NHEE)
 * Service Layer: Professional TEMA / ASME Heat Exchanger PDF Data Sheet Generator
 */

import jsPDF from "jspdf";
import { HeatExchangerDesign, CommercialQuotation } from "../types";

export class PDFDataSheetService {
  /**
   * Generates a formal 2-Page TEMA / ASME Heat Exchanger Specification Data Sheet
   */
  public static generateDataSheetPDF(
    design: HeatExchangerDesign,
    quote?: CommercialQuotation
  ): jsPDF {
    const doc = new jsPDF({ unit: "mm", format: "a4" });
    const pageWidth = 210;
    const pageHeight = 297;
    const margin = 12;

    // --- PAGE 1: TEMA SPECIFICATION DATA SHEET ---

    // 1. Corporate Header
    doc.setFillColor(15, 23, 42); // Slate 900
    doc.rect(0, 0, pageWidth, 36, "F");

    doc.setTextColor(56, 189, 248); // Cyan
    doc.setFontSize(18);
    doc.setFont("helvetica", "bold");
    doc.text("NORTHERN HEATEX CORPORATION", margin, 14);

    doc.setTextColor(226, 232, 240);
    doc.setFontSize(8);
    doc.setFont("helvetica", "normal");
    doc.text("Global Thermal & Mechanical Equipment Engineering Division", margin, 20);
    doc.text("Designed per ASME Section VIII Div 1 & TEMA Standards", margin, 25);
    doc.text("Parent Enterprise: Noor Engineering Works (est. 1983) • Haridwar - 249407, India", margin, 30);

    // Document Title Banner
    doc.setFillColor(30, 41, 59); // Slate 800
    doc.rect(margin, 40, pageWidth - 2 * margin, 12, "F");
    doc.setTextColor(255, 255, 255);
    doc.setFontSize(11);
    doc.setFont("helvetica", "bold");
    doc.text("TEMA / ASME HEAT EXCHANGER SPECIFICATION DATA SHEET", margin + 4, 48);

    // Document Meta Table
    doc.setDrawColor(203, 213, 225);
    doc.setLineWidth(0.3);
    doc.rect(margin, 54, pageWidth - 2 * margin, 22, "S");

    doc.setTextColor(15, 23, 42);
    doc.setFontSize(8);
    doc.setFont("helvetica", "bold");
    doc.text(`Equipment Tag No: HE-${design.id.substring(0, 6).toUpperCase()}`, margin + 3, 60);
    doc.text(`Project Title: ${design.title}`, margin + 3, 66);
    doc.text(`Client: ${design.clientName}`, margin + 3, 72);

    doc.text(`TEMA Designation: ${design.temaType}`, 130, 60);
    doc.text(`Date Generated: ${new Date().toISOString().split("T")[0]}`, 130, 66);
    doc.text(`Revision: Rev 0 (Final Engineering)`, 130, 72);

    // --- TABLE SECTION 1: PERFORMANCE & PROCESS DATA ---
    let y = 82;

    doc.setFillColor(15, 23, 42);
    doc.rect(margin, y, pageWidth - 2 * margin, 6, "F");
    doc.setTextColor(255, 255, 255);
    doc.setFontSize(9);
    doc.setFont("helvetica", "bold");
    doc.text("1. THERMAL & PROCESS OPERATING CONDITIONS", margin + 3, y + 4.5);

    y += 6;

    // Side-by-side Table Header
    const colWidth = (pageWidth - 2 * margin - 50) / 2;
    doc.setFillColor(241, 245, 249);
    doc.rect(margin, y, pageWidth - 2 * margin, 6, "F");
    doc.rect(margin, y, pageWidth - 2 * margin, 6, "S");

    doc.setTextColor(30, 41, 59);
    doc.setFontSize(8);
    doc.setFont("helvetica", "bold");
    doc.text("Performance Parameter", margin + 3, y + 4.5);
    doc.text("SHELL SIDE (Hot Fluid)", margin + 55, y + 4.5);
    doc.text("TUBE SIDE (Cold Fluid)", margin + 55 + colWidth, y + 4.5);

    y += 6;

    const processRows = [
      ["Fluid Name & Allocation", design.hotSide.name, design.coldSide.name],
      ["Total Mass Flow Rate (kg/h)", design.hotSide.flowRate.toLocaleString(), design.coldSide.flowRate.toLocaleString()],
      ["Inlet / Outlet Temperature (°C)", `${design.hotSide.tempIn} / ${design.hotSide.tempOut}`, `${design.coldSide.tempIn} / ${design.coldSide.tempOut}`],
      ["Operating Pressure (bar g)", design.designPressureShell.toFixed(1), design.designPressureTube.toFixed(1)],
      ["Density (kg/m³)", design.hotSide.density.toString(), design.coldSide.density.toString()],
      ["Viscosity (cP)", design.hotSide.viscosity.toString(), design.coldSide.viscosity.toString()],
      ["Specific Heat (kJ/kg·K)", design.hotSide.specificHeat.toString(), design.coldSide.specificHeat.toString()],
      ["Thermal Conductivity (W/m·K)", design.hotSide.thermalConductivity.toString(), design.coldSide.thermalConductivity.toString()],
      ["Fouling Resistance (m²·K/W)", design.hotSide.foulingFactor.toString(), design.coldSide.foulingFactor.toString()],
    ];

    doc.setFont("helvetica", "normal");
    processRows.forEach((row, i) => {
      if (i % 2 === 1) {
        doc.setFillColor(248, 250, 252);
        doc.rect(margin, y, pageWidth - 2 * margin, 5.5, "F");
      }
      doc.rect(margin, y, pageWidth - 2 * margin, 5.5, "S");
      doc.setTextColor(15, 23, 42);
      doc.text(row[0], margin + 3, y + 4);
      doc.text(row[1], margin + 55, y + 4);
      doc.text(row[2], margin + 55 + colWidth, y + 4);
      y += 5.5;
    });

    // Summary Heat Transfer Duty Box
    y += 3;
    doc.setFillColor(236, 254, 255); // Light Cyan
    doc.rect(margin, y, pageWidth - 2 * margin, 14, "F");
    doc.setDrawColor(6, 182, 212);
    doc.rect(margin, y, pageWidth - 2 * margin, 14, "S");

    doc.setTextColor(14, 116, 144);
    doc.setFontSize(8.5);
    doc.setFont("helvetica", "bold");
    doc.text(`CALCULATED HEAT DUTY: ${design.calculatedHeatDuty.toLocaleString()} kW`, margin + 4, y + 5);
    doc.text(`LOG MEAN TEMP DIFF (LMTD): ${design.calculatedLMTD.toFixed(1)} °C`, margin + 4, y + 10);

    doc.text(`OVERALL HEAT TRANSFER COEFF (U): ${design.calculatedU} W/m²·K`, margin + 105, y + 5);
    doc.text(`EFFECTIVE SURFACE AREA: ${design.calculatedArea.toFixed(1)} m²`, margin + 105, y + 10);

    // --- TABLE SECTION 2: MECHANICAL CONSTRUCTION DATA ---
    y += 18;

    doc.setFillColor(15, 23, 42);
    doc.rect(margin, y, pageWidth - 2 * margin, 6, "F");
    doc.setTextColor(255, 255, 255);
    doc.setFontSize(9);
    doc.setFont("helvetica", "bold");
    doc.text("2. MECHANICAL FABRICATION & COMPONENT SPECIFICATIONS", margin + 3, y + 4.5);

    y += 6;

    const mechRows = [
      ["Shell Diameter ID (mm)", design.shellDiameter.toString(), "Pass Count", `${design.passCount} Pass`],
      ["Shell Material", design.shellMaterial, "Tube Pitch Distance", `${design.pitchDistance} mm (${design.pitchPattern})`],
      ["Tube Outer Diameter (OD)", `${design.tubeOD} mm`, "Baffle Cut Percentage", `${design.baffleCutPercent} % Segmental`],
      ["Tube Wall Thickness / BWG", `${design.tubeWallThickness} mm (BWG ${design.tubeBWG})`, "Baffle Spacing", `${design.baffleSpacing} mm`],
      ["Tube Nominal Length", `${design.tubeLength} mm`, "Total Fitted Tubes", `${design.calculatedTubeCount || 190} Tubes`],
      ["Tube Material Grade", design.tubeMaterial, "Tubesheet Material", design.tubeSheetMaterial],
      ["Design Pressure (Shell/Tube)", `${design.designPressureShell} bar g`, "Design Temperature", `${design.designTempShell} °C / ${design.designTempTube} °C`],
      ["ASME Code Stamping", "Section VIII Division 1", "TEMA Class Standard", "Class R (Heavy Petroleum)"],
    ];

    doc.setFont("helvetica", "normal");
    mechRows.forEach((row, i) => {
      if (i % 2 === 1) {
        doc.setFillColor(248, 250, 252);
        doc.rect(margin, y, pageWidth - 2 * margin, 5.5, "F");
      }
      doc.rect(margin, y, pageWidth - 2 * margin, 5.5, "S");
      doc.setTextColor(15, 23, 42);
      doc.text(row[0], margin + 3, y + 4);
      doc.setFont("helvetica", "bold");
      doc.text(row[1], margin + 55, y + 4);

      doc.setFont("helvetica", "normal");
      doc.text(row[2], margin + 105, y + 4);
      doc.setFont("helvetica", "bold");
      doc.text(row[3], margin + 155, y + 4);
      doc.setFont("helvetica", "normal");

      y += 5.5;
    });

    // Quality & Testing
    y += 4;
    doc.setFontSize(8);
    doc.setFont("helvetica", "bold");
    doc.setTextColor(15, 23, 42);
    doc.text("INSPECTION & TESTING REQUIREMENTS:", margin, y);
    y += 4;
    doc.setFont("helvetica", "normal");
    doc.setTextColor(71, 85, 105);
    doc.text("• Radiographic Examination (RT-2) on all shell seam welds per ASME Sec VIII Div 1 UW-11.", margin, y);
    doc.text(`• Hydrostatic Pressure Test: Shell Side @ ${(design.designPressureShell * 1.3).toFixed(1)} bar g | Tube Side @ ${(design.designPressureTube * 1.3).toFixed(1)} bar g for 60 mins.`, margin, y + 4);
    doc.text("• 100% Helium Mass Spectrometer Vacuum Leak Test on tube-to-tubesheet strength welds.", margin, y + 8);

    // Footer Stamping Box
    y = pageHeight - 25;
    doc.setDrawColor(148, 163, 184);
    doc.rect(margin, y, 55, 18, "S");
    doc.rect(margin + 60, y, 55, 18, "S");
    doc.rect(margin + 120, y, 66, 18, "S");

    doc.setFontSize(7);
    doc.setFont("helvetica", "bold");
    doc.text("PREPARED BY (Lead Thermal)", margin + 2, y + 4);
    doc.text("CHECKED BY (Chief Mechanical)", margin + 62, y + 4);
    doc.text("APPROVED BY (Third Party Inspector)", margin + 122, y + 4);

    doc.setFont("helvetica", "normal");
    doc.text("Eng. A. Vance, P.Eng.", margin + 2, y + 10);
    doc.text("Dr. H. Lindqvist, Chief Eng.", margin + 62, y + 10);
    doc.text("TPI Quality Inspector", margin + 122, y + 10);

    doc.text("Date: " + new Date().toISOString().split("T")[0], margin + 2, y + 15);
    doc.text("Date: " + new Date().toISOString().split("T")[0], margin + 62, y + 15);
    doc.text("Stamp: [TPI INSPECTION CLEARANCE VALID]", margin + 122, y + 15);


    // --- PAGE 2: COMMERCIAL & COST INTEGRATION SUMMARY (IF QUOTE PROVIDED) ---
    if (quote) {
      doc.addPage();

      // Header Page 2
      doc.setFillColor(15, 23, 42);
      doc.rect(0, 0, pageWidth, 28, "F");

      doc.setTextColor(56, 189, 248);
      doc.setFontSize(14);
      doc.setFont("helvetica", "bold");
      doc.text("NORTHERN HEATEX CORPORATION - COMMERCIAL ATTACHMENT", margin, 12);

      doc.setTextColor(226, 232, 240);
      doc.setFontSize(8);
      doc.setFont("helvetica", "normal");
      doc.text(`Quotation Reference: ${quote.quoteNumber} | Client: ${quote.clientCompany}`, margin, 18);
      doc.text(`Project Title: ${quote.projectTitle}`, margin, 23);

      let y2 = 36;
      doc.setFillColor(30, 41, 59);
      doc.rect(margin, y2, pageWidth - 2 * margin, 8, "F");
      doc.setTextColor(255, 255, 255);
      doc.setFontSize(9);
      doc.setFont("helvetica", "bold");
      doc.text("COMMERCIAL PRICING BREAKDOWN & FABRICATION SCHEDULE", margin + 4, y2 + 5.5);

      y2 += 8;

      // Table Header
      doc.setFillColor(241, 245, 249);
      doc.rect(margin, y2, pageWidth - 2 * margin, 6, "F");
      doc.setTextColor(30, 41, 59);
      doc.setFontSize(8);
      doc.setFont("helvetica", "bold");
      doc.text("Category", margin + 3, y2 + 4.5);
      doc.text("Scope & Component Item Description", margin + 35, y2 + 4.5);
      doc.text("Qty", 135, y2 + 4.5);
      doc.text("Unit Cost", 150, y2 + 4.5);
      doc.text("Total (USD)", 175, y2 + 4.5);

      y2 += 6;

      quote.items.forEach((item, idx) => {
        if (idx % 2 === 1) {
          doc.setFillColor(248, 250, 252);
          doc.rect(margin, y2, pageWidth - 2 * margin, 7, "F");
        }
        doc.rect(margin, y2, pageWidth - 2 * margin, 7, "S");
        doc.setFont("helvetica", "normal");
        doc.setTextColor(15, 23, 42);

        doc.text(item.category, margin + 3, y2 + 5);
        const desc = item.description.length > 52 ? item.description.substring(0, 49) + "..." : item.description;
        doc.text(desc, margin + 35, y2 + 5);
        doc.text(`${item.quantity} ${item.unit}`, 135, y2 + 5);
        doc.text(`$${item.unitCost.toLocaleString()}`, 150, y2 + 5);
        doc.setFont("helvetica", "bold");
        doc.text(`$${item.totalCost.toLocaleString()}`, 175, y2 + 5);

        y2 += 7;
      });

      // Commercial Summary Totals
      y2 += 6;
      doc.setFontSize(9);
      doc.setFont("helvetica", "bold");
      doc.text("Subtotal Material & Labor:", 120, y2);
      doc.text(`$${quote.subtotal.toLocaleString()}`, 175, y2);

      y2 += 6;
      const contingency = (quote.subtotal * quote.contingencyPercent) / 100;
      doc.text(`Contingency & Risk (${quote.contingencyPercent}%):`, 120, y2);
      doc.text(`$${Math.round(contingency).toLocaleString()}`, 175, y2);

      y2 += 6;
      const marginAmt = ((quote.subtotal + contingency) * quote.marginPercent) / 100;
      doc.text(`Engineering Margin (${quote.marginPercent}%):`, 120, y2);
      doc.text(`$${Math.round(marginAmt).toLocaleString()}`, 175, y2);

      y2 += 8;
      doc.setFillColor(15, 23, 42);
      doc.rect(115, y2 - 5, 71, 10, "F");
      doc.setTextColor(56, 189, 248);
      doc.setFontSize(10.5);
      doc.text("TOTAL CONTRACT PRICE:", 118, y2 + 2);
      doc.text(`$${Math.round(quote.subtotal + contingency + marginAmt).toLocaleString()} ${quote.currency}`, 162, y2 + 2);

      // Lead time & Delivery Notice
      y2 += 22;
      doc.setFillColor(241, 245, 249);
      doc.rect(margin, y2, pageWidth - 2 * margin, 25, "F");
      doc.rect(margin, y2, pageWidth - 2 * margin, 25, "S");

      doc.setTextColor(30, 41, 59);
      doc.setFontSize(8.5);
      doc.setFont("helvetica", "bold");
      doc.text("TERMS OF FABRICATION & DELIVERY:", margin + 4, y2 + 6);
      doc.setFont("helvetica", "normal");
      doc.text(`• Estimated Lead Time: ${quote.leadTimeWeeks} Weeks after final engineering drawing signoff & customer deposit.`, margin + 4, y2 + 11);
      doc.text("• Includes: Manufacturer Data & Hydrotest Reports, MTRs for pressure parts, TPI Clearance.", margin + 4, y2 + 16);
      doc.text("• Shipping: Ex-Works Haridwar Works / Crating included for transport.", margin + 4, y2 + 21);
    }

    return doc;
  }

  /**
   * Helper to trigger standard browser download of TEMA PDF Data Sheet
   */
  public static downloadDataSheetPDF(
    design: HeatExchangerDesign,
    quote?: CommercialQuotation,
    filename: string = "TEMA_Exchanger_Datasheet.pdf"
  ): void {
    const doc = this.generateDataSheetPDF(design, quote);
    doc.save(filename);
  }
}
