import React, { useState, useEffect, useRef } from "react";
import { Volume2, VolumeX, Sparkles } from "lucide-react";

export const AudioController: React.FC = () => {
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const audioCtxRef = useRef<AudioContext | null>(null);
  const gainNodeRef = useRef<GainNode | null>(null);
  const oscRef = useRef<OscillatorNode | null>(null);
  const noiseNodeRef = useRef<AudioBufferSourceNode | null>(null);

  const toggleAudio = () => {
    if (!isPlaying) {
      startAmbientSound();
    } else {
      stopAmbientSound();
    }
  };

  const startAmbientSound = () => {
    try {
      const AudioCtx = window.AudioContext || (window as any).webkitAudioContext;
      if (!AudioCtx) return;

      const ctx = new AudioCtx();
      audioCtxRef.current = ctx;

      // Master Gain
      const masterGain = ctx.createGain();
      masterGain.gain.setValueAtTime(0.08, ctx.currentTime); // Soft background volume
      masterGain.connect(ctx.destination);
      gainNodeRef.current = masterGain;

      // Low Frequency Industrial Turbine Hum (45Hz + 90Hz)
      const osc1 = ctx.createOscillator();
      osc1.type = "sine";
      osc1.frequency.setValueAtTime(45, ctx.currentTime);

      const oscGain = ctx.createGain();
      oscGain.gain.setValueAtTime(0.4, ctx.currentTime);
      osc1.connect(oscGain);
      oscGain.connect(masterGain);
      osc1.start();
      oscRef.current = osc1;

      // White Noise Steam Hiss
      const bufferSize = ctx.sampleRate * 2;
      const noiseBuffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
      const output = noiseBuffer.getChannelData(0);
      for (let i = 0; i < bufferSize; i++) {
        output[i] = Math.random() * 2 - 1;
      }

      const whiteNoise = ctx.createBufferSource();
      whiteNoise.buffer = noiseBuffer;
      whiteNoise.loop = true;

      // Bandpass Filter for soft steam hiss
      const filter = ctx.createBiquadFilter();
      filter.type = "bandpass";
      filter.frequency.setValueAtTime(1200, ctx.currentTime);
      filter.Q.setValueAtTime(3.0, ctx.currentTime);

      const noiseGain = ctx.createGain();
      noiseGain.gain.setValueAtTime(0.05, ctx.currentTime);

      whiteNoise.connect(filter);
      filter.connect(noiseGain);
      noiseGain.connect(masterGain);
      whiteNoise.start();
      noiseNodeRef.current = whiteNoise;

      setIsPlaying(true);
    } catch (e) {
      console.error("Audio Synthesis error:", e);
    }
  };

  const stopAmbientSound = () => {
    if (audioCtxRef.current) {
      audioCtxRef.current.close();
      audioCtxRef.current = null;
    }
    setIsPlaying(false);
  };

  useEffect(() => {
    return () => {
      stopAmbientSound();
    };
  }, []);

  return (
    <div className="fixed bottom-6 right-6 z-40">
      <button
        onClick={toggleAudio}
        className={`flex items-center gap-2 px-3.5 py-2 rounded-full text-xs font-mono font-semibold transition shadow-xl border backdrop-blur-md cursor-pointer ${
          isPlaying
            ? "bg-cyan-950/90 text-cyan-300 border-cyan-500/50 glow-cyan"
            : "bg-[#0a0a0a]/90 text-white/60 border-white/10 hover:text-white hover:border-white/20"
        }`}
        title="Toggle Industrial Steam Ambience Audio"
      >
        {isPlaying ? (
          <>
            <Volume2 className="w-4 h-4 text-cyan-400 animate-pulse" />
            <span className="hidden sm:inline">Ambience On</span>
            <span className="flex gap-0.5 items-end h-3">
              <span className="w-0.5 bg-cyan-400 h-2 animate-bounce"></span>
              <span className="w-0.5 bg-cyan-400 h-3 animate-bounce delay-100"></span>
              <span className="w-0.5 bg-cyan-400 h-1.5 animate-bounce delay-200"></span>
            </span>
          </>
        ) : (
          <>
            <VolumeX className="w-4 h-4 text-white/40" />
            <span className="hidden sm:inline">Subtle Industrial Sound</span>
          </>
        )}
      </button>
    </div>
  );
};
