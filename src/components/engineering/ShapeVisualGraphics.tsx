import React from "react";
import { ShapeTypeKey } from "./MaterialWeightCalculator";

interface ShapeVisualProps {
  shapeId: ShapeTypeKey;
  className?: string;
  showLabels?: boolean;
}

export const ShapeVisualGraphic: React.FC<ShapeVisualProps> = ({
  shapeId,
  className = "w-full h-auto max-h-48",
  showLabels = true,
}) => {
  switch (shapeId) {
    case "plate_sheet":
      return (
        <svg viewBox="0 0 320 200" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <linearGradient id="plateTop" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#38bdf8" stopOpacity="0.8" />
              <stop offset="100%" stopColor="#0284c7" stopOpacity="0.9" />
            </linearGradient>
            <linearGradient id="plateFront" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#0284c7" />
              <stop offset="100%" stopColor="#0f172a" />
            </linearGradient>
            <linearGradient id="plateSide" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#0369a1" />
              <stop offset="100%" stopColor="#1e293b" />
            </linearGradient>
          </defs>

          {/* 3D Isometric Plate Block */}
          {/* Top Face */}
          <polygon points="60,60 220,30 270,120 110,150" fill="url(#plateTop)" stroke="#e0f2fe" strokeWidth="2" />
          {/* Front Face */}
          <polygon points="110,150 270,120 270,138 110,168" fill="url(#plateFront)" stroke="#e0f2fe" strokeWidth="1.5" />
          {/* Left Side Face */}
          <polygon points="60,60 110,150 110,168 60,78" fill="url(#plateSide)" stroke="#e0f2fe" strokeWidth="1.5" />

          {showLabels && (
            <>
              {/* Length L Arrow */}
              <line x1="60" y1="48" x2="220" y2="18" stroke="#f59e0b" strokeWidth="2" strokeDasharray="4 2" />
              <polygon points="60,48 68,44 68,52" fill="#f59e0b" />
              <polygon points="220,18 212,14 212,22" fill="#f59e0b" />
              <text x="140" y="28" fill="#f59e0b" fontSize="12" fontWeight="bold" textAnchor="middle" fontFamily="monospace">Length (L)</text>

              {/* Width W Arrow */}
              <line x1="232" y1="28" x2="282" y2="118" stroke="#38bdf8" strokeWidth="2" strokeDasharray="4 2" />
              <text x="272" y="70" fill="#38bdf8" fontSize="12" fontWeight="bold" textAnchor="start" fontFamily="monospace">Width (W)</text>

              {/* Thickness T Arrow */}
              <line x1="282" y1="120" x2="282" y2="138" stroke="#10b981" strokeWidth="2" />
              <polygon points="282,120 278,126 286,126" fill="#10b981" />
              <polygon points="282,138 278,132 286,132" fill="#10b981" />
              <text x="290" y="132" fill="#10b981" fontSize="11" fontWeight="bold" fontFamily="monospace">T</text>
            </>
          )}
        </svg>
      );

    case "tube_pipe":
      return (
        <svg viewBox="0 0 320 200" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <linearGradient id="pipeBody" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#38bdf8" stopOpacity="0.9" />
              <stop offset="30%" stopColor="#7dd3fc" stopOpacity="0.95" />
              <stop offset="70%" stopColor="#0284c7" stopOpacity="0.9" />
              <stop offset="100%" stopColor="#0f172a" stopOpacity="1" />
            </linearGradient>
            <linearGradient id="pipeInner" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#0f172a" />
              <stop offset="100%" stopColor="#1e293b" />
            </linearGradient>
          </defs>

          {/* Tube Outer Body */}
          <path d="M 80 50 L 250 50 C 275 50 275 150 250 150 L 80 150 Z" fill="url(#pipeBody)" stroke="#e0f2fe" strokeWidth="2" />

          {/* Left Oval Face (Outer & Inner OD/ID) */}
          <ellipse cx="80" cy="100" rx="28" ry="50" fill="#38bdf8" fillOpacity="0.3" stroke="#e0f2fe" strokeWidth="2" />
          <ellipse cx="80" cy="100" rx="18" ry="34" fill="url(#pipeInner)" stroke="#38bdf8" strokeWidth="2" />

          {/* Right Oval Back Edge */}
          <ellipse cx="250" cy="100" rx="28" ry="50" fill="none" stroke="#e0f2fe" strokeWidth="2" strokeDasharray="4 2" />

          {showLabels && (
            <>
              {/* Outer Diameter OD */}
              <line x1="80" y1="42" x2="80" y2="158" stroke="#38bdf8" strokeWidth="1.5" strokeDasharray="3 2" />
              <text x="42" y="104" fill="#38bdf8" fontSize="12" fontWeight="bold" fontFamily="monospace">OD</text>

              {/* Wall Thickness WT */}
              <line x1="80" y1="52" x2="80" y2="66" stroke="#10b981" strokeWidth="3" />
              <text x="92" y="62" fill="#10b981" fontSize="11" fontWeight="bold" fontFamily="monospace">WT</text>

              {/* Length L */}
              <line x1="80" y1="168" x2="250" y2="168" stroke="#f59e0b" strokeWidth="2" />
              <polygon points="80,168 88,164 88,172" fill="#f59e0b" />
              <polygon points="250,168 242,164 242,172" fill="#f59e0b" />
              <text x="165" y="186" fill="#f59e0b" fontSize="12" fontWeight="bold" textAnchor="middle" fontFamily="monospace">Length (L)</text>
            </>
          )}
        </svg>
      );

    case "round_bar":
      return (
        <svg viewBox="0 0 320 200" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <linearGradient id="barBody" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#f59e0b" />
              <stop offset="40%" stopColor="#fde047" />
              <stop offset="80%" stopColor="#d97706" />
              <stop offset="100%" stopColor="#78350f" />
            </linearGradient>
          </defs>

          {/* Solid Cylindrical Rod */}
          <rect x="75" y="55" width="170" height="90" fill="url(#barBody)" stroke="#fef08a" strokeWidth="2" />
          <ellipse cx="75" cy="100" rx="25" ry="45" fill="#d97706" stroke="#fef08a" strokeWidth="2" />
          <ellipse cx="245" cy="100" rx="25" ry="45" fill="url(#barBody)" stroke="#fef08a" strokeWidth="2" />

          {showLabels && (
            <>
              {/* Diameter D */}
              <line x1="245" y1="48" x2="245" y2="152" stroke="#38bdf8" strokeWidth="1.5" strokeDasharray="3 2" />
              <text x="278" y="104" fill="#38bdf8" fontSize="12" fontWeight="bold" fontFamily="monospace">Dia (D)</text>

              {/* Length L */}
              <line x1="75" y1="162" x2="245" y2="162" stroke="#f59e0b" strokeWidth="2" />
              <polygon points="75,162 83,158 83,166" fill="#f59e0b" />
              <polygon points="245,162 237,158 237,166" fill="#f59e0b" />
              <text x="160" y="180" fill="#f59e0b" fontSize="12" fontWeight="bold" textAnchor="middle" fontFamily="monospace">Length (L)</text>
            </>
          )}
        </svg>
      );

    case "tubesheet_disc":
      return (
        <svg viewBox="0 0 320 200" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <linearGradient id="discGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#cbd5e1" />
              <stop offset="50%" stopColor="#64748b" />
              <stop offset="100%" stopColor="#1e293b" />
            </linearGradient>
          </defs>

          {/* 3D Tubesheet Disc */}
          <ellipse cx="140" cy="100" rx="80" ry="60" fill="url(#discGrad)" stroke="#f8fafc" strokeWidth="2" />
          <path d="M 60 100 Q 60 130 140 130 Q 220 130 220 100 L 220 115 Q 220 145 140 145 Q 60 145 60 115 Z" fill="#475569" stroke="#f8fafc" strokeWidth="1.5" />

          {/* Drilled Holes Matrix Representation */}
          <g opacity="0.8">
            {[-35, -18, 0, 18, 35].map((dx, ix) =>
              [-25, -10, 5, 20].map((dy, iy) => (
                <circle key={`${ix}-${iy}`} cx={140 + dx} cy={100 + dy} r="3.5" fill="#020617" stroke="#38bdf8" strokeWidth="1" />
              ))
            )}
          </g>

          {showLabels && (
            <>
              {/* Outer Diameter OD */}
              <line x1="50" y1="100" x2="230" y2="100" stroke="#38bdf8" strokeWidth="1.5" strokeDasharray="3 2" />
              <text x="140" y="32" fill="#38bdf8" fontSize="12" fontWeight="bold" textAnchor="middle" fontFamily="monospace">Disc OD</text>

              {/* Thickness T */}
              <line x1="228" y1="100" x2="228" y2="115" stroke="#10b981" strokeWidth="2" />
              <text x="236" y="112" fill="#10b981" fontSize="11" fontWeight="bold" fontFamily="monospace">T</text>
            </>
          )}
        </svg>
      );

    case "square_bar":
      return (
        <svg viewBox="0 0 320 200" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <linearGradient id="sqTop" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#a855f7" />
              <stop offset="100%" stopColor="#7e22ce" />
            </linearGradient>
            <linearGradient id="sqFront" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#6b21a8" />
              <stop offset="100%" stopColor="#3b0764" />
            </linearGradient>
          </defs>

          {/* Isometric Square Bar */}
          <polygon points="70,90 120,50 250,50 200,90" fill="url(#sqTop)" stroke="#f3e8ff" strokeWidth="2" />
          <polygon points="70,90 200,90 200,150 70,150" fill="url(#sqFront)" stroke="#f3e8ff" strokeWidth="2" />
          <polygon points="200,90 250,50 250,110 200,150" fill="#581c87" stroke="#f3e8ff" strokeWidth="1.5" />

          {showLabels && (
            <>
              <text x="135" y="125" fill="#f3e8ff" fontSize="12" fontWeight="bold" textAnchor="middle" fontFamily="monospace">W × H</text>
              <line x1="200" y1="162" x2="250" y2="122" stroke="#f59e0b" strokeWidth="2" />
              <text x="235" y="155" fill="#f59e0b" fontSize="12" fontWeight="bold" fontFamily="monospace">L</text>
            </>
          )}
        </svg>
      );

    case "hollow_square":
      return (
        <svg viewBox="0 0 320 200" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <linearGradient id="rhsGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#38bdf8" />
              <stop offset="100%" stopColor="#1e293b" />
            </linearGradient>
          </defs>

          {/* RHS Pipe Section */}
          <rect x="80" y="50" width="90" height="90" rx="4" fill="url(#rhsGrad)" stroke="#e0f2fe" strokeWidth="2" />
          <rect x="100" y="70" width="50" height="50" rx="2" fill="#0f172a" stroke="#38bdf8" strokeWidth="1.5" />
          <path d="M 170 50 L 250 20 L 250 110 L 170 140 Z" fill="#0284c7" fillOpacity="0.5" stroke="#e0f2fe" strokeWidth="1.5" />

          {showLabels && (
            <>
              <text x="125" y="40" fill="#38bdf8" fontSize="11" fontWeight="bold" textAnchor="middle" fontFamily="monospace">Width (W)</text>
              <text x="60" y="100" fill="#38bdf8" fontSize="11" fontWeight="bold" textAnchor="end" fontFamily="monospace">H</text>
              <text x="125" y="80" fill="#10b981" fontSize="10" fontWeight="bold" textAnchor="middle" fontFamily="monospace">WT</text>
            </>
          )}
        </svg>
      );

    case "angle_iron":
      return (
        <svg viewBox="0 0 320 200" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
          {/* L-Angle Iron Profile */}
          <path d="M 80 40 L 110 40 L 110 120 L 200 120 L 200 150 L 80 150 Z" fill="#ea580c" stroke="#ffedd5" strokeWidth="2" />
          <path d="M 80 40 L 140 20 L 170 20 L 110 40 Z" fill="#c2410c" />
          <path d="M 200 120 L 260 100 L 260 130 L 200 150 Z" fill="#9a3412" />

          {showLabels && (
            <>
              <text x="65" y="95" fill="#f97316" fontSize="11" fontWeight="bold" fontFamily="monospace">Leg A</text>
              <text x="140" y="168" fill="#f97316" fontSize="11" fontWeight="bold" fontFamily="monospace">Leg B</text>
              <text x="120" y="80" fill="#10b981" fontSize="10" fontWeight="bold" fontFamily="monospace">T</text>
            </>
          )}
        </svg>
      );

    case "c_channel":
      return (
        <svg viewBox="0 0 320 200" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
          {/* C-Channel Section */}
          <path d="M 170 40 L 90 40 L 90 160 L 170 160 L 170 138 L 115 138 L 115 62 L 170 62 Z" fill="#2563eb" stroke="#dbeafe" strokeWidth="2" />
          <path d="M 170 40 L 230 15 L 150 15 L 90 40 Z" fill="#1d4ed8" />

          {showLabels && (
            <>
              <text x="75" y="105" fill="#60a5fa" fontSize="11" fontWeight="bold" textAnchor="end" fontFamily="monospace">H</text>
              <text x="130" y="32" fill="#60a5fa" fontSize="11" fontWeight="bold" textAnchor="middle" fontFamily="monospace">Flange B</text>
              <text x="100" y="100" fill="#10b981" fontSize="10" fontWeight="bold" fontFamily="monospace">tw</text>
            </>
          )}
        </svg>
      );

    case "i_beam":
      return (
        <svg viewBox="0 0 320 200" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
          {/* I-Beam / H-Beam Section */}
          <path d="M 80 40 L 180 40 L 180 62 L 142 62 L 142 138 L 180 138 L 180 160 L 80 160 L 80 138 L 118 138 L 118 62 L 80 62 Z" fill="#0284c7" stroke="#e0f2fe" strokeWidth="2" />

          {showLabels && (
            <>
              <text x="130" y="30" fill="#38bdf8" fontSize="11" fontWeight="bold" textAnchor="middle" fontFamily="monospace">Flange B</text>
              <text x="65" y="105" fill="#38bdf8" fontSize="11" fontWeight="bold" textAnchor="end" fontFamily="monospace">Height H</text>
              <text x="130" y="105" fill="#10b981" fontSize="10" fontWeight="bold" textAnchor="middle" fontFamily="monospace">tw</text>
            </>
          )}
        </svg>
      );

    case "hex_bar":
      return (
        <svg viewBox="0 0 320 200" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
          {/* Hexagonal Bar */}
          <polygon points="100,50 150,50 175,95 150,140 100,140 75,95" fill="#059669" stroke="#a7f3d0" strokeWidth="2" />
          <path d="M 150 50 L 230 25 L 255 70 L 175 95 Z" fill="#047857" />
          <path d="M 175 95 L 255 70 L 230 115 L 150 140 Z" fill="#065f46" />

          {showLabels && (
            <>
              <line x1="75" y1="95" x2="175" y2="95" stroke="#a7f3d0" strokeWidth="1.5" strokeDasharray="3 2" />
              <text x="125" y="90" fill="#a7f3d0" fontSize="11" fontWeight="bold" textAnchor="middle" fontFamily="monospace">Flat S</text>
            </>
          )}
        </svg>
      );

    default:
      return null;
  }
};
