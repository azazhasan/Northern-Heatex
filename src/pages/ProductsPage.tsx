import React from "react";
import { useRouter } from "../context/RouterContext";
import { PRODUCTS_DATABASE } from "../components/products/productsData";
import { ProductDetailView } from "../components/products/ProductDetailView";
import { ProductsHub } from "../components/products/ProductsHub";

export const ProductsPage: React.FC = () => {
  const { currentPath, navigate } = useRouter();

  // Route matching for individual product detail pages
  const slug = currentPath.replace("/products", "").replace(/^\//, "");

  // Map URL slugs to product database IDs
  const slugToIdMap: Record<string, string> = {
    "shell-and-tube-heat-exchanger": "shell-and-tube",
    "stator-air-cooler": "stator-cooler",
    "bearing-oil-cooler": "bearing-cooler",
    "tube-bundle": "replacement-bundles",
    "wire-wound-fin-tube": "wire-fin-tubes",
    "strip-wound-fin-cooler": "strip-fin-coolers",
    "surface-condenser": "steam-condensers",
    "hydro-components": "hydro-coolers",
    "reverse-engineered-components": "reverse-engineered",
    "custom-products": "custom-vessels",
  };

  const targetId = slugToIdMap[slug] || slug;
  const foundProduct = PRODUCTS_DATABASE.find((p) => p.id === targetId || p.id === slug);

  if (slug && foundProduct) {
    return (
      <div className="space-y-6">
        <ProductDetailView
          product={foundProduct}
          onBackToCatalog={() => navigate("/products")}
          onNavigateToTab={(tab) => {
            if (tab === "thermal-calc") navigate("/software/thermal-design");
            else if (tab === "mechanical-asme") navigate("/software/mechanical-design");
            else navigate(`/${tab}`);
          }}
        />
      </div>
    );
  }

  // Otherwise render full Products Catalogue
  return (
    <ProductsHub
      onQuickQuoteClick={() => navigate("/contact/request-quotation")}
      onNavigateToTab={(tab) => {
        if (tab === "thermal-calc") navigate("/software/thermal-design");
        else navigate(`/${tab}`);
      }}
    />
  );
};
