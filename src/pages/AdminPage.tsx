import React from "react";
import { useRouter } from "../context/RouterContext";
import { AdminManagementPortal } from "../components/admin/AdminManagementPortal";
import { Settings, ShieldAlert, Users, Database, Sparkles } from "lucide-react";

export const AdminPage: React.FC = () => {
  const { navigate } = useRouter();

  return (
    <div className="space-y-8">
      {/* Hero Banner */}
      <div className="bg-slate-900 rounded-3xl p-6 sm:p-10 text-white relative overflow-hidden border border-slate-800 shadow-xl">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-950/80 via-slate-900 to-cyan-950/80 z-10" />

        <div className="relative z-20 space-y-4 max-w-4xl">
          <span className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-amber-500/20 text-amber-300 border border-amber-500/30 text-xs font-mono font-bold uppercase tracking-wider">
            <Settings className="w-3.5 h-3.5 text-amber-400" />
            HARIDWAR WORKS OPERATIONS & CRM ADMIN PORTAL
          </span>

          <h1 className="text-3xl sm:text-4xl font-black tracking-tight text-white">
            Enterprise Management & AI System Admin
          </h1>

          <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
            Manage incoming RFQ inquiries, plant manufacturing schedules, CMS product catalogue, user role permissions, and AI prompt training systems.
          </p>
        </div>
      </div>

      {/* Embedded Admin Portal */}
      <AdminManagementPortal />
    </div>
  );
};
