import React, { useState, useEffect } from "react";
import { Star, ShieldCheck, ChevronLeft, ChevronRight, Quote } from "lucide-react";

export interface TestimonialItem {
  id: string;
  clientName: string;
  role: string;
  company: string;
  location: string;
  quote: string;
  project: string;
  rating: number;
}

export const TESTIMONIALS_DATA: TestimonialItem[] = [
  {
    id: "t1",
    clientName: "Dr. Marcus Vance",
    role: "Chief Technical Officer",
    company: "Siemens Energy Global",
    location: "Erlangen, Germany",
    quote: "Northern HeatEx delivered three TEMA Class R high-pressure stator air coolers during our emergency turbine turnaround. Their thermal calculations were pinpoint accurate and the 3D CAD models integrated flawlessly.",
    project: "500MW Stator Cooler Turnaround",
    rating: 5,
  },
  {
    id: "t2",
    clientName: "Elena Rostova",
    role: "VP of Hydro Generation Maintenance",
    company: "Ontario Power Generation",
    location: "Toronto, Canada",
    quote: "When our hydro station guide bearing oil cooler failed unexpectedly, Northern HeatEx dispatched a specialized retubing team within 18 hours. The unit was restored and pressure-tested with Third Party Inspection (TPI) clearance in under 3 days.",
    project: "Hydro Turbine Oil Cooler Retubing",
    rating: 5,
  },
  {
    id: "t3",
    clientName: "David K. Sterling",
    role: "Lead Mechanical Integrity Specialist",
    company: "Indian Oil Corporation Limited",
    location: "Mathura, India",
    quote: "Their wire-wound fin tubes provided a dramatic reduction in fluid fouling in our bitumen preheat train. Heat transfer duty improved by 28% without increasing overall pressure drop across the shell.",
    project: "Wire-Wound Fin Tube Retrofit",
    rating: 5,
  },
  {
    id: "t4",
    clientName: "Jean-Luc Dubois",
    role: "Director of Plant Engineering",
    company: "GE Vernova Steam Power",
    location: "Belfort, France",
    quote: "The quality of their precision CNC tubesheet drilling and orbital tube-to-tubesheet strength welding is world-class. Northern HeatEx remains our preferred partner for complex custom heat exchangers.",
    project: "Nuclear Auxiliary Heat Exchangers",
    rating: 5,
  },
];

export const TestimonialsSection: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState<number>(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % TESTIMONIALS_DATA.length);
    }, 6000);
    return () => clearInterval(timer);
  }, []);

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % TESTIMONIALS_DATA.length);
  };

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev - 1 + TESTIMONIALS_DATA.length) % TESTIMONIALS_DATA.length);
  };

  const current = TESTIMONIALS_DATA[currentIndex];

  return (
    <section id="testimonials" className="py-20 bg-[#050505] text-white border-t border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <span className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-950/80 border border-blue-500/30 text-cyan-300 text-xs font-mono font-bold uppercase tracking-wider glow-blue">
            <Quote className="w-3.5 h-3.5 text-cyan-400" />
            Section 8 • Enterprise Endorsements
          </span>

          <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight">
            Trusted By Global{" "}
            <span className="bg-gradient-to-r from-cyan-400 via-blue-400 to-indigo-300 bg-clip-text text-transparent">
              Energy Leaders
            </span>
          </h2>
        </div>

        {/* 3D Animated Card Carousel */}
        <div className="relative max-w-4xl mx-auto">
          <div className="bg-[#0a0a0a] border border-cyan-500/30 rounded-3xl p-8 sm:p-12 shadow-2xl space-y-6 relative overflow-hidden glow-blue">
            <div className="absolute top-0 right-0 p-8 opacity-10 text-cyan-400">
              <Quote className="w-32 h-32" />
            </div>

            {/* Rating Stars */}
            <div className="flex items-center gap-1 text-amber-400">
              {[...Array(current.rating)].map((_, i) => (
                <Star key={i} className="w-5 h-5 fill-current" />
              ))}
              <span className="text-xs font-mono text-white/50 ml-2">Verified Client Endorsement</span>
            </div>

            {/* Quote */}
            <p className="text-base sm:text-xl font-medium text-white/90 leading-relaxed italic">
              "{current.quote}"
            </p>

            {/* Author */}
            <div className="flex flex-wrap items-center justify-between gap-4 pt-6 border-t border-white/10 font-mono">
              <div>
                <div className="text-base font-bold text-cyan-400">{current.clientName}</div>
                <div className="text-xs text-white/70">{current.role} • <span className="text-white font-bold">{current.company}</span></div>
                <div className="text-[11px] text-white/40">{current.location}</div>
              </div>

              <div className="text-right">
                <span className="text-[10px] uppercase text-white/40 block">Project Scope</span>
                <span className="text-xs text-cyan-300 font-bold bg-white/5 px-3 py-1 rounded border border-white/10 inline-block">
                  {current.project}
                </span>
              </div>
            </div>
          </div>

          {/* Controls */}
          <div className="flex items-center justify-between mt-6">
            <div className="flex items-center gap-2">
              {TESTIMONIALS_DATA.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => setCurrentIndex(idx)}
                  className={`w-3 h-3 rounded-full transition cursor-pointer ${
                    currentIndex === idx ? "bg-cyan-400 w-8" : "bg-white/20 hover:bg-white/40"
                  }`}
                />
              ))}
            </div>

            <div className="flex items-center gap-2 font-mono text-xs">
              <button
                onClick={handlePrev}
                className="w-10 h-10 rounded-full bg-[#0a0a0a] border border-white/10 hover:border-cyan-500 flex items-center justify-center text-white transition cursor-pointer"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              <button
                onClick={handleNext}
                className="w-10 h-10 rounded-full bg-[#0a0a0a] border border-white/10 hover:border-cyan-500 flex items-center justify-center text-white transition cursor-pointer"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
