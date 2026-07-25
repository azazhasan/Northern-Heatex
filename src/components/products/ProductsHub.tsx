import React, { useState } from "react";
import { PRODUCTS_DATABASE, ProductCategoryData } from "./productsData";
import { ProductDetailView } from "./ProductDetailView";
import {
  Search,
  Filter,
  Grid,
  List,
  ChevronRight,
  Flame,
  Zap,
  Building2,
  Cpu,
  Layers,
  Globe2,
  Sliders,
  CheckCircle2,
  FileText,
  Boxes,
  ShieldCheck,
} from "lucide-react";

interface Props {
  onQuickQuoteClick?: () => void;
  onNavigateToTab?: (tab: string) => void;
}

export const ProductsHub: React.FC<Props> = ({ onQuickQuoteClick, onNavigateToTab }) => {
  const [selectedProductId, setSelectedProductId] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedIndustryFilter, setSelectedIndustryFilter] = useState<string>("All");
  const [viewLayout, setViewLayout] = useState<"grid" | "list">("grid");

  const industries = [
    "All",
    "Process & Refineries",
    "Power & Gas Transmission",
    "Power Generation",
    "Chemical & HVAC",
    "Clean Energy & LNG",
    "Marine & FPSO",
    "Nuclear Power",
    "Services & Spare Parts",
  ];

  // Filter products based on search query and industry filter
  const filteredProducts = PRODUCTS_DATABASE.filter((product) => {
    const matchesSearch =
      searchQuery === "" ||
      product.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.subtitle.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.overview.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.materialsOptions.some((m) => m.material.toLowerCase().includes(searchQuery.toLowerCase())) ||
      product.asmeStandards.some((s) => s.toLowerCase().includes(searchQuery.toLowerCase()));

    const matchesIndustry =
      selectedIndustryFilter === "All" || product.categoryTag === selectedIndustryFilter;

    return matchesSearch && matchesIndustry;
  });

  const selectedProduct = PRODUCTS_DATABASE.find((p) => p.id === selectedProductId);

  // If a specific product category is selected, render ProductDetailView
  if (selectedProduct) {
    return (
      <ProductDetailView
        product={selectedProduct}
        onBackToCatalog={() => {
          setSelectedProductId(null);
          window.scrollTo({ top: 0, behavior: "smooth" });
        }}
        onNavigateToTab={onNavigateToTab}
      />
    );
  }

  return (
    <div className="space-y-12">
      {/* Hero Header Banner */}
      <div className="relative bg-gradient-to-br from-[#07090f] via-[#040508] to-[#0c101a] border border-cyan-500/30 rounded-3xl p-8 sm:p-12 overflow-hidden shadow-2xl">
        <div className="absolute top-0 right-0 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-blue-600/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 space-y-6 max-w-4xl">
          <div className="flex flex-wrap items-center gap-3">
            <span className="px-3 py-1 rounded-full text-xs font-mono font-bold uppercase tracking-wider bg-cyan-950 text-cyan-400 border border-cyan-500/40 flex items-center gap-1.5">
              <Boxes className="w-3.5 h-3.5" /> 18 Enterprise Product Categories
            </span>
            <span className="px-3 py-1 rounded-full text-xs font-mono text-white/70 bg-white/5 border border-white/10">
              ASME VIII Div 1 & 2 • TEMA Class R, C & B • API 660 / 661
            </span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight leading-tight">
            Products & Engineering Solutions
          </h1>

          <p className="text-base sm:text-lg text-cyan-200/80 font-medium leading-relaxed">
            Discover Northern HeatEx Corporation's world-class thermal exchange technologies, custom heavy industrial process equipment, nuclear-grade exchangers, and lifecycle engineering services.
          </p>

          {/* Quick Metrics Bar */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-4 border-t border-white/10 font-mono">
            <div className="p-3 bg-black/40 rounded-xl border border-white/10">
              <div className="text-[10px] text-white/50 uppercase">Categories</div>
              <div className="text-xl font-extrabold text-cyan-300">18 Systems</div>
            </div>
            <div className="p-3 bg-black/40 rounded-xl border border-white/10">
              <div className="text-[10px] text-white/50 uppercase">Max Pressure</div>
              <div className="text-xl font-extrabold text-amber-300">1,000 Bar</div>
            </div>
            <div className="p-3 bg-black/40 rounded-xl border border-white/10">
              <div className="text-[10px] text-white/50 uppercase">Temp Range</div>
              <div className="text-xl font-extrabold text-red-400">-253°C to +1000°C</div>
            </div>
            <div className="p-3 bg-black/40 rounded-xl border border-white/10">
              <div className="text-[10px] text-white/50 uppercase">Certifications</div>
              <div className="text-xl font-extrabold text-emerald-400">ASME U, U2, N</div>
            </div>
          </div>
        </div>
      </div>

      {/* Filter & Search Bar */}
      <div className="bg-[#080a0f] border border-white/10 rounded-2xl p-6 space-y-6">
        <div className="flex flex-wrap items-center justify-between gap-4">
          {/* Search Bar */}
          <div className="relative flex-1 min-w-[280px]">
            <Search className="w-4 h-4 text-white/40 absolute left-3.5 top-3.5" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search products by title, TEMA type, metallurgy (e.g. Titanium, Inconel), or ASME code..."
              className="w-full bg-slate-900 border border-white/15 rounded-xl pl-10 pr-4 py-2.5 text-xs text-white placeholder-white/40 font-mono focus:border-cyan-400 focus:outline-none"
            />
          </div>

          {/* Layout Toggle Buttons */}
          <div className="flex items-center gap-1.5 bg-black/60 p-1 rounded-xl border border-white/10 font-mono text-xs">
            <button
              onClick={() => setViewLayout("grid")}
              className={`p-2 rounded-lg transition ${
                viewLayout === "grid" ? "bg-cyan-500 text-slate-950 font-bold shadow-lg" : "text-white/60 hover:text-white"
              }`}
            >
              <Grid className="w-4 h-4" />
            </button>
            <button
              onClick={() => setViewLayout("list")}
              className={`p-2 rounded-lg transition ${
                viewLayout === "list" ? "bg-cyan-500 text-slate-950 font-bold shadow-lg" : "text-white/60 hover:text-white"
              }`}
            >
              <List className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Industry Filter Chips */}
        <div className="flex flex-wrap items-center gap-2 pt-2 border-t border-white/5 font-mono text-xs">
          <span className="text-white/40 uppercase tracking-widest text-[10px] mr-2 flex items-center gap-1">
            <Filter className="w-3 h-3 text-cyan-400" /> Sector Filter:
          </span>
          {industries.map((ind) => {
            const isActive = selectedIndustryFilter === ind;
            return (
              <button
                key={ind}
                onClick={() => setSelectedIndustryFilter(ind)}
                className={`px-3 py-1.5 rounded-lg text-xs transition ${
                  isActive
                    ? "bg-cyan-950 text-cyan-300 border border-cyan-500/50 font-bold"
                    : "bg-white/5 text-white/60 hover:text-white border border-transparent"
                }`}
              >
                {ind}
              </button>
            );
          })}
        </div>
      </div>

      {/* Catalog Results Grid / List */}
      <div className="space-y-4">
        <div className="flex items-center justify-between font-mono text-xs text-white/50">
          <span>
            Displaying <strong className="text-cyan-400">{filteredProducts.length}</strong> of 18 Product Categories
          </span>
          {selectedIndustryFilter !== "All" && (
            <span>
              Filtered by: <strong className="text-cyan-300">{selectedIndustryFilter}</strong>
            </span>
          )}
        </div>

        {viewLayout === "grid" ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredProducts.map((product) => (
              <div
                key={product.id}
                onClick={() => {
                  setSelectedProductId(product.id);
                  window.scrollTo({ top: 0, behavior: "smooth" });
                }}
                className="bg-[#080a0f] border border-white/10 hover:border-cyan-500/50 rounded-2xl p-6 flex flex-col justify-between space-y-4 transition duration-300 group cursor-pointer hover:shadow-2xl hover:shadow-cyan-500/10"
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="px-2.5 py-0.5 bg-cyan-950 text-cyan-300 border border-cyan-500/30 text-[10px] font-mono font-bold uppercase rounded">
                      {product.categoryTag}
                    </span>
                    <span className="text-[10px] font-mono text-white/40">
                      {product.asmeStandards[0]?.split(" ")[0]}
                    </span>
                  </div>

                  <h3 className="text-xl font-bold text-white group-hover:text-cyan-300 transition">
                    {product.title}
                  </h3>

                  <p className="text-xs text-cyan-200/80 font-mono line-clamp-1">
                    {product.subtitle}
                  </p>

                  <p className="text-xs text-white/60 line-clamp-3 leading-relaxed">
                    {product.overview}
                  </p>

                  {/* Highlights Pill */}
                  <div className="pt-2 flex flex-wrap gap-1.5 font-mono text-[10px]">
                    <span className="px-2 py-0.5 bg-white/5 text-white/70 rounded border border-white/10">
                      {product.quickStats[0]?.value}
                    </span>
                    <span className="px-2 py-0.5 bg-white/5 text-cyan-400 rounded border border-white/10">
                      {product.materialsOptions[0]?.material}
                    </span>
                  </div>
                </div>

                <button className="w-full py-2.5 bg-cyan-950/60 hover:bg-cyan-500 hover:text-slate-950 text-cyan-300 border border-cyan-500/30 rounded-xl text-xs font-mono font-bold uppercase tracking-wider flex items-center justify-center gap-2 transition group-hover:border-cyan-400">
                  <span>Explore Engineering Specs</span>
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            ))}
          </div>
        ) : (
          <div className="space-y-3">
            {filteredProducts.map((product) => (
              <div
                key={product.id}
                onClick={() => {
                  setSelectedProductId(product.id);
                  window.scrollTo({ top: 0, behavior: "smooth" });
                }}
                className="bg-[#080a0f] border border-white/10 hover:border-cyan-500/50 rounded-xl p-5 flex flex-wrap items-center justify-between gap-4 transition group cursor-pointer"
              >
                <div className="space-y-1 max-w-2xl">
                  <div className="flex items-center gap-3">
                    <span className="px-2 py-0.5 bg-cyan-950 text-cyan-300 border border-cyan-500/30 text-[10px] font-mono font-bold uppercase rounded">
                      {product.categoryTag}
                    </span>
                    <h3 className="text-lg font-bold text-white group-hover:text-cyan-300 transition">
                      {product.title}
                    </h3>
                  </div>
                  <p className="text-xs text-white/60 line-clamp-1">{product.subtitle}</p>
                </div>

                <div className="flex items-center gap-4 font-mono text-xs">
                  <div className="text-right hidden sm:block">
                    <div className="text-cyan-300 font-bold">{product.quickStats[0]?.value}</div>
                    <div className="text-[10px] text-white/40">{product.materialsOptions[0]?.material}</div>
                  </div>

                  <button className="px-4 py-2 bg-cyan-500 text-slate-950 font-bold rounded-lg text-xs flex items-center gap-1.5 uppercase">
                    <span>View Specs</span>
                    <ChevronRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
