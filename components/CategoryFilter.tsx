'use client';

import { useRouter, useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import { supabase } from '../lib/supabase'; 

export default function CategoryFilter() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const activeCategory = searchParams.get('category') || 'Toutes';
  const [categories, setCategories] = useState<string[]>(['Toutes']);

  useEffect(() => {
    async function fetchCategories() {
      const { data, error } = await supabase.from('merchants').select('category');
      if (!error && data) {
        const uniqueCats = Array.from(new Set(data.map(m => m.category)));
        setCategories(['Toutes', ...uniqueCats.sort()]);
      }
    }
    fetchCategories();
  }, []);

  const handleCategoryClick = (category: string) => {
    const params = new URLSearchParams(searchParams.toString());
    category === 'Toutes' ? params.delete('category') : params.set('category', category);
    router.push(`/?${params.toString()}`);
  };

  return (
    <div className="flex gap-3 overflow-x-auto pb-4 no-scrollbar -mx-2 px-2">
      {categories.map((cat) => (
        <button key={cat} onClick={() => handleCategoryClick(cat)}
          className={`px-6 py-2.5 rounded-2xl font-bold whitespace-nowrap transition-all text-sm ${
            activeCategory === cat ? 'bg-blue-600 text-white shadow-lg' : 'bg-white text-gray-500 border border-gray-100'
          }`}>
          {cat}
        </button>
      ))}
    </div>
  );
}