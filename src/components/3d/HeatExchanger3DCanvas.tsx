import React, { useEffect, useRef, useState } from "react";
import * as THREE from "three";
import { TEMAType } from "../../types";
import { Layers, Eye, RefreshCw, Flame, Sliders, Box, Maximize2, LayoutGrid, FileText, Sparkles, Activity, Layers3 } from "lucide-react";
import { HeatExchangerCutawayDiagram } from "./HeatExchangerCutawayDiagram";
import { AcrylicDemoExchangerModel } from "./AcrylicDemoExchangerModel";

interface HeatExchanger3DCanvasProps {
  temaType?: TEMAType;
  shellDiameter?: number; // mm
  tubeCount?: number;
  tubeLength?: number;
  shellMaterial?: string;
  onParametersChange?: (params: any) => void;
}

export const HeatExchanger3DCanvas: React.FC<HeatExchanger3DCanvasProps> = ({
  temaType = "BEM",
  shellDiameter = 800,
  tubeCount = 180,
  tubeLength = 6000,
  shellMaterial = "Carbon Steel",
}) => {
  const mountRef = useRef<HTMLDivElement>(null);
  const [viewMode, setViewMode] = useState<"3d" | "cutaway" | "acrylic" | "dual">("dual");
  const [exploded, setExploded] = useState<number>(0); // 0 to 1
  const [thermalMode, setThermalMode] = useState<boolean>(true);
  const [wireframe, setWireframe] = useState<boolean>(false);
  const [selectedTEMAType, setSelectedTEMAType] = useState<TEMAType>(temaType);
  const [transparency, setTransparency] = useState<number>(0.35);
  const [autoRotate, setAutoRotate] = useState<boolean>(true);

  // Three.js object references
  const sceneRef = useRef<THREE.Scene | null>(null);
  const shellMeshRef = useRef<THREE.Mesh | null>(null);
  const bundleGroupRef = useRef<THREE.Group | null>(null);
  const bafflesGroupRef = useRef<THREE.Group | null>(null);
  const frontChannelRef = useRef<THREE.Mesh | null>(null);
  const rearChannelRef = useRef<THREE.Mesh | null>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const cameraRef = useRef<THREE.PerspectiveCamera | null>(null);

  useEffect(() => {
    if ((viewMode !== "3d" && viewMode !== "dual") || !mountRef.current) return;

    const width = mountRef.current.clientWidth;
    const height = mountRef.current.clientHeight;

    // Scene
    const scene = new THREE.Scene();
    sceneRef.current = scene;
    scene.background = new THREE.Color(0x0a0f1d); // Deep dark industrial slate

    // Camera
    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 1000);
    camera.position.set(12, 6, 12);
    camera.lookAt(0, 0, 0);
    cameraRef.current = camera;

    // Renderer
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    rendererRef.current = renderer;

    mountRef.current.innerHTML = "";
    mountRef.current.appendChild(renderer.domElement);

    // Lights
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.8);
    scene.add(ambientLight);

    const dirLight1 = new THREE.DirectionalLight(0x38bdf8, 2.5); // Cyan accent light
    dirLight1.position.set(10, 15, 10);
    scene.add(dirLight1);

    const dirLight2 = new THREE.DirectionalLight(0xf97316, 2.0); // Warm orange accent
    dirLight2.position.set(-10, -10, -10);
    scene.add(dirLight2);

    const pointLight = new THREE.PointLight(0xffffff, 1.5, 50);
    pointLight.position.set(0, 5, 0);
    scene.add(pointLight);

    // Base Group
    const mainGroup = new THREE.Group();
    scene.add(mainGroup);

    // Scale factors for Three.js units (6m length -> ~8 units)
    const lengthFactor = 8;
    const radiusFactor = (shellDiameter / 1000) * 1.5;

    // Shell Geometry
    const shellGeo = new THREE.CylinderGeometry(radiusFactor, radiusFactor, lengthFactor, 32, 1, true);
    const shellMat = new THREE.MeshPhysicalMaterial({
      color: thermalMode ? 0x0284c7 : 0x475569,
      transparent: true,
      opacity: transparency,
      roughness: 0.1,
      metalness: 0.8,
      transmission: 0.6,
      thickness: 0.5,
      wireframe: wireframe,
      side: THREE.DoubleSide,
    });
    const shellMesh = new THREE.Mesh(shellGeo, shellMat);
    shellMesh.rotation.z = Math.PI / 2;
    shellMeshRef.current = shellMesh;
    mainGroup.add(shellMesh);

    // Shell Nozzles (Inlet & Outlet)
    const nozzleGeo = new THREE.CylinderGeometry(radiusFactor * 0.25, radiusFactor * 0.25, radiusFactor * 1.2, 16);
    const nozzleMat = new THREE.MeshStandardMaterial({ color: 0x334155, metalness: 0.9, roughness: 0.3 });

    const topNozzle = new THREE.Mesh(nozzleGeo, nozzleMat);
    topNozzle.position.set(-lengthFactor * 0.3, radiusFactor * 1.1, 0);
    mainGroup.add(topNozzle);

    const bottomNozzle = new THREE.Mesh(nozzleGeo, nozzleMat);
    bottomNozzle.position.set(lengthFactor * 0.3, -radiusFactor * 1.1, 0);
    mainGroup.add(bottomNozzle);

    // Flanges
    const flangeGeo = new THREE.CylinderGeometry(radiusFactor * 1.25, radiusFactor * 1.25, 0.4, 32);
    const flangeMat = new THREE.MeshStandardMaterial({ color: 0x1e293b, metalness: 0.95, roughness: 0.2 });

    const frontFlange = new THREE.Mesh(flangeGeo, flangeMat);
    frontFlange.rotation.z = Math.PI / 2;
    frontFlange.position.x = -lengthFactor / 2;
    mainGroup.add(frontFlange);

    const rearFlange = new THREE.Mesh(flangeGeo, flangeMat);
    rearFlange.rotation.z = Math.PI / 2;
    rearFlange.position.x = lengthFactor / 2;
    mainGroup.add(rearFlange);

    // Front & Rear Channels
    const channelGeo = new THREE.CylinderGeometry(radiusFactor * 1.05, radiusFactor * 1.05, 2.0, 32);
    const channelMat = new THREE.MeshStandardMaterial({ color: 0x0f172a, metalness: 0.8, roughness: 0.4 });

    const frontChannel = new THREE.Mesh(channelGeo, channelMat);
    frontChannel.rotation.z = Math.PI / 2;
    frontChannel.position.x = -lengthFactor / 2 - 1.0;
    frontChannelRef.current = frontChannel;
    mainGroup.add(frontChannel);

    const rearChannel = new THREE.Mesh(channelGeo, channelMat);
    rearChannel.rotation.z = Math.PI / 2;
    rearChannel.position.x = lengthFactor / 2 + 1.0;
    rearChannelRef.current = rearChannel;
    mainGroup.add(rearChannel);

    // Tube Bundle Group
    const bundleGroup = new THREE.Group();
    bundleGroupRef.current = bundleGroup;
    mainGroup.add(bundleGroup);

    // Tubesheet Disks
    const tubesheetGeo = new THREE.CylinderGeometry(radiusFactor * 0.95, radiusFactor * 0.95, 0.3, 32);
    const tubesheetMat = new THREE.MeshStandardMaterial({ color: 0x94a3b8, metalness: 0.9, roughness: 0.2 });

    const frontTubesheet = new THREE.Mesh(tubesheetGeo, tubesheetMat);
    frontTubesheet.rotation.z = Math.PI / 2;
    frontTubesheet.position.x = -lengthFactor / 2 + 0.15;
    bundleGroup.add(frontTubesheet);

    const rearTubesheet = new THREE.Mesh(tubesheetGeo, tubesheetMat);
    rearTubesheet.rotation.z = Math.PI / 2;
    rearTubesheet.position.x = lengthFactor / 2 - 0.15;
    bundleGroup.add(rearTubesheet);

    // Tubes Array (Generate circular pattern inside bundle)
    const tubeRadius = radiusFactor * 0.04;
    const tubeGeo = new THREE.CylinderGeometry(tubeRadius, tubeRadius, lengthFactor - 0.3, 12);

    const tubeNumToDraw = Math.min(tubeCount, 120); // Performant visual representation
    const bundleRadius = radiusFactor * 0.82;

    for (let i = 0; i < tubeNumToDraw; i++) {
      // Polar grid layout
      const angle = (i / tubeNumToDraw) * Math.PI * 2 * (1 + Math.floor(i / 20) * 0.5);
      const r = (Math.sqrt(i / tubeNumToDraw) * bundleRadius);

      const y = Math.sin(angle) * r;
      const z = Math.cos(angle) * r;

      // Color mapping for thermal gradient (hot inner vs cold outer or pass partition)
      let tubeColor = 0xe2e8f0; // Plain metallic
      if (thermalMode) {
        if (y > 0) tubeColor = 0xef4444; // Hot fluid pass (Red)
        else tubeColor = 0x3b82f6; // Cold fluid return (Blue)
      }

      const tubeMat = new THREE.MeshStandardMaterial({
        color: tubeColor,
        metalness: 0.9,
        roughness: 0.25,
        wireframe: wireframe,
      });

      const tubeMesh = new THREE.Mesh(tubeGeo, tubeMat);
      tubeMesh.rotation.z = Math.PI / 2;
      tubeMesh.position.set(0, y, z);
      bundleGroup.add(tubeMesh);

      // Render U-bend Torus at Rear if BEU or U-Bend selected
      if (selectedTEMAType === "BEU" && y > 0) {
        const uBendRadius = Math.abs(y);
        const torusGeo = new THREE.TorusGeometry(uBendRadius, tubeRadius, 8, 16, Math.PI);
        const torusMesh = new THREE.Mesh(torusGeo, tubeMat);
        torusMesh.position.set(lengthFactor / 2 - 0.15, 0, z);
        torusMesh.rotation.y = Math.PI / 2;
        bundleGroup.add(torusMesh);
      }
    }

    // Baffle Plates (Segmental cutouts)
    const bafflesGroup = new THREE.Group();
    bafflesGroupRef.current = bafflesGroup;
    bundleGroup.add(bafflesGroup);

    const numBaffles = 7;
    const baffleSpacing = (lengthFactor - 1.5) / numBaffles;

    for (let b = 0; b < numBaffles; b++) {
      // Segmental baffle geometry (cut cylinder)
      const baffleGeo = new THREE.CylinderGeometry(
        radiusFactor * 0.92,
        radiusFactor * 0.92,
        0.08,
        32,
        1,
        false,
        b % 2 === 0 ? 0 : Math.PI,
        Math.PI * 1.4 // Segment cut
      );
      const baffleMat = new THREE.MeshStandardMaterial({ color: 0x64748b, metalness: 0.8, roughness: 0.3 });
      const baffleMesh = new THREE.Mesh(baffleGeo, baffleMat);
      baffleMesh.rotation.z = Math.PI / 2;
      baffleMesh.position.x = -lengthFactor / 2 + 1.0 + b * baffleSpacing;
      bafflesGroup.add(baffleMesh);
    }

    // Animated Particle Flow Streams
    const particleCount = 60;
    const particleGeo = new THREE.BufferGeometry();
    const particlePositions = new Float32Array(particleCount * 3);
    const particleColors = new Float32Array(particleCount * 3);

    for (let p = 0; p < particleCount; p++) {
      const px = (Math.random() - 0.5) * lengthFactor;
      const py = (Math.random() - 0.5) * radiusFactor * 1.5;
      const pz = (Math.random() - 0.5) * radiusFactor * 1.5;

      particlePositions[p * 3] = px;
      particlePositions[p * 3 + 1] = py;
      particlePositions[p * 3 + 2] = pz;

      // Blue or Red color
      if (p % 2 === 0) {
        particleColors[p * 3] = 0.2;
        particleColors[p * 3 + 1] = 0.7;
        particleColors[p * 3 + 2] = 1.0;
      } else {
        particleColors[p * 3] = 1.0;
        particleColors[p * 3 + 1] = 0.3;
        particleColors[p * 3 + 2] = 0.2;
      }
    }

    particleGeo.setAttribute("position", new THREE.BufferAttribute(particlePositions, 3));
    particleGeo.setAttribute("color", new THREE.BufferAttribute(particleColors, 3));

    const particleMat = new THREE.PointsMaterial({
      size: 0.2,
      vertexColors: true,
      transparent: true,
      opacity: 0.8,
    });

    const particleSystem = new THREE.Points(particleGeo, particleMat);
    mainGroup.add(particleSystem);

    // Animation Loop
    let animationFrameId: number;
    let rotationAngle = 0;

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);

      if (autoRotate && mainGroup) {
        rotationAngle += 0.005;
        mainGroup.rotation.y = rotationAngle;
      }

      // Animate fluid particles along length
      const positions = particleGeo.attributes.position.array as Float32Array;
      for (let p = 0; p < particleCount; p++) {
        positions[p * 3] += 0.04;
        if (positions[p * 3] > lengthFactor / 2) {
          positions[p * 3] = -lengthFactor / 2;
        }
      }
      particleGeo.attributes.position.needsUpdate = true;

      renderer.render(scene, camera);
    };

    animate();

    // Mouse Drag Rotation Controls
    let isDragging = false;
    let previousMousePosition = { x: 0, y: 0 };

    const domElem = mountRef.current;

    const onMouseDown = (e: MouseEvent) => {
      isDragging = true;
      previousMousePosition = { x: e.clientX, y: e.clientY };
    };

    const onMouseMove = (e: MouseEvent) => {
      if (!isDragging || !mainGroup) return;
      const deltaX = e.clientX - previousMousePosition.x;
      const deltaY = e.clientY - previousMousePosition.y;

      mainGroup.rotation.y += deltaX * 0.01;
      mainGroup.rotation.x += deltaY * 0.01;

      previousMousePosition = { x: e.clientX, y: e.clientY };
    };

    const onMouseUp = () => {
      isDragging = false;
    };

    const onWheel = (e: WheelEvent) => {
      if (!cameraRef.current) return;
      cameraRef.current.position.z += e.deltaY * 0.01;
      cameraRef.current.position.z = Math.max(4, Math.min(30, cameraRef.current.position.z));
    };

    domElem.addEventListener("mousedown", onMouseDown);
    window.addEventListener("mousemove", onMouseMove);
    window.addEventListener("mouseup", onMouseUp);
    domElem.addEventListener("wheel", onWheel);

    // Handle Resize
    const handleResize = () => {
      if (!mountRef.current || !rendererRef.current || !cameraRef.current) return;
      const w = mountRef.current.clientWidth;
      const h = mountRef.current.clientHeight;
      cameraRef.current.aspect = w / h;
      cameraRef.current.updateProjectionMatrix();
      rendererRef.current.setSize(w, h);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener("resize", handleResize);
      domElem.removeEventListener("mousedown", onMouseDown);
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("mouseup", onMouseUp);
      domElem.removeEventListener("wheel", onWheel);
      if (rendererRef.current && rendererRef.current.domElement) {
        rendererRef.current.dispose();
      }
    };
  }, [selectedTEMAType, shellDiameter, tubeCount, wireframe, thermalMode, transparency, viewMode]);

  // Update Explosion View
  useEffect(() => {
    if (bundleGroupRef.current) {
      bundleGroupRef.current.position.x = exploded * 4.0; // Slide bundle out of shell
    }
    if (frontChannelRef.current) {
      frontChannelRef.current.position.x = -4.0 - exploded * 3.0;
    }
  }, [exploded]);

  return (
    <div className="relative w-full rounded-2xl bg-slate-950 border border-slate-800 shadow-2xl overflow-hidden flex flex-col font-sans">
      {/* Top Header Mode Selection Switcher */}
      <div className="bg-slate-900 border-b border-slate-800 px-4 py-3 flex flex-wrap items-center justify-between gap-3 text-xs z-20">
        <div className="flex items-center gap-2">
          <span className="w-2.5 h-2.5 rounded-full bg-cyan-400 animate-ping" />
          <span className="font-mono font-bold text-slate-100">
            Interactive TEMA CAD Suite ({selectedTEMAType} Configuration)
          </span>
        </div>

        {/* View Mode Mode Tabs */}
        <div className="flex items-center gap-1.5 bg-slate-950 p-1 rounded-xl border border-slate-800 font-mono">
          <button
            onClick={() => setViewMode("dual")}
            className={`px-3 py-1.5 rounded-lg flex items-center gap-1.5 transition ${
              viewMode === "dual"
                ? "bg-cyan-500 text-slate-950 font-bold shadow"
                : "text-slate-400 hover:text-white"
            }`}
          >
            <LayoutGrid className="w-3.5 h-3.5" />
            Dual Split Inspector
          </button>

          <button
            onClick={() => setViewMode("acrylic")}
            className={`px-3 py-1.5 rounded-lg flex items-center gap-1.5 transition ${
              viewMode === "acrylic"
                ? "bg-amber-500 text-slate-950 font-bold shadow"
                : "text-slate-400 hover:text-white"
            }`}
          >
            <Sparkles className="w-3.5 h-3.5 text-amber-300" />
            Acrylic Demo Model
          </button>

          <button
            onClick={() => setViewMode("cutaway")}
            className={`px-3 py-1.5 rounded-lg flex items-center gap-1.5 transition ${
              viewMode === "cutaway"
                ? "bg-cyan-500 text-slate-950 font-bold shadow"
                : "text-slate-400 hover:text-white"
            }`}
          >
            <FileText className="w-3.5 h-3.5" />
            Cutaway Working Diagram
          </button>

          <button
            onClick={() => setViewMode("3d")}
            className={`px-3 py-1.5 rounded-lg flex items-center gap-1.5 transition ${
              viewMode === "3d"
                ? "bg-indigo-500 text-slate-950 font-bold shadow"
                : "text-slate-400 hover:text-white"
            }`}
          >
            <Box className="w-3.5 h-3.5" />
            Interactive 3D WebGL
          </button>
        </div>
      </div>

      {/* Main Viewport Container */}
      <div className="w-full relative min-h-[520px]">
        {/* DUAL SPLIT INSPECTOR VIEW */}
        {viewMode === "dual" && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 p-4 bg-slate-950">
            {/* Left: 3D WebGL Canvas */}
            <div className="relative h-[480px] bg-slate-900 rounded-xl border border-slate-800 overflow-hidden flex flex-col">
              <div className="absolute top-3 left-3 z-10 bg-slate-950/80 backdrop-blur-md px-3 py-1 rounded-lg border border-slate-800 font-mono text-[11px] text-cyan-300 font-bold flex items-center gap-1.5">
                <Box className="w-3.5 h-3.5 text-cyan-400" />
                3D CAD Model (Rotatable)
              </div>
              <div ref={mountRef} className="w-full h-full cursor-grab active:cursor-grabbing" />
              {/* Floating Controls Bar for 3D */}
              <div className="absolute bottom-3 left-3 right-3 bg-slate-950/90 backdrop-blur-md p-2.5 rounded-xl border border-slate-800 text-[11px] font-mono flex items-center justify-between gap-2">
                <button
                  onClick={() => setThermalMode(!thermalMode)}
                  className={`px-2 py-1 rounded border text-[10px] flex items-center gap-1 ${
                    thermalMode ? "bg-amber-950 border-amber-600 text-amber-300 font-bold" : "bg-slate-800 text-slate-300"
                  }`}
                >
                  <Flame className="w-3 h-3 text-amber-400" /> Heatmap
                </button>
                <div className="flex items-center gap-2">
                  <span className="text-slate-400">Bundle Explosion:</span>
                  <input
                    type="range"
                    min="0"
                    max="1"
                    step="0.01"
                    value={exploded}
                    onChange={(e) => setExploded(parseFloat(e.target.value))}
                    className="w-20 accent-cyan-400 bg-slate-800 h-1.5 rounded"
                  />
                </div>
              </div>
            </div>

            {/* Right: Enhanced Cutaway Flow Diagram */}
            <div className="h-[480px] overflow-y-auto">
              <HeatExchangerCutawayDiagram className="h-full" />
            </div>
          </div>
        )}

        {/* ACRYLIC DEMO MODEL ONLY VIEW */}
        {viewMode === "acrylic" && (
          <div className="p-4 bg-slate-950">
            <AcrylicDemoExchangerModel />
          </div>
        )}

        {/* CUTAWAY WORKING DIAGRAM ONLY VIEW */}
        {viewMode === "cutaway" && (
          <div className="p-4 bg-slate-950">
            <HeatExchangerCutawayDiagram />
          </div>
        )}

        {/* 3D WEBGL MODEL ONLY VIEW */}
        {viewMode === "3d" && (
          <div className="relative w-full h-[540px] bg-slate-950">
            {/* Controls Bar Overlay */}
            <div className="absolute top-4 left-4 right-4 z-10 flex flex-wrap items-center justify-between gap-3 bg-slate-900/80 backdrop-blur-md p-3 rounded-xl border border-slate-800 text-xs">
              <div className="flex items-center gap-2">
                <span className="font-mono font-bold text-slate-200">
                  Full-Screen 3D CAD Inspection Model
                </span>
              </div>

              <div className="flex flex-wrap items-center gap-2">
                <button
                  onClick={() => setThermalMode(!thermalMode)}
                  className={`px-2.5 py-1 rounded-lg border font-mono text-xs flex items-center gap-1.5 transition ${
                    thermalMode
                      ? "bg-amber-950/80 border-amber-600 text-amber-300 font-bold"
                      : "bg-slate-800 border-slate-700 text-slate-300"
                  }`}
                >
                  <Flame className="w-3.5 h-3.5 text-amber-400" />
                  Thermal Heatmap
                </button>

                <button
                  onClick={() => setWireframe(!wireframe)}
                  className={`px-2.5 py-1 rounded-lg border font-mono text-xs flex items-center gap-1.5 transition ${
                    wireframe
                      ? "bg-cyan-950/80 border-cyan-600 text-cyan-300 font-bold"
                      : "bg-slate-800 border-slate-700 text-slate-300"
                  }`}
                >
                  <Eye className="w-3.5 h-3.5 text-cyan-400" />
                  Wireframe CAD
                </button>

                <button
                  onClick={() => setAutoRotate(!autoRotate)}
                  className={`px-2.5 py-1 rounded-lg border font-mono text-xs flex items-center gap-1.5 transition ${
                    autoRotate ? "bg-indigo-950 border-indigo-600 text-indigo-300" : "bg-slate-800 border-slate-700 text-slate-300"
                  }`}
                >
                  <RefreshCw className={`w-3.5 h-3.5 ${autoRotate ? "animate-spin" : ""}`} />
                  Orbit Rotate
                </button>
              </div>
            </div>

            {/* WebGL Canvas */}
            <div ref={mountRef} className="w-full h-full cursor-grab active:cursor-grabbing" />

            {/* Bottom Floating Parameters Control Bar */}
            <div className="absolute bottom-4 left-4 right-4 z-10 bg-slate-900/90 backdrop-blur-md p-3.5 rounded-xl border border-slate-800 text-xs grid grid-cols-1 sm:grid-cols-3 gap-4 items-center">
              <div className="space-y-1">
                <div className="flex justify-between font-mono text-[11px] text-slate-300">
                  <span>Bundle Disassembly View:</span>
                  <span className="text-cyan-400 font-bold">{Math.round(exploded * 100)}%</span>
                </div>
                <input
                  type="range"
                  min="0"
                  max="1"
                  step="0.01"
                  value={exploded}
                  onChange={(e) => setExploded(parseFloat(e.target.value))}
                  className="w-full accent-cyan-400 bg-slate-800 h-1.5 rounded cursor-pointer"
                />
              </div>

              <div className="space-y-1">
                <div className="flex justify-between font-mono text-[11px] text-slate-300">
                  <span>Shell Transparency:</span>
                  <span className="text-cyan-400 font-bold">{Math.round(transparency * 100)}%</span>
                </div>
                <input
                  type="range"
                  min="0.1"
                  max="0.9"
                  step="0.05"
                  value={transparency}
                  onChange={(e) => setTransparency(parseFloat(e.target.value))}
                  className="w-full accent-cyan-400 bg-slate-800 h-1.5 rounded cursor-pointer"
                />
              </div>

              <div className="flex items-center gap-2 justify-end">
                <span className="font-mono text-[11px] text-slate-400">TEMA Design:</span>
                <select
                  value={selectedTEMAType}
                  onChange={(e) => setSelectedTEMAType(e.target.value as TEMAType)}
                  className="bg-slate-950 border border-slate-700 text-cyan-300 font-mono text-xs px-2.5 py-1 rounded-lg focus:outline-none focus:border-cyan-500"
                >
                  <option value="BEM">Type BEM (Fixed Tubesheet)</option>
                  <option value="AES">Type AES (Split Ring Head)</option>
                  <option value="BEU">Type BEU (U-Tube Bundle)</option>
                  <option value="NEN">Type NEN (Integral Channel)</option>
                </select>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
