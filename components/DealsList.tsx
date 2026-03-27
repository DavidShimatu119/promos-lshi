'use client';

import DealCard from './DealCard'; // Import relatif direct
import { useSearchParams } from 'next/navigation';

export default function DealsList({ initialDeals }: { initialDeals: any[] }) {
  const searchParams = useSearchParams();
  
  const activeCategory = searchParams.get('category') || 'Toutes';
  const query = searchParams.get('query')?.toLowerCase() || '';

  // Logique de filtrage combinée
  const filteredDeals = initialDeals.filter(deal => {
    const matchesCategory = activeCategory === 'Toutes' || deal.merchants.category === activeCategory;
    const matchesSearch = 
      deal.title.toLowerCase().includes(query) || 
      deal.merchants.name.toLowerCase().includes(query);
    
    return matchesCategory && matchesSearch;
  });

  if (filteredDeals.length === 0) {
    return (
      <div className="text-center py-20 bg-white rounded-3xl border-2 border-dashed border-gray-100">
        <p className="text-gray-400 font-bold text-lg">Oups ! Aucune promo ne correspond à votre recherche. 🔍</p>
      </div>
    );
  }

  return (
    /* Grille responsive : 1 col mobile, 2 sm, 3 md, 4 lg */
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
      {filteredDeals.map((deal) => (
        <DealCard key={deal.id} deal={deal} />
      ))}
    </div>
  );
}