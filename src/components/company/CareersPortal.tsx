import React, { useState } from "react";
import { motion } from "motion/react";
import {
  GraduationCap,
  Briefcase,
  UserPlus,
  Send,
  CheckCircle2,
  Building2,
  Clock,
  MapPin,
  Sparkles,
  Award,
  ChevronRight,
  X,
  FileText,
} from "lucide-react";

export const CareersPortalSection: React.FC = () => {
  const [selectedJob, setSelectedJob] = useState<string | null>(null);
  const [applicationSubmitted, setApplicationSubmitted] = useState(false);
  const [applicantForm, setApplicantForm] = useState({
    fullName: "",
    email: "",
    phone: "",
    experienceYears: "5",
    coverNote: "",
  });

  const jobOpenings = [
    {
      id: "JOB-101",
      title: "Senior Thermal Design Engineer (HTRI Specialist)",
      location: "Haridwar, Uttarakhand / Hybrid",
      department: "Thermal Engineering Division",
      type: "Full-Time Permanent",
      experience: "7+ Years",
      desc: "Lead thermal sizing and rating of high-pressure shell and tube heat exchangers using HTRI and NHEE AI Engine. Supervise vibration and acoustic resonance calculations under TPI inspection.",
    },
    {
      id: "JOB-102",
      title: "Chief Metallurgical & Welding Inspector (CWI / NDE Level III)",
      location: "Noor Engineering Works • Haridwar Works",
      department: "Quality Assurance & Inspection",
      type: "Full-Time Permanent",
      experience: "10+ Years",
      desc: "Oversee NDE radiographies, hydrostatic vacuum leak testing, and Super Duplex UNS S32750 orbital TIG welding procedure qualifications (WPS/PQR) under Third Party Inspection.",
    },
    {
      id: "JOB-103",
      title: "High-Precision CNC Milling & Drilling Lead Machinist",
      location: "Noor Engineering Works, Jwalapur",
      department: "Precision Machining Operations",
      type: "Full-Time Permanent",
      experience: "5+ Years",
      desc: "Operate high-speed deep-hole tubesheet drilling and milling centers with micron-level tolerances. Programming in Mastercam / Siemens Sinumerik.",
    },
    {
      id: "JOB-104",
      title: "AI Computational Fluid Dynamics (CFD) Scientist",
      location: "Haridwar R&D Laboratory",
      department: "Advanced R&D Laboratory",
      type: "Full-Time Permanent",
      experience: "Ph.D. / 3+ Years",
      desc: "Develop next-generation AI physics-informed neural networks (PINNs) for real-time heat exchanger digital twin fouling prediction.",
    },
  ];

  const handleApplySubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setApplicationSubmitted(true);
    setTimeout(() => {
      setApplicationSubmitted(false);
      setSelectedJob(null);
    }, 4500);
  };

  return (
    <div id="careers" className="relative">
      <div className="bg-slate-950 border border-slate-800 rounded-3xl p-8 lg:p-12 shadow-2xl space-y-10">
        {/* Header */}
        <div className="flex flex-wrap items-center justify-between gap-4 border-b border-slate-800 pb-4">
          <div className="flex items-center gap-3">
            <span className="bg-purple-500/10 border border-purple-500/30 text-purple-400 text-xs font-mono px-3 py-1 rounded-full font-bold uppercase tracking-wider">
              Corporate Dossier • Page 18
            </span>
            <span className="text-slate-500 text-xs font-mono">|</span>
            <span className="text-slate-400 text-xs font-mono">Global Engineering Careers & Graduate Fellowship</span>
          </div>
          <GraduationCap className="w-5 h-5 text-purple-400" />
        </div>

        <div className="max-w-3xl space-y-3">
          <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
            Shape the Future of Global Thermal Technology
          </h2>
          <p className="text-slate-300 text-sm font-light leading-relaxed">
            Northern HeatEx offers an empowering environment for world-class engineers, metallurgists, CNC machinists, and software architects. We invest heavily in our team through competitive compensation, university fellowship support, and career advancement across North America and Europe.
          </p>
        </div>

        {/* Benefits Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 font-mono text-xs">
          <div className="bg-slate-900/80 p-4 rounded-2xl border border-slate-800 space-y-2">
            <Award className="w-5 h-5 text-purple-400" />
            <h4 className="font-bold text-slate-100">Top-Tier Global Benefits</h4>
            <p className="text-slate-400 font-sans">100% employer-funded healthcare, pension match, and profit-sharing dividends.</p>
          </div>

          <div className="bg-slate-900/80 p-4 rounded-2xl border border-slate-800 space-y-2">
            <GraduationCap className="w-5 h-5 text-purple-400" />
            <h4 className="font-bold text-slate-100">Graduate & Intern Fellowships</h4>
            <p className="text-slate-400 font-sans">Rotational 24-month engineering graduate development program with ASME mentorship.</p>
          </div>

          <div className="bg-slate-900/80 p-4 rounded-2xl border border-slate-800 space-y-2">
            <Sparkles className="w-5 h-5 text-purple-400" />
            <h4 className="font-bold text-slate-100">Continuous R&D Sponsorship</h4>
            <p className="text-slate-400 font-sans">Tuition reimbursement for Master's, Ph.D., and ASME technical committee participation.</p>
          </div>
        </div>

        {/* Current Job Openings */}
        <div className="space-y-4 pt-4">
          <h3 className="text-xs font-mono font-bold text-slate-200 uppercase tracking-wider border-b border-slate-800 pb-2">
            Active Global Career Opportunities ({jobOpenings.length} Positions)
          </h3>

          <div className="space-y-3">
            {jobOpenings.map((job) => (
              <div
                key={job.id}
                className="bg-slate-900/80 border border-slate-800 p-5 rounded-2xl hover:border-purple-500/40 transition flex flex-col md:flex-row md:items-center justify-between gap-4 font-mono"
              >
                <div className="space-y-2 max-w-2xl">
                  <div className="flex flex-wrap items-center gap-2 text-[11px]">
                    <span className="text-purple-400 font-bold bg-purple-950/60 px-2 py-0.5 rounded border border-purple-500/30">
                      {job.id}
                    </span>
                    <span className="text-slate-400 flex items-center gap-1">
                      <MapPin className="w-3 h-3 text-slate-500" /> {job.location}
                    </span>
                    <span className="text-slate-400 flex items-center gap-1">
                      <Clock className="w-3 h-3 text-slate-500" /> {job.type}
                    </span>
                  </div>

                  <h4 className="text-base font-bold text-slate-100">{job.title}</h4>
                  <p className="text-xs text-slate-400 font-sans leading-relaxed">{job.desc}</p>
                </div>

                <button
                  onClick={() => setSelectedJob(job.title)}
                  className="bg-purple-600 hover:bg-purple-500 text-white font-bold px-4 py-2.5 rounded-xl text-xs flex items-center gap-2 transition self-start md:self-center shrink-0 shadow-md shadow-purple-950/40"
                >
                  <UserPlus className="w-4 h-4" />
                  <span>Apply Now</span>
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Online Application Modal */}
        {selectedJob && (
          <div className="fixed inset-0 z-50 bg-slate-950/90 backdrop-blur-md flex items-center justify-center p-4">
            <div className="bg-slate-900 border border-purple-500/50 max-w-lg w-full rounded-2xl p-6 shadow-2xl space-y-4 font-mono text-xs relative">
              <button
                onClick={() => setSelectedJob(null)}
                className="absolute top-4 right-4 text-slate-400 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="border-b border-slate-800 pb-3">
                <span className="text-[10px] text-purple-400 font-bold uppercase block">Official Application</span>
                <h4 className="text-sm font-bold text-slate-100">{selectedJob}</h4>
              </div>

              {applicationSubmitted ? (
                <div className="bg-emerald-950/80 border border-emerald-800 text-emerald-300 p-4 rounded-xl space-y-2">
                  <div className="flex items-center gap-2 text-sm font-bold">
                    <CheckCircle2 className="w-5 h-5 text-emerald-400" />
                    <span>Application Submitted Successfully!</span>
                  </div>
                  <p className="text-slate-300">
                    Our HR Engineering Acquisition team will review your credentials within 48 business hours.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleApplySubmit} className="space-y-3">
                  <div>
                    <label className="text-slate-400 block mb-1">Full Candidate Name:</label>
                    <input
                      type="text"
                      required
                      value={applicantForm.fullName}
                      onChange={(e) => setApplicantForm({ ...applicantForm, fullName: e.target.value })}
                      placeholder="e.g. Sarah Jenkins"
                      className="w-full bg-slate-950 border border-slate-800 rounded p-2.5 text-slate-200 focus:border-purple-500 focus:outline-none"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-2">
                    <div>
                      <label className="text-slate-400 block mb-1">Email:</label>
                      <input
                        type="email"
                        required
                        value={applicantForm.email}
                        onChange={(e) => setApplicantForm({ ...applicantForm, email: e.target.value })}
                        placeholder="s.jenkins@domain.com"
                        className="w-full bg-slate-950 border border-slate-800 rounded p-2.5 text-slate-200 focus:border-purple-500 focus:outline-none"
                      />
                    </div>

                    <div>
                      <label className="text-slate-400 block mb-1">Years Experience:</label>
                      <input
                        type="number"
                        required
                        value={applicantForm.experienceYears}
                        onChange={(e) => setApplicantForm({ ...applicantForm, experienceYears: e.target.value })}
                        className="w-full bg-slate-950 border border-slate-800 rounded p-2.5 text-slate-200 focus:border-purple-500 focus:outline-none"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="text-slate-400 block mb-1">Brief Technical Background / Cover Note:</label>
                    <textarea
                      rows={3}
                      value={applicantForm.coverNote}
                      onChange={(e) => setApplicantForm({ ...applicantForm, coverNote: e.target.value })}
                      placeholder="Outline your ASME, HTRI, or CNC experience..."
                      className="w-full bg-slate-950 border border-slate-800 rounded p-2.5 text-slate-200 focus:border-purple-500 focus:outline-none"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full bg-purple-600 hover:bg-purple-500 text-white font-bold py-3 rounded-xl flex items-center justify-center gap-2 transition"
                  >
                    <Send className="w-4 h-4" />
                    <span>Submit Candidate Application</span>
                  </button>
                </form>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
