import React, { useState } from "react";
import { SAMPLE_PROJECTS } from "../../data/mockData";
import { CustomerProject } from "../../types";
import { UserCheck, ShieldCheck, Download, CheckCircle2, Clock, FileText, ChevronRight, MessageSquare } from "lucide-react";

export const CustomerPortal: React.FC = () => {
  const [selectedProject, setSelectedProject] = useState<CustomerProject>(SAMPLE_PROJECTS[0]);
  const [activeTab, setActiveTab] = useState<"projects" | "downloads" | "tickets">("projects");
  const [ticketSubject, setTicketSubject] = useState("");
  const [ticketDesc, setTicketDesc] = useState("");
  const [ticketSubmitted, setTicketSubmitted] = useState(false);

  const handleTicketSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setTicketSubmitted(true);
    setTimeout(() => {
      setTicketSubmitted(false);
      setTicketSubject("");
      setTicketDesc("");
    }, 4000);
  };

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-2xl space-y-8">
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-4 border-b border-slate-800 pb-4">
        <div>
          <h3 className="text-xl font-bold text-slate-100 flex items-center gap-2">
            <UserCheck className="w-6 h-6 text-cyan-400" />
            Client & Customer Portal
          </h3>
          <p className="text-xs text-slate-400 font-mono">
            Live manufacturing progress tracking, ASME U1 certificates, engineering reports & consultation
          </p>
        </div>

        {/* Portal Tabs */}
        <div className="flex items-center gap-2 font-mono text-xs">
          <button
            onClick={() => setActiveTab("projects")}
            className={`px-3 py-1.5 rounded-lg border transition ${
              activeTab === "projects"
                ? "bg-cyan-950 border-cyan-500 text-cyan-300 font-bold"
                : "bg-slate-950 border-slate-800 text-slate-400"
            }`}
          >
            Live Projects ({SAMPLE_PROJECTS.length})
          </button>
          <button
            onClick={() => setActiveTab("downloads")}
            className={`px-3 py-1.5 rounded-lg border transition ${
              activeTab === "downloads"
                ? "bg-cyan-950 border-cyan-500 text-cyan-300 font-bold"
                : "bg-slate-950 border-slate-800 text-slate-400"
            }`}
          >
            Data Reports & CAD Downloads
          </button>
          <button
            onClick={() => setActiveTab("tickets")}
            className={`px-3 py-1.5 rounded-lg border transition ${
              activeTab === "tickets"
                ? "bg-cyan-950 border-cyan-500 text-cyan-300 font-bold"
                : "bg-slate-950 border-slate-800 text-slate-400"
            }`}
          >
            Engineering Support
          </button>
        </div>
      </div>

      {activeTab === "projects" && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Projects List Selection Sidebar */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold font-mono text-slate-400 uppercase tracking-wider">
              Active Fabrication Projects
            </h4>
            {SAMPLE_PROJECTS.map((proj) => {
              const isSelected = selectedProject.id === proj.id;
              return (
                <div
                  key={proj.id}
                  onClick={() => setSelectedProject(proj)}
                  className={`cursor-pointer p-4 rounded-xl border transition duration-200 space-y-2 ${
                    isSelected
                      ? "bg-slate-950 border-cyan-500 shadow-lg shadow-cyan-950"
                      : "bg-slate-950/60 border-slate-800 hover:border-slate-700"
                  }`}
                >
                  <div className="flex justify-between items-start">
                    <span className="text-[11px] font-mono text-cyan-400 font-bold">{proj.projectNumber}</span>
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-cyan-950 border border-cyan-800 text-cyan-300">
                      {proj.status}
                    </span>
                  </div>
                  <h5 className="font-bold text-xs text-slate-100 line-clamp-1">{proj.title}</h5>
                  <p className="text-[11px] text-slate-400 font-mono">{proj.clientCompany}</p>

                  {/* Progress bar */}
                  <div className="space-y-1 pt-1">
                    <div className="flex justify-between text-[10px] font-mono text-slate-400">
                      <span>Completion:</span>
                      <span className="text-cyan-300 font-bold">{proj.progressPercent}%</span>
                    </div>
                    <div className="w-full bg-slate-800 h-1.5 rounded-full overflow-hidden">
                      <div
                        className="bg-cyan-400 h-full rounded-full transition-all duration-500"
                        style={{ width: `${proj.progressPercent}%` }}
                      ></div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Active Project Milestones & Live Status Detail */}
          <div className="lg:col-span-2 space-y-6 bg-slate-950 p-6 rounded-xl border border-slate-800">
            <div className="flex flex-wrap items-center justify-between gap-4 border-b border-slate-800 pb-4">
              <div>
                <span className="text-xs font-mono text-cyan-400 font-bold">{selectedProject.projectNumber}</span>
                <h4 className="text-base font-bold text-slate-100">{selectedProject.title}</h4>
                <p className="text-xs text-slate-400 font-mono">TEMA Type: {selectedProject.temaType} • Est. Delivery: {selectedProject.estimatedDelivery}</p>
              </div>

              {selectedProject.asmeStamped && (
                <div className="bg-emerald-950 border border-emerald-800 px-3 py-1.5 rounded-lg flex items-center gap-2 text-xs font-mono text-emerald-300 font-bold">
                  <ShieldCheck className="w-4 h-4 text-emerald-400" />
                  Third Party Inspection Verified
                </div>
              )}
            </div>

            {/* Milestones Timeline */}
            <div className="space-y-4">
              <h5 className="text-xs font-bold font-mono text-slate-300 uppercase tracking-wider">
                Manufacturing & Quality Inspection Milestones
              </h5>

              <div className="space-y-3 font-mono text-xs">
                {selectedProject.milestones.map((ms, idx) => {
                  return (
                    <div
                      key={ms.id}
                      className={`p-3.5 rounded-xl border flex items-start justify-between gap-4 ${
                        ms.status === "Completed"
                          ? "bg-slate-900 border-emerald-800/80 text-slate-200"
                          : ms.status === "In Progress"
                          ? "bg-cyan-950/60 border-cyan-600 text-cyan-200"
                          : "bg-slate-900/40 border-slate-800 text-slate-500"
                      }`}
                    >
                      <div className="flex items-start gap-3">
                        <div className="mt-0.5">
                          {ms.status === "Completed" ? (
                            <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                          ) : ms.status === "In Progress" ? (
                            <Clock className="w-4 h-4 text-cyan-400 animate-pulse" />
                          ) : (
                            <div className="w-4 h-4 rounded-full border border-slate-700"></div>
                          )}
                        </div>
                        <div>
                          <div className="font-bold">{ms.title}</div>
                          <div className="text-[11px] text-slate-400 leading-relaxed">{ms.description}</div>
                        </div>
                      </div>

                      <div className="text-right shrink-0">
                        <span className="text-[10px] px-2 py-0.5 rounded border border-slate-700 font-bold">
                          {ms.status}
                        </span>
                        {ms.completionDate && (
                          <div className="text-[10px] text-slate-500 mt-1">{ms.completionDate}</div>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      )}

      {activeTab === "downloads" && (
        <div className="bg-slate-950 p-6 rounded-xl border border-slate-800 space-y-4">
          <h4 className="text-sm font-bold font-mono text-slate-200 uppercase tracking-wider border-b border-slate-800 pb-3">
            ASME Data Reports & CAD Engineering Downloads
          </h4>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {selectedProject.documents.map((doc, idx) => (
              <div
                key={idx}
                className="bg-slate-900 p-4 rounded-xl border border-slate-800 flex items-center justify-between gap-4 hover:border-cyan-500/60 transition"
              >
                <div className="flex items-center gap-3">
                  <div className="p-2.5 rounded-lg bg-cyan-950 text-cyan-400 border border-cyan-800">
                    <FileText className="w-5 h-5" />
                  </div>
                  <div>
                    <h5 className="font-bold text-xs text-slate-100">{doc.title}</h5>
                    <p className="text-[11px] font-mono text-slate-400">{doc.type} • {doc.size}</p>
                  </div>
                </div>

                <button className="p-2 rounded-lg bg-slate-800 hover:bg-cyan-400 hover:text-slate-950 text-cyan-300 transition">
                  <Download className="w-4 h-4" />
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      {activeTab === "tickets" && (
        <div className="bg-slate-950 p-6 rounded-xl border border-slate-800 space-y-6">
          <h4 className="text-sm font-bold font-mono text-slate-200 uppercase tracking-wider border-b border-slate-800 pb-3">
            Direct Senior Engineering Consultation & Support
          </h4>

          {ticketSubmitted ? (
            <div className="bg-emerald-950 border border-emerald-800 text-emerald-300 p-4 rounded-xl text-xs font-mono flex items-center gap-3">
              <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />
              <span>Engineering Support Ticket submitted! A lead thermal engineer will contact you within 2 business hours.</span>
            </div>
          ) : (
            <form onSubmit={handleTicketSubmit} className="space-y-4 font-mono text-xs">
              <div>
                <label className="text-slate-400">Inquiry Subject:</label>
                <input
                  type="text"
                  required
                  value={ticketSubject}
                  onChange={(e) => setTicketSubject(e.target.value)}
                  placeholder="e.g. Requesting nozzle redesign for 200 bar operating pressure"
                  className="w-full bg-slate-900 border border-slate-700 text-slate-200 p-2.5 rounded-xl mt-1 focus:outline-none focus:border-cyan-500"
                />
              </div>

              <div>
                <label className="text-slate-400">Detailed Description & Technical Requirements:</label>
                <textarea
                  rows={4}
                  required
                  value={ticketDesc}
                  onChange={(e) => setTicketDesc(e.target.value)}
                  placeholder="Provide fluid operating conditions, ASME code exceptions, or delivery schedule inquiries..."
                  className="w-full bg-slate-900 border border-slate-700 text-slate-200 p-2.5 rounded-xl mt-1 focus:outline-none focus:border-cyan-500"
                />
              </div>

              <button
                type="submit"
                className="bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-extrabold px-6 py-2.5 rounded-xl text-xs flex items-center gap-2 shadow-lg shadow-cyan-500/20 transition"
              >
                <MessageSquare className="w-4 h-4" />
                <span>Submit Engineering Consultation Ticket</span>
              </button>
            </form>
          )}
        </div>
      )}
    </div>
  );
};
