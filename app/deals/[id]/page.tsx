import { supabase } from '../../../lib/supabase'; 
import { notFound } from 'next/navigation';
import { MessageCircle, ArrowLeft, Store, Tag } from 'lucide-react';
import Link from 'next/link';
import ShareButton from '../../../components/ShareButton';

export default async function DealDetails({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;

  const { data: deal, error } = await supabase
    .from('deals')
    .select('*, merchants(*)')
    .eq('id', id)
    .single();

  if (error || !deal) {
    notFound();
  }

  const whatsappLink = `https://wa.me/${deal.merchants.whatsapp_number.replace(/\D/g, '')}?text=${encodeURIComponent(
    `Bonjour ${deal.merchants.name}, je suis intéressé par : ${deal.title}`
  )}`;

  return (
    <main className="min-h-screen bg-white">
      <nav className="p-4 border-b border-gray-100 bg-white/80 backdrop-blur-md sticky top-0 z-10">
        <Link href="/" className="flex items-center gap-2 text-blue-600 font-bold">
          <ArrowLeft size={20} /> Retour aux promos
        </Link>
      </nav>

      <div className="max-w-4xl mx-auto p-6 grid grid-cols-1 md:grid-cols-2 gap-8 mt-4">
        <div className="rounded-3xl overflow-hidden bg-gray-100 shadow-lg aspect-square">
          <img 
            src={deal.image_url || 'https://via.placeholder.com/600'} 
            alt={deal.title}
            className="w-full h-full object-cover"
          />
        </div>

        <div className="flex flex-col justify-center">
          <div className="flex items-center gap-2 text-blue-600 font-bold text-[10px] uppercase mb-2 tracking-widest">
            <Tag size={14} /> {deal.merchants.category}
          </div>
          <h1 className="text-4xl font-black text-gray-900 mb-4">{deal.title}</h1>
          
          <div className="flex items-center gap-2 text-gray-500 mb-6 pb-6 border-b border-gray-100">
            <Store size={20} />
            <span className="text-lg font-medium">{deal.merchants.name}</span>
          </div>

          <div className="flex items-baseline gap-4 mb-8">
            <span className="text-5xl font-black text-red-600">{deal.new_price}$</span>
            {deal.old_price && (
              <span className="text-2xl text-gray-400 line-through font-bold">{deal.old_price}$</span>
            )}
          </div>

          <div className="space-y-3">
            <a 
              href={whatsappLink}
              target="_blank"
              className="w-full bg-[#25D366] text-white text-lg font-bold py-5 rounded-2xl flex items-center justify-center gap-3 shadow-xl hover:bg-[#128C7E] transition-all transform active:scale-95"
            >
              <MessageCircle size={28} />
              Commander sur WhatsApp
            </a>
            
            <ShareButton title={deal.title} merchant={deal.merchants.name} />
          </div>
        </div>
      </div>
    </main>
  );
}