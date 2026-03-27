'use client';

import { Search } from 'lucide-react';
import { useRouter, useSearchParams } from 'next/navigation';

export default function SearchBar() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const handleSearch = (term: string) => {
    const params = new URLSearchParams(searchParams.toString());
    if (term) {
      params.set('query', term);
    } else {
      params.delete('query');
    }
    // On retourne à la racine avec les nouveaux paramètres
    router.push(`/?${params.toString()}`);
  };

  return (
    <div className="relative group max-w-2xl">
      <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
        <Search className="text-gray-400 group-focus-within:text-blue-600 transition-colors" size={20} />
      </div>
      <input
        type="text"
        placeholder="Un article, une boutique, une promo..."
        className="block w-full pl-12 pr-4 py-4 bg-white border-none rounded-2xl shadow-xl focus:ring-4 focus:ring-blue-400/20 transition-all text-gray-800 placeholder-gray-400 font-medium"
        onChange={(e) => handleSearch(e.target.value)}
        defaultValue={searchParams.get('query') || ''}
      />
    </div>
  );
}