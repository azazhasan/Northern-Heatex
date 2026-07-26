import React, { useState } from "react";
import { Camera, Play, Maximize2, X, CheckCircle2 } from "lucide-react";

export interface GalleryItem {
  id: string;
  title: string;
  category: "Workshop" | "Machining" | "Welding" | "Assembly" | "Testing";
  imageUrl: string;
  isVideo?: boolean;
  videoUrl?: string;
  specs: string;
  location: string;
}

export const GALLERY_ITEMS: GalleryItem[] = [
  {
    id: "gal-1",
    title: "High-Precision CNC Tubesheet Drilling for 800mm Shell",
    category: "Machining",
    imageUrl: "https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=800&q=80",
    specs: "Material: Carbon Steel SA-516 Gr 70 • 190 Tube Holes",
    location: "Noor Engineering Works • Haridwar",
  },
  {
    id: "gal-2",
    title: "Automated Orbital TIG Welding Tube-to-Tubesheet",
    category: "Welding",
    imageUrl: "https://images.unsplash.com/photo-1504917595217-d4dc5ebe6122?auto=format&fit=crop&w=800&q=80",
    specs: "WPS-NHEE-402 • Duplex 2205 Strength Welding",
    location: "Cleanroom Welding Bay",
  },
  {
    id: "gal-3",
    title: "Hydrostatic Pressure Test at 525 Bar (1.5x MAWP)",
    category: "Testing",
    imageUrl: "https://images.unsplash.com/photo-1581092335397-9583fe92d232?auto=format&fit=crop&w=800&q=80",
    specs: "Third Party Inspector (TPI) Pressure Verification",
    location: "Hydrotest Bunker",
  },
  {
    id: "gal-4",
    title: "High-Pressure Bundle Assembly & Baffle Alignment",
    category: "Assembly",
    imageUrl: "https://images.unsplash.com/photo-1581092580497-e0d23cbdf1dc?auto=format&fit=crop&w=800&q=80",
    specs: "Length: 6,000mm • Stainless 316L Tube Bundle",
    location: "Heavy Assembly Shop",
  },
  {
    id: "gal-5",
    title: "White Metal Babbitt Re-Babbitting for Hydro Turbine Pads",
    category: "Machining",
    imageUrl: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&w=800&q=80",
    specs: "Turbine Guide Pads & Thrust Pads • 100% Bonding & Defect Free Surface",
    location: "Babbitt Bearing Bay",
  },
  {
    id: "gal-6",
    title: "24/7 Field Outage Retubing Emergency Dispatch",
    category: "Workshop",
    imageUrl: "https://images.unsplash.com/photo-1581092795360-fd1ca04f0952?auto=format&fit=crop&w=800&q=80",
    specs: "72-Hour Turnaround • Nuclear Power Outage",
    location: "Onsite Field Operations",
  },
];

export const ProjectGallerySection: React.FC = () => {
  const [filter, setFilter] = useState<string>("All");
  const [activeLightbox, setActiveLightbox] = useState<GalleryItem | null>(null);

  const categories = ["All", "Workshop", "Machining", "Welding", "Assembly", "Testing"];

  const filteredItems = filter === "All" 
    ? GALLERY_ITEMS 
    : GALLERY_ITEMS.filter((item) => item.category === filter);

  return (
    <section id="gallery" className="py-20 bg-[#050505] text-white border-t border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        {/* Header */}
        <div className="flex flex-wrap items-end justify-between gap-6 border-b border-white/10 pb-6">
          <div className="max-w-2xl space-y-2">
            <span className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-cyan-950/80 border border-cyan-500/30 text-cyan-300 text-xs font-mono font-bold uppercase tracking-wider glow-cyan">
              <Camera className="w-3.5 h-3.5 text-cyan-400" />
              Section 7 • Workshop & Field Operations
            </span>

            <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight">
              Precision Engineering{" "}
              <span className="bg-gradient-to-r from-cyan-400 via-blue-400 to-indigo-300 bg-clip-text text-transparent">
                Project Gallery
              </span>
            </h2>
          </div>

          {/* Filter Buttons */}
          <div className="flex flex-wrap gap-2 font-mono text-xs">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setFilter(cat)}
                className={`px-3 py-1.5 rounded-lg border transition cursor-pointer ${
                  filter === cat
                    ? "bg-blue-600 text-white border-blue-400 glow-blue font-bold"
                    : "bg-[#0a0a0a] text-white/60 border-white/10 hover:text-white"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Masonry Layout */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredItems.map((item) => (
            <div
              key={item.id}
              onClick={() => setActiveLightbox(item)}
              className="bg-[#0a0a0a] border border-white/10 rounded-2xl overflow-hidden group hover:border-cyan-500/50 transition duration-300 cursor-pointer shadow-xl relative"
            >
              <div className="relative h-60 overflow-hidden">
                <img
                  src={item.imageUrl}
                  alt={item.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition duration-500 opacity-90"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] via-transparent to-transparent"></div>

                <span className="absolute top-3 left-3 bg-[#0a0a0a]/90 backdrop-blur-md border border-cyan-500/30 text-cyan-300 text-[10px] font-mono px-2.5 py-1 rounded font-bold uppercase">
                  {item.category}
                </span>

                <div className="absolute top-3 right-3 w-8 h-8 rounded-full bg-black/60 border border-white/20 flex items-center justify-center text-white opacity-0 group-hover:opacity-100 transition duration-300">
                  <Maximize2 className="w-4 h-4" />
                </div>
              </div>

              <div className="p-5 space-y-2">
                <h3 className="text-sm font-bold text-white group-hover:text-cyan-300 transition">
                  {item.title}
                </h3>
                <p className="text-xs font-mono text-cyan-400">{item.specs}</p>
                <div className="text-[11px] font-mono text-white/40 pt-1">
                  Location: {item.location}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Lightbox Modal */}
      {activeLightbox && (
        <div className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md flex items-center justify-center p-4">
          <div className="bg-[#0a0a0a] border border-cyan-500/40 rounded-3xl max-w-4xl w-full overflow-hidden shadow-2xl relative text-white space-y-4">
            <button
              onClick={() => setActiveLightbox(null)}
              className="absolute top-4 right-4 z-10 w-10 h-10 rounded-full bg-black/70 hover:bg-black border border-white/20 flex items-center justify-center text-white transition cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="relative h-96 w-full bg-black">
              <img
                src={activeLightbox.imageUrl}
                alt={activeLightbox.title}
                className="w-full h-full object-cover"
              />
            </div>

            <div className="p-6 space-y-3 font-mono">
              <div className="flex items-center gap-2">
                <span className="px-2.5 py-0.5 bg-cyan-950 text-cyan-300 border border-cyan-700 rounded text-xs font-bold uppercase">
                  {activeLightbox.category}
                </span>
                <span className="text-white/40 text-xs">{activeLightbox.location}</span>
              </div>

              <h3 className="text-xl font-bold text-white">{activeLightbox.title}</h3>
              <p className="text-xs text-cyan-300">{activeLightbox.specs}</p>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
