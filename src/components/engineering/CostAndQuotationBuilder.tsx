import React, { useState } from "react";
import { INITIAL_QUOTATION, DEFAULT_DESIGN_EXAMPLE } from "../../data/mockData";
import { CommercialQuotation, QuotationLineItem } from "../../types";
import { FileSpreadsheet, Download, Plus, Trash2, CheckCircle2, ShieldCheck, Printer, Send } from "lucide-react";
import jsPDF from "jspdf";
import { EngineeringExportStudio } from "./EngineeringExportStudio";

export const CostAndQuotationBuilder: React.FC = () => {
  const [quote, setQuote] = useState<CommercialQuotation>(INITIAL_QUOTATION);
  const [exportSuccess, setExportSuccess] = useState<boolean>(false);
  const [currency, setCurrency] = useState<"INR" | "USD" | "EUR" | "GBP">("INR");

  const currencySymbols = {
    INR: "₹",
    USD: "$",
    EUR: "€",
    GBP: "£",
  };

  const exchangeRates = {
    INR: 1,
    USD: 0.0116,
    EUR: 0.0107,
    GBP: 0.0091,
  };

  const currSymbol = currencySymbols[currency] || "₹";

  // Currency Switcher Handler
  const handleCurrencySwitch = (newCurr: "INR" | "USD" | "EUR" | "GBP") => {
    if (newCurr === currency) return;
    const oldRate = exchangeRates[currency];
    const newRate = exchangeRates[newCurr];
    const factor = newRate / oldRate;

    const convertedItems = quote.items.map((item) => {
      const newUnitCost = Math.round(item.unitCost * factor * 100) / 100;
      return {
        ...item,
        unitCost: newUnitCost,
        totalCost: Math.round(item.quantity * newUnitCost * 100) / 100,
      };
    });

    setCurrency(newCurr);
    setQuote((prev) => ({
      ...prev,
      currency: newCurr,
      items: convertedItems,
    }));
  };

  // Recalculate Totals
  const subtotal = quote.items.reduce((sum, item) => sum + item.totalCost, 0);
  const contingencyAmt = (subtotal * quote.contingencyPercent) / 100;
  const marginAmt = ((subtotal + contingencyAmt) * quote.marginPercent) / 100;
  const grandTotal = subtotal + contingencyAmt + marginAmt;

  const handleItemChange = (id: string, field: keyof QuotationLineItem, value: any) => {
    setQuote((prev) => {
      const updatedItems = prev.items.map((item) => {
        if (item.id === id) {
          const newItem = { ...item, [field]: value };
          if (field === "quantity" || field === "unitCost") {
            newItem.totalCost = newItem.quantity * newItem.unitCost;
          }
          return newItem;
        }
        return item;
      });
      return { ...prev, items: updatedItems };
    });
  };

  const addItem = () => {
    const defaultUnitCost = currency === "INR" ? 215000 : 2500;
    const newItem: QuotationLineItem = {
      id: Date.now().toString(),
      category: "Materials",
      description: "Additional Fabrication / Precision Machining Item",
      quantity: 1,
      unit: "Lot",
      unitCost: defaultUnitCost,
      totalCost: defaultUnitCost,
    };
    setQuote((prev) => ({ ...prev, items: [...prev.items, newItem] }));
  };

  const deleteItem = (id: string) => {
    setQuote((prev) => ({ ...prev, items: prev.items.filter((i) => i.id !== id) }));
  };

  // Generate PDF Engineering Quotation Document
  const exportPDFQuotation = () => {
    const doc = new jsPDF({ unit: "mm", format: "a4" });

    // Header Background
    doc.setFillColor(15, 23, 42); // Slate 900
    doc.rect(0, 0, 210, 40, "F");

    // Company Header Text
    doc.setTextColor(56, 189, 248); // Cyan
    doc.setFontSize(20);
    doc.setFont("helvetica", "bold");
    doc.text("NORTHERN HEATEX CORPORATION", 14, 18);

    doc.setTextColor(226, 232, 240);
    doc.setFontSize(9);
    doc.setFont("helvetica", "normal");
    doc.text("Global Industrial Thermal & Mechanical Engineering Platform", 14, 25);
    doc.text("Parent Enterprise: Noor Engineering Works (est. 1983) • Haridwar - 249407, India • TPI Inspected", 14, 31);

    // Document Title & Reference
    doc.setTextColor(15, 23, 42);
    doc.setFontSize(14);
    doc.setFont("helvetica", "bold");
    doc.text("COMMERCIAL & TECHNICAL ENGINEERING QUOTATION", 14, 50);

    doc.setFontSize(9);
    doc.setFont("helvetica", "normal");
    doc.text(`Quote Reference: ${quote.quoteNumber}`, 14, 57);
    doc.text(`Date Issued: ${quote.date}`, 14, 62);
    doc.text(`Valid Until: ${quote.validUntil}`, 14, 67);

    // Client Info Box
    doc.setFillColor(241, 245, 249);
    doc.rect(120, 45, 76, 25, "F");
    doc.setDrawColor(203, 213, 225);
    doc.rect(120, 45, 76, 25, "S");

    doc.setTextColor(30, 41, 59);
    doc.setFont("helvetica", "bold");
    doc.text("PREPARED FOR:", 124, 51);
    doc.setFont("helvetica", "normal");
    doc.text(quote.clientName, 124, 56);
    doc.text(quote.clientCompany, 124, 61);
    doc.text(`Project: ${quote.projectTitle}`, 124, 66);

    // Line Items Table Header
    let startY = 80;
    doc.setFillColor(30, 41, 59);
    doc.rect(14, startY, 182, 8, "F");

    doc.setTextColor(255, 255, 255);
    doc.setFont("helvetica", "bold");
    doc.text("Item Description", 18, startY + 5.5);
    doc.text("Qty", 125, startY + 5.5);
    doc.text(`Unit Cost (${currency})`, 142, startY + 5.5);
    doc.text(`Total (${currency})`, 172, startY + 5.5);

    startY += 8;
    doc.setFont("helvetica", "normal");
    doc.setTextColor(15, 23, 42);

    quote.items.forEach((item, index) => {
      if (index % 2 === 1) {
        doc.setFillColor(248, 250, 252);
        doc.rect(14, startY, 182, 8, "F");
      }

      const descText = item.description.length > 50 ? item.description.substring(0, 47) + "..." : item.description;
      doc.text(descText, 18, startY + 5.5);
      doc.text(`${item.quantity} ${item.unit}`, 125, startY + 5.5);
      doc.text(`${currSymbol}${Math.round(item.unitCost).toLocaleString()}`, 142, startY + 5.5);
      doc.text(`${currSymbol}${Math.round(item.totalCost).toLocaleString()}`, 172, startY + 5.5);

      startY += 8;
    });

    // Summary Totals
    startY += 6;
    doc.line(14, startY, 196, startY);
    startY += 6;

    doc.setFont("helvetica", "bold");
    doc.text("Subtotal:", 130, startY);
    doc.text(`${currSymbol}${Math.round(subtotal).toLocaleString()}`, 170, startY);
    startY += 6;

    doc.text(`Contingency (${quote.contingencyPercent}%):`, 130, startY);
    doc.text(`${currSymbol}${Math.round(contingencyAmt).toLocaleString()}`, 170, startY);
    startY += 6;

    doc.text(`Engineering Margin (${quote.marginPercent}%):`, 130, startY);
    doc.text(`${currSymbol}${Math.round(marginAmt).toLocaleString()}`, 170, startY);
    startY += 8;

    doc.setFillColor(15, 23, 42);
    doc.rect(120, startY - 5, 76, 10, "F");
    doc.setTextColor(56, 189, 248);
    doc.setFontSize(11);
    doc.text("GRAND TOTAL:", 123, startY + 2);
    doc.text(`${currSymbol}${Math.round(grandTotal).toLocaleString()} ${currency}`, 158, startY + 2);

    // Terms & Stamping
    startY += 20;
    doc.setTextColor(100, 116, 139);
    doc.setFontSize(8);
    doc.setFont("helvetica", "normal");
    doc.text("Terms & Conditions:", 14, startY);
    doc.text("1. Equipment fabricated strictly per ASME Section VIII Div 1 & TEMA Class R standards.", 14, startY + 4);
    doc.text(`2. Estimated Fabrication & Hydrotest Lead Time: ${quote.leadTimeWeeks} Weeks from drawing approval.`, 14, startY + 8);
    doc.text("3. Includes Third Party Inspection Clearance, Hydrotest Certificate & 100% Helium Mass Spec Leak Testing.", 14, startY + 12);

    // Save PDF
    doc.save(`${quote.quoteNumber}_NorthernHeatEx_Proposal.pdf`);
    setExportSuccess(true);
    setTimeout(() => setExportSuccess(false), 4000);
  };

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-2xl space-y-8">
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-4 border-b border-slate-800 pb-4">
        <div>
          <h3 className="text-xl font-bold text-slate-100 flex items-center gap-2">
            <FileSpreadsheet className="w-6 h-6 text-cyan-400" />
            Enterprise Engineering Quotation & Cost Estimator
          </h3>
          <p className="text-xs text-slate-400 font-mono">
            Itemized material cost, CNC labor hours, ASME stamping fees, and instant formal PDF export
          </p>
        </div>

        <div className="flex items-center gap-3">
          {/* Currency Switcher Selector */}
          <div className="flex items-center bg-slate-950 p-1 rounded-xl border border-slate-700 font-mono text-xs">
            <span className="text-[10px] text-slate-400 font-bold px-2 uppercase">Currency:</span>
            {(["INR", "USD", "EUR", "GBP"] as const).map((c) => (
              <button
                key={c}
                type="button"
                onClick={() => handleCurrencySwitch(c)}
                className={`px-2.5 py-1 rounded-lg font-bold transition ${
                  currency === c
                    ? "bg-cyan-500 text-slate-950 shadow"
                    : "text-slate-300 hover:text-white hover:bg-slate-800"
                }`}
              >
                {c === "INR" ? "₹ INR" : c === "USD" ? "$ USD" : c === "EUR" ? "€ EUR" : "£ GBP"}
              </button>
            ))}
          </div>

          <button
            onClick={exportPDFQuotation}
            className="bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-slate-950 font-extrabold px-5 py-2.5 rounded-xl text-xs font-mono flex items-center gap-2 shadow-lg shadow-cyan-500/20 transition cursor-pointer"
          >
            <Download className="w-4 h-4" />
            <span>Export Formal Quotation PDF</span>
          </button>
        </div>
      </div>

      {exportSuccess && (
        <div className="bg-emerald-950 border border-emerald-800 text-emerald-300 px-4 py-3 rounded-xl text-xs font-mono flex items-center gap-2">
          <CheckCircle2 className="w-5 h-5 text-emerald-400" />
          <span>Formal Engineering Proposal PDF downloaded successfully to your device!</span>
        </div>
      )}

      {/* Quotation Header Details */}
      <div className="bg-slate-950 p-6 rounded-xl border border-slate-800 space-y-4">
        <h4 className="text-xs font-bold font-mono text-slate-300 uppercase tracking-wider border-b border-slate-800 pb-2">
          Proposal Identification & Client Metadata
        </h4>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 text-xs font-mono">
          <div>
            <label className="text-slate-400">Quote Reference No:</label>
            <input
              type="text"
              value={quote.quoteNumber}
              onChange={(e) => setQuote({ ...quote, quoteNumber: e.target.value })}
              className="w-full bg-slate-900 border border-slate-800 text-cyan-300 font-bold p-2 rounded-lg mt-1"
            />
          </div>

          <div>
            <label className="text-slate-400">Client Contact Person:</label>
            <input
              type="text"
              value={quote.clientName}
              onChange={(e) => setQuote({ ...quote, clientName: e.target.value })}
              className="w-full bg-slate-900 border border-slate-800 text-slate-200 p-2 rounded-lg mt-1"
            />
          </div>

          <div>
            <label className="text-slate-400">Client Enterprise Company:</label>
            <input
              type="text"
              value={quote.clientCompany}
              onChange={(e) => setQuote({ ...quote, clientCompany: e.target.value })}
              className="w-full bg-slate-900 border border-slate-800 text-slate-200 p-2 rounded-lg mt-1"
            />
          </div>

          <div>
            <label className="text-slate-400">Fabrication Lead Time (Weeks):</label>
            <input
              type="number"
              value={quote.leadTimeWeeks}
              onChange={(e) => setQuote({ ...quote, leadTimeWeeks: parseInt(e.target.value) || 1 })}
              className="w-full bg-slate-900 border border-slate-800 text-slate-200 p-2 rounded-lg mt-1 font-mono"
            />
          </div>
        </div>
      </div>

      {/* Itemized Line Items Table */}
      <div className="space-y-4">
        <div className="flex justify-between items-center">
          <h4 className="text-sm font-bold font-mono text-slate-200">
            Itemized Cost Breakdown ({currency} - {currSymbol})
          </h4>
          <button
            onClick={addItem}
            className="bg-slate-800 hover:bg-slate-700 text-cyan-300 border border-slate-700 px-3 py-1.5 rounded-lg text-xs font-mono flex items-center gap-1.5 transition cursor-pointer"
          >
            <Plus className="w-3.5 h-3.5" /> Add Line Item
          </button>
        </div>

        <div className="overflow-x-auto rounded-xl border border-slate-800 bg-slate-950">
          <table className="w-full text-left text-xs font-mono">
            <thead className="bg-slate-900 text-slate-300 uppercase border-b border-slate-800 text-[11px]">
              <tr>
                <th className="p-3">Category</th>
                <th className="p-3">Item Description</th>
                <th className="p-3 w-20">Qty</th>
                <th className="p-3 w-24">Unit</th>
                <th className="p-3 w-36">Unit Cost ({currSymbol})</th>
                <th className="p-3 w-36 text-right">Total ({currSymbol})</th>
                <th className="p-3 w-12 text-center">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60 text-slate-200">
              {quote.items.map((item) => (
                <tr key={item.id} className="hover:bg-slate-900/50">
                  <td className="p-3 font-semibold text-cyan-400">{item.category}</td>
                  <td className="p-3">
                    <input
                      type="text"
                      value={item.description}
                      onChange={(e) => handleItemChange(item.id, "description", e.target.value)}
                      className="w-full bg-transparent border-b border-slate-800 focus:border-cyan-500 focus:outline-none text-slate-200 text-xs py-1"
                    />
                  </td>
                  <td className="p-3">
                    <input
                      type="number"
                      value={item.quantity}
                      onChange={(e) => handleItemChange(item.id, "quantity", parseFloat(e.target.value) || 1)}
                      className="w-full bg-slate-900 border border-slate-800 text-center rounded py-1 text-xs"
                    />
                  </td>
                  <td className="p-3">
                    <input
                      type="text"
                      value={item.unit}
                      onChange={(e) => handleItemChange(item.id, "unit", e.target.value)}
                      className="w-full bg-slate-900 border border-slate-800 text-center rounded py-1 text-xs"
                    />
                  </td>
                  <td className="p-3">
                    <input
                      type="number"
                      value={item.unitCost}
                      onChange={(e) => handleItemChange(item.id, "unitCost", parseFloat(e.target.value) || 0)}
                      className="w-full bg-slate-900 border border-slate-800 text-right rounded py-1 text-xs font-mono"
                    />
                  </td>
                  <td className="p-3 text-right font-bold text-slate-100">
                    {currSymbol}{Math.round(item.totalCost).toLocaleString()}
                  </td>
                  <td className="p-3 text-center">
                    <button
                      onClick={() => deleteItem(item.id)}
                      className="text-slate-500 hover:text-rose-400 p-1 cursor-pointer"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Commercial Summary Card */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 bg-slate-950 p-6 rounded-xl border border-slate-800">
        <div className="space-y-4 font-mono text-xs">
          <h4 className="font-bold text-slate-300 uppercase border-b border-slate-800 pb-2">
            Commercial Terms & Margin Sliders
          </h4>

          <div className="space-y-2">
            <div className="flex justify-between text-slate-400">
              <span>Contingency Buffer (%):</span>
              <span className="text-cyan-400 font-bold">{quote.contingencyPercent}%</span>
            </div>
            <input
              type="range"
              min="0"
              max="15"
              step="1"
              value={quote.contingencyPercent}
              onChange={(e) => setQuote({ ...quote, contingencyPercent: parseInt(e.target.value) || 0 })}
              className="w-full accent-cyan-400 bg-slate-800 h-1.5 rounded"
            />
          </div>

          <div className="space-y-2">
            <div className="flex justify-between text-slate-400">
              <span>Gross Margin (%):</span>
              <span className="text-cyan-400 font-bold">{quote.marginPercent}%</span>
            </div>
            <input
              type="range"
              min="5"
              max="35"
              step="1"
              value={quote.marginPercent}
              onChange={(e) => setQuote({ ...quote, marginPercent: parseInt(e.target.value) || 5 })}
              className="w-full accent-cyan-400 bg-slate-800 h-1.5 rounded"
            />
          </div>
        </div>

        {/* Grand Total Display */}
        <div className="bg-slate-900 p-6 rounded-xl border border-cyan-800/80 flex flex-col justify-between space-y-4">
          <div className="space-y-2 font-mono text-xs">
            <div className="flex justify-between text-slate-400">
              <span>Direct Material & Labor Subtotal:</span>
              <span className="text-slate-200 font-bold">{currSymbol}{Math.round(subtotal).toLocaleString()}</span>
            </div>
            <div className="flex justify-between text-slate-400">
              <span>Contingency ({quote.contingencyPercent}%):</span>
              <span className="text-slate-200">{currSymbol}{Math.round(contingencyAmt).toLocaleString()}</span>
            </div>
            <div className="flex justify-between text-slate-400">
              <span>Gross Margin ({quote.marginPercent}%):</span>
              <span className="text-slate-200">{currSymbol}{Math.round(marginAmt).toLocaleString()}</span>
            </div>
          </div>

          <div className="pt-4 border-t border-slate-800 flex justify-between items-center">
            <span className="text-xs font-mono text-slate-400 font-bold uppercase">Grand Total Amount:</span>
            <span className="text-2xl font-extrabold text-cyan-400 font-mono">
              {currSymbol}{Math.round(grandTotal).toLocaleString()} {currency}
            </span>
          </div>
        </div>
      </div>

      {/* Service Layer: PDF Data Sheet & DXF CAD Exporter Component */}
      <EngineeringExportStudio
        currentQuotation={{ ...quote, subtotal, totalAmount: grandTotal, currency }}
        currentDesign={DEFAULT_DESIGN_EXAMPLE}
      />
    </div>
  );
};
