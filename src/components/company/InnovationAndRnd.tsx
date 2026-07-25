import React, { useState } from "react";
import { motion } from "motion/react";
import {
  Sparkles,
  Bot,
  Cpu,
  Layers,
  Activity,
  Zap,
  Microscope,
  CheckCircle2,
  Gauge,
  Database,
  Search,
} from "lucide-react";

export const InnovationAndRndSection: React.FC = () => {
  // Page 16 Interactive Feature: Digital Twin Simulator Demo
  const [twinFoulingHours, setTwinFoulingHours] = useState<number>(4500);
  const [twinFlowRateGPM, setTwinFlowRateGPM] = useState<number>(1200);

  // Calculated Digital Twin Metrics
  const thermalEfficiencyPercent = Math.max(78, Number((99.4 - (twinFoulingHours / 1000) * 1.8).toFixed(1)));
  const pressureDropBar = (0.42 + (twinFoulingHours / 1000) * 0.12 * (twinFlowRateGPM / 1000)).toFixed(2);
  const predictedMaintenanceDays = Math.max(12, Math.round(180 - twinFoulingHours / 50));

  return (
    <div className="space-y-16">
      {/* PAGE 10: INNOVATION */}
      <section id="innovation" className="relative">
        <div className="bg-slate-950 border border-slate-800 rounded-3xl p-8 lg:p-12 shadow-2xl space-y-8">
          <div className="flex items-center justify-between border-b border-slate-800 pb-4">
            <div className="flex items-center gap-3">
              <span className="bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 text-xs font-mono px-3 py-1 rounded-full font-bold uppercase tracking-wider">
                Corporate Dossier • Page 10
              </span>
              <span className="text-slate-500 text-xs font-mono">|</span>
              <span className="text-slate-400 text-xs font-mono">AI, Automation & Digital Engineering</span>
            </div>
            <Sparkles className="w-5 h-5 text-cyan-400" />
          </div>

          <div className="max-w-3xl space-y-3">
            <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
              Pioneering Industrial Innovation & Digital Engineering
            </h2>
            <p className="text-slate-300 text-sm font-light leading-relaxed">
              Northern HeatEx leads the heat transfer sector in digital transformation. By combining AI neural networks with 3D CAD modeling, robotic welding, and real-time CFD simulation, we eliminate human design error and optimize heat exchanger performance.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 font-mono text-xs">
            <div className="bg-slate-900/80 p-5 rounded-2xl border border-slate-800 space-y-3">
              <Bot className="w-6 h-6 text-cyan-400" />
              <h4 className="text-sm font-bold text-slate-100">AI Thermal Optimization</h4>
              <p className="text-slate-400 font-sans leading-relaxed">
                Neural networks analyze millions of pitch, baffle, and fluid flow configurations in seconds to deliver optimal heat transfer coefficient U.
              </p>
            </div>

            <div className="bg-slate-900/80 p-5 rounded-2xl border border-slate-800 space-y-3">
              <Cpu className="w-6 h-6 text-cyan-400" />
              <h4 className="text-sm font-bold text-slate-100">3D CAD Parametric Automation</h4>
              <p className="text-slate-400 font-sans leading-relaxed">
                Automated generation of DXF fabrication CAD files and 3D step models directly integrated with shopfloor gantry CNC machine controllers.
              </p>
            </div>

            <div className="bg-slate-900/80 p-5 rounded-2xl border border-slate-800 space-y-3">
              <Layers className="w-6 h-6 text-cyan-400" />
              <h4 className="text-sm font-bold text-slate-100">Advanced CFD & FEA Simulation</h4>
              <p className="text-slate-400 font-sans leading-relaxed">
                Finite Element Analysis (FEA) verifies tubesheet flexure, nozzle stress moments, and flow-induced vibration (FIV) mitigation under seismic loads.
              </p>
            </div>

            <div className="bg-slate-900/80 p-5 rounded-2xl border border-slate-800 space-y-3">
              <Zap className="w-6 h-6 text-cyan-400" />
              <h4 className="text-sm font-bold text-slate-100">Automated Robotic Welding</h4>
              <p className="text-slate-400 font-sans leading-relaxed">
                Closed-loop robotic TIG orbital welding produces identical, zero-defect tube-to-tubesheet joint geometry across thousands of tubes.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* PAGE 16: RESEARCH & DEVELOPMENT (DIGITAL TWIN SIMULATOR) */}
      <section id="research-development" className="relative">
        <div className="bg-gradient-to-br from-slate-900 via-slate-950 to-slate-900 border border-slate-800 rounded-3xl p-8 lg:p-12 shadow-2xl space-y-8">
          <div className="flex items-center justify-between border-b border-slate-800 pb-4">
            <div className="flex items-center gap-3">
              <span className="bg-indigo-500/10 border border-indigo-500/30 text-indigo-400 text-xs font-mono px-3 py-1 rounded-full font-bold uppercase tracking-wider">
                Corporate Dossier • Page 16
              </span>
              <span className="text-slate-500 text-xs font-mono">|</span>
              <span className="text-slate-400 text-xs font-mono">Interactive R&D AI Digital Twin Telemetry Engine</span>
            </div>
            <Microscope className="w-5 h-5 text-indigo-400" />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            <div className="lg:col-span-5 space-y-4">
              <h3 className="text-xl font-bold text-white tracking-tight">
                R&D Initiative: Real-Time Heat Exchanger Digital Twin
              </h3>
              <p className="text-xs text-slate-300 leading-relaxed font-light">
                Our R&D laboratory is deploying IoT sensor telemetry connected to cloud AI digital twin models. Operating engineers can simulate real-time thermal fouling, pressure drop degradation, and schedule predictive maintenance before tube plugging occurs.
              </p>

              <div className="bg-slate-900/90 p-4 rounded-xl border border-slate-800 space-y-3 font-mono text-xs">
                <span className="text-indigo-400 font-bold block uppercase border-b border-slate-800 pb-2">
                  Key R&D Pillars:
                </span>
                <div className="space-y-1.5 text-slate-300">
                  <p>• Super Duplex UNS S32750 & Titanium Grade 2 pitting resistance research</p>
                  <p>• Spirally wound wire fin surface area enhancement (+350% heat flux)</p>
                  <p>• Acoustic resonance resonance mitigation baffles</p>
                </div>
              </div>
            </div>

            {/* Interactive Digital Twin Simulator Component */}
            <div className="lg:col-span-7 bg-slate-950 p-6 rounded-2xl border border-slate-800 space-y-5 font-mono">
              <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                <h4 className="text-xs font-bold text-slate-200 uppercase tracking-wider flex items-center gap-2">
                  <Activity className="w-4 h-4 text-indigo-400" />
                  NHEE R&D Digital Twin Predictive Simulator
                </h4>
                <span className="text-[10px] text-emerald-400 bg-emerald-950/60 px-2 py-0.5 rounded border border-emerald-500/30">
                  LIVE MODEL
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                <div>
                  <label className="text-slate-400 block mb-1">
                    Continuous Service Operating Hours: <span className="text-indigo-400 font-bold">{twinFoulingHours} Hours</span>
                  </label>
                  <input
                    type="range"
                    min="500"
                    max="10000"
                    step="250"
                    value={twinFoulingHours}
                    onChange={(e) => setTwinFoulingHours(Number(e.target.value))}
                    className="w-full accent-indigo-500"
                  />
                </div>

                <div>
                  <label className="text-slate-400 block mb-1">
                    Tube Side Flow Rate: <span className="text-indigo-400 font-bold">{twinFlowRateGPM} GPM</span>
                  </label>
                  <input
                    type="range"
                    min="500"
                    max="3000"
                    step="100"
                    value={twinFlowRateGPM}
                    onChange={(e) => setTwinFlowRateGPM(Number(e.target.value))}
                    className="w-full accent-indigo-500"
                  />
                </div>
              </div>

              {/* Dynamic Telemetry Metric Output */}
              <div className="grid grid-cols-3 gap-3 pt-2">
                <div className="bg-slate-900 p-3 rounded-xl border border-slate-800">
                  <span className="text-[10px] text-slate-500 block uppercase">Thermal Efficiency</span>
                  <span className="text-lg font-bold text-emerald-400 block mt-1">{thermalEfficiencyPercent}%</span>
                </div>

                <div className="bg-slate-900 p-3 rounded-xl border border-slate-800">
                  <span className="text-[10px] text-slate-500 block uppercase">Pressure Drop ΔP</span>
                  <span className="text-lg font-bold text-amber-400 block mt-1">{pressureDropBar} bar</span>
                </div>

                <div className="bg-slate-900 p-3 rounded-xl border border-slate-800">
                  <span className="text-[10px] text-slate-500 block uppercase">Predictive Maintenance</span>
                  <span className="text-lg font-bold text-cyan-400 block mt-1">In {predictedMaintenanceDays} Days</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
