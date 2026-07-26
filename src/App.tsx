import React, { useState } from "react";
import { RouterProvider, useRouter } from "./context/RouterContext";
import { UserRole } from "./types";
import { Navbar } from "./components/layout/Navbar";
import { Footer } from "./components/layout/Footer";
import { Breadcrumbs } from "./components/common/Breadcrumbs";
import { LoadingScreen } from "./components/home/LoadingScreen";
import { AudioController } from "./components/home/AudioController";
import { FloatingUnitConverter } from "./components/common/FloatingUnitConverter";
import { FloatingWeightCalculator } from "./components/common/FloatingWeightCalculator";
import { FloatingFabEstimator } from "./components/common/FloatingFabEstimator";

// Page Components
import { HomePage } from "./pages/HomePage";
import { CompanyPage } from "./pages/CompanyPage";
import { ProductsPage } from "./pages/ProductsPage";
import { ServicesPage } from "./pages/ServicesPage";
import { IndustriesPage } from "./pages/IndustriesPage";
import { SoftwarePage } from "./pages/SoftwarePage";
import { AIPage } from "./pages/AIPage";
import { ProjectsPage } from "./pages/ProjectsPage";
import { GalleryPage } from "./pages/GalleryPage";
import { ResourcesPage } from "./pages/ResourcesPage";
import { CustomerPage } from "./pages/CustomerPage";
import { AdminPage } from "./pages/AdminPage";
import { ContactPage } from "./pages/ContactPage";
import { CareersPage } from "./pages/CareersPage";
import { LegalPages } from "./pages/LegalPages";

import { motion, AnimatePresence } from "motion/react";

// Motion Animation Variants for Premium Page Transitions
const pageContainerVariants = {
  initial: { opacity: 0, y: 18, filter: "blur(4px)" },
  animate: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: {
      duration: 0.45,
      ease: [0.16, 1, 0.3, 1],
      staggerChildren: 0.08,
      delayChildren: 0.04,
    },
  },
  exit: {
    opacity: 0,
    y: -12,
    filter: "blur(2px)",
    transition: {
      duration: 0.25,
      ease: [0.7, 0, 0.84, 0],
    },
  },
};

const MainAppContent: React.FC = () => {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [currentRole, setCurrentRole] = useState<UserRole>("Professional Engineer");
  const { currentPath, navigate } = useRouter();

  const handleQuickQuoteClick = () => {
    navigate("/contact/request-quotation");
  };

  const renderActivePage = () => {
    if (currentPath.startsWith("/company")) return <CompanyPage />;
    if (currentPath.startsWith("/products")) return <ProductsPage />;
    if (currentPath.startsWith("/services")) return <ServicesPage />;
    if (currentPath.startsWith("/industries")) return <IndustriesPage />;
    if (currentPath.startsWith("/software")) return <SoftwarePage />;
    if (currentPath.startsWith("/ai")) return <AIPage />;
    if (currentPath.startsWith("/projects")) return <ProjectsPage />;
    if (currentPath.startsWith("/gallery")) return <GalleryPage />;
    if (currentPath.startsWith("/resources")) return <ResourcesPage />;
    if (currentPath.startsWith("/customer")) return <CustomerPage />;
    if (currentPath.startsWith("/admin")) return <AdminPage />;
    if (currentPath.startsWith("/contact")) return <ContactPage />;
    if (currentPath.startsWith("/careers")) return <CareersPage />;
    if (currentPath === "/privacy" || currentPath === "/terms" || currentPath === "/disclaimer") return <LegalPages />;

    return <HomePage />;
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC] text-slate-900 font-['Plus_Jakarta_Sans',sans-serif] flex flex-col justify-between selection:bg-[#0056A6] selection:text-white overflow-x-hidden">
      {/* Cinematic Initial Loading Screen */}
      <AnimatePresence>
        {isLoading && (
          <motion.div
            key="loader"
            initial={{ opacity: 1 }}
            exit={{ opacity: 0, scale: 1.05 }}
            transition={{ duration: 0.6, ease: "easeInOut" }}
            className="fixed inset-0 z-[100]"
          >
            <LoadingScreen onLoadingComplete={() => setIsLoading(false)} />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Synthesized Audio Controller */}
      <AudioController />

      {/* Suite-Wide Floating Engineering Tools Hub */}
      <FloatingUnitConverter />
      <FloatingWeightCalculator />
      <FloatingFabEstimator />

      {/* Top Fixed Header Navigation */}
      <Navbar
        currentRole={currentRole}
        setCurrentRole={setCurrentRole}
        onQuickQuoteClick={handleQuickQuoteClick}
      />

      {/* Main Body Content Container */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <Breadcrumbs />

        <AnimatePresence mode="wait">
          <motion.div
            key={currentPath}
            variants={pageContainerVariants}
            initial="initial"
            animate="animate"
            exit="exit"
          >
            {renderActivePage()}
          </motion.div>
        </AnimatePresence>
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default function App() {
  return (
    <RouterProvider>
      <MainAppContent />
    </RouterProvider>
  );
}
