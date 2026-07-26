import React, { createContext, useContext, useState, useEffect } from "react";

export interface BreadcrumbItem {
  label: string;
  path: string;
}

export interface RouterContextType {
  currentPath: string;
  navigate: (path: string, options?: { replace?: boolean; scrollToTop?: boolean }) => void;
  breadcrumbs: BreadcrumbItem[];
  queryParams: Record<string, string>;
}

const RouterContext = createContext<RouterContextType | null>(null);

export const useRouter = (): RouterContextType => {
  const context = useContext(RouterContext);
  if (!context) {
    throw new Error("useRouter must be used within a RouterProvider");
  }
  return context;
};

// Map paths to readable breadcrumb labels and document titles
const ROUTE_METADATA: Record<string, { title: string; description: string; label: string }> = {
  "/": {
    title: "Northern HeatEx Corporation | Noor Engineering Works (Est. 1983)",
    description: "Enterprise Thermal & Mechanical Engineering, ASME Heat Exchangers, Hydro Coolers, Retubing, and Indian GST Business Tools.",
    label: "Home",
  },
  "/company": {
    title: "Company Overview | Northern HeatEx Corporation",
    description: "Four decades of industrial engineering excellence. Parent company Noor Engineering Works established in 1983, Haridwar.",
    label: "Company",
  },
  "/company/story": {
    title: "Our 40-Year Story | Northern HeatEx Corporation",
    description: "From 1983 in Haridwar, Uttarakhand to India's trusted PSU & Government supplier for heat exchangers and hydro turbine coolers.",
    label: "Our Story",
  },
  "/company/vision": {
    title: "Vision & Mission | Northern HeatEx Corporation",
    description: "Leading Asia's industrial energy sector with precision heat transfer solutions and ASME code compliance.",
    label: "Vision & Mission",
  },
  "/company/leadership": {
    title: "Leadership Team | Northern HeatEx Corporation",
    description: "Executive Board and Senior Engineering Directorate at Haridwar Works.",
    label: "Leadership",
  },
  "/company/quality": {
    title: "Quality & ASME Compliance | Northern HeatEx Corporation",
    description: "ASME Section VIII Div 1, TEMA Class R/C/B, API 660, and Third Party Inspection (TPI) by Lloyd's, TUV, and BV.",
    label: "Quality",
  },
  "/company/rd": {
    title: "Thermal R&D & Innovation | Northern HeatEx Corporation",
    description: "Advanced wire-wound finning development, reverse engineering, and fluid flow acoustic resonance mitigation.",
    label: "R&D",
  },
  "/company/csr": {
    title: "CSR & Environmental Sustainability | Northern HeatEx Corporation",
    description: "Sustainable manufacturing, clean energy initiatives, and community growth in Haridwar, Uttarakhand.",
    label: "CSR",
  },
  "/company/careers": {
    title: "Careers & Engineering Roles | Northern HeatEx Corporation",
    description: "Join our thermal design, CNC machining, and metallurgy team at Haridwar Works.",
    label: "Careers",
  },
  "/products": {
    title: "Heat Exchangers & Products Portfolio | Northern HeatEx Corporation",
    description: "TEMA Shell & Tube Heat Exchangers, Stator Air Coolers, Bearing Oil Coolers, Wire-Wound Fin Tubes, and Surface Condensers.",
    label: "Products",
  },
  "/products/shell-and-tube-heat-exchanger": {
    title: "TEMA Shell & Tube Heat Exchangers | Northern HeatEx",
    description: "Custom designed ASME VIII Div 1 & TEMA Class R, C, B shell and tube heat exchangers for high pressure applications.",
    label: "Shell & Tube Exchangers",
  },
  "/products/stator-air-cooler": {
    title: "Generator Stator Air & Hydrogen Coolers | Northern HeatEx",
    description: "High efficiency stator air and hydrogen coolers for power plant turbine generators.",
    label: "Stator Air Coolers",
  },
  "/products/bearing-oil-cooler": {
    title: "Turbine Bearing Lube Oil Coolers | Northern HeatEx",
    description: "Double tube-sheet safety oil coolers for steam, gas, and hydro turbine bearing lubrication systems.",
    label: "Bearing Oil Coolers",
  },
  "/products/tube-bundle": {
    title: "Replacement Tube Bundles & Retubing | Northern HeatEx",
    description: "Drop-in exact replacement tube bundles fabricated under TEMA guidelines in 48-72 hours.",
    label: "Replacement Tube Bundles",
  },
  "/products/wire-wound-fin-tube": {
    title: "Wire Wound Fin Tubes | Northern HeatEx",
    description: "Patented high-turbulence wire loop extended surface tubing for viscous fluid cooling.",
    label: "Wire Wound Fin Tubes",
  },
  "/products/strip-wound-fin-cooler": {
    title: "Strip Wound Air Cooled Heat Exchangers | Northern HeatEx",
    description: "Heavy industrial helical strip-wound finned tube air coolers (ACHE) according to API 661.",
    label: "Strip Wound Fin Coolers",
  },
  "/products/surface-condenser": {
    title: "Steam Surface Condensers | Northern HeatEx",
    description: "High-vacuum main turbine steam surface condensers engineered per HEI standards.",
    label: "Surface Condensers",
  },
  "/products/hydro-components": {
    title: "Hydroelectric Turbine Components | Northern HeatEx",
    description: "Precision hydro turbine runner hubs, wicket gate coolers, shaft sleeves, and wear rings.",
    label: "Hydro Components",
  },
  "/products/reverse-engineered-components": {
    title: "Reverse Engineering & CAD Reconstruction | Northern HeatEx",
    description: "Precision blueprint reconstruction for obsolete or legacy OEM heat exchangers.",
    label: "Reverse Engineered Parts",
  },
  "/products/custom-products": {
    title: "Custom Pressure Vessels & Heat Exchangers | Northern HeatEx",
    description: "Specialized ASME unfired pressure vessels and bespoke heat transfer equipment.",
    label: "Custom Pressure Vessels",
  },
  "/services": {
    title: "Engineering & Field Services | Northern HeatEx Corporation",
    description: "Manufacturing, on-site retubing, white metal re-babbitting, precision CNC machining, and emergency outage services.",
    label: "Services",
  },
  "/services/manufacturing": {
    title: "Heat Exchanger Manufacturing | Northern HeatEx",
    description: "State-of-the-art manufacturing at Haridwar Works with automated orbital TIG welding and CNC drilling.",
    label: "Manufacturing",
  },
  "/services/retubing": {
    title: "On-Site Field Retubing Services | Northern HeatEx",
    description: "24/7 rapid deployment field retubing, hydraulic tube expanding, and tube pulling teams.",
    label: "Retubing Services",
  },
  "/services/repair": {
    title: "Exchanger Repair & Re-Gasketing | Northern HeatEx",
    description: "Hydrostatic testing, tube plugging, channel cover re-machining, and gasket replacement.",
    label: "Repair & Maintenance",
  },
  "/services/performance-enhancement": {
    title: "Thermal Re-Rating & Performance Upgrade | Northern HeatEx",
    description: "Retrofitting wire-wound fin tubes and optimizing tube pitch layout to increase duty.",
    label: "Performance Enhancement",
  },
  "/services/shutdown-maintenance": {
    title: "Emergency Power Plant Shutdown Services | Northern HeatEx",
    description: "72-hour turnaround for critical power plant and refinery turnaround outages across India.",
    label: "Shutdown Maintenance",
  },
  "/services/reverse-engineering": {
    title: "Reverse Engineering & Blueprint Re-Creation | Northern HeatEx",
    description: "On-site physical dimensional measurement to recreate exact manufacturing drawings.",
    label: "Reverse Engineering",
  },
  "/services/white-metal-rebabbitting": {
    title: "White Metal Bearing Re-Babbitting | Northern HeatEx",
    description: "ASTM B23 tin-based babbitt lining for Turbine Guide pads, Upper guide pads, Lower guide pads, and Thrust Pads with 100% bonding and defect free surface.",
    label: "White Metal Re-Babbitting",
  },
  "/services/precision-machining": {
    title: "CNC Tubesheet Drilling & Flange Facing | Northern HeatEx",
    description: "High-precision CNC deep hole drilling, serrated flange facing, and baffle plate machining.",
    label: "Precision Machining",
  },
  "/services/consultancy": {
    title: "ASME & Thermal Design Consultancy | Northern HeatEx",
    description: "Expert engineering consultation on TEMA compliance, flow vibration, and alloy selection.",
    label: "Engineering Consultancy",
  },
  "/services/field-services": {
    title: "NDE & Field Hydrotesting Services | Northern HeatEx",
    description: "Eddy Current testing, Helium mass spectrometer leak detection, and dye penetrant inspection.",
    label: "Field NDE Services",
  },
  "/industries": {
    title: "Industrial Sector Expertise | Northern HeatEx Corporation",
    description: "Tailored heat exchanger solutions for Hydroelectric, Thermal Power, Oil & Gas, Nuclear, and Chemicals.",
    label: "Industries",
  },
  "/industries/hydroelectric": {
    title: "Hydroelectric Power Heat Exchangers | Northern HeatEx",
    description: "Turbine oil coolers, generator stator air coolers, and hydro bearing cooling systems.",
    label: "Hydroelectric",
  },
  "/industries/thermal-power": {
    title: "Thermal Power Station Solutions | Northern HeatEx",
    description: "High-pressure boiler feedwater heaters, surface condensers, and lube oil coolers.",
    label: "Thermal Power",
  },
  "/industries/nuclear": {
    title: "Nuclear Power Heat Transfer | Northern HeatEx",
    description: "ASME Section III & VIII nuclear grade auxiliary surface condensers and emergency cooling bundles.",
    label: "Nuclear Power",
  },
  "/industries/oil-gas": {
    title: "Refinery & Petrochemical Exchangers | Northern HeatEx",
    description: "API 660 compliant heavy duty crude oil preheat trains and gas compression intercoolers.",
    label: "Oil & Gas",
  },
  "/industries/chemical": {
    title: "Corrosive Chemical Process Exchangers | Northern HeatEx",
    description: "Specialized Titanium, Hastelloy, and Super Duplex heat exchangers for acid processing.",
    label: "Chemical Industry",
  },
  "/industries/steel": {
    title: "Steel Mill & Heavy Metallurgy Coolers | Northern HeatEx",
    description: "Blast furnace jacket coolers, rolling mill hydraulic oil coolers, and transformer oil coolers.",
    label: "Steel & Metallurgy",
  },
  "/software": {
    title: "Software & Digital Engineering Suite | Northern HeatEx",
    description: "Thermal Design Calculator, ASME Mechanical Studio, Material Matrix, GST Calculator, and Digital Twin.",
    label: "Software",
  },
  "/software/thermal-design": {
    title: "Thermal Design Calculator (LMTD / NTU) | Northern HeatEx Software",
    description: "Calculate heat duty Q, overall heat transfer coefficient U, LMTD, and required surface area.",
    label: "Thermal Design",
  },
  "/software/mechanical-design": {
    title: "ASME Mechanical Studio (Sec VIII Div 1) | Northern HeatEx Software",
    description: "Shell thickness, tubesheet thickness, nozzle reinforcement, and MAWP hydrotest pressure solver.",
    label: "Mechanical Design",
  },
  "/software/material-selection": {
    title: "ASME Alloy Material Selection Matrix | Northern HeatEx Software",
    description: "Comprehensive alloy database for Carbon Steel, SS316L, CuNi 90/10, Titanium, and Monel 400.",
    label: "Material Matrix",
  },
  "/software/cost-estimator": {
    title: "Heat Exchanger Cost & Quotation Builder | Northern HeatEx Software",
    description: "Itemized material, machining, labor, and ASME stamping cost estimator.",
    label: "Cost Estimator",
  },
  "/software/report-generator": {
    title: "Engineering Datasheet & Report Generator | Northern HeatEx Software",
    description: "Export formal TEMA datasheets and ASME calculation verification reports in PDF format.",
    label: "Report Generator",
  },
  "/software/drawing-generator": {
    title: "2D Interactive CAD Drawing Generator | Northern HeatEx Software",
    description: "Generate dimensioned TEMA heat exchanger GA drawings and export DXF CAD files.",
    label: "Drawing Generator",
  },
  "/software/bom-generator": {
    title: "Bill of Materials (BOM) Generator | Northern HeatEx Software",
    description: "Automated BOM line-item breakdown for tubes, shell, baffles, nozzles, and gaskets.",
    label: "BOM Generator",
  },
  "/software/calculators": {
    title: "Engineering Calculators Hub | Northern HeatEx Software",
    description: "Calculators for fluid velocity, Reynolds number, pressure drop, and tube pitch distance.",
    label: "Calculators",
  },
  "/software/unit-converter": {
    title: "Multi-Dimension Engineering Unit Converter | Northern HeatEx Software",
    description: "Convert thermal conductivity, pressure, temperature, flow rates, and heat flux instantly.",
    label: "Unit Converter",
  },
  "/software/gst-calculator": {
    title: "Indian GST & Business Tools Suite | Northern HeatEx Software",
    description: "Calculate 18% GST on industrial machinery, search HSN 8419 codes, and plan profit margins.",
    label: "GST Calculator",
  },
  "/software/hsn-finder": {
    title: "HSN Code Search Engine (Chapter 8419) | Northern HeatEx Software",
    description: "Find official Indian GST HSN codes for heat exchangers, air coolers, and boiler parts.",
    label: "HSN Finder",
  },
  "/software/digital-twin": {
    title: "3D Interactive Digital Twin Inspector | Northern HeatEx Software",
    description: "Real-time WebGL 3D model, bundle disassembly view, and thermal heatmap inspector.",
    label: "Digital Twin",
  },
  "/software/predictive-maintenance": {
    title: "AI Failure Analysis & Diagnostics | Northern HeatEx Software",
    description: "Diagnose tube leaks, flow vibration, corrosion, and fouling with Gemini AI engine.",
    label: "Predictive Maintenance",
  },
  "/software/project-manager": {
    title: "Manufacturing Project Manager | Northern HeatEx Software",
    description: "Track manufacturing milestones, CNC machining progress, and hydrotest clearance.",
    label: "Project Manager",
  },
  "/software/api": {
    title: "Developer REST API & Integration | Northern HeatEx Software",
    description: "Integrate thermal calculation endpoints and CRM RFQ submission into enterprise ERP systems.",
    label: "API Docs",
  },
  "/software/pricing": {
    title: "Software Licensing & Enterprise Plans | Northern HeatEx Software",
    description: "Licensing options for individual engineering consultants, EPC contractors, and enterprise plants.",
    label: "Pricing",
  },
  "/software/documentation": {
    title: "Software User Documentation & Manuals | Northern HeatEx Software",
    description: "Complete user manual, calculation formulas, and validation against TEMA standard test cases.",
    label: "Documentation",
  },
  "/software/downloads": {
    title: "Engineering Software Downloads | Northern HeatEx Software",
    description: "Download offline desktop utilities, CAD templates, and calculation spreadsheets.",
    label: "Downloads",
  },
  "/ai": {
    title: "AI Engineering Suite | Northern HeatEx Corporation",
    description: "Server-side Gemini 3.6 Flash powered AI Assistants for Thermal, ASME Mechanical, Metallurgy, and RFQ generation.",
    label: "AI Suite",
  },
  "/ai/engineer": {
    title: "AI Thermal & Mechanical Lead Engineer | Northern HeatEx",
    description: "Interactive AI engineer for complex heat exchanger calculations and code verification.",
    label: "AI Lead Engineer",
  },
  "/ai/mechanical-engineer": {
    title: "AI ASME Mechanical Pressure Vessel Specialist | Northern HeatEx",
    description: "ASME Section VIII Division 1 shell, tubesheet, and nozzle thickness calculation AI.",
    label: "AI Mechanical Engineer",
  },
  "/ai/thermal-engineer": {
    title: "AI Thermal Design Specialist | Northern HeatEx",
    description: "LMTD, overall heat transfer coefficient U, and NTU effectiveness calculation AI.",
    label: "AI Thermal Engineer",
  },
  "/ai/material-expert": {
    title: "AI Metallurgy & Welding Specialist | Northern HeatEx",
    description: "WPS/PQR recommendations, filler metal selection, and exotic alloy welding advice.",
    label: "AI Metallurgy Expert",
  },
  "/ai/failure-diagnosis": {
    title: "AI Tube Failure & Corrosion Diagnostician | Northern HeatEx",
    description: "Root cause analysis for flow vibration, stress corrosion, and pitting failure modes.",
    label: "AI Failure Analysis",
  },
  "/ai/proposal-generator": {
    title: "AI Technical Sales Proposal Generator | Northern HeatEx",
    description: "Automated generation of formal enterprise RFQ proposals in seconds.",
    label: "AI Proposal Generator",
  },
  "/ai/knowledge-assistant": {
    title: "AI TEMA & ASME Code Knowledge Assistant | Northern HeatEx",
    description: "Instant citation and query engine for TEMA, ASME, API 660, and HEI standards.",
    label: "AI Code Assistant",
  },
  "/projects": {
    title: "Project Portfolio & Case Studies | Northern HeatEx Corporation",
    description: "Explore 5,000+ completed heat exchanger projects across hydro plants, refineries, and steel mills.",
    label: "Projects",
  },
  "/gallery": {
    title: "Workshop, Testing & 3D Media Gallery | Northern HeatEx",
    description: "Photos and videos of Haridwar Works manufacturing bay, high-precision CNC machining, and hydrotest bunker.",
    label: "Gallery",
  },
  "/resources": {
    title: "Engineering Knowledge Centre & Library | Northern HeatEx",
    description: "Technical white papers, TEMA code reference guides, blogs, and calculation tutorials.",
    label: "Resources",
  },
  "/customer": {
    title: "Customer & Client Operations Portal | Northern HeatEx",
    description: "Client login for live manufacturing progress, ASME Manufacturer Data Reports (MDR), and GST invoices.",
    label: "Customer Portal",
  },
  "/admin": {
    title: "Enterprise Operations & CRM Admin Portal | Northern HeatEx",
    description: "Internal portal for RFQ management, production scheduling, CMS catalogue, and AI training.",
    label: "Admin Portal",
  },
  "/contact": {
    title: "Contact Us & Haridwar Works Address | Northern HeatEx",
    description: "Connect with our thermal design team at Shastri Nagar, Jwalapur, Haridwar – 249407, Uttarakhand.",
    label: "Contact Us",
  },
  "/careers": {
    title: "Careers & Jobs in Haridwar | Northern HeatEx",
    description: "Career opportunities for thermal design engineers, CNC programmers, and certified TIG welders.",
    label: "Careers",
  },
  "/privacy": {
    title: "Privacy Policy | Northern HeatEx Corporation",
    description: "Data protection and privacy commitments of Northern HeatEx Corporation.",
    label: "Privacy Policy",
  },
  "/terms": {
    title: "Terms & Conditions | Northern HeatEx Corporation",
    description: "Commercial and contractual terms of service for equipment supply and engineering services.",
    label: "Terms & Conditions",
  },
  "/disclaimer": {
    title: "Engineering & ASME Legal Disclaimer | Northern HeatEx",
    description: "Technical calculation and engineering specification disclaimer.",
    label: "Engineering Disclaimer",
  },
};

