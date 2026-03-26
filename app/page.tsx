import { supabase } from '@/lib/supabase';
import DealsList from '@/components/DealsList';
import CategoryFilter from '@/components/CategoryFilter';

export default async function Home() {
  const { data: deals } = await supabase
    .from('deals')
    .select('*, merchants(*)');

  return (
    <main className="min-h-screen bg-gray-50 pb-20">
      <div className="bg-blue-600 pt-12 pb-20 px-6 rounded-b-[3rem] shadow-2xl">
        <h1 className="text-4xl font-black text-white mb-2 italic tracking-tighter">PROMOS LSHI</h1>
        <p className="text-blue-100 font-medium">Les meilleures offres de Lubumbashi 🇨🇩</p>
      </div>
      
      <div className="px-6 -mt-10">
        <CategoryFilter />
        <DealsList initialDeals={deals || []} />
      </div>
    </main>
  );
}