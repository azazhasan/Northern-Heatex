import React, { useState } from "react";
import { ShieldAlert, TrendingUp, Building2, Layers, Cpu, FileSpreadsheet, Bot, Upload, Plus, Check, FileText } from "lucide-react";
import { OfficialLetterheadStudio } from "./OfficialLetterheadStudio";

export const AdminManagementPortal: React.FC = () => {
  const [activeTab, setActiveTab] = useState<"kpi" | "crm" | "cms" | "knowledge" | "letterhead">("kpi");
  const [uploadedFileName, setUploadedFileName] = useState<string | null>(null);

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setUploadedFileName(e.target.files[0].name);
    }
  };

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-2xl space-y-8">
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-4 border-b border-slate-800 pb-4">
        <div>
          <h3 className="text-xl font-bold text-slate-100 flex items-center gap-2">
            <ShieldAlert className="w-6 h-6 text-rose-400" />
            Admin & Operations Ecosystem Command Center
          </h3>
          <p className="text-xs text-slate-400 font-mono">
            CRM Lead tracking, website CMS, factory capacity telemetry & AI Knowledge Base ingestion
          </p>
        </div>

        {/* Navigation Tabs */}
        <div className="flex items-center gap-2 font-mono text-xs">
          <button
            onClick={() => setActiveTab("kpi")}
            className={`px-3 py-1.5 rounded-lg border transition ${
              activeTab === "kpi"
                ? "bg-rose-950 border-rose-600 text-rose-300 font-bold"
                : "bg-slate-950 border-slate-800 text-slate-400"
            }`}
          >
            Executive KPIs
          </button>
          <button
            onClick={() => setActiveTab("crm")}
            className={`px-3 py-1.5 rounded-lg border transition ${
              activeTab === "crm"
                ? "bg-rose-950 border-rose-600 text-rose-300 font-bold"
                : "bg-slate-950 border-slate-800 text-slate-400"
            }`}
          >
            CRM & Pipeline
          </button>
          <button
            onClick={() => setActiveTab("cms")}
            className={`px-3 py-1.5 rounded-lg border transition ${
              activeTab === "cms"
                ? "bg-rose-950 border-rose-600 text-rose-300 font-bold"
                : "bg-slate-950 border-slate-800 text-slate-400"
            }`}
          >
            CMS & Assets
          </button>
          <button
            onClick={() => setActiveTab("knowledge")}
            className={`px-3 py-1.5 rounded-lg border transition ${
              activeTab === "knowledge"
                ? "bg-rose-950 border-rose-600 text-rose-300 font-bold"
                : "bg-slate-950 border-slate-800 text-slate-400"
            }`}
          >
            AI Standards Ingestion
          </button>
          <button
            onClick={() => setActiveTab("letterhead")}
            className={`px-3 py-1.5 rounded-lg border transition flex items-center gap-1.5 ${
              activeTab === "letterhead"
                ? "bg-[#0056A6] border-blue-500 text-white font-bold"
                : "bg-slate-950 border-slate-800 text-cyan-400 hover:text-white"
            }`}
          >
            <FileText className="w-3.5 h-3.5" />
            <span>Official Letterhead</span>
          </button>
        </div>
      </div>

      {activeTab === "kpi" && (
        <div className="space-y-6">
          {/* Executive KPI Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 font-mono">
            <div className="bg-slate-950 p-5 rounded-xl border border-slate-800 space-y-2">
              <div className="text-xs text-slate-400 flex items-center justify-between">
                <span>Active Proposal Pipeline:</span>
                <TrendingUp className="w-4 h-4 text-emerald-400" />
              </div>
              <div className="text-2xl font-extrabold text-emerald-400">$24.8M USD</div>
              <p className="text-[10px] text-slate-500">18 Enterprise Quotes Pending</p>
            </div>

            <div className="bg-slate-950 p-5 rounded-xl border border-slate-800 space-y-2">
              <div className="text-xs text-slate-400 flex items-center justify-between">
                <span>Shop Floor Capacity:</span>
                <Building2 className="w-4 h-4 text-cyan-400" />
              </div>
              <div className="text-2xl font-extrabold text-cyan-400">84.2% Loaded</div>
              <p className="text-slate-500 text-[10px]">Noor Engineering Works (est. 1983)</p>
            </div>

            <div className="bg-slate-950 p-5 rounded-xl border border-slate-800 space-y-2">
              <div className="text-xs text-slate-400 flex items-center justify-between">
                <span>ASME Hydro Quality Pass:</span>
                <Check className="w-4 h-4 text-cyan-400" />
              </div>
              <div className="text-2xl font-extrabold text-slate-100">99.8%</div>
              <p className="text-[10px] text-slate-500">First-Time Hydrotest Pass Rate</p>
            </div>

            <div className="bg-slate-950 p-5 rounded-xl border border-slate-800 space-y-2">
              <div className="text-xs text-slate-400 flex items-center justify-between">
                <span>AI Agent Queries:</span>
                <Bot className="w-4 h-4 text-indigo-400" />
              </div>
              <div className="text-2xl font-extrabold text-indigo-400">1,420 / Day</div>
              <p className="text-[10px] text-slate-500">Gemini 3.6 Flash Server Telemetry</p>
            </div>
          </div>
        </div>
      )}

      {activeTab === "crm" && (
        <div className="bg-slate-950 p-6 rounded-xl border border-slate-800 space-y-4 font-mono text-xs">
          <h4 className="text-sm font-bold text-slate-200 uppercase tracking-wider border-b border-slate-800 pb-3">
            CRM Global Lead Tracking
          </h4>

          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead className="bg-slate-900 text-slate-400 border-b border-slate-800">
                <tr>
                  <th className="p-3">Client Company</th>
                  <th className="p-3">Equipment Required</th>
                  <th className="p-3">Est. Value</th>
                  <th className="p-3">Lead Stage</th>
                  <th className="p-3">Priority</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800 text-slate-300">
                <tr className="hover:bg-slate-900/50">
                  <td className="p-3 font-bold text-slate-100">Siemens Energy AG</td>
                  <td className="p-3">12x Stator Air Coolers</td>
                  <td className="p-3 text-emerald-400">$1.85M</td>
                  <td className="p-3"><span className="px-2 py-0.5 rounded bg-cyan-950 border border-cyan-800 text-cyan-300">Engineering Review</span></td>
                  <td className="p-3 text-rose-400 font-bold">High</td>
                </tr>
                <tr className="hover:bg-slate-900/50">
                  <td className="p-3 font-bold text-slate-100">GE Vernova Power</td>
                  <td className="p-3">AES Bearing Oil Cooler Retrofit</td>
                  <td className="p-3 text-emerald-400">$940K</td>
                  <td className="p-3"><span className="px-2 py-0.5 rounded bg-emerald-950 border border-emerald-800 text-emerald-300">Proposal Sent</span></td>
                  <td className="p-3 text-rose-400 font-bold">High</td>
                </tr>
                <tr className="hover:bg-slate-900/50">
                  <td className="p-3 font-bold text-slate-100">Alfa Laval Corporate</td>
                  <td className="p-3">Titanium Surface Condenser Bundle</td>
                  <td className="p-3 text-emerald-400">$3.20M</td>
                  <td className="p-3"><span className="px-2 py-0.5 rounded bg-indigo-950 border border-indigo-800 text-indigo-300">Contract Signed</span></td>
                  <td className="p-3 text-cyan-400">Normal</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      )}

      {activeTab === "cms" && (
        <div className="bg-slate-950 p-6 rounded-xl border border-slate-800 space-y-6">
          <h4 className="text-sm font-bold font-mono text-slate-200 uppercase tracking-wider border-b border-slate-800 pb-3">
            CMS Asset & Drawing Upload Manager
          </h4>

          <div className="border-2 border-dashed border-slate-800 hover:border-cyan-500 rounded-2xl p-8 text-center space-y-3 cursor-pointer transition">
            <Upload className="w-8 h-8 text-cyan-400 mx-auto animate-bounce" />
            <div className="text-xs font-mono text-slate-300 font-bold">
              Drag & Drop ASME Drawings, CAD STEP Files, Product PDFs or Videos
            </div>
            <p className="text-[11px] text-slate-500 font-mono">
              Supports STEP, IGES, DWG, PDF, MP4 up to 500MB
            </p>

            <input
              type="file"
              onChange={handleFileUpload}
              className="hidden"
              id="cms-file-upload"
            />
            <label
              htmlFor="cms-file-upload"
              className="inline-block bg-slate-800 hover:bg-slate-700 text-cyan-300 font-mono text-xs px-4 py-2 rounded-xl cursor-pointer border border-slate-700"
            >
              Select File From Disk
            </label>

            {uploadedFileName && (
              <div className="text-xs font-mono text-emerald-400 font-bold pt-2">
                ✓ Uploaded File: {uploadedFileName}
              </div>
            )}
          </div>
        </div>
      )}

      {activeTab === "knowledge" && (
        <div className="bg-slate-950 p-6 rounded-xl border border-slate-800 space-y-4 font-mono text-xs">
          <h4 className="text-sm font-bold text-slate-200 uppercase tracking-wider border-b border-slate-800 pb-3">
            AI Knowledge Base Ingestion Engine
          </h4>

          <p className="text-slate-400">
            Ingest new TEMA Class R standards, ASME Section VIII updates, and proprietary Northern HeatEx engineering bulletins directly into the Gemini RAG vector database.
          </p>

          <div className="space-y-3 pt-2">
            <textarea
              rows={4}
              placeholder="Paste updated ASME Code clause, TEMA tolerance table, or material stress specification..."
              className="w-full bg-slate-900 border border-slate-700 text-slate-200 p-3 rounded-xl focus:outline-none focus:border-cyan-500"
            />
            <button className="bg-rose-600 hover:bg-rose-500 text-white font-bold px-5 py-2.5 rounded-xl text-xs flex items-center gap-2">
              <Plus className="w-4 h-4" />
              <span>Ingest Code Knowledge into Gemini</span>
            </button>
          </div>
        </div>
      )}

      {activeTab === "letterhead" && <OfficialLetterheadStudio />}
    </div>
  );
};
