import React, { useState } from "react";
import { motion } from "motion/react";
import {
  Users,
  ShieldCheck,
  CheckCircle2,
  Calendar,
  Clock,
  Send,
  Building2,
  Sparkles,
  Zap,
  Globe2,
  PhoneCall,
  Mail,
  Award,
  Cpu,
  Bot,
  Layers,
  Check,
} from "lucide-react";

interface LeadershipAndWhyUsProps {
  onRequestConsultation?: () => void;
}

export const LeadershipAndWhyUsSection: React.FC<LeadershipAndWhyUsProps> = ({
  onRequestConsultation,
}) => {
  // Page 20 State: Direct Leadership Meeting Schedule Form
  const [meetingSubmitted, setMeetingSubmitted] = useState(false);
  const [executiveContact, setExecutiveContact] = useState({
    name: "",
    email: "",
    company: "",
    executive: "Dr. H. Lindqvist (Chief Executive & Technical Officer)",
    topic: "Custom Shell & Tube Thermal Design",
    preferredDate: "2026-08-01",
    notes: "",
  });

  const handleMeetingSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setMeetingSubmitted(true);
    setTimeout(() => setMeetingSubmitted(false), 5000);
  };

  const whyReasons = [
    {
      num: "01",
      title: "48+ Years Specialized Thermal Expertise",
      desc: "Deep domain authority exclusively focused on heat transfer thermal and mechanical design, retubing, and component re-manufacturing.",
      icon: Award,
    },
    {
      num: "02",
      title: "Custom Tailored ASME & TEMA Engineering",
      desc: "No off-the-shelf compromises. Every exchanger is custom engineered for exact fluid chemistry, pressure drop, and thermal duty.",
      icon: Layers,
    },
    {
      num: "03",
      title: "Rapid Emergency Turnaround Response",
      desc: "24/7 emergency bundle extraction and retubing service designed to minimize costly plant outage downtime.",
      icon: Zap,
    },
    {
      num: "04",
      title: "ASME VIII Design & Third Party Inspection (TPI)",
      desc: "Fully compliant with international pressure vessel codes and inspected by independent third-party agencies (TPI) like Lloyd's, TUV, and BV.",
      icon: ShieldCheck,
    },
    {
      num: "05",
      title: "AI-Powered Thermal Optimization Suite",
      desc: "Integrated computational fluid dynamics (CFD) and AI modeling to prevent acoustic vibration, bypass fouling, and tube erosion.",
      icon: Bot,
    },
    {
      num: "06",
      title: "Cost-Effective Lifetime Value Ownership",
      desc: "Engineered with optimum corrosion allowances and heavy tubesheet margins to extend operating lifecycle beyond 30+ years.",
      icon: Cpu,
    },
    {
      num: "07",
      title: "Full Metallurgical Traceability & NDE",
      desc: "100% material test reports (MTRs), hydrostatic test logs, radiographic weld inspection, and helium vacuum leak certifications.",
      icon: CheckCircle2,
    },
    {
      num: "08",
      title: "Dedicated Global Engineering Support",
      desc: "Direct access to senior thermal specialists from initial conceptual budgeting through site installation and commissioning.",
      icon: Globe2,
    },
  ];

  const executiveTeam = [
    {
      name: "Dr. Henrik Lindqvist, P.Eng.",
      role: "Chief Executive Officer & Chief Engineer",
      credentials: "Ph.D. Thermal Physics (ETH Zürich) • ASME Committee Member",
      bio: "30+ years leading heavy thermal equipment design for Siemens Energy and Northern HeatEx. Holds 14 patents in helical baffle flow optimization.",
    },
    {
      name: "Eng. Astrid Vance, M.Sc.",
      role: "Vice President of Engineering & Technology",
      credentials: "M.Sc. Mechanical Engineering (MIT) • TEMA Technical Advisor",
      bio: "Specialist in Super Duplex metallurgy, vibration analysis, and high-pressure steam surface condenser thermal design.",
    },
    {
      name: "Marcus Thorne, MBA",
      role: "Chief Operating Officer",
      credentials: "Former Operations Lead at Rolls-Royce Energy",
      bio: "Oversees Haridwar manufacturing operations, lean CNC machining, and quality assurance compliance under Third Party Inspection.",
    },
    {
      name: "Dr. Rajesh K. Patel",
      role: "Director of R&D & AI Computational Fluid Dynamics",
      credentials: "Ph.D. Computational Fluid Dynamics (Imperial College London)",
      bio: "Pioneered the NHEE AI Thermal Engine that reduces thermal calculation cycle times by 92% while eliminating acoustic resonance risk.",
    },
  ];

  return (
    <div className="space-y-16">
      {/* PAGE 7: LEADERSHIP */}
      <section id="leadership" className="relative">
        <div className="bg-slate-950 border border-slate-800 rounded-3xl p-8 lg:p-12 shadow-2xl space-y-10">
          <div className="flex items-center justify-between border-b border-slate-800 pb-4">
            <div className="flex items-center gap-3">
              <span className="bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 text-xs font-mono px-3 py-1 rounded-full font-bold uppercase tracking-wider">
                Corporate Dossier • Page 07
              </span>
              <span className="text-slate-500 text-xs font-mono">|</span>
              <span className="text-slate-400 text-xs font-mono">Executive Leadership & Engineering Philosophy</span>
            </div>
            <Users className="w-5 h-5 text-cyan-400" />
          </div>

          <div className="max-w-3xl space-y-4">
            <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
              Executive Leadership & Engineering Governance
            </h2>
            <p className="text-slate-300 text-sm font-light leading-relaxed">
              At Northern HeatEx, our executive board is led by senior professional engineers, metallurgical scientists, and industrial operations veterans. We operate on a strictly engineering-first decision-making philosophy where technical integrity always supersedes short-term compromise.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-2">
            {executiveTeam.map((exec) => (
              <div
                key={exec.name}
                className="bg-slate-900/80 border border-slate-800 p-6 rounded-2xl hover:border-cyan-500/40 transition duration-300 space-y-3"
              >
                <div className="flex justify-between items-start">
                  <div>
                    <h4 className="text-base font-bold text-slate-100">{exec.name}</h4>
                    <p className="text-xs font-mono text-cyan-400 font-bold">{exec.role}</p>
                  </div>
                  <span className="bg-slate-800 text-slate-400 text-[10px] font-mono px-2 py-0.5 rounded border border-slate-700">
                    EXECUTIVE
                  </span>
                </div>

                <p className="text-[11px] font-mono text-slate-400 bg-slate-950 p-2 rounded border border-slate-800/80">
                  {exec.credentials}
                </p>

                <p className="text-xs text-slate-300 leading-relaxed font-sans">
                  {exec.bio}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* PAGE 8: WHY NORTHERN HEATEX */}
      <section id="why-northern-heatex" className="relative">
        <div className="bg-gradient-to-br from-slate-900 via-slate-950 to-slate-900 border border-slate-800 rounded-3xl p-8 lg:p-12 shadow-2xl space-y-8">
          <div className="flex items-center justify-between border-b border-slate-800 pb-4">
            <div className="flex items-center gap-3">
              <span className="bg-amber-500/10 border border-amber-500/30 text-amber-400 text-xs font-mono px-3 py-1 rounded-full font-bold uppercase tracking-wider">
                Corporate Dossier • Page 08
              </span>
              <span className="text-slate-500 text-xs font-mono">|</span>
              <span className="text-slate-400 text-xs font-mono">8 Differentiating Pillars</span>
            </div>
            <Sparkles className="w-5 h-5 text-amber-400" />
          </div>

          <div className="max-w-2xl space-y-2">
            <h2 className="text-2xl font-bold text-white tracking-tight">
              Why Global Energy & EPC Leaders Trust Northern HeatEx
            </h2>
            <p className="text-xs text-slate-400 font-mono">
              Proving why engineering buyers select Northern HeatEx over conventional equipment distributors.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 pt-2">
            {whyReasons.map((r) => {
              const IconComp = r.icon;
              return (
                <div
                  key={r.num}
                  className="bg-slate-900/90 border border-slate-800 p-5 rounded-2xl space-y-3 group hover:border-amber-500/50 transition duration-300 flex flex-col justify-between"
                >
                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <span className="text-xs font-mono font-bold text-amber-400 bg-amber-950/60 px-2 py-0.5 rounded border border-amber-500/30">
                        {r.num}
                      </span>
                      <IconComp className="w-4 h-4 text-slate-500 group-hover:text-amber-400 transition" />
                    </div>
                    <h4 className="text-sm font-bold text-slate-100 group-hover:text-amber-300 transition font-mono">
                      {r.title}
                    </h4>
                    <p className="text-xs text-slate-400 leading-relaxed font-sans">
                      {r.desc}
                    </p>
                  </div>

                  <div className="pt-3 border-t border-slate-800/80 text-[10px] font-mono text-slate-500 flex justify-between">
                    <span>PROVEN ADVANTAGE</span>
                    <span className="text-amber-400">✓ VERIFIED</span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* PAGE 20: CONTACT LEADERSHIP & DIRECT CONSULTATION SCHEDULER */}
      <section id="contact-leadership" className="relative">
        <div className="bg-slate-950 border border-slate-800 rounded-3xl p-8 lg:p-12 shadow-2xl space-y-8">
          <div className="flex items-center justify-between border-b border-slate-800 pb-4">
            <div className="flex items-center gap-3">
              <span className="bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 text-xs font-mono px-3 py-1 rounded-full font-bold uppercase tracking-wider">
                Corporate Dossier • Page 20
              </span>
              <span className="text-slate-500 text-xs font-mono">|</span>
              <span className="text-slate-400 text-xs font-mono">Direct Technical & Executive Consultation</span>
            </div>
            <PhoneCall className="w-5 h-5 text-cyan-400" />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            <div className="lg:col-span-5 space-y-6">
              <h3 className="text-xl font-bold text-white tracking-tight">
                Schedule a Direct Executive Engineering Consultation
              </h3>
              <p className="text-xs text-slate-300 leading-relaxed font-light">
                Connect directly with our Chief Engineer or Vice President of Technology to discuss complex thermal design, emergency shutdown retubing, or strategic OEM partnerships.
              </p>

              <div className="bg-slate-900/80 p-5 rounded-2xl border border-slate-800 space-y-3 font-mono text-xs">
                <div className="flex items-center gap-3 text-slate-200">
                  <Mail className="w-4 h-4 text-cyan-400" />
                  <span>inquiry@northernheatex.co.in • northernheatex@outlook.in</span>
                </div>
                <div className="flex items-center gap-3 text-slate-200">
                  <Building2 className="w-4 h-4 text-cyan-400" />
                  <span>Works: Noor Engineering Works (est. 1983), Shastri Nagar, Near G.G.I. College, Jwalapur, Haridwar – 249407, India</span>
                </div>
                <div className="flex items-center gap-3 text-slate-200">
                  <Clock className="w-4 h-4 text-cyan-400" />
                  <span>Direct Helpline: +91 97603 62826 / +91 82670 18270</span>
                </div>
              </div>
            </div>

            <div className="lg:col-span-7 bg-slate-900/90 p-6 rounded-2xl border border-slate-800 space-y-4">
              <h4 className="text-xs font-mono font-bold text-slate-200 uppercase tracking-wider flex items-center gap-2 border-b border-slate-800 pb-3">
                <Calendar className="w-4 h-4 text-cyan-400" />
                Book Executive Consultation Meeting
              </h4>

              {meetingSubmitted ? (
                <div className="bg-emerald-950/80 border border-emerald-800 text-emerald-300 p-4 rounded-xl text-xs font-mono space-y-2">
                  <div className="flex items-center gap-2 font-bold text-sm">
                    <Check className="w-5 h-5 text-emerald-400" />
                    <span>Consultation Meeting Requested Successfully!</span>
                  </div>
                  <p className="text-slate-300">
                    Our executive office will confirm your meeting with {executiveContact.executive} for {executiveContact.preferredDate}.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleMeetingSubmit} className="space-y-4 font-mono text-xs">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="text-slate-400 block mb-1">Your Full Name:</label>
                      <input
                        type="text"
                        required
                        value={executiveContact.name}
                        onChange={(e) => setExecutiveContact({ ...executiveContact, name: e.target.value })}
                        placeholder="e.g. David Ross, Lead Engineer"
                        className="w-full bg-slate-950 border border-slate-800 rounded-lg p-2.5 text-slate-200 focus:border-cyan-500 focus:outline-none"
                      />
                    </div>

                    <div>
                      <label className="text-slate-400 block mb-1">Corporate Email:</label>
                      <input
                        type="email"
                        required
                        value={executiveContact.email}
                        onChange={(e) => setExecutiveContact({ ...executiveContact, email: e.target.value })}
                        placeholder="e.g. d.ross@energycorp.com"
                        className="w-full bg-slate-950 border border-slate-800 rounded-lg p-2.5 text-slate-200 focus:border-cyan-500 focus:outline-none"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="text-slate-400 block mb-1">Company / Organization:</label>
                      <input
                        type="text"
                        required
                        value={executiveContact.company}
                        onChange={(e) => setExecutiveContact({ ...executiveContact, company: e.target.value })}
                        placeholder="e.g. Siemens Energy / Shell Global"
                        className="w-full bg-slate-950 border border-slate-800 rounded-lg p-2.5 text-slate-200 focus:border-cyan-500 focus:outline-none"
                      />
                    </div>

                    <div>
                      <label className="text-slate-400 block mb-1">Select Executive Leader:</label>
                      <select
                        value={executiveContact.executive}
                        onChange={(e) => setExecutiveContact({ ...executiveContact, executive: e.target.value })}
                        className="w-full bg-slate-950 border border-slate-800 rounded-lg p-2.5 text-slate-200 focus:border-cyan-500 focus:outline-none"
                      >
                        <option value="Dr. H. Lindqvist (Chief Executive & Technical Officer)">Dr. H. Lindqvist (CEO & Chief Engineer)</option>
                        <option value="Eng. A. Vance (VP Engineering)">Eng. A. Vance (VP Engineering & Metallurgy)</option>
                        <option value="M. Thorne (Chief Operating Officer)">M. Thorne (Chief Operating Officer)</option>
                        <option value="Dr. R. Patel (Director of R&D / AI)">Dr. R. Patel (Director of R&D / AI)</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="text-slate-400 block mb-1">Consultation Topic / Project Scope:</label>
                    <textarea
                      rows={3}
                      value={executiveContact.notes}
                      onChange={(e) => setExecutiveContact({ ...executiveContact, notes: e.target.value })}
                      placeholder="Specify thermal duty, fluid parameters, or emergency retubing timeline..."
                      className="w-full bg-slate-950 border border-slate-800 rounded-lg p-2.5 text-slate-200 focus:border-cyan-500 focus:outline-none"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold py-3 rounded-xl flex items-center justify-center gap-2 transition shadow-lg shadow-cyan-500/20"
                  >
                    <Send className="w-4 h-4" />
                    <span>Submit Executive Consultation Request</span>
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
