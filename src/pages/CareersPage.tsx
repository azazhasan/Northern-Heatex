import React, { useState } from "react";
import { useRouter } from "../context/RouterContext";
import { GraduationCap, Briefcase, Send, CheckCircle2, Award, Upload } from "lucide-react";

export const CareersPage: React.FC = () => {
  const { navigate } = useRouter();
  const [submitted, setSubmitted] = useState(false);
  const [applicant, setApplicant] = useState({ name: "", email: "", phone: "", role: "Thermal Design Engineer", resume: "" });

  const jobOpenings = [
    {
      title: "Senior Thermal Design Engineer (TEMA / HTRI)",
      dept: "Engineering Directorate",
      location: "Haridwar Works, Uttarakhand",
      type: "Full-Time Permanent",
      reqs: "B.Tech / M.Tech Mechanical Engineering with 5+ years experience in HTRI/TEMA heat exchanger thermal sizing.",
    },
    {
      title: "Precision CNC Programmer & Machinist",
      dept: "Manufacturing Bay 1",
      location: "Haridwar Works, Uttarakhand",
      type: "Full-Time Permanent",
      reqs: "ITI / Diploma Mechanical with 3+ years in deep hole tubesheet drilling and Fanuc/Siemens CNC controller programming.",
    },
    {
      title: "Certified TIG Welder (Tube-to-Tubesheet)",
      dept: "Quality Welding Bay",
      location: "Haridwar Works, Uttarakhand",
      type: "Full-Time Permanent",
      reqs: "ASME IX certified orbital GTAW/TIG welder for Super Duplex, Titanium Grade 2, and Cu-Ni alloys.",
    },
    {
      title: "ASNT Level II NDE Quality Inspector",
      dept: "Quality Assurance",
      location: "Haridwar Works, Uttarakhand",
      type: "Full-Time Permanent",
      reqs: "Certified in Eddy Current Testing (ET), Dye Penetrant (PT), and Radiographic Interpretation (RT).",
    },
  ];

  return (
    <div className="space-y-12">
      {/* Careers Hero Banner */}
      <div className="bg-slate-900 rounded-3xl p-6 sm:p-10 text-white relative overflow-hidden border border-slate-800 shadow-xl">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-950/80 via-slate-900 to-cyan-950/80 z-10" />

        <div className="relative z-20 space-y-4 max-w-4xl">
          <span className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-amber-500/20 text-amber-300 border border-amber-500/30 text-xs font-mono font-bold uppercase tracking-wider">
            <GraduationCap className="w-3.5 h-3.5 text-amber-400" />
            CAREERS AT HARIDWAR WORKS • UTTARAKHAND
          </span>

          <h1 className="text-3xl sm:text-4xl font-black tracking-tight text-white">
            Build Asia's Energy Infrastructure With Us
          </h1>

          <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
            Join Northern HeatEx Corporation (Noor Engineering Works Est. 1983). We offer competitive packages, ASME training, and direct involvement in landmark power plant projects.
          </p>
        </div>
      </div>

      {/* Openings Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {jobOpenings.map((job, idx) => (
          <div key={idx} className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm hover:border-[#0056A6] transition duration-200 space-y-4 flex flex-col justify-between">
            <div className="space-y-2">
              <span className="text-[10px] font-mono font-bold bg-blue-50 text-[#0056A6] px-2.5 py-1 rounded border border-blue-200 uppercase">
                {job.dept}
              </span>
              <h3 className="text-lg font-bold text-slate-900">{job.title}</h3>
              <p className="text-xs font-mono text-slate-500">{job.location} • {job.type}</p>
              <p className="text-xs text-slate-600 leading-relaxed font-sans">{job.reqs}</p>
            </div>

            <button
              onClick={() => {
                setApplicant({ ...applicant, role: job.title });
                const el = document.getElementById("apply-form");
                if (el) el.scrollIntoView({ behavior: "smooth" });
              }}
              className="w-full bg-[#0056A6] hover:bg-blue-700 text-white font-mono text-xs font-bold py-2.5 rounded-xl transition cursor-pointer text-center"
            >
              Apply for Position →
            </button>
          </div>
        ))}
      </div>

      {/* Application Form */}
      <div id="apply-form" className="bg-slate-50 border border-slate-200 rounded-2xl p-6 sm:p-10 max-w-2xl mx-auto space-y-6">
        <div className="text-center space-y-2">
          <h3 className="text-2xl font-bold text-slate-900">Submit Direct Job Application</h3>
          <p className="text-xs text-slate-600">Send your resume to our Haridwar Works HR Directorate.</p>
        </div>

        {submitted ? (
          <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-6 text-center space-y-2 font-mono text-xs">
            <CheckCircle2 className="w-8 h-8 text-emerald-600 mx-auto" />
            <h4 className="text-base font-bold text-slate-900 font-sans">Application Received</h4>
            <p className="text-slate-600">Thank you, {applicant.name}. Our Haridwar HR team will review your application within 3 business days.</p>
          </div>
        ) : (
          <form
            onSubmit={(e) => {
              e.preventDefault();
              setSubmitted(true);
            }}
            className="space-y-4 font-mono text-xs"
          >
            <div className="space-y-1">
              <label className="font-bold text-slate-800">Target Role *</label>
              <input
                type="text"
                required
                value={applicant.role}
                onChange={(e) => setApplicant({ ...applicant, role: e.target.value })}
                className="w-full bg-white border border-slate-300 rounded-xl px-3.5 py-2 text-slate-900 font-bold"
              />
            </div>

            <div className="space-y-1">
              <label className="font-bold text-slate-800">Full Name *</label>
              <input
                type="text"
                required
                placeholder="e.g. Er. Vikram Singh"
                value={applicant.name}
                onChange={(e) => setApplicant({ ...applicant, name: e.target.value })}
                className="w-full bg-white border border-slate-300 rounded-xl px-3.5 py-2 text-slate-900"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1">
                <label className="font-bold text-slate-800">Email Address *</label>
                <input
                  type="email"
                  required
                  placeholder="vikram@example.com"
                  value={applicant.email}
                  onChange={(e) => setApplicant({ ...applicant, email: e.target.value })}
                  className="w-full bg-white border border-slate-300 rounded-xl px-3.5 py-2 text-slate-900"
                />
              </div>

              <div className="space-y-1">
                <label className="font-bold text-slate-800">Phone Number *</label>
                <input
                  type="tel"
                  required
                  placeholder="+91 98765 43210"
                  value={applicant.phone}
                  onChange={(e) => setApplicant({ ...applicant, phone: e.target.value })}
                  className="w-full bg-white border border-slate-300 rounded-xl px-3.5 py-2 text-slate-900"
                />
              </div>
            </div>

            <button
              type="submit"
              className="w-full bg-[#0056A6] hover:bg-blue-700 text-white font-extrabold py-3.5 rounded-xl uppercase tracking-wider transition cursor-pointer flex items-center justify-center gap-2"
            >
              <Send className="w-4 h-4" /> Submit Application to Haridwar Works HR
            </button>
          </form>
        )}
      </div>
    </div>
  );
};
