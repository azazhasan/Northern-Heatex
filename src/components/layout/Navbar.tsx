import React, { useState } from "react";
import { useRouter } from "../../context/RouterContext";
import { UserRole } from "../../types";
import { CompanyLogo } from "../common/CompanyLogo";
import { GlobalSearchModal } from "../common/GlobalSearchModal";
import {
  Calculator,
  Search,
  Bot,
  UserCheck,
  Building2,
  ChevronDown,
  Menu,
  X,
  Sparkles,
  Zap,
  Globe2,
  Boxes,
  Activity,
  ShieldCheck,
  Wrench,
  FileText,
  FolderGit2,
  BookOpen,
  Settings,
  Layers,
  Cpu,
  FileSpreadsheet,
  Grid,
  ShieldAlert,
  Flame,
  Factory,
  Send,
  HelpCircle,
  FileCode,
  Sparkle
} from "lucide-react";

interface NavbarProps {
  currentRole: UserRole;
  setCurrentRole: (role: UserRole) => void;
  onQuickQuoteClick: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  currentRole,
  setCurrentRole,
  onQuickQuoteClick,
}) => {
  const { currentPath, navigate } = useRouter();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [roleDropdownOpen, setRoleDropdownOpen] = useState(false);
  const [megaMenuOpen, setMegaMenuOpen] = useState<string | null>(null);
  const [searchModalOpen, setSearchModalOpen] = useState(false);

  const roles: UserRole[] = [
    "Guest",
    "Registered User",
    "Professional Engineer",
    "Enterprise Customer",
    "Company Administrator",
    "Super Administrator",
  ];

  const mainMegaItems = [
    {
      id: "company",
      label: "Company",
      path: "/company",
      icon: Building2,
      columns: [
        {
          title: "Corporate Identity",
          links: [
            { label: "Company Overview", path: "/company" },
            { label: "Our 40-Year Story (Est. 1983)", path: "/company/story" },
            { label: "Vision & Mission", path: "/company/vision" },
            { label: "Leadership Directorate", path: "/company/leadership" },
          ],
        },
        {
          title: "Standards & Excellence",
          links: [
            { label: "Quality & ASME Compliance", path: "/company/quality" },
            { label: "Thermal R&D & Innovation", path: "/company/rd" },
            { label: "CSR & Sustainability", path: "/company/csr" },
            { label: "Careers in Haridwar", path: "/company/careers" },
          ],
        },
      ],
    },
    {
      id: "products",
      label: "Products",
      path: "/products",
      icon: Boxes,
      columns: [
        {
          title: "Heat Exchangers & Coolers",
          links: [
            { label: "Shell & Tube Heat Exchangers", path: "/products/shell-and-tube-heat-exchanger" },
            { label: "Stator Air & Hydrogen Coolers", path: "/products/stator-air-cooler" },
            { label: "Turbine Bearing Lube Oil Coolers", path: "/products/bearing-oil-cooler" },
            { label: "Replacement Tube Bundles", path: "/products/tube-bundle" },
            { label: "Surface Condensers", path: "/products/surface-condenser" },
          ],
        },
        {
          title: "Finned Tubing & Hydro",
          links: [
            { label: "Wire Wound Fin Tubes", path: "/products/wire-wound-fin-tube" },
            { label: "Strip Wound Air Coolers", path: "/products/strip-wound-fin-cooler" },
            { label: "Hydro Turbine Components", path: "/products/hydro-components" },
            { label: "Reverse Engineered Parts", path: "/products/reverse-engineered-components" },
            { label: "Custom Pressure Vessels", path: "/products/custom-products" },
          ],
        },
      ],
    },
    {
      id: "services",
      label: "Services",
      path: "/services",
      icon: Wrench,
      columns: [
        {
          title: "Manufacturing & Field",
          links: [
            { label: "Heat Exchanger Manufacturing", path: "/services/manufacturing" },
            { label: "On-Site Retubing Services", path: "/services/retubing" },
            { label: "Exchanger Repair & Re-Gasket", path: "/services/repair" },
            { label: "Emergency Outage Maintenance", path: "/services/shutdown-maintenance" },
          ],
        },
        {
          title: "Precision Engineering",
          links: [
            { label: "Reverse Engineering & CAD Drafting", path: "/services/reverse-engineering" },
            { label: "White Metal Bearing Re-Babbitting", path: "/services/white-metal-rebabbitting" },
            { label: "High-Precision CNC Tubesheet Drilling", path: "/services/precision-machining" },
            { label: "ASME Engineering Consultancy", path: "/services/consultancy" },
          ],
        },
      ],
    },
    {
      id: "industries",
      label: "Industries",
      path: "/industries",
      icon: Factory,
      columns: [
        {
          title: "Energy & Power",
          links: [
            { label: "Hydroelectric Power", path: "/industries/hydroelectric" },
            { label: "Thermal Power Generation", path: "/industries/thermal-power" },
            { label: "Nuclear Power Plants", path: "/industries/nuclear" },
            { label: "Renewable & Geothermal", path: "/industries/renewable" },
          ],
        },
        {
          title: "Process & Heavy Sector",
          links: [
            { label: "Oil & Gas Refineries", path: "/industries/oil-gas" },
            { label: "Chemical & Petrochemical", path: "/industries/chemical" },
            { label: "Steel Mills & Metallurgy", path: "/industries/steel" },
            { label: "Sugar, Paper & HVAC", path: "/industries/sugar" },
          ],
        },
      ],
    },
    {
      id: "software",
      label: "Software & GST",
      path: "/software",
      icon: Calculator,
      highlight: true,
      columns: [
        {
          title: "Engineering Calculators",
          links: [
            { label: "Baffle Plate Designer (CAD)", path: "/software/baffle-designer" },
            { label: "Thermal Design (LMTD/NTU)", path: "/software/thermal-design" },
            { label: "ASME Mechanical Studio", path: "/software/mechanical-design" },
            { label: "Material Selection Matrix", path: "/software/material-selection" },
            { label: "Cost & Quotation Builder", path: "/software/cost-estimator" },
            { label: "2D CAD & DXF Generator", path: "/software/drawing-generator" },
          ],
        },
        {
          title: "GST & Commercial Tools",
          links: [
            { label: "Indian GST Calculator (18%)", path: "/software/gst-calculator" },
            { label: "Metal Weight Calculator", path: "/software/metal-weight" },
            { label: "Official Letterhead Studio [Admin]", path: "/software/official-letterhead" },
            { label: "HSN 8419 Code Finder", path: "/software/hsn-finder" },
            { label: "Multi-Unit Converter", path: "/software/unit-converter" },
            { label: "3D Digital Twin Inspector", path: "/software/digital-twin" },
            { label: "Developer REST API Docs", path: "/software/api" },
          ],
        },
      ],
    },
    {
      id: "ai",
      label: "AI Suite",
      path: "/ai",
      icon: Sparkles,
      columns: [
        {
          title: "Gemini 3.6 Flash Assistants",
          links: [
            { label: "AI Lead Engineer Portal", path: "/ai/engineer" },
            { label: "AI Thermal Specialist", path: "/ai/thermal-engineer" },
            { label: "AI ASME Mechanical Specialist", path: "/ai/mechanical-engineer" },
            { label: "AI Metallurgy & WPS Expert", path: "/ai/material-expert" },
          ],
        },
        {
          title: "Diagnostic & Sales AI",
          links: [
            { label: "AI Tube Failure Analysis", path: "/ai/failure-diagnosis" },
            { label: "AI RFQ Proposal Generator", path: "/ai/proposal-generator" },
            { label: "AI TEMA / ASME Standards Search", path: "/ai/knowledge-assistant" },
          ],
        },
      ],
    },
  ];

  return (
    <>
      <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-slate-200/80 shadow-sm">
        {/* Main Header Container */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            {/* Logo Left */}
            <div
              onClick={() => navigate("/")}
              className="cursor-pointer py-2 hover:opacity-95 transition-opacity"
            >
              <CompanyLogo variant="full" size="md" lightBackground={true} />
            </div>

            {/* Desktop Navigation Links with Mega Menu */}
            <nav className="hidden lg:flex items-center gap-1.5 relative">
              <button
                onClick={() => navigate("/")}
                className={`px-3 py-2 rounded-xl text-xs font-bold uppercase tracking-wider transition ${
                  currentPath === "/" ? "bg-[#0056A6] text-white" : "text-slate-700 hover:text-[#0056A6] hover:bg-slate-100"
                }`}
              >
                Home
              </button>

              {mainMegaItems.map((item) => {
                const Icon = item.icon;
                const isActive = currentPath.startsWith(item.path);
                const isOpen = megaMenuOpen === item.id;

                return (
                  <div
                    key={item.id}
                    className="relative"
                    onMouseEnter={() => setMegaMenuOpen(item.id)}
                    onMouseLeave={() => setMegaMenuOpen(null)}
                  >
                    <button
                      onClick={() => navigate(item.path)}
                      className={`flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-bold uppercase tracking-wider transition cursor-pointer ${
                        isActive
                          ? "bg-[#0056A6] text-white shadow-sm"
                          : item.highlight
                          ? "bg-amber-500/10 text-amber-700 border border-amber-300 hover:bg-amber-500/20"
                          : "text-slate-700 hover:text-[#0056A6] hover:bg-slate-100"
                      }`}
                    >
                      <Icon className="w-4 h-4" />
                      <span>{item.label}</span>
                      <ChevronDown className="w-3.5 h-3.5 opacity-60" />
                    </button>

                    {/* Mega Menu Dropdown Box */}
                    {isOpen && (
                      <div className="absolute left-0 top-full pt-2 w-[520px] z-50 animate-in fade-in slide-in-from-top-2 duration-150">
                        <div className="bg-white border border-slate-200 rounded-2xl shadow-2xl p-5 grid grid-cols-2 gap-6 text-slate-900 border-t-4 border-t-[#0056A6]">
                          {item.columns.map((col, idx) => (
                            <div key={idx} className="space-y-3">
                              <h4 className="text-[11px] font-mono font-bold text-[#0056A6] uppercase tracking-wider border-b border-slate-100 pb-1.5">
                                {col.title}
                              </h4>
                              <ul className="space-y-1.5">
                                {col.links.map((lnk) => (
                                  <li key={lnk.path}>
                                    <button
                                      onClick={() => {
                                        navigate(lnk.path);
                                        setMegaMenuOpen(null);
                                      }}
                                      className="w-full text-left text-xs font-medium text-slate-700 hover:text-[#0056A6] hover:bg-blue-50 px-2 py-1.5 rounded-lg transition flex items-center justify-between cursor-pointer"
                                    >
                                      <span>{lnk.label}</span>
                                      <span className="text-[10px] text-slate-300 opacity-0 hover:opacity-100">→</span>
                                    </button>
                                  </li>
                                ))}
                              </ul>
                            </div>
                          ))}

                          <div className="col-span-2 pt-3 border-t border-slate-100 flex items-center justify-between text-xs font-mono">
                            <button
                              onClick={() => {
                                navigate(item.path);
                                setMegaMenuOpen(null);
                              }}
                              className="text-[#0056A6] font-bold hover:underline"
                            >
                              Explore All {item.label} →
                            </button>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                );
              })}

              {/* Quick Jump Options */}
              <button
                onClick={() => navigate("/projects")}
                className={`px-3 py-2 rounded-xl text-xs font-bold uppercase tracking-wider transition ${
                  currentPath.startsWith("/projects") ? "bg-[#0056A6] text-white" : "text-slate-700 hover:bg-slate-100"
                }`}
              >
                Projects
              </button>

              <button
                onClick={() => navigate("/resources")}
                className={`px-3 py-2 rounded-xl text-xs font-bold uppercase tracking-wider transition ${
                  currentPath.startsWith("/resources") ? "bg-[#0056A6] text-white" : "text-slate-700 hover:bg-slate-100"
                }`}
              >
                Resources
              </button>
            </nav>

            {/* Action Buttons Right */}
            <div className="hidden sm:flex items-center gap-2">
              <button
                onClick={() => setSearchModalOpen(true)}
                className="p-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-600 transition cursor-pointer"
                title="Search Products, Software, Codes"
              >
                <Search className="w-4 h-4" />
              </button>

              <button
                onClick={() => navigate("/ai/engineer")}
                className="px-3 py-2 rounded-xl bg-cyan-50 hover:bg-cyan-100 text-[#0077A3] font-bold text-xs flex items-center gap-1.5 border border-cyan-200 transition cursor-pointer"
              >
                <Bot className="w-4 h-4 text-[#00A6D6]" /> AI Assistant
              </button>

              <button
                onClick={() => navigate("/customer")}
                className="px-3 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold text-xs flex items-center gap-1.5 transition cursor-pointer"
              >
                <UserCheck className="w-4 h-4 text-[#0056A6]" /> Client Portal
              </button>

              <button
                onClick={() => navigate("/contact/request-quotation")}
                className="px-4 py-2 rounded-xl bg-[#0056A6] hover:bg-blue-700 text-white font-bold text-xs uppercase tracking-wider shadow-sm transition cursor-pointer"
              >
                Quote
              </button>
            </div>

            {/* Mobile Menu Toggle */}
            <div className="lg:hidden flex items-center gap-2">
              <button
                onClick={() => setSearchModalOpen(true)}
                className="p-2 rounded-lg bg-slate-100 text-slate-700"
              >
                <Search className="w-5 h-5" />
              </button>
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="p-2 rounded-lg bg-slate-100 text-slate-800"
              >
                {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Navigation Drawer */}
        {mobileMenuOpen && (
          <div className="lg:hidden bg-white border-b border-slate-200 px-4 pt-2 pb-6 space-y-2 max-h-[80vh] overflow-y-auto text-xs font-sans">
            <button
              onClick={() => {
                navigate("/");
                setMobileMenuOpen(false);
              }}
              className="w-full text-left py-2 px-3 rounded-lg font-bold text-slate-900 hover:bg-slate-100"
            >
              Home
            </button>

            {mainMegaItems.map((item) => (
              <div key={item.id} className="space-y-1">
                <div className="flex items-center justify-between font-bold text-[#0056A6] px-3 py-1 bg-slate-50 rounded-lg">
                  <span>{item.label}</span>
                  <button
                    onClick={() => {
                      navigate(item.path);
                      setMobileMenuOpen(false);
                    }}
                    className="text-[10px] text-blue-600 underline"
                  >
                    View All
                  </button>
                </div>
                {item.columns.map((col, idx) => (
                  <div key={idx} className="pl-4 space-y-1 border-l-2 border-slate-200 ml-2 py-1">
                    <span className="text-[10px] text-slate-400 font-mono font-bold uppercase">{col.title}</span>
                    {col.links.map((lnk) => (
                      <button
                        key={lnk.path}
                        onClick={() => {
                          navigate(lnk.path);
                          setMobileMenuOpen(false);
                        }}
                        className="w-full text-left py-1 text-slate-700 hover:text-[#0056A6] block"
                      >
                        {lnk.label}
                      </button>
                    ))}
                  </div>
                ))}
              </div>
            ))}

            <div className="pt-3 border-t border-slate-200 space-y-2">
              <button
                onClick={() => {
                  navigate("/contact");
                  setMobileMenuOpen(false);
                }}
                className="w-full py-2.5 bg-[#0056A6] text-white font-bold rounded-xl text-center"
              >
                Contact Us & Request Quote
              </button>
            </div>
          </div>
        )}
      </header>

      {/* Search Modal */}
      <GlobalSearchModal
        isOpen={searchModalOpen}
        onClose={() => setSearchModalOpen(false)}
        onNavigateTab={(tab) => {
          if (tab === "products") navigate("/products");
          else if (tab === "gst-center") navigate("/software/gst-calculator");
          else if (tab === "ai-suite") navigate("/ai");
          else if (tab === "company") navigate("/company");
          else navigate(`/${tab}`);
        }}
      />
    </>
  );
};
