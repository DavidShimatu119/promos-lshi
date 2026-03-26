'use client';
import DealCard from '@/components/DealCard';
import { useSearchParams } from 'next/navigation';

interface Merchant {
  name: string;
  category: string;
  whatsapp_number: string;
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
  const category = searchParams.get('category');

  // Filtrage intelligent côté client
  const filteredDeals = category && category !== 'Toutes'
    ? initialDeals.filter(deal => deal.merchants.category === category)
    : initialDeals;

  if (filteredDeals.length === 0) {
    return (
      <div className="text-center py-20">
        <p className="text-gray-500 font-medium text-lg">Aucune promo trouvée dans cette catégorie. 😮</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
      {filteredDeals.map((deal) => (
        <DealCard key={deal.id} deal={deal} />
      ))}
    </div>
  );
}