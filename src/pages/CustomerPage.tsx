import React from "react";
import { useRouter } from "../context/RouterContext";
import { CustomerPortal } from "../components/portal/CustomerPortal";
import { UserCheck, ShieldCheck, FileText, Clock, Send } from "lucide-react";

export const CustomerPage: React.FC = () => {
  const { navigate } = useRouter();

  return (
    <div className="space-y-8">
      {/* Hero Banner */}
      <div className="bg-slate-900 rounded-3xl p-6 sm:p-10 text-white relative overflow-hidden border border-slate-800 shadow-xl">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-950/80 via-slate-900 to-cyan-950/80 z-10" />

        <div className="relative z-20 space-y-4 max-w-4xl">
          <span className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-cyan-500/20 text-cyan-300 border border-cyan-500/30 text-xs font-mono font-bold uppercase tracking-wider">
            <UserCheck className="w-3.5 h-3.5 text-cyan-400" />
            ENTERPRISE CLIENT OPERATIONS PORTAL
          </span>

          <h1 className="text-3xl sm:text-4xl font-black tracking-tight text-white">
            Client Dashboard & Project Tracker
          </h1>

          <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
            Track live manufacturing progress, download ASME Manufacturer Data Reports (MDR), inspect e-Invoices with GST details, and manage Annual Maintenance Contracts (AMC).
          </p>
        </div>
      </div>

      {/* Embedded Customer Portal */}
      <CustomerPortal />
    </div>
  );
};
