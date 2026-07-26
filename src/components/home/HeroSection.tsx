import React, { useEffect, useRef, useState } from "react";
import * as THREE from "three";
import { ArrowRight, MessageSquare, Phone, Mail, Zap, ChevronDown, Calculator, ShieldCheck } from "lucide-react";

interface HeroSectionProps {
  onExploreSolutions: () => void;
  onTalkToEngineer: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  onExploreSolutions,
  onTalkToEngineer,
}) => {
  const mountRef = useRef<HTMLDivElement>(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  useEffect(() => {
    if (!mountRef.current) return;

    const width = mountRef.current.clientWidth;
    const height = mountRef.current.clientHeight;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 1000);
    camera.position.set(10, 5, 12);
    camera.lookAt(0, 0, 0);

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

    mountRef.current.innerHTML = "";
    mountRef.current.appendChild(renderer.domElement);

    const ambientLight = new THREE.AmbientLight(0xffffff, 1.2);
    scene.add(ambientLight);

    const cyanLight = new THREE.DirectionalLight(0x00a6d6, 4.0);
    cyanLight.position.set(12, 12, 10);
    scene.add(cyanLight);

    const blueLight = new THREE.DirectionalLight(0x0056a6, 3.5);
    blueLight.position.set(-10, -5, 8);
    scene.add(blueLight);

    const modelGroup = new THREE.Group();
    scene.add(modelGroup);

    // 1. Semi-Transparent Outer Shell Body
    const shellGeo = new THREE.CylinderGeometry(1.6, 1.6, 9, 32, 1, true);
    const shellMat = new THREE.MeshPhysicalMaterial({
      color: 0x0056a6,
      transparent: true,
      opacity: 0.45,
      roughness: 0.1,
      metalness: 0.8,
      transmission: 0.6,
      side: THREE.DoubleSide,
    });
    const shellMesh = new THREE.Mesh(shellGeo, shellMat);
    shellMesh.rotation.z = Math.PI / 2;
    modelGroup.add(shellMesh);

    // 2. Copper Tubes Bundle
    const bundleGroup = new THREE.Group();
    modelGroup.add(bundleGroup);

    const copperMat = new THREE.MeshStandardMaterial({
      color: 0xd97706,
      metalness: 0.95,
      roughness: 0.15,
    });

    const numTubes = 90;
    const bundleRadius = 1.3;
    const tubeGeo = new THREE.CylinderGeometry(0.06, 0.06, 8.8, 12);

    for (let i = 0; i < numTubes; i++) {
      const angle = (i / numTubes) * Math.PI * 2 * (1 + Math.floor(i / 15) * 0.4);
      const r = Math.sqrt(i / numTubes) * bundleRadius;
      const y = Math.sin(angle) * r;
      const z = Math.cos(angle) * r;

      const tube = new THREE.Mesh(tubeGeo, copperMat);
      tube.rotation.z = Math.PI / 2;
      tube.position.set(0, y, z);
      bundleGroup.add(tube);
    }

    // 3. Tubesheet Disks
    const tubesheetGeo = new THREE.CylinderGeometry(1.55, 1.55, 0.3, 32);
    const tubesheetMat = new THREE.MeshStandardMaterial({ color: 0x64748b, metalness: 0.9, roughness: 0.2 });

    const frontTubesheet = new THREE.Mesh(tubesheetGeo, tubesheetMat);
    frontTubesheet.rotation.z = Math.PI / 2;
    frontTubesheet.position.x = -4.3;
    bundleGroup.add(frontTubesheet);

    const rearTubesheet = new THREE.Mesh(tubesheetGeo, tubesheetMat);
    rearTubesheet.rotation.z = Math.PI / 2;
    rearTubesheet.position.x = 4.3;
    bundleGroup.add(rearTubesheet);

    // Mouse Move
    const handleMouseMove = (e: MouseEvent) => {
      const x = (e.clientX / window.innerWidth - 0.5) * 2;
      const y = (e.clientY / window.innerHeight - 0.5) * 2;
      setMousePos({ x, y });
    };
    window.addEventListener("mousemove", handleMouseMove);

    let animationFrameId: number;
    let clock = new THREE.Clock();

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);
      const elapsedTime = clock.getElapsedTime();

      modelGroup.rotation.y = elapsedTime * 0.25 + mousePos.x * 0.3;
      modelGroup.rotation.x = Math.sin(elapsedTime * 0.4) * 0.15 + mousePos.y * 0.2;
      modelGroup.position.y = Math.sin(elapsedTime * 0.8) * 0.2;

      renderer.render(scene, camera);
    };

    animate();

    const handleResize = () => {
      if (!mountRef.current) return;
      const w = mountRef.current.clientWidth;
      const h = mountRef.current.clientHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("resize", handleResize);
      if (renderer.domElement) renderer.domElement.remove();
    };
  }, [mousePos]);

  return (
    <section className="relative w-full min-h-[85vh] bg-gradient-to-b from-slate-50 via-blue-50/40 to-slate-100 overflow-hidden flex flex-col justify-between pt-8 pb-12 rounded-3xl border border-slate-200 mb-12 shadow-sm">
      {/* 3D WebGL Viewport Canvas */}
      <div ref={mountRef} className="absolute inset-0 z-0 opacity-70 pointer-events-none" />

      {/* Hero Content Overlay */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full flex-1 flex flex-col justify-center space-y-6 py-8">
        {/* Top Tagline Badge */}
        <div className="flex items-center gap-2">
          <span className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-50 border border-blue-200 text-[#0056A6] text-xs font-mono font-bold uppercase tracking-wider shadow-sm">
            <Zap className="w-3.5 h-3.5 text-[#00A6D6]" />
            ASME SEC VIII DIV 1 & TEMA • NOOR ENGINEERING WORKS (EST. 1983)
          </span>
        </div>

        {/* Headings */}
        <div className="max-w-3xl space-y-4">
          <h1 className="text-4xl sm:text-6xl font-black text-slate-900 tracking-tight leading-[1.1]">
            Enterprise Thermal{" "}
            <span className="text-[#0056A6]">
              & Mechanical Engineering
            </span>
          </h1>

          <p className="text-slate-700 text-base sm:text-lg leading-relaxed font-medium max-w-2xl">
            Northern HeatEx Corporation delivers precision heat exchangers, hydro coolers, field retubing, reverse engineering, and Indian GST compliant commercial solutions for power generation, defense, chemical, and heavy industrial enterprises.
          </p>
        </div>

        {/* CTA Buttons */}
        <div className="flex flex-wrap items-center gap-4 pt-2">
          <button
            onClick={onExploreSolutions}
            className="bg-[#0056A6] hover:bg-blue-700 text-white font-bold px-7 py-3.5 rounded-xl text-xs uppercase tracking-wider flex items-center gap-2 shadow-md transition-all cursor-pointer"
          >
            <span>Explore Products</span>
            <ArrowRight className="w-4 h-4 text-cyan-300" />
          </button>

          <button
            onClick={onTalkToEngineer}
            className="bg-white hover:bg-slate-50 text-slate-800 border border-slate-300 px-7 py-3.5 rounded-xl text-xs font-bold flex items-center gap-2 shadow-sm transition-all cursor-pointer"
          >
            <MessageSquare className="w-4 h-4 text-[#0056A6]" />
            <span>Talk to Engineering Lead</span>
          </button>
        </div>

        {/* Key Metrics Bar */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 pt-6 border-t border-slate-200 text-xs max-w-4xl">
          <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm">
            <div className="text-2xl font-black text-[#0056A6]">40+ Years</div>
            <div className="text-slate-500 font-medium text-[11px] mt-0.5">Established 1983</div>
          </div>
          <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm">
            <div className="text-2xl font-black text-slate-900">5,000+</div>
            <div className="text-slate-500 font-medium text-[11px] mt-0.5">Units Fabricated & Refurbished</div>
          </div>
          <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm">
            <div className="text-2xl font-black text-[#00A6D6]">TEMA Coded</div>
            <div className="text-slate-500 font-medium text-[11px] mt-0.5">ASME Coded Fabrication</div>
          </div>
          <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm">
            <div className="text-2xl font-black text-[#F7931E]">100% GST</div>
            <div className="text-slate-500 font-medium text-[11px] mt-0.5">Compliant Tax Invoicing</div>
          </div>
        </div>
      </div>

      {/* Floating Hotline Controls */}
      <div className="fixed bottom-8 right-6 z-40 flex flex-col gap-2.5">
        <a
          href="https://wa.me/919760362826"
          target="_blank"
          rel="noopener noreferrer"
          className="w-12 h-12 rounded-full bg-emerald-600 hover:bg-emerald-500 text-white flex items-center justify-center shadow-lg transition hover:scale-105"
          title="WhatsApp Hotline"
        >
          <MessageSquare className="w-5 h-5 fill-current" />
        </a>
        <a
          href="tel:+919760362826"
          className="w-12 h-12 rounded-full bg-[#0056A6] hover:bg-blue-700 text-white flex items-center justify-center shadow-lg transition hover:scale-105"
          title="Direct Phone Line"
        >
          <Phone className="w-5 h-5" />
        </a>
      </div>
    </section>
  );
};
