'use client';

import DealCard from '@/components/DealCard';
import { useSearchParams } from 'next/navigation';

interface Merchant {
  name: string;
  category: string;
}

interface Deal {
  id: string;
  title: string;
  new_price: number;
  old_price?: number;
  image_url?: string;
  merchants: Merchant;
}

export default function DealsList({ initialDeals }: { initialDeals: Deal[] }) {
  const searchParams = useSearchParams();
  const activeCategory = searchParams.get('category') || 'Toutes';

  // Filtrage des articles selon la catégorie sélectionnée
  const filteredDeals = activeCategory === 'Toutes'
    ? initialDeals
    : initialDeals.filter(deal => deal.merchants.category === activeCategory);

  if (filteredDeals.length === 0) {
    return (
      <div className="text-center py-20">
        <p className="text-gray-400 font-medium">Aucune promotion disponible dans cette catégorie. 🛍️</p>
      </div>
    );
  }

  return (
    /* LA CORRECTION : 
       - 1 colonne sur mobile (default)
       - 2 colonnes sur tablette (sm)
       - 3 colonnes sur petit PC (md)
       - 4 colonnes sur grand écran (lg)
    */
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mt-10">
      {filteredDeals.map((deal) => (
        <DealCard key={deal.id} deal={deal} />
      ))}
    </div>
  );
}