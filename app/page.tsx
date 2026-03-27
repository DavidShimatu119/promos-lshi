import { supabase } from '../lib/supabase';
import DealsList from '../components/DealsList';
import CategoryFilter from '../components/CategoryFilter';
import SearchBar from '../components/SearchBar';

export default async function Home() {
  // Récupération des données côté serveur
  const { data: deals } = await supabase
    .from('deals')
    .select('*, merchants(*)');

  return (
    <main className="min-h-screen bg-gray-50 pb-20">
      {/* Header Bleu avec Titre et Barre de recherche */}
      <div className="bg-blue-600 pt-12 pb-24 px-6 rounded-b-[3rem] shadow-2xl">
        <div className="max-w-6xl mx-auto">
          <h1 className="text-4xl font-black text-white mb-2 italic tracking-tighter uppercase">
            Promos Lshi
          </h1>
          <p className="text-blue-100 font-medium mb-8">
            Trouvez les meilleures affaires à Lubumbashi 🇨🇩
          </p>
          
          <SearchBar />
        </div>
      </div>
      
      {/* Filtres et Liste d'articles */}
      <div className="max-w-6xl mx-auto px-6 -mt-10">
        <CategoryFilter />
        
        <div className="mt-8">
          <DealsList initialDeals={deals || []} />
        </div>
      </div>
    </main>
  );
}