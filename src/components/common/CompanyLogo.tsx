import React, { useState } from "react";
import logoImg from "../../assets/images/northern_heatex_logo_1784964393778.jpg";

interface CompanyLogoProps {
  variant?: "full" | "horizontal" | "vertical" | "icon" | "monogram" | "stamp" | "pdf";
  size?: "xs" | "sm" | "md" | "lg" | "xl";
  className?: string;
  showSubtitle?: boolean;
  lightBackground?: boolean;
}

export const CompanyLogo: React.FC<CompanyLogoProps> = ({
  variant = "full",
  size = "md",
  className = "",
  showSubtitle = true,
  lightBackground = true,
}) => {
  const [useFallbackSvg, setUseFallbackSvg] = useState(false);

  // Dimension mapping for the emblem square icon box (width = height in px)
  const emblemSizePx = {
    xs: 32,
    sm: 42,
    md: 52,
    lg: 72,
    xl: 96,
  }[size];

  // Font size classes for Title
  const titleTextClasses = {
    xs: "text-xs font-black tracking-tight",
    sm: "text-sm font-black tracking-tight",
    md: "text-base sm:text-xl font-black tracking-tight",
    lg: "text-2xl sm:text-3xl font-black tracking-tight",
    xl: "text-3xl sm:text-4xl font-black tracking-tight",
  }[size];

  // Font size classes for CORPORATION
  const corpTextClasses = {
    xs: "text-[7px] font-black tracking-[0.16em]",
    sm: "text-[8.5px] font-black tracking-[0.2em]",
    md: "text-[9.5px] sm:text-[11px] font-black tracking-[0.26em]",
    lg: "text-xs sm:text-sm font-black tracking-[0.3em]",
    xl: "text-sm sm:text-base font-black tracking-[0.35em]",
  }[size];

  // Accent line sizes flanking CORPORATION
  const lineHeights = {
    xs: "h-[1px] w-2.5",
    sm: "h-[1px] w-4",
    md: "h-[1.5px] w-5 sm:w-8",
    lg: "h-[2px] w-8 sm:w-14",
    xl: "h-[2px] w-12 sm:w-18",
  }[size];

  // Tagline / Services line classes
  const taglineClasses = {
    xs: "text-[6.5px]",
    sm: "text-[7.5px]",
    md: "text-[8px] sm:text-[9.5px]",
    lg: "text-[10px] sm:text-[11px]",
    xl: "text-xs",
  }[size];

  // Render the left Emblem Icon (Image cropped to top emblem or Fallback SVG)
  const renderEmblem = () => (
    <div
      className="relative overflow-hidden shrink-0 rounded-xl flex items-center justify-center transition-transform hover:scale-105 duration-300"
      style={{ width: emblemSizePx, height: emblemSizePx }}
    >
      {!useFallbackSvg ? (
        <img
          src={logoImg}
          alt="Northern HeatEx Emblem"
          className="absolute top-0 left-0 w-full h-[165%] object-cover object-top select-none pointer-events-none"
          onError={() => setUseFallbackSvg(true)}
          referrerPolicy="no-referrer"
        />
      ) : (
        /* Fallback Vector SVG Emblem */
        <svg
          width={emblemSizePx}
          height={emblemSizePx}
          viewBox="0 0 120 120"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            <linearGradient id="nhNavyGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#0B1C38" />
              <stop offset="100%" stopColor="#003366" />
            </linearGradient>
            <linearGradient id="nhBlueGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#0056A6" />
              <stop offset="100%" stopColor="#0080FF" />
            </linearGradient>
            <linearGradient id="nhRedGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#DC2626" />
              <stop offset="100%" stopColor="#B91C1C" />
            </linearGradient>
          </defs>

          {/* Interlocking N and H typography marks */}
          <path d="M 20 20 L 35 20 L 35 55 L 60 20 L 75 20 L 75 80 L 60 80 L 60 45 L 35 80 L 20 80 Z" fill="url(#nhNavyGrad)" />
          <path d="M 70 20 L 85 20 L 85 45 L 100 45 L 100 20 L 115 20 L 115 80 L 100 80 L 100 58 L 85 58 L 85 80 L 70 80 Z" fill="url(#nhBlueGrad)" />

          {/* Red Swoosh Arc */}
          <path d="M 12 52 C 8 72 24 92 46 96" fill="none" stroke="url(#nhRedGrad)" strokeWidth="4.5" strokeLinecap="round" />

          {/* Blue Swoosh Arc */}
          <path d="M 108 52 C 112 76 88 96 66 98" fill="none" stroke="url(#nhBlueGrad)" strokeWidth="4.5" strokeLinecap="round" />

          {/* Shell & Tube Exchanger Graphic */}
          <rect x="35" y="62" width="50" height="20" rx="3" fill="#FFFFFF" stroke="#0B1C38" strokeWidth="2.5" />
          <circle cx="35" cy="72" r="10" fill="#0B1C38" stroke="#0056A6" strokeWidth="2" />
          <line x1="45" y1="67" x2="80" y2="67" stroke="#0056A6" strokeWidth="1.5" />
          <line x1="45" y1="72" x2="80" y2="72" stroke="#0056A6" strokeWidth="1.5" />
          <line x1="45" y1="77" x2="80" y2="77" stroke="#0056A6" strokeWidth="1.5" />
          <rect x="83" y="64" width="5" height="16" fill="#0B1C38" />
        </svg>
      )}
    </div>
  );

  // If icon-only variant requested
  if (variant === "icon" || variant === "monogram") {
    return <div className={`inline-flex items-center ${className}`}>{renderEmblem()}</div>;
  }

  // Render emblem on left, text block side-by-side on right
  return (
    <div className={`inline-flex items-center gap-3 select-none ${className}`}>
      {/* 1. Logo Emblem Image on Left */}
      {renderEmblem()}

      {/* 2. Brand Text Side-by-Side on Right */}
      <div className="flex flex-col justify-center">
        {/* Main Title: NORTHERN HEATEX */}
        <h2
          className={`font-['Outfit',sans-serif] leading-none font-black tracking-tight ${titleTextClasses} ${
            lightBackground ? "text-[#0B1C38]" : "text-white"
          }`}
        >
          NORTHERN HEATEX
        </h2>

        {/* Sub-Title: - CORPORATION - with red line on left, blue line on right */}
        <div className="flex items-center gap-1.5 mt-0.5 sm:mt-1">
          <div className={`${lineHeights} bg-gradient-to-r from-red-600 to-red-400 shrink-0`} />
          <span
            className={`font-['Outfit',sans-serif] uppercase text-[#0056A6] font-extrabold ${corpTextClasses} ${
              !lightBackground ? "text-cyan-300" : ""
            }`}
          >
            CORPORATION
          </span>
          <div className={`${lineHeights} bg-gradient-to-r from-blue-500 to-blue-800 shrink-0`} />
        </div>

        {/* Services Tagline */}
        {showSubtitle && size !== "xs" && (
          <div className={`flex items-center gap-1 mt-0.5 sm:mt-1 font-['Outfit',sans-serif] font-bold uppercase tracking-wider ${taglineClasses} ${
            lightBackground ? "text-slate-600" : "text-slate-300"
          }`}>
            <span>HEAT EXCHANGERS</span>
            <span className="text-red-500 font-extrabold">•</span>
            <span>RE-TUBING</span>
            <span className="text-blue-500 font-extrabold">•</span>
            <span>RE-BABBITTING</span>
            <span className="text-red-500 font-extrabold">•</span>
            <span>FABRICATION</span>
          </div>
        )}
      </div>
    </div>
  );
};


