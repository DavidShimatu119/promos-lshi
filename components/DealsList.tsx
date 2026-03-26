"use client";

import { useState } from "react";
import CategoryFilter from "./CategoryFilter";
import DealCard from "./DealCard";
import { Search } from "lucide-react";

interface DealsListProps {
  initialDeals: any[];
}

export default function DealsList({ initialDeals }: { initialDeals: any[] }) {
  const [activeCategory, setActiveCategory] = useState("Toutes");
  const [searchQuery, setSearchQuery] = useState("");

  // 1. Extraction des catégories uniques depuis les marchands
  const categories = Array.from(
    new Set(initialDeals.map((d) => d.merchants?.category).filter(Boolean))
  ) as string[];

  // 2. Logique de filtrage (Catégorie + Barre de recherche)
  const filteredDeals = initialDeals.filter((deal) => {
    const matchesCategory = activeCategory === "Toutes" || deal.merchants?.category === activeCategory;
    
    const matchesSearch = 
      deal.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
      (deal.merchants?.name || "").toLowerCase().includes(searchQuery.toLowerCase());
    
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="space-y-6">
      {/* Barre de recherche stylisée */}
      <div className="relative group">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-blue-500 transition-colors" size={20} />
        <input 
          type="text"
          placeholder="Chercher un article ou un magasin à L'shi..."
          className="w-full pl-12 pr-4 py-4 rounded-2xl border border-gray-100 focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 outline-none transition-all shadow-sm bg-white text-gray-800 font-medium"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>

      {/* Boutons de filtrage par catégorie */}
      <CategoryFilter 
        categories={categories} 
        activeCategory={activeCategory} 
        setActiveCategory={setActiveCategory} 
      />
      
      {/* Grille des promotions */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mt-4">
        {filteredDeals.map((deal) => (
          <DealCard 
            key={deal.id}
            id={deal.id} // <-- TRÈS IMPORTANT : On passe l'ID ici pour la navigation
            title={deal.title}
            merchantName={deal.merchants?.name || "Marchand inconnu"}
            merchantPhone={deal.merchants?.whatsapp_number || ""} 
            category={deal.merchants?.category}
            oldPrice={deal.old_price}
            newPrice={deal.new_price}
            imageUrl={deal.image_url} 
          />
        ))}
      </div>

      {/* État vide si aucune promo n'est trouvée */}
      {filteredDeals.length === 0 && (
        <div className="text-center py-24 bg-white rounded-3xl border-2 border-dashed border-gray-100">
          <div className="bg-gray-50 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
            <Search size={28} className="text-gray-300" />
          </div>
          <p className="text-gray-400 font-bold text-lg">
            Aucun résultat pour "{searchQuery}"
          </p>
          <p className="text-gray-300 text-sm mt-1">
            Essayez un autre mot-clé ou une autre catégorie.
          </p>
        </div>
      )}
    </div>
  );
}