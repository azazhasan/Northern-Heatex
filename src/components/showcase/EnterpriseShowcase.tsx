import React from "react";
import { EngineeringTab } from "../../types";
import { HeroSection } from "../home/HeroSection";
import { WhoWeAreSection } from "../home/WhoWeAreSection";
import { OurSolutionsSection } from "../home/OurSolutionsSection";
import { Interactive3DShowcaseSection } from "../home/Interactive3DShowcaseSection";
import { WhyNorthernHeatExSection } from "../home/WhyNorthernHeatExSection";
import { ClientIndustriesSection } from "../home/ClientIndustriesSection";
import { ProjectGallerySection } from "../home/ProjectGallerySection";
import { TestimonialsSection } from "../home/TestimonialsSection";
import { InquiryFormSection } from "../home/InquiryFormSection";
import { GoogleMapSection } from "../home/GoogleMapSection";

interface EnterpriseShowcaseProps {
  onLaunchTab: (tab: EngineeringTab) => void;
  onQuickQuoteClick: () => void;
}

export const EnterpriseShowcase: React.FC<EnterpriseShowcaseProps> = ({
  onLaunchTab,
  onQuickQuoteClick,
}) => {
  const scrollToInquiry = () => {
    const el = document.getElementById("inquiry");
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    } else {
      onQuickQuoteClick();
    }
  };

  const scrollToSolutions = () => {
    const el = document.getElementById("solutions");
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div className="space-y-0">
      {/* 1. HERO SECTION (With Floating 3D Shell & Tube Exchanger, Particles, Lighting) */}
      <HeroSection
        onExploreSolutions={scrollToSolutions}
        onTalkToEngineer={scrollToInquiry}
      />

      {/* 2. SECTION 2: WHO WE ARE (3D World Map, Legacy & Counters) */}
      <WhoWeAreSection />

      {/* 3. SECTION 3: OUR SOLUTIONS (12 Large Cards with Expandable Details) */}
      <OurSolutionsSection />

      {/* 4. SECTION 4: 3D PRODUCT SHOWCASE (Interactive CAD Viewer, Exploded View, Heatmap, Flow) */}
      <Interactive3DShowcaseSection />

      {/* 5. SECTION 5: WHY NORTHERN HEATEX (Timeline & Core Advantages) */}
      <WhyNorthernHeatExSection />

      {/* 6. SECTION 6: CLIENT INDUSTRIES (10 Market Sectors) */}
      <ClientIndustriesSection />

      {/* 7. SECTION 7: PROJECT GALLERY (Masonry & Lightbox) */}
      <ProjectGallerySection />

      {/* 8. SECTION 8: CUSTOMER TESTIMONIALS (3D Card Carousel) */}
      <TestimonialsSection />

      {/* 9. SECTION 9: INQUIRY FORM (Glassmorphism & Drag & Drop Uploads) */}
      <InquiryFormSection />

      {/* 10. SECTION 10: GOOGLE MAP & HEADQUARTERS */}
      <GoogleMapSection />
    </div>
  );
};
