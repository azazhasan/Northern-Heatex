import React, { useState } from "react";
import {
  Settings,
  Cpu,
  Database,
  Lock,
  Bot,
  FileCode,
  DollarSign,
  ShieldCheck,
  CheckCircle2,
  Terminal,
  Layers,
  Server,
  Cloud,
  Zap,
} from "lucide-react";

export const SettingsAndSpecModule: React.FC = () => {
  const [activeSpecSection, setActiveSpecSection] = useState<
    "ui" | "workflow" | "database" | "api" | "security" | "ai" | "pricing" | "roadmap"
  >("ui");

  return (
    <div className="space-y-8 animate-fadeIn">
      {/* Header Banner */}
      <div className="relative bg-gradient-to-br from-[#070912] via-[#05070d] to-[#0c101d] border border-cyan-500/30 rounded-3xl p-8 shadow-2xl overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-3 max-w-3xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-950 text-cyan-400 border border-cyan-500/40 text-xs font-mono font-bold uppercase">
              <Settings className="w-3.5 h-3.5 text-cyan-400" /> Platform Architecture & SaaS Settings (Module 14)
            </div>

            <h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
              NHES Production Software Specification
            </h1>

            <p className="text-sm text-cyan-200/80 font-normal leading-relaxed">
              Complete production enterprise SaaS architecture spec for Northern HeatEx Engineering Suite: user interface architecture, database schema, REST/gRPC API structures, security & RBAC protocols, AI agent design, pricing tiers, and scalability roadmap.
            </p>
          </div>
        </div>
      </div>

      {/* Spec Section Sub-Tabs */}
      <div className="flex flex-wrap items-center gap-2 bg-[#080a0f] p-2 rounded-2xl border border-white/10 font-mono text-xs">
        <button
          onClick={() => setActiveSpecSection("ui")}
          className={`px-4 py-2.5 rounded-xl font-bold transition flex items-center gap-2 ${
            activeSpecSection === "ui" ? "bg-cyan-500 text-slate-950 shadow-lg" : "text-white/60 hover:text-white"
          }`}
        >
          <Layers className="w-4 h-4" /> UI Architecture
        </button>
        <button
          onClick={() => setActiveSpecSection("workflow")}
          className={`px-4 py-2.5 rounded-xl font-bold transition flex items-center gap-2 ${
            activeSpecSection === "workflow" ? "bg-cyan-500 text-slate-950 shadow-lg" : "text-white/60 hover:text-white"
          }`}
        >
          <Cpu className="w-4 h-4" /> Workflows
        </button>
        <button
          onClick={() => setActiveSpecSection("database")}
          className={`px-4 py-2.5 rounded-xl font-bold transition flex items-center gap-2 ${
            activeSpecSection === "database" ? "bg-cyan-500 text-slate-950 shadow-lg" : "text-white/60 hover:text-white"
          }`}
        >
          <Database className="w-4 h-4" /> Database Schema
        </button>
        <button
          onClick={() => setActiveSpecSection("api")}
          className={`px-4 py-2.5 rounded-xl font-bold transition flex items-center gap-2 ${
            activeSpecSection === "api" ? "bg-cyan-500 text-slate-950 shadow-lg" : "text-white/60 hover:text-white"
          }`}
        >
          <Server className="w-4 h-4" /> API Structure
        </button>
        <button
          onClick={() => setActiveSpecSection("security")}
          className={`px-4 py-2.5 rounded-xl font-bold transition flex items-center gap-2 ${
            activeSpecSection === "security" ? "bg-cyan-500 text-slate-950 shadow-lg" : "text-white/60 hover:text-white"
          }`}
        >
          <Lock className="w-4 h-4" /> Security & RBAC
        </button>
        <button
          onClick={() => setActiveSpecSection("ai")}
          className={`px-4 py-2.5 rounded-xl font-bold transition flex items-center gap-2 ${
            activeSpecSection === "ai" ? "bg-cyan-500 text-slate-950 shadow-lg" : "text-white/60 hover:text-white"
          }`}
        >
          <Bot className="w-4 h-4" /> AI Interaction
        </button>
        <button
          onClick={() => setActiveSpecSection("pricing")}
          className={`px-4 py-2.5 rounded-xl font-bold transition flex items-center gap-2 ${
            activeSpecSection === "pricing" ? "bg-cyan-500 text-slate-950 shadow-lg" : "text-white/60 hover:text-white"
          }`}
        >
          <DollarSign className="w-4 h-4" /> SaaS Subscription
        </button>
      </div>

      {/* Active Spec Content Block */}
      <div className="bg-[#080a0f] border border-white/10 rounded-3xl p-6 sm:p-8 space-y-6 shadow-2xl font-mono text-xs">
        {activeSpecSection === "ui" && (
          <div className="space-y-4">
            <h3 className="text-lg font-bold text-white flex items-center gap-2">
              <Layers className="w-5 h-5 text-cyan-400" /> User Interface & Component Architecture
            </h3>
            <p className="text-white/80 leading-relaxed">
              NHES is designed as a modular SPA leveraging React 18, Vite, Tailwind CSS, and Framer Motion layout animation.
              The interface follows an Apple-inspired dark luxury industrial aesthetic with high contrast, crisp typography, and responsive grid layouts.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
              <div className="p-4 bg-black/40 rounded-2xl border border-white/10 space-y-2">
                <strong className="text-cyan-400 block uppercase">1. Global Navigation Shell</strong>
                <p className="text-white/70">Top sticky header with role selector dropdown, active status indicators, and 14 primary engineering tabs.</p>
              </div>

              <div className="p-4 bg-black/40 rounded-2xl border border-white/10 space-y-2">
                <strong className="text-cyan-400 block uppercase">2. Viewport Canvas & 3D WebGL Studio</strong>
                <p className="text-white/70">Interactive vector CAD rendering for 2D tubesheet patterns and 3D WebGL canvas for parametric shell-and-tube models.</p>
              </div>
            </div>
          </div>
        )}

        {activeSpecSection === "database" && (
          <div className="space-y-4">
            <h3 className="text-lg font-bold text-white flex items-center gap-2">
              <Database className="w-5 h-5 text-cyan-400" /> Recommended Database Schema (Drizzle / PostgreSQL / Firestore)
            </h3>

            <div className="p-4 bg-slate-950 rounded-2xl border border-white/15 overflow-x-auto text-cyan-300">
              <pre>{`// PostgreSQL Drizzle ORM Schema
export const projects = pgTable("projects", {
  id: uuid("id").primaryKey().defaultRandom(),
  projectNumber: varchar("project_number", { length: 50 }).notNull().unique(),
  clientCompany: varchar("client_company", { length: 255 }).notNull(),
  temaType: varchar("tema_type", { length: 10 }).notNull(),
  designPressureShellBar: numeric("design_pressure_shell_bar").notNull(),
  designPressureTubeBar: numeric("design_pressure_tube_bar").notNull(),
  hotSideFluid: jsonb("hot_side_fluid").notNull(),
  coldSideFluid: jsonb("cold_side_fluid").notNull(),
  status: varchar("status", { length: 50 }).default("Engineering Review"),
  createdAt: timestamp("created_at").defaultNow(),
});`}</pre>
            </div>
          </div>
        )}

        {activeSpecSection === "api" && (
          <div className="space-y-4">
            <h3 className="text-lg font-bold text-white flex items-center gap-2">
              <Server className="w-5 h-5 text-cyan-400" /> API Structure & Endpoints
            </h3>

            <div className="space-y-2">
              <div className="p-3 bg-black/40 rounded-xl border border-white/10 flex items-center justify-between">
                <div><span className="px-2 py-0.5 bg-emerald-950 text-emerald-400 font-bold rounded mr-2">POST</span>/api/gemini/thermal-engineer</div>
                <span className="text-white/40">Thermal LMTD & U Calculation</span>
              </div>
              <div className="p-3 bg-black/40 rounded-xl border border-white/10 flex items-center justify-between">
                <div><span className="px-2 py-0.5 bg-emerald-950 text-emerald-400 font-bold rounded mr-2">POST</span>/api/gemini/mechanical-engineer</div>
                <span className="text-white/40">ASME UG-27 Shell & Tubesheet Thickness</span>
              </div>
              <div className="p-3 bg-black/40 rounded-xl border border-white/10 flex items-center justify-between">
                <div><span className="px-2 py-0.5 bg-cyan-950 text-cyan-400 font-bold rounded mr-2">GET</span>/api/projects/:id/dxf-drawing</div>
                <span className="text-white/40">AutoCAD DXF Vector Export</span>
              </div>
            </div>
          </div>
        )}

        {activeSpecSection === "security" && (
          <div className="space-y-4">
            <h3 className="text-lg font-bold text-white flex items-center gap-2">
              <Lock className="w-5 h-5 text-cyan-400" /> Security, Auth & Role-Based Access Control (RBAC)
            </h3>

            <p className="text-white/80">
              Supported Roles: Guest, Registered User, Professional Engineer, Enterprise Customer, Company Administrator, Super Administrator.
              Full JWT authentication with encrypted API proxying to protect proprietary thermal sizing algorithms and secrets.
            </p>
          </div>
        )}

        {activeSpecSection === "pricing" && (
          <div className="space-y-4">
            <h3 className="text-lg font-bold text-white flex items-center gap-2">
              <DollarSign className="w-5 h-5 text-amber-400" /> Enterprise SaaS Subscription Model
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="p-4 bg-black/40 rounded-2xl border border-white/10 space-y-2">
                <div className="text-white font-bold text-base">Standard Engineer</div>
                <div className="text-2xl font-black text-cyan-400">$299 / mo</div>
                <p className="text-white/60">Includes thermal calculators, 2D tube layouts, and basic PDF export.</p>
              </div>

              <div className="p-4 bg-black/40 rounded-2xl border border-cyan-500/50 rounded-2xl space-y-2 bg-cyan-950/20">
                <div className="text-cyan-300 font-bold text-base">Professional Enterprise</div>
                <div className="text-2xl font-black text-cyan-300">$899 / mo</div>
                <p className="text-white/60">Full AI Suite, ASME mechanical verification, AutoCAD DXF export, and BOM builder.</p>
              </div>

              <div className="p-4 bg-black/40 rounded-2xl border border-indigo-500/50 space-y-2">
                <div className="text-indigo-300 font-bold text-base">Global Power / EPC</div>
                <div className="text-2xl font-black text-indigo-300">Custom Quote</div>
                <p className="text-white/60">Dedicated cloud deployment, custom ERP integration, and multi-facility license.</p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
