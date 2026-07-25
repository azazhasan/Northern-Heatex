import React, { useState } from "react";
import {
  FileSpreadsheet,
  Download,
  Printer,
  CheckCircle2,
  Filter,
  Search,
  Zap,
  Boxes,
} from "lucide-react";

export const BOMGeneratorModule: React.FC = () => {
  const [searchFilter, setSearchFilter] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("All");

  const bomItems = [
    { itemNo: "01", component: "Shell Barrel Plate", asmeSpec: "SA-516 Grade 70", size: "OD 900 mm x 16 mm Wall x 4500 mm L", qty: 1, unitWeight: 1540, totalWeight: 1540, unitCost: "$4,200", totalCost: "$4,200", category: "Pressure Parts" },
    { itemNo: "02", component: "Stationary Tubesheet", asmeSpec: "SA-266 Gr 2 + Cu-Ni Clad", size: "Ø 920 mm x 75 mm Thk", qty: 1, unitWeight: 380, totalWeight: 380, unitCost: "$6,500", totalCost: "$6,500", category: "Tubesheets" },
    { itemNo: "03", component: "Floating Tubesheet", asmeSpec: "SA-266 Gr 2 + Cu-Ni Clad", size: "Ø 880 mm x 65 mm Thk", qty: 1, unitWeight: 310, totalWeight: 310, unitCost: "$5,800", totalCost: "$5,800", category: "Tubesheets" },
    { itemNo: "04", component: "Heat Exchanger Tubes", asmeSpec: "SB-111 C70600 (Cu-Ni 90/10)", size: "3/4\" (19.05 mm) OD x 18 BWG x 4500 mm", qty: 420, unitWeight: 2.8, totalWeight: 1176, unitCost: "$45", totalCost: "$18,900", category: "Tubes" },
    { itemNo: "05", component: "Transverse Baffle Plates", asmeSpec: "SA-283 Grade C", size: "9.5 mm Thk x 20% Cut", qty: 8, unitWeight: 32, totalWeight: 256, unitCost: "$180", totalCost: "$1,440", category: "Internals" },
    { itemNo: "06", component: "Tie Rods & Spacers", asmeSpec: "SA-193 B7 / SA-106", size: "Ø 16 mm x 4400 mm L", qty: 6, unitWeight: 8, totalWeight: 48, unitCost: "$95", totalCost: "$570", category: "Internals" },
    { itemNo: "07", component: "Shell Nozzles N1 / N2", asmeSpec: "SA-106 Gr B / SA-105 Flange", size: "DN 200 (8\") ANSI 300# RFWN", qty: 2, unitWeight: 65, totalWeight: 130, unitCost: "$850", totalCost: "$1,700", category: "Nozzles & Flanges" },
    { itemNo: "08", component: "Tube Nozzles N3 / N4", asmeSpec: "SA-106 Gr B / SA-105 Flange", size: "DN 150 (6\") ANSI 150# RFWN", qty: 2, unitWeight: 42, totalWeight: 84, unitCost: "$620", totalCost: "$1,240", category: "Nozzles & Flanges" },
    { itemNo: "09", component: "Gaskets (Spiral Wound)", asmeSpec: "316L SS / Flexible Graphite", size: "ANSI 300# & Custom Shell Gasket", qty: 4, unitWeight: 3.5, totalWeight: 14, unitCost: "$210", totalCost: "$840", category: "Gaskets & Fasteners" },
    { itemNo: "10", component: "Studs & Heavy Hex Nuts", asmeSpec: "SA-193 B7 / SA-194 2H", size: "M24 x 180 mm Studs", qty: 64, unitWeight: 0.8, totalWeight: 51.2, unitCost: "$12", totalCost: "$768", category: "Gaskets & Fasteners" },
    { itemNo: "11", component: "Sacrificial Zinc Anodes", asmeSpec: "ASTM B418 Type I Zinc", size: "Custom Threaded Plug Mount", qty: 4, unitWeight: 4.0, totalWeight: 16, unitCost: "$85", totalCost: "$340", category: "Internals" },
  ];

  const filteredItems = bomItems.filter((i) => {
    const matchesSearch =
      searchFilter === "" ||
      i.component.toLowerCase().includes(searchFilter.toLowerCase()) ||
      i.asmeSpec.toLowerCase().includes(searchFilter.toLowerCase()) ||
      i.size.toLowerCase().includes(searchFilter.toLowerCase());

    const matchesCat = categoryFilter === "All" || i.category === categoryFilter;

    return matchesSearch && matchesCat;
  });

  const totalWeightSum = filteredItems.reduce((acc, curr) => acc + curr.totalWeight, 0);

  return (
    <div className="space-y-8 animate-fadeIn">
      {/* Header Banner */}
      <div className="relative bg-gradient-to-br from-[#070a12] via-[#05070d] to-[#0c101d] border border-cyan-500/30 rounded-3xl p-8 shadow-2xl overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-3 max-w-3xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-950 text-cyan-400 border border-cyan-500/40 text-xs font-mono font-bold uppercase">
              <FileSpreadsheet className="w-3.5 h-3.5 text-cyan-400" /> Bill of Materials Generator (Module 6)
            </div>

            <h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
              Enterprise Bill of Materials (BOM)
            </h1>

            <p className="text-sm text-cyan-200/80 font-normal leading-relaxed">
              Multi-level itemized breakdown of shell plates, tubesheets, seamless tubes, nozzles, flanges, transverse baffles, fasteners, and zinc sacrificial anodes with calculated net weights and metallurgy specs.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => alert("Exporting BOM to Excel / CSV...")}
              className="px-4 py-2.5 bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold rounded-xl font-mono text-xs uppercase flex items-center gap-2 shadow-lg"
            >
              <Download className="w-4 h-4" /> Export Excel
            </button>
          </div>
        </div>
      </div>

      {/* Filter Bar & Summary KPI */}
      <div className="bg-[#080a0f] border border-white/10 rounded-2xl p-6 space-y-4">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div className="relative flex-1 min-w-[260px]">
            <Search className="w-4 h-4 text-white/40 absolute left-3.5 top-3.5" />
            <input
              type="text"
              value={searchFilter}
              onChange={(e) => setSearchFilter(e.target.value)}
              placeholder="Search components, SA specs, sizes..."
              className="w-full bg-slate-900 border border-white/15 rounded-xl pl-10 pr-4 py-2.5 text-xs text-white placeholder-white/40 font-mono focus:border-cyan-400 focus:outline-none"
            />
          </div>

          <div className="flex flex-wrap items-center gap-2 font-mono text-xs">
            {["All", "Pressure Parts", "Tubesheets", "Tubes", "Internals", "Nozzles & Flanges", "Gaskets & Fasteners"].map((cat) => (
              <button
                key={cat}
                onClick={() => setCategoryFilter(cat)}
                className={`px-3 py-1.5 rounded-lg transition ${
                  categoryFilter === cat
                    ? "bg-cyan-950 text-cyan-300 border border-cyan-500/50 font-bold"
                    : "bg-white/5 text-white/60 hover:text-white"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        <div className="flex items-center justify-between font-mono text-xs pt-3 border-t border-white/5 text-white/60">
          <span>Total Line Items: <strong className="text-cyan-400">{filteredItems.length}</strong></span>
          <span>Calculated Dry Weight: <strong className="text-amber-300">{Math.round(totalWeightSum)} kg (~{Math.round(totalWeightSum * 2.20462)} lbs)</strong></span>
        </div>
      </div>

      {/* BOM Table */}
      <div className="bg-[#080a0f] border border-white/10 rounded-3xl p-6 shadow-2xl overflow-x-auto">
        <table className="w-full text-left font-mono text-xs text-white/80">
          <thead className="bg-black/60 text-cyan-400 border-b border-white/10 uppercase text-[10px]">
            <tr>
              <th className="p-3">#</th>
              <th className="p-3">Component Description</th>
              <th className="p-3">ASME / ASTM Material</th>
              <th className="p-3">Dimensional Specification</th>
              <th className="p-3 text-center">Qty</th>
              <th className="p-3 text-right">Unit Wt (kg)</th>
              <th className="p-3 text-right">Total Wt (kg)</th>
              <th className="p-3 text-right">Unit Cost</th>
              <th className="p-3 text-right">Ext Cost</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-white/5">
            {filteredItems.map((item) => (
              <tr key={item.itemNo} className="hover:bg-white/5 transition">
                <td className="p-3 font-bold text-cyan-400">{item.itemNo}</td>
                <td className="p-3 font-bold text-white">{item.component}</td>
                <td className="p-3 text-cyan-300">{item.asmeSpec}</td>
                <td className="p-3 text-white/70">{item.size}</td>
                <td className="p-3 text-center font-bold text-white">{item.qty}</td>
                <td className="p-3 text-right text-white/60">{item.unitWeight}</td>
                <td className="p-3 text-right font-bold text-amber-300">{item.totalWeight}</td>
                <td className="p-3 text-right text-white/60">{item.unitCost}</td>
                <td className="p-3 text-right font-bold text-emerald-400">{item.totalCost}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
