import Link from 'next/link';
import { Tag, Store } from 'lucide-react';

export default function DealCard({ deal }: { deal: any }) {
  return (
    <Link href={`/deals/${deal.id}`} className="block group">
      <div className="bg-white rounded-[2.5rem] overflow-hidden shadow-sm hover:shadow-xl transition-all border border-gray-100 p-3">
        <div className="relative aspect-square rounded-[2rem] overflow-hidden bg-gray-100">
          <img 
            src={deal.image_url || 'https://via.placeholder.com/400'} 
            alt={deal.title}
            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
          />
        </div>
        
        <div className="p-4">
          <div className="flex items-center gap-2 text-blue-600 font-bold text-[10px] uppercase mb-1 tracking-wider">
            <Tag size={12} /> {deal.merchants.category}
          </div>
          <h3 className="text-xl font-black text-gray-900 leading-tight mb-2">{deal.title}</h3>
          
          <div className="flex items-center gap-2 text-gray-400 mb-4">
            <Store size={14} />
            <span className="text-sm font-semibold">{deal.merchants.name}</span>
          </div>

          <div className="flex items-baseline gap-2">
            <span className="text-3xl font-black text-red-600">{deal.new_price}$</span>
            {deal.old_price && (
              <span className="text-sm text-gray-300 line-through font-bold">{deal.old_price}$</span>
            )}
          </div>
        </div>
      </div>
    </Link>
  );
}