export const RouterProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentPath, setCurrentPath] = useState<string>(() => {
    return window.location.pathname || "/";
  });

  const [queryParams, setQueryParams] = useState<Record<string, string>>({});

  // Sync state with browser location
  useEffect(() => {
    const parseUrl = () => {
      const path = window.location.pathname || "/";
      setCurrentPath(path);

      const params: Record<string, string> = {};
      const urlParams = new URLSearchParams(window.location.search);
      urlParams.forEach((val, key) => {
        params[key] = val;
      });
      setQueryParams(params);

      // Update document title & SEO metadata
      const meta = ROUTE_METADATA[path] || {
        title: `${path.split("/").pop()?.replace(/-/g, " ").toUpperCase() || "Page"} | Northern HeatEx Corporation`,
        description: "Northern HeatEx Corporation - Enterprise Thermal & Mechanical Engineering Solutions.",
        label: path.split("/").pop() || "Page",
      };

      document.title = meta.title;

      // Update meta description
      let metaDesc = document.querySelector('meta[name="description"]');
      if (!metaDesc) {
        metaDesc = document.createElement("meta");
        metaDesc.setAttribute("name", "description");
        document.head.appendChild(metaDesc);
      }
      metaDesc.setAttribute("content", meta.description);
    };

    parseUrl();

    const handlePopState = () => {
      parseUrl();
    };

    window.addEventListener("popstate", handlePopState);
    return () => window.removeEventListener("popstate", handlePopState);
  }, [currentPath]);

  const navigate = (path: string, options?: { replace?: boolean; scrollToTop?: boolean }) => {
    if (options?.replace) {
      window.history.replaceState({}, "", path);
    } else {
      window.history.pushState({}, "", path);
    }

    setCurrentPath(path);

    if (options?.scrollToTop !== false) {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  // Build breadcrumb list dynamically
  const generateBreadcrumbs = (): BreadcrumbItem[] => {
    const parts = currentPath.split("/").filter(Boolean);
    const crumbs: BreadcrumbItem[] = [{ label: "Home", path: "/" }];

    let accPath = "";
    parts.forEach((part) => {
      accPath += `/${part}`;
      const meta = ROUTE_METADATA[accPath];
      const label = meta ? meta.label : part.replace(/-/g, " ").replace(/\b\w/g, (l) => l.toUpperCase());
      crumbs.push({ label, path: accPath });
    });

    return crumbs;
  };

  return (
    <RouterContext.Provider
      value={{
        currentPath,
        navigate,
        breadcrumbs: generateBreadcrumbs(),
        queryParams,
      }}
    >
      {children}
    </RouterContext.Provider>
  );
};
