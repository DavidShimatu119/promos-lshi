import { supabase } from '@/lib/supabase'
import DealsList from '@/components/DealsList'

export default async function Home() {
  const { data: deals } = await supabase
    .from('deals')
    .select('*, image_url, merchants!inner(name, category, whatsapp_number)')
    .order('created_at', { ascending: false });

  return (
    <main className="min-h-screen bg-gray-50/50">
      <nav className="bg-white border-b border-gray-100 p-4 mb-6">
        <h1 className="text-xl font-black text-blue-600 max-w-6xl mx-auto italic">PromosLshi</h1>
      </nav>
      <div className="max-w-6xl mx-auto px-4 pb-20">
        <DealsList initialDeals={deals || []} />
      </div>
    </main>
  );
